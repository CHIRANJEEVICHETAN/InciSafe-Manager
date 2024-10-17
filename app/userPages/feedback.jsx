import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import axios from "axios";

const Feedback = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName);
      setEmail(user.email);
    }
  }, []);

  const handleSubmitFeedback = async () => {
    const formData = {
      username,
      email,
      suggestion,
    };

    try {
      const response = await axios.post(
        "https://formspree.io/f/movqqkok",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        ToastAndroid.show("Feedback submitted successfully", ToastAndroid.LONG);
        Alert.alert("Success", "Thank you for your valuable Feedback..!!");
        // Clear the fields after submission
        setSuggestion(""); // Reset only the suggestion field
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "There was an error submitting your feedback.");
    }
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
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
        <Text style={styles.title}>Feedback</Text>
        <View style={styles.separator} />
        <View style={styles.fieldContainer}>
          <FontAwesome
            name="user"
            size={22}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Username"
            value={username}
            editable={false} // Make the field non-editable
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.fieldContainer}>
          <FontAwesome
            name="envelope"
            size={19}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email ID"
            value={email}
            editable={false} // Make the field non-editable
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.fieldContainer}>
          <FontAwesome
            name="pencil"
            size={20}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.suggestionField}
            placeholder="Suggest anything we can improve"
            value={suggestion}
            onChangeText={setSuggestion}
            placeholderTextColor="#888"
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFeedback}
        >
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -35,
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
    marginVertical: 55,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderWidth: 1,
    marginVertical: 9,
    borderRadius: 15,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  inputField: {
    flex: 1,
    padding: 8,
  },
  suggestionField: {
    flex: 1,
    padding: 8,
    height: 100,
  },
  submitButton: {
    backgroundColor: "#14AE5C",
    borderRadius: 40,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: -5,
    top: 16,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
});

export default Feedback;
