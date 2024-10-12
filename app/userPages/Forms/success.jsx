import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SuccessPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Submission Successful!</Text>
          <Text style={styles.subtitle}>
            Thank you for reporting the incident.
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Incident Category:</Text>
            <Text style={styles.detailValue}>{params.incidentCategory}</Text>

            <Text style={styles.detailLabel}>Submission ID:</Text>
            <Text style={styles.detailValue}>{params.docId}</Text>

            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailValue}>{params.departmentName}</Text>

            <Text style={styles.detailLabel}>Submission Date:</Text>
            <Text style={styles.detailValue}>{params.submissionDate}</Text>
          </View>
          <Text style={styles.notification}>
            You will receive a notification once any action is taken regarding
            this incident.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/user/Home")}
          >
            <Text style={styles.buttonText}>Return to Home Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  notification: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
