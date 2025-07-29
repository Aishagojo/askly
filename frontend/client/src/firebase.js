// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Add this for database
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDvUmUouUpTc2XFL_JXLmndS6uLFcPwIOs",
  authDomain: "asklychatbot.firebaseapp.com",
  projectId: "asklychatbot",
  storageBucket: "asklychatbot.firebasestorage.app",
  messagingSenderId: "125802386970",
  appId: "1:125802386970:web:80230bb46e8cb32f60a3a3",
  measurementId: "G-VTK30G19NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Initialize Firestore

// Export what you'll need
export { db };  // Add other services here if needed