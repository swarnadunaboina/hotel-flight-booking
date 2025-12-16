# Social Authentication Setup Guide

This guide will help you set up social authentication (Google and Facebook) for the hotel-flight-booking application.

## Overview

The social authentication system consists of:
- Frontend Firebase authentication
- Backend API for storing user data
- Integration between both systems

## Frontend Setup

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication in your Firebase project
3. Add a Web App to your Firebase project
4. Copy the Firebase configuration and update `src/firebase.js`

### 2. Enable Google Authentication

1. In Firebase Console, go to Authentication → Sign-in method
2. Enable Google
3. Add your domain to authorized domains (e.g., localhost:3000 for development)

### 3. Enable Facebook Authentication

1. Create a Facebook App at [https://developers.facebook.com/](https://developers.facebook.com/)
2. Add Facebook Login product to your app
3. Configure Facebook Login settings with your app domains
4. Copy App ID and App Secret
5. In Firebase Console, enable Facebook authentication
6. Enter the App ID and App Secret from Facebook

### 4. Update Firebase Configuration

Replace the placeholder configuration in `src/firebase.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/hotel-flight-booking

# JWT Configuration
JWT_SECRET=your-jwt-secret

# API Configuration
PORT=5000
```

### 3. Start the Backend Server

```bash
npm run start:dev
```

## Testing the Social Authentication

1. Start your frontend application:
   ```bash
   cd frontend
   npm start
   ```

2. Navigate to the Login or Register page

3. Click on the Google or Facebook button

4. Complete the authentication flow in the popup

5. Check the browser console to see the authentication response

6. Verify that user data is being saved to the database

## How It Works

1. **Frontend Authentication Flow**:
   - User clicks Google/Facebook button
   - Firebase authentication popup opens
   - User authenticates with the provider
   - Firebase returns user credentials
   - User data is sent to the backend API

2. **Backend Processing**:
   - Receives user data from frontend
   - Checks if user already exists in database
   - Creates new user or updates existing user
   - Returns success response with user data

3. **User Data Storage**:
   - User information is stored in MongoDB
   - Includes provider information (Google/Facebook)
   - Tracks login timestamps

## Troubleshooting

### Common Issues

1. **"auth/network-request-failed" error**:
   - Check your network connection
   - Verify Firebase configuration
   - Ensure your domain is authorized

2. **Facebook login not working**:
   - Verify Facebook App settings
   - Check authorized domains
   - Ensure App ID and Secret are correct

3. **Backend API not receiving data**:
   - Check if backend server is running
   - Verify API endpoint URLs
   - Check CORS configuration

4. **User data not saving to database**:
   - Verify database connection
   - Check backend logs for errors
   - Ensure user schema matches data structure

### Debugging Tips

1. Check browser console for frontend errors
2. Check backend terminal for server errors
3. Use browser dev tools Network tab to see API requests
4. Verify Firebase Console authentication logs

## Security Considerations

1. Always validate user data on the server side
2. Use HTTPS in production
3. Implement proper error handling
4. Consider implementing rate limiting for authentication endpoints
5. Regularly update dependencies to patch security vulnerabilities
