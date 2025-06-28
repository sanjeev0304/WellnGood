// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import HealthMetrics from '../components/Dashboard/HealthMetrics';
import RiskIndicator from '../components/Dashboard/RiskIndicator';
import PremiumCalculator from '../components/Dashboard/PremiumCalculator';

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('1day'); // '1day', '1month', '3months'
  
  // Mock data fetch from Google Fit API
  useEffect(() => {
    const fetchData = () => {
      // Different data for different time periods
      if (timePeriod === '1day') {
        return {
          steps: 8432,
          heartRate: 72,
          sleep: 7.2,
          riskLevel: 'medium',
          premium: 45,
          timestamp: new Date().toISOString()
        };
      } else if (timePeriod === '1month') {
        return {
          steps: [/* array of 30 days data */],
          heartRate: [/* array of 30 days data */],
          sleep: [/* array of 30 days data */],
          riskLevel: 'medium',
          premium: 45
        };
      } else { // 3months
        return {
          steps: [/* array of 90 days data */],
          heartRate: [/* array of 90 days data */],
          sleep: [/* array of 90 days data */],
          riskLevel: 'medium',
          premium: 45
        };
      }
    };
    
    setHealthData(fetchData());
  }, [timePeriod]);

  if (!healthData) return <div className="loading">Loading health data...</div>;

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Your Health Dashboard</h1>
        
        <div className="time-period-selector">
          <button 
            className={timePeriod === '1day' ? 'active' : ''}
            onClick={() => setTimePeriod('1day')}
          >
            1 Day
          </button>
          <button 
            className={timePeriod === '1month' ? 'active' : ''}
            onClick={() => setTimePeriod('1month')}
          >
            1 Month
          </button>
          <button 
            className={timePeriod === '3months' ? 'active' : ''}
            onClick={() => setTimePeriod('3months')}
          >
            3 Months
          </button>
        </div>
        
        <div className="dashboard-grid">
          <RiskIndicator riskLevel={healthData.riskLevel} />
          <PremiumCalculator premium={healthData.premium} />
          <HealthMetrics 
            data={healthData} 
            timePeriod={timePeriod} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;