import React from 'react';
import '../../styles/customer/DashboardCard.css'; // optional, you can also move this to dashboard.css

const DashboardCard = ({ title, count, icon }) => (
  <div className="dashboard-card">
    <div className="card-left">
      <p className="card-title">{title}</p>
      <p className="card-count">{count}</p>
    </div>
    <div className="card-icon">{icon}</div>
  </div>
);

export default DashboardCard;
