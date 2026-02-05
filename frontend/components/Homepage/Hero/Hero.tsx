"use client";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <span className="hero-subtitle">Welcome To</span>
        <h1 className="hero-title">Hotel Prime</h1>
        <p className="hero-tagline">
          A place where comfort and luxury are blended with nature!
        </p>
      </div>

      {/* Search Bar */}
      <div className="hero-search-wrapper">
        <div className="hero-search">
          <input type="text" placeholder="Hotel Location" />

          <select>
            <option>Select Hotel</option>
            <option>Swiss Cottage</option>
            <option>Little Amsterdam</option>
            <option>Bunk Stay</option>
          </select>

          <input type="date" />

          <select>
            <option>1 Adult, 1 Room</option>
            <option>2 Adults, 1 Room</option>
            <option>2 Adults, 2 Rooms</option>
          </select>

          <button>SEARCH ROOMS</button>
        </div>
      </div>
    </section>
  );
}
