"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { name: "Home", path: "/" },
    { name: "Swiss Cottage", path: "/swiss-cottage" },
    { name: "LA Cafe", path: "/LA-Cafe" },
    { name: "Bunk Stay", path: "/bunk-stay" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <header className="w-full bg-[#f4fbfb] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Oscenox"
            className="h-20 w-40 object-contain"
          />
        </Link>

        {/* NAV MENU */}
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

        {/* CONTACT BUTTON */}
        <Link
          href="/contact"
          className="flex items-center gap-2 bg-[#007877] text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
        >
          📞 CONTACT US
        </Link>
      </div>
    </header>
  );
}
