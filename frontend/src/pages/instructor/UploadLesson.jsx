import { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getCourseById, addLesson } from '../../services/courseService';

const UploadLesson = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', videoUrl: '', duration: 0 });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourseById(id).then(({ data }) => setCourse(data.course));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await addLesson(id, form);
      setCourse(data.course);
      setForm({ title: '', content: '', videoUrl: '', duration: 0 });
      setMessage('Lesson added successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding lesson.');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-1">Upload Lessons</h2>
      <p className="text-muted mb-4">Course: <strong>{course?.title}</strong></p>
      <div className="row g-4">
        <div className="col-md-7">
          <Card className="shadow-sm p-4">
            <h5 className="fw-bold mb-3">Add New Lesson</h5>
            {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Lesson Title *</Form.Label>
                <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Introduction to React Hooks" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Lesson content or description..." />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Video URL</Form.Label>
                <Form.Control value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtube.com/..." />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control type="number" min={0} value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} />
              </Form.Group>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Adding...' : '+ Add Lesson'}
              </Button>
            </Form>
          </Card>
        </div>
        <div className="col-md-5">
          <Card className="shadow-sm">
            <Card.Header className="fw-bold bg-white">Course Lessons ({course?.lessons?.length || 0})</Card.Header>
            <ListGroup variant="flush">
              {!course?.lessons?.length && (
                <ListGroup.Item className="text-muted text-center py-4">No lessons yet.</ListGroup.Item>
              )}
              {course?.lessons?.map((lesson, i) => (
                <ListGroup.Item key={lesson._id}>
                  <div className="fw-semibold">{i + 1}. {lesson.title}</div>
                  {lesson.duration > 0 && <small className="text-muted">{lesson.duration} min</small>}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default UploadLesson;
