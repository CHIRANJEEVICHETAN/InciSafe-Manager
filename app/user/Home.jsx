import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import IconGrid from './../../components/IconGrid';
import LineSVG from './../../components/LineSVG';
import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Import signOut
import useLoadFont from './../../hooks/useLoadFont';

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont(); 
  const auth = getAuth();
  const [user, setUser] = useState(null);
  
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
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
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
