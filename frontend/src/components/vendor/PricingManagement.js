import React, { useEffect, useState } from 'react';
import serviceData from '../../context/service.json';
import '../../styles/vendor/pricing.css';
import axios from 'axios';

const PricingManagement = ({ user }) => {
  const [clothType, setClothType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [price, setPrice] = useState('');
  const [services, setServices] = useState([]);
  const [clothtypes, setClothtypes] = useState([]);
  const [pricingList, setPricingList] = useState([]);

  useEffect(() => {
    async function getServices() {

      try {
        return (await axios.get('/api/services')).data;
      } catch (error) {
        alert("Server ERROR!!! Unable to fetch services")
        return []
      }
    }

    getServices().then(services => setServices(services))
  }, [])

  useEffect(() => {
    async function getClothtypes() {

      try {
        return (await axios.get('/api/cloth-types')).data;
      } catch (error) {
        alert("Server ERROR!!! Unable to fetch Cloth types")
        return []
      }
    }

    getClothtypes().then(services => setClothtypes(services))
  }, [])

  useEffect(() => {
    async function getPricing() {

      try {
        return (await axios.get(`/api/pricing/${user.email}`)).data;
      } catch (error) {
        alert("Server ERROR!!! Unable to fetch Cloth types")
        return []
      }
    }

    getPricing().then(pricing => setPricingList(pricing))
  }, [])

  const handleAddPricing = async () => {
    if (clothType && serviceType && price) {

      try {
        await axios.post('/api/pricing/add', { cloth_id: clothType, service_id:serviceType, price, email: user.email })
        const pricing = (await axios.get(`/api/pricing/${user.email}`)).data
        console.log('pricing', pricing);

        setPricingList(pricing)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleDelete = async (id) => {

    if(window.confirm(`Delete the selected pricing?`) == true){  
      try {
        await axios.delete(`/api/pricing/${id}`)
        const pricing = (await axios.get(`/api/pricing/${user.email}`)).data

        setPricingList(pricing)
      } catch (error) {
        console.log(error)
      }
    } 
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
          <select
            value={clothType}
            onChange={(e) => {
              setClothType(e.target.value);
              setServiceType('');
            }}
          >
            <option value="">Select cloth type</option>
            {clothtypes.map(cloth => (
              <option key={cloth.id} value={cloth.id}>{cloth.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            disabled={!clothType}
          >
            <option value="">Select service type</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="Enter your price"
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
          {pricingList.map((item) => (
            <tr key={item.id}>
              <td>{item.clothtype}</td>
              <td>{item.service}</td>
              <td>{item.price}</td>
              <td>
                {/* <button className="edit-button" onClick={() => handleEdit(item.id)}>Edit</button> */}
                <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PricingManagement;
