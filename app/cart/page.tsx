"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store";
import DishImage from "@/components/DishImage";
import OrderConfirmModal from "@/components/OrderConfirmModal";

export default function CartPage() {
  const {
    items,
    addItem,
    decrementItem,
    removeItem,
    clearCart,
    totalPrice,
  } = useCart();

  /* The checkout dialog — opened by "Place the order", closed by its own
     Done / ✕ / Escape / scrim, exactly like the ReserveModal. */
  const [placingOrder, setPlacingOrder] = useState(false);

  const deliveryFee = items.length === 0 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <main className="bg-brand-sage px-[5.5vw] pb-14 pt-14">
      <div className="mx-auto max-w-4xl">
        <p className="type-eyebrow mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          Your table
        </p>
        <h1 className="font-display text-[44px] font-light leading-none text-brand-ink md:text-[58px]">
          The order
        </h1>

        {items.length === 0 ? (
          <div className="mt-14 rounded-card border border-black/[0.06] bg-brand-sand p-14 text-center shadow-min">
            <ShoppingBag className="mx-auto h-10 w-10 text-brand-gold" />
            <p className="mt-5 font-display text-3xl text-brand-ink">
              Nothing on the table yet.
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Browse the menu and add a few plates to get started.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to the menu
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* ─ Line items ── */}
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-card border border-black/[0.06] bg-brand-sand p-4 shadow-min"
                >
                  <DishImage
                    src={item.image}
                    alt={item.name}
                    label={item.name}
                    className="h-20 w-20 flex-shrink-0 rounded-2xl"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-display text-xl text-brand-ink">
                      {item.name}
                    </h2>
                    <p className="text-[11px] uppercase tracking-wider2 text-brand-muted">
                      {item.restaurant}
                    </p>
                    <p className="mt-1 text-sm font-medium text-brand-dark">
                      ₹{item.price}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-brand-mist p-1"
                    role="group"
                    aria-label={`Quantity for ${item.name}`}
                  >
                    <button
                      type="button"
                      onClick={() => decrementItem(item.id)}
                      aria-label={`Remove one ${item.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-brand-ink transition hover:bg-brand-stone/60 active:scale-[0.98]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[22px] text-center text-sm font-semibold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      aria-label={`Add one more ${item.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-brand-sand transition hover:bg-brand-ink active:scale-90"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} entirely`}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-sage hover:text-brand-clay"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            {/* ─ Bill ── */}
            <aside className="h-fit rounded-card border border-black/[0.06] bg-brand-sand p-7 shadow-min lg:sticky lg:top-24">
              <h2 className="font-display text-2xl text-brand-ink">The bill</h2>
              <span className="rule-gold my-4" aria-hidden />
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Subtotal</dt>
                  <dd className="font-medium">₹{totalPrice}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Delivery</dt>
                  <dd className="font-medium">₹{deliveryFee}</dd>
                </div>
                <div className="flex justify-between border-t border-black/[0.06] pt-3 text-base">
                  <dt className="font-display text-xl">Total</dt>
                  <dd className="font-display text-xl text-brand-ink">
                    ₹{grandTotal}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setPlacingOrder(true)}
                aria-haspopup="dialog"
                className="mt-7 w-full rounded-full bg-brand-ink py-4 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-all duration-300 hover:bg-brand-clay"
              >
                Place the order
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full py-2 text-[11px] uppercase tracking-wider2 text-brand-muted transition hover:text-brand-clay"
              >
                Clear the table
              </button>
            </aside>
          </div>
        )}
      </div>

      <OrderConfirmModal
        open={placingOrder}
        onClose={() => setPlacingOrder(false)}
        items={items}
        subtotal={totalPrice}
        deliveryFee={deliveryFee}
        total={grandTotal}
        onConfirm={clearCart}
      />
    </main>
  );
}
