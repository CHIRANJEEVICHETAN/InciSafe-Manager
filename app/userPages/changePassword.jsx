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
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleReEnterPasswordVisibility = () =>
    setShowReEnterPassword(!showReEnterPassword);

  const handleConfirm = async () => {
    if (newPassword !== reEnterPassword) {
      alert("New passwords do not match!");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user && email === user.email) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setReEnterPassword("");
        setEmail("");
        router.replace("/");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Error updating password. Please try again.");
      }
    } else {
      alert("Incorrect email or user not authenticated.");
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
            value={email}
            onChangeText={setEmail}
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
            value={currentPassword}
            onChangeText={setCurrentPassword}
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
            value={newPassword}
            onChangeText={setNewPassword}
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
            value={reEnterPassword}
            onChangeText={setReEnterPassword}
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
  eyeIcon: {
    marginRight: 5,
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

export default ChangePasswordPage;
