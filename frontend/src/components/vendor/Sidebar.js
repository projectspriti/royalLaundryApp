// import React from 'react';
// import { FaHome, FaPlus, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import '../../styles/vendor/sidebar.css';

// const Sidebar = ({ setActiveTab }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="vendor-sidebar">
//       <div className="sidebar-content">
//         <h2 className="logo">RoyalLaundry</h2>
//         <div className="profile">
//           <div className="avatar">👤</div>
//           <div>
//             <p className="username">johndoe</p>
//             <p className="role">Vendor</p>
//           </div>
//         </div>

//         <ul className="nav-links">
//           <li onClick={() => navigate('/dashboard')}>
//             <FaHome /> Dashboard
//           </li>
//           <li onClick={() => navigate('/book-')}>
//             <FaListAlt /> Order Status
//           </li>
//           <li onClick={() => navigate('/orders')}>
//             <FaPlus /> Add Services
//           </li>
//           <li onClick={() => navigate('/profile')}>
//             <FaUser /> Profile
//           </li>
//         </ul>
//       </div>

//       <button className="logout-btn" onClick={() => navigate('/login')}>
//         <FaSignOutAlt /> Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;




// Sidebar.js
import React from 'react';
import { FaHome, FaPlus, FaListAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/vendor/sidebar.css';

const Sidebar = ({ setActiveTab, user, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="vendor-sidebar">
      <div className="sidebar-content">
        <a href='/'><h2 className="logo">RoyalLaundry</h2></a>
        <div className="profile">
          <div className="avatar">👤</div>
          <div>
            <p className="username">{user.full_name}</p>
            <p className="role">Vendor</p>
          </div>
        </div>

        <ul className="nav-links">
          <li onClick={() => setActiveTab('dashboard')}>
            <FaHome /> Dashboard
          </li>
          <li onClick={() => setActiveTab('orders')}>
            <FaListAlt /> Order Status
          </li>
          <li onClick={() => setActiveTab('add-service')}>
            <FaPlus /> Add Services
          </li>
          <li onClick={() => setActiveTab('profile')}>
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

