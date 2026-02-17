"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { ElaichiLogo } from "@/components/elaichi-logo";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/home/about", label: "About" },
  { href: "/home/prices", label: "Prices" },
  { href: "/home/products", label: "Products" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/home"
          className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground"
        >
          <ElaichiLogo className="h-8 w-8 text-primary" />
          BharatMasale
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {session?.user?.isAdmin && (
            <Link
              href="/admin"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname?.startsWith("/admin")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              Admin
            </Link>
          )}
          {status === "loading" ? (
            <span className="px-3 py-2 text-sm text-muted-foreground">
              ...
            </span>
          ) : session ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/login"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              Login
            </Link>
          )}
          <ThemeToggle className="ml-2" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded p-2 text-foreground hover:bg-accent/10"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session?.user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname?.startsWith("/admin")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Admin
              </Link>
            )}
            {status === "loading" ? (
              <span className="px-3 py-2 text-sm text-muted-foreground">
                ...
              </span>
            ) : session ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === "/login"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
