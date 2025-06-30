import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthMetrics from '../components/Dashboard/HealthMetrics';
import RiskIndicator from '../components/Dashboard/RiskIndicator';
import PremiumCalculator from '../components/Dashboard/PremiumCalculator';
import './Dashboard.css';

const Dashboard = () => {
  const [today, setToday] = useState(null);
  const [threeMonthAvg, setThreeMonthAvg] = useState(null);
  const [history, setHistory] = useState([]);
  const [timePeriod, setTimePeriod] = useState('1day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/user/data', { withCredentials: true });
        setToday(res.data.today);
        setThreeMonthAvg(res.data.avg);
        setHistory(res.data.history);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchData();
  }, []);

  const displayData = timePeriod === '1day' ? today : threeMonthAvg;

  if (!today || !threeMonthAvg) return <div className="loading">Loading health data...</div>;

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
            className={timePeriod === '3months' ? 'active' : ''}
            onClick={() => setTimePeriod('3months')}
          >
            3 Months
          </button>
        </div>

        <div className="dashboard-top">
          <RiskIndicator riskLevel={'medium'} />
          <PremiumCalculator premium={45} />
        </div>

        <div className="dashboard-bottom">
          <HealthMetrics data={displayData} timePeriod={timePeriod} history={history} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
