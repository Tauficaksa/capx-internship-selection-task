import React from 'react';
import { Box, Typography, Button, Container, Grid, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dashboard'); // Navigate to the actual website (dashboard)
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#000000', padding: 1 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, color: '#FFFFFF', textAlign: 'left' }}>
            Taufic aksa
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          flex: '1 0 auto',
          overflow: 'auto', // Ensure scrolling is enabled for the main content
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            gap: 3, // Space between elements
          }}
        >
          {/* Title */}
          <Box sx={{textAlign: 'center',}}>
            <Typography variant="h4"  sx={{ color: '#000000' }}>
              Stocks Portfolio Tracker Application
            </Typography>
            <Typography variant="h6" color="textSecondary" >
              Demonstrating full-stack functionality with real-time stock data integration and CRUD operations.
            </Typography>
          </Box>

          {/* Features Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                      backgroundColor: '#f0f0f0', 
                      boxShadow: '8px 8px 0px black',
                      
                    },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
                  CRUD Operations
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}>
                  <strong style={{color:'#000000'}}>Form:</strong> Add/Edit stock details.  
                  <br />
                  <strong style={{color:'#000000'}}>List:</strong> View, update, or delete stocks.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                      backgroundColor: '#f0f0f0', 
                      boxShadow: '8px 8px 0px black',
                      
                    },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
                  Portfolio Metrics
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}>
                  Dashboard showing total portfolio value, top-performing stock.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                      backgroundColor: '#f0f0f0', 
                      boxShadow: '8px 8px 0px black',
                      
                    },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
                  Real-Time Data
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}>
                  Integrated with the Finnhub API for live stock prices and dynamic value calculations.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Additional Features Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                      backgroundColor: '#f0f0f0', 
                      boxShadow: '8px 8px 0px black',
                      
                    },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
                  Code Quality
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}>
                  This project follows clean, modular, and readable code practices.
                  Backend services are designed using proper Java Spring Boot principles.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#fff',
                  textAlign: 'center',
                  transition: 'all 0.5s ease',
                  '&:hover': {
                      backgroundColor: '#f0f0f0', 
                      boxShadow: '8px 8px 0px black',
                      
                    },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
                  UI/UX Design
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000' }}>
                  Built with a responsive and intuitive interface using Material-UI for styling and components.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Button */}
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleButtonClick}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#000000', py: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            sx={{ color: '#FFFFFF', textAlign: 'center' }}
          >
            Copyright © by {''} 
            <a
              href="https://tauficaksa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
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
            </a>.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
