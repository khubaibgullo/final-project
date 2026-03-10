# 🎓 LearnHub — Full Stack MERN Learning Management System

---

## 📂 Project Links
- **GitHub Repository:** [https://github.com/khubaibgullo/final-project](https://github.com/khubaibgullo/final-project)
- **Live Deployment:** [Vercel App](https://final-project-amber-kappa.vercel.app/)

## 🚀 Demo Credentials — Try It Now!

> Use these credentials to log in and explore each role on the live site.

| Role          | Email              | Password |
| ------------- | ------------------ | -------- |
| 👑 Admin      | admin@learnhub.com | admin123 |
| 🧑‍🏫 Instructor | ahmed@learnhub.com | pass1234 |
| 🎓 Student    | ali@student.com    | pass1234 |

---

A complete, production-ready LMS built with **MongoDB, Express, React, and Node.js** supporting three user roles: Admin, Instructor, and Student.

---

## 📌 Project Overview

LearnHub is a role-based Learning Management System where:

- **Students** can browse, enroll in, and track progress through courses
- **Instructors** can create, manage, and upload lessons to their courses
- **Admins** can manage all users, courses, and view analytics

---

## 🛠️ Technologies Used

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React JS, React Router v6, Axios, Bootstrap 5 |
| Backend  | Node.js, Express.js                           |
| Database | MongoDB, Mongoose                             |
| Auth     | JWT (JSON Web Tokens), Bcrypt                 |
| Config   | Dotenv                                        |

---

## 📂 Project Structure

```
lms/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── CourseCard.jsx
        │   └── Navbar.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── public/      # Home, About, CourseListing, CourseDetail, Login, Register
        │   ├── student/     # StudentDashboard, Profile
        │   ├── instructor/  # InstructorDashboard, CourseForm, UploadLesson
        │   └── admin/       # AdminDashboard, ManageUsers, AdminManageCourses
        ├── routes/
        │   └── ProtectedRoute.jsx
        ├── services/
        │   ├── api.js
        │   ├── courseService.js
        │   └── userService.js
        ├── App.jsx
        └── index.js
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Access    |
| ------ | -------------------- | --------- |
| POST   | `/api/auth/register` | Public    |
| POST   | `/api/auth/login`    | Public    |
| GET    | `/api/auth/me`       | Protected |

### Courses

| Method | Endpoint                   | Access           |
| ------ | -------------------------- | ---------------- |
| GET    | `/api/courses`             | Public           |
| GET    | `/api/courses/:id`         | Public           |
| GET    | `/api/courses/admin/all`   | Admin/Instructor |
| POST   | `/api/courses`             | Instructor/Admin |
| PUT    | `/api/courses/:id`         | Instructor/Admin |
| DELETE | `/api/courses/:id`         | Instructor/Admin |
| POST   | `/api/courses/:id/lessons` | Instructor       |

### Users

| Method | Endpoint               | Access    |
| ------ | ---------------------- | --------- |
| GET    | `/api/users`           | Admin     |
| DELETE | `/api/users/:id`       | Admin     |
| GET    | `/api/users/analytics` | Admin     |
| PUT    | `/api/users/profile`   | Protected |

### Enrollments

| Method | Endpoint                        | Access  |
| ------ | ------------------------------- | ------- |
| POST   | `/api/enrollments`              | Student |
| GET    | `/api/enrollments/my-courses`   | Student |
| PUT    | `/api/enrollments/:id/progress` | Student |

---

## 👥 User Roles & Access

| Feature          | Student | Instructor | Admin |
| ---------------- | ------- | ---------- | ----- |
| Browse Courses   | ✅      | ✅         | ✅    |
| Enroll in Course | ✅      | ❌         | ❌    |
| Create Course    | ❌      | ✅         | ✅    |
| Upload Lessons   | ❌      | ✅         | ❌    |
| Manage All Users | ❌      | ❌         | ✅    |
| View Analytics   | ❌      | ❌         | ✅    |

---

## 🔐 Security Features

- Passwords hashed with **bcryptjs** (12 salt rounds)
- **JWT authentication** with expiry
- Protected routes via middleware
- Role-based access control (RBAC)
- Environment variables for all secrets (no hardcoded credentials)
- Global error handling

---

## 🖼️ Screenshots

### 🔑 Admin Module

![Admin Screenshot 1](<Images/admin/Screenshot%20(312).png>)
![Admin Screenshot 2](<Images/admin/Screenshot%20(313).png>)
![Admin Screenshot 3](<Images/admin/Screenshot%20(314).png>)
![Admin Screenshot 4](<Images/admin/Screenshot%20(315).png>)
![Admin Screenshot 5](<Images/admin/Screenshot%20(316).png>)
![Admin Screenshot 5](<Images/admin/Screenshot%20(317).png>)

---

### 🧑‍🏫 Instructor Module

![Instructor Screenshot 1](<Images/instructor/Screenshot%20(324).png>)
![Instructor Screenshot 2](<Images/instructor/Screenshot%20(325).png>)
![Instructor Screenshot 3](<Images/instructor/Screenshot%20(326).png>)
![Instructor Screenshot 4](<Images/instructor/Screenshot%20(327).png>)
![Instructor Screenshot 3](<Images/instructor/Screenshot%20(328).png>)
![Instructor Screenshot 4](<Images/instructor/Screenshot%20(329).png>)

---

### 🎓 Student / User Module

![User Screenshot 1](<Images/user/Screenshot%20(318).png>)
![User Screenshot 2](<Images/user/Screenshot%20(319).png>)
![User Screenshot 3](<Images/user/Screenshot%20(320).png>)
![User Screenshot 4](<Images/user/Screenshot%20(321).png>)
![User Screenshot 5](<Images/user/Screenshot%20(322).png>)
![User Screenshot 5](<Images/user/Screenshot%20(323).png>)

---

### 🗄️ Seed Data (Database Setup)

![Seed Data](Images/seed-data.png)

> **Seed file** defines test users (Admin, Instructors, Students) and course data used to populate the database for development and testing.

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

### 1. Clone & Install Backend

```bash
cd backend
npm install
cp .env .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Install & Start Frontend

```bash
cd frontend
npm install
npm start
```

The backend runs on **http://localhost:5000** and the frontend on **http://localhost:3000**.

---

## 📊 Marking Criteria Coverage

| Criteria                       | Implementation                              |
| ------------------------------ | ------------------------------------------- |
| UI/UX Design (15)              | Bootstrap 5, responsive layout, hero, cards |
| React Implementation (15)      | Hooks, Context API, React Router v6         |
| Backend API Development (20)   | Full RESTful API with Express               |
| Database Design (15)           | Mongoose models with relationships          |
| Authentication & Security (15) | JWT + bcrypt + protected routes             |
| Role-Based Functionality (10)  | Admin/Instructor/Student dashboards         |
| Code Quality & Structure (5)   | MVC pattern, services layer, clean code     |
| Deployment & Testing (5)       | Ready for Heroku/Render/Vercel deployment   |

---

## 🚀 Deployment

**Backend** → Deploy to [Render](https://render.com) or [Railway](https://railway.app)

**Frontend** → Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

**Database** → Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)

Set environment variables on your hosting platform matching `.env`.

---

## 📜 Student Declaration

I confirm that this project is my own work and I have not copied it from any unauthorized source.

**Student Name:** Muhammad Khubaib
**Signature:** Muhammad Khubaib
**Date:**  10 March 2026
