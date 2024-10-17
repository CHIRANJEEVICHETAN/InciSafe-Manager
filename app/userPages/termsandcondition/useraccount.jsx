import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
const UserAccount = () => {
  const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require('./../../../assets/images/back-button.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Terms & Conditions</Text>
        </View>
        <Text style={styles.titleText}>User Account</Text>
        <View style={styles.underline} />
        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>1. Account Creation</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Users will need to create accounts using their organization credentials.</Text>
              <Text style={styles.bulletText}>- Admins will have access to additional features, such as report management and dashboard functionalities.</Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>2. Account Security</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Users are responsible for maintaining the confidentiality of their login information.</Text>
              <Text style={styles.bulletText}>- The platform uses security protocols to protect user accounts, but users must ensure that their credentials are secure and notify the admin in case of unauthorized access.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginRight: 25,
    marginLeft: -10,
    marginTop: 20,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -8,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold', // Add bold to the title
  },
  underline: {
    width: 130, // Adjust length to match the length of the title
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: 'auto',
    marginBottom: 20,
    alignSelf: 'center', // Center the underline
  },
  menuList: {
    marginHorizontal: 5,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 20,
    marginBottom: 15,
    color: '#000',
    textAlign: 'justify',
    fontWeight: 'bold', // Add bold to the menu text
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
    textAlign: 'justify',
  },
});

export default UserAccount;
