import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBHABn2eevjbklRsv6CDjwP7-EylVBE2Hw",
  authDomain: "credit-evalution.firebaseapp.com",
  projectId: "credit-evalution",
  storageBucket: "credit-evalution.appspot.com",
  messagingSenderId: "413235163862",
  appId: "1:413235163862:web:715b66afc73db9c30e4f77"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();