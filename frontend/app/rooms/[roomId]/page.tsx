"use client";

import { useEffect, useState, use } from "react";
import BookingPanel from "@/app/components/BookingPanel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Room {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  property: {
    name: string;
    location: string;
  };
}

export default function RoomDetailsPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);

  const [room, setRoom] = useState<Room | null>(null);
  const [currentImage, setCurrentImage] = useState(0);


  
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(
        `http://localhost:5000/api/rooms/${roomId}`
      );
      const data = await res.json();
      setRoom(data);
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  if (!room)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-600">
          Loading...
        </div>
        <Footer />
      </>
    );

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Navbar />

      <div className="relative text-gray-800">

        {/* Background Overlay */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: "url('/images/about-overlay.png')" }}
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative z-10">

          {/* ================= HERO SECTION WITH SLIDER ================= */}
          <div className="max-w-7xl mx-auto px-6 pt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">

              {/* Slider Wrapper */}
              <div className="relative w-full h-137.5">

                {room.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000${img}`}
                    className={`absolute w-full h-137.5 object-cover transition-opacity duration-700 ${
                      index === currentImage
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    alt=""
                  />
                ))}

                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-r 
                                from-black/70 via-black/40 to-transparent" />

                {/* Left Content */}
                <div className="absolute bottom-12 left-12 text-white max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-serif mb-4">
                    {room.title}
                  </h1>

                  <p className="text-gray-200 mb-4">
                    Experience premium comfort and unforgettable stays at Oscenox.
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                      ₹ {room.pricePerNight} / night
                    </span>
                    <span className="text-sm text-gray-300">
                      {room.capacity} Guests
                    </span>
                  </div>
                </div>

                {/* Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 
                             bg-white/30 hover:bg-white/50 
                             text-white px-3 py-2 rounded-full backdrop-blur"
                >
                  ‹
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 
                             bg-white/30 hover:bg-white/50 
                             text-white px-3 py-2 rounded-full backdrop-blur"
                >
                  ›
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {room.images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer transition ${
                        index === currentImage
                          ? "bg-white"
                          : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>

              </div>

              {/* Booking Card */}
              <div
                className="lg:absolute lg:top-12 lg:right-12
                           relative mt-6 lg:mt-0
                           bg-white rounded-2xl shadow-2xl p-6
                           w-full max-w-sm border border-gray-200"
              >
                <BookingPanel room={room} />
              </div>

            </div>
          </div>

          {/* ================= NAVIGATION TABS ================= */}
          <div className="border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8 text-sm font-semibold text-gray-600 overflow-x-auto">
              <a href="#overview" className="hover:text-[#0f766e] transition">
                OVERVIEW
              </a>
              <a href="#amenities" className="hover:text-[#0f766e] transition">
                AMENITIES
              </a>
              <a href="#la-cafe" className="hover:text-[#0f766e] transition">
                LA-CAFE
              </a>
              <span>REVIEWS</span>
              <span>POLICIES</span>
            </div>
          </div>

          {/* ================= OVERVIEW ================= */}
          <div id="overview" className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-serif text-[#0f766e] mb-6">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* ================= AMENITIES ================= */}
          <div id="amenities" className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-serif text-[#0f766e] mb-10">
                Amenities
              </h2>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {room.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-6 
                               shadow-sm hover:shadow-lg transition text-center"
                  >
                    <div className="text-[#0f766e] font-semibold">
                      {amenity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= LA-CAFE ================= */}
          <div id="la-cafe" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-serif text-[#0f766e] mb-8">
              Discover LA-Cafe
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/la-cafe.jpg"
                  className="w-full h-87.5 object-cover"
                  alt="LA Cafe"
                />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#0f766e] mb-4">
                  Fine Dining & Premium Ambience
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Indulge in curated dishes, handcrafted beverages, and a
                  sophisticated ambiance designed to complement your stay.
                </p>

                <a
                  href="/la-cafe"
                  className="inline-block bg-[#0f766e] text-white px-6 py-3 rounded-full
                             hover:bg-[#0d5c56] transition"
                >
                  Explore LA-Cafe
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
