"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { dishes } from "@/data/dishes";
import { useCart } from "@/lib/store";

/**
 * ClosingCta — the last course.
 *
 * A single ivory card on the sage canvas: an invitation to subscribe,
 * the reservation line and the private-dining note, split across columns
 * with antique-gold hairline dividers.
 */
export default function ClosingCta() {
  const { addItem } = useCart();
  const signature = dishes.find((d) => d.id === "38");

  return (
    <section
      className="relative overflow-hidden px-[5.5vw] py-12 md:py-16 lg:py-20"
      aria-labelledby="cta-title"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-gold/[0.1] blur-3xl"
      />

      <div className="grain relative overflow-hidden rounded-card border border-black/[0.06] bg-brand-sand shadow-min">
        <div className="grid grid-cols-1 gap-y-12 p-9 md:p-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16">
          {/* ── Left: the invitation ── */}
          <div>
            <p className="type-eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-gold" />
              Stay at the table
            </p>

            <h2
              id="cta-title"
              className="font-display text-[38px] font-light leading-[1.04] text-brand-ink md:text-[58px]"
            >
              Seasonal menus,
              <br />
              <em className="font-normal italic text-brand-gold">
                before anyone else.
              </em>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-slate">
              One letter a fortnight — what the market gave us, which counter is
              running a special and the desserts that sold out too fast.
            </p>

            <form
              className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-black/[0.06] bg-brand-mist py-3.5 pl-12 pr-5 text-sm text-brand-dark transition-all duration-300 placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-black/[0.06]"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-3 text-[11px] text-brand-muted">
              No more than twice a month. Unsubscribe in one click.
            </p>
          </div>
          {/* ── Right: the small print ── */}
          <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-black/[0.06] lg:pl-16">
            <div>
              <p className="font-display text-[30px] leading-tight text-brand-ink">
                Six seats a night.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Our open kitchen takes one sitting only, twice an evening. Tell
                us the occasion and the kitchen will write the menu around it.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+916374495003"
                className="block font-display text-[26px] leading-none text-brand-ink transition-colors duration-300 hover:text-brand-ink"
              >
                +91 63744 95003
              </a>
              <a
                href="mailto:udayakumari1620@gmail.com"
                className="block text-[13px] font-medium text-brand-slate transition-colors duration-300 hover:text-brand-ink"
              >
                udayakumari1620@gmail.com
              </a>
              <span className="rule-gold block opacity-70" aria-hidden />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href="/menu"
                  className="text-[11px] font-semibold uppercase tracking-wider2 text-brand-slate underline decoration-brand-gold/50 underline-offset-4 transition-colors hover:text-brand-ink"
                >
                  Browse the full menu
                </Link>
                {signature && (
                  <button
                    type="button"
                    onClick={() => addItem(signature)}
                    className="text-[11px] font-semibold uppercase tracking-wider2 text-brand-slate underline decoration-brand-gold/50 underline-offset-4 transition-colors hover:text-brand-ink"
                  >
                    Add the {signature.name.toLowerCase()}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}