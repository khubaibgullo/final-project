import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => (
  <Container className="py-5">
    <h1 className="fw-bold mb-3">About LearnHub LMS</h1>
    <p className="lead text-muted mb-5">
      LearnHub is a modern Learning Management System built on the MERN stack, designed to connect passionate learners with expert instructors.
    </p>
    <Row className="g-4">
      {[
        { icon: '🎯', title: 'Our Mission', desc: 'To make quality education accessible to everyone, everywhere.' },
        { icon: '👥', title: 'Our Community', desc: 'A thriving community of 10,000+ students and 200+ instructors worldwide.' },
        { icon: '🚀', title: 'Our Technology', desc: 'Built with React, Node.js, Express, and MongoDB for a seamless experience.' },
      ].map((item) => (
        <Col md={4} key={item.title}>
          <Card className="h-100 shadow-sm text-center p-4 border-0">
            <div style={{ fontSize: '3rem' }}>{item.icon}</div>
            <h5 className="fw-bold mt-3">{item.title}</h5>
            <p className="text-muted">{item.desc}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default About;
