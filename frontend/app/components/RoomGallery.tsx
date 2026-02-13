"use client";

import { useState, useEffect } from "react";

interface Props {
  images: string[];
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RoomGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  /* ===========================================
     AUTO SLIDE
  =========================================== */
  useEffect(() => {
    if (hovering || fullscreen) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, hovering, fullscreen]);

  /* ===========================================
     ESC CLOSE FULLSCREEN
  =========================================== */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, []);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* ================= NORMAL GALLERY ================= */}
      <div
        className="space-y-4"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          className="relative rounded-2xl overflow-hidden group cursor-pointer"
          onClick={() => setFullscreen(true)}
        >
          <img
            src={`${BASE_URL}${images[active] ?? images[0]}`}
            alt="Room Image"
            className="w-full h-112.5 object-cover transition duration-700"
          />

          {/* LEFT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2
                       bg-black/50 backdrop-blur-md text-white
                       w-10 h-10 rounded-full flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition"
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2
                       bg-black/50 backdrop-blur-md text-white
                       w-10 h-10 rounded-full flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition"
          >
            ›
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <img
              key={index}
              onClick={() => setActive(index)}
              src={`${BASE_URL}${img}`}
              alt="Thumbnail"
              className={`h-24 w-32 object-cover rounded-xl cursor-pointer border-2 transition
                ${
                  active === index
                    ? "border-[#c6a75e]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ================= FULLSCREEN MODAL ================= */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-8 text-white text-3xl"
          >
            ✕
          </button>

          <div className="relative max-w-6xl w-full px-8">

            <img
              src={`${BASE_URL}${images[active] ?? images[0]}`}
              alt="Fullscreen Room"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />

            {/* LEFT ARROW */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2
                         text-white text-4xl px-6"
            >
              ‹
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2
                         text-white text-4xl px-6"
            >
              ›
            </button>
          </div>

          {/* BOTTOM THUMBNAILS */}
          <div className="absolute bottom-6 flex gap-4 overflow-x-auto px-8">
            {images.map((img, index) => (
              <img
                key={index}
                onClick={() => setActive(index)}
                src={`${BASE_URL}${img}`}
                alt="Thumbnail"
                className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 transition
                  ${
                    active === index
                      ? "border-[#c6a75e]"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
