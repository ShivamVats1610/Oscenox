"use client";
import Link from "next/link";

export default function SwissCottageRooms() {
  const rooms = [
      {
          title: "Standard Room",
          desc: "Offering a separate living area, warm fireplace, and inviting alpine decor.",
          image: "/images/rooms/StandarRooms.jpg",
          link: "/swiss-cottage/cozy-suite",
        },
        {
          title: "Deluxe Room",
          desc: "Elegant and spacious, featuring a cozy fireplace and stunning alpine views.",
          image: "/images/rooms/deluxe.jpg",
          link: "/swiss-cottage/deluxe-room",
        },
    {
      title: "Suite Rooms",
      desc: "Our most luxurious suite featuring a private balcony and breathtaking mountain panoramas.",
      image: "/images/rooms/SuiteRooms.jpg",
      link: "/swiss-cottage/master-suite",
    },
  ];

  return (
    /* OUTER GAP — BOXED SECTION */
    <section className="py-16 px-6 bg-white">
      <div
        className="relative rounded-3xl overflow-hidden py-24"
        style={{
          backgroundImage: "url('/images/greenbg.jpeg')", // ✅ your background
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-20 text-white">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Explore Our Alpine Elegance
            </h2>
            <p className="max-w-2xl mx-auto text-sm opacity-90">
              Choose from our selection of luxurious chalet-style rooms,
              each designed for comfort and elegance.
            </p>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {rooms.map((room, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden shadow-2xl border border-[#c6a75e]"
              >
                <div
                  className="h-80"
                  style={{
                    backgroundImage: `url(${room.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="bg-[#0b2a2a]/95 text-white p-6 text-center">
                  <h3 className="text-xl font-serif mb-2">{room.title}</h3>
                  <p className="text-sm opacity-90 mb-5">{room.desc}</p>

                  <Link
                    href="/rooms"
                    className="inline-block border border-[#c6a75e] px-6 py-2 text-xs rounded-full
                               hover:bg-[#c6a75e] hover:text-black transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
