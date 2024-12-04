import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';

const Incident = () => {
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
    marginLeft: 30,
    marginBottom: -15,
    marginTop: 15,
    shadowColor: "#000",
    textShadowColor: '#000',
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
    color: "#000",
    fontWeight: "bold",
    marginBottom: 30,
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
    marginBottom: 3,
    color: "#000",
  },
  bulletContainer: {
    paddingLeft: 20,
    // marginBottom: 10,
  },
  bulletText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
});

export default Incident;
