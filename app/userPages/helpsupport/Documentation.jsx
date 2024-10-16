import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";

const documentation = () => {
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.titleText}>Documentation & Evidence Upload</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Supported File Types</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>
              - List of accepted file types for uploads.
            </Text>
            <Text style={styles.bulletText}>- ( JPEG, PNG, PDF, MP4).</Text>
          </View>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. File Size Limits</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bulletText}>
              - Maximum file sizes allowed for uploads and suggestions for
              reducing file size
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
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1.8,
    borderColor: "#ccc",
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
    marginHorizontal: 5,
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

export default documentation;
