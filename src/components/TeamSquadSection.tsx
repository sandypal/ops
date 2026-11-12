'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shirt, Clock, Sparkles, CheckCircle2, ShieldCheck, UserCheck, Shield, Lock } from 'lucide-react';
import { teamsData, SquadPlayer } from '@/data/teamsData';

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
  division?: 'boys' | 'girls' | string;
}

// ================= BOY CRICKETER PLACEHOLDER SVG =================
function BoyPlayerPlaceholder() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="squadBoyBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0b162c" />
          <stop offset="0.5" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="squadBoySkin" x1="40" y1="20" x2="40" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3c49f" />
          <stop offset="1" stopColor="#dca072" />
        </linearGradient>
        <linearGradient id="squadBoyJersey" x1="15" y1="52" x2="65" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="squadBoyTrim" x1="25" y1="50" x2="55" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Stadium / Sports Background */}
      <rect width="80" height="80" fill="url(#squadBoyBg)" />
      <circle cx="40" cy="24" r="28" fill="#3b82f6" fillOpacity="0.18" />

      {/* Short Boy Athletic Hair Underlayer */}
      <path
        d="M26 31C26 21 32 15 40 15C48 15 54 21 54 31C54 34 53 37 51 38C50 34 49 32 47 30C43 27 37 27 33 30C31 32 30 34 29 38C27 37 26 34 26 31Z"
        fill="#18181b"
      />

      {/* Ears */}
      <path d="M29 33C27.5 33 26.5 34.5 26.5 36.5C26.5 38.5 27.5 40 29 40V33Z" fill="url(#squadBoySkin)" />
      <path d="M51 33C52.5 33 53.5 34.5 53.5 36.5C53.5 38.5 52.5 40 51 40V33Z" fill="url(#squadBoySkin)" />

      {/* Face */}
      <path d="M28 32C28 24 33 20 40 20C47 20 52 24 52 32C52 40 47 45 40 45C33 45 28 40 28 32Z" fill="url(#squadBoySkin)" />

      {/* Modern Athletic Fade / Hair Top */}
      <path
        d="M27 28C27.5 21 33 16 40 16C47 16 52.5 21 53 28C51.5 25.5 48 24 44 24.5C39 25 35 23 32 25C29.5 26.5 28 27.5 27 28Z"
        fill="#27272a"
      />
      <path
        d="M29 26C32 23 37 23 41 24.5C45 23 49 24 51 26C49 25 45 24 41 25.5C37 24 32 24.5 29 26Z"
        fill="#09090b"
      />

      {/* Athletic Neck */}
      <path d="M35 43H45V53H35V43Z" fill="url(#squadBoySkin)" />
      <path d="M35 43C37 45 43 45 45 43V46C43 47 37 47 35 46V43Z" fill="#b47850" fillOpacity="0.4" />

      {/* Cricket Jersey Torso */}
      <path d="M12 76C12 63 22 55 33 53L40 58L47 53C58 55 68 63 68 76H12Z" fill="url(#squadBoyJersey)" />

      {/* Athletic Shoulder Stripes */}
      <path d="M17 76L25 58L28 59L21 76H17Z" fill="url(#squadBoyTrim)" fillOpacity="0.8" />
      <path d="M63 76L55 58L52 59L59 76H63Z" fill="url(#squadBoyTrim)" fillOpacity="0.8" />

      {/* Cricket Jersey Collar */}
      <path d="M33 53L40 63L47 53L43 51L40 55L37 51L33 53Z" fill="#ffffff" />
      <path d="M36 52L40 59L44 52L42 51L40 54L38 51L36 52Z" fill="url(#squadBoyTrim)" />

      {/* Cricket Ball Emblem */}
      <circle cx="40" cy="69" r="3.5" fill="#ffffff" fillOpacity="0.9" />
      <path d="M37.5 69C38.5 67 41.5 67 42.5 69C41.5 71 38.5 71 37.5 69Z" stroke="#d8392f" strokeWidth="0.8" />
    </svg>
  );
}

// ================= GIRL CRICKETER PLACEHOLDER SVG =================
function GirlPlayerPlaceholder() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="squadGirlBg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b0764" />
          <stop offset="0.5" stopColor="#4c0519" />
          <stop offset="1" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="squadGirlSkin" x1="40" y1="20" x2="40" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7d0b3" />
          <stop offset="1" stopColor="#e5a982" />
        </linearGradient>
        <linearGradient id="squadGirlJersey" x1="15" y1="52" x2="65" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e11d48" />
          <stop offset="1" stopColor="#831843" />
        </linearGradient>
        <linearGradient id="squadGirlTrim" x1="25" y1="50" x2="55" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbcfe8" />
          <stop offset="1" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="squadGirlHair" x1="20" y1="12" x2="65" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#27272a" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
      </defs>

      {/* Stadium / Sports Background */}
      <rect width="80" height="80" fill="url(#squadGirlBg)" />
      <circle cx="40" cy="24" r="28" fill="#f43f5e" fillOpacity="0.2" />

      {/* Ponytail Extending to the Right */}
      <path
        d="M48 20C54 18 63 21 66 27C68 31 67 38 63 43C61 40 61 36 61 32C60 27 55 24 48 23V20Z"
        fill="url(#squadGirlHair)"
      />
      {/* Ponytail Hair Band */}
      <ellipse cx="50" cy="22" rx="3" ry="4.5" transform="rotate(-25 50 22)" fill="#fb7185" />

      {/* Hair Base Behind Head */}
      <path
        d="M26 31C26 21 32 15 40 15C48 15 54 21 54 31C54 36 53 40 50 42C48 37 47 34 44 32C40 30 35 30 32 32C30 34 29 38 28 42C26.5 39 26 35 26 31Z"
        fill="url(#squadGirlHair)"
      />

      {/* Ears */}
      <path d="M29 33.5C27.8 33.5 27 34.8 27 36.5C27 38.2 27.8 39.5 29 39.5V33.5Z" fill="url(#squadGirlSkin)" />
      <path d="M51 33.5C52.2 33.5 53 34.8 53 36.5C53 38.2 52.2 39.5 51 39.5V33.5Z" fill="url(#squadGirlSkin)" />

      {/* Feminine Face Contour */}
      <path d="M28.5 31C28.5 23.5 33.5 19.5 40 19.5C46.5 19.5 51.5 23.5 51.5 31C51.5 39 46.5 45 40 45C33.5 45 28.5 39 28.5 31Z" fill="url(#squadGirlSkin)" />

      {/* Front Hairline & Locks */}
      <path
        d="M27.5 28C28 20.5 33.5 15.5 40 15.5C46.5 15.5 52 20.5 52.5 28C50 24 45.5 22.5 41 23C36 23.5 31.5 25 27.5 28Z"
        fill="#18181b"
      />
      <path d="M28.5 28C30.5 34 33 36 34 37C33 34 32 31 31 28H28.5Z" fill="#18181b" />
      <path d="M51.5 28C49.5 34 47 36 46 37C47 34 48 31 49 28H51.5Z" fill="#18181b" />

      {/* Athletic Neck */}
      <path d="M35.5 43H44.5V53H35.5V43Z" fill="url(#squadGirlSkin)" />
      <path d="M35.5 43C37.5 45 42.5 45 44.5 43V45.5C42.5 46.5 37.5 46.5 35.5 45.5V43Z" fill="#c27d53" fillOpacity="0.4" />

      {/* Cricket Jersey Torso */}
      <path d="M13 76C13 63.5 22.5 55 33 53L40 57.5L47 53C57.5 55 67 63.5 67 76H13Z" fill="url(#squadGirlJersey)" />

      {/* Athletic Shoulder Stripes */}
      <path d="M18 76L26 57.5L29 58.5L22 76H18Z" fill="url(#squadGirlTrim)" fillOpacity="0.85" />
      <path d="M62 76L54 57.5L51 58.5L58 76H62Z" fill="url(#squadGirlTrim)" fillOpacity="0.85" />

      {/* Cricket Jersey Collar */}
      <path d="M33 53L40 62.5L47 53L43.5 51.5L40 55L36.5 51.5L33 53Z" fill="#ffffff" />
      <path d="M36 52.5L40 58.5L44 52.5L42 51.5L40 54L38 51.5L36 52.5Z" fill="url(#squadGirlTrim)" />

      {/* Cricket Ball Crest */}
      <circle cx="40" cy="68.5" r="3.5" fill="#ffffff" fillOpacity="0.9" />
      <path d="M37.5 68.5C38.5 66.5 41.5 66.5 42.5 68.5C41.5 70.5 38.5 70.5 37.5 68.5Z" stroke="#e11d48" strokeWidth="0.8" />
    </svg>
  );
}

// ================= PLAYER AVATAR ITEM (112px x 112px & GRACEFUL FALLBACK) =================
interface PlayerAvatarItemProps {
  photo?: string | null;
  name: string;
  jerseyNumber: string;
  isGirl: boolean;
}

function PlayerAvatarItem({ photo, name, jerseyNumber, isGirl }: PlayerAvatarItemProps) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = Boolean(photo && !imgError);

  return (
    <div
      style={{
        width: '112px',
        height: '112px',
        minWidth: '112px',
        minHeight: '112px',
        maxWidth: '112px',
        maxHeight: '112px',
      }}
      className="relative rounded-2xl overflow-hidden border-2 border-slate-200/90 shrink-0 shadow-sm bg-slate-100 flex items-center justify-center group/avatar"
    >
      {hasPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo!}
          alt={name}
          width={112}
          height={112}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      ) : isGirl ? (
        <GirlPlayerPlaceholder />
      ) : (
        <BoyPlayerPlaceholder />
      )}
      <span className="absolute bottom-0 right-0 bg-slate-900/95 text-white font-black text-[11px] px-2 py-1 rounded-tl-xl leading-none tracking-tight shadow-md border-t border-l border-white/20">
        #{jerseyNumber}
      </span>
    </div>
  );
}

export default function TeamSquadSection({
  slug,
  teamName,
  teamLogo,
  fallbackSquad,
  initialData,
  division,
}: TeamSquadSectionProps) {
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
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

  // Determine if this is a girls division team
  const isGirlsTeam = Boolean(
    division === 'girls' ||
    (division !== 'boys' && teamsData[slug]?.division === 'girls') ||
    (division !== 'boys' && !teamsData[slug]?.division && /sherniyan|strikers|sena|panthers|sunrisers|queens|royals|glory/i.test(teamName || slug))
  );

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
              setIsRegistered(true);
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
        setIsRegistered(true);
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
            {players.length > 0 ? `${players.length} Certified Players Registered` : 'Official 12-Player Squad Confirmed'}
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
              {players.length > 0 ? `${players.length} Players Confirmed` : 'Squad Locked'}
            </span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-snug">
            {captainName ? (
              <>
                Led by Captain <strong className="font-bold text-emerald-950">{captainName}</strong>
                {viceCaptainName ? <> & Vice Captain <strong className="font-bold text-emerald-950">{viceCaptainName}</strong></> : ''}.
              </>
            ) : (
              'This team has completed official tournament confirmation. 12 official custom player jersey kits allocated.'
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
      <div className="p-4 divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
        {isRegistered && players.length > 0 ? (
          // Registered Players from Database
          players.map((player) => {
            const jerseyNum = player.jersey_number || String(player.player_number).padStart(2, '0');
            return (
              <div
                key={player.id || player.player_number}
                className="py-3.5 first:pt-0 last:pb-0 flex items-stretch gap-3.5 text-xs group hover:bg-slate-50/80 rounded-2xl px-2 transition-colors"
              >
                {/* Player Profile Photo Avatar (112px x 112px) or Gender Placeholder */}
                <PlayerAvatarItem
                  photo={player.photo}
                  name={player.name}
                  jerseyNumber={jerseyNum}
                  isGirl={isGirlsTeam}
                />

                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                        {player.name}
                      </p>
                      {player.is_captain ? (
                        <span className="shrink-0 bg-[#d8392f] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                          Captain
                        </span>
                      ) : player.is_vice_captain ? (
                        <span className="shrink-0 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                          Vice Cap
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <UserCheck className="w-2.5 h-2.5 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-700 leading-snug">
                      {player.role || (player.is_captain ? 'Captain' : player.is_vice_captain ? 'Vice Captain' : 'Playing XI')}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                      Jersey #{jerseyNum}
                    </span>
                    {player.age ? (
                      <>
                        <span>•</span>
                        <span className="font-medium">Age {player.age}</span>
                      </>
                    ) : null}
                    {player.blood_group ? (
                      <>
                        <span>•</span>
                        <span className="uppercase font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                          {player.blood_group}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Default / Pending Registration Fallback Slots
          fallbackSquad.map((player) => {
            const isCaptain = player.role.toLowerCase().includes('captain') && !player.role.toLowerCase().includes('vice');
            const isViceCaptain = player.role.toLowerCase().includes('vice captain');

            return (
              <div key={player.number} className="py-3.5 first:pt-0 last:pb-0 flex items-stretch gap-3.5 text-xs group hover:bg-slate-50/80 rounded-2xl px-2 transition-colors">
                {/* Gender Placeholder Avatar with Jersey Badge (112px x 112px) */}
                <PlayerAvatarItem
                  name={player.name || "Slot Reserved"}
                  jerseyNumber={player.jerseyNumber}
                  isGirl={isGirlsTeam}
                />

                <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                        {player.name || "Slot Reserved"}
                      </p>
                      {isCaptain ? (
                        <span className="shrink-0 bg-[#d8392f] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                          Captain
                        </span>
                      ) : isViceCaptain ? (
                        <span className="shrink-0 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-2xs">
                          Vice Cap
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          TBA
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-500 leading-snug">
                      {player.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                      Jersey #{player.jerseyNumber}
                    </span>
                    <span>•</span>
                    <span className="italic font-medium text-slate-500">{isGirlsTeam ? "Girls Division" : "Boys Division"}</span>
                  </div>
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
              All 24 Squads
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Registration Status</span>
            <div className="text-right">
              <span className="text-base font-black text-red-600 uppercase">Closed</span>
              <span className="text-[10px] text-slate-500 font-bold block">All 24 Slots Filled</span>
            </div>
          </div>

          <div
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm border border-slate-700"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" />
            Registration Closed
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Tournament squad registrations are officially closed.
          </p>
        </div>
      )}

    </div>
  );
}

