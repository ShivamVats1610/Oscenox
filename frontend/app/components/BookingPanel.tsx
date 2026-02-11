"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Props {
  room: any;
}

export default function BookingPanel({ room }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate total price
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const diff =
        (end.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setTotal(diff * room.pricePerNight);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, room.pricePerNight]);

  // Check availability from backend
  useEffect(() => {
    const checkAvailability = async () => {
      if (!checkIn || !checkOut) return;

      const res = await fetch(
        "http://localhost:5000/api/bookings/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: room._id,
            checkIn,
            checkOut,
          }),
        }
      );

      const data = await res.json();
      setAvailable(data.available);
    };

    checkAvailability();
  }, [checkIn, checkOut, room._id]);

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut || total <= 0) {
      return;
    }

    if (!available) return;

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        room: room._id,
        checkIn,
        checkOut,
        guests,
        totalAmount: total,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/my-bookings");
    }
  };

  return (
    <div className="sticky top-24 bg-black/70 backdrop-blur-xl border border-[#c6a75e]/40 p-6 rounded-2xl">

      <div className="text-2xl font-semibold text-[#c6a75e] mb-6">
        ₹ {room.pricePerNight} / night
      </div>

      {/* Check-in */}
      <label className="text-sm text-white mb-1 block">
        Check-in Date
      </label>
      <input
        type="date"
        min={today}
        value={checkIn}
        onChange={(e) => {
          setCheckIn(e.target.value);
          setAvailable(null);
        }}
        className="w-full mb-4 px-4 py-3 text-white bg-black/40 border border-[#c6a75e]/30 rounded-lg"
      />

      {/* Check-out */}
      <label className="text-sm text-white mb-1 block">
        Check-out Date
      </label>
      <input
        type="date"
        min={checkIn || today}
        value={checkOut}
        onChange={(e) => {
          setCheckOut(e.target.value);
          setAvailable(null);
        }}
        disabled={!checkIn}
        className="w-full mb-4 px-4 py-3 text-white bg-black/40 border border-[#c6a75e]/30 rounded-lg disabled:opacity-50"
      />

      {/* Guests */}
      <label className="text-sm text-gray-300 mb-1 block">
        Guests
      </label>
      <input
        type="number"
        min={1}
        max={room.capacity}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="w-full mb-4 px-4 py-3 text-white bg-black/40 border border-[#c6a75e]/30 rounded-lg"
      />

      {/* Total */}
      <div className="text-[#c6a75e] font-semibold mb-2">
        Total: ₹ {total}
      </div>

      {/* Availability Message */}
      {available === false && (
        <div className="text-red-400 text-sm mb-3">
          ❌ Not available for selected dates
        </div>
      )}

      {available === true && (
        <div className="text-green-400 text-sm mb-3">
          ✓ Available for booking
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleBooking}
        disabled={!available || loading || total <= 0}
        className="w-full py-3 bg-[#c6a75e] text-black rounded-lg font-semibold
                   hover:bg-[#b8964d] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Reserve Now"}
      </button>
    </div>
  );
}
