"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Trophy, ArrowRight, Download, Users, Phone, Calendar, ShieldCheck, Home } from 'lucide-react';
import Link from 'next/link';
import { teamLogos } from '@/data/teamsData';

interface RegistrationData {
  txnid: string;
  team_name: string;
  division: string;
  captain_name: string;
  captain_phone: string;
  amount: string;
  payment_status: string;
  easebuzz_id?: string;
  created_at: string;
  players: Array<{
    player_number: number;
    name: string;
    jersey_number: string;
    tshirt_size: string;
    lower_size: string;
    is_captain: boolean;
    is_vice_captain: boolean;
  }>;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid');
  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!txnid) {
      setLoading(false);
      return;
    }

    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
    const baseApiUrl = rawApiUrl.replace(/\/+$/, '');
    fetch(`${baseApiUrl}/tournament/status/${txnid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'success') {
          setData(res.data);
        } else {
          setError(res.message || 'Could not fetch registration details.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Network error fetching registration receipt.');
      })
      .finally(() => setLoading(false));
  }, [txnid]);

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 pb-20">
      <Header />

      <main className="container mx-auto px-4 pt-10 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>

          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="text-emerald-600 font-black uppercase text-xs tracking-widest block mb-2">
            Payment & Registration Confirmed
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase italic text-[#0b162c] tracking-tight mb-3">
            Welcome to <span className="text-[#d8392f]">Operation Sindoor</span> Cup!
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto font-medium">
            Your team registration has been officially recorded and fee of <strong className="text-slate-900">₹4,999</strong> has been verified.
          </p>

          {/* Quick Summary Badge */}
          <div className="my-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase block">Transaction Reference</span>
                <span className="font-mono font-bold text-slate-800 text-base">{txnid || 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase block">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full uppercase mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Successful
                </span>
              </div>
              {data && (
                <>
                  <div className="flex items-center gap-3">
                    {teamLogos[data.team_name?.toLowerCase().replace(/\s+/g, '-')] && (
                      <div className="w-12 h-12 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center border border-slate-200 shadow-sm">
                        <Image
                          src={teamLogos[data.team_name.toLowerCase().replace(/\s+/g, '-')]}
                          alt={data.team_name}
                          width={44}
                          height={44}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase block">Team Name</span>
                      <span className="font-black text-[#0b162c] text-lg uppercase italic">{data.team_name}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase block">Division & Captain</span>
                    <span className="font-semibold text-slate-700 capitalize">
                      {data.division} Division • {data.captain_name} ({data.captain_phone})
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Player Roster Accordion / Preview if loaded */}
          {data && data.players && (
            <div className="mb-8 text-left max-w-2xl mx-auto border-t border-slate-200 pt-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d8392f]" /> Confirmed 12-Player Squad & Kit Sizes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {data.players.map((p) => (
                  <div key={p.player_number} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">
                        #{p.player_number} {p.name}
                        {p.is_captain && <span className="ml-1 text-[10px] text-red-600 font-black">(C)</span>}
                        {p.is_vice_captain && <span className="ml-1 text-[10px] text-blue-600 font-black">(VC)</span>}
                      </span>
                      <span className="block text-[11px] text-slate-500">Jersey #{p.jersey_number || 'N/A'}</span>
                    </div>
                    <span className="bg-white px-2 py-1 rounded text-slate-600 font-semibold border border-slate-200">
                      T: {p.tshirt_size || '-'} | L: {p.lower_size || '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guidelines Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left max-w-2xl mx-auto mb-8 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 text-xs">
              <Calendar className="w-4 h-4" /> Next Steps & Match Day Guidelines
            </div>
            <p>1. Custom jerseys will be distributed during the pre-tournament captains meeting.</p>
            <p>2. Report strictly <strong className="font-bold">60 minutes prior</strong> to your scheduled match at Sector 16 Cricket Stadium, Chandigarh.</p>
            <p>3. For any queries or adjustments, contact our Official Helpline <strong className="font-bold">+91 90563 33759</strong> / Vishal <strong className="font-bold">+91 84374 09211</strong> or email <strong className="font-bold">helposcricketcup@gmail.com</strong>.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" /> Print / Save Confirmation
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-md"
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

export default function RegistrationSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-slate-600">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
