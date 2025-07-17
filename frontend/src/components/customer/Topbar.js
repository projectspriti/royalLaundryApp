import React from 'react';
import '../../styles/customer/topbar.css';
import { FaUserCircle } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="topbar">
      <h2>User Dashboard</h2>
      <div className="top-user">
        <FaUserCircle size={20} />
        <span>johndoe</span>
      </div>
    </div>
  );
};

export default Topbar;
