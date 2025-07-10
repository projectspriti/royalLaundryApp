// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="card-container">
//           {vendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="card vendor-card">
//                 <img
//                   src={vendor.image_url}
//                   alt={vendor.name}
//                   className="vendor-image"
//                 />
//                 <h2>{vendor.name}</h2>
//                 <p className="location">{vendor.location}</p>
//                 <h3>Total Price: ₹{totalPrice}</h3>
//                 {/* Optional Buy Button */}
//                 {/* <button className="buy-now-btn">SELECT</button> */}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectedList;



// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const handlePlaceOrder = (vendor) => {
//     alert(`Order placed with ${vendor.name}!`);
//     // You can replace this with your actual order logic or navigation
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="card-container">
//           {vendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="card vendor-card">
//                 <img
//                   src={vendor.image_url}
//                   alt={vendor.name}
//                   className="vendor-image"
//                 />
//                 <h2>{vendor.name}</h2>
//                 <p className="location">{vendor.location}</p>
//                 <h3>Total Price: ₹{totalPrice}</h3>
//                 <button
//                   className="place-order-btn"
//                   onClick={() => handlePlaceOrder(vendor)}
//                 >
//                   Place Order
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectedList;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [visibleCount, setVisibleCount] = useState(4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const handleShowMore = () => {
//     setVisibleCount(vendors.length); // show all vendors
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="card-container">
//           {vendors.slice(0, visibleCount).map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="card vendor-card">
//                 <img
//                   src={vendor.image_url}
//                   alt={vendor.name}
//                   className="vendor-image"
//                 />
//                 <h2>{vendor.name}</h2>
//                 <p className="location">{vendor.location}</p>
//                 <h3>Total Price: ₹{totalPrice}</h3>
//                 <button
//                   className="place-order-btn"
//                   onClick={() => alert(`Order placed with ${vendor.name}`)}
//                 >
//                   Place Order
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Show More Button */}
//         {visibleCount < vendors.length && (
//           <div className="show-more-wrapper">
//             <button className="show-more-btn" onClick={handleShowMore}>
//               Show More
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [showAll, setShowAll] = useState(false);

//   const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const toggleShowAll = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="card-container">
//           {visibleVendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="card vendor-card">
//                 <img
//                   src={vendor.image_url}
//                   alt={vendor.name}
//                   className="vendor-image"
//                 />
//                 <h2>{vendor.name}</h2>
//                 <p className="location">{vendor.location}</p>
//                 <h3>Total Price: ₹{totalPrice}</h3>
//                 <button
//                   className="place-order-btn"
//                   onClick={() => alert(`Order placed with ${vendor.name}`)}
//                 >
//                   Place Order
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Show More / Less Button */}
//         {vendors.length > 4 && (
//           <div className="show-more-wrapper">
//             <button className="show-more-btn" onClick={toggleShowAll}>
//               {showAll ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [showAll, setShowAll] = useState(false);

//   const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const toggleShowAll = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="horizontal-card-container">
//           {visibleVendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="horizontal-card">
//                 <img src={vendor.image_url} alt={vendor.name} className="horizontal-card-image" />
//                 <div className="horizontal-card-content">
//                   <h2>{vendor.name}</h2>
//                   <p className="location">{vendor.location}</p>
//                   <h3>Total Price: ₹{totalPrice}</h3>
//                   <button
//                     className="place-order-btn"
//                     onClick={() => alert(`Order placed with ${vendor.name}`)}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Show More / Less Button */}
//         {vendors.length > 4 && (
//           <div className="show-more-wrapper">
//             <button className="show-more-btn" onClick={toggleShowAll}>
//               {showAll ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [showAll, setShowAll] = useState(false);
//   const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const toggleShowAll = () => setShowAll(!showAll);

//   return (
//     <>
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="dark-card-container">
//           {visibleVendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="dark-card">
//                 <div className="dark-card-img">
//                   <img src={vendor.image_url} alt={vendor.name} />
//                 </div>
//                 <div className="dark-card-content">
//                   <div className="dark-card-top">
//                     <h2>{vendor.name}</h2>
//                     <span className="dark-card-price">₹{totalPrice}</span>
//                   </div>
//                   <p>{vendor.location}</p>
//                   <button
//                     className="dark-card-btn"
//                     onClick={() => alert(`Order placed with ${vendor.name}`)}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {vendors.length > 4 && (
//           <div className="show-more-wrapper">
//             <button className="show-more-btn" onClick={toggleShowAll}>
//               {showAll ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';

// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [showAll, setShowAll] = useState(false);
//   const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   const toggleShowAll = () => setShowAll(!showAll);

//   return (
//     <>
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="dark-card-container">
//           {visibleVendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="dark-card">
//                 <div className="dark-card-img">
//                   <img src={vendor.image_url} alt={vendor.name} />
//                 </div>
//                 <div className="dark-card-content">
//                   <div className="dark-card-top">
//                     <h2>{vendor.name}</h2>
//                     <span className="dark-card-price">₹{totalPrice}</span>
//                   </div>
//                   <p>{vendor.location}</p>
//                   <button
//                     className="dark-card-btn"
//                     onClick={() => alert(`Order placed with ${vendor.name}`)}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {vendors.length > 4 && (
//           <div className="show-more-wrapper">
//             <button className="show-more-btn" onClick={toggleShowAll}>
//               {showAll ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/selectedList.css';
// import vendorData from '../context/laundry_vendors.json';
// import ConfirmOrder from './ConfirmOrder';


// const SelectedList = () => {
//   const location = useLocation();
//   const selectedItems = location.state?.items || [];
//   const { vendors } = vendorData;

//   const [showAll, setShowAll] = useState(false);
//   const visibleVendors = showAll ? vendors : vendors.slice(0, 4);

//   const calculateTotal = (vendor) => {
//     let total = 0;
//     selectedItems.forEach(({ clothType, service, quantity }) => {
//       const clothServices = vendor.services[clothType];
//       if (clothServices && clothServices[service] != null) {
//         total += clothServices[service] * quantity;
//       }
//     });
//     return total;
//   };

//   return (
//     <>
//       <div className="hero-section">
//         <div className="hero-overlay">
//           <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
//         </div>
//       </div>

//       <div className="selected-list-wrapper">
//         <div className="horizontal-card-container">
//           {visibleVendors.map((vendor, idx) => {
//             const totalPrice = calculateTotal(vendor);
//             return (
//               <div key={idx} className="minimal-card">
//                 <img
//                   src={vendor.image_url}
//                   alt={vendor.name}
//                   className="minimal-card-image"
//                 />
//                 <div className="minimal-card-content">
//                   <div className="minimal-card-header">
//                     <h2>{vendor.name}</h2>
//                     <span className="minimal-price">₹{totalPrice}</span>
//                   </div>
//                   <p className="minimal-location">{vendor.location}</p>
//                   <button
//                     className="minimal-order-btn"
//                     onClick={() => alert(`Order placed with ${vendor.name}`)}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {vendors.length > 4 && (
//           <div className="show-more-wrapper">
//             <button
//               className="show-more-btn"
//               onClick={() => setShowAll(!showAll)}
//             >
//               {showAll ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SelectedList;


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/selectedList.css';
import vendorData from '../context/laundry_vendors.json';
import ConfirmOrder from './ConfirmOrder';

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
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">AVAILABLE LAUNDRY VENDORS</h1>
        </div>
      </div>

      <div className="selected-list-wrapper">
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

export default SelectedList;
