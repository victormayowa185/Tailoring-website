// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Add page class to body based on current route
  useEffect(() => {
    // Remove all page classes
    document.body.classList.remove('page-home', 'page-about', 'page-services', 'page-other');
    
    // Add class based on current page
    if (location.pathname === '/') {
      document.body.classList.add('page-home');
    } else if (location.pathname === '/about') {
      document.body.classList.add('page-about');
    } else if (location.pathname === '/services') {
      document.body.classList.add('page-services');
    } else {
      document.body.classList.add('page-other');
    }
  }, [location]);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="navbar-container">

      {/* ========== ROW 1: TOP BAR ========== */}
      <div className="top-bar">
        <div className="social-icons">
          <a href="https://facebook.com" className="social-icon" target="_blank">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </div>

        <div className="brand-logo">
          <img src="/logo.png" alt="Elegance Logo" className="logo-img" />
        </div>

        <div className="nav-actions">
          <ion-icon name="search-outline" class="search-icon"></ion-icon>
          <button className="contact-btn">Contact Us</button>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* ========== MAIN NAV LINKS ========== */}
      <div className="main-nav">
        <NavLink to="/" className="nav-link" end>Home</NavLink>
        <span className="nav-divider">•</span>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <span className="nav-divider">•</span>
        <NavLink to="/services" className="nav-link">Services</NavLink>
        <span className="nav-divider">•</span>
        <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
        <span className="nav-divider">•</span>
        <NavLink to="/contact" className="nav-link">Contact</NavLink>
      </div>

      {/* ========== MOBILE NAV LINKS ========== */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link" end onClick={toggleMobileMenu}>Home</NavLink>
        <NavLink to="/about" className="nav-link" onClick={toggleMobileMenu}>About</NavLink>
        <NavLink to="/services" className="nav-link" onClick={toggleMobileMenu}>Services</NavLink>
        <NavLink to="/gallery" className="nav-link" onClick={toggleMobileMenu}>Gallery</NavLink>
        <NavLink to="/contact" className="nav-link" onClick={toggleMobileMenu}>Contact</NavLink>

        <div className="mobile-social">
          <a href="https://facebook.com" className="social-icon" target="_blank">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </div>
      </div>

    </nav>
  );
}