import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileField = ({ icon, label, value, style, labelStyle, valueStyle, iconStyle }) => {
  return (
    <View style={[styles.fieldContainer, style]}>
      <FontAwesome name={icon} size={24} color="black" style={[styles.icon, iconStyle]} />
      <View style={styles.textContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <Text style={[styles.value, valueStyle]}>{value}</Text>
      </View>
    </View>
  );
};

const ProfilePage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" 
        accessibilityLabel="Go back">
        <Image
          source={require("./../../assets/images/back-button.png")}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />
      <ProfileField icon="user" label="Username" value="John Doe" style={styles.usernameField} labelStyle={styles.usernameLabel} valueStyle={styles.usernameValue} iconStyle={styles.usernameIcon} />
      <ProfileField icon="id-card" label="User-ID" value="2165" style={styles.userIdField} />
      <ProfileField icon="calendar" label="Date of Birth" value="02/05/1999" style={styles.dobField} labelStyle={styles.dobLabel} valueStyle={styles.dobValue} iconStyle={styles.dobIcon} />
      <ProfileField icon="envelope" label="Email" value="username@example.com" style={styles.emailField} />
      <ProfileField icon="phone" label="Contact No" value="+1234567890" style={styles.contactField} labelStyle={styles.contactLabel} valueStyle={styles.contactValue} iconStyle={styles.contactIcon} />
      <ProfileField icon="phone" label="Alternate Mobile" value="+0987654321" style={styles.altContactField} labelStyle={styles.altContactLabel} valueStyle={styles.altContactValue} iconStyle={styles.altContactIcon} />
      <ProfileField icon="user-secret" label="Role" value="Admin" style={styles.roleField} labelStyle={styles.roleLabel} valueStyle={styles.roleValue} iconStyle={styles.roleIcon} />
      <ProfileField icon="map-marker" label="Address" value="123 Street, City, Country" style={styles.addressField} labelStyle={styles.addressLabel} valueStyle={styles.addressValue} iconStyle={styles.addressIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    // marginVertical: 20,
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
    // marginVertical: 10,
    marginBottom: 30,
    marginTop: -20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
    height: 55,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 7,
  },
  value: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 7,
    marginTop: 3,
  },
  backButton: {
    alignSelf: "flex-start",
    // marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 0,
    top: 10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  // Add your custom styles here for each field
  usernameField: {
    backgroundColor: '#f0f0f0',
  },
  usernameLabel: {
    marginLeft: 10,
  },
  usernameValue: {
    marginLeft: 10,
  },
  usernameIcon: {
    marginLeft: 10,
  },
  userIdField: {
    backgroundColor: '#f0f0f0',
  },
  dobField: {
    backgroundColor: '#f0f0f0',
  },
  dobLabel: {
    marginLeft: 10,
  },
  dobValue: {
    marginLeft: 10,
  },
  dobIcon: {
    // marginLeft: 10,
  },
  emailField: {
    backgroundColor: '#f0f0f0',
  },
  contactField: {
    backgroundColor: '#f0f0f0',
  },
  contactLabel: {
    marginLeft: 8,
  },
  contactValue: {
    marginLeft: 8,
  },
  contactIcon: {
    marginLeft: 8,
  },
  altContactField: {
    backgroundColor: '#f0f0f0',
  },
  altContactLabel: {
    marginLeft: 8,
  },
  altContactValue: {
    marginLeft: 8,
  },
  altContactIcon: {
    marginLeft: 8,
  },
  roleField: {
    backgroundColor: '#f0f0f0',
  },
  addressField: {
    backgroundColor: '#f0f0f0',
    height: 130,
    marginTop: 10,
  },
  addressLabel: {
    position: 'absolute',
    top: -55,
    left: 33,
  },
  addressValue: {
    position: 'absolute',
    top: -25,
    left: 33,
  },
  addressIcon: {
    position: 'absolute',
    top: 10,
    left: 12,
  },
});

export default ProfilePage;
