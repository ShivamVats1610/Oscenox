"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0b1f1e] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-[#c6a75e]/40 text-white text-center">

        <Link href="/" className="text-sm text-[#c6a75e] hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-serif text-[#c6a75e] mt-6 mb-8">
          My Profile
        </h1>

        {/* Avatar */}
        <img
          src={
            user.profileImage
              ? `${BASE_URL}${user.profileImage}`
              : "/images/default-avatar.png"
          }
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border border-[#c6a75e]"
        />

        {/* Info */}
        <div className="mt-6 space-y-2">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <Link
          href="/account-settings"
          className="inline-block mt-8 px-8 py-3 bg-[#c6a75e] text-black font-semibold rounded-lg hover:bg-[#b8964d] transition"
        >
          Edit Account Settings
        </Link>

      </div>
    </div>
  );
}
