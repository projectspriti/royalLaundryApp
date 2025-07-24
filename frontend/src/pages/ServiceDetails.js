import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/services.css';

const serviceDetails = {
  "wash-and-fold": {
    title: "Wash and Fold",
    description:
      "Our Wash and Fold service is perfect for your everyday laundry. We wash your clothes using high-quality detergents and fabric conditioners, then neatly fold them for your convenience. Ideal for casual wear, undergarments, bedsheets, and towels. Clothes are returned fresh, clean, and ready to wear. Quick turnaround and perfect for busy schedules.",
    img: "/services/wash_fold.jpeg"
  },
  "dry-cleaning": {
    title: "Dry Cleaning",
    description:
      "Our premium Dry Cleaning service is designed to handle delicate, designer, and formal garments that require special care. Using eco-friendly solvents and gentle processing, we remove tough stains and odors without water. Suits, sarees, lehengas, coats, and silks stay in their best condition. We also offer fabric-safe finishing and inspection for all items.",
    img: "/services/dry.jpeg"
  },
  "ironing-pressing": {
    title: "Ironing / Pressing",
    description:
      "Say goodbye to wrinkles! Our Ironing/Pressing service ensures your clothes are professionally pressed using temperature-controlled steam irons. Ideal for formal shirts, trousers, dresses, and ethnic wear. Get crisp lines and smooth finishes that help you look sharp and confident every day. Available as standalone or add-on service.",
    img: "/services/iron.jpeg"
  },
  "stain-removal": {
    title: "Stain Removal",
    description:
      "Tough stains? No problem. Our Stain Removal experts identify fabric-safe solutions to treat and remove oil, ink, food, wine, mud, sweat, and more. We use gentle chemical treatments that protect fabric texture and color. Suitable for all types of garments including white, colored, delicate, and heavy fabrics. Timely and careful attention guaranteed.",
    img: "/services/stain.jpeg"
  },
  "wash-iron-fold": {
    title: "Wash + Iron + Fold",
    description:
      "Our most complete care package! The Wash + Iron + Fold service includes premium washing, professional ironing, and neatly folded packaging. Best for daily wear, office clothes, uniforms, and household fabrics. We ensure hygienic handling, fragrance-fresh returns, and timely delivery. A true all-in-one convenience for your laundry needs.",
    img: "/services/wash_iron_fold.jpeg"
  },
};


export default function ServiceDetails() {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[serviceSlug];

  if (!service) {
    return <h2 style={{ padding: '40px', textAlign: 'center' }}>Service not found!</h2>;
  }

  return (
    <div className="service-detail-container">
      <div className="service-detail-content">
        <img src={service.img} alt={service.title} className="service-image" />
        <div className="service-text">
          <h1 className="services-title">{service.title}</h1>
          <p className="service-description">{service.description}</p>
          <button className="back-button" onClick={() => navigate('/services')}>
            ← Back to Services
          </button>
        </div>
      </div>
    </div>
  );
}
