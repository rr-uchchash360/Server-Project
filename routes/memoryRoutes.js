// routes/memoryRoutes.js
const express = require('express');
const memoryController = require('../controllers/memoryController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

// Middleware to ensure authentication for memory operations
router.use(authenticationMiddleware.authenticateUser);

router.get('/', memoryController.getAllMemories);
router.get('/:memoryId', memoryController.getMemoryById);
router.post('/', memoryController.createMemory);
router.put('/:memoryId', memoryController.updateMemory);
router.delete('/:memoryId', memoryController.deleteMemory);

module.exports = router;
