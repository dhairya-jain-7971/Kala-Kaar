import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
        >
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Kala Kaar Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/marketplace">
            Marketplace
          </Button>
          <Button color="inherit" component={RouterLink} to="/artisan-dashboard">
            Artisan Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
