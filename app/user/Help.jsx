import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
// import { useRouter } from 'expo-router';
import HelpCenter from "./../userPages/helpcenter";

export default function Help() {
  return (
    <View style={styles.container}>
      <HelpCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
