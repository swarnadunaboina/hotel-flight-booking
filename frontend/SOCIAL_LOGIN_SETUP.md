# Social Login Setup Guide

This guide will help you set up social login functionality for the hotel-flight-booking application using Firebase Authentication.

## Prerequisites

- Node.js and npm installed
- A Firebase project
- A Facebook Developer account (for Facebook login)

## Setup Steps

### 1. Install Dependencies

The required dependencies are already included in package.json:
- firebase
- react-google-login
- react-facebook-login

### 2. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication in your Firebase project
3. Add a Web App to your Firebase project
4. Copy the Firebase configuration and update `src/firebase.js`

### 3. Enable Google Authentication

1. In Firebase Console, go to Authentication → Sign-in method
2. Enable Google
3. Add your domain to authorized domains (e.g., localhost:3000 for development)

### 4. Enable Facebook Authentication

1. Create a Facebook App at [https://developers.facebook.com/](https://developers.facebook.com/)
2. Add Facebook Login product to your app
3. Configure the Facebook Login settings with your app domains
4. Copy the App ID and App Secret
5. In Firebase Console, enable Facebook authentication
6. Enter the App ID and App Secret from Facebook

### 5. Update Firebase Configuration

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

## How It Works

The social login functionality is implemented through:

1. **Firebase Authentication**: Handles the OAuth flow for Google and Facebook
2. **AuthContext**: Manages user authentication state across the app
3. **SocialLogin Component**: Reusable component for social login buttons
4. **Login/Register Pages**: Integration of social login with traditional forms

## Testing

1. Start your application with `npm start`
2. Navigate to the Login or Register page
3. Click on the Google or Facebook button
4. Complete the authentication flow in the popup
5. You should be redirected to the home page and logged in

## Troubleshooting

- **"auth/network-request-failed" error**: Check your network connection and Firebase configuration
- **Facebook login not working**: Verify your Facebook App settings and authorized domains
- **Google login not working**: Make sure Google is enabled in Firebase Authentication settings

## Security Notes

- The Firebase configuration is exposed in the client-side code, but this is secure as Firebase has rules to prevent unauthorized access
- In production, consider using environment variables for sensitive configuration
- Always validate user data on the server side, even when using Firebase
