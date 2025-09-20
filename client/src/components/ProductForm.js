import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    price: '',
    materials: [],
    techniques: [],
    tags: [],
    inventory: {
      quantity: 1,
      sku: ''
    },
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    culturalStory: '',
    careInstructions: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'pottery', 'textile', 'woodwork', 'metalwork',
    'jewelry', 'painting', 'sculpture', 'other'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('artisanToken');
      const response = await axios.post('/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        category: '',
        subcategory: '',
        price: '',
        materials: [],
        techniques: [],
        tags: [],
        inventory: { quantity: 1, sku: '' },
        dimensions: { length: '', width: '', height: '' },
        culturalStory: '',
        careInstructions: ''
      });

      if (onProductAdded) {
        onProductAdded(response.data.product);
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Short Description"
                value={formData.shortDescription}
                onChange={(e) => handleChange('shortDescription', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subcategory"
                value={formData.subcategory}
                onChange={(e) => handleChange('subcategory', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price (₹)"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={formData.inventory.quantity}
                onChange={(e) => handleNestedChange('inventory', 'quantity', e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Materials (comma-separated)"
                placeholder="e.g., clay, natural dyes, cotton"
                onChange={(e) => handleArrayChange('materials', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Techniques (comma-separated)"
                placeholder="e.g., hand-painted, block-printed, handwoven"
                onChange={(e) => handleArrayChange('techniques', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                placeholder="e.g., handmade, traditional, eco-friendly"
                onChange={(e) => handleArrayChange('tags', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Length (cm)"
                value={formData.dimensions.length}
                onChange={(e) => handleNestedChange('dimensions', 'length', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Width (cm)"
                value={formData.dimensions.width}
                onChange={(e) => handleNestedChange('dimensions', 'width', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Height (cm)"
                value={formData.dimensions.height}
                onChange={(e) => handleNestedChange('dimensions', 'height', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Cultural Story"
                placeholder="Share the traditional significance and cultural context of this craft..."
                value={formData.culturalStory}
                onChange={(e) => handleChange('culturalStory', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Care Instructions"
                placeholder="How should customers care for this product?"
                value={formData.careInstructions}
                onChange={(e) => handleChange('careInstructions', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<AddIcon />}
              >
                {loading ? 'Creating Product...' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Product created successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
