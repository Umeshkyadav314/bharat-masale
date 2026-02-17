import Link from "next/link";

const address = {
  name: "Bharat Masale",
  line1: "Matiyari",
  line2: "Lucknow, 226028",
  state: "Uttar Pradesh",
  india: "India",
};

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Bharat Masale
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium Indian spices. Crafted with tradition,
              delivered with care.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Address
            </h4>
            <address className="mt-2 not-italic text-sm text-foreground">
              {address.name}
              <br />
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.state}
              <br />
              {address.india}
            </address>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick links
            </h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/home"
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/home/about"
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/home/prices"
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/home/products"
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bharat Masale. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
