import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import axios from 'axios';
import ProfileNav from './profilenav';

const Navbar = ({user, setUser, isLoggedIn, setIsLoggedIn}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in by checking for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Re-check on route changes

  useEffect(() => {
    if(user?.email)
      return;

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');

    if(!userid || !token)
      return;
    axios.get(
      `/api/user/getuser/${userid}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then(userDetailsResponse => {
      setUser(userDetailsResponse.data);
    });
  }, []);

  const isActive = (path) => location.pathname === path;

  //css

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div>
        <Link to="/" style={styles.link}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={styles.links}>
        <Link to="/" style={isActive('/') ? styles.activeLink : styles.link}>Home</Link>
        <Link
          to={user.usertype == 1 ? "/vendor/dashboard" : user.usertype===0 ? "/customer/dashboard" : user.usertype===2 ? "/admin/dashboard":"#"}
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault(); // prevent default navigation
              navigate('/login'); // redirect to login
            }
          }}
          style={isActive('/vendor/dashboard') ? styles.activeLink : styles.link}
        >
          Dashboard
        </Link>
        {/* <Link to="/orders" style={isActive('/orders') ? styles.activeLink : styles.link}>Orders</Link>
        <Link to="/book-order" style={isActive('/book-order') ? styles.activeLink : styles.link}>Place Order</Link> */}
        <Link to="/contact" style={isActive('/contact') ? styles.activeLink : styles.link}>Contact Us</Link>
      </div>

      {/* Auth Section */}
      <div style={styles.buttondiv}>
        {isLoggedIn ? (
          <ProfileNav user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          // Login and Register Buttons
          <>
            <Link to="/login" style={styles.button}>Login</Link>
            <Link to="/register" style={styles.button1}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 50px',
    borderBottom: '1px solid #ccc',
  },
  logoImage: {
    width: '120px',
    height: 'auto',
  },
  links: {
    display: 'flex',
    gap: '24px',
  },
  link: {
    textDecoration: 'none',
    color: '#111',
    fontWeight: '500',
    fontSize: '1.1rem',
    transition: 'color 0.3s',
  },
  activeLink: {
    textDecoration: 'none',
    color: '#471396',
    fontWeight: '700',
    borderBottom: '2px solid #471396',
    fontSize: '1.1rem',
  },
  button: {
    padding: '10px 25px',
    backgroundColor: '#471396',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  },
  button1: {
    padding: '10px 25px',
    color: '#111',
    border: '1px solid #471396',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  },
  buttondiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    minWidth: '180px',
    zIndex: 1000,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '0.95rem',
    fontWeight: '500',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderBottom: '1px solid #f0f0f0',
  },
  dropdownIcon: {
    width: '16px',
    height: '16px',
    opacity: 0.7,
  },
};

export default Navbar;





