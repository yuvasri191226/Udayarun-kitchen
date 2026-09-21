import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/store";

/**
 * Typography — Cormorant Garamond (display) + Plus Jakarta Sans (body).
 * Webfonts load at RUNTIME via the <link> tags in <head> below, so the
 * production build never fetches Google Fonts — Vercel deploys cleanly
 * with zero network dependency. If a browser can't reach Google Fonts,
 * the stacks in globals.css degrade gracefully (Georgia serif / system sans).
 */

export const metadata: Metadata = {
  title: "Udayarun | An open-dining table, delivered",
  description:
    "A cinematic open-dining menu — dosai counter, biriyani & rice bowls, coastal catch and desserts. Curated from the finest kitchens around Chennai and brought to your door.",
  keywords: [
    "Udayarun",
    "fine dining delivery",
    "Chennai food delivery",
    "biriyani",
    "dosa",
    "coastal seafood",
  ],
  icons: {
    icon: [
      { url: "/udayarun-mark.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/udayarun-mark.svg" />
        {/* Fonts — runtime <link>, not next/font (build-safe on Vercel) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body className="overflow-x-hidden bg-brand-sage text-brand-dark font-body antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}


