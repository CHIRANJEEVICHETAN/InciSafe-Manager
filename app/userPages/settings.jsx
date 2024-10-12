import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, TextInput, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuText}>{title}</Text>
    <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
  </TouchableOpacity>
);

const Settings = () => {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/auth/sign-in');
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/sign-in');
    } catch (error) {
      console.error("Error signing out: ", error); 
    }
  };
  
  const toggleTheme = () => {
    setIsDarkTheme(previousState => !previousState);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View>
    );
  }

  return (
    <ImageBackground source={require('./../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
            <Image source={require("./../../assets/images/back-button.png")} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Ionicons name="settings-outline" size={30} color="black" style={{marginTop: 3}} />
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={25} color="black" style={{marginLeft: 10}} />
          <TextInput placeholder="Search" style={styles.searchText} />
        </View>
        <View style={styles.menuItemlist}>
          <MenuItem icon={<FontAwesome name="pencil" size={22} color="black" />} title="Edit profile" onPress={() => router.push('/userPages/editProfile')} />
          <MenuItem icon={<FontAwesome name="lock" size={22} color="black" />} title="Change Password" onPress={() => router.push('/userPages/changePassword')} />
          <View style={styles.menuItem}>
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
          <MenuItem icon={<Ionicons name="help-circle-outline" size={28} color="black" />} title="Help & Support" onPress={() => router.push('/userPages/helpcenter')} />
          <MenuItem icon={<MaterialIcons name="description" size={22} color="black" />} title="Terms & Conditions" onPress={() => router.push('/userPages/terms')} />
          <MenuItem icon={<MaterialIcons name="feedback" size={22} color="black" />} title="Feedback" onPress={() => router.push('/userPages/feedback')} />
          <MenuItem icon={<Ionicons name="information-circle" size={22} color="black" />} title="About" onPress={() => router.push('/userPages/about')} />
          <MenuItem icon={<MaterialIcons name="logout" size={20} color="black" />} title="Log out" onPress={handleLogout} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  scrollContainer: {
    flex: 1,
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
    borderWidth: 2.5,
    borderColor: '#cccff',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
