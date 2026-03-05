import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCoursesAdmin, deleteCourse } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    getAllCoursesAdmin()
      .then(({ data }) => setCourses(data.courses))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c._id !== id));
  };

  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrollmentCount || 0), 0);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Instructor Dashboard</h2>
          <p className="text-muted">Welcome, {user?.name}</p>
        </div>
        <Button as={Link} to="/instructor/create-course" variant="primary">+ Create Course</Button>
      </div>

      <Row className="g-3 mb-4">
        {[
          { label: 'Total Courses', value: courses.length, color: 'primary' },
          { label: 'Total Enrollments', value: totalEnrollments, color: 'success' },
          { label: 'Published', value: courses.filter(c => c.isPublished).length, color: 'info' },
        ].map((s) => (
          <Col md={4} key={s.label}>
            <Card className="text-center border-0 shadow-sm p-3">
              <h2 className={`fw-bold text-${s.color}`}>{s.value}</h2>
              <p className="text-muted mb-0">{s.label}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="shadow-sm">
        <Card.Header className="fw-bold bg-white">My Courses</Card.Header>
        {loading ? (
          <div className="text-center py-4"><Spinner animation="border" /></div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead className="table-light">
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
                <tr><td colSpan={6} className="text-center text-muted py-4">No courses yet. Create your first!</td></tr>
              )}
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="fw-semibold">{course.title}</td>
                  <td><Badge bg="secondary">{course.category}</Badge></td>
                  <td>{course.price === 0 ? 'Free' : `$${course.price}`}</td>
                  <td>{course.enrollmentCount || 0}</td>
                  <td>
                    <Badge bg={course.isPublished ? 'success' : 'warning'}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td>
                    <Button as={Link} to={`/instructor/edit-course/${course._id}`} variant="outline-primary" size="sm" className="me-2">Edit</Button>
                    <Button as={Link} to={`/instructor/upload-lesson/${course._id}`} variant="outline-success" size="sm" className="me-2">+ Lessons</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(course._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default InstructorDashboard;
