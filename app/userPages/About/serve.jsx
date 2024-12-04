import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const serve = () => {
  const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About</Text>
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

      <Text style={styles.titleText}>Who We Serve</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Large and Small Organizations: From small businesses to large corporations, our platform adapts to the needs of organizations of all sizes.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Employees: Simplifies the process of reporting incidents for on-the-ground staff.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Safety Officers and Admins: Provides tools to manage incident reports, track resolutions, and analyze trends.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>4. Industries: Serves industries such as manufacturing,construction,healthcare, and more where workplace safety is crucial.</Text>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 20,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 50,
    marginBottom: -8,
    marginTop: 15,
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 6,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: -20,
    position: "relative",
    right: 200,
    top: -6,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
    marginRight: 20,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 55, 
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
    marginHorizontal: 15,
    textAlign: 'justify', 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#222',
    textAlign: 'justify',
  },
});

export default serve;
