const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
