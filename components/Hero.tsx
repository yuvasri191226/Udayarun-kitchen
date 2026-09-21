"use client";

import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { heroStats } from "@/data/dishes";
import DishImage from "@/components/DishImage";

interface HeroProps {
  query?: string;
  onQueryChange?: (value: string) => void;
}

/* Hero plate — verified live (HTTP 200 HEAD). A luxury composed plate on a
   bright editorial table; the warm ivory/cream tones sit naturally on the
   #E6EFE6 sage canvas. Even if this URL ever dies, <DishImage> renders its
   branded ivory placeholder instead of a blank box. */
const HERO_MAIN =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200";
const HERO_DETAIL =
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=700";

/**
 * Hero — the opening frame.
 *
 * Every entrance here is pure CSS keyframe animation (`.hero-*` in
 * globals.css). The previous version depended on a JS IntersectionObserver
 * to reveal the photograph — whenever hydration was slow, the LCP image
 * stayed at opacity-0 and the guest saw an empty sage box. Keyframes with
 * `animation-fill-mode: both` play on load with zero script dependency,
 * and the plate itself renders through <DishImage> so it can never render
 * blank at all (shimmer → retry → branded fallback).
 */
export default function Hero({ query = "", onQueryChange }: HeroProps) {
  return (
    <section className="grain relative overflow-hidden bg-brand-sage px-[5.5vw] pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Warm light bloom behind the plate */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-brand-gold/[0.12] blur-3xl"
      />

      <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-20">
        {/* ─────────── Left: the words ─────────── */}
        <div>
          <p className="hero-rise type-eyebrow mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-brand-gold" />
            Fine dining · open kitchen · Chennai
          </p>

          <h1 className="hero-rise hero-d2 font-display text-[52px] font-light leading-[0.98] text-brand-ink sm:text-[68px] md:text-[88px]">
            The table
            <br />
            is always
            <br />
            <em className="font-normal italic text-brand-gold">set for you.</em>
          </h1>

          <p className="hero-rise hero-d3 mt-8 max-w-lg text-[15px] leading-relaxed text-brand-slate md:text-base">
            Twelve open counters under one roof — stone-griddled dosai,
            seeraga samba biriyani, the day&apos;s catch and a pastry room at
            the back. Choose from thirty-eight plates and we bring the room to
            your door.
          </p>

          {/* ── Live search ── */}
          <div className="hero-rise hero-d4 relative mt-9 max-w-lg">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              placeholder="Search a dish, a counter or a craving…"
              aria-label="Search the menu"
              className="w-full rounded-full border border-black/[0.06] bg-brand-sand py-4 pl-14 pr-12 text-sm text-brand-dark shadow-min transition-all duration-300 placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-black/[0.06]"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange?.("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-sage hover:text-brand-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {query.trim() && (
            <p className="mt-3 max-w-lg text-xs text-brand-muted">
              Showing plates matching{" "}
              <span className="font-medium text-brand-ink">
                &ldquo;{query.trim()}&rdquo;
              </span>{" "}
              below.
            </p>
          )}

          {/* ── Calls to action ── */}
          <div className="hero-rise hero-d5 mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-gold"
            >
              Explore the menu
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#chefs-table"
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-dark/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-ink transition-all duration-300 hover:border-black/[0.06] hover:text-brand-ink"
            >
              The chef&apos;s table
            </a>
          </div>

          {/* ── Stats ledger ── */}
          <div className="hero-rise hero-d6 mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-black/[0.06] pt-7">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl leading-none text-brand-ink">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-wider2 text-brand-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ─────────── Right: the plate ─────────── */}
        <div className="relative">
          {/* Antique-gold hairline frame, offset behind the photograph */}
          <span
            aria-hidden
            className="hero-rise hero-d3 absolute -right-4 -top-4 hidden h-[86%] w-[86%] rounded-card border border-brand-gold/45 md:block"
          />

          {/* Main plate — plain <img> with explicit sizing so the plate paints
              instantly at full opacity even before client JS hydrates.
              No curtain/clip-path, no opacity animation on the photo itself:
              those hid an empty frame whenever load or hydration was slow.
              The decorative gold offset-frame keeps the cinematic feel while
              the photograph stays simple and bullet-proof. A branded
              placeholder appears automatically if the URL ever dies. */}
          <div className="hero-plate relative overflow-hidden rounded-card shadow-min">
            <DishImage
              src={HERO_MAIN}
              alt="A luxury fine-dining plate — grilled salmon with artfully arranged seasonal vegetables"
              label="Signature plate"
              priority
              className="hero-plate-img h-[340px] w-full sm:h-[440px] lg:h-[560px]"
            />
          </div>

          {/* Overlapping detail shot — plain photograph, same bullet-proof rules */}
          <div className="hero-rise hero-d3 absolute -bottom-8 -left-3 hidden w-[46%] overflow-hidden rounded-card border-[6px] border-brand-sage shadow-min sm:block">
            <DishImage
              src={HERO_DETAIL}
              alt="A close detail of freshly prepared ingredients"
              label="Fresh details"
              className="hero-plate-img h-[168px] w-full"
            />
          </div>

          {/* Ivory seal chip */}
          <div className="hero-rise hero-d6 absolute -bottom-6 right-0 hidden rounded-card border border-black/[0.06] bg-brand-sand/95 px-5 py-4 shadow-min backdrop-blur-sm md:block">
            <p className="font-display text-[15px] italic leading-tight text-brand-ink">
              Open kitchen
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider2 text-brand-muted">
              12 counters · 38 plates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
