const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialty: {
      type: String,
      required: [true, 'Please add a specialty'],
    },
    education: {
      type: String,
      required: [true, 'Please add education details'],
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience'],
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    verificationDocuments: [
      {
        type: String,
      },
    ],
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
    },
    availableForQuestions: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        rating: Number,
        comment: String,
        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate average rating
DoctorSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
    return this.averageRating;
  }
  
  const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
  this.averageRating = sum / this.ratings.length;
  return this.averageRating;
};

// Virtual populate with appointments
DoctorSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'doctor',
  justOne: false,
});

// Virtual populate with questions
DoctorSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'doctor',
  justOne: false,
});

module.exports = mongoose.model('Doctor', DoctorSchema);