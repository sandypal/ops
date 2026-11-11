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
  ArrowLeft,
  Trophy,
  Shield,
  Maximize2,
  Layers,
  Lock,
  Ticket,
} from "lucide-react";
import { GALLERY_ITEMS } from "@/components/TournamentGallery";

// Image dimensions map for natural masonry aspect ratio
const IMAGE_RATIOS: Record<number, { width: number; height: number }> = {
  1: { width: 1024, height: 575 }, // 2026 Poster Release with Governor
  2: { width: 1280, height: 960 },
  3: { width: 960, height: 1280 }, // portrait
  4: { width: 1280, height: 960 },
  5: { width: 1280, height: 960 },
  6: { width: 1280, height: 853 },
  7: { width: 1280, height: 853 },
  8: { width: 1280, height: 853 },
  9: { width: 1280, height: 853 },
  10: { width: 1280, height: 853 },
  11: { width: 1280, height: 853 },
  12: { width: 1280, height: 853 },
  13: { width: 1280, height: 853 },
  14: { width: 1280, height: 853 },
  15: { width: 1280, height: 853 },
  16: { width: 960, height: 1280 }, // portrait
  17: { width: 1280, height: 853 },
  18: { width: 1280, height: 853 },
  19: { width: 1280, height: 853 },
  20: { width: 1280, height: 853 },
  21: { width: 1280, height: 853 },
  22: { width: 1280, height: 720 }, // wide
  23: { width: 960, height: 1280 }, // portrait
  24: { width: 1280, height: 960 },
  25: { width: 1280, height: 960 },
  26: { width: 1280, height: 853 },
  27: { width: 1280, height: 853 },
  28: { width: 1280, height: 853 },
  29: { width: 1280, height: 853 },
  30: { width: 1280, height: 960 },
};

// First 7 items for Featured Bento Showcase
const FEATURED_BENTO = GALLERY_ITEMS.slice(0, 7);
// Remaining items for the Masonry Mosaic
const MASONRY_ITEMS = GALLERY_ITEMS.slice(7);

export default function GalleryClient() {
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
    <div className="min-h-screen bg-[#070d19] text-white">
      {/* ═══════════════════════════════════════════════════════════════════════
          PAGE HERO HEADER
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-[#0b162c] via-[#0d1a35] to-[#070d19] border-b border-slate-800">
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d8392f]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400">Photo Gallery</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-inner mb-4">
                <Camera className="w-3.5 h-3.5 text-[#d8392f]" />
                <span>Official Tournament Archives</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight text-white mb-4 leading-tight">
                OPERATION SINDOOR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8392f] via-rose-500 to-amber-400">
                  CRICKET CUP 2025
                </span>{" "}
                GALLERY
              </h1>

              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-8">
                Official gallery images capturing high-voltage match action, Armed
                Forces tribute ceremonies, team celebrations, and championship
                trophy presentations from Operation Sindoor Cricket Cup 2025.
              </p>

              {/* Quick Stats Pill Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Camera className="w-4 h-4 text-[#d8392f]" />
                  <span>{GALLERY_ITEMS.length} High-Res Photos</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Indian Armed Forces Tribute</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span>Season 2025 Highlights</span>
                </div>
              </div>
            </div>

            {/* Quick Action: Start Slideshow */}
            <div className="shrink-0">
              <button
                onClick={() => openLightbox(0)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d8392f] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(216,57,47,0.4)] hover:shadow-[0_0_30px_rgba(216,57,47,0.7)] transition-all hover:scale-105 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Open Full-Screen Slideshow</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: EDITORIAL BENTO SHOWCASE (FEATURED 7 MOMENTS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-12 sm:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d8392f]" />
              Featured Highlights
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Click any photo to expand
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[220px] sm:auto-rows-[240px] lg:auto-rows-[230px]">
            {/* Bento Card 1: Giant 2x2 Feature */}
            <div
              onClick={() => openLightbox(0)}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden bg-[#0c1426] border-2 border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-2xl hover:shadow-[0_0_35px_rgba(216,57,47,0.35)] transition-all duration-500 min-h-[340px] md:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[0].src}
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
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bento Card 2: Wide 2x1 Card */}
            <div
              onClick={() => openLightbox(1)}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[1].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 2"
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

            {/* Bento Card 3: Standard 1x1 */}
            <div
              onClick={() => openLightbox(2)}
              className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[2].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 3"
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

            {/* Bento Card 4: Standard 1x1 */}
            <div
              onClick={() => openLightbox(3)}
              className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[3].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 4"
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

            {/* Bento Card 5: Standard 1x1 */}
            <div
              onClick={() => openLightbox(4)}
              className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[4].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 5"
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

            {/* Bento Card 6: Standard 1x1 */}
            <div
              onClick={() => openLightbox(5)}
              className="relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] group cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(216,57,47,0.3)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[5].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 6"
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

            {/* Bento Card 7: Wide 2x1 */}
            <div
              onClick={() => openLightbox(6)}
              className="md:col-span-2 lg:col-span-2 lg:row-span-1 relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-amber-400 group cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] transition-all duration-500 min-h-[220px] lg:min-h-0"
            >
              <Image
                src={FEATURED_BENTO[6].src}
                alt="Operation Sindoor Cricket Cup 2025 Highlight 7"
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: FLUID MASONRY MOSAIC (REMAINING 22 MOMENTS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d8392f]" />
              Tournament Photo Collection ({MASONRY_ITEMS.length} More Photos)
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Click any photo to zoom full-screen
            </span>
          </div>

          {/* Fluid Pinterest-style Masonry Columns */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
            {MASONRY_ITEMS.map((item, idx) => {
              const globalIndex = idx + 7;
              const ratio = IMAGE_RATIOS[item.id] || { width: 1280, height: 853 };
              const isPortrait = ratio.height > ratio.width;

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(globalIndex)}
                  className="break-inside-avoid mb-4 sm:mb-5 group relative rounded-3xl overflow-hidden bg-[#0c1426] border border-slate-700/80 hover:border-[#d8392f] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#d8392f]/25 transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div
                    className={`relative w-full ${
                      isPortrait
                        ? "aspect-[3/4]"
                        : "aspect-[4/3]"
                    } overflow-hidden`}
                  >
                    <Image
                      src={item.src}
                      alt={`Operation Sindoor Cricket Cup 2025 Gallery Image ${item.id}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Clean Dark Overlay with Center Zoom Icon on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xl border border-white/20">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Card */}
          <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0b162c] via-[#122347] to-[#0b162c] border-2 border-slate-800 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8392f]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest block mb-2">
                Join the Action in 2026
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic text-white mb-4">
                EXPERIENCE THE LIVE ACTION
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                Official team registrations are now closed (all 24 collegiate squad slots locked). Claim your Free Match Pass to watch the action live under Sector 16 Stadium floodlights!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/passes"
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4 text-slate-950" />
                  <span>Claim Free Match Pass</span>
                </Link>
                <Link
                  href="/#teams"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-sm uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>View 24 Confirmed Teams</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          {/* Top Bar: Details & Close */}
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
    </div>
  );
}
