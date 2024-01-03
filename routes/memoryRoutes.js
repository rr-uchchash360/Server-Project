// routes/memoryRoutes.js
const express = require('express');
const memoryController = require('../controllers/memoryController');
const fileController = require('../controllers/fileController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');

const router = express.Router();

// Middleware to ensure authentication for memory operations
router.use(authenticationMiddleware.authenticateUser);

// Routes for memory CRUD operations
router.get('/', memoryController.getAllMemories);
router.get('/:memoryId', memoryController.getMemoryById);
router.post('/', memoryController.createMemory);
router.put('/:memoryId', memoryController.updateMemory);
router.delete('/:memoryId', memoryController.deleteMemory);

// Image handling routes
router.post('/:memoryId/images', fileUploadMiddleware.uploadImage, fileController.uploadImage);
router.get('/:memoryId/images', fileController.getImageByMemoryId);
router.delete('/:memoryId/images', fileController.deleteImageByMemoryId);

module.exports = router;
