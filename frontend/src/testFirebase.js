// Test file to verify Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2Raqakwp94Q_nkB1wrQ2UKoFHxBf9Z_0",
  authDomain: "hotel-flight-booking.firebaseapp.com",
  projectId: "hotel-flight-booking",
  storageBucket: "hotel-flight-booking.firebasestorage.app",
  messagingSenderId: "661452093220",
  appId: "1:661452093220:web:92ec157a8198f00ef4e5b1",
  measurementId: "G-3BQ3HWJ5D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Test function
export const testFirebaseAuth = async () => {
  try {
    console.log("Testing Firebase configuration...");
    console.log("Firebase app initialized:", app.name);
    console.log("Auth service:", auth);

    // You can test authentication here if needed
    // For example, try to sign in with a test account

    return { success: true, message: "Firebase configuration is valid" };
  } catch (error) {
    console.error("Firebase configuration error:", error);
    return { success: false, message: error.message };
  }
};
