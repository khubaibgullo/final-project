import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../services/courseService";
import { enrollInCourse } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const CourseDetail = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [enrolling, setEnrolling] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getCourseById(id)
			.then(({ data }) => setCourse(data.course))
			.finally(() => setLoading(false));
	}, [id]);

	const handleEnroll = async () => {
		if (!user) return navigate("/login");
		setEnrolling(true);
		try {
			await enrollInCourse(id);
			setMessage("success");
		} catch (err) {
			setMessage(err.response?.data?.message || "Error enrolling.");
		}
		setEnrolling(false);
	};

	if (loading)
		return (
			<div className="spinner-page" style={{ minHeight: "60vh" }}>
				<div className="spinner" />
			</div>
		);
	if (!course)
		return (
			<div className="container" style={{ padding: "80px 24px" }}>
				<div className="alert alert-danger">Course not found.</div>
			</div>
		);

	return (
		<div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
			{/* Hero */}
			<div style={{ background: "#0F172A", padding: "56px 24px 48px" }}>
				<div className="container">
					<div style={{ maxWidth: 680 }}>
						<span
							className="badge"
							style={{
								background: "rgba(255,255,255,0.15)",
								color: "rgba(255,255,255,0.9)",
								marginBottom: 16,
							}}
						>
							{course.category}
						</span>
						<h1
							style={{
								fontSize: "clamp(1.6rem,4vw,2.5rem)",
								color: "white",
								marginBottom: 16,
								fontWeight: 800,
								letterSpacing: "-0.03em",
							}}
						>
							{course.title}
						</h1>
						<p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
							by {course.instructor?.name} · {course.enrollmentCount || 0}{" "}
							students enrolled
						</p>
					</div>
				</div>
			</div>

			<div className="container" style={{ padding: "48px 24px" }}>
				<div className="course-detail-grid">
					{/* Content */}
					<div>
						<div className="card" style={{ marginBottom: 24 }}>
							<div className="card-header">
								<h3>About this course</h3>
							</div>
							<div className="card-body">
								<p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
									{course.description}
								</p>
							</div>
						</div>

						<div className="card">
							<div className="card-header">
								<h3>Course lessons ({course.lessons?.length || 0})</h3>
							</div>
							{!course.lessons || course.lessons.length === 0 ? (
								<div className="card-body">
									<p
										style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}
									>
										No lessons added yet.
									</p>
								</div>
							) : (
								<div>
									{course.lessons.map((lesson, i) => (
										<div
											key={lesson._id}
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												padding: "14px 24px",
												borderBottom:
													i < course.lessons.length - 1
														? "1px solid var(--border-light)"
														: "none",
											}}
										>
											<div
												style={{
													display: "flex",
													gap: 12,
													alignItems: "center",
												}}
											>
												<span
													style={{
														width: 26,
														height: 26,
														background: "var(--accent-light)",
														borderRadius: "50%",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: "0.72rem",
														color: "var(--accent-text)",
														fontWeight: 700,
														flexShrink: 0,
													}}
												>
													{i + 1}
												</span>
												<span
													style={{
														fontSize: "0.875rem",
														color: "var(--text-secondary)",
														fontWeight: 500,
													}}
												>
													{lesson.title}
												</span>
											</div>
											{lesson.duration > 0 && (
												<span
													style={{
														fontSize: "0.75rem",
														color: "var(--text-muted)",
														fontWeight: 500,
													}}
												>
													{lesson.duration} min
												</span>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Enroll Sidebar */}
					<div className="enroll-card">
						<div style={{ overflow: "hidden", aspectRatio: "16/9" }}>
							<img
								src={
									course.thumbnail ||
									`https://picsum.photos/seed/${course._id}/600/400`
								}
								alt={course.title}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
						</div>
						<div style={{ padding: "24px" }}>
							<div
								style={{
									fontSize: "2rem",
									fontWeight: 800,
									letterSpacing: "-0.04em",
									color: "var(--text-primary)",
									marginBottom: 4,
								}}
							>
								{course.price === 0 ? (
									<span style={{ color: "var(--success)" }}>Free</span>
								) : (
									`$${course.price}`
								)}
							</div>
							<p
								style={{
									fontSize: "0.78rem",
									color: "var(--text-muted)",
									marginBottom: 20,
									fontWeight: 500,
								}}
							>
								One-time payment · Lifetime access
							</p>

							{message === "success" && (
								<div
									className="alert alert-success"
									style={{ fontSize: "0.8rem" }}
								>
									Enrolled! Go to your{" "}
									<a
										href="/student/dashboard"
										style={{ color: "inherit", fontWeight: 700 }}
									>
										dashboard
									</a>{" "}
									to start.
								</div>
							)}
							{message && message !== "success" && (
								<div
									className="alert alert-danger"
									style={{ fontSize: "0.8rem" }}
								>
									{message}
								</div>
							)}

							{user?.role === "student" && (
								<button
									className="btn-primary btn-full btn-lg"
									onClick={handleEnroll}
									disabled={enrolling}
								>
									{enrolling ? "Enrolling…" : "Enroll now →"}
								</button>
							)}
							{!user && (
								<button
									className="btn-primary btn-full btn-lg"
									onClick={() => navigate("/login")}
								>
									Sign in to enroll
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetail;
