import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { teamsData, allTeamSlugs, TeamDetail } from '@/data/teamsData';
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
  Award
} from 'lucide-react';

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

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;
  const team: TeamDetail | undefined = teamsData[slug];

  if (!team) {
    notFound();
  }

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
        <section className="bg-white border-b border-slate-200 py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="max-w-3xl">
                {/* Division & River Badges */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    team.division === 'boys' 
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
                </div>

                {/* Team Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight text-[#0b162c] uppercase leading-none mb-3">
                  {team.name}
                </h1>

                {/* Tagline */}
                <p className="text-base sm:text-lg md:text-xl font-medium text-slate-600 italic">
                  &ldquo;{team.tagline}&rdquo;
                </p>
              </div>

              {/* Quick Hero CTA */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/registration"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Register This Team
                </Link>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ================= LEFT COLUMN: RIVER HERITAGE & CULTURE (8 COLS) ================= */}
              <div className="lg:col-span-8 space-y-6">
                
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

              {/* ================= RIGHT COLUMN: SQUAD SIDEBAR WIDGET (4 COLS) ================= */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                
                {/* Squad Sidebar Box */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  
                  {/* Sidebar Header */}
                  <div className="bg-[#0b162c] text-white p-5 border-b-2 border-[#d8392f]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
                        <Shirt className="w-3.5 h-3.5 text-[#d8392f]" />
                        Official Squad
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Clock className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white">
                      {team.name} Roster
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      12 certified slots allocated for this river team.
                    </p>
                  </div>

                  {/* Announcement Banner inside Sidebar */}
                  <div className="p-4 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-900 leading-relaxed">
                    <p className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      Names Revealed Post-Registration
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Official player names and assigned jersey numbers (#01 to #12) will be published here once registration and player verification complete.
                    </p>
                  </div>

                  {/* 12-Slot Compact Roster List */}
                  <div className="p-4 divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                    {team.squad.map((player) => {
                      const isCaptain = player.role.toLowerCase().includes('captain') && !player.role.toLowerCase().includes('vice');
                      const isViceCaptain = player.role.toLowerCase().includes('vice captain');

                      return (
                        <div key={player.number} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Jersey Badge */}
                            <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-black text-[11px] flex items-center justify-center shrink-0">
                              #{player.jerseyNumber}
                            </span>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate text-[11px] leading-tight">
                                {player.name || "Slot Reserved"}
                              </p>
                              <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                                {player.role}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            {isCaptain ? (
                              <span className="inline-block bg-[#d8392f] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                Captain
                              </span>
                            ) : isViceCaptain ? (
                              <span className="inline-block bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                Vice Cap
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                TBA
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar Registration Action Box */}
                  <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Registration Fee</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#0b162c]">₹4,999/-</span>
                        <span className="text-[10px] text-emerald-600 font-bold block">Includes 12 Custom Kits</span>
                      </div>
                    </div>

                    <Link
                      href="/registration"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Register This Team Now
                    </Link>

                    <p className="text-[10px] text-slate-400 text-center">
                      Auto-locked once payment succeeds.
                    </p>
                  </div>

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
