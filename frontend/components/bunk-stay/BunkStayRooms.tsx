"use client";

import Link from "next/link";

export default function BunkStayRooms() {
  const rooms = [
    {
      title: "Dormitory Beds",
      desc: "Affordable shared stays designed for solo travelers and backpackers.",
      image: "/images/bunk/dorm.jpg",
    },
    {
      title: "Private Bunk Rooms",
      desc: "Perfect for small groups seeking privacy with a social vibe.",
      image: "/images/bunk/private.jpg",
    },
    {
      title: "Mountain View Rooms",
      desc: "Wake up to stunning views and peaceful surroundings.",
      image: "/images/bunk/mountain.jpg",
    },
    {
      title: "Riverside Stay",
      desc: "Relax beside the river with cozy seating and bonfire nights.",
      image: "/images/bunk/river.jpg",
    },
  ];

  return (
    <section className="py-28 px-6 bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* ===== TOP FEATURE SECTION ===== */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT CONTENT */}
          <div
            className="space-y-6 animate-fade-in-up"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1b2f2e]">
              Luxurious Rooms & Social Stays
            </h2>

            <p className="text-gray-700 leading-relaxed max-w-xl">
              At Bunk Stay by Oscenox, we blend affordability, comfort, and community.
              Whether you’re a solo traveler or a group explorer, our spaces are
              designed to keep you relaxed and connected.
            </p>

            <Link
              href="/bunk-stay/rooms"
              className="inline-block mt-4 px-8 py-3 rounded-full text-sm tracking-wide
                         bg-[#007877] text-white hover:bg-[#0d2f2e] transition-all"
            >
              Explore Room Stay
            </Link>
          </div>

          {/* RIGHT IMAGES */}
          <div className="grid grid-cols-2 gap-5">
            <div
              className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition"
            >
              <img
                src="/images/bunk/feature-1.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-5">
              <div
                className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition"
              >
                <img
                  src="/images/bunk/feature-2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition"
              >
                <img
                  src="/images/bunk/feature-3.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM ROOM CARDS ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg overflow-hidden
                         hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="font-serif text-lg text-[#1b2f2e] mb-2">
                  {room.title}
                </h3>

                <p className="text-sm text-gray-600 mb-5">
                  {room.desc}
                </p>

                <Link
                  href="/rooms"
                  className="inline-block text-xs px-6 py-2 rounded-full
                             border border-[#007877] text-[#007877]
                             hover:bg-[#007877] hover:text-white transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
