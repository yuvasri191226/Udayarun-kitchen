"use client";

import Link from "next/link";
import { MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";

const navLinks = [
  { href: "/menu", label: "The menu" },
  { href: "/#chefs-table", label: "Chef's table" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#footer", label: "About the house" },
];

export default function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <>
      {/* ── Antique-gold rule above the masthead ── */}
      <span className="rule-gold block h-[2px] w-full" aria-hidden />

      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-brand-sage/85 backdrop-blur-md">
        <div className="flex h-[68px] items-center justify-between gap-4 px-[5.5vw]">
          {/* ── Wordmark ── */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Udayarun — home"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-brand-gold/50 bg-brand-sand transition-colors duration-300 group-hover:border-brand-gold">
              <img
                src="/udayarun-mark.svg"
                alt=""
                aria-hidden
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[21px] leading-none text-brand-ink">
                Udayarun
              </span>
              <span className="mt-[3px] block text-[8.5px] uppercase tracking-luxe text-brand-muted">
                Urban kitchen · Chennai
              </span>
            </span>
          </Link>

          {/* ── Navigation ── */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-1 text-[12.5px] font-medium tracking-wide text-brand-slate transition-colors duration-300 hover:text-brand-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right cluster ── */}
          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1.5 rounded-full border border-black/[0.06] bg-brand-sand/70 px-3 py-1.5 text-[11px] font-medium text-brand-slate lg:flex">
              <MapPin className="h-3 w-3 text-brand-gold" />
              Chennai
            </span>

            <Link
              href="/cart"
              className="group relative flex items-center gap-2 rounded-full border border-black/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider2 text-brand-ink transition-all duration-300 hover:border-black/[0.06] hover:text-brand-ink"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-ink px-1 text-[10px] font-bold tabular-nums text-brand-sand transition-colors duration-300 group-hover:bg-brand-clay">
                {totalItems}
              </span>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className="flex items-center gap-2 rounded-full bg-brand-ink px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink md:hidden"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {totalItems}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

