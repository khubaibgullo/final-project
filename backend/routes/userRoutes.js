const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAnalytics, updateProfile } = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// IMPORTANT: /analytics and /profile must come before /:id
router.get('/analytics', protect, restrictTo('admin'), getAnalytics);
router.put('/profile', protect, updateProfile);
router.get('/', protect, restrictTo('admin'), getAllUsers);
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router;
