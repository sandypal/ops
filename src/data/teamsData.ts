export interface SquadPlayer {
  number: number;
  jerseyNumber: string;
  role: string;
  name?: string; // Displayed once registration completes; otherwise 'Coming Soon'
}

export interface RiverHindiDetail {
  riverNameHindi: string;
  taglineHindi?: string;
  summaryHindi: string;
  originHindi?: string;
  lengthHindi?: string;
}

export interface TeamDetail {
  slug: string;
  name: string;
  division: 'boys' | 'girls';
  river: string;
  riverAncientName: string;
  originLocation: string;
  flowingStates: string[];
  tagline: string;
  culturalTitle: string;
  historyParagraph1: string;
  historyParagraph2: string;
  riverHindi?: RiverHindiDetail;
  gradient: string;
  accentBg: string;
  accentBorder: string;
  badgeColor: string;
  squad: SquadPlayer[];
  logo?: string;
  cardBgFrom?: string;
  cardBgTo?: string;
  glowColor?: string;
  accentColor?: string;
  cardStyle?: string;
  logoPlate?: string;
}

export const createSquadSlots = (): SquadPlayer[] => [
  { number: 1, jerseyNumber: "01", role: "Captain / Top-Order Batter" },
  { number: 2, jerseyNumber: "02", role: "Vice Captain / Strike Bowler" },
  { number: 3, jerseyNumber: "03", role: "Wicketkeeper Batter" },
  { number: 4, jerseyNumber: "04", role: "Top-Order Batter" },
  { number: 5, jerseyNumber: "05", role: "Middle-Order Batter" },
  { number: 6, jerseyNumber: "06", role: "All-Rounder" },
  { number: 7, jerseyNumber: "07", role: "Spin All-Rounder" },
  { number: 8, jerseyNumber: "08", role: "Pace Bowler" },
  { number: 9, jerseyNumber: "09", role: "Fast Medium Bowler" },
  { number: 10, jerseyNumber: "10", role: "Specialist Spinner" },
  { number: 11, jerseyNumber: "11", role: "Death Bowler / Finisher" },
  { number: 12, jerseyNumber: "12", role: "12th Player / Extra Reserve" },
];

export const teamsData: Record<string, TeamDetail> = {
  // ================= BOYS DIVISION (16 TEAMS) =================
  "sindhu-spartans": {
    slug: "sindhu-spartans",
    name: "Sindhu Spartans",
    division: "boys",
    river: "River Sindhu (Indus)",
    riverAncientName: "Sindhu • Rigvedic Cradle of Bharat",
    originLocation: "Mount Kailash & Lake Mansarovar, Tibetan Plateau",
    flowingStates: ["Ladakh", "Jammu & Kashmir", "Punjab Basin"],
    tagline: "The Ancient Torrent of Fearless Fortitude",
    culturalTitle: "Cradle of Vedic Civilization & Unshakable Valor",
    historyParagraph1: "Originating in the celestial heights of Mount Kailash and the sacred waters of Lake Mansarovar, the Sindhu (Indus) is the primordial river that gave our sacred land the immortal names 'Hind' and 'India'. Celebrated throughout the Rigveda as the mighty mother of all northern waters, the Sindhu carved colossal Himalayan gorges, nurturing the world's most sophisticated ancient civilization where harmony, urban genius, and dharmic wisdom first took root thousands of years ago.",
    historyParagraph2: "Just as the thunderous torrents of the Sindhu defy the highest mountain peaks with unstoppable momentum, the Sindhu Spartans embody raw strength, iron discipline, and an ancient warrior spirit. They step onto the cricket pitch carrying the civilizational pride of the north, playing every over with fearless aggression, relentless stamina, and unyielding tactical resolve.",
    gradient: "from-blue-700 via-indigo-900 to-slate-950",
    accentBg: "bg-blue-600",
    accentBorder: "border-blue-500",
    badgeColor: "#2563eb",
    squad: createSquadSlots()
  },

  "satluj-soorme": {
    slug: "satluj-soorme",
    name: "Satluj Soorme",
    division: "boys",
    river: "River Satluj (Sutlej)",
    riverAncientName: "Shatadru • The Mighty Himalayan Roar",
    originLocation: "Lake Rakshastal, Tibet (Near Mount Kailash)",
    flowingStates: ["Himachal Pradesh", "Punjab"],
    tagline: "Gallant Warriors Fueled by the Fiercest Current",
    culturalTitle: "Lifeline of the Five Rivers & Martial Legend",
    historyParagraph1: "Known in antiquity as the holy Shatadru of Vedic scriptures, the Satluj rushes from the glacial mirrors of Lake Rakshastal, cleaving the deepest canyons of Kinnaur before bestowing life and prosperity across the fertile plains of Punjab. For centuries, the roaring Satluj has witnessed the birth of peerless saints, valiant warriors, and revolutionary martyrs who defended Bharat's borders against every invading adversary.",
    historyParagraph2: "True to their name 'Soorme'—the Punjabi tribute to undaunted gallantry—this team channels the thunderous energy of the Bhakra gorge into lightning-fast batting and razor-sharp fielding. They stand united like an impregnable fortress, playing cricket with passion, pride, and the unmatched fighting spirit of the Land of the Five Rivers.",
    gradient: "from-emerald-700 via-teal-900 to-slate-950",
    accentBg: "bg-emerald-600",
    accentBorder: "border-emerald-500",
    badgeColor: "#059669",
    squad: createSquadSlots()
  },

  "beas-blasters": {
    slug: "beas-blasters",
    name: "Beas Blasters",
    division: "boys",
    river: "River Beas (Vipasha)",
    riverAncientName: "Vipasha • Where Alexander Turned Back",
    originLocation: "Beas Kund, Rohtang Pass, Himachal Pradesh",
    flowingStates: ["Himachal Pradesh", "Punjab"],
    tagline: "Explosive Energy from the Glacial Heartlands",
    culturalTitle: "Sacred Meditation of Maharishi Vyas & Eternal Resistance",
    historyParagraph1: "Originating high in the Pir Panjal range at the pristine Beas Kund, the holy river was sanctified by Maharishi Ved Vyas, compiler of the Mahabharata. In world history, the Beas marks the supreme frontier of Indian resilience—it was on her formidable banks in 326 BCE that Alexander the Great's battle-hardened legions met an impassable psychological boundary and turned back toward Greece, honoring the sacred sovereignty of India.",
    historyParagraph2: "Emulating the thunderous, foaming rapids that crash down Kullu valley, the Beas Blasters play an explosive brand of cricket. With high strike-rate boundaries and relentless wicket-taking pace, their style of play resembles an avalanche that leaves opponents breathless and overwhelmed.",
    gradient: "from-amber-600 via-orange-800 to-slate-950",
    accentBg: "bg-amber-600",
    accentBorder: "border-amber-500",
    badgeColor: "#d97706",
    squad: createSquadSlots()
  },

  "brahmaputra-bulls": {
    slug: "brahmaputra-bulls",
    name: "Brahmaputra Bulls",
    division: "boys",
    river: "River Brahmaputra",
    riverAncientName: "Luhit • The Celestial Son of Brahma",
    originLocation: "Angsi Glacier, Mansarovar Himalayas",
    flowingStates: ["Arunachal Pradesh", "Assam"],
    tagline: "Colossal Volume & Untamed Power of the East",
    culturalTitle: "The Sovereign Giant of North-Eastern Valor",
    historyParagraph1: "Revered as the sole masculine river of the Indian subcontinent, the mighty Brahmaputra or 'Luit' descends from glacial Tibetan heights, surging across Assam with unmatched aquatic majesty. For millenia, her vast floodplains have fostered ancient Pragjyotisha, Kamarupa, and the unvanquished Ahom Kingdom, which repelled seventeen foreign invasions with bravery etched on these sacred waters.",
    historyParagraph2: "The Brahmaputra Bulls bring that very colossal momentum onto the cricket field. Intimidating with their towering power-hitting and devastating heavy-ball bowling, they overwhelm rivals like the monsoon crest of their namesake river, bowling and batting with ferocious, unstoppable energy.",
    gradient: "from-red-800 via-rose-950 to-slate-950",
    accentBg: "bg-red-700",
    accentBorder: "border-red-600",
    badgeColor: "#b91c1c",
    squad: createSquadSlots()
  },

  "mahanadi-masters": {
    slug: "mahanadi-masters",
    name: "Mahanadi Masters",
    division: "boys",
    river: "River Mahanadi",
    riverAncientName: "Chitrotpala • The Great River of Kalinga",
    originLocation: "Sihawa Hills, Dhamtari, Chhattisgarh",
    flowingStates: ["Chhattisgarh", "Odisha"],
    tagline: "Serene Composure Turning into Surging Power",
    culturalTitle: "The Great River of Ancient Kalinga & Sacred Endurance",
    historyParagraph1: "Rising from the pristine hills of Sihawa, the Mahanadi ('The Great River') meanders gracefully through the heart of Chhattisgarh and Odisha before mingling with the Bay of Bengal near Jagannath Puri. Revered in ancient Puranas as Chitrotpala, her perennial life-giving waters nurtured the seafaring mariners of Kalinga, magnificent temple architectures, and millennia of unbroken agricultural resilience.",
    historyParagraph2: "The Mahanadi Masters reflect the profound depth and rhythmic cadence of their river. Calm, calculating, and tactically supreme under pressure, their cricketers read match scenarios with uncanny mastery, seamlessly shifting gears from composed defense to devastating finishing strokes.",
    gradient: "from-cyan-800 via-blue-950 to-slate-950",
    accentBg: "bg-cyan-700",
    accentBorder: "border-cyan-600",
    badgeColor: "#0e7490",
    squad: createSquadSlots()
  },

  "ravi-rangers": {
    slug: "ravi-rangers",
    name: "Ravi Rangers",
    division: "boys",
    river: "River Ravi (Iravati)",
    riverAncientName: "Iravati / Parushni • Frontier of Valor",
    originLocation: "Bara Bhangal, Kangra, Himachal Pradesh",
    flowingStates: ["Himachal Pradesh", "Punjab", "Jammu Border"],
    tagline: "Swift, Fearless Guardians of the Frontier",
    culturalTitle: "Rigvedic Battle of Ten Kings & Unbreakable Tenacity",
    historyParagraph1: "Known in the Rigveda as the Parushni and classical Sanskrit as Iravati, the river Ravi emerges from the high glaciated crags of Bara Bhangal in Kangra. It is forever immortalized in Indian history as the site of the epic Dasharajna (Battle of the Ten Kings), where King Sudas upheld the righteous order against a confederation of adversaries on her sacred banks.",
    historyParagraph2: "Operating with the agility, vigilance, and fierce precision of frontier rangers, the Ravi Rangers thrive in cutthroat knockout contests. They hunt in packs in the field, choke opposition scoring rates with tactical bowling, and chase targets with relentless competitive hunger.",
    gradient: "from-sky-700 via-indigo-950 to-slate-950",
    accentBg: "bg-sky-600",
    accentBorder: "border-sky-500",
    badgeColor: "#0284c7",
    squad: createSquadSlots()
  },

  "chenab-challengers": {
    slug: "chenab-challengers",
    name: "Chenab Challengers",
    division: "boys",
    river: "River Chenab (Chandrabhaga)",
    riverAncientName: "Asikni / Chandrabhaga • The Mountain Conqueror",
    originLocation: "Confluence of Chandra and Bhaga, Lahaul-Spiti",
    flowingStates: ["Himachal Pradesh", "Jammu & Kashmir", "Punjab"],
    tagline: "Defying the Odds with Cold Mountain Composure",
    culturalTitle: "The Torrent of Himalayan Valleys & Timeless Legends",
    historyParagraph1: "Formed by the glacial embrace of the Chandra and Bhaga rivers at high-altitude Tandi in Lahaul, the Chenab—anciently celebrated as Asikni—roars through sheer Himalayan gorges of Jammu. Celebrated in Punjabi literature as the immortal river of romance and supreme sacrifice (Sohni-Mahiwal), the Chenab is renowned for its untamed white waters and glacial endurance.",
    historyParagraph2: "The Chenab Challengers reflect this defiant, ice-cold temperament. In pressure cooker match situations where ordinary teams crumble, they hold their nerves with Himalayan stillness, challenging every titan and emerging victorious through steely grit.",
    gradient: "from-blue-900 via-slate-900 to-black",
    accentBg: "bg-blue-800",
    accentBorder: "border-blue-700",
    badgeColor: "#1e40af",
    squad: createSquadSlots()
  },

  "jhelum-jaguars": {
    slug: "jhelum-jaguars",
    name: "Jhelum Jaguars",
    division: "boys",
    river: "River Jhelum (Vitasta)",
    riverAncientName: "Vitasta / Hydaspes • The Valley's Crown",
    originLocation: "Verinag Spring, Pir Panjal, Kashmir Valley",
    flowingStates: ["Jammu & Kashmir", "Punjab"],
    tagline: "Predatory Instincts, Lethal Speed, Tactical Grace",
    culturalTitle: "Sacred Vitasta of Kashmir & Epic Defiance",
    historyParagraph1: "Emerging from the deep sapphire spring of Verinag nestled beneath the Pir Panjal range, the Jhelum (sacred Vitasta in the Nilamata Purana) meanders like a sovereign serpent through the heavenly Kashmir Valley. On her historic banks in ancient times (known to Greeks as the Hydaspes), King Porus mounted an epochal defense of Indian pride with towering elephants and unshakeable fortitude.",
    historyParagraph2: "Like the silent, stealthy prowl of a mountain jaguar, the Jhelum Jaguars strike with surgical timing. Their bowlers exploit early swing with lethal precision, and their batters pounce on loose deliveries with ferocious boundary-hitting elegance.",
    gradient: "from-teal-800 via-emerald-950 to-slate-950",
    accentBg: "bg-teal-600",
    accentBorder: "border-teal-500",
    badgeColor: "#0d9488",
    squad: createSquadSlots()
  },

  "yamuna-yodhas": {
    slug: "yamuna-yodhas",
    name: "Yamuna Yodhas",
    division: "boys",
    river: "River Yamuna",
    riverAncientName: "Kalindi • Daughter of Surya & River of Dharma",
    originLocation: "Yamunotri Glacier, Champasar, Uttarakhand",
    flowingStates: ["Uttarakhand", "Himachal", "Haryana", "Delhi", "Uttar Pradesh"],
    tagline: "Righteous Warriors of Devotion, Strategy & Might",
    culturalTitle: "Sacred Companion to Ganga & Cradle of Braj",
    historyParagraph1: "Born high in the Garhwal Himalayas at Yamunotri, the dark, sacred waters of Yamuna (Kalindi) are revered across Bharat as the beloved daughter of the Sun God Surya and twin sister of Yama. The Yamuna is deeply sanctified in cultural memory as the divine playground of Lord Krishna across Braj, Mathura, and Vrindavan, where dharma was taught and protected through profound inner wisdom.",
    historyParagraph2: "The Yamuna Yodhas play cricket like true righteous warriors ('Yodhas'). Balanced in temperament and fearless in battle, their squad combines tactical street-smartness with sublime technique, never surrendering an inch until the final ball is bowled.",
    gradient: "from-blue-800 via-sky-950 to-slate-950",
    accentBg: "bg-blue-600",
    accentBorder: "border-blue-500",
    badgeColor: "#1d4ed8",
    squad: createSquadSlots()
  },

  "kaveri-warriors": {
    slug: "kaveri-warriors",
    name: "Kaveri Warriors",
    division: "boys",
    river: "River Kaveri (Cauvery)",
    riverAncientName: "Dakshina Ganga • The Sacred River of the South",
    originLocation: "Talakaveri, Brahmagiri Hills, Kodagu (Karnataka)",
    flowingStates: ["Karnataka", "Tamil Nadu", "Kerala", "Puducherry"],
    tagline: "Timeless Discipline & Chola Imperial Resilience",
    culturalTitle: "Mother of the South & Golden Age of Sovereignty",
    historyParagraph1: "Rising gracefully at Talakaveri in the lush misty Western Ghats of Kodagu, the sacred Kaveri is hailed as the 'Dakshina Ganga' (Ganges of the South). Celebrated in classical Sangam literature and revered in Tamil and Kannada traditions, the Kaveri nurtured the golden empires of the Cholas, Pandyas, and Hoysalas whose naval fleets and majestic stone temples inspired the entire world.",
    historyParagraph2: "The Kaveri Warriors embody this southern legacy of unflinching discipline, classical technique, and tactical genius. Like the river that flows uninterrupted across diverse landscapes, they exhibit boundless stamina, immaculate field placement, and a championship mindset that never bows to pressure.",
    gradient: "from-amber-700 via-yellow-950 to-slate-950",
    accentBg: "bg-amber-600",
    accentBorder: "border-amber-500",
    badgeColor: "#d97706",
    squad: createSquadSlots()
  },

  "ghaggar-champions": {
    slug: "ghaggar-champions",
    name: "Ghaggar Champions",
    division: "boys",
    river: "River Ghaggar",
    riverAncientName: "Saraswati Basin • The Sacred Vedic Valley",
    originLocation: "Shivalik Hills of Himachal Pradesh",
    flowingStates: ["Himachal Pradesh", "Haryana", "Punjab", "Rajasthan"],
    tagline: "Channeling the Hidden Depths of Ancient Champions",
    culturalTitle: "Ancient Saraswati Basin & Deep Civilizational Roots",
    historyParagraph1: "Flowing from the Shivalik foothills through the historic battlefields of Haryana and Punjab into the Thar basin, the Ghaggar is identified by geologists and historians as the surviving paleochannel of the legendary Rigvedic river Saraswati. Thousands of Bronze Age Harappan urban sites like Rakhigarhi and Kalibangan flourished along her banks, proving that champion spirit and organized greatness are woven into every drop of her soil.",
    historyParagraph2: "The Ghaggar Champions embody this enduring, deep-rooted excellence. Unpretentious yet lethal, they rely on methodical teamwork, disciplined bowling channels, and explosive lower-order hitting that catches opponents completely off-guard.",
    gradient: "from-purple-800 via-indigo-950 to-slate-950",
    accentBg: "bg-purple-700",
    accentBorder: "border-purple-600",
    badgeColor: "#7e22ce",
    squad: createSquadSlots()
  },

  "ganga-giants": {
    slug: "ganga-giants",
    name: "Ganga Giants",
    division: "boys",
    river: "River Ganga",
    riverAncientName: "Bhagirathi / Jahnavi • The Eternal Soul of India",
    originLocation: "Gangotri Glacier (Gaumukh), Uttarkashi, Uttarakhand",
    flowingStates: ["Uttarakhand", "Uttar Pradesh", "Bihar", "West Bengal"],
    tagline: "Colossal Moral Authority & Supreme Tournament Might",
    culturalTitle: "The Mother of Bharat & Cosmic Celestial Descent",
    historyParagraph1: "Descended from the celestial heavens through the matted locks of Lord Shiva following King Bhagiratha's monumental penance, the holy Ganga is the spiritual soul and supreme maternal lifeline of Bharat. From the glacial silence of Gaumukh through Haridwar, Kashi, and Prayagraj, the Ganga has witnessed the rise of great empires, celebrated timeless philosophy, and sanctified billions of human souls.",
    historyParagraph2: "True to their giant name, the Ganga Giants command the cricket pitch with unmatched majesty and colossal power. They hit colossal sixes, bowl with imposing pace, and play with an aura of invincibility that honors the eternal supremacy of Mother Ganga.",
    gradient: "from-amber-600 via-rose-900 to-slate-950",
    accentBg: "bg-amber-600",
    accentBorder: "border-amber-500",
    badgeColor: "#ea580c",
    squad: createSquadSlots()
  },

  "narmada-titans": {
    slug: "narmada-titans",
    name: "Narmada Titans",
    division: "boys",
    river: "River Narmada (Reva)",
    riverAncientName: "Reva • Daughter of Mahadev Shiva",
    originLocation: "Amarkantak Kund, Anuppur, Madhya Pradesh",
    flowingStates: ["Madhya Pradesh", "Maharashtra", "Gujarat"],
    tagline: "Unshakable Titanic Resolve Carving Its Own Path",
    culturalTitle: "Reva's Westward Torrent & Sacred Solitary Grandeur",
    historyParagraph1: "Born from the tear of Lord Shiva at the mystical forested plateau of Amarkantak, the holy Narmada (Reva) is unique among all Indian great rivers for defiantly carving her way westward through the rift valley between the Vindhya and Satpura mountain ranges. According to Hindu tradition, merely beholding the sacred waters of Mother Narmada grants salvation, inspiring the ancient tradition of the Narmada Parikrama.",
    historyParagraph2: "The Narmada Titans mirror her solitary, titanic courage. They do not follow the conventional flow; instead, they forge their own aggressive match strategies. Their players are built like pillars of basalt stone—unshakable in defense and catastrophic in attack.",
    gradient: "from-blue-700 via-teal-900 to-slate-950",
    accentBg: "bg-blue-600",
    accentBorder: "border-blue-500",
    badgeColor: "#0284c7",
    squad: createSquadSlots()
  },

  "tapti-tigers": {
    slug: "tapti-tigers",
    name: "Tapti Tigers",
    division: "boys",
    river: "River Tapti (Tapi)",
    riverAncientName: "Tapi • The Daughter of the Sun God",
    originLocation: "Multai, Betul District, Satpura Range (Madhya Pradesh)",
    flowingStates: ["Madhya Pradesh", "Maharashtra", "Gujarat"],
    tagline: "Relentless Predatory Heat & Explosive Ferocity",
    culturalTitle: "The Fiery River of the Sun & Unconquerable Satpura Spirit",
    historyParagraph1: "Surging from the hot springs of Multai in the rugged Satpura ranges, the sacred Tapti (Tapi) is revered as the blazing daughter of Surya Dev and sister to Saturn (Shani Dev). Flowing westward through dramatic basalt plateaus into the Gulf of Khambhat, the Tapti is celebrated in folklore for her intense, boiling energy and purifying thermal power.",
    historyParagraph2: "The Tapti Tigers roar with the predatory instinct of the royal Bengal tiger that once ruled the dense Satpura riverbanks. Fast, fiery, and fiercely competitive, their squad attacks every loose delivery with ruthless ferocity and bowls with searing pace that rattles batsmen.",
    gradient: "from-orange-700 via-amber-950 to-slate-950",
    accentBg: "bg-orange-600",
    accentBorder: "border-orange-500",
    badgeColor: "#ea580c",
    squad: createSquadSlots()
  },

  "godavari-knights": {
    slug: "godavari-knights",
    name: "Godavari Knights",
    division: "boys",
    river: "River Godavari",
    riverAncientName: "Dakshin Ganga • Sacred Realm of Sage Gautama",
    originLocation: "Brahmagiri Mountain, Trimbakeshwar, Nashik (Maharashtra)",
    flowingStates: ["Maharashtra", "Telangana", "Andhra Pradesh", "Chhattisgarh"],
    tagline: "Chivalry, Majestic Depth & Champion Tournament Honor",
    culturalTitle: "Grand Patriarch of the Deccan & Spiritual Majesty",
    historyParagraph1: "Cascading from the sacred Brahmagiri hills at Trimbakeshwar Jyotirlinga, the Godavari is India's second-longest river and the grand maternal lifeline of the Deccan. Sanctified by the penance of Sage Gautama and holy pilgrimage sites like Nashik, Paithan, and Rajahmundry, the Godavari has nurtured the illustrious heritage of the Satavahanas, Kakatiyas, and Maratha saints.",
    historyParagraph2: "The Godavari Knights represent the chivalric spirit, expansive wisdom, and noble composure of the Deccan. They play every over with impeccable dignity and tactical poise, wearing their colored jerseys with the solemn pride of honorable knights entering a grand arena.",
    gradient: "from-indigo-800 via-blue-950 to-slate-950",
    accentBg: "bg-indigo-600",
    accentBorder: "border-indigo-500",
    badgeColor: "#4f46e5",
    squad: createSquadSlots()
  },

  "krishna-kings": {
    slug: "krishna-kings",
    name: "Krishna Kings",
    division: "boys",
    river: "River Krishna",
    riverAncientName: "Krishnaveni • Sovereign Nectar of the Deccan",
    originLocation: "Mahabaleshwar, Western Ghats, Maharashtra",
    flowingStates: ["Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"],
    tagline: "Royal Dominance & Sovereign Championship Mastery",
    culturalTitle: "The Sovereign Nectar of the Deccan & Vijayanagara Splendor",
    historyParagraph1: "Originating at the sacred spring of Mahabaleshwar in the high Sahyadri peaks, the Krishna (Krishnaveni) sweeps across the Deccan plateau like a majestic emperor. Across her fertile banks flourished the monumental Vijaynagara Empire, the legendary Bahmani kingdoms, and the Maratha fortresses that defined the military genius and royal sovereignty of medieval India.",
    historyParagraph2: "The Krishna Kings walk onto the field with the commanding authority of royal monarchs. Combining devastating boundary-scoring prowess with an impenetrable bowling lineup, they dominate all phases of the T10 match, holding court with kingly confidence.",
    gradient: "from-amber-600 via-blue-900 to-slate-950",
    accentBg: "bg-amber-500",
    accentBorder: "border-amber-400",
    badgeColor: "#f59e0b",
    squad: createSquadSlots()
  },

  // ================= GIRLS DIVISION (8 TEAMS) =================
  "sindhu-sherniyan": {
    slug: "sindhu-sherniyan",
    name: "Sindhu Sherniyan",
    division: "girls",
    river: "River Sindhu",
    riverAncientName: "Sindhu • The Mother of Northern Waters",
    originLocation: "Mount Kailash Range, Tibet",
    flowingStates: ["Ladakh", "Jammu & Kashmir", "Punjab"],
    tagline: "Fearless Lionesses Powered by Ancient Glacial Roar",
    culturalTitle: "Fiercest Daughters of the Northern Frontier",
    historyParagraph1: "Channeling the primordial strength of the river Sindhu—celebrated in the Rigveda as the roaring lioness among all rivers—the Sindhu Sherniyan represent the untamed pride and historic resilience of our northern borderlands. Born from the holy glaciers of Kailash, the river has nurtured civilizations that never surrendered their spiritual and cultural identity.",
    historyParagraph2: "On the cricket field, the Sindhu Sherniyan play with the predatory grace, blazing speed, and fierce hunger of lionesses. Their fearless strokeplay and venomous bowling make them one of the most formidable squads in the Girls Division.",
    gradient: "from-rose-800 via-red-950 to-slate-950",
    accentBg: "bg-rose-700",
    accentBorder: "border-rose-600",
    badgeColor: "#be123c",
    squad: createSquadSlots()
  },

  "saraswati-strikers": {
    slug: "saraswati-strikers",
    name: "Saraswati Strikers",
    division: "girls",
    river: "River Saraswati",
    riverAncientName: "Saraswati • Goddess of Divine Wisdom & Precision",
    originLocation: "Himalayas / Plaksha Prashravana (Vedic Lore)",
    flowingStates: ["Himachal", "Haryana", "Rajasthan", "Gujarat"],
    tagline: "Flawless Precision, Sharp Intellect, Devastating Finesse",
    culturalTitle: "Divine River of Knowledge & Masterful Strategy",
    historyParagraph1: "Hailed in the Rigveda as 'Ambitame, Naditame, Devitame' (The best of mothers, the best of rivers, the best of goddesses), the sacred Saraswati is the eternal river of divine intellect, arts, and pure spiritual radiance. Her lost sacred channels nourished the great rishis who composed the Vedas and codified Indian philosophical sciences.",
    historyParagraph2: "The Saraswati Strikers approach cricket with intellectual brilliance and clinical precision. Rather than relying on brute force alone, their strokes are exquisitely timed, their field placements are mathematically flawless, and their bowlers outwit opponents with subtle variations.",
    gradient: "from-amber-600 via-orange-950 to-slate-950",
    accentBg: "bg-amber-500",
    accentBorder: "border-amber-400",
    badgeColor: "#d97706",
    squad: createSquadSlots()
  },

  "satluj-sena": {
    slug: "satluj-sena",
    name: "Satluj Sena",
    division: "girls",
    river: "River Satluj",
    riverAncientName: "Shatadru • The Torrent of Fearless Unity",
    originLocation: "Mount Kailash Basin, Tibet",
    flowingStates: ["Himachal Pradesh", "Punjab"],
    tagline: "Disciplined Army of Unbreakable Sisterhood",
    culturalTitle: "Mighty Battalion of the Five Rivers",
    historyParagraph1: "Channeling the roaring velocity of the Satluj as it pierces through the mighty Himalayan gorges of Kinnaur and Bilaspur, the Satluj Sena stands as a unified, disciplined military brigade ('Sena'). For centuries, the courageous women of the Satluj basin have stood on the frontlines of sacrifice, defending homes, culture, and honor.",
    historyParagraph2: "Operating with military precision, the Satluj Sena relies on unbreakable team bonding. Every catch is backed up with intensity, every run between the wickets is sprinted with telepathic understanding, and every bowler bowls with unified tactical intent.",
    gradient: "from-teal-800 via-emerald-950 to-slate-950",
    accentBg: "bg-teal-700",
    accentBorder: "border-teal-600",
    badgeColor: "#0f766e",
    squad: createSquadSlots()
  },

  "yamuna-panthers": {
    slug: "yamuna-panthers",
    name: "Yamuna Panthers",
    division: "girls",
    river: "River Yamuna",
    riverAncientName: "Kalindi • The Dark Panther of the Northern Plains",
    originLocation: "Yamunotri, Lower Himalayas",
    flowingStates: ["Uttarakhand", "Haryana", "Delhi", "Uttar Pradesh"],
    tagline: "Sleek, Fast & Razor-Sharp on the Prowl",
    culturalTitle: "Graceful Agility from the Sacred Banks of Kalindi",
    historyParagraph1: "Gliding with dark, mysterious grace from the glaciers of Yamunotri, the Yamuna has been the muse of poets, saints, and fearless warrior queens. Flowing past Delhi's historic ramparts and the devotion of Vrindavan, her waters symbolize grace under fire, spiritual depth, and quick reflexes in testing times.",
    historyParagraph2: "The Yamuna Panthers play with the agile, lightning-quick reflexes of black panthers. They patrol the inner fielding ring like silent hunters, cutting off singles with diving stops, and strike in the death overs with breathtaking sixes.",
    gradient: "from-sky-800 via-blue-950 to-slate-950",
    accentBg: "bg-sky-700",
    accentBorder: "border-sky-600",
    badgeColor: "#0369a1",
    squad: createSquadSlots()
  },

  "sabarmati-sunrisers": {
    slug: "sabarmati-sunrisers",
    name: "Sabarmati Sunrisers",
    division: "girls",
    river: "River Sabarmati",
    riverAncientName: "Kritavati • The Peaceful River of Moral Resolve",
    originLocation: "Aravalli Range, Udaipur, Rajasthan",
    flowingStates: ["Rajasthan", "Gujarat"],
    tagline: "Peaceful Moral Resolve Transforming into Radiant Fire",
    culturalTitle: "The Cradle of Freedom & Western Horizon Dawn",
    historyParagraph1: "Originating in the ancient Aravalli hills of Rajasthan and flowing through the heart of Gujarat, the Sabarmati is synonymous with world-changing moral courage. It was on her serene banks at Sabarmati Ashram that Mahatma Gandhi forged the non-violent freedom struggle that shook an empire, proving that calm conviction can conquer brute force.",
    historyParagraph2: "The Sabarmati Sunrisers play with that same steady, unyielding determination. Even when dawn seems distant, they rise like the morning sun, playing calculated, composed cricket that outlasts and outplays their adversaries.",
    gradient: "from-amber-600 via-orange-950 to-slate-950",
    accentBg: "bg-amber-600",
    accentBorder: "border-amber-500",
    badgeColor: "#d97706",
    squad: createSquadSlots()
  },

  "kaveri-queens": {
    slug: "kaveri-queens",
    name: "Kaveri Queens",
    division: "girls",
    river: "River Kaveri",
    riverAncientName: "Dakshina Ganga • The Imperial Queen of the South",
    originLocation: "Talakaveri, Brahmagiri Range, Kodagu (Karnataka)",
    flowingStates: ["Karnataka", "Tamil Nadu"],
    tagline: "Sovereign Elegance, Regal Composure & Royal Domination",
    culturalTitle: "Imperial Queens of the Southern Riverlands",
    historyParagraph1: "Born from the sage Agastya's divine water-pot at Talakaveri in the misty coffee hills of Kodagu, Mother Kaveri flows like a sovereign queen nourishing Thanjavur's golden rice granaries and Carnatic musical sanctums. Celebrated as the mother of culture, trade, and royal kingdoms, her gentle demeanor conceals unmeasured civilizational fortitude.",
    historyParagraph2: "The Kaveri Queens rule the cricket pitch with royal composure. Unflappable in tight run-chases and majestic in their strokeplay, they play like rightful queens who consider the championship trophy their destined crown.",
    gradient: "from-purple-800 via-pink-950 to-slate-950",
    accentBg: "bg-purple-700",
    accentBorder: "border-purple-600",
    badgeColor: "#9333ea",
    squad: createSquadSlots()
  },

  "ravi-royals": {
    slug: "ravi-royals",
    name: "Ravi Royals",
    division: "girls",
    river: "River Ravi",
    riverAncientName: "Iravati • The River of Punjabi Royalty & Honor",
    originLocation: "Bara Bhangal, Kangra Valley",
    flowingStates: ["Himachal Pradesh", "Punjab"],
    tagline: "Regal Charisma, Radiant Pride & Fearless Grace",
    culturalTitle: "Royalty of the Sacred Iravati & Folkloric Grandeur",
    historyParagraph1: "Surging from the snowy pinnacles of Kangra through the royal heartlands of Punjab, the Ravi has inspired centuries of romantic folklore, royal poetry, and selfless martyrdom. The women of the Ravi basin are celebrated in historic ballads for their fierce dignity, razor-sharp wit, and fearless defiance of tyranny.",
    historyParagraph2: "The Ravi Royals bring that regal charisma onto the cricket field. Clad in vibrant colors, they play with aristocratic swagger—dispatching fast bowlers over extra cover and taking diving catches with royal effortless flair.",
    gradient: "from-fuchsia-800 via-pink-950 to-slate-950",
    accentBg: "bg-fuchsia-700",
    accentBorder: "border-fuchsia-600",
    badgeColor: "#a21caf",
    squad: createSquadSlots()
  },

  "ganga-glory": {
    slug: "ganga-glory",
    name: "Ganga Glory",
    division: "girls",
    river: "River Ganga",
    riverAncientName: "Maa Ganga • Eternal Purity & National Glory",
    originLocation: "Gangotri Glacier, Gaumukh, Uttarakhand",
    flowingStates: ["Uttarakhand", "Uttar Pradesh", "Bihar", "West Bengal"],
    tagline: "Sacred Maternal Purity & Glorious Championship Flame",
    culturalTitle: "The Eternal Flame of Bharat's Soul & Sacred Glory",
    historyParagraph1: "Cascading down the sacred peaks of the Himalayas to fertilize the vast Gangetic plain, Mother Ganga has nurtured the dreams, devotion, and cultural resilience of India since time immemorial. Revered as the divine mother who washes away all sorrow, she represents uncorrupted purity, spiritual fortitude, and the glorious continuity of Indian womanhood.",
    historyParagraph2: "The Ganga Glory carry that pure, unyielding flame into the tournament. Playing with luminous pride and radiant teamwork, they inspire spectators with every shot and deliver unmatched bowling performances that bring glory to their team and nation.",
    gradient: "from-rose-700 via-amber-950 to-slate-950",
    accentBg: "bg-rose-600",
    accentBorder: "border-rose-500",
    badgeColor: "#e11d48",
    squad: createSquadSlots()
  }
};

// Official Team Logos (16 Boys in /public + 8 Girls in /public/womens)
export const teamLogos: Record<string, string> = {
  // Boys Division (16 Teams)
  "sindhu-spartans": "/sindhuspartans.png",
  "satluj-soorme": "/satlujSoorme.png",
  "beas-blasters": "/beasblasters.png",
  "brahmaputra-bulls": "/brahmputrabulls.png",
  "mahanadi-masters": "/mahanadimasters.png",
  "ravi-rangers": "/ravirangers.png",
  "chenab-challengers": "/chenabchallengers.png",
  "jhelum-jaguars": "/jhelumjaguars.png",
  "yamuna-yodhas": "/yamunayodhas.png",
  "kaveri-warriors": "/kaveriWarriors.png",
  "ghaggar-champions": "/ghaggarchampions.png",
  "ganga-giants": "/gangagiants.png",
  "narmada-titans": "/narmadatitans.png",
  "tapti-tigers": "/tapatitigers.png",
  "godavari-knights": "/godawariknights.png",
  "krishna-kings": "/krishnakings.png",

  // Girls Division (8 Teams in /womens/)
  "sindhu-sherniyan": "/womens/sindhusherniyan.png",
  "saraswati-strikers": "/womens/saraswatistrikers.png",
  "satluj-sena": "/womens/satlujsena.png",
  "yamuna-panthers": "/womens/yamunapanthers.png",
  "sabarmati-sunrisers": "/womens/sabarmatisunrisers.png",
  "kaveri-queens": "/womens/kaveriqueens.png",
  "ravi-royals": "/womens/raviroyals.png",
  "ganga-glory": "/womens/gangaglory.png",
};

// Official Card Theme Palettes for all 24 Teams
export interface TeamThemeColors {
  cardBgFrom: string;
  cardBgTo: string;
  glowColor: string;
  accentColor: string;
  logoPlate?: string;
  cardStyle: string;
}

export const teamThemes: Record<string, TeamThemeColors> = {
  "sindhu-spartans": {
    "cardBgFrom": "#0b162c",
    "cardBgTo": "#152a4e",
    "glowColor": "#2563eb",
    "accentColor": "#f59e0b",
    "logoPlate": "",
    "cardStyle": "Deep Indus royal blue gradient with golden amber glow"
  },
  "satluj-soorme": {
    "cardBgFrom": "#2a0a12",
    "cardBgTo": "#4a0f1e",
    "glowColor": "#d4a017",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Deep maroon wine gradient with imperial gold glow"
  },
  "beas-blasters": {
    "cardBgFrom": "#1c1917",
    "cardBgTo": "#3a2414",
    "glowColor": "#f97316",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Charcoal black to burnt amber gradient with molten orange glow"
  },
  "brahmaputra-bulls": {
    "cardBgFrom": "#2a0508",
    "cardBgTo": "#4d0b12",
    "glowColor": "#dc2626",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Dark obsidian to deep crimson gradient with blood-red glow"
  },
  "mahanadi-masters": {
    "cardBgFrom": "#1a0b2e",
    "cardBgTo": "#2e1457",
    "glowColor": "#a78bfa",
    "accentColor": "#fbbf24",
    "logoPlate": "#f5f3ff",
    "cardStyle": "Royal purple gradient with a soft lavender-white logo plate and gold accents"
  },
  "ravi-rangers": {
    "cardBgFrom": "#0a1f14",
    "cardBgTo": "#123a24",
    "glowColor": "#22c55e",
    "accentColor": "#facc15",
    "logoPlate": "",
    "cardStyle": "Forest green gradient with emerald glow and yellow accents"
  },
  "chenab-challengers": {
    "cardBgFrom": "#07182e",
    "cardBgTo": "#0e3358",
    "glowColor": "#38bdf8",
    "accentColor": "#7dd3fc",
    "logoPlate": "#f0f9ff",
    "cardStyle": "Deep navy to glacial blue gradient with an ice-white logo plate"
  },
  "jhelum-jaguars": {
    "cardBgFrom": "#06140f",
    "cardBgTo": "#0d2e22",
    "glowColor": "#10b981",
    "accentColor": "#fbbf24",
    "logoPlate": "#f8fafc",
    "cardStyle": "Dark jungle emerald gradient with a white logo plate so black outlines show"
  },
  "yamuna-yodhas": {
    "cardBgFrom": "#0a1440",
    "cardBgTo": "#14246b",
    "glowColor": "#3b82f6",
    "accentColor": "#ef4444",
    "logoPlate": "",
    "cardStyle": "Deep indigo-blue gradient with electric blue glow and red accents"
  },
  "kaveri-warriors": {
    "cardBgFrom": "#2b0a0f",
    "cardBgTo": "#4a1018",
    "glowColor": "#dc2626",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Crimson war-red gradient with ember glow and gold accents"
  },
  "ghaggar-champions": {
    "cardBgFrom": "#0a1530",
    "cardBgTo": "#12285a",
    "glowColor": "#f97316",
    "accentColor": "#fb923c",
    "logoPlate": "#fff7ed",
    "cardStyle": "Midnight blue gradient with orange glow and a warm-white logo plate"
  },
  "ganga-giants": {
    "cardBgFrom": "#0b1633",
    "cardBgTo": "#172a5c",
    "glowColor": "#f59e0b",
    "accentColor": "#ff9933",
    "logoPlate": "#f8fafc",
    "cardStyle": "Deep navy gradient with saffron glow and a white logo plate"
  },
  "narmada-titans": {
    "cardBgFrom": "#12161c",
    "cardBgTo": "#262e3a",
    "glowColor": "#ef4444",
    "accentColor": "#f87171",
    "logoPlate": "",
    "cardStyle": "Dark steel-slate gradient with fierce red glow"
  },
  "tapti-tigers": {
    "cardBgFrom": "#1a0f05",
    "cardBgTo": "#3a1d08",
    "glowColor": "#f97316",
    "accentColor": "#fb923c",
    "logoPlate": "#f8fafc",
    "cardStyle": "Dark jungle brown gradient with tiger-orange glow and a white logo plate"
  },
  "godavari-knights": {
    "cardBgFrom": "#0a1740",
    "cardBgTo": "#172d6e",
    "glowColor": "#60a5fa",
    "accentColor": "#cbd5e1",
    "logoPlate": "#f1f5f9",
    "cardStyle": "Royal blue gradient with silver accents and a pale silver logo plate"
  },
  "krishna-kings": {
    "cardBgFrom": "#021c26",
    "cardBgTo": "#064456",
    "glowColor": "#06b6d4",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Deep peacock teal gradient with cyan glow and gold accents"
  },
  "sindhu-sherniyan": {
    "cardBgFrom": "#042326",
    "cardBgTo": "#0a4147",
    "glowColor": "#14b8a6",
    "accentColor": "#fbbf24",
    "logoPlate": "#f0fdfa",
    "cardStyle": "Deep teal gradient with golden accents and a mint-white logo plate"
  },
  "saraswati-strikers": {
    "cardBgFrom": "#14123a",
    "cardBgTo": "#26227a",
    "glowColor": "#818cf8",
    "accentColor": "#facc15",
    "logoPlate": "#eef2ff",
    "cardStyle": "Deep indigo gradient with yellow accents and a pale lavender logo plate"
  },
  "satluj-sena": {
    "cardBgFrom": "#1f0709",
    "cardBgTo": "#420d12",
    "glowColor": "#ef4444",
    "accentColor": "#e5e7eb",
    "logoPlate": "",
    "cardStyle": "Dark battle-red gradient with crimson glow and silver accents"
  },
  "yamuna-panthers": {
    "cardBgFrom": "#150a24",
    "cardBgTo": "#2c1250",
    "glowColor": "#a855f7",
    "accentColor": "#e9d5ff",
    "logoPlate": "#faf5ff",
    "cardStyle": "Midnight purple gradient with violet glow and a soft white-lilac logo plate"
  },
  "sabarmati-sunrisers": {
    "cardBgFrom": "#0b1a3a",
    "cardBgTo": "#152c5e",
    "glowColor": "#fb923c",
    "accentColor": "#fde047",
    "logoPlate": "",
    "cardStyle": "Pre-dawn navy gradient with sunrise orange glow and golden yellow accents"
  },
  "kaveri-queens": {
    "cardBgFrom": "#2a0620",
    "cardBgTo": "#520d3f",
    "glowColor": "#ec4899",
    "accentColor": "#fbbf24",
    "logoPlate": "",
    "cardStyle": "Deep magenta-plum gradient with pink glow and royal gold accents"
  },
  "ravi-royals": {
    "cardBgFrom": "#0c1a3d",
    "cardBgTo": "#1e3a8a",
    "glowColor": "#3b82f6",
    "accentColor": "#e2e8f0",
    "logoPlate": "#eff6ff",
    "cardStyle": "Royal blue gradient with silver accents and an ice-white logo plate"
  },
  "ganga-glory": {
    "cardBgFrom": "#062033",
    "cardBgTo": "#0c3a5c",
    "glowColor": "#38bdf8",
    "accentColor": "#fb923c",
    "logoPlate": "#f0f9ff",
    "cardStyle": "Sacred river blue gradient with orange accents and a pale sky logo plate"
  }
};

// ================= RIVER HINDI HIGHLIGHTS (SUMMARY OF SACRED RIVERS) =================
export const riverHindiData: Record<string, RiverHindiDetail> = {
  "sindhu": {
    riverNameHindi: "सिंधु नदी: सभ्यता की आदि-जीवनधारा एवं सनातन शौर्य",
    taglineHindi: "प्राचीन वैदिक सभ्यता की जननी एवं अमर शौर्य का आदि-स्रोत",
    summaryHindi: "सिंधु नदी (Indus) विश्व की प्राचीनतम और भारत को 'हिंद' व 'इंडिया' नाम देने वाली आदि-जीवनधारा है। इसका उद्गम तिब्बत में पवित्र कैलाश मानसरोवर के निकट सेंगे जांगबो हिमनद से होता है। लद्दाख के लेह से होकर बहती हुई यह नदी विशाल हिमालयी घाटियों का निर्माण करती है। ऋग्वेद की ऋचाओं में सिंधु की गर्जना और विस्तार का विराट वर्णन मिलता है। 5000 वर्ष प्राचीन विश्वप्रसिद्ध सिंधु घाटी सभ्यता (हड़प्पा व मोहनजोदड़ो) इसी पावन जलधारा के तटों पर पुष्पित-पल्लवित हुई थी। सिंधु अदम्य साहस, भारतीय उपमहाद्वीप की सभ्यतागत पहचान और सनातन शौर्य का अमर प्रतीक है।",
    originHindi: "कैलाश मानसरोवर (सेंगे जांगबो हिमनद), तिब्बत",
    lengthHindi: "लगभग 3,180 किमी"
  },
  "satluj": {
    riverNameHindi: "सतलुज नदी: पंजाब की जीवनधारा एवं शौर्य गाथा",
    taglineHindi: "वैदिक शतुद्रि एवं हरित क्रांति की आधारशिला",
    summaryHindi: "सतलुज नदी (प्राचीन वैदिक शतुद्रि) तिब्बत में मानसरोवर के निकट राक्षसताल झील से निकलकर किन्नौर की संकरी घाटियों को चीरती हुई हिमाचल प्रदेश और पंजाब के उपजाऊ मैदानों को सींचती है। इसकी प्रमुख सहायक नदियों में स्पीति, बास्पा और ब्यास शामिल हैं। इस नदी पर निर्मित विश्वप्रसिद्ध भाखड़ा-नंगल बाँध और गोबिंद सागर जलाशय भारत की हरित क्रांति और ऊर्जा विकास के आधार स्तंभ हैं। आनंदपुर साहिब और कीरतपुर साहिब जैसे पवित्र धार्मिक एवं ऐतिहासिक स्थल इसके तटों के निकट स्थित हैं। सिंधु जल संधि की प्रमुख पूर्वी नदियों में शामिल सतलुज पंजाब की पांच नदियों की शान, शौर्य और अमर लोक-संस्कृति की सशक्त जीवनधारा है।",
    originHindi: "राक्षसताल झील (मानसरोवर के निकट), तिब्बत",
    lengthHindi: "लगभग 1,450 किमी"
  },
  "beas": {
    riverNameHindi: "ब्यास नदी: विपाशा की पावन धारा एवं अदम्य इतिहास",
    taglineHindi: "महर्षि वेदव्यास की तपोभूमि एवं सिकंदर के विजय अभियान का अंतिम पड़ाव",
    summaryHindi: "ब्यास नदी (प्राचीन विपाशा) का उद्गम हिमाचल प्रदेश के रोहतांग दर्रे के निकट स्थित पवित्र ब्यास कुंड से होता है। यह कुल्लू, मंडी और कांगड़ा जिलों से होकर बहती हुई पंजाब में हरिके के निकट सतलुज नदी में मिल जाती है। इसकी प्रमुख सहायक नदियों में पार्वती, सैंज, तीर्थन और ऊहल शामिल हैं। पौराणिक परंपरा के अनुसार इसका संबंध महाभारत के रचयिता महर्षि वेदव्यास से है। ऐतिहासिक दृष्टि से 326 ईसा पूर्व में सिकंदर की अजेय सेनाओं ने इसी नदी के तट पर भारतीय शौर्य के समक्ष आगे बढ़ने से इनकार कर दिया था। इस पर निर्मित पोंग बाँध (महाराणा प्रताप सागर) और पंडोह बाँध कृषि, ऊर्जा और जैव विविधता के प्रमुख केंद्र हैं।",
    originHindi: "ब्यास कुंड, रोहतांग दर्रा (हिमाचल प्रदेश)",
    lengthHindi: "लगभग 470 किमी"
  },
  "brahmaputra": {
    riverNameHindi: "ब्रह्मपुत्र नदी: पूर्वांचल का महाबली नद एवं अहोम पराक्रम",
    taglineHindi: "भारतीय उपमहाद्वीप का एकमात्र नद एवं पूर्वोत्तर की जीवनरेखा",
    summaryHindi: "ब्रह्मपुत्र नदी (असमिया में 'लुइत' व तिब्बत में 'यारलुंग त्सांगपो') भारतीय उपमहाद्वीप की एकमात्र पुरुष नदी (नद) के रूप में पूजनीय है। मानसरोवर के निकट आंग्सी हिमनद से निकलकर यह अरुणाचल के दिहांग गॉर्ज से भारत में प्रवेश करती है और असम की विशाल घाटी को अपने अकूत जलप्रवाह से अभिसिंचित करती है। इसके तट पर स्थित कामख्या धाम और माजुली द्वीप (विश्व का सबसे बड़ा नदी द्वीप) असमिया संस्कृति के प्राण हैं। इस नदी ने अहोम साम्राज्य के उस अदम्य पराक्रम को देखा है जिसने सत्रह बार विदेशी आक्रमणों को धूल चटाई थी। ब्रह्मपुत्र पूर्वोत्तर भारत की शक्ति, समृद्धि और प्राकृतिक वैभव का मुकुटमणि है।",
    originHindi: "आंग्सी हिमनद (कैलाश मानसरोवर के निकट), तिब्बत",
    lengthHindi: "लगभग 2,900 किमी"
  },
  "mahanadi": {
    riverNameHindi: "महानदी: छत्तीसगढ़ एवं ओडिशा की पुण्य सलिला",
    taglineHindi: "प्राचीन चित्रोत्पला एवं हीराकुंड बाँध की अमर जीवनधारा",
    summaryHindi: "महानदी पूर्व-मध्य भारत की प्रमुख प्रायद्वीपीय नदी है, जिसका उद्गम छत्तीसगढ़ के धमतरी जिले में सिहावा पर्वतश्रेणी के निकट से होता है। यह मुख्य रूप से छत्तीसगढ़ और ओडिशा से होकर पूर्व दिशा में बहती हुई बंगाल की खाड़ी में एक विशाल उपजाऊ डेल्टा बनाती है। प्राचीन धार्मिक ग्रंथों में इसे 'चित्रोत्पला' कहा गया है। इसकी सहायक नदियों में शिवनाथ, हसदेव, मांड और तेल शामिल हैं। इसके तट पर राजिम (छत्तीसगढ़ का प्रयाग), सिरपुर, संबलपुर और कटक जैसे ऐतिहासिक नगर स्थित हैं। इस पर निर्मित प्रसिद्ध 'हीराकुंड बाँध' भारत की प्रमुख बहुउद्देशीय परियोजनाओं में से एक है। महानदी दोनों राज्यों की कृषि, धान के कटोरे और लोक-संस्कृति का मूलाधार है।",
    originHindi: "सिहावा पर्वतश्रेणी (धमतरी, छत्तीसगढ़)",
    lengthHindi: "लगभग 851 किमी"
  },
  "ravi": {
    riverNameHindi: "रावी नदी: वैदिक इरावती एवं पंजाब का लोक-गौरव",
    taglineHindi: "दशराज्ञ युद्ध की साक्षी एवं पंजाबी आत्मसम्मान की धारा",
    summaryHindi: "रावी नदी (वैदिक इरावती एवं परुष्णी) सिंधु नदी प्रणाली की प्रमुख धारा है, जिसका उद्गम हिमाचल प्रदेश के कांगड़ा जिले के बड़ा भंगाल क्षेत्र में धौलाधार पर्वतश्रेणी से होता है। यह चंबा से होकर पंजाब के पठानकोट और भारत-पाकिस्तान सीमा के साथ बहते हुए चिनाब में मिलती है। इसकी सहायक नदियों में उझ, सियूल और बैरा शामिल हैं। वैदिक काल का ऐतिहासिक 'दशराज्ञ युद्ध' इसी नदी के तट पर लड़ा गया था। इस पर निर्मित रणजीत सागर (थीन) बाँध और शाहपुरकंडी परियोजना पंजाब और जम्मू-कश्मीर के कृषि व ऊर्जा विकास के प्रमुख आधार हैं। रावी पंजाब की ऐतिहासिक विरासत, लोक-गीतों और सांस्कृतिक पहचान का प्रतीक है।",
    originHindi: "बड़ा भंगाल, धौलाधार पर्वत (कांगड़ा, हिमाचल प्रदेश)",
    lengthHindi: "लगभग 720 किमी"
  },
  "chenab": {
    riverNameHindi: "चिनाब नदी: वैदिक अस्किनी एवं हिमालयी ऊर्जा का केंद्र",
    taglineHindi: "चंद्रभागा का संगम, लोकगाथाओं की साक्षी एवं विशाल जलविद्युत शक्ति",
    summaryHindi: "चिनाब नदी (प्राचीन अस्किनी व चंद्रभागा) का उद्गम हिमाचल प्रदेश के लाहौल-स्पीति में बारालाचा ला दर्रे के निकट चंद्रा और भागा नदियों के तांडी में संगम से होता है। यह हिमाचल और जम्मू-कश्मीर से होकर बहती हुई पाकिस्तान में प्रवेश करती है। इसकी प्रमुख सहायक नदियों में मरुसुदर, तवी और कलनई शामिल हैं। इस पर सलाल, बगलिहार, दुलहस्ती और रतले जैसी प्रमुख जलविद्युत परियोजनाएँ स्थित हैं। पंजाब की लोकसंस्कृति, साहित्य और प्रसिद्ध प्रेमाख्यान 'हीर-रांझा' तथा 'सोहनी-महिवाल' का संबंध चिनाब से ही जुड़ा हुआ है। चिनाब हिमालयी प्राकृतिक संपदा और ऐतिहासिक विरासत का महत्त्वपूर्ण प्रतीक है।",
    originHindi: "चंद्रा-भागा संगम (बारालाचा ला दर्रा, लाहौल-स्पीति)",
    lengthHindi: "लगभग 960 किमी"
  },
  "jhelum": {
    riverNameHindi: "झेलम नदी: वैदिक वितस्ता एवं कश्मीर घाटी की प्राणरेखा",
    taglineHindi: "वेरीनाग की अमृत धारा एवं राजा पुरु के शौर्य की साक्षी",
    summaryHindi: "झेलम नदी (प्राचीन वैदिक वितस्ता) कश्मीर घाटी की प्रमुख जीवनरेखा है, जिसका उद्गम अनंतनाग जिले में पीर पंजाल की तलहटी में स्थित प्रसिद्ध वेरीनाग चश्मे से होता है। यह श्रीनगर, डल झील और वुलर झील से होकर बहती हुई बारामूला के रास्ते आगे बढ़ती है। प्राचीन यूनानी इतिहास में इसे 'हाइडस्पेस' कहा गया है, जहाँ 326 ईसा पूर्व में राजा पुरु (पोरस) ने सिकंदर के विरुद्ध अद्वितीय वीरता का परिचय दिया था। झेलम कश्मीर के धार्मिक-आध्यात्मिक चिंतन, केसर की क्यारियों, काष्ठ कला और शांत वादियों की शाश्वत सांस्कृतिक पहचान है।",
    originHindi: "वेरीनाग चश्मा (पीर पंजाल, अनंतनाग, जम्मू-कश्मीर)",
    lengthHindi: "लगभग 725 किमी"
  },
  "yamuna": {
    riverNameHindi: "यमुना नदी: कृष्ण भक्ति, संस्कृति एवं राष्ट्रीय एकता की जीवनधारा",
    taglineHindi: "सूर्यपुत्री यमी, ब्रज संस्कृति की धुरी एवं गंगा की प्रमुख सहायक",
    summaryHindi: "यमुना नदी भारत की पवित्र और गंगा की सबसे बड़ी सहायक नदी है, जिसका उद्गम उत्तराखंड में बंदरपूँछ पर्वत शृंखला के यमुनोत्री हिमनद (6,387 मीटर) से होता है। लगभग 1,376 किमी बहते हुए यह हिमाचल, हरियाणा, दिल्ली और उत्तर प्रदेश से गुजरती हुई प्रयागराज के त्रिवेणी संगम में गंगा में विलीन होती है। पौराणिक मान्यता में सूर्यदेव की पुत्री और यमराज की बहन मानी जाने वाली यमुना भगवान श्रीकृष्ण की बाल लीलाओं, मथुरा, वृंदावन और ब्रज संस्कृति की साक्षी रही है। आगरा का ताजमहल और दिल्ली भी इसके तट पर स्थित हैं। पश्चिमी व पूर्वी यमुना नहरों के माध्यम से यह उत्तर भारत की कृषि, पेयजल और खाद्य सुरक्षा का प्रमुख आधार है।",
    originHindi: "यमुनोत्री हिमनद, बंदरपूँछ (उत्तरकाशी, उत्तराखंड)",
    lengthHindi: "लगभग 1,376 किमी"
  },
  "kaveri": {
    riverNameHindi: "कावेरी नदी: दक्षिण गंगा एवं चोल संस्कृति की पुण्यधारा",
    taglineHindi: "तलकावेरी की पावन धारा एवं दक्षिण भारत का अन्न भंडार",
    summaryHindi: "कावेरी नदी दक्षिण भारत की सर्वाधिक पूजनीय नदियों में से एक है, जिसे 'दक्षिण गंगा' भी कहा जाता है। इसका उद्गम कर्नाटक के कोडगु (कूर्ग) जिले में पश्चिमी घाट की ब्रह्मगिरि पर्वतश्रेणी के तलकावेरी से होता है। लगभग 765 किमी का प्रवाह तय करते हुए यह कर्नाटक और तमिलनाडु से होकर बंगाल की खाड़ी में विलीन होती है। इसकी सहायक नदियों में हेमावती, काबिनी, भवानी और अमरावती शामिल हैं। इसके तट पर तलकावेरी, श्रीरंगपट्टनम, शिवसमुद्रम जलप्रपात और श्रीरंगम स्थित हैं। कृष्णराज सागर (KRS) और मेट्टूर बाँध से सिंचित इसका डेल्टा धान की खेती, कर्नाटक-तमिलनाडु की कृषि, मंदिर स्थापत्य और शास्त्रीय संगीत की समृद्ध विरासत का केंद्र है।",
    originHindi: "तलकावेरी, ब्रह्मगिरि पर्वतमाला (कोडगु, कर्नाटक)",
    lengthHindi: "लगभग 765 किमी"
  },
  "ghaggar": {
    riverNameHindi: "घग्गर नदी: सरस्वती पुराप्रवाह एवं हड़प्पा सभ्यता की साक्षी",
    taglineHindi: "प्राचीन सरस्वती-दृषद्वती घाटी एवं 5000 वर्ष पुरानी नगर सभ्यता",
    summaryHindi: "घग्गर नदी उत्तर भारत की ऐतिहासिक नदी है, जिसका उद्गम हिमाचल प्रदेश के सोलन जिले में शिवालिक पहाड़ियों (डगशई) से होता है। यह हरियाणा, पंजाब और राजस्थान के मरुस्थलीय क्षेत्रों से होकर बहती है। उपग्रह एवं भूवैज्ञानिक अध्ययनों के अनुसार इसे लुप्त वैदिक सरस्वती नदी प्रणाली का ही पुराप्रवाह माना जाता है। इसकी घाटी में बनावली, राखीगढ़ी और कालीबंगा जैसे विश्वप्रसिद्ध हड़प्पाकालीन पुरातात्विक स्थल स्थित हैं, जो भारत के 5000 वर्ष प्राचीन उन्नत नगर-नियोजन के साक्ष्य देते हैं। घग्गर इस अंचल के कृषि जीवन, भूजल और प्राचीन भारतीय सभ्यता की एक अविभाज्य कड़ी है।",
    originHindi: "शिवालिक पहाड़ियां, डगशई (हिमाचल प्रदेश)",
    lengthHindi: "लगभग 320 किमी"
  },
  "ganga": {
    riverNameHindi: "माँ गंगा: भारत की पावन जीवनधारा एवं राष्ट्रीय चेतना",
    taglineHindi: "सभ्यता की जननी, त्रिवेणी संगम एवं भारतीय आत्मा का शाश्वत प्रतीक",
    summaryHindi: "गंगा नदी भारत की सर्वाधिक पूजनीय और राष्ट्रीय जीवनधारा है, जिसका उद्गम उत्तराखंड के उत्तरकाशी में गंगोत्री हिमनद के गोमुख से होता है। देवप्रयाग में भागीरथी और अलकनंदा के संगम के बाद यह गंगा कहलाती है। 2,525 किमी का सफर तय करते हुए यह उत्तराखंड, उत्तर प्रदेश, बिहार और पश्चिम बंगाल से होकर बंगाल की खाड़ी में विश्वप्रसिद्ध सुंदरबन डेल्टा का निर्माण करती है। इसके तट पर हरिद्वार, प्रयागराज (त्रिवेणी संगम) और वाराणसी जैसे मोक्षदायी तीर्थ बसे हैं। गंगा बेसिन देश की सबसे बड़ी आबादी को आजीविका, उपजाऊ जलोढ़ मिट्टी, पेयजल और आध्यात्मिक शांति प्रदान करता है। गंगा भारत की ऐतिहासिक चेतना और राष्ट्रीय एकता की अमर धारा है।",
    originHindi: "गंगोत्री हिमनद (गोमुख), उत्तरकाशी, उत्तराखंड",
    lengthHindi: "लगभग 2,525 किमी"
  },
  "narmada": {
    riverNameHindi: "नर्मदा नदी: माँ रेवा, अमरकंटक की धारा एवं मध्य भारत की शान",
    taglineHindi: "सप्त पवित्र नदियों में वंदनीय, भेड़ाघाट की सुंदरता एवं सरदार सरोवर",
    summaryHindi: "नर्मदा नदी (प्राचीन रेवा) भारत की प्रमुख पश्चिमवाहिनी नदी है, जिसका उद्गम मध्य प्रदेश के अनूपपुर जिले में मैकल पर्वतश्रेणी के अमरकंटक से होता है। विंध्य और सतपुड़ा के मध्य भ्रंश घाटी से बहती हुई यह 1,312 किमी का सफर तय कर मध्य प्रदेश, महाराष्ट्र और गुजरात से होकर खंभात की खाड़ी (अरब सागर) में मिलती है। अमरकंटक, ओंकारेश्वर ज्योतिर्लिंग, महेश्वर और जबलपुर का संगमरमरी भेड़ाघाट-धुआँधार जलप्रपात इसके तट पर स्थित हैं। इस पर निर्मित सरदार सरोवर, इंदिरा सागर और ओंकारेश्वर बाँध देश की सिंचाई व विद्युत के मेरुदंड हैं। नर्मदा परिक्रमा की प्राचीन परंपरा भारतीय जनमानस की इसके प्रति अगाध श्रद्धा को दर्शाती है।",
    originHindi: "अमरकंटक, मैकल पर्वतश्रेणी (अनूपपुर, मध्य प्रदेश)",
    lengthHindi: "लगभग 1,312 किमी"
  },
  "tapti": {
    riverNameHindi: "ताप्ती नदी: सूर्यपुत्री तापी एवं पश्चिमी भारत की जीवनरेखा",
    taglineHindi: "सतपुड़ा की भ्रंश घाटी, ऐतिहासिक सूरत एवं उकाई परियोजना",
    summaryHindi: "ताप्ती नदी (तापी) मध्य व पश्चिमी भारत की प्रमुख पश्चिमवाहिनी नदी है, जिसका उद्गम मध्य प्रदेश के बैतूल जिले में सतपुड़ा पर्वतश्रेणी के मुलताई नामक स्थान से होता है। 724 किमी की यात्रा में यह भ्रंश घाटी से गुजरते हुए मध्य प्रदेश, महाराष्ट्र और गुजरात से बहकर सूरत के निकट खंभात की खाड़ी (अरब सागर) में मिलती है। पौराणिक मान्यता में सूर्यदेव की पुत्री मानी जाने वाली ताप्ती के तट पर सूरत, बुरहानपुर और भुसावल जैसे ऐतिहासिक व व्यापारिक केंद्र स्थित हैं। सूरत का समुद्री व्यापार ऐतिहासिक रूप से इसी नदी के कारण फला-फूला। इस पर निर्मित उकाई बाँध और हथनूर बाँध सिंचाई, बाढ़ नियंत्रण और जलविद्युत का मुख्य आधार हैं।",
    originHindi: "मुलताई, सतपुड़ा पर्वतश्रेणी (बैतूल, मध्य प्रदेश)",
    lengthHindi: "लगभग 724 किमी"
  },
  "godavari": {
    riverNameHindi: "गोदावरी नदी: दक्षिण गंगा एवं कुंभ पर्व की पवित्र धारा",
    taglineHindi: "प्रायद्वीपीय भारत की सबसे लंबी नदी एवं त्र्यंबकेश्वर की पुण्यभूमि",
    summaryHindi: "गोदावरी नदी प्रायद्वीपीय भारत की सबसे लंबी (1,465 किमी) और देश की दूसरी सबसे बड़ी नदी है, जिसे श्रद्धा से 'दक्षिण गंगा' कहा जाता है। इसका उद्गम महाराष्ट्र के नासिक जिले में त्र्यंबकेश्वर के निकट ब्रह्मगिरि पर्वत से होता है। महाराष्ट्र, तेलंगाना और आंध्र प्रदेश से पूर्व दिशा में बहती हुई यह बंगाल की खाड़ी में एक उपजाऊ डेल्टा बनाती है। इसकी प्रमुख सहायक नदियों में प्राणहिता, इंद्रावती और मंजिरा शामिल हैं। नासिक में त्र्यंबकेश्वर ज्योतिर्लिंग और पंचवटी इसके तट पर स्थित हैं, जहाँ भव्य कुंभ मेला आयोजित होता है। जयकवाड़ी और पोलावरम जैसी विशाल परियोजनाएँ दक्षिण भारत की कृषि, पेयजल और समृद्धि को संबल प्रदान करती हैं।",
    originHindi: "त्र्यंबकेश्वर, ब्रह्मगिरि पर्वत (नासिक, महाराष्ट्र)",
    lengthHindi: "लगभग 1,465 किमी"
  },
  "krishna": {
    riverNameHindi: "कृष्णा नदी: दक्षिण भारत का अन्न भंडार एवं नागार्जुन सागर",
    taglineHindi: "महाबलेश्वर की कृष्णवेणी, श्रीशैलम ज्योतिर्लिंग एवं समृद्ध डेल्टा",
    summaryHindi: "कृष्णा नदी (प्राचीन कृष्णवेणी) दक्षिण भारत की प्रमुख पूर्ववाहिनी नदी है, जिसका उद्गम महाराष्ट्र के सतारा जिले में महाबलेश्वर के निकट पश्चिमी घाट की सह्याद्रि पर्वतश्रेणी से होता है। 1,400 किमी लंबी यह नदी महाराष्ट्र, कर्नाटक, तेलंगाना और आंध्र प्रदेश से होकर बंगाल की खाड़ी में विलीन होती है। इसकी प्रमुख सहायक नदियों में भीमा, तुंगभद्रा और कोयना शामिल हैं। इसके तट पर स्थित श्रीशैलम का मल्लिकार्जुन ज्योतिर्लिंग, विजयवाड़ा का कनक दुर्गा मंदिर और प्राचीन बौद्ध केंद्र नागार्जुनकोंडा ऐतिहासिक व धार्मिक दृष्टि से अत्यंत पावन हैं। अलमट्टी, श्रीशैलम और नागार्जुन सागर बाँध दक्षिण भारत की कृषि और जलविद्युत के विशाल केंद्र हैं।",
    originHindi: "महाबलेश्वर, सह्याद्रि पर्वतश्रेणी (सतारा, महाराष्ट्र)",
    lengthHindi: "लगभग 1,400 किमी"
  },
  "saraswati": {
    riverNameHindi: "माँ सरस्वती: ऋग्वैदिक नदितमा एवं सनातन ज्ञान परंपरा",
    taglineHindi: "सभ्यता की आदि-जननी, वेदों की उद्घोषिका एवं त्रिवेणी संगम की अदृश्य धारा",
    summaryHindi: "सरस्वती नदी भारतीय सभ्यता, वैदिक संस्कृति और सनातन ज्ञान परंपरा की सर्वाधिक पूजनीय नदी है। ऋग्वेद में इसे 'अम्बितमे, नदितमे, देवितमे' कहकर वंदना की गई है। ऐतिहासिक मान्यताओं के अनुसार इसका प्रवाह शिवालिक की पहाड़ियों (आदिबद्री) से होकर कुरुक्षेत्र, हरियाणा और राजस्थान से होते हुए आगे बढ़ता था। इसी पावन घाटी में ऋषियों ने वेदों और उपनिषदों की रचना की। प्रयागराज के त्रिवेणी संगम में गंगा और यमुना के साथ अदृश्य सरस्वती के मिलन की पावन मान्यता है। सरस्वती केवल एक प्राचीन नदी की स्मृति नहीं, बल्कि ज्ञान, विद्या, संगीत, कला और भारत की चिरंतन सांस्कृतिक चेतना का अमर प्रतीक है।",
    originHindi: "आदिबद्री, शिवालिक पर्वतमाला (हरियाणा/हिमाचल सीमा)",
    lengthHindi: "प्राचीन वैदिक पुराप्रवाह"
  },
  "sabarmati": {
    riverNameHindi: "साबरमती नदी: स्वाधीनता संग्राम की गवाह एवं महात्मा गांधी की तपोभूमि",
    taglineHindi: "अरावली की धारा, ऐतिहासिक साबरमती आश्रम एवं दांडी यात्रा का उद्गम",
    summaryHindi: "साबरमती नदी पश्चिमी भारत की प्रमुख पश्चिमवाहिनी नदी है, जिसका उद्गम राजस्थान के उदयपुर जिले में अरावली पर्वतश्रेणी की पहाड़ियों से होता है। लगभग 371 किमी की यात्रा तय कर यह राजस्थान और गुजरात से होकर खंभात की खाड़ी (अरब सागर) में मिलती है। गुजरात की राजधानी गांधीनगर और औद्योगिक नगरी अहमदाबाद इसके तट पर स्थित हैं। वर्ष 1917 में राष्ट्रपिता महात्मा गांधी ने इसके तट पर ऐतिहासिक 'साबरमती आश्रम' की स्थापना की थी, जिसने भारतीय स्वतंत्रता आंदोलन को अहिंसा और सत्याग्रह की दिशा दी। 1930 की ऐतिहासिक दांडी यात्रा यहीं से प्रारंभ हुई थी। साबरमती भारत के स्वतंत्रता संग्राम और गुजरात की सांस्कृतिक पहचान की अमर प्रतीक है।",
    originHindi: "अरावली पर्वतश्रेणी, उदयपुर (राजस्थान)",
    lengthHindi: "लगभग 371 किमी"
  }
};

