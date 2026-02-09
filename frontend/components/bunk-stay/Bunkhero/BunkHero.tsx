"use client";
import "./BunkHero.css";

export default function BunkHero() {
  return (
    <section className="la-hero">
      {/* Background Motion Layer */}
      <div className="la-hero-bg" />

      {/* Gradient Overlay */}
      <div className="la-hero-overlay" />

      {/* Content */}
      <div className="la-hero-inner">
        <p className="la-brand">Welcome to</p>

        <h1 className="la-title">Bunk Stay</h1>

        <p className="la-subtitle">by Oscenox</p>

        <a href="#overview" className="la-btn">
          Discover More
        </a>
      </div>
    </section>
  );
}
