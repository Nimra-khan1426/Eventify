import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const contentRef = useRef(null);
  
  // Slideshow images array
  const slideshowImages = [
    "/assets/travel1.png",
    "/assets/food1.png",
    "/assets/imagepsl1.png",
    "/assets/travel3.png",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background Slideshow */}
      <div className="hero-background-slideshow">
        {slideshowImages.map((img, index) => (
          <div
            key={index}
            className={`bg-slide ${index === currentImageIndex ? "active" : ""}`}
          >
            <img src={img} alt={`Event ${index + 1}`} />
          </div>
        ))}
        {/* Overlay gradient to make text readable */}
        <div className="bg-overlay"></div>
      </div>

      {/* Wavy background elements */}
      <div className="hero-bg-waves">
        <div className="wave-svg wave-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#9b4dcc"
              fillOpacity="0.3"
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,186.7C672,192,768,224,864,229.3C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="wave-svg wave-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#b77ee6"
              fillOpacity="0.3"
              d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,160C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="wave-svg wave-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#c08ef0"
              fillOpacity="0.2"
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,192C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="hero-content" ref={contentRef}>
        <h1>
          Discover <span style={{ color: "purple", fontStyle: "italic" }}>
            Events
            <br /> Near
          </span> You!
        </h1>
        <p>
          Uncover hidden gems and exciting events nearby.<br />
          Join the fun and meet new people today
        </p>
        <a href="http://localhost:3000/#events" className="hero-btn">
          Discover Events
        </a>
      </div>
    </section>
  );
};

export default Hero;