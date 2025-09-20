const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Artisan = require('../models/Artisan');
const Product = require('../models/Product');

const router = express.Router();

// Register new artisan
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      craftType,
      location,
      bio,
      experience,
      specializations
    } = req.body;

    // Check if artisan already exists
    const existingArtisan = await Artisan.findOne({ email });
    if (existingArtisan) {
      return res.status(400).json({ error: 'Artisan already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new artisan
    const artisan = new Artisan({
      name,
      email,
      password: hashedPassword,
      phone,
      craftType,
      location,
      bio,
      experience,
      specializations: specializations ? specializations.split(',').map(s => s.trim()) : []
    });

    await artisan.save();

    // Generate JWT token
    const token = jwt.sign(
      { artisanId: artisan._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Artisan registered successfully',
      token,
      artisan: {
        id: artisan._id,
        name: artisan.name,
        email: artisan.email,
        craftType: artisan.craftType,
        location: artisan.location
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login artisan
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find artisan
    const artisan = await Artisan.findOne({ email });
    if (!artisan) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, artisan.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { artisanId: artisan._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      artisan: {
        id: artisan._id,
        name: artisan.name,
        email: artisan.email,
        craftType: artisan.craftType,
        location: artisan.location,
        isVerified: artisan.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get artisan profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const artisan = await Artisan.findById(decoded.artisanId).select('-password');

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }

    res.json({ artisan });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update artisan profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updates = req.body;

    // Remove password from updates if present
    delete updates.password;
    delete updates.email; // Email shouldn't be updated through this endpoint

    const artisan = await Artisan.findByIdAndUpdate(
      decoded.artisanId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      artisan
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error during profile update' });
  }
});

// Get all artisans (for marketplace)
router.get('/', async (req, res) => {
  try {
    const {
      craftType,
      location,
      page = 1,
      limit = 12,
      search
    } = req.query;

    let query = {};

    if (craftType && craftType !== 'all') {
      query.craftType = craftType;
    }

    if (location) {
      query['location.city'] = new RegExp(location, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    const artisans = await Artisan.find(query)
      .select('name craftType location bio profileImage rating totalReviews experience')
      .populate('products', 'title images price')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Artisan.countDocuments(query);

    res.json({
      artisans,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get artisans error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get artisan by ID (public profile)
router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id)
      .select('-password -email -phone')
      .populate({
        path: 'products',
        match: { status: 'active' },
        select: 'title description images price category rating views',
        options: { limit: 8 }
      });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }

    res.json({ artisan });
  } catch (error) {
    console.error('Get artisan by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
