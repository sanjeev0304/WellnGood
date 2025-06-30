import React, { useState, useEffect } from 'react';
import HealthMetrics from '../components/Dashboard/HealthMetrics';
import RiskIndicator from '../components/Dashboard/RiskIndicator';
import PremiumCalculator from '../components/Dashboard/PremiumCalculator';
import './Dashboard.css';

const Dashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [timePeriod, setTimePeriod] = useState('1day');

  useEffect(() => {
    const fetchData = () => {
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
          steps: [],
          heartRate: [],
          sleep: [],
          riskLevel: 'medium',
          premium: 45
        };
      } else {
        return {
          steps: [],
          heartRate: [],
          sleep: [],
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

        <div className="dashboard-top">
          <RiskIndicator riskLevel={healthData.riskLevel} />
          <PremiumCalculator premium={healthData.premium} />
        </div>

        <div className="dashboard-bottom">
          <HealthMetrics data={healthData} timePeriod={timePeriod} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
