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

const Terms = () => {
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
          <Text style={styles.headerText}>Terms & Conditions </Text>
        </View>
        <LineSVG style={styles.line} />

        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push("/userPages/termsandcondition/Introduction")
            }
          >
            <Text style={styles.menuText}>Introduction</Text>
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
              router.push("/userPages/termsandcondition/useofplatform")
            }
          >
            <Text style={styles.menuText}>Use of Platform</Text>
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
              router.push("/userPages/termsandcondition/useraccount")
            }
          >
            <Text style={styles.menuText}>User Accounts</Text>
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
              router.push("/userPages/termsandcondition/incidentreport")
            }
          >
            <Text style={styles.menuText}>Incident Reporting</Text>
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
              router.push("/userPages/termsandcondition/dataprivacy")
            }
          >
            <Text style={styles.menuText}>Data Privacy and Security </Text>
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
              router.push("/userPages/termsandcondition/suspension")
            }
          >
            <Text style={styles.menuText}>Suspension and Termination</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="black"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/userPages/termsandcondition/privacy")}
          >
            <Text style={styles.menuText}>Privacy and Confidentiality </Text>
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
              router.push("/userPages/termsandcondition/contactinfo")
            }
          >
            <Text style={styles.menuText}>Contact Information</Text>
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
    right: 20,
    // top: -5,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },

  menuList: {
    marginHorizontal: 25,
    paddingTop: 70,
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
  },
  chevron: {
    position: "absolute",
    right: 5,
  },
});

export default Terms;
