import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in as Admin:", { email, password });
    // Add login logic here, like calling an API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! Log in to InciSafe</Text>
      <Text style={styles.loginText}>Login as Admin</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require("./path-to-your-logo.png")} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.logoText}>INCISAFE</Text>
        <Text style={styles.managerText}>Manager</Text>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: "#000",
  },
  loginText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#007bff",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 18,
    color: "#000",
  },
  managerText: {
    fontSize: 14,
    color: "#888",
  },
});
