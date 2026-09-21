"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { moments } from "@/data/dishes";

/**
 * Moments — a horizontal, snap-scrolling gallery of the room.
 * Arrow buttons page through; the rail itself is drag/trackpad scrollable.
 */
export default function Moments() {
  const railRef = useRef<HTMLDivElement>(null);

  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      className="overflow-hidden bg-brand-mist py-24 md:py-32 lg:py-36"
      aria-labelledby="moments-title"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 px-[5.5vw]">
        <div>
          <p className="type-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            Moments at the table
          </p>
          <h2
            id="moments-title"
            className="font-display text-[36px] font-light leading-[1.06] text-brand-ink md:text-[54px]"
          >
            The room,
            <em className="font-normal italic text-brand-gold"> in fragments.</em>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label="Previous moments"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/15 bg-brand-sand text-brand-ink transition-all duration-300 hover:border-black/[0.06] hover:text-brand-ink"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            aria-label="More moments"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/15 bg-brand-sand text-brand-ink transition-all duration-300 hover:border-black/[0.06] hover:text-brand-ink"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-bar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5.5vw] pb-2"
      >
        {moments.map((moment, i) => (
          <figure
            key={moment.caption}
            className="group w-[280px] flex-shrink-0 snap-start md:w-[360px]"
          >
            <div className="relative overflow-hidden rounded-card shadow-min transition-shadow duration-500 ease-tide group-hover:shadow-min">
              <img
                src={moment.image}
                alt={moment.caption}
                loading="lazy"
                decoding="async"
                className="h-[340px] w-full object-cover object-center transition-transform duration-[900ms] ease-tide zoom-quiet md:h-[440px]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-brand-sand/90 px-3 py-1 font-display text-sm italic text-brand-ink backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="mt-4">
              <p className="font-display text-[21px] leading-tight text-brand-ink">
                {moment.caption}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider2 text-brand-muted">
                {moment.meta}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}