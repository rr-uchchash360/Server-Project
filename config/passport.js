// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

module.exports = function(customPassport) {
  // Local strategy
  customPassport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));

  // Google strategy
  customPassport.use(new GoogleStrategy({
    clientID: '867459182438-oop0h6lsqkqd69n1nvoqq2a9eoj4hlvo.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: ['profile', 'email'], // Adjust the scopes as needed
  },
  async (accessToken, refreshToken, profile) => {
    try {
      // Check if the user already exists in your database
      let user = await User.findOne({ 'google.id': profile.id });
  
      if (user) {
        return user;
      } else {
        // If the user doesn't exist, create a new user
        const newUser = new User({
          google: {
            id: profile.id,
            token: accessToken,
            name: profile.displayName,
            email: profile.emails[0].value,
          }
        });
        user = await newUser.save();
        return user;
      }
    } catch (err) {
      throw err;
    }
  }));
  

  // Serialize and deserialize users (for local strategy)
  customPassport.serializeUser(User.serializeUser());
  customPassport.deserializeUser(User.deserializeUser());
};

