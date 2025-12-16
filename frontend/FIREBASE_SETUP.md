# Firebase Setup Instructions

To enable Google and Facebook authentication for the hotel-flight-booking app, you need to set up a Firebase project.

## Error You're Seeing

If you're seeing this error:

```
FirebaseError: Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.).
```

It means you're still using placeholder Firebase credentials. Follow the steps below to fix this.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "hotel-flight-booking")
4. Follow the setup steps

## 2. Add Firebase to Your Web App

1. In your Firebase project dashboard, click the Web icon (`</>`) to add a web app
2. Give your app a nickname
3. Click "Register app"
4. Copy the Firebase configuration object

## 3. Update Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:
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
3. Add your project domain to the list of authorized domains (e.g., localhost:3000 for development)
4. Save

### For Facebook Authentication:
1. Click Facebook
2. Enable it
3. You'll need to create a Facebook App:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add "Facebook Login" product
   - In the Facebook Login settings, add your domain (e.g., http://localhost:3000 for development)
4. Copy the App ID and App Secret from Facebook to Firebase
5. Save

## 5. Install Dependencies

Make sure you have installed the required dependencies:
```bash
npm install firebase
```

Note: We've simplified the dependencies to only use Firebase for authentication. The react-google-login and react-facebook-login packages have been removed to avoid conflicts with React 18.

## 6. Run the Application

Start your application:
```bash
npm start
```

Now you should be able to:
- Register/login with email and password
- Sign in with Google
- Sign in with Facebook
- See your user information in the header
- Log out
