import React from 'react';
import { FaHome, FaUsers, FaStore, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import '../../styles/admin/sidebar.css';

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-top">
        <h2 className="logo">🧺 LaundryHub</h2>
        <div className="admin-info">
          <p className="username">admin</p>
          <p className="role">Admin</p>
        </div>
        <ul className="menu">
          <li><FaHome /> Dashboard</li>
          <li><FaUsers /> Users</li>
          <li><FaStore /> Vendors</li>
          <li><FaShoppingCart /> Orders</li>
        </ul>
      </div>
      <button className="logout-btn"><FaSignOutAlt /> Logout</button>
    </div>
  );
};

export default Sidebar;
