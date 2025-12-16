# Firebase Configuration Guide

You're seeing errors because you need to configure Firebase with your actual project credentials. Follow these steps:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup steps

## 2. Add Your Web App

1. In your Firebase project dashboard, click the Web icon (`</>`) to add a web app
2. Give your app a nickname (e.g., "hotel-flight-booking")
3. Click "Register app"
4. Copy the Firebase configuration object

## 3. Update Your Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 4. Enable Authentication Methods

1. In the Firebase console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. In the "Sign-in method" tab, enable:
   - Email/Password
   - Google
   - Facebook

### For Google Authentication:
1. Click Google
2. Enable it
3. Add your domain to the list of authorized domains (e.g., localhost:3001 for development)
4. Save

### For Facebook Authentication:
1. Click Facebook
2. Enable it
3. You'll need to create a Facebook App:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add "Facebook Login" product
   - In the Facebook Login settings, add your domain (e.g., http://localhost:3001 for development)
4. Copy the App ID and App Secret from Facebook to Firebase
5. Save

## 5. Restart Your Application

After updating the Firebase configuration, restart your application with:
```bash
npm start
```

The errors should disappear once you've configured Firebase with your actual project credentials.
