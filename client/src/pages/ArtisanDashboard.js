import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import ProductForm from '../components/ProductForm';
import AIContentGenerator from '../components/AIContentGenerator';

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showProductForm, setShowProductForm] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProductAdded = (product) => {
    setShowProductForm(false);
    setActiveTab(1); // Switch to products tab
  };

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Artisan Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Manage your craft business, create compelling content, and reach new customers
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Profile" />
        <Tab label="Products" />
        <Tab label="Content AI" />
        <Tab label="Analytics" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Artisan Profile
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 2 }}
                    alt="Artisan Profile"
                    src="/placeholder-avatar.jpg"
                  />
                  <IconButton color="primary" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Artisan Name"
                  defaultValue="Rajesh Kumar"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Craft Type"
                  defaultValue="Pottery & Ceramics"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="About Your Craft"
                  defaultValue="Traditional pottery artisan from Rajasthan with 15+ years of experience..."
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  defaultValue="Jaipur, Rajasthan"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" startIcon={<EditIcon />}>
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setShowProductForm(true);
                      setActiveTab(1);
                    }}
                  >
                    Add Product
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Generate Content
                  </Button>
                  <Button variant="outlined" startIcon={<AnalyticsIcon />}>
                    View Analytics
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Box>
          {!showProductForm ? (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5">
                    Your Products
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowProductForm(true)}
                  >
                    Add Product
                  </Button>
                </Box>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No products added yet. Start by adding your first craft item!
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => setShowProductForm(true)}
                  >
                    Add Your First Product
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <ProductForm onProductAdded={handleProductAdded} />
          )}
        </Box>
      )}

      {activeTab === 2 && <AIContentGenerator />}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your performance and growth metrics
            </Typography>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Analytics feature coming soon...
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ArtisanDashboard;
