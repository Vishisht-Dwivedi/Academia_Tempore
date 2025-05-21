import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      <Typography variant="body2" color="gray">
        &copy; {new Date().getFullYear()} IIIT Bhopal. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
