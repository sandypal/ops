"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { teamLogos, teamsData } from '@/data/teamsData';
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Shield,
  Info,
  Medal,
  Activity,
  ChevronRight,
  PlayCircle,
  Phone,
  Check,
  Leaf,
  Mail,
  Handshake,
  ExternalLink,
  Sparkles,
  Briefcase,
  Building,
  CheckCircle2,
  X,
  MessageCircle,
  ArrowRight,
  Lock
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<string>('Title Sponsor');

  // Confirmed teams from API with default fallback
  const [registeredTeamsList, setRegisteredTeamsList] = useState<Array<{ name: string; slug: string; division: string }>>([
    { name: "Kaveri Queens", slug: "kaveri-queens", division: "girls" }
  ]);

  useEffect(() => {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sarvsewabharat.org/api/api/';
    const baseApiUrl = rawApiUrl.replace(/\/+$/, '');
    fetch(`${baseApiUrl}/tournament/teams`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data && res.data.all) {
          const registered = res.data.all.filter((t: any) => t.status === 'registered' || t.is_registered);
          if (registered.length > 0) {
            setRegisteredTeamsList(registered);
          }
        }
      })
      .catch(err => {
        console.warn('Could not fetch teams from API:', err);
      });
  }, []);

  const boysTeams = [
    "Sindhu Spartans", "Satluj Soorme", "Beas Blasters", "Brahmaputra Bulls",
    "Mahanadi Masters", "Ravi Rangers", "Chenab Challengers", "Jhelum Jaguars",
    "Yamuna Yodhas", "Kaveri Warriors", "Ghaggar Champions", "Ganga Giants",
    "Narmada Titans", "Tapti Tigers", "Godavari Knights", "Krishna Kings"
  ];

  const girlsTeams = [
    "Sindhu Sherniyan", "Saraswati Strikers", "Satluj Sena", "Yamuna Panthers",
    "Sabarmati Sunrisers", "Kaveri Queens", "Ravi Royals", "Ganga Glory"
  ];

  // 1. Sacred Armed Forces Tributes (Army, Air Force, Navy)
  const armedForcesTributes = [
    {
      name: "Indian Army",
      hindiName: "भारतीय थल सेना",
      subtitle: "Solemn Tribute to Our Brave Soldiers",
      branch: "Frontier Guardians & Land Defence",
      tagline: "Service Before Self (Seva Paramo Dharma)",
      mottoHindi: "सेवा अस्माकं धर्मः",
      description: "Dedicated in deepest reverence and sporting tribute to the valiant soldiers of the Indian Army. Honoring their supreme sacrifices, unmatched courage, and steadfast vigilance protecting the land borders of Bharat.",
      logos: [
        {
          src: "/collaborators/indian-army.png",
          alt: "Indian Army Official Emblem",
          width: 150,
          height: 150,
          className: "max-h-24 w-auto object-contain"
        }
      ],
      link: "https://indianarmy.nic.in/",
      themeGradient: "from-red-950/60 via-[#131b2e] to-[#0b162c]",
      badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
      accentBorder: "border-red-500/30 hover:border-red-500"
    },
    {
      name: "Indian Air Force",
      hindiName: "भारतीय वायु सेना",
      subtitle: "Solemn Tribute to Our Sky Guardians",
      branch: "Air Dominance & Aerospace Guardians",
      tagline: "Touch the Sky with Glory (Nabhaḥ Sparśaṁ Dīptam)",
      mottoHindi: "नभः स्पृशं दीप्तम्",
      description: "Saluting the fearless air warriors and guardians of Indian skies. Operation Sindoor Cricket Cup celebrates their technological precision, speed, and supreme dedication in defending our airspace.",
      logos: [
        {
          src: "/collaborators/indian-air-force.png",
          alt: "Indian Air Force Official Crest",
          width: 150,
          height: 150,
          className: "max-h-24 w-auto object-contain"
        }
      ],
      link: "https://indianairforce.nic.in/",
      themeGradient: "from-sky-950/60 via-[#131b2e] to-[#0b162c]",
      badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
      accentBorder: "border-sky-500/30 hover:border-sky-400"
    },
    {
      name: "Indian Navy",
      hindiName: "भारतीय नौसेना",
      subtitle: "Solemn Tribute to Our Ocean Sentinels",
      branch: "Maritime Sovereignty & Ocean Defence",
      tagline: "Shaṁ No Varuṇaḥ (May the Ocean Lord be Auspicious)",
      mottoHindi: "शं नो वरुणः",
      description: "Dedicated in solemn tribute to the courageous sailors and maritime commanders protecting the sovereign oceans and vast coastline of Bharat with unyielding vigilance, integrity, and valor.",
      logos: [
        {
          src: "/collaborators/indian-navy.png",
          alt: "Indian Navy Official Crest",
          width: 150,
          height: 150,
          className: "max-h-24 w-auto object-contain"
        }
      ],
      link: "https://indiannavy.nic.in/",
      themeGradient: "from-blue-950/60 via-[#131b2e] to-[#0b162c]",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      accentBorder: "border-blue-500/30 hover:border-blue-400"
    }
  ];

  // 2. Official Institutional Collaborations & Supporters (8 Partners)
  const institutionalCollaborators = [
    {
      name: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      subtitle: "सर्व सेवा सशक्तिकरण संगठन (Regd. NGO)",
      role: "Organizing Foundation",
      tagline: "Seva Samarpan & Youth Empowerment",
      description: "Leading grassroots social transformation and empowering youth across India through sports, de-addiction campaigns, and civic service.",
      logos: [
        {
          src: "/collaborators/sarv-seva-sashaktikaran.png",
          alt: "Sarv Sewa Sashktikarn Sangthan (Regd) Logo",
          width: 140,
          height: 140,
          className: "max-h-20 w-auto object-contain"
        }
      ],
      link: "https://sarvsewabharat.org/",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      name: "Panjab University",
      subtitle: "PU Chandigarh • Estd. 1882",
      role: "University Partner",
      tagline: "Collegiate & Academic Outreach",
      description: "Collaborating with one of India's oldest and most prestigious universities to mobilize talented collegiate cricket squads across the region.",
      logos: [
        {
          src: "/collaborators/panjab-university.png",
          alt: "Panjab University Logo",
          width: 120,
          height: 120,
          className: "max-h-20 w-auto object-contain"
        }
      ],
      link: "https://puchd.ac.in/",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      name: "UT Sports Chandigarh",
      subtitle: "Sports Department, Chandigarh Administration",
      role: "Venue & Sports Authority",
      tagline: "Infrastructure & Host Partner",
      description: "Supporting grassroots athletics and tournament hosting at the prestigious Sector 16 Cricket Stadium, Chandigarh.",
      logos: [
        {
          src: "/collaborators/ut-sports-chandigarh.png",
          alt: "Sports Department Chandigarh Administration",
          width: 140,
          height: 120,
          className: "max-h-20 w-auto object-contain"
        }
      ],
      link: "https://sportsdeptt.chd.gov.in/",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      name: "Ministry of Youth Affairs & Sports",
      subtitle: "Government of India • भारत सरकार",
      role: "Union Ministry",
      tagline: "Empowering Indian Youth & Sports",
      description: "Fostering national athletic excellence, developing world-class sports ecosystems, and mobilizing youth energy for India's sporting future.",
      logos: [
        {
          src: "/collaborators/ministry-of-youth-affairs.svg",
          alt: "Ministry of Youth Affairs and Sports Logo",
          width: 150,
          height: 90,
          className: "max-h-16 w-auto object-contain"
        }
      ],
      link: "https://yas.nic.in/",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      name: "MY Bharat",
      subtitle: "Mera Yuva Bharat • Ministry of Youth Affairs & Sports",
      role: "National Youth Network",
      tagline: "Yuva Shakti for Viksit Bharat",
      description: "An autonomous body under the Ministry of Youth Affairs empowering millions of youth through sports leadership, volunteerism, and active athletic engagement.",
      logos: [
        {
          src: "/collaborators/my-bharat.png",
          alt: "MY Bharat Official Logo",
          width: 160,
          height: 80,
          className: "max-h-16 w-auto object-contain"
        }
      ],
      link: "https://mybharat.gov.in/",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      name: "NSS (National Service Scheme)",
      subtitle: "Ministry of Youth Affairs & Sports • Govt. of India",
      role: "National Youth Service Wing",
      tagline: "Not Me, But You",
      description: "Mobilizing youth energy into community leadership, social welfare, civic responsibility, and active nation-building.",
      logos: [
        {
          src: "/collaborators/nss.png",
          alt: "National Service Scheme (NSS) Emblem",
          width: 130,
          height: 130,
          className: "max-h-20 w-auto object-contain"
        }
      ],
      link: "https://nss.gov.in/",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      name: "NCC (National Cadet Corps)",
      subtitle: "Youth Wing of Armed Forces • Ministry of Defence",
      role: "Cadet & Youth Wing",
      tagline: "Unity & Discipline (Ekta aur Anushasan)",
      description: "Developing character, comradeship, ideals of selfless service, and patriotic leadership among young student cadets nationwide.",
      logos: [
        {
          src: "/collaborators/ncc.png",
          alt: "National Cadet Corps (NCC) Crest",
          width: 110,
          height: 140,
          className: "max-h-20 w-auto object-contain"
        }
      ],
      link: "https://indiancc.nic.in/",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200"
    },
    {
      name: "Viksit Bharat Abhiyan",
      subtitle: "Government of India Initiative • 1947 to 2047",
      role: "National Vision Partner",
      tagline: "Transforming India into a Developed Nation",
      description: "Uniting youth spirit, national pride, and athletic dedication to advance the grand vision of a developed, prosperous, and self-reliant India by 2047.",
      logos: [
        {
          src: "/collaborators/viksit-bharat.png",
          alt: "Viksit Bharat Abhiyan Logo",
          width: 140,
          height: 80,
          className: "max-h-16 w-auto object-contain"
        }
      ],
      link: "https://www.india.gov.in/",
      badgeColor: "bg-teal-50 text-teal-800 border-teal-200"
    }
  ];

  // Alias for backward compatibility
  const collaborators = institutionalCollaborators;

  // Organizing Committee Members
  const organizers = [
    {
      name: "Vishal Kamboj",
      role: "Coordinator",
      designation: "Coordinator, Operation Sindoor Cricket Cup 2.0",
      image: "/vishal-kamboj.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: "+91 84374 09211"
    },
    {
      name: "Karan Sama",
      role: "Coordinator",
      designation: "Coordinator, Operation Sindoor Cricket Cup 2.0",
      image: "/karan-sama.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: "+91 98551 09159"
    },
    {
      name: "Karan Batti",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/karan-batti.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: "+91 95927 43434"
    },
    {
      name: "Rajbir Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Rajbirsingh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Jagchannan Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/JAGCHANANSINGH.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Gourav Choudhary",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Gouravchoudhary.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: "+91 90415 40053"
    },
    {
      name: "Ram Chander Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Ramchandersingh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Gurwinder Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Gurwinder-singh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Kohinoor",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Kohinoor.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Jujhar Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Jujharsingh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Jarman Brar",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Jarmanbrar.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Rohit",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/rohit.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Ranjit Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Ranjitsingh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Gursimrat Singh",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/Gursimrat-Singh.jpeg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Vishavjot Chandi",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/vishavjot-chandi.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Kabir Soni",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/kabir-soni.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    },
    {
      name: "Preet Handa",
      role: "Organizing Committee",
      designation: "Organizing Committee Member",
      image: "/preet-handa.jpg",
      organization: "Sarv Sewa Sashktikarn Sangthan (Regd)",
      phone: ""
    }
  ];

  // Active / Confirmed Sponsors (Add sponsors here to show their logos on the website)
  const activeSponsors: {
    category: string;
    brandName: string;
    logo?: string;
    website?: string;
    tagline?: string;
  }[] = [
      {
        category: "Official Partner",
        brandName: "Nik Baker's",
        logo: "/sponsors/nik-bakers.png",
        website: "https://www.nikbakers.com"
      }
    ];

  // Sponsorship Categories Matrix (12 Partner Slots)
  const sponsorshipTiers = [
    {
      id: "title-sponsor",
      category: "Title Sponsor",
      hindiCategory: "टाइटल स्पॉन्सर",
      partners: 1,
      partnerLabel: "1 Slot (Exclusive)",
      featured: true,
      badge: "Exclusive Naming Rights",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      accentBorder: "border-amber-400 shadow-amber-500/10",
      perks: [
        "Exclusive Tournament Naming Rights: '[Your Brand] Operation Sindoor Cricket Cup 2.0'",
        "Primary Front Jersey Center Chest Logo across all 24 team kits (288+ players)",
        "Dominant Pitch Mat, Sight-screen, Main Presentation Backdrop & Stadium Entrance Gate branding",
        "VIP Trophy Handover Ceremony & Chief Guest honor at the Grand Finale",
        "Full digital live-stream score bug & lower-third broadcast branding"
      ]
    },
    {
      id: "co-powered-by",
      category: "Co-Powered By",
      hindiCategory: "सह-संचालक पार्टनर",
      partners: 2,
      partnerLabel: "2 Partners",
      featured: false,
      badge: "Co-Presenting Brand",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      accentBorder: "border-blue-300 shadow-blue-500/10",
      perks: [
        "'Co-Powered By [Your Brand]' branding on all official print, digital & stadium media",
        "Upper Back of Jersey logo on all match day player uniforms",
        "Ground perimeter boards & Team Dugout backdrop branding",
        "Digital live-stream graphic sponsor bugs & press release attribution"
      ]
    },
    {
      id: "associate-sponsor",
      category: "Associate Sponsor",
      hindiCategory: "एसोसिएट स्पॉन्सर",
      partners: 3,
      partnerLabel: "3 Partners",
      featured: false,
      badge: "High-Visibility Partner",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      accentBorder: "border-purple-200",
      perks: [
        "Right/Left Jersey Sleeve prominent logo placement on official jerseys",
        "2x Ground Perimeter A-frame boards at Sector 16 Stadium",
        "Official Award naming partner (e.g. Man of the Match / Best Bowler)",
        "Dedicated social media sponsor spotlight & digital shoutouts"
      ]
    },
    {
      id: "team-jersey-sponsor",
      category: "Team/Jersey Sponsor",
      hindiCategory: "टीम / जर्सी स्पॉन्सर",
      partners: 2,
      partnerLabel: "2 Partners",
      featured: false,
      badge: "Team Kit Partner",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      accentBorder: "border-emerald-200",
      perks: [
        "Direct Player Jersey branding worn across 24 collegiate cricket squads",
        "Team dugout banner presence & official kit unveiling coverage",
        "Photo-ops with team captains and player squads",
        "Digital social media roster branding tags and match updates"
      ]
    },
    {
      id: "special-category-partner",
      category: "Special Category Partner",
      hindiCategory: "स्पेशल कैटेगरी पार्टनर",
      partners: 4,
      partnerLabel: "4 Partners",
      featured: false,
      badge: "Category Exclusive",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
      accentBorder: "border-slate-200",
      perks: [
        "Exclusive Domain Partnership (Beverage, Refreshment, Digital, Medical)",
        "On-ground kiosk / stall and product sampling booth rights at stadium",
        "Official Special Partner logo on event posters & social media banners",
        "Live PA ground announcement acknowledgement during matches"
      ]
    }
  ];

  const openSponsorModal = (category: string = 'Title Sponsor') => {
    setSelectedSponsorTier(category);
    setIsSponsorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 font-sans selection:bg-[#d8392f] selection:text-white">
      {/* Shared Header */}
      <Header />

      {/* Quick Info Ribbon */}
      <div className="bg-[#112240] py-3 border-b border-[#1e3a8a]">
        <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-4 text-xs font-bold text-white/80 uppercase tracking-widest">
          <div className="flex items-center gap-2 text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8392f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d8392f]"></span>
            </span>
            Registrations Open Now
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[#d8392f]" /> ₹51K Winner • ₹31K Runner Up</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#d8392f]" /> 5-Day Event</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#d8392f]" /> Sector 16 Stadium Chandigarh</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-[#d8392f]" /> Boys & Girls Division</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0b162c]">
        {/* Cricket Ground Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cricket-ground.png"
            alt="Cricket Ground"
            fill
            priority
            className="object-cover object-center opacity-100"
            sizes="100vw"
          />
          {/* Dark gradient overlay — same as before */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b162c] via-[#0b162c]/80 to-[#0b162c]/60" />
          {/* Red slanted accent — same as before */}
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[#d8392f] opacity-15 transform skew-x-[-20deg] translate-x-32" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b162c] to-transparent" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-3/5 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#d8392f]/50 text-[#d8392f] text-xs font-black uppercase tracking-widest bg-white/5 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                <Shield className="w-3 h-3" />
                Tribute to Armed Forces
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-400/50 text-blue-300 text-xs font-black uppercase tracking-widest bg-white/5 backdrop-blur-sm">
                <Users className="w-3 h-3" />
                Open for Colleges & Universities
              </div>
            </div>

            <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tighter mb-4 leading-[0.9] text-white uppercase italic drop-shadow-2xl">
              T10 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8392f] to-[#fb923c]">GLORY</span><br />
              AWAITS
            </h2>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 font-medium">
              Open to <strong className="text-white">college &amp; university students</strong> across all States &amp; UTs. Join the battle at Sector 16 Stadium Chandigarh. 24 Teams. 5 Days. Ultimate T10 knockouts. Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#d8392f] underline underline-offset-2 transition-colors">Sarv Sewa Sashktikarn Sangthan (Regd)</a>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
              <a href="/registration" className="px-8 py-4 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white font-black italic text-xl uppercase tracking-wider rounded transition-all shadow-[0_10px_30px_rgba(220,38,38,0.6)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.8)] hover:-translate-y-1 w-full sm:w-auto text-center border-b-4 border-[#7f1d1d] flex items-center justify-center gap-2">
                <span>REGISTER TEAM</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded text-base font-black">₹4,999</span>
              </a>
              <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-black italic text-xl uppercase tracking-wider rounded transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                <PlayCircle className="w-6 h-6" /> WATCH PROMO
              </a>
            </div>

            {/* Prominent Price Highlight Strip */}
            <div className="inline-flex flex-wrap items-center gap-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-slate-200 shadow-lg">
              <div className="flex items-center gap-1.5 font-black text-amber-400 text-sm italic">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>₹4,999 / Team</span>
              </div>
              <span className="text-white/40">•</span>
              <span className="font-semibold">Squad of 12 Players</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                12x Official Jersey Kits Included
              </span>
            </div>
          </div>

          <div className="md:w-2/5 flex justify-center relative">
            <div className="w-64 h-64 md:w-96 md:h-96 relative z-10 animate-pulse-slow">
              <div className="absolute inset-0 bg-[#d8392f] rounded-full blur-[100px] opacity-30"></div>
              {/* Replace with actual trophy image if available, using logo as placeholder */}
              <Image src="/logo.png" alt="Trophy" width={400} height={400} className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(239,68,68,0.5)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          OPTION 3A: LIVE CONFIRMED SQUADS TRUST RIBBON (Direct Logos)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#070e1c] text-white border-y border-amber-500/20 py-3 sm:py-3.5 relative z-20 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full font-black uppercase tracking-wider text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Confirmed Teams</span>
            </span>
            <span className="text-slate-400 font-semibold hidden lg:inline">
              Verified Squads for Sector 16 Stadium:
            </span>
          </div>

          <div className="w-full md:w-auto flex items-center justify-start md:justify-end gap-3 overflow-x-auto max-w-full py-1 custom-scrollbar">
            {registeredTeamsList.map((team, idx) => {
              const slug = team.slug || team.name.toLowerCase().replace(/\s+/g, '-');
              const logo = teamLogos[slug];
              return (
                <div key={idx} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-xl border border-white/15 shrink-0 transition-colors">
                  {logo && (
                    <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <Image src={logo} alt={team.name} width={20} height={20} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  <span className="font-black text-white text-xs uppercase italic">{team.name}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    Confirmed Entry
                  </span>
                </div>
              );
            })}
            <a
              href="/registration"
              className="text-xs font-black text-amber-400 hover:text-amber-300 hover:underline uppercase tracking-wider shrink-0 flex items-center gap-1 ml-2"
            >
              <span>+ Register Your Team (₹4,999)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats (Like IPL stats bar) */}
      <section className="bg-white border border-slate-200/90 shadow-md relative z-20 mt-6 md:mt-8 mx-4 md:mx-auto md:w-11/12 rounded-2xl mb-14 md:mb-16 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
          {[
            { label: "Entry Fee", value: "₹4,999", sub: "12x Jersey Kits Included", highlight: true },
            { label: "Matches", value: "22", sub: "T10 Knockouts" },
            { label: "Teams", value: "24", sub: "16 Boys • 8 Girls" },
            { label: "1st Prize", value: "₹51K", sub: "+ Official Trophy" }
          ].map((stat, i) => (
            <div key={i} className={`p-6 text-center transition-colors cursor-pointer group ${stat.highlight ? 'bg-gradient-to-b from-amber-50/60 to-white' : 'hover:bg-slate-50'}`}>
              <p className={`text-4xl font-black italic transition-colors ${stat.highlight ? 'text-[#d8392f]' : 'text-[#0b162c] group-hover:text-[#d8392f]'}`}>{stat.value}</p>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</h4>
              <p className={`text-xs mt-1 font-semibold ${stat.highlight ? 'text-emerald-700' : 'text-slate-400'}`}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white via-slate-50 to-[#f3f5f8] border-b border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100/80 text-[#d8392f] text-xs font-black uppercase tracking-widest mb-3 border border-red-200">
                <Shield className="w-3.5 h-3.5" />
                Tribute to Armed Forces
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#0b162c] tracking-tighter leading-tight">
                OPERATION SINDOOR <br />
                <span className="text-[#d8392f]">CRICKET CUP 2.0</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg mt-4 font-medium leading-relaxed">
                Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer"><strong className="text-slate-900 font-bold hover:text-[#d8392f] transition-colors">Sarv Sewa Sashktikarn Sangthan (Regd)</strong></a>, the Operation Sindoor Cricket Cup is a premier state-level cricket tournament held in salute to the brave men and women of the Indian Armed Forces.
              </p>
            </div>
            {/* Organizing Body, Armed Forces Tribute & Collaborators Widget */}
            <div className="shrink-0 bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-md max-w-full lg:max-w-md w-full">
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d8392f]"></span>
                  Organization, Tributes &amp; Collabs
                </span>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#d8392f]">
                  <a href="#tribute" className="hover:underline">Tribute</a>
                  <span className="text-slate-300">•</span>
                  <a href="#collaborations" className="hover:underline">Collabs</a>
                </div>
              </div>

              <div className="space-y-2.5">
                {/* 1. Organizing Foundation */}
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://sarvsewabharat.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-xs border-2 border-emerald-500 ring-2 ring-emerald-100 bg-white p-0.5 hover:scale-105 transition-transform shrink-0"
                    title="Sarv Sewa Sashktikarn Sangthan (Regd) — Organizing Foundation"
                  >
                    <Image
                      src="/sarvsewa-logo.png"
                      alt="Sarv Sewa Sashktikarn Sangthan (Regd) Logo"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </a>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block w-fit mb-0.5">
                      Organizing Foundation
                    </span>
                    <span className="text-xs font-bold text-slate-800 block line-clamp-1">
                      Sarv Sewa Sashktikarn Sangthan (Regd)
                    </span>
                  </div>
                </div>

                {/* 2. In Sacred Tribute to Armed Forces */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
                    <Shield className="w-3 h-3 text-[#d8392f]" />
                    <span>In Tribute To:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {armedForcesTributes.map((tribute, idx) => (
                      <a
                        key={idx}
                        href="#tribute"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 hover:bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#d8392f] hover:scale-110 transition-all p-1 flex items-center justify-center shrink-0"
                        title={`${tribute.name} (${tribute.subtitle})`}
                      >
                        <Image
                          src={tribute.logos[0].src}
                          alt={tribute.logos[0].alt}
                          width={28}
                          height={28}
                          className="max-h-full max-w-full object-contain"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. Official Collaborations */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
                    <Handshake className="w-3 h-3 text-blue-600" />
                    <span>Collaborators:</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {institutionalCollaborators.slice(1).map((collab, idx) => (
                      <a
                        key={idx}
                        href="#collaborations"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-50 hover:bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#d8392f] hover:scale-110 transition-all p-1 flex items-center justify-center shrink-0"
                        title={`${collab.name} — ${collab.role}`}
                      >
                        <Image
                          src={collab.logos[0].src}
                          alt={collab.logos[0].alt}
                          width={28}
                          height={28}
                          className="max-h-full max-w-full object-contain"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 4. Confirmed Sponsors */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Sponsor:</span>
                  </div>
                  <a
                    href="#sponsorship"
                    className="h-7 px-2.5 rounded-full bg-white hover:bg-amber-50/50 border border-amber-300 shadow-2xs hover:shadow-md hover:border-amber-400 hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
                    title="Nik Baker's — Official Partner"
                  >
                    <Image
                      src="/sponsors/nik-bakers.png"
                      alt="Nik Baker's"
                      width={48}
                      height={34}
                      className="max-h-5 w-auto object-contain"
                    />
                    <span className="text-[10px] font-black text-slate-800">Nik Baker&apos;s</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Story & Mission Box */}
            <div className="lg:col-span-7 bg-[#0b162c] text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden border-t-4 border-[#d8392f]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8392f]/10 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white mb-4">
                Honoring Valor Through Sportsmanship
              </h3>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Conceived with the vision of uniting youth through the spirit of cricket and instilling deep respect for our nation&apos;s protectors, Operation Sindoor Cricket Cup 2.0 brings together the region&apos;s finest cricketers at the legendary <strong className="text-white">Sector 16 Stadium, Chandigarh</strong>.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Featuring 24 teams (16 Boys & 8 Girls), the tournament is played in the thrilling, explosive T10 leather ball format with certified officials, official colored jerseys, and high-stakes knockout drama.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6 font-normal">
                Organized by <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer"><strong className="text-white hover:text-[#d8392f] transition-colors">Sarv Sewa Sashktikarn Sangthan (Regd)</strong></a>, this event stands as a beacon of unity — bringing together young athletes, families, and communities to celebrate the values of discipline, teamwork, and national pride.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "Certified leather ball format with professional umpires",
                  "Official colored jersey kits for every registered team",
                  "Boys & Girls divisions on the same prestigious stage",
                  "Anti-drug awareness campaign integrated throughout the event",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="mt-1 w-4 h-4 rounded-full bg-[#d8392f]/20 border border-[#d8392f]/40 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#d8392f]" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-[#d8392f] italic">24</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">Total Teams</div>
                  <div className="text-[11px] text-slate-400">16 Boys • 8 Girls</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-blue-400 italic">T10</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">High Speed</div>
                  <div className="text-[11px] text-slate-400">Leather Ball Knockouts</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-amber-400 italic">₹2 Lac</div>
                  <div className="text-xs uppercase font-bold text-slate-300 tracking-wider mt-1">Cash Pool</div>
                  <div className="text-[11px] text-slate-400">+ Trophies & Caps</div>
                </div>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">

              {/* Card 1 - Armed Forces */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-red-100 shadow-sm bg-red-50/50">
                  <Image
                    src="/pillars/armed-forces.jpg"
                    alt="Tribute to Armed Forces"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>             <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Tribute to Armed Forces</h4>
                  <p className="text-slate-600 text-sm mt-1">A heartfelt salute to the brave martyrs and soldiers of the Indian Armed Forces. This tournament is our way of honouring their sacrifice, courage, and unwavering dedication to the nation.</p>
                </div>
              </div>

              {/* Card 2 - Rivers & Culture */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-blue-100 shadow-sm bg-blue-50/50">
                  <Image
                    src="/pillars/rivers-india.jpg"
                    alt="Rivers of India — Our Roots"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Rivers of India — Our Roots</h4>
                  <p className="text-slate-600 text-sm mt-1">Each team is named after a sacred river of India — symbols of life, culture, and civilization. Just as rivers unite communities, cricket unites us across regions, languages, and traditions.</p>
                </div>
              </div>

              {/* Card 3 - No to Drugs */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-emerald-100 shadow-sm bg-emerald-50/50">
                  <Image
                    src="/pillars/no-drugs.jpg"
                    alt="Say No to Drugs — Play Sports"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Say No to Drugs — Play Sports</h4>
                  <p className="text-slate-600 text-sm mt-1">We believe sport is the strongest weapon against substance abuse. This tournament invites the youth to channel their energy onto the field — because a nation that plays together, stays stronger together.</p>
                </div>
              </div>

              {/* Card 4 - Venue */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-amber-100 shadow-sm bg-amber-50/50">
                  <Image
                    src="/pillars/venue-stadium.jpg"
                    alt="Venue — Sector 16, Chandigarh"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 uppercase italic">Venue — Sector 16, Chandigarh</h4>
                  <p className="text-slate-600 text-sm mt-1">The tournament is hosted at the prestigious Sector 16 Stadium, Chandigarh — a world-class arena that gives every player the professional stage they deserve.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ARMED FORCES TRIBUTE SECTION (Sacred Salute - Separate from Collaborators)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="tribute" className="py-10 md:py-12 bg-[#0a0f1d] text-white relative border-b border-slate-800">
        {/* Subtle Tiranga top border ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Salute to the Guardians of Bharat</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
                IN SOLEMN TRIBUTE TO THE <span className="text-amber-400">INDIAN ARMED FORCES</span>
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl font-medium">
              Dedicated in eternal gratitude to the brave soldiers, air warriors, and naval sentinels protecting the sovereignty of Bharat.
            </p>
          </div>

          {/* Compact Flat Tribute Cards with Prominent Crest Logos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {armedForcesTributes.map((force, index) => (
              <div
                key={index}
                className="bg-[#11192e] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  {/* Large Insignia / Crest Showcase */}
                  <div className="h-28 sm:h-32 bg-[#090f1d] border border-slate-800/80 rounded-xl flex items-center justify-center p-3 mb-4">
                    <Image
                      src={force.logos[0].src}
                      alt={force.logos[0].alt}
                      width={120}
                      height={120}
                      className="max-h-24 sm:max-h-28 w-auto object-contain"
                    />
                  </div>

                  {/* Force Name & Hindi Name */}
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-black uppercase text-white tracking-tight">
                      {force.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {force.hindiName}
                    </p>
                  </div>

                  {/* Official Motto */}
                  <div className="bg-[#090f1d] border border-slate-800/70 rounded-lg px-3 py-2 text-center">
                    <div className="text-xs text-amber-400 font-semibold italic">
                      &quot;{force.mottoHindi}&quot;
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {force.tagline}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Armed Force of Bharat
                  </span>
                  <a
                    href={force.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors text-xs"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          OFFICIAL INSTITUTIONAL COLLABORATIONS SECTION (Partners & Associations)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section id="collaborations" className="py-20 bg-gradient-to-b from-white via-slate-50/80 to-white border-b border-slate-200 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-slate-100 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100/80 text-blue-700 text-xs font-black uppercase tracking-widest mb-3 border border-blue-200">
                <Handshake className="w-3.5 h-3.5" />
                Institutional Network
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#0b162c]">
                OFFICIAL <span className="text-[#d8392f]">COLLABORATIONS</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2 font-medium max-w-2xl">
                Organized by Sarv Sewa Sashktikarn Sangthan (Regd) in proud institutional collaboration with Panjab University, UT Sports Chandigarh, Ministry of Youth Affairs &amp; Sports, MY Bharat, NSS, NCC, and Viksit Bharat Abhiyan.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              8 Official Institutional Collaborations
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionalCollaborators.map((collab, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#d8392f] hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top subtle accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d8392f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Logo Container */}
                  <div className="h-28 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-3 mb-5 group-hover:bg-slate-50 transition-colors">
                    {collab.logos.length === 1 ? (
                      <Image
                        src={collab.logos[0].src}
                        alt={collab.logos[0].alt}
                        width={collab.logos[0].width}
                        height={collab.logos[0].height}
                        className={`${collab.logos[0].className} group-hover:scale-105 transition-transform duration-300 drop-shadow-sm`}
                      />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        {collab.logos.map((logo, lIdx) => (
                          <div key={lIdx} className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/70 flex items-center justify-center">
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={logo.width}
                              height={logo.height}
                              className={`${logo.className} group-hover:scale-105 transition-transform duration-300`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="mb-3">
                    <span className={`inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${collab.badgeColor}`}>
                      {collab.role}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-black text-xl text-[#0b162c] uppercase italic tracking-tight group-hover:text-[#d8392f] transition-colors leading-tight mb-1">
                    {collab.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mb-3 leading-snug">
                    {collab.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {collab.description}
                  </p>
                </div>

                {/* Footer with Tagline and Link */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {collab.tagline}
                  </span>
                  {collab.link && (
                    <a
                      href={collab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#d8392f] hover:text-[#b91c1c] transition-colors"
                      title={`Visit ${collab.name}`}
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Section - Executive VIP Dark Onyx & Amber Prestige */}
      <section id="sponsorship" className="py-24 bg-gradient-to-b from-[#060b17] via-[#0c1426] to-[#050914] text-white relative overflow-hidden border-b-2 border-amber-500/20">
        {/* Luxury Gold & Crimson atmospheric glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#d8392f]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-amber-500/5 to-transparent transform skew-x-[-18deg] translate-x-24 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 border-b border-white/10 pb-8 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-widest mb-3 border border-amber-400/20 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Brand Association & Growth
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                TOURNAMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8392f] to-[#fb923c]">SPONSORSHIP</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base mt-2 font-medium max-w-2xl leading-relaxed">
                Position your brand at the center of North India’s premier collegiate cricket championship. Extensive stadium hoardings, live-stream broadcast exposure, and direct engagement with youth across all States &amp; UTs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openSponsorModal('Title Sponsor')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] text-white font-black italic text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Apply for Sponsorship</span>
              </button>
              <a
                href="tel:+919056333759"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#d8392f]" />
                <span>+91 90563 33759</span>
              </a>
            </div>
          </div>

          {/* Active / Confirmed Sponsors Showcase */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  Confirmed Official Sponsors &amp; Brand Partners
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {activeSponsors.length} Confirmed • 11 Partner Slots Available
              </span>
            </div>

            {/* Confirmed Sponsors Grid (Supports multiple sponsors) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
              {activeSponsors.map((sponsor, idx) => (
                <a
                  key={idx}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400/80 hover:border-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between group relative overflow-hidden text-center"
                >
                  <div className="h-28 w-full flex items-center justify-center p-2 mb-2">
                    {sponsor.logo ? (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.brandName}
                        width={300}
                        height={200}
                        className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Building className="w-10 h-10 text-amber-500" />
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 group-hover:text-[#d8392f] transition-colors">
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                </a>
              ))}
            </div>

            {/* Open Sponsorship Tiers */}
            <div className="border-t border-white/10 pt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-lg font-black uppercase italic tracking-wide text-white">
                    Available Sponsorship Categories &amp; Slots
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Partner with North India&apos;s premier collegiate cricket championship at Sector 16 Stadium Chandigarh.
                  </p>
                </div>
                <button
                  onClick={() => openSponsorModal('Title Sponsor')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider cursor-pointer shrink-0"
                >
                  <span>Apply for Slot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sponsorshipTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="bg-white/5 border border-white/10 hover:border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 group hover:bg-white/[0.08]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${tier.badgeColor}`}>
                          {tier.partners} {tier.partners === 1 ? 'Slot Available' : 'Slots Available'}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Open
                        </span>
                      </div>
                      <h4 className="font-black text-sm uppercase italic text-white tracking-wide group-hover:text-amber-300 transition-colors">
                        {tier.category}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        {tier.hindiCategory}
                      </p>

                      {/* Logo Placeholder Box */}
                      <div className="my-3.5 h-16 rounded-xl border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center group-hover:border-amber-400/40 transition-colors">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-200">
                          Your Logo Here
                        </span>
                        <span className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                          Slot Open
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => openSponsorModal(tier.category)}
                      className="w-full mt-2 py-2 px-3 bg-white/10 hover:bg-[#d8392f] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Claim This Slot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Tier Cards */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white">
                  SPONSORSHIP <span className="text-[#d8392f]">PACKAGES &amp; DELIVERABLES</span>
                </h3>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                  Comprehensive 360° branding rights across ground hoardings, team jersey kits, and digital live-streams.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsorshipTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative ${tier.featured
                    ? 'bg-gradient-to-b from-amber-500/10 via-[#112240] to-[#0b162c] border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] lg:scale-[1.02]'
                    : 'bg-[#112240] border-white/10 hover:border-white/25 hover:shadow-xl'
                    }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      ★ Prime Exclusive
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${tier.badgeColor}`}>
                        {tier.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {tier.partnerLabel}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black uppercase italic tracking-tight text-white mb-1">
                      {tier.category}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold mb-5 pb-4 border-b border-white/10">
                      {tier.hindiCategory}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2.5 mb-6">
                      <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Included Deliverables:
                      </div>
                      {tier.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openSponsorModal(tier.category)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${tier.featured
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-white/10 hover:bg-[#d8392f] text-white'
                      }`}
                  >
                    <span>Apply for {tier.category}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Official Sponsorship Matrix Table - Commented out for now */}
          {false && (
            <div className="bg-[#112240] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-5 md:p-6 bg-gradient-to-r from-white/5 to-transparent border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-black uppercase italic tracking-tight text-white flex items-center gap-2">
                    <span>Official Sponsorship Matrix</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                      12 Partner Slots Available
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Full category allocation across all 12 partner slots for Operation Sindoor Cricket Cup 2.0.
                  </p>
                </div>
                <button
                  onClick={() => openSponsorModal('Title Sponsor')}
                  className="px-4 py-2 bg-[#d8392f] hover:bg-[#b91c1c] text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Inquire All Categories
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/5 text-[11px] font-black uppercase tracking-wider text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-6">Sponsorship Category (श्रेणी)</th>
                      <th className="py-3.5 px-6 text-center">Partners (पार्टनर्स)</th>
                      <th className="py-3.5 px-6">Badge / Benefit</th>
                      <th className="py-3.5 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    {sponsorshipTiers.map((tier) => (
                      <tr key={tier.id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="py-4 px-6">
                          <div className="font-bold text-white group-hover:text-amber-300 transition-colors">
                            {tier.category}
                          </div>
                          <div className="text-xs text-slate-400 font-normal">
                            {tier.hindiCategory}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 font-bold text-white text-xs">
                            {tier.partners}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-amber-300 font-semibold">
                          {tier.badge}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => openSponsorModal(tier.category)}
                            className="px-3.5 py-1.5 bg-white/10 hover:bg-[#d8392f] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Apply Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tournament Transition Ribbon between Sponsorship & Schedule */}
      <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-[#d8392f] to-blue-500 shadow-md relative z-20" />

      {/* Schedule / Match Center - Athletic Floodlit Stadium Arena */}
      <section id="schedule" className="py-24 bg-gradient-to-b from-[#0e172a] via-[#142343] to-[#0a101f] text-white relative overflow-hidden border-b-2 border-slate-700/80">
        {/* Stadium Floodlight Accents & Mesh Grid */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[350px] bg-blue-500/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-sky-400/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#d8392f]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-blue-500/20 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-black uppercase tracking-widest mb-3 border border-blue-400/30 backdrop-blur-sm">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                Tournament Match Center &amp; Brackets
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter">
                TOURNAMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-white">SCHEDULE</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base mt-2 font-medium max-w-2xl">
                Official 5-day T10 knockout roadmaps hosted under floodlights at Sector 16 Stadium, Chandigarh.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider bg-blue-950/60 px-4 py-2 rounded-xl border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              22 Knockout Matches • 5 Days
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Boys Roadmap - Deep Royal Cobalt */}
            <div className="bg-gradient-to-b from-[#16274a] to-[#0d182e] rounded-3xl p-6 sm:p-8 border-2 border-blue-400/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-500/20">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-0.5">Men&apos;s Championship</div>
                  <h3 className="font-black text-2xl uppercase italic tracking-wider text-white">Boys Division</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  16 Teams • 15 Matches
                </span>
              </div>
              <div className="space-y-3.5">
                {[
                  { phase: "Round of 16", matches: "8 Matches", teams: "16 Teams" },
                  { phase: "Quarter-Finals", matches: "4 Matches", teams: "8 Teams" },
                  { phase: "Semi-Finals", matches: "2 Matches", teams: "4 Teams" },
                  { phase: "Grand Final", matches: "1 Match", teams: "2 Teams" }
                ].map((step, i) => (
                  <div key={i} className="bg-[#091122]/90 p-4 rounded-xl border border-blue-500/20 flex justify-between items-center group hover:border-blue-400 hover:bg-[#0f1b34] transition-all hover:translate-x-1">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 font-black text-white flex items-center justify-center shrink-0 shadow-md">{i + 1}</div>
                      <div>
                        <h4 className="font-bold uppercase tracking-wider text-white group-hover:text-blue-300 transition-colors">{step.phase}</h4>
                        <p className="text-xs text-slate-400">{step.teams}</p>
                      </div>
                    </div>
                    <div className="font-black text-sky-400 italic text-base">{step.matches}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Girls Roadmap - Rich Ruby Crimson */}
            <div className="bg-gradient-to-b from-[#351523] to-[#1c0c14] rounded-3xl p-6 sm:p-8 border-2 border-[#d8392f]/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#d8392f]/20">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-0.5">Women&apos;s Championship</div>
                  <h3 className="font-black text-2xl uppercase italic tracking-wider text-white">Girls Division</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#d8392f]/20 text-rose-300 border border-[#d8392f]/30">
                  8 Teams • 7 Matches
                </span>
              </div>
              <div className="space-y-3.5">
                {[
                  { phase: "Quarter-Finals", matches: "4 Matches", teams: "8 Teams" },
                  { phase: "Semi-Finals", matches: "2 Matches", teams: "4 Teams" },
                  { phase: "Grand Final", matches: "1 Match", teams: "2 Teams" }
                ].map((step, i) => (
                  <div key={i} className="bg-[#180811]/90 p-4 rounded-xl border border-[#d8392f]/20 flex justify-between items-center group hover:border-[#d8392f] hover:bg-[#250d1a] transition-all hover:translate-x-1">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d8392f] to-[#b91c1c] font-black text-white flex items-center justify-center shrink-0 shadow-md">{i + 1}</div>
                      <div>
                        <h4 className="font-bold uppercase tracking-wider text-white group-hover:text-rose-300 transition-colors">{step.phase}</h4>
                        <p className="text-xs text-slate-400">{step.teams}</p>
                      </div>
                    </div>
                    <div className="font-black text-rose-400 italic text-base">{step.matches}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Price & Kit Inclusions Callout Card */}
          <div className="mt-10 bg-gradient-to-r from-[#0b162c] via-[#152342] to-[#0b162c] text-white rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 justify-between shadow-2xl border-2 border-amber-400/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8392f]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#d8392f] text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                  Official Squad Entry
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> 24 Teams Only
                </span>
              </div>
              <h3 className="font-black text-3xl md:text-4xl uppercase italic tracking-tighter text-white">
                Team Registration Fee: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#fb923c]">₹4,999/-</span>
              </h3>
              <p className="font-medium text-slate-300 text-sm mt-1 max-w-xl">
                Fixed squad of 12 players (11 Playing XI + 1 Extra) • Sector 16 Stadium, Chandigarh • 5-Day Event
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>12x Official Custom Jersey Kits (Jersey + Trouser)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Regulation White Leather Match Balls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Match Refreshments &amp; BCCI Grade Umpires</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="/registration"
                className="px-8 py-4 bg-gradient-to-r from-[#d8392f] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white font-black italic text-lg uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_25px_rgba(239,68,68,0.5)] hover:shadow-[0_10px_35px_rgba(239,68,68,0.7)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 border-b-4 border-[#7f1d1d]"
              >
                <span>REGISTER TEAM NOW</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <span className="text-[11px] text-center text-slate-400 font-medium">
                Instant Online Easebuzz Checkout
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Grid (IPL Franchise Style) */}
      <section id="teams" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8 border-b-2 border-[#112240] pb-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic text-[#0b162c] tracking-tighter">
                TOURNAMENT <span className="text-[#d8392f]">TEAMS</span>
              </h2>
            </div>
            <a href="/registration" className="hidden md:flex items-center gap-1 font-bold text-[#d8392f] hover:text-[#b91c1c] uppercase tracking-wider text-sm">
              Register Yours <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
            <button
              onClick={() => setActiveTab('boys')}
              className={`px-6 py-3 md:px-8 font-black italic uppercase tracking-wider md:text-lg rounded-xl transition-all border-b-4 ${activeTab === 'boys' ? 'bg-[#0b162c] text-white border-[#d8392f] shadow-lg scale-105' : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 shadow-sm'}`}
            >
              Boys Division (16)
            </button>
            <button
              onClick={() => setActiveTab('girls')}
              className={`px-6 py-3 md:px-8 font-black italic uppercase tracking-wider md:text-lg rounded-xl transition-all border-b-4 ${activeTab === 'girls' ? 'bg-[#0b162c] text-white border-[#d8392f] shadow-lg scale-105' : 'bg-white text-slate-500 border-transparent hover:bg-slate-50 shadow-sm'}`}
            >
              Girls Division (8)
            </button>
          </div>

          {/* Tournament Teams Grid - IPL Centered Crest Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in" key={activeTab}>
            {(activeTab === 'boys' ? boysTeams : girlsTeams).map((team) => {
              const slug = team.toLowerCase().replace(/\s+/g, '-');
              const logo = teamLogos[slug];
              const detail = teamsData[slug];
              const cardBgFrom = detail?.cardBgFrom || '#0b162c';
              const cardBgTo = detail?.cardBgTo || '#152a4e';
              const glowColor = detail?.glowColor || '#2563eb';
              const accentColor = detail?.accentColor || '#f59e0b';
              const logoPlate = detail?.logoPlate || '';
              const riverText = detail?.river?.replace(/^River\s+/, '') || 'Vedic Division';
              const isTeamRegistered = registeredTeamsList.some(r => r.name.toLowerCase() === team.toLowerCase());

              return (
                <Link
                  key={team}
                  href={`/teams/${slug}`}
                  className="group relative rounded-2xl border p-4 md:p-6 flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-500 ease-out min-h-[290px] md:min-h-[340px]"
                  style={{
                    background: `linear-gradient(145deg, ${cardBgFrom} 0%, ${cardBgTo} 100%)`,
                    borderColor: `${accentColor}33`,
                    boxShadow: `0 10px 25px -5px ${cardBgFrom}cc, 0 8px 10px -6px ${cardBgFrom}aa`
                  }}
                >
                  {/* Subtle Dark Vignette Overlay for uniform text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Diagonal Shimmer Sheen Flare on Hover */}
                  <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -skew-x-12 z-20" />

                  {/* Dynamic Pulsing Ambient Glow */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-52 md:h-52 rounded-full blur-3xl opacity-35 group-hover:opacity-80 group-hover:scale-135 transition-all duration-700 ease-out pointer-events-none"
                    style={{ backgroundColor: glowColor }}
                  />

                  {/* Top Row: River Lineage + Status Badge / Interactive Squad Button */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-200 group-hover:text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 transition-colors truncate max-w-[55%]">
                      {riverText}
                    </span>
                    {isTeamRegistered ? (
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-400/60 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Confirmed
                      </span>
                    ) : (
                      <span
                        className="text-[10px] md:text-xs font-bold text-slate-200 group-hover:text-white px-2.5 py-1 rounded-full border transition-all duration-300 flex items-center gap-0.5"
                        style={{
                          backgroundColor: `${accentColor}25`,
                          borderColor: `${accentColor}55`,
                        }}
                      >
                        Squad <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>

                  {/* Center Hero Logo with Fully Enclosed High-Contrast Emblem Stage */}
                  <div className="relative z-10 my-auto py-2 flex items-center justify-center w-full">
                    {/* Outer Ambient Glow Aura */}
                    <div
                      className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full blur-xl pointer-events-none group-hover:scale-120 transition-transform duration-500"
                      style={{
                        background: `radial-gradient(circle, ${glowColor}60 0%, transparent 70%)`
                      }}
                    />

                    {/* Dedicated High-Contrast Emblem Card (Encloses 100% of the logo & embedded text) */}
                    <div
                      className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl bg-white shadow-xl p-2.5 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                      style={{
                        border: `2px solid ${accentColor}60`,
                        boxShadow: `0 12px 28px -5px rgba(0,0,0,0.5), 0 0 20px ${glowColor}40`
                      }}
                    >
                      <div className="w-full h-full relative flex items-center justify-center">
                        {logo ? (
                          <Image
                            src={logo}
                            alt={`${team} Logo`}
                            width={160}
                            height={160}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Shield className="w-16 h-16 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info: Team Name with Linear Gradient & Tagline / Status Lock */}
                  <div className="relative z-10 text-center w-full pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors">
                    <h3
                      className="font-black text-base md:text-xl uppercase italic tracking-wide transition-all duration-300 leading-tight truncate"
                      style={{
                        background: `linear-gradient(90deg, #ffffff 20%, ${accentColor} 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent'
                      }}
                    >
                      {team}
                    </h3>
                    {isTeamRegistered ? (
                      <p className="text-[10px] md:text-[11px] text-emerald-300 font-bold flex items-center justify-center gap-1 mt-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Official Entry Confirmed (Paid)</span>
                      </p>
                    ) : (
                      <p className="text-[11px] md:text-xs text-slate-400 group-hover:text-slate-300 transition-colors font-medium truncate mt-0.5">
                        {detail?.tagline || 'Official T10 Franchise'}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules & Features Block (IPL format styling) */}
      <section id="rules" className="py-16 bg-[#0b162c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">

            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white tracking-tighter mb-6">
                TOURNAMENT<br />
                <span className="text-[#d8392f]">REGULATIONS</span>
              </h2>
              <p className="text-slate-400 mb-8 font-medium">Standard T10 rules apply. Action-packed, fast-paced matches designed for pure entertainment and skill.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">3 Over Powerplay</h4>
                    <p className="text-slate-400 text-sm">Overs 1 to 3 with standard limited-overs fielding circle restrictions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Bowler Quota</h4>
                    <p className="text-slate-400 text-sm">Max 2 overs per bowler. Minimum 5 bowlers must be utilized.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">DRS & Super Over</h4>
                    <p className="text-slate-400 text-sm">1 Review/innings (retained if successful). Super Over for ties; DLS for rain.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">1 Hour Reporting</h4>
                    <p className="text-slate-400 text-sm">Teams must report 1 hour prior. Toss 15m before match. Strict scratching policy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Kit & Equipment</h4>
                    <p className="text-slate-400 text-sm">Official playing apparel (jersey & trousers) provided by committee. Teams bring personal gear.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d8392f] p-3 rounded-lg text-white shrink-0 shadow-[0_5px_15px_rgba(239,68,68,0.4)]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase italic">Entry Fee: ₹4,999</h4>
                    <p className="text-slate-400 text-sm">Squad of 12 players. Includes 12x official jersey kits, match balls & refreshments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative border-t-8 border-[#d8392f]">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Medal className="w-48 h-48" />
                </div>
                <div className="p-8 md:p-12 relative z-10">
                  <h3 className="text-3xl font-black uppercase italic text-[#0b162c] mb-8">Prize Structure</h3>

                  <div className="grid gap-6">
                    <div className="flex items-center gap-6 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                      <div className="text-4xl md:text-5xl text-[#d8392f] font-black italic">1ST</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Winner</h4>
                        <p className="text-slate-500 font-medium">Trophy + ₹51,000 Cash Prize</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200">
                      <div className="text-4xl md:text-5xl text-slate-400 font-black italic">2ND</div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Runner Up</h4>
                        <p className="text-slate-500 font-medium">Trophy + ₹31,000 Cash Prize</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <div className="text-orange-500 font-black uppercase italic text-sm mb-1">Orange Cap</div>
                        <h4 className="font-bold text-slate-900">Best Batter</h4>
                        <p className="text-slate-600 text-sm font-medium">₹2,100</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <div className="text-purple-500 font-black uppercase italic text-sm mb-1">Purple Cap</div>
                        <h4 className="font-bold text-slate-900">Best Bowler</h4>
                        <p className="text-slate-600 text-sm font-medium">₹2,100</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 bg-amber-50 p-4 md:p-6 rounded-xl border border-amber-200">
                      <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                        <Trophy className="w-7 h-7 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-amber-500 font-black uppercase italic text-xs tracking-widest mb-0.5">Every Match</div>
                        <h4 className="font-bold text-xl text-slate-900 uppercase">Man of the Match</h4>
                        <p className="text-slate-500 font-medium">Official Trophy awarded after each match</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Organizing Committee Section */}
      <section id="organizers" className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10 border-b-2 border-slate-100 pb-4">
            <div>
              <a href="https://sarvsewabharat.org/" target="_blank" rel="noopener noreferrer" className="text-[#d8392f] font-black uppercase text-xs tracking-widest block mb-1 hover:underline">Sarv Sewa Sashktikarn Sangthan (Regd)</a>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#0b162c]">
                ORGANIZING <span className="text-[#d8392f]">COMMITTEE</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {organizers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#d8392f] hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-red-50/40 text-[#0b162c] p-3 text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d8392f] to-[#b91c1c] text-white flex items-center justify-center font-black text-lg mb-1 shadow-md">
                        {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Committee
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="bg-[#d8392f] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md line-clamp-1">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-black uppercase italic tracking-wide text-[#0b162c] group-hover:text-[#d8392f] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#d8392f] font-bold text-[10px] uppercase tracking-wider mt-0.5 leading-tight">
                    {member.designation}
                  </p>
                  <p className="text-slate-400 text-[10px] font-medium mt-0.5 leading-tight">
                    {member.organization}
                  </p>
                  {member.phone ? (
                    <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-[#d8392f] transition-colors mt-1.5 font-bold">
                      <Phone className="w-3 h-3 text-[#d8392f]" /> {member.phone}
                    </a>
                  ) : (
                    <div className="text-[10px] text-slate-400 font-medium mt-1.5 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-slate-400" />
                      <span>Executive Council</span>
                    </div>
                  )}
                  <div className="border-t border-slate-100 mt-2 pt-2 space-y-1">
                    <a href="tel:+919056333759" className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#d8392f] transition-colors font-semibold">
                      <Phone className="w-2.5 h-2.5 text-[#d8392f] shrink-0" />
                      <span>90563 33759</span>
                    </a>
                    <a href="mailto:helposcricketcup@gmail.com" className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#d8392f] transition-colors font-semibold break-all">
                      <Mail className="w-2.5 h-2.5 text-[#d8392f] shrink-0" />
                      <span className="break-all">helposcricketcup@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Upcoming Members Slot */}
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-4 flex flex-col items-center justify-center text-center min-h-[200px] hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-1">More Members</h4>
              <p className="text-slate-400 text-[10px]">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Contact & Number Dialog */}
      {isSponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b162c] text-white rounded-3xl border-2 border-[#d8392f]/70 max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsSponsorModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-2 border border-amber-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Sponsorship Desk
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white leading-tight">
                APPLY FOR <span className="text-[#d8392f]">SPONSORSHIP</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Call or WhatsApp our organizing committee directly to discuss and lock your brand sponsorship slot.
              </p>
            </div>

            {/* Selected Package Highlight */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 border border-white/15 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span className="font-bold uppercase tracking-wider text-amber-400">Selected Category</span>
                <span className="text-[11px] text-slate-400">Sector 16 Stadium, Chandigarh</span>
              </div>
              <div className="text-xl font-black uppercase italic text-white">
                {selectedSponsorTier}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Slots are allotted on a first-confirmed basis for Operation Sindoor Cricket Cup 2.0.
              </p>
            </div>

            {/* Direct Phone Numbers & Quick Actions */}
            <div className="space-y-3 mb-6">
              {/* Helpline Number */}
              <div className="bg-[#112240] rounded-2xl p-4 border border-white/10 hover:border-[#d8392f] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Official Tournament Helpline
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active 24/7
                  </span>
                </div>
                <a
                  href="tel:+919056333759"
                  className="text-2xl font-black text-white hover:text-[#d8392f] transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#d8392f]" />
                  <span>+91 90563 33759</span>
                </a>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                  <a
                    href="tel:+919056333759"
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href={`https://wa.me/919056333759?text=${encodeURIComponent(`Hello, we want to sponsor Operation Sindoor Cricket Cup 2.0 under the "${selectedSponsorTier}" category. Please share the details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Coordinator Vishal */}
              <div className="bg-[#112240] rounded-2xl p-4 border border-white/10 hover:border-[#d8392f] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Vishal Kamboj (Coordinator)
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Sarv Sewa Sashktikarn Sangthan (Regd)
                  </span>
                </div>
                <a
                  href="tel:+918437409211"
                  className="text-2xl font-black text-white hover:text-[#d8392f] transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#d8392f]" />
                  <span>+91 84374 09211</span>
                </a>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                  <a
                    href="tel:+918437409211"
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Vishal Ji</span>
                  </a>
                  <a
                    href={`https://wa.me/918437409211?text=${encodeURIComponent(`Hello Vishal ji, we are interested in sponsoring Operation Sindoor Cricket Cup 2.0 under the "${selectedSponsorTier}" category. Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Coordinator Karan Sama */}
              <div className="bg-[#112240] rounded-2xl p-4 border border-white/10 hover:border-[#d8392f] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Karan Sama (Coordinator)
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Sarv Sewa Sashktikarn Sangthan (Regd)
                  </span>
                </div>
                <a
                  href="tel:+919855109159"
                  className="text-2xl font-black text-white hover:text-[#d8392f] transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#d8392f]" />
                  <span>+91 98551 09159</span>
                </a>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                  <a
                    href="tel:+919855109159"
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Karan Ji</span>
                  </a>
                  <a
                    href={`https://wa.me/919855109159?text=${encodeURIComponent(`Hello Karan ji, we are interested in sponsoring Operation Sindoor Cricket Cup 2.0 under the "${selectedSponsorTier}" category. Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Venue Info */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs text-slate-300 space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Official Email:</span>
                <a href="mailto:helposcricketcup@gmail.com" className="font-bold text-amber-400 hover:underline">
                  helposcricketcup@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Match Venue:</span>
                <span className="font-bold text-white">Sector 16 Cricket Stadium, Chandigarh</span>
              </div>
            </div>

            {/* 1-click WhatsApp CTA */}
            <a
              href={`https://wa.me/919056333759?text=${encodeURIComponent(`Hello, we want to sponsor Operation Sindoor Cricket Cup 2.0 under the "${selectedSponsorTier}" category. Please share the official sponsorship proposal.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black italic text-sm uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Connect on WhatsApp for {selectedSponsorTier}</span>
            </a>
          </div>
        </div>
      )}

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
