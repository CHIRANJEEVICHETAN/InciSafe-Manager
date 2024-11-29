import { View, Text, StyleSheet, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons'

export default function UserLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [
          styles.container,
          {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 20 : 10,
            display: isKeyboardVisible ? 'none' : 'flex',
          }
        ],
        tabBarLabelStyle: styles.label,
        tabBarHideOnKeyboard: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={28} color="black" style={styles.icon} />
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="notifications" size={28} color="black" style={styles.icon} />
        }}
      />
      <Tabs.Screen
        name="Help"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="help-circle" size={28} color="black" style={styles.icon} />
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="person" size={28} color="black" style={styles.icon} />
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 5,
    marginBottom: 5,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#B0E0E6',
    borderWidth: 0.7,
    borderTopWidth: 0.7,
    borderColor: 'gray',
    height: Platform.OS === 'ios' ? 85 : 65,
    borderRadius: 35,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  }
});