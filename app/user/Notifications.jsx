import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating receiving notifications
    // const interval = setInterval(() => {
    //   addNotification();
    // }, 1000); // Add a new notification every 5 seconds for demonstration

    return () => clearInterval(interval);
  }, []);

  const addNotification = () => {
    const newNotification = {
      id: Date.now(),
      title: `New Incident ${Math.floor(Math.random() * 100)}`,
      reporter: ["JOHN", "JAMES", "ROBOTO", "ANNIE", "JAY", "SAI"][
        Math.floor(Math.random() * 6)
      ],
      daysAgo: Math.floor(Math.random() * 20) + 1,
    };
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require("./../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <ScrollView style={styles.notificationContainer}>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationItem}>
              <Ionicons
                name="person-outline"
                size={24}
                color="white"
                style={styles.icon}
              />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationSubtitle}>
                  reported by {notification.reporter}
                </Text>
              </View>
              <Text style={styles.daysAgo}>
                {notification.daysAgo} days ago
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAllNotifications}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -25,
    borderBottomWidth: 1.8,
    borderColor: "rgba(255, 255, 255, 0.3)",
    height: 80,
  },
  headerText: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  notificationContainer: {
    flex: 1,
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: {
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  notificationSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  daysAgo: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  clearButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 80,
    top: 7,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
});
