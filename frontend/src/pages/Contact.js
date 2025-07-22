import React, { useState } from 'react';
import '../styles/contact.css'; // Make sure to create this or include your existing styles

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSubmitted(true);

    // TODO: send to backend via Axios/fetch if needed
    console.log('Contact form submitted:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">CONTACT US</h1>
        </div>
      </div>

      <div className="contact-container">
       

        {submitted && <p className="success-message">Thank you! We'll get back to you soon.</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
