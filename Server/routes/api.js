const express = require('express');
const { registerUser, loginUser, getProfile, updateProfile, uploadFile, readFile, deleteFile } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile
router.get('/profile', authenticate, getProfile);

// Update user profile
router.put('/profile', authenticate, updateProfile);

// File upload
router.post('/upload', authenticate, upload.single('file'), uploadFile);

// Read file
router.get('/file/:filename', authenticate, readFile);

// Delete file
router.delete('/file/:filename', authenticate, deleteFile);

module.exports = router;
