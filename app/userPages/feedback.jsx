import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Feedback = () => {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted", { username, email, suggestion });
    setUsername('');
    setEmail('');
    setSuggestion('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>

      <View style={styles.separator} />

      <View style={styles.fieldContainer}>
        <FontAwesome name="user" size={22} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder="Enter Username" 
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="envelope" size={19} color="black" style={styles.icon} />
        <TextInput 
          style={styles.inputField} 
          placeholder=" Enter Email ID" 
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="pencil" size={20} color="black" style={styles.icon} />
        <TextInput 
          style={styles.suggestionField} 
          placeholder="Suggest anything we can improve" 
          value={suggestion}
          onChangeText={setSuggestion}
          placeholderTextColor="#888"
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -33,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    paddingTop: 30,
  },
  separator: {
    height: 1.8,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 55,
    
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 9,
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    marginRight: 7.5,
  },
  inputField: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  suggestionField: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    height: 80, 
  },
  submitButton: {
    backgroundColor: '#14AE5C',
    borderRadius: 40,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Feedback;
