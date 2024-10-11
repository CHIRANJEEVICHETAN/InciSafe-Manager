import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const IncidentManagement = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
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
    textAlign: "justify",
  },
});

export default IncidentManagement;
