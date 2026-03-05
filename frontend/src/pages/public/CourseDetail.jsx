import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
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
    getCourseById(id)
      .then(({ data }) => setCourse(data.course))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate('/login');
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      setMessage('Successfully enrolled! Go to your dashboard to start learning.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error enrolling.');
    }
    setEnrolling(false);
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (!course) return <Container className="py-5"><Alert variant="danger">Course not found.</Alert></Container>;

  return (
    <Container className="py-5">
      <Row className="g-5">
        <Col md={8}>
          <Badge bg="secondary" className="mb-2">{course.category}</Badge>
          <h1 className="fw-bold">{course.title}</h1>
          <p className="text-muted">👨‍🏫 Instructor: <strong>{course.instructor?.name}</strong></p>
          <hr />
          <h5 className="fw-bold">About This Course</h5>
          <p>{course.description}</p>
          <h5 className="fw-bold mt-4">Course Lessons ({course.lessons?.length || 0})</h5>
          <ListGroup variant="flush">
            {course.lessons?.length === 0 && <ListGroup.Item className="text-muted">No lessons added yet.</ListGroup.Item>}
            {course.lessons?.map((lesson, i) => (
              <ListGroup.Item key={lesson._id} className="d-flex justify-content-between">
                <span>📖 {i + 1}. {lesson.title}</span>
                {lesson.duration > 0 && <span className="text-muted">{lesson.duration} min</span>}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <div className="sticky-top" style={{ top: '80px' }}>
            <div className="card shadow-lg p-4">
              <img
                src={course.thumbnail || `https://via.placeholder.com/300x200?text=${encodeURIComponent(course.title)}`}
                alt={course.title}
                className="rounded mb-3 w-100"
                style={{ objectFit: 'cover', height: '180px' }}
              />
              <h2 className="fw-bold text-success mb-3">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </h2>
              {message && <Alert variant={message.includes('Success') ? 'success' : 'danger'} className="small">{message}</Alert>}
              {user?.role === 'student' && (
                <Button variant="primary" size="lg" className="w-100" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
              )}
              {!user && (
                <Button variant="primary" size="lg" className="w-100" onClick={() => navigate('/login')}>
                  Login to Enroll
                </Button>
              )}
              <p className="text-muted text-center small mt-2">👨‍🎓 {course.enrollmentCount} students enrolled</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
