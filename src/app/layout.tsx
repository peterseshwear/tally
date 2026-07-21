import type { Metadata } from "next";
import { Figtree, Zilla_Slab } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-zilla",
});

export const metadata: Metadata = {
  title: "Tally",
  description: "Payments in plain English for small merchants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${zillaSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}
