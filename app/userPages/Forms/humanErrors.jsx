import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Image, Platform, KeyboardAvoidingView, FlatList, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './../../../configs/FirebaseConfig';
import DateTimePickerField from './../../../components/DateTimePicker';
import LogoSVG from './../../../components/LogoSVG';
import LineSVG from './../../../components/LineSVG';
import { getAuth } from 'firebase/auth';
import { useRouter, useLocalSearchParams } from "expo-router";
import getConfig from "./../../../configs/config";
import VoiceInput from '../../../components/VoiceInput';

export default function BehaviourIncident() {
  const { BASE_URL } = getConfig();
  const router = useRouter();
  const auth = getAuth();
  const params = useLocalSearchParams();
  const {
  autoFill,
  department,
  severity,
  description,
  violationType,
  date: autoFillDate,
  evidenceUrl
  } = params; 
  console.log('Navigation Params:', {
    autoFill,
    department,
    severity,
    description,
    violationType,
    autoFillDate
  });
  const [user, setUser] = useState(null);
  // State variables for form data and UI control
  const [date, setDate] = useState(autoFill && autoFillDate ? new Date(autoFillDate) : new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [incidentDescription, setIncidentDescription] = useState(autoFill ? description : '');
  const [violationTypes, setViolationTypes] = useState({
    behavior: autoFill ? violationType === 'behavior' : false,
    tools: false,
    distractions: false,
  });
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [evidence, setEvidence] = useState(null);
  const [evidenceName, setEvidenceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add this to the first useEffect
  useEffect(() => {
    if (autoFill === "true" && evidenceUrl) {
      setEvidence(evidenceUrl);
      setEvidenceName('auto-generated-evidence.jpg');
    }
  }, [autoFill, evidenceUrl]);

  // Fetch departments and employees data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get(`${BASE_URL}/departments`);
        setDepartments(deptResponse.data.map(dept => ({ label: dept, value: dept })));
        
        const empResponse = await axios.get(`${BASE_URL}/employees`);
        setEmployees(empResponse.data.map(emp => ({ label: emp, value: emp })));
} catch (error) {
        Alert.alert("Error", "Failed to fetch data from the server. In humanErrors");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Auto-fill Effect Triggered:', {
      autoFill,
      departmentsLoaded: departments.length > 0,
      // severityLoaded: Severity.length > 0,
      department,
      // severity
    });
    
    if (autoFill === "true" && departments.length > 0) {
      if (department) {
        const matchingDept = departments.find(
          dept => dept.value.toUpperCase() === department.toUpperCase()
        );
        console.log('Matching Department:', matchingDept);
        if (matchingDept) {
          setSelectedDepartment(matchingDept.value);
        }
      }
      // if (severity) {
      //   const matchingSeverity = Severity.find(
      //     sev => sev.value.toLowerCase() === severity.toLowerCase()
      //   );
      //   console.log('Matching Severity:', matchingSeverity);
      //   if (matchingSeverity) {
      //     setSelectedSeverity(matchingSeverity.value);
      //   }
      // }
    }
  }, [autoFill, departments, department]);

  // Modify the auto-submit effect
