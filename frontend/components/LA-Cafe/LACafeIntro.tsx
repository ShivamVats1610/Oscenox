"use client";
import "./LACafeIntro.css";

export default function LACafeIntro() {
  return (
    <section className="la-intro">
      {/* Leaf Particles */}
      <div className="leaf-particles">
        <span className="leaf" />
        <span className="leaf" />
        <span className="leaf" />
        <span className="leaf" />
        <span className="leaf" />
        <span className="leaf" />
        <span className="leaf" />
      </div>

      <div className="la-intro-container">
        <div className="la-intro-header">
          <h2>Welcome to Oscenox Little Amsterdam</h2>
          <p>
            Experience the charm of Amsterdam in our enchanting Little Amsterdam
            retreat. A romantic escape inspired by canals, cafés, and timeless
            European elegance.
          </p>
        </div>

        <div className="la-intro-grid">
          <div className="la-intro-card">
            <img src="/images/la-canal.jpg" />
            <h3>Canal Views</h3>
            <p>Scenic waterways reflecting Amsterdam’s timeless beauty.</p>
          </div>

          <div className="la-intro-card">
            <img src="/images/la-cafe.jpg" />
            <h3>Charming Cafés</h3>
            <p>Warm lighting, cozy seating, and artisanal flavors.</p>
          </div>

          <div className="la-intro-card">
            <img src="/images/la-romantic.jpg" />
            <h3>Romantic Getaways</h3>
            <p>Perfect settings for intimate evenings and luxury moments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
