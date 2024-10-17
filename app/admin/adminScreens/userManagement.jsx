import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { db } from "./../../../configs/FirebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import LogoSVG from "../../../components/LogoSVG";
import getConfig from "./../../../configs/config";
import { useRouter } from "expo-router";
import LineSVG from "../../../components/LineSVG";

export default function UserManagement({ navigation }) {
  const router = useRouter();
  const { BASE_URL } = getConfig();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);

      // Map Firebase user data to the users state
      const firebaseUsers = userSnapshot.docs.map((doc) => ({
        uid: doc.id,
        displayName: doc.data().displayName || doc.data().email.split("@")[0],
        email: doc.data().email,
        createdAt: doc.data().createdAt?.toDate(),
      }));

      // Update users state with data from Firebase
      setUsers(firebaseUsers);
    } catch (error) {
      console.error("Error fetching users from Firebase:", error);
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    try {
      // Clear local cache before fetching new data
      setUsers([]); // Correctly reset users state to an empty array
      await fetchUsers(); // Fetch fresh users from Firebase
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const removeUser = async (uid) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      });

      if (response.ok) {
        await deleteDoc(doc(db, "users", uid));
        // Filter the user out of the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
        Alert.alert("Success", "User removed successfully");
      } else {
        const errorData = await response.json();
        if (errorData.errorInfo?.code === "auth/user-not-found") {
          console.warn("User not found in Firebase, removing locally.");
          // Remove locally if user is not found in Firebase
          setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
          Alert.alert("Info", "User not found in Firebase, removed locally.");
        } else {
          console.error("Failed to remove user:", errorData);
        }
      }
    } catch (error) {
      console.error("Error removing user:", error);
    } finally {
      setLoading(false); // Stop loading after operation
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.idcell}>{String(index + 1).padStart(3, "0")}</Text>
      <Text style={styles.cell}>{item.displayName || "N/A"}</Text>
      <Text style={styles.emailCell}>{item.email || "N/A"}</Text>
      <Text style={styles.cell}>
        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
      </Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeUser(item.uid)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../../assets/images/back-button.png")}
      style={styles.backgroundImage}
    >
      <LinearGradient colors={["#a8f0d0", "#a8e0f0"]} style={styles.container}>
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
          <View style={styles.titleContainer}>
            {/* <Ionicons name="people" size={24} color="black" /> */}
            <FontAwesome6
              name="users-rectangle"
              size={26}
              color="black"
              style={{ marginTop: 5, marginLeft: 5 }}
            />
            <Text style={styles.title}>User Management</Text>
          </View>
        </View>
        <LogoSVG style={styles.logo} />
        <TouchableOpacity
          onPress={refreshUserData}
          style={styles.refreshButton} // Change 'styles' to 'style'
        >
          <Text>Refresh Users</Text>
        </TouchableOpacity>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerIdCell}>ID</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerEmailCell}>Email</Text>
            <Text style={styles.headerCell}>Joined</Text>
            <Text style={styles.headerCell}>Action</Text>
          </View>
          {/* Conditionally render ActivityIndicator when loading */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={{ flexGrow: 1 }} // Ensure scrolling
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 15,
  },
  tableContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flex: 1, // Ensures the container takes up available space
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerIdCell: {
    flex: 0.5,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerEmailCell: {
    flex: 1.5,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  idcell: {
    flex: 0.5,
    textAlign: "center",
  },
  emailCell: {
    flex: 1.5,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a slight background
  },
  backButton: {
    alignSelf: "flex-start",
    // marginTop: 10,
    // marginBottom: -10,
    position: "absolute",
    left: 18,
    top: -8,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 23,
    zIndex: 1000,
  },
  logo: {
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 10,
    transform: [{ scale: 1.15 }],
  },
  refreshButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
