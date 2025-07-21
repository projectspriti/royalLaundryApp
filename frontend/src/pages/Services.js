import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/services.css';

const services = [
  { title: "Wash and Fold", icon: "🧺", slug: "wash-and-fold" },
  { title: "Dry Cleaning", icon: "🧼", slug: "dry-cleaning" },
  { title: "Ironing / Pressing", icon: "🧲", slug: "ironing-pressing" },
  { title: "Stain Removal", icon: "🧽", slug: "stain-removal" },
  { title: "Wash + Iron + Fold", icon: "👕", slug: "wash-iron-fold" },
];

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">SERVICES</h1>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.title}</h3>
              <Link to={`/services/${service.slug}`} className="details-button">
                See Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
