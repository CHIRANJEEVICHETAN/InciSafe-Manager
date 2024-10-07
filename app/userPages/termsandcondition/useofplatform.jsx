import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';

const useofplatform = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      <Text style={styles.titleText}>Use of Platform</Text>

      <View style={styles.menuList}>
      <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Eligibility</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- End Users (e.g., employees, safety 
officers) must be registered members
 of the organization.</Text>
            <Text style={styles.bulletText}>- The platform is restricted to authorized
 personnel responsible for reporting
 and managing incidents.</Text>
          </View>
      </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Permitted Use</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Admins can view, categorize, and 
            manage reported incidents.</Text>
            <Text style={styles.bulletText}>- The system should only be used for 
reporting safety incidents in the 
workplace, not for personal or unrelated
 purposes.</Text>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Prohibited Use</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Falsifying or submitting inaccurate 
            incident reports.</Text>
            <Text style={styles.bulletText}>- Misuse of the platform for any illegal
            or non-organizational purposes.</Text>
            <Text style={styles.bulletText}>- Uploading harmful files, like viruses
            or inappropriate content.</Text>
            <Text style={styles.bulletText}>- Attempting to bypass security features
            or accessing data beyond a user’s role.</Text>
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

export default useofplatform;
