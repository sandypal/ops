'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Award,
  Calendar,
  ZoomIn,
  X,
  ExternalLink,
  Quote,
  CheckCircle2,
  Building2,
  FileText,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { dignitaryMessages, DignitaryMessage } from '@/data/dignitaryMessages';

export default function DignitaryMessagesSection() {
  const [selectedLetterId, setSelectedLetterId] = useState<string>(dignitaryMessages[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState<DignitaryMessage | null>(null);

  const activeMessage = dignitaryMessages.find((m) => m.id === selectedLetterId) || dignitaryMessages[0];

  const handleOpenModal = (message: DignitaryMessage) => {
    setActiveModalImage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveModalImage(null);
  };

  if (!activeMessage) return null;

  return (
    <section id="messages" className="py-14 sm:py-18 md:py-24 bg-gradient-to-b from-[#f8fafc] via-white to-slate-50 border-b border-slate-200 relative overflow-hidden">
      {/* Background Subtle State Watermarks / Radial Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b-2 border-slate-200/80 pb-4 sm:pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 text-amber-900 text-[11px] sm:text-xs font-black uppercase tracking-widest mb-2.5 sm:mb-3 border border-amber-300 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Patron Blessings • शुभकामना सन्देश</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-[#0b162c]">
              DIGNITARY <span className="text-[#d8392f]">MESSAGES</span> &amp; COMMENDATIONS
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 font-medium max-w-2xl leading-relaxed">
              Official messages of appreciation and encouragement from State Leadership, Government Dignitaries, and Patrons endorsing Operation Sindoor Cricket Cup 2.0.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Official Government Commendation</span>
          </div>
        </div>

        {/* Tab Selector: Appears if multiple letters exist, ready for upcoming letters */}
        {dignitaryMessages.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 [scrollbar-width:none]">
            {dignitaryMessages.map((msg) => {
              const isSelected = msg.id === activeMessage.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setSelectedLetterId(msg.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs ${
                    isSelected
                      ? 'bg-[#0b162c] text-white shadow-md'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{msg.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {msg.designation.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Showcase Split Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Official Citation, Quotes & Message (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
              <div>
                {/* Dignitary Authority Badge & Date Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-50 text-[#d8392f] border border-red-200 text-[11px] font-black uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d8392f]" />
                    <span>{activeMessage.badge}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dated: {activeMessage.date}</span>
                  </div>
                </div>

                {/* Dignitary Name & Official Designation */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0b162c] tracking-tight uppercase">
                      {activeMessage.name}
                    </h3>
                    {activeMessage.nameHindi && (
                      <span className="text-lg sm:text-xl font-bold text-[#d8392f]">
                        ({activeMessage.nameHindi})
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-700 mt-1">
                    {activeMessage.designation}
                    {activeMessage.designationHindi && (
                      <span className="text-slate-500 ml-1.5 font-medium">
                        • {activeMessage.designationHindi}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {activeMessage.office}
                  </p>
                </div>

                {/* Highlighted Quote Callout */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50/60 border-2 border-amber-300 shadow-xs relative mb-6">
                  <Quote className="w-8 h-8 text-amber-500/30 absolute top-3 right-3 pointer-events-none" />
                  <p className="text-slate-900 text-sm sm:text-base md:text-[17px] font-semibold italic leading-relaxed relative z-10">
                    &ldquo;{activeMessage.highlightQuote}&rdquo;
                  </p>
                </div>

                {/* Excerpt Body Paragraphs */}
                <div className="space-y-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {activeMessage.paragraphs.slice(0, 3).map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Signatory Verification */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authenticated Official Letter: <strong className="text-slate-900 font-extrabold">{activeMessage.signatory}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(activeMessage)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0b162c] hover:bg-[#112240] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span>Inspect Official Letter</span>
                </button>
              </div>
            </div>

            {/* Right Column: Framed Archival Letterhead Document (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-6 sm:p-8 flex flex-col items-center justify-center relative">
              <div
                onClick={() => handleOpenModal(activeMessage)}
                className="w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-slate-300/80 hover:border-[#d8392f] hover:shadow-2xl transition-all duration-300 cursor-pointer group relative"
              >
                {/* Click-to-Zoom Hover Overlay */}
                <div className="absolute inset-0 bg-[#0b162c]/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center z-20 backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mb-2">
                    <ZoomIn className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider">Click to View Full-Size Letter</span>
                  <span className="text-xs text-slate-300 mt-1">High-Resolution Official Letterhead</span>
                </div>

                {/* Letter Image */}
                <div className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <Image
                    src={activeMessage.image}
                    alt={`${activeMessage.name} - Official Letter`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Document Matting Footer */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1 text-slate-700">
                    <FileText className="w-3.5 h-3.5 text-[#d8392f]" />
                    <span>Official Letterhead</span>
                  </span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold uppercase">
                    Dated {activeMessage.date}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium text-center mt-3">
                Click letter to enlarge and examine official seal, signature &amp; full message text
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Document Lightbox Modal */}
      {isModalOpen && activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#0b162c] text-white flex items-center justify-between gap-3 border-b border-slate-700">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-sm sm:text-base uppercase tracking-tight truncate text-white">
                    {activeModalImage.name} • {activeModalImage.designation}
                  </h4>
                  <span className="text-[11px] text-slate-400 block truncate">
                    Official Message • Dated {activeModalImage.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeModalImage.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100 flex items-center justify-center">
              <div className="relative w-full max-w-2xl bg-white p-2 rounded-xl shadow-lg border border-slate-200">
                <div className="relative aspect-[3/4.2] w-full">
                  <Image
                    src={activeModalImage.image}
                    alt={`${activeModalImage.name} - Full Letter`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
              <span className="font-medium text-slate-700">
                Operation Sindoor Cricket Cup 2.0 • Commendation Document Archive
              </span>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

