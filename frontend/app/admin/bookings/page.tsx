"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  room: {
    title: string;
    pricePerNight: number;
  };
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const res = await fetch(
      "http://localhost:5000/api/bookings/admin/all",
      { credentials: "include" }
    );

    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
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
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Admin Booking Dashboard
      </h1>

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
                className="border-t border-[#c6a75e]/20"
              >
                <td className="p-3">
                  {booking.user.name}
                  <br />
                  <span className="text-sm text-gray-400">
                    {booking.user.email}
                  </span>
                </td>

                <td className="p-3">
                  {booking.room.title}
                </td>

                <td className="p-3">
                  {new Date(booking.checkIn).toLocaleDateString()} -
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>

                <td className="p-3 text-[#c6a75e]">
                  ₹ {booking.totalAmount}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                      ${
                        booking.status === "Confirmed"
                          ? "bg-green-600"
                          : booking.status === "Cancelled"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "Confirmed")
                    }
                    className="px-3 py-1 bg-green-600 rounded text-sm"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(booking._id, "Cancelled")
                    }
                    className="px-3 py-1 bg-red-600 rounded text-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
