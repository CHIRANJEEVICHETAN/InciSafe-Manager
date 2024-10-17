import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const NotificationIssues = () => {
  return (
    <ImageBackground source={require('../../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Help Center</Text>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    paddingLeft: 120,
  },
  issueText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#555",
  },
  issuesList: {
    marginHorizontal: 25,
  },
  issueTitle: {
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

export default NotificationIssues;
