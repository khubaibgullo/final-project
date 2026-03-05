import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getMyCourses } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCourses()
      .then(({ data }) => setEnrollments(data.enrollments))
      .finally(() => setLoading(false));
  }, []);

  const completed = enrollments.filter((e) => e.progress >= 100).length;
  const inProgress = enrollments.filter((e) => e.progress > 0 && e.progress < 100).length;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">Welcome back, {user?.name}! 👋</h2>
      <p className="text-muted mb-4">Continue your learning journey.</p>

      {/* Stats */}
      <Row className="g-3 mb-5">
        {[
          { label: 'Enrolled Courses', value: enrollments.length, color: 'primary' },
          { label: 'In Progress', value: inProgress, color: 'warning' },
          { label: 'Completed', value: completed, color: 'success' },
        ].map((s) => (
          <Col md={4} key={s.label}>
            <Card className="text-center shadow-sm border-0 p-3">
              <h2 className={`fw-bold text-${s.color}`}>{s.value}</h2>
              <p className="text-muted mb-0">{s.label}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <h4 className="fw-bold mb-3">My Courses</h4>
      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : enrollments.length === 0 ? (
        <Card className="text-center p-5 border-dashed">
          <p className="text-muted mb-3">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </Card>
      ) : (
        <Row className="g-4">
          {enrollments.map((enrollment) => (
            <Col md={4} key={enrollment._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Badge bg={enrollment.progress >= 100 ? 'success' : 'primary'} className="mb-2">
                    {enrollment.progress >= 100 ? '✅ Completed' : '📚 In Progress'}
                  </Badge>
                  <Card.Title className="fs-6">{enrollment.course?.title}</Card.Title>
                  <p className="text-muted small">👨‍🏫 {enrollment.course?.instructor?.name}</p>
                  <ProgressBar
                    now={enrollment.progress}
                    label={`${enrollment.progress}%`}
                    variant={enrollment.progress >= 100 ? 'success' : 'primary'}
                    className="mt-2"
                  />
                  <Link to={`/courses/${enrollment.course?._id}`} className="btn btn-outline-primary btn-sm mt-3 w-100">
                    {enrollment.progress > 0 ? 'Continue' : 'Start'} Course
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;
