import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddStock from './components/AddStock';
import PortfolioMetrics from './components/PortfolioMetrics';
import Dashboard from './pages/DashBoard';
import './App.css'
import ViewStocks from './components/ViewStocks';

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add-stock" element={<AddStock />} />
        <Route path="view-edit-delete" element={<ViewStocks />} />
        <Route path="portfolio-metrics" element={<PortfolioMetrics />} />
        {/* Default content for /dashboard */}
        <Route
          index
          element={
            <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
              Welcome to the Stocks Protfolio - Dashboard!
            </h2>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
