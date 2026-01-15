// src/components/ServiceGrid.jsx

import React from "react";
import servicesData from "../data/serviceData";
import ServiceCard from "./ServiceCard";
import "../../src/styles/service.css";

const ServiceGrid = () => {
  const getCardClass = (index) => {
    // Pattern: full-width (0), normal (1), normal (2), full-width (3), repeat...
    if (index % 3 === 0) {
      return "full-width"; // Alone on the row (horizontal full container width)
    }
    return ""; // Normal cards (two side-by-side)
  };

  return (
    <div className="services-container">
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
  );
};

export default ServiceGrid;