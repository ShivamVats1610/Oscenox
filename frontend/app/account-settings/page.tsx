"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AccountSettingsPage() {
  const { user, refreshUser } = useAuth();

  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) return null;

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/users/profile/image`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      await refreshUser();
      setImage(null);
      setMessage("Profile image updated ✅");
    } catch (error) {
      setMessage("Image upload failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PROFILE UPDATE ================= */
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `${BASE_URL}/api/users/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email }),
        }
      );

      if (res.ok) {
        await refreshUser();
        setMessage("Profile updated successfully ✅");
      } else {
        setMessage("Failed to update profile ❌");
      }
    } catch (error) {
      setMessage("Profile update failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PASSWORD CHANGE ================= */
  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `${BASE_URL}/api/users/profile/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Password updated ✅");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage(data.message || "Password update failed ❌");
      }
    } catch (error) {
      setMessage("Password update failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-[#c6a75e]/40 text-white">

        <Link href="/" className="text-sm text-[#c6a75e] hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-serif text-[#c6a75e] mt-4 mb-6 text-center">
          Account Settings
        </h1>

        {message && (
          <p className="text-center text-sm mb-4 text-green-400">
            {message}
          </p>
        )}

        {/* ================= IMAGE ================= */}
        <div className="flex flex-col items-center gap-4 mb-8">

          <img
            src={
              user.profileImage
                ? `${BASE_URL}${user.profileImage}`
                : "/images/default-avatar.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-[#c6a75e]"
          />

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
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

        {/* ================= INFO ================= */}
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">
            Personal Information
          </h2>

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
            className="w-full py-3 bg-[#c6a75e] text-black rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>

        {/* ================= PASSWORD ================= */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full px-4 py-3 bg-black/40 border border-[#c6a75e]/30 rounded-lg text-white"
          />

          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="w-full py-3 bg-[#c6a75e] text-black rounded-lg font-semibold"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}
