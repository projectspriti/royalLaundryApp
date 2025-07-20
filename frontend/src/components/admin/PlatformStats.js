import React from 'react';
import '../../styles/admin/dashboard.css';

const stats = [
  {
    label: 'Order Completion Rate',
    value: '94.5%',
    color: 'green',
  },
  {
    label: 'Average Rating',
    value: '4.7★',
    color: '#1d4ed8',
  },
  {
    label: 'Active Orders',
    value: '0',
    color: '#000',
  },
  {
    label: 'Monthly Growth',
    value: '+15%',
    color: '#1d4ed8',
  },
];

const PlatformStats = () => {
  return (
    <div className="dashboard-box">
      <h3 className="box-title">Platform Statistics</h3>
      <div className="platform-stat-cards">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-style">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value-highlight" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformStats;
