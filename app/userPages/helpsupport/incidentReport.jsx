import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const Incident = () => {
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.titleText}>How to Report an Incident</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Select the Type of Incident</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Fill in Incident Details</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>
              - Date and Time of the Incident.
            </Text>
            <Text style={styles.bulletText}>
              - Description of the Incident.
            </Text>
            <Text style={styles.bulletText}>- Attach Photos or Videos.</Text>
            <Text style={styles.bulletText}>- Violation type.</Text>
          </View>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Review Your Report</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>4. Submit Your Report</Text>
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
    padding: 25,
    borderBottomWidth: 1.8,
    borderColor: "#ddd",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 25,
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
    // borderBottomWidth: 0.8,
    // borderBottomColor: "#ddd",
    marginHorizontal: 15,
    // padding:5,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#222",
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});

export default Incident;
