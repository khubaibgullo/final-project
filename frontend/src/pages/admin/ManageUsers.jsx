import { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { getAllUsers, deleteUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(({ data }) => setUsers(data.users))
      .finally(() => setLoading(false));
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

  const roleColor = { admin: 'danger', instructor: 'warning', student: 'primary' };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Manage Users</h2>
      {message && <Alert variant="info" dismissible onClose={() => setMessage('')}>{message}</Alert>}
      {loading ? (
        <div className="text-center py-4"><Spinner animation="border" /></div>
      ) : (
        <Table responsive striped hover>
          <thead className="table-dark">
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
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><Badge bg={roleColor[u.role]}>{u.role}</Badge></td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u._id !== currentUser._id ? (
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u._id)}>Delete</Button>
                  ) : (
                    <span className="text-muted small">You</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ManageUsers;
