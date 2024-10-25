import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const IncidentReport = () => {
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
        <Text style={styles.titleText}>Incident Reporting</Text>
        <View style={styles.underline} />
        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>1. Accuracy of Reports</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Users are required to submit accurate and truthful information when reporting incidents.</Text>
              <Text style={styles.bulletText}>- False reporting can lead to account suspension or termination.</Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>2. Timely Reporting</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- All incidents must be reported as soon as possible to ensure timely action. Delayed reporting may affect incident resolution.</Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>3. Evidence Upload</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Users can upload photos or videos to support their incident report.</Text>
              <Text style={styles.bulletText}>- The platform only accepts specific file types (e.g., JPEG, PNG, MP4) and has size limits for uploads. Uploading irrelevant or inappropriate files is prohibited.</Text>
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
    marginTop: 22,
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
    margin: 20,
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold', // Add bold to the title
  },
  // underline: {
  //   width: 175, // Adjust length to match the length of the title
  //   borderBottomColor: 'black',
  //   borderBottomWidth: 2,
  //   marginHorizontal: 'auto',
  //   marginBottom: 20,
  //   alignSelf: 'center', // Center the underline
  // },
  menuList: {
    marginHorizontal: 5,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    marginHorizontal: 15,
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
    fontSize: 19,
    color: '#000',
    marginBottom: 5,
    textAlign: 'justify',
    fontWeight: '400'
  },
});

export default IncidentReport;
