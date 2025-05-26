import { registerRootComponent } from 'expo';
import { firebaseConfig } from './../configs/FirebaseConfig';
import { initializeApp, getApps } from "firebase/app";
import { View, Alert, Platform, AppState, ToastAndroid, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import App from "./../components/App";
import { Redirect } from "expo-router";
import messaging from "@react-native-firebase/messaging";
import crashlytics from '@react-native-firebase/crashlytics';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from "@notifee/react-native";

// Initialize Firebase immediately
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Create notification channel with enhanced configuration
const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
    vibrationPattern: [300, 500],
    lights: true,
    lightColor: 'red',
    description: 'Receives all important notifications',
    badge: true,
  });

  // Create a separate channel for PDF notifications
  await notifee.createChannel({
    id: "pdf_notifications",
    name: "PDF Reports",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
    description: 'Notifications for PDF reports and documents',
  });
};

// Enhanced error handling for file operations
const handleFileOpen = async (filePath: string, fileName?: string) => {
  try {
    const fileUri = filePath.startsWith('file://') ? filePath : `file://${filePath}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      throw new Error('FILE_NOT_FOUND');
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/pdf',
        dialogTitle: `Open ${fileName || 'PDF Report'}`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      throw new Error('SHARING_UNAVAILABLE');
    }
  } catch (error: unknown) {
    crashlytics().log('File operation failed');
    if (error instanceof Error) {
      crashlytics().recordError(error);
      
      const errorMessage = error.message === 'FILE_NOT_FOUND' 
        ? 'The requested file was not found'
        : error.message === 'SHARING_UNAVAILABLE'
        ? 'Cannot open PDF. Please install a PDF viewer.'
        : 'Error opening PDF file';
        
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      console.error('File operation error:', error);
    }
  }
};

// Add notification response handler with improved error handling
Notifications.addNotificationResponseReceivedListener(async (response) => {
  const { filePath, fileName } = response.notification.request.content.data || {};
  console.log('Notification data:', response.notification.request.content.data);
  
  if (filePath) {
    await handleFileOpen(filePath, fileName);
  } else {
    console.log('No file path in notification data');
    ToastAndroid.show('Error: No file path found', ToastAndroid.LONG);
  }
});

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState<boolean>(false);

  const requestMicrophonePermission = async () => {
    try {
      console.log('Starting microphone permission request flow...');

      // First check if we already have permission
      const { status: existingStatus } = await Audio.getPermissionsAsync();
      console.log('Existing permission status:', existingStatus);

      if (existingStatus === 'granted') {
        console.log('Microphone permission already granted');
        setMicrophonePermission(true);
        return true;
      }

      // Only request if we don't already have permission
      console.log('Requesting microphone permission...');
      const { status } = await Audio.requestPermissionsAsync();
      console.log('Permission request result:', status);

      if (status !== 'granted') {
        console.log('Permission denied. Showing settings alert...');
        Alert.alert(
          'Microphone Permission Required',
          'Voice recording requires microphone access. Please enable it in your device settings.',
          [
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              }
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                console.log('User cancelled settings navigation');
              }
            }
          ],
          { cancelable: false }
        );
        setMicrophonePermission(false);
        return false;
      }

      // Permission granted
      console.log('Microphone permission granted successfully');
      setMicrophonePermission(true);
      return true;
    } catch (error) {
      console.error('Error in requestMicrophonePermission:', error);
      crashlytics().recordError(error as Error);
      setMicrophonePermission(false);
      return false;
    }
  };

  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Request microphone permission first, before other initializations
        console.log('Initializing services - requesting microphone permission first');
        const micPermissionResult = await requestMicrophonePermission();
        console.log('Microphone permission result:', micPermissionResult);

        // Initialize Firebase if not already initialized
        if (getApps().length === 0) {
          initializeApp(firebaseConfig);
        }
        console.log('Firebase initialized');

        // Initialize Audio Session
        if (micPermissionResult) {
          try {
            console.log('Initializing audio session...');
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            console.log('Audio session initialized successfully');
          } catch (error) {
            console.error('Error initializing audio session:', error);
            crashlytics().recordError(error as Error);
          }
        }

        // Initialize Firebase services
        await messaging().registerDeviceForRemoteMessages();

        // Request notification permission
        const authStatus = await messaging().requestPermission();
        console.log('Permission settings:', authStatus);

        // Initialize Crashlytics
        console.log('Initializing Crashlytics');
        try {
          await crashlytics().setCrashlyticsCollectionEnabled(true);
          crashlytics().log('App started');
        } catch (error) {
          console.error('Failed to initialize Crashlytics:', error);
        }

        setIsFirebaseReady(true);

        // Check user state
        const checkUserState = async () => {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        };
        await checkUserState();

        // Request notification permissions
        const requestUserPermission = async () => {
          const settings = await notifee.requestPermission();
          if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log("Permission settings:", settings);
          } else {
            console.log("User declined notification permission");
          }
        };
        await requestUserPermission();

        // Subscribe to topic
        const subscribeToTopic = async () => {
          try {
            await messaging().subscribeToTopic("all_users");
            console.log("Subscribed to all users topic");
          } catch (error) {
            console.error("Error subscribing to all users topic:", error);
            crashlytics().recordError(error as Error);
          }
        };
        await subscribeToTopic();

        // Create notification channel
        await createNotificationChannel();

        // Set up message handlers
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

        // Set up background event handler
        notifee.onBackgroundEvent(async ({ type, detail }) => {
          console.log("Background event handled", type, detail);
          if (type === EventType.PRESS) {
            console.log("Notification pressed in background", detail.notification);
          }
        });

        return () => {
          unsubscribeOnMessage();
        };
      } catch (error) {
        console.error("Error initializing services:", error);
        crashlytics().recordError(error as Error);
        setIsFirebaseReady(true);
        return () => { };
      }
    };

    initializeServices();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active' && !microphonePermission) {
        // Check existing permissions first
        const { status } = await Audio.getPermissionsAsync();
        if (status !== 'granted') {
          requestMicrophonePermission();
        } else {
          setMicrophonePermission(true);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [microphonePermission]);

  if (!isFirebaseReady) {
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

