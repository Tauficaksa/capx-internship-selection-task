import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000', padding: 1 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link to="/dashboard/add-stock" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Add Stock
          </Link>
          <Link to="/dashboard/real-time-data" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Real-Time Data
          </Link>
          <Link to="/dashboard/portfolio-metrics" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Portfolio Metrics
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
