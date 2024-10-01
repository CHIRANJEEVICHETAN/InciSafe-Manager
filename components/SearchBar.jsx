import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ style, inputStyle }) => {
  return (
    <View style={[styles.searchBar, style]}>
      <TextInput placeholder="Search..." style={[styles.input, inputStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
  },
});

export default SearchBar;
