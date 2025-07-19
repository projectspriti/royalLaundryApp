// import React from 'react';
// import '../../styles/vendor/dashboard_stats.css';

// const DashboardStats = () => {
//   return (
//     <div className="stats-container">
//       <div className="stat-card">Total Orders <strong>0</strong></div>
//       <div className="stat-card">Pending Orders <strong>0</strong></div>
//       <div className="stat-card">Completed Orders <strong>0</strong></div>
//       <div className="stat-card">Total Revenue <strong>₹0</strong></div>
//     </div>
//   );
// };

// export default DashboardStats;

// import React from 'react';
// import { FaShoppingCart, FaClock, FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
// import '../../styles/vendor/dashboard_stats.css';

// const DashboardStats = () => {
//   const stats = [
//     { label: 'Total Orders', value: 0, icon: <FaShoppingCart className="stat-icon" /> },
//     { label: 'Pending Orders', value: 0, icon: <FaClock className="stat-icon" /> },
//     { label: 'Completed Orders', value: 0, icon: <FaCheckCircle className="stat-icon" /> },
//     { label: 'Total Revenue', value: '₹0', icon: <FaRupeeSign className="stat-icon" /> },
//   ];

//   return (
//     <div className="stats-container">
//       {stats.map((stat, index) => (
//         <div key={index} className="stat-card">
//           <div className="stat-header">
//             <span className="stat-label">{stat.label}</span>
//             {stat.icon}
//           </div>
//           <div className="stat-value">{stat.value}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashboardStats;



import React from 'react';
import { FaShoppingCart, FaClock, FaCheckCircle, FaRupeeSign } from 'react-icons/fa';
import '../../styles/vendor/dashboard_stats.css';

const DashboardStats = () => {
  const stats = [
    { label: 'Total Orders', value: 0, icon: <FaShoppingCart className="stat-icon" /> },
    { label: 'Pending Orders', value: 0, icon: <FaClock className="stat-icon" /> },
    { label: 'Completed Orders', value: 0, icon: <FaCheckCircle className="stat-icon" /> },
    { label: 'Total Revenue', value: '₹0', icon: <FaRupeeSign className="stat-icon" /> },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-text">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
          {stat.icon}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
