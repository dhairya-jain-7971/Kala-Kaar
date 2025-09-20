import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Paper, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5A3C', // Traditional brown color for crafts
    },
    secondary: {
      main: '#D2691E', // Warm orange accent
    },
    background: {
      default: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
});

// Simple Home Component
const Home = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Typography variant="h2" gutterBottom>
      🏺 Kala Kaar Marketplace
    </Typography>
    <Typography variant="h5" color="text.secondary" paragraph>
      AI-Powered Platform for Traditional Indian Artisans
    </Typography>
    <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      Connect with traditional artisans, discover authentic handcrafted products,
      and preserve cultural heritage through our AI-powered marketplace.
    </Typography>
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
      <Button variant="contained" component={Link} to="/marketplace" size="large">
        Explore Marketplace
      </Button>
      <Button variant="outlined" component={Link} to="/artisan-dashboard" size="large">
        For Artisans
      </Button>
    </Box>
  </Box>
);

// Simple About Component
const About = () => (
  <Box>
    <Typography variant="h3" gutterBottom>
      About Kala Kaar
    </Typography>
    <Typography paragraph>
      Kala Kaar is an AI-powered platform that helps traditional Indian artisans
      market their craft, tell their stories, and expand their reach to new digital audiences.
    </Typography>
  </Box>
);

// Simple Marketplace Component
const Marketplace = () => (
  <Box>
    <Typography variant="h3" gutterBottom>
      Marketplace
    </Typography>
    <Typography paragraph>
      Discover authentic handcrafted products from traditional artisans across India.
    </Typography>
  </Box>
);

// Simple Artisan Dashboard Component
const ArtisanDashboard = () => (
  <Box>
    <Typography variant="h3" gutterBottom>
      Artisan Dashboard
    </Typography>
    <Typography paragraph>
      Tools and resources for artisans to showcase their work and grow their business.
    </Typography>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Paper elevation={0} sx={{ minHeight: '100vh' }}>
          {/* Header */}
          <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
            <Container>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">
                  🏺 Kala Kaar Marketplace
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button color="inherit" component={Link} to="/">
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/marketplace">
                    Marketplace
                  </Button>
                  <Button color="inherit" component={Link} to="/artisan-dashboard">
                    Artisans
                  </Button>
                  <Button color="inherit" component={Link} to="/about">
                    About
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Main Content */}
          <Container sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>

          {/* Footer */}
          <Box sx={{ bgcolor: 'grey.100', py: 3, mt: 4 }}>
            <Container>
              <Typography align="center" color="text.secondary">
                © 2024 Kala Kaar Marketplace. Preserving traditional crafts through technology.
              </Typography>
            </Container>
          </Box>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
