import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Registration (Closed) | Operation Sindoor Cricket Cup 2.0",
  description:
    "Official team registrations are now closed. All 24 collegiate cricket squads for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh have been locked. Free match passes are available for spectators.",
  keywords: [
    "Cricket Tournament Registration Closed",
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
    title: "Team Registration (Closed) | Operation Sindoor Cricket Cup 2.0",
    description:
      "Official team registrations are now closed. All 24 collegiate cricket squads for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh have been locked.",
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
    title: "Team Registration (Closed) | Operation Sindoor Cricket Cup 2.0",
    description:
      "Official team registrations are now closed. All 24 collegiate squad slots for Operation Sindoor Cricket Cup 2.0 at Sector 16 Stadium, Chandigarh have been locked.",
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
