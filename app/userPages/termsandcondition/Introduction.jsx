import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Introduction = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms & Conditions</Text>
      </View>

      <Text style={styles.titleText}>Introduction</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. This section provides a general overview
 of the Terms and Conditions for using the
 InciSafe Manager platform..</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. The platform is used by different types of
 users, including(Employees,Safety Officers,
Admins)..</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. The Terms and Conditions outline the
 rules for using the platform and the 
responsibilities of both the provider and 
the users.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>4. By using the InciSafe Manager platform,
 users automatically agree to follow these 
Terms and Condition.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>5. Users are required to comply with the 
rules mentioned in the document while
using the platform.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>6. The platform is intended for incident
 reporting, tracking, and management in 
 the workplace.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>7.The Terms and Conditions serve as a 
legally binding agreement between the
platform provider and the users.</Text>
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
    textAlign: 'justify', 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
    textAlign: 'justify',
  },
});

export default Introduction;
