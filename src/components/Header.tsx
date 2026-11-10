'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Trophy, ChevronRight, Ticket } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#0b162c] text-white/80 text-xs py-1.5 hidden md:block border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold tracking-wider text-[#d8392f]">
            <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              SARV SEWA SASHKTIKARN SANGTHAN (REGD)
            </a>
          </div>
          <div className="flex items-center gap-4 font-semibold tracking-wider text-slate-300">
            <span>INDIAN ARMED FORCES TRIBUTE</span>
            <span className="text-white/20">|</span>
            <span className="text-white/80">SECTOR 16 STADIUM CHANDIGARH</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0b162c] via-[#112240] to-[#0b162c] border-b-[3px] border-[#d8392f] shadow-xl">
        <div className="container mx-auto px-4 py-2 sm:py-2.5">
          {/* Top Row: Left Logo & Text, Desktop Nav in Center, and Right Actions */}
          <div className="flex items-center justify-between gap-3">
            {/* Top Left: Logo & 2-Line Text */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0 transition-transform hover:opacity-95">
              <div className="shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Operation Sindoor Logo" 
                  width={64} 
                  height={64} 
                  className="w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 object-contain group-hover:scale-105 transition-transform" 
                />
              </div>
              <div className="flex flex-col justify-center select-none">
                <span className="font-black text-sm sm:text-base md:text-lg tracking-tight text-white italic drop-shadow-md uppercase leading-tight whitespace-nowrap group-hover:text-slate-100 transition-colors">
                  Operation Sindoor
                </span>
                <span className="font-black text-[11px] sm:text-xs md:text-sm tracking-wider text-[#d8392f] italic uppercase leading-none whitespace-nowrap">
                  Cricket Cup
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-bold text-xs xl:text-[13px] tracking-wider uppercase text-white/90 shrink-0">
              <Link href="/#about" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">About</Link>
              <Link href="/gallery" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">Gallery</Link>
              <Link href="/#sponsorship" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">Sponsorship</Link>
              <Link href="/#schedule" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">Matches</Link>
              <Link href="/#teams" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">Teams</Link>
              <Link href="/#organizers" className="hover:text-[#d8392f] transition-colors pb-0.5 border-b-2 border-transparent hover:border-[#d8392f]">Organizers</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Highlighted Flat Free Match Pass Button */}
              <Link 
                href="/passes" 
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 rounded-lg transition-colors font-black uppercase text-xs sm:text-[13px] tracking-wider inline-flex items-center gap-2 select-none border-b-2 border-amber-600"
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>Free Match Pass</span>
              </Link>
              <Link 
                href="/registration" 
                className="px-4 py-2.5 bg-[#d8392f] hover:bg-[#b91c1c] text-white rounded-lg transition-colors font-black uppercase text-xs sm:text-[13px] tracking-wider inline-flex items-center select-none border-b-2 border-red-900"
              >
                Register Team
              </Link>
            </div>

            {/* Top Right: Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-colors focus:outline-none"
                aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Bottom Row on Mobile: Action Buttons */}
          <div className="lg:hidden mt-2 pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
            <Link 
              href="/passes" 
              className="w-full py-2.5 px-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border-b-2 border-amber-600"
            >
              <Ticket className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Free Match Pass</span>
            </Link>
            <Link 
              href="/registration" 
              className="w-full py-2.5 px-2 bg-[#d8392f] hover:bg-[#b91c1c] text-white rounded-lg font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-colors border-b-2 border-red-900"
            >
              <span>Register Team</span>
              <span className="text-[10px] bg-black/25 px-1.5 py-0.5 rounded font-bold">₹4,999</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#091122]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-1 divide-y divide-white/5">
              <div className="space-y-1 pb-3">
                {/* Flat Highlighted Mobile Pass Button */}
                <Link 
                  href="/passes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 font-black text-sm uppercase tracking-wider transition-colors mb-2.5 border-b-2 border-amber-600"
                >
                  <span className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-slate-950" />
                    Free Match Pass
                  </span>
                  <span className="text-[10px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded font-black tracking-widest">
                    100% FREE
                  </span>
                </Link>
                <Link 
                  href="/#about" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>About Tournament</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
                <Link 
                  href="/gallery" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Gallery Highlights</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
                <Link 
                  href="/#sponsorship" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Sponsorship Matrix</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
                <Link 
                  href="/#schedule" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Matches & Schedule</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
                <Link 
                  href="/#teams" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>All Teams (24)</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
                <Link 
                  href="/#organizers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  <span>Organizing Committee</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              </div>

              {/* Direct Quick Helpline inside Mobile Menu */}
              <div className="pt-3.5 pb-2 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block px-3 tracking-wider">
                  Tournament Helplines
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-1">
                  <a 
                    href="tel:+919056333759"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#d8392f] text-xs font-bold text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d8392f] shrink-0" />
                    <span className="truncate">90563 33759</span>
                  </a>
                  <a 
                    href="tel:+918437409211"
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-bold text-amber-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Vishal (Coord)</span>
                  </a>
                  <a 
                    href="tel:+919855109159"
                    className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-bold text-amber-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Karan Sama (Coord)</span>
                  </a>
                </div>
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-3">
                <Link 
                  href="/registration" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white rounded-xl font-black italic tracking-wider text-center uppercase shadow-lg text-sm flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>Register Squad • ₹4,999</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
