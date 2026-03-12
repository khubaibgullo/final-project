import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-card__img-wrapper">
      <img
        className="course-card__img"
        src={course.thumbnail || `https://picsum.photos/seed/${course._id}/600/360`}
        alt={course.title}
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${encodeURIComponent(course.title)}/600/360`; }}
      />
    </div>
    <div className="course-card__body">
      <div><span className="badge badge-primary">{course.category}</span></div>
      <div className="course-card__title">{course.title}</div>
      <div className="course-card__desc">{course.description?.substring(0, 110)}…</div>
      <div className="course-card__meta">
        <span className="course-card__instructor">{course.instructor?.name}</span>
        <span className={`course-card__price ${course.price === 0 ? 'free' : ''}`}>
          {course.price === 0 ? 'Free' : `$${course.price}`}
        </span>
      </div>
      <div className="course-card__cta">
        <Link to={`/courses/${course._id}`} className="btn-secondary btn-sm btn-full">View course →</Link>
      </div>
    </div>
  </div>
);

export default CourseCard;
