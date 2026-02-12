"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function BookingPanel({ room }: any) {
  const { user } = useAuth();
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checkIn && checkOut) {
      const diff =
        (new Date(checkOut).getTime() -
          new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff > 0) setTotal(diff * room.pricePerNight);
      else setTotal(0);
    }
  }, [checkIn, checkOut]);

  const handleBooking = async () => {
    setError("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (!checkIn || !checkOut)
      return setError("Select dates first");

    const res = await fetch(
      "http://localhost:5000/api/bookings",
      {
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
      }
    );

    if (!res.ok) return setError("Booking failed");

    router.push("/my-bookings");
  };

  return (
    <div className="sticky top-24 bg-black/70 backdrop-blur-xl border border-[#c6a75e]/40 p-6 rounded-2xl text-white">

      <div className="text-2xl font-semibold text-[#c6a75e] mb-4">
        ₹ {room.pricePerNight} / night
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-3">{error}</p>
      )}

      <input
        type="date"
        min={today}
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
      />

      <input
        type="date"
        min={checkIn || today}
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
      />

      <input
        type="number"
        min={1}
        max={room.capacity}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="w-full mb-4 px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg"
      />

      <div className="text-[#c6a75e] font-semibold mb-4">
        Total: ₹ {total}
      </div>

      <button
        onClick={handleBooking}
        className="w-full py-3 bg-[#c6a75e] text-black rounded-lg font-semibold hover:bg-[#b8964d] transition"
      >
        Reserve Now
      </button>
    </div>
  );
}
