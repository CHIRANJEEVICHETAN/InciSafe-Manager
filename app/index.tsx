import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import App from "./../components/App";
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

export default function index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserState = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkUserState();

    async function requestUserPermission() {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log("Permission settings:", settings);
      } else {
        console.log("User declined notification permission");
      }
    }
    requestUserPermission();

    // Subscribe to user topic
    const subscribeToTopic = async () => {
      try {
        await messaging().subscribeToTopic("all_users");
        console.log("Subscribed to all users topic");
      } catch (error) {
        console.error("Error subscribing to all users topic:", error);
      }
    };
    subscribeToTopic();

    // Create notification channel
    const createNotificationChannel = async () => {
      await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
        sound: "default",
      });
    };
    createNotificationChannel();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log("Notification Foreground received", remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || "Incisafe Notification",
        body: remoteMessage.notification?.body || "New notification",
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
          sound: "default",
          pressAction: {
            id: "default",
          },
        },
      });
    });

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background!", remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || "Incisafe",
        body: remoteMessage.notification?.body || "New notification",
        android: {
          channelId: "default",
          importance: AndroidImportance.HIGH,
          sound: "default",
          pressAction: {
            id: "default",
          },
        },
      });
    });

    const unsubscribeOnBackgroundEvent = notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log("Background event handled", type, detail);
      if (type === EventType.PRESS) {
        console.log("Notification pressed in background", detail.notification);
      }
    });

    // Request FCM token
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        // You can send this token to your server to send push notifications
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };
    getToken();

    // Handle token refresh
    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
      console.log("FCM Token refreshed:", token);
      // Update your server with the new token
    });

    return () => {
      unsubscribeOnMessage();
      if (typeof unsubscribeOnBackgroundEvent === 'function') {
        unsubscribeOnBackgroundEvent();
      }
      unsubscribeOnTokenRefresh();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={'/user/Home'} /> : <App />}
    </View>
  );
}
