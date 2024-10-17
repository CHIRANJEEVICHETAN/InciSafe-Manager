import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const Contactus = () => {
  return (
    
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
      </View>

      <Text style={styles.titleText}>Contact Us</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          If you have any questions or concerns about these Terms, please contact our support team:
        </Text>
        <Text style={styles.contactInfo}>Email: incisafemanager@gmail.com</Text>
        <Text style={styles.contactInfo}>Phone: 1-800-123-4567</Text>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
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
    margin: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 55,
  },
  contentContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  contactInfo: {
    fontSize: 18,
    color: '#00796b', 
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Contactus;
