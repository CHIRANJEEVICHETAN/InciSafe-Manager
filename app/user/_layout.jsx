import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons'

export default function UserLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Home" options={{headerShown: false, tabBarIcon: () => <Ionicons name="home" size={26} color="black" />}} />
      <Tabs.Screen name="Notifications" options={{headerShown: false, tabBarIcon: () => <Ionicons name="notifications" size={26} color="black" />}} />
      <Tabs.Screen name="Help" options={{headerShown: false, tabBarIcon: () => <Ionicons name="help-circle" size={26} color="black" /> }} />
      <Tabs.Screen name="Profile" options={{headerShown: false, tabBarIcon: () => <Ionicons name="person" size={26} color="black" /> }} />
    </Tabs>
  )
}