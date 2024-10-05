import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Image, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../../../configs/FirebaseConfig';

export default function UniformSafety() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [violationTypes, setViolationTypes] = useState({
    shoes: false,
    dressCode: false,
    safetyGears: false,
  });
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [evidence, setEvidence] = useState(null);
  const [evidenceName, setEvidenceName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get('http://192.168.0.101:3000/departments');
        setDepartments(deptResponse.data.map(dept => ({ label: dept, value: dept })));
        
        const empResponse = await axios.get('http://192.168.0.101:3000/employees');
        setEmployees(empResponse.data.map(emp => ({ label: emp, value: emp })));
      } catch (error) {
        Alert.alert("Error", "Failed to fetch data from the server.");
      }
    };
    fetchData();
  }, []);

  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleUploadEvidence = async (source) => {
    try {
      let result;
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Camera access is required to take photos.');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      console.log('Image picker result:', result); // Log the entire result object

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        console.log('Selected asset:', selectedAsset);

        setEvidence(selectedAsset.uri);
        setEvidenceName(selectedAsset.uri.split('/').pop());
        console.log('Evidence set:', selectedAsset.uri);
        console.log('Evidence name set:', selectedAsset.uri.split('/').pop());
      } else {
        console.log('Image selection was canceled or no asset was selected');
        Alert.alert('Info', 'No image was selected.');
      }
    } catch (error) {
      console.error('Error in handleUploadEvidence:', error);
      Alert.alert('Error', 'Failed to upload evidence. Please try again. Error: ' + error.message);
    }
  };

  const handleReset = () => {
    setDate(new Date());
    setSelectedDepartment(null);
    setSelectedEmployee(null);
    setIncidentDescription('');
    setViolationTypes({
      shoes: false,
      dressCode: false,
      safetyGears: false,
    });
    setEvidence(null);
  };

  const handleSubmit = async () => {
    try {
      const incidentCategory = "Uniform Safety Equipment Violation"; // Define the incident category

      const violationData = {
        date: date.toISOString(),
        selectedDepartment,
        selectedEmployee,
        incidentDescription,
        violationTypes,
        incidentCategory,
      };
  
      if (evidence) {
        violationData.evidence = evidence;
      }
  
      await addDoc(collection(db, "violations"), violationData);
      Alert.alert("Success", "Form submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to submit the form. Please try again.");
    }
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.header}>Uniform Safety Equipment Violation</Text>

      <Text style={styles.label}>Violation Type:</Text>
      <FlatList
        data={violationTypesData}
        renderItem={renderViolationType}
        keyExtractor={item => item.key}
      />

      <TouchableOpacity style={styles.dateButton} onPress={() => setDatePickerVisibility(true)}>
        <Text style={styles.dateButtonText}>Select Date & Time of violation</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Text style={styles.dateText}>{date.toLocaleString()}</Text>

      <Text style={styles.label}>Select Department</Text>
      <DropDownPicker
        open={openDepartment}
        value={selectedDepartment}
        items={departments}
        setOpen={setOpenDepartment}
        setValue={setSelectedDepartment}
        placeholder="Select Department"
        searchable
        searchPlaceholder="Type to filter..."
        style={styles.dropdown}
        zIndex={5000}
      />

      <Text style={styles.label}>Employee Details</Text>
      <DropDownPicker
        open={openEmployee}
        value={selectedEmployee}
        items={employees}
        setOpen={setOpenEmployee}
        setValue={setSelectedEmployee}
        placeholder="Employee Details"
        searchable
        searchPlaceholder="Type to filter..."
        style={styles.dropdown}
        zIndex={4000}
      />

      <View style={styles.evidenceContainer}>
        <TouchableOpacity style={styles.evidenceButton} onPress={() => handleUploadEvidence('camera')}>
          <Text style={styles.evidenceButtonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.evidenceButton} onPress={() => handleUploadEvidence('library')}>
          <Text style={styles.evidenceButtonText}>Upload from Gallery</Text>
        </TouchableOpacity>
      </View>
      {evidence && (
        <>
          <Image source={{ uri: evidence }} style={styles.evidenceImage} />
          <Text style={styles.evidenceText}>Uploaded: {evidenceName}</Text>
        </>
      )}

      <TextInput
        placeholder="Incident Description"
        value={incidentDescription}
        onChangeText={text => setIncidentDescription(text)}
        multiline
        numberOfLines={4}
        style={styles.textInput}
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Reset" onPress={handleReset} color="red" />
    </View>
  );

  const renderViolationType = ({ item }) => (
    <View style={styles.checkboxContainer}>
      <Checkbox
        status={violationTypes[item.key] ? 'checked' : 'unchecked'}
        onPress={() => setViolationTypes({ ...violationTypes, [item.key]: !violationTypes[item.key] })}
      />
      <Text>{item.label}</Text>
    </View>
  );

  const violationTypesData = [
    { key: 'shoes', label: 'Not wearing proper shoes' },
    { key: 'dressCode', label: 'Not following the proper dress code' },
    { key: 'safetyGears', label: 'Missing gloves/other safety gears' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <FlatList
            data={[{ key: 'form' }]}
            renderItem={renderContent}
            keyExtractor={item => item.key}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  container: {
    flex: 1,
    marginTop: 25,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  dropdown: {
    marginBottom: 20,
  },
  evidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  evidenceButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  evidenceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  evidenceImage: {
    width: '100%',
    height: 300,
    marginVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  evidenceText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});