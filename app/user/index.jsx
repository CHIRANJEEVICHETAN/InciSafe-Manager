import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import IconGrid from './../../components/IconGrid';
import BottomNavigation from './../../navigations/BottomNavigation';
import LineSVG from './../../components/LineSVG';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header username="User" style={styles.header}/>
      <LineSVG style={styles.line} />
      <SearchBar />
      <IconGrid style={styles.iconGrid}/>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    // backgroundColor: '#f76262',
    padding: 10,
    color: "red",
  },
  line: {
    // width: "150%",
    // marginLeft: 20,
    marginBottom: 10,
    marginTop: -6,
  },
  iconGrid: {
    marginTop: 20,
    transform: [{ scale: 1.2 }],
  },
});

export default HomeScreen;
