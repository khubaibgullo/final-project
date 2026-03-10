import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const ROLE_BADGE = { admin: 'badge-danger', instructor: 'badge-warning', student: 'badge-primary' };

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllUsers().then(({ data }) => setUsers(data.users)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage('User deleted successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error deleting user.');
    }
  };

  return (
    <>
      <div className="dashboard-header">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 6 }}>Admin</p>
          <h1 style={{ fontSize: '2rem' }}>Manage users</h1>
        </div>
      </div>

      <div className="dashboard-content">
        {message && (
          <div className="alert alert-success" style={{ marginBottom: 24 }}>
            {message}
            <button onClick={() => setMessage('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>✕</button>
          </div>
        )}

        {loading ? (
          <div className="spinner-page"><div className="spinner" /></div>
        ) : (
          <div className="card">
            <div style={{ overflowX: 'auto' }}>
              <table className="lh-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id}>
                      <td style={{ color: 'var(--ink-muted)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className={`badge ${ROLE_BADGE[u.role] || 'badge-default'}`}>{u.role}</span></td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u._id !== currentUser._id ? (
                          <button className="btn-danger btn-sm" onClick={() => handleDelete(u._id)}>Delete</button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>You</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
