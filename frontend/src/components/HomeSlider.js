import React from 'react';
import '../styles/homeSlider.css'; // Import the CSS for styling
import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";
const HomeSlider = () => {
  return (
    <section className="slogan-section">
      <div className="slogan-overlay">
      <Container className='text-white'>
          <h1 className="display-5 fw-bold">Your Laundry, Our Responsibility</h1>
          <p className="lead">Book the best laundry service near you in just a few clicks.</p>
          <Button variant="primary" size="lg">Get Started</Button>
        </Container>
      </div>
    </section>
 
    
  );
};

export default HomeSlider;
