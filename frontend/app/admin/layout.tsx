"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdMargin } from "react-icons/md";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Bookings", href: "/admin/bookings" },
    { name: "Rooms", href: "/admin/rooms" },
    { name: "Users", href: "/admin/users" },
    { name: "Reports", href: "/admin/reports" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-white">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#111111] border-r border-white/10 flex flex-col">

        {/* LOGO */}
        <div className=" p-6 border-b border-white/10 flex justify-center">
          <Image
            src="/images/white.png"   // <-- put your logo inside public folder
            alt="OSCENOX Logo"
            width={120}
            height={120}
          />
          
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-6 space-y-2 text-sm">

          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#c6a75e] text-black font-medium"
                    : "hover:bg-white/5 text-white/70"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-6 border-t border-white/10 text-xs text-white/40">
          © 2026 OSCENOX CRM
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: "url('images/about-overlay.png')", // put your image in public folder
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br bg-[#0b1f1e]" />

        {/* Page Content */}
        <div className="relative z-10 p-10">
          {children}
        </div>
      </main>

    </div>
  );
}
