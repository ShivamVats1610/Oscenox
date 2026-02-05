import Link from "next/link";

export default function ExperienceRow() {
  const experiences = [
    {
      title: "Swiss Cottage",
      subtitle: "by Oscenox",
      desc: "Alpine Charm & Cozy Retreats",
      image: "/images/swiss-cottage.jpg",
      link: "/swiss-cottage",
    },
    {
      title: "Little Amsterdam",
      subtitle: "Cafe by Oscenox",
      desc: "A Taste of Amsterdam",
      image: "/images/little-amsterdam.jpg",
      link: "/little-amsterdam",
    },
    {
      title: "Bunk Stay",
      subtitle: "by Oscenox",
      desc: "Social & Budget Living",
      image: "/images/bunk-stay.jpg",
      link: "/bunk-stay",
    },
    {
      title: "Bike Rent",
      subtitle: "by Oscenox",
      desc: "Explore Rishikesh",
      image: "/images/bike-rent.jpg",
      link: "/bike-rent",
    },
    {
      title: "Rafting",
      subtitle: "by Oscenox",
      desc: "Thrill on the Ganges",
      image: "/images/rafting.jpg",
      link: "/rafting",
    },
  ];

  return (
    /* OUTER SPACING (THIS FIXES YOUR ISSUE) */
    <section className="py-24 px-6 bg-white">
      
      {/* BOXED BACKGROUND */}
      <div
        className="relative rounded-3xl  overflow-hidden py-24"
        style={{
          backgroundImage: "url('/images/greenbg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/20  backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Experience Our Unique Destinations
            </h2>
            <div className="w-24 h-[3px] bg-[#007877] mx-auto mt-5 rounded-full" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {experiences.map((item, i) => (
              <div
                key={i}
                className="relative h-[420px] rounded-3xl overflow-hidden group shadow-xl"
                style={{
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Card Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div>
                    <h3 className="text-xl font-serif">{item.title}</h3>
                    <p className="text-xs opacity-90">{item.subtitle}</p>
                  </div>

                  <div>
                    <p className="text-sm mb-4">{item.desc}</p>
                    <Link
                      href={item.link}
                      className="inline-block border border-white px-5 py-2.5 text-xs rounded-full
                                 hover:bg-white hover:text-[#007877] transition"
                    >
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
