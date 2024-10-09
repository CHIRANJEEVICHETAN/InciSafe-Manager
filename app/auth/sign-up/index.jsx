import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import CustomSVG from "./../../../components/CustomSVG";  
import LogoSVG from "./../../../components/LogoSVG";
import { useFonts } from "expo-font";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const auth = getAuth();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
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

  const OnCreateAccount = async (email, password) => {
    if (username === "" || email === "" || password === "") {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.LONG);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, {
        displayName: username
      });

      // Store additional user information in Firestore with role as 'user'
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        role: 'user' // Hardcoded role as 'user'
      });

      ToastAndroid.show("User created successfully", ToastAndroid.LONG);
      router.push("/auth/sign-in");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error creating user:", errorCode, errorMessage);

      if (errorCode === 'auth/network-request-failed') {
        ToastAndroid.show("Network error. Please check your internet connection and try again.", ToastAndroid.LONG);
      } else if (errorCode === 'auth/email-already-in-use') {
        ToastAndroid.show("Email already in use. Please use a different email.", ToastAndroid.LONG);
      } else if (errorCode === 'auth/invalid-email') {
        ToastAndroid.show("Invalid email format. Please enter a valid email.", ToastAndroid.LONG);
      } else {
        ToastAndroid.show(`Error: ${errorMessage}`, ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" 
        accessibilityLabel="Go back">
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
        <TextInput style={styles.input} placeholder="Username" keyboardType="default" autoCapitalize="words" autoCorrect={false} onChangeText={(text) => setUsername(text)} />
        <Image source={require("./../../../assets/images/user.png")} style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => setEmail(text)} />
        <Image source={require("./../../../assets/images/email.png")} style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" autoCorrect={false} onChangeText={(text) => setPassword(text)} />
        <Image source={require("./../../../assets/images/eye-shape.png")} style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry autoCapitalize="none" autoCorrect={false} onChangeText={(text) => setConfirmPassword(text)} />
        <Image source={require("./../../../assets/images/eye-crossed.png")} style={styles.inputIcon} />
      </View>

      <TouchableOpacity style={styles.SignUpButton} onPress={() => OnCreateAccount(email, password)}>
        <Text style={styles.SignUpButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account? <Text style={styles.registerLink} onPress={() => router.push("/auth/sign-in")}>Login now</Text>
      </Text>

      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
    </View>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -18,
  },
  logo: {
    width: 150,
    height: 150,
    transform: [{ scale: 1.2 }],
  },
});