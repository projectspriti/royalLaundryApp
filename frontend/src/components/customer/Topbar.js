import React from 'react';
import '../../styles/customer/topbar.css';
import { FaUserCircle } from 'react-icons/fa';
import ProfileNav from '../profilenav';

const Topbar = ({ user, setUser, setIsLoggedIn }) => {
  return (
    <div className="topbar">
      <h2>User Dashboard</h2>
      <div className="top-user">
        <span>{user.full_name}</span>
        <ProfileNav user={user} setIsLoggedIn={setIsLoggedIn} />

      </div>
    </div>
  );
};

export default Topbar;
