import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProfilePage from "./../../user/Profile";

export default function AdminProfile() {
  return (
    <View style={styles.container}>
      <ProfilePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
