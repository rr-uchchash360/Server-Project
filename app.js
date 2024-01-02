// app.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user'); // Import the User model

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {});

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

/// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
require('./config/passport')(passport, User); // Pass the User model

// Set up routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const memoryRoutes = require('./routes/memoryRoutes');
app.use('/memories', memoryRoutes); // Use a different path for memory routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
