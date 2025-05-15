const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Question = require('../models/Question');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  // Count users by role
  const totalUsers = await User.countDocuments();
  const totalPatients = await User.countDocuments({ role: 'patient' });
  const totalDoctors = await User.countDocuments({ role: 'doctor' });
  
  // Count pending doctor verifications
  const pendingVerifications = await Doctor.countDocuments({ verificationStatus: 'pending' });
  
  // Count appointments this week
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);
  
  const appointmentsThisWeek = await Appointment.countDocuments({
    date: {
      $gte: today,
      $lt: endOfWeek
    }
  });
  
  // Count total appointments
  const totalAppointments = await Appointment.countDocuments();

  // Get recent users
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email role createdAt');

  res.status(200).json({
    success: true,
    data: {
      users: {
        total: totalUsers,
        patients: totalPatients,
        doctors: totalDoctors
      },
      pendingVerifications,
      appointments: {
        thisWeek: appointmentsThisWeek,
        total: totalAppointments
      },
      recentUsers
    }
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  let userData = { user };

  // Add role-specific data
  if (user.role === 'doctor') {
    const doctor = await Doctor.findOne({ user: user._id });
    userData.doctor = doctor;
  } else if (user.role === 'patient') {
    const patient = await Patient.findOne({ user: user._id });
    userData.patient = patient;
  }

  res.status(200).json({
    success: true,
    data: userData
  });
});

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  // Delete role-specific data
  if (user.role === 'doctor') {
    await Doctor.findOneAndDelete({ user: user._id });
    
    // Delete related appointments and questions
    await Appointment.deleteMany({ doctor: user._id });
    await Question.deleteMany({ doctor: user._id });
  } else if (user.role === 'patient') {
    await Patient.findOneAndDelete({ user: user._id });
    
    // Delete related appointments and questions
    await Appointment.deleteMany({ patient: user._id });
    await Question.deleteMany({ patient: user._id });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get pending doctor verifications
// @route   GET /api/admin/doctors/pending
// @access  Private/Admin
exports.getPendingDoctors = asyncHandler(async (req, res, next) => {
  const pendingDoctors = await Doctor.find({ verificationStatus: 'pending' })
    .populate({
      path: 'user',
      select: 'name email createdAt'
    })
    .sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    count: pendingDoctors.length,
    data: pendingDoctors
  });
});

// @desc    Get doctor verification details
// @route   GET /api/admin/doctors/:id/verification
// @access  Private/Admin
exports.getDoctorVerificationDetails = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id).populate({
    path: 'user',
    select: 'name email createdAt'
  });

  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Approve doctor verification
// @route   PUT /api/admin/doctors/:id/approve
// @access  Private/Admin
exports.approveDoctorVerification = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404));
  }

  doctor.verificationStatus = 'verified';
  doctor.rejectionReason = undefined;
  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Reject doctor verification
// @route   PUT /api/admin/doctors/:id/reject
// @access  Private/Admin
exports.rejectDoctorVerification = asyncHandler(async (req, res, next) => {
  if (!req.body.reason) {
    return next(new ErrorResponse('Please provide a reason for rejection', 400));
  }

  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404));
  }

  doctor.verificationStatus = 'rejected';
  doctor.rejectionReason = req.body.reason;
  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor
  });
});
