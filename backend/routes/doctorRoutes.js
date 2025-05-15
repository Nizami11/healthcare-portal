const express = require('express');
const {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  updateAppointmentStatus,
  getDoctorSchedule,
  updateDoctorSchedule,
  getDoctorQuestions,
  answerQuestion,
  uploadVerificationDocuments,
  setAvailabilityForQuestions
} = require('../controllers/doctorController');
const { protect, authorize, isVerifiedDoctor } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/list', require('../controllers/publicController').getDoctorsList);
router.get('/:id', require('../controllers/publicController').getDoctorById);

// Protected routes
router.use(protect);
router.use(authorize('doctor'));

router.route('/profile')
  .post(createDoctorProfile)
  .get(getDoctorProfile)
  .put(updateDoctorProfile);

router.post('/verification-documents', uploadVerificationDocuments);

// Routes requiring verified doctor
router.use(isVerifiedDoctor);

router.route('/appointments')
  .get(getDoctorAppointments);

router.put('/appointments/:id/status', updateAppointmentStatus);

router.route('/schedule')
  .get(getDoctorSchedule)
  .post(updateDoctorSchedule);

router.route('/questions')
  .get(getDoctorQuestions);

router.put('/questions/:id/answer', answerQuestion);

router.put('/questions-availability', setAvailabilityForQuestions);

module.exports = router;