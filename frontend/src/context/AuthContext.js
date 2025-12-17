import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase';
import { signInWithGoogle, signInWithFacebook, logout, signUp, signIn, updateUserProfile } from '../firebase';
import { saveUserData, getUserData, updateUserData } from '../services/backendService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectResult, setRedirectResult] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Check for redirect result when component mounts
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          // Save user details to database
          await saveUserToDatabase(result.user);
          // Store the redirect result for components to use
          setRedirectResult(result);
        }
      } catch (error) {
        console.error("Error checking redirect result:", error);
      }
    };

    checkRedirectResult();

    return unsubscribe;
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    try {
      const result = await signIn(email, password);
      if (result && result.user) {
        await saveUserToDatabase(result.user);
      }
      return result;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Register with email and password
  const register = async (name, email, password) => {
    try {
      const result = await signUp(email, password);

      // Update the user profile with the name
      await updateUserProfile({
        displayName: name
      });

      // Save user details to database
      await saveUserToDatabase(result.user);

      return result;
    } catch (error) {
      console.error("Error registering:", error);
      // If the email is already in use, provide a more helpful error message
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered with a social login method (Google/Facebook). Please use the social login button to sign in, or reset your password if you want to use email/password.');
      }
      throw error;
    }
  };

  // Save user details to database
  const saveUserToDatabase = async (user) => {
    try {
      // Import the database service
      const { saveUserData } = await import('../services/databaseServiceNew');
      // Prepare user data
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        provider: user.providerData[0]?.providerId
      };

      // Save user data to database
      await saveUserData(userData);

      return true;
    } catch (error) {
      console.error("Error saving user to database:", error);
      // For development, continue even if saving to database fails
      // In production, you might want to handle this differently
      return true;
    }
  };

  // Social login functions
  const googleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      // With popup authentication, we get the result immediately
      return result;
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      throw error;
    }
  };

  const facebookSignIn = async () => {
    try {
      const result = await signInWithFacebook();
      // With popup authentication, we get the result immediately
      return result;
    } catch (error) {
      console.error("Error with Facebook sign-in:", error);
      throw error;
    }
  };

  // Logout function
  const logOut = () => {
    return logout();
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    googleSignIn,
    facebookSignIn,
    logOut,
    redirectResult
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}