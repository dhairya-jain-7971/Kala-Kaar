import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Header from './components/Header';
import Home from './pages/Home';
import ArtisanDashboard from './pages/ArtisanDashboard';
import Marketplace from './pages/Marketplace';
import About from './pages/About';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
