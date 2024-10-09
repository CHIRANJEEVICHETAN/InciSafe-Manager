import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ToastAndroid } from "react-native";
import { useRouter } from "expo-router"; // for navigation
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase auth
import { Colors } from "../../../constants/Colors"; // for color constants

export default function AdminLogin() {
  const router = useRouter();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onAdminLogin = async () => {
    if (email === "" || password === "") {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.LONG);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/adminHome"); // Redirect to admin home page
      })
      .catch((error) => {
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button">
        <Image source={require("./../../../assets/images/back-button.png")} style={styles.backButtonImage} />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome ! Log in to InciSafe</Text>
      <Text style={styles.subtitle}>Login as Admin</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
        <Image source={require("./../../../assets/images/email.png")} style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)}
        />
        <Image source={require("./../../../assets/images/eye-shape.png")} style={styles.inputIcon} />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={onAdminLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require("./../../../assets/images/InciSafeLogo.png")} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#B0E0E6",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
    position: "relative",
    top: 10,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    marginTop: 15,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter-ExtraBold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    width: "90%",
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  inputIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
  },
  forgotPassword: {
    color: "blue",
    marginBottom: 20,
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "InstrumentSans-Bold",
    fontSize: 18,
  },
  logoContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});