"use client";

import { useEffect } from "react";

/**
 * useReveal — one shared IntersectionObserver for the whole page.
 *
 * Any element carrying `.reveal` (fade + rise) or `.reveal-clip` (curtain
 * wipe) inside `rootSelector` gets `.visible` added the moment it enters
 * the viewport. Passing `deps` lets the observer re-register when the
 * rendered set of elements changes — e.g. after a filter or search.
 *
 * Elements start hidden in CSS, so reduced-motion users are handled in
 * globals.css rather than here.
 */
export function useReveal(deps: unknown[] = [], rootSelector = "body") {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // One-shot: nothing needs to hide again once it has appeared.
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -70px 0px" }
    );

    root
      .querySelectorAll(".reveal, .reveal-clip")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useReveal;
