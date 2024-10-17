import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LineSVG from "../../components/LineSVG";

const HelpCenter = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("./../../assets/images/background.jpg")}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Image
              source={require("./../../assets/images/back-button.png")}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help Center</Text>
        </View>
        <LineSVG style={styles.line} />
        <Text style={styles.welcomeText}>Welcome to the Support Center</Text>

        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/getstarted")}
          >
            <Text style={styles.menuText}>Get Started</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/incidentReport")}
          >
            <Text style={styles.menuText}>How to Report an Incident</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push("/userPages/HelpSupport/incidentManagement")
            }
          >
            <Text style={styles.menuText}>Incident Management</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/notifications")}
          >
            <Text style={styles.menuText}>Notifications and Alerts</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/Documentation")}
          >
            <Text style={styles.menuText}>
              Documentation and Evidence Upload
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push("/userPages/HelpSupport/troubleshooting")
            }
          >
            <Text style={styles.menuText}>Troubleshooting</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/FAQ")}
          >
            <Text style={styles.menuText}>
              Frequently Asked Questions (FAQs)
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/HelpSupport/contactSupport")}
          >
            <Text style={styles.menuText}>Contact Support</Text>
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
    // paddingTop: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
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
  },
  line: {
    marginBottom: 10,
    marginTop: 25,
    width: "110%",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 80,
    top: -5,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  welcomeText: {
    fontSize: 21,
    // margin: 25,
    marginTop: 15,
    marginBottom: 25,
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
    marginHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
  },
  chevron: {
    position: "absolute",
    right: 5,
  },
});

export default HelpCenter;