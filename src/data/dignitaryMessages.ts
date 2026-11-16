export interface DignitaryMessage {
  id: string;
  name: string;
  nameHindi?: string;
  designation: string;
  designationHindi?: string;
  office: string;
  date: string;
  image: string;
  badge: string;
  highlightQuote: string;
  paragraphs: string[];
  signatory: string;
}

export const dignitaryMessages: DignitaryMessage[] = [
  {
    id: "haryana-cm",
    name: "Shri Nayab Singh",
    nameHindi: "नायब सिंह",
    designation: "Hon'ble Chief Minister, Haryana",
    designationHindi: "मुख्य मन्त्री, हरियाणा",
    office: "Chief Minister's Office, Chandigarh",
    date: "13-11-2026",
    image: "/letters/haryana-cm-appreciation-letter.jpg",
    badge: "Government of Haryana",
    highlightQuote:
      "The theme of Operation Sindoor also reflects the spirit of courage, patriotism and national pride. It is heartening that this initiative seeks to combine sporting excellence with awareness about healthy lifestyles, social responsibility, national integration and a drug-free society.",
    paragraphs: [
      "I am pleased to learn that Sarv Sewa Sashaktikaran Sangthan (SSSS) is organising Operation Sindoor Cricket Cup 2.0 – 2026, an inter-college and university cricket tournament in Chandigarh.",
      "Sports play a vital role in shaping the personality of young people by instilling discipline, teamwork, leadership, determination and a spirit of healthy competition. Such initiatives provide our youth with a constructive platform to showcase their talent, develop confidence and channelise their energy towards positive pursuits.",
      "The theme of Operation Sindoor also reflects the spirit of courage, patriotism and national pride. It is heartening that this initiative seeks to combine sporting excellence with awareness about healthy lifestyles, social responsibility, national integration and a drug-free society.",
      "I congratulate Sarv Sewa Sashaktikaran Sangthan for this commendable initiative and extend my best wishes to all participating teams, players and organisers for the successful conduct of the tournament."
    ],
    signatory: "Nayab Singh • Chief Minister, Haryana"
  }
  // Future letters from governors, ministers, and government officials can be appended here seamlessly.
];

