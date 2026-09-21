# 🍽️ Udayarun — Cinematic Food-Delivery Experience

A light-sage, editorial food-delivery experience for **Udayarun Urban Kitchen, Chennai** — built with **Next.js 15 + Tailwind CSS + Framer Motion**.

**38 dishes** in three clearly separated sections:

| Section | Count | Colour code |
| --- | --- | --- |
|  Vegetarian | 12 | moss dot |
|  Non-Vegetarian | 16 | bark dot |
|  Desserts | 10 | taupe dot |

---

## 🚀 Run it

```bash
npm install      # only the first time
npm run dev      # http://localhost:3000
```

Production build (standalone output):

```bash
npm run build
npm start            # or just double-click start-site.bat on Windows
```

> **Fonts** (Cormorant Garamond + Plus Jakarta Sans) load at **runtime** via `<link>` tags in `app/layout.tsx` — `npm run build` never fetches Google Fonts, so Vercel deploys with zero font/network dependency. Fallbacks: Georgia serif / system sans.

---

## 📄 Pages

| Route | What's there |
| --- | --- |
| `/` | Hero + search, category filter strip, full 38-dish menu grid, kitchens, signature rail, how-it-works, closing CTA, footer |
| `/menu` | Full menu page with the same filters + a veg / non-veg / dessert legend |
| `/menu?category=veg` | Deep links that pre-filter the grid (`veg`, `nonveg`, `dessert`, `all`) |
| `/cart` | Full-page cart: quantity steppers, remove, bill summary, place-order confirmation |

The cart is **global** — a slide-out drawer on every page plus a dedicated page, both driven by one React context (`lib/store.tsx`).

---

## ✨ Features

- **Veg / Non-Veg / Dessert separation** — colour-coded dots and badges on every card.
- **Live search** — type in the hero search box, the grid filters by dish, description, restaurant, spice level and jumps you to results.
- **Category filters** — Veg · Non-Veg · Desserts, instant client-side filtering.
- **Cart with quantity control** — add, increment, decrement (drops the line at 0), remove, bill summary with ₹40 delivery fee.
- **Cinematic scroll reveals** — IntersectionObserver-driven fade-ups plus Framer Motion for the steps section.
- **Responsive** — 1 / 2 / 3 / 4 column grid from mobile to XL desktop.
- **Sticky glass header** with live cart count badge.
- **Contacts wired** — +91 63744 95003 · udayakumari1620@gmail.com · instagram @uu_lvy._.18

---

## ️ Project structure

```
ubereat/
├── app/
│   ├── layout.tsx        # Metadata, runtime font <link>s, CartProvider
│   ├── page.tsx          # Home
│   ├── menu/page.tsx     # Menu (reads ?category=)
│   ├── cart/page.tsx     # Cart page
│   └── globals.css       # Tailwind layers + font vars + reveal animations
├── components/
│   ├── Header.tsx        # Sticky nav + cart badge
│   ├── Hero.tsx          # Headline + search
│   ├── CategoryStrip.tsx # All / Veg / Non-Veg / Dessert pills
│   ├── DishCard.tsx      # Card with veg/non-veg dot, price, rating
│   ├── DishImage.tsx     # Retry-once image with UDAYARUN-stamped SVG fallback
│   ├── MenuSection.tsx   # Filtering grid
│   ├── Kitchens.tsx / SignatureRail.tsx / Moments.tsx / ExperienceBand.tsx
│   ├── HowItWorks.tsx    # 3-step explainer + quote
│   ├── ChefTable.tsx + ReserveModal.tsx      # Chef-table reservation modal
│   ├── OrderConfirmModal.tsx                 # Checkout form → receipt UDY-XXXXXX
│   ├── CartDrawer.tsx    # Slide-in cart
│   └── Footer.tsx        # Contacts + deep-linked category filters
├── data/dishes.ts        # ⭐ All 38 dishes + categories + hero stats
├── lib/
│   ├── store.tsx         # Cart context (add / decrement / remove / clear)
│   ├── filterDishes.ts   # Pure category + search filtering logic
│   └── useReveal.ts      # Scroll-reveal hook
├── tailwind.config.js    # Brand palette + font stacks
└── start-site.bat        # One-click standalone production server
```

---

## 🎨 Brand palette

| Token | Hex | Used for |
| --- | --- | --- |
| `brand-sage` | `#E6EFE6` | page background |
| `brand-sand` | `#FBF9F3` | warm ivory cards |
| `brand-ink` | `#1E2A23` | display headings |
| `brand-dark` | `#2A3830` | body copy |
| `brand-gold` | `#A68A5B` | antique-gold hairlines & italics |
| `moss / bark / taupe` | `#6B7F6E` / `#4A4440` / `#A79B8B` | veg / non-veg / dessert markers |
| `brand-line` | `rgba(0,0,0,0.06)` | the one hairline used everywhere |

---

##  Adding a dish

Open `data/dishes.ts` and append to the array:

```ts
{
  id: "39", name: "Your Dish Name",
  description: "Short, appetising one-liner.",
  price: 320,
  image: "https://images.unsplash.com/photo-XXXX?auto=format&fit=crop&w=800&q=85",
  category: "veg",            // "veg" | "nonveg" | "dessert"
  restaurant: "Kitchen Name", prepTime: "25 min",
  rating: 4.6, spiceLevel: "medium",   // "mild" | "medium" | "hot" | "n/a"
  isPopular: true, isFeatured: false,
  badge: "New today",
}
```

It instantly appears in the grid, its category filter and the cart.

---

© 2026 Udayarun — demo project, prices in ₹ (INR).