package com.tauficaksa.capx.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@PropertySource("classpath:stock-api.properties") // Load the custom properties file
public class RealTimeStockPriceService {

    @Value("${finnhub.api.key}") // Access the API key
    private String apiKey;

    private static final String API_URL = "https://finnhub.io/api/v1/quote";

    public Double getCurrentPrice(String ticker) {
        String url = String.format("%s?symbol=%s&token=%s", API_URL, ticker, apiKey);

        RestTemplate restTemplate = new RestTemplate();

        try {
            // Fetch and map the API response
            FinnhubResponse response = restTemplate.getForObject(url, FinnhubResponse.class);

            // Debugging: Log the response
            if (response != null) {
                System.out.println("Ticker: " + ticker + ", Current Price: " + response.getCurrentPrice());
                return response.getCurrentPrice();
            } else {
                throw new RuntimeException("Empty response from Finnhub API for ticker: " + ticker);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching price for ticker: " + ticker, e);
        }
    }

    // Inner static class to map Finnhub API response
    private static class FinnhubResponse {
        private double c; // Current price

        public double getCurrentPrice() {
            return c;
        }

        public void setC(double c) {
            this.c = c;
        }
    }
}
