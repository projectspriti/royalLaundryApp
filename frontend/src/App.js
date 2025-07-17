// // import React, { useEffect } from 'react'
// // import { Route, Routes } from 'react-router-dom'
// // import Home from './pages/Home'
// // import Services from './pages/Services'
// // import Orders from './pages/Orders'
// // import Profile from './pages/Profile'
// // import BookOrder from './pages/BookOrder'
// // import Navbar from './components/Navbar'
// // import Signin from './auth/Signin'
// // import Signup from './auth/Signup'
// // import ForgotPassword from './auth/ForgotPassword'
// // import Footer from './components/Footer'
// // import Contact from './pages/Contact'
// // import SelectedList from './pages/SelectedList'
// // import Customer_dash from './pages/Customer_dash'

// // const App = () => {

// //   const [user, setUser] = React.useState({
// //     email: "",
// //     name: "",
// //     phone: "",
// //     usertype: "0"
// //   })

// //   useEffect(() => {
// //     console.log(user);
// //   }, [user]);
// //   return (
// //     <div>
// //       <Navbar user={user} setUser={setUser} />
// //       <Routes>
// //         <Route path='/' element={<Home />} />
// //         <Route path='/services' element={<Services />} />
// //         <Route path='/orders' element={<Orders />} />
// //         <Route path='/profile' element={<Profile />} />
// //         <Route path='/book-order' element={<BookOrder />} />
// //         <Route path='/login' element={<Signin setUser={setUser} />} />
// //         <Route path='/register' element={<Signup />} />
// //         <Route path='/forgot-password' element={<ForgotPassword />} />
// //         <Route path='/contact' element={<Contact />} />
// //         <Route path='/selectedList' element={<SelectedList />} />
// //       </Routes>
// //       <Footer />
// //     </div>
// //   )
// // }

// // export default App



// import React, { useEffect } from 'react'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Services from './pages/Services'
// import Orders from './pages/Orders'
// import Profile from './pages/Profile'
// import BookOrder from './pages/BookOrder'
// import Navbar from './components/Navbar'
// import Signin from './auth/Signin'
// import Signup from './auth/Signup'
// import ForgotPassword from './auth/ForgotPassword'
// import Footer from './components/Footer'
// import Contact from './pages/Contact'
// import SelectedList from './pages/SelectedList'
// import CustomerDashboard from './pages/Customer_dash'
// import VendorDashboard from './pages/Vendor_dash'
// // import Customer_dash from './pages/Customer_dash'

// const App = () => {
//   const [user, setUser] = React.useState({
//     email: "",
//     name: "",
//     phone: "",
//     usertype: "0"
//   })

//   const location = useLocation();
//   const hideLayout = location.pathname.startsWith('/dashboard');

//   useEffect(() => {
//     console.log(user);
//   }, [user]);

//   return (
//     <div>
//       {/* Only show Navbar/Footer if not on /dashboard */}
//       {!hideLayout && <Navbar user={user} setUser={setUser} />}
      

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/services' element={<Services />} />
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/book-order' element={<BookOrder />} />
//         <Route path='/login' element={<Signin setUser={setUser} />} />
//         <Route path='/register' element={<Signup />} />
//         <Route path='/forgot-password' element={<ForgotPassword />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/selectedList' element={<SelectedList />} />
//         {/* <Route path='/customer' element={<Customer_dash />} /> */}

//         <Route path="/dashboard" element={<CustomerDashboard />} />
//         <Route path="/vendor/dashboard" element={<VendorDashboard />}/>

//       </Routes>

//       {!hideLayout && <Footer />}
//     </div>
//   )
// }

// export default App


import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import BookOrder from './pages/BookOrder';
import Navbar from './components/Navbar';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import SelectedList from './pages/SelectedList';
import CustomerDashboard from './pages/Customer_dash';
import VendorDashboard from './pages/Vendor_dash';

const App = () => {
  const location = useLocation();

  // Hide Navbar and Footer only on these dashboard routes
  const hideLayout = location.pathname === '/dashboard' || location.pathname === '/vendor/dashboard';

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book-order" element={<BookOrder />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/selectedList" element={<SelectedList />} />

        {/* Static dashboards (no Navbar/Footer) */}
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
