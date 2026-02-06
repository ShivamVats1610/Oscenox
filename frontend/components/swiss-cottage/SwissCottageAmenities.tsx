"use client";

export default function SwissCottageAmenities() {
  const amenities = [
    { title: "Laundry", desc: "On Chargeable Basis", icon: "🧺" },
    { title: "Rooms", desc: "Soundproof Rooms", icon: "🛏️" },
    { title: "Concierge", desc: "Concierge Available", icon: "🛎️" },
    { title: "24 Hr Service", desc: "Room Service", icon: "⏰" },
    { title: "WiFi", desc: "Fast WiFi", icon: "📶" },
    { title: "Smoking Area", desc: "Designated Smoking Rooms", icon: "🚬" },
    { title: "Card Access", desc: "Entry through Card", icon: "💳" },
    { title: "Wheelchair", desc: "Wheelchair Access", icon: "♿" },
    { title: "CCTV", desc: "24×7 Security", icon: "📹" },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      {/* BOXED LUXURY CONTAINER */}
      <div
        className="relative  rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/images/greenbg.jpeg')", // you can change this
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0b2a2a]/90" />

        {/* Gold Border */}
        <div className="absolute inset-0 border border-[#c6a75e] rounded-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-16 p-14 text-white">
          {/* LEFT IMAGE */}
          <div
            className="rounded-2xl overflow-hidden border border-[#c6a75e]"
            style={{
              backgroundImage: "url('/images/amenities-left.jpg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "420px",
            }}
          />

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-4xl font-serif text-[#c6a75e] mb-4 tracking-wide">
              Amenities
            </h2>

            <p className="text-sm opacity-90 mb-10 leading-relaxed">
              Indulge in a diverse array of premium amenities designed to enhance
              your stay. Relax and stay active with personalized services tailored
              to ensure a delightful experience.
            </p>

            {/* AMENITIES GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {amenities.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-3 text-[#c6a75e]">
                    {item.icon}
                  </div>
                  <h4 className="font-serif text-sm">{item.title}</h4>
                  <p className="text-xs opacity-75 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
