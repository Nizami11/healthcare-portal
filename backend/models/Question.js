const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    question: {
      type: String,
      required: [true, 'Please add your question'],
    },
    answer: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'answered'],
      default: 'pending',
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', QuestionSchema);