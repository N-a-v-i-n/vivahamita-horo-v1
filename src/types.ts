/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BirthPreset {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: number;
  ayanamsa: string;
  name_input: string;
}

export const BIRTH_PRESETS: BirthPreset[] = [
  {
    name: "Lord Sree Rama (Ayodhya)",
    year: -1000,
    month: 4,
    day: 10,
    hour: 12,
    minute: 0,
    latitude: 26.7956,
    longitude: 82.1944,
    timezone: 5.5,
    ayanamsa: "Lahiri",
    name_input: "Rama"
  },
  {
    name: "Bill Gates (Seattle)",
    year: 1955,
    month: 10,
    day: 28,
    hour: 21,
    minute: 18,
    latitude: 47.6062,
    longitude: -122.3321,
    timezone: -8,
    ayanamsa: "Lahiri",
    name_input: "William Henry Gates"
  },
  {
    name: "Sri Rajiv Gandhi (Mumbai)",
    year: 1944,
    month: 8,
    day: 20,
    hour: 7,
    minute: 11,
    latitude: 18.97,
    longitude: 72.82,
    timezone: 5.5,
    ayanamsa: "Lahiri",
    name_input: "Rajiv Gandhi"
  },
  {
    name: "Indira Gandhi (Allahabad)",
    year: 1917,
    month: 11,
    day: 19,
    hour: 23,
    minute: 3,
    latitude: 25.43,
    longitude: 81.84,
    timezone: 5.5,
    ayanamsa: "Lahiri",
    name_input: "Indira Gandhi"
  }
];

export const RASHI_NAMES_LOCALIZED: Record<string, string[]> = {
  en: ["Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)", "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"],
  te: ["మేష రాశి (Mesha)", "వృషభ రాశి (Vrishabha)", "మిథున రాశి (Mithuna)", "కర్కాటక రాశి (Karkataka)", "సింహ రాశి (Simha)", "కన్య రాశి (Kanya)", "తులా రాశి (Thula)", "వృశ్చిక రాశి (Vrishchika)", "ధనుస్సు రాశి (Dhanus)", "మకర రాశి (Makara)", "కుంభ రాశి (Kumbha)", "మీన రాశి (Meena)"],
  hi: ["मेष (Mesha)", "वृषभ (Vrishabha)", "मिथुन (Mithuna)", "कर्क (Karka)", "सिंह (Simha)", "कन्या (Kanya)", "तुला (Tula)", "वृश्चिक (Vrishchika)", "धनु (Dhanu)", "मकर (Makara)", "कुंभ (Kumbha)", "मीन (Meena)"],
  ta: ["மேஷம் (Mesham)", "ரிஷபம் (Rishabham)", "மிதுனம் (Midhunam)", "கடகம் (Kadagam)", "சிம்மம் (Simmam)", "கன்னி (Kanni)", "துலாம் (Thulam)", "விருச்சிகம் (Viruchigam)", "தனுசு (Dhanusu)", "மகரம் (Magaram)", "கும்பம் (Kumbam)", "மீனம் (Meenam)"],
  kn: ["ಮೇಷ (Mesha)", "ವೃಶ್ಚಿಕ (Vrishabha)", "ಮಿಥುನ (Mithuna)", "ಕರ್ಕಾಟಕ (Karkataka)", "ಸಿಂహ (Simha)", "ಕನ್ಯಾ (Kanya)", "ತುಲಾ (Thula)", "ವೃಶ್ಚಿಕ (Vrishchika)", "ಧನು (Dhanu)", "ಮಕರ (Makara)", "ಕುಂಭ (Kumbha)", "ಮೀನ (Meena)"]
};

export const RASHI_LORDS = ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"];

export const BHAVA_SIGNIFICANCES = [
  { name: "1st House (Tanu / Ascendant)", key: "Lagna, physical body, health, facial features, temperament, route of destiny" },
  { name: "2nd House (Dhana Bhava)", key: "Speech, liquid assets, physical family, sensory vision, food, childhood" },
  { name: "3rd House (Sahaja Bhava)", key: "Courage, writing skills, direct siblings, short travels, manual dexterity" },
  { name: "4th House (Bandhu Bhava)", key: "Mother, home foundations, high-end vehicles, inner satisfaction, education" },
  { name: "5th House (Putra Bhava)", key: "Children, creativity, cosmic intellect, positive ancestral karma, romance" },
  { name: "6th House (Shatru Bhava)", key: "Debts, routine enemies, active ailments, legal battles, hard labor" },
  { name: "7th House (Kalatra Bhava)", key: "Marriage partner, open trades, legal contracts, public image" },
  { name: "8th House (Ayu Bhava)", key: "Longevity, sudden events, deep secrets, research, mystical occult forces" },
  { name: "9th House (Bhagya Bhava)", key: "Good fortune, gurus, fatherly advice, higher studies, spiritual trips" },
  { name: "10th House (Karma Bhava)", key: "Social rank, professional accomplishments, leadership circles, career flow" },
  { name: "11th House (Labha Bhava)", key: "Gains, professional networking, elder siblings, wishes realized" },
  { name: "12th House (Vyaya Bhava)", key: "Lost efforts, expenditures, foreign journeys, absolute spiritual release" }
];
