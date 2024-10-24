import React, { useEffect, useState } from "react";
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
import { BarChart } from "react-native-chart-kit";
import LogoSVG from "../../../components/LogoSVG";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../../configs/FirebaseConfig"; // Import your Firestore instance

const StatCard = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const AdminDashboard = () => {
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);
  const [notificationsSent, setNotificationsSent] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        let total = 0;
        let active = 0;
        let resolved = 0;
        let notifications = 0;

        // Fetch incidents from all categories
        for (const category of categories) {
          const querySnapshot = await getDocs(collection(db, category));
          total += querySnapshot.size; // Total incidents

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.status === "active") {
              active++; // Active incidents
            } else if (data.status === "resolved") {
              resolved++; // Resolved incidents
            }
            if (data.notificationSent) {
              notifications++; // Notifications sent
            }
          });
        }

        setTotalIncidents(total);
        setActiveIncidents(active);
        setResolvedIncidents(resolved);
        setNotificationsSent(notifications);
      } catch (error) {
        console.error("Error fetching incident data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: [
      "Health & Safety",
      "Equipment Issues",
      "Fire Hazards",
      "Policy Violations",
    ],
    datasets: [
      {
        data: [20, 15, 10, 5], // This should be dynamic later
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#e0f7f6",
    backgroundGradientTo: "#e0f7f6",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
        </View>

        <LogoSVG style={styles.logo} />

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <StatCard title="Total Incidents" value={totalIncidents} />
          <StatCard title="Active Incidents" value={activeIncidents} />
          <StatCard title="Resolved Incidents" value={resolvedIncidents} />
          <StatCard title="Notifications Sent" value={notificationsSent} />
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Incident Categories Analysis</Text>
          <BarChart
            data={chartData}
            width={350}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7f6",
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
  logo: {
    width: 150,
    height: 50,
    alignSelf: "center",
    marginVertical: 5,
    marginTop: -1,
  },
  statsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 55,
    paddingTop: 18,
    paddingBottom: 18,
    marginBottom: 10,
    alignItems: "center",
    width: "85%",
    marginLeft: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    right: 50,
  },
  statTitle: {
    fontSize: 20,
    color: "#666",
    marginLeft: 50,
  },
  chartContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginTop: -5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default AdminDashboard;
