import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, addLesson } from '../../services/courseService';

const UploadLesson = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', videoUrl: '', duration: 0 });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourseById(id).then(({ data }) => setCourse(data.course));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await addLesson(id, form);
      setCourse(data.course);
      setForm({ title: '', content: '', videoUrl: '', duration: 0 });
      setMessage('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding lesson.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
      <Link to="/instructor/dashboard" className="btn-ghost btn-sm" style={{ marginBottom: 24, display: 'inline-flex' }}>← Back to dashboard</Link>
      <h1 style={{ fontSize: '2rem', marginBottom: 4 }}>Upload lessons</h1>
      <p style={{ color: 'var(--ink-muted)', marginBottom: 40 }}>{course?.title}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Form */}
        <div className="card">
          <div className="card-header"><h3>Add new lesson</h3></div>
          <div className="card-body">
            {message === 'success' && <div className="alert alert-success">Lesson added successfully!</div>}
            {message && message !== 'success' && <div className="alert alert-danger">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Lesson title *</label>
                <input className="form-control" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required placeholder="e.g. Introduction to React Hooks" />
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-control" rows={4} value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Lesson content or description…"
                  style={{ resize: 'vertical', minHeight: 100 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Video URL</label>
                <input className="form-control" value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/…" />
              </div>
              <div className="form-group" style={{ marginBottom: 28 }}>
                <label className="form-label">Duration (minutes)</label>
                <input className="form-control" type="number" min={0} value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} />
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Adding…' : '+ Add lesson'}
              </button>
            </form>
          </div>
        </div>

        {/* Lessons List */}
        <div className="card">
          <div className="card-header">
            <h3>Lessons ({course?.lessons?.length || 0})</h3>
          </div>
          {!course?.lessons?.length ? (
            <div className="empty-state" style={{ padding: 32 }}>
              <p style={{ fontSize: '0.875rem' }}>No lessons yet.</p>
            </div>
          ) : (
            <div>
              {course.lessons.map((lesson, i) => (
                <div key={lesson._id} style={{
                  padding: '14px 20px',
                  borderBottom: i < course.lessons.length - 1 ? '1px solid var(--paper-warm)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', minWidth: 20 }}>{i + 1}.</span>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>{lesson.title}</div>
                      {lesson.duration > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{lesson.duration} min</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadLesson;
