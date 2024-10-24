import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const EditProfilePage = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const user = auth.currentUser;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [altContact, setAltContact] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdate = async () => {
    try {
      // Update display name
      if (username) {
        await updateProfile(user, { displayName: username });
      }

      // If a new profile image is selected, upload it to Firebase Storage
      if (profileImage) {
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const imageRef = ref(storage, `profileImages/${user.uid}`);

        // Upload image
        await uploadBytes(imageRef, blob);

        // Get download URL
        const imageUrl = await getDownloadURL(imageRef);

        // Update user profile with image URL
        await setDoc(
          doc(db, "users", user.uid),
          { profileURL: imageUrl, dob, contact, altContact, address },
          { merge: true }
        );
      } else {
        // Update user info without image
        await setDoc(
          doc(db, "users", user.uid),
          { dob, contact, altContact, address },
          { merge: true }
        );
      }

      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully."
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Update Failed", "There was an error updating your profile.");
    }
  };

  const handleConfirm = (date) => {
    setDob(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const selectImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permission to access camera roll is required!");
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      // console.log("Image Picker Result: ", result); // Log the entire result object

      // Check if user cancelled the picker
      if (result.canceled) {
        // console.log("Image selection was cancelled.");
        return;
      }

      // Set the selected image URI to state
      if (result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
        // console.log("Selected Image URI: ", result.assets[0].uri);
      } else {
        console.log("No image selected.");
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
      Alert.alert(
        "Error selecting image",
        "An error occurred while selecting the image."
      );
    }
  };

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={selectImage}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <FontAwesome name="user-circle" size={80} color="#000000" />
        )}
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </TouchableOpacity>

      <View style={styles.fieldContainer}>
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.usernameField}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome
          name="calendar"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TouchableOpacity
          onPress={() => setDatePickerVisibility(true)}
          style={{ flex: 1 }}
        >
          <TextInput
            style={styles.dobField}
            placeholder="Date of Birth"
            placeholderTextColor="#888"
            value={dob}
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.contactField}
          placeholder="Contact No"
          placeholderTextColor="#888"
          value={contact}
          onChangeText={setContact}
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.altContactField}
          placeholder="Alternate Mobile"
          placeholderTextColor="#888"
          value={altContact}
          onChangeText={setAltContact}
        />
      </View>

      <View style={[styles.fieldContainer, { height: 100 }]}>
        <FontAwesome
          name="map-marker"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.addressField}
          placeholder="Address"
          placeholderTextColor="#888"
          multiline={true}
          numberOfLines={4}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: -5,
    top: 10,
    zIndex: 1,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    marginTop: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
    marginTop: -10,
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
    marginBottom: 60,
    marginTop: -20,
  },
  profileIconContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image circular
    borderWidth: 2,
    borderColor: "#ccc",
  },
  changePhotoText: {
    color: "#007AFF",
    marginTop: 10,
    fontSize: 16,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 15,
    shadowColor: "#000",
    height: 50,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  usernameField: {
    flex: 1,
    padding: 5,
  },
  dobField: {
    flex: 1,
  },
  contactField: {
    flex: 1,
  },
  altContactField: {
    flex: 1,
    height: 40,
  },
  addressField: {
    flex: 1,
    height: 40,
    marginTop: 0,
    padding: 5,
  },
  updateButton: {
    backgroundColor: "#14AE5C",
    borderRadius: 40,
    padding: 15,
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 30,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfilePage;
