package com.tauficaksa.capx.service;


import com.tauficaksa.capx.models.PortfolioMetrics;
import com.tauficaksa.capx.models.Stocks;
import com.tauficaksa.capx.repo.StocksRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StocksService {

    @Autowired
    StocksRepo s_repo;

    @Autowired
    RealTimeStockPriceService currentPrice_service;


    // Adding a new stock (Post method)

    public String addStock(Stocks newStock) {
        try {
            // Validate newStock fields
            if (newStock == null ||
                    newStock.getName() == null ||
                    newStock.getTicker() == null ||
                    newStock.getQuantity() <= 0 ||
                    newStock.getBuyPrice() <= 0.0) {
                return "Invalid stock data: Ensure all fields are properly set.";
            }

            s_repo.save(newStock);
            return "ok";
        } catch (DataIntegrityViolationException e) {
            System.err.println("Database error: " + e.getMessage());
            return "Database error: " + e.getMessage();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return "Unexpected error occurred";
        }
    }
    public String updatestock(int id, Stocks updatedStock) {
        try {
            // Check if the stock with the given ID exists
            Stocks existingStock = s_repo.findById(id).orElse(null);
            if (existingStock == null) {
                return "Stock not found";
            }

            // Update the existing stock with new data
            existingStock.setName(updatedStock.getName());
            existingStock.setTicker(updatedStock.getTicker());
            existingStock.setQuantity(updatedStock.getQuantity());
            existingStock.setBuyPrice(updatedStock.getBuyPrice());

            // Save the updated stock
            s_repo.save(existingStock);
            return "Stock updated successfully";
        } catch (Exception e) {
            // Log exception for debugging
            System.err.println("Error updating stock: " + e.getMessage());
            return "Error updating stock";
        }
    }

    public String deletestock(int id) {
        try {
            // Check if the stock with the given ID exists
            Stocks existingStock = s_repo.findById(id).orElse(null);
            if (existingStock == null) {
                return "Stock not found";
            }

            // Delete the stock
            s_repo.delete(existingStock);
            return "Deleted successfully";
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error deleting stock: " + e.getMessage());
            return "Error deleting stock";
        }
    }


    public List<Stocks> fetchallstocks() {
        try {
            // Fetch all stocks from the repository
            return s_repo.findAll();
        } catch (Exception e) {
            // Log the error and return an empty list
            System.err.println("Error fetching stocks: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public ResponseEntity<PortfolioMetrics> getPortfolioMetrics() {
        try {
            List<Stocks> stocks = s_repo.findAll();
            if (stocks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 if no stocks found
            }

            double totalValue = 0;
            Stocks topStock = null;
            double maxIncrease = Double.NEGATIVE_INFINITY;

            for (Stocks stock : stocks) {
                double currentPrice = currentPrice_service.getCurrentPrice(stock.getTicker());

                totalValue += currentPrice * stock.getQuantity();

                // Determine top-performing stock
                double increase = currentPrice - stock.getBuyPrice();
                if (increase > maxIncrease) {
                    maxIncrease = increase;
                    topStock = stock;
                }
            }

            // If all stocks are processed, return 200 OK with the portfolio metrics
            return new ResponseEntity<>(new PortfolioMetrics(totalValue, topStock), HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception and return 500 for server errors
            System.err.println("Error calculating portfolio metrics: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }


}
