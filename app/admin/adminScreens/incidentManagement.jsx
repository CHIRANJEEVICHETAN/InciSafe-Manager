import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoSVG from "../../../components/LogoSVG";
import { useRouter } from "expo-router";

const IncidentItem = ({ id, date, department }) => (
  <View style={styles.incidentItem}>
    <Text style={styles.idText}>{id}</Text>
    <Text style={styles.dateText}>{date}</Text>
    <Text style={styles.departmentText}>{department}</Text>
    <TouchableOpacity style={styles.detailsButton}>
      <Text style={styles.detailsButtonText}>Details</Text>
      <Ionicons
        name="chevron-down"
        size={16}
        color="#fff"
        style={{ marginTop: 2 }}
      />
    </TouchableOpacity>
  </View>
);

export default function IncidentManagement() {
  const incidents = [
    { id: "001", date: "21-10-24", department: "HR" },
    { id: "002", date: "25-09-24", department: "Engineering" },
    { id: "003", date: "30-09-24", department: "Engineering" },
    { id: "004", date: "20-08-24", department: "HR" },
    { id: "005", date: "12-09-24", department: "HR" },
    { id: "006", date: "05-07-24", department: "Management" },
    { id: "007", date: "05-07-24", department: "Management" },
    { id: "008", date: "05-07-24", department: "Management" },
    { id: "009", date: "05-07-24", department: "Management" },
    { id: "010", date: "05-07-24", department: "Management" },
    { id: "011", date: "05-07-24", department: "Management" },
    { id: "012", date: "05-07-24", department: "Management" },
    { id: "013", date: "05-07-24", department: "Management" },
    { id: "014", date: "05-07-24", department: "Management" },
    { id: "015", date: "05-07-24", department: "Management" },
    { id: "016", date: "05-07-24", department: "Management" },
    { id: "017", date: "05-07-24", department: "Management" },
  ];
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Image
            source={require("./../../../assets/images/back-button.png")}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incident Management</Text>
      </View>

      <LogoSVG style={styles.logo} />

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Department</Text>
        <Text style={styles.headerCell}>View</Text>
      </View>

      <ScrollView style={styles.incidentList}>
        {incidents.map((incident) => (
          <IncidentItem key={incident.id} {...incident} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Report</Text>
        <Ionicons name="download-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // padding: 16,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
    marginTop: -1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#d1d1d1",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  incidentList: {
    flex: 1,
    marginHorizontal: 10,
  },
  incidentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  idText: {
    flex: 1,
    textAlign: "center",
  },
  dateText: {
    flex: 1,
    textAlign: "center",
  },
  departmentText: {
    flex: 1,
    textAlign: "center",
  },
  detailsButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 25,
    // width: 10,
    marginLeft: 5,
    marginRight: -7,
  },
  detailsButtonText: {
    color: "#fff",
    marginRight: 5,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    // marginTop: 10,
    // marginBottom: -10,
    position: "absolute",
    left: 16,
    top: -15,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 23,
    zIndex: 1000,
  },
});
