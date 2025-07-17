import React from 'react';
import Sidebar from '../components/customer/Sidebar';
import Topbar from '../components/customer/Topbar';
import DashboardCard from '../components/customer/DashboardCard';
import RecentOrders from '../components/customer/RecentOrders';
import QuickActions from '../components/customer/QuickActions';

import { FaShoppingCart, FaClock, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
import '../styles/customer/dashboard.css';

const CustomerDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="cards">
          <DashboardCard title="Total Orders" count={0} icon={<FaShoppingCart />} />
          <DashboardCard title="Pending Orders" count={0} icon={<FaClock />} />
          <DashboardCard title="Completed" count={0} icon={<FaCheckCircle />} />
          <DashboardCard title="Total Spent" count={`$0.00`} icon={<FaDollarSign />} />
        </div>
        <div className="dashboard-body">
          <RecentOrders />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
