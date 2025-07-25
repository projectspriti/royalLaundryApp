import React, { useState, useEffect } from 'react';
import vendorData from '../context/laundry_vendors.json';
import '../styles/bookOrder.css';
import { useNavigate } from 'react-router-dom';

const BookOrder = () => {
  const navigate = useNavigate();
  const [clothType, setClothType] = useState('');
  const [service, setService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [priceList, setPriceList] = useState({});

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
    if (newClothType && service) {
      const validServices = Object.keys(priceList[newClothType] || {});
      if (!validServices.includes(service)) setService('');
    }
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">PLACE Order</h1>
        </div>
      </div>

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
                  {clothType
                    ? Object.keys(priceList[clothType] || {}).map((svc) => (
                        <option key={svc} value={svc}>{svc}</option>
                      ))
                    : getAllUniqueServices().map((svc) => (
                        <option key={svc} value={svc}>{svc}</option>
                      ))}
                </select>
              </td>

              <td>
                <select
                  value={clothType}
                  onChange={(e) => handleClothChange(e.target.value)}
                >
                  <option value="">Select Cloth</option>
                  {Object.keys(priceList).map((cloth) => (
                    <option key={cloth} value={cloth}>{cloth}</option>
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
                <td>{item.service}</td>
                <td>{item.clothType}</td>
                <td>{item.quantity}</td>
                <td>✔</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button
            onClick={() => navigate('/selectedList', { state: { items } })}
            className="place-order-btn"
          >
            Go to Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BookOrder;


