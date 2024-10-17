import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GetStarted = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Help Center</Text>
        </View>

        <Text style={styles.getstartedText}>Get Started</Text>

        <View style={styles.menuList}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/userPages/helpsupport/GETSTARTED/Accountcreation')}
          >
            <Text style={styles.menuText}>Account Creation</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/userPages/helpsupport/GETSTARTED/Login')}
          >
            <Text style={styles.menuText}>Login</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push('/userPages/helpsupport/GETSTARTED/system')} 
          >
            <Text style={styles.menuText}>System Requirements</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="black" style={styles.chevron} />
          </TouchableOpacity>
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
  getstartedText: {
    fontSize: 21,
    margin: 35,
    textAlign: "center",
    color: "#555",
  },
  menuList: {
    marginHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 10,
    padding: 3,
  },
  menuText: {
    fontSize: 18,
  },
  chevron: {
    position: "absolute",
    right: 2,
  },
});

export default GetStarted;
