import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

const notifications = () => {
  const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require("../../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -8,
    marginTop: 15,
    marginLeft: 55,
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: -20,
    position: "relative",
    right: 240,
    top: -10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginBottom: 40,
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: "#ddd",
    marginHorizontal: 5,

  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#000",
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default notifications;
