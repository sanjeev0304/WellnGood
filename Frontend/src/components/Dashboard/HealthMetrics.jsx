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
import "./HealthMetrics.css";
const HealthMetrics = ({ data, timePeriod }) => {
  const getChartData = () => {
    if (timePeriod === '1day') return null;

    const days = timePeriod === '1month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      steps: Math.floor(Math.random() * 5000) + 5000,
      heartRate: Math.floor(Math.random() * 20) + 60,
      sleep: (Math.random() * 2 + 6).toFixed(1),
      calories: Math.floor(Math.random() * 400) + 1600
    }));
  };

  const chartData = getChartData();

  return (
    <div className="metrics-card">
      <h3 style={{ color: '#eb6a2a' }}>Health Metrics</h3>

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
          <div className="metric">
            <h4>Calories</h4>
            <p>{data.calories || (Math.floor(Math.random() * 400) + 1600)} kcal</p>
          </div>
        </div>
      ) : (
        <div className="charts-grid">
          <div className="chart-container">
            <h4 style={{ color: '#eb6a2a' }}>Steps Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="#eb6a2a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4 style={{ color: '#8edc63' }}>Heart Rate Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="heartRate" fill="#8edc63" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4 style={{ color: '#f2a900' }}>Calories Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#f2a900" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h4 style={{ color: '#9e7bff' }}>Sleep Over Time</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sleep" fill="#9e7bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;
