"use client";
import "./LAAmenities.css";

export default function LAAmenities() {
  const amenities = [
    { icon: "👨‍🍳", title: "Master Chefs", desc: "Master Chefs" },
    { icon: "🍽️", title: "Quality Food", desc: "Quality Food" },
    { icon: "💳", title: "Cards", desc: "All Cards Accepted" },
    { icon: "🛎️", title: "24 Hr Service", desc: "Room Service" },
    { icon: "📶", title: "WiFi", desc: "Fast WiFi" },
    { icon: "🚬", title: "Smoking Area", desc: "Designated Smoking Rooms" },
    { icon: "🅿️", title: "Parking", desc: "Available" },
    { icon: "🎧", title: "DJ", desc: "Party" },
    { icon: "📹", title: "CCTV", desc: "24×7 Security" },
    { icon: "🅿️", title: "Parking", desc: "Available" },
    { icon: "🎧", title: "DJ", desc: "Party" },
    { icon: "📹", title: "CCTV", desc: "24×7 Security" },
  ];

  return (
    <section className="la-amenities">
      <div className="la-amenities-box">
        {/* Header */}
        <div className="la-amenities-header">
          <h2>Amenities</h2>
          <p>
            Enjoy a range of high-class amenities and services that make your stay
            in Oscenox Little Amsterdam extra special.
          </p>
        </div>

        {/* Grid */}
        <div className="la-amenities-grid">
          {amenities.map((item, i) => (
            <div key={i} className="amenity-card">
              <div className="amenity-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
