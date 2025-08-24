// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import auth

const firebaseConfig = {
  apiKey: "AIzaSyDvUmUouUpTc2XFL_JXLmndS6uLFcPwIOs",
  authDomain: "asklychatbot.firebaseapp.com",
  projectId: "asklychatbot",
  storageBucket: "asklychatbot.appspot.com", // ✅ Fixed ".app" to ".com"
  messagingSenderId: "125802386970",
  appId: "1:125802386970:web:80230bb46e8cb32f60a3a3",
  measurementId: "G-VTK30G19NZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Initialize auth

export { db, auth }; // ✅ Export db and auth
