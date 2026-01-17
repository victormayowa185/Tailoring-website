import "../styles/hero.css";
import mini1 from "../assets/mini1.jpg";
import mini2 from "../assets/mini2.jpg";

export default function Home() {
  return (
    <div className="home-root">
      {/* HERO SECTION WITH VIDEO */}
      <div className="blur">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-background"
        >
          <source 
            src="video.mp4" 
            type="video/mp4"
          />
          {/* Fallback image in case video doesn't load */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(90%) contrast(10%)'
          }} />
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="video-overlay"></div>
        
        <div className="blur-content">
          {/* HERO TEXT */}
          <div className="heroc">
            <div className="hero-line"></div>
            <h1 className="hero">
              <span className="hassan">
                Hassan Design
              </span> Custom Tailor For Your Fashion Style Fit
            </h1>
          </div>

          {/* SUB CONTENT */}
          <div className="sub">
            {/* IMAGES ROW */}
            <div className="mini-row">
              <img src={mini1} alt="Tailoring work" className="m1" />
              <img src={mini2} alt="Fabric selection" className="m2" />
            </div>

            {/* TEXT */}
            <p className="sub-text">
              Every piece is tailored to your unique identity, ensuring a perfect
              fit that inspires confidence and unforgettable style.
            </p>

            {/* BUTTON */}
            <button className="button">
              Make Appointment
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      {/* END HERO */}

      {/* SECOND DIV: Normal Content */}
      <div className="last">
        <h2>Welcome to My Tailoring Studio</h2>
        <p>
          I create professional, stylish tailoring designs with precision and creativity.
          Explore my catalogue and book a fitting session today.
          Every stitch here is an ode to quality, fit, and elegance.
          From minor adjustments to complete transformations, our alteration services 
          guarantee that every piece of clothing fits you like a glove. 
          Trust us for impeccable alterations that enhance your wardrobe.
        </p>
      </div>
    </div>
  );
}