import React from 'react';
import { View, Text, StyleSheet, ScrollView,Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
const project = () => {
  const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Go back">
            <Image source={require("../../../assets/images/back-button.png")} style={styles.backButtonImage} />
          </TouchableOpacity>
        <Text style={styles.headerText}>About</Text>
      </View>

      <Text style={styles.titleText}>About the Project</Text>

      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. InciSafe Manager is a mobile and desktop platform developed by Loginware Softtec Private Limited.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. It helps in streamlining the reporting, management, and resolution of workplace safety incidents</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. The platform replaces traditional paper-based systems with a more efficient digital solution.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>4. Employees and safety officers can report incidents in real time, ensuring quick and accurate submissions.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>5. The platform allows users to submit incidents quickly and efficiently, using either mobile devices or desktop computers.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>6. Every reported incident is tracked, ensuring it is addressed and resolved within the system.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>7. The platform logs all incidents, which improves accountability by keeping a permanent record of reported issues.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>8. By using InciSafe Manager, organizations can enhance their safety protocols and ensure a safer workplace environment.</Text>
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
  backButton: {
    alignSelf: "flex-start",
    marginBottom: -20,
    position: "absolute",
    left: 7,
    top: 10,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 25,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    padding: 15,
    // margin:35,
    borderBottomWidth: 1.8,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -8,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
  },
  titleText: {
    fontSize: 22,
    margin: 15,
    textAlign: 'center',
    color: '#555',
    marginBottom: 35, 
  },
  menuList: {
    marginHorizontal: 10,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
    marginHorizontal: 5,
    
  },
  menuText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#222',
    textAlign: 'justify', 
  },
});

export default project;
