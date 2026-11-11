'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { Download, Printer, Share2, ShieldCheck, CheckCircle2, MapPin, Calendar, Users, Sparkles, Loader2, Ticket } from 'lucide-react';
import { TournamentPassData, getApiBaseUrl } from '@/lib/passApi';
import { downloadPassPdf } from '@/lib/passPdfGenerator';

interface PassCardProps {
  pass: TournamentPassData;
  onNewRegistration?: () => void;
}

export default function PassCard({ pass, onNewRegistration }: PassCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sarvsewabharat.org';
    const verifyUrl = `${origin}/verify-pass?code=${encodeURIComponent(pass.pass_code)}`;

    QRCode.toDataURL(verifyUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));

    if (barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, pass.pass_code, {
          format: 'CODE128',
          lineColor: '#000000',
          width: 2,
          height: 48,
          displayValue: true,
          fontSize: 13,
          font: 'monospace',
          textMargin: 3,
        });
      } catch (err) {
        console.error('Barcode generation error:', err);
      }
    }
  }, [pass.pass_code]);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      // 1. Try to fetch the single unified server PDF pass first
      try {
        const baseUrl = getApiBaseUrl();
        const serverPdfUrl = `${baseUrl}/tournament/file/passes/pass_${pass.pass_code}.pdf`;
        const res = await fetch(serverPdfUrl, { method: 'HEAD' });
        if (res.ok) {
          const link = document.createElement('a');
          link.href = serverPdfUrl;
          link.download = `Operation_Sindoor_Match_Pass_${pass.pass_code}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      } catch {
        // Fall back to client generator if server route is unreachable
      }

      // 2. Client-side vector fallback
      await downloadPassPdf(pass, qrDataUrl || undefined);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🏏 *Operation Sindoor Cricket Cup 2026 - Official Match Pass*\n` +
      `👤 *Name:* ${pass.name}\n` +
      `🎟️ *Pass Code:* ${pass.pass_code}\n` +
      `👥 *Attendees:* ${pass.quantity} Person(s)\n` +
      `🏟️ *Venue:* Sector 16 Cricket Stadium, Chandigarh\n` +
      `✨ *Match Access:* All Tournament Matches (Free Entry)\n\n` +
      `Show this digital pass at the stadium Gate for entry.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      {/* Flat Success Notification */}
      <div className="bg-white border-l-4 border-emerald-500 rounded-r-xl border border-slate-200/80 p-5 mb-6 shadow-sm flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-black uppercase text-[#0b162c] tracking-wide">
            Digital Match Pass Confirmed!
          </h3>
          <p className="text-slate-600 text-xs mt-0.5">
            Your pass code is <strong className="text-[#d8392f] font-mono text-sm">{pass.pass_code}</strong>. Save this pass to your phone or download the PDF ticket below to present at the stadium Gate.
          </p>
        </div>
      </div>

      {/* Main Flat Pass Card Container */}
      <div
        id="printable-match-pass"
        className="bg-[#121c2e] border border-slate-700 rounded-xl overflow-hidden text-white"
      >
        {/* Top Crimson Accent Strip */}
        <div className="h-2 bg-[#d8392f] w-full"></div>

        {/* Card Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#1a273e] border border-slate-700 rounded-lg p-1.5 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Operation Sindoor Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  Official Entry Pass
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase text-white leading-tight">
                  Operation Sindoor
                </h2>
                <span className="text-xs font-bold text-[#d8392f] uppercase tracking-wider block">
                  Cricket Cup 2026 &bull; Season 2
                </span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-700 sm:pl-5">
              <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-2.5 py-1 rounded inline-block">
                Free Spectator Pass
              </span>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                SARV SEWA BHARAT
              </div>
            </div>
          </div>
        </div>

        {/* Venue & Access Bar */}
        <div className="bg-[#1a273e] border-b border-slate-700 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-200">
          <div className="flex items-center gap-1.5 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-[#d8392f]" />
            <span>Sector 16 Cricket Stadium, Chandigarh</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{pass.match_access}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Pass Holder Name
              </span>
              <span className="text-base font-black text-white block mt-0.5">
                {pass.name}
              </span>
              <span className="text-xs text-slate-400 font-mono">{pass.phone}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Admit Persons
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase rounded">
                  {pass.quantity} {pass.quantity === 2 ? 'Persons' : 'Person'}
                </span>
                {pass.guest_name && (
                  <span className="text-xs text-slate-300 font-medium">
                    (+ {pass.guest_name})
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Tournament Access
              </span>
              <span className="text-sm font-bold text-amber-400 block mt-0.5">
                {pass.match_access || 'All Tournament Matches'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Pass Reference Code
              </span>
              <span className="text-base font-black font-mono tracking-wider text-white block mt-0.5 bg-[#1a273e] border border-slate-700 px-2 py-0.5 rounded inline-block">
                {pass.pass_code}
              </span>
            </div>
          </div>

          {/* Official Sponsor Notice Strip */}
          <div className="bg-[#1a273e] border border-slate-700 rounded-lg px-4 py-2.5 mb-5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-400">Official Sponsor:</span>
                <span className="font-bold text-white">Nik Baker&apos;s</span>
              </div>
              <span className="text-[10px] text-amber-400 font-bold uppercase">
                Free Spectator Admission
              </span>
            </div>
            <div className="text-[10px] text-slate-400 border-t border-slate-700/60 pt-1.5">
              Notice: Free match pass provides stadium entry only. Complimentary refreshments are not included.
            </div>
          </div>

          {/* Clean Flat Divider */}
          <div className="border-t border-dashed border-slate-700 my-5"></div>

          {/* Flat QR & Barcode Section */}
          <div className="bg-white rounded-lg p-5 text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center shrink-0">
              <div className="p-1 border border-slate-200 rounded">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Match Pass QR Code" className="w-32 h-32 sm:w-36 sm:h-36" />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center text-xs text-slate-400">
                    Generating QR...
                  </div>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase text-slate-600 mt-1.5 tracking-wider">
                Scan at Gate Camera
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Official Entry Barcode
              </span>
              <div className="bg-slate-50 p-2 rounded border border-slate-200 w-full overflow-hidden flex justify-center">
                <svg ref={barcodeRef} className="max-w-full"></svg>
              </div>

              <div className="mt-2 text-[11px] text-slate-600 leading-relaxed font-medium">
                <div className="flex items-center gap-1 text-emerald-700 font-bold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Single-Entry Pass</span>
                </div>
                Present this screen to security volunteers at the Gate. Please carry a valid photo ID.
              </div>
            </div>
          </div>

          {/* Tournament Helpline & Support Contacts */}
          <div className="bg-[#1a273e] border border-slate-700/80 rounded-lg p-3.5 mt-4 text-xs">
            <span className="text-[10px] font-black uppercase text-amber-400 block mb-1 tracking-wider">
              Tournament Helpline &amp; Inquiries:
            </span>
            <div className="text-slate-200 font-bold text-xs flex flex-wrap items-center gap-x-3 gap-y-1">
              <a href="tel:+919056333759" className="hover:text-amber-400 transition-colors">+91 90563 33759 (Helpline)</a>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <a href="tel:+918437409211" className="hover:text-amber-400 transition-colors">+91 84374 09211 (Vishal)</a>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <a href="tel:+919855109159" className="hover:text-amber-400 transition-colors">+91 98551 09159 (Karan Sama)</a>
            </div>
            <div className="text-slate-400 text-[11px] mt-1.5 flex flex-wrap items-center gap-2">
              <span>Email:</span>
              <a href="mailto:helposcricketcup@gmail.com" className="text-slate-300 underline hover:text-white font-mono">
                helposcricketcup@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-[#1a273e] border-t border-slate-700 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Tribute to Indian Armed Forces &bull; Sarv Sewa Sashktikarn Sangthan</span>
          <span className="font-mono text-slate-400">Issued: {new Date().toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      {/* Flat Action Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="flex-1 min-w-[180px] py-3 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-black text-xs sm:text-sm uppercase tracking-wider border-b-2 border-amber-600 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isGeneratingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Download PDF Ticket
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="py-3 px-4 bg-[#1a273e] hover:bg-[#20314f] text-white border border-slate-700 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Print
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" /> WhatsApp
        </button>
      </div>

      {onNewRegistration && (
        <div className="text-center mt-5">
          <button
            onClick={onNewRegistration}
            className="text-xs text-slate-600 hover:text-slate-950 font-bold underline underline-offset-4 cursor-pointer"
          >
            &larr; Register another pass with a different mobile number
          </button>
        </div>
      )}
    </div>
  );
}
