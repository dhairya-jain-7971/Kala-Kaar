import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [craftType, setCraftType] = useState('');
  const [location, setLocation] = useState('');

  // Sample artisan products data
  const products = [
    {
      id: 1,
      name: 'Terracotta Pot Set',
      artisan: 'Rajesh Kumar',
      location: 'Jaipur, Rajasthan',
      price: '₹2,500',
      image: '/placeholder-pot.jpg',
      craftType: 'Pottery',
      description: 'Handcrafted terracotta pots with traditional Rajasthan patterns',
    },
    {
      id: 2,
      name: 'Silk Saree',
      artisan: 'Priya Sharma',
      location: 'Varanasi, Uttar Pradesh',
      price: '₹8,000',
      image: '/placeholder-saree.jpg',
      craftType: 'Textile',
      description: 'Pure silk saree with intricate Banarasi weaving',
    },
    {
      id: 3,
      name: 'Wooden Carving',
      artisan: 'Manoj Patel',
      location: 'Saharanpur, Uttar Pradesh',
      price: '₹4,200',
      image: '/placeholder-carving.jpg',
      craftType: 'Woodwork',
      description: 'Hand-carved wooden panel with traditional motifs',
    },
  ];

  const craftTypes = ['All', 'Pottery', 'Textile', 'Woodwork', 'Metalwork', 'Jewelry'];

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Artisan Marketplace
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Discover authentic handmade crafts from skilled Indian artisans
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search for crafts, artisans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Craft Type</InputLabel>
                <Select
                  value={craftType}
                  label="Craft Type"
                  onChange={(e) => setCraftType(e.target.value)}
                >
                  {craftTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FilterListIcon />}
                sx={{ height: '56px' }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  by {product.artisan}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip label={product.craftType} size="small" />
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  📍 {product.location}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" fullWidth>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Artisans Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Featured Artisans
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Master Craftsmen
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover artisans who have been preserving traditional crafts for generations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cultural Heritage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn about the rich cultural stories behind each craft and artisan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Marketplace;
