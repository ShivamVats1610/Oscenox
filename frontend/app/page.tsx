import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-10 md:grid-cols-3">
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
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-[#007877]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* PROPERTIES SECTION */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black">
            Our <span className="text-[#007877]">Properties</span>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {["Little Amsterdam", "Swiss Cottage", "Coming Soon"].map(
              (name, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                >
                  {/* IMAGE PLACEHOLDER */}
                  <div className="h-40 bg-gray-300 rounded-xl mb-4" />

                  <h4 className="font-semibold text-black">{name}</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Luxury stay experience by Oscenox
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#007877] py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Stay with Oscenox?
        </h2>
        <p className="mt-4 text-white/90">
          Book your premium stay with smart hospitality.
        </p>

        <Link
          href="/booking"
          className="inline-block mt-8 rounded-full bg-white px-8 py-3 font-semibold text-[#007877] hover:bg-black hover:text-white transition"
        >
          Book Now
        </Link>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
