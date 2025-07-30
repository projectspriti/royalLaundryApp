import React, { useState, useEffect } from 'react';
import vendorData from '../../context/laundry_vendors.json';
// import vendorData from '../context/laundry_vendors.json';
import '../../styles/bookOrder.css';
import '../../styles/confirmOrder.css';
import '../../styles/selectedList.css';

import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ConfirmOrder({ selectedItems, vendor, total, onClose }) {
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="modal-overlay" >
      <div className="modal-content" style={{background:"white",borderRadius:"20px"}}>
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
      {/* <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
        </div>
      </div> */}

      <div className="selected-list-wrapper mt-3">
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

const PlaceOrder = ({user}) => {
  const navigate = useNavigate();
  const [clothType, setClothType] = useState('');
  const [service, setService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [priceList, setPriceList] = useState({});
  const [showSelectedList, setShowSelectedList] = useState(false); 
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

  useEffect(() => {
    const unifiedPriceList = {};
    vendorData.vendors.forEach((vendor) => {
      const services = vendor.services;
      Object.entries(services).forEach(([cloth, serviceTypes]) => {
        if (!unifiedPriceList[cloth]) unifiedPriceList[cloth] = {};
        Object.entries(serviceTypes).forEach(([svc, price]) => {
          if (!unifiedPriceList[cloth][svc]) unifiedPriceList[cloth][svc] = [];
          unifiedPriceList[cloth][svc].push(price);
        });
      });
    });

    const averagedPriceList = {};
    Object.entries(unifiedPriceList).forEach(([cloth, services]) => {
      averagedPriceList[cloth] = {};
      Object.entries(services).forEach(([svc, prices]) => {
        const avg = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
        averagedPriceList[cloth][svc] = avg;
      });
    });

    setPriceList(averagedPriceList);
  }, []);

  const handleAddItem = () => {
    if (clothType && service && quantity > 0) {
      setItems([...items, { clothType, service, quantity }]);
      setClothType('');
      setService('');
      setQuantity(1);
    }
  };

  const getAllUniqueServices = () => {
    const allServices = Object.values(priceList)
      .flatMap((services) => Object.keys(services));
    return Array.from(new Set(allServices));
  };

  const handleClothChange = (newClothType) => {
    setClothType(newClothType);
  };

  const handleGoToNext = () => {
    setShowSelectedList(true); // 👈 Set visibility to true
  };

  return (
    <>
      {/* <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">PLACE Order</h1>
        </div>
      </div> */}

      <div className="laundry-table-wrapper">
        <table className="laundry-order-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Type of Cloth</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </td>

              <td>
                <select
                  value={clothType}
                  onChange={(e) => handleClothChange(e.target.value)}
                >
                  <option value="">Select Cloth</option>
                  {clothtypes.map((clothtype) => (
                    <option key={clothtype.id} value={clothtype.id}>{clothtype.name}</option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Qty"
                />
              </td>

              <td>
                <button
                  onClick={handleAddItem}
                  className="confirm-btn"
                  disabled={!(clothType && service && quantity > 0)}
                >
                  Confirm
                </button>
              </td>
            </tr>

            {items.map((item, index) => (
              <tr key={index}>
                <td>{services.filter(s=> s.id==item.service)[0].name}</td>
                <td>{clothtypes.filter(c=> c.id==item.service)[0].name}</td>
                <td>{item.quantity}</td>
                <td>✔</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button 
            onClick={handleGoToNext}
            className="place-order-btn"
          >
            Go to Next
          </button>
        </div>

        {showSelectedList && (
          <SelectedList items={items} />
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
