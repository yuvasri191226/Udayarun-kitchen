"use client";

import { categories, type DishCategory } from "@/data/dishes";
import { dishCounts } from "@/lib/filterDishes";

interface CategoryStripProps {
  active: DishCategory | "all";
  onChange: (cat: DishCategory | "all") => void;
}

/** Muted mineral markers — quiet by design, never saturated. */
const markerStyles = {
  all: "border-black/[0.06] bg-brand-stone/60",
  veg: "border-brand-moss bg-brand-moss",
  nonveg: "border-brand-bark bg-brand-bark",
  dessert: "border-brand-taupe bg-brand-taupe",
} as const;

export default function CategoryStrip({ active, onChange }: CategoryStripProps) {
  return (
    <section className="sticky top-[68px] z-30 border-y border-black/[0.06] bg-brand-mist/95 px-[5.5vw] py-4 backdrop-blur-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <p className="type-eyebrow whitespace-nowrap">What are you after?</p>
          <span className="hidden h-px w-10 bg-brand-gold/60 md:block" />
        </div>

        <div className="no-bar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 md:pb-0">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const count = dishCounts[cat.id as keyof typeof dishCounts];

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange(cat.id as DishCategory | "all")}
                aria-pressed={isActive}
                className={`group flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-300 ease-tide ${
                  isActive
                    ? "border-brand-ink bg-brand-ink text-brand-sand shadow-min"
                    : "border-black/[0.06] bg-brand-sand text-brand-slate hover:border-black/[0.06] hover:text-brand-ink"
                }`}
              >
                {/* Veg / non-veg / dessert marker */}
                <span
                  aria-hidden
                  className={`flex h-[14px] w-[14px] items-center justify-center rounded-[3px] border-[1.5px] ${
                    isActive ? "border-brand-gold-soft" : markerStyles[cat.id as keyof typeof markerStyles]
                  }`}
                >
                  <span
                    className={`h-[6px] w-[6px] rounded-full ${
                      isActive ? "bg-brand-gold-soft" : markerStyles[cat.id as keyof typeof markerStyles].split(" ")[1]
                    }`}
                  />
                </span>

                <span className="whitespace-nowrap">{cat.label}</span>
                <span
                  className={`text-[10px] tabular-nums ${
                    isActive ? "text-brand-gold-soft" : "text-brand-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

