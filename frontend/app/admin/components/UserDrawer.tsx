"use client";

import { useEffect, useState } from "react";

interface Props {
  userId: string | null;
  onClose: () => void;
}

interface Booking {
  _id: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  room?: {
    title: string;
    property?: {
      name: string;
      location: string;
    };
  };
}

interface UserDetails {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
  };
  bookingCount: number;
  revenue: number;
  bookings: Booking[];
}

export default function UserDrawer({ userId, onClose }: Props) {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  /* ===========================================
     FETCH USER DETAILS
  =========================================== */
  useEffect(() => {
    if (!userId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/users/admin/${userId}/details`,
          { credentials: "include" }
        );

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Drawer fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="w-130 bg-[#0b1f1e] text-white p-8 overflow-y-auto shadow-2xl border-l border-[#c6a75e]/30">

        {loading || !data ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <>
            {/* ================= HEADER ================= */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-[#c6a75e]">
                {data.user?.name ?? "User"}
              </h2>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* ================= BASIC INFO ================= */}
            <div className="space-y-2 text-sm mb-6">

              <p>
                <span className="text-gray-400">Email:</span>{" "}
                {data.user?.email}
              </p>

              <p>
                <span className="text-gray-400">Role:</span>{" "}
                {data.user?.role}
              </p>

              <p>
                <span className="text-gray-400">Status:</span>{" "}
                {data.user?.isBlocked ? "Blocked" : "Active"}
              </p>

              <p>
                <span className="text-gray-400">Joined:</span>{" "}
                {data.user?.createdAt
                  ? new Date(data.user.createdAt).toLocaleDateString()
                  : "-"}
              </p>

            </div>

            <div className="my-6 border-t border-[#c6a75e]/20" />

            {/* ================= SUMMARY CARDS ================= */}
            <div className="grid grid-cols-2 gap-4 mb-8">

              <div className="bg-black/40 p-4 rounded-xl border border-[#c6a75e]/20">
                <p className="text-xs text-gray-400">
                  Total Bookings
                </p>
                <p className="text-2xl font-semibold">
                  {data.bookingCount}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-[#c6a75e]/20">
                <p className="text-xs text-gray-400">
                  Lifetime Revenue
                </p>
                <p className="text-2xl font-semibold text-[#c6a75e]">
                  ₹ {data.revenue}
                </p>
              </div>

            </div>

            {/* ================= BOOKING HISTORY ================= */}
            <h3 className="text-lg font-semibold mb-4">
              Booking History
            </h3>

            <div className="space-y-4">

              {data.bookings.length === 0 && (
                <p className="text-gray-400 text-sm">
                  No bookings found.
                </p>
              )}

              {data.bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-black/40 p-4 rounded-xl border border-[#c6a75e]/20"
                >

                  {/* TOP ROW */}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-[#c6a75e]">
                      {booking.room?.title ?? "Room"}
                    </h4>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-600/20 text-green-400"
                          : booking.status === "Cancelled"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* PROPERTY */}
                  <p className="text-xs text-gray-400">
                    {booking.room?.property?.name ?? ""} —{" "}
                    {booking.room?.property?.location ?? ""}
                  </p>

                  {/* STAY DATES */}
                  <p className="text-xs text-gray-400 mt-1">
                    Stay:{" "}
                    {booking.checkIn
                      ? new Date(booking.checkIn).toDateString()
                      : "-"}{" "}
                    →{" "}
                    {booking.checkOut
                      ? new Date(booking.checkOut).toDateString()
                      : "-"}
                  </p>

                  {/* BOOKED DATE */}
                  <p className="text-xs text-gray-400">
                    Booked on:{" "}
                    {booking.createdAt
                      ? new Date(booking.createdAt).toDateString()
                      : "-"}
                  </p>

                  {/* BOTTOM ROW */}
                  <div className="flex justify-between items-center mt-3">

                    <p className="font-semibold text-[#c6a75e]">
                      ₹ {booking.totalAmount}
                    </p>

                    <a
                      href={`http://localhost:5000/api/invoice/${booking._id}`}
                      target="_blank"
                      className="text-xs bg-[#c6a75e] text-black px-3 py-1 rounded hover:opacity-90 transition"
                    >
                      Invoice
                    </a>

                  </div>

                </div>
              ))}

            </div>

          </>
        )}
      </div>
    </div>
  );
}
