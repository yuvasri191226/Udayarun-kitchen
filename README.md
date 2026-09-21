# 🍽️ Udayarun — Uber Eats-style Food Delivery Website

A cinematic, Scrolltide.co-inspired food-delivery experience built with **Next.js 15 + Tailwind CSS + Framer Motion**.

**28 dishes** in three clearly separated sections:

| Section | Count | Colour code |
| --- | --- | --- |
|  Vegetarian | 10 | green dot |
|  Non-Vegetarian | 10 | red dot |
|  Desserts | 8 | pink dot |

---

## 🚀 Run it

```bash
npm install      # only the first time
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

---

## 📄 Pages

| Route | What's there |
| --- | --- |
| `/` | Hero + search, category filter strip, full 28-dish menu grid, How-it-works, newsletter CTA, footer |
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
- **Scrolltide-style scroll reveals** — IntersectionObserver-driven fade-ups plus Framer Motion for the steps section.
- **Responsive** — 1 / 2 / 3 / 4 column grid from mobile to XL desktop.
- **Sticky glass header** with live cart count badge.

---

## ️ Project structure

```
ubereat/
├── app/
│   ├── layout.tsx        # Fonts (DM Sans + Playfair Display), CartProvider, metadata
│   ├── page.tsx          # Home
│   ├── menu/page.tsx     # Menu (reads ?category=)
│   ├── cart/page.tsx     # Cart page
│   └── globals.css       # Tailwind layers + reveal animations
├── components/
│   ├── Header.tsx        # Sticky nav + cart badge
│   ├── Hero.tsx          # Headline + search + animated plate
│   ├── CategoryStrip.tsx # All / Veg / Non-Veg / Dessert pills
│   ├── DishCard.tsx      # Dish card with veg/non-veg dot, price, rating
│   ├── MenuSection.tsx   # Filtering grid
│   ├── HowItWorks.tsx    # 3-step explainer + quote
│   ├── Footer.tsx        # Links incl. deep-linked category filters
│   └── CartDrawer.tsx    # Slide-in cart
├── data/dishes.ts        # ⭐ All 28 dishes + categories + hero stats
├── lib/
│   ├── store.tsx         # Cart context (add / decrement / remove / clear)
│   └── filterDishes.ts   # Pure category + search filtering logic
├── tailwind.config.js    # Brand palette + fonts
└── README.md
```

---

## 🎨 Brand palette

| Token | Hex | Used for |
| --- | --- | --- |
| `brand-green` | `#d7ee62` | accents, veg indicator background |
| `brand-orange` | `#dd7052` | highlights, hover underlines |
| `brand-dark` | `#213329` | headings, buttons |
| `brand-sand` | `#f5f3ee` | page background |
| `brand-sage` | `#e5efdc` | hero / banner sections |

---

##  Adding a dish

Open `data/dishes.ts` and append to the array:

```ts
{
  id: "29", name: "Your Dish Name",
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