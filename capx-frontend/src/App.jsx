import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/DashBoard'
import PortfolioMetrics from './components/PortfolioMetrics'
import AddStock from './components/AddStock'
import RealTimeData from './components/RealTimeData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="add-stock" element={<AddStock />} />
        <Route path="portfolio-metrics" element={<PortfolioMetrics />} />
        <Route path="real-time-data" element={<RealTimeData />} />
      </Routes>
    </>
  )
}

export default App
