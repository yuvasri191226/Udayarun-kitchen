"use client";

import { useEffect, useRef, useState } from "react";

/**
 * DishImage — a bullet-proof food photograph.
 *
 * Why this exists: a single dead Unsplash URL used to leave an empty grey
 * box in the grid. This component guarantees a beautiful result in every
 * case:
 *
 *   1. shows a sage shimmer skeleton while the photo streams in
 *   2. if the request fails once, it retries once with a cache-buster
 *      (transient network blips)
 *   3. if it still fails, it swaps to a locally-generated ivory + antique
 *      gold placeholder SVG showing the dish name — no network needed, so
 *      a broken image box can never appear again
 */

interface DishImageProps {
  src: string;
  alt: string;
  /** Wrapper classes (sizing / rounding / overflow live here). */
  className?: string;
  /** Extra classes for the <img> itself (object-fit, hover transforms…). */
  imgClassName?: string;
  /** Shown on the generated placeholder if the photo can't load. */
  label?: string;
  /** Skip lazy-loading for above-the-fold imagery. */
  priority?: boolean;
}

const initials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

/** Ivory + sage plate with an antique-gold ring — generated, never 404s. */
function placeholderSrc(label: string) {
  const mono = initials(label) || "TT";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef5ee"/>
      <stop offset="55%" stop-color="#fffdf8"/>
      <stop offset="100%" stop-color="#e2ede1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <circle cx="400" cy="272" r="118" fill="none" stroke="#b08d4f" stroke-opacity="0.55" stroke-width="2"/>
  <circle cx="400" cy="272" r="104" fill="none" stroke="#12241b" stroke-opacity="0.12" stroke-width="1"/>
  <text x="400" y="296" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#213329" fill-opacity="0.72">${mono}</text>
  <text x="400" y="466" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic" fill="#405047">${label.replace(
    /&/g,
    "&amp;"
  )}</text>
  <text x="400" y="504" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" letter-spacing="4" fill="#b08d4f">UDAYARUN</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function DishImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  label,
  priority = false,
}: DishImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  /* Start LOADED so server-rendered HTML paints the <img> at full opacity
     with zero JS dependency — the blank box happened because SSR shipped an
     opacity-0 image that only appeared after client hydration + onLoad.
     Once hydrated, we check the DOM: if the photo isn't cached yet we flip
     to the shimmer skeleton until it paints. */
  const [loaded, setLoaded] = useState(true);
  const [failed, setFailed] = useState(false);
  const retried = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Keep in step if the parent swaps the photo.
  useEffect(() => {
    retried.current = false;
    setFailed(false);
    setCurrentSrc(src);
  }, [src]);

  // If the photo is NOT already cached, show the skeleton until it paints.
  // A cached image may finish decoding BEFORE React attaches onLoad after
  // hydration — reconcile from the DOM so the plate always paints.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) setLoaded(true);
    else setLoaded(false);
  }, [currentSrc]);

  const handleError = () => {
    if (!retried.current && src.startsWith("http")) {
      retried.current = true;
      // One retry — guards against transient network / CDN hiccups.
      setCurrentSrc(`${src}${src.includes("?") ? "&" : "?"}r=1`);
      return;
    }
    setFailed(true);
    setCurrentSrc(placeholderSrc(label ?? alt));
  };

  const showSkeleton = !loaded && !failed;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton — sits underneath and disappears once the photo paints */}
      {showSkeleton && (
        <span
          aria-hidden
          className="shimmer absolute inset-0 block h-full w-full"
        />
      )}

      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`h-full w-full object-cover object-center transition-[opacity,transform] duration-700 ease-tide ${
          loaded || failed ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
