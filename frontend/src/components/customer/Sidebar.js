import React from 'react';
import { FaHome, FaPlus, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer/sidebar.css';

const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();

  return (
  
    <div className="sidebar">
  <div className="sidebar-content">
    <h2 className="logo">LaundryHub</h2>
    <div className="profile">
      <div className="avatar">👤</div>
      <div>
        <p className="username">johndoe</p>
        <p className="role">User</p>
      </div>
    </div>

    <ul className="nav-links">
      <li onClick={() => setActiveTab('dashboard')}>
        <FaHome /> Dashboard
      </li>
      <li onClick={() => setActiveTab('place-order')}>
        <FaPlus /> Place Order
      </li>
      <li onClick={() => setActiveTab('my-orders')}>
        <FaListAlt /> My Orders
      </li>
      <li onClick={() => setActiveTab('profile')}>
        <FaUser /> Profile
      </li>
    </ul>
  </div>

  <button className="logout-btn" onClick={() => navigate('/login')}>
    <FaSignOutAlt /> Logout
  </button>
</div>
  );
};

export default Sidebar;
