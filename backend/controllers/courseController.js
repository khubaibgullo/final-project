const Course = require('../models/Course');

// GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await Course.countDocuments(query);
    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ courses, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/courses/all (admin/instructor - all courses)
exports.getAllCoursesAdmin = async (req, res) => {
  try {
    const filter = req.user.role === 'instructor' ? { instructor: req.user._id } : {};
    const courses = await Course.find(filter).populate('instructor', 'name email').sort({ createdAt: -1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;
    const course = await Course.create({
      title,
      description,
      category,
      price,
      thumbnail,
      instructor: req.user._id,
    });
    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this course' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ message: 'Course updated', course: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/courses/:id/lessons
exports.addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    course.lessons.push(req.body);
    await course.save();
    res.status(201).json({ message: 'Lesson added', course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
