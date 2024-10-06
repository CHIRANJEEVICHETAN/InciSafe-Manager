import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';

export default function DateTimePickerField() {
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleString();
    setDate(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Date & Time of violation"
        value={date}
        editable={false} // Make the input non-editable
        placeholderTextColor="#000"
      />
      <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
        <MaterialIcons name="date-range" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#e0f7fa',
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
});