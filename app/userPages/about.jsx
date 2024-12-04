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

const About = () => {
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
          <Text style={styles.headerText}>About </Text>
        </View>

        <LineSVG style={styles.line} />

        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/project")}
          >
            <Text style={styles.menuText}>About the Project</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/mission")}
          >
            <Text style={styles.menuText}>Our Mission</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/features")}
          >
            <Text style={styles.menuText}>Key Features of the System</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/futureplan")}
          >
            <Text style={styles.menuText}>Innovation and Future Plans</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/datasecurity")}
          >
            <Text style={styles.menuText}>Our Commitment to Data Security</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/approach")}
          >
            <Text style={styles.menuText}>Our Approach to Safety</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/serve")}
          >
            <Text style={styles.menuText}>Who we serve </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/About/contactus")}
          >
            <Text style={styles.menuText}>Contact Us</Text>
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
    // padding: 10,
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
    marginLeft: -15,
    marginTop: 15,
    shadowColor: "#000",
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    right: 110,
    top: -5,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },

  menuList: {
    marginHorizontal: 15,
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    // borderBottomWidth: 0.8,
    // borderBottomColor: '#ddd',
    marginHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
  chevron: {
    position: "absolute",
    right: 2,
  },
});

export default About;
