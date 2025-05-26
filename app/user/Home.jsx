import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Header from "./../../components/Header";
import SearchBar from "./../../components/SearchBar";
import IconGrid from "./../../components/IconGrid";
import LineSVG from "./../../components/LineSVG";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import useLoadFont from "./../../hooks/useLoadFont";
import { db } from "./../../configs/FirebaseConfig";
import getConfig from './../../configs/config';
import messaging from "@react-native-firebase/messaging";
import crashlytics from "@react-native-firebase/crashlytics";
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const FORM_CONFIGS = {
  'UNIFORM_SAFETY': {
    title: 'Uniform Safety',
    route: '/userPages/Forms/uniformSafety',
    violationTypes: ['dressCode'],
    hasSeverity: false,
    imagePrompt: 'photo-1681812508855-f7b04fefcd83?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'HEALTH_SAFETY': {
    title: 'Health Safety',
    route: '/userPages/Forms/healthSafety',
    violationTypes: ['unsafe'],
    hasSeverity: true,
    imagePrompt: 'photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'EQUIPMENT_ISSUES': {
    title: 'Equipment Issues',
    route: '/userPages/Forms/equipmentIssues',
    violationTypes: ['malfunction'],
    hasSeverity: true,
    imagePrompt: 'photo-1503694978374-8a2fa686963a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'FIRE_INCIDENT': {
    title: 'Fire Incident',
    route: '/userPages/Forms/FireIncident',
    violationTypes: ['fire'],
    hasSeverity: true,
    imagePrompt: 'photo-1486915309851-b0cc1f8a0084?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'HAZARDOUS_MATERIALS': {
    title: 'Hazardous Materials',
    route: '/userPages/Forms/Hazardousmaterials',
    violationTypes: ['spill'],
    hasSeverity: true,
    hasChemicalDetails: true,
    imagePrompt: 'photo-1542617752-e09fd73c3513?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'ENVIRONMENTAL_HAZARDS': {
    title: 'Environmental Hazards',
    route: '/userPages/Forms/environmentalHazards',
    violationTypes: ['air'],
    hasSeverity: false,
    imagePrompt: 'photo-1611273426858-450d8e3c9fce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'POLICY_VIOLATIONS': {
    title: 'Policy Violations',
    route: '/userPages/Forms/policyViolations',
    violationTypes: ['unauthorized'],
    hasSeverity: false,
    imagePrompt: 'photo-1611273426858-450d8e3c9fce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'HUMAN_ERRORS': {
    title: 'Human Errors',
    route: '/userPages/Forms/humanErrors',
    violationTypes: ['behavior'],
    hasSeverity: false,
    imagePrompt: 'photo-1581093804475-577d72e38aa0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  'WEATHER_HAZARDS': {
    title: 'Weather Hazards',
    route: '/userPages/Forms/weatherHazards',
    violationTypes: ['heat'],
    hasSeverity: false,
    imagePrompt: 'photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
};

const Home = () => {
  const router = useRouter();
  const { isFontLoaded } = useLoadFont();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { BASE_URL } = getConfig();
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            setRole(userRole);
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    if (!user) return;

    const sendTokenToBackend = async (token, uid) => {
      try {
        const response = await fetch(`${BASE_URL}/storeFCMToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, uid }),
        });
        if (!response.ok) {
          throw new Error('Failed to send FCM token to backend');
        }
        console.log('FCM token sent to backend successfully');
      } catch (error) {
        console.error('Error sending FCM token to backend:', error);
        crashlytics().recordError(error);
      }
    };

    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
        await sendTokenToBackend(token, user.uid);
      } catch (error) {
        console.error("Error getting FCM token:", error);
        crashlytics().recordError(error);
      }
    };
    getToken();

    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(async token => {
      try {
        console.log("FCM Token refreshed:", token);
        await sendTokenToBackend(token, user.uid);
      } catch (error) {
        console.error("Error handling token refresh:", error);
        crashlytics().recordError(error);
      }
    });

    return () => unsubscribeOnTokenRefresh();
  }, [user, BASE_URL]);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant microphone permissions to use this feature.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      console.log('Stopping recording..');
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      console.log('Recording stopped and stored at', uri);

      // Process the recorded audio
      await processVoiceRecording(uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const processVoiceRecording = async (audioUri) => {
    try {
      console.log('Processing voice recording...');
      Alert.alert('Processing', 'Converting speech to text...');

      // Convert audio to base64
      const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Get config for API keys
      const config = getConfig();

      // Call Google Speech-to-Text API with API key in query parameter
      const speechResponse = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${config.GOOGLE_CLOUD_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            config: {
              encoding: 'WEBM_OPUS',
              sampleRateHertz: 48000,
              languageCode: 'en-US',
              model: 'default',
            },
            audio: {
              content: base64Audio,
            },
          }),
        }
      );

      const speechData = await speechResponse.json();
      console.log('Speech-to-Text response:', speechData);

      if (speechData.results && speechData.results[0]) {
        const transcribedText = speechData.results[0].alternatives[0].transcript;
        console.log('Transcribed text:', transcribedText);
        Alert.alert('Speech Recognized', `Text: ${transcribedText}`);

        // Process with Google Gemini AI
        await analyzeIncidentText(transcribedText);
      } else {
        if (speechData.error) {
          console.error('Speech-to-Text API error:', speechData.error);
          throw new Error(speechData.error.message || 'Speech recognition failed');
        } else {
          throw new Error('No speech recognized');
        }
      }
    } catch (err) {
      console.error('Failed to process voice recording', err);
      Alert.alert('Error', `Failed to process voice recording: ${err.message}`);
    }
  };

  const analyzeIncidentText = async (text) => {
    try {
      console.log('Analyzing text with Gemini AI...');
      Alert.alert('Processing', 'Analyzing incident details...');

      const config = getConfig();

      // Call Google Gemini AI API with API key in query parameter
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${config.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze this incident report and provide the following information in a structured format:
                1. Category (EXACTLY one of: Uniform Safety, Health Safety, Equipment Issues, Fire Incident, Hazardous Materials, Environmental Hazards, Policy Violations, Human Errors, Weather Hazards)
                2. Department mentioned (if any)
                3. Severity level (High/Medium/Low) - Only applicable for Health Safety, Equipment Issues, Fire Incident, and Hazardous Materials
                4. For Hazardous Materials incidents, extract:
                  - Chemical name (if mentioned)
                5. Description:
                  Provide a clear, detailed description of the incident including:
                  - What happened: [brief statement]
                  - Location: [specific area]
                  - Impact: [potential consequences]
                  - Required actions: [immediate steps needed]
                  Format as: "Description: [Complete description combining all above points]"

                Input text: ${text}`,
              }]
            }]
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      console.log('Gemini AI response:', geminiData);

      if (geminiData.candidates && geminiData.candidates[0]) {
        const analysis = geminiData.candidates[0].content.parts[0].text;
        console.log('AI Analysis:', analysis);

        // Extract category and details
        const category = findMatchingCategory(analysis);
        if (category) {
          // Extract department from the analysis using multiple patterns
          const departmentPatterns = [
            /Department:\s*(\w+)/i,
            /at\s+(\w+)\s+department/i,
            /in\s+(\w+)\s+department/i,
            /(\w+)\s+department:/i
          ];

          let department = null;
          for (const pattern of departmentPatterns) {
            const match = analysis.match(pattern) || text.match(pattern);
            if (match) {
              department = match[1].toUpperCase();
              break;
            }
          }

          // Extract severity only for forms that need it
          const severityMap = {
            'HIGH': 'severe',
            'MEDIUM': 'moderate',
            'LOW': 'minor'
          };
          const severityMatch = analysis.match(/Severity:\s*(High|Medium|Low)/i);
          const severity = category.hasSeverity ? (severityMatch ? severityMap[severityMatch[1].toUpperCase()] : 'severe') : null;

          // Extract chemical details for hazardous materials
          let chemicalName = null;
          // let chemicalVolume = null;
          if (category.hasChemicalDetails) {
            const chemicalMatch = analysis.match(/Chemical name:\s*([^,\n]+)/i);
            // const volumeMatch = analysis.match(/Volume\/quantity:\s*([^,\n]+)/i);
            chemicalName = chemicalMatch ? chemicalMatch[1].trim() : null;
            // chemicalVolume = volumeMatch ? volumeMatch[1].trim() : null;
          }

          // Use a placeholder image
          const placeholderImageUrl = `https://images.unsplash.com/${category.imagePrompt}`;

          // Extract description
          const descriptionMatch = analysis.match(/Description: (.*)/i);
          const description = descriptionMatch ? descriptionMatch[1].trim() :
            analysis.match(/What happened[^:]*:\s*([\s\S]*?)(?=\n|\s*$)/i)?.[1]?.trim() ||
            analysis.match(/Description[^:]*:\s*([\s\S]*?)(?=\n|\s*$)/i)?.[1]?.trim() ||
            'No detailed description available.';

          Alert.alert(
            'Incident Categorized',
            `Category: ${category.title}\nDepartment: ${department || 'Not specified'}${category.hasSeverity ? `\nSeverity: ${severity}` : ''}\n\nNavigating to form...`,
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('Navigating to:', category.route);
                  router.push({
                    pathname: category.route,
                    params: {
                      autoFill: true,
                      department: department,
                      severity: severity,
                      description: description,
                      violationType: category.violationTypes[0],
                      date: new Date().toISOString(),
                      evidenceUrl: placeholderImageUrl,
                      ...(category.hasChemicalDetails && {
                        chemicalName
                      })
                    }
                  });
                }
              }
            ]
          );
        } else {
          Alert.alert('Error', 'Could not determine incident category. Please select manually.');
        }
      } else {
        if (geminiData.error) {
          console.error('Gemini AI API error:', geminiData.error);
          throw new Error(geminiData.error.message || 'AI analysis failed');
        } else {
          throw new Error('AI analysis failed');
        }
      }
    } catch (err) {
      console.error('Failed to analyze incident text', err);
      Alert.alert('Error', `Failed to analyze incident: ${err.message}`);
    }
  };

  const findMatchingCategory = (analysis) => {
    const categoryMatch = analysis.match(/Category:\s*([\w\s]+)(?=\n|$)/i);
    if (categoryMatch) {
      const category = categoryMatch[1].trim().toUpperCase().replace(/\s+/g, '_');
      return FORM_CONFIGS[category];
    }
    return null;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    >
      <ImageBackground
        source={require("./../../assets/images/background.jpg")}
        style={styles.backgroundImage}
      >
        {Platform.OS === "ios" && (
          <View style={{ height: 20, backgroundColor: "transparent" }} />
        )}
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <View style={styles.container}>
          <Header username={user?.displayName || "User"} style={styles.header} />
          {role === "admin" && (
            <TouchableOpacity
              onPress={() => {
                router.push("/admin/adminPages/Home");
              }}
              style={styles.adminButton}
            >
              <Text style={styles.adminText}>admin Page</Text>
            </TouchableOpacity>
          )}
          <LineSVG style={styles.line} />
          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchBar}
            />
          </View>
          <IconGrid
            style={styles.iconGrid}
            searchQuery={searchQuery}
          />
          <View style={styles.microphoneContainer}>
            <TouchableOpacity
              style={styles.micButton}
              onPressIn={startRecording}
              onPressOut={stopRecording}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isRecording ? "mic" : "mic-outline"}
                size={40}
                color={isRecording ? "#ff4444" : "#fff"}
              />
            </TouchableOpacity>
            <Text style={styles.micWarningText}>
              Use Voice assisted incident reporting in emergency only
            </Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 10,
    color: "red",
  },
  line: {
    marginBottom: 10,
    marginTop: -6,
  },
  iconGrid: {
    marginTop: height * 0.05,
    width: '90%',
    alignSelf: 'center',
    transform: [{ scale: width < 380 ? 0.9 : width > 600 ? 1.3 : 1.2 }],
  },
  adminButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    height: 30,
    width: 80,
    borderRadius: 10,
    alignSelf: "center",
    // marginLeft: 10,
    // right: 10,
    top: 90,
    position: "absolute",
    // bottom: 130,
    zIndex: 1000,
  },
  adminText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  searchBar: {
    width: '80%',
    marginRight: 30,
  },
  microphoneContainer: {
    alignItems: 'center',
    marginTop: 35,
  },
  micButton: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  micWarningText: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Home;
