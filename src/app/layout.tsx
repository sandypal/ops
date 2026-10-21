import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://operationsindoorcricketcup.com"),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  title: {
    default: "Operation Sindoor Cricket Cup 2.0 | Chandigarh Cricket Tournament 2026",
    template: "%s | Operation Sindoor Cricket Cup 2.0",
  },
  description:
    "Operation Sindoor Cricket Cup 2.0 — A premier T10 leather ball cricket tournament in Chandigarh. 24 teams (Boys & Girls), Sector 16 Stadium, ₹2 Lac prize pool. Punjab's biggest cricket league 2026, organized by Sarv Sewa Sashktikarn Sangthan (Regd).",
  keywords: [
    "Chandigarh Cricket Tournament",
    "Punjab Cricket Tournament",
    "Cricket League Chandigarh",
    "Cricket League Punjab",
    "T10 Cricket Tournament Chandigarh",
    "Sector 16 Stadium Cricket",
    "Cricket Tournament Registration 2026",
    "Punjab Cricket League 2026",
    "Chandigarh Cricket Cup 2026",
    "Operation Sindoor Cricket Cup",
    "cricket tournament India 2026",
    "Girls Cricket Tournament Punjab",
    "leather ball cricket tournament",
    "Sarv Sewa Sashktikarn Sangthan (Regd)",
    "cricket registration Chandigarh",
  ],
  authors: [{ name: "Sarv Sewa Sashktikarn Sangthan (Regd)", url: "https://sarvsewabharat.org/" }],
  creator: "Sarv Sewa Sashktikarn Sangthan (Regd)",
  publisher: "Sarv Sewa Sashktikarn Sangthan (Regd)",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://operationsindoorcricketcup.com",
    siteName: "Operation Sindoor Cricket Cup 2.0",
    title: "Operation Sindoor Cricket Cup 2.0 | Chandigarh Cricket Tournament 2026",
    description:
      "India's premier nationwide collegiate cricket tournament 2026 across all States & UTs. T10 format, 24 teams, ₹2 Lac prize pool at Sector 16 Stadium Chandigarh. Register now!",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Operation Sindoor Cricket Cup 2.0 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operation Sindoor Cricket Cup 2.0 | Chandigarh Cricket Tournament 2026",
    description:
      "India's premier nationwide collegiate cricket tournament 2026 across all States & UTs. T10 format, 24 teams, ₹2 Lac prize pool. Register now!",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
