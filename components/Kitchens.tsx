"use client";

import { kitchens, dishes } from "@/data/dishes";
import DishImage from "@/components/DishImage";

const CRAFT_IMAGE =
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1400";

/** Each counter's chip reuses the verified photo of its signature plate. */
const signatureImageOf = (signature: string) =>
  dishes.find((d) => d.name === signature)?.image ?? "";

/**
 * Kitchens — the twelve counters, set as an editorial ledger.
 * A wide photograph anchors the left; the counters read as a printed list
 * on the right, each with its craft in one line.
 */
export default function Kitchens() {
  return (
    <section
      id="kitchens"
      className="px-[5.5vw] py-24 md:py-32 lg:py-36"
      aria-labelledby="kitchens-title"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* ── Photograph ── */}
        <div className="reveal-clip relative overflow-hidden rounded-card shadow-min">
          <img
            src={CRAFT_IMAGE}
            alt="A chef working at an open kitchen counter"
            loading="lazy"
            decoding="async"
            className="h-[340px] w-full object-cover object-center md:h-[560px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1a13]/85 to-transparent p-7 pt-16">
            <p className="font-display text-[26px] italic leading-tight text-brand-sand">
              Everything happens in the open.
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-wider2 text-brand-sand/60">
              No pass · no secrets · twelve counters
            </p>
          </div>
        </div>

        {/* ── Ledger ── */}
        <div>
          <p className="reveal type-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            The counters
          </p>

          <h2
            id="kitchens-title"
            className="reveal delay-1 font-display text-[40px] font-light leading-[1.05] text-brand-ink md:text-[60px]"
          >
            Twelve stations,
            <br />
            <em className="font-normal italic text-brand-gold">
              one kitchen line.
            </em>
          </h2>

          <p className="reveal delay-2 mt-6 max-w-lg text-sm leading-relaxed text-brand-slate md:text-base">
            Each counter is run by one cook who owns it end to end — the
            batter, the griddle, the fire, the finish. Nothing is handed
            sideways.
          </p>

          <ul className="mt-10">
            {kitchens.map((kitchen, i) => (
              <li key={kitchen.name} className="group">
                <div className="flex items-baseline gap-5 py-5 transition-all duration-500 ease-tide group-hover:pl-2">
                  <span className="w-7 flex-shrink-0 font-display text-lg italic leading-none text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[24px] leading-tight text-brand-ink transition-colors duration-300 group-hover:text-brand-gold md:text-[27px]">
                      {kitchen.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-brand-muted">
                      {kitchen.craft}
                    </p>
                  </div>
                  <span className="hidden h-14 w-14 flex-shrink-0 overflow-hidden rounded-full sm:block">
                    <DishImage
                      src={signatureImageOf(kitchen.signature)}
                      alt={kitchen.name}
                      label={kitchen.name}
                      className="h-full w-full rounded-full"
                      imgClassName="transition-transform duration-700 ease-tide zoom-quiet"
                    />
                  </span>
                </div>
                <span className="rule-gold block opacity-60" aria-hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}