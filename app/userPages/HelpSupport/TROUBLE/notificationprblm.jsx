import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const NotificationIssues = () => {
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

        <Text style={styles.issueText}>Notification Issues</Text>

        <View style={styles.issuesList}>
          <Text style={styles.issueTitle}>1. Ensure Notifications Are Enabled</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Open the app and go to Settings.</Text>
            <Text style={styles.subBulletPoint}>- Check that both In-App Notifications and Email Notifications are enabled.</Text>
            <Text style={styles.subBulletPoint}>- For in-app alerts, ensure that Real-Time Alerts are switched on.</Text>
          </View>

          <Text style={styles.issueTitle}>2. Check Device Settings</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Go to your device’s notification settings:</Text>
            <Text style={styles.subBulletPoint}>  - On iOS: Settings {'>'} Notifications {'>'} InciSafe.</Text>
            <Text style={styles.subBulletPoint}>  - On Android: Settings {'>'} Apps & Notifications {'>'} InciSafe.</Text>
            <Text style={styles.subBulletPoint}>- Ensure that notifications are enabled for the app, and adjust the alert style (e.g., banners, sound, vibration).</Text>
          </View>

          <Text style={styles.issueTitle}>3. Check Do Not Disturb Mode</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Ensure that Do Not Disturb mode is turned off on your device.</Text>
            <Text style={styles.subBulletPoint}>- On both iOS and Android, this can block notifications.</Text>
          </View>

          <Text style={styles.issueTitle}>4. Update the App</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Make sure you are using the latest version of the app.</Text>
            <Text style={styles.subBulletPoint}>- Visit the App Store or Google Play Store to check for updates.</Text>
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
    padding: 25,
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
    paddingLeft: 120,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: -20,
    position: "relative",
    right: 300,
    top: -20,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
    marginLeft: 50,
  },
  issueText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  issuesList: {
    marginHorizontal: 10,
  },
  issueTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subBulletContainer: {
    marginLeft: 25,
    marginBottom: 3,
  },
  subBulletPoint: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default NotificationIssues;
