'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PassCard from '@/components/PassCard';
import {
  registerPass,
  TournamentPassData,
  detectAdAttribution,
  getSavedAdAttribution,
  recordPassRegistrationLocally,
  getLocalAdStats,
  AdAttribution,
} from '@/lib/passApi';
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
  BarChart3,
  TrendingUp,
  X,
  Download,
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

  // Ad Tracking State
  const [adAttribution, setAdAttribution] = useState<AdAttribution>({ source: 'Direct / Organic' });
  const [showAdStatsModal, setShowAdStatsModal] = useState(false);
  const [adStats, setAdStats] = useState<{ total: number; facebook: number; instagram: number; direct: number; records: any[] }>({
    total: 0,
    facebook: 0,
    instagram: 0,
    direct: 0,
    records: [],
  });

  useEffect(() => {
    // Detect & persist ad attribution on page load
    const detected = detectAdAttribution();
    setAdAttribution(detected);
    setAdStats(getLocalAdStats());
  }, []);

  const refreshAdStats = () => {
    setAdStats(getLocalAdStats());
  };

  const handleExportCsv = () => {
    const stats = getLocalAdStats();
    if (!stats.records.length) {
      alert('No ad records recorded yet on this device.');
      return;
    }
    const headers = ['Pass Code', 'Name', 'Phone', 'Passes', 'Ad Source', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'FBCLID', 'Date Time'];
    const rows = stats.records.map((r) => [
      r.pass_code,
      `"${r.name || ''}"`,
      r.phone,
      r.quantity,
      `"${r.source || ''}"`,
      `"${r.utm_source || ''}"`,
      `"${r.utm_medium || ''}"`,
      `"${r.utm_campaign || ''}"`,
      r.fbclid || '',
      r.timestamp,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Operation_Sindoor_Passes_Ad_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      const currentAttribution = getSavedAdAttribution();

      const passData = await registerPass({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        city: city.trim() || undefined,
        institution: institution.trim() || undefined,
        quantity,
        guest_name: quantity === 2 ? guestName.trim() : undefined,
        source: currentAttribution.source,
        utm_source: currentAttribution.utm_source,
        utm_medium: currentAttribution.utm_medium,
        utm_campaign: currentAttribution.utm_campaign,
        utm_content: currentAttribution.utm_content,
        fbclid: currentAttribution.fbclid,
        referrer: currentAttribution.referrer,
      });

      // Record in local attribution log
      recordPassRegistrationLocally(passData, currentAttribution);
      refreshAdStats();

      // Trigger Google Analytics 4 conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
          (window as any).gtag('event', 'pass_registration', {
            event_category: 'Passes',
            event_label: currentAttribution.source,
            pass_code: passData.pass_code,
            attendees: passData.quantity,
          });
        } catch {}
      }

      // Trigger Meta Pixel conversion if available on page
      if (typeof window !== 'undefined' && (window as any).fbq) {
        try {
          (window as any).fbq('track', 'CompleteRegistration', {
            content_name: 'Operation Sindoor Cricket Cup Pass',
            currency: 'INR',
            value: 0.0,
            status: 'success',
          });
        } catch {}
      }

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
      <main className="container mx-auto px-3 sm:px-4 pt-3 sm:pt-5 md:pt-10 pb-16 md:pb-28 max-w-7xl flex-1">
        {/* Top Presenter & Powered By Sponsor Bar (Matches Registration Page) */}
        <div className="mb-3 sm:mb-5 md:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
            <a
              href="https://sarvsewabharat.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8392f] font-black uppercase text-[10px] sm:text-xs tracking-wider sm:tracking-widest block hover:underline"
            >
              Sarv Sewa Sashktikarn Sangthan (Regd) Presents
            </a>

            {/* Official Tournament Sponsor */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3.5 bg-gradient-to-r from-black/85 via-black/75 to-black/65 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-white/20 shadow-md">
              <div className="flex items-center gap-1.5 sm:gap-2 pl-0.5">
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest text-amber-400">
                  OFFICIAL SPONSOR:
                </span>
                <a
                  href="https://www.nikbakers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 sm:h-11 px-2.5 sm:px-3.5 bg-white hover:bg-slate-50 rounded-lg sm:rounded-xl border-2 border-amber-300/90 shadow-md flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-all group"
                  title="Nik Baker's — Official Tournament Sponsor (Note: No refreshments included with pass)"
                >
                  <Image
                    src="/sponsors/nik-bakers.png"
                    alt="Nik Baker's Logo"
                    width={80}
                    height={50}
                    className="max-h-5 sm:max-h-8 w-auto object-contain"
                  />
                  <span className="text-[11px] sm:text-sm font-black text-slate-900 leading-none group-hover:text-[#d8392f] transition-colors">
                    Nik Baker&apos;s
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Page Heading & Quick Free Pass Badge */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-4 border-b border-slate-200 pb-3 sm:pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-400 text-slate-950 rounded-md font-black text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2">
                <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>100% Free Spectator Passes</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic text-[#0b162c] leading-tight">
                Official Match <span className="text-[#d8392f]">Passes</span>
              </h1>
              <p className="text-slate-600 text-[11px] sm:text-sm md:text-base font-medium mt-0.5 sm:mt-1">
                Operation Sindoor Cricket Cup 2.0 &bull; 5-Day Event &bull; Sector 16 Stadium, Chandigarh
              </p>
            </div>

            {/* Quick Free Entry Badge */}
            <div className="bg-[#0b162c] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-l-4 border-amber-400 shadow-md flex items-center gap-2.5 sm:gap-3.5 self-start md:self-auto">
              <div>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Spectator Entry
                </span>
                <span className="text-base sm:text-2xl font-black text-amber-400 italic leading-none">
                  ₹0 FREE PASS
                </span>
              </div>
              <span className="text-[10px] sm:text-xs bg-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-slate-300 font-semibold">
                Valid All 5 Days
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
            {/* 3-Step Instant Digital Pass Process Infographic (Hidden on mobile for immediate above-the-fold form access) */}
            <section className="hidden md:grid md:grid-cols-3 gap-4 mb-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 mb-8 md:mb-12">
              {/* Left Column: Flat Pass Registration Form (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-xl sm:rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                  {/* Top Red Stripe */}
                  <div className="h-1.5 sm:h-2 bg-[#d8392f] w-full"></div>

                  <div className="p-4 sm:p-8 md:p-10">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
                      <div>
                        <h2 className="text-lg sm:text-2xl font-black uppercase italic text-[#0b162c] flex items-center gap-2">
                          <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-[#d8392f]" /> Pass Application
                        </h2>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                          Enter your contact information to receive your digital entry pass.
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-100 text-emerald-800 font-black text-[11px] sm:text-xs uppercase rounded-full">
                        ₹0 Free
                      </span>
                    </div>

                    {/* Error Alert */}
                    {errorMessage && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-800 text-xs sm:text-sm flex items-start gap-2.5 sm:gap-3">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="flex-1 font-semibold">{errorMessage}</div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
                      {/* Pass Quantity Selector */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
                          Number of Passes <span className="text-[#d8392f]">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            type="button"
                            onClick={() => setQuantity(1)}
                            className={`p-2.5 sm:p-4 rounded-lg sm:rounded-xl border text-center transition-all cursor-pointer ${
                              quantity === 1
                                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                            }`}
                          >
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-0.5 sm:mb-1 text-slate-900" />
                            <div className="text-xs sm:text-sm uppercase tracking-wide font-black">1 Pass (Self)</div>
                            <span className="text-[10px] sm:text-[11px] block text-slate-600 font-medium">Single entry pass</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setQuantity(2)}
                            className={`p-2.5 sm:p-4 rounded-lg sm:rounded-xl border text-center transition-all cursor-pointer ${
                              quantity === 2
                                ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                            }`}
                          >
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-0.5 sm:mb-1 text-slate-900" />
                            <div className="text-xs sm:text-sm uppercase tracking-wide font-black">2 Passes (Max)</div>
                            <span className="text-[10px] sm:text-[11px] block text-slate-600 font-medium">Self + 1 Guest</span>
                          </button>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1.5 sm:mt-2 flex items-center gap-1.5 font-medium">
                          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Strict cap of max 2 passes per registered mobile number.</span>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                          Full Name <span className="text-[#d8392f]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jaswinder Singh"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Second Guest Name if Quantity is 2 */}
                      {quantity === 2 && (
                        <div className="bg-amber-50/60 border border-amber-200 p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl">
                          <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-900 mb-1 sm:mb-1.5">
                            Second Guest Full Name <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Gurpreet Kaur"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full bg-white border border-amber-300 rounded-lg pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* Mobile & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                        <div>
                          <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                            Mobile Number <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              placeholder="10-digit mobile"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                            Email Address <span className="text-[#d8392f]">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="email"
                              required
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* City & College / Organization */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                        <div>
                          <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                            City / District <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="e.g. Chandigarh, Mohali"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700 mb-1 sm:mb-1.5">
                            College / Org <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="e.g. Panjab University"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl pl-9 sm:pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tournament Validity Note */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-700 font-bold mb-0.5 sm:mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                          <span>All-Tournament Pass &bull; Sector 16 Stadium</span>
                        </div>
                        Valid for all tournament matches at Sector 16 Stadium Chandigarh. Seating is in the general spectator stands. (Note: Nik Baker&apos;s is the official tournament sponsor; passes provide stadium stand entry only &mdash; no complimentary refreshments are included).
                      </div>

                      {/* Submit Flat Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-base uppercase tracking-wider rounded-lg sm:rounded-xl border-b-4 border-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> Generating Free Pass...
                          </>
                        ) : (
                          <>
                            <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" /> Claim Free Match Pass &rarr;
                          </>
                        )}
                      </button>

                      {/* Ad Attribution Indicator & Stats Modal Trigger */}
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Detected Source: <strong className="text-slate-700">{adAttribution.source}</strong></span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            refreshAdStats();
                            setShowAdStatsModal(true);
                          }}
                          className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold hover:underline cursor-pointer"
                        >
                          <BarChart3 className="w-3.5 h-3.5" />
                          <span>Ad Analytics ({adStats.total})</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column: Stadium Google Map Location & Tournament Guidelines (5 Cols) */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                {/* Stadium Location & Google Maps Card */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b border-slate-100">
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#d8392f] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d8392f]" /> Stadium Location &amp; Map
                    </span>
                    <span className="text-[9px] sm:text-[10px] bg-slate-100 px-2 py-0.5 sm:px-2.5 rounded text-slate-700 font-bold uppercase">
                      Sector 16 &bull; Chandigarh
                    </span>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-[#0b162c] leading-tight mb-1">
                    Sector 16 Cricket Stadium
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    Jan Marg, Sector 16-C, Chandigarh, 160015 &bull; Historic international cricket ground located next to the Zakir Hussain Rose Garden.
                  </p>

                  {/* Responsive Google Maps Embedded Iframe */}
                  <div className="relative w-full h-48 sm:h-72 rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 shadow-inner mb-3 sm:mb-4 bg-slate-100">
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 pt-1 border-t border-slate-100">
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      Spectator entry via Jan Marg Gate.
                    </span>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Sector+16+Cricket+Stadium+Chandigarh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#0b162c] hover:bg-[#1a273e] text-amber-400 hover:text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Card 3: Important Rules & Notice */}
                <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6">
                  <h3 className="font-black uppercase text-xs sm:text-sm text-[#0b162c] flex items-center gap-2 mb-2 sm:mb-3">
                    <Shield className="w-4 h-4 text-emerald-600" /> Important Entry Rules &amp; Notice
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600 font-medium list-disc list-inside">
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
            <section className="mb-8 sm:mb-12 bg-white rounded-xl sm:rounded-3xl border border-slate-200 shadow-md p-4 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-4 sm:pb-5 mb-4 sm:mb-6">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase text-[#d8392f] tracking-wider block mb-0.5 sm:mb-1">
                    Tournament Structure
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black uppercase text-[#0b162c] italic">
                    5-Day Match <span className="text-[#d8392f]">Roadmap</span>
                  </h2>
                  <p className="text-[11px] sm:text-sm text-slate-600 font-medium mt-0.5 sm:mt-1">
                    24 Sacred River Teams competing across Boys &amp; Girls Divisions at Sector 16 Stadium.
                  </p>
                </div>
                <div className="bg-slate-100 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black text-slate-800 uppercase tracking-wide self-start md:self-auto">
                  22 Knockout Matches &bull; T10 Format
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Boys Division Bracket */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-slate-200 pb-2.5 sm:pb-3">
                    <div className="font-black text-sm sm:text-base uppercase text-[#0b162c]">Boys Division (16 Teams)</div>
                    <span className="text-[10px] sm:text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 sm:px-2.5 rounded-full">
                      15 Matches
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs">
                    <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Round of 16 (Knockouts)</span>
                      <span className="text-blue-700 font-black">8 Matches</span>
                    </div>
                    <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Quarter-Finals</span>
                      <span className="text-blue-700 font-black">4 Matches</span>
                    </div>
                    <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Semi-Finals</span>
                      <span className="text-blue-700 font-black">2 Matches</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex justify-between items-center font-bold">
                      <span className="text-amber-900 font-black flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> Grand Championship Final
                      </span>
                      <span className="text-amber-800 font-black">1 Match</span>
                    </div>
                  </div>
                </div>

                {/* Girls Division Bracket */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-slate-200 pb-2.5 sm:pb-3">
                    <div className="font-black text-sm sm:text-base uppercase text-[#0b162c]">Girls Division (8 Teams)</div>
                    <span className="text-[10px] sm:text-[11px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 sm:px-2.5 rounded-full">
                      7 Matches
                    </span>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-xs">
                    <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Quarter-Finals</span>
                      <span className="text-rose-700 font-black">4 Matches</span>
                    </div>
                    <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 flex justify-between items-center font-bold">
                      <span className="text-slate-800">Semi-Finals</span>
                      <span className="text-rose-700 font-black">2 Matches</span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex justify-between items-center font-bold">
                      <span className="text-amber-900 font-black flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> Women&apos;s Grand Final
                      </span>
                      <span className="text-amber-800 font-black">1 Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            AD CAMPAIGN ANALYTICS MODAL (Facebook & Instagram Ad Conversions)
            ═══════════════════════════════════════════════════════════════════════ */}
        {showAdStatsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase text-[#0b162c] leading-tight">
                      Passes Ad Campaign Tracker
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tracking registrations from Facebook Ads &amp; Instagram Ads
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdStatsModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-black text-slate-500 block">Total Passes</span>
                    <span className="text-xl font-black text-slate-900">{adStats.total}</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-black text-blue-700 block">Facebook Ads</span>
                    <span className="text-xl font-black text-blue-900">{adStats.facebook}</span>
                  </div>

                  <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-black text-fuchsia-700 block">Instagram Ads</span>
                    <span className="text-xl font-black text-fuchsia-900">{adStats.instagram}</span>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase font-black text-emerald-700 block">Direct / Organic</span>
                    <span className="text-xl font-black text-emerald-900">{adStats.direct}</span>
                  </div>
                </div>

                {/* Ad URL Recommendation Box */}
                <div className="bg-slate-900 text-white rounded-xl p-4 text-xs space-y-2.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Recommended Ad Links for Meta Ads Manager:</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    In your Facebook &amp; Instagram Ads destination URL, use these parameters so every registration is automatically categorized:
                  </p>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="bg-black/40 p-2 rounded border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-blue-300 font-bold">Facebook Ad URL:</span>
                      <span className="text-slate-300 select-all break-all">https://sarvsewabharat.org/passes?utm_source=facebook&amp;utm_medium=paid</span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-fuchsia-300 font-bold">Instagram Ad URL:</span>
                      <span className="text-slate-300 select-all break-all">https://sarvsewabharat.org/passes?utm_source=instagram&amp;utm_medium=paid</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                    * Note: Meta automatically attaches <code className="text-amber-300">fbclid</code> to clicks, which our tracker automatically detects even without UTM parameters.
                  </div>
                </div>

                {/* Recent Recorded Passes List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-xs uppercase text-slate-800">
                      Recent Passes Recorded ({adStats.records.length})
                    </h4>
                    {adStats.records.length > 0 && (
                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    )}
                  </div>

                  {adStats.records.length === 0 ? (
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                      No passes registered from this device yet. As users register from your ads, they will automatically appear here with their detected source.
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-black">
                          <tr>
                            <th className="p-2.5">Pass Code</th>
                            <th className="p-2.5">Name</th>
                            <th className="p-2.5">Passes</th>
                            <th className="p-2.5">Ad Source</th>
                            <th className="p-2.5">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {adStats.records.slice(0, 50).map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="p-2.5 font-mono font-bold text-slate-900">{r.pass_code}</td>
                              <td className="p-2.5 text-slate-800">{r.name}</td>
                              <td className="p-2.5 text-slate-600">{r.quantity}</td>
                              <td className="p-2.5">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                    (r.source || '').toLowerCase().includes('facebook')
                                      ? 'bg-blue-100 text-blue-800'
                                      : (r.source || '').toLowerCase().includes('instagram')
                                      ? 'bg-fuchsia-100 text-fuchsia-800'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {r.source || 'Direct'}
                                </span>
                              </td>
                              <td className="p-2.5 text-slate-400 text-[10px]">
                                {new Date(r.timestamp).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-2xl">
                <span className="text-[11px] text-slate-500">
                  Data stored locally and submitted with each pass registration.
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdStatsModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
