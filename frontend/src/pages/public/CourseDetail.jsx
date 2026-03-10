import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../../services/courseService';
import { enrollInCourse } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCourseById(id).then(({ data }) => setCourse(data.course)).finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      setMessage('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error enrolling.');
    }
    setEnrolling(false);
  };

  if (loading) return <div className="spinner-page" style={{ minHeight: '60vh' }}><div className="spinner" /></div>;
  if (!course) return (
    <div className="container" style={{ padding: '80px 24px' }}>
      <div className="alert alert-danger">Course not found.</div>
    </div>
  );

  return (
    <div style={{ background: 'var(--paper-warm)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '56px 24px 48px' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="badge" style={{ background: 'rgba(250,249,247,0.15)', color: 'var(--paper)', marginBottom: 16 }}>{course.category}</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--paper)', marginBottom: 16 }}>{course.title}</h1>
            <p style={{ color: 'rgba(250,249,247,0.6)', marginBottom: 0 }}>
              by {course.instructor?.name} · {course.enrollmentCount || 0} students enrolled
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>
          {/* Content */}
          <div>
            <div className="card" style={{ marginBottom: 24 }}>
              <div className="card-header"><h3>About this course</h3></div>
              <div className="card-body">
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75 }}>{course.description}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Course lessons ({course.lessons?.length || 0})</h3>
              </div>
              {(!course.lessons || course.lessons.length === 0) ? (
                <div className="card-body">
                  <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem' }}>No lessons added yet.</p>
                </div>
              ) : (
                <div>
                  {course.lessons.map((lesson, i) => (
                    <div key={lesson._id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 24px', borderBottom: i < course.lessons.length - 1 ? '1px solid var(--paper-warm)' : 'none',
                    }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ width: 24, height: 24, background: 'var(--paper-warm)', border: '1px solid var(--paper-mid)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--ink-muted)', flexShrink: 0 }}>{i + 1}</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{lesson.title}</span>
                      </div>
                      {lesson.duration > 0 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{lesson.duration} min</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enroll Sidebar */}
          <div className="enroll-card">
            <img
              src={course.thumbnail || `https://picsum.photos/seed/${course._id}/600/400`}
              alt={course.title}
              style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '2rem', fontFamily: 'DM Serif Display, Georgia, serif', color: 'var(--ink)', marginBottom: 4 }}>
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: 20 }}>
                One-time payment. Lifetime access.
              </p>

              {message === 'success' && (
                <div className="alert alert-success" style={{ fontSize: '0.8rem' }}>
                  Enrolled! Go to your <a href="/student/dashboard" style={{ color: 'inherit', fontWeight: 600 }}>dashboard</a> to start.
                </div>
              )}
              {message && message !== 'success' && (
                <div className="alert alert-danger" style={{ fontSize: '0.8rem' }}>{message}</div>
              )}

              {user?.role === 'student' && (
                <button className="btn-primary btn-full btn-lg" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? 'Enrolling…' : 'Enroll now →'}
                </button>
              )}
              {!user && (
                <button className="btn-primary btn-full btn-lg" onClick={() => navigate('/login')}>
                  Sign in to enroll
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
