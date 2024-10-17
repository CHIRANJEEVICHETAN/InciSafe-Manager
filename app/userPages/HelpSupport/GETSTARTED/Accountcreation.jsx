import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const Account = () => {
  return (
    <ImageBackground source={require('../../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Help Center</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    paddingLeft: 120,
  },
  accountText: {
    fontSize: 21,
    margin: 25,
    textAlign: "center",
    color: "#555",
  },
  menuList: {
    marginHorizontal: 25,
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
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
