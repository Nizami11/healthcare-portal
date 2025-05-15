const express = require('express');
const {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  bookAppointment,
  cancelAppointment,
  askQuestion,
  getPatientQuestions
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);
router.use(authorize('patient'));

router.route('/profile')
  .post(createPatientProfile)
  .get(getPatientProfile)
  .put(updatePatientProfile);

router.route('/appointments')
  .get(getPatientAppointments)
  .post(bookAppointment);

router.put('/appointments/:id/cancel', cancelAppointment);

router.route('/questions')
  .get(getPatientQuestions)
  .post(askQuestion);

module.exports = router;
