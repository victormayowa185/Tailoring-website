import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* TOP WAVE */}
      <svg
        className="footer-wave"
        viewBox="0 0 1440 170"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C240,20 480,20 720,80 960,140 1200,140 1440,80 L1440,0 L0,0 Z"
          fill="whitesmoke"
        />
      </svg>

      {/* CONTENT */}
      <div className="footer-container">

        <div className="copyright">
          © {new Date().getFullYear()} Victor Mayowa Dev. All rights reserved.
        </div>

        <div className="legal-links">
          <a href="/privacy">Privacy Policy</a>
          <span className="divider">•</span>
          <a href="/accessibility">Accessibility</a>
          <span className="divider">•</span>
          <a href="/terms">Terms</a>
        </div>

        <div className="social-media">
          <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
          <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
          <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        </div>

        <div className="contact">
          <a href="mailto:hello@vmtailoring.com">
            victormayowa185@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
