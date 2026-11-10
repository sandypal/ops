'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PassCard from '@/components/PassCard';
import { registerPass, TournamentPassData } from '@/lib/passApi';
import {
  Ticket,
  Users,
  MapPin,
  Calendar,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Info,
  Phone,
  Mail,
  User,
  Building,
  Sparkles,
  Trophy,
  Shield,
  HelpCircle,
  ExternalLink,
  Navigation,
} from 'lucide-react';

export default function PassesPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [institution, setInstitution] = useState('');
  const [quantity, setQuantity] = useState<1 | 2>(1);
  const [guestName, setGuestName] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedPass, setGeneratedPass] = useState<TournamentPassData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (quantity === 2 && !guestName.trim()) {
      setErrorMessage('Please enter the full name of the second attendee.');
      return;
    }

    setLoading(true);

    try {
      const passData = await registerPass({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        city: city.trim() || undefined,
        institution: institution.trim() || undefined,
        quantity,
        guest_name: quantity === 2 ? guestName.trim() : undefined,
      });

      setGeneratedPass(passData);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Could not generate pass. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedPass(null);
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
    setInstitution('');
    setQuantity(1);
    setGuestName('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 selection:bg-[#d8392f] selection:text-white flex flex-col justify-between">
      {/* Shared Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-8 md:pt-10 pb-20 md:pb-28 max-w-7xl flex-1">
        {/* Top Presenter & Powered By Sponsor Bar (Matches Registration Page) */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <a
              href="https://sarvsewabharat.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8392f] font-black uppercase text-xs tracking-widest block hover:underline"
            >
              Sarv Sewa Sashktikarn Sangthan (Regd) Presents
            </a>

            {/* Official Tournament Presenters & Stand Partner */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 bg-gradient-to-r from-black/85 via-black/75 to-black/65 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-md">
              <div className="flex items-center gap-2 pl-0.5">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-400">
                  OFFICIAL SPONSOR:
                </span>
                <a
                  href="https://www.nikbakers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 sm:h-11 px-3 sm:px-3.5 bg-white hover:bg-slate-50 rounded-xl border-2 border-amber-300/90 shadow-md flex items-center gap-2 hover:scale-105 transition-all group"
                  title="Nik Baker's — Official Tournament Sponsor (Note: No refreshments included with pass)"
                >
                  <Image
                    src="/sponsors/nik-bakers.png"
                    alt="Nik Baker's Logo"
                    width={80}
                    height={50}
                    className="max-h-7 sm:max-h-8 w-auto object-contain"
                  />
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-none group-hover:text-[#d8392f] transition-colors">
                    Nik Baker&apos;s
                  </span>
                </a>
              </div>

              <span className="text-white/30 hidden sm:inline">•</span>

              <div className="flex items-center gap-2 pl-0.5 sm:pl-0">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-400">
                  STAND PARTNER:
                </span>
                <div
                  className="h-10 sm:h-11 px-3 sm:px-3.5 bg-white rounded-xl border-2 border-emerald-300/90 shadow-md flex items-center gap-2"
                  title="Avon Cycle Stand — Official Spectator Seating Partner"
                >
                  <Image
                    src="/sponsors/avon-cycles.png"
                    alt="Avon Cycles Logo"
                    width={50}
                    height={35}
                    className="max-h-6 sm:max-h-7 w-auto object-contain"
                  />
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-none">
                    Avon Cycle Stand
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Heading & Quick Free Pass Badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 rounded-md font-black text-xs uppercase tracking-wider mb-2">
                <Ticket className="w-3.5 h-3.5" />
                <span>100% Free Spectator Passes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic text-[#0b162c] leading-tight">
                Official Match <span className="text-[#d8392f]">Passes</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium mt-1">
                Operation Sindoor Cricket Cup 2.0 &bull; 5-Day Event &bull; Sector 16 Stadium, Chandigarh
              </p>
            </div>

            {/* Quick Free Entry Badge */}
            <div className="bg-[#0b162c] text-white px-4 py-3 rounded-2xl border-l-4 border-amber-400 shadow-md flex items-center gap-3.5 self-start md:self-auto">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Spectator Entry
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 italic leading-none">
                  ₹0 FREE PASS
                </span>
              </div>
              <span className="text-[11px] sm:text-xs bg-white/10 px-2.5 py-1 rounded text-slate-300 font-semibold">
                Valid All 5 Tournament Days
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            PASS CARD VIEW (Once Pass is generated) OR REGISTRATION FORM & HIGHLIGHTS
            ═══════════════════════════════════════════════════════════════════════ */}
        {generatedPass ? (
          <div className="my-8">
            <PassCard pass={generatedPass} onNewRegistration={handleReset} />
          </div>
        ) : (
          <>
            {/* 3-Step Instant Digital Pass Process Infographic */}
            <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 text-base shadow-sm">
                  1
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm text-[#0b162c]">Register in 30 Seconds</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Select 1 or 2 passes, enter your name & mobile number. No credit card or fee needed.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#d8392f] text-white font-black flex items-center justify-center shrink-0 text-base shadow-sm">
                  2
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm text-[#0b162c]">Instant PDF &amp; QR Pass</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Receive your digital boarding pass on-screen and via email with scannable Barcode & QR code.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black flex items-center justify-center shrink-0 text-base shadow-sm">
                  3
                </div>
                <div>
                  <h3 className="font-black uppercase text-sm text-[#0b162c]">Fast Gate Scanning</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Show the digital pass on your smartphone at the Gate for rapid optical scanning and admission.
                  </p>
                </div>
              </div>
            </section>

            {/* Main Form Section + What Your Pass Includes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Left Column: Flat Pass Registration Form (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                  {/* Top Red Stripe */}
                  <div className="h-2 bg-[#d8392f] w-full"></div>

                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black uppercase italic text-[#0b162c] flex items-center gap-2">
                          <Ticket className="w-6 h-6 text-[#d8392f]" /> Pass Application
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Enter your contact information to receive your digital entry pass.
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs uppercase rounded-full">
                        ₹0 Free
                      </span>
                    </div>

                    {/* Error Alert */}
                    {errorMessage && (
                      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-800 text-xs sm:text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="flex-1 font-semibold">{errorMessage}</div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Pass Quantity Selector */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                          Number of Passes <span className="text-[#d8392f]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setQuantity(1)}
                            className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                              quantity === 1
                                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                            }`}
                          >
                            <Users className="w-5 h-5 mx-auto mb-1 text-slate-900" />
                            <div className="text-sm uppercase tracking-wide">1 Pass (Self)</div>
                            <span className="text-[11px] block text-slate-600 font-medium">Single entry pass</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setQuantity(2)}
                            className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                              quantity === 2
                                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                            }`}
                          >
                            <Users className="w-5 h-5 mx-auto mb-1 text-slate-900" />
                            <div className="text-sm uppercase tracking-wide">2 Passes (Max)</div>
                            <span className="text-[11px] block text-slate-600 font-medium">Self + 1 Guest</span>
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 font-medium">
                          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Strict cap of max 2 passes per registered mobile number.</span>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Name <span className="text-[#d8392f]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jaswinder Singh"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Second Guest Name if Quantity is 2 */}
                      {quantity === 2 && (
                        <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl">
                          <label className="block text-xs font-black uppercase tracking-wider text-amber-900 mb-1.5">
                            Second Guest Full Name <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-600" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Gurpreet Kaur"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full bg-white border border-amber-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* Mobile & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                            Mobile Number <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              placeholder="10-digit mobile"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                            Email Address <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="email"
                              required
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* City & College / Organization */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                            City / District <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="e.g. Chandigarh, Mohali"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                            College / Org <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="e.g. Panjab University"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tournament Validity Note */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>All-Tournament Pass &bull; Avon Cycle Stand</span>
                        </div>
                        Valid for all tournament matches at Sector 16 Stadium Chandigarh. Seating is in the official Avon Cycle Stand. (Note: Nik Baker&apos;s is the official tournament sponsor; passes provide stadium stand entry only &mdash; no complimentary refreshments are included).
                      </div>

                      {/* Submit Flat Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-xl border-b-4 border-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Generating Free Pass...
                          </>
                        ) : (
                          <>
                            <Ticket className="w-5 h-5 text-slate-950" /> Claim Free Match Pass &rarr;
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column: Stadium Google Map Location & Tournament Guidelines (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Stadium Location & Google Maps Card */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <span className="text-xs font-black uppercase tracking-wider text-[#d8392f] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#d8392f]" /> Stadium Location &amp; Map
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2.5 py-0.5 rounded text-slate-700 font-bold uppercase">
                      Sector 16 &bull; Chandigarh
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-[#0b162c] leading-tight mb-1">
                    Sector 16 Cricket Stadium
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Jan Marg, Sector 16-C, Chandigarh, 160015 &bull; Historic international cricket ground located next to the Zakir Hussain Rose Garden.
                  </p>

                  {/* Responsive Google Maps Embedded Iframe */}
                  <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 shadow-inner mb-4 bg-slate-100">
                    <iframe
                      title="Sector 16 Cricket Stadium Chandigarh Google Map"
                      src="https://maps.google.com/maps?q=Sector+16+Cricket+Stadium,+Jan+Marg,+Sector+16,+Chandigarh,+160015&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Action Link to Google Maps Directions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Spectator entry via Jan Marg Gate.
                    </span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Sector+16+Cricket+Stadium+Chandigarh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0b162c] hover:bg-[#1a273e] text-amber-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Card 3: Important Rules & Notice */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
                  <h3 className="font-black uppercase text-sm text-[#0b162c] flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-emerald-600" /> Important Entry Rules &amp; Notice
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium list-disc list-inside">
                    <li>Carry any Government Photo ID (Aadhaar, Student ID, Driving License).</li>
                    <li>One pass per person; duplicate barcode scans will be rejected at the gate.</li>
                    <li>Glass bottles, sharp items, and fireworks are strictly prohibited.</li>
                    <li>Children above 5 years require an individual pass.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════════
                SECTION 3: TOURNAMENT KNOCKOUT FORMAT & RIVER TEAMS ROADMAP
                ═══════════════════════════════════════════════════════════════════════ */}
            <section className="mb-12 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div>
                  <span className="text-xs font-black uppercase text-[#d8392f] tracking-wider block mb-1">
                    Tournament Structure
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0b162c] italic">
                    5-Day Match <span className="text-[#d8392f]">Roadmap</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    24 Sacred River Teams competing across Boys &amp; Girls Divisions at Sector 16 Stadium.
                  </p>
                </div>
                <div className="bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs font-black text-slate-800 uppercase tracking-wide">
                  22 Knockout Matches &bull; High Energy T10 Format
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Boys Division Bracket */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <div className="font-black text-base uppercase text-[#0b162c]">Boys Division (16 Teams)</div>
                    <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                      15 Matches
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Round of 16 (Knockouts)</span>
                      <span className="text-blue-700 font-black">8 Matches</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Quarter-Finals</span>
                      <span className="text-blue-700 font-black">4 Matches</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Semi-Finals</span>
                      <span className="text-blue-700 font-black">2 Matches</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex justify-between items-center font-bold">
                      <span className="text-amber-900 font-black flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-600" /> Grand Championship Final
                      </span>
                      <span className="text-amber-800 font-black">1 Match</span>
                    </div>
                  </div>
                </div>

                {/* Girls Division Bracket */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <div className="font-black text-base uppercase text-[#0b162c]">Girls Division (8 Teams)</div>
                    <span className="text-[11px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
                      7 Matches
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Quarter-Finals</span>
                      <span className="text-rose-700 font-black">4 Matches</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Semi-Finals</span>
                      <span className="text-rose-700 font-black">2 Matches</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex justify-between items-center font-bold">
                      <span className="text-amber-900 font-black flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-600" /> Women&apos;s Grand Final
                      </span>
                      <span className="text-amber-800 font-black">1 Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
