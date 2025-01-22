import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Dashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      {/* Middle Component: Dynamic content rendered here */}
      <Box sx={{ flex: '1 0 auto', p: 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Dashboard;
