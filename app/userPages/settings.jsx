import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Settings = () => {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Add this array of menu items
  const menuItems = [
    { id: 1, title: 'Edit profile', icon: 'pencil', iconType: 'FontAwesome', route: '/userPages/editProfile' },
    { id: 2, title: 'Change Password', icon: 'lock', iconType: 'FontAwesome', route: '/userPages/changePassword' },
    { id: 3, title: 'Help & Support', icon: 'help-circle-outline', iconType: 'Ionicons', route: '/userPages/helpcenter' },
    { id: 4, title: 'Terms & Conditions', icon: 'description', iconType: 'MaterialIcons', route: '/userPages/terms' },
    { id: 5, title: 'Feedback', icon: 'feedback', iconType: 'MaterialIcons', route: '/userPages/feedback' },
    { id: 6, title: 'About', icon: 'information-circle', iconType: 'Ionicons', route: '/userPages/about' },
    { id: 7, title: 'Log out', icon: 'logout', iconType: 'MaterialIcons', route: null },
  ];

  // Add this filter function
  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Stop loading after auth check
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/auth/sign-in');  // Use replace to prevent back navigation to Home
    }
  }, [user, loading]);

  // Logout function
  const handleLogout = async () => {
    try {
      setLoading(true); // Start loading
      await signOut(auth);  // Call Firebase signOut function
      await AsyncStorage.removeItem('user'); // Clear user data from AsyncStorage
      setUser(null); // Clear user state
      router.replace('/auth/sign-in');  // Redirect to the sign-in screen
    } catch (error) {
      console.error("Error signing out: ", error); 
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require("./../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Ionicons
            name="settings-outline"
            size={30}
            color="black"
            style={{ marginTop: 3 }}
          />
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ImageBackground
          source={require("./../../assets/images/background.jpg")}
          style={styles.menuItemlist}
        >
          {filteredMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              onPress={() => item.route ? router.push(item.route) : handleLogout()}
            >
              {item.iconType === 'FontAwesome' && <FontAwesome name={item.icon} size={22} color="black" />}
              {item.iconType === 'Ionicons' && <Ionicons name={item.icon} size={22} color="black" />}
              {item.iconType === 'MaterialIcons' && <MaterialIcons name={item.icon} size={22} color="black" />}
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="black"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </ImageBackground>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#cccff',
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
    marginTop: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(180deg, #A8E6CF 0%, #DCEDC1 100%)',
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: -20,
    position: "absolute",
    left: 25,
    top: 0,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 23,
    zIndex: 1000,
  },
});

export default Settings;
