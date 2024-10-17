import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Introduction = () => {
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
        <Text style={styles.titleText}>Introduction</Text>
        <View style={styles.shortUnderline} />
        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>1.</Text>
            <Text style={styles.menuText}>
              This section provides a general overview of the Terms and Conditions for using the InciSafe Manager platform.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>2.</Text>
            <Text style={styles.menuText}>
              The platform is used by different types of users, including Employees, Safety Officers, and Admins.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>3.</Text>
            <Text style={styles.menuText}>
              The Terms and Conditions outline the rules for using the platform and the responsibilities of both the provider and the users.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>4.</Text>
            <Text style={styles.menuText}>
              By using the InciSafe Manager platform, users automatically agree to follow these Terms and Conditions.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>5.</Text>
            <Text style={styles.menuText}>
              Users are required to comply with the rules mentioned in the document while using the platform.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>6.</Text>
            <Text style={styles.menuText}>
              The platform is intended for incident reporting, tracking, and management in the workplace.
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuNumber}>7.</Text>
            <Text style={styles.menuText}>
              The Terms and Conditions serve as a legally binding agreement between the platform provider and the users.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 15,
  },
  backButton: {
    marginRight: 20,
    marginLeft:-19,
    marginTop:5,
  },
  backButtonImage: {
    width: 28,
    height: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 23,
    margin: 10,
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontWeight:'bold'
  },
  shortUnderline: {
    width: 120,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  menuList: {
    marginHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginHorizontal: -1,
  },
  menuNumber: {
    fontSize: 20,
    marginRight: 13,
    color: '#333',
    lineHeight: 24,
  },
  menuText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    paddingRight: 10,
    marginRight: 8,
    marginLeft: -5,
    lineHeight: 23,
    fontWeight:'450',
    
  },
});

export default Introduction;
