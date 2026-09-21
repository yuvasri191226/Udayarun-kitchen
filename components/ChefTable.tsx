"use client";

import { useEffect, useRef, useState } from "react";
import { dishes, tastingMenu } from "@/data/dishes";
import ReserveModal from "@/components/ReserveModal";

const COLLAGE = [
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=900",
    alt: "A main course plated on dark ceramic",
    className: "h-[300px] md:h-[420px]",
  },
  {
    src: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=700",
    alt: "A close detail of fresh herbs and citrus",
    className: "h-[140px] md:h-[190px]",
  },
  {
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=700",
    alt: "A wooden board of roasted ingredients",
    className: "h-[140px] md:h-[190px]",
  },
];

const priceOf = (dishId: string) =>
  dishes.find((d) => d.id === dishId)?.price ?? 0;

/**
 * ChefTable — the degustation ledger.
 *
 * Five courses set like a printed menu: serif numerals, dotted leaders,
 * antique-gold hairlines. Beside it an overlapping collage with a slowly
 * rotating gold seal that ties the frame back to the brand.
 */
export default function ChefTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );

    section
      .querySelectorAll(".reveal, .reveal-clip")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tastingTotal = tastingMenu.reduce(
    (sum, course) => sum + priceOf(course.dishId),
    0
  );

  return (
    <section
      ref={sectionRef}
      id="chefs-table"
      className="px-[5.5vw] py-24 md:py-32 lg:py-36"
      aria-labelledby="tasting-title"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* ── Left: the printed tasting menu ── */}
        <div>
          <p className="reveal type-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            The chef&apos;s table
          </p>

          <h2
            id="tasting-title"
            className="reveal delay-1 font-display text-[40px] font-light leading-[1.05] text-brand-ink md:text-[62px]"
          >
            Five courses,
            <br />
            <em className="font-normal italic text-brand-gold">
              one long table.
            </em>
          </h2>

          <p className="reveal delay-2 mt-6 max-w-lg text-sm leading-relaxed text-brand-slate md:text-base">
            Every evening we set a single, unbroken menu built around whatever
            the morning market offered. It arrives course by course, in the
            order the kitchen wants you to taste it.
          </p>

          <ol className="mt-12">
            {tastingMenu.map((course, i) => (
              <li key={course.dishId} className="group">
                <div className="flex items-baseline gap-5 py-6 transition-all duration-500 ease-tide group-hover:pl-2">
                  <span className="w-8 flex-shrink-0 font-display text-2xl italic leading-none text-brand-gold">
                    {course.course}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-[26px] leading-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-gold md:text-[30px]">
                        {course.title}
                      </h3>
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 translate-y-[-4px] border-b border-dotted border-brand-dark/25 sm:block"
                      />
                      <span className="whitespace-nowrap text-sm font-medium text-brand-dark">
                        ₹{priceOf(course.dishId)}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-brand-muted">
                      {course.note}
                    </p>
                  </div>
                </div>
                <span className="rule-gold block opacity-60" aria-hidden />
              </li>
            ))}
          </ol>
        </div>
        {/* ── Right: collage + rotating gold seal ── */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="reveal-clip col-span-2">
              <img
                src={COLLAGE[0].src}
                alt={COLLAGE[0].alt}
                loading="lazy"
                decoding="async"
                className={`${COLLAGE[0].className} w-full rounded-card object-cover object-center shadow-min`}
              />
            </div>
            <div className="reveal-clip delay-2">
              <img
                src={COLLAGE[1].src}
                alt={COLLAGE[1].alt}
                loading="lazy"
                decoding="async"
                className={`${COLLAGE[1].className} w-full rounded-card object-cover object-center shadow-min`}
              />
            </div>
            <div className="reveal-clip delay-3">
              <img
                src={COLLAGE[2].src}
                alt={COLLAGE[2].alt}
                loading="lazy"
                decoding="async"
                className={`${COLLAGE[2].className} w-full rounded-card object-cover object-center shadow-min`}
              />
            </div>
          </div>

          {/* Slowly rotating seal */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:-right-6 lg:translate-x-0">
            <div className="relative h-28 w-28 rounded-full border border-brand-gold/50 bg-brand-sand/95 shadow-min backdrop-blur-sm">
              <div className="spin-slow absolute inset-0">
                <svg viewBox="0 0 112 112" className="h-full w-full">
                  <defs>
                    <path
                      id="sealPath"
                      d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    fill="#b08d4f"
                    fontSize="9.2"
                    letterSpacing="3.1"
                    fontFamily="Georgia, serif"
                  >
                    <textPath href="#sealPath" startOffset="0%">
                      UDAYARUN · CHENNAI · EST 2026 ·
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-center font-display text-[13px] italic leading-tight text-brand-ink">
                  open
                  <br />
                  kitchen
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─ Reservation bar ── */}
        <div className="reveal delay-3 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-black/[0.06] pt-9 lg:col-span-2">
          <div>
            <p className="font-display text-4xl leading-none text-brand-ink">
              ₹{tastingTotal}
            </p>
            <p className="mt-1.5 text-[11px] uppercase tracking-wider2 text-brand-muted">
              Per guest · about 95 minutes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => setReserveOpen(true)}
              aria-haspopup="dialog"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
            >
              Reserve the table
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold transition-colors duration-300 group-hover:bg-brand-stone/60" />
            </button>
            <span className="text-[11px] uppercase tracking-wider2 text-brand-muted">
              Six seats a night · 7 pm &amp; 9:30 pm
            </span>
          </div>
        </div>
      </div>

      <ReserveModal open={reserveOpen} onClose={() => setReserveOpen(false)} />
    </section>
  );
}
