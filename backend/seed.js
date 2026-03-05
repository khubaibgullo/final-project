require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';

// ─── USERS ────────────────────────────────────────────────────────────────────
const users = [
  // Admin
  { name: 'Super Admin',       email: 'admin@learnhub.com',      password: 'admin123',  role: 'admin' },

  // Instructors
  { name: 'Ahmed Khan',        email: 'ahmed@learnhub.com',      password: 'pass1234',  role: 'instructor' },
  { name: 'Sara Malik',        email: 'sara@learnhub.com',       password: 'pass1234',  role: 'instructor' },
  { name: 'Usman Tariq',       email: 'usman@learnhub.com',      password: 'pass1234',  role: 'instructor' },

  // Students
  { name: 'Ali Raza',          email: 'ali@student.com',         password: 'pass1234',  role: 'student' },
  { name: 'Fatima Noor',       email: 'fatima@student.com',      password: 'pass1234',  role: 'student' },
  { name: 'Bilal Hussain',     email: 'bilal@student.com',       password: 'pass1234',  role: 'student' },
  { name: 'Zainab Sheikh',     email: 'zainab@student.com',      password: 'pass1234',  role: 'student' },
  { name: 'Hassan Javed',      email: 'hassan@student.com',      password: 'pass1234',  role: 'student' },
];