useEffect(() => {
  console.log('Auto-submit Effect Triggered:', {
    autoFill,
    selectedDepartment,
    incidentDescription,
    allFieldsFilled: !!(autoFill === "true" && selectedDepartment && incidentDescription)
  });
  
  if (autoFill === "true" && selectedDepartment && incidentDescription) {
    console.log('Attempting auto-submit...');
    // Add a small delay to ensure all states are updated
    setTimeout(() => {
      handleSubmit();
    }, 1000);
  }
}, [autoFill, selectedDepartment, incidentDescription]);

  // Handle date selection from date picker
  const handleDateConfirm = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  // Handle image upload from camera or gallery
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

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setEvidence(selectedAsset.uri);
        setEvidenceName(selectedAsset.uri.split('/').pop());
      } else {
        Alert.alert('Info', 'No image was selected.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload evidence. Please try again. Error: ' + error.message);
    }
  };

  // Reset form fields to initial state
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

  // Upload image to storage and get its URL
  const uploadImageAndGetURL = async (imageUri) => {
    const storage = getStorage();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${Date.now()}-${imageUri.split('/').pop()}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  // Format date and time for document ID
  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}${month}${year}T${hours}${minutes}`;
  };

  const dateTime = formatDateTime(new Date());

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const incidentCategory = "Behaviour and Human Error Incident";
  
      let imageUrl = null;
      if (evidence) {
        imageUrl = await uploadImageAndGetURL(evidence);
      }

      // Ensure you have the current user's information
      const currentUser = auth.currentUser;
      const username = currentUser ? currentUser.displayName : "Unknown User";
      const email = currentUser ? currentUser.email : "Unknown Email";
  
      const violationData = {
        incidentCategory,
        violationTypes,
        date: date.toISOString(),
        selectedDepartment,
        selectedEmployee,
        status: "active", // Set the initial status to "active"
        notificationSent: false, // Set the initial notification status to "false"
        ...(imageUrl && { evidence: imageUrl }), // Store image URL
        incidentDescription,
        username,
        email,
      };
  
      const customDocId = `violation-${selectedDepartment}-${dateTime}`; // Create a custom document ID 
      await setDoc(doc(db, "BehaviourIncident", customDocId), violationData); // Use setDoc with custom ID

      // Send notification request to the server
      const notificationResponse = await axios.post(`${BASE_URL}/sendNotification`, {
        title: `A new Incident Reported - ${incidentCategory}`,
        body: `Incident Reported by ${username} at ${date.toLocaleString()} in ${selectedDepartment}`,
        date: date.toISOString(),
        username: username,
        userId: currentUser.uid,
      });

      // Check if the notification was sent successfully
      if (notificationResponse.status === 200) {
        // Update the document to set notificationSent to true
        await setDoc(doc(db, "BehaviourIncident", customDocId), { notificationSent: true }, { merge: true });
      }

      router.push({
        pathname: "/userPages/Forms/success",
        params: {
          docId: customDocId,
          departmentName: selectedDepartment,
          submissionDate: date.toISOString().split("T")[0],
          incidentCategory: incidentCategory,
        },
      })


      handleReset();
    } catch (error) {
      Alert.alert("Error", "Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Render the form content
  const renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.logoContainer}>
        <LogoSVG style={styles.logo} />
      </View>
      <Text style={styles.header}>Behaviour and Human Error Incident</Text>

      <LineSVG style={styles.line} />

      <Text style={styles.label}>Violation Type:</Text>
      <FlatList
        data={violationTypesData}
        renderItem={renderViolationType}
        keyExtractor={item => item.key}
      />

      {/* <TouchableOpacity style={styles.dateButton} onPress={() => setDatePickerVisibility(true)}>
        <Text style={styles.dateButtonText}>Select Date & Time of violation</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Text style={styles.dateText}>{date.toLocaleString()}</Text> */}
      <DateTimePickerField />

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
        dropDownDirection="BOTTOM"
        listMode="SCROLLVIEW"
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
        dropDownDirection="BOTTOM"
        listMode="SCROLLVIEW"
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

      <Text style={styles.label}>Incident Description</Text>
      <View style={styles.descriptionContainer}>
      <TextInput
        placeholder="Incident Description"
        value={incidentDescription}
        onChangeText={text => setIncidentDescription(text)}
        multiline
        numberOfLines={4}
          style={[styles.input, styles.descriptionInput]}
        placeholderTextColor="#000"
      />
        <VoiceInput
          onTextReceived={(text) => {
            setIncidentDescription(prev => prev + " " + text);
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  // Render each violation type as a checkbox
  const renderViolationType = ({ item }) => (
    <View style={styles.checkboxContainer}>
      <Checkbox
        status={violationTypes[item.key] ? 'checked' : 'unchecked'}
        onPress={() => setViolationTypes({ ...violationTypes, [item.key]: !violationTypes[item.key] })}
      />
      <Text>{item.label}</Text>
    </View>
  );

  // Data for violation types
  const violationTypesData = [
    { key: 'behaviour', label: 'Unsafe Work Behaviour' },
    { key: 'tools', label: 'Failure To Use Proper Tools' },
    { key: 'distractions', label: 'Distractions/Fatigue ' },
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: 58,
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 60,
  },
  dropdown: {
    marginBottom: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  evidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  evidenceButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: '#e0f7fa',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 10,
    marginTop: -15,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '40%',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '40%',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoContainer: {
    marginLeft: -70,
    marginTop: 10,
    position: 'absolute',
    top: -68,
    left: 3,
  },
  logo: {
    width: 50,
    height: 50,
    transformOrigin: 'center',
    transform: [{ scale: 0.3 }],
    marginRight: 10,
  },
  line: {
    // marginBottom: 10,
    marginTop: -6,
    width: '150%',
    borderWidth: 0.5,
    borderColor: '#000',
    marginLeft: -23,
    marginRight: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  descriptionInput: {
    flex: 1,
    textAlignVertical: 'top',
    minHeight: 100,
    padding: 10,
  },
});