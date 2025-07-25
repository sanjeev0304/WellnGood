import React, { useState, useEffect } from 'react';
import HealthMetrics from '../components/Dashboard/HealthMetrics';
import RiskIndicator from '../components/Dashboard/RiskIndicator';
import PremiumCalculator from '../components/Dashboard/PremiumCalculator';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [today, setToday] = useState(null);
  const [threeMonthAvg, setThreeMonthAvg] = useState(null);
  const [history, setHistory] = useState([]);
  const [timePeriod, setTimePeriod] = useState('1day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/user/data');
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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="section-title">Your Health Dashboard</h1>
        <div className="title-divider"></div>
        <p className="dashboard-tagline">Track your well-being and stay ahead of risk</p>
      </div>

      <div className="dashboard-wrapper">
        <div className="dashboard-left">
          <div className="dashboard-controls">
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

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <RiskIndicator riskLevel={'medium'} />
            </div>
            <div className="dashboard-card">
              <PremiumCalculator premium={45} />
            </div>
          </div>

          <div className="dashboard-card full-width">
            <HealthMetrics data={displayData} timePeriod={timePeriod} history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
