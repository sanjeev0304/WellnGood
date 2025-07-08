import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';
import './HealthMetrics.css';

const HealthMetrics = ({ data, timePeriod }) => {
  const avgChartData = [
    {
      metric: 'Steps',
      value: data.steps,
      color: '#eb6a2a'
    },
    {
      metric: 'Heart Rate',
      value: data.heartRate,
      color: '#8edc63'
    },
    {
      metric: 'Calories',
      value: data.calories,
      color: '#f2a900'
    },
    {
      metric: 'Sleep Hours',
      value: data.sleepHours,
      color: '#9e7bff'
    }
  ];

  return (
    <div className="metrics-card">
      <h3 style={{ color: '#eb6a2a' }}>Health Metrics</h3>

      {timePeriod === '1day' ? (
        <div className="daily-metrics">
          <div className="metric">
            <h4>Steps</h4>
            <p>{data.steps.toLocaleString()}</p>
          </div>
          <div className="metric">
            <h4>Heart Rate</h4>
            <p>{data.heartRate} bpm</p>
          </div>
          <div className="metric">
            <h4>Sleep</h4>
            <p>{data.sleepHours} hours</p>
          </div>
          <div className="metric">
            <h4>Calories</h4>
            <p>{data.calories} kcal</p>
          </div>
          <div className="metric">
            <h4>Saturation</h4>
            <p>{data.bloodOxygen} %</p>
          </div>
          <div className="metric">
            <h4>Distance</h4>
            <p>{data.distance} m</p>
          </div>

        </div>
      ) : (
        <div className="chart-container">
          <h4 style={{ color: '#eb6a2a' }}>3-Month Average Metrics</h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={avgChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {
                  avgChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;
