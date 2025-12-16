import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Save user data to database
 * @param {Object} userData - User data to save
 * @param {string} userData.uid - Firebase user ID
 * @param {string} userData.displayName - User's display name
 * @param {string} userData.email - User's email
 * @param {string} userData.photoURL - User's profile picture URL
 * @param {string} userData.provider - Authentication provider (google.com, facebook.com, etc.)
 * @returns {Promise} - Promise that resolves when user data is saved
 */
export const saveUserData = async (userData) => {
  try {
    // Create a reference to the user document in Firestore
    const userRef = doc(db, 'users', userData.uid);

    // Save user data to Firestore
    await setDoc(userRef, {
      uid: userData.uid,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL,
      provider: userData.provider,
      createdAt: new Date()
    });

    console.log('User data saved successfully:', userData);
    return userData;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get user data from database
 * @param {string} uid - Firebase user ID
 * @returns {Promise} - Promise that resolves with user data
 */
export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Update user data in database
 * @param {string} uid - Firebase user ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} - Promise that resolves when user data is updated
 */
export const updateUserData = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, userData);
    console.log('User data updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
