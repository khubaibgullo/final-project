import { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createCourse, updateCourse, getCourseById } from '../../services/courseService';

const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Development', 'Other'];

const CourseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: CATEGORIES[0], price: 0, thumbnail: '', isPublished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getCourseById(id).then(({ data }) => {
        const c = data.course;
        setForm({ title: c.title, description: c.description, category: c.category, price: c.price, thumbnail: c.thumbnail, isPublished: c.isPublished });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdit) await updateCourse(id, form);
      else await createCourse(form);
      navigate('/instructor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving course.');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5" style={{ maxWidth: '700px' }}>
      <h2 className="fw-bold mb-4">{isEdit ? 'Edit Course' : 'Create New Course'}</h2>
      <Card className="shadow-sm p-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Course Title *</Form.Label>
            <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Complete React Developer Course" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control as="textarea" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required placeholder="Describe what students will learn..." />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price ($) *</Form.Label>
                <Form.Control type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://..." />
          </Form.Group>
          <Form.Check
            type="switch"
            label="Publish Course (make visible to students)"
            checked={form.isPublished}
            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            className="mb-4"
          />
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/instructor/dashboard')}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CourseForm;
