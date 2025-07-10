// import React from 'react';
// import '../styles/confirmOrder.css';

// function ConfirmOrder({ selectedItems, vendor, total, onClose }) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Order Summary</h2>

//         <table className="order-table">
//           <thead>
//             <tr>
//               <th>Cloth Type</th>
//               <th>Service</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.clothType}</td>
//                 <td>{item.service}</td>
//                 <td>{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="vendor-info">
//           <h3>Selected Vendor</h3>
//           <p><strong>Name:</strong> {vendor.name}</p>
//           <p><strong>Location:</strong> {vendor.location}</p>
//           <p><strong>Total Price:</strong> ₹{total}</p>
//         </div>

//         <div className="modal-actions">
//           <button className="confirm-btn">Confirm Order</button>
//           <button className="cancel-btn" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConfirmOrder;


// import React from 'react';
// import '../styles/confirmOrder.css';

// function ConfirmOrder({ selectedItems, vendor, total, onClose }) {
//   const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Order Summary</h2>

//         {/* Order Table */}
//         <table className="order-table">
//           <thead>
//             <tr>
//               <th>Cloth Type</th>
//               <th>Service</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.clothType}</td>
//                 <td>{item.service}</td>
//                 <td>{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Total Quantity */}
//         <div className="total-quantity">
//           <strong>Total Quantity:</strong> {totalQuantity}
//         </div>

//         {/* Vendor Info */}
//         <div className="vendor-info">
//           <h3>Selected Vendor</h3>
//           <p><strong>Name:</strong> {vendor.name}</p>
//           <p><strong>Location:</strong> {vendor.location}</p>
//           <p><strong>Total Price:</strong> ₹{total}</p>
//         </div>

//         {/* Actions */}
//         <div className="modal-actions">
//           <button className="confirm-btn">Confirm Order</button>
//           <button className="cancel-btn" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConfirmOrder;


import React from 'react';
import '../styles/confirmOrder.css';

function ConfirmOrder({ selectedItems, vendor, total, onClose }) {
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Summary</h2>

        {/* Order Table */}
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Cloth Type</th>
                <th>Service</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.clothType}</td>
                  <td>{item.service}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Quantity Displayed Separately */}
        <div className="total-quantity">
          <strong>Total Quantity:</strong> {totalQuantity}
        </div>

        {/* Vendor Info Section */}
        <div className="vendor-info">
          <h3>Selected Vendor</h3>
          <p><strong>Name:</strong> {vendor.name}</p>
          <p><strong>Location:</strong> {vendor.location}</p>
          <p><strong>Total Price:</strong> ₹{total}</p>
        </div>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="confirm-btn">Confirm Order</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
