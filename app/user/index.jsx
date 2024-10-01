import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './../../components/Header';
import SearchBar from './../../components/SearchBar';
import IconGrid from './../../components/IconGrid';
import BottomNavigation from './../../components/BottomNavigation';

const userHomePage = () => {
  return (
    <View style={styles.container}>
      <Header username="User" />
      <SearchBar />
      <IconGrid />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default userHomePage;
