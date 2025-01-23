import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PortfolioMetrics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the API data
    axios
      .get('http://localhost:8080/api/portfolio/metrics')
      .then((response) => {
        const statusCode = response.status;
        setData(response.data);
        setLoading(false);

        // Show toast based on the status code
        if (statusCode === 200) {
          toast.success(`Data fetched successfully! Status Code: ${statusCode}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (statusCode === 204) {
          toast.info('No content available. Status Code: 204', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        const statusCode = err.response ? err.response.status : 'Unknown';
        setError(`Status Code: ${statusCode} - ${err.message}`);
      
        // Handle 500 explicitly and other errors generically
        if (statusCode === 500) {
          toast.error(`Server error occurred! Status Code: 500`, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          // Generic toast for other errors
          toast.error(`Error! Status Code: ${statusCode} - ${err.message}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70dvh' }}>
        <CircularProgress sx={{color:'black'}}/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70dvh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <ToastContainer />
      </Box>
    );
  }

  // Check if `data` is null before rendering
  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70dvh' }}>
        <Typography variant="h6" color="textSecondary">
          No data available.
        </Typography>
        <ToastContainer />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70dvh',
        gap: 4,
        padding: 2,
      }}
    >
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Total Value */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#000000' }}>
        Total Portfolio Value: ${data.totalValue.toFixed(2)}
      </Typography>

      {/* Top Stock Card */}
      {data.topStock ? (
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: '#fff',
            color: '#000000',
            textAlign: 'center',
            transition: 'all 0.5s ease',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              boxShadow: '8px 8px 0px black',
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#000000' }}>
              Top Performing Stock
            </Typography>
            <Typography variant="body1" sx={{ color: '#000000' }}>
              <strong>Name:</strong> {data.topStock.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#000000' }}>
              <strong>Ticker:</strong> {data.topStock.ticker}
            </Typography>
            <Typography variant="body1" sx={{ color: '#000000' }}>
              <strong>Quantity:</strong> {data.topStock.quantity}
            </Typography>
            <Typography variant="body1" sx={{ color: '#000000' }}>
              <strong>Buy Price:</strong> ${data.topStock.buyPrice.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" sx={{ color: '#000000' }}>
          No top-performing stock available.
        </Typography>
      )}
    </Box>
  );
};

export default PortfolioMetrics;
