"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/store";
import DishImage from "@/components/DishImage";

/**
 * CartDrawer — the order, slid in from the right.
 *
 * Reuses the exact same cart API as the dish cards, so a counter tapped
 * inside the drawer and one tapped in the grid always agree.
 */
export default function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isCartDrawerOpen,
    closeCart,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  // Escape closes; body scroll locks while the drawer is open.
  useEffect(() => {
    if (!isCartDrawerOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isCartDrawerOpen, closeCart]);

  return (
    <>
      {/* ── Scrim ── */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-[#0c1a13]/45 backdrop-blur-[2px] transition-opacity duration-500 ease-tide ${
          isCartDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ── Panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-[420px] flex-col border-l border-black/[0.06] bg-brand-sage shadow-min transition-transform duration-500 ease-tide ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] px-6 py-5">
          <div>
            <p className="type-eyebrow">Your order</p>
            <p className="mt-1 font-display text-[26px] leading-none text-brand-ink">
              {totalItems === 0
                ? "Nothing yet"
                : `${totalItems} ${totalItems === 1 ? "plate" : "plates"}`}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] text-brand-ink transition-all duration-300 hover:border-black/[0.06] hover:text-brand-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Lines */}
        <div className="no-bar flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold/40">
                <ShoppingBag className="h-6 w-6 text-brand-gold" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-light text-brand-ink">
                The table is still empty
              </h3>
              <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-brand-muted">
                Wander the counters and add a few plates — they&apos;ll gather
                here.
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="mt-7 rounded-full bg-brand-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
              >
                Browse the menu
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-brand-dark/[0.07]">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <DishImage
                    src={item.image}
                    alt={item.name}
                    label={item.name}
                    className="h-[68px] w-[68px] flex-shrink-0 rounded-2xl"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[19px] leading-tight text-brand-ink">
                      {item.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] uppercase tracking-wider2 text-brand-muted">
                      {item.restaurant}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-brand-dark">
                        ₹{item.price * item.quantity}
                      </span>

                      <div
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                        className="flex items-center gap-1 rounded-full border border-brand-gold/50 bg-brand-mist p-1"
                      >
                        <button
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          aria-label={`Remove one ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-sand active:scale-90"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-[20px] text-center text-[13px] font-semibold tabular-nums text-brand-ink"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addItem(item)}
                          aria-label={`Add one more ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-ink text-brand-sand transition-colors hover:bg-brand-ink active:scale-90"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Delete ${item.name} from the order`}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center self-start rounded-full text-brand-muted transition-colors hover:bg-brand-sand hover:text-brand-clay"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* ── Bill ── */}
        {items.length > 0 && (
          <div className="border-t border-black/[0.06] px-6 py-5">
            <dl className="space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-brand-muted">
                <dt>Subtotal</dt>
                <dd className="tabular-nums text-brand-slate">₹{totalPrice}</dd>
              </div>
              <div className="flex items-center justify-between text-brand-muted">
                <dt>Delivery</dt>
                <dd className="text-brand-gold">Complimentary</dd>
              </div>
              <div className="flex items-center justify-between text-brand-muted">
                <dt>Taxes</dt>
                <dd className="text-brand-muted">Calculated at checkout</dd>
              </div>
            </dl>

            <span className="rule-gold my-4 block" aria-hidden />

            <div className="flex items-baseline justify-between">
              <span className="type-eyebrow">Total</span>
              <span className="font-display text-3xl leading-none text-brand-ink">
                ₹{totalPrice}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-brand-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
            >
              Review the order
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-center text-[10.5px] uppercase tracking-wider2 text-brand-muted transition-colors hover:text-brand-clay"
            >
              Clear the table
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
