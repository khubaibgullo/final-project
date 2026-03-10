import { useEffect, useState } from 'react';
import { getAllCoursesAdmin, deleteCourse, updateCourse } from '../../services/courseService';

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllCoursesAdmin().then(({ data }) => setCourses(data.courses)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      setMessage('Course deleted.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error deleting course.');
    }
  };

  const togglePublish = async (course) => {
    try {
      const { data } = await updateCourse(course._id, { isPublished: !course.isPublished });
      setCourses((prev) => prev.map((c) => c._id === course._id ? data.course : c));
    } catch (err) {
      setMessage('Error updating course status.');
    }
  };

  return (
    <>
      <div className="dashboard-header">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 6 }}>Admin</p>
          <h1 style={{ fontSize: '2rem' }}>Manage courses</h1>
        </div>
      </div>

      <div className="dashboard-content">
        {message && (
          <div className="alert alert-success" style={{ marginBottom: 24 }}>
            {message}
            <button onClick={() => setMessage('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>✕</button>
          </div>
        )}

        {loading ? (
          <div className="spinner-page"><div className="spinner" /></div>
        ) : (
          <div className="card">
            <div style={{ overflowX: 'auto' }}>
              <table className="lh-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Instructor</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Enrollments</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={c._id}>
                      <td style={{ color: 'var(--ink-muted)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{c.title}</td>
                      <td>{c.instructor?.name}</td>
                      <td><span className="badge badge-default">{c.category}</span></td>
                      <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                      <td>{c.enrollmentCount || 0}</td>
                      <td>
                        <span className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>
                          {c.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-ghost btn-sm" onClick={() => togglePublish(c)}>
                            {c.isPublished ? 'Unpublish' : 'Publish'}
                          </button>
                          <button className="btn-danger btn-sm" onClick={() => handleDelete(c._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminManageCourses;
