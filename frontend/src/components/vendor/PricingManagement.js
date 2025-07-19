// // import React from 'react';
// // import '../../styles/vendor/pricing.css';
// // import { FaCog } from 'react-icons/fa';

// // const PricingManagement = () => {
// //   return (
// //     <div className="pricing-card">
// //        <h2 className="pricing-title">Add Service Pricing</h2>
// //      {/* <p className="pricing-subtitle">Set your prices for different cloth types and services</p> */}

// //       <div className="pricing-form">
// //         <div>
// //           <label>Cloth Type</label>
// //           <select><option>Select cloth type</option></select>
// //         </div>
// //         <div>
// //           <label>Service Type</label>
// //           <select><option>Select service type</option></select>
// //         </div>
// //         <div>
// //           <label>Price (₹)</label>
// //           <input type="text" placeholder="Enter price" />
// //         </div>
// //       </div>
// //       <button className="add-button">Add Pricing</button>
// //     </div>
// //   );
// // };

// // export default PricingManagement;




// import React, { useState } from 'react';
// import '../../styles/vendor/pricing.css';

// const PricingManagement = () => {
//   const [clothType, setClothType] = useState('');
//   const [serviceType, setServiceType] = useState('');
//   const [price, setPrice] = useState('');
//   const [pricingList, setPricingList] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleAddOrUpdate = () => {
//     if (!clothType || !serviceType || !price) return;

//     const newEntry = { clothType, serviceType, price };

//     if (editIndex !== null) {
//       const updatedList = [...pricingList];
//       updatedList[editIndex] = newEntry;
//       setPricingList(updatedList);
//       setEditIndex(null);
//     } else {
//       setPricingList([...pricingList, newEntry]);
//     }

//     setClothType('');
//     setServiceType('');
//     setPrice('');
//   };

//   const handleEdit = (index) => {
//     const entry = pricingList[index];
//     setClothType(entry.clothType);
//     setServiceType(entry.serviceType);
//     setPrice(entry.price);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const updatedList = pricingList.filter((_, i) => i !== index);
//     setPricingList(updatedList);
//   };

//   return (
//     <div className="pricing-management">
//       <h2>Add Service Pricing</h2>
//       <div className="form-row">
//         <div className="form-group">
//           <label>Cloth Type</label>
//           <select value={clothType} onChange={(e) => setClothType(e.target.value)}>
//             <option value="">Select cloth type</option>
//             <option value="Shirt">Shirt</option>
//             <option value="Trousers">Trousers</option>
//             <option value="Kurta">Kurta</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Service Type</label>
//           <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
//             <option value="">Select service type</option>
//             <option value="Washing">Washing</option>
//             <option value="Dry Cleaning">Dry Cleaning</option>
//             <option value="Ironing">Ironing</option>
//           </select>
//         </div>
//         <div className="form-group">
//           <label>Price (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <button className="add-btn" onClick={handleAddOrUpdate}>
//           {editIndex !== null ? 'Update' : 'Add Pricing'}
//         </button>
//       </div>

//       {pricingList.length > 0 && (
//         <div className="pricing-table">
//           <h3>Pricing List</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Cloth Type</th>
//                 <th>Service Type</th>
//                 <th>Price (₹)</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pricingList.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.clothType}</td>
//                   <td>{item.serviceType}</td>
//                   <td>{item.price}</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
//                     <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PricingManagement;






import React, { useState } from 'react';
import '../../styles/vendor/pricing.css';

const PricingManagement = () => {
  const [clothType, setClothType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [price, setPrice] = useState('');
  const [pricingList, setPricingList] = useState([]);

  const handleAddPricing = () => {
    if (clothType && serviceType && price) {
      const newEntry = { clothType, serviceType, price };
      setPricingList([...pricingList, newEntry]);
      setClothType('');
      setServiceType('');
      setPrice('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleDelete = (index) => {
    const updatedList = pricingList.filter((_, i) => i !== index);
    setPricingList(updatedList);
  };

  const handleEdit = (index) => {
    const item = pricingList[index];
    setClothType(item.clothType);
    setServiceType(item.serviceType);
    setPrice(item.price);
    handleDelete(index);
  };

  return (
    <div className="pricing-card">
      <div className="pricing-title">Add Service Pricing</div>

      <div className="pricing-form">
        <div>
          <label>Cloth Type</label>
          <select value={clothType} onChange={(e) => setClothType(e.target.value)}>
            <option value="">Select cloth type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Saree">Saree</option>
            <option value="Towel">Towel</option>
          </select>
        </div>

        <div>
          <label>Service Type</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="">Select service type</option>
            <option value="Washing">Washing</option>
            <option value="Ironing">Ironing</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
          </select>
        </div>

        <div>
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="add-button-wrapper">
          <button className="add-button" onClick={handleAddPricing}>
            Add Pricing
          </button>
        </div>
      </div>

      <h3 className="pricing-list-title">Pricing List</h3>
      <table className="pricing-table">
        <thead>
          <tr>
            <th>Cloth Type</th>
            <th>Service Type</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pricingList.map((item, index) => (
            <tr key={index}>
              <td>{item.clothType}</td>
              <td>{item.serviceType}</td>
              <td>{item.price}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingManagement;

