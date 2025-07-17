import React from 'react';
import Sidebar from '../components/vendor/Sidebar';
import Topbar from '../components/vendor/Topbar';
import DashboardStats from '../components/vendor/DashboardStats';
import PricingManagement from '../components/vendor/PricingManagement';
import '../styles/vendor/vendor_dash.css';

const Vendor_dash = () => {
  return (
    <div className="vendor-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <DashboardStats />
        <PricingManagement />
      </div>
    </div>
  );
};

export default Vendor_dash;