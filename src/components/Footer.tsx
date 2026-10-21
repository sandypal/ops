import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b162c] text-white border-t border-[#1e3a8a] pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Tribute */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image 
                src="/logo.png" 
                alt="Operation Sindoor Logo" 
                width={80} 
                height={80} 
                className="w-16 h-16 md:w-20 md:h-20 object-contain brightness-125 group-hover:scale-105 transition-transform" 
              />
              <div>
                <h3 className="font-black text-2xl md:text-3xl text-white uppercase italic tracking-wider leading-none">
                  OPERATION SINDOOR <br /><span className="text-[#d8392f]">CRICKET CUP 2.0</span>
                </h3>
              </div>
            </Link>
            
            <p className="text-slate-400 font-medium max-w-md text-sm leading-relaxed mb-4">
              Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer"><strong className="text-white hover:text-[#d8392f] transition-colors">Sarv Sewa Sashktikarn Sangthan (Regd)</strong></a>. A heartfelt sporting tribute to the courageous soldiers, airmen, and sailors of the Indian Army, Indian Air Force, and Indian Navy.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#d8392f]" />
              Sector 16 Cricket Stadium, Chandigarh
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-5 border-b border-[#d8392f] pb-2 inline-block text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-400 text-sm">
              <li>
                <Link href="/#about" className="hover:text-[#d8392f] transition-colors">
                  About Tournament
                </Link>
              </li>
              <li>
                <Link href="/#tribute" className="text-amber-300 hover:text-amber-200 transition-colors font-semibold">
                  Armed Forces Tribute
                </Link>
              </li>
              <li>
                <Link href="/#collaborations" className="hover:text-[#d8392f] transition-colors">
                  Official Collaborations
                </Link>
              </li>
              <li>
                <Link href="/#sponsorship" className="hover:text-[#d8392f] transition-colors text-amber-300">
                  Sponsorship Packages
                </Link>
              </li>
              <li>
                <Link href="/#teams" className="hover:text-[#d8392f] transition-colors">
                  24 River Teams
                </Link>
              </li>
              <li>
                <Link href="/#schedule" className="hover:text-[#d8392f] transition-colors">
                  Matches & Schedule
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="hover:text-[#d8392f] transition-colors">
                  Regulations & Format
                </Link>
              </li>
              <li>
                <Link href="/#organizers" className="hover:text-[#d8392f] transition-colors">
                  Organizing Committee
                </Link>
              </li>
              <li>
                <Link href="/registration" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                  Register Team (₹4,999)
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-5 border-b border-[#d8392f] pb-2 inline-block text-sm">
              Tournament Helpdesk
            </h4>
            <ul className="space-y-3 font-medium text-slate-400 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d8392f] shrink-0 mt-0.5" />
                <span>Sector 16 Cricket Stadium, Chandigarh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d8392f] shrink-0" />
                <a href="tel:+919056333759" className="hover:text-[#d8392f] transition-colors font-bold text-white">
                  +91 90563 33759 (Helpline)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+918437409211" className="hover:text-amber-400 transition-colors font-bold text-white">
                  +91 84374 09211 (Vishal)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919855109159" className="hover:text-amber-400 transition-colors font-bold text-white">
                  +91 98551 09159 (Karan Sama)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d8392f] shrink-0" />
                <a href="mailto:helposcricketcup@gmail.com" className="hover:text-[#d8392f] transition-colors break-all">
                  helposcricketcup@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs font-medium">
          <p>© 2026 <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sarv Sewa Sashktikarn Sangthan (Regd)</a>. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <Link href="/#teams" className="hover:text-white transition-colors">Teams</Link>
            <span>•</span>
            <Link href="/registration" className="hover:text-white transition-colors">Registration</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
