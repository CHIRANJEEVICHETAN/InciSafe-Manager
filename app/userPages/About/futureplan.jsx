import React from 'react';
import { View, Text, StyleSheet, ScrollView,Image,TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
const Future = () => {
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

        <Text style={styles.titleText}>Innovation and Future Plans</Text>

        <View style={styles.menuList}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>1. Advanced Predictive Analytics</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Incorporating machine learning models to predict potential incidents based on historical data.</Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>2. NLP (Natural Language Processing)</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Adding speech-to-text features for faster, hands-free incident reporting.</Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>3. Enhanced UI/UX</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Continuously improving the user interface for smoother workflows and easier navigation.</Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <Text style={styles.menuText}>4. Integration with Wearable Devices</Text>
            <View style={styles.bulletContainer}>
              <Text style={styles.bulletText}>- Allowing users to report incidents directly from smart devices (e.g., smartwatches).</Text>
            </View>
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
    color: '#555',
    marginBottom: 55, 
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    marginHorizontal: 15,
    textAlign: 'justify', 
  },
  menuText: {
    fontSize: 18,
    marginBottom: 5, 
    textAlign: 'justify',
  },
  bulletContainer: {
    marginLeft: 20, 
    marginBottom: 15, 
  },
  bulletText: {
    fontSize: 16,
    color: '#555', 
    lineHeight: 22, 
    position: 'relative',
  },
});

export default Future;
