import api from './api';

// Users
export const getAllUsers = () => api.get('/users');
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getAnalytics = () => api.get('/users/analytics');
export const updateProfile = (data) => api.put('/users/profile', data);

// Enrollments
export const enrollInCourse = (courseId) => api.post('/enrollments', { courseId });
export const getMyCourses = () => api.get('/enrollments/my-courses');
export const updateProgress = (enrollmentId, data) => api.put(`/enrollments/${enrollmentId}/progress`, data);
