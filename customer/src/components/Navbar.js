import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        <Link to="/services" style={isActive('/services') ? styles.activeLink : styles.link}>Services</Link>
        <Link to="/orders" style={isActive('/orders') ? styles.activeLink : styles.link}>Orders</Link>
        <Link to="/book-order" style={isActive('/book-order') ? styles.activeLink : styles.link}>Place Order</Link>
         <Link to="/contact" style={isActive('/contact') ? styles.activeLink : styles.link}>Contact Us</Link>
      </div>

      {/* Auth Button */}
      <div style={styles.buttondiv}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/registration" style={styles.button1}>Register</Link>
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
  color: '#471396', // New blue
  fontWeight: '700',
  borderBottom: '2px solid #471396', // New blue border
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
  buttondiv:{
display:"flex",
alignItems:"center",
justifyContent:"center",
gap:"10px"
  }
};

export default Navbar;
