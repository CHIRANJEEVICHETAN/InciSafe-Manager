import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Account = () => {
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


        <Text style={styles.accountText}>Account Creation</Text>

        <View style={styles.menuList}>
          <Text style={styles.menuText}>1.  Go to the app and select “Sign Up”.</Text>
          
          <Text style={styles.menuText}>2.  Fill the required fields:</Text>
          <View style={styles.subBulletContainer}>
            <Text style={styles.subBulletPoint}>- Username</Text>
            <Text style={styles.subBulletPoint}>- Email</Text>
            <Text style={styles.subBulletPoint}>- Password</Text>
          </View>

          <Text style={styles.menuText}>3.  Click “Register”.</Text>
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
    right: 290,
    top: -10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  accountText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  menuList: {
    marginHorizontal: 25,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: "#000",
    // fontWeight: "bold",
  },
  subBulletContainer: {
    marginLeft: 25, 
  },
  subBulletPoint: {
    fontSize: 18,
    marginBottom: 10, 
  },
});

export default Account;
