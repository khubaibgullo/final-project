import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCoursesAdmin, deleteCourse } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    getAllCoursesAdmin().then(({ data }) => setCourses(data.courses)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);

  return (
    <>
      <div className="dashboard-header">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 6 }}>Instructor</p>
            <h1 style={{ fontSize: '2rem', marginBottom: 4 }}>Dashboard</h1>
            <p style={{ color: 'var(--ink-soft)' }}>Welcome back, {user?.name}</p>
          </div>
          <Link to="/instructor/create-course" className="btn-primary">+ New course</Link>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="grid grid-3" style={{ marginBottom: 40 }}>
          {[
            { label: 'Total courses', value: courses.length },
            { label: 'Total enrollments', value: totalEnrollments },
            { label: 'Published', value: courses.filter(c => c.isPublished).length },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header"><h3>My courses</h3></div>
          {loading ? (
            <div className="spinner-page"><div className="spinner" /></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="lh-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Enrollments</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--ink-muted)', padding: 40 }}>No courses yet. Create your first one!</td></tr>
                  )}
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{course.title}</td>
                      <td><span className="badge badge-default">{course.category}</span></td>
                      <td>{course.price === 0 ? 'Free' : `$${course.price}`}</td>
                      <td>{course.enrollmentCount || 0}</td>
                      <td>
                        <span className={`badge ${course.isPublished ? 'badge-success' : 'badge-warning'}`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <Link to={`/instructor/edit-course/${course._id}`} className="btn-ghost btn-sm">Edit</Link>
                          <Link to={`/instructor/upload-lesson/${course._id}`} className="btn-ghost btn-sm">Lessons</Link>
                          <button className="btn-danger btn-sm" onClick={() => handleDelete(course._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;
