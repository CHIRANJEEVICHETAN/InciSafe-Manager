import { registerRootComponent } from 'expo';
import { firebaseConfig } from './../configs/FirebaseConfig';
import { initializeApp, getApps } from "firebase/app";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import App from "./../components/App";
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import crashlytics from '@react-native-firebase/crashlytics'; // Import Crashlytics
import getConfig from "./../configs/config";

// Initialize Firebase immediately
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const { BASE_URL } = getConfig();

  useEffect(() => {
    const initializeFirebaseServices = async () => {
      try {
        // Ensure Firebase is initialized
        if (getApps().length === 0) {
          initializeApp(firebaseConfig);
        }

        // Initialize other Firebase services
        await messaging().registerDeviceForRemoteMessages();

        console.log('Initializing Crashlytics');

        try {
          await crashlytics().setCrashlyticsCollectionEnabled(true);
          crashlytics().log('App started');
        } catch (error) {
          console.error('Failed to initialize Crashlytics:', error);
        }

        setIsFirebaseReady(true);

        // Rest of your initialization logic
        const checkUserState = async () => {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        };
        await checkUserState();

        const requestUserPermission = async () => {
          const settings = await notifee.requestPermission();
          if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log("Permission settings:", settings);
          } else {
            console.log("User declined notification permission");
          }
        };
        await requestUserPermission();

        const subscribeToTopic = async () => {
          try {
            await messaging().subscribeToTopic("all_users");
            console.log("Subscribed to all users topic");
          } catch (error) {
            console.error("Error subscribing to all users topic:", error);
            crashlytics().recordError(error as Error); // Log error to Crashlytics
          }
        };
        await subscribeToTopic();

        const createNotificationChannel = async () => {
          await notifee.createChannel({
            id: "default",
            name: "Default Channel",
            importance: AndroidImportance.HIGH,
            sound: "default",
          });
        };
        await createNotificationChannel();

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

        const sendTokenToBackend = async (token: string) => {
          try {
            const response = await fetch(`${BASE_URL}/storeFCMToken`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
            if (!response.ok) {
              throw new Error('Failed to send FCM token to backend');
            }
            console.log('FCM token sent to backend successfully');
          } catch (error) {
            console.error('Error sending FCM token to backend:', error);
            crashlytics().recordError(error as Error); // Log error to Crashlytics
          }
        };

        const getToken = async () => {
          try {
            const token = await messaging().getToken();
            console.log("FCM Token:", token);
            await sendTokenToBackend(token);
          } catch (error) {
            console.error("Error getting FCM token:", error);
            crashlytics().recordError(error as Error); // Log error to Crashlytics
          }
        };
        await getToken();

        const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async token => {
          console.log("FCM Token refreshed:", token);
          await sendTokenToBackend(token);
        });

        return () => {
          unsubscribeOnMessage();
          if (typeof unsubscribeOnBackgroundEvent === 'function') {
            unsubscribeOnBackgroundEvent();
          }
          unsubscribeOnTokenRefresh();
        };
      } catch (error) {
        console.error("Error initializing Firebase services:", error);
        crashlytics().recordError(error as Error); // Log error to Crashlytics
        setIsFirebaseReady(true); // Set to true even on error to allow the app to proceed
      }
    };

    initializeFirebaseServices();
  }, []);

  if (!isFirebaseReady) {
    // You might want to show a loading indicator here
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'/user/Home'} /> : <App />}
    </View>
  );
}

export default function index() {
  return <AppWrapper />;
}

registerRootComponent(index);