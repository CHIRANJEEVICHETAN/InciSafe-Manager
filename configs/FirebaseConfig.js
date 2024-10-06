// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
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
export const db = getFirestore(app);
export const storage = getStorage(app);
