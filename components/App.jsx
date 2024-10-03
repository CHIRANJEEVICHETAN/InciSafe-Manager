import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import useLoadFont from "./../hooks/useLoadFont";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
// import BottomNavigator from "./../app/user/BottomNavigator";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const fontsLoaded = useLoadFont();
  const router = useRouter(); // Use the router for navigation

  // Hide the splash screen once the fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Don't render anything until fonts are loaded
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./../assets/images/INCISAFE.png")}
            style={styles.logo}
          />
        </View>

        <View>
          <Text style={styles.welcomeText}>Welcome to InciSafe Manager</Text>
          <Text style={styles.descriptionText}>
            Create an account or log in to quickly report and efficiently manage
            incidents
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/auth/sign-in")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={() => router.push("/auth/sign-up")}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>
          
          {/* onPress={() => router.push("/auth/google-sign-in")} */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require("./../assets/images/google.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomNavigator />  */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    width: "125%",
    height: 430,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomContainer: {
    backgroundColor: "#CDC9C9",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    width: "112%",
    height: 300,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  welcomeText: {
    fontSize: 27,
    marginTop: 130,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  descriptionText: {
    fontSize: 24,
    textAlign: "center",
    color: "#3F2D2D",
    fontFamily: "Roboto-Regular",
  },
  loginButton: {
    backgroundColor: "#426BFA",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    width: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 6,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  signUpButton: {
    backgroundColor: "#A8EAF3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    width: "75%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 6,
  },
  signUpButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
  },
  orText: {
    fontSize: 14,
    color: "black",
    marginVertical: 10,
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 6,
  },
  googleIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 12,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    paddingLeft: 30,
    fontFamily: "Roboto-Regular",
  },
});
