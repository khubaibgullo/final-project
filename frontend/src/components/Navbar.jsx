import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'instructor') return '/instructor/dashboard';
    return '/student/dashboard';
  };

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="lh-navbar">
      <Link to="/" className="lh-navbar__brand">
        <span className="lh-navbar__brand-dot" />
        LearnHub
      </Link>

      <ul className="lh-navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="lh-navbar__actions">
        {user ? (
          <div className="lh-navbar__user" ref={dropRef}>
            <button className="lh-navbar__user-btn" onClick={() => setOpen(!open)}>
              <div className="lh-navbar__avatar">{user.name?.charAt(0).toUpperCase()}</div>
              {user.name}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {open && (
              <div className="lh-dropdown">
                <Link to={getDashboardLink()} onClick={() => setOpen(false)}>Dashboard</Link>
                <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
                <hr />
                <button onClick={handleLogout}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="btn-secondary btn-sm">Sign in</Link>
            <Link to="/register" className="btn-primary btn-sm">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
