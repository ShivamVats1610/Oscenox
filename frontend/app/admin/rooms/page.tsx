"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Room {
  _id: string;
  title: string;
  pricePerNight: number;
  capacity: number;
  isDeleted: boolean;
  property?: {
    name: string;
    location: string;
  } | null;
}

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/rooms/admin/all${
          showArchived ? "?archived=true" : ""
        }`,
        { credentials: "include" }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch rooms");
      }

      const data = await res.json();
      setRooms(data || []);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [showArchived]);

  /* ARCHIVE ROOM */
  const archiveRoom = async (id: string) => {
    if (!confirm("Archive this room?")) return;

    try {
      const res = await fetch(
        `${BASE_URL}/api/rooms/admin/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Archive failed");
      }

      fetchRooms();
    } catch (error) {
      console.error("Archive failed:", error);
    }
  };

  /* RESTORE ROOM */
  const restoreRoom = async (id: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/rooms/admin/restore/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Restore failed");
      }

      fetchRooms();
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif text-[#c6a75e]">
          Rooms Manager
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setShowArchived(false)}
            className={`px-4 py-2 rounded ${
              !showArchived
                ? "bg-[#c6a75e] text-black"
                : "bg-black/40"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setShowArchived(true)}
            className={`px-4 py-2 rounded ${
              showArchived
                ? "bg-[#c6a75e] text-black"
                : "bg-black/40"
            }`}
          >
            Archived
          </button>

          {!showArchived && (
            <Link
              href="/admin/rooms/create"
              className="bg-[#c6a75e] text-black px-5 py-2 rounded font-medium"
            >
              + Add Room
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-gray-400 text-center">
          Loading rooms...
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-gray-400 text-center">
          No rooms found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-[#c6a75e]/30">
            <thead className="bg-black/50">
              <tr>
                <th className="p-3 text-left">Room</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Capacity</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr
                  key={room._id}
                  className="border-t border-[#c6a75e]/20 hover:bg-black/20 transition"
                >
                  <td className="p-3 font-medium">
                    {room.title}
                  </td>

                  <td className="p-3">
                    {room.property?.name ?? "Property Missing"}
                    <br />
                    <span className="text-xs text-gray-500">
                      {room.property?.location ?? ""}
                    </span>
                  </td>

                  <td className="p-3 text-[#c6a75e]">
                    ₹ {room.pricePerNight}
                  </td>

                  <td className="p-3">
                    {room.capacity} Guests
                  </td>

                  <td className="p-3 space-x-2">
                    {!room.isDeleted ? (
                      <>
                        <Link
                          href={`/admin/rooms/${room._id}`}
                          className="px-3 py-1 bg-blue-600/80 hover:bg-blue-600 rounded text-sm transition inline-block"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => archiveRoom(room._id)}
                          className="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded text-sm transition"
                        >
                          Archive
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => restoreRoom(room._id)}
                        className="px-3 py-1 bg-green-600/80 hover:bg-green-600 rounded text-sm transition"
                      >
                        Restore
                      </button>
                    )}
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
