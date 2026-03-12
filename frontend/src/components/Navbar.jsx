import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const dropRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const handleLogout = () => { logout(); navigate('/'); setOpen(false); setMobileOpen(false); };

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
    <>
      <nav className="lh-navbar">
        <Link to="/" className="lh-navbar__brand">
          <div className="lh-navbar__brand-icon">LH</div>
          LearnHub
        </Link>

        <ul className="lh-navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div className="lh-navbar__actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {user ? (
            <div className="lh-navbar__user" ref={dropRef}>
              <button className="lh-navbar__user-btn" onClick={() => setOpen(!open)}>
                <div className="lh-navbar__avatar">{user.name?.charAt(0).toUpperCase()}</div>
                <span className="user-name">{user.name}</span>
                <ChevronIcon />
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

          <button className="lh-navbar__mobile-toggle" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div className={`lh-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setMobileOpen(false)}>Courses</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <hr />
        {user ? (
          <>
            <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)}>Dashboard</Link>
            <Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
            <button onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>Get started</Link>
          </>
        )}
      </div>
    </>
  );
};

export default AppNavbar;
