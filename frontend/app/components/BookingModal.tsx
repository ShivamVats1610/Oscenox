"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Props {
  propertyName: string;
  onClose: () => void;
}

export default function BookingModal({ propertyName, onClose }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [roomType, setRoomType] = useState("Standard");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pricing: Record<string, Record<string, number>> = {
    "Swiss Cottage": { Standard: 2500, Deluxe: 4000, Premium: 6000 },
    "Bunk Stay": { Standard: 800, Deluxe: 1200, Premium: 1800 },
    "LA Cafe": { Standard: 1500, Deluxe: 2200, Premium: 3000 },
  };

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut("");
    }
  }, [checkIn]);

  const calculateAmount = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (diff <= 0) return 0;

    return diff * (pricing[propertyName]?.[roomType] || 0);
  };

  const totalAmount = calculateAmount();

  const handleBooking = async () => {
    setError("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    if (totalAmount <= 0) {
      setError("Invalid stay duration.");
      return;
    }

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        property: propertyName,
        roomType,
        checkIn,
        checkOut,
        guests,
        totalAmount,
      }),
    });

    if (res.ok) {
      onClose();
      router.push("/my-bookings");
    } else {
      setError("Booking failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-flipIn">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/room-bg.jpg')",
          }}
        />

        <div className="relative bg-[#0b1f1e]/90 backdrop-blur-xl border border-[#c6a75e]/40 p-8 text-white">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-serif text-[#c6a75e] mb-6 text-center">
            Reserve Your Stay
          </h2>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* Room Type */}
          <label className="block text-sm mb-1">
            Select Room Type
          </label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
          >
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Premium</option>
          </select>

          {/* Dates */}
          <label className="block text-sm mb-1">
            Check-in Date
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
          />

          <label className="block text-sm mb-1">
            Check-out Date
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            disabled={!checkIn}
            className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
          />

          {/* Guests */}
          <label className="block text-sm mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
          />

          {/* Total */}
          <div className="text-[#c6a75e] font-semibold mb-6 text-center">
            Total Stay Price: ₹ {totalAmount}
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full py-3 bg-[#c6a75e] text-black font-semibold rounded-lg hover:bg-[#b8964d] transition"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-flipIn {
          animation: flipIn 0.5s ease-out;
          transform-origin: center;
        }

        @keyframes flipIn {
          from {
            opacity: 0;
            transform: rotateX(90deg) scale(0.95);
          }
          to {
            opacity: 1;
            transform: rotateX(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
