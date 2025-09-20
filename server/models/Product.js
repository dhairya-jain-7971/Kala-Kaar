const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artisan',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    maxlength: 500
  },
  images: [{
    url: { type: String, required: true },
    alt: { type: String },
    isPrimary: { type: Boolean, default: false }
  }],
  category: {
    type: String,
    required: true,
    enum: ['pottery', 'textile', 'woodwork', 'metalwork', 'jewelry', 'painting', 'sculpture', 'other']
  },
  subcategory: {
    type: String,
    trim: true
  },
  price: {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    isNegotiable: { type: Boolean, default: false }
  },
  dimensions: {
    length: { type: Number }, // in cm
    width: { type: Number },  // in cm
    height: { type: Number }, // in cm
    weight: { type: Number }  // in grams
  },
  materials: [{
    type: String,
    trim: true
  }],
  techniques: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  inventory: {
    quantity: { type: Number, default: 1, min: 0 },
    sku: { type: String, trim: true },
    isAvailable: { type: Boolean, default: true }
  },
  culturalStory: {
    type: String,
    maxlength: 1000
  },
  careInstructions: {
    type: String,
    maxlength: 500
  },
  shippingInfo: {
    weight: { type: Number }, // in grams
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number }
    },
    shipsFrom: {
      city: { type: String },
      state: { type: String },
      country: { type: String, default: 'India' }
    }
  },
  seo: {
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
    keywords: [{ type: String, trim: true }]
  },
  socialMedia: {
    instagramPost: { type: String },
    facebookPost: { type: String },
    marketingCopy: { type: String }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'sold', 'inactive'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  orders: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
productSchema.index({ artisan: 1, status: 1 });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ 'price.amount': 1 });
productSchema.index({ featured: 1, createdAt: -1 });
productSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
  'artisan.name': 'text'
});

const Product = mongoose.exports = mongoose.model('Product', productSchema);
