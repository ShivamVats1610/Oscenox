"use client";
import "./LAHero.css";

export default function LAHero() {
  return (
    <section className="la-hero">
      {/* Dark Overlay */}
      <div className="la-hero-overlay" />

      {/* Content */}
      <div className="la-hero-inner">
        <p className="la-brand">Welcome to</p>

        <h1 className="la-title">Little Amsterdam</h1>

        <p className="la-subtitle">Cafe by Oscenox</p>

        <a href="#overview" className="la-btn">
          Discover More
        </a>
      </div>
    </section>
  );
}
