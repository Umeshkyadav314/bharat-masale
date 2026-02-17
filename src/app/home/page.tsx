"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MasalaPacketCard } from "@/components/masala-packet-card";

const HERO_VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
  "https://cdn.coverr.co/videos/coverr-spices-and-herbs-in-a-wooden-bowl-4698771/1080p/preview.mp4",
];

const BLENDS = [
  {
    title: "Garam Masala",
    desc: "Aromatic blend of roasted spices",
    image: "https://picsum.photos/seed/garam-masala/600/400",
  },
  {
    title: "Elaichi",
    desc: "Premium green cardamom",
    image: "https://picsum.photos/seed/elaichi/600/400",
  },
  {
    title: "Turmeric & Spices",
    desc: "Pure haldi and traditional masale",
    image: "https://picsum.photos/seed/turmeric/600/400",
  },
];

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <>
      <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://picsum.photos/seed/bharat-hero/1920/1080"
        >
          {HERO_VIDEO_SOURCES.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-serif text-4xl font-bold tracking-tight drop-shadow-lg md:text-6xl">
            Premium Indian Spices
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Authentic masale and elaichi, sourced and blended with care for your
            kitchen.
          </p>
          <Link
            href="/home/products"
            className="mt-8 inline-flex rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition hover:bg-amber-500"
          >
            View Products
          </Link>
        </div>
      </section>

      <section className="border-t border-border/40 bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-semibold text-foreground">
            Our Finest Blends
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            Handpicked spices and premium elaichi for every dish.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BLENDS.map((item) => (
              <MasalaPacketCard
                key={item.title}
                name={item.title}
                desc={item.desc}
                image={item.image}
                showLabelStrip
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
