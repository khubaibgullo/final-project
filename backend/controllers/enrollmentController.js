const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// POST /api/enrollments
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const existing = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (existing) return res.status(400).json({ message: 'Already enrolled in this course' });

    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId });

    // Increment enrollment count on course
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/enrollments/my-courses
exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: 'name' },
      })
      .sort({ createdAt: -1 });

    res.json({ enrollments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/enrollments/:id/progress
exports.updateProgress = async (req, res) => {
  try {
    const { progress, lessonId } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    enrollment.progress = progress;
    if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }
    if (progress >= 100) enrollment.completedAt = new Date();

    await enrollment.save();
    res.json({ message: 'Progress updated', enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
