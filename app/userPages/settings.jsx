import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'  // Correctly import useState and useEffect
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'


export default function settings() {
  const router = useRouter();
 const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Text style={styles.text}>settings</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>User ID: {user?.uid}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
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
})