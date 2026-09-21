/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          // ── The light canvas ─────────────────────────────
          sage: "#E6EFE6", // page background (soft sage green)
          mist: "#EBF2EA", // alternating band, barely lighter
          sand: "#FBF9F3", // warm ivory cards
          stone: "#DCE4DB", // subtle stone accent (dividers, chips)
          line: "rgba(0,0,0,0.06)", // the one hairline used everywhere
          // ── Ink ─────────────────────────────────────────
          ink: "#1E2A23", // display headings (deep charcoal)
          dark: "#2A3830", // body copy (charcoal, lightweight)
          slate: "#4A5A50", // secondary copy
          muted: "#7A8780", // captions, metadata (stone grey)
          // ── Accents (quiet, mineral — nothing bright) ───
          gold: "#A68A5B", // muted antique gold hairlines & italics
          "gold-soft": "#C9B78F", // gold set on dark imagery
          clay: "#8A7A63", // muted clay for spice / favourites
          moss: "#6B7F6E", // muted sage for vegetarian marker
          bark: "#4A4440", // warm charcoal for non-veg marker
          taupe: "#A79B8B", // soft taupe for dessert marker
          orange: "#8A7A63", // legacy alias → muted clay
          // legacy alias, kept so any older class name still resolves
          green: "#6B7F6E",
        },
      },
      fontFamily: {
        // Wired to the next/font CSS variables declared in app/layout.tsx
        body: [
          "var(--font-body)",
          "Plus Jakarta Sans",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        luxe: "0.34em", // wide editorial eyebrow labels
        wider2: "0.16em", // small-caps buttons
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        // Ultra-minimal editorial — hairlines do the work, shadows whisper
        card: "0 1px 2px rgba(0, 0, 0, 0.03)",
        min: "0 1px 2px rgba(0, 0, 0, 0.03)",
        lift: "0 12px 28px -18px rgba(0, 0, 0, 0.14)",
        plate: "0 16px 40px -28px rgba(0, 0, 0, 0.22)",
      },
      transitionTimingFunction: {
        tide: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
