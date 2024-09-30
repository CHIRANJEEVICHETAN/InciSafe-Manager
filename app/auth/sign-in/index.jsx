import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import CustomSVG from "./../../../components/CustomSVG";
import { useFonts } from "expo-font";

const Login = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome ! Log in to InciSafe</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("./../../../assets/images/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.emailContainer}>
        <CustomSVG />
        <Text style={styles.emailText}>Or Login with Email</Text>
      </View>

      <TextInput style={styles.input} placeholder="Email Address" />

      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Not a member? <Text style={styles.registerLink} onPress={() => router.push("/auth/sign-up")}>Register now</Text>
      </Text>

      <TouchableOpacity style={styles.adminButton}>
        <Text style={styles.adminButtonText}>Log in as Admin</Text>
      </TouchableOpacity>

      <Image
        source={require("./../../../assets/images/InciSafeLogo.png")}
        style={styles.logo}
      />
    </View>
  );
};

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
    marginBottom: 5,
  },
  backButtonText: {
    fontSize: 50,
  },
  title: {
    fontSize: 26,
    // fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.BLACK,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    height: 55,
    justifyContent: "center",
    shadowColor: "#000", // Color of the shadow
    shadowOffset: { width: 5, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 6, // Shadow elevation
  },
  googleIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 12,
  },
  googleButtonText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    paddingLeft: 30,
    fontFamily: "Roboto-Bold", // Use Roboto Bold Font
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius:20,
    marginBottom: 10,
    width: "90%",
    marginTop: 10,
    fontFamily: "Inter-Regular",
    fontSize: 16,
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
  logo: {
    width: "100%",
    height: 200,
    alignSelf: "center",
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
});
export default Login;
