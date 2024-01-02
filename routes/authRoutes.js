// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup); // This line is causing the error

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
