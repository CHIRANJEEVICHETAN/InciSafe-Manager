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
import { BarChart } from "react-native-chart-kit";
import LogoSVG from "../../../components/LogoSVG";
import { useRouter } from "expo-router";

const StatCard = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const AdminDashboard = () => {
  const router = useRouter();
  // We'll add the component logic here
  const chartData = {
    labels: [
      "Health & Safety",
      "Equipment Issues",
      "Fire Hazards",
      "Policy Violations",
    ],
    datasets: [
      {
        data: [20, 15, 10, 5],
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

        {/* We'll add the statistics cards here */}
        <View style={styles.statsContainer}>
          <StatCard title="Total Incidents" value="90" />
          <StatCard title="Active Incidents" value="10" />
          <StatCard title="Resolved Incidents" value="90" />
        </View>

        {/* We'll add the bar chart here */}
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
    // padding: 16,
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
  // We'll add more styles as we build the component
  statsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
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
