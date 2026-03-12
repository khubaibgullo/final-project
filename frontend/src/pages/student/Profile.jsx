import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/userService';

const ROLE_BADGE = { admin: 'badge-danger', instructor: 'badge-warning', student: 'badge-primary' };

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', avatar: user?.avatar || '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      setMessage('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 32 }}>My profile</h1>

      <div className="card" style={{ marginBottom: 24, padding: '32px', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, background: 'var(--accent)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', color: 'white', margin: '0 auto 16px', fontWeight: 800,
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <p style={{ fontWeight: 600, marginBottom: 4, fontSize: '1rem' }}>{user?.name}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 12 }}>{user?.email}</p>
        <span className={`badge ${ROLE_BADGE[user?.role] || 'badge-default'}`}>{user?.role}</span>
      </div>

      {message === 'success' && <div className="alert alert-success">Profile updated successfully.</div>}
      {message && message !== 'success' && <div className="alert alert-danger">{message}</div>}

      <div className="card">
        <div className="card-header"><h3>Edit details</h3></div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-control" value={user?.email} disabled />
            </div>
            <div className="form-group" style={{ marginBottom: 28 }}>
              <label className="form-label">Avatar URL</label>
              <input className="form-control" placeholder="https://…" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
