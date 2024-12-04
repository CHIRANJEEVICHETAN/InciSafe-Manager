import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LoginIssues = () => {
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

        <Text style={styles.loginText}>Login Issues</Text>

        <View style={styles.issuesList}>
          <Text style={styles.issueTitle}>1. Reset Your Password</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Open the app and go to the Login screen.</Text>
            <Text style={styles.subBulletPoint}>- Tap on "Forgot Password?" below the login fields.</Text>
            <Text style={styles.subBulletPoint}>- Enter your registered email address.</Text>
            <Text style={styles.subBulletPoint}>- Enter your new password.</Text>
          </View>

          <Text style={styles.issueTitle}>2. Ensure Correct Login Information</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Double-check the email and password you are entering.</Text>
            <Text style={styles.subBulletPoint}>- Make sure Caps Lock is off when entering your password.</Text>
            <Text style={styles.subBulletPoint}>- If you are copying and pasting your password, ensure there are no extra spaces.</Text>
          </View>

          <Text style={styles.issueTitle}>3. Check Internet Connection</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Ensure you are connected to a stable Wi-Fi or mobile data network.</Text>
            <Text style={styles.subBulletPoint}>- Try refreshing the connection or switching between Wi-Fi and mobile data.</Text>
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
    top: -15,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
    marginLeft: 50,
  },
  loginText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
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

export default LoginIssues;
