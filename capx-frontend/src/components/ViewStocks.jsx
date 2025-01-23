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
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const [loadingTickers, setLoadingTickers] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });

  const apiBaseUrl = 'http://localhost:8080/api';
  const tickerApiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/stocks`)
      .then((response) => {
        setStocks(response.data);
        setLoading(false);
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
        setTickers(response.data.map((item) => item.symbol));
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

  const handleDelete = (id) => {
    axios
      .delete(`${apiBaseUrl}/deletestock/${id}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Stock deleted successfully!', {
            position: 'top-right',
            autoClose: 3000,
          });
          setStocks(stocks.filter((stock) => stock.id !== id));
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

  const openEditModal = (stock) => {
    setSelectedStock(stock);
    setUpdatedData({ ...stock });
    fetchTickers();
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedStock(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleTickerChange = (event, value) => {
    setUpdatedData({ ...updatedData, ticker: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    // Validation checks
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

    // If validation passes, proceed with the API call
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
          closeEditModal();
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Stocks List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
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

      <Modal open={editModalOpen} onClose={closeEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
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
