import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import CustomSVG from "./../../../components/CustomSVG";  
import LogoSVG from "./../../../components/LogoSVG";
import { useFonts } from "expo-font";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function SignUp() {
  const auth = getAuth();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureConfirmText, setSecureConfirmText] = useState(true);
  const [secureText, setSecureText] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("./../../../assets/fonts/Inter/Inter_24pt-Regular.ttf"),
    "Inter-ExtraBold": require("./../../../assets/fonts/Inter/Inter_24pt-ExtraBold.ttf"),
    "Roboto-Bold": require("./../../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./../../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "InstrumentSans-Bold": require("./../../../assets/fonts/InstrumentSans/InstrumentSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Function to generate a unique 6-digit code based on the user UID
  const generateUserId = (userId) => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = (hash << 5) - hash + userId.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    const userIdNumber = Math.abs(hash) % 1000000; // Ensure it's always positive and up to 6 digits
    return userIdNumber.toString().padStart(6, "0");
  };

  const OnCreateAccount = async (email, password) => {
    // Validate empty fields
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      ToastAndroid.show("All fields are required", ToastAndroid.LONG);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Please enter a valid email address", ToastAndroid.LONG);
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      ToastAndroid.show("Password must be at least 6 characters long", ToastAndroid.LONG);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.LONG);
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, {
        displayName: username,
      });

      // Generate the unique 6-digit user ID based on user.uid
      const uniqueUserId = generateUserId(user.uid);

      // Store additional user information in Firestore with role as 'user'
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        role: "user",
        userId: uniqueUserId,
        createdAt: serverTimestamp(),
      });

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ uid: user.uid, role: "user" }));

      ToastAndroid.show("Account created successfully! Welcome to InciSafe.", ToastAndroid.LONG);
      router.push("/user/Home");
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = "An error occurred during signup. Please try again.";

      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please use a different email or try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid. Please check and try again.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled. Please contact support.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak. Please use a stronger password.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection and try again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
      }

      console.log("Error creating user:", errorCode, error.message);
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.mainTitle}>Welcome !</Text>
      <Text style={styles.secondaryTitle}>Create an account to continue</Text>

      <View style={styles.emailContainer}>
        <CustomSVG />
        <Text style={styles.emailText}>SignUp with Email</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
        />
        <Image
          source={require("./../../../assets/images/user.png")}
          style={styles.inputIcon}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
        />
        <Image
          source={require("./../../../assets/images/email.png")}
          style={styles.inputIcon}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureText} // Set secureTextEntry based on state
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Image
            source={require("./../../../assets/images/eye-shape.png")}
            style={[styles.inputIcon, styles.eyeIcon]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureConfirmText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setSecureConfirmText(!secureConfirmText)}
        >
          <Image
            source={require("./../../../assets/images/eye-crossed.png")}
            style={[styles.inputIcon, styles.eyeIcon]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.SignUpButton, isLoading && styles.disabledButton]}
        onPress={() => OnCreateAccount(email, password)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.SignUpButtonText}>Register</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/auth/sign-in")}
        >
          Login now
        </Text>
      </Text>

      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
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
    right: 5,
    top: 10,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    marginTop: 15,
  },
  mainTitle: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    marginTop: -15,
  },
  secondaryTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 8,
    width: "90%",
    marginTop: 6,
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
  },
  eyeIcon: {
    top: -13,
  },
  SignUpButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    width: "90%",
  },
  SignUpButtonText: {
    color: "#fff",
    fontFamily: "InstrumentSans-Bold",
    fontSize: 18,
  },
  registerText: {
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  registerLink: {
    color: "blue",
  },
  emailContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  emailText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    position: "absolute",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -18,
  },
  logo: {
    width: 150,
    height: 150,
    transform: [{ scale: 1.2 }],
  },
  disabledButton: {
    opacity: 0.7,
  },
});