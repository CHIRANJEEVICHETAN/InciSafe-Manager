import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
      setEmail("");
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Error sending password reset email. Please try again.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.separator} />
        <View style={styles.profileIconContainer}>
          <FontAwesome name="lock" size={70} color="#000000" />
        </View>
        <View style={styles.fieldContainer}>
          <FontAwesome
            name="envelope"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your Email ID"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handlePasswordReset}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 25,
    justifyContent: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 35,
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
    marginBottom: 20,
    marginTop: 15,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 15,
    height: 60,
    marginBottom: 12,
  },
  icon: {
    marginRight: 15,
    marginLeft: 5,
  },
  inputField: {
    flex: 1,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#14AE5C",
    borderRadius: 40,
    padding: 15,
    flex: 0.48,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#dc2626",
    borderRadius: 40,
    padding: 15,
    flex: 0.48,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PasswordReset;
