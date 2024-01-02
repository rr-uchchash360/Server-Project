// controllers/memoryController.js
const memoryService = require('../services/memoryService');

exports.getAllMemories = memoryService.getAllMemories;
exports.getMemoryById = memoryService.getMemoryById;
exports.createMemory = memoryService.createMemory;
exports.updateMemory = memoryService.updateMemory;
exports.deleteMemory = memoryService.deleteMemory;
