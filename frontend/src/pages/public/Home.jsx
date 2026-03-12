import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    getCourses({ limit: 3 }).then(({ data }) => setFeaturedCourses(data.courses)).catch(() => {});
  }, []);

  const features = [
    { icon: <UsersIcon />, title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience and proven track records.' },
    { icon: <GlobeIcon />, title: 'Learn Anywhere', desc: 'Access your courses on any device, anytime. Set your own pace and study on your schedule.' },
    { icon: <AwardIcon />, title: 'Earn Certificates', desc: 'Receive verifiable certificates to showcase your new skills to employers and clients.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <span className="hero__eyebrow">✦ Learning reimagined</span>
        <h1 className="hero__title">Learn without <em>limits</em></h1>
        <p className="hero__subtitle">
          Join thousands of students acquiring in-demand skills from world-class instructors. Start today.
        </p>
        <div className="hero__cta">
          <Link to="/courses" className="btn-primary btn-lg">Browse courses →</Link>
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
        <section className="section--secondary">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p className="section-label">Handpicked for you</p>
                <h2 className="section-title">Featured courses</h2>
              </div>
              <Link to="/courses" className="btn-ghost">View all courses →</Link>
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
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label">Why us</p>
            <h2 className="section-title">Everything you need to grow</h2>
          </div>
          <div className="grid grid-3">
            {features.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="feature-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'var(--accent)', padding: '80px 24px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: 12, letterSpacing: '-0.03em' }}>
            Ready to start learning?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, fontSize: '1rem' }}>
            Join over 10,000 students already learning on LearnHub.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '14px 28px', background: 'white', color: 'var(--accent)',
              borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              Create free account →
            </Link>
            <Link to="/courses" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '14px 28px', background: 'rgba(255,255,255,0.15)', color: 'white',
              borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem',
              textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.4)',
              transition: 'all 0.2s',
            }}>
              Browse courses
            </Link>
          </div>
        </div>
      </section>

      <footer className="lh-footer">
        <p>© {new Date().getFullYear()} <span>LearnHub</span> — Built with MERN Stack</p>
      </footer>
    </>
  );
};

export default Home;
