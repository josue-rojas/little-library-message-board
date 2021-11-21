import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAe1Tu7MU1roQta_Q1Un3uDWlgjGQwdMJo",
  authDomain: "pelhamparkwaylittlelibrary.firebaseapp.com",
  projectId: "pelhamparkwaylittlelibrary",
  storageBucket: "pelhamparkwaylittlelibrary.appspot.com",
  messagingSenderId: "952032179645",
  appId: "1:952032179645:web:ea8f0232c0259e92b14ed4",
  measurementId: "G-6R64D7XG99"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
