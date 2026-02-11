"use client";
import Link from "next/link";

export default function ExperienceRow() {
  const experiences = [
    {
      title: "Swiss Cottage",
      desc: "Alpine charm with cozy interiors and serene mountain surroundings.",
      image: "/images/swiss-cottage.jpg",
      link: "/swiss-cottage",
    },
    {
      title: "Little Amsterdam",
      desc: "European café vibes with warm lighting and signature flavors.",
      image: "/images/little-amsterdam.jpg",
      link: "/LA-Cafe",
    },
    {
      title: "Bunk Stay",
      desc: "Budget-friendly social living with modern comfort.",
      image: "/images/bunk-stay.jpg",
      link: "/bunk-stay",
    },
    {
      title: "Bike Rent",
      desc: "Explore Rishikesh freely with premium bike rentals.",
      image: "/images/bike-rent.jpg",
      link: "/bike-rent",
    },
    {
      title: "Rafting",
      desc: "Experience thrilling white-water rafting on the Ganges.",
      image: "/images/rafting.jpg",
      link: "/rafting",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      {/* BOXED CONTAINER */}
       <div
        className="relative rounded-3xl overflow-hidden py-24"
        style={{
          backgroundImage: "url('/images/greenbg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            Explore Our Experiences
          </h2>
          <div className="w-24 h-0.75 bg-[#c6a75e] mx-auto mt-4 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {experiences.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden border border-[#c6a75e]
                         bg-[#0b2a2a] shadow-2xl flex flex-col"
            >
              {/* Image */}
              <div
                className="h-55 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-6 text-center text-white">
                <div>
                  <h3 className="text-xl font-serif mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href={item.link}
                  className="mt-6 inline-block mx-auto border border-[#c6a75e]
                             px-6 py-2 text-xs rounded-full
                             hover:bg-[#c6a75e] hover:text-black
                             transition-all duration-300"
                >
                  Explore More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
