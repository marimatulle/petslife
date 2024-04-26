// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4eMjcxXH4RRFeSGXAcAzqtwsjvuE7910",
  authDomain: "petslife-database.firebaseapp.com",
  projectId: "petslife-database",
  storageBucket: "petslife-database.appspot.com",
  messagingSenderId: "691949422525",
  appId: "1:691949422525:web:1ea1e2ee123cb96b2534d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore(app);

export default app;