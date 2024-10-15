import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ChangePasswordPage = () => {
  const router = useRouter();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleReEnterPasswordVisibility = () =>
    setShowReEnterPassword(!showReEnterPassword);

  const handleConfirm = () => {
    console.log("Confirm button pressed");
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
        <Text style={styles.title}>Change Password</Text>
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
            placeholder="Email-ID"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.fieldContainer}>
          <FontAwesome
            name="lock"
            size={30}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Current Password"
            placeholderTextColor="#888"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity onPress={toggleCurrentPasswordVisibility}>
            <FontAwesome
              name={showCurrentPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <FontAwesome
            name="lock"
            size={30}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="New Password"
            placeholderTextColor="#888"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={toggleNewPasswordVisibility}>
            <FontAwesome
              name={showNewPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <FontAwesome
            name="lock"
            size={30}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Re-enter Password"
            placeholderTextColor="#888"
            secureTextEntry={!showReEnterPassword}
          />
          <TouchableOpacity onPress={toggleReEnterPasswordVisibility}>
            <FontAwesome
              name={showReEnterPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>Confirm</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 15,
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
    marginBottom: 20,
    marginTop: 15,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1.5,
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
  eyeIcon: {
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
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
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 5,
    top: 10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    marginTop: 15,
    zIndex: 1000,
  },
});

export default ChangePasswordPage;
