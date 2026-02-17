import { MasalaPacketCard } from "@/components/masala-packet-card";

const products = [
  {
    name: "Garam Masala",
    desc: "Aromatic blend of roasted spices for curries and biryanis.",
    image: "https://picsum.photos/seed/garam-masala/600/400",
  },
  {
    name: "Elaichi (Green Cardamom)",
    desc: "Premium green cardamom for sweets and chai.",
    image: "https://picsum.photos/seed/elaichi/600/400",
  },
  {
    name: "Turmeric (Haldi)",
    desc: "Pure turmeric powder for colour and wellness.",
    image: "https://picsum.photos/seed/turmeric/600/400",
  },
  {
    name: "Cumin & Coriander",
    desc: "Freshly ground jeera and dhania for everyday cooking.",
    image: "https://picsum.photos/seed/cumin-coriander/600/400",
  },
  {
    name: "Chaat Masala",
    desc: "Tangy blend for chaats, fruits and snacks.",
    image: "https://picsum.photos/seed/chaat-masala/600/400",
  },
  {
    name: "Kashmiri Red Chilli",
    desc: "Mild, vibrant red chilli powder for colour and flavour.",
    image: "https://picsum.photos/seed/kashmiri-chilli/600/400",
  },
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Products
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Explore our range of premium Indian masale and elaichi.
        </p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.name}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md"
          >
            <div className="p-4">
              <MasalaPacketCard
                name={item.name}
                image={item.image}
                showLabelStrip
                aspectRatio="4/3"
              />
            </div>
            <div className="border-t border-border p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
