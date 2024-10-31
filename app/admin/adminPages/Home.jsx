import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import AdminHeader from "./../../../components/adminHeader";
import SearchBar from "./../../../components/SearchBar";
import LineSVG from "./../../../components/LineSVG";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import useLoadFont from "./../../../hooks/useLoadFont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "./../../../configs/FirebaseConfig";

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            if (userRole !== "admin") {
              router.push("/user/Home");
            }
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
        }
      } else {
        router.replace("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("./../../../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <AdminHeader
          username={auth.currentUser?.displayName || "User"}
          style={styles.header}
        />
        <LineSVG style={styles.line} />
        <SearchBar style={styles.searchBar} />

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/admin/adminScreens/Dashboard")}
          >
            <MaterialCommunityIcons name="chart-box" size={50} color="black" />
            <Text style={styles.menuText}>DASHBOARD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push("/admin/adminScreens/incidentManagement")
            }
          >
            <MaterialCommunityIcons
              name="file-document"
              size={50}
              color="black"
            />
            <Text style={styles.menuText}>INCIDENT-MANAGEMENT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("user/Home")}
          >
            <MaterialCommunityIcons name="view-grid" size={50} color="black" />
            <Text style={styles.menuText}>CATEGORY</Text>
          </TouchableOpacity>
        </View>
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
    padding: 10,
  },
  header: {
    padding: 10,
    color: "red",
  },
  line: {
    marginBottom: 10,
    marginTop: -6,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.8,
    height: 160,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
