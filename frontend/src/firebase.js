// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firestore and export it
export const db = getFirestore(app);
auth.settings = {
  // Disable app verification for development
  appVerificationDisabledForTesting: true
};

// Initialize analytics (can be used later)
// const analytics = getAnalytics(app);

// Export auth instance for use in other components

// Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Functions for authentication
export const signInWithGoogle = async () => {
  try {
    // Use popup instead of redirect to avoid 404 errors
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);

    // Provide more specific error messages
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed before completion. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    }

    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    // Use popup instead of redirect to avoid 404 errors
    const result = await signInWithPopup(auth, facebookProvider);
    return result;
  } catch (error) {
    console.error("Facebook sign-in error:", error);

    // Provide more specific error messages
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed before completion. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups and try again.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in was cancelled. Please try again.');
    }

    throw error;
  }
};

export const signUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Sign up error:", error);

    // Provide more specific error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please use a different email or try logging in.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    }

    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Sign in error:", error);

    // Provide more specific error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email. Please register first.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled. Please contact support.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    }

    throw error;
  }
};

export const updateUserProfile = (profile) => {
  return updateProfile(auth.currentUser, profile);
};

export const logout = () => {
  return signOut(auth);
};

export { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };