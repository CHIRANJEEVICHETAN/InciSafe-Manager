import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoSVG from "./../components/LogoSVG";

const Header = ({ username, style }) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.greeting}>Hello! {username}</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.menuIcon}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
    // backgroundColor: '#f76262',
    marginTop: 10,
    height: 100,
  },
  logoContainer: {
    marginLeft: -80,
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
