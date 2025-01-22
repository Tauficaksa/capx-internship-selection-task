import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000000', py: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{ color: '#FFFFFF', textAlign: 'center' }}
        >
          Copyright © by{' '}
          <a
            href="https://tauficaksa.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4caf50', textDecoration: 'none' }}
          >
            Tauficaksa
          </a>
          . Visit my{' '}
          <a
            href="https://tauficaksa.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4caf50', textDecoration: 'none' }}
          >
            website
          </a>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
