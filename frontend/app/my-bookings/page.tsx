"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

interface Booking {
  _id: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: string;
  room?: {
    title?: string;
    images?: string[];
    property?: {
      name?: string;
      location?: string;
    };
  } | null;
}

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/bookings/my",
          { credentials: "include" }
        );

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Fetch bookings error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  if (!user) return null;

  const cancelBooking = async (id: string) => {
    const confirmCancel = confirm("Cancel this booking?");
    if (!confirmCancel) return;

    await fetch(
      `http://localhost:5000/api/bookings/cancel/${id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

  return (
    <div className="relative min-h-screen text-gray-800">
      {/* Background */}
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
            {bookings.map((booking) => {
              const propertyName =
                booking.room?.property?.name ??
                "Property unavailable";

              const propertyLocation =
                booking.room?.property?.location ?? "";

              const roomTitle =
                booking.room?.title ?? "Room unavailable";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif text-[#0f766e]">
                      {propertyName}
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

                  {/* Details */}
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                    <div>
                      <p className="mb-2">
                        <span className="font-semibold text-gray-800">
                          Room:
                        </span>{" "}
                        {roomTitle}
                      </p>

                      <p>
                        <span className="font-semibold text-gray-800">
                          Guests:
                        </span>{" "}
                        {booking.guests}
                      </p>

                      <p>
                        <span className="font-semibold text-gray-800">
                          Location:
                        </span>{" "}
                        {propertyLocation}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2">
                        <span className="font-semibold text-gray-800">
                          Stay:
                        </span>{" "}
                        {new Date(
                          booking.checkIn
                        ).toDateString()}{" "}
                        →{" "}
                        {new Date(
                          booking.checkOut
                        ).toDateString()}
                      </p>

                      <p className="font-semibold text-[#0f766e] text-lg">
                        ₹ {booking.totalAmount}
                      </p>

                      {booking.status !== "Cancelled" &&
                        new Date(booking.checkIn) >
                          new Date() && (
                          <button
                            onClick={() =>
                              cancelBooking(booking._id)
                            }
                            className="mt-4 px-5 py-2 text-sm rounded-full
                                       border border-red-500 text-red-600
                                       hover:bg-red-500 hover:text-white transition"
                          >
                            Cancel Booking
                          </button>
                        )}

                      <a
                        href={`http://localhost:5000/api/invoice/${booking._id}`}
                        target="_blank"
                        className="inline-block mt-4 px-5 py-2 bg-[#0f766e] text-white rounded-full text-sm"
                      >
                        Download Invoice
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
