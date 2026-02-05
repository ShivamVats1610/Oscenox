export default function WhatSetsUsApart() {
  const features = [
    {
      title: "Impeccable Design",
      desc: "Each property is meticulously designed to exude elegance and luxury, ensuring an enchanting and memorable stay.",
      icon: "✦",
    },
    {
      title: "Prime Locations",
      desc: "Our destinations are set in the most captivating and sought-after locations, offering unmatched surroundings.",
      icon: "⌖",
    },
    {
      title: "Unforgettable Experiences",
      desc: "We curate unique, personalized experiences that cater to the desires of discerning travelers.",
      icon: "✧",
    },
  ];

  return (
    <section className="relative py-32 bg-white">
      {/* Soft texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/light-texture.jpg')" }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-black">
            What Sets Us Apart
          </h2>
          <div className="w-20 h-[2px] bg-[#007877] mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-10 text-center shadow-lg border border-gray-100
                         hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl text-[#007877] mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-serif text-black mb-4">
                {item.title}
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
