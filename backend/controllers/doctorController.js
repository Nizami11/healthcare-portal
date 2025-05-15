const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Question = require('../models/Question');
const Schedule = require('../models/Schedule');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create doctor profile
// @route   POST /api/doctors/profile
// @access  Private/Doctor
exports.createDoctorProfile = asyncHandler(async (req, res, next) => {
  // Check if profile already exists
  const existingProfile = await Doctor.findOne({ user: req.user.id });
  if (existingProfile) {
    return next(new ErrorResponse('Doctor profile already exists', 400));
  }

  // Create profile
  req.body.user = req.user.id;
  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    success: true,
    data: doctor
  });
});

// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private/Doctor
exports.getDoctorProfile = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findOne({ user: req.user.id });

  if (!doctor) {
    return next(new ErrorResponse('Doctor profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private/Doctor
exports.updateDoctorProfile = asyncHandler(async (req, res, next) => {
  // Don't allow updating verification status
  if (req.body.verificationStatus) {
    delete req.body.verificationStatus;
  }

  const doctor = await Doctor.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!doctor) {
    return next(new ErrorResponse('Doctor profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Upload verification documents
// @route   POST /api/doctors/verification-documents
// @access  Private/Doctor
exports.uploadVerificationDocuments = asyncHandler(async (req, res, next) => {
  // In a real implementation, this would handle file uploads
  // For this example, we'll just update the document URLs in the database
  
  const doctor = await Doctor.findOne({ user: req.user.id });

  if (!doctor) {
    return next(new ErrorResponse('Doctor profile not found', 404));
  }

  // Update documents array
  doctor.verificationDocuments = req.body.documents;
  doctor.verificationStatus = 'pending';
  
  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Get doctor appointments
// @route   GET /api/doctors/appointments
// @access  Private/VerifiedDoctor
exports.getDoctorAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ doctor: req.doctor._id })
    .populate({
      path: 'patient',
      select: 'user',
      populate: {
        path: 'user',
        select: 'name email'
      }
    })
    .sort({ date: 1, time: 1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Update appointment status
// @route   PUT /api/doctors/appointments/:id/status
// @access  Private/VerifiedDoctor
exports.updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse('Appointment not found', 404));
  }

  // Verify appointment belongs to doctor
  if (appointment.doctor.toString() !== req.doctor._id.toString()) {
    return next(new ErrorResponse('Not authorized to update this appointment', 403));
  }

  // Update status
  appointment.status = req.body.status;
  
  // Add notes if provided
  if (req.body.notes) {
    appointment.notes = req.body.notes;
  }
  
  // Handle follow-up information if provided
  if (req.body.followUp) {
    appointment.followUp = req.body.followUp;
  }

  await appointment.save();

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Get doctor schedule
// @route   GET /api/doctors/schedule
// @access  Private/VerifiedDoctor
exports.getDoctorSchedule = asyncHandler(async (req, res, next) => {
  // Get date range from query parameters or default to current week
  const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
  startDate.setHours(0, 0, 0, 0);
  
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (req.query.days ? parseInt(req.query.days) : 7));

  const schedule = await Schedule.find({
    doctor: req.doctor._id,
    date: {
      $gte: startDate,
      $lt: endDate
    }
  }).sort({ date: 1 });

  res.status(200).json({
    success: true,
    count: schedule.length,
    data: schedule
  });
});

// @desc    Update doctor schedule
// @route   POST /api/doctors/schedule
// @access  Private/VerifiedDoctor
exports.updateDoctorSchedule = asyncHandler(async (req, res, next) => {
  const { date, slots } = req.body;
  
  // Validate date
  if (!date) {
    return next(new ErrorResponse('Date is required', 400));
  }
  
  const scheduleDate = new Date(date);
  scheduleDate.setHours(0, 0, 0, 0);
  
  // Get day of week
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][scheduleDate.getDay()];

  // Find existing schedule for this date
  let schedule = await Schedule.findOne({
    doctor: req.doctor._id,
    date: {
      $gte: scheduleDate,
      $lt: new Date(new Date(scheduleDate).setDate(scheduleDate.getDate() + 1))
    }
  });

  if (schedule) {
    // Update existing schedule
    schedule.slots = slots;
    await schedule.save();
  } else {
    // Create new schedule
    schedule = await Schedule.create({
      doctor: req.doctor._id,
      date: scheduleDate,
      dayOfWeek,
      slots
    });
  }

  res.status(200).json({
    success: true,
    data: schedule
  });
});

// @desc    Get doctor questions
// @route   GET /api/doctors/questions
// @access  Private/VerifiedDoctor
exports.getDoctorQuestions = asyncHandler(async (req, res, next) => {
  // Filter by status if provided
  const filter = { doctor: req.doctor._id };
  
  if (req.query.status) {
    filter.status = req.query.status;
  }
  
  const questions = await Question.find(filter)
    .populate({
      path: 'patient',
      select: 'user',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: questions.length,
    data: questions
  });
});

// @desc    Answer patient question
// @route   PUT /api/doctors/questions/:id/answer
// @access  Private/VerifiedDoctor
exports.answerQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(new ErrorResponse('Question not found', 404));
  }

  // Verify question belongs to doctor
  if (question.doctor.toString() !== req.doctor._id.toString()) {
    return next(new ErrorResponse('Not authorized to answer this question', 403));
  }

  // Update question
  question.answer = req.body.answer;
  question.status = 'answered';
  await question.save();

  res.status(200).json({
    success: true,
    data: question
  });
});

// @desc    Set availability for questions
// @route   PUT /api/doctors/questions-availability
// @access  Private/VerifiedDoctor
exports.setAvailabilityForQuestions = asyncHandler(async (req, res, next) => {
  const doctor = req.doctor;

  doctor.availableForQuestions = req.body.availableForQuestions;
  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor
  });
});
