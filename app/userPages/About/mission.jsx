import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mission = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
      </View>

      <Text style={styles.titleText}>Our Mission</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>    In InciSafe Manager, our mission is to simplify incident management and enhance workplace safety by providing a robust, user-friendly system. We aim to empower organizations with tools that enable faster incident resolution, real-time notifications, and centralized data analysis, promoting safer environments and preventing future incidents.</Text>
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
});

export default mission;
