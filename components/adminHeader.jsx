import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoSVG from "./../components/LogoSVG";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const AdminHeader = ({ style }) => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user.displayName : "admin"); // Check if user is not null
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.header, style]}>
      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.greeting}>Hello! {user ? user : "User"} </Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/admin/adminScreens/adminSettings");
          }}
          style={styles.menuIcon}
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    height: 100,
  },
  logoContainer: {
    marginLeft: -70,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    transformOrigin: "center",
    transform: [{ scale: 0.3 }],
    marginRight: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: -112,
    marginTop: 8,
  },
  menuIcon: {
    marginRight: 10,
    marginTop: 10,
  },
});

export default AdminHeader;
