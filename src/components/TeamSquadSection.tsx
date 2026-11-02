'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shirt, Clock, Sparkles, CheckCircle2, ShieldCheck, UserCheck, Shield } from 'lucide-react';
import { SquadPlayer } from '@/data/teamsData';

export interface RegisteredPlayer {
  id: number;
  player_number: number;
  jersey_number: string;
  name: string;
  role: string;
  is_captain: boolean;
  is_vice_captain: boolean;
  phone?: string | null;
  age?: number | null;
  blood_group?: string | null;
  tshirt_size?: string | null;
  lower_size?: string | null;
  student_id_document?: string | null;
  photo?: string | null;
}

export interface InitialSquadData {
  is_registered: boolean;
  registration?: {
    id?: number;
    captain_name?: string;
    captain_phone?: string;
    captain_email?: string;
    vice_captain_name?: string;
    status?: string;
  } | null;
  players?: RegisteredPlayer[];
  total_players?: number;
}

interface TeamSquadSectionProps {
  slug: string;
  teamName: string;
  teamLogo?: string;
  fallbackSquad: SquadPlayer[];
  initialData?: InitialSquadData | null;
}

export default function TeamSquadSection({
  slug,
  teamName,
  teamLogo,
  fallbackSquad,
  initialData,
}: TeamSquadSectionProps) {
  const [isRegistered, setIsRegistered] = useState<boolean>(
    Boolean(
      initialData?.is_registered &&
      initialData?.registration &&
      initialData?.players &&
      initialData.players.length > 0
    )
  );
  const [players, setPlayers] = useState<RegisteredPlayer[]>(
    initialData?.players || []
  );
  const [captainName, setCaptainName] = useState<string>(
    initialData?.registration?.captain_name || ''
  );
  const [viceCaptainName, setViceCaptainName] = useState<string>(
    initialData?.registration?.vice_captain_name || ''
  );
  const [, setIsLoading] = useState<boolean>(!initialData);

  useEffect(() => {
    let isMounted = true;

    async function fetchSquadData() {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
      const baseApiUrl = rawApiUrl.replace(/\/+$/, '');

      try {
        const res = await fetch(`${baseApiUrl}/tournament/team/${slug}/squad`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        if (res.ok) {
          const json = await res.json();
          if (json && json.status === 'success' && json.data) {
            if (!isMounted) return;

            const data = json.data;
            const isConfirmed = Boolean(
              data.is_registered &&
              data.registration &&
              Array.isArray(data.players) &&
              data.players.length > 0
            );

            if (isConfirmed) {
              setIsRegistered(true);
              setPlayers(data.players);
              setCaptainName(data.registration?.captain_name || '');
              setViceCaptainName(data.registration?.vice_captain_name || '');
            } else {
              setIsRegistered(false);
              setPlayers([]);
            }
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch squad from live API:', err);
      }

      if (isMounted) {
        setIsLoading(false);
      }
    }

    fetchSquadData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <div id="squad-roster" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
      
      {/* Sidebar Header */}
      <div className="bg-[#0b162c] text-white p-5 border-b-2 border-[#d8392f] flex items-center gap-3.5">
        {teamLogo && (
          <div className="w-13 h-13 bg-white/95 rounded-2xl p-1.5 shadow-md flex items-center justify-center shrink-0 border border-white/40">
            <Image src={teamLogo} alt="" width={52} height={52} className="w-full h-full object-contain" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-[#d8392f]" />
              Official Squad
            </span>

            {isRegistered ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified Squad
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-3 h-3" />
                Coming Soon
              </span>
            )}
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-white truncate">
            {teamName} Roster
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {isRegistered ? `${players.length} Certified Players Registered` : '12 certified slots allocated.'}
          </p>
        </div>
      </div>

      {/* Dynamic Status / Announcement Banner */}
      {isRegistered ? (
        <div className="p-4 bg-emerald-50/90 border-b border-emerald-100 text-xs text-emerald-950 leading-relaxed">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Registered Official Roster
            </p>
            <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
              {players.length} Players Confirmed
            </span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-snug">
            {captainName ? (
              <>
                Led by Captain <strong className="font-bold text-emerald-950">{captainName}</strong>
                {viceCaptainName ? <> & Vice Captain <strong className="font-bold text-emerald-950">{viceCaptainName}</strong></> : ''}.
              </>
            ) : (
              'This team has completed official registration and player submission.'
            )}
          </p>
        </div>
      ) : (
        <div className="p-4 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-900 leading-relaxed">
          <p className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            Names Revealed Post-Registration
          </p>
          <p className="text-[11px] text-amber-800">
            Official player names and assigned jersey numbers (#01 to #12) will be published here once registration and player verification complete.
          </p>
        </div>
      )}

      {/* 12-Slot Roster List */}
      <div className="p-4 divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
        {isRegistered && players.length > 0 ? (
          // Registered Players from Database
          players.map((player) => (
            <div
              key={player.id || player.player_number}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs group hover:bg-slate-50/60 rounded-lg px-1 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Player Profile Photo Avatar or Jersey Badge */}
                {player.photo ? (
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 shrink-0 shadow-2xs bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-slate-900/90 text-white font-black text-[8px] px-1 rounded-tl leading-tight">
                      #{player.jersey_number || String(player.player_number).padStart(2, '0')}
                    </span>
                  </div>
                ) : (
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
                    #{player.jersey_number || String(player.player_number).padStart(2, '0')}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate text-[12px] leading-tight flex items-center gap-1.5">
                    {player.name}
                    {player.is_captain && (
                      <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-1 rounded">
                        C
                      </span>
                    )}
                    {player.is_vice_captain && (
                      <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-1 rounded">
                        VC
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                    <span>{player.role || (player.is_captain ? 'Captain' : player.is_vice_captain ? 'Vice Captain' : 'Playing XI')}</span>
                    {player.age ? (
                      <>
                        <span>•</span>
                        <span>Age {player.age}</span>
                      </>
                    ) : null}
                    {player.blood_group ? (
                      <>
                        <span>•</span>
                        <span className="uppercase">{player.blood_group}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                {player.is_captain ? (
                  <span className="inline-block bg-[#d8392f] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                    Captain
                  </span>
                ) : player.is_vice_captain ? (
                  <span className="inline-block bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                    Vice Cap
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <UserCheck className="w-2.5 h-2.5 text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          // Default / Pending Registration Fallback Slots
          fallbackSquad.map((player) => {
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
          })
        )}
      </div>

      {/* Sidebar Action / Status Box */}
      {isRegistered ? (
        <div className="p-5 bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 border-t border-emerald-100 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                Registration Confirmed
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">
                Official squad roster is locked & ready.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/#teams"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-200 transition-colors shadow-2xs text-center"
            >
              Other Teams
            </Link>
            <Link
              href="/registration"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-2xs text-center"
            >
              Register Another
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Registration Fee</span>
            <div className="text-right">
              <span className="text-xl font-black text-[#0b162c]">₹4,999/-</span>
              <span className="text-[10px] text-emerald-600 font-bold block">Includes 12 Custom Kits</span>
            </div>
          </div>

          <Link
            href={`/registration?team=${encodeURIComponent(teamName)}`}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Register This Team Now
          </Link>

          <p className="text-[10px] text-slate-400 text-center">
            Auto-locked once payment succeeds.
          </p>
        </div>
      )}

    </div>
  );
}
