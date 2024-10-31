import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../../configs/FirebaseConfig';
import LogoSVG from './../../../components/LogoSVG';
import getConfig from './../../../configs/config';
import { useRouter } from 'expo-router';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const { width, height } = Dimensions.get('window');
const { BASE_URL } = getConfig();

console.log(RNHTMLtoPDF);

export default function ReportDownloads() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [department, setDepartment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, departmentsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/incidentCategories`),
          axios.get(`${BASE_URL}/departments`)
        ]);

        setCategories(categoriesResponse.data.map((cat) => ({ label: cat, value: cat })));
        setDepartments(departmentsResponse.data.map((dept) => ({ label: dept, value: dept })));
        await fetchIncidents();  // Fetch incidents data
      } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Failed to fetch data. Please check your network connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
            employeeName: data.selectedEmployee,
            status: data.status,
            category,
            ...data,
          });
        });
      }
      setIncidents(incidentData);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const handleDownload = async () => {
    const filteredIncidents = incidents.filter((incident) => {
      const incidentDate = new Date(incident.date);
      return (
        (!category || incident.category === category) &&
        (!department || department === 'All' || incident.department === department) &&
        incidentDate >= startDate && incidentDate <= endDate
      );
    });

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 1200px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            h1, h3 {
              margin: 0;
              padding: 10px 0;
            }
            h1 {
              text-align: center;
              font-size: 36px;
              font-weight: 700;
              color: #2c3e50;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 20px;
            }
            h3 {
              text-align: center;
              font-size: 18px;
              font-weight: 600;
              color: #34495e;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 30px;
              background-color: #fff;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            th, td {
              padding: 15px;
              border: 1px solid #e0e0e0;
              text-align: left;
            }
            th {
              background-color: #3498db;
              color: #fff;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            tr:nth-child(even) {
              background-color: #f8f8f8;
            }
            tr:hover {
              background-color: #e8f4f8;
              transition: background-color 0.3s ease;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align: center; font-size: 36px; font-weight: 700; color: #2c3e50; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">Incident Report</h1>
          <h3 style="text-align: left; font-size: 18px; font-weight: 600; color: #34495e; margin-bottom: 10px;">Category: ${category || 'All'}</h3>
          <h3 style="text-align: left; font-size: 18px; font-weight: 600; color: #34495e; margin-bottom: 10px;">Department: ${department || 'All'}</h3>
          <h3 style="text-align: left; font-size: 18px; font-weight: 600; color: #34495e; margin-bottom: 10px;">Date: ${date.toLocaleDateString('en-GB')}</h3>
          <table>
            <tr>
              <th style="width: 5%;">SlNo.</th>
              <th style="width: 12%;">Date</th>
              <th style="width: 13%;">Category</th>
              <th style="width: 15%;">Department</th>
              <th style="width: 15%;">Employee</th>
              <th style="width: 30%;">Description</th>
              <th style="width: 10%;">Status</th>
            </tr>
            ${filteredIncidents.map((incident, index) => `
              <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td>${new Date(incident.date).toLocaleDateString('en-GB')}</td>
                <td>${incident.category}</td>
                <td>${incident.department}</td>
                <td>${incident.employeeName}</td>
                <td>${incident.incidentDescription || 'N/A'}</td>
                <td style="font-weight: bold; color: ${incident.status === 'resolved' ? '#27ae60' : '#e74c3c'};">${incident.status}</td>
              </tr>
            `).join('')}
          </table>
        </body>
        </html>
    `;

    try {
      const formattedDate = date.toLocaleDateString('en-GB').split('/').reverse().join('-'); // Format date to DD-MM-YYYY
      const timestamp = new Date().getTime(); // Get current timestamp
      console.log(timestamp);
      const pdfOptions = {
        html: htmlContent,
        fileName: `Incident_Report_${formattedDate}_${timestamp}`, // Append timestamp to file name
        directory: 'Documents',
      };
      const pdf = await RNHTMLtoPDF.convert(pdfOptions);
      alert(`PDF saved to: ${pdf.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const formatDate = (date) => date.toLocaleDateString('en-GB');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./../../../assets/images/background.jpg')}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={require("./../../../assets/images/back-button.png")} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.title}>Report Downloads</Text>
        </View>

        <View style={styles.logoContainer}>
          <LogoSVG style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.picker}>
                <Picker.Item label="Select Your Category" value="" />
                {categories.map((cat, index) => <Picker.Item key={index} label={cat.label} value={cat.value} />)}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowStartDatePicker(true)}>
              <MaterialIcons name="calendar-today" size={24} color="#666" />
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowEndDatePicker(true)}>
              <MaterialIcons name="calendar-today" size={24} color="#666" />
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Department</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={department} onValueChange={(value) => setDepartment(value)} style={styles.picker}>
                <Picker.Item label="All Departments" value="All" />
                {departments.map((dept, index) => <Picker.Item key={index} label={dept.label} value={dept.value} />)}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload} activeOpacity={0.8}>
          <MaterialIcons name="file-download" size={24} color="#fff" />
          <Text style={styles.buttonText}>Download Report</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    // flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
    // marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#fff',
    width: '95%',
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    marginTop: -10,
    marginLeft: 15,

  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: -20,
    position: "relative",
    right: 0,
    top: 9,
    zIndex: 1000,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    zIndex: 1000,
  },
  formContainer: {
    marginTop: 30,
  },
  inputContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pickerWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 12,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  logoContainer: {
    marginTop: -10,
    marginBottom: -50,
    alignItems: 'center',
  },
  logo: {
    transform: [{ scale: 0.8 }],
  },
});