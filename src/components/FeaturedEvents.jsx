import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import "./FeaturedEvents.css";
import eventsData from "../data/eventsData";

const EventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isHovered && event.images && event.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
      }, 2500); 
    } else if (!isHovered && event.images && event.images.length > 1) {
      setCurrentImageIndex(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, event.images]);

  const handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRegistering(true);
    
    setTimeout(() => {
      alert(`Successfully registered for ${event.name}!`);
      setIsRegistering(false);
    }, 1000);
  };

  const images = event.images && event.images.length > 0 ? event.images : ["/default-event.jpg"];

  return (
    <div 
      id={`event-${event.id}`}
      className="eventify-event-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="eventify-img-box">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={event.name}
            className="eventify-img"
            style={{
              opacity: idx === currentImageIndex ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ))}
        {isHovered && images.length > 1 && (
          <div className="eventify-image-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      <div className="eventify-content">
        <div className="eventify-content-top">
          <h3>{event.name}</h3>

          <div className="eventify-meta">
            <span>
              <FaCalendarAlt /> {event.date}
            </span>
            <span>
              <FaClock /> {event.time}
            </span>
            <span>
              <FaMapMarkerAlt /> {event.location}
            </span>
          </div>

          <p className="eventify-desc">{event.desc}</p>
        </div>

        <button 
          className={`eventify-btn ${isRegistering ? 'registering' : ''}`}
          onClick={handleRegister}
          disabled={isRegistering}
        >
          {isRegistering ? (
            <>Registering...</>
          ) : (
            <>Register</>
          )}
        </button>
      </div>
    </div>
  );
};

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(eventsData);
      setLoading(false);
    }, 800);
  }, []);

  // Handle search from navbar
  useEffect(() => {
    // Check if there's a hash in URL (for direct navigation)
    const hash = window.location.hash;
    if (hash && hash.includes('event-')) {
      const eventId = parseInt(hash.replace('#event-', ''));
      setSelectedEventId(eventId);
      // Scroll to the event after a short delay
      setTimeout(() => {
        const element = document.getElementById(`event-${eventId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add('event-highlight');
          setTimeout(() => element.classList.remove('event-highlight'), 2000);
        }
      }, 500);
    }
  }, []);

  // Listen for custom event from navbar
  useEffect(() => {
    const handleSearchEvent = (event) => {
      const { eventId } = event.detail;
      if (eventId) {
        setSelectedEventId(eventId);
        setSearch("");
        
        // Scroll to the event card
        setTimeout(() => {
          const element = document.getElementById(`event-${eventId}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add('event-highlight');
            setTimeout(() => element.classList.remove('event-highlight'), 2000);
          }
        }, 100);
      }
    };

    window.addEventListener('scrollToEvent', handleSearchEvent);
    return () => window.removeEventListener('scrollToEvent', handleSearchEvent);
  }, []);

  // Filter events - if selectedEventId exists, show only that event
  const displayEvents = selectedEventId 
    ? events.filter(event => event.id === selectedEventId)
    : events.filter((event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.desc.toLowerCase().includes(search.toLowerCase())
      );

  const handleClearSearch = () => {
    setSearch("");
    setSelectedEventId(null);
  };

  return (
    <section className="eventify-featured-section" id="events">
      <div className="eventify-featured-top">
        <h2>Featured <span style={{ color: "purple" }}>Events</span></h2>

        <div className="eventify-search-bar">
          <FaSearch className="eventify-search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedEventId(null); // Clear selected event when searching
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="eventify-loading-spinner">
          <div className="eventify-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : (
        <>
          <div className="eventify-events-grid">
            {displayEvents.length > 0 ? (
              displayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="eventify-no-events">
                <p>No events found matching "{search}"</p>
                <button onClick={handleClearSearch} className="eventify-clear-search-btn">
                  Clear Search
                </button>
              </div>
            )}
          </div>
          
          {/* Results count */}
          {displayEvents.length > 0 && !selectedEventId && (
            <div className="eventify-results-count">
              Showing {displayEvents.length} of {events.length} events
            </div>
          )}
          
          {/* Back to all events button when showing single event */}
          {selectedEventId && (
            <div className="eventify-back-btn-container">
              <button onClick={handleClearSearch} className="eventify-back-btn">
                ← Back to All Events
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedEvents;