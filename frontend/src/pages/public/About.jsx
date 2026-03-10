const About = () => {
  const items = [
    { icon: '◎', title: 'Our Mission', desc: 'To make quality education accessible to everyone, everywhere — regardless of background or location.' },
    { icon: '◈', title: 'Our Community', desc: 'A thriving network of 10,000+ students and 200+ instructors collaborating and growing worldwide.' },
    { icon: '◇', title: 'Our Technology', desc: 'Built with React, Node.js, Express, and MongoDB for a seamless, modern learning experience.' },
  ];

  return (
    <>
      <div style={{ background: 'var(--paper-warm)', borderBottom: '1px solid var(--paper-mid)', padding: '80px 24px' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span style={{ display: 'inline-block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: 16, background: 'var(--accent-light)', padding: '4px 12px', borderRadius: 100 }}>About us</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 20 }}>Built for curious minds</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.7, fontWeight: 300 }}>
            LearnHub is a modern Learning Management System designed to connect passionate learners
            with expert instructors. We believe education should be accessible, engaging, and effective.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {items.map((item) => (
              <div key={item.title} className="card" style={{ padding: '36px 28px' }}>
                <div style={{ fontSize: '1.6rem', color: 'var(--accent)', marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 12, fontFamily: 'DM Serif Display, Georgia, serif' }}>{item.title}</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 16 }}>Want to teach on LearnHub?</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 32 }}>Share your expertise with thousands of eager learners worldwide.</p>
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
