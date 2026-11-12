import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamSquadSection from '@/components/TeamSquadSection';
import { teamsData, allTeamSlugs, TeamDetail, teamLogos } from '@/data/teamsData';
import {
  Shield,
  MapPin,
  Droplets,
  Compass,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Flag,
  Clock,
  Shirt,
  Phone,
  CheckCircle2,
  Calendar,
  Award,
  Lock,
  Ticket
} from 'lucide-react';

interface TeamMatchSchedule {
  matchNo: number;
  dayText: string;
  dateText: string;
  time: string;
  stage: string;
  opponentSlug: string;
  opponentName: string;
}

const BOYS_SCHEDULE_LOOKUP: Record<string, TeamMatchSchedule> = {
  // Day 1: Sunday, 15 Nov 2026
  "jhelum-jaguars": {
    matchNo: 1,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "09:00 AM",
    stage: "Round of 16 • Match 1",
    opponentSlug: "ghaggar-champions",
    opponentName: "Ghaggar Champions",
  },
  "ghaggar-champions": {
    matchNo: 1,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "09:00 AM",
    stage: "Round of 16 • Match 1",
    opponentSlug: "jhelum-jaguars",
    opponentName: "Jhelum Jaguars",
  },
  "sindhu-spartans": {
    matchNo: 2,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "11:00 AM",
    stage: "Round of 16 • Match 2",
    opponentSlug: "tapti-tigers",
    opponentName: "Tapti Tigers",
  },
  "tapti-tigers": {
    matchNo: 2,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "11:00 AM",
    stage: "Round of 16 • Match 2",
    opponentSlug: "sindhu-spartans",
    opponentName: "Sindhu Spartans",
  },
  "beas-blasters": {
    matchNo: 3,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "01:00 PM",
    stage: "Round of 16 • Match 3",
    opponentSlug: "kaveri-warriors",
    opponentName: "Kaveri Warriors",
  },
  "kaveri-warriors": {
    matchNo: 3,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "01:00 PM",
    stage: "Round of 16 • Match 3",
    opponentSlug: "beas-blasters",
    opponentName: "Beas Blasters",
  },
  "krishna-kings": {
    matchNo: 4,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "03:00 PM",
    stage: "Round of 16 • Match 4",
    opponentSlug: "satluj-soorme",
    opponentName: "Satluj Soorme",
  },
  "satluj-soorme": {
    matchNo: 4,
    dayText: "Day 1",
    dateText: "Sunday, 15 Nov 2026",
    time: "03:00 PM",
    stage: "Round of 16 • Match 4",
    opponentSlug: "krishna-kings",
    opponentName: "Krishna Kings",
  },

  // Day 2: Monday, 16 Nov 2026
  "brahmaputra-bulls": {
    matchNo: 5,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "09:00 AM",
    stage: "Round of 16 • Match 5",
    opponentSlug: "ganga-giants",
    opponentName: "Ganga Giants",
  },
  "ganga-giants": {
    matchNo: 5,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "09:00 AM",
    stage: "Round of 16 • Match 5",
    opponentSlug: "brahmaputra-bulls",
    opponentName: "Brahmaputra Bulls",
  },
  "narmada-titans": {
    matchNo: 6,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "11:00 AM",
    stage: "Round of 16 • Match 6",
    opponentSlug: "yamuna-yodhas",
    opponentName: "Yamuna Yodhas",
  },
  "yamuna-yodhas": {
    matchNo: 6,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "11:00 AM",
    stage: "Round of 16 • Match 6",
    opponentSlug: "narmada-titans",
    opponentName: "Narmada Titans",
  },
  "godavari-knights": {
    matchNo: 7,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "01:00 PM",
    stage: "Round of 16 • Match 7",
    opponentSlug: "ravi-rangers",
    opponentName: "Ravi Rangers",
  },
  "ravi-rangers": {
    matchNo: 7,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "01:00 PM",
    stage: "Round of 16 • Match 7",
    opponentSlug: "godavari-knights",
    opponentName: "Godavari Knights",
  },
  "mahanadi-masters": {
    matchNo: 8,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "03:00 PM",
    stage: "Round of 16 • Match 8",
    opponentSlug: "chenab-challengers",
    opponentName: "Chenab Challengers",
  },
  "chenab-challengers": {
    matchNo: 8,
    dayText: "Day 2",
    dateText: "Monday, 16 Nov 2026",
    time: "03:00 PM",
    stage: "Round of 16 • Match 8",
    opponentSlug: "mahanadi-masters",
    opponentName: "Mahanadi Masters",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allTeamSlugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const team = teamsData[slug];

  if (!team) {
    return {
      title: 'Team Not Found | Operation Sindoor Cricket Cup 2.0',
    };
  }

  return {
    title: `${team.name} | ${team.river} • Operation Sindoor Cricket Cup 2.0`,
    description: `${team.tagline}. Cultural heritage of ${team.river} and official squad roster for Operation Sindoor Cricket Cup 2.0.`,
  };
}

async function getTeamSquad(slug: string) {
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
  const baseApiUrl = rawApiUrl.replace(/\/+$/, '');

  try {
    const res = await fetch(`${baseApiUrl}/tournament/team/${slug}/squad`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.status === 'success' && json?.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Could not pre-fetch squad from live API:', err);
  }
  return null;
}

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;
  const team: TeamDetail | undefined = teamsData[slug];

  if (!team) {
    notFound();
  }

  const squadData = await getTeamSquad(slug);
  const isRegistered = true; // All 24 tournament teams are officially confirmed
  const teamSchedule = BOYS_SCHEDULE_LOOKUP[slug] || null;
  const opponentLogo = teamSchedule ? teamLogos[teamSchedule.opponentSlug] : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-[#d8392f] selection:text-white">
      {/* Shared Header */}
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 flex items-center gap-2 text-xs md:text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#teams" className="hover:text-slate-900 transition-colors">
            Teams
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#d8392f] font-bold">{team.name}</span>
        </div>
      </div>

      <main className="flex-1 pb-16">
        {/* ================= HERO SECTION (LIGHT & FLAT) ================= */}
        <section className="bg-white border-b border-slate-200 py-8 md:py-10">
          <div className="container mx-auto px-4">
            {/* Official Tournament Presenters: Powered By & Co-Powered By */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 bg-gradient-to-r from-black/85 via-black/75 to-black/65 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-white/20 w-fit shadow-md">
              {/* Powered By: Nik Baker's (Prominent & Larger) */}
              <div className="flex items-center gap-2.5 pl-1.5">
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-400">
                  POWERED BY:
                </span>
                <a
                  href="https://www.nikbakers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-3.5 sm:px-4 bg-white hover:bg-slate-50 rounded-xl border-2 border-amber-400/60 shadow-lg flex items-center gap-2.5 hover:scale-105 transition-all group"
                  title="Nik Baker's — Main Sponsor / Official Powered By Sponsor"
                >
                  <Image
                    src="/sponsors/nik-bakers.png"
                    alt="Nik Baker's Logo"
                    width={90}
                    height={60}
                    className="max-h-8 sm:max-h-9 w-auto object-contain"
                  />
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-none group-hover:text-[#d8392f] transition-colors">
                    Nik Baker&apos;s
                  </span>
                </a>
              </div>

              <span className="text-white/30 hidden sm:inline">•</span>

              {/* Co-Powered By: Blank / Inviting Sponsor (Compact) */}
              <div className="flex items-center gap-2 pl-1.5 sm:pl-0">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-300">
                  CO-POWERED BY:
                </span>
                <Link
                  href="/#sponsorship"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                  title="Inviting Co-Powered By Sponsor — Apply Now"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>Inviting Sponsor</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-3xl">
                {/* Official Team Logo */}
                {team.logo && (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-3xl bg-slate-50 border-2 border-slate-200 p-2.5 shadow-md flex items-center justify-center shrink-0">
                    <Image
                      src={team.logo}
                      alt={`${team.name} Logo`}
                      width={140}
                      height={140}
                      priority
                      className="w-full h-full object-contain drop-shadow"
                    />
                  </div>
                )}

                <div>
                  {/* Division & River Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${team.division === 'boys'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                      <Shield className="w-3.5 h-3.5" />
                      {team.division === 'boys' ? 'Boys Division (16 Teams)' : 'Girls Division (8 Teams)'}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                      {team.river}
                    </span>

                    {isRegistered && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Squad Locked
                      </span>
                    )}
                  </div>

                  {/* Team Heading */}
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tight text-[#0b162c] uppercase leading-tight mb-2 sm:mb-3">
                    {team.name}
                  </h1>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 italic">
                    &ldquo;{team.tagline}&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Hero CTA */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#team-schedule"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  View Match Schedule
                </a>
                <Link
                  href="/#teams"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-slate-200 transition-colors"
                >
                  All 24 Teams
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ================= 2-COLUMN MAIN CONTENT & SQUAD SIDEBAR ================= */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">

              {/* ================= LEFT COLUMN: RIVER HERITAGE & CULTURE (6 COLS OF 10) ================= */}
              <div className="lg:col-span-6 space-y-6">

                {/* Main Cultural Feature Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 md:p-10 shadow-xs">

                  {/* Article Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-red-50 text-[#d8392f] border border-red-100 rounded-xl">
                        <Droplets className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-widest text-[#d8392f] uppercase block">
                          River Heritage & Indian Culture
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0b162c] tracking-tight">
                          {team.culturalTitle}
                        </h2>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                      {team.riverAncientName}
                    </div>
                  </div>

                  {/* 2 Focused Cultural Paragraphs */}
                  <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                    {/* Paragraph 1: Sacred Origin and Cultural Roots */}
                    <div className="pl-4 sm:pl-5 border-l-4 border-cyan-500">
                      <p>
                        {team.historyParagraph1}
                      </p>
                    </div>

                    {/* Paragraph 2: Historical Valor and Tournament Connection */}
                    <div className="pl-4 sm:pl-5 border-l-4 border-[#d8392f]">
                      <p>
                        {team.historyParagraph2}
                      </p>
                    </div>
                  </div>

                  {/* ================= HINDI RIVER HERITAGE HIGHLIGHT ================= */}
                  {team.riverHindi && (
                    <div className="mt-8 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-red-50/40 border-2 border-amber-200/90 shadow-2xs relative">
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5 pb-3 border-b border-amber-200/70">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 bg-gradient-to-br from-[#d8392f] to-amber-600 text-white rounded-xl shadow-xs">
                            <Droplets className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#d8392f] block">
                              विशेष सांस्कृतिक गौरव गाथा • River Heritage
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                              {team.riverHindi.riverNameHindi}
                            </h3>
                          </div>
                        </div>

                      </div>

                      {team.riverHindi.taglineHindi && (
                        <p className="text-xs sm:text-sm font-bold text-[#b91c1c] italic mb-2.5">
                          &ldquo;{team.riverHindi.taglineHindi}&rdquo;
                        </p>
                      )}

                      <p className="text-slate-800 text-base sm:text-[17px] leading-relaxed pl-4 border-l-4 border-[#d8392f] bg-white/80 p-3.5 rounded-r-xl font-normal shadow-2xs">
                        {team.riverHindi.summaryHindi}
                      </p>

                      {(team.riverHindi.originHindi || team.riverHindi.lengthHindi) && (
                        <div className="mt-3.5 pt-3 border-t border-amber-200/60 flex flex-wrap items-center gap-2 text-xs">
                          {team.riverHindi.originHindi && (
                            <span className="inline-flex items-center gap-1.5 bg-white border border-amber-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium shadow-2xs">
                              <strong className="text-amber-800 font-bold">उद्गम:</strong> {team.riverHindi.originHindi}
                            </span>
                          )}
                          {team.riverHindi.lengthHindi && (
                            <span className="inline-flex items-center gap-1.5 bg-white border border-amber-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium shadow-2xs">
                              <strong className="text-amber-800 font-bold">प्रवाह/लंबाई:</strong> {team.riverHindi.lengthHindi}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 ml-auto">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            {team.name}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* River Factsheet Strip */}
                  <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                      <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                          Sacred Origin
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 block">
                          {team.originLocation}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                          Basin & Flowing States
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {team.flowingStates.map((st) => (
                            <span key={st} className="inline-block bg-white border border-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Armed Forces Tribute Callout */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs sm:text-sm text-slate-500">
                    <Flag className="w-4 h-4 text-[#d8392f] shrink-0" />
                    <span>
                      Operation Sindoor Cricket Cup 2.0 pays tribute to the armed forces guarding India&apos;s sacred river frontiers.
                    </span>
                  </div>

                </div>

                {/* Tournament Regulations & Pitch Info Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                  <h3 className="font-black uppercase text-[#0b162c] text-base sm:text-lg mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#d8392f]" />
                    Match Protocol & Venue
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <span className="text-slate-500 font-bold uppercase block text-[10px]">Format</span>
                      <span className="font-bold text-slate-800 text-sm mt-0.5 block">Official T10 Matches</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <span className="text-slate-500 font-bold uppercase block text-[10px]">Venue</span>
                      <span className="font-bold text-slate-800 text-sm mt-0.5 block">Sector 16 Stadium, Chd</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <span className="text-slate-500 font-bold uppercase block text-[10px]">Official Gear</span>
                      <span className="font-bold text-slate-800 text-sm mt-0.5 block">12 Custom Jersey Kits</span>
                    </div>
                  </div>
                </div>

                {/* Back Link */}
                <div className="pt-2">
                  <Link
                    href="/#teams"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#d8392f] transition-colors uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to All 24 River Teams
                  </Link>
                </div>

              </div>

              {/* ================= RIGHT COLUMN: TEAM SCHEDULE WIDGET (4 COLS) ================= */}
              <div id="team-schedule" className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 scroll-mt-24">

                {/* Team Match Schedule Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#0b162c] via-[#112240] to-[#0b162c] text-white p-5 border-b-2 border-sky-400 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 text-sky-300">
                        <Calendar className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-sky-400 block">
                          Match Schedule
                        </span>
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white truncate">
                          {team.name}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded">
                      T10 Knockout
                    </span>
                  </div>

                  {/* Scheduled Match Body */}
                  <div className="p-5 space-y-4">
                    {teamSchedule ? (
                      /* Boys Team Scheduled Fixture */
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                          <div>
                            <span className="inline-block bg-[#d8392f] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                              Match {teamSchedule.matchNo}
                            </span>
                            <span className="text-xs font-bold text-slate-800 ml-2">
                              {teamSchedule.stage}
                            </span>
                          </div>
                          <span className="text-xs font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            {teamSchedule.time} IST
                          </span>
                        </div>

                        {/* Date Banner */}
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-4 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">
                            {teamSchedule.dateText}
                          </span>
                          <span className="text-[11px] font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                            {teamSchedule.dayText}
                          </span>
                        </div>

                        {/* Head-to-Head Clash Card */}
                        <div className="bg-gradient-to-br from-[#0c1830] via-[#132546] to-[#091122] rounded-2xl p-4 text-white border border-sky-500/30 shadow-md">
                          <div className="grid grid-cols-11 items-center gap-2">
                            {/* This Team */}
                            <div className="col-span-5 flex flex-col items-center text-center">
                              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md border border-white/40 flex items-center justify-center mb-1.5">
                                {team.logo ? (
                                  <Image
                                    src={team.logo}
                                    alt={team.name}
                                    width={48}
                                    height={48}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                ) : (
                                  <Shield className="w-6 h-6 text-slate-500" />
                                )}
                              </div>
                              <span className="font-black text-xs uppercase italic tracking-tight text-white leading-tight line-clamp-1">
                                {team.name}
                              </span>
                              <span className="text-[10px] text-sky-300 font-semibold truncate mt-0.5">
                                {team.river}
                              </span>
                            </div>

                            {/* Center VS */}
                            <div className="col-span-1 flex flex-col items-center justify-center">
                              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d8392f] to-[#b91c1c] text-white font-black italic text-xs flex items-center justify-center shadow-md border border-red-400">
                                VS
                              </span>
                              <span className="text-[8px] uppercase font-bold text-sky-400 mt-1">
                                T10
                              </span>
                            </div>

                            {/* Opponent Team */}
                            <Link
                              href={`/teams/${teamSchedule.opponentSlug}`}
                              className="col-span-5 flex flex-col items-center text-center group hover:opacity-90 transition-opacity"
                            >
                              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md border border-white/40 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                                {opponentLogo ? (
                                  <Image
                                    src={opponentLogo}
                                    alt={teamSchedule.opponentName}
                                    width={48}
                                    height={48}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                ) : (
                                  <Shield className="w-6 h-6 text-slate-500" />
                                )}
                              </div>
                              <span className="font-black text-xs uppercase italic tracking-tight text-white group-hover:text-sky-300 transition-colors leading-tight line-clamp-1">
                                {teamSchedule.opponentName}
                              </span>
                              <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-semibold truncate mt-0.5">
                                Opponent Squad &rarr;
                              </span>
                            </Link>
                          </div>
                        </div>

                        {/* Venue & Details */}
                        <div className="mt-4 space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span className="font-semibold text-slate-800">
                              Sector 16 Cricket Stadium, Chandigarh
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>
                              Match starts at <strong className="text-slate-900 font-bold">{teamSchedule.time} IST</strong> (Gate entry 1 hr prior)
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Girls Division / TBD Fixture */
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-[#1c0c14] to-[#2e101f] text-white p-4 rounded-2xl border border-rose-500/30">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="bg-[#d8392f] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                              Girls Division
                            </span>
                            <span className="text-xs font-bold text-rose-300">
                              Quarter-Finals
                            </span>
                          </div>
                          <h4 className="font-black text-base text-white uppercase italic">
                            Women&apos;s Championship Bracket
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Official match timings and draw fixtures for the Girls Division will be announced following the tournament technical briefing at Sector 16 Stadium, Chandigarh.
                          </p>
                        </div>

                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                          <div className="flex items-center gap-2 font-semibold text-slate-800">
                            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>Sector 16 Cricket Stadium, Chandigarh</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>8 Teams • 7 Knockout Matches</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Spectator Match Pass Action */}
                    <div className="pt-2">
                      <Link
                        href="/passes"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                      >
                        <Ticket className="w-4 h-4 text-slate-950" />
                        <span>Claim Free Match Pass for this Match</span>
                      </Link>
                    </div>

                    {/* View Full Tournament Schedule Link */}
                    <div className="text-center pt-1">
                      <Link
                        href="/#schedule"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors uppercase tracking-wider"
                      >
                        <span>View All Tournament Fixtures</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hidden Official Squad Section - DO NOT REMOVE */}
                <div className="hidden" aria-hidden="true">
                  <TeamSquadSection
                    slug={team.slug}
                    teamName={team.name}
                    teamLogo={team.logo}
                    fallbackSquad={team.squad}
                    initialData={squadData}
                    division={team.division}
                  />
                </div>

                {/* Tournament Coordinator Helpdesk Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-2">
                  <p className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
                    Questions or Assistance?
                  </p>
                  <p className="text-slate-500 leading-relaxed text-[11px]">
                    Contact our tournament helpdesk directly:
                  </p>
                  <div className="pt-1 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                      <Phone className="w-3.5 h-3.5 text-[#d8392f]" />
                      <span>Official Helpline: </span>
                      <a href="tel:+919056333759" className="text-[#d8392f] hover:underline font-black">
                        +91 90563 33759
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                      <span className="text-slate-400">Email:</span>
                      <a href="mailto:helposcricketcup@gmail.com" className="text-slate-700 hover:text-[#d8392f] hover:underline">
                        helposcricketcup@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer (Same Across All Pages) */}
      <Footer />
    </div>
  );
}
