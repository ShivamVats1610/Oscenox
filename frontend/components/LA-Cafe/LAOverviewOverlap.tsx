"use client";

export default function LAOverviewOverlap() {
  return (
    <section id="overview" className="relative z-20">
      <div
        className="
          relative
          md:absolute md:left-0 md:right-0
          md:-bottom-32 lg:-bottom-40
        "
      >
        <div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#c6a75e]"
          style={{
            backgroundImage: "url('/images/la-overview-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 px-6 md:px-10 py-12 text-center text-white">

            <h2 className="text-3xl md:text-4xl font-serif text-[#c6a75e] tracking-wide">
              OVERVIEW
            </h2>

            <div className="w-24 h-0.5 bg-[#c6a75e] mx-auto my-6" />

            <p className="max-w-4xl mx-auto text-sm leading-relaxed opacity-90">
              Oscenox LA Cafe in Rishikesh, located near the Ganges River,
              offers stunning scenic river views and a vibrant atmosphere
              perfect for couples and travelers to relax and unwind.
            </p>

            {/* AMENITIES */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "WiFi", icon: "📶" },
                { title: "Pet Welcomed", icon: "🐾" },
                { title: "Parking", icon: "🅿️" },
                { title: "DJ Party", icon: "🎧" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3
                             border border-[#c6a75e] rounded-2xl
                             px-5 py-5 bg-black/30"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-xs tracking-widest text-[#c6a75e]">
                    {item.title.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-12">
              <a
                href="https://oscenox-little-amsterdam.menu-world.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block border border-[#c6a75e]
                  px-10 py-3 rounded-full
                  text-sm tracking-widest
                  bg-[#c6a75e] text-black
                  hover:bg-[#d4a22f] hover:text-white
                  transition-all duration-300
                "
              >
                OUR MENU
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
