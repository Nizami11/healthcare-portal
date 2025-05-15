const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    phoneNumber: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        notes: String,
      },
    ],
    allergies: [String],
    currentMedications: [
      {
        name: String,
        dosage: String,
        frequency: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate with appointments
PatientSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'patient',
  justOne: false,
});

// Virtual populate with questions
PatientSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'patient',
  justOne: false,
});

module.exports = mongoose.model('Patient', PatientSchema);