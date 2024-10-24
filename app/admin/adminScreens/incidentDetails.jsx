import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";

// Custom hook for Firestore updates
const useFirestoreUpdate = () => {
  const updateDocument = useCallback(async (collection, id, data) => {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, data);
    const updatedDoc = await getDoc(docRef);
    return updatedDoc.data();
  }, []);

  return { updateDocument };
};

export default function IncidentDetails() {
  const params = useLocalSearchParams();
  const initialIncident = useMemo(() => params.incident ? JSON.parse(params.incident) : null, [params.incident]);

  const [incident, setIncident] = useState(initialIncident);
  const [isUpdating, setIsUpdating] = useState(false);

  const { updateDocument } = useFirestoreUpdate();

  useEffect(() => {
    if (initialIncident) {
      setIncident(initialIncident);
    }
  }, [initialIncident]);

  const renderField = useCallback((label, value) => {
    if (label === "ID") {
      // Split the ID to separate the timestamp
      const parts = value.split("-");
      const timestamp = parts.pop();
      // Format the timestamp correctly
      const formattedDate = `${timestamp.slice(0, 2)}/${timestamp.slice(2, 4)}/${timestamp.slice(4, 8)}-${timestamp.slice(9, 11)}:${timestamp.slice(11, 13)}`;
      // Reconstruct the ID with the formatted date
      const formattedID = `${parts.join("-")}-${formattedDate}`;
      return (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{formattedID}</Text>
        </View>
      );
    }
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  }, []);

  const updateIncidentStatus = useCallback(async (newStatus) => {
    if (newStatus === incident.status) return;

    setIsUpdating(true);
    try {
      const updatedIncident = await updateDocument(incident.category, incident.id, { status: newStatus });
      setIncident(prev => ({ ...prev, ...updatedIncident }));
      Alert.alert("Success", `Incident status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating incident status:", error);
      Alert.alert("Error", "Failed to update incident status. Try again.");
    } finally {
      setIsUpdating(false);
    }
  }, [incident, updateDocument]);

  if (!incident) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No incident details available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#ff7e5f", "#feb47b"]}
        style={styles.headerGradient}
      >
        <Text style={styles.title}>Incident Details</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {renderField("ID", incident.id)}
        {renderField("Category", incident.incidentCategory)}
        {renderField("Description", incident.incidentDescription)}
        {renderField("Department", incident.selectedDepartment)}
        {renderField("Employee", incident.selectedEmployee)}
        {renderField("Date", new Date(incident.date).toLocaleString())}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={incident.status}
            onValueChange={updateIncidentStatus}
            style={styles.picker}
            enabled={!isUpdating}
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Resolved" value="resolved" />
          </Picker>
          {isUpdating && (
            <ActivityIndicator
              style={styles.loader}
              size="small"
              color="#ff6347"
            />
          )}
        </View>

        {renderField(
          "Violation Types",
          Object.entries(incident.violationTypes)
            .filter(([_, value]) => value === true)
            .map(([key]) => key)
            .join(", ")
        )}

        <Text style={styles.evidenceLabel}>Evidence:</Text>
        {incident.evidence ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: incident.evidence }}
              style={styles.evidenceImage}
              accessibilityLabel="Incident evidence image"
            />
          </View>
        ) : (
          <Text style={styles.noImageText}>No evidence provided</Text>
        )}
      </View>
    </ScrollView>
  );
}

IncidentDetails.propTypes = {
  incident: PropTypes.shape({
    id: PropTypes.string,
    incidentCategory: PropTypes.string,
    incidentDescription: PropTypes.string,
    selectedDepartment: PropTypes.string,
    selectedEmployee: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
    violationTypes: PropTypes.object,
    evidence: PropTypes.string,
  }),
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  contentContainer: {
    padding: 20,
  },
  fieldContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#2c3e50",
  },
  picker: {
    marginTop: 5,
  },
  evidenceLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginTop: 20,
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  evidenceImage: {
    width: width - 60,
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  loader: {
    position: "absolute",
    top: 150,
  },
  errorText: {
    color: "#e74c3c",
    marginTop: 10,
    textAlign: "center",
  },
  noImageText: {
    marginTop: 20,
    fontStyle: "italic",
    color: "#7f8c8d",
    textAlign: "center",
  },
});
