import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HelpCenter = () => {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.welcomeText}>Welcome to the Support Center</Text>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/userPages/HelpSupport/getstarted')}>
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
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: '#ddd',
    alignContent: 'center',
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
    paddingLeft: 110,
    paddingRight:90,
  },
  welcomeText: {
    fontSize: 21,
    margin: 25,
    textAlign: 'center',
    color: '#555',
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    marginHorizontal: 10, 
  },
  menuText: {
    fontSize: 18,
  },
  chevron: {
    position: 'absolute',
    right: 5,
  },
});

export default HelpCenter;
