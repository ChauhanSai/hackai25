import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, SafeAreaView, Animated } from 'react-native';
import Svg, { Path, Circle, SvgProps } from "react-native-svg";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function SolarQuestion(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        stroke={props.color || "currentColor"}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M10.125 8.875a1.875 1.875 0 1 1 2.828 1.615c-.475.281-.953.708-.953 1.26V13"
      ></Path>
      <Circle
        cx={12}
        cy={16}
        r={1}
        fill={props.color || "currentColor"}
      ></Circle>
    </Svg>
  );
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'fitz', text: 'Hi! I am Fitz, your chatbot. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading bubbles

  const loadingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(loadingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      loadingAnimation.stopAnimation();
    }
  }, [isLoading]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput(''); // Clear the input field immediately
      setIsLoading(true); // Show loading bubbles

      try {
        const context = {
          user: messages.filter(msg => msg.sender === 'user').map(msg => msg.text),
          fitz: messages.filter(msg => msg.sender === 'fitz').map(msg => msg.text),
        };

        const response = await fetch("http://127.0.0.1:5000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            prompt: input, 
            username: "user", 
            context: JSON.stringify(context),
          }),
        });

        const data = await response.json();
        const dataJSON = JSON.parse(data);

        // Sanitize and trim the response
        const botMessageText =
          dataJSON.response ||
          "Sorry, I could not understand that. Please try again.";
        console.log('Sanitized bot response:', botMessageText); // Log sanitized response

        const botMessage = { id: (Date.now() + 1).toString(), sender: 'fitz', text: botMessageText };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error communicating with chatbot:', error);
        const errorMessage = { id: (Date.now() + 2).toString(), sender: 'fitz', text: 'Sorry, something went wrong. Please try again.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // Hide loading bubbles
      }
    }
  };

  const renderMessage = ({ item }: { item: { id: string; sender: string; text: string } }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'fitz' ? styles.fitzBubble : styles.userBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const renderLoadingBubbles = () => (
    <View style={styles.loadingContainer}>
      {[0, 1, 2].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.loadingBubble,
            {
              opacity: loadingAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
              transform: [
                {
                  scale: loadingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.pageBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.container}>
          <View style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Chat with Fitz
            </ThemedText>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <SolarQuestion color="#FFFFFF" height={32} width={32} />
            </TouchableOpacity>
          </View>
          {dropdownVisible && (
            <View style={styles.dropdownOverlay}>
              <Text style={styles.dropdownText}>
                Say hey to Fitz — your smart, stylish, and seriously supportive
                AI fashion assistant. Fitz is here to help you feel good, look
                good, and learn about your style along the way.
              </Text>
            </View>
          )}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContainer}
          />
          {isLoading && renderLoadingBubbles()}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#808080"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: "#141617",
    paddingTop: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#141617",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#141617",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2d2e2e",
    padding: 12,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownButton: {
    backgroundColor: "#4361EE",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 80,
    left: 16,
    right: 16,
    backgroundColor: "#2d2e2e",
    padding: 16,
    borderRadius: 10,
    zIndex: 10,
    elevation: 5,
  },
  dropdownText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
  },
  fitzBubble: {
    backgroundColor: "#4361EE",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#2d2e2e",
    alignSelf: "flex-end",
  },
  messageText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#2d2e2e",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 56,
    color: "#FFFFFF",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#FFFFFF", // Changed text color to white
  },
  sendButton: {
    backgroundColor: "#4361EE",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingBubble: {
    width: 10,
    height: 10,
    backgroundColor: '#4361EE',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});