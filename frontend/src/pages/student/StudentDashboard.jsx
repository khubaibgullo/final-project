import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyCourses } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCourses().then(({ data }) => setEnrollments(data.enrollments)).finally(() => setLoading(false));
  }, []);

  const completed = enrollments.filter((e) => e.progress >= 100).length;
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100).length;

  return (
    <>
      <div className="dashboard-header">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 6 }}>Student Dashboard</p>
          <h1 style={{ fontSize: '2rem', marginBottom: 4 }}>Hello, {user?.name}</h1>
          <p style={{ color: 'var(--ink-soft)' }}>Continue your learning journey.</p>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats */}
        <div className="grid grid-3" style={{ marginBottom: 48 }}>
          {[
            { label: 'Enrolled courses', value: enrollments.length },
            { label: 'In progress', value: inProgress },
            { label: 'Completed', value: completed },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.4rem' }}>My courses</h2>
          <Link to="/courses" className="btn-ghost btn-sm">Browse more →</Link>
        </div>

        {loading ? (
          <div className="spinner-page"><div className="spinner" /></div>
        ) : enrollments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◎</div>
            <p>You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="btn-primary">Explore courses</Link>
          </div>
        ) : (
          <div className="grid grid-3">
            {enrollments.map((enrollment) => (
              <div key={enrollment._id} className="card">
                <div className="card-body">
                  <div style={{ marginBottom: 12 }}>
                    <span className={`badge ${enrollment.progress >= 100 ? 'badge-success' : 'badge-primary'}`}>
                      {enrollment.progress >= 100 ? 'Completed' : 'In progress'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: 6, fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    {enrollment.course?.title}
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', marginBottom: 16 }}>
                    {enrollment.course?.instructor?.name}
                  </p>
                  <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className={`progress-fill ${enrollment.progress >= 100 ? 'done' : ''}`} style={{ width: `${enrollment.progress}%` }} />
                  </div>
                  <Link to={`/courses/${enrollment.course?._id}`} className="btn-secondary btn-sm btn-full" style={{ marginTop: 16 }}>
                    {enrollment.progress > 0 ? 'Continue' : 'Start'} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;
