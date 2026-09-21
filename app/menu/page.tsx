"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { dishes as allDishes } from "@/data/dishes";
import { filterDishes, toFilter, type DishFilter } from "@/lib/filterDishes";
import { useReveal } from "@/lib/useReveal";

/**
 * /menu — the full catalogue.
 *
 * Deep links such as /menu?category=veg pre-select a filter. The query
 * string is read after mount (never via useSearchParams) so the route
 * still prerenders to complete static HTML — the earlier hook-based
 * version shipped only a 6 KB shell, this one ships every plate.
 */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<DishFilter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    setActiveCategory(toFilter(param));
  }, []);

  const visibleDishes = useMemo(
    () => filterDishes(activeCategory, query),
    [activeCategory, query]
  );

  const counts = useMemo(
    () => ({
      veg: allDishes.filter((d) => d.category === "veg").length,
      nonveg: allDishes.filter((d) => d.category === "nonveg").length,
      dessert: allDishes.filter((d) => d.category === "dessert").length,
    }),
    []
  );

  useReveal([visibleDishes, activeCategory]);

  return (
    <>
      <Header />

      <main>
        {/* ── Opening band ── */}
        <section className="grain relative overflow-hidden border-b border-black/[0.06] bg-brand-sage px-[5.5vw] pb-12 pt-14 md:pb-16 md:pt-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-brand-gold/[0.1] blur-3xl"
          />

          <nav
            aria-label="Breadcrumb"
            className="relative mb-6 flex items-center gap-1.5 text-[11px] uppercase tracking-wider2 text-brand-muted"
          >
            <Link href="/" className="transition-colors hover:text-brand-ink">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand-ink">The menu</span>
          </nav>

          <p className="reveal type-eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            {allDishes.length} plates · {counts.veg} veg · {counts.nonveg}{" "}
            non-veg · {counts.dessert} desserts
          </p>

          <h1 className="reveal delay-1 max-w-3xl font-display text-[46px] font-light leading-[1.02] text-brand-ink md:text-[74px]">
            The full
            <em className="font-normal italic text-brand-gold"> menu.</em>
          </h1>

          <p className="reveal delay-2 mt-6 max-w-xl text-sm leading-relaxed text-brand-slate md:text-base">
            Everything we cook, in one place — stone-griddled dosai, dum
            biriyani, the day&apos;s coastal catch and the pastry room. Use the
            markers to pick a lane; every plate is marked green, red or pink.
          </p>
        </section>

        <div id="menu" className="scroll-mt-24">
          <CategoryStrip
            active={activeCategory}
            onChange={setActiveCategory}
          />

          <MenuSection
            dishes={visibleDishes}
            activeCategory={activeCategory}
            query={query}
            totalCount={allDishes.length}
            onQueryChange={setQuery}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </main>

      <Footer />

      <CartDrawer />
    </>
  );
}
