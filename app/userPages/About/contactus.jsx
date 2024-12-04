import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Linking } from 'react-native';
import { useRouter } from 'expo-router';

const contactInfo = () => {
  const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text style={styles.headerText}>About</Text>
        </View>
        <Text style={styles.titleText}>Contact Information</Text>
        {/* <View style={styles.underline} /> */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
            If you have any questions or concerns about these Terms, please contact our support team:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:incisafemanager@gmail.com')}>
            <Text style={styles.contactLink}>Email: incisafemanager@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:1-800-123-4567')}>
            <Text style={styles.contactLink}>Phone: 1-800-123-4567</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
  },
  backButton: {
    marginRight: 5,
    marginLeft: 10,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    paddingRight: 40,
    flex: 1,
    color: '#000',
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  underline: {
    width: 180,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: 'auto',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: -10,
  },
  contentContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '450'
  },
  contactLink: {
    fontSize: 20,
    color: 'blue', // Blue color for links
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default contactInfo;
