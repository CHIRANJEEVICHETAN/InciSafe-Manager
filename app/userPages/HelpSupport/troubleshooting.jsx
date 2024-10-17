import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const trouble = () => {
    const router = useRouter();
  return (
    <ImageBackground source={require('../../../assets/images/background.jpg')} style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help Center</Text>
      </View>

      <Text style={styles.getstartedText}>Trouble Shooting</Text>

      <View style={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/userPages/helpsupport/TROUBLE/loginissue')}>
          <Text style={styles.menuText}>1. Login Issues</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="black"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/userPages/helpsupport/TROUBLE/submission')}>
          <Text style={styles.menuText}>2. Submission Errors</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="black"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/userPages/helpsupport/TROUBLE/notificationprblm')}>
          <Text style={styles.menuText}>3. Notification Problems</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="black"
            style={styles.chevron}
          />
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
    alignContent: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    paddingLeft: 120,
  },
  getstartedText: {
    fontSize: 21,
    margin: 15,
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
    // borderBottomWidth: 0.8,
    // borderBottomColor: "#ddd",
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
  },
  chevron: {
    position: "absolute",
    right: 2,
  },
});

export default trouble;
