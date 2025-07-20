import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import StatCard from '../components/admin/StatCard';
import RecentUsers from '../components/admin/RecentUsers';
import PlatformStats from '../components/admin/PlatformStats';
import '../styles/admin/dashboard.css';
import { FaUsers, FaStore, FaShoppingCart, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />

        
        <div className="stat-grid">
          <StatCard icon={<FaUsers />} title="Total Users" value="1" />
          <StatCard icon={<FaStore />} title="Active Vendors" value="1" />
          <StatCard icon={<FaShoppingCart />} title="Total Orders" value="0" />
          <StatCard icon={<FaChartLine />} title="Monthly Revenue" value="$0.00" />
        </div>
        <div className="bottom-grid">
          <RecentUsers />
          <PlatformStats />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
