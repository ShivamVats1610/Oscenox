"use client";
import Link from "next/link";
export default function AboutSwissCotage() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about-overlay.png')",
        }}
      />

      {/* Improved Overlay (NOT too white) */}
      <div className="absolute inset-0 bg-linear-to-b from-white/10 via-white/20 to-white/30" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            {/* Bigger ABOUT title */}
            <p className="uppercase tracking-[0.05em] text-3xl text-[#007877] font-bold">
              About Oscenox
            </p>

            <h2 className="mt-6 text-5xl md:text-6xl font-serif text-black leading-tight">
              Creating Extraordinary <br /> Stays
            </h2>

            <p className="mt-8 text-gray-800 leading-relaxed text-lg">
              Oscenox is dedicated to crafting unique and luxurious hospitality
              experiences. With meticulous attention to detail, we transform
              ordinary spaces into extraordinary destinations.
            </p>

            <p className="mt-5 text-gray-700 leading-relaxed">
              Our properties are designed to offer a perfect balance of comfort,
              elegance, and memorable experiences — whether you seek serenity,
              adventure, or vibrant social energy.
            </p>

            <Link
              href="/about-us"
              className="inline-block mt-10 bg-[#007877] text-white px-10 py-4 rounded-full font-semibold
                         hover:bg-black transition-all duration-300"
            >
              Read More
            </Link>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="grid grid-cols-2 gap-6">
            <img
              src="/images/about-2.webp"
              alt="Oscenox Property"
              className="rounded-3xl object-cover h-52 w-full shadow-lg"
            />
            <img
              src="/images/about-1.jpeg"
              alt="Luxury Interior"
              className="rounded-3xl object-cover h-52 w-full shadow-lg"
            />
            <img
              src="/images/about-3.jpg"
              alt="Mountain Stay"
              className="rounded-3xl object-cover h-56 w-full col-span-2 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
