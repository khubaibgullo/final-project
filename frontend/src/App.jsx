import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AppNavbar from './components/Navbar';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import CourseListing from './pages/public/CourseListing';
import CourseDetail from './pages/public/CourseDetail';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';

// Instructor pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CourseForm from './pages/instructor/CourseForm';
import UploadLesson from './pages/instructor/UploadLesson';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminManageCourses from './pages/admin/AdminManageCourses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseListing />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          {/* Instructor */}
          <Route path="/instructor/dashboard" element={
            <ProtectedRoute roles={['instructor']}><InstructorDashboard /></ProtectedRoute>
          } />
          <Route path="/instructor/create-course" element={
            <ProtectedRoute roles={['instructor']}><CourseForm /></ProtectedRoute>
          } />
          <Route path="/instructor/edit-course/:id" element={
            <ProtectedRoute roles={['instructor']}><CourseForm /></ProtectedRoute>
          } />
          <Route path="/instructor/upload-lesson/:id" element={
            <ProtectedRoute roles={['instructor']}><UploadLesson /></ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute roles={['admin']}><AdminManageCourses /></ProtectedRoute>
          } />

          {/* Fallbacks */}
          <Route path="/unauthorized" element={
            <div className="text-center py-5">
              <h2>🚫 Access Denied</h2>
              <p className="text-muted">You don't have permission to view this page.</p>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
