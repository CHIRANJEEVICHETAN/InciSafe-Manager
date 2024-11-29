import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const SystemRequirements = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require('../../../../assets/images/background.jpg')} style={styles.container}>
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
              source={require("../../../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.systemText}>System Requirements</Text>

        <View style={styles.requirementsList}>
          <Text style={styles.requirementTitle}>1. Supported Operating Systems:</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>• iOS: Version 12.0 or later</Text>
            <Text style={styles.subBulletPoint}>• Android: Version 8.0 or later</Text>
          </View>

          <Text style={styles.requirementTitle}>2. Hardware Requirements:</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>• Processor: 1.5 GHz or higher</Text>
            <Text style={styles.subBulletPoint}>• RAM: Minimum 2GB of RAM</Text>
            <Text style={styles.subBulletPoint}>
              • Storage Space: At least 100MB of free space for the app installation, with additional storage needed for data storage such as incident reports, media uploads, and documents.
            </Text>
          </View>

          <Text style={styles.requirementTitle}>3. Internet Connectivity:</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>
              • Wi-Fi or Mobile Data: A stable internet connection (3G/4G/5G or Wi-Fi)
            </Text>
            <Text style={styles.subBulletPoint}>
              • Offline Support: The app may offer limited functionality while offline (such as viewing past reports), but full functionality requires an active connection.
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
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1.8,
    borderColor: "#ccc",
    alignContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -8,
    marginTop: 5,
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
    paddingLeft: 100,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 300,
    top: -10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  systemText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  requirementsList: {
    marginHorizontal: 25,
  },
  requirementTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  subBulletContainer: {
    marginLeft: 25,
    marginBottom: 20,
  },
  subBulletPoint: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SystemRequirements;
