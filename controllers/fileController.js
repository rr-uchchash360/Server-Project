const fs = require('fs');
const path = require('path');
const Memory = require('../models/memory');

// Directory for image uploads
const imageDirectory = 'uploads/images';

// Function to upload an image and associate it with a memory
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const memoryId = req.body.memoryId; // Assuming memoryId is sent along with the image upload
    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    memory.image = path.join(imageDirectory, req.file.filename); // Save image path to memory
    await memory.save();

    res.status(201).json({ message: 'Image uploaded and associated with memory', memory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to retrieve an image associated with a memory
const getImageByMemoryId = async (req, res) => {
  try {
    const memoryId = req.params.memoryId;
    const memory = await Memory.findById(memoryId);

    if (!memory || !memory.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', memory.image);
    const image = fs.readFileSync(imagePath);

    res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Adjust content type based on your image type
    res.end(image, 'binary');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to delete an image associated with a memory
const deleteImageByMemoryId = async (req, res) => {
  try {
    const memoryId = req.params.memoryId;
    const memory = await Memory.findById(memoryId);

    if (!memory || !memory.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', memory.image);

    // Remove the image file
    fs.unlinkSync(imagePath);

    // Clear the image path from memory document
    memory.image = null;
    await memory.save();

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadImage, getImageByMemoryId, deleteImageByMemoryId };
