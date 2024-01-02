// services/memoryService.js
const Memory = require('../models/memory');

exports.getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user._id });
    res.status(200).json(memories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMemoryById = async (req, res) => {
  try {
    const memory = await Memory.findOne({ _id: req.params.memoryId, user: req.user._id });
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMemory = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newMemory = await Memory.create({
      title,
      description,
      user: req.user._id
    });
    res.status(201).json(newMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMemory = async (req, res) => {
  const { title, description } = req.body;
  try {
    const updatedMemory = await Memory.findOneAndUpdate(
      { _id: req.params.memoryId, user: req.user._id },
      { $set: { title, description } },
      { new: true }
    );
    if (!updatedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.status(200).json(updatedMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMemory = async (req, res) => {
  try {
    const deletedMemory = await Memory.findOneAndDelete({ _id: req.params.memoryId, user: req.user._id });
    if (!deletedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }
    res.status(200).json({ message: 'Memory deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
