import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Terms & Conditions </Text>
      </View>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Introduction</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Use of Platform</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>User Accounts</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Incident Reporting</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Data Privacy and Security </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Suspension and Termination</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy and Confidentiality </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Contact Information</Text>
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
    paddingBottom: 30,
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
    paddingLeft: 65,  
  },
  
  menuList: {
    marginHorizontal: 15,
    paddingTop: 70,
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

export default Terms;
