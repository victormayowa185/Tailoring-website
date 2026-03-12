import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

// Static constants moved outside component so they never change
const TOOLS = ["✂️", "📏", "🧵"];
const FREEZE_DELAY = 300;
const HIDE_DELAY = 2000;
const FADE_DURATION = 500;
const SHAPE_COUNT = 10;

export default function Home() {
  const navigate = useNavigate();
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const canvasRef = useRef(null);

  const shapesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastMoveTimeRef = useRef(null); // initially null, set in effect
  const hideTimeoutRef = useRef(null);
  const isVisibleRef = useRef(false);
  const isFadingOutRef = useRef(false);
  const fadeStartTimeRef = useRef(0);

  // ---- Generate random shapes within canvas bounds ----
  const generateShapes = useCallback((canvasWidth, canvasHeight) => {
    const shapes = [];
    for (let i = 0; i < SHAPE_COUNT; i++) {
      shapes.push({
        char: TOOLS[Math.floor(Math.random() * TOOLS.length)],
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.09,
        size: 24 + Math.floor(Math.random() * 100),
        opacity: 0.29 + Math.random() * 0.2,
      });
    }
    return shapes;
  }, []); // No dependencies – all used values are now outside the component

  // ---- Canvas animation setup ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initial shapes
    shapesRef.current = generateShapes(width, height);
    lastMoveTimeRef.current = Date.now(); // ✅ set after mount

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      let visible = isVisibleRef.current;
      let fading = isFadingOutRef.current;

      let globalAlpha = 1;
      if (fading) {
        const elapsed = now - fadeStartTimeRef.current;
        if (elapsed >= FADE_DURATION) {
          // Fade finished – hide completely
          isVisibleRef.current = false;
          isFadingOutRef.current = false;
          visible = false;
          fading = false;
        } else {
          globalAlpha = 1 - elapsed / FADE_DURATION;
        }
      }

      // If not visible at all, just request next frame and exit
      if (!visible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Movement update: only if not fading and mouse moved recently
      const timeSinceLastMove = now - lastMoveTimeRef.current;
      if (!fading && timeSinceLastMove < FREEZE_DELAY) {
        shapesRef.current.forEach((shape) => {
          shape.x += shape.vx;
          shape.y += shape.vy;
          // Wrap around edges
          if (shape.x < 0) shape.x = width;
          if (shape.x > width) shape.x = 0;
          if (shape.y < 0) shape.y = height;
          if (shape.y > height) shape.y = 0;
          shape.rotation += shape.rotSpeed;
        });
      }

      // Draw all shapes
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      shapesRef.current.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.font = `${shape.size}px 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif`;
        ctx.globalAlpha = shape.opacity * globalAlpha;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(shape.char, 0, 0);
        ctx.restore();
      });
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      shapesRef.current = generateShapes(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [generateShapes]); // generateShapes is stable, so effect runs once

  // ---- Mouse event handlers for the hero container ----
  const handleHeroMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Cancel fade‑out if it was happening
    isFadingOutRef.current = false;

    // Regenerate shapes for a fresh look each time
    const canvas = canvasRef.current;
    if (canvas) {
      shapesRef.current = generateShapes(canvas.width, canvas.height);
    }
    isVisibleRef.current = true;
    lastMoveTimeRef.current = Date.now(); // reset idle timer
  };

  const handleHeroMouseMove = () => {
    // Update last move time
    lastMoveTimeRef.current = Date.now();

    // If shapes are not visible, make them visible (should already be from enter)
    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      isFadingOutRef.current = false;
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    }

    // Reset the hide timeout: after HIDE_DELAY of inactivity, fade out
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      if (isVisibleRef.current && !isFadingOutRef.current) {
        isFadingOutRef.current = true;
        fadeStartTimeRef.current = Date.now();
      }
      hideTimeoutRef.current = null;
    }, HIDE_DELAY);
  };

  const handleHeroMouseLeave = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Immediately start fade‑out
    if (isVisibleRef.current) {
      isFadingOutRef.current = true;
      fadeStartTimeRef.current = Date.now();
    }
  };

  // ---- Button move effects (unchanged) ----
  const handleMouseMove = (e, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const offsetX = (x - centerX) / centerX;
    const offsetY = (y - centerY) / centerY;

    const moveX = offsetX * 20;
    const moveY = offsetY * 20;

    ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeaveButton = (ref) => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <div className="home-root">
      {/* HERO SECTION WITH VIDEO + CANVAS */}
      <div
        className="blur"
        onMouseEnter={handleHeroMouseEnter}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
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

        {/* Canvas for floating shapes (above video, under overlay) */}
        <canvas ref={canvasRef} className="floating-shapes-canvas" />

        {/* Dark overlay */}
        <div className="video-overlay"></div>

        {/* Hero content (above everything) */}
        <div className="blur-content">
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
              {/* BUTTON 1 */}
              <button
                ref={button1Ref}
                className="button"
                onClick={() => navigate("/contact")}
                onMouseMove={(e) => handleMouseMove(e, button1Ref)}
                onMouseLeave={() => handleMouseLeaveButton(button1Ref)}
              >
                Make Appointment
              </button>

              {/* BUTTON 2 */}
              <button
                ref={button2Ref}
                className="button"
                onClick={() => navigate("/gallery")}
                onMouseMove={(e) => handleMouseMove(e, button2Ref)}
                onMouseLeave={() => handleMouseLeaveButton(button2Ref)}
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