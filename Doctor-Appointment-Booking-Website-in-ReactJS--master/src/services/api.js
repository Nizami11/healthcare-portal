import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  login: (userType, credentials) => axios.post(`${API_URL}/${userType}/login`, credentials),
  register: (userType, userData) => axios.post(`${API_URL}/${userType}/register`, userData),
  
  // Doctor endpoints
  updateAvailability: (doctorId, slots) => axios.post(`${API_URL}/doctors/${doctorId}/availability`, slots),
  verifyDoctor: (doctorId, documents) => axios.post(`${API_URL}/doctors/${doctorId}/verify`, documents),
  
  // Appointment endpoints
  bookAppointment: (data) => axios.post(`${API_URL}/appointments`, data),
  getAvailableSlots: (doctorId) => axios.get(`${API_URL}/doctors/${doctorId}/slots`),
  
  // Review endpoints
  addReview: (doctorId, review) => axios.post(`${API_URL}/doctors/${doctorId}/reviews`, review),
  getDoctorReviews: (doctorId) => axios.get(`${API_URL}/doctors/${doctorId}/reviews`),
};
