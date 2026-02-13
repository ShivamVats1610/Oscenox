"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  user?: {
    name: string;
    email: string;
  } | null;
  room?: {
    title: string;
    pricePerNight: number;
    property?: {
      name: string;
      location: string;
    };
  } | null;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/bookings/admin/all",
        { credentials: "include" }
      );

      const data = await res.json();

      setBookings(data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(
        `http://localhost:5000/api/bookings/admin/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      fetchBookings();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Admin Booking Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-gray-400">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-400">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-[#c6a75e]/30">
            <thead className="bg-black/50">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Room</th>
                <th className="p-3 text-left">Dates</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-[#c6a75e]/20 hover:bg-black/20 transition"
                >
                  {/* USER */}
                  <td className="p-3">
                    {booking.user?.name ?? "User Deleted"}
                    <br />
                    <span className="text-sm text-gray-400">
                      {booking.user?.email ?? ""}
                    </span>
                  </td>

                  {/* ROOM */}
                  <td className="p-3">
                    {booking.room?.title ?? "Room Not Found"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {booking.room?.property?.name ?? ""}
                    </span>
                  </td>

                  {/* DATES */}
                  <td className="p-3">
                    {new Date(booking.checkIn).toLocaleDateString()} –{" "}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>

                  {/* AMOUNT */}
                  <td className="p-3 text-[#c6a75e] font-medium">
                    ₹ {booking.totalAmount}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          booking.status === "Confirmed"
                            ? "bg-green-600/20 text-green-400"
                            : booking.status === "Cancelled"
                            ? "bg-red-600/20 text-red-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        updateStatus(booking._id, "Confirmed")
                      }
                      className="px-3 py-1 bg-green-600/80 hover:bg-green-600 rounded text-sm transition"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking._id, "Cancelled")
                      }
                      className="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded text-sm transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
