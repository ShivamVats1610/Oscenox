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

// ✅ Production base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

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
      try {
        const res = await fetch(
          `${BASE_URL}/api/rooms/${roomId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch room");
        }

        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.error("Room fetch error:", error);
      }
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

        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: "url('/images/about-overlay.png')" }}
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>

        <div className="relative z-10">

          {/* HERO SECTION */}
          <div className="max-w-7xl mx-auto px-6 pt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">

              <div className="relative w-full h-137.5">

                {room.images.map((img, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}${img}`}
                    className={`absolute w-full h-137.5 object-cover transition-opacity duration-700 ${
                      index === currentImage
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    alt={room.title}
                  />
                ))}

                <div className="absolute inset-0 bg-linear-to-r 
                                from-black/70 via-black/40 to-transparent" />

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

          {/* OVERVIEW */}
          <div id="overview" className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-serif text-[#0f766e] mb-6">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* AMENITIES */}
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

        </div>
      </div>

      <Footer />
    </>
  );
}
