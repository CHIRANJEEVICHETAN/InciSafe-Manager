// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7aluZ-jK9_43hQECJy_N8L_S2FObhV_s",
  authDomain: "incisafe-manager-1a9c3.firebaseapp.com",
  projectId: "incisafe-manager-1a9c3",
  storageBucket: "incisafe-manager-1a9c3.appspot.com",
  messagingSenderId: "723897235084",
  appId: "1:723897235084:web:ffe269c29bc321723f6da9",
  measurementId: "G-Y1V409CXSK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });