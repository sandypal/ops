"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Upload, 
  Users, 
  Shield, 
  User, 
  Droplet, 
  Calendar, 
  Ruler, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Trophy,
  ChevronLeft,
  ChevronRight,
  Phone,
  Check,
  Layers,
  Sparkles,
  Loader2,
  Mail,
  FileCheck
} from 'lucide-react';

// Fallback teams if backend API is initializing
const defaultBoysTeams = [
  "Sindhu Spartans", "Satluj Soorme", "Beas Blasters", "Brahmaputra Bulls",
  "Mahanadi Masters", "Ravi Rangers", "Chenab Challengers", "Jhelum Jaguars",
  "Yamuna Yodhas", "Kaveri Warriors", "Ghaggar Champions", "Ganga Giants",
  "Narmada Titans", "Tapti Tigers", "Godavari Knights", "Krishna Kings"
];

const defaultGirlsTeams = [
  "Sindhu Sherniyan", "Saraswati Strikers", "Satluj Sena", "Yamuna Panthers",
  "Sabarmati Sunrisers", "Kaveri Queens", "Ravi Royals", "Ganga Glory"
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const sizes = ["S", "M", "L", "XL", "XXL"];

interface TeamItem {
  id: number;
  name: string;
  slug: string;
  division: 'boys' | 'girls';
  status: 'available' | 'registered' | 'reserved';
}

interface PlayerData {
  name: string;
  jerseyNumber: string;
  phone: string;
  age: string;
  bloodGroup: string;
  tshirtSize: string;
  lowerSize: string;
  studentIdFile: File | null;
  studentIdFileName?: string;
}

const initialPlayer = (): PlayerData => ({
  name: '',
  jerseyNumber: '',
  phone: '',
  age: '',
  bloodGroup: '',
  tshirtSize: '',
  lowerSize: '',
  studentIdFile: null,
  studentIdFileName: '',
});

export default function RegistrationPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [activePlayer, setActivePlayer] = useState(0); // 0 to 11
  const [viewMode, setViewMode] = useState<'step' | 'all'>('step');
  const [agreed, setAgreed] = useState(false);

  const [captainIndex, setCaptainIndex] = useState(0);
  const [viceCaptainIndex, setViceCaptainIndex] = useState(1);
  const [captainEmail, setCaptainEmail] = useState("");

  const [players, setPlayers] = useState<PlayerData[]>(() => 
    Array.from({ length: 12 }, () => initialPlayer())
  );

  // Teams fetched from separate database API
  const [dbBoysTeams, setDbBoysTeams] = useState<TeamItem[]>([]);
  const [dbGirlsTeams, setDbGirlsTeams] = useState<TeamItem[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch teams from database API
  useEffect(() => {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
    const baseApiUrl = rawApiUrl.replace(/\/+$/, '');
    fetch(`${baseApiUrl}/tournament/teams`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data) {
          setDbBoysTeams(res.data.boys || []);
          setDbGirlsTeams(res.data.girls || []);
        }
      })
      .catch(err => {
        console.warn('Could not fetch teams from API, using default list:', err);
      })
      .finally(() => {
        setIsLoadingTeams(false);
      });
  }, []);

  const updatePlayer = (index: number, field: keyof PlayerData, value: any) => {
    setPlayers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleFileUpload = (index: number, file: File | null) => {
    if (!file) return;
    updatePlayer(index, 'studentIdFile', file);
    updatePlayer(index, 'studentIdFileName', file.name);
  };

  const filledCount = players.filter(p => p.name.trim() !== '' && p.jerseyNumber.trim() !== '').length;

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamName = e.target.value;
    const foundTeam = [...dbBoysTeams, ...dbGirlsTeams].find(t => t.name === teamName);

    if (foundTeam && (foundTeam.status === 'registered' || (foundTeam as any).is_registered)) {
      setSelectedTeam("");
      setSelectedTeamId(null);
      setErrorMessage(`The team "${teamName}" has already completed payment & registration. It is no longer available. Please select another team.`);
      return;
    }

    setSelectedTeam(teamName);
    if (foundTeam) {
      setSelectedTeamId(foundTeam.id);
    } else {
      setSelectedTeamId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedTeam) {
      setErrorMessage("Please select your team.");
      return;
    }

    const currentTeam = [...dbBoysTeams, ...dbGirlsTeams].find(t => t.name === selectedTeam);
    if (currentTeam && (currentTeam.status === 'registered' || (currentTeam as any).is_registered)) {
      setErrorMessage(`The team "${selectedTeam}" has already completed payment & registration. Please choose an available team.`);
      return;
    }

    if (!agreed) {
      setErrorMessage("Please accept the tournament playing conditions and fee terms.");
      return;
    }

    // Validation: check players
    for (let i = 0; i < 12; i++) {
      if (!players[i].name.trim()) {
        setActivePlayer(i);
        setErrorMessage(`Please enter Full Name for Player #${i + 1}`);
        return;
      }
      if (!players[i].tshirtSize) {
        setActivePlayer(i);
        setErrorMessage(`Please select T-Shirt Kit Size for Player #${i + 1} (${players[i].name})`);
        return;
      }
      if (!players[i].lowerSize) {
        setActivePlayer(i);
        setErrorMessage(`Please select Lower Kit Size for Player #${i + 1} (${players[i].name})`);
        return;
      }
    }

    const captain = players[captainIndex];
    if (!captain.phone) {
      setActivePlayer(captainIndex);
      setErrorMessage(`Please provide a mobile contact number for Team Captain (${captain.name}).`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Determine division
      let division = 'boys';
      const foundInGirls = dbGirlsTeams.some(t => t.name === selectedTeam) || defaultGirlsTeams.includes(selectedTeam);
      if (foundInGirls) division = 'girls';

      const formData = new FormData();
      if (selectedTeamId) formData.append('team_id', String(selectedTeamId));
      formData.append('team_name', selectedTeam);
      formData.append('division', division);
      formData.append('captain_name', captain.name);
      formData.append('captain_phone', captain.phone);
      if (captainEmail) formData.append('captain_email', captainEmail);
      formData.append('vice_captain_name', players[viceCaptainIndex]?.name || '');

      // Format players data payload
      const formattedPlayers = players.map((p, idx) => ({
        name: p.name,
        jersey_number: p.jerseyNumber,
        phone: p.phone,
        age: p.age,
        blood_group: p.bloodGroup,
        tshirt_size: p.tshirtSize,
        lower_size: p.lowerSize,
        is_captain: idx === captainIndex,
        is_vice_captain: idx === viceCaptainIndex,
      }));

      formData.append('players', JSON.stringify(formattedPlayers));

      // Append student ID files
      players.forEach((p, idx) => {
        if (p.studentIdFile) {
          formData.append(`player_file_${idx}`, p.studentIdFile);
        }
      });

      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
      const baseApiUrl = rawApiUrl.replace(/\/+$/, '');
      const response = await fetch(`${baseApiUrl}/tournament/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success' && data.payment_url) {
        // Redirect to Easebuzz checkout
        window.location.href = data.payment_url;
      } else {
        setIsSubmitting(false);
        setErrorMessage(data.message || data.details?.error_desc || 'Payment initiation failed. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Could not connect to registration server. Please check your internet connection.');
    }
  };

  const isSelectedGirls = dbGirlsTeams.some(t => t.name === selectedTeam) || defaultGirlsTeams.includes(selectedTeam);

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 selection:bg-[#d8392f] selection:text-white pb-20">
      {/* Shared Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 md:pt-10 max-w-7xl">
        
        {/* Page Heading */}
        <div className="mb-8">
          <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="text-[#d8392f] font-black uppercase text-xs tracking-widest block mb-1 hover:underline">
            Sarv Sewa Sashktikaran Sangthan Presents
          </a>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-[#0b162c] leading-tight">
                Official Team <span className="text-[#d8392f]">Registration</span>
              </h1>
              <p className="text-slate-600 text-sm md:text-base font-medium mt-1">
                Operation Sindoor Cricket Cup 2.0 • 5-Day Event • Sector 16 Stadium, Chandigarh
              </p>
            </div>

            {/* Quick Fee Badge */}
            <div className="bg-[#0b162c] text-white px-5 py-3 rounded-2xl border-l-4 border-[#d8392f] shadow-md flex items-center gap-4 self-start md:self-auto">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Entry Fee</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#fb923c] italic leading-none">
                  ₹4,999/-
                </span>
              </div>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded text-slate-300 font-semibold">12 Players • Jersey Kit Included</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Instructions & Fee (Sticky) ================= */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
            
            {/* Entry Fee Card */}
            <div className="bg-gradient-to-br from-[#0b162c] via-[#112240] to-[#0b162c] text-white p-6 rounded-3xl border-2 border-[#d8392f] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#d8392f]/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#d8392f] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    Official Squad Entry
                  </span>
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>

                <div className="mb-4">
                  <div className="text-3xl md:text-4xl font-black italic text-white tracking-tight">
                    ₹4,999<span className="text-lg text-slate-400 font-normal"> / team</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Squad of 12 players (11 Playing + 1 Extra) • Official Jersey Kit Included
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Official Tournament Jersey Kit (Jersey + Trouser) Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>White Leather Match Balls Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ground Refreshments Provided to All Players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Official BCCI-grade Certified Umpires & DRS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Tournament Guidelines Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#d8392f]" />
                  <h3 className="font-bold text-slate-900 text-base">Playing Conditions & Rules</h3>
                </div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                  7 Guidelines
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-xs">
                {/* 1. Match Format & Overs */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-[#d8392f]">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-[#d8392f] flex items-center justify-center text-xs font-black shrink-0">1</span>
                    Match Format & Overs
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li><strong className="text-slate-900 font-bold">Duration:</strong> Each match consists of 10 overs per side.</li>
                    <li><strong className="text-slate-900 font-bold">Ball Specifications:</strong> Matches played strictly with a regulation white leather cricket ball.</li>
                    <li><strong className="text-slate-900 font-bold">Powerplay:</strong> Mandatory 3-over powerplay (Overs 1 to 3). Standard limited-overs fielding circle restrictions apply.</li>
                    <li><strong className="text-slate-900 font-bold">Bowling Quota:</strong> Single bowler can bowl a maximum of 2 overs. Minimum of 5 different bowlers must be utilized.</li>
                  </ul>
                </div>

                {/* 2. Decision Reviews & Tie-Breaker */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-blue-700">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black shrink-0">2</span>
                    Decision Reviews & Tie-Breaker
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li><strong className="text-slate-900 font-bold">DRS / Review:</strong> 1 player review per innings. Retained if successful; forfeited if unsuccessful.</li>
                    <li><strong className="text-slate-900 font-bold">Tied Matches:</strong> Decided exclusively via a Super Over.</li>
                  </ul>
                </div>

                {/* 3. Weather & Rain Interruptions (DLS Method) */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-indigo-700">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0">3</span>
                    Weather & DLS Method
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li>Target scores revised strictly using official Duckworth-Lewis-Stern (DLS) method.</li>
                    <li>Minimum 5 overs per side required to constitute a valid match.</li>
                  </ul>
                </div>

                {/* 4. Reporting Time & Forfeiture */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-red-700">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-black shrink-0">4</span>
                    Reporting Time & Forfeiture
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li><strong className="text-slate-900 font-bold">Mandatory Reporting:</strong> Teams must report strictly 1 hour before scheduled match toss.</li>
                    <li><strong className="text-slate-900 font-bold">Walkover:</strong> Failure to report on time gives opponent a walkover.</li>
                  </ul>
                </div>

                {/* 5. Squad Registration & Rosters */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-amber-700">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black shrink-0">5</span>
                    Squad Registration & Rosters
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li>Only officially registered 12 players permitted to participate.</li>
                    <li>No outside guest players allowed under any circumstances.</li>
                  </ul>
                </div>

                {/* 6. Team Kit & Equipment */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-emerald-700">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">6</span>
                    Team Kit & Cricket Equipment
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li>Organizing committee provides custom jerseys and trousers to all teams.</li>
                    <li>Teams bring their own cricket bats and protective pads/gloves/helmets.</li>
                  </ul>
                </div>

                {/* 7. Authority of Umpires & Committee */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5 font-black text-slate-900 text-sm uppercase mb-2 text-rose-700">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black shrink-0">7</span>
                    Authority of Umpires & Committee
                  </div>
                  <ul className="space-y-1.5 pl-6 list-disc text-slate-700 font-medium text-xs md:text-[13px] leading-relaxed">
                    <li>Umpire on-field decisions are final and binding.</li>
                    <li>Organizing Committee decisions are final on all rules and disputes.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Official Helpline Card */}
            <div className="bg-[#112240] text-white p-5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase font-black text-[#d8392f] block tracking-wider">Official Helpline</span>
                <a href="tel:+919056333759" className="font-black text-base text-white block hover:text-[#d8392f] transition-colors">+91 90563 33759</a>
                <a href="mailto:helposcricketcup@gmail.com" className="text-[11px] text-slate-300 block mt-0.5 hover:underline">helposcricketcup@gmail.com</a>
              </div>
              <a 
                href="tel:+919056333759" 
                className="w-11 h-11 rounded-full bg-[#d8392f] hover:bg-[#b91c1c] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 shrink-0"
                title="Call Official Helpline"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: Interactive Form (Compact) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 order-1 lg:order-2">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Banner */}
              {errorMessage && (
                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-2xl flex items-start gap-3 text-red-900 text-sm shadow-sm animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-black block uppercase text-xs tracking-wider text-red-700">Registration Notice</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* STEP 1: Team Selection & Captain Contacts */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-[#d8392f] flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Select Team & Division</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {isLoadingTeams ? 'Loading official tournament teams...' : 'Select from official database roster'}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Team Name
                    </label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#d8392f] focus:ring-2 focus:ring-red-100 outline-none transition-all appearance-none bg-slate-50 font-semibold text-slate-800"
                      value={selectedTeam}
                      onChange={handleTeamChange}
                      required
                    >
                      <option value="" disabled>-- Select Your Team --</option>
                      
                      {/* Boys Division Teams */}
                      <optgroup label="Boys Division (16 Teams)">
                        {(dbBoysTeams.length > 0 ? dbBoysTeams : defaultBoysTeams.map((name, idx) => ({ id: idx + 1, name, slug: name, division: 'boys' as const, status: 'available' as const }))).map(team => {
                          const isRegistered = team.status === 'registered' || (team as any).is_registered;
                          return (
                            <option key={team.id || team.name} value={team.name} disabled={isRegistered} className={isRegistered ? 'text-slate-400 bg-slate-100 italic' : 'font-semibold'}>
                              {team.name} {isRegistered ? '🔒 (Registration Closed - Paid)' : ''}
                            </option>
                          );
                        })}
                      </optgroup>

                      {/* Girls Division Teams */}
                      <optgroup label="Girls Division (8 Teams)">
                        {(dbGirlsTeams.length > 0 ? dbGirlsTeams : defaultGirlsTeams.map((name, idx) => ({ id: idx + 17, name, slug: name, division: 'girls' as const, status: 'available' as const }))).map(team => {
                          const isRegistered = team.status === 'registered' || (team as any).is_registered;
                          return (
                            <option key={team.id || team.name} value={team.name} disabled={isRegistered} className={isRegistered ? 'text-slate-400 bg-slate-100 italic' : 'font-semibold'}>
                              {team.name} {isRegistered ? '🔒 (Registration Closed - Paid)' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                    </select>
                  </div>

                  {selectedTeam ? (
                    <div className="bg-[#0b162c] text-white p-4 rounded-xl flex items-center justify-between border-l-4 border-[#d8392f]">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Team</span>
                        <span className="text-base font-black italic uppercase text-white">{selectedTeam}</span>
                        <span className="text-xs text-slate-300 block font-medium">
                          {isSelectedGirls ? "Girls Division" : "Boys Division"}
                        </span>
                      </div>
                      <Shield className="w-7 h-7 text-[#d8392f]" />
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center text-xs text-slate-400 font-medium">
                      Select your team to continue roster entry
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Captain Email (For Payment Receipt & Match Updates)
                  </label>
                  <input
                    type="email"
                    value={captainEmail}
                    onChange={(e) => setCaptainEmail(e.target.value)}
                    placeholder="captain@example.com"
                    className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#d8392f] focus:ring-2 focus:ring-red-100 outline-none text-sm bg-white"
                  />
                </div>
              </div>

              {/* STEP 2: Player Squad Roster */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                      2
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Player Squad (12 Players)</h2>
                      <p className="text-xs text-slate-500 font-medium">
                        11 Playing Squad + 1 Extra Player • <strong className="text-slate-800 font-bold">{filledCount} of 12 filled</strong>
                      </p>
                    </div>
                  </div>

                  {/* Layout View Switcher */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setViewMode('step')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'step' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      Step-by-Step (Fast)
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${viewMode === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      View All 12
                    </button>
                  </div>
                </div>

                {/* Quick Player Navigator Tabs */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Jump to Player:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const isComplete = players[idx].name.trim() !== '' && players[idx].tshirtSize !== '';
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActivePlayer(idx);
                            if (viewMode === 'all') {
                              const el = document.getElementById(`player-card-${idx}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                            activePlayer === idx 
                              ? 'bg-[#d8392f] text-white shadow-md scale-105' 
                              : isComplete 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          #{idx + 1}
                          {idx === captainIndex ? ' (C)' : idx === viceCaptainIndex ? ' (VC)' : idx === 11 ? ' (Ex)' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MODE A: STEP BY STEP (Zero Scroll View) */}
                {viewMode === 'step' && (
                  <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-200 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-[#0b162c] text-white flex items-center justify-center font-black text-base shadow-sm">
                          #{activePlayer + 1}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {activePlayer === 11 ? "Player 12 (Extra Player)" : `Player ${activePlayer + 1}`}
                          </h3>
                          <span className="text-xs font-semibold text-slate-500">
                            {activePlayer === captainIndex ? "Team Captain (C)" : activePlayer === viceCaptainIndex ? "Vice Captain (VC)" : activePlayer === 11 ? "Extra Substitute" : "Playing XI"}
                          </span>
                        </div>
                      </div>

                      {activePlayer < 11 && (
                        <div className="flex items-center gap-4 text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-max shadow-sm">
                          <label className="flex items-center gap-1.5 cursor-pointer" title="Mark as Captain">
                            <input 
                              type="radio" 
                              name="captain-radio" 
                              checked={captainIndex === activePlayer} 
                              onChange={() => setCaptainIndex(activePlayer)} 
                              className="w-3.5 h-3.5 text-[#d8392f]" 
                            />
                            <span className="font-semibold text-slate-700">Captain (C)</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer" title="Mark as Vice Captain">
                            <input 
                              type="radio" 
                              name="vice-captain-radio" 
                              checked={viceCaptainIndex === activePlayer} 
                              onChange={() => setViceCaptainIndex(activePlayer)} 
                              className="w-3.5 h-3.5 text-blue-600" 
                            />
                            <span className="font-semibold text-slate-700">Vice (VC)</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                        </label>
                        <input 
                          type="text" 
                          value={players[activePlayer].name}
                          onChange={(e) => updatePlayer(activePlayer, 'name', e.target.value)}
                          placeholder="e.g. Gurpreet Singh" 
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] focus:ring-2 focus:ring-red-100 outline-none text-sm bg-white" 
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Jersey No. *</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="999" 
                          value={players[activePlayer].jerseyNumber}
                          onChange={(e) => updatePlayer(activePlayer, 'jerseyNumber', e.target.value)}
                          placeholder="e.g. 7" 
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] focus:ring-2 focus:ring-red-100 outline-none text-sm bg-white" 
                          required 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mobile No.</label>
                        <input 
                          type="tel" 
                          value={players[activePlayer].phone}
                          onChange={(e) => updatePlayer(activePlayer, 'phone', e.target.value)}
                          placeholder="+91" 
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] focus:ring-2 focus:ring-red-100 outline-none text-sm bg-white" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Droplet className="w-3.5 h-3.5 text-[#d8392f]" /> Blood Group
                        </label>
                        <select 
                          value={players[activePlayer].bloodGroup}
                          onChange={(e) => updatePlayer(activePlayer, 'bloodGroup', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] outline-none text-sm bg-white"
                        >
                          <option value="">Select</option>
                          {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Age
                        </label>
                        <input 
                          type="number" 
                          min="10" 
                          max="40" 
                          value={players[activePlayer].age}
                          onChange={(e) => updatePlayer(activePlayer, 'age', e.target.value)}
                          placeholder="19" 
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] outline-none text-sm bg-white" 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-slate-400" /> T-Shirt Size *
                        </label>
                        <select 
                          value={players[activePlayer].tshirtSize}
                          onChange={(e) => updatePlayer(activePlayer, 'tshirtSize', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] outline-none text-sm bg-white font-semibold" 
                          required
                        >
                          <option value="">Select Size</option>
                          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-slate-400" /> Lower Size *
                        </label>
                        <select 
                          value={players[activePlayer].lowerSize}
                          onChange={(e) => updatePlayer(activePlayer, 'lowerSize', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#d8392f] outline-none text-sm bg-white font-semibold" 
                          required
                        >
                          <option value="">Select Size</option>
                          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      {/* Student ID Upload */}
                      <div className="sm:col-span-2 md:col-span-4 mt-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5 text-slate-400" /> Student ID Card (Verification)
                        </label>
                        <label className="flex items-center justify-between w-full h-[44px] border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-slate-100 transition-colors px-4">
                          <div className="flex items-center gap-2 truncate">
                            {players[activePlayer].studentIdFileName ? (
                              <>
                                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span className="text-xs font-bold text-emerald-700 truncate">
                                  {players[activePlayer].studentIdFileName}
                                </span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 text-blue-600 shrink-0" />
                                <span className="text-xs font-bold text-blue-600">Upload Student ID Photo / PDF</span>
                              </>
                            )}
                          </div>
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold shrink-0">
                            Browse
                          </span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".jpg,.jpeg,.png,.pdf" 
                            onChange={(e) => handleFileUpload(activePlayer, e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Step Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200">
                      <button
                        type="button"
                        disabled={activePlayer === 0}
                        onClick={() => setActivePlayer(prev => Math.max(0, prev - 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          activePlayer === 0 
                            ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500' 
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous Player
                      </button>

                      <div className="text-xs font-bold text-slate-500">
                        Player <span className="text-slate-900">{activePlayer + 1}</span> of 12
                      </div>

                      <button
                        type="button"
                        disabled={activePlayer === 11}
                        onClick={() => setActivePlayer(prev => Math.min(11, prev + 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          activePlayer === 11 
                            ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500' 
                            : 'bg-[#0b162c] text-white hover:bg-slate-800'
                        }`}
                      >
                        Next Player <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* MODE B: VIEW ALL 12 PLAYERS */}
                {viewMode === 'all' && (
                  <div className="space-y-4">
                    {players.map((p, idx) => (
                      <div 
                        key={idx} 
                        id={`player-card-${idx}`}
                        className={`p-4 md:p-5 rounded-2xl border transition-all ${
                          activePlayer === idx 
                            ? 'border-[#d8392f] bg-red-50/20 shadow-sm' 
                            : 'border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-[#0b162c] text-white flex items-center justify-center font-black text-xs">
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-sm text-slate-900">
                              {idx === captainIndex ? "Captain (C)" : idx === viceCaptainIndex ? "Vice Captain (VC)" : idx === 11 ? "Extra Substitute" : `Player ${idx + 1}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name="captain-all" 
                                checked={captainIndex === idx} 
                                onChange={() => setCaptainIndex(idx)} 
                                className="w-3 h-3 text-[#d8392f]" 
                              />
                              <span className="font-semibold text-slate-600 text-[11px]">Captain</span>
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name="vice-captain-all" 
                                checked={viceCaptainIndex === idx} 
                                onChange={() => setViceCaptainIndex(idx)} 
                                className="w-3 h-3 text-blue-600" 
                              />
                              <span className="font-semibold text-slate-600 text-[11px]">Vice</span>
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                          <div className="col-span-2">
                            <input 
                              type="text" 
                              placeholder="Full Name *" 
                              value={p.name}
                              onChange={(e) => updatePlayer(idx, 'name', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-[#d8392f] outline-none" 
                              required 
                            />
                          </div>
                          <div>
                            <input 
                              type="number" 
                              placeholder="Jersey # *" 
                              value={p.jerseyNumber}
                              onChange={(e) => updatePlayer(idx, 'jerseyNumber', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-[#d8392f] outline-none" 
                              required 
                            />
                          </div>
                          <div>
                            <input 
                              type="tel" 
                              placeholder="Mobile" 
                              value={p.phone}
                              onChange={(e) => updatePlayer(idx, 'phone', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-[#d8392f] outline-none" 
                            />
                          </div>
                          <div>
                            <select 
                              value={p.tshirtSize}
                              onChange={(e) => updatePlayer(idx, 'tshirtSize', e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-[#d8392f] outline-none" 
                              required
                            >
                              <option value="">T-Shirt</option>
                              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div>
                            <select 
                              value={p.lowerSize}
                              onChange={(e) => updatePlayer(idx, 'lowerSize', e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:border-[#d8392f] outline-none" 
                              required
                            >
                              <option value="">Lower</option>
                              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* File Upload in All view */}
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <label className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1 font-semibold text-[11px]">
                            <Upload className="w-3 h-3" />
                            {p.studentIdFileName ? p.studentIdFileName : "Attach Student ID Card"}
                            <input 
                              type="file" 
                              className="hidden" 
                              accept=".jpg,.jpeg,.png,.pdf" 
                              onChange={(e) => handleFileUpload(idx, e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* STEP 3: Submission & Agreement */}
              <div className="bg-[#0b162c] text-white p-6 md:p-8 rounded-3xl shadow-xl border-t-4 border-[#d8392f] space-y-5">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="rules-agree" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#d8392f] border-slate-600 focus:ring-red-500 cursor-pointer"
                  />
                  <label htmlFor="rules-agree" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                    I confirm that all entered player details are accurate, our team agrees to pay the <strong className="text-white">₹4,999 registration fee</strong> (inclusive of official custom jersey kits for 12 players), and all 12 players will strictly abide by the official playing conditions & tournament guidelines (including 1-hour reporting window, wearing committee-issued kits, and final authority clause).
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Total Payable</span>
                    <span className="text-2xl font-black italic text-white">₹4,999/-</span>
                    <span className="text-[11px] text-emerald-400 font-medium block">Includes 12x Custom Jersey Kits</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={!agreed || isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3.5 font-black italic text-base uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 ${
                      agreed && !isSubmitting
                        ? 'bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white shadow-[0_5px_20px_rgba(239,68,68,0.5)] hover:shadow-[0_5px_25px_rgba(239,68,68,0.7)] hover:-translate-y-0.5' 
                        : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Redirecting to Easebuzz Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Pay ₹4,999 & Confirm Team
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}
