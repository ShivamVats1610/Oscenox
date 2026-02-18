"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

interface Property {
  _id: string;
  name: string;
  location: string;
}

export default function CreateRoomPage() {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    property: "",
    title: "",
    description: "",
    pricePerNight: "",
    capacity: "",
    amenities: "",
  });

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  /* ===========================================
     FETCH PROPERTIES
  =========================================== */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/properties`,
          { credentials: "include" }
        );

        const data = await res.json();
        setProperties(data || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchProperties();
  }, []);

  /* ===========================================
     HANDLE CHANGE
  =========================================== */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===========================================
     HANDLE SUBMIT
  =========================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("property", form.property);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("pricePerNight", form.pricePerNight);
      formData.append("capacity", form.capacity);

      formData.append(
        "amenities",
        JSON.stringify(
          form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean)
        )
      );

      if (selectedImages) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append("images", selectedImages[i]);
        }
      }

      const res = await fetch(
        `${BASE_URL}/api/rooms/admin/create`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Room creation failed");
      }

      router.push("/admin/rooms");
    } catch (error) {
      console.error("Create failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Create New Room
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-black/40 p-8 rounded-xl border border-[#c6a75e]/30 space-y-6"
      >
        {/* PROPERTY */}
        <div>
          <label className="block mb-2 text-sm">Property</label>
          <select
            name="property"
            value={form.property}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/20 p-3 rounded"
          >
            <option value="">Select Property</option>
            {properties.map((prop) => (
              <option key={prop._id} value={prop._id}>
                {prop.name} — {prop.location}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <div>
          <label className="block mb-2 text-sm">Room Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2 text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-2 text-sm">Price Per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={form.pricePerNight}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        {/* CAPACITY */}
        <div>
          <label className="block mb-2 text-sm">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        {/* AMENITIES */}
        <div>
          <label className="block mb-2 text-sm">
            Amenities (comma separated)
          </label>
          <input
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="WiFi, AC, Balcony"
            className="w-full bg-black border border-white/20 p-3 rounded"
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-2 text-sm">
            Upload Room Images
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

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#c6a75e] text-black px-6 py-3 rounded font-medium hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
}
