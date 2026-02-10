"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const menu = [
    { name: "Home", path: "/" },
    { name: "Swiss Cottage", path: "/swiss-cottage" },
    { name: "LA Cafe", path: "/LA-Cafe" },
    { name: "Bunk Stay", path: "/bunk-stay" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#f4fbfb] border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* ========== MOBILE HAMBURGER ========== */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[#007877]"
            aria-label="Open menu"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-7 bg-current" />
              <span className="block h-0.5 w-7 bg-current" />
              <span className="block h-0.5 w-7 bg-current" />
            </div>
          </button>

          {/* ========== LOGO (CENTERED ON MOBILE) ========== */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center"
          >
            <img
              src="/images/logo.png"
              alt="Oscenox"
              className="h-12 sm:h-14 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* ========== DESKTOP MENU ========== */}
          <nav className="hidden md:flex gap-10 items-center">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-[15px] font-semibold tracking-wide pb-1 transition-all duration-300
                  ${
                    pathname === item.path
                      ? "text-[#007877] border-b-2 border-[#007877]"
                      : "text-black hover:text-[#007877] hover:-translate-y-0.5"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* ========== RIGHT ACTION BUTTONS (DESKTOP) ========== */}
          {!loading && (
            <div className="hidden md:flex items-center gap-4">

              {/* CONTACT */}
              <Link
                href="/contact"
                className="h-11 px-6 inline-flex items-center justify-center bg-[#007877] text-white rounded-md text-sm font-semibold hover:opacity-90 transition"
              >
                📞 CONTACT US
              </Link>

              {/* AUTH */}
              {user ? (
                <button
                  onClick={logout}
                  className="h-11 px-6 inline-flex items-center justify-center rounded-md
                  text-sm font-semibold text-white
                  bg-linear-to-r from-red-500 to-red-600
                  hover:from-red-600 hover:to-red-700
                  transition-all duration-300 hover:scale-[1.04]"
                >
                  Logout
                </button>
              ) : (
                <div className="flex h-11 rounded-md overflow-hidden border border-[#007877]">
                  <Link
                    href="/login"
                    className="px-5 flex items-center justify-center text-sm font-semibold
                    text-[#007877] bg-white hover:bg-[#007877] hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 flex items-center justify-center text-sm font-semibold
                    text-white bg-[#007877] hover:bg-[#005f5b] transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ========== MOBILE AUTH BUTTONS ========== */}
          {!loading && (
            <div className="md:hidden flex items-center gap-3">
              {user ? (
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-semibold text-[#007877]"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE BACKDROP ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <img
            src="/images/logo.png"
            alt="Oscenox"
            className="h-12 w-auto object-contain"
          />
          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-700"
          >
            ×
          </button>
        </div>

        {/* SIDEBAR MENU */}
        <nav className="px-6 py-6 space-y-5">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`block text-[15px] font-semibold transition
                ${
                  pathname === item.path
                    ? "text-[#007877]"
                    : "text-gray-800 hover:text-[#007877]"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* CONTACT US */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-8 bg-[#007877] text-white text-center py-3 rounded-md font-semibold"
          >
            📞 Contact Us
          </Link>
        </nav>
      </aside>
    </>
  );
}
