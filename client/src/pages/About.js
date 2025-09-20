import React from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const About = () => {
  const features = [
    'AI-powered content generation for product descriptions and marketing',
    'Digital marketplace connecting artisans with global customers',
    'Story-telling platform to preserve cultural heritage',
    'Analytics dashboard for business insights',
    'Mobile-responsive design for accessibility',
    'Secure payment processing',
  ];

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        About Kala Kaar Marketplace
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" paragraph>
            Kala Kaar Marketplace is an AI-powered platform designed to empower local Indian artisans
            and craftsmen by bridging the gap between traditional craftsmanship and modern digital commerce.
            Our mission is to preserve cultural heritage while helping artisans thrive in the digital age.
          </Typography>

          <Typography variant="body1" paragraph>
            India is home to some of the world's most skilled artisans, from pottery masters in Rajasthan
            to weavers in Varanasi and woodworkers in Kashmir. These craftspeople carry centuries of
            tradition and skill, but often struggle to reach modern consumers who value authenticity
            and cultural significance.
          </Typography>

          <Typography variant="body1" paragraph>
            Using Google's generative AI and modern web technologies, Kala Kaar provides artisans with
            the tools they need to create compelling digital presences, generate marketing content,
            and connect with customers worldwide.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Impact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  Supporting thousands of artisans across India
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  Connecting crafts with global audiences
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2">
                  Increasing artisan income by up to 300%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Technology Stack
        </Typography>
        <Typography variant="body2" paragraph>
          Built with modern web technologies and Google Cloud's AI services:
        </Typography>
        <Typography variant="body2">
          • Frontend: React.js with Material-UI<br />
          • Backend: Node.js with Express<br />
          • AI: Google Cloud Generative AI (Gemini)<br />
          • Database: MongoDB<br />
          • Storage: Google Cloud Storage<br />
          • Payments: Stripe integration
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
