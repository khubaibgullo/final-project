import { useState } from 'react';
import { Container, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/userService';

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
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed.');
    }
    setLoading(false);
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h2 className="fw-bold mb-4">My Profile</h2>
      <Card className="shadow-sm p-4">
        <div className="text-center mb-4">
          <div style={{ width: 80, height: 80, background: '#0d6efd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <Badge bg={user?.role === 'admin' ? 'danger' : user?.role === 'instructor' ? 'warning' : 'primary'} className="mt-2">
            {user?.role}
          </Badge>
        </div>
        {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={user?.email} disabled />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control placeholder="https://..." value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
