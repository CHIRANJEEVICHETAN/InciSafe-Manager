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
import LogoSVG from "./../../../components/LogoSVG";
import { useFonts } from "expo-font";

const SignUp = () => {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" 
        accessibilityLabel="Go back">
        {/* <Text style={styles.backButtonText}>←</Text> */}
        <Image
          source={require("./../../../assets/images/back-button.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <Text style={styles.mainTitle}>Welcome !</Text>
      <Text style={styles.secondaryTitle}>Create an account to continue</Text>


      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("./../../../assets/images/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.emailContainer}>
        <CustomSVG />
        <Text style={styles.emailText}>Or SignUp with Email</Text>
      </View>
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Username" keyboardType="default" autoCapitalize="words" autoCorrect={false} />
      <Image source={require("./../../../assets/images/user.png")} style={styles.inputIcon} />
    </View>

    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
      <Image source={require("./../../../assets/images/email.png")} style={styles.inputIcon} />
    </View>

    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" autoCorrect={false}/>
      <Image source={require("./../../../assets/images/eye-shape.png")} style={styles.inputIcon} />
    </View>

    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry autoCapitalize="none" autoCorrect={false}/>
      <Image source={require("./../../../assets/images/eye-crossed.png")} style={styles.inputIcon} />
    </View>

      <TouchableOpacity style={styles.SignUpButton}>
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
  mainTitle: {
    fontSize: 30,
    // fontWeight: 'bold',
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
    // flexDirection: "start",
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
    width: 150,   // Base width before scaling
    height: 150,  // Base height before scaling
    transform: [{ scale: 1.2 }],  // Scales the logo by 1.5x
  },
});
export default SignUp;
