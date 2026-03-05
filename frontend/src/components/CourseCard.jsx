import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100 shadow-sm course-card">
      <Card.Img
        variant="top"
        src={course.thumbnail || `https://via.placeholder.com/300x180?text=${encodeURIComponent(course.title)}`}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="mb-2 align-self-start">{course.category}</Badge>
        <Card.Title className="fs-6 fw-bold">{course.title}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {course.description?.substring(0, 100)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="text-muted small">👨‍🏫 {course.instructor?.name}</span>
          <span className="fw-bold text-success">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
        </div>
        <Button as={Link} to={`/courses/${course._id}`} variant="primary" size="sm" className="mt-3">
          View Course
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
