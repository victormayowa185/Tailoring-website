import React from "react";
import "../styles/service.css";

const ServiceCard = ({ src, label, category, className }) => {
  return (
    <div className={`service-card ${className}`}>
      
      {/* Image */}
      <img src={src} alt={label} />

      {/* Overlay */}
      <div className="card-overlay"></div>

      {/* Category */}
      <span className="card-badge">{category}</span>

      {/* Content */}
      <div className="card-content">
        <h3>{label}</h3>
        <button className="book-btn">Book a Fitting</button>
      </div>

    </div>
  );
};

export default ServiceCard;
