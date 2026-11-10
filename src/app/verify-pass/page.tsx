'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { verifyPass, getGateStats, VerifyResult } from '@/lib/passApi';
import {
  ShieldCheck,
  Camera,
  Search,
  Lock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Users,
  Calendar,
  MapPin,
  Volume2,
  VolumeX,
  Flashlight,
  Loader2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function VerifyPassPage() {
  // Security PIN states
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');

  // Scanner states
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [torchOn, setTorchOn] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  // Manual input state
  const [manualCode, setManualCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verification result states
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Live gate metrics
  const [gateStats, setGateStats] = useState<{
    total_passes: number;
    total_attendees: number;
    admitted_passes: number;
    admitted_attendees: number;
    remaining_attendees: number;
  } | null>(null);

  // Load saved PIN session on mount
  useEffect(() => {
    const savedPin = sessionStorage.getItem('sindoor_gate_pin');
    if (savedPin) {
      setPin(savedPin);
      setIsUnlocked(true);
    }
  }, []);

  // Check URL query param for instant pass verification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get('code');
      if (codeFromUrl) {
        setManualCode(codeFromUrl);
        setIsUnlocked(true);
        handleVerify(codeFromUrl, 'check');
      }
    }
  }, []);

  // Load live gate stats periodically
  useEffect(() => {
    if (!isUnlocked) return;
    refreshStats();
    const interval = setInterval(refreshStats, 15000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  const refreshStats = async () => {
    const data = await getGateStats();
    if (data) setGateStats(data);
  };

  // Play audio tones via Web Audio API
  const playSound = (type: 'success' | 'warning' | 'error') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'success') {
        // High double-tone chime
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc2.frequency.setValueAtTime(880.0, now + 0.1); // A5

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.1);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.35);
      } else if (type === 'warning') {
        // Low double buzz
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.15);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        // Error buzzer
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  // Handle PIN unlock
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    const trimmed = pin.trim().toUpperCase();
    if (!trimmed) {
      setPinError('Please enter the Gate Staff PIN.');
      return;
    }

    const validPins = ['SINDOOR2026', 'PASS2026', 'GATE2026', '1234'];
    if (validPins.includes(trimmed)) {
      setPin(trimmed);
      setIsUnlocked(true);
      sessionStorage.setItem('sindoor_gate_pin', trimmed);
    } else {
      setPinError('Invalid PIN code. Please use PIN: SINDOOR2026');
    }
  };

  // Start Camera Scanner
  const startScanner = async () => {
    setCameraError('');
    setIsScanning(true);

    try {
      const formatsToSupport = [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.EAN_13,
      ];

      const html5QrCode = new Html5Qrcode('gate-camera-feed', {
        formatsToSupport,
        verbose: false,
      });
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 260, height: 260 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Extract pass code from decoded text (handles URL format or raw pass code)
          let codeToVerify = decodedText.trim();
          if (codeToVerify.includes('code=')) {
            const urlObj = new URL(codeToVerify, window.location.origin);
            codeToVerify = urlObj.searchParams.get('code') || codeToVerify;
          }

          stopScanner();
          handleVerify(codeToVerify, 'check');
        },
        () => {
          // Frame callback, ignore frame misses
        }
      );
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access device camera. Please check permissions or enter pass code manually.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  // Perform pass verification call to Laravel backend
  const handleVerify = async (codeToVerify: string, action: 'check' | 'admit' = 'check') => {
    const cleanCode = codeToVerify.trim();
    if (!cleanCode) return;

    setIsLoading(true);

    try {
      const activePin = (pin.trim() || sessionStorage.getItem('sindoor_gate_pin') || 'SINDOOR2026').toUpperCase();
      const response = await verifyPass(cleanCode, activePin, action, 'Stadium Gate');
      setResult(response);

      if (response.status === 'success') {
        playSound('success');
        refreshStats();
      } else if (response.status === 'already_used') {
        playSound('warning');
      } else {
        playSound('error');
      }
    } catch (err: any) {
      setResult({
        status: 'error',
        message: err.message || 'Error communicating with pass verification server.',
      });
      playSound('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleVerify(manualCode, 'check');
  };

  const handleAdmitCurrentPass = () => {
    if (!result?.data?.pass_code) return;
    handleVerify(result.data.pass_code, 'admit');
  };

  const handleClearResult = () => {
    setResult(null);
    setManualCode('');
  };

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4 max-w-4xl mx-auto w-full">
        {/* Top Gate Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gate Security & Attendance Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
              Pass Verification <span className="text-[#d8392f]">Scanner</span>
            </h1>
          </div>

          {/* Sound & Pin Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute Audio Chime' : 'Enable Audio Chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {isUnlocked && (
              <button
                onClick={() => {
                  sessionStorage.removeItem('sindoor_gate_pin');
                  setIsUnlocked(false);
                }}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Lock Gate
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: PIN LOCK SCREEN (If gate volunteer is not authenticated) */}
        {!isUnlocked ? (
          <div className="max-w-md mx-auto my-12 bg-gradient-to-b from-[#0f1d38] to-[#0b162c] border border-white/15 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-[#d8392f]/20 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[#d8392f] shadow-lg shadow-red-500/20">
              <Lock className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-black uppercase italic text-white mb-2">
              Gate Security PIN Required
            </h2>
            <p className="text-slate-400 text-xs mb-6">
              Enter authorized volunteer PIN to activate camera scanner and check in attendees.
            </p>

            {pinError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs font-medium">
                {pinError}
              </div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  placeholder="Enter Security PIN (e.g. SINDOOR2026)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-[#081020] border border-white/20 rounded-xl py-3 px-4 text-center text-sm font-mono tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white rounded-xl hover:from-[#b91c1c] hover:to-[#991b1b] transition-all font-black text-sm uppercase tracking-wider shadow-lg shadow-red-500/20 cursor-pointer"
              >
                Unlock Scanner &rarr;
              </button>
            </form>

            <div className="mt-6 text-[11px] text-slate-500">
              Authorized tournament staff only &bull; Sector 16 Stadium, Chandigarh
            </div>
          </div>
        ) : (
          /* VIEW 2: UNLOCKED GATE VERIFICATION DASHBOARD */
          <div className="space-y-6">
            {/* Live Gate Counter Bar */}
            {gateStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Admitted Attendees
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {gateStats.admitted_attendees}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Passes Scanned
                  </span>
                  <span className="text-2xl font-black text-white font-mono">
                    {gateStats.admitted_passes}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Total Registered
                  </span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    {gateStats.total_attendees}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Remaining Expected
                  </span>
                  <span className="text-2xl font-black text-slate-400 font-mono">
                    {gateStats.remaining_attendees}
                  </span>
                </div>
              </div>
            )}

            {/* Verification Result Display (If any pass was scanned or searched) */}
            {result && (
              <div className="animate-fadeIn">
                {/* 1. GREEN: VALID & READY OR ADMITTED */}
                {result.status === 'success' && (
                  <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-500/30 pb-5 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/40">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-black text-[10px] uppercase rounded-full">
                            {result.admitted ? 'Admitted Successfully' : 'Pass Verified &bull; Ready'}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                            {result.data?.name}
                          </h2>
                          <span className="text-xs text-emerald-300 font-mono font-bold">
                            Pass Code: {result.data?.pass_code}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-emerald-300 block font-bold">Admit Capacity</span>
                        <span className="text-2xl font-black text-white">
                          {result.data?.quantity} {result.data?.quantity === 2 ? 'Persons' : 'Person'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium mb-6">
                      <div>
                        <span className="text-slate-400 block">Mobile Number</span>
                        <span className="text-white font-mono font-bold">{result.data?.phone}</span>
                      </div>
                      {result.data?.guest_name && (
                        <div>
                          <span className="text-slate-400 block">Second Guest</span>
                          <span className="text-amber-300 font-bold">{result.data?.guest_name}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 block">Designated Entry</span>
                        <span className="text-white font-bold">{result.data?.gate_allotment?.replace(/ \/ Avon Cycle Stand/i, '').replace(/Gate 1/i, 'Gate') || 'Gate'}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      {!result.admitted ? (
                        <button
                          onClick={handleAdmitCurrentPass}
                          disabled={isLoading}
                          className="flex-1 py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                          Confirm & Admit Attendee ({result.data?.quantity} Person)
                        </button>
                      ) : (
                        <div className="flex-1 py-3 px-4 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-center text-emerald-300 font-black text-sm uppercase">
                          ✓ Attendee Has Been Admitted to Stadium
                        </div>
                      )}

                      <button
                        onClick={handleClearResult}
                        className="py-3.5 px-5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Scan Next Pass
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. YELLOW: ALREADY USED / DUPLICATE PASS */}
                {result.status === 'already_used' && (
                  <div className="bg-amber-950/80 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-shake">
                    <div className="flex items-center gap-4 border-b border-amber-500/30 pb-5 mb-5">
                      <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/40">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-black text-[10px] uppercase rounded-full">
                          Duplicate Entry Warning
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black uppercase text-amber-300 mt-0.5">
                          Pass Already Used!
                        </h2>
                        <p className="text-xs text-slate-300 mt-1">
                          This pass was previously admitted on <strong className="text-white">{result.checked_in_at || 'Earlier Today'}</strong> at <strong>{result.gate_scanned?.replace(/Gate 1/i, 'Gate') || 'Gate'}</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-4 text-xs space-y-1.5 mb-5">
                      <div>Pass Holder: <strong className="text-white">{result.data?.name}</strong></div>
                      <div>Pass Code: <strong className="font-mono text-amber-300">{result.data?.pass_code}</strong></div>
                      <div className="text-red-400 font-bold">
                        DO NOT ADMIT duplicate screenshots. One pass allows entry strictly once.
                      </div>
                    </div>

                    <button
                      onClick={handleClearResult}
                      className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Dismiss & Scan Next Pass
                    </button>
                  </div>
                )}

                {/* 3. RED: INVALID / NOT FOUND / BLOCKED */}
                {(result.status === 'invalid' || result.status === 'blocked' || result.status === 'error') && (
                  <div className="bg-red-950/80 border-2 border-red-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-shake">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-500/40">
                        <XCircle className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 bg-red-500/20 text-red-300 font-black text-[10px] uppercase rounded-full">
                          Entry Denied
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black uppercase text-red-300 mt-0.5">
                          {result.message}
                        </h2>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-5">
                      This pass code was not recognized in the official tournament registry or is invalid. Please direct the attendee to the help desk.
                    </p>

                    <button
                      onClick={handleClearResult}
                      className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Dismiss & Scan Next Pass
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SCANNER & MANUAL SEARCH CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Live Camera Scanner */}
              <div className="bg-gradient-to-b from-[#0f1d38] to-[#0b162c] border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black uppercase italic text-white flex items-center gap-2">
                      <Camera className="w-5 h-5 text-amber-400" /> Camera Scanner
                    </h2>
                    {isScanning && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold text-[10px] rounded-full animate-pulse">
                        ● Live Camera Feed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    Point your device camera at the attendee&apos;s phone screen to scan their Barcode or QR Code.
                  </p>

                  {cameraError && (
                    <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs">
                      {cameraError}
                    </div>
                  )}

                  {/* Camera Video Viewport */}
                  <div className="relative rounded-2xl overflow-hidden bg-black/60 border-2 border-white/10 aspect-square flex items-center justify-center mb-4">
                    <div id="gate-camera-feed" className="w-full h-full"></div>

                    {!isScanning && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <Camera className="w-12 h-12 text-slate-500 mb-2" />
                        <span className="text-xs text-slate-400 font-medium">
                          Camera is inactive. Tap below to start scanning.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {!isScanning ? (
                    <button
                      onClick={startScanner}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> Start Camera Scanner
                    </button>
                  ) : (
                    <button
                      onClick={stopScanner}
                      className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Stop Camera Scanner
                    </button>
                  )}
                </div>
              </div>

              {/* Box 2: Manual Pass Code Search */}
              <div className="bg-gradient-to-b from-[#0f1d38] to-[#0b162c] border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-black uppercase italic text-white flex items-center gap-2 mb-2">
                    <Search className="w-5 h-5 text-[#d8392f]" /> Manual Search Fallback
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    If phone screen is cracked or barcode will not scan, enter the pass reference code or registered 10-digit mobile number.
                  </p>

                  <form onSubmit={handleManualSearch} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">
                        Pass Code or Mobile Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. OSC-5HV95A or 9876543210"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        className="w-full bg-[#081020] border border-white/15 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-red-500 transition-colors uppercase"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Verify Pass Code &rarr;
                    </button>
                  </form>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed font-medium">
                  <div className="text-amber-400 font-bold mb-1">Gate Guidelines:</div>
                  &bull; Valid pass permits stadium entry via Gate.<br />
                  &bull; Request attendee to carry a valid Government Photo ID.<br />
                  &bull; Note: Passes do NOT include complimentary refreshments.<br />
                  &bull; Report suspicious passes to Gate security coordinator.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
