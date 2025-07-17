import React from 'react';
import '../../styles/vendor/pricing.css';

const PricingManagement = () => {
  return (
    <div className="pricing-wrapper">
      <h3>Add Service Pricing</h3>
      <div className="pricing-form">
        <select><option>Select cloth type</option></select>
        <select><option>Select service type</option></select>
        <input type="text" placeholder="Enter price" />
        <button>Add Pricing</button>
      </div>
      <h4>Current Pricing</h4>
      <div className="current-pricing">
        <p>Jacket - Starch <span>₹0.02</span></p>
        <button className="edit">✏️</button>
        <button className="delete">🗑️</button>
      </div>
    </div>
  );
};

export default PricingManagement;