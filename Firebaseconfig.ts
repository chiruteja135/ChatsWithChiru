// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-bK8_0bN-y36IgKDXhPUKKCOw2Q3WOuQ",
  authDomain: "chatswithchiru.firebaseapp.com",
  projectId: "chatswithchiru",
  storageBucket: "chatswithchiru.appspot.com",
  messagingSenderId: "431757758447",
  appId: "1:431757758447:web:59f29cb5ecf3c424a7701a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
