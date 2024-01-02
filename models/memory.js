// models/memory.js
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Memory', memorySchema);
