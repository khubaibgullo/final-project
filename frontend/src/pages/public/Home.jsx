import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    getCourses({ limit: 3 }).then(({ data }) => setFeaturedCourses(data.courses)).catch(() => {});
  }, []);

  const features = [
    { icon: '◎', title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience and proven track records.' },
    { icon: '◈', title: 'Learn Anywhere', desc: 'Access your courses on any device, anytime. Set your own pace and study on your schedule.' },
    { icon: '◇', title: 'Certificates', desc: 'Earn verifiable certificates to showcase your new skills to employers and clients.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <span className="hero__eyebrow">Learning reimagined</span>
        <h1 className="hero__title">Learn without <em>limits</em></h1>
        <p className="hero__subtitle">
          Join thousands of students acquiring in-demand skills from world-class instructors.
        </p>
        <div className="hero__cta">
          <Link to="/courses" className="btn-primary btn-lg">Browse courses</Link>
          <Link to="/register" className="btn-secondary btn-lg">Start teaching</Link>
        </div>
        <div className="hero__stats">
          {[
            { value: '10,000+', label: 'Students' },
            { value: '500+', label: 'Courses' },
            { value: '200+', label: 'Instructors' },
            { value: '95%', label: 'Satisfaction' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="hero__stat__value">{s.value}</div>
              <div className="hero__stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 8 }}>Handpicked for you</p>
                <h2 style={{ fontSize: '2rem' }}>Featured courses</h2>
              </div>
              <Link to="/courses" className="btn-ghost">View all →</Link>
            </div>
            <div className="grid grid-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why LearnHub */}
      <section className="section section--warm">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 8 }}>Why us</p>
            <h2 style={{ fontSize: '2rem' }}>Everything you need to grow</h2>
          </div>
          <div className="grid grid-3">
            {features.map((item) => (
              <div key={item.title} className="card" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 16, color: 'var(--accent)' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 10, fontFamily: 'DM Serif Display, Georgia, serif' }}>{item.title}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'var(--ink)', padding: '80px 24px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--paper)', fontSize: '2.2rem', marginBottom: 12 }}>Ready to start learning?</h2>
          <p style={{ color: 'rgba(250,249,247,0.6)', marginBottom: 32, fontSize: '1rem' }}>
            Join over 10,000 students already learning on LearnHub.
          </p>
          <Link to="/register" style={{ background: 'var(--accent)', color: 'white', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lh-footer">
        <p>© {new Date().getFullYear()} <span>LearnHub</span> — Built with MERN Stack</p>
      </footer>
    </>
  );
};

export default Home;
