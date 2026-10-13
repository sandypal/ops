import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#0b162c] text-white/80 text-xs py-1.5 hidden md:block border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold tracking-wider text-[#d8392f]">
            <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              SARV SEWA SASHKTIKARAN SANGTHAN
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
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-transform hover:opacity-95">
            <div className="shrink-0">
              <Image 
                src="/logo.png" 
                alt="Operation Sindoor Logo" 
                width={80} 
                height={80} 
                className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:scale-105 transition-transform" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-black text-xl md:text-2xl tracking-tighter text-white italic drop-shadow-md uppercase leading-none md:leading-tight group-hover:text-slate-100 transition-colors">
                Operation Sindoor <br className="hidden lg:block"/><span className="text-[#d8392f]">Cricket Cup</span>
              </h1>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 font-bold text-[13px] tracking-widest uppercase text-white/90">
            <Link href="/#about" className="hover:text-[#d8392f] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d8392f]">About</Link>
            <Link href="/#schedule" className="hover:text-[#d8392f] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d8392f]">Matches</Link>
            <Link href="/#teams" className="hover:text-[#d8392f] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d8392f]">Teams</Link>
            <Link href="/#rules" className="hover:text-[#d8392f] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d8392f]">Rules</Link>
            <Link href="/#organizers" className="hover:text-[#d8392f] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d8392f]">Organizers</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/registration" className="px-6 py-2.5 bg-gradient-to-r from-[#d8392f] to-[#d8392f] text-white rounded hover:from-[#d8392f] hover:to-[#b91c1c] transition-all font-black italic tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-[#d8392f] text-sm md:text-base uppercase">
              Register Team
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
