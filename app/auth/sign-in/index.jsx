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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
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

  const handleBackPress = () => {
    router.replace("/");
  };

  const OnLogin = async () => {
    if (email === "" || password === "") {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.LONG);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDoc = doc(db, "users", user.uid); // Assuming user data is stored in a 'users' collection
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const role = userData.role; // Get the role field from the document

        if (role === "admin") {
          router.replace("/admin/adminPages/Home"); // Navigate to admin dashboard
        } else {
          router.replace("/user/Home"); // Navigate to user dashboard
        }
      } else {
        ToastAndroid.show("User data not found!", ToastAndroid.LONG);
      }
    } catch (error) {
      const errorMessage = error.message;
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      console.log(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        {/* <Text style={styles.backButtonText}>←</Text> */}
        <Image
          source={require("./../../../assets/images/back-button.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome ! Log in to InciSafe</Text>

      {/* <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("./../../../assets/images/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity> */}

      <View style={styles.emailContainer}>
        <CustomSVG />
        <Text style={styles.emailText}>Login with Email</Text>
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

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={OnLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Not a member?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => router.push("/auth/sign-up")}
        >
          Register now
        </Text>
      </Text>

      <TouchableOpacity style={styles.adminButton} onPress={OnLogin}>
        <Image
          source={require("./../../../assets/images/shield.png")}
          style={styles.adminLogo}
        />
        <Text style={styles.adminButtonText}>Log in as Admin</Text>
      </TouchableOpacity>

      {/* <Image
        source={require("./../../../assets/images/InciSafeLogo.png")}
        style={styles.logo}
      /> */}
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
    // justifyContent: 'center',
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    // marginTop: 10,
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
  title: {
    fontSize: 26,
    // fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
  },
  // googleButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: Colors.BLACK,
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   borderRadius: 30,
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   width: "80%",
  //   height: 55,
  //   justifyContent: "center",
  //   shadowColor: "#000", // Color of the shadow
  //   shadowOffset: { width: 5, height: 2 }, // Shadow offset
  //   shadowOpacity: 0.5, // Shadow opacity
  //   shadowRadius: 3.84, // Shadow blur radius
  //   elevation: 6, // Shadow elevation
  // },
  // googleIcon: {
  //   width: 25,
  //   height: 25,
  //   position: "absolute",
  //   left: 12,
  // },
  // googleButtonText: {
  //   color: Colors.WHITE,
  //   fontSize: 20,
  //   fontWeight: "500",
  //   textAlign: "center",
  //   paddingLeft: 30,
  //   fontFamily: "Roboto-Bold", // Use Roboto Bold Font
  // },
  orText: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: "90%",
    marginTop: 10,
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
  forgotPassword: {
    color: "blue",
    marginBottom: 20,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    position: "relative",
    right: 100,
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
  registerText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  registerLink: {
    color: "blue",
  },
  adminButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
    // height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  adminButtonText: {
    color: Colors.WHITE,
    fontFamily: "InstrumentSans-Bold",
    fontSize: 18,
  },
  adminLogo: {
    width: 35,
    height: 30,
    alignSelf: "center",
    position: "relative",
    right: 20,
    // backgroundColor: Colors.WHITE,
  },
  emailContainer: {
    // flexDirection: "start",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  emailText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    position: "absolute",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 150, // Base width before scaling
    height: 150, // Base height before scaling
    transform: [{ scale: 1.2 }], // Scales the logo by 1.5x
  },
  eyeIcon: {
    top: -13,
  },
});