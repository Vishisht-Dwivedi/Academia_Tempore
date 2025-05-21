import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import gandhi from '../../assets/satyamev_jayte.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0a1f44', px: 4, py: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Logo */}
        <Box component="img" src={logo} alt="College Logo" sx={{ height: 56, aspectRatio: '1 / 1' }} />

        {/* Center Title Block */}
        <Box sx={{ flex: '1 3 0%', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
            भारतीय सूचना प्रौद्योगिकी संस्थान, भोपाल
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
            Indian Institute Of Information Technology, Bhopal
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '1rem' }}>
            (An Autonomous Institute of National Importance under act of Parliament)
          </Typography>
        </Box>

        {/* Right Image */}
        <Box component="img" src={gandhi} alt="Satyamev Jayte" sx={{ height: 56, aspectRatio: '1 / 1' }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
