import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground,TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Privacy = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
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
        <Text style={styles.titleText}>Privacy and Confidentiality</Text>
        <View style={styles.underline} />
        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>1. Our Commitment to Your Privacy</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- InciSafe Manager is committed to protecting your personal and incident data.</Text>
              <Text style={styles.bulletText}>- We ensure that all information collected through the platform is kept secure and used only for workplace safety and incident reporting purposes.</Text>
              <Text style={styles.bulletText}>- We implement strong security measures, such as data encryption, to protect your information from unauthorized access.</Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>2. Confidential Information Handling</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- All reports, evidence, and incident data submitted through the platform are treated as confidential.</Text>
              <Text style={styles.bulletText}>- Only authorized personnel, such as safety officers and admins, can access the data.</Text>
              <Text style={styles.bulletText}>- We do not share your information with third parties unless required by law or organizational policies.</Text>
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
    marginLeft: -20,
    marginTop: 25,
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
    width: 240, // Adjust length to match the length of the title
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: 'auto',
    marginBottom: 20,
    alignSelf: 'center', // Center the underline
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
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
    fontSize: 17,
    color: '#000',
    marginBottom: 5,
    textAlign: 'justify',
  },
});

export default Privacy;
