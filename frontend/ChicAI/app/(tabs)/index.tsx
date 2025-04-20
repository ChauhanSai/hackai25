import { Image, StyleSheet, Platform, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import Svg, { Path, Circle, SvgProps } from "react-native-svg";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const getCityImage = async (cityName: string) => {
  try {
    const apiUrl = `https://api.unsplash.com/search/photos?client_id=sc77PzhtrkJ2wdHzAomI13AIuy4jaS3dbDpKUPmpnE4&query=${cityName}&collections=917009,Fa8XQGFy5PA,wyuGybuJGjI,mHWiMKGI0go&page=1&per_page=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results[0]) {
      return data.results[0].urls.regular;
    } else {
      return "https://picsum.photos/id/67/200/100";
      //return "https://picsum.photos/id/43/200/100";
    }
  } catch (error) {
    console.error("Error in getCityImage:", error);
    return "https://picsum.photos/id/67/200/100";
    //return "https://picsum.photos/id/43/200/100";
  }
};

export function SolarUser(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15s-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export function SolarClose(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
      ></Path>
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

import React, { useState, useEffect } from 'react';

export default function HomeScreen() {
  const [cityImage, setCityImage] = useState("https://picsum.photos/id/67/200/100");
  const [tooltipVisible, setTooltipVisible] = useState(true); // State to control tooltip visibility

  const mockPosts = [
    {
      id: 1,
      username: "minjlee",
      color: "#43ee6e",
    },
    {
      id: 2,
      username: "allenzheng",
      color: "#ee4343",
    },
    {
      id: 3,
      username: "inacheah",
      color: "#eedd43",
    },
    {
      id: 4,
      username: "linhnguyen",
      color: "#437cee",
    },
  ];

  const mockProfileImages: { [key: number]: any } = {
    1: require('@/assets/images/profiles/user1.jpg'),
    2: require('@/assets/images/profiles/user2.jpg'),
    3: require('@/assets/images/profiles/user3.jpg'),
    4: require('@/assets/images/profiles/user4.jpg'),
  };

  useEffect(() => {
    const fetchCityImage = async () => {
      const image = await getCityImage("Dallas");
      setCityImage(image);
    };
    fetchCityImage();
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#4361EE", dark: "#2b3976" }}
      headerImage={
        <Image source={{ uri: cityImage }} style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, User!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {tooltipVisible && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>
              This is your personalized dashboard. See your friend's outfit of
              the day and enjoy! Head over to nav bar to share your fit or head
              to Fitz to chat with your personal assistant.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTooltipVisible(false)}
            >
              <SolarClose color="#4361EE" width={32} height={32} />
            </TouchableOpacity>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.postContainer}
        >
          {mockPosts.map((post) => (
            <View key={post.id} style={styles.post}>
              <View style={styles.postHeader}>
                <View style={styles.iconContainer}>
                  <SolarUser color={post.color} width={32} height={32} />
                </View>
                <Text style={styles.username}>{post.username}</Text>
              </View>
              <Image
                source={mockProfileImages[post.id]} // Use the mapping object
                style={styles.postImage}
              />
            </View>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  tooltip: {
    backgroundColor: "#4361EE",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    marginLeft: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16, // Make it circular
    width: 32, // Set width and height to make it a circle
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#4361EE",
    fontWeight: "bold",
    fontSize: 12,
  },
  postContainer: {
    marginTop: 16,
  },
  post: {
    marginBottom: 26, // Add spacing between posts
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    borderRadius: 16,
    overflow: "hidden",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#141617",
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 500,
    borderRadius: 16, 
  },
});
