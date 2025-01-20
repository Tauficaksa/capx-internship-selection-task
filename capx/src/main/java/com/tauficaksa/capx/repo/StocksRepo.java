package com.tauficaksa.capx.repo;

import com.tauficaksa.capx.models.Stocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StocksRepo extends JpaRepository<Stocks ,Integer> {
}
