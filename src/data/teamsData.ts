export interface SquadPlayer {
  number: number;
  jerseyNumber: string;
  role: string;
  name?: string; // Displayed once registration completes; otherwise 'Coming Soon'
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

// Populate logo and theme properties onto every team object
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
});

export const allTeamSlugs = Object.keys(teamsData);