// ─── COURSES FACTORY ──────────────────────────────────────────────────────────
const buildCourses = (instructorIds) => {
  const [ahmed, sara, usman] = instructorIds;

  return [
    // ── Web Development ──────────────────────────────────────────────────────
    {
      title: 'Complete React JS Bootcamp',
      description:
        'Master React from zero to hero. Learn hooks, context API, React Router, and build 5 real-world projects including a full e-commerce app.',
      instructor: ahmed,
      category: 'Web Development',
      price: 0,
      thumbnail: 'https://placehold.co/600x340/61DAFB/000000?text=React+JS',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'Introduction to React & JSX',           duration: 20, order: 1 },
        { title: 'Components & Props',                    duration: 25, order: 2 },
        { title: 'State & useState Hook',                 duration: 30, order: 3 },
        { title: 'useEffect & Lifecycle',                 duration: 35, order: 4 },
        { title: 'React Router v6',                       duration: 40, order: 5 },
        { title: 'Context API & Global State',            duration: 45, order: 6 },
        { title: 'Fetching Data with Axios',              duration: 30, order: 7 },
        { title: 'Building the E-Commerce Project',       duration: 90, order: 8 },
      ],
    },
    {
      title: 'Node.js & Express — Backend Mastery',
      description:
        'Build production-ready REST APIs with Node.js and Express. Covers authentication, file uploads, error handling, and deployment.',
      instructor: ahmed,
      category: 'Web Development',
      price: 29,
      thumbnail: 'https://placehold.co/600x340/339933/ffffff?text=Node.js',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'Node.js Fundamentals',                  duration: 25, order: 1 },
        { title: 'Express Framework Setup',               duration: 20, order: 2 },
        { title: 'REST API Design Principles',            duration: 30, order: 3 },
        { title: 'Middleware & Error Handling',           duration: 35, order: 4 },
        { title: 'JWT Authentication',                    duration: 40, order: 5 },
        { title: 'File Uploads with Multer',              duration: 30, order: 6 },
        { title: 'Deploying to Render',                   duration: 25, order: 7 },
      ],
    },
    {
      title: 'MongoDB & Mongoose — Complete Guide',
      description:
        'Deep dive into MongoDB schema design, aggregation pipelines, indexing, and Mongoose ODM for building scalable applications.',
      instructor: usman,
      category: 'Web Development',
      price: 19,
      thumbnail: 'https://placehold.co/600x340/47A248/ffffff?text=MongoDB',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'MongoDB Basics & Installation',         duration: 20, order: 1 },
        { title: 'CRUD Operations',                       duration: 30, order: 2 },
        { title: 'Mongoose Schemas & Models',             duration: 35, order: 3 },
        { title: 'Relationships & Population',            duration: 40, order: 4 },
        { title: 'Aggregation Pipeline',                  duration: 50, order: 5 },
        { title: 'Indexing & Performance',                duration: 35, order: 6 },
      ],
    },

    // ── Data Science ─────────────────────────────────────────────────────────
    {
      title: 'Python for Data Science — Beginner to Pro',
      description:
        'Learn Python, NumPy, Pandas, Matplotlib, and Scikit-learn. Complete with real datasets, hands-on projects, and a capstone ML project.',
      instructor: sara,
      category: 'Data Science',
      price: 49,
      thumbnail: 'https://placehold.co/600x340/3776AB/ffffff?text=Python+DS',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'Python Basics Refresher',               duration: 30, order: 1 },
        { title: 'NumPy Arrays & Operations',             duration: 35, order: 2 },
        { title: 'Pandas DataFrames',                     duration: 40, order: 3 },
        { title: 'Data Cleaning & Preprocessing',         duration: 45, order: 4 },
        { title: 'Data Visualization with Matplotlib',    duration: 35, order: 5 },
        { title: 'Introduction to Machine Learning',      duration: 50, order: 6 },
        { title: 'Capstone: Sales Prediction Model',      duration: 80, order: 7 },
      ],
    },
    {
      title: 'Machine Learning A–Z',
      description:
        'Comprehensive machine learning course covering supervised, unsupervised, and reinforcement learning with Python and real-world datasets.',
      instructor: sara,
      category: 'Data Science',
      price: 59,
      thumbnail: 'https://placehold.co/600x340/FF6F00/ffffff?text=Machine+Learning',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'What is Machine Learning?',             duration: 20, order: 1 },
        { title: 'Linear & Logistic Regression',          duration: 45, order: 2 },
        { title: 'Decision Trees & Random Forests',       duration: 50, order: 3 },
        { title: 'SVM & KNN',                             duration: 40, order: 4 },
        { title: 'Clustering — K-Means',                  duration: 35, order: 5 },
        { title: 'Neural Networks Introduction',          duration: 60, order: 6 },
        { title: 'Model Evaluation & Tuning',             duration: 45, order: 7 },
      ],
    },

    // ── Design ───────────────────────────────────────────────────────────────
    {
      title: 'UI/UX Design with Figma',
      description:
        'Learn UI/UX design principles, wireframing, prototyping, and building stunning interfaces in Figma. Includes a portfolio-ready case study.',
      instructor: sara,
      category: 'Design',
      price: 0,
      thumbnail: 'https://placehold.co/600x340/F24E1E/ffffff?text=Figma+Design',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'Design Thinking & UX Principles',       duration: 25, order: 1 },
        { title: 'Figma Interface & Tools',               duration: 30, order: 2 },
        { title: 'Wireframing & Low-Fi Prototypes',       duration: 35, order: 3 },
        { title: 'Typography & Color Theory',             duration: 30, order: 4 },
        { title: 'Component Libraries & Design Systems',  duration: 45, order: 5 },
        { title: 'High-Fidelity Prototype',               duration: 60, order: 6 },
        { title: 'User Testing & Feedback',               duration: 30, order: 7 },
      ],
    },

    // ── Mobile Development ───────────────────────────────────────────────────
    {
      title: 'React Native — Build iOS & Android Apps',
      description:
        'Build cross-platform mobile apps using React Native. Cover navigation, native APIs, push notifications, and publish to App Store & Play Store.',
      instructor: usman,
      category: 'Mobile Development',
      price: 39,
      thumbnail: 'https://placehold.co/600x340/20232A/61DAFB?text=React+Native',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'React Native Setup & Expo',             duration: 25, order: 1 },
        { title: 'Core Components & Styling',             duration: 30, order: 2 },
        { title: 'Navigation with React Navigation',      duration: 40, order: 3 },
        { title: 'State Management',                      duration: 35, order: 4 },
        { title: 'Camera & Location APIs',                duration: 40, order: 5 },
        { title: 'Push Notifications',                    duration: 30, order: 6 },
        { title: 'Publishing to App Stores',              duration: 35, order: 7 },
      ],
    },

    // ── Business ─────────────────────────────────────────────────────────────
    {
      title: 'Freelancing Masterclass — Earn Online',
      description:
        'A practical guide to starting and scaling a freelancing career. Covers finding clients, writing proposals, pricing, and managing projects.',
      instructor: usman,
      category: 'Business',
      price: 0,
      thumbnail: 'https://placehold.co/600x340/6C63FF/ffffff?text=Freelancing',
      isPublished: true,
      enrollmentCount: 0,
      lessons: [
        { title: 'Freelancing Mindset & Getting Started', duration: 20, order: 1 },
        { title: 'Setting Up Fiverr & Upwork Profiles',   duration: 25, order: 2 },
        { title: 'Writing Winning Proposals',             duration: 30, order: 3 },
        { title: 'Pricing Your Services',                 duration: 20, order: 4 },
        { title: 'Client Communication & Management',     duration: 25, order: 5 },
        { title: 'Scaling to $1000/month',               duration: 35, order: 6 },
      ],
    },

    // ── Draft (unpublished) ───────────────────────────────────────────────────
    {
      title: 'TypeScript — The Complete Developer Guide',
      description:
        'Learn TypeScript from scratch: types, interfaces, generics, decorators, and integrating with React and Node.js projects.',
      instructor: ahmed,
      category: 'Web Development',
      price: 24,
      thumbnail: 'https://placehold.co/600x340/3178C6/ffffff?text=TypeScript',
      isPublished: false,
      enrollmentCount: 0,
      lessons: [
        { title: 'Why TypeScript?',                       duration: 15, order: 1 },
        { title: 'Types & Interfaces',                    duration: 30, order: 2 },
        { title: 'Generics',                              duration: 35, order: 3 },
      ],
    },
  ];
};

