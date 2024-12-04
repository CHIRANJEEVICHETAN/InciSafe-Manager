import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const UseOfPlatform = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/images/background.jpg")}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require("./../../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Terms & Conditions</Text>
        </View>
        <Text style={styles.titleText}>Use of Platform</Text>
        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>1. Eligibility</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>
                - End Users (e.g., employees, safety officers) must be
                registered members of the organization.
              </Text>
              <Text style={styles.bulletText}>
                - The platform is restricted to authorized personnel responsible
                for reporting and managing incidents.
              </Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>2. Permitted Use</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>
                - Admins can view, categorize, and manage reported incidents.
              </Text>
              <Text style={styles.bulletText}>
                - The system should only be used for reporting safety incidents
                in the workplace, not for personal or unrelated purposes.
              </Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>3. Prohibited Use</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>
                - Falsifying or submitting inaccurate incident reports.
              </Text>
              <Text style={styles.bulletText}>
                - Misuse of the platform for any illegal or non-organizational
                purposes.
              </Text>
              <Text style={styles.bulletText}>
                - Uploading harmful files, like viruses or inappropriate
                content.
              </Text>
              <Text style={styles.bulletText}>
                - Attempting to bypass security features or accessing data
                beyond a user’s role.
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
  backButton: {
    position: "relative",
    top: -3,
    left: 10,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 20,
    marginTop: 25,
    borderBottomWidth: 1.8,
    borderColor: "#ccc",
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    marginTop: -10,
    color: "#000",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: "center",
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  underline: {
    width: 150, // Length to match the length of the title
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginHorizontal: "auto",
    marginBottom: 10,
    alignSelf: "center", // Center the underline
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 18,
    color: "#000",
    textAlign: "justify",
    fontWeight: "bold",
  },
  bulletContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  bulletText: {
    fontSize: 17.5,
    color: "#000",
    fontWeight: "450",
    marginBottom: 5,
    textAlign: "justify",
    // fontSize:18,
  },
});

export default UseOfPlatform;
