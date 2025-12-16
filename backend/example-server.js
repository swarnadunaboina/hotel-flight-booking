// Example backend server for handling user data
// This is a simple example using Express.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (in production, you would use a real database like MongoDB, PostgreSQL, etc.)
const users = {};

// Routes
// Save user data
app.post('/api/users', (req, res) => {
  try {
    const { uid, displayName, email, photoURL, provider } = req.body;

    // Check if user already exists
    if (users[uid]) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Save user data
    users[uid] = {
      uid,
      displayName,
      email,
      photoURL,
      provider,
      createdAt: new Date().toISOString()
    };

    console.log('User saved:', users[uid]);
    res.status(201).json(users[uid]);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user data
app.get('/api/users/:uid', (req, res) => {
  try {
    const { uid } = req.params;

    if (!users[uid]) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[uid]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user data
app.put('/api/users/:uid', (req, res) => {
  try {
    const { uid } = req.params;

    if (!users[uid]) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    users[uid] = {
      ...users[uid],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    console.log('User updated:', users[uid]);
    res.json(users[uid]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
