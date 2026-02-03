// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ecom-faad1.firebaseapp.com",
    projectId: "ecom-faad1",
    storageBucket: "ecom-faad1.firebasestorage.app",
    messagingSenderId: "916188675397",
    appId: "1:916188675397:web:6d0bd7d9a7ed27ff9e522c",
    measurementId: "G-CBBWQ5P0K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);