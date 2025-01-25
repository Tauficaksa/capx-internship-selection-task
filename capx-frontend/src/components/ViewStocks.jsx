import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal,
  Typography,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ViewStocks = () => {
  // State for managing the list of stocks
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for stocks
  const [tickers, setTickers] = useState([]); // List of valid tickers
  const [loadingTickers, setLoadingTickers] = useState(false); // Loading state for tickers

  // Modal and stock selection states for editing
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // State to store updated stock data
  const [updatedData, setUpdatedData] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });

  // API base URL and API key for fetching tickers
  const apiBaseUrl = 'http://localhost:8080/api';
  const tickerApiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  // Fetch all stocks when the component mounts
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/stocks`)
      .then((response) => {
        setStocks(response.data); // Set the fetched stocks
        setLoading(false); // Disable loading
      })
      .catch((error) => {
        console.error('Error fetching stocks:', error);
        toast.error('Failed to fetch stocks. Please try again later.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoading(false);
      });
  }, []);

  // Fetch available tickers for validation
  const fetchTickers = () => {
    if (!tickerApiKey) {
      toast.error('API key for ticker validation is missing.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoadingTickers(true);

    axios
      .get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${tickerApiKey}`)
      .then((response) => {
        setTickers(response.data.map((item) => item.symbol)); // Map ticker symbols
        setLoadingTickers(false);
      })
      .catch((error) => {
        console.error('Error fetching tickers:', error);
        toast.error('Failed to load tickers for validation.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoadingTickers(false);
      });
  };

  // Delete a stock by its ID
  const handleDelete = (id) => {
    axios
      .delete(`${apiBaseUrl}/deletestock/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Stock deleted successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          setStocks(stocks.filter((stock) => stock.id !== id)); // Remove deleted stock from state
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error('Stock not found.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error('Failed to delete stock. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  };

  // Open the edit modal and set the selected stock
  const openEditModal = (stock) => {
    setSelectedStock(stock);
    setUpdatedData({ ...stock });
    fetchTickers(); // Fetch tickers for validation
    setEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedStock(null);
  };

  // Handle form input changes for stock updates
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Handle changes in the ticker selection
  const handleTickerChange = (event, value) => {
    setUpdatedData({ ...updatedData, ticker: value });
  };

  // Handle stock update submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // Validation for input fields
    if (!updatedData.name.trim()) {
      toast.error('Stock name cannot be empty.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (!updatedData.ticker.trim()) {
      toast.error('Ticker cannot be empty.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (updatedData.quantity <= 0) {
      toast.error('Quantity must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (updatedData.buyPrice <= 0) {
      toast.error('Buy price must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // API call to update stock
    axios
      .put(`${apiBaseUrl}/updatestock/${selectedStock.id}`, updatedData)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Stock updated successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          setStocks(
            stocks.map((stock) =>
              stock.id === selectedStock.id ? { ...selectedStock, ...updatedData } : stock
            )
          );
          closeEditModal(); // Close the modal after updating
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          toast.error('Stock not found.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error('Failed to update stock. Please try again later.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  };

  // Display a loading spinner if stocks are still loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <ToastContainer /> {/* Notification container */}
      <Typography variant="h4" gutterBottom align="center">
        Stocks List
      </Typography>

      {/* Table to display stocks */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth: '100%', overflowX: 'auto', margin: '0 auto', maxHeight: 400 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Ticker</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>${stock.buyPrice}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openEditModal(stock)}
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(stock.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing stock */}
      <Modal open={editModalOpen} onClose={closeEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom align="center">
            Update Stock
          </Typography>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              label="Stock Name"
              name="name"
              value={updatedData.name}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
              required
            />
            {loadingTickers ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Autocomplete
                options={tickers}
                getOptionLabel={(option) => option}
                value={updatedData.ticker}
                onChange={handleTickerChange}
                renderInput={(params) => (
                  <TextField {...params} label="Ticker" fullWidth required />
                )}
              />
            )}
            <TextField
              label="Quantity"
              name="quantity"
              value={updatedData.quantity}
              onChange={handleUpdateChange}
              type="number"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Buy Price"
              name="buyPrice"
              value={updatedData.buyPrice}
              onChange={handleUpdateChange}
              type="number"
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
              <Button variant="outlined" onClick={closeEditModal}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewStocks;
