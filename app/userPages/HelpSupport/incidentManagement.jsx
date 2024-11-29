import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

const IncidentManagement = () => {
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

      <Text style={styles.titleText}>Incident Management</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            1. Viewing Submitted Incidents to Access all your reported incidents
            through the "My Incidents" tab, with details and search/filter
            options.
          </Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            2. Tracking Incident Status to Monitor the real-time status of each
            incident, with updates to take a certain action.
          </Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            3. Prioritization of Incidents based on severity, allowing you to
            see urgency levels and focus on critical issues.
          </Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>
            4. Managing Incident Updates to Receive notifications for incident
            updates and add more information as needed to keep records current.
          </Text>
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
    padding: 20,
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
    marginLeft: 30,
    textShadowColor: '#000',
    shadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 250,
    top: -2,
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
    margin: 25,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginBottom: 45,
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: "space-between",
    alignItems: 'baseline',
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: "#ddd",
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
    textAlign: "justify",
    paddingRight: 10,
    marginRight: 8,
    marginLeft: -5,
    lineHeight: 23,
    fontWeight:'450',
  },
});

export default IncidentManagement;
