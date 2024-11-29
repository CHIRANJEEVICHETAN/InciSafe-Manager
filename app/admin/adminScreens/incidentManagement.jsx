import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";
import LogoSVG from "../../../components/LogoSVG";
import getConfig from "./../../../configs/config";

const { BASE_URL } = getConfig();

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", optionsDate).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-IN", optionsTime).format(
    date
  );
  return { formattedDate, formattedTime };
};

const IncidentItem = ({ id, date, department, onDetailsClick }) => {
  const { formattedDate, formattedTime } = formatDateTime(date);
  return (
    <View style={styles.incidentItem}>
      <Text style={styles.idText}>{id}</Text>
      <View style={styles.dateColumn}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.timeText}>{formattedTime}</Text>
      </View>
      <Text style={styles.departmentText}>{department}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={onDetailsClick}
        accessibilityLabel={`View details for incident ${id}`}
      >
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
};

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchIncidents();
    fetchDepartments();
  }, []);

  const fetchIncidents = async () => {
    const incidentData = [];
    const categories = [
      "BehaviourIncident",
      "ChemicalIncident",
      "EnvironmentalHazard",
      "EquipmentIssues",
      "FireIncident",
      "HealthSafety",
      "PolicyViolation",
      "WeatherHazards",
      "uniformSafety",
    ];

    try {
      for (const category of categories) {
        const querySnapshot = await getDocs(collection(db, category));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          incidentData.push({
            id: doc.id,
            date: data.date,
            department: data.selectedDepartment,
            category,
            ...data,
          });
        });
      }
      setIncidents(incidentData);
      setFilteredIncidents(incidentData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/departments`);
      setDepartments(
        response.data.map((dept) => ({ label: dept, value: dept }))
      );
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const filterIncidents = () => {
    let filtered = incidents.filter((incident) => {
      const incidentDate = new Date(incident.date);
      return (
        incidentDate >= selectedStartDate && incidentDate <= selectedEndDate
      );
    });

    if (selectedDepartment) {
      filtered = filtered.filter(
        (incident) => incident.department === selectedDepartment
      );
    }

    setFilteredIncidents(filtered);
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setSelectedStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setSelectedEndDate(selectedDate);
    }
  };

  return (
    <ImageBackground
      source={require("./../../../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      {Platform.OS === "ios" && (
        <View style={{ height: 20, backgroundColor: "transparent" }} />
      )}
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

        <View style={styles.filterContainer}>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text>{selectedStartDate.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={24} color="#000" />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={selectedStartDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={() => setShowEndDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text>{selectedEndDate.toLocaleDateString()}</Text>
              <Ionicons name="calendar-outline" size={24} color="#000" />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={selectedEndDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            )}
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Department" value="" />
              {departments.map((dept) => (
                <Picker.Item
                  key={dept.value}
                  label={dept.label}
                  value={dept.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={filterIncidents}
          accessibilityLabel="Apply filters"
        >
          <Text style={styles.filterButtonText}>Apply Filters</Text>
        </TouchableOpacity>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Department</Text>
          <Text style={styles.headerCell}>View</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <ScrollView style={styles.incidentList}>
            {filteredIncidents.map((incident, index) => (
              <IncidentItem
                key={incident.id}
                id={String(index + 1).padStart(3, "0")}
                date={incident.date}
                department={incident.department}
                onDetailsClick={() => {
                  const updatedIncident = {
                    ...incident,
                    evidence: encodeURIComponent(incident.evidence),
                  };
                  router.push({
                    pathname: "/admin/adminScreens/incidentDetails",
                    params: { incident: JSON.stringify(updatedIncident) },
                  });
                }}
              />
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => router.push("/admin/adminScreens/reportDownload")}
          accessibilityLabel="Download report"
        >
          <Text style={styles.downloadButtonText}>Download Report</Text>
          <Ionicons name="download-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(236, 240, 241, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  backButton: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 18,
    top: -8,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 23,
    zIndex: 1000,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    // width: 50,
  },
  datePickerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 3,
    width: 100,
  },
  pickerContainer: {
    flex: 1.8,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  incidentList: {
    flex: 1,
    marginHorizontal: 10,
  },
  incidentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Changed to white with transparency
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  idText: {
    flex: 1,
    textAlign: "center",
  },
  dateColumn: {
    flex: 1,
    textAlign: "center",
  },
  dateText: {
    textAlign: "center",
  },
  timeText: {
    textAlign: "center",
  },
  departmentText: {
    flex: 1,
    textAlign: "center",
  },
  detailsButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    // paddingHorizontal: 5,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 2,
    marginVertical: 2,
    marginTop: -15,
  },
  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 10,
  },
  filterButton: {
    // flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    // paddingVertical: 5,
    // paddingHorizontal: 5,
    borderRadius: 5,
    // marginRight: 3,
    marginBottom: 10,
    width: "30%",
    height: 35,
    alignContent: "center",
    alignSelf: "center",
  },
  filterButtonText: {
    color: "#fff",
  },
  downloadButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    margin: 20,
  },
  downloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  loader: {
    marginTop: 20,
  },
  backButton: {
    alignSelf: "flex-start",
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
