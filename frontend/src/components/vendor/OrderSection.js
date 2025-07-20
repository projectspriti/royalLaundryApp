

import React from 'react';
import '../../styles/vendor/orders_section.css';

const OrderTable = ({ title, orders }) => {
  // Group by Order ID + Customer
  const grouped = orders.reduce((acc, order) => {
    const key = `${order.id}-${order.customer}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div className="order-card">
      <h3 className="order-status">{title}</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Cloth</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([key, items], index) => {
            const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
            const { id, customer } = items[0];
            return (
              <React.Fragment key={index}>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{i === 0 ? id : ''}</td>
                    <td>{i === 0 ? customer : ''}</td>
                    <td>{item.service}</td>
                    <td>{item.cloth}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="4" className="text-right">Total Quantity</td>
                  <td>{totalQty}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const OrderSection = () => {
  const pendingOrders = [
    { id: 1, customer: 'Amit Sharma', service: 'Dry Cleaning', cloth: 'Shirt', quantity: 3 },
    { id: 1, customer: 'Amit Sharma', service: 'Washing', cloth: 'Trousers', quantity: 2 },
    { id: 2, customer: 'Amit Sharma', service: 'Washing', cloth: 'Trousers', quantity: 2 }

  ];

  const completedOrders = [
    { id: 2, customer: 'Sneha Patil', service: 'Washing', cloth: 'Jeans', quantity: 1 },
    { id: 2, customer: 'Sneha Patil', service: 'Ironing', cloth: 'Kurti', quantity: 2 }
  ];

  const cancelledOrders = [
    { id: 3, customer: 'Rahul Deshmukh', service: 'Dry Cleaning', cloth: 'Jacket', quantity: 1 }
  ];

  return (
    <div className="vendor-orders-wrapper">
      <h2>Customer Orders</h2>
      <OrderTable title="Pending Orders" orders={pendingOrders} />
      <OrderTable title="Completed Orders" orders={completedOrders} />
      <OrderTable title="Cancelled Orders" orders={cancelledOrders} />
    </div>
  );
};

export default OrderSection;
