// import React from 'react';
// import Sidebar from '../components/vendor/Sidebar';
// import Topbar from '../components/vendor/Topbar';
// import DashboardStats from '../components/vendor/DashboardStats';
// import PricingManagement from '../components/vendor/PricingManagement';
// import '../styles/vendor/vendor_dash.css';

// const Vendor_dash = () => {
//   return (
//     <div className="vendor-dashboard">
//       <Sidebar />
//       <div className="main-content">
//         <Topbar />
//         <DashboardStats />
//         <PricingManagement />
//       </div>
//     </div>
//   );
// };

// export default Vendor_dash;

// vendor_dash.js
import React, { useState } from 'react';
import Sidebar from '../components/vendor/Sidebar';
import Topbar from '../components/vendor/Topbar';
import DashboardStats from '../components/vendor/DashboardStats';
import PricingManagement from '../components/vendor/PricingManagement';
import OrdersSection from '../components/vendor/OrderSection';
import '../styles/vendor/vendor_dash.css';

const Vendor_dash = () => {
  const [activeTab, setActiveTab] = useState('pricing');

  return (
    <div className="vendor-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <DashboardStats />

        <div className="tab-buttons">
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}>Orders</button>
          <button 
            className={activeTab === 'pricing' ? 'active' : ''} 
            onClick={() => setActiveTab('pricing')}>Pricing Management</button>
        </div>

        <div className="tab-content">
          {activeTab === 'pricing' && <PricingManagement />}
          {activeTab === 'orders' && <OrdersSection />}
        </div>
      </div>
    </div>
  );
};

export default Vendor_dash;