const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPendingDoctors,
  getDoctorVerificationDetails,
  approveDoctorVerification,
  rejectDoctorVerification,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.get('/doctors/pending', getPendingDoctors);
router.get('/doctors/:id/verification', getDoctorVerificationDetails);
router.put('/doctors/:id/approve', approveDoctorVerification);
router.put('/doctors/:id/reject', rejectDoctorVerification);

module.exports = router;