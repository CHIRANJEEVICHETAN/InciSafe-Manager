import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const dataprivacy = () => {
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      <Text style={styles.titleText}>Data Privacy And Security</Text>

      <View style={styles.menuList}>
      <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Data Collection</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- InciSafe Manager collects data necessary for incident reporting, including incident descriptions, incident type details, and attached media files.</Text>
            <Text style={styles.bulletText}>- The platform may also collect personal information, such as user login details and contact information.</Text>
          </View>
      </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Data Protection</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- All incident data is stored in Firebase and is encrypted to protect user and organizational information.</Text>
            <Text style={styles.bulletText}>- Regular audits and security measures are implemented to prevent data breaches.</Text>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Third-Party Access</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- The platform does not share user data with third-party entities unless required by law.</Text>
            <Text style={styles.bulletText}>- Only authorized personnel within the organization ( safety officers) will have access to incident data.</Text>
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
    color: '#555',
    marginBottom: 55, 
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
    marginHorizontal: 15, 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    textAlign: 'justify',
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
    
  },
  bulletText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'justify',
  },
});

export default dataprivacy;