// Map each of the 24 teams to its corresponding river key
const teamToRiverKey: Record<string, string> = {
  // Boys Division (16)
  "sindhu-spartans": "sindhu",
  "satluj-soorme": "satluj",
  "beas-blasters": "beas",
  "brahmaputra-bulls": "brahmaputra",
  "mahanadi-masters": "mahanadi",
  "ravi-rangers": "ravi",
  "chenab-challengers": "chenab",
  "jhelum-jaguars": "jhelum",
  "yamuna-yodhas": "yamuna",
  "kaveri-warriors": "kaveri",
  "ghaggar-champions": "ghaggar",
  "ganga-giants": "ganga",
  "narmada-titans": "narmada",
  "tapti-tigers": "tapti",
  "godavari-knights": "godavari",
  "krishna-kings": "krishna",

  // Girls Division (8)
  "sindhu-sherniyan": "sindhu",
  "saraswati-strikers": "saraswati",
  "satluj-sena": "satluj",
  "yamuna-panthers": "yamuna",
  "sabarmati-sunrisers": "sabarmati",
  "kaveri-queens": "kaveri",
  "ravi-royals": "ravi",
  "ganga-glory": "ganga",
};

// Populate logo, theme, and Hindi river highlights onto every team object
Object.keys(teamsData).forEach((slug) => {
  teamsData[slug].logo = teamLogos[slug] || "/logo.png";
  if (teamThemes[slug]) {
    teamsData[slug].cardBgFrom = teamThemes[slug].cardBgFrom;
    teamsData[slug].cardBgTo = teamThemes[slug].cardBgTo;
    teamsData[slug].glowColor = teamThemes[slug].glowColor;
    teamsData[slug].accentColor = teamThemes[slug].accentColor;
    teamsData[slug].logoPlate = teamThemes[slug].logoPlate;
    teamsData[slug].cardStyle = teamThemes[slug].cardStyle;
  }
  const riverKey = teamToRiverKey[slug];
  if (riverKey && riverHindiData[riverKey]) {
    teamsData[slug].riverHindi = riverHindiData[riverKey];
  }
});

export const allTeamSlugs = Object.keys(teamsData);