// ─── SEED ─────────────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`👤 Created ${createdUsers.length} users`);

    // Separate by role
    const instructors = createdUsers.filter(u => u.role === 'instructor');
    const students    = createdUsers.filter(u => u.role === 'student');
    const instructorIds = instructors.map(i => i._id);

    // Create courses
    const courseData   = buildCourses(instructorIds);
    const createdCourses = await Course.create(courseData);
    console.log(`📚 Created ${createdCourses.length} courses`);

    // Enroll students into some courses
    const publishedCourses = createdCourses.filter(c => c.isPublished);
    const enrollments = [];

    const enrollmentPlan = [
      // [studentIndex, [courseIndexes], progress]
      [0, [0, 1, 3], [100, 60, 20]],
      [1, [0, 5, 7], [80, 100, 45]],
      [2, [2, 3, 6], [30, 70, 10]],
      [3, [0, 4, 7], [100, 50, 0]],
      [4, [1, 5],    [25, 90]],
    ];

    for (const [sIdx, cIdxList, progressList] of enrollmentPlan) {
      if (sIdx >= students.length) continue;
      for (let i = 0; i < cIdxList.length; i++) {
        const cIdx = cIdxList[i];
        if (cIdx >= publishedCourses.length) continue;
        enrollments.push({
          student:  students[sIdx]._id,
          course:   publishedCourses[cIdx]._id,
          progress: progressList[i],
          completedAt: progressList[i] >= 100 ? new Date() : null,
        });
      }
    }

    await Enrollment.insertMany(enrollments);

    // Update enrollmentCount on each course
    for (const enrollment of enrollments) {
      await Course.findByIdAndUpdate(enrollment.course, { $inc: { enrollmentCount: 1 } });
    }

    console.log(`📝 Created ${enrollments.length} enrollments`);

    // ── Summary ──────────────────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════');
    console.log('  🌱 DATABASE SEEDED SUCCESSFULLY');
    console.log('══════════════════════════════════════════');
    console.log('\n🔑 LOGIN CREDENTIALS:\n');
    console.log('  ADMIN');
    console.log('  Email   : admin@learnhub.com');
    console.log('  Password: admin123\n');
    console.log('  INSTRUCTORS');
    console.log('  Email   : ahmed@learnhub.com  | pass1234');
    console.log('  Email   : sara@learnhub.com   | pass1234');
    console.log('  Email   : usman@learnhub.com  | pass1234\n');
    console.log('  STUDENTS');
    console.log('  Email   : ali@student.com     | pass1234');
    console.log('  Email   : fatima@student.com  | pass1234');
    console.log('  Email   : bilal@student.com   | pass1234\n');
    console.log(`  📚 ${createdCourses.length} courses (${publishedCourses.length} published, ${createdCourses.length - publishedCourses.length} draft)`);
    console.log(`  👤 ${createdUsers.length} users  |  📝 ${enrollments.length} enrollments`);
    console.log('══════════════════════════════════════════\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
