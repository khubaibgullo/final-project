## 📂 Note

- The backend is deployed on Render’s Free Plan. The server automatically "sleeps" after 15 minutes of inactivity. If you are accessing the app for the first time in a while, it may take 30–60 seconds for the server to spin up and respond to the first request.

# 🎓 LearnHub — Full Stack MERN Learning Management System

---

## 📂 Project Links

- **GitHub Repository:** [https://github.com/khubaibgullo/final-project](https://github.com/khubaibgullo/final-project)
- **Live Deployment:** [Vercel App](https://final-project-amber-kappa.vercel.app/)
- **Api BASE_URL:** [Render](https://final-project-naqk.onrender.com/)

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

## 🧾 Database Design

![ERD Diagram](Images/ERD-diagram.png)

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

![Admin Screenshot 1](<Images/admin/Screenshot (332).png>)
![Admin Screenshot 2](<Images/admin/Screenshot (333).png>)
![Admin Screenshot 3](<Images/admin/Screenshot (334).png>)
![Admin Screenshot 4](<Images/admin/Screenshot (335).png>)
![Admin Screenshot 5](<Images/admin/Screenshot (336).png>)
![Admin Screenshot 6](<Images/admin/Screenshot (337).png>)

---

### 🧑‍🏫 Instructor Module

![Instructor Screenshot 1](<Images/instructor/Screenshot (338).png>)
![Instructor Screenshot 2](<Images/instructor/Screenshot (339).png>)
![Instructor Screenshot 3](<Images/instructor/Screenshot (340).png>)
![Instructor Screenshot 4](<Images/instructor/Screenshot (341).png>)
![Instructor Screenshot 5](<Images/instructor/Screenshot (342).png>)

---

### 🎓 Student / User Module

![User Screenshot 1](<Images/user/Screenshot (343).png>)
![User Screenshot 2](<Images/user/Screenshot (344).png>)
![User Screenshot 3](<Images/user/Screenshot (345).png>)
![User Screenshot 4](<Images/user/Screenshot (346).png>)
![User Screenshot 5](<Images/user/Screenshot (358).png>)
![User Screenshot 6](<Images/user/Screenshot (359).png>)

---

### 📱 Mobile View

<table>
  <tr>
    <td><img src="Images/mobile/img1.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img2.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img3.jpeg" width="200"/></td>
  </tr>
  <tr>
    <td><img src="Images/mobile/img4.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img6.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img7.jpeg" width="200"/></td>
  </tr>
  <tr>
    <td><img src="Images/mobile/img7.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img13.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img9.jpeg" width="200"/></td>
  </tr>
  <tr>
    <td><img src="Images/mobile/img10.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img11.jpeg" width="200"/></td>
    <td><img src="Images/mobile/img12.jpeg" width="200"/></td>
  </tr>
</table>
---

### 🎨 Theme / UI

![Theme Screenshot 2](<Images/theme/Screenshot (350).png>)
![Theme Screenshot 5](<Images/theme/Screenshot (354).png>)
![Theme Screenshot 3](<Images/theme/Screenshot (351).png>)
![Theme Screenshot 6](<Images/theme/Screenshot (355).png>)

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
Add .env file
# Edit .env with your
PORT=5000
MONGO_URI=mongodb+srv://******:********@cluster0.ao3dopn.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL= http://localhost:3000
npm run dev
````

### 2. Install & Start Frontend

```bash
cd frontend
npm install
Add .env file
# Edit .env with your REACT_APP_API_URL to Backend server running URL
# REACT_APP_API_URL=http://localhost:5000/api
npm start
```

The Frontend runs on **http://localhost:5000** and the backend on **http://localhost:3000**.

---

## 🚀 Deployment

**Backend** → Deploy to [Render](https://render.com) or [Railway](https://railway.app)

**Frontend** → Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

**Database** → Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)

Set environment variables on your hosting platform matching `.env`.

---

## 📜 Student Declaration

I confirm that this project is my own work and I have not copied it from any unauthorized source.

## **Student Name:** Muhammad Khubaib 

**Date:** 12 March 2026
