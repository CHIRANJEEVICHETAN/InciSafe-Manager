import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HelpCenter = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.welcomeText}>Welcome to the Support Center</Text>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Get Started</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>How to Report an Incident</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Incident Management</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications and Alerts</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Documentation and Evidence Upload</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Troubleshooting</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Frequently Asked Questions (FAQs)</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contact Support</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 28,
    borderBottomWidth: 1.8,
    borderColor: '#ddd',
    alignContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    padding: 5,
  },
  welcomeText: {
    fontSize: 18,
    margin: 16,
    textAlign: 'center',
    color: '#555',
  },
  menuList: {
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 10, // Adding some margin on the sides
  },
  menuText: {
    fontSize: 18,
  },
  chevron: {
    position: 'absolute',
    right: 10,
  },
});

export default HelpCenter;
