"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Room {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  images: string[];
  property: {
    name: string;
  };
}

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [property, setProperty] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setProperty(params.get("property"));
    }
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/rooms${
            property ? `?property=${property}` : ""
          }`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Rooms fetch error:", error);
      }
    };

    fetchRooms();
  }, [property]);

  return (
    <>
      <Navbar />

      <div className="relative bg-white text-gray-800 overflow-hidden">

        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage: "url('/images/about-overlay.png')",
          }}
        />
        <div className="absolute inset-0 bg-white/40" />

        <div className="relative z-10">

          {/* HERO SECTION */}
          <div
            className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/rooms-banner.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />

            <h1 className="relative z-10 text-4xl md:text-6xl font-serif text-white text-center">
              Welcome to Rooms by Oscenox
            </h1>
          </div>

          {/* ROOM BOOKING CARDS */}
          <div className="py-20 px-6">
            <div className="max-w-6xl mx-auto">

              <h2 className="text-center text-4xl font-serif text-[#0f766e] mb-16">
                Our Room Options
              </h2>

              <div className="space-y-10">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden 
                               flex flex-col md:flex-row 
                               hover:shadow-2xl transition duration-500"
                  >

                    {/* Room Image */}
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img
                        src={`${BASE_URL}${room.images[0]}`}
                        className="w-full h-full object-cover"
                        alt={room.title}
                      />
                    </div>

                    {/* Room Info */}
                    <div className="flex-1 p-8">
                      <h3 className="text-2xl font-serif text-[#0f766e] mb-3">
                        {room.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {room.description}
                      </p>

                      <div className="text-sm text-gray-500">
                        Capacity: {room.capacity} Guests
                      </div>
                    </div>

                    {/* Price Panel */}
                    <div className="bg-[#0f766e] text-white p-8 flex flex-col justify-center items-center md:w-64">
                      <div className="text-2xl font-bold mb-1">
                        ₹ {room.pricePerNight}
                      </div>
                      <div className="text-sm mb-6">
                        / night
                      </div>

                      <Link
                        href={`/rooms/${room._id}`}
                        className="bg-white text-[#0f766e] px-6 py-3 rounded-full
                                   hover:bg-gray-100 transition font-semibold"
                      >
                        Reserve Now
                      </Link>
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
