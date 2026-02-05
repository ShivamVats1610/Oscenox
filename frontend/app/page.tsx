import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black">
            Premium Stays.{" "}
            <span className="text-[#007877]">Smart Hospitality.</span>
          </h1>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
            Seamless bookings, intelligent services, and unforgettable stay
            experiences — powered by Oscenox.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/booking"
              className="bg-[#007877] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90"
            >
              Book Your Stay
            </Link>
            <Link
              href="/properties"
              className="border border-[#007877] text-[#007877] px-8 py-3 rounded-full font-semibold hover:bg-[#007877] hover:text-white transition"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Smart Booking",
            desc: "Real-time availability with instant confirmation.",
          },
          {
            title: "Digital Restaurant",
            desc: "QR-based menus and room-linked food ordering.",
          },
          {
            title: "AI Assistance",
            desc: "24/7 AI-powered guest and staff support.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-[#007877]">
              {item.title}
            </h3>
            <p className="mt-3 text-gray-700 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* PROPERTIES */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black">
            Our <span className="text-[#007877]">Properties</span>
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {["Little Amsterdam", "Swiss Cottage", "Coming Soon"].map(
              (name, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6"
                >
                  <div className="h-40 bg-gray-300 rounded-xl mb-4" />
                  <h4 className="font-semibold text-black">{name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Luxury stay experience by Oscenox
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#007877] py-20 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Stay with Oscenox?</h2>
        <p className="mt-4">
          Book your premium stay with smart hospitality.
        </p>
        <Link
          href="/booking"
          className="inline-block mt-8 bg-white text-[#007877] px-8 py-3 rounded-full font-semibold"
        >
          Book Now
        </Link>
      </section>

      <Footer />
    </>
  );
}
