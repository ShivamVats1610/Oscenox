export default function GetInTouch() {
  return (
    <section className="relative py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about-overlay.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0  backdrop-blur-sm" />

      {/* Boxed Container */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="bg-white/10 rounded-[40px] shadow-2xl px-10 py-16">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif text-black">
              Get in Touch with Oscenox
            </h2>
            <div className="w-24 h-[2px] bg-[#007877] mx-auto mt-6" />
            <p className="mt-6 text-black text-lg max-w-3xl mx-auto">
              Start your journey towards unmatched luxury.  
              Reach out to us for reservations, experiences, or personalized stays.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* FORM */}
            <form className="space-y-5 text-black">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-xl border  px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#007877]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full  rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#007877]"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full rounded-xl border px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#007877]"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full rounded-xl border  px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#007877]"
              />

              <button
                type="submit"
                className="mt-4 bg-[#007877] text-white px-10 py-4 rounded-full font-semibold hover:bg-black transition-all"
              >
                Send Message
              </button>
            </form>

            {/* IMAGE */}
            <div className="relative">
              <img
                src="/images/contact.png"
                alt="Contact Oscenox"
                className="rounded-3xl shadow-xl object-cover w-full h-[420px]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
