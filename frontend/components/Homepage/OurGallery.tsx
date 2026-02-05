export default function OurGallery() {
  const images = [
    "/images/swiss-cottage.jpg",
    "/images/about-2.webp",
    "/images/little-amsterdam.jpg",
  ];

  return (
    <section className="relative py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/greenbg.jpeg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Boxed Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="bg-black/35 backdrop-blur-md rounded-[40px] px-10 py-16 shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Our Gallery
            </h2>
            <div className="w-24 h-[2px] bg-[#007877] mx-auto mt-6" />
          </div>

          {/* Gallery Grid */}
          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative h-[280px] rounded-3xl overflow-hidden shadow-xl group"
              >
                <img
                  src={img}
                  alt="Oscenox Gallery"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-all" />
              </div>
            ))}
          </div>

          {/* Slider Dots (visual only) */}
          <div className="flex justify-center gap-3 mt-10">
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <span className="w-3 h-3 rounded-full bg-white" />
            <span className="w-3 h-3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
