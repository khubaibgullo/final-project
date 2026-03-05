import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAnalytics } from '../../services/userService';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then(({ data }) => setAnalytics(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  const stats = [
    { label: 'Total Users', value: analytics?.totalUsers, color: 'primary', icon: '👥' },
    { label: 'Students', value: analytics?.totalStudents, color: 'info', icon: '🎓' },
    { label: 'Instructors', value: analytics?.totalInstructors, color: 'warning', icon: '👨‍🏫' },
    { label: 'Total Courses', value: analytics?.totalCourses, color: 'success', icon: '📚' },
    { label: 'Enrollments', value: analytics?.totalEnrollments, color: 'danger', icon: '📝' },
  ];

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">Admin Dashboard</h2>
      <p className="text-muted mb-4">System overview and management</p>

      <Row className="g-3 mb-5">
        {stats.map((s) => (
          <Col md={4} lg={2} key={s.label} style={{ minWidth: '180px' }}>
            <Card className="text-center shadow-sm border-0 p-3 h-100">
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <h2 className={`fw-bold text-${s.color} mb-0`}>{s.value}</h2>
              <p className="text-muted small mb-0">{s.label}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold bg-white">Quick Actions</Card.Header>
            <Card.Body className="d-flex flex-column gap-2">
              <Link to="/admin/users" className="btn btn-outline-primary">👥 Manage Users</Link>
              <Link to="/admin/courses" className="btn btn-outline-success">📚 Manage Courses</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold bg-white">Enrollment Trend (Last 6 Months)</Card.Header>
            <Card.Body>
              {analytics?.enrollmentTrend?.length === 0 ? (
                <p className="text-muted">No enrollment data yet.</p>
              ) : (
                <table className="table table-sm">
                  <thead><tr><th>Month</th><th>Enrollments</th></tr></thead>
                  <tbody>
                    {analytics?.enrollmentTrend?.map((t, i) => (
                      <tr key={i}>
                        <td>{t._id.month}/{t._id.year}</td>
                        <td><strong>{t.count}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
