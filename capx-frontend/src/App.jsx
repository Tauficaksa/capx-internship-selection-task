import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddStock from './components/AddStock';
import PortfolioMetrics from './components/PortfolioMetrics';
import RealTimeData from './components/RealTimeData';
import Dashboard from './pages/DashBoard';
import './App.css'

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="add-stock" element={<AddStock />} />
        <Route path="real-time-data" element={<RealTimeData />} />
        <Route path="portfolio-metrics" element={<PortfolioMetrics />} />
        {/* Default content for /dashboard */}
        <Route
          index
          element={
            <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
              Welcome to the Dashboard!
            </h2>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
