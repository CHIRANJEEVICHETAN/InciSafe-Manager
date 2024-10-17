import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const SubmissionErrors = () => {
  return (
    <ImageBackground source={require('../../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Help Center</Text>
        </View>

        <Text style={styles.errorText}>Submission Errors</Text>

        <Text style={styles.descriptionText}>Error when submitting an incident report.</Text>

        <View style={styles.errorsList}>
          <Text style={styles.errorTitle}>1. Check for Required Fields</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Ensure all required fields are filled out.</Text>
            <Text style={styles.subBulletPoint}>- Re-read the error message for any specific fields you missed.</Text>
          </View>

          <Text style={styles.errorTitle}>2. File Size Limits for Attachments</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Ensure that any attached files (photos, videos, documents) meet the app’s file size limit.</Text>
            <Text style={styles.subBulletPoint}>- If a file is too large, try compressing it or attaching a smaller file.</Text>
          </View>

          <Text style={styles.errorTitle}>3. Internet Connection Check</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Confirm you have a strong internet connection before submitting.</Text>
            <Text style={styles.subBulletPoint}>- If on a weak connection, try moving to a more stable Wi-Fi or switching to mobile data.</Text>
          </View>

          <Text style={styles.errorTitle}>4. Retry Submission</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Close the app and reopen it to refresh your session.</Text>
            <Text style={styles.subBulletPoint}>- Re-enter the incident details and try submitting again.</Text>
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
  errorText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#555",
  },
  descriptionText: {
    fontSize: 16,
    marginHorizontal: 25,
    marginBottom: 15,
    color: "#777",
    textAlign: "center",
  },
  errorsList: {
    marginHorizontal: 25,
  },
  errorTitle: {
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

export default SubmissionErrors;
