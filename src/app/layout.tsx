import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "New England Floor & Wall | Premium Surface Expert Systems",
  description: "New England's premier surfaces expert systems for residential and commercial flooring, hardwood, vinyl, epoxy, coatings, and custom wall panels. Bold styling. Durable results.",
  keywords: ["flooring", "wall panels", "residential flooring", "commercial flooring", "epoxy flooring", "New England", "hardwood floor", "surface systems"],
  openGraph: {
    title: "New England Floor & Wall | Premium Surface Expert Systems",
    description: "Expert flooring & wall installation services in New England. Residential hardwood, commercial coatings, and waterproof wall coverings.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
