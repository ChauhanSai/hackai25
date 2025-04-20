import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Svg, { Path, Circle, SvgProps } from "react-native-svg";

export function SolarArrow(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
        <Path
          fill="currentColor"
          d="m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202"
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

export default function TabTwoScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(true); // State to control tooltip visibility

  const mockOutfits = [
    {
      id: 1,
      date: "4/18/24 10:37 AM",
      uuid: "2750b121-388c-49b0-9a6e-8ab58929d62b",
    },
    {
      id: 2,
      date: "11/19/24 7:39 PM",
      uuid: "e21748ce-9b87-4bbb-aa85-911a6eac14b2",
    },
    {
      id: 3,
      date: "10/31/24 9:53 AM",
      uuid: "ae167e98-4738-4455-8f59-bfac7a01f935",
    },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "upload.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View style={styles.pageBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer} // Add padding and alignment
        >
          <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
            <Text style={styles.uploadText}>Tap to upload an image</Text>
          </TouchableOpacity>
          {tooltipVisible && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                Press above to upload your outfit of the day! Then, ChicAI will
                add your clothing garments to your virtual closet so you can mix
                and match outfits!
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setTooltipVisible(false)}
              >
                <SolarClose color="#4361EE" width={32} height={32} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.postContainer}>
            {mockOutfits.map((outfit) => (
              <View key={outfit.id} style={styles.post}>
                <View style={styles.postRow}>
                  <Image
                    source={{
                      uri: `/Users/saichauhan/Desktop/HackAI25/hackai25/backend/outfits/${outfit.uuid}/upload.jpg`,
                    }}
                    style={styles.uploadImage}
                  />
                  <View style={styles.rightColumn}>
                    <Image
                      source={{
                        uri: `/Users/saichauhan/Desktop/HackAI25/hackai25/backend/outfits/${outfit.uuid}/top.png`,
                      }}
                      style={styles.squareImageTop}
                    />
                    <Image
                      source={{
                        uri: `/Users/saichauhan/Desktop/HackAI25/hackai25/backend/outfits/${outfit.uuid}/bottom.png`,
                      }}
                      style={styles.squareImageBottom}
                    />
                  </View>
                </View>
                <View style={styles.postHeader}>
                  <View style={styles.iconContainer}>
                    <SolarArrow color="#4361EE" width={32} height={32} />
                  </View>
                  <Text style={styles.username}>{outfit.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: "#141617",
    paddingTop: 0,
    padding: 28,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#141617",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  uploadContainer: {
    width: "40%",
    aspectRatio: 3 / 4,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    borderStyle: "dashed",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
    alignSelf: "center", // Center horizontally
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  tooltip: {
    backgroundColor: "#4361EE",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 32,
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
  postContainer: {
    marginTop: 16,
  },
  post: {
    marginBottom: 16, // Add spacing between posts
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    overflow: "hidden",
  },
  postRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  uploadImage: {
    width: "47.5%", // 60% of the width for the left image
    aspectRatio: 9 / 17,
    borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightColumn: {
    width: "47.5%", // 35% of the width for the right column
    justifyContent: "space-between",
    marginLeft: 10,
  },
  squareImageTop: {
    width: "90%",
    aspectRatio: 1, // 1:1 aspect ratio
    borderRadius: 10,
    borderTopRightRadius: 20,
    marginBottom: 8,
  },
  squareImageBottom: {
    width: "90%",
    aspectRatio: 1, // 1:1 aspect ratio
    borderRadius: 10,
    borderBottomRightRadius: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    paddingBottom: 8,
    backgroundColor: "#141617",
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 14,
    padding: 2,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32, // Add padding for better spacing
  },
});
