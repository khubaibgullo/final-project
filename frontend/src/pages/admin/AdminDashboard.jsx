import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnalytics } from '../../services/userService';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics().then(({ data }) => setAnalytics(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner-page"><div className="spinner" /></div>;

  const stats = [
    { label: 'Total users', value: analytics?.totalUsers },
    { label: 'Students', value: analytics?.totalStudents },
    { label: 'Instructors', value: analytics?.totalInstructors },
    { label: 'Courses', value: analytics?.totalCourses },
    { label: 'Enrollments', value: analytics?.totalEnrollments },
  ];

  return (
    <>
      <div className="dashboard-header">
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
          <p className="section-label">Admin</p>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>System overview and management</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', marginBottom: 48 }}>
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value ?? '—'}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-2">
          <div className="card">
            <div className="card-header"><h3>Quick actions</h3></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/admin/users" className="btn-secondary btn-full" style={{ justifyContent: 'flex-start' }}>
                Manage users →
              </Link>
              <Link to="/admin/courses" className="btn-secondary btn-full" style={{ justifyContent: 'flex-start' }}>
                Manage courses →
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Enrollment trend</h3></div>
            <div className="card-body">
              {!analytics?.enrollmentTrend?.length ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No enrollment data yet.</p>
              ) : (
                <table className="lh-table">
                  <thead><tr><th>Month</th><th>Enrollments</th></tr></thead>
                  <tbody>
                    {analytics.enrollmentTrend.map((t, i) => (
                      <tr key={i}>
                        <td>{t._id.month}/{t._id.year}</td>
                        <td><strong style={{ color: 'var(--text-primary)' }}>{t.count}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
