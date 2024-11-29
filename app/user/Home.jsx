import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Header from "./../../components/Header";
import SearchBar from "./../../components/SearchBar";
import IconGrid from "./../../components/IconGrid";
import LineSVG from "./../../components/LineSVG";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import useLoadFont from "./../../hooks/useLoadFont";
import { db } from "./../../configs/FirebaseConfig";
import getConfig from './../../configs/config';
import messaging from "@react-native-firebase/messaging";
import crashlytics from "@react-native-firebase/crashlytics";


const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { BASE_URL } = getConfig();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            setRole(userRole);
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    if (!user) return;

    const sendTokenToBackend = async (token, uid) => {
      try {
        const response = await fetch(`${BASE_URL}/storeFCMToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, uid }),
        });
        if (!response.ok) {
          throw new Error('Failed to send FCM token to backend');
        }
        console.log('FCM token sent to backend successfully');
      } catch (error) {
        console.error('Error sending FCM token to backend:', error);
        crashlytics().recordError(error); // Log error to Crashlytics
      }
    };

    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        await sendTokenToBackend(token, user.uid);
      } catch (error) {
        console.error("Error getting FCM token:", error);
        crashlytics().recordError(error); // Log error to Crashlytics
      }
    };
    getToken();

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async token => {
      try {
        console.log("FCM Token refreshed:", token);
        await sendTokenToBackend(token, user.uid);
      } catch (error) {
        console.error("Error handling token refresh:", error);
        crashlytics().recordError(error); // Log error to Crashlytics
      }
    });

    return () => unsubscribeOnTokenRefresh();
  }, [user, BASE_URL]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    >
      <ImageBackground
        source={require("./../../assets/images/background.jpg")}
        style={styles.backgroundImage}
      >
        {/* This view is used to simulate the background of the status bar on iOS */}
        {Platform.OS === "ios" && (
          <View style={{ height: 20, backgroundColor: "transparent" }} />
        )}
        {/* StatusBar configuration */}
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.container}>
          <Header username={user?.displayName || "User"} style={styles.header} />
          <LineSVG style={styles.line} />
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />
          {role === "admin" && (
            <TouchableOpacity
              onPress={() => {
                router.push("/admin/adminPages/Home");
              }}
              style={styles.adminButton}
            >
              <Text style={styles.adminText}>admin Page</Text>
            </TouchableOpacity>
          )}
          <IconGrid
            style={styles.iconGrid}
            searchQuery={searchQuery}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 10,
    color: "red",
  },
  line: {
    marginBottom: 10,
    marginTop: -6,
  },
  iconGrid: {
    marginTop: height * 0.1,
    width: '90%',
    alignSelf: 'center',
    transform: [{ scale: width < 380 ? 0.9 : width > 600 ? 1.3 : 1.2 }],
  },
  adminButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    height: 40,
    width: 120,
    borderRadius: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 120,
    zIndex: 1000,
  },
  adminText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
