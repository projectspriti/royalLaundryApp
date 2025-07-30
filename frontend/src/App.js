import React, {useEffect, useState} from 'react';
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
import AdminDashboard from './pages/AdminDashboard'
import ServiceDetails from './pages/ServiceDetails';

const App = () => {
  const location = useLocation();

  // Hide Navbar and Footer only on these dashboard routes
  const hideLayout = location.pathname.includes('/dashboard');// || location.pathname === '/vendor/dashboard';
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    phone:"",
    usertype: "0"
  })

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      {!hideLayout && <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} 
      <Routes>
        <Route path="/" element={<><Home /></>} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile  user={user} setUser={setUser}/>} />
        <Route path="/book-order" element={<BookOrder />} />
        <Route path="/login" element={<Signin setUser={setUser}/>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/selectedList" element={<SelectedList />} />

        {/* Static dashboards (no Navbar/Footer) */}
        {user.usertype === 0 && <>
          <Route path="/customer/dashboard" element={<CustomerDashboard user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        </>
        }

        {user.usertype === 1 && <>
          <Route path="/vendor/dashboard" element={<VendorDashboard user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        </>
        }

        {user.usertype === 2 && <>
          <Route path='/admin/dashboard' element={<AdminDashboard user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        </>
        }

          
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
