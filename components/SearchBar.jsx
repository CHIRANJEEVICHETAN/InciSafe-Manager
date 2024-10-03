import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLoadFont from './../hooks/useLoadFont';

const SearchBar = ({ style, inputStyle }) => {
  return (
    <View style={[styles.searchBar, style]}>
      <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
      <TextInput 
        placeholder="Search for items..." 
        style={[styles.input, inputStyle]} 
        placeholderTextColor="#888" // Optional improvement for contrast
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    width: '80%',
    marginLeft: '10%',
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  input: {
    height: 40, // Match height with searchBar
    borderRadius: 50,
    paddingLeft: 50, // Space for the icon
    fontSize: 17,
    fontFamily: 'Roboto-Bold', // Ensure this font is loaded correctly
    color: '#000',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 8,
    zIndex: 100,
  },
});

export default SearchBar;
