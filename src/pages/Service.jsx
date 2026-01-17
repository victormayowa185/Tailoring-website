import React from "react";
import ServiceCard from "../components/ServiceCard";
import servicesData from "../data/serviceData";
import "../styles/service.css";

const Services = () => {
  const getCardClass = (index) => {
    const fullWidthIndexes = [0, 3, 6, 9];
    return fullWidthIndexes.includes(index) ? "full" : "half";
  };

  return (
    <section className="services-section-bg">

      {/* Top accent (small aesthetic color) */}
      <div className="services-top-accent"></div>

      <div className="services-container">

        {/* Header */}
        <div className="services-header">
          <span className="services-pill">What We Offer</span>
          <h1>Our Services</h1>
          <p>
            Experience the pinnacle of sartorial craftsmanship where every stitch
            is meticulously placed by master tailors with decades of expertise.
            From initial consultation to final fitting, we transform premium Italian
            and Japanese fabrics into garments that celebrate your unique physique
            and personal style. Our commitment to perfection ensures each piece
            is not just clothing, but a wearable masterpiece
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              src={service.src}
              label={service.label}
              category={service.category}
              className={getCardClass(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
