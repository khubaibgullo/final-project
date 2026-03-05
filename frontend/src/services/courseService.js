import api from './api';

export const getCourses = (params) => api.get('/courses', { params });
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const getAllCoursesAdmin = () => api.get('/courses/admin/all');
export const createCourse = (data) => api.post('/courses', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const addLesson = (courseId, data) => api.post(`/courses/${courseId}/lessons`, data);
