
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

