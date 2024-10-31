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

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
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
        <SearchBar />
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
        <IconGrid style={styles.iconGrid} />
      </View>
    </ImageBackground>
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
    marginTop: 80,
    transform: [{ scale: 1.2 }],
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
    bottom: 10,
  },
  adminText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Home;
