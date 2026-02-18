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

// ✅ Base URL from env
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function InvoicePage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/bookings/my`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invoices");
        }

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchInvoices();
  }, [user]);

  if (!user) return null;

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

      <div className="max-w-6xl mx-auto px-6 py-16">

        <Link href="/" className="text-[#0f766e] hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-serif text-[#0f766e] mt-6 mb-12">
          My Invoices
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading invoices...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No invoices found.</p>
        ) : (

          <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200">

            <table className="w-full text-sm">

              <thead className="bg-[#0f766e] text-white">
                <tr className="text-left">
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Stay</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">
                    Invoice
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      INV-{b._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="px-6 py-4">{b.property}</td>

                    <td className="px-6 py-4">{b.roomType}</td>

                    <td className="px-6 py-4">
                      {new Date(b.checkIn).toDateString()} →{" "}
                      {new Date(b.checkOut).toDateString()}
                    </td>

                    <td className="px-6 py-4 font-semibold text-[#0f766e]">
                      ₹ {b.totalAmount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <a
                        href={`${BASE_URL}/api/invoice/${b._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 bg-[#0f766e] text-white rounded-full text-sm"
                        title="Download Invoice"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        )}
      </div>
    </div>
  );
}
