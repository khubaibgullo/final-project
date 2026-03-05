const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getAllCoursesAdmin,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
} = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public
router.get('/', getAllCourses);

// IMPORTANT: /admin/all must be declared BEFORE /:id
// otherwise Express matches 'admin' as the :id param
router.get('/admin/all', protect, restrictTo('admin', 'instructor'), getAllCoursesAdmin);

router.get('/:id', getCourseById);
router.post('/', protect, restrictTo('instructor', 'admin'), createCourse);
router.put('/:id', protect, restrictTo('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, restrictTo('instructor', 'admin'), deleteCourse);
router.post('/:id/lessons', protect, restrictTo('instructor'), addLesson);

module.exports = router;
