import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/customer/QuickActions.css'
const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <button onClick={() => navigate('/book-order')} className="btn primary">+ Place New Order</button>
      <button onClick={() => navigate('/vendors')} className="btn secondary">Find Vendors</button>
      <button onClick={() => navigate('/orders')} className="btn secondary">Order History</button>
    </div>
  );
};

export default QuickActions;
