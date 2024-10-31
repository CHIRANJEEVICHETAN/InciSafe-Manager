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
import LogoSVG from './../../../components/LogoSVG';
import getConfig from './../../../configs/config';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const { BASE_URL } = getConfig();

export default function ReportDownloads() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [department, setDepartment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, departmentsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/incidentCategories`),
          axios.get(`${BASE_URL}/departments`)
        ]);

        setCategories(categoriesResponse.data.map((cat) => ({ label: cat, value: cat })));
        setDepartments(departmentsResponse.data.map((dept) => ({ label: dept, value: dept })));
      } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error('Error details:', error);
        alert('Failed to fetch data. Please check your network connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading report...');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB');
  };

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
          <Text style={styles.title}>Report Downloads</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                style={styles.picker}
                mode="dropdown"
              >
                <Picker.Item label="Select Your Category" value="" />
                {categories.map((cat, index) => (
                  <Picker.Item key={index} label={cat.label} value={cat.value} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="calendar-today" size={24} color="#666" />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Department</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={department}
                onValueChange={(value) => setDepartment(value)}
                style={styles.picker}
                mode="dropdown"
              >
                <Picker.Item label="Select the Department" value="" />
                {departments.map((dept, index) => (
                  <Picker.Item key={index} label={dept.label} value={dept.value} />
                ))}
              </Picker>
            </View>
          </View>

        </View>

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
          activeOpacity={0.8}
        >
          <MaterialIcons name="file-download" size={24} color="#fff" />
          <Text style={styles.buttonText}>Download Report</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <LogoSVG style={styles.logo} />
        </View>
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
    // marginTop: -100,
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
    marginTop: 60,
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    transform: [{ scale: 1.3 }],
  },
});