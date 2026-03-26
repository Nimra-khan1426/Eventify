import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import eventsData from "../data/eventsData";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  // Filter events based on search query
  useEffect(() => {
    if (query.trim()) {
      const filtered = eventsData.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.location?.toLowerCase().includes(query.toLowerCase()) ||
        event.desc?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  }, [query]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setQuery("");
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
      setSearchOpen(false);
      setQuery("");
      
      // Clear any selected event when navigating to sections
      window.dispatchEvent(new CustomEvent('scrollToEvent', { detail: { eventId: null } }));
    }
  };

  const handleEventClick = (eventId) => {
    // First scroll to the events section
    const eventsSection = document.getElementById("featured-events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    // Dispatch custom event to show only the clicked event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scrollToEvent', { 
        detail: { eventId: eventId } 
      }));
      
      setQuery("");
      setSearchOpen(false);
    }, 500);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>
        <svg width="120" height="30" viewBox="0 0 120 30">
          <text x="0" y="22" fill="white" fontSize="20" fontFamily="Poppins">
            Event
          </text>
          <text x="58" y="22" fill="purple" fontSize="20" fontStyle="italic" fontFamily="Poppins">
            ify
          </text>
        </svg>
      </div>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`} ref={menuRef}>
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("events")}>Events</li>
        <li onClick={() => scrollToSection("contact")}>Contact</li>
      </ul>

      {/* Right Side */}
      <div className="right-section">
        {/* Search Box */}
        <div className={`search-box ${searchOpen ? "active" : ""}`} ref={searchRef}>
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
          <FaSearch
            className="nav-search-icon"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {/* Dropdown Results */}
          {query && searchOpen && (
            <ul className="search-dropdown">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className="search-result-item"
                  >
                    <div className="result-name">{event.name}</div>
                    <div className="result-location">{event.location}</div>
                  </li>
                ))
              ) : (
                <li className="no-results">No events found</li>
              )}
            </ul>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className="menu-icon"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSearchOpen(false);
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;