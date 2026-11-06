"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";

export interface GalleryItem {
  id: number;
  src: string;
  title?: string;
  description?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/galleries/poster-release-2026-governor-gulab-chand-kataria.jpeg",
    title: "2026 Poster Release Ceremony",
    description: "Official Poster Release of Operation Sindoor Cricket Cup 2026 in the august presence of Hon'ble Governor of Punjab & UT Administrator Chandigarh, Shri Gulab Chand Kataria."
  },
  { id: 2, src: "/galleries/gallery-01.jpeg" },
  { id: 3, src: "/galleries/gallery-04.jpeg" },
  { id: 4, src: "/galleries/gallery-02.jpeg" },
  { id: 5, src: "/galleries/gallery-18.jpeg" },
  { id: 6, src: "/galleries/gallery-07.jpeg" },
  { id: 7, src: "/galleries/gallery-08.jpeg" },
  { id: 8, src: "/galleries/gallery-24.jpeg" },
  { id: 9, src: "/galleries/gallery-03.jpeg" },
  { id: 10, src: "/galleries/gallery-05.jpeg" },
  { id: 11, src: "/galleries/gallery-06.jpeg" },
  { id: 12, src: "/galleries/gallery-09.jpeg" },
  { id: 13, src: "/galleries/gallery-10.jpeg" },
  { id: 14, src: "/galleries/gallery-11.jpeg" },
  { id: 15, src: "/galleries/gallery-12.jpeg" },
  { id: 16, src: "/galleries/gallery-13.jpeg" },
  { id: 17, src: "/galleries/gallery-14.jpeg" },
  { id: 18, src: "/galleries/gallery-15.jpeg" },
  { id: 19, src: "/galleries/gallery-16.jpeg" },
  { id: 20, src: "/galleries/gallery-17.jpeg" },
  { id: 21, src: "/galleries/gallery-19.jpeg" },
  { id: 22, src: "/galleries/gallery-20.jpeg" },
  { id: 23, src: "/galleries/gallery-21.jpeg" },
  { id: 24, src: "/galleries/gallery-22.jpeg" },
  { id: 25, src: "/galleries/gallery-23.jpeg" },
  { id: 26, src: "/galleries/gallery-25.jpeg" },
  { id: 27, src: "/galleries/gallery-26.jpeg" },
  { id: 28, src: "/galleries/gallery-27.jpeg" },
  { id: 29, src: "/galleries/gallery-28.jpeg" },
  { id: 30, src: "/galleries/gallery-29.jpeg" },
];

const BENTO_ITEMS = GALLERY_ITEMS.slice(0, 7);
const REEL_ITEMS = GALLERY_ITEMS.slice(7, 18);

export default function TournamentGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
    );
  }, [lightboxIndex]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        : 0
    );
  }, [lightboxIndex]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#0b162c] via-[#0d1a36] to-[#0a0f1d] text-white relative overflow-hidden border-b-2 border-slate-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d8392f]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative cricket pitch lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8392f]/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-white/10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-inner mb-3">
              <Camera className="w-3.5 h-3.5 text-[#d8392f]" />
              <span>Official Archives • Season 1</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tight text-white leading-tight">
              OPERATION SINDOOR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8392f] via-rose-500 to-amber-400">
                CRICKET CUP 2025
              </span>{" "}
              GALLERY
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-medium mt-2 leading-relaxed">
              Official gallery images capturing high-voltage cricket action, Armed
              Forces tributes, and championship celebrations from Operation
              Sindoor Cricket Cup 2025.
            </p>
          </div>

          {/* Quick Header CTA Link */}
          <div className="shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-[#d8392f]/50 transition-all group"
            >
              <span>Explore All {GALLERY_ITEMS.length} Photos</span>
              <ArrowRight className="w-4 h-4 text-[#d8392f] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            ASYMMETRIC BENTO SHOWCASE (PURE IMAGES WITH HOVER ZOOM)
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[220px] sm:auto-rows-[240px] lg:auto-rows-[230px]">
          {/* Card 1: Main Feature Card (Cols 1-2, Rows 1-2) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 lg:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden bg-[#0c1426] border-2 border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-2xl hover:shadow-[0_0_35px_rgba(216,57,47,0.35)] transition-all duration-500 min-h-[340px] md:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[0].src}
              alt="Operation Sindoor Cricket Cup 2026 Poster Release in the presence of Hon'ble Governor of Punjab & UT Administrator Chandigarh, Gulab Chand Kataria"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            {/* 2026 Lead Feature Badge */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#d8392f] animate-pulse" />
              <span>2026 Poster Release • Punjab Governor &amp; UT Administrator</span>
            </div>
            {/* Bottom Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
              <p className="text-white font-bold text-xs sm:text-sm line-clamp-1 drop-shadow">
                2026 Poster Release with Hon&apos;ble Governor Shri Gulab Chand Kataria
              </p>
            </div>
            {/* Subtle Hover Zoom Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 2: Wide Card (Cols 3-4, Row 1) */}
          <div
            onClick={() => openLightbox(1)}
            className="md:col-span-2 lg:col-span-2 lg:row-span-1 relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[1].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 2"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 3: Standard Card (Col 3, Row 2) */}
          <div
            onClick={() => openLightbox(2)}
            className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[2].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 3"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 4: Standard Card (Col 4, Row 2) */}
          <div
            onClick={() => openLightbox(3)}
            className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[3].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 4"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 5: Standard Card (Col 1, Row 3) */}
          <div
            onClick={() => openLightbox(4)}
            className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[4].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 5"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 6: Standard Card (Col 2, Row 3) */}
          <div
            onClick={() => openLightbox(5)}
            className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[5].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 6"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 7: Wide Card (Cols 3-4, Row 3) */}
          <div
            onClick={() => openLightbox(6)}
            className="md:col-span-2 lg:col-span-2 lg:row-span-1 relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-amber-400 group cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] transition-all duration-500 min-h-[220px] lg:min-h-0"
          >
            <Image
              src={BENTO_ITEMS[6].src}
              alt="Operation Sindoor Cricket Cup 2025 Gallery Image 7"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            INTERACTIVE REEL (PURE IMAGES)
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              More 2025 Moments
            </span>
            <span className="text-slate-500">
              Click any photo to view full-screen
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/20">
            {REEL_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => openLightbox(idx + 7)}
                className="group relative w-36 sm:w-44 h-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-700/80 hover:border-[#d8392f] transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
                title={`Operation Sindoor Cricket Cup 2025 Gallery Image ${item.id}`}
              >
                <Image
                  src={item.src}
                  alt={`Operation Sindoor Cricket Cup 2025 Gallery Image ${item.id}`}
                  fill
                  sizes="180px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            BOTTOM ACTION CTA BANNER
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/5 via-white/[0.08] to-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d8392f] to-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-900/40">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white uppercase italic">
                OPERATION SINDOOR CRICKET CUP 2025 ARCHIVES
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Explore all {GALLERY_ITEMS.length} high-definition photos from the Operation
                Sindoor Cricket Cup tournament.
              </p>
            </div>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d8392f] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(216,57,47,0.4)] hover:shadow-[0_0_30px_rgba(216,57,47,0.7)] transition-all hover:scale-105 shrink-0"
          >
            <span>Open Dedicated Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FULL-SCREEN IMAGE LIGHTBOX MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar: Clean Title & Close */}
          <div
            className="w-full px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d8392f] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm sm:text-base leading-tight">
                  {GALLERY_ITEMS[lightboxIndex].title || "Operation Sindoor Cricket Cup"}
                </span>
                <span className="text-slate-400 text-xs line-clamp-1">
                  {GALLERY_ITEMS[lightboxIndex].description || `Tournament Archives • Photo ${lightboxIndex + 1} of ${GALLERY_ITEMS.length}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono font-bold">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>

              <button
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-colors border border-white/10 focus:outline-none cursor-pointer"
                aria-label="Close Lightbox (Esc)"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage: Image & Left / Right Nav Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              onClick={showPrev}
              className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#d8392f] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 shadow-2xl focus:outline-none cursor-pointer"
              aria-label="Previous Image"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Current Image */}
            <div className="relative max-w-5xl max-h-[70vh] sm:max-h-[76vh] w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={GALLERY_ITEMS[lightboxIndex].src}
                  alt={`Operation Sindoor Cricket Cup 2025 Gallery Image ${lightboxIndex + 1}`}
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1280px) 95vw, 1200px"
                />
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#d8392f] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 shadow-2xl focus:outline-none cursor-pointer"
              aria-label="Next Image"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Bar: Thumbnail Filmstrip for Quick Jumping */}
          <div
            className="w-full px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 bg-black/60 backdrop-blur-md relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-4xl mx-auto scrollbar-thin scrollbar-thumb-white/20">
              {GALLERY_ITEMS.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    idx === lightboxIndex
                      ? "border-[#d8392f] scale-110 shadow-[0_0_12px_rgba(216,57,47,0.7)]"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                  title={`Photo ${thumb.id}`}
                >
                  <Image
                    src={thumb.src}
                    alt={`Photo ${thumb.id}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
