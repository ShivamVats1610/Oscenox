"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

interface Booking {
  _id: string;
  property: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: string;
}

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(
        "http://localhost:5000/api/bookings/my",
        { credentials: "include" }
      );

      const data = await res.json();
      setBookings(data.bookings);
      setLoading(false);
    };

    if (user) fetchBookings();
  }, [user]);

  if (!user) return null;

  return (
  <div className="relative min-h-screen text-gray-800">

    {/* Background Image Overlay */}
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/images/about-overlay.png')" }}
      />
      <div className="absolute inset-0 bg-white/40" />
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16">

      <Link
        href="/"
        className="text-[#0f766e] hover:underline font-medium"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-serif text-[#0f766e] mt-6 mb-12">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition"
            >

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-[#0f766e]">
                  {booking.property}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Booking Details */}
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">

                <div>
                  <p className="mb-2">
                    <span className="font-semibold text-gray-800">
                      Room:
                    </span>{" "}
                    {booking.roomType}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800">
                      Guests:
                    </span>{" "}
                    {booking.guests}
                  </p>
                </div>

                <div>
                  <p className="mb-2">
                    <span className="font-semibold text-gray-800">
                      Stay:
                    </span>{" "}
                    {new Date(booking.checkIn).toDateString()} →{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </p>

                  <p className="font-semibold text-[#0f766e] text-lg">
                    ₹ {booking.totalAmount}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
