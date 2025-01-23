import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStock = () => {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });
  const [tickers, setTickers] = useState([]);
  const [loadingTickers, setLoadingTickers] = useState(false);

  // Fetch ticker list from Finnhub or other API
  useEffect(() => {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

    if (!apiKey) {
      console.error('API key is missing! Make sure to set REACT_APP_FINNHUB_API_KEY in your .env file.');
      toast.error('API key is missing. Contact the administrator.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoadingTickers(true);

    axios
      .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`)
      .then((response) => {
        setTickers(response.data.map((item) => item.symbol)); // Assuming `symbol` is the ticker key
        setLoadingTickers(false);
      })
      .catch((error) => {
        console.error('Error fetching tickers:', error);
        toast.error('Failed to load tickers. Please try again later.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoadingTickers(false);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle ticker selection
  const handleTickerChange = (event, value) => {
    setFormData({ ...formData, ticker: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (formData.quantity <= 0 || formData.buyPrice <= 0) {
      toast.error('Quantity and Buy Price must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (!formData.ticker) {
      toast.error('Please select a valid ticker.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      buyPrice: parseFloat(formData.buyPrice),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/addstock', payload);

      if (response.status === 200) {
        toast.success('Stock added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setFormData({
          name: '',
          ticker: '',
          quantity: '',
          buyPrice: '',
        });
      }
    } catch (error) {
      if (error.response) {
        // Handle specific status codes
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data || 'Invalid stock data. Ensure all fields are properly set.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (status === 500) {
          toast.error('Internal Server Error. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error(`Unexpected Error: ${data || error.message}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else {
        toast.error(`Network Error: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '68dvh',
        gap: 3,
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        
      }}
    >
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Form Title */}
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
        Add New Stock
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >
        {/* Stock Name */}
        <TextField
          label="Stock Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        {/* Ticker Autocomplete */}
        {loadingTickers ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Autocomplete
            options={tickers}
            getOptionLabel={(option) => option}
            value={formData.ticker}
            onChange={handleTickerChange}
            renderInput={(params) => (
              <TextField {...params} label="Ticker" variant="outlined" required />
            )}
            filterOptions={(options, state) =>
              options.filter((option) =>
                option.toLowerCase().includes(state.inputValue.toLowerCase())
              )
            }
            fullWidth
          />
        )}

        {/* Quantity */}
        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          required
        />

        {/* Buy Price */}
        <TextField
          label="Buy Price"
          name="buyPrice"
          value={formData.buyPrice}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add Stock
        </Button>
      </Box>
    </Box>
  );
};

export default AddStock;
