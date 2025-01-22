import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      {/* Dynamic content based on the nested routes */}
      <Box sx={{ flex: '1 0 auto', p: 3 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Dashboard;
