// services/authService.js
const passport = require('passport');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).json({ message: 'Signup successful' });
    });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
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
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
