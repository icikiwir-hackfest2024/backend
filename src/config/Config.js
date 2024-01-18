// Import Function from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';  

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOorlBTiyeplZO_r-teScXyT0ZrfL08O8",
  authDomain: "icikiwir-hackfest2024.firebaseapp.com",
  projectId: "icikiwir-hackfest2024",
  storageBucket: "icikiwir-hackfest2024.appspot.com",
  messagingSenderId: "283109402908",
  appId: "1:283109402908:web:4d04fde39278314eac72d9",
  measurementId: "G-MZMJ3KS85J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage  = getStorage(app);

export { fireDB, auth, storage };