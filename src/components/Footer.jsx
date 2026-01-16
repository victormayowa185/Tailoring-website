import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      
      {/* SVG Curve */}
      <div className="footer-curve">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,80 480,0 720,20 960,40 1200,80 1440,30 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="footer-content">
        <p>© 2026 VM Tailoring. All rights reserved.</p>

        <div className="footer-links">
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
