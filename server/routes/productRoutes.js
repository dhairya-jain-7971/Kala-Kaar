const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Artisan = require('../models/Artisan');

const router = express.Router();

// Middleware to verify artisan token
const authenticateArtisan = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.artisanId = decoded.artisanId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Create new product
router.post('/', authenticateArtisan, async (req, res) => {
  try {
    const productData = {
      ...req.body,
      artisan: req.artisanId
    };

    const product = new Product(productData);
    await product.save();

    // Update artisan's product count
    await Artisan.findByIdAndUpdate(req.artisanId, {
      $inc: { productCount: 1 }
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error during product creation' });
  }
});

// Get artisan's products
router.get('/my-products', authenticateArtisan, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = { artisan: req.artisanId };
    if (status) {
      query.status = status;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get my products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/:id', authenticateArtisan, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      artisan: req.artisanId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error during product update' });
  }
});

// Delete product
router.delete('/:id', authenticateArtisan, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      artisan: req.artisanId
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update artisan's product count
    await Artisan.findByIdAndUpdate(req.artisanId, {
      $inc: { productCount: -1 }
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error during product deletion' });
  }
});

// Get all products (for marketplace)
router.get('/', async (req, res) => {
  try {
    const {
      category,
      artisan,
      minPrice,
      maxPrice,
      location,
      page = 1,
      limit = 12,
      search,
      sort = 'createdAt'
    } = req.query;

    let query = { status: 'active' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (artisan) {
      query.artisan = artisan;
    }

    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = parseInt(minPrice);
      if (maxPrice) query['price.amount'].$lte = parseInt(maxPrice);
    }

    if (location) {
      query['artisan.location.city'] = new RegExp(location, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions = {};
    switch (sort) {
      case 'price-low':
        sortOptions['price.amount'] = 1;
        break;
      case 'price-high':
        sortOptions['price.amount'] = -1;
        break;
      case 'popular':
        sortOptions.views = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    const products = await Product.find(query)
      .populate('artisan', 'name craftType location profileImage rating')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('artisan', 'name craftType location bio profileImage rating totalReviews experience socialMedia');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment view count
    await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({ product });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like/unlike product
router.post('/:id/like', authenticateArtisan, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const isLiked = product.likes.includes(req.artisanId);
    if (isLiked) {
      product.likes = product.likes.filter(id => id.toString() !== req.artisanId);
      await product.save();
      res.json({ message: 'Product unliked', likes: product.likes.length });
    } else {
      product.likes.push(req.artisanId);
      await product.save();
      res.json({ message: 'Product liked', likes: product.likes.length });
    }
  } catch (error) {
    console.error('Like product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
