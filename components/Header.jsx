import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoSVG from "./../components/LogoSVG";

const Header = ({ username, style }) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.greeting}>Hello! {username}</Text>
      <Ionicons name="menu" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    transform: [{ scale: 1.2 }],
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
