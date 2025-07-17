import React from 'react';
import '../../styles/vendor/dashboard_stats.css';

const DashboardStats = () => {
  return (
    <div className="stats-container">
      <div className="stat-card">Total Orders <strong>0</strong></div>
      <div className="stat-card">Pending Orders <strong>0</strong></div>
      <div className="stat-card">Completed Orders <strong>0</strong></div>
      <div className="stat-card">Total Revenue <strong>₹0</strong></div>
    </div>
  );
};

export default DashboardStats;