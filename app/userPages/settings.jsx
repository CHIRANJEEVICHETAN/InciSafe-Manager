import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(previousState => !previousState);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={30} color="black" style={{marginTop: 3}} />
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" style={{marginLeft: 10}} />
        <TextInput placeholder="Search" style={styles.searchText} />
      </View>
      <View style={styles.menuItemlist}>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0, marginTop: 10}]}>
        <FontAwesome name="pencil" size={22} color="black" />
        <Text style={styles.menuText}>Edit profile</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <FontAwesome name="lock" size={22} color="black" />
        <Text style={styles.menuText}>Change Password</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <View style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <FontAwesome name="moon-o" size={22} color="black" />
        <Text style={styles.menuText}>Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
          style={styles.switch}
        />
      </View>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <Ionicons name="help-circle-outline" size={28} color="black" style={{marginLeft: -5}} />
        <Text style={styles.menuText}>Help & Support</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <MaterialIcons name="description" size={22} color="black" />
        <Text style={styles.menuText}>Terms and Conditions</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <MaterialIcons name="feedback" size={22} color="black" />
        <Text style={styles.menuText}>Feedback</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <Ionicons name="information-circle" size={22} color="black" />
        <Text style={styles.menuText}>About</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, {borderBottomWidth: 0}]}>
        <MaterialIcons name="logout" size={20} color="black" />
        <Text style={styles.menuText}>Log out</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(180deg, #A8E6CF 0%, #DCEDC1 100%)',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    margin: 16,
    marginBottom: 10,
    borderRadius: 35,
    height: 50,
    width: "83%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 35,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchText: {
    // marginLeft: 5,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    width: "100%",
  },
  menuItemlist: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ccc',
    height: 560, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: 20,
    marginRight: 10,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 18,
  },
  chevron: {
    position: 'absolute',
    right: 20,
  },
  switch: {
    position: 'absolute',
    right: 10,
  },
});

export default Settings;
