import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <Image
            src="https://picsum.photos/seed/bharat-about/800/600"
            alt="Premium spices"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            About Bharat Masale
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We bring you premium Indian spices and elaichi, rooted in tradition
            and chosen for quality. Every blend is crafted to elevate your
            cooking—from daily curries to festive feasts.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our masale are sourced from trusted growers and processed with care
            to preserve aroma and flavour. Whether you need garam masala,
            turmeric, or the finest green cardamom, we deliver authenticity to
            your kitchen.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-lg border border-border bg-card px-5 py-4">
              <span className="text-2xl font-semibold text-primary">100%</span>
              <p className="text-sm text-muted-foreground">Natural ingredients</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-5 py-4">
              <span className="text-2xl font-semibold text-primary">Traditional</span>
              <p className="text-sm text-muted-foreground">Blending methods</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
