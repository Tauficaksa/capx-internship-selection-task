package com.tauficaksa.capx.models;

public class PortfolioMetrics {
    private double totalValue;
    private Stocks topStock;


    public PortfolioMetrics(double totalValue, Stocks topStock) {
        this.totalValue = totalValue;
        this.topStock = topStock;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public Stocks getTopStock() {
        return topStock;
    }

    public void setTopStock(Stocks topStock) {
        this.topStock = topStock;
    }
}
