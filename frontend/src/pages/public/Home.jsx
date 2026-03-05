import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    getCourses({ limit: 3 }).then(({ data }) => setFeaturedCourses(data.courses));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: 'white', padding: '100px 0' }}>
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-4">🎓 Learn Without Limits</h1>
          <p className="lead mb-5 text-light">
            Join thousands of students learning in-demand skills from expert instructors.
          </p>
          <Button as={Link} to="/courses" size="lg" variant="primary" className="me-3">
            Browse Courses
          </Button>
          <Button as={Link} to="/register" size="lg" variant="outline-light">
            Start Teaching
          </Button>
        </Container>
      </div>

      {/* Stats */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center g-4">
            {[
              { value: '10,000+', label: 'Students' },
              { value: '500+', label: 'Courses' },
              { value: '200+', label: 'Instructors' },
              { value: '95%', label: 'Satisfaction Rate' },
            ].map((stat) => (
              <Col md={3} key={stat.label}>
                <h2 className="fw-bold text-primary">{stat.value}</h2>
                <p className="text-muted">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Featured Courses */}
      <Container className="py-5">
        <h2 className="fw-bold mb-4">Featured Courses</h2>
        <Row className="g-4">
          {featuredCourses.map((course) => (
            <Col md={4} key={course._id}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/courses" variant="outline-primary" size="lg">
            View All Courses →
          </Button>
        </div>
      </Container>

      {/* Why Choose Us */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">Why Choose LearnHub?</h2>
          <Row className="g-4 text-center">
            {[
              { icon: '🎯', title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience.' },
              { icon: '📱', title: 'Learn Anywhere', desc: 'Access courses on any device, anytime, at your own pace.' },
              { icon: '🏆', title: 'Certificates', desc: 'Earn certificates to showcase your skills to employers.' },
            ].map((item) => (
              <Col md={4} key={item.title}>
                <Card className="h-100 border-0 shadow-sm p-3">
                  <div style={{ fontSize: '3rem' }}>{item.icon}</div>
                  <h5 className="fw-bold mt-2">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <Container className="text-center">
          <p className="mb-0">© {new Date().getFullYear()} LearnHub LMS — Built with MERN Stack</p>
        </Container>
      </footer>
    </>
  );
};

export default Home;
