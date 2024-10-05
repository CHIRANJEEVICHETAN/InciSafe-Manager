import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const changePassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      {/* Your form or fields for editing the profile will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default changePassword;

