"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return null;

  // 🖼 Upload Profile Image
  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("profileImage", image);

    setLoading(true);

    await fetch("http://localhost:5000/api/users/profile/image", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    await refreshUser();
    setImage(null);
    setLoading(false);
  };

  // ✏ Update Name + Email
  const handleProfileUpdate = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      await refreshUser();
      setMessage("Profile updated successfully ✅");
    } else {
      setMessage("Failed to update profile ❌");
    }

    setLoading(false);
  };

  // 🔐 Change Password
  const handlePasswordChange = async () => {
    setLoading(true);
    setMessage("");

    const res = await fetch(
      "http://localhost:5000/api/users/profile/password",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setMessage(data.message || "Password update failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-[#c6a75e]/40 text-white">

        <Link href="/" className="text-sm text-[#c6a75e] hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-serif text-[#c6a75e] mt-4 mb-6 text-center">
          My Profile
        </h1>

        {message && (
          <p className="text-center text-sm mb-4 text-green-400">
            {message}
          </p>
        )}

        {/* ================= IMAGE SECTION ================= */}
        <div className="flex flex-col items-center gap-4 mb-8">

          <img
            src={
              user.profileImage
                ? `http://localhost:5000${user.profileImage}`
                : "/images/default-avatar.png"
            }
            className="w-28 h-28 rounded-full object-cover border border-[#c6a75e]"
          />

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
          />

          <label
            htmlFor="profileImage"
            className="cursor-pointer px-6 py-2 rounded-md border border-[#c6a75e]
            text-[#c6a75e] text-sm font-semibold
            hover:bg-[#c6a75e] hover:text-black transition"
          >
            Choose Profile Image
          </label>

          {image && (
            <button
              onClick={handleImageUpload}
              disabled={loading}
              className="px-6 py-2 bg-[#c6a75e] text-black rounded-md font-semibold"
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          )}
        </div>

        {/* ================= PERSONAL INFO ================= */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Personal Information</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <button
            onClick={handleProfileUpdate}
            disabled={loading}
            className="w-full py-2 bg-[#c6a75e] text-black rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>

        {/* ================= PASSWORD SECTION ================= */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Change Password</h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="w-full py-2 bg-[#c6a75e] text-black rounded-lg font-semibold"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}
