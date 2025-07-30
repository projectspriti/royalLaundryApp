import { useState, useEffect } from "react";
import { Dropdown, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ProfileNav = ({user, setUser, setIsLoggedIn}) => {

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('token') ?? -1);

  const navigate = useNavigate();
      const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserId(-1);
      setShowProfileDropdown(false);
      navigate('/');
      // setUser({ email: "", name: "", phone:"", usertype: "0"});
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

    const profileContainer = {
    position: 'relative',
  };
  const profileButton = {
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
  }
  const profileIcon = {
    width: '20px',
    height: '20px',
  }
    return (
         
          <div className="profile-dropdown-container" style={profileContainer}>
            <button 
              onClick={toggleProfileDropdown}
              style={profileButton}
              aria-label="Profile menu"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={profileIcon}
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
    )
}

export default ProfileNav