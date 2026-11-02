import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Registration | Operation Sindoor Cricket Cup 2.0",
  description:
    "Register your 12-player collegiate cricket squad for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh. ₹4,999 entry fee includes 12 official custom player jersey kits. Limited tournament slots available!",
  keywords: [
    "Cricket Tournament Registration",
    "Chandigarh Cricket Registration 2026",
    "Operation Sindoor Registration",
    "Sector 16 Stadium Cricket Cup",
    "Collegiate Cricket Tournament Punjab",
    "T10 Cricket League Registration",
  ],
  alternates: {
    canonical: "/registration",
  },
  openGraph: {
    title: "Team Registration | Operation Sindoor Cricket Cup 2.0",
    description:
      "Register your 12-player collegiate cricket squad for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh. ₹4,999 entry fee includes 12 official custom kits.",
    url: "https://operationsindoorcricketcup.com/registration",
    siteName: "Operation Sindoor Cricket Cup 2.0",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Operation Sindoor Cricket Cup 2.0 Team Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Registration | Operation Sindoor Cricket Cup 2.0",
    description:
      "Register your 12-player collegiate squad for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh. ₹4,999 fee includes 12 kits.",
    images: ["/logo.png"],
  },
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
