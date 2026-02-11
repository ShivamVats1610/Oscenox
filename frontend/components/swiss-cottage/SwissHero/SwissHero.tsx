"use client";
import "./SwissHero.css";

export default function SwissHero() {
  return (
    <section className="swiss-hero">
      {/* Overlay */}
      <div className="swiss-hero-overlay" />

      {/* Content */}
      <div className="swiss-hero-inner">
        <p className="swiss-brand">
          Swiss Cottage <span>by Oscenox</span>
        </p>

        <h1 className="swiss-title">
          Your Alpine Retreat Awaits
        </h1>

        <p className="swiss-subtitle">
          in the Heart of the Swiss Alps
        </p>

        <a href="/rooms" className="swiss-btn">
          Book Rooms
        </a>
      </div>
    </section>
  );
}
