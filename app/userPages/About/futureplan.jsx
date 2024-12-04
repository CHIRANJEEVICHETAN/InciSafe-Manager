import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
const Future = () => {
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
    marginLeft: 50,
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
    top: -10,
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
    margin: 20,
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
    paddingVertical: 5,
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
    color: '#222', 
    lineHeight: 22, 
    position: 'relative',
  },
});

export default Future;
