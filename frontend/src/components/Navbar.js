import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import logo from '../assets/logo.png';
import axios from 'axios';

const Navbar = ({user, setUser}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('token') ?? -1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Check if user is logged in by checking for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // Re-check on route changes

  useEffect(() => {
    if(user?.email || !localStorage.getItem('token'))
      return;

    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid'); 

    axios.get(
      `http://localhost:5000/api/user/getuser/${userid}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then(userDetailsResponse => {
      setUser(userDetailsResponse.data);
    });
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(-1);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showProfileDropdown]);


  //css
  const leftDropdownStyle = {
    position: 'absolute',
    top: '0',
    left: 'auto',
    right: '0vh',
    transform: 'translateX(-8px)', // Optional horizontal gap
    minWidth: '250px',
    zIndex: 1050,
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
    border: 'none',
    padding: '1rem',
    backgroundColor: '#fff',
  };
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

      {/* Auth Section */}
      <div style={styles.buttondiv}>
        {isLoggedIn ? (
          // Profile Icon with Dropdown
          <div className="profile-dropdown-container" style={styles.profileContainer}>
            <button 
              onClick={toggleProfileDropdown}
              style={styles.profileButton}
              aria-label="Profile menu"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={styles.profileIcon}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
         
            {showProfileDropdown && (
              <Dropdown show>
                <Dropdown.Menu className="p-3 shadow border-0" style={leftDropdownStyle}>
                  <div className="mb-3">
                    <p className="mb-1 fw-bold">{user?.full_name ?? ''}</p>
                    <p className="mb-1 text-muted small">{user?.email ?? ''}</p>
                    <p className="mb-0 text-muted small">{user?.phone ?? ''}</p>
                  </div>
                  <Dropdown.Item as={Link} to="/profile" onClick={() => setShowProfileDropdown(false)}>
                    <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 
              0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders" onClick={() => setShowProfileDropdown(false)}>
                    <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 
              1.1.89 2 2 2h14c1.11 0 2-.9 
              2-2V5c0-1.1-.89-2-2-2zm-5 
              14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Button variant="outline-danger" size="sm" className="w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleLogout}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 7l-1.41 1.41L18.17 
              11H8v2h10.17l-2.58 
              2.59L17 17l5-5zM4 
              5h8V3H4c-1.1 0-2 .9-2 
              2v14c0 1.1.9 2 2 
              2h8v-2H4V5z" />
                    </svg>
                    Logout
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
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
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    padding: '8px',
    backgroundColor: '#471396',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    transition: 'background-color 0.3s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  profileIcon: {
    width: '20px',
    height: '20px',
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
