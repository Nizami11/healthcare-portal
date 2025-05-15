const Doctor = require('../models/Doctor');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get list of verified doctors
// @route   GET /api/doctors/list
// @access  Public
exports.getDoctorsList = asyncHandler(async (req, res, next) => {
  // Build query based on search parameters
  const query = { verificationStatus: 'verified' };
  
  // Filter by specialty if provided
  if (req.query.specialty) {
    query.specialty = req.query.specialty;
  }

  const doctors = await Doctor.find(query)
    .populate({
      path: 'user',
      select: 'name'
    })
    .select('user specialty education experience bio profilePicture averageRating')
    .sort({ averageRating: -1 });

  res.status(200).json({
    success: true,
    count: doctors.length,
    data: doctors
  });
});

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name'
    })
    .select('-verificationDocuments');

  if (!doctor) {
    return next(new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404));
  }

  // Only return verified doctors to public
  if (doctor.verificationStatus !== 'verified') {
    return next(new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});