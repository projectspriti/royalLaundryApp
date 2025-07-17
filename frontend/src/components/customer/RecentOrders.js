import React from 'react';
import '../../styles/customer/RecentOrders.css'
const RecentOrders = () => {
  return (
    <div className="recent-orders">
      <h3>Recent Orders</h3>
      <div className="no-orders">
        <i className="fas fa-shopping-cart text-3xl text-gray-400"></i>
        <p>No orders yet</p>
        <span>Place your first order to get started</span>
      </div>
    </div>
  );
};

export default RecentOrders;
