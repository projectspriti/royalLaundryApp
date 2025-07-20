import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/selectedList.css';
import vendorData from '../context/laundry_vendors.json';
import ConfirmOrder from './ConfirmOrder';

const SelectedList = () => {
  const location = useLocation();
  const selectedItems = location.state?.items || [];
  const { vendors } = vendorData;

  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

  const calculateTotal = (vendor) => {
    let total = 0;
    selectedItems.forEach(({ clothType, service, quantity }) => {
      const clothServices = vendor.services[clothType];
      if (clothServices && clothServices[service] != null) {
        total += clothServices[service] * quantity;
      }
    });
    return total;
  };

  const handlePlaceOrder = (vendor) => {
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
        </div>
      </div>

      <div className="selected-list-wrapper">
        <div className="horizontal-card-container">
          {visibleVendors.map((vendor, idx) => {
            const totalPrice = calculateTotal(vendor);
            return (
              <div key={idx} className="minimal-card">
                <img
                  src={vendor.image_url}
                  alt={vendor.name}
                  className="minimal-card-image"
                />
                <div className="minimal-card-content">
                  <div className="minimal-card-header">
                    <h2>{vendor.name}</h2>
                    <span className="minimal-price">₹{totalPrice}</span>
                  </div>
                  <p className="minimal-location">{vendor.location}</p>
                  <button
                    className="minimal-order-btn"
                    onClick={() => handlePlaceOrder(vendor)}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {vendors.length > 4 && (
          <div className="show-more-wrapper">
            <button
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>

      {/* Modal rendering */}
      {showModal && selectedVendor && (
        <ConfirmOrder
          selectedItems={selectedItems}
          vendor={selectedVendor}
          total={calculateTotal(selectedVendor)}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SelectedList;
