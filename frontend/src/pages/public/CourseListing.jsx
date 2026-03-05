import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { getCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';

const CATEGORIES = ['All', 'Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Development'];

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const { data } = await getCourses(params);
      setCourses(data.courses);
      setTotalPages(data.pages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, [page, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses();
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Explore Courses</h1>

      {/* Search */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="primary">🔍 Search</Button>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {/* Results */}
      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
      ) : courses.length === 0 ? (
        <div className="text-center py-5 text-muted">No courses found.</div>
      ) : (
        <Row className="g-4">
          {courses.map((course) => (
            <Col md={4} key={course._id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="outline-primary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</Button>
          <span className="align-self-center">Page {page} of {totalPages}</span>
          <Button variant="outline-primary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
        </div>
      )}
    </Container>
  );
};

export default CourseListing;
