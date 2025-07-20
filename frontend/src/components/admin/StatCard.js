import React from 'react';
import '../../styles/admin/dashboard.css';

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="stat-card updated-stat-card">
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

export default StatCard;
