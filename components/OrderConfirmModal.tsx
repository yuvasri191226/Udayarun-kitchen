"use client";

import { useEffect, useState } from "react";
import { Check, Phone, ShieldCheck, X } from "lucide-react";
import type { CartItem } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  /** The lines exactly as they stand when the order is placed. */
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** Fired once the order is accepted — the store empties the table here. */
  onConfirm: () => void;
}

/** Placed order frozen at the moment of confirmation, so the receipt keeps
 *  its lines even after the live cart has been cleared. */
interface PlacedOrder {
  id: string;
  time: string;
  lines: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  name: string;
  phone: string;
  address: string;
}

const ETA = "35–45 minutes";
const labelCls =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-wider2 text-brand-muted";
const inputCls =
  "w-full rounded-2xl border border-black/[0.06] bg-brand-sage px-4 py-3 text-sm font-light text-brand-dark placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none";

/* House order number — short, upper-case, readable over the phone. */
const nextOrderId = () =>
  `UDY-${Date.now().toString(36).toUpperCase().slice(-6)}`;

/**
 * OrderConfirmModal — the checkout that stands between the bill and the kitchen.
 *
 * Stage one reviews the order and takes the delivery details; stage two is the
 * receipt. Both stages reuse the same dialog chrome as ReserveModal so the
 * paper, hairlines and motion all agree.
 */
export default function OrderConfirmModal({
  open,
  onClose,
  items,
  subtotal,
  deliveryFee,
  total,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  // Each time the dialog opens, start from a clean, unplaced order.
  useEffect(() => {
    if (open) setPlaced(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const ok =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    address.trim().length >= 8;
  const show = open ? "opacity-100" : "pointer-events-none opacity-0";
  const card = open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]";

  /** Freeze the order, hand it to the store, then show the receipt. */
  const placeOrder = () => {
    if (!ok) return;
    setPlaced({
      id: nextOrderId(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lines: items.map((line) => ({ ...line })),
      subtotal,
      deliveryFee,
      total,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
    });
    onConfirm();
  };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[70] bg-[#1e2a23]/40 backdrop-blur-[2px] transition-opacity duration-500 ease-tide ${show}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Place the order"
        aria-hidden={!open}
        className={`fixed inset-0 z-[71] flex items-center justify-center overflow-y-auto p-5 transition-opacity duration-500 ease-tide ${show}`}
      >
        <div
          className={`w-full max-w-[440px] rounded-card border border-black/[0.06] bg-brand-sand shadow-min transition-transform duration-500 ease-tide ${card}`}
        >
          {/* ── Masthead ── */}
          <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-7 pb-5 pt-6">
            <div>
              <p className="type-eyebrow mb-2 flex items-center gap-2">
                <span className="h-px w-6 bg-brand-gold" />
                {placed ? `Order ${placed.id}` : "Checkout"}
              </p>
              <h3 className="font-display text-[30px] font-light leading-none text-brand-ink">
                {placed ? "The order is in." : "Place the order."}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close checkout"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.06] text-brand-ink transition-colors hover:text-brand-clay"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {placed ? (
            /* ── Stage two: the receipt ── */
            <div className="px-7 py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.06] bg-brand-sage">
                <Check className="h-5 w-5 text-brand-clay" />
              </span>
              <p className="mt-5 font-display text-[22px] text-brand-ink">
                Thank you, {placed.name.split(" ")[0]} — the kitchen is on it.
              </p>
              <p className="mt-2 text-[13px] text-brand-muted">
                Placed at {placed.time} · arriving in about {ETA}
              </p>

              <span className="rule-gold my-6 block" aria-hidden />

              <ul className="space-y-1.5 text-left text-[13px]">
                {placed.lines.map((line) => (
                  <li
                    key={line.id}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="min-w-0 truncate text-brand-slate">
                      <span className="tabular-nums text-brand-muted">
                        {line.quantity} ×
                      </span>{" "}
                      {line.name}
                    </span>
                    <span className="flex-shrink-0 tabular-nums text-brand-dark">
                      ₹{line.price * line.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <span className="rule-gold my-5 block" aria-hidden />

              <dl className="space-y-2 text-left text-[13px]">
                <div className="flex items-center justify-between text-brand-muted">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-brand-slate">
                    ₹{placed.subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between text-brand-muted">
                  <dt>Delivery</dt>
                  <dd className="tabular-nums text-brand-slate">
                    ₹{placed.deliveryFee}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-black/[0.06] pt-3">
                  <dt className="font-display text-xl text-brand-ink">Total</dt>
                  <dd className="font-display text-xl tabular-nums text-brand-ink">
                    ₹{placed.total}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-left text-[12.5px] leading-relaxed text-brand-muted">
                {placed.address}
              </p>
              <a
                href={`tel:${placed.phone.replace(/\s+/g, "")}`}
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-medium text-brand-slate transition-colors hover:text-brand-ink"
              >
                <Phone className="h-3.5 w-3.5" />
                {placed.phone}
              </a>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-brand-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-colors hover:bg-brand-clay"
              >
                Done
              </button>
            </div>
          ) : (
            /* ── Stage one: review + delivery details ── */
            <form
              className="space-y-4 px-7 py-6"
              onSubmit={(e) => {
                e.preventDefault();
                placeOrder();
              }}
            >
              <div className="rounded-2xl border border-black/[0.06] bg-brand-sage px-4 py-3.5">
                <ul className="space-y-1.5 text-[13px]">
                  {items.map((line) => (
                    <li
                      key={line.id}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="min-w-0 truncate text-brand-slate">
                        <span className="tabular-nums text-brand-muted">
                          {line.quantity} ×
                        </span>{" "}
                        {line.name}
                      </span>
                      <span className="flex-shrink-0 tabular-nums text-brand-dark">
                        ₹{line.price * line.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-black/[0.06] pt-3">
                  <span className="text-[11px] uppercase tracking-wider2 text-brand-muted">
                    Subtotal · Delivery · Total
                  </span>
                  <span className="flex-shrink-0 font-display text-lg tabular-nums text-brand-ink">
                    ₹{subtotal} · ₹{deliveryFee} · ₹{total}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="order-name" className={labelCls}>
                  Name
                </label>
                <input
                  id="order-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="order-phone" className={labelCls}>
                  Phone
                </label>
                <input
                  id="order-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 …"
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="order-address" className={labelCls}>
                  Deliver to
                </label>
                <textarea
                  id="order-address"
                  rows={2}
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat, street, area — Chennai"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={!ok}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-colors duration-300 hover:bg-brand-clay disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-ink"
              >
                <Check className="h-3.5 w-3.5" />
                Confirm the order · ₹{total}
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-[11px] uppercase tracking-wider2 text-brand-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                Pay on delivery · nothing charged now
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
