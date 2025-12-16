# Firebase Setup and Deployment Guide

## Prerequisites

- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase account

## Setup Steps

1. **Login to Firebase**:
   ```bash
   firebase login
   ```
   Follow the prompts to authenticate with your Google account.

2. **Initialize Firebase Project**:
   ```bash
   firebase init
   ```
   When prompted:
   - Select "Hosting: Configure files for Firebase Hosting"
   - Use existing project: "hotel-flight-booking"
   - Set public directory as "build"
   - Configure as a single-page app: Yes
   - Do not overwrite index.html

3. **Build Your React App**:
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

## Configuration Files

### .firebaserc
This file specifies which Firebase project to use:
```json
{
  "projects": {
    "default": "hotel-flight-booking"
  }
}
```

### firebase.json
This file configures Firebase Hosting:
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Authentication Configuration

1. In the Firebase Console, go to Authentication
2. Enable Email/Password, Google, and Facebook sign-in methods
3. Add your domain to authorized domains

## Environment Variables

Create a `.env.local` file in your project root:
```
REACT_APP_API_URL=https://your-project-url.cloudfunctions.net/api
```

## Continuous Deployment

To set up continuous deployment with GitHub Actions:

1. Create a service account in Firebase Console
2. Download the service account JSON file
3. Add the JSON file as a secret in your GitHub repository
4. Create a workflow file in `.github/workflows/firebase-hosting.yml`

## Troubleshooting

1. **Build Errors**:
   - Check for missing dependencies
   - Verify all imports are correct
   - Check for TypeScript errors

2. **Deployment Errors**:
   - Verify Firebase project configuration
   - Check that build directory exists
   - Ensure you have proper permissions

3. **Authentication Issues**:
   - Verify API keys are correct
   - Check that domains are authorized
   - Review Firebase Console logs

## Best Practices

1. Use environment variables for sensitive data
2. Implement proper error handling
3. Test authentication locally before deploying
4. Use Firebase emulators for local development
5. Set up monitoring and alerting
