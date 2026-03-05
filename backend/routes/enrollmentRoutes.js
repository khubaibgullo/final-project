const express = require('express');
const router = express.Router();
const { enrollInCourse, getMyCourses, updateProgress } = require('../controllers/enrollmentController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', protect, restrictTo('student'), enrollInCourse);
router.get('/my-courses', protect, restrictTo('student'), getMyCourses);
router.put('/:id/progress', protect, restrictTo('student'), updateProgress);

module.exports = router;
