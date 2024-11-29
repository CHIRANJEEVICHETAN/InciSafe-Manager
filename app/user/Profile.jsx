import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, storage } from "./../../configs/FirebaseConfig";

const ProfileField = ({
  icon,
  label,
  value,
  style,
  labelStyle,
  valueStyle,
  iconStyle,
}) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      <FontAwesome
        name={icon}
        size={24}
        color="black"
        style={[styles.icon, iconStyle]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      </View>
    </View>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    userId: "",
    dob: "",
    email: "",
    contact: "",
    altContact: "",
    role: "",
    address: "",
    profileURL: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userRef = doc(db, "users", user.uid); // Assuming users are stored in a 'users' collection
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData({
            ...userData,
            ...userDoc.data(), // Spread existing data
          });
        } else {
          Alert.alert("No user data found!");
        }
      } else {
        Alert.alert("User is not authenticated!");
      }
    };

    fetchUserData();
  }, []);

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      {Platform.OS === "ios" && (
        <View style={{ height: 20, backgroundColor: "transparent" }} />
      )}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Image
            source={require("./../../assets/images/back-button.png")}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.separator} />
        <View style={styles.profileIconContainer}>
          {userData.profileURL ? (
            <Image
              source={{ uri: userData.profileURL }}
              style={{ width: 85, height: 85, borderRadius: 42.5 }}
            />
          ) : (
            <FontAwesome name="user-circle" size={85} color="#000000" />
          )}
        </View>
        <ProfileField
          icon="user"
          label="Username"
          value={userData.username || "N/A"}
          style={styles.usernameField}
          labelStyle={styles.usernameLabel}
          valueStyle={styles.usernameValue}
          iconStyle={styles.usernameIcon}
        />
        <ProfileField
          icon="id-card"
          label="User-ID"
          value={userData.userId || "N/A"}
          style={styles.userIdField}
        />
        <ProfileField
          icon="calendar"
          label="Date of Birth"
          value={userData.dob || "N/A"}
          style={styles.dobField}
          labelStyle={styles.dobLabel}
          valueStyle={styles.dobValue}
          iconStyle={styles.dobIcon}
        />
        <ProfileField
          icon="envelope"
          label="Email"
          value={userData.email || "N/A"}
          style={styles.emailField}
        />
        <ProfileField
          icon="phone"
          label="Contact No"
          value={userData.contact || "N/A"}
          style={styles.contactField}
          labelStyle={styles.contactLabel}
          valueStyle={styles.contactValue}
          iconStyle={styles.contactIcon}
        />
        <ProfileField
          icon="phone"
          label="Alternate Mobile"
          value={userData.altContact || "N/A"}
          style={styles.altContactField}
          labelStyle={styles.altContactLabel}
          valueStyle={styles.altContactValue}
          iconStyle={styles.altContactIcon}
        />
        <ProfileField
          icon="user-secret"
          label="Role"
          value={userData.role || "N/A"}
          style={styles.roleField}
          labelStyle={styles.roleLabel}
          valueStyle={styles.roleValue}
          iconStyle={styles.roleIcon}
        />
        <ProfileField
          icon="map-marker"
          label="Address"
          value={userData.address || "N/A"}
          style={[styles.addressField, { height: 80 }]}
          labelStyle={[styles.addressLabel, { marginTop: -10 }]}
          valueStyle={styles.addressValue}
          iconStyle={styles.addressIcon}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  separator: {
    height: 1.8,
    width: "100%",
    backgroundColor: "#ccc",
    marginBottom: 30,
    marginTop: -20,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    height: 55,
    marginBottom: 7,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 7,
  },
  value: {
    color: "gray",
    fontSize: 16,
    marginLeft: 7,
    marginTop: 3,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: -20,
    position: "relative",
    right: 0,
    top: 10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    marginTop: -20,
  },
  // Add other styles as needed...
});

export default ProfilePage;
