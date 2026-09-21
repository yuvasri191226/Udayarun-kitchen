"use client";

import { useState } from "react";
import { Flame, Heart, Minus, Plus, Star } from "lucide-react";
import { type Dish } from "@/data/dishes";
import { useCart } from "@/lib/store";
import DishImage from "@/components/DishImage";

interface DishCardProps {
  dish: Dish;
  revealDelay?: number;
}

/** The classic Indian veg / non-veg marker, quietened to mineral tones. */
const markers = {
  veg: { ring: "border-brand-moss", fill: "bg-brand-moss", label: "Vegetarian" },
  nonveg: { ring: "border-brand-bark", fill: "bg-brand-bark", label: "Non-vegetarian" },
  dessert: { ring: "border-brand-taupe", fill: "bg-brand-taupe", label: "Dessert" },
} as const;

const spiceLabels = {
  mild: "Mild",
  medium: "Medium",
  hot: "Hot",
  "n/a": "",
} as const;

export default function DishCard({ dish, revealDelay = 0 }: DishCardProps) {
  const [liked, setLiked] = useState(false);
  const { items, addItem, decrementItem } = useCart();

  // Quantity is read straight from the cart, so every card (grid, rail,
  // drawer) and every page stays in sync automatically.
  const quantity = items.find((i) => i.id === dish.id)?.quantity ?? 0;
  const marker = markers[dish.category];
  const isDessert = dish.category === "dessert";

  return (
    <article
      className="reveal group relative"
      style={{ transitionDelay: `${revealDelay}s` }}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-card border bg-brand-sand shadow-min transition-colors duration-500 ease-tide ${
          quantity > 0 ? "border-black/[0.06]" : "border-black/[0.06]"
        }`}
      >
        {/* ── Photograph ── */}
        <div className="relative">
          <DishImage
            src={dish.image}
            alt={dish.name}
            label={dish.name}
            className="h-52 w-full"
            imgClassName="zoom-quiet"
          />

          {/* Veg / non-veg / dessert marker */}
          <span
            title={marker.label}
            aria-label={marker.label}
            className={`absolute left-3 top-3 flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] bg-brand-sand/95 ${marker.ring}`}
          >
            <span className={`h-[8px] w-[8px] rounded-full ${marker.fill}`} />
          </span>

          {dish.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-brand-ink/85 px-2.5 py-[5px] text-[10px] font-semibold uppercase tracking-wider2 text-brand-sand backdrop-blur-sm">
              {dish.badge}
            </span>
          )}

          {/* Favourite */}
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-label={
              liked
                ? `Remove ${dish.name} from favourites`
                : `Save ${dish.name} to favourites`
            }
            aria-pressed={liked}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-brand-sand/90 text-brand-slate shadow-min backdrop-blur-sm transition-all duration-300 hover:text-brand-clay"
          >
            <Heart
              className={`h-4 w-4 transition-all duration-300 ${
                liked ? "scale-110 fill-brand-clay text-brand-clay" : ""
              }`}
            />
          </button>
        </div>
        {/* ── Details ── */}
        <div className="flex flex-1 flex-col p-5">
          <p className="type-eyebrow mb-2 text-[9.5px] text-brand-gold">
            {dish.restaurant} · {dish.prepTime}
          </p>

          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-[23px] font-medium leading-[1.15] text-brand-ink">
              {dish.name}
            </h3>
            <span className="mt-1 flex flex-shrink-0 items-center gap-1 text-xs font-medium text-brand-dark">
              <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
              {dish.rating}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-brand-muted">
            {dish.description}
          </p>

          <span className="rule-gold my-4 opacity-70" aria-hidden />

          <div className="mt-auto flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl leading-none text-brand-ink">
                ₹{dish.price}
              </span>
              {!isDessert && (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider2 text-brand-muted">
                  <Flame className="h-3 w-3 text-brand-clay" />
                  {spiceLabels[dish.spiceLevel]}
                </span>
              )}
            </div>

            {/* ─ Dynamic quantity counter ─ */}
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => addItem(dish)}
                aria-label={`Add ${dish.name} to cart`}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-ink/15 bg-brand-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink active:scale-[0.98]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            ) : (
              <div
                role="group"
                aria-label={`Quantity for ${dish.name}`}
                className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-brand-mist p-1"
              >
                <button
                  type="button"
                  onClick={() => decrementItem(dish.id)}
                  aria-label={`Remove one ${dish.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-brand-ink transition-all duration-200 hover:bg-brand-stone/60 active:scale-[0.98]"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-[22px] text-center text-sm font-semibold tabular-nums text-brand-ink"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => addItem(dish)}
                  aria-label={`Add one more ${dish.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-brand-sand transition-all duration-200 hover:bg-brand-ink active:scale-[0.98]"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}