// // src/components/customer/PlaceOrder.js
// import React, { useState } from 'react';
// import '../../styles/customer/placeOrder.css';

// const PlaceOrder = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     service: '',
//     clothType: '',
//     quantity: 1,
//     vendor: '',
//     price: 0,
//     address: '123 Default Street, City'
//   });

//   const availableVendors = [
//     { name: 'Vendor A', price: 50 },
//     { name: 'Vendor B', price: 60 },
//     { name: 'Vendor C', price: 45 },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleVendorSelect = (vendor) => {
//     setFormData(prev => ({ ...prev, vendor: vendor.name, price: vendor.price }));
//     setStep(3);
//   };

//   const handleConfirm = () => {
//     alert('Order Confirmed!');
//     // Reset or redirect logic here
//   };

//   return (
//     <div className="place-order-container">
//       {step === 1 && (
//         <div className="step-form">
//           <h2>Place New Order</h2>
//           <label>Service</label>
//           <select name="service" value={formData.service} onChange={handleChange}>
//             <option value="">Select Service</option>
//             <option value="Washing">Washing</option>
//             <option value="Ironing">Ironing</option>
//             <option value="Dry Cleaning">Dry Cleaning</option>
//           </select>

//           <label>Cloth Type</label>
//           <select name="clothType" value={formData.clothType} onChange={handleChange}>
//             <option value="">Select Cloth Type</option>
//             <option value="Shirt">Shirt</option>
//             <option value="Trousers">Trousers</option>
//             <option value="Bedsheet">Bedsheet</option>
//           </select>

//           <label>Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             min="1"
//             value={formData.quantity}
//             onChange={handleChange}
//           />

//           <button onClick={() => setStep(2)}>Next</button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="step-vendors">
//           <h2>Choose a Vendor</h2>
//           {availableVendors.map(vendor => (
//             <div
//               key={vendor.name}
//               className={`vendor-card ${formData.vendor === vendor.name ? 'selected' : ''}`}
//               onClick={() => handleVendorSelect(vendor)}
//             >
//               <h4>{vendor.name}</h4>
//               <p>Price: ₹{vendor.price} per item</p>
//             </div>
//           ))}
//           <button onClick={() => setStep(1)}>Back</button>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Order Summary</h2>
//             <p><strong>Service:</strong> {formData.service}</p>
//             <p><strong>Cloth Type:</strong> {formData.clothType}</p>
//             <p><strong>Quantity:</strong> {formData.quantity}</p>
//             <p><strong>Vendor:</strong> {formData.vendor}</p>
//             <p><strong>Total Price:</strong> ₹{formData.quantity * formData.price}</p>

//             <label>Delivery Address</label>
//             <textarea
//               name="address"
//               rows="3"
//               value={formData.address}
//               onChange={handleChange}
//             ></textarea>

//             <div className="modal-buttons">
//               <button onClick={() => setStep(2)}>Change Vendor</button>
//               <button className="confirm-btn" onClick={handleConfirm}>Confirm Order</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaceOrder;


// src/components/customer/PlaceOrder.js
import React, { useState } from 'react';
import '../../styles/customer/placeOrder.css';

const PlaceOrder = () => {
  const [step, setStep] = useState(1);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [formData, setFormData] = useState({
    service: '',
    clothType: '',
    quantity: 1,
    vendor: '',
    price: 0,
    address: '123 Default Street, City',
  });

  const availableVendors = [
    { name: 'Vendor A', price: 50 },
    { name: 'Vendor B', price: 60 },
    { name: 'Vendor C', price: 45 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorSelect = (vendor) => {
    setFormData(prev => ({
      ...prev,
      vendor: vendor.name,
      price: vendor.price,
    }));
    setStep(3);
  };

  const handleConfirm = () => {
    alert('Order Confirmed!');
    // Reset or redirect logic here
  };

  return (
    <div className="place-order-container">
      {step === 1 && (
        <div className="step-form">
          <h2>Place New Order</h2>
          <label>Service</label>
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="">Select Service</option>
            <option value="Washing">Washing</option>
            <option value="Ironing">Ironing</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
          </select>

          <label>Cloth Type</label>
          <select name="clothType" value={formData.clothType} onChange={handleChange}>
            <option value="">Select Cloth Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Trousers">Trousers</option>
            <option value="Bedsheet">Bedsheet</option>
          </select>

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />

          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-vendors">
          <h2>Choose a Vendor</h2>
          {availableVendors.map(vendor => (
            <div
              key={vendor.name}
              className={`vendor-card ${formData.vendor === vendor.name ? 'selected' : ''}`}
              onClick={() => handleVendorSelect(vendor)}
            >
              <h4>{vendor.name}</h4>
              <p>Price: ₹{vendor.price} per item</p>
            </div>
          ))}
          <button onClick={() => setStep(1)}>Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Order Summary</h2>
            <p><strong>Service:</strong> {formData.service}</p>
            <p><strong>Cloth Type:</strong> {formData.clothType}</p>
            <p><strong>Quantity:</strong> {formData.quantity}</p>
            <p><strong>Vendor:</strong> {formData.vendor}</p>
            <p><strong>Total Price:</strong> ₹{formData.quantity * formData.price}</p>

            <div className="address-section">
              <strong>Delivery Address:</strong>
              {isEditingAddress ? (
                <>
                  <textarea
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                  <div className="modal-buttons">
                    <button onClick={() => setIsEditingAddress(false)}>Save Address</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="static-address">{formData.address}</p>
                  <button className="edit-btn" onClick={() => setIsEditingAddress(true)}>Edit Address</button>
                </>
              )}
            </div>

            <div className="modal-buttons">
              <button onClick={() => setStep(2)}>Change Vendor</button>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
