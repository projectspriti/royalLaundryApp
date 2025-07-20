import React from 'react';
import '../../styles/admin/topbar.css';

const Topbar = () => {
  return (
    <div className="admin-topbar">
      <h2>Admin Dashboard</h2>
      <div className="admin-profile">
        <span>👤 admin</span>
      </div>
    </div>
  );
};

export default Topbar;
