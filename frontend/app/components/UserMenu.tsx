"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  console.log("UserMenu user:", user); // 🔍 DEBUG

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <img
          src={
            user.profileImage
              ? `http://localhost:5000${user.profileImage}`
              : "/images/default-avatar.png"
          }
          alt="User"
          className="w-10 h-10 rounded-full object-cover border border-[#c6a75e]"
        />
        <span className="text-[#007877] text-sm">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <nav className="py-2 text-sm text-black">
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>
            <Link href="/my-bookings" className="block px-4 py-2 hover:bg-gray-100">
              My Bookings
            </Link>
            <Link href="/invoices" className="block px-4 py-2 hover:bg-gray-100">
              Invoices
            </Link>
            <Link href="/account-settings" className="block px-4 py-2 hover:bg-gray-100">
              Account Settings
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
