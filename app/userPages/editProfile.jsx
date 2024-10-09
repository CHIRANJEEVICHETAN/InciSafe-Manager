import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal

const EditProfilePage = () => {
  const router = useRouter();
  
  // State to manage the visibility of the date picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState(''); // State to hold the selected date of birth

  const handleUpdate = () => {
    // Handle the update logic here
    console.log("Update button pressed");
  };

  const handleConfirm = (date) => {
    // Format the date as you like; here using toLocaleDateString
    setDob(date.toLocaleDateString());
    setDatePickerVisibility(false); // Hide the date picker
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
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.separator} />

      <View style={styles.profileIconContainer}>
        <FontAwesome name="user-circle" size={80} color="#000000" />
      </View>
      
      <View style={styles.fieldContainer}>
        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.usernameField} 
          placeholder="Username" 
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="calendar" size={24} color="black" style={styles.icon} />
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ flex: 1 }}>
          <TextInput 
            style={styles.dobField} 
            placeholder="Date of Birth" 
            placeholderTextColor="#888"
            value={dob} // Show selected date
            editable={false} // Make the input non-editable
          />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.emailField} 
          placeholder="Email" 
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.contactField} 
          placeholder="Contact No" 
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.altContactField} 
          placeholder="Alternate Mobile" 
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="map-marker" size={24} color="black" style={styles.icon} />
        <TextInput 
          style={styles.addressField} 
          placeholder="Address" 
          placeholderTextColor="#888"
          multiline={true}  
          numberOfLines={4}
        />
      </View>
      
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>

      {/* DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date" // Change this to "datetime" if you want both date and time
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
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
    marginBottom: 60,
    marginTop: -20,
  },
  profileIconContainer: {
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center', 
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
    height: 50,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  usernameField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  dobField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  emailField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contactField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  altContactField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 40, 
  },
  addressField: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    height: 40, 
    marginTop: 0,  
    padding: 5,
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
    width: 40,
    height: 40,
    marginTop: 15,
    zIndex: 1000,
  },
  updateButton: {
    backgroundColor: '#14AE5C',
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 30,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfilePage;
