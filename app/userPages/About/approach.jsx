import React from 'react';
import { View, Text, StyleSheet, ScrollView,Image,TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
const approach = () => {
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

      <Text style={styles.titleText}>Our Approach to Safety</Text>
      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>1. Streamlined Reporting: Making it easy for employees to report incidents within seconds, enabling quick responses.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>2. Data-Driven Insights: Leveraging collected data to identify safety trends and improve organizational policies.</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>3. Compliance with Safety Standards: Our platform is designed to meet safety regulations such as OSHA and ISO standards, ensuring organizations remain compliant.</Text>
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
    left: 15,
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
    padding: 20,
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
    margin: 20,
    textAlign: 'center',
    color: '#000',
    marginBottom: 45, 
    fontWeight: 'bold',
  },
  menuList: {
    marginHorizontal: 5,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
    marginHorizontal: 5,
    textAlign: 'justify', 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#000',
    textAlign: 'justify',
  },
});

export default approach ;
