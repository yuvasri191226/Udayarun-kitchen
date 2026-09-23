"use client";

import { useEffect, useRef } from "react";
import { CalendarCheck, MapPin, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    number: "I",
    icon: UtensilsCrossed,
    title: "Choose your counter",
    body: "Twelve kitchens, one menu. Filter by vegetarian, non-vegetarian or the pastry room and add plates as you go.",
  },
  {
    number: "II",
    icon: MapPin,
    title: "We plate to order",
    body: "Nothing is pre-made. Your dish leaves the pass the moment it is fired, sealed in brass-lined boxes.",
  },
  {
    number: "III",
    icon: CalendarCheck,
    title: "Thirty minutes, door to table",
    body: "Our riders carry the same linen and banana leaf we use in the dining room, so it lands exactly as it left.",
  },
];

/**
 * HowItWorks — three acts, set as Roman numerals on ivory cards.
 */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    section
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="border-y border-black/[0.06] bg-brand-mist px-[5.5vw] py-12 md:py-16 lg:py-20"
      aria-labelledby="how-title"
    >
      <div className="mb-14 max-w-2xl">
        <p className="reveal type-eyebrow mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          How the evening runs
        </p>
        <h2
          id="how-title"
          className="reveal delay-1 font-display text-[38px] font-light leading-[1.05] text-brand-ink md:text-[58px]"
        >
          Three acts,
          <em className="font-normal italic text-brand-gold"> start to finish.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <article
            key={step.title}
            className="reveal group relative flex flex-col rounded-card border border-black/[0.06] bg-brand-sand p-8 shadow-min md:p-10 transition-colors duration-500 ease-tide md:p-8"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <span className="pointer-events-none absolute right-6 top-5 font-display text-[54px] font-light leading-none text-brand-gold/25 transition-colors duration-500 group-hover:text-brand-gold/45">
              {step.number}
            </span>

            <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-mist text-brand-gold transition-colors duration-500 group-hover:bg-brand-stone/60 group-hover:text-brand-ink">
              <step.icon className="h-5 w-5" />
            </span>

            <h3 className="font-display text-[26px] leading-tight text-brand-ink md:text-[29px]">
              {step.title}
            </h3>

            <span className="rule-gold my-5 opacity-70" aria-hidden />

            <p className="text-[13.5px] leading-relaxed text-brand-muted">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}