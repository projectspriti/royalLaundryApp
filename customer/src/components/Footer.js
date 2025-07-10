import React from 'react';
import '../styles/footer.css';
import logo from '../assets/logo.png'; // 👈 Import logo image
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="laundry-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Royal Laundry Logo" className="footer-logo" />
          <p>Quality service, fresh clothes.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/book-order">Place Order</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </div>

        <div className="footer-right">
          <p>Contact: <a href="tel:+911234567890">+91 12345 67890</a></p>
          <p>Email: <a href="mailto:support@royallaundry.com">support@royallaundry.com</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Royal Laundry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
