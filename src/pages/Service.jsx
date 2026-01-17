import React, { useState, useEffect, useRef } from 'react';
import '../styles/service.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Bespoke Suit Tailoring",
      description: "Custom-made suits crafted from the finest Italian fabrics, with over 40 precise measurements for a perfect fit that enhances your silhouette.",
      features: [
        "40+ Measurements Taken",
        "Italian Wool & Cashmere",
        "Hand-Stitched Details",
        "3 Fittings Minimum"
      ],
      image: "https://media.istockphoto.com/id/1452867118/photo/tailor-marking-sewing-pattern-on-fabric-with-chalk-at-table-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=BJF0_2sDTsKDT0C8tt7Hu4U3N1sNEytb7RtHA0J-84g=",
      color: "#0D134A"
    },
    {
      id: 2,
      title: "Traditional Attire",
      description: "Exquisite Ankara, Aso-ebi, and Agbada designs that blend cultural heritage with contemporary style for weddings and special occasions.",
      features: [
        "Authentic Ankara Fabrics",
        "Modern & Traditional Cuts",
        "Beadwork & Embroidery",
        "Cultural Pattern Expertise"
      ],
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&q=80",
      color: "#8B4513"
    },
    {
      id: 3,
      title: "Women's Couture",
      description: "Elegant dresses, office wear, and evening gowns tailored to celebrate femininity with precision cuts and luxurious fabrics.",
      features: [
        "Figure-Flattering Designs",
        "French Seam Construction",
        "Luxury Silk & Chiffon",
        "Custom Embellishments"
      ],
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80",
      color: "#9D174D"
    }
  ];

  // State for stacked images with positions
  const [stackedImages, setStackedImages] = useState([
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1580981433573-c5804ced20ad?w=600&auto=format&fit=crop&q=60", 
      alt: "Tailor measuring fabric",
      position: 'top',
      rotation: -3,
      zIndex: 3,
      height: '65%'
    },
    { 
      id: 2, 
      src: "https://plus.unsplash.com/premium_photo-1663133428239-ebd1cc42c7b8?w=600&auto=format&fit=crop&q=60", 
      alt: "Sewing machine closeup",
      position: 'middle',
      rotation: 2,
      zIndex: 2,
      height: '60%'
    },
    { 
      id: 3, 
      src: "https://media.istockphoto.com/id/1175717498/photo/dressmaker-cutting-dress-fabric-on-sketch-line-with-sewing-machine-fashion-designer-tailor-or.webp?a=1&b=1&s=612x612&w=0&k=20&c=hAuanFtL00KCfGHoozAFxI6LaHvZyLbAQXR1gLvkHR4=", 
      alt: "Fabric selection",
      position: 'bottom',
      rotation: -1,
      zIndex: 1,
      height: '55%'
    }
  ]);

  // Refs for scroll animations
  const serviceCardsRef = useRef([]);
  const processStepsRef = useRef([]);

  // Function to bring clicked image to front
  const bringToFront = (clickedId) => {
    setStackedImages(prev => {
      // Find the clicked image
      const clickedImage = prev.find(img => img.id === clickedId);
      
      // Filter out the clicked image
      const otherImages = prev.filter(img => img.id !== clickedId);
      
      // Create new order: clicked image goes to top, others shuffle down
      const newOrder = [
        { ...clickedImage, position: 'top', rotation: -3, zIndex: 3, height: '65%' },
        { 
          ...otherImages[0], 
          position: 'middle', 
          rotation: 2, 
          zIndex: 2, 
          height: '60%'
        },
        { 
          ...otherImages[1], 
          position: 'bottom', 
          rotation: -1, 
          zIndex: 1, 
          height: '55%'
        }
      ];
      
      return newOrder;
    });
  };

  // Function to shuffle all images randomly
  const shuffleStack = () => {
    setStackedImages(prev => {
      // Create a shuffled copy
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      
      // Assign new positions
      return shuffled.map((img, index) => {
        const positions = [
          { position: 'top', rotation: -3, zIndex: 3, height: '65%' },
          { position: 'middle', rotation: 2, zIndex: 2, height: '60%' },
          { position: 'bottom', rotation: -1, zIndex: 1, height: '55%' }
        ];
        
        return { ...img, ...positions[index] };
      });
    });
  };

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe service cards
    serviceCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    // Observe process steps
    processStepsRef.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => {
      serviceCardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
      processStepsRef.current.forEach(step => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section className="services-section">
      
      {/* Top accent */}
      <div className="services-top-accent"></div>

      <div className="services-container">
        
        {/* Header */}
        <div className="services-header">
          <span className="services-pill"> Hassan Tailoring Craftsmanship</span>
          <h1>Our Tailoring Excellence</h1>
          <p>
            Where artistry meets precision. Each garment is a testament to 
            decades of expertise, meticulous attention to detail, and 
            uncompromising quality standards.
          </p>
        </div>

        {/* Main Feature Grid */}
        <div className="feature-grid">
          
          {/* Left Column - Stacked Images */}
          <div className="stacked-images">
            <div className="image-stack">
              {stackedImages.map((img) => (
                <img 
                  key={img.id}
                  src={img.src} 
                  alt={img.alt}
                  className={`stack-img ${img.position}-img`}
                  loading="lazy"
                  onClick={() => bringToFront(img.id)}
                  style={{
                    zIndex: img.zIndex,
                    transform: `rotate(${img.rotation}deg)`,
                    height: img.height
                  }}
                />
              ))}
            </div>
            
            <div className="stack-controls">
              <button 
                className="shuffle-btn"
                onClick={shuffleStack}
                title="Randomly shuffle images"
              >
                <span className="shuffle-icon">↻</span>
                Shuffle Stack
              </button>
              
            </div>
            
            <div className="stack-caption">
              <h3>From Concept to Creation</h3>
              <p>Every piece undergoes 72 quality checks</p>
            </div>
          </div>

          {/* Right Column - Services Cards with animation */}
          <div className="services-cards">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                ref={el => serviceCardsRef.current[index] = el}
                className="service-card"
                style={{ '--card-color': service.color }}
              >
                <div className="card-image">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                  />
                  <div className="card-badge">
                    {service.id}
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                  
                  <ul className="card-features">
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="inquiry-btn">
                    Book a Fitting
                    <span className="btn-icon">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Process Section */}
        <div className="process-section">
          <h2 className="process-title">Our 5-Step Process</h2>
          <div className="process-steps">
            {[
              { number: '01', title: 'Consultation', desc: 'Style discussion & vision' },
              { number: '02', title: 'Measurement', desc: '40+ precise measurements' },
              { number: '03', title: 'Fabric Selection', desc: 'Premium material choice' },
              { number: '04', title: 'Pattern Making', desc: 'Custom pattern creation' },
              { number: '05', title: 'Fitting & Delivery', desc: 'Perfect fit guarantee' }
            ].map((step, index) => (
              <div 
                key={index} 
                ref={el => processStepsRef.current[index] = el}
                className="process-step"
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;