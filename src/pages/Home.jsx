import { useRef } from "react";
import "../styles/hero.css";

export default function Home() {
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (x - centerX) / centerX; // range -1 to 1
    const offsetY = (y - centerY) / centerY;

    // Limit translation to max 8px
    const moveX = offsetX * 8;
    const moveY = offsetY * 8;

    ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div className="home-root">
      {/* HERO SECTION WITH VIDEO */}
      <div className="blur">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="video-background">
          <source src="video.mp4" type="video/mp4" />
          {/* Fallback image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(90%) contrast(10%)",
            }}
          />
        </video>

        {/* Video overlay */}
        <div className="video-overlay"></div>

        <div className="blur-content">
          {/* HERO TEXT */}
          <div className="heroc">
            <div className="hero-line"></div>
            <h1 className="hero">
              <span className="hassan">Get Your</span> Custom Tailor For Your
              Fashion Style Fit
            </h1>
          </div>

          {/* SUB CONTENT */}
          <div className="sub">
            <div>
              <p className="sub-text">
                Every piece is tailored to your unique identity, ensuring a
                perfect fit that inspires confidence and unforgettable style.
              </p>
            </div>

            <div className="cta">
              {/* BUTTON 1 with mouse move effect */}
              <button
                ref={button1Ref}
                className="button"
                onMouseMove={(e) => handleMouseMove(e, button1Ref)}
                onMouseLeave={() => handleMouseLeave(button1Ref)}
              >
                Make Appointment
              </button>

              {/* BUTTON 2 with mouse move effect */}
              <button
                ref={button2Ref}
                className="button"
                onMouseMove={(e) => handleMouseMove(e, button2Ref)}
                onMouseLeave={() => handleMouseLeave(button2Ref)}
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END HERO */}

      {/* SECOND DIV */}
      <div className="last">
        <h2>Welcome to My Tailoring Studio</h2>
        <p>
          I create professional, stylish tailoring designs with precision and
          creativity. Explore my catalogue and book a fitting session today.
          Every stitch here is an ode to quality, fit, and elegance. From minor
          adjustments to complete transformations, our alteration services
          guarantee that every piece of clothing fits you like a glove. Trust us
          for impeccable alterations that enhance your wardrobe.
        </p>
      </div>
    </div>
  );
}