"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Shield,
  Info,
  Medal,
  Activity,
  ChevronRight,
  PlayCircle,
  Phone,
  Check,
  Leaf,
  Mail
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys');

  const teamColors = [
    "from-blue-600 to-blue-900", "from-green-500 to-green-800", "from-[#d8392f] to-red-900", "from-yellow-500 to-yellow-700",
    "from-purple-500 to-purple-800", "from-cyan-500 to-cyan-800", "from-pink-500 to-pink-800", "from-orange-500 to-orange-800",
    "from-indigo-600 to-indigo-900", "from-teal-500 to-teal-800", "from-rose-500 to-rose-800", "from-fuchsia-500 to-fuchsia-800",
    "from-amber-500 to-amber-700", "from-lime-500 to-lime-700", "from-emerald-500 to-emerald-800", "from-sky-500 to-sky-800"
  ];

  const boysTeams = [
    "Sindhu Spartans", "Satluj Soorme", "Beas Blasters", "Brahmaputra Bulls",
    "Mahanadi Masters", "Ravi Rangers", "Chenab Challengers", "Jhelum Jaguars",
    "Yamuna Yodhas", "Kaveri Warriors", "Ghaggar Champions", "Ganga Giants",
    "Narmada Titans", "Tapti Tigers", "Godavari Knights", "Krishna Kings"
  ];

  const girlsTeams = [
    "Sindhu Sherniyan", "Saraswati Strikers", "Satluj Sena", "Yamuna Panthers",
    "Sabarmati Sunrisers", "Kaveri Queens", "Ravi Royals", "Ganga Glory"
  ];

  // Organizing Committee Members (Add new members here)
  const organizers = [
    {
      name: "Vishal Kamboj",
      role: "Coordinator",
      designation: "Coordinator, Operation Sindoor Cricket Cup 2.0",
      image: "/vishal-kamboj.jpg",
      organization: "Sarv Sewa Sashktikaran Sangthan",
      phone: "+91 84374 09211"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 font-sans selection:bg-[#d8392f] selection:text-white">
      {/* Shared Header */}
      <Header />

      {/* Quick Info Ribbon */}
      <div className="bg-[#112240] py-3 border-b border-[#1e3a8a]">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-4 text-xs font-bold text-white/80 uppercase tracking-widest">
          <div className="flex items-center gap-2 text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8392f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d8392f]"></span>
            </span>
            Registrations Open Now
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[#d8392f]" /> ₹51K Winner • ₹31K Runner Up</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#d8392f]" /> 5-Day Event</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#d8392f]" /> Sector 16 Stadium Chandigarh</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#d8392f]" /> Boys & Girls Division</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b162c]">
        {/* Cricket Ground Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cricket-ground.png"
            alt="Cricket Ground"
            fill
            priority
            className="object-cover object-center opacity-100"
            sizes="100vw"
          />
          {/* Dark gradient overlay — same as before */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b162c] via-[#0b162c]/80 to-[#0b162c]/60" />
          {/* Red slanted accent — same as before */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[#d8392f] opacity-15 transform skew-x-[-20deg] translate-x-32" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b162c] to-transparent" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-3/5 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d8392f]/50 text-[#d8392f] text-xs font-black uppercase tracking-widest bg-white/5 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                <Shield className="w-3 h-3" />
                Tribute to Armed Forces
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-400/50 text-blue-300 text-xs font-black uppercase tracking-widest bg-white/5 backdrop-blur-sm">
                <Users className="w-3 h-3" />
                Open for Colleges & Universities
              </div>
            </div>

            <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter mb-4 leading-[0.9] text-white uppercase italic drop-shadow-2xl">
              T10 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8392f] to-[#fb923c]">GLORY</span><br />
              AWAITS
            </h2>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 font-medium">
              Open to <strong className="text-white">college &amp; university students</strong> across Punjab &amp; Chandigarh. Join the battle at Sector 16 Stadium Chandigarh. 24 Teams. 5 Days. Ultimate T10 knockouts. Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#d8392f] underline underline-offset-2 transition-colors">Sarv Sewa Sashktikaran Sangthan</a>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
              <a href="/registration" className="px-8 py-4 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white font-black italic text-xl uppercase tracking-wider rounded transition-all shadow-[0_10px_30px_rgba(220,38,38,0.6)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.8)] hover:-translate-y-1 w-full sm:w-auto text-center border-b-4 border-[#7f1d1d] flex items-center justify-center gap-2">
                <span>REGISTER TEAM</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded text-base font-black">₹4,999</span>
              </a>
              <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-black italic text-xl uppercase tracking-wider rounded transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <PlayCircle className="w-6 h-6" /> WATCH PROMO
              </a>
            </div>

            {/* Prominent Price Highlight Strip */}
            <div className="inline-flex flex-wrap items-center gap-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-lg">
              <div className="flex items-center gap-1.5 font-black text-amber-400 text-sm italic">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>₹4,999 / Team</span>
              </div>
              <span className="text-white/40">•</span>
              <span className="font-semibold">Squad of 12 Players</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                12x Official Jersey Kits Included
              </span>
            </div>
          </div>

          <div className="md:w-2/5 flex justify-center relative">
            <div className="w-64 h-64 md:w-96 md:h-96 relative z-10 animate-pulse-slow">
              <div className="absolute inset-0 bg-[#d8392f] rounded-full blur-[100px] opacity-30"></div>
              {/* Replace with actual trophy image if available, using logo as placeholder */}
              <Image src="/logo.png" alt="Trophy" width={400} height={400} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(239,68,68,0.5)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats (Like IPL stats bar) */}
      <section className="bg-white border-y border-slate-200 shadow-sm relative z-20 -mt-6 mx-4 md:mx-auto md:w-11/12 rounded-xl mb-16 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
          {[
            { label: "Entry Fee", value: "₹4,999", sub: "12x Jersey Kits Included", highlight: true },
            { label: "Matches", value: "22", sub: "T10 Knockouts" },
            { label: "Teams", value: "24", sub: "16 Boys • 8 Girls" },
            { label: "1st Prize", value: "₹51K", sub: "+ Official Trophy" }
          ].map((stat, i) => (
            <div key={i} className={`p-6 text-center transition-colors cursor-pointer group ${stat.highlight ? 'bg-gradient-to-b from-amber-50/60 to-white' : 'hover:bg-slate-50'}`}>
              <p className={`text-4xl font-black italic transition-colors ${stat.highlight ? 'text-[#d8392f]' : 'text-[#0b162c] group-hover:text-[#d8392f]'}`}>{stat.value}</p>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</h4>
              <p className={`text-xs mt-1 font-semibold ${stat.highlight ? 'text-emerald-700' : 'text-slate-400'}`}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white via-slate-50 to-[#f3f5f8] border-b border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100/80 text-[#d8392f] text-xs font-black uppercase tracking-widest mb-3 border border-red-200">
                <Shield className="w-3.5 h-3.5" />
                Tribute to Armed Forces
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#0b162c] tracking-tighter leading-tight">
                OPERATION SINDOOR <br />
                <span className="text-[#d8392f]">CRICKET CUP 2.0</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg mt-4 font-medium leading-relaxed">
                Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer"><strong className="text-slate-900 font-bold hover:text-[#d8392f] transition-colors">Sarv Sewa Sashktikaran Sangthan</strong></a>, the Operation Sindoor Cricket Cup is a premier state-level cricket tournament held in salute to the brave men and women of the Indian Armed Forces.
              </p>
            </div>
            <div className="shrink-0">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-slate-200">
                <Image
                  src="/sarvsewa-logo.png"
                  alt="Sarv Sewa Sashaktikaran Sangathan Logo"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Story & Mission Box */}
            <div className="lg:col-span-7 bg-[#0b162c] text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden border-t-4 border-[#d8392f]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8392f]/10 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white mb-4">
                Honoring Valor Through Sportsmanship
              </h3>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Conceived with the vision of uniting youth through the spirit of cricket and instilling deep respect for our nation&apos;s protectors, Operation Sindoor Cricket Cup 2.0 brings together the region&apos;s finest cricketers at the legendary <strong className="text-white">Sector 16 Stadium, Chandigarh</strong>.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Featuring 24 teams (16 Boys & 8 Girls), the tournament is played in the thrilling, explosive T10 leather ball format with certified officials, official colored jerseys, and high-stakes knockout drama.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer"><strong className="text-white hover:text-[#d8392f] transition-colors">Sarv Sewa Sashktikaran Sangthan</strong></a>, this event stands as a beacon of unity — bringing together young athletes, families, and communities to celebrate the values of discipline, teamwork, and national pride.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Certified leather ball format with professional umpires",
                  "Official colored jersey kits for every registered team",
                  "Boys & Girls divisions on the same prestigious stage",
                  "Anti-drug awareness campaign integrated throughout the event",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="mt-1 w-4 h-4 rounded-full bg-[#d8392f]/20 border border-[#d8392f]/40 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#d8392f]" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-[#d8392f] italic">24</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">Total Teams</div>
                  <div className="text-[11px] text-slate-400">16 Boys • 8 Girls</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-blue-400 italic">T10</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">High Speed</div>
                  <div className="text-[11px] text-slate-400">Leather Ball Knockouts</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-amber-400 italic">₹2 Lac</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">Cash Pool</div>
                  <div className="text-[11px] text-slate-400">+ Trophies & Caps</div>
                </div>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">

              {/* Card 1 - Armed Forces */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#d8392f] flex items-center justify-center shrink-0 border border-red-100">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Tribute to Armed Forces</h4>
                  <p className="text-slate-600 text-sm mt-1">A heartfelt salute to the brave martyrs and soldiers of the Indian Armed Forces. This tournament is our way of honouring their sacrifice, courage, and unwavering dedication to the nation.</p>
                </div>
              </div>

              {/* Card 2 - Rivers & Culture */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Rivers of India — Our Roots</h4>
                  <p className="text-slate-600 text-sm mt-1">Each team is named after a sacred river of India — symbols of life, culture, and civilization. Just as rivers unite communities, cricket unites us across regions, languages, and traditions.</p>
                </div>
              </div>

              {/* Card 3 - No to Drugs */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Say No to Drugs — Play Sports</h4>
                  <p className="text-slate-600 text-sm mt-1">We believe sport is the strongest weapon against substance abuse. This tournament invites the youth to channel their energy onto the field — because a nation that plays together, stays stronger together.</p>
                </div>
              </div>

              {/* Card 4 - Venue */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Venue — Sector 16, Chandigarh</h4>
                  <p className="text-slate-600 text-sm mt-1">The tournament is hosted at the prestigious Sector 16 Stadium, Chandigarh — a world-class arena that gives every player the professional stage they deserve.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Schedule / Match Center */}
      <section id="schedule" className="py-16 bg-[#0b162c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b-2 border-[#112240] pb-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter">
                TOURNAMENT <span className="text-[#d8392f]">SCHEDULE</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Boys Roadmap */}
            <div className="bg-[#112240] rounded-2xl p-6 border-t-4 border-blue-500 shadow-xl">
              <h3 className="font-black text-2xl uppercase italic tracking-wider mb-6">Boys Division</h3>
              <div className="space-y-4">
                {[
                  { phase: "Round of 16", matches: "8 Matches", teams: "16 Teams" },
                  { phase: "Quarter-Finals", matches: "4 Matches", teams: "8 Teams" },
                  { phase: "Semi-Finals", matches: "2 Matches", teams: "4 Teams" },
                  { phase: "Grand Final", matches: "1 Match", teams: "2 Teams" }
                ].map((step, i) => (
                  <div key={i} className="bg-[#0b162c] p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="font-bold uppercase tracking-wider">{step.phase}</h4>
                        <p className="text-sm text-slate-400">{step.teams}</p>
                      </div>
                    </div>
                    <div className="font-black text-blue-500 italic">{step.matches}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Girls Roadmap */}
            <div className="bg-[#112240] rounded-2xl p-6 border-t-4 border-[#d8392f] shadow-xl">
              <h3 className="font-black text-2xl uppercase italic tracking-wider mb-6">Girls Division</h3>
              <div className="space-y-4">
                {[
                  { phase: "Quarter-Finals", matches: "4 Matches", teams: "8 Teams" },
                  { phase: "Semi-Finals", matches: "2 Matches", teams: "4 Teams" },
                  { phase: "Grand Final", matches: "1 Match", teams: "2 Teams" }
                ].map((step, i) => (
                  <div key={i} className="bg-[#0b162c] p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:border-[#d8392f] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#d8392f] font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="font-bold uppercase tracking-wider">{step.phase}</h4>
                        <p className="text-sm text-slate-400">{step.teams}</p>
                      </div>
                    </div>
                    <div className="font-black text-[#d8392f] italic">{step.matches}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Price & Kit Inclusions Callout Card */}
          <div className="mt-8 bg-gradient-to-br from-[#0b162c] via-[#112240] to-[#0b162c] text-white rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 justify-between shadow-2xl border-2 border-[#d8392f] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8392f]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#d8392f] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                  Official Squad Entry
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> 24 Teams Only
                </span>
              </div>
              <h3 className="font-black text-3xl md:text-4xl uppercase italic tracking-tighter text-white">
                Team Registration Fee: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#fb923c]">₹4,999/-</span>
              </h3>
              <p className="font-medium text-slate-300 text-sm mt-1 max-w-xl">
                Fixed squad of 12 players (11 Playing XI + 1 Extra) • Sector 16 Stadium, Chandigarh • 5-Day Event
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>12x Official Custom Jersey Kits (Jersey + Trouser)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Regulation White Leather Match Balls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Match Refreshments & BCCI Grade Umpires</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="/registration"
                className="px-8 py-4 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white font-black italic text-lg uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_25px_rgba(239,68,68,0.5)] hover:shadow-[0_10px_35px_rgba(239,68,68,0.7)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 border-b-4 border-[#7f1d1d]"
              >
                <span>REGISTER TEAM NOW</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <span className="text-[11px] text-center text-slate-400 font-medium">
                Instant Online Easebuzz Checkout
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Grid (IPL Franchise Style) */}
      <section id="teams" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8 border-b-2 border-[#112240] pb-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#0b162c] tracking-tighter">
                TOURNAMENT <span className="text-[#d8392f]">TEAMS</span>
              </h2>
            </div>
            <a href="/registration" className="hidden md:flex items-center gap-1 font-bold text-[#d8392f] hover:text-[#b91c1c] uppercase tracking-wider text-sm">
              Register Yours <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
            <button
              onClick={() => setActiveTab('boys')}
              className={`px-6 py-3 md:px-8 font-black italic uppercase tracking-wider md:text-lg rounded-xl transition-all border-b-4 ${activeTab === 'boys' ? 'bg-[#0b162c] text-white border-[#d8392f] shadow-lg scale-105' : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 shadow-sm'}`}
            >
              Boys Division (16)
            </button>
            <button
              onClick={() => setActiveTab('girls')}
              className={`px-6 py-3 md:px-8 font-black italic uppercase tracking-wider md:text-lg rounded-xl transition-all border-b-4 ${activeTab === 'girls' ? 'bg-[#0b162c] text-white border-[#d8392f] shadow-lg scale-105' : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 shadow-sm'}`}
            >
              Girls Division (8)
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in" key={activeTab}>
            {(activeTab === 'boys' ? boysTeams : girlsTeams).map((team, i) => {
              const slug = team.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={team}
                  href={`/teams/${slug}`}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all aspect-[4/3] block"
                >
                  {/* Team Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${teamColors[i % teamColors.length]} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Slanted accent */}
                  <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-white/10 transform -skew-x-[25deg] translate-x-1/2 group-hover:translate-x-[40%] transition-transform duration-500"></div>

                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 group-hover:text-white group-hover:border-white/30 transition-all">
                        View Heritage & Squad →
                      </span>
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg md:text-2xl leading-none italic uppercase drop-shadow-md">{team.split(' ')[0]}</h3>
                      <h3 className="font-black text-white/80 text-xl md:text-3xl leading-none italic uppercase drop-shadow-md">{team.split(' ')[1]}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules & Features Block (IPL format styling) */}
      <section id="rules" className="py-16 bg-[#0b162c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">

            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white tracking-tighter mb-6">
                TOURNAMENT<br />
                <span className="text-[#d8392f]">REGULATIONS</span>
              </h2>
              <p className="text-slate-400 mb-8 font-medium">Standard T10 rules apply. Action-packed, fast-paced matches designed for pure entertainment and skill.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">3 Over Powerplay</h4>
                    <p className="text-slate-400 text-sm">Overs 1 to 3 with standard limited-overs fielding circle restrictions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Bowler Quota</h4>
                    <p className="text-slate-400 text-sm">Max 2 overs per bowler. Minimum 5 bowlers must be utilized.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">DRS & Super Over</h4>
                    <p className="text-slate-400 text-sm">1 Review/innings (retained if successful). Super Over for ties; DLS for rain.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">1 Hour Reporting</h4>
                    <p className="text-slate-400 text-sm">Teams must report 1 hour prior. Toss 15m before match. Strict scratching policy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Kit & Equipment</h4>
                    <p className="text-slate-400 text-sm">Official playing apparel (jersey & trousers) provided by committee. Teams bring personal gear.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Entry Fee: ₹4,999</h4>
                    <p className="text-slate-400 text-sm">Squad of 12 players. Includes 12x official jersey kits, match balls & refreshments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative border-t-8 border-[#d8392f]">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Medal className="w-48 h-48" />
                </div>
                <div className="p-8 md:p-12 relative z-10">
                  <h3 className="text-3xl font-black uppercase italic text-[#0b162c] mb-8">Prize Structure</h3>

                  <div className="grid gap-6">
                    <div className="flex items-center gap-6 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                      <div className="text-4xl md:text-5xl text-[#d8392f] font-black italic">1ST</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Winner</h4>
                        <p className="text-slate-500 font-medium">Trophy + ₹51,000 Cash Prize</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                      <div className="text-4xl md:text-5xl text-slate-400 font-black italic">2ND</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Runner Up</h4>
                        <p className="text-slate-500 font-medium">Trophy + ₹31,000 Cash Prize</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <div className="text-orange-500 font-black uppercase italic text-sm mb-1">Orange Cap</div>
                        <h4 className="font-bold text-slate-900">Best Batter</h4>
                        <p className="text-slate-600 text-sm font-medium">₹2,100</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="text-purple-500 font-black uppercase italic text-sm mb-1">Purple Cap</div>
                        <h4 className="font-bold text-slate-900">Best Bowler</h4>
                        <p className="text-slate-600 text-sm font-medium">₹2,100</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 bg-amber-50 p-4 md:p-6 rounded-xl border border-amber-200">
                      <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                        <Trophy className="w-7 h-7 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-amber-500 font-black uppercase italic text-xs tracking-widest mb-0.5">Every Match</div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Man of the Match</h4>
                        <p className="text-slate-500 font-medium">Official Trophy awarded after each match</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Organizing Committee Section */}
      <section id="organizers" className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b-2 border-slate-100 pb-4">
            <div>
              <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="text-[#d8392f] font-black uppercase text-xs tracking-widest block mb-1 hover:underline">Sarv Sewa Sashktikaran Sangthan</a>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#0b162c]">
                ORGANIZING <span className="text-[#d8392f]">COMMITTEE</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {organizers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#d8392f] hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="bg-[#d8392f] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md line-clamp-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-black uppercase italic tracking-wide text-[#0b162c] group-hover:text-[#d8392f] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#d8392f] font-bold text-[10px] uppercase tracking-wider mt-0.5 leading-tight">
                    {member.designation}
                  </p>
                  <p className="text-slate-400 text-[10px] font-medium mt-0.5 leading-tight">
                    {member.organization}
                  </p>
                  <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-[#d8392f] transition-colors mt-1.5 font-bold">
                    <Phone className="w-3 h-3 text-[#d8392f]" /> {member.phone}
                  </a>
                  <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                    <a href="tel:+919056333759" className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#d8392f] transition-colors font-semibold">
                      <Phone className="w-2.5 h-2.5 text-[#d8392f] shrink-0" />
                      <span>90563 33759</span>
                    </a>
                    <a href="mailto:helposcricketcup@gmail.com" className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#d8392f] transition-colors font-semibold break-all">
                      <Mail className="w-2.5 h-2.5 text-[#d8392f] shrink-0" />
                      <span className="break-all">helposcricketcup@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Upcoming Members Slot */}
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-4 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-1">More Members</h4>
              <p className="text-slate-400 text-[10px]">Coming soon</p>
            </div>
          </div>
        </div>
      </section>


      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
