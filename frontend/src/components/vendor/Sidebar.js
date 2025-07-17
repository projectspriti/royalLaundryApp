// import React from 'react';
// import { FaClipboardList, FaRupeeSign } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import '../../styles/vendor/sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2 className="logo">LaundryHub</h2>
//       <div className="sidebar-user">
//         <div className="avatar">👔</div>
//         <div>
//           <p className="username">Vendor</p>
//           <p className="role">Vendor Panel</p>
//         </div>
//       </div>
//       <ul className="sidebar-menu">
//         <li><Link to="/vendor/dashboard"><FaClipboardList /> Dashboard</Link></li>
//         <li><Link to="/vendor/pricing"><FaRupeeSign /> Pricing</Link></li>
//       </ul>
//       <div className="logout-btn">
//         <button><FiLogOut /> Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { FaHome, FaPlus, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/vendor/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
  
    <div className="sidebar">
  <div className="sidebar-content">
    <h2 className="logo">LaundryHub</h2>
    <div className="profile">
      <div className="avatar">👤</div>
      <div>
        <p className="username">johndoe</p>
        <p className="role">Vendor</p>
      </div>
    </div>

    <ul className="nav-links">
      <li onClick={() => navigate('/dashboard')}>
        <FaHome /> Dashboard
      </li>
      <li onClick={() => navigate('/book-')}>
       <FaListAlt/>Order Status
      </li>
      <li onClick={() => navigate('/orders')}>
        <FaPlus/>Add Services
      </li>
      <li onClick={() => navigate('/profile')}>
        <FaUser /> Profile
      </li>
    </ul>
  </div>

  <button className="logout-btn" onClick={() => navigate('/login')}>
    <FaSignOutAlt /> Logout
  </button>
</div>
  );
};

export default Sidebar;
