import axios from 'axios';

// Set base URL for API calls
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Save user data to backend database
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
    const response = await axios.post(`${API_URL}/database/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get user data from backend database
 * @param {string} uid - Firebase user ID
 * @returns {Promise} - Promise that resolves with user data
 */
export const getUserData = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/database/users/${uid}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Update user data in backend database
 * @param {string} uid - Firebase user ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} - Promise that resolves when user data is updated
 */
export const updateUserData = async (uid, userData) => {
  try {
    const response = await axios.put(`${API_URL}/database/users/${uid}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
