// models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', userSchema);
