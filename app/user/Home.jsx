import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import IconGrid from './../../components/IconGrid';
import LineSVG from './../../components/LineSVG';
import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';  // Import signOut
import useLoadFont from './../../hooks/useLoadFont';

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont(); 
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [username, setUsername] = useState("User");

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
      await signOut(auth);  // Call Firebase signOut function
      router.replace('/auth/sign-in');  // Redirect to the sign-in screen
    } catch (error) {
      console.error("Error signing out: ", error);  // Handle any errors during sign out
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
    <ImageBackground source={require('./../../assets/images/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
          <Header username={user?.displayName || "User"} style={styles.header} />
          <LineSVG style={styles.line} />
          <SearchBar />
          <IconGrid style={styles.iconGrid} />
      </View> 
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    // backgroundColor: '#B0E0E6',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
    color: "red",
  },
  line: {
    marginBottom: 10,
    marginTop: -6,
  },
  iconGrid: {
    marginTop: 80,
    transform: [{ scale: 1.2 }],
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
