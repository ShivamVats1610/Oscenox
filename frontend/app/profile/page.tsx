"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("profileImage", image);

    setLoading(true);

    await fetch("http://localhost:5000/api/users/profile/image", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    window.location.reload(); // refresh avatar
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center px-4">
      <div className="relative max-w-md w-full bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-[#c6a75e]/40 text-white">

        {/* 🔙 BACK TO HOME */}
        <Link
          href="/"
          className="absolute left-6 top-6 text-sm text-[#c6a75e] hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-serif text-[#c6a75e] mb-8 text-center">
          My Profile
        </h1>

        <div className="flex flex-col items-center gap-5">

          {/* AVATAR */}
          <img
            src={
              user.profileImage
                ? `http://localhost:5000${user.profileImage}`
                : "/images/default-avatar.png"
            }
            className="w-28 h-28 rounded-full object-cover border border-[#c6a75e]"
          />

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />

          {/* CUSTOM FILE BUTTON */}
          <label
            htmlFor="profileImage"
            className="cursor-pointer px-6 py-2 rounded-md border border-[#c6a75e]
            text-[#c6a75e] text-sm font-semibold
            hover:bg-[#c6a75e] hover:text-black
            transition-all duration-300"
          >
            📷 Choose Profile Image
          </label>

          {/* FILE NAME */}
          {image && (
            <p className="text-xs text-gray-300">
              Selected: {image.name}
            </p>
          )}

          {/* UPLOAD BUTTON */}
          <button
            onClick={handleUpload}
            disabled={!image || loading}
            className="mt-2 px-8 py-2 bg-[#c6a75e] text-black rounded-md font-semibold
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-[#b8964d] transition"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {/* USER INFO */}
        <div className="mt-8 text-center">
          <p className="text-lg font-medium">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
