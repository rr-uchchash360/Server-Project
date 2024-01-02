// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // specify the email as the username field
});

module.exports = mongoose.model('User', userSchema);
