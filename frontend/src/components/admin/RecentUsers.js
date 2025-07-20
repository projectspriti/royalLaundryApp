import React from 'react';
import '../../styles/admin/dashboard.css';

const users = [
  { name: 'admin', email: 'admin@laundryhub.com', role: 'Admin' },
  { name: 'CleanMax Laundry', email: 'contact@cleanmax.com', role: 'Vendor' },
  { name: 'johndoe', email: 'john@example.com', role: 'User' }
];

const RecentUsers = () => {
  return (
    <div className="dashboard-box">
      <h3 className="box-title">Recent User Registrations</h3>
      {users.map((user, idx) => (
        <div key={idx} className="user-entry">
          <div>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>
          <span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span>
        </div>
      ))}
    </div>
  );
};

export default RecentUsers;
