"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { categories, heroStats } from "@/data/dishes";
import { dishCounts } from "@/lib/filterDishes";

const columns = [
  {
    title: "The kitchen",
    links: [
      { label: "Full menu", href: "/menu" },
      { label: "The chef's table", href: "/#chefs-table" },
      { label: "Open counters", href: "/#moments" },
      { label: "Your bag", href: "/cart" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Private dining", href: "/#chefs-table" },
      { label: "Gift vouchers", href: "/#chefs-table" },
      { label: "Allergen notes", href: "/menu" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="grain relative border-t border-black/[0.06] bg-brand-mist px-[5.5vw] pt-16">
      <div className="grid grid-cols-1 gap-y-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr] lg:gap-x-12">
        {/* ── Identity ── */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src="/udayarun-mark.svg"
              alt=""
              aria-hidden
              width={38}
              height={38}
              className="h-[38px] w-[38px] rounded-full border border-brand-gold/40"
            />
            <span className="font-display text-[30px] font-normal leading-none text-brand-ink">
              Udayarun
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-slate">
            An open-dining kitchen in Chennai — twelve counters, one long table,
            thirty-eight plates, brought to your door.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-xl leading-none text-brand-ink">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider2 text-brand-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ── Link columns ── */}
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="type-eyebrow mb-5 text-brand-gold">{column.title}</p>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-slate transition-all duration-300 hover:pl-1 hover:text-brand-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* ── Browse by section (the veg / non-veg / dessert split) ── */}
        <nav aria-label="Browse by section">
          <p className="type-eyebrow mb-5 text-brand-gold">Browse by section</p>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.id === "all" ? "/menu" : `/menu?category=${cat.id}`}
                  className="group flex items-center gap-2 text-sm text-brand-slate transition-colors duration-300 hover:text-brand-ink"
                >
                  <span>{cat.label}</span>
                  <span className="text-[10px] tabular-nums text-brand-muted">
                    {dishCounts[cat.id as keyof typeof dishCounts]}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-brand-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-4 border-t border-black/[0.06] py-7 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] uppercase tracking-wider2 text-brand-muted">
          © {new Date().getFullYear()} Udayarun · Chennai
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="tel:+916374495003"
            className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted transition-colors hover:text-brand-ink"
          >
            <Phone className="h-3.5 w-3.5" />
            +91 63744 95003
          </a>
          <a
            href="mailto:udayakumari1620@gmail.com"
            className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted transition-colors hover:text-brand-ink"
          >
            <Mail className="h-3.5 w-3.5" />
            udayakumari1620@gmail.com
          </a>
          <a
            href="https://instagram.com/uu_lvy._.18"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted transition-colors hover:text-brand-ink"
          >
            <Instagram className="h-3.5 w-3.5" />
            @uu_lvy._.18
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
