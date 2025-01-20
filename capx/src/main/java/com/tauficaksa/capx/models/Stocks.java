package com.tauficaksa.capx.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Stocks {


    /*     Stock Table data base Fields    */

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    int id;                 //A unique id for each stock ,Fixed series-based ID using auto-increment

    String name;            //Stock Name
    String ticker;          //shorthand for a stock in the stock market
    int quantity;           //Number of Shares
    double buyPrice;        //Purchase Price per Share



    /* Getter setters , constructors & toString methods  */
    @Override
    public String toString() {
        return "Stocks{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", ticker='" + ticker + '\'' +
                ", quantity=" + quantity +
                ", buyPrice=" + buyPrice +
                '}';
    }

    public Stocks(int id, String name, String ticker, int quantity, double buyPrice) {
        this.id = id;
        this.name = name;
        this.ticker = ticker;
        this.quantity = quantity;
        this.buyPrice = buyPrice;
    }

    public Stocks(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(double buyPrice) {
        this.buyPrice = buyPrice;
    }

}
