// services/authService.js
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.models.User || require('../models/user');

exports.signup = (req, res, next) => {
  // Use req.body.email to create the user
  User.register({ email: req.body.email }, req.body.password, (err, user) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).json({ message: 'Signup successful', user: { email: user.email, _id: user._id } });
    });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate(['local', 'google'], (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

