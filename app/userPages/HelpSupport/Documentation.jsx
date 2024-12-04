import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

const documentation = () => {
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
    marginLeft: 50,
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    marginBottom: 50,
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
    marginRight: 20,
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
    color: "#000",
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 16,
    color: "#222",
    marginBottom: 5,
  },
});

export default documentation;
