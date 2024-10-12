import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const notifications = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.titleText}>Notifications & Alerts</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Access Notification Settings</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Open the app.</Text>
            <Text style={styles.bulletText}>
              - Go to Settings (usually found under your profile or menu).
            </Text>
          </View>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            2. Enable/Disable Email Notifications
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Find Email Notifications.</Text>
            <Text style={styles.bulletText}>
              - Toggle ON to get email updates or OFF to stop them.
            </Text>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            3. Enable/Disable In-App Notifications
          </Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>- Find In-App Notifications.</Text>
            <Text style={styles.bulletText}>
              - Toggle ON to get notifications inside the app or OFF to turn
              them off.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: "#ddd",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 55,
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: "#ddd",
    marginHorizontal: 15,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default notifications;
