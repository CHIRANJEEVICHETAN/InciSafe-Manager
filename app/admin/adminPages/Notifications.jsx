import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NotificationsPage from "./../../user/Notifications";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <NotificationsPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
