"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BAND_IMAGE =
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=1600";

const notes = [
  { value: "12", label: "Open counters" },
  { value: "38", label: "Plates on the menu" },
  { value: "6 am", label: "First market run" },
];

/**
 * ExperienceBand — the cinematic centrepiece.
 *
 * A full-bleed, slow-parallax photograph of the open dining room with a
 * deep-forest veil rising from the bottom. The page canvas stays light;
 * only this one frame goes dark, like a projector cutting to a wide shot.
 */
export default function ExperienceBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Gentle parallax + curtain reveal on scroll
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    const content = contentRef.current;
    if (!section || !layer || !content) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      if (reduce) return;
      const rect = section.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      // -22px … +22px of drift across the whole pass
      layer.style.setProperty("--p", String((progress - 0.5) * 44));

      if (rect.top < window.innerHeight * 0.7) {
        content.classList.add("visible");
        layer.classList.add("visible");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grain relative flex min-h-[600px] items-end overflow-hidden md:h-[88vh]"
      aria-labelledby="open-dining-title"
    >
      {/* ── Parallax photograph ── */}
      <div
        ref={layerRef}
        className="parallax reveal-clip absolute inset-0 -top-8 -bottom-8"
      >
        <img
          src={BAND_IMAGE}
          alt="An open dining table laid with sharing plates, brassware and linen"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* ── Veil: keeps the copy crisp without going full dark-mode ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a13]/88 via-[#0c1a13]/35 to-[#e6efe6]/45" />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="reveal relative z-10 w-full px-[5.5vw] pb-14 pt-32 md:pb-20"
      >
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-brand-gold-soft">
            <span className="h-px w-8 bg-brand-gold" />
            The open dining room
          </p>

          <h2
            id="open-dining-title"
            className="font-display text-[42px] font-light leading-[1.02] text-brand-sand md:text-[76px]"
          >
            A kitchen with
            <br />
            <em className="font-normal italic text-brand-gold-soft">
              no walls at all.
            </em>
          </h2>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-brand-sand/75 md:text-base">
            Wood fire on one side, a stone dosai counter on the other, and a
            twenty-four foot table running straight through the middle. We cook
            in the open — you watch, you ask, you taste as it happens. Then it
            travels to your door in the same brass and banana leaf.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {notes.map((note) => (
              <div key={note.label} className="min-w-[92px]">
                <p className="font-display text-3xl leading-none text-brand-sand">
                  {note.value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-wider2 text-brand-sand/55">
                  {note.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-sand px-7 py-3.5 text-xs font-semibold uppercase tracking-wider2 text-brand-ink transition-all duration-300 hover:bg-brand-sand hover:text-brand-ink"
            >
              Walk the menu
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="text-xs uppercase tracking-wider2 text-brand-sand/50">
              Service 11 am – 11 pm · seven days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
