"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HERO_VIDEO_SOURCES = [
  "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
  "https://cdn.coverr.co/videos/coverr-spices-and-herbs-in-a-wooden-bowl-4698771/1080p/preview.mp4",
];

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto play video safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  // Redirect logged-in users
  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session, router]);

  // Loading state
  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white/80">Loading…</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex w-full items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <img src="/icon.svg" alt="Bharat Masale" className="h-10 w-10 rounded-lg" />
          <span className="font-serif text-xl font-semibold text-white">
            BharatMasale
          </span>
        </div>

        {session ? (
          <Link
            href="/home"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
          >
            Go to Website
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
          >
            Sign in
          </Link>
        )}
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-300">
          Premium Indian Spices
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold text-white md:text-7xl">
          Bharat Masale
        </h1>
        <p className="mt-6 max-w-md text-white/90 md:text-lg">
          Authentic masale and elaichi, crafted with tradition and purity.
        </p>

        <Link
          href="/home"
          className="mt-10 rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white shadow-xl hover:bg-amber-400"
        >
          Enter Main Website
        </Link>
      </div>

      {/* Inquiry Form */}
      <InquiryFormSection />

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center gap-4 border-t border-white/10 bg-black/40 px-6 py-4 text-xs text-white/70 backdrop-blur-sm">
        <span>100% Natural</span>
        <span>•</span>
        <span>Traditional Blends</span>
        <span>•</span>
        <span>Premium Quality</span>
      </footer>
    </main>
  );
}

function InquiryFormSection() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    contactMethod: "CALLBACK",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setDone(true);
      setForm({
        name: "",
        mobile: "",
        address: "",
        email: "",
        contactMethod: "CALLBACK",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="relative z-10 w-full border-t border-white/10 bg-black/40 px-6 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-serif text-2xl text-white">
          Get in touch
        </h2>

        {done ? (
          <p className="mt-6 text-center text-amber-300">
            Thank you! We’ll contact you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded bg-red-500/20 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            {["name", "mobile", "address", "email"].map((field) => (
              <input
                key={field}
                required
                type={field === "email" ? "email" : "text"}
                placeholder={field.toUpperCase()}
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              />
            ))}

            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 py-3 font-medium text-white hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Submit Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
