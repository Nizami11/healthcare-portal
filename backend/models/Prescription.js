const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medications: [{
    medication: { type: String },
    dosage: { type: String },
    instructions: { type: String }
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
