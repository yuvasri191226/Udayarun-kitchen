"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import SignatureRail from "@/components/SignatureRail";
import ChefTable from "@/components/ChefTable";
import ExperienceBand from "@/components/ExperienceBand";
import MenuSection from "@/components/MenuSection";
import Kitchens from "@/components/Kitchens";
import Moments from "@/components/Moments";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { filterDishes, type DishFilter } from "@/lib/filterDishes";
import { useReveal } from "@/lib/useReveal";

/**
 * Home — the full open-dining narrative, top to bottom:
 *
 *   Hero            the opening frame
 *   SignatureRail   endless ribbon of the chef's signatures
 *   ChefTable       the five-course degustation ledger
 *   CategoryStrip   sticky filter pills (live, with counts)
 *   MenuSection     the 38-plate grid + live search + counters
 *   ExperienceBand  full-bleed cinematic parallax centrepiece
 *   Kitchens        the twelve counters
 *   Moments         snap-scrolling gallery of the room
 *   HowItWorks      the service ritual
 *   Footer          newsletter + sitemap
 */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<DishFilter>("all");
  const [query, setQuery] = useState("");

  const visibleDishes = useMemo(
    () => filterDishes(activeCategory, query),
    [activeCategory, query]
  );

  // Re-register reveals whenever the filtered set changes.
  useReveal([visibleDishes, activeCategory]);

  // Typing in the hero search glides you down to the grid.
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() && typeof document !== "undefined") {
      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Header />

      <main className="space-y-4 md:space-y-8">
        <Hero query={query} onQueryChange={handleSearch} />

        <SignatureRail />

        <ChefTable />

        <div id="menu" className="scroll-mt-24">
          <CategoryStrip active={activeCategory} onChange={setActiveCategory} />

          <MenuSection
            dishes={visibleDishes}
            activeCategory={activeCategory}
            query={query}
            totalCount={38}
            onQueryChange={setQuery}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <ExperienceBand />

        <Kitchens />

        <Moments />

        <HowItWorks />

        {/* ── Newsletter ── */}
        <section
          id="letter"
          className="grain relative overflow-hidden px-[5.5vw] py-24 md:py-32 lg:py-36"
        >
          <div className="reveal relative overflow-hidden rounded-card border border-black/[0.06] bg-brand-sand px-8 py-16 text-center shadow-min md:px-16 md:py-24 lg:py-28">
            <span className="rule-gold mx-auto mb-7 block w-24" aria-hidden />

            <p className="type-eyebrow mb-5">The Sunday letter</p>

            <h2 className="mx-auto max-w-2xl font-display text-[34px] font-light leading-[1.08] text-brand-ink md:text-[52px]">
              What the kitchen is
              <em className="font-normal italic text-brand-gold">
                {" "}
                cooking next.
              </em>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-brand-muted md:text-[15px]">
              One letter a week — the plates we&apos;re testing, the catch
              coming off the boats, and the occasional table we hold back for
              readers.
            </p>

            <form
              className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-black/[0.06] bg-brand-sage px-6 py-3.5 text-sm text-brand-dark transition-all duration-300 placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-black/[0.06]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-brand-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-[11px] uppercase tracking-wider2 text-brand-muted">
              No spam · unsubscribe in one click
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer />
    </>
  );
}