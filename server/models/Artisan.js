const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String, // URL to profile image
    default: ''
  },
  craftType: {
    type: String,
    required: true,
    enum: ['pottery', 'textile', 'woodwork', 'metalwork', 'jewelry', 'painting', 'other']
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  bio: {
    type: String,
    maxlength: 500
  },
  story: {
    type: String, // AI-generated story about the artisan
    maxlength: 2000
  },
  experience: {
    type: Number, // Years of experience
    min: 0
  },
  specializations: [{
    type: String,
    trim: true
  }],
  socialMedia: {
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    website: { type: String, trim: true }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
artisanSchema.index({ craftType: 1, location: 1 });
artisanSchema.index({ name: 'text', bio: 'text', story: 'text' });

const Artisan = mongoose.exports = mongoose.model('Artisan', artisanSchema);
