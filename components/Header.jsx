import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoSVG from "./../components/LogoSVG";
import { useRouter } from 'expo-router';

const Header = ({ username = "User", style }) => { // Default username to 'User'
const router = useRouter();
  return (
    <View style={[styles.header, style]}>
      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.greeting}>
        Hello! {username ? username : 'User'}  {/* Fallback to 'User' if username is null/undefined */}
      </Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => {router.push('/userPages/settings')}} style={styles.menuIcon}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 100,
  },
  logoContainer: {
    marginLeft: -70,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
    transformOrigin: 'center',
    transform: [{ scale: 0.3 }],
    marginRight: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: -112,
    marginTop: 8,
  },
  menuIcon: {
    marginRight: 10,
    marginTop: 10,
  }
});

export default Header;
