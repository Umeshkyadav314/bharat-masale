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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  // Logged-in users: redirect to main website
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/home");
    }
  }, [status, session, router]);

  if (status === "authenticated") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white/80">Taking you to the website…</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
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
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
          aria-hidden
        />
      </div>

      <header className="relative z-10 flex w-full items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <img
            src="/icon.svg"
            alt=""
            className="h-10 w-10 rounded-lg"
            width={40}
            height={40}
          />
          <span className="font-serif text-xl font-semibold text-white">
            BharatMasale
          </span>
        </div>
        {status === "authenticated" ? (
          <Link
            href="/home"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Go to Website
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Sign in
          </Link>
        )}
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/90">
          Premium Indian Spices
        </p>
        <h1 className="mt-3 font-serif text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-7xl">
          Bharat Masale
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 md:text-lg">
          Authentic masale and elaichi, crafted with tradition. Trusted by
          kitchens across India.
        </p>
        <Link
          href="/home"
          className="mt-10 inline-flex flex-col items-center rounded-lg bg-amber-500 px-8 py-4 font-semibold text-white shadow-xl transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          <span>Enter main website</span>
          <span className="mt-1 text-sm font-normal opacity-90">
            View products, prices & more
          </span>
        </Link>
      </div>

      <InquiryFormSection />

      <footer className="relative z-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
        <span className="text-xs text-white/70">100% Natural</span>
        <span className="text-xs text-white/70">•</span>
        <span className="text-xs text-white/70">Traditional Blends</span>
        <span className="text-xs text-white/70">•</span>
        <span className="text-xs text-white/70">Premium Quality</span>
      </footer>
    </main>
  );
}

function InquiryFormSection() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<"CALLBACK" | "EMAIL">("CALLBACK");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          address,
          email,
          contactMethod,
          message: message || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not submit.");
        setLoading(false);
        return;
      }
      setDone(true);
      setName("");
      setMobile("");
      setAddress("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <section className="relative z-10 w-full border-t border-white/10 bg-black/40 px-6 py-12 backdrop-blur-sm md:py-16">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-white md:text-3xl">
          Get in touch
        </h2>
        <p className="mt-2 text-center text-sm text-white/80">
          Share your details. We’ll reach you by phone or email as per your choice.
        </p>
        {done ? (
          <p className="mt-6 text-center text-amber-300">
            Thank you. We’ll contact you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded bg-red-500/20 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}
            <input
              type="text"
              placeholder="Full name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <input
              type="tel"
              placeholder="Mobile number *"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <input
              type="text"
              placeholder="Address *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-white/90">
                <input
                  type="radio"
                  name="contactMethod"
                  checked={contactMethod === "CALLBACK"}
                  onChange={() => setContactMethod("CALLBACK")}
                  className="h-4 w-4 accent-amber-500"
                />
                <span>Call me back</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-white/90">
                <input
                  type="radio"
                  name="contactMethod"
                  checked={contactMethod === "EMAIL"}
                  onChange={() => setContactMethod("EMAIL")}
                  className="h-4 w-4 accent-amber-500"
                />
                <span>Contact by email</span>
              </label>
            </div>
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 py-3 font-medium text-white transition hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Submit inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
