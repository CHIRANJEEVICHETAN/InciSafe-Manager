import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { transcribeAudio } from '../app/services/gemini-service';

const VoiceInput = ({ onTextReceived }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkPermissions();
    return () => {
      if (recording) {
        console.log('Cleaning up recording...');
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const checkPermissions = async () => {
    try {
      console.log('Checking permissions...');
      const { status: existingStatus } = await Audio.getPermissionsAsync();
      console.log('Existing permission status:', existingStatus);

      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        console.log('Requesting permissions...');
        const { status } = await Audio.requestPermissionsAsync();
        finalStatus = status;
        console.log('New permission status:', status);
      }

      setHasPermission(finalStatus === 'granted');
    } catch (err) {
      console.error('Error checking permissions:', err);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording process...');
      
      if (!hasPermission) {
        console.log('No permission, requesting...');
        await checkPermissions();
        if (!hasPermission) {
          Alert.alert('Permission needed', 'Please grant microphone permission to use voice input.');
          return;
        }
      }

      console.log('Setting audio mode...');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
      });

      console.log('Creating new recording...');
      const newRecording = new Audio.Recording();
      
      console.log('Preparing to record...');
      await newRecording.prepareToRecordAsync({
        android: {
          extension: '.webm',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_WEBM,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_OPUS,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 16000,
        },
        ios: {
          extension: '.m4a',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 16000,
          numberOfChannels: 1,
          bitRate: 16000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 16000,
        },
      });

      console.log('Starting recording...');
      await newRecording.startAsync();
      console.log('Recording started successfully');
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', `Could not start recording: ${error.message}`);
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      console.log('No recording to stop');
      return;
    }

    try {
      console.log('Stopping recording...');
      await recording.stopAndUnloadAsync();
      console.log('Recording stopped');
      
      const uri = recording.getURI();
      console.log('Recording URI:', uri);
      
      setRecording(null);
      setIsRecording(false);

      if (!uri) {
        console.error('No recording URI available');
        return;
      }

      console.log('Fetching audio file...');
      const response = await fetch(uri);
      const blob = await response.blob();
      console.log('Audio blob size:', blob.size);

      if (blob.size === 0) {
        console.error('Audio blob is empty');
        Alert.alert('Error', 'No audio was recorded. Please try again.');
        return;
      }

      console.log('Converting to base64...');
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        try {
          const base64Audio = reader.result.split(',')[1];
          console.log('Base64 audio length:', base64Audio.length);
          
          if (!base64Audio || base64Audio.length === 0) {
            console.error('Base64 conversion failed');
            Alert.alert('Error', 'Failed to process audio. Please try again.');
            return;
          }
          
          console.log('Sending for transcription...');
          const transcribedText = await transcribeAudio(base64Audio);
          console.log('Transcribed text:', transcribedText);
          
          if (transcribedText) {
            console.log('Updating text input with:', transcribedText);
            onTextReceived(transcribedText);
          } else {
            console.log('No transcription received');
            Alert.alert('Error', 'No speech was recognized. Please try again.');
          }
        } catch (error) {
          console.error('Transcription error:', error);
          Alert.alert('Error', 'Failed to transcribe audio. Please try again.');
        }
      };

      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        Alert.alert('Error', 'Failed to process audio file. Please try again.');
      };
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to process the recording. Please try again.');
    }
  };

  if (!hasPermission) {
    return (
      <TouchableOpacity
        onPress={checkPermissions}
        style={styles.micButton}
      >
        <MaterialIcons
          name="mic-off"
          size={24}
          color="#999999"
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPressIn={startRecording}
      onPressOut={stopRecording}
      style={[styles.micButton, isRecording && styles.recording]}
    >
      <MaterialIcons
        name="mic"
        size={24}
        color={isRecording ? '#ff4444' : '#000000'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  micButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recording: {
    backgroundColor: '#ffe0e0',
  },
});

export default VoiceInput;