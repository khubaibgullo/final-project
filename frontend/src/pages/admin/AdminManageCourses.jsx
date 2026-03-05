import { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { getAllCoursesAdmin, deleteCourse, updateCourse } from '../../services/courseService';

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllCoursesAdmin()
      .then(({ data }) => setCourses(data.courses))
      .finally(() => setLoading(false));
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
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Manage Courses</h2>
      {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}
      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : (
        <Table responsive striped hover>
          <thead className="table-dark">
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
                <td>{i + 1}</td>
                <td className="fw-semibold">{c.title}</td>
                <td>{c.instructor?.name}</td>
                <td><Badge bg="secondary">{c.category}</Badge></td>
                <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                <td>{c.enrollmentCount || 0}</td>
                <td>
                  <Badge bg={c.isPublished ? 'success' : 'warning'}>
                    {c.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="d-flex gap-1">
                  <Button variant={c.isPublished ? 'outline-warning' : 'outline-success'} size="sm" onClick={() => togglePublish(c)}>
                    {c.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminManageCourses;
