"use client";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-subtitle">Welcome To</span>
        <h1 className="hero-title">Oscenox</h1>
        <p className="hero-tagline">
          A place where comfort and luxury meet nature
        </p>

        {/* Search Bar */}
        <div className="hero-search">
          <input type="text" placeholder="Hotel Location" />
          <select>
            <option>Select Property</option>
            <option>Swiss Cottage</option>
            <option>LA Cafe</option>
            <option>Bunk Stay</option>
          </select>
          <input type="date" />
          <select>
            <option>1 Adult, 1 Room</option>
            <option>2 Adults, 1 Room</option>
            <option>2 Adults, 2 Rooms</option>
          </select>
          <button>Search Rooms</button>
        </div>
      </div>
    </section>
  );
}
