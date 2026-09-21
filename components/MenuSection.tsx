"use client";

import { Search, X } from "lucide-react";
import { type Dish } from "@/data/dishes";
import { type DishFilter } from "@/lib/filterDishes";
import DishCard from "@/components/DishCard";

interface MenuSectionProps {
  dishes: Dish[];
  activeCategory: DishFilter;
  query: string;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (cat: DishFilter) => void;
}

const filterLabels: Record<DishFilter, string> = {
  all: "all plates",
  veg: "vegetarian",
  nonveg: "non-vegetarian",
  dessert: "desserts",
};

/**
 * MenuSection — the 38-plate grid.
 *
 * Filtering and search are owned by the page (so the hero search and the
 * sticky pills share one source of truth); this component only renders
 * whatever set it is handed, plus the inline search field.
 */
export default function MenuSection({
  dishes,
  activeCategory,
  query,
  totalCount,
  onQueryChange,
  onCategoryChange,
}: MenuSectionProps) {
  const isEmpty = dishes.length === 0;
  const isFiltered = activeCategory !== "all" || query.trim().length > 0;

  return (
    <section
      id="menu-grid"
      className="scroll-mt-32 px-[5.5vw] pb-20 pt-16 md:pb-28 md:pt-24"
      aria-labelledby="menu-title"
    >
      {/* ── Section head ── */}
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <p className="type-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            The menu · {totalCount} plates
          </p>
          <h2
            id="menu-title"
            className="font-display text-[38px] font-light leading-[1.04] text-brand-ink md:text-[58px]"
          >
            {activeCategory === "all" ? (
              <>
                Everything the
                <br />
                <em className="font-normal italic text-brand-gold">
                  kitchen is cooking.
                </em>
              </>
            ) : (
              <>
                {filterLabels[activeCategory].split(" ")[0]}
                <br />
                <em className="font-normal italic text-brand-gold">
                  {filterLabels[activeCategory].split(" ").slice(1).join(" ") ||
                    "plates"}
                </em>
              </>
            )}
          </h2>
        </div>

        {/* ── Inline search ── */}
        <div className="relative w-full max-w-sm">
          <label htmlFor="menu-search" className="sr-only">
            Search the menu
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search dosai, biriyani, prawn…"
            className="w-full rounded-full border border-black/[0.06] bg-brand-sand py-3.5 pl-11 pr-11 text-[13px] text-brand-dark shadow-min transition-all duration-300 placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-black/[0.06]"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-sage hover:text-brand-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      {/* ── Result bar: legend + count ── */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-black/[0.06] py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted">
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[3px] border-[1.5px] border-brand-moss">
              <span className="h-[6px] w-[6px] rounded-full bg-brand-moss" />
            </span>
            Vegetarian
          </span>
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted">
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[3px] border-[1.5px] border-brand-bark">
              <span className="h-[6px] w-[6px] rounded-full bg-brand-bark" />
            </span>
            Non-veg
          </span>
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider2 text-brand-muted">
            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[3px] border-[1.5px] border-brand-taupe">
              <span className="h-[6px] w-[6px] rounded-full bg-brand-taupe" />
            </span>
            Dessert
          </span>
        </div>

        <p className="text-[11px] uppercase tracking-wider2 text-brand-muted">
          {isFiltered ? "Filtered · " : ""}
          <span className="font-semibold tabular-nums text-brand-ink">
            {dishes.length}
          </span>{" "}
          {dishes.length === 1 ? "plate" : "plates"}
        </p>
      </div>

      {/* ── The grid ── */}
      {isEmpty ? (
        <div className="reveal visible mt-16 flex flex-col items-center rounded-card border border-black/[0.06] bg-brand-sand px-8 py-20 text-center shadow-min">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/40">
            <Search className="h-6 w-6 text-brand-gold" />
          </span>
          <h3 className="mt-6 font-display text-[28px] font-light text-brand-ink">
            Nothing matches that yet
          </h3>
          <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-brand-muted">
            {query.trim()
              ? `No plate, counter or description matches “${query.trim()}”.`
              : "This section is empty right now."}
          </p>
          <button
            type="button"
            onClick={() => {
              onQueryChange("");
              onCategoryChange("all");
            }}
            className="mt-7 rounded-full bg-brand-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
          >
            Show all {totalCount} plates
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dishes.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              revealDelay={(i % 4) * 0.08}
            />
          ))}
        </div>
      )}
    </section>
  );
}