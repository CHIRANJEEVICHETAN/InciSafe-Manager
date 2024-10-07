import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';

const useraccount = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      <Text style={styles.titleText}>User Account</Text>

      <View style={styles.menuList}>
      <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Account Creation</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Users will need to create accounts
            using their organization credentials.</Text>
            <Text style={styles.bulletText}>- Admins will have access to additional
 features, such as report management
 and dashboard functionalities.</Text>
          </View>
      </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Account Security</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Users are responsible for maintaining
 the confidentiality of their login 
information.</Text>
            <Text style={styles.bulletText}>- The platform uses security protocols
 to protect user accounts, but users
 must ensure that their credentials
 are secure and notify the admin in
 case of unauthorized access</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: '#ddd',
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
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
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

export default useraccount;
