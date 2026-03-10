import { useEffect, useState } from 'react';
import { getCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';

const CATEGORIES = ['All', 'Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Mobile Development'];

const CourseListing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const { data } = await getCourses(params);
      setCourses(data.courses);
      setTotalPages(data.pages);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, [page, category]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); fetchCourses(); };

  return (
    <>
      <div style={{ background: 'var(--paper-warm)', borderBottom: '1px solid var(--paper-mid)', padding: '48px 24px 0' }}>
        <div className="container">
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', marginBottom: 8 }}>All courses</p>
          <h1 style={{ fontSize: '2.4rem', marginBottom: 32 }}>Explore courses</h1>

          <form onSubmit={handleSearch} style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 12, maxWidth: 540 }}>
              <div className="search-bar" style={{ flex: 1 }}>
                <input placeholder="Search by title or topic…" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button type="submit">Search</button>
              </div>
            </div>
          </form>

          <div className="pills" style={{ paddingBottom: 20 }}>
            {CATEGORIES.map((c) => (
              <button key={c} className={`pill ${category === c ? 'active' : ''}`}
                onClick={() => { setCategory(c); setPage(1); }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {loading ? (
          <div className="spinner-page"><div className="spinner" /></div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◎</div>
            <p>No courses found for your search.</p>
            <button className="btn-secondary" onClick={() => { setSearch(''); setCategory('All'); setPage(1); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', marginBottom: 24 }}>
              {courses.length} courses {category !== 'All' ? `in ${category}` : ''}
            </p>
            <div className="grid grid-3">
              {courses.map((course) => <CourseCard key={course._id} course={course} />)}
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseListing;
