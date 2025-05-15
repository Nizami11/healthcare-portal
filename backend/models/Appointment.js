const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add an appointment date'],
    },
    time: {
      type: String,
      required: [true, 'Please add an appointment time'],
    },
    type: {
      type: String,
      enum: ['regular checkup', 'consultation', 'follow-up', 'emergency'],
      default: 'consultation',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
    cancellationReason: {
      type: String,
    },
    followUp: {
      required: Boolean,
      date: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);