"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#f4fbfb] border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* MOBILE HAMBURGER */}
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

          {/* LOGO (CENTER + BIGGER ON MOBILE) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <img
              src="/images/logo.png"
              alt="Oscenox"
              className="h-16 sm:h-18 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 items-center">
            {menu.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium pb-1 transition
                  ${
                    pathname === item.path
                      ? "text-[#007877] border-b-2 border-[#007877]"
                      : "text-black hover:text-[#007877]"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CONTACT BUTTON */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#007877] text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            📞 CONTACT US
          </Link>
        </div>
      </header>

      {/* MOBILE SIDEBAR BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-70 bg-white z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <img
            src="/images/logo.png"
            alt="Oscenox"
            className="h-14 w-auto"
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
              className={`block text-base font-medium transition
                ${
                  pathname === item.path
                    ? "text-[#007877]"
                    : "text-gray-800 hover:text-[#007877]"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
