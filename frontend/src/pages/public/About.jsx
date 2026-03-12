const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const About = () => {
  const items = [
    { icon: <TargetIcon />, title: 'Our Mission', desc: 'To make quality education accessible to everyone, everywhere — regardless of background or location.' },
    { icon: <UsersIcon />, title: 'Our Community', desc: 'A thriving network of 10,000+ students and 200+ instructors collaborating and growing worldwide.' },
    { icon: <CodeIcon />, title: 'Our Technology', desc: 'Built with React, Node.js, Express, and MongoDB for a seamless, modern learning experience.' },
  ];

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '80px 24px' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="hero__eyebrow" style={{ marginBottom: 20, display: 'inline-flex' }}>About us</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.04em' }}>
            Built for curious minds
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            LearnHub is a modern Learning Management System designed to connect passionate learners
            with expert instructors. We believe education should be accessible, engaging, and effective.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {items.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="feature-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--secondary">
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 16, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Want to teach on LearnHub?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
            Share your expertise with thousands of eager learners worldwide.
          </p>
          <a href="/register" className="btn-primary btn-lg">Apply as instructor →</a>
        </div>
      </section>

      <footer className="lh-footer">
        <p>© {new Date().getFullYear()} <span>LearnHub</span> — Built with MERN Stack</p>
      </footer>
    </>
  );
};

export default About;
