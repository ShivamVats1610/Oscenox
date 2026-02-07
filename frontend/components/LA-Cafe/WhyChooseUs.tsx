"use client";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  const items = [
    {
      title: "New Property",
      desc:
        "Embrace freshness and modern elegance with our newly crafted spaces, designed to deliver premium comfort.",
      icon: "🏨",
    },
    {
      title: "Best Price Guaranteed",
      desc:
        "Book directly with us to enjoy exclusive pricing, unbeatable deals, and maximum value for your stay.",
      icon: "💳",
    },
    {
      title: "Trained Staff",
      desc:
        "Our professional and friendly staff is dedicated to providing exceptional service throughout your visit.",
      icon: "🎧",
    },
  ];

  return (
    <section className="why-section">
      {/* Background Image */}
      <div
        className="why-bg"
        style={{
          backgroundImage: "url('/images/la-amenties.png')", // ← ADD YOUR IMAGE
        }}
      />

      {/* Dark Overlay */}
      <div className="why-overlay" />

      {/* Content */}
      <div className="why-container">
        <h2 className="why-heading">WHY CHOOSE US</h2>

        <div className="why-grid">
          {items.map((item, i) => (
            <div key={i} className="diamond-card">
              <div className="diamond-inner">
                <div className="diamond-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
