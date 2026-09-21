"use client";

import { Plus, Star } from "lucide-react";
import { dishes, type Dish } from "@/data/dishes";
import { useCart } from "@/lib/store";
import DishImage from "@/components/DishImage";

/**
 * SignatureRail — an endless, cinematic strip of the chef's signatures.
 * Pauses on hover so guests can actually read (and order) the plate.
 */
export default function SignatureRail() {
  const { addItem } = useCart();

  // Two identical halves make the -50% translate loop seamless.
  const signatures: Dish[] = dishes.filter((d) => d.isFeatured).slice(0, 10);
  const track = [...signatures, ...signatures];

  return (
    <section
      className="marquee relative overflow-hidden border-y border-black/[0.06] bg-brand-mist py-10"
      aria-label="Chef's signature dishes"
    >
      <div className="mb-7 flex items-center justify-center gap-4 px-[5.5vw]">
        <span className="rule-gold w-16" />
        <p className="type-eyebrow whitespace-nowrap text-brand-gold">
          Chef&apos;s signatures
        </p>
        <span className="rule-gold w-16" />
      </div>

      <div className="marquee-track gap-7">
        {track.map((dish, i) => (
          <article
            key={`${dish.id}-${i}`}
            className="group flex w-[300px] flex-shrink-0 items-center gap-4 rounded-card border border-black/[0.06] bg-brand-sand p-3 shadow-min transition-colors duration-500 ease-tide"
          >
            <DishImage
              src={dish.image}
              alt={dish.name}
              label={dish.name}
              className="h-[84px] w-[84px] flex-shrink-0 rounded-2xl"
              imgClassName="zoom-quiet"
            />

            <div className="min-w-0 flex-1">
              <p className="type-eyebrow mb-1 text-[9px] text-brand-gold">
                {dish.restaurant}
              </p>
              <h3 className="truncate font-display text-[19px] leading-tight text-brand-ink">
                {dish.name}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-brand-muted">
                <span className="font-medium text-brand-dark">₹{dish.price}</span>
                <span className="h-3 w-px bg-brand-dark/15" />
                <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                <span>{dish.rating}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addItem(dish)}
              aria-label={`Add ${dish.name} to cart`}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-ink text-brand-sand transition-all duration-300 hover:bg-brand-ink active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>

      {/* Soft fades at both ends so the rail melts into the canvas */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-mist to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-mist to-transparent" />
    </section>
  );
}
