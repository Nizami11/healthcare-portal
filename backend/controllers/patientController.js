const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Question = require('../models/Question');
const Schedule = require('../models/Schedule');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create patient profile
// @route   POST /api/patients/profile
// @access  Private/Patient
exports.createPatientProfile = asyncHandler(async (req, res, next) => {
  // Check if profile already exists
  const existingProfile = await Patient.findOne({ user: req.user.id });
  if (existingProfile) {
    return next(new ErrorResponse('Patient profile already exists', 400));
  }

  // Create profile
  req.body.user = req.user.id;
  const patient = await Patient.create(req.body);

  res.status(201).json({
    success: true,
    data: patient
  });
});

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private/Patient
exports.getPatientProfile = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user.id });

  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Update patient profile
// @route   PUT /api/patients/profile
// @access  Private/Patient
exports.updatePatientProfile = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: patient
  });
});

// @desc    Get patient appointments
// @route   GET /api/patients/appointments
// @access  Private/Patient
exports.getPatientAppointments = asyncHandler(async (req, res, next) => {
  // Get patient ID
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  // Get appointments
  const appointments = await Appointment.find({ patient: patient._id })
    .populate({
      path: 'doctor',
      select: 'user specialty',
      populate: {
        path: 'user',
        select: 'name'
      }
    })
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Book appointment
// @route   POST /api/patients/appointments
// @access  Private/Patient
exports.bookAppointment = asyncHandler(async (req, res, next) => {
  // Get patient ID
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  // Check if doctor exists and is verified
  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) {
    return next(new ErrorResponse('Doctor not found', 404));
  }
  if (doctor.verificationStatus !== 'verified') {
    return next(new ErrorResponse('Cannot book with unverified doctor', 400));
  }

  // Check if the time slot is available
  const appointmentDate = new Date(req.body.date);
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][appointmentDate.getDay()];
  
  // Format date to YYYY-MM-DD for comparison
  const formattedDate = appointmentDate.toISOString().split('T')[0];
  
  // Find doctor's schedule for the day
  const schedule = await Schedule.findOne({
    doctor: doctor._id,
    date: {
      $gte: new Date(formattedDate),
      $lt: new Date(new Date(formattedDate).setDate(new Date(formattedDate).getDate() + 1))
    }
  });
  
  if (!schedule) {
    return next(new ErrorResponse('Doctor is not available on this date', 400));
  }

  // Check if the time slot exists and is available
  const timeSlot = schedule.slots.find(slot => slot.time === req.body.time);
  if (!timeSlot || !timeSlot.available) {
    return next(new ErrorResponse('Selected time slot is not available', 400));
  }

  // Create appointment
  const appointment = await Appointment.create({
    doctor: doctor._id,
    patient: patient._id,
    date: appointmentDate,
    time: req.body.time,
    type: req.body.type,
    notes: req.body.notes
  });

  // Mark time slot as unavailable
  timeSlot.available = false;
  await schedule.save();

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Cancel appointment
// @route   PUT /api/patients/appointments/:id/cancel
// @access  Private/Patient
exports.cancelAppointment = asyncHandler(async (req, res, next) => {
  // Get patient ID
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  // Get appointment
  const appointment = await Appointment.findById(req.params.id);
  
  if (!appointment) {
    return next(new ErrorResponse('Appointment not found', 404));
  }

  // Verify appointment belongs to patient
  if (appointment.patient.toString() !== patient._id.toString()) {
    return next(new ErrorResponse('Not authorized to cancel this appointment', 403));
  }

  // Check if appointment can be cancelled (not in the past or already cancelled)
  const appointmentDate = new Date(appointment.date);
  if (appointmentDate < new Date()) {
    return next(new ErrorResponse('Cannot cancel past appointments', 400));
  }
  
  if (appointment.status === 'cancelled') {
    return next(new ErrorResponse('Appointment is already cancelled', 400));
  }

  // Update appointment status
  appointment.status = 'cancelled';
  appointment.cancellationReason = req.body.reason;
  await appointment.save();

  // Make the time slot available again in the schedule
  const formattedDate = appointmentDate.toISOString().split('T')[0];
  const schedule = await Schedule.findOne({
    doctor: appointment.doctor,
    date: {
      $gte: new Date(formattedDate),
      $lt: new Date(new Date(formattedDate).setDate(new Date(formattedDate).getDate() + 1))
    }
  });
  
  if (schedule) {
    const timeSlot = schedule.slots.find(slot => slot.time === appointment.time);
    if (timeSlot) {
      timeSlot.available = true;
      await schedule.save();
    }
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Ask question to doctor
// @route   POST /api/patients/questions
// @access  Private/Patient
exports.askQuestion = asyncHandler(async (req, res, next) => {
  // Get patient ID
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  // Check if doctor exists, is verified, and is available for questions
  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) {
    return next(new ErrorResponse('Doctor not found', 404));
  }
  
  if (doctor.verificationStatus !== 'verified') {
    return next(new ErrorResponse('Cannot ask questions to unverified doctor', 400));
  }
  
  if (!doctor.availableForQuestions) {
    return next(new ErrorResponse('Doctor is not currently available for questions', 400));
  }

  // Count doctor's pending questions for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const pendingQuestionsCount = await Question.countDocuments({
    doctor: doctor._id,
    status: 'pending',
    createdAt: {
      $gte: today,
      $lt: tomorrow
    }
  });

  // Check if doctor's question limit (10 per day) is reached
  if (pendingQuestionsCount >= 10) {
    return next(new ErrorResponse('Doctor has reached the daily question limit', 400));
  }

  // Create question
  const question = await Question.create({
    doctor: doctor._id,
    patient: patient._id,
    question: req.body.question,
    isPrivate: req.body.isPrivate || false
  });

  res.status(201).json({
    success: true,
    data: question
  });
});

// @desc    Get patient questions
// @route   GET /api/patients/questions
// @access  Private/Patient
exports.getPatientQuestions = asyncHandler(async (req, res, next) => {
  // Get patient ID
  const patient = await Patient.findOne({ user: req.user.id });
  
  if (!patient) {
    return next(new ErrorResponse('Patient profile not found', 404));
  }

  // Get questions
  const questions = await Question.find({ patient: patient._id })
    .populate({
      path: 'doctor',
      select: 'user specialty',
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