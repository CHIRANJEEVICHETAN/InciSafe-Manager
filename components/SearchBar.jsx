import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useLoadFont from './../hooks/useLoadFont';

const SearchBar = ({ style, inputStyle, value, onChangeText }) => {
  
  return (
    <View style={[styles.searchBar, style]}>
      <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for items..." 
        style={[styles.input, inputStyle]} 
        placeholderTextColor="#888"
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 17,
    fontFamily: 'Roboto-Bold',
    color: '#000',
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});

export default SearchBar;
