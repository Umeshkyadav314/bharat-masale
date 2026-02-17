import { MasalaPacketCard } from "@/components/masala-packet-card";

const products = [
  {
    name: "Garam Masala (100g)",
    price: "₹ 199",
    desc: "Signature blend",
    image: "https://picsum.photos/seed/garam-masala/400/300",
  },
  {
    name: "Elaichi Green (50g)",
    price: "₹ 349",
    desc: "Premium cardamom",
    image: "https://picsum.photos/seed/elaichi/400/300",
  },
  {
    name: "Turmeric Powder (200g)",
    price: "₹ 149",
    desc: "Pure haldi",
    image: "https://picsum.photos/seed/turmeric/400/300",
  },
  {
    name: "Cumin Powder (100g)",
    price: "₹ 99",
    desc: "Jeera powder",
    image: "https://picsum.photos/seed/cumin/400/300",
  },
  {
    name: "Coriander Powder (100g)",
    price: "₹ 89",
    desc: "Dhania powder",
    image: "https://picsum.photos/seed/coriander/400/300",
  },
  {
    name: "Chaat Masala (100g)",
    price: "₹ 129",
    desc: "Tangy blend",
    image: "https://picsum.photos/seed/chaat-masala/400/300",
  },
];

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Prices
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Transparent pricing on all our premium masale and elaichi. Prices may
          vary by region.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md"
          >
            <div className="p-4">
              <MasalaPacketCard
                name={item.name}
                image={item.image}
                showLabelStrip
                size="compact"
                aspectRatio="4/3"
              />
            </div>
            <div className="border-t border-border p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              <p className="mt-4 text-2xl font-semibold text-primary">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
