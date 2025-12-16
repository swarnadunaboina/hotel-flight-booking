// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
auth.settings = {
  // Disable app verification for development
  appVerificationDisabledForTesting: true
};

// Initialize analytics (can be used later)
// const analytics = getAnalytics(app);

// Export auth instance for use in other components

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Functions for authentication
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = (profile) => {
  return updateProfile(auth.currentUser, profile);
};

export const logout = () => {
  return signOut(auth);
};

export { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, auth };
