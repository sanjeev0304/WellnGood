
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAARsByqo7xe3kfLynre2S51q6UznjZcrw",
  authDomain: "tech-fe1e1.firebaseapp.com",
  projectId: "tech-fe1e1",
  storageBucket: "tech-fe1e1.firebasestorage.app",
  messagingSenderId: "554585551513",
  appId: "1:554585551513:web:9791dea7fac9dd92ffbe08",
  measurementId: "G-6BV6159MSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {auth, provider};