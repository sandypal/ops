import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Operation Sindoor Cricket Cup 2025 Gallery Images | Official Archives",
  description:
    "Official gallery images capturing match action, Armed Forces tribute ceremonies, team celebrations, and trophy presentations from Operation Sindoor Cricket Cup 2025.",
  openGraph: {
    title: "Operation Sindoor Cricket Cup 2025 Gallery Images",
    description:
      "30 official gallery images from the Operation Sindoor Cricket Cup tournament including the 2026 poster release with Governor of Punjab & UT Administrator Chandigarh, Shri Gulab Chand Kataria.",
    images: ["/galleries/poster-release-2026-governor-gulab-chand-kataria.jpeg"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <GalleryClient />
      </main>
      <Footer />
    </>
  );
}
