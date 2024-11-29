import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Login = () => {
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

        <Text style={styles.loginText}>Login</Text>

        <View style={styles.menuList}>
          <Text style={styles.menuText}>1. Open the app and select “Login.”</Text>

          <Text style={styles.menuText}>2. Enter your registered email and password.</Text>

          <Text style={styles.menuText}>3. Click "Login."</Text>

          <Text style={styles.menuText}>
            4. If you forget your password, click on "Forgot Password?" 
            to initiate the recovery process.
          </Text>
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
  loginText: {
    fontSize: 24, 
    marginVertical: 20, 
    marginRight: 30,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  menuList: {
    marginHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 25, 
  },
});

export default Login;
