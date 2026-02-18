"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Room {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ROOM ================= */
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/rooms/${roomId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch room");
        }

        const data = await res.json();

        setRoom({
          ...data,
          images: data.images || [],
          amenities: data.amenities || [],
        });
      } catch (error) {
        console.error("Failed to fetch room:", error);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  /* ================= REMOVE IMAGE ================= */
  const removeImage = (image: string) => {
    if (!room) return;

    const updatedImages = room.images.filter(
      (img) => img !== image
    );

    setRoom({ ...room, images: updatedImages });
  };

  /* ================= UPDATE ROOM ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", room.title);
      formData.append("description", room.description);
      formData.append(
        "pricePerNight",
        String(room.pricePerNight)
      );
      formData.append("capacity", String(room.capacity));
      formData.append(
        "amenities",
        JSON.stringify(room.amenities)
      );
      formData.append(
        "existingImages",
        JSON.stringify(room.images)
      );

      if (selectedImages) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append("images", selectedImages[i]);
        }
      }

      const res = await fetch(
        `${BASE_URL}/api/rooms/admin/${roomId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      router.push("/admin/rooms");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!room)
    return (
      <div className="p-10 text-white">
        Loading room...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Edit Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-black/40 p-8 rounded-xl border border-[#c6a75e]/30 space-y-6"
      >
        <input
          value={room.title}
          onChange={(e) =>
            setRoom({ ...room, title: e.target.value })
          }
          className="w-full bg-black border border-white/20 p-3 rounded"
        />

        <textarea
          value={room.description}
          onChange={(e) =>
            setRoom({
              ...room,
              description: e.target.value,
            })
          }
          className="w-full bg-black border border-white/20 p-3 rounded"
        />

        <input
          type="number"
          value={room.pricePerNight}
          onChange={(e) =>
            setRoom({
              ...room,
              pricePerNight: Number(e.target.value),
            })
          }
          className="w-full bg-black border border-white/20 p-3 rounded"
        />

        <input
          type="number"
          value={room.capacity}
          onChange={(e) =>
            setRoom({
              ...room,
              capacity: Number(e.target.value),
            })
          }
          className="w-full bg-black border border-white/20 p-3 rounded"
        />

        {/* EXISTING IMAGES */}
        <div>
          <h3 className="mb-3 text-sm">
            Existing Images
          </h3>

          <div className="grid grid-cols-3 gap-4">
            {room.images && room.images.length > 0 ? (
              room.images.map((img) => (
                <div key={img} className="relative">
                  <img
                    src={`${BASE_URL}${img}`}
                    className="rounded-lg h-32 w-full object-cover"
                    alt="Room"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No images uploaded yet.
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Add New Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setSelectedImages(e.target.files)
            }
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#c6a75e] text-black px-6 py-3 rounded font-medium hover:opacity-90 transition"
        >
          {loading ? "Updating..." : "Update Room"}
        </button>
      </form>
    </div>
  );
}
