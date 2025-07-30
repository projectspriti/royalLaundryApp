import React from 'react'
import HomeSlider from '../components/HomeSlider'
import { Container, Navbar, Nav, Button, Row, Col, Card } from "react-bootstrap";
import partners from '../assets/partners.png';

const Home = () => {
  return (
   <div>
    <HomeSlider />

      <section id="how-it-works" className="py-5">
        <Container>
          <h2 className="mb-4 text-center">How It Works</h2>
          <Row className="text-center">
            <Col md={4}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <Card.Title>1. Choose Services</Card.Title>
                  <Card.Text>Select from wash, dry clean, ironing, and more.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <Card.Title>2. Schedule Pickup</Card.Title>
                  <Card.Text>Pick your preferred date & time for laundry pickup.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <Card.Title>3. Get Clean Clothes</Card.Title>
                  <Card.Text>We deliver your laundry fresh and clean, on time.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="services" className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">Our Services</h2>
          <Row>
            {[
              { title: "Wash & Fold", desc: "Everyday laundry made simple." },
              { title: "Dry Cleaning", desc: "Professional cleaning for delicate fabrics." },
              { title: "Ironing", desc: "Crisp clothes delivered to your doorstep." },
              { title: "Stain Removal", desc: "Tough on stains, gentle on fabric." },
              { title: "Shoe Cleaning", desc: "Sparkle up your footwear." },
              { title: "Curtain Cleaning", desc: "Freshen up your home interiors." }
            ].map((service, idx) => (
              <Col md={4} className="mb-4" key={idx}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="partners" className="py-5">
        <Container>
          <h2 className="mb-4 text-center">Partner With Us</h2>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="lead">Are you a laundry service provider? Join our platform to expand your reach and grow your business with ease. Manage bookings, payments, and customers in one place.</p>
              <Button variant="primary">Register as a Partner</Button>
            </Col>
            <Col md={6}>
              <img src={partners} alt="Laundry Partners" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="contact" className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">Get In Touch</h2>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <form>
                <input type="text" placeholder="Your Name" className="form-control mb-3" />
                <input type="email" placeholder="Email" className="form-control mb-3" />
                <textarea placeholder="Message" className="form-control mb-3" rows="4"></textarea>
                <Button type="submit" variant="primary">Send Message</Button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
   </div>
 
  )
}

export default Home