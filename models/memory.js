// models/memory.js
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: String, // File path for an image
  audio: String, // File path for audio
  video: String, // File path for video
});

module.exports = mongoose.model('Memory', memorySchema);
