import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createCourse, updateCourse, getCourseById } from '../../services/courseService';

const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Development', 'Other'];

const CourseForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: CATEGORIES[0], price: 0, thumbnail: '', isPublished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getCourseById(id).then(({ data }) => {
        const c = data.course;
        setForm({ title: c.title, description: c.description, category: c.category, price: c.price, thumbnail: c.thumbnail || '', isPublished: c.isPublished });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (isEdit) await updateCourse(id, form);
      else await createCourse(form);
      navigate('/instructor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving course.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <Link to="/instructor/dashboard" className="btn-ghost btn-sm" style={{ marginBottom: 16, display: 'inline-flex' }}>← Back</Link>
        <h1 style={{ fontSize: '2rem' }}>{isEdit ? 'Edit course' : 'Create new course'}</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Course title *</label>
              <input className="form-control" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required placeholder="e.g. Complete React Developer Course" />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-control" rows={5} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required placeholder="Describe what students will learn…"
                style={{ resize: 'vertical', minHeight: 120 }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-control" value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (USD)</label>
                <input className="form-control" type="number" min={0} value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Thumbnail URL</label>
              <input className="form-control" value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                placeholder="https://…" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: 'var(--paper-warm)', borderRadius: 'var(--radius-sm)', marginBottom: 28 }}>
              <input type="checkbox" id="publish" checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                style={{ width: 16, height: 16, cursor: 'pointer' }} />
              <label htmlFor="publish" style={{ cursor: 'pointer', fontSize: '0.875rem', color: 'var(--ink-soft)', margin: 0 }}>
                Publish course — make it visible to students
              </label>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving…' : isEdit ? 'Save changes' : 'Create course'}
              </button>
              <Link to="/instructor/dashboard" className="btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
