import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/store";

/**
 * Luxury serif for display type — Cormorant Garamond.
 * Clean geometric sans for everything else — Plus Jakarta Sans.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/udayarun-mark.svg" />
      </head>
      <body className="overflow-x-hidden bg-brand-sage text-brand-dark font-body antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}


