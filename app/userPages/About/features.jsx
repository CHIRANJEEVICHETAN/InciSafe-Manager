import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const features = () => {
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
      </View>

      <Text style={styles.titleText}>Key Features of the System</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Real-Time Incident Reporting</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Automated Notifications</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Centralized Incident Management</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>4. Multimedia Upload</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>5. User Role Management</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>6. Reporting and Analytics Dashboard</Text>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 15,
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
    color: '#555',
    marginBottom: 55, 
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
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

export default features;
