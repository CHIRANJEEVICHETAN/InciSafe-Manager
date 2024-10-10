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
import Header from "./../../../components/Header";
import SearchBar from "./../../../components/SearchBar";
import LineSVG from "./../../../components/LineSVG";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import signOut
import useLoadFont from "./../../../hooks/useLoadFont";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  return (
    <ImageBackground
      source={require("./../../../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Header username={user?.displayName || "User"} style={styles.header} />
        <LineSVG style={styles.line} />
        <SearchBar style={styles.searchBar} />

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/adminDashboard")}
          >
            <MaterialCommunityIcons
              name="view-dashboard"
              size={50}
              color="black"
            />
            <Text style={styles.menuText}>DASHBOARD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/incidentReports")}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={50}
              color="black"
            />
            <Text style={styles.menuText}>INCIDENT-MANAGEMENT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/category")}
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
    height: 100,
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
});

export default Home;
