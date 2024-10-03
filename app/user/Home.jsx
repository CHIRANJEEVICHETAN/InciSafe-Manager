import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
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
    <View style={styles.container}>
      <Header username={user?.displayName || "User"} style={styles.header} />
      <LineSVG style={styles.line} />
      <SearchBar />
      <IconGrid style={styles.iconGrid} />

      <TouchableOpacity onPress={() => {
        router.push('/user/Help');
      }}>
        <Text>Help</Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
    marginTop: 20,
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
