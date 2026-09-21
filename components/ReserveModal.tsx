"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Check, Phone, Users, X } from "lucide-react";

interface Props { open: boolean; onClose: () => void; }
const SEATINGS = ["7:00 pm", "9:30 pm"];
const labelCls = "mb-1.5 block text-[11px] font-medium uppercase tracking-wider2 text-brand-muted";
const inputCls = "w-full rounded-2xl border border-black/[0.06] bg-brand-sage px-4 py-3 text-sm font-light text-brand-dark placeholder:text-brand-muted/70 focus:border-brand-clay focus:outline-none";

export default function ReserveModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [seat, setSeat] = useState("7:00 pm");
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);
  useEffect(() => { if (open) setDone(false); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  const ok = name.trim().length > 1 && phone.trim().length >= 8 && date !== "";
  const show = open ? "opacity-100" : "pointer-events-none opacity-0";
  const card = open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]";

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
        aria-label="Reserve the chef's table"
        aria-hidden={!open}
        className={`fixed inset-0 z-[71] flex items-center justify-center overflow-y-auto p-5 transition-opacity duration-500 ease-tide ${show}`}
      >
        <div
          className={`w-full max-w-[440px] rounded-card border border-black/[0.06] bg-brand-sand shadow-min transition-transform duration-500 ease-tide ${card}`}
        >
          <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-7 pb-5 pt-6">
            <div>
              <p className="type-eyebrow mb-2 flex items-center gap-2">
                <span className="h-px w-6 bg-brand-gold" />
                The chef&apos;s table
              </p>
              <h3 className="font-display text-[30px] font-light leading-none text-brand-ink">
                {done ? "The table is yours." : "Reserve the table."}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close reservation"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.06] text-brand-ink transition-colors hover:text-brand-clay"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {done ? (
            <div className="px-7 py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.06] bg-brand-sage">
                <Check className="h-5 w-5 text-brand-clay" />
              </span>
              <p className="mt-5 font-display text-[22px] text-brand-ink">
                {name.trim()}, {guests} {guests === 1 ? "seat" : "seats"} · {seat}
              </p>
              <p className="mt-2 text-[13px] text-brand-muted">
                {date} — we&apos;ll call {phone.trim()} shortly.
              </p>
              <span className="rule-gold my-6 block" aria-hidden />
              <a
                href="tel:+916374495003"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-brand-slate transition-colors hover:text-brand-ink"
              >
                <Phone className="h-3.5 w-3.5" />
                +91 63744 95003
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
            <form
              className="space-y-4 px-7 py-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (ok) setDone(true);
              }}
            >
              <div>
                <label htmlFor="reserve-name" className={labelCls}>
                  Name
                </label>
                <input
                  id="reserve-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reserve-phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    id="reserve-phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 …"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="reserve-date" className={labelCls}>
                    Evening
                  </label>
                  <input
                    id="reserve-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
              <SeatingPick seat={seat} setSeat={setSeat} />
              <GuestPick guests={guests} setGuests={setGuests} />
              <button
                type="submit"
                disabled={!ok}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wider2 text-brand-sand transition-colors duration-300 hover:bg-brand-clay disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-ink"
              >
                <CalendarCheck className="h-3.5 w-3.5" />
                Confirm reservation
              </button>
              <p className="text-center text-[11px] uppercase tracking-wider2 text-brand-muted">
                Six seats a night · about 95 minutes
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
function SeatingPick({
  seat,
  setSeat,
}: {
  seat: string;
  setSeat: (v: string) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider2 text-brand-muted">
        Seating
      </span>
      <div className="grid grid-cols-2 gap-2">
        {["7:00 pm", "9:30 pm"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSeat(s)}
            aria-pressed={seat === s}
            className={`rounded-full border px-4 py-2.5 text-[12px] font-medium transition-colors duration-300 ${
              seat === s
                ? "border-brand-ink bg-brand-ink text-brand-sand"
                : "border-black/[0.06] bg-brand-sage text-brand-slate hover:text-brand-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function GuestPick({
  guests,
  setGuests,
}: {
  guests: number;
  setGuests: (fn: (g: number) => number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-brand-sage px-4 py-2.5">
      <span className="flex items-center gap-2 text-[12px] font-medium text-brand-slate">
        <Users className="h-3.5 w-3.5" />
        Guests
      </span>
      <span className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setGuests((g) => Math.max(1, g - 1))}
          aria-label="Fewer guests"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-brand-sand text-lg leading-none text-brand-ink transition-colors hover:text-brand-clay"
        >
          −
        </button>
        <span
          aria-live="polite"
          className="min-w-[20px] text-center text-sm font-semibold tabular-nums text-brand-ink"
        >
          {guests}
        </span>
        <button
          type="button"
          onClick={() => setGuests((g) => Math.min(6, g + 1))}
          aria-label="More guests"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ink text-lg leading-none text-brand-sand transition-colors hover:bg-brand-clay"
        >
          +
        </button>
      </span>
    </div>
  );
}
