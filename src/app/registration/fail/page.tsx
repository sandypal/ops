"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle, RefreshCw, Phone, Home } from 'lucide-react';
import Link from 'next/link';

function FailContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid');

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 pb-20">
      <Header />

      <main className="container mx-auto px-4 pt-10 max-w-2xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-500 to-red-600"></div>

          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <AlertTriangle className="w-12 h-12" />
          </div>

          <span className="text-rose-600 font-black uppercase text-xs tracking-widest block mb-2">
            Payment Incomplete
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic text-[#0b162c] tracking-tight mb-3">
            Registration Payment Failed
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto font-medium mb-6">
            We could not complete your tournament registration payment. Any debited amount from your bank will be automatically refunded by Easebuzz within 3–5 working days.
          </p>

          {txnid && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-600 mb-6 max-w-md mx-auto">
              Reference ID: <strong className="text-slate-900">{txnid}</strong>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-8 text-xs text-slate-600 space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-800 block">Need Help?</span>
            <p>If money was deducted from your account or you faced a gateway timeout, please contact our tournament helpline:</p>
            <div className="pt-1 space-y-1">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <Phone className="w-4 h-4 text-[#d8392f]" />
                <span>Helpline: </span>
                <a href="tel:+919056333759" className="text-[#d8392f] hover:underline">+91 90563 33759</a>
              </div>
              <div className="text-xs text-slate-600 pl-6">
                <span>Email: </span>
                <a href="mailto:helposcricketcup@gmail.com" className="text-slate-800 hover:underline font-semibold">helposcricketcup@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/registration"
              className="px-6 py-3 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"
            >
              <RefreshCw className="w-4 h-4" /> Try Registration Again
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function RegistrationFailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-slate-600">Loading...</div>}>
      <FailContent />
    </Suspense>
  );
}
