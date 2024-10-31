import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "./../../../configs/FirebaseConfig";



export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;


  const fetchNotifications = async () => {
    setLoading(true);
    const allNotifications = [];

    try {
      console.log("Fetching notifications from adminNotifications collection...");

      const adminNotificationsRef = collection(db, "adminNotifications");
      const snapshot = await getDocs(adminNotificationsRef);
      console.log("Fetched adminNotifications collection:", snapshot);

      // Loop through each document in the 'adminNotifications' collection
      snapshot.forEach(doc => {
        const notificationData = doc.data();
        console.log("Notification data:", notificationData);

        allNotifications.push({
          title: notificationData.title,
          body: notificationData.body,
          username: notificationData.username,
          timestamp: notificationData.timestamp
        });
      });

      // Sort notifications by timestamp (newest first) if timestamp is present
      allNotifications.sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis());
      console.log("All notifications after sorting:", allNotifications);

      setNotifications(allNotifications);

      // Store notifications offline
      await AsyncStorage.setItem('adminNotifications', JSON.stringify(allNotifications));
      console.log("Notifications saved to AsyncStorage.");

    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
      console.log("Finished fetching notifications.");
    }
  };



  useEffect(() => {
    fetchNotifications();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("./../../../assets/images/background.jpg")}
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
              source={require("./../../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <ScrollView style={styles.notificationContainer}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationItem}>
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
                <Text style={styles.notificationBody}>
                  {notification.body}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchNotifications}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
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
    width: "100%",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    // width: "100%",
    // backgroundColor: "red",
  },
  notificationSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  daysAgo: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  refreshButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  refreshButtonText: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationBody: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
