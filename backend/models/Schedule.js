const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const ScheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    slots: [TimeSlotSchema],
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique schedules per doctor per date
ScheduleSchema.index({ doctor: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);