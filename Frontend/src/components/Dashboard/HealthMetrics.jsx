import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import './HealthMetrics.css';

const HealthMetrics = ({ data, timePeriod }) => {
  const avgChartData = [
    { metric: 'Steps', value: data.steps, color: 'rgb(248, 163, 248)' },
    { metric: 'Heart Rate', value: data.heartRate, color: ' #8edc63' },
    { metric: 'Calories', value: data.calories, color: ' #f2a900' },
    { metric: 'Sleep Hours', value: data.sleepHours, color: ' #9e7bff' }
  ];

  return (
    <div className="metrics-card">
      <h3 className="metrics-title">Health Metrics</h3>

      {timePeriod === '1day' ? (
        <div className="daily-metrics">
          <div className="metric"><h4>Steps</h4><p>{data.steps.toLocaleString()}</p></div>
          <div className="metric"><h4>Heart Rate</h4><p>{data.heartRate} bpm</p></div>
          <div className="metric"><h4>Sleep</h4><p>{data.sleepHours} hours</p></div>
          <div className="metric"><h4>Calories</h4><p>{data.calories} kcal</p></div>
          <div className="metric"><h4>Saturation</h4><p>{data.bloodOxygen} %</p></div>
          <div className="metric"><h4>Distance</h4><p>{data.distance} m</p></div>
        </div>
      ) : (
        <div className="chart-container">
          <h4 style={{ color: '#f6fcdf', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '0.5px', textAlign: 'left' }}>
            3-Month Average Metrics
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={avgChartData}
              margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="metric"
                tick={{ fill: '#f6fcdf', fontSize: 14 }}
                axisLine={{ stroke: '#555' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#f6fcdf', fontSize: 14 }}
                axisLine={{ stroke: '#555' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 30, 0.95)', // very dark overlay
                  border: '1px solid #666',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                  color: '#f6fcdf',
                }}
                labelStyle={{ color: '#f6fcdf', fontWeight: 600 }}
                itemStyle={{ color: '#f6fcdf' }}
                cursor={{ fill: 'transparent' }} // removes the hover background bar
              />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                isAnimationActive={true}
                animationDuration={1000}
              >
                <LabelList dataKey="value" position="top" fill="#f6fcdf" fontSize={14} />
                {avgChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;

