import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const HealthMetrics = ({ data, timePeriod }) => {
  const getChartData = () => {
    if (timePeriod === '1day') return null;

    const days = timePeriod === '1month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      steps: Math.floor(Math.random() * 5000) + 5000,
      heartRate: Math.floor(Math.random() * 20) + 60,
      sleep: (Math.random() * 2 + 6).toFixed(1)
    }));
  };

  const chartData = getChartData();

  return (
    <div className="metrics-card">
      <h3>Health Metrics</h3>

      {timePeriod === '1day' ? (
        <div className="daily-metrics">
          <div className="metric">
            <h4>Steps</h4>
            <p>{data.steps.toLocaleString()}</p>
            <small>Recorded at: {new Date(data.timestamp).toLocaleTimeString()}</small>
          </div>
          <div className="metric">
            <h4>Heart Rate</h4>
            <p>{data.heartRate} bpm</p>
          </div>
          <div className="metric">
            <h4>Sleep</h4>
            <p>{data.sleep} hours</p>
          </div>
        </div>
      ) : (
        <div className="chart-container">
          <h4>Steps Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          <h4>Heart Rate Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="heartRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;
