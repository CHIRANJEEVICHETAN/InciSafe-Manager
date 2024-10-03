import { View, Text } from "react-native";
import React from "react";
import App from "./../components/App";
import { Redirect } from "expo-router";
import { auth } from "./../configs/FirebaseConfig";

export default function index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user? <Redirect href={'/user/Home'} /> : <App />}
      {/* <App /> */}
    </View>
  );
}
