package com.tauficaksa.capx.cotroller;

import com.tauficaksa.capx.models.PortfolioMetrics;
import com.tauficaksa.capx.models.Stocks;
import com.tauficaksa.capx.service.StocksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    StocksService s_service;


    @PostMapping("/addstock")
    public ResponseEntity<String> addStock(@RequestBody Stocks stock) {
        String response = s_service.addStock(stock);

        if ("ok".equals(response))
        {
            return new ResponseEntity<>("Stock added successfully", HttpStatus.OK);
        }
        else if ("Invalid stock data: Ensure all fields are properly set.".equals(response))
        {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else
        {
            // Consider INTERNAL_SERVER_ERROR (500) for unexpected issues
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updatestock/{id}")
    public ResponseEntity<String> updatestock(@PathVariable int id, @RequestBody Stocks stock) {
        String response = s_service.updatestock(id, stock);

        if ("Stock updated successfully".equals(response)) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if ("Stock not found".equals(response)) {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deletestock/{id}")
    public ResponseEntity<String> deletestock(@PathVariable int id) {
        String response = s_service.deletestock(id);

        if ("Deleted successfully".equals(response)) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if ("Stock not found".equals(response)) {
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stocks")
    public ResponseEntity<List<Stocks>> fetchallstocks(){
        List<Stocks> response = s_service.fetchallstocks();
        if (response.isEmpty()) {
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT); // 204 if no stocks are found
        } else {
            return new ResponseEntity<>(response, HttpStatus.OK); // 200 with the list of stocks
        }
    }


    @GetMapping("/portfolio/metrics")
    public ResponseEntity<PortfolioMetrics> getPortfolioMetrics() {
        try {
            // Call the service method to get the portfolio metrics
            ResponseEntity<PortfolioMetrics> response = s_service.getPortfolioMetrics();

            // Return the response from the service
            return response;

        } catch (Exception e) {
            // Log the error and return INTERNAL_SERVER_ERROR if an exception occurs
            System.err.println("Error calculating portfolio metrics: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }





}
