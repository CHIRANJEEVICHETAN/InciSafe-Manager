import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ChangePasswordPage = () => {
  const router = useRouter();

  const handleConfirm = () => {
    // Handle the confirm logic here
    console.log("Confirm button pressed");
  };

  const handleCancel = () => {
    // Handle the cancel logic here
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" 
        accessibilityLabel="Go back">
        <Image
          source={require("./../../assets/images/back-button.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Change Password</Text>
      <View style={styles.separator} />

      <View style={styles.profileIconContainer}>
        <FontAwesome name="lock" size={70} color="#000000" />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder="Email-ID" 
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="lock" size={30} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder="Current Password" 
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="lock" size={30} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder="New Password" 
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="lock" size={30} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder="Re-enter Password" 
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f0f0f0',
  },
  profileIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center', 
    marginTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  separator: {
    height: 1.8,
    width: '100%',
    backgroundColor: '#ccc',
    marginBottom: 20,
    marginTop: 15,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    marginHorizontal: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    height: 60,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
    marginLeft: 5,
  },
  inputField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#14AE5C',
    borderRadius: 30,
    padding: 15,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF3D00',
    borderRadius: 30,
    padding: 15,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 5,
    top: 10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    marginTop: 15,
    zIndex: 1000,
  },
});

export default ChangePasswordPage;
