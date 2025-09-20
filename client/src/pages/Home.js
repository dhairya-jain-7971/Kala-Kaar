import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HandymanIcon from '@mui/icons-material/Handyman';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
  const features = [
    {
      icon: <HandymanIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Showcase Your Craft',
      description: 'Create beautiful digital galleries to showcase your traditional craftsmanship and skills.',
    },
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Tell Your Story',
      description: 'Share the rich cultural heritage and stories behind your craft with AI-powered storytelling tools.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Expand Your Reach',
      description: 'Connect with new audiences and grow your business with AI-driven marketing assistance.',
    },
  ];

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Empowering Local Artisans with AI
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Kala Kaar Marketplace connects traditional Indian craftsmanship with modern digital audiences,
        helping artisans preserve their heritage while expanding their reach.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/artisan-dashboard"
          sx={{ mr: 2 }}
        >
          Join as Artisan
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={RouterLink}
          to="/marketplace"
        >
          Explore Marketplace
        </Button>
      </Box>

      <Box sx={{ mt: 8, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Why Choose Kala Kaar?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🤖 AI-Powered Marketing
            </Typography>
            <Typography variant="body2">
              Generate compelling product descriptions, social media content, and marketing copy with Google's generative AI.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              🎨 Cultural Preservation
            </Typography>
            <Typography variant="body2">
              Help preserve traditional Indian art forms by connecting them with modern audiences who appreciate authenticity.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              📱 Digital Transformation
            </Typography>
            <Typography variant="body2">
              Transform traditional crafts into successful digital businesses with comprehensive analytics and insights.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
