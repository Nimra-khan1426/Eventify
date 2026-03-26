import { useEffect, useState, useRef } from "react";
import "./DiscoverEvents.css";

const icons = {
  Tech: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="12" rx="2"/>
      <path d="M8 20h8M12 16v4"/>
    </svg>
  ),

  Arts: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="13.5" cy="6.5" r="2"/>
      <circle cx="17.5" cy="10.5" r="2"/>
      <circle cx="13.5" cy="14.5" r="2"/>
      <circle cx="9.5" cy="10.5" r="2"/>
      <path d="M6 20c4 0 10-2 10-6a4 4 0 0 0-4-4c-4 0-6 4-6 6s2 4 4 4z"/>
    </svg>
  ),

  Concerts: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),

  Theatre: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16v12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>
      <path d="M9 10h.01M15 10h.01M8 15c1.5-1 4.5-1 6 0"/>
    </svg>
  ),

  Comedy: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),

  Exhibition: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M8 15l3-3 2 2 3-3"/>
    </svg>
  ),

  "Food & Drink": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    </svg>
  ),

  Outdoor: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="3 17 9 5 15 17"/>
      <line x1="2" y1="21" x2="22" y2="21"/>
    </svg>
  ),

  Weekend: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

const categories = [
  { name: "Tech" },
  { name: "Concerts" },
  { name: "Theatre" },
  { name: "Comedy" },
  { name: "Exhibition" },
  { name: "Food & Drink" },
  { name: "Outdoor" },
  { name: "Arts" },
  { name: "Weekend" },
];

export default function DiscoverEvents() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initial animation on page load
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
           
            setVisible(false);
            setTimeout(() => setVisible(true), 50);
          }
        });
      },
      { threshold: 0.3 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCategoryClick = (categoryName) => {
    console.log(`Category clicked: ${categoryName}`);

  };

  return (
    <section ref={sectionRef} className="discover-section">   
      {/* Content Wrapper */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className={`discover-heading ${visible ? "animate-text" : ""}`}>
          Find the <span>best</span> events near you!
        </h2>
        <p className={`discover-sub ${visible ? "animate-text-delay" : ""}`}>
          From music to tech — discover what's happening around you.
        </p>

        <div className="discover-wrapper">
          <div className="discover-row">
            {categories.slice(0, 3).map((cat, i) => (
              <div
                key={cat.name}
                className={`cat-item ${visible ? "animate" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(cat.name);
                  }
                }}
              >
                <span className="cat-icon">{icons[cat.name]}</span>
                <span className="cat-label">{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="discover-row" style={{ justifyContent: "center" }}>
            {categories.slice(3, 6).map((cat, i) => (
              <div
                key={cat.name}
                className={`cat-item ${visible ? "animate" : ""}`}
                style={{ animationDelay: `${(i + 3) * 0.08}s` }}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(cat.name);
                  }
                }}
              >
                <span className="cat-icon">{icons[cat.name]}</span>
                <span className="cat-label">{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="discover-row">
            {categories.slice(6).map((cat, i) => (
              <div
                key={cat.name}
                className={`cat-item ${visible ? "animate" : ""}`}
                style={{ animationDelay: `${(i + 6) * 0.08}s` }}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(cat.name);
                  }
                }}
              >
                <span className="cat-icon">{icons[cat.name]}</span>
                <span className="cat-label">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}