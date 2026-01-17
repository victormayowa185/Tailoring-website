// src/pages/About.jsx - CORRECTED VERSION
import React from 'react';
import '../styles/about.css';  // ✅ Correct path to CSS

const About = () => {
  return (
    <section className="about-section">
      {/* Top accent (small aesthetic color) */}
      <div className="services-top-accent"></div>

      {/* Top Section: Three Columns */}
      <div className="about-top-grid">

        {/* Left Column: Text Block */}
        <div className="top-left-col">
          <div className="text-block">
            <div className="accent-line"></div>
            <h2 className="section-heading">
              Best Style, <span className="highlight">Great Concept</span>
            </h2>
            <p className="subheading">
              Where traditional craftsmanship meets contemporary fashion
            </p>
          </div>
        </div>

        {/* Middle Column: Close-up Image */}
        <div className="top-middle-col">
          <div className="image-container">
            <img
              src="https://t4.ftcdn.net/jpg/01/58/76/51/360_F_158765189_xE0PGsWoMcMZXact8LZdsLg7x8COin4V.jpg"
              alt="Close-up of premium suit detailing"
              className="about-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <span className="image-tag">Premium Craftsmanship</span>
            </div>
          </div>
        </div>

        {/* Right Column: Process Image */}
        <div className="top-right-col">
          <div className="image-container">
            <img
                src="https://plus.unsplash.com/premium_photo-1747508841967-96397061cbb0?q=100&w=800&auto=format&fit=crop"
              alt="Tailor measuring fabric precisely"
              className="about-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <span className="image-tag">Precision Tailoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Two Columns */}
      <div className="about-bottom-grid">

        {/* Left Column: Brand Story */}
        <div className="bottom-left-col">
          <div className="content-block">
            <h3 className="content-heading">
              Crafting Excellence Since 2010
            </h3>
            <div className="story-text">
              <p>
                At <b>Hassan Tailoring</b> our atelier, every stitch tells a story. Founded with a passion for
                bespoke tailoring, we blend timeless techniques with modern aesthetics
                to create garments that fit not just your body, but your lifestyle.
              </p>
              <p>
                Our master tailors bring decades of experience, ensuring each piece
                is meticulously crafted from premium fabrics sourced from Italy and Japan.
                From initial consultation to final fitting, we're committed to perfection.
              </p>
              <ul className="features-list">
                <li>Bespoke & Made-to-Measure</li>
                <li>Premium International Fabrics</li>
                <li>14-Day Alteration Guarantee</li>
                <li>Sustainable Production Methods</li>
              </ul>
            </div>
            <div className="cta-group">
              <button className="primary-btn">
                Book a Fitting
              </button>
              <button className="secondary-btn">
                View Our Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Model Image */}
        <div className="bottom-right-col">
          <div className="image-container large">
            <img
              src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Confident model wearing custom-tailored suit"
              className="about-image"
              loading="lazy"
            />
            <div className="image-overlay dark">
              <span className="image-tag">Confidence Tailored</span>
              <p className="image-caption">Every suit tells your unique story</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">2,500+</span>
            <span className="stat-label">Satisfied Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">14</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Perfect Fit Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Fabric Options</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;