/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode, TranslationSet } from "../types/astrology";

// Translation tables for astrology terms to avoid any hardcoding
export const PLANET_TRANSLATIONS: Record<string, TranslationSet> = {
  Sun: {
    en: "Sun",
    te: "సూర్యుడు (Surya)",
    hi: "सूर्य (Surya)",
    ta: "சூரியன் (Suriyan)",
    kn: "ಸೂರ್ಯ (Surya)"
  },
  Moon: {
    en: "Moon",
    te: "చంద్రుడు (Chandra)",
    hi: "चंद्र (Chandra)",
    ta: "சந்திரன் (Chandran)",
    kn: "ಚಂದ್ರ (Chandra)"
  },
  Mars: {
    en: "Mars",
    te: "కుజుడు (Kuja)",
    hi: "मंगल (Mangal)",
    ta: "செவ்வாய் (Sevvai)",
    kn: "ಮಂಗಳ (Mangala)"
  },
  Mercury: {
    en: "Mercury",
    te: "బుధుడు (Budha)",
    hi: "बुध (Budh)",
    ta: "புதன் (Budhan)",
    kn: "ಬುಧ (Budha)"
  },
  Jupiter: {
    en: "Jupiter",
    te: "గురుడు (Guru)",
    hi: "गुरु (Guru/Brihaspati)",
    ta: "குரு (Guru)",
    kn: "ಗುರು (Guru)"
  },
  Venus: {
    en: "Venus",
    te: "శుక్రుడు (Shukra)",
    hi: "शुक्र (Shukra)",
    ta: "சுக்கிரன் (Sukran)",
    kn: "ಶುಕ್ರ (Shukra)"
  },
  Saturn: {
    en: "Saturn",
    te: "శని (Shani)",
    hi: "शनि (Shani)",
    ta: "சனி (Shani)",
    kn: "ಶನಿ (Shani)"
  },
  Rahu: {
    en: "Rahu",
    te: "రాహువు (Rahu)",
    hi: "राहु (Rahu)",
    ta: "ராகு (Rahu)",
    kn: "ರಾಹು (Rahu)"
  },
  Ketu: {
    en: "Ketu",
    te: "కేతువు (Ketu)",
    hi: "केतु (Ketu)",
    ta: "கேது (Ketu)",
    kn: "ಕೇತು (Ketu)"
  },
  Uranus: {
    en: "Uranus",
    te: "ఇంద్రుడు (Uranus)",
    hi: "अरुण (Uranus)",
    ta: "யுரேனஸ் (Uranus)",
    kn: "ಯುರೇನಸ್ (Uranus)"
  },
  Neptune: {
    en: "Neptune",
    te: "वरుడు (Neptune)",
    hi: "वरुण (Neptune)",
    ta: "நெப்டியூன் (Neptune)",
    kn: "ನೆಪ್ಚೂನ್ (Neptune)"
  },
  Pluto: {
    en: "Pluto",
    te: "యముడు (Pluto)",
    hi: "यम (Pluto)",
    ta: "புளூட்டோ (Pluto)",
    kn: "ಪ್ಲುಟೊ (Pluto)"
  },
  Lagna: {
    en: "Lagna (Ascendant)",
    te: "లగ్నం (Lagna)",
    hi: "लग्न (Lagna)",
    ta: "லக்னம் (Lagnam)",
    kn: "ಲಗ್ನ (Lagna)"
  }
};

export const RASHI_TRANSLATIONS: TranslationSet[] = [
  {
    en: "Mesha (Aries)",
    te: "మేష రాశి (Mesha)",
    hi: "मेष (Mesha)",
    ta: "மேஷம் (Mesham)",
    kn: "ಮೇಷ (Mesha)"
  },
  {
    en: "Vrishabha (Taurus)",
    te: "వృషభ రాశి (Vrishabha)",
    hi: "वृषभ (Vrishabha)",
    ta: "ரிஷபம் (Rishabham)",
    kn: "ವೃಷಭ (Vrishabha)"
  },
  {
    en: "Mithuna (Gemini)",
    te: "మిథున రాశి (Mithuna)",
    hi: "मिथुन (Mithuna)",
    ta: "மிதுனம் (Midhunam)",
    kn: "ಮಿಥುನ (Mithuna)"
  },
  {
    en: "Karka (Cancer)",
    te: "కర్కాటక రాశి (Karkataka)",
    hi: "कर्क (Karka)",
    ta: "கடகம் (Kadagam)",
    kn: "ಕರ್ಕಾಟಕ (Karkataka)"
  },
  {
    en: "Simha (Leo)",
    te: "సింహ రాశి (Simha)",
    hi: "सिंह (Simha)",
    ta: "சிம்மம் (Simmam)",
    kn: "ಸಿಂಹ (Simha)"
  },
  {
    en: "Kanya (Virgo)",
    te: "కన్యా రాశి (Kanya)",
    hi: "कन्या (Kanya)",
    ta: "கன்னி (Kanni)",
    kn: "ಕನ್ಯာ (Kanya)"
  },
  {
    en: "Tula (Libra)",
    te: "తులా రాశి (Thula)",
    hi: "तुला (Tula)",
    ta: "துலாம் (Thulam)",
    kn: "ತುಲಾ (Thula)"
  },
  {
    en: "Vrishchika (Scorpio)",
    te: "వృశ్చిక రాశి (Vrishchika)",
    hi: "वृश्चिक (Vrishchika)",
    ta: "விருச்சிகம் (Viruchigam)",
    kn: "ವೃಶ್ಚಿಕ (Vrishchika)"
  },
  {
    en: "Dhanu (Sagittarius)",
    te: "ధనుస్సు రాశి (Dhanus)",
    hi: "धनु (Dhanu)",
    ta: "தனுசு (Dhanusu)",
    kn: "ಧನು (Dhanu)"
  },
  {
    en: "Makara (Capricorn)",
    te: "మకర రాశి (Makara)",
    hi: "मकर (Makara)",
    ta: "மகரம் (Magaram)",
    kn: "ಮಕರ (Makara)"
  },
  {
    en: "Kumbha (Aquarius)",
    te: "కుంభ రాశి (Kumbha)",
    hi: "कुंभ (Kumbha)",
    ta: "கும்பம் (Kumbam)",
    kn: "ಕುಂಭ (Kumbha)"
  },
  {
    en: "Meena (Pisces)",
    te: "మీన రాశి (Meena)",
    hi: "मीन (Meena)",
    ta: "மீனம் (Meenam)",
    kn: "ಮೀನ (Meena)"
  }
];

export const NAKSHATRA_TRANSLATIONS: TranslationSet[] = [
  { en: "Ashwini", te: "అశ్విని", hi: "अश्विनी", ta: "அஸ்வினி", kn: "ಅಶ್ವಿನಿ" },
  { en: "Bharani", te: "భరణి", hi: "भरणी", ta: "பரணி", kn: "ಭರಣಿ" },
  { en: "Krittika", te: "కృత్తిక", hi: "कृत्तिका", ta: "கார்த்திகை", kn: "ಕೃತ್ತಿಕಾ" },
  { en: "Rohini", te: "రోహిణి", hi: "रोहिणी", ta: "ரோகிணி", kn: "ರೋಹಿಣಿ" },
  { en: "Mrigashira", te: "మృగశిర", hi: "मृगशिरा", ta: "மிருகசீரிடம்", kn: "ಮೃಗಶಿರ" },
  { en: "Ardra", te: "ఆర్ద్ర", hi: "आर्द्रा", ta: "திருவாதிரை", kn: "ಆರಿದ್ರ" },
  { en: "Punarvasu", te: "పునర్వసు", hi: "पुनर्वसु", ta: "புனர்பூசம்", kn: "ಪುನರ್ವಸು" },
  { en: "Pushya", te: "పుష్యమి", hi: "पुष्य", ta: "பூசம்", kn: "ಪುಷ್ಯ" },
  { en: "Ashlesha", te: "ఆశ్లేష", hi: "आश्लेषा", ta: "ஆயில்யம்", kn: "ಆಶ್ಲೇಷ" },
  { en: "Magha", te: "మఖ", hi: "मघा", ta: "மகம்", kn: "ಮಖಾ" },
  { en: "Purva Phalguni", te: "పుబ్బ (పూర్వఫల్గుణి)", hi: "पूर्वाफाल्गुनी", ta: "பூரம்", kn: "ಪೂರ್ವಾಫಲ್ಗುಣಿ" },
  { en: "Uttara Phalguni", te: "ఉత్తర (ఉత్తరఫల్గుణి)", hi: "उत्तराफाल्गुनी", ta: "உத்திரம்", kn: "ಉತ್ತರಾಫಲ್ಗುಣಿ" },
  { en: "Hasta", te: "హస్త", hi: "हस्त", ta: "அஸ்தம்", kn: "ಹస్త" },
  { en: "Chitra", te: "చిత్త", hi: "चित्रा", ta: "சித்திரை", kn: "ಚಿತ್ರಾ" },
  { en: "Swati", te: "స్వాతి", hi: "स्वाती", ta: "சுவாதி", kn: "ಸ್ವಾತಿ" },
  { en: "Vishakha", te: "విశాఖ", hi: "विशाखा", ta: "விசாகம்", kn: "ವಿಶಾಖ" },
  { en: "Anuradha", te: "అనూరాధ", hi: "अनुराधा", ta: "அனுஷம்", kn: "ಅನುರಾಧ" },
  { en: "Jyeshtha", te: "జ్యేష్ఠ", hi: "ज्येष्ठा", ta: "கேட்டை", kn: "ಜ್ಯೇಷ್ಠ" },
  { en: "Mula", te: "మూల", hi: "मूल", ta: "மூலம்", kn: "ಮೂಲ" },
  { en: "Purva Ashadha", te: "పూర్వాషాఢ", hi: "पूर्वाषाढ़ा", ta: "பூராடம்", kn: "ಪೂರ್ವಾಷಾಢ" },
  { en: "Uttara Ashadha", te: "उत्तराषाढ़ा", hi: "उत्तराषाढ़ा", ta: "உத்திராடம்", kn: "ಉತ್ತರಾಷಾಢ" },
  { en: "Shravana", te: "శ్రవణం", hi: "श्रवण", ta: "திருவோணம்", kn: "ಶ್ರವಣ" },
  { en: "Dhanishta", te: "ధనిష్ఠ", hi: "धनिष्ठा", ta: "அவிட்டம்", kn: "ಧನಿಷ್ಠ" },
  { en: "Shatabhisha", te: "శతభిషం", hi: "शतभिषा", ta: "சதயம்", kn: "ಶತಭಿಷ" },
  { en: "Purva Bhadrapada", te: "పూర్వాభాద్ర", hi: "पूर्वाभाद्रपद", ta: "பூரட்டாதி", kn: "ಪೂರ್ವಾಭಾದ್ರಪದ" },
  { en: "Uttara Bhadrapada", te: "ఉత్తరాభాద్ర", hi: "उत्तराभाद्रपद", ta: "உத்திரட்டாதி", kn: "ಉತ್ತರಾಭಾದ್ರಪದ" },
  { en: "Revati", te: "రేవతి", hi: "रेवती", ta: "ரேவதி", kn: "ರೇವತಿ" }
];

export const YOGA_TRANSLATIONS: TranslationSet[] = [
  { en: "Vishkumbha", te: "విష్కంభం", hi: "विष्कम्भ", ta: "விஷ்கம்பம்", kn: "ವಿಷ್ಕುಂಭ" },
  { en: "Priti", te: "ప్రీతి", hi: "प्रीति", ta: "பிரீதி", kn: "ಪ್ರೀತಿ" },
  { en: "Ayushman", te: "ఆయుష్మాన్", hi: "आयुष्मान्", ta: "ஆயுஷ்மான்", kn: "ಆಯುಷ್ಮಾನ್" },
  { en: "Saubhagya", te: "సౌభాగ్యం", hi: "सौभाग्य", ta: "சௌபாக்கியம்", kn: "ಸೌಭಾಗ್ಯ" },
  { en: "Shobhana", te: "శోభనం", hi: "शोभन", ta: "சோபனம்", kn: "ಶೋಭನ" },
  { en: "Atiganda", te: "అతిగండం", hi: "अतिगण्ड", ta: "அதிகண்டம்", kn: "ಅತಿಗಂಡ" },
  { en: "Sukarma", te: "సుకర్మ", hi: "सुकर्मा", ta: "சுகர்மம்", kn: "ಸುಕರ್ಮ" },
  { en: "Dhriti", te: "ధృతి", hi: "धृति", ta: "திருதி", kn: "ಧೃತಿ" },
  { en: "Shoola", te: "శూలం", hi: "शूल", ta: "சூலம்", kn: "ಶೂಲ" },
  { en: "Ganda", te: "గండం", hi: "गण्ड", ta: "கண்டம்", kn: "ಗಂಡ" },
  { en: "Vriddhi", te: "వృద్ధి", hi: "वृद्धि", ta: "விருத்தி", kn: "ವೃದ್ಧಿ" },
  { en: "Dhruva", te: "ధ్రువ", hi: "ध्रुव", ta: "துருவம்", kn: "ಧ್ರುವ" },
  { en: "Vyaghata", te: "వ్యాఘాతం", hi: "व्याघात", ta: "வியாகாதம்", kn: "ವ್ಯಾಘಾತ" },
  { en: "Harshana", te: "హర్షణం", hi: "हर्षण", ta: "அரிஷணம்", kn: "ಹರ್ಷಣ" },
  { en: "Vajra", te: "వజ్రం", hi: "वज्र", ta: "வச்சிரம்", kn: "ವಜ್ರ" },
  { en: "Siddhi", te: "సిద్ధి", hi: "सिद्धि", ta: "சித்தி", kn: "ಸಿದ್ಧಿ" },
  { en: "Vyatipata", te: "వ్యతీపాతం", hi: "व्यतीपात", ta: "வியதீபாதம்", kn: "ವ್ಯತೀಪಾತ" },
  { en: "Variyan", te: "వరీయాన్", hi: "वरीयान्", ta: "வரியான்", kn: "ವರೀಹಾನ್" },
  { en: "Parigha", te: "పరిఘం", hi: "परिघ", ta: "பரிகம்", kn: "ಪರಿಘ" },
  { en: "Shiva", te: "శివం", hi: "शिव", ta: "சிவம்", kn: "ಶಿವ" },
  { en: "Siddha", te: "సిద్ధం", hi: "सिद्ध", ta: "சித்தம்", kn: "ಸಿದ್ಧ" },
  { en: "Sadhya", te: "సాధ్యం", hi: "साध्य", ta: "சாத்தியம்", kn: "ಸಾದ್ಯ" },
  { en: "Shubha", te: "శుభం", hi: "शुभ", ta: "சுபம்", kn: "ಶುಭ" },
  { en: "Shukla", te: "శుక్లం", hi: "शुक्ल", ta: "சுக்கிலம்", kn: "ಶುಕ್ಲ" },
  { en: "Brahma", te: "బ్రహ్మ", hi: "ब्रह्म", ta: "பிரம்மம்", kn: "ಬ್ರಹ್మ" },
  { en: "Indra", te: "ఐంద్రం", hi: "इन्द्र", ta: "இந்திரன்", kn: "ಇಂದ್ರ" },
  { en: "Vaidhriti", te: "వైధృతి", hi: "वैधृति", ta: "வைதிருதி", kn: "ವೈಧೃತಿ" }
];

export const KARANA_TRANSLATIONS: TranslationSet[] = [
  { en: "Bava", te: "బవ", hi: "बव", ta: "பவம்", kn: "ಬವ" },
  { en: "Balava", te: "బాలవ", hi: "बालव", ta: "பாலவம்", kn: "ಬಾಲವ" },
  { en: "Kaulava", te: "కౌలవ", hi: "कौलव", ta: "கௌலவம்", kn: "ಕೌಲವ" },
  { en: "Taitila", te: "తైతిల", hi: "तैतिल", ta: "சைதிலம்", kn: "ತೈತಿಲ" },
  { en: "Gara", te: "గరజ", hi: "गर", ta: "கரசை", kn: "ಗರ" },
  { en: "Vanija", te: "వణిజ", hi: "वणिज", ta: "வணசை", kn: "ವಣಿಜ" },
  { en: "Vishti", te: "భద్ర (విష్టి)", hi: "भद्रा (विष्टि)", ta: "பத்திரை (விஷ்டி)", kn: "ಭದ್ರಾ (ವಿಷ್ಟಿ)" },
  { en: "Shakuni", te: "శకుని", hi: "शकुनि", ta: "சகுனி", kn: "ಶకుని" },
  { en: "Chatuspada", te: "చతుష్పాద", hi: "चतुष्पाद", ta: "சதுஷ்பாதம்", kn: "ಚತುಷ್ಪಾದ" },
  { en: "Naga", te: "నాగవంతి", hi: "नाग", ta: "நாகவம்", kn: "ನಾಗ" },
  { en: "Kintughna", te: "కింస్తుఘ్నం", hi: "किंस्तुघ्न", ta: "கிம்ஸ்துக்னம்", kn: "ಕಿಂಸ್ತುಘ್ನ" }
];

export const TITHI_TRANSLATIONS: TranslationSet[] = [
  { en: "Prathama (1)", te: "పాడ్యమి (ప్రథమ)", hi: "प्रतिपदा (प्रथमा)", ta: "பிரதமை", kn: "ಪಾಡ್ಯಮಿ (ಪ್ರಥಮ)" },
  { en: "Dwitiya (2)", te: "విదియ (ద్వితీయ)", hi: "द्वितीया", ta: "துவிதியை", kn: "ಬಿದಿಗೆ (ದ್ವಿತೀಯ)" },
  { en: "Tritiya (3)", te: "తదియ (తృతీయ)", hi: "तृतीया", ta: "திருதியை", kn: "ತದಿಗೆ (ತೃತೀಯ)" },
  { en: "Chaturthi (4)", te: "చవితి (చతుర్థి)", hi: "चतुर्थी", ta: "சதுர்த்தி", kn: "ಚೌತಿ (ಚತುర్థి)" },
  { en: "Panchami (5)", te: "పంచమి", hi: "पंचमी", ta: "பஞ்சமி", kn: "ಪಂಚಮಿ" },
  { en: "Shashti (6)", te: "షష్ఠి", hi: "षष्ठी", ta: "சஷ்டி", kn: "ಷಷ್ಠಿ" },
  { en: "Saptami (7)", te: "సప్తమి", hi: "सप्तमी", ta: "சப்தமி", kn: "ಸಪ್ತಮಿ" },
  { en: "Ashtami (8)", te: "అష్టమి", hi: "अष्टमी", ta: "அஷ்டமி", kn: "ಅಷ್ಟಮಿ" },
  { en: "Navami (9)", te: "నవమి", hi: "नवमी", ta: "நவமி", kn: "ನವಮಿ" },
  { en: "Dashami (10)", te: "దశమి", hi: "दशमी", ta: "தசமி", kn: "ದಶಮಿ" },
  { en: "Ekadashi (11)", te: "ఏకాదశి", hi: "एकादशी", ta: "ஏகாதசி", kn: "ಏಕಾದಶಿ" },
  { en: "Dwadashi (12)", te: "ద్వాదశి", hi: "द्वादशी", ta: "துவாதசி", kn: "ದ್ವಾದಶಿ" },
  { en: "Trayodashi (13)", te: "త్రయోదశి", hi: "त्रयोदशी", ta: "திரயோதசி", kn: "ತ್ರಯೋದಶಿ" },
  { en: "Chaturdashi (14)", te: "చతుర్దశి", hi: "चतुर्दशी", ta: "சதுர்தசி", kn: "ಚತುರ್ದಶಿ" },
  { en: "Purnima (15)", te: "పౌర్ణమి (పూర్ణిమ)", hi: "पूर्णिमा", ta: "பௌர்ணமி", kn: "ಹುಣ್ಣಿಮೆ (ಪೂರ್ಣಿಮ)" },
  { en: "Amavasya (30)", te: "అమావాస్య", hi: "अमावस्या", ta: "அமாவாசை", kn: "ಅಮಾವಾಸ್ಯೆ" }
];

export const PAKSHA_TRANSLATIONS: Record<string, TranslationSet> = {
  Shukla: {
    en: "Shukla Paksha (Waxing)",
    te: "శుక్ల పక్షం",
    hi: "शुक्ल पक्ष",
    ta: "சுக்ல பட்சம் (வளர்பிறை)",
    kn: "ಶುಕ್ಲ ಪಕ್ಷ"
  },
  Krishna: {
    en: "Krishna Paksha (Waning)",
    te: "కృష్ణ పక్షం",
    hi: "कृष्ण पक्ष",
    ta: "கிருஷ்ண பட்சம் (தேய்பிறை)",
    kn: "ಕೃಷ್ಣ ಪಕ್ಷ"
  }
};

export const DIGNITY_TRANSLATIONS: Record<string, TranslationSet> = {
  Exalted: {
    en: "Exalted (Ucha)",
    te: "ఉచ్ఛ స్థితి",
    hi: "उच्च (Exalted)",
    ta: "உச்சம்",
    kn: "ಉಚ್ಛ"
  },
  Debilitated: {
    en: "Debilitated (Neecha)",
    te: "నీచ స్థితి",
    hi: "नीच (Debilitated)",
    ta: "நீசம்",
    kn: "ನೀಚ"
  },
  Own: {
    en: "Own House (Swa Rasi)",
    te: "స్వక్షేత్రం",
    hi: "स्वराशि (Swa Rasi)",
    ta: "ஆட்சி",
    kn: "ಸ್ವಕ್ಷೇತ್ರ"
  },
  Friend: {
    en: "Friendly House (Mitra)",
    te: "మిత్ర క్షేత్రం",
    hi: "मित्र राशि",
    ta: "நட்பு",
    kn: "ಮಿತ್ರ ಕ್ಷೇತ್ರ"
  },
  Enemy: {
    en: "Enemical House (Shatru)",
    te: "శత్రు క్షేత్రం",
    hi: "शत्रु राशि",
    ta: "பகை",
    kn: "ಶತ್ರು ಕ್ಷೇತ್ರ"
  },
  Neutral: {
    en: "Neutral House (Sama)",
    te: "సమ స్థితి",
    hi: "सम राशि",
    ta: "சமம்",
    kn: "ಸಮ"
  }
};

export const KOOTA_TRANSLATIONS: Record<string, TranslationSet> = {
  Varna: {
    en: "Varna (Ego & Work)",
    te: "వర్ణ కూట",
    hi: "वर्ण कूट",
    ta: "வர்ண பொருத்தம்",
    kn: "ವರ್ಣ ಕೂಟ"
  },
  Vashya: {
    en: "Vashya (Mutual Attraction & Dominance)",
    te: "వశ్య కూట",
    hi: "वश्य कूट",
    ta: "வசிய பொருத்தம்",
    kn: "ವಶ್ಯ ಕೂಟ"
  },
  Tara: {
    en: "Tara (Destiny & Compatibility)",
    te: "తారా కూట",
    hi: "तारा कूट",
    ta: "தாரா பொருத்தம்",
    kn: "ತಾರಾ ಕೂಟ"
  },
  Yoni: {
    en: "Yoni (Physical & Intimacy Compatibility)",
    te: "యోని కూట",
    hi: "योनी कूट",
    ta: "யோனி பொருத்தம்",
    kn: "ಯೋನಿ ಕೂಟ"
  },
  GrahaMaitri: {
    en: "Graha Maitri (Mental Harmony)",
    te: "గ్రహ మైత్రి కూట",
    hi: "ग्रह मैत्री कूट",
    ta: "கிரக மைத்திரி பொருத்தம்",
    kn: "ಗ್ರಹ ಮೈತ್ರಿ ಕೂಟ"
  },
  Gana: {
    en: "Gana (Temperament & Behavior)",
    te: "గణ కూట",
    hi: "गण कूट",
    ta: "கண பொருத்தம்",
    kn: "ಗಣ ಕೂಟ"
  },
  Bhakoot: {
    en: "Bhakoot (Emotional Relationship)",
    te: "భకూట కూట",
    hi: "भकूट कूट",
    ta: "ராசி பொருத்தம்",
    kn: "ಭಕೂಟ ಕೂಟ"
  },
  Nadi: {
    en: "Nadi (Health, Genetics & Procreation)",
    te: "నాడీ కూట",
    hi: "नाड़ी कूट",
    ta: "நாடி பொருத்தம்",
    kn: "ನಾಡಿ ಕೂಟ"
  }
};

// Functions to retrieve translation in designated language easily
export function getTranslation(set: TranslationSet | undefined, lang: LanguageCode): string {
  if (!set) return "";
  return set[lang] || set["en"];
}

export function translatePlanet(planet: string, lang: LanguageCode): string {
  const set = PLANET_TRANSLATIONS[planet];
  return set ? getTranslation(set, lang) : planet;
}

export function translateRashi(index: number, lang: LanguageCode): string {
  const set = RASHI_TRANSLATIONS[index % 12];
  return set ? getTranslation(set, lang) : `Rashi ${index}`;
}

export function translateNakshatra(index: number, lang: LanguageCode): string {
  const set = NAKSHATRA_TRANSLATIONS[index % 27];
  return set ? getTranslation(set, lang) : `Nakshatra ${index}`;
}

export function translateYoga(index: number, lang: LanguageCode): string {
  const set = YOGA_TRANSLATIONS[index % 27];
  return set ? getTranslation(set, lang) : `Yoga ${index}`;
}

export function translateKarana(index: number, lang: LanguageCode): string {
  const set = KARANA_TRANSLATIONS[index % 11];
  return set ? getTranslation(set, lang) : `Karana ${index}`;
}

export function translateTithi(index: number, lang: LanguageCode): string {
  const set = TITHI_TRANSLATIONS[index % 16] || TITHI_TRANSLATIONS[index % 15];
  return set ? getTranslation(set, lang) : `Tithi ${index}`;
}

export function translateDignity(dignity: string, lang: LanguageCode): string {
  const set = DIGNITY_TRANSLATIONS[dignity];
  return set ? getTranslation(set, lang) : dignity;
}

export function translateKoota(kootaName: string, lang: LanguageCode): string {
  const set = KOOTA_TRANSLATIONS[kootaName];
  return set ? getTranslation(set, lang) : kootaName;
}

// ----------------------------------------------------
// EXTENSIVE MUTLI-LANGUAGE DICTIONARIES AND HELPERS
// ----------------------------------------------------

export const DIVISIONAL_CHART_TRANSLATIONS: Record<string, { name: TranslationSet; desc: TranslationSet }> = {
  D1: {
    name: { en: "Rasi Chart", te: "రాశి చక్రం (D1)", hi: "राशि चक्र (D1)", ta: "ராசி கட்டம் (D1)", kn: "ರಾಶಿ ಚಕ್ರ (D1)" },
    desc: {
      en: "Core chart representing physical health, appearance and basic life parameters",
      te: "భౌతిక ఆరోగ్యం, రూపం మరియు ప్రాథమిక జీవితాంశాలను సూచించే ప్రధాన చక్రం",
      hi: "शारीरिक स्वास्थ्य, रूप-रंग और बुनियादी जीवन मानदंडों का प्रतिनिधित्व करने वाली मुख्य कुंडली",
      ta: "உடல் ஆரோக்கியம், தோற்றம் மற்றும் அடிப்படை வாழ்க்கை அளவுருக்களைக் குறிக்கும் முக்கிய விளக்கப்படம்",
      kn: "ದೈಹಿಕ ಆರೋಗ್ಯ, ರೂಪ ಮತ್ತು ಮೂಲಭೂತ ಜೀವನದ ನಿಯತಾಂಕಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಪ್ರಮುಖ ಚಾರ್ಟ್"
    }
  },
  D2: {
    name: { en: "Hora Chart", te: "హోరా చక్రం (D2)", hi: "होरा चक्र (D2)", ta: "ஹோரா கட்டம் (D2)", kn: "ಹೋರಾ ಚಕ್ರ (D2)" },
    desc: {
      en: "Wealth, assets, finance, savings and prosperity analysis",
      te: "సంపద, ఆస్తులు, ఆర్థికం, పొదుపు మరియు శ్రేయస్సు విశ్లేషణ",
      hi: "धन, संपत्ति, वित्त, बचत और समृद्धि विश्लेषण",
      ta: "செல்வம், சொத்துக்கள், நிதி, சேமிப்பு மற்றும் செழிப்பு பகுப்பாய்வு",
      kn: "ಸಂಪತ್ತು, ಆಸ್ತಿ, ಹಣಕಾಸು, ಉಳಿತಾಯ ಮತ್ತು ಸಮೃದ್ಧಿ ವಿಶ್ಲೇಷಣೆ"
    }
  },
  D3: {
    name: { en: "Drekkana", te: "ద్రేక్కాణ చక్రం (D3)", hi: "द्रेष्काण चक्र (D3)", ta: "திரேக்காணம் (D3)", kn: "ದ್ರೇಕ್ಕಾಣ ಚಕ್ರ (D3)" },
    desc: {
      en: "Siblings, co-borns, motivation, courage and initiative",
      te: "తోబుట్టువులు, ప్రేరణ, ధైర్యం మరియు చొరవ",
      hi: "भाई-बहन, सह-जन्म, प्रेरणा, साहस और पहल",
      ta: "சகோதரர்கள், உந்துதல், தைரியம் மற்றும் முயற்சி",
      kn: "ಸಹೋದರ-ಸಹೋದರಿಯರು, ಪ್ರೇರಣೆ, ಧೈರ್ಯ ಮತ್ತು ಉಪಕ್ರಮ"
    }
  },
  D4: {
    name: { en: "Chaturthamsa", te: "చతుర్థాంశ చక్రం (D4)", hi: "चतुर्थांश चक्र (D4)", ta: "சதுர்த்தாம்சம் (D4)", kn: "ಚತುರ್ಥಾಂಶ ಚಕ್ರ (D4)" },
    desc: {
      en: "Destiny, net assets, fixed property, houses and vehicle gains",
      te: "భాగ్యం, నికర ఆస్తులు, స్థిరాస్తి, గృహాలు మరియు వాహన లాభాలు",
      hi: "भाग्य, शुद्ध संपत्ति, अचल संपत्ति, घर और वाहन लाभ",
      ta: "விதி, நிகர சொத்துக்கள், நிலையான சொத்து, வீடுகள் மற்றும் வாகன ஆதாயங்கள்",
      kn: "ಭಾಗ್ಯ, ನಿವ್ವಳ ಆಸ್ತಿ, ಸ್ಥಿರ ಆಸ್ತಿ, ಮನೆಗಳು ಮತ್ತು ವಾಹನ ಲಾಭಗಳು"
    }
  },
  D7: {
    name: { en: "Saptamsa", te: "సప్తమాంశ చక్రం (D7)", hi: "सप्तमांश चक्र (D7)", ta: "சப்தாம்சம் (D7)", kn: "ಸಪ್ತಮಾಂಶ ಚಕ್ರ (D7)" },
    desc: {
      en: "Children, lineage, grandchildren, intellect and creative works",
      te: "సంతానం, వంశం, మనవరాళ్ళు/మనవళ్ళు, మేధస్సు మరియు సృజనాత్మక పనులు",
      hi: "बच्चे, वंश, पोते-पोतियां, बुद्धि और रचनात्मक कार्य",
      ta: "குழந்தைகள், வம்சாவளி, பேரக்குழந்தைகள், புத்தி மற்றும் படைப்பு படைப்புகள்",
      kn: "ಮಕ್ಕಳು, ವಂಶಾವಳಿ, ಮೊಮ್ಮಕ್ಕಳು, ಬುದ್ಧಿಶಕ್ತಿ ಮತ್ತು ಸೃಜನಶೀಲ ಕೆಲಸಗಳು"
    }
  },
  D9: {
    name: { en: "Navamsa", te: "నవాంశ చక్రం (D9)", hi: "नवांश चक्र (D9)", ta: "நவாம்சம் (D9)", kn: "ನವಾಂಶ ಚಕ್ರ (D9)" },
    desc: {
      en: "Spouse, marriage partner compatibility, secondary strength, destiny",
      te: "జీవిత భాగస్వామి, వివాహ అనుకూలత, ద్వితీయ బలం మరియు భాగ్యం",
      hi: "जीवनसाथी, विवाह साथी संगतता, माध्यमिक शक्ति, भाग्य",
      ta: "மனைவி, திருமண கூட்டாளர் பொருத்தம், இரண்டாம் நிலை பலம், விதி",
      kn: "ಜೀವನ ಸಂಗಾತಿ, ವೈವಾಹಿಕ ಹೊಂದಾಣಿಕೆ, ದ್ವಿತೀಯ ಬಲ ಮತ್ತು ಭಾಗ್ಯ"
    }
  },
  D10: {
    name: { en: "Dasamsa", te: "దశాంశ చక్రం (D10)", hi: "दशांश चक्र (D10)", ta: "தசாம்சம் (D10)", kn: "ದಶಾಂಶ ಚಕ್ರ (D10)" },
    desc: {
      en: "Career, professional growth, status, business success, honors",
      te: "కెరీర్, వృత్తిపరమైన వృద్ధి, హోదా, వ్యాపార విజయం, గౌరవాలు",
      hi: "करियर, व्यावसायिक विकास, स्थिति, व्यावसायिक सफलता, सम्मान",
      ta: "தொழில், தொழில்முறை வளர்ச்சி, அந்தஸ்து, வணிக வெற்றி, கௌரவங்கள்",
      kn: "ವೃತ್ತಿಜೀವನ, ವೃತ್ತಿಪರ ಬೆಳವಣಿಗೆ, ಸ್ಥಾನಮಾನ, ವ್ಯವಹಾರ ಯಶಸ್ಸು, ಗೌರವಗಳು"
    }
  },
  D12: {
    name: { en: "Dwadasamsa", te: "ద్వాదశాంశ చక్రం (D12)", hi: "द्वादशांश चक्र (D12)", ta: "துவாதசாம்சம் (D12)", kn: "ದ್ವಾದಶಾಂಶ ಚಕ್ರ (D12)" },
    desc: {
      en: "Parents, ancestry, heritage, lineage karmic factors",
      te: "తల్లిదండ్రులు, పూర్వీకులు, వారసత్వం, వంశానుగత కర్మ అంశాలు",
      hi: "माता-पिता, पूर्वज, विरासत, वंशानुगत कर्म कारक",
      ta: "பெற்றோர்கள், வம்சாவளி, பாரம்பரியம், வம்ச கர்ம காரணிகள்",
      kn: "ಪೋಷಕರು, ಪೂರ್ವಜರು, ಪರಂಪರೆ, ವಂಶಾವಳಿಯ ಕರ್ಮದ ಅಂಶಗಳು"
    }
  },
  D16: {
    name: { en: "Shodasamsa", te: "షోడశాంశ చక్రం (D16)", hi: "षोडशांश चक्र (D16)", ta: "சோடசாம்சம் (D16)", kn: "ಷೋಡಶಾಂಶ ಚಕ್ರ (D16)" },
    desc: {
      en: "Vehicles, luxuries, houses, conveyance and comforts",
      te: "వాహనాలు, విలాసాలు, గృహాలు, రవాణా మరియు సౌకర్యాలు",
      hi: "वाहन, विलासिता, घर, वाहन और सुख-सुविधाएं",
      ta: "வாகனங்கள், ஆடம்பரங்கள், வீடுகள், போக்குவரத்து மற்றும் வசதிகள்",
      kn: "ವಾಹನಗಳು, ಐಷಾರಾಮಿಗಳು, ಮನೆಗಳು, ಸಾರಿಗೆ ಮತ್ತು ಸೌಕರ್ಯಗಳು"
    }
  },
  D20: {
    name: { en: "Vimsamsa", te: "వింశాంశ చక్రం (D20)", hi: "विंशांश चक्र (D20)", ta: "விம்சாம்சம் (D20)", kn: "ವಿಂಶಾಂಶ ಚಕ್ರ (D20)" },
    desc: {
      en: "Spirituality, sadhana, mantra siddhi, guru grace, devotional life",
      te: "ఆధ్యాత్మికత, సాధన, మంత్ర సిద్ధి, గురుకృప, భక్తి జీవితం",
      hi: "आध्यात्मिकता, साधना, मंत्र सिद्धि, गुरु कृपा, भक्तिमय जीवन",
      ta: "ஆன்மீகம், சாதனை, மந்திர சித்தி, குரு அருள், பக்தி வாழ்க்கை",
      kn: "ಆಧ್ಯಾತ್ಮಿಕತೆ, ಸಾಧನೆ, ಮಂತ್ರ ಸಿದ್ಧಿ, ಗುರು ಕೃಪೆ, ಭಕ್ತಿ ಜೀವನ"
    }
  },
  D24: {
    name: { en: "Siddhamsamsa", te: "సిద్ధాంశ చక్రం (D24)", hi: "सिद्धांश चक्र (D24)", ta: "சித்தாம்சம் (D24)", kn: "ಸಿದ್ಧಾಂಶ ಚಕ್ರ (D24)" },
    desc: {
      en: "Education, vidya, learning aptitude, research, skill masteries",
      te: "విద్య, నేర్చుకునే సామర్థ్యం, పరిశోధన, నైపుణ్యాల నైపుణ్యాలు",
      hi: "शिक्षा, विद्या, सीखने की क्षमता, अनुसंधान, कौशल विशेषज्ञता",
      ta: "கல்வி, வித்யா, கற்றல் திறன், ஆராய்ச்சி, திறன் சாதனைகள்",
      kn: "ಶಿಕ್ಷಣ, ವಿದ್ಯಾ, ಕಲಿಕಾ ಸಾಮರ್ಥ್ಯ, ಸಂಶೋಧನೆ, ಕೌಶಲ್ಯ ಪ್ರಾವೀಣ್ಯತೆ"
    }
  },
  D27: {
    name: { en: "Nakshatramsa", te: "నక్షత్రాంశ చక్రం (D27)", hi: "नक्षत्रंश चक्र (D27)", ta: "நட்சத்திராம்சம் (D27)", kn: "ನಕ್ಷತ್ರಾಂಶ ಚಕ್ರ (D27)" },
    desc: {
      en: "Strength, inner strengths, weaknesses, vulnerabilities",
      te: "శారీరక అంతర్గత బలాలు, బలహీనతలు, సున్నితత్వాలు",
      hi: "बल, आंतरिक ताकत, कमजोरियां, कमजोर पहलू",
      ta: "வலிமை, உள் பலம், பலவீனங்கள், பாதிப்புகள்",
      kn: "ಶಕ್ತಿ, ಆಂತರಿಕ ಸಾಮರ್ಥ್ಯಗಳು, ದೌರ್ಬಲ್ಯಗಳು, ದುರ್ಬಲತೆಗಳು"
    }
  },
  D30: {
    name: { en: "Trimsamsa", te: "త్రింశాంశ చక్రం (D30)", hi: "त्रिंशांश चक्र (D30)", ta: "திரிம்சாம்சம் (D30)", kn: "ತ್ರಿಂಶಾಂಶ ಚಕ್ರ (D30)" },
    desc: {
      en: "Evils, accidents, sudden downfalls, character flaws, diseases",
      te: "అరిష్టాలు, ప్రమాదాలు, ఆకస్మిక పతనాలు, పాత్ర లోపాలు, వ్యాధులు",
      hi: "अनिष्ट, दुर्घटनाएं, अचानक गिरावट, चारित्रिक दोष, बीमारियां",
      ta: "தீமைகள், விபத்துக்கள், திடீர் சரிவுகள், குணாதிசய குறைபாடுகள், நோய்கள்",
      kn: "ಅನಿಷ್ಟಗಳು, ಆಪತ್ತುಗಳು, ಹಠಾತ್ ಪತನಗಳು, ಚಾರಿತ್ರ್ಯ ದೋಷಗಳು, ರೋಗಗಳು"
    }
  },
  D40: {
    name: { en: "Khavedamsa", te: "ఖవేదాంశ చక్రం (D40)", hi: "खवेदांश चक्र (D40)", ta: "கவேதாம்சம் (D40)", kn: "ಖವೇದಾಂಶ ಚಕ್ರ (D40)" },
    desc: {
      en: "Generational auspiciousness, deep lineage patterns",
      te: "తరాలవారీ శుభప్రదం, లోతైన వంశానుగత నమూనాలు",
      hi: "पीढ़ीगत शुभता, गहरे वंशानुगत पैटर्न",
      ta: "தலைமுறை சுபிட்சம், ஆழமான வம்சாவளி வடிவங்கள்",
      kn: "ಪೀಳಿಗೆಯ ಶುಭದಾಯಕತೆ, ಆಳವಾದ ವಂಶಾವಳಿ ಮಾದರಿಗಳು"
    }
  },
  D45: {
    name: { en: "Akshavedamsa", te: "అక్షవేదాంశ చక్రం (D45)", hi: "अक्षवेदांश चक्र (D45)", ta: "அக்ஷவேதாம்சம் (D45)", kn: "ಅಕ್ಷವೇದಾಂಶ ಚಕ್ರ (D45)" },
    desc: {
      en: "All-round holistic life indicators, pure characters",
      te: "సర్వతోముఖ సాటిలేని జీవిత సూచికలు, స్వచ్ఛమైన పాత్ర",
      hi: "चहुंमुखी समग्र जीवन संकेतक, शुद्ध चरित्र",
      ta: "முழுமையான வாழ்க்கை குறிகாட்டிகள், தூய குணாதிசயங்கள்",
      kn: "ಸರ್ವತೋಮುಖ ಸಮಗ್ರ ಜೀವನ ಸೂಚಕಗಳು, ಶುದ್ಧ ಚಾರಿತ್ರ್ಯಗಳು"
    }
  },
  D60: {
    name: { en: "Shashtyamsa", te: "షష్ట్యంశ చక్రం (D60)", hi: "षष्ट्यंश चक्र (D60)", ta: "ஷஷ்டியாம்சம் (D60)", kn: "ಷಷ್ಟ್ಯಂಶ ಚಕ್ರ (D60)" },
    desc: {
      en: "Past-life karma triggers, ultimate planetary results",
      te: "పూర్వజన్మ కర్మ ప్రేరకాలు, అంతిమ గ్రహ ఫలితాలు",
      hi: "पूर्वजन्म के कर्म ट्रिगर, अंतिम ग्रहीय परिणाम",
      ta: "முன்ஜென்ம கர்ம தூண்டுதல்கள், இறுதி கிரக பலன்கள்",
      kn: "ಪೂರ್ವ ಜನ್ಮದ ಕರ್ಮ ಪ್ರಚೋದಕಗಳು, ಅಂತಿಮ ಗ್ರಹ ಫಲಗಳು"
    }
  }
};

export const WEEKDAY_TRANSLATIONS: TranslationSet[] = [
  { en: "Sunday", te: "ఆదివారం (Adivaram)", hi: "रविवार (Ravivar)", ta: "ஞாயிற்றுக்கிழமை (Gnayiru)", kn: "ಭಾನುವಾರ (Bhanuvara)" },
  { en: "Monday", te: "సోమవారం (Somavaram)", hi: "सोमवार (Somvar)", ta: "திங்கட்கிழமை (Thingal)", kn: "ಸೋಮವಾರ (Somavara)" },
  { en: "Tuesday", te: "మంగళవారం (Mangalavaram)", hi: "मंगलवार (Mangalvar)", ta: "செவ்வாய்க்கிழமை (Sevvai)", kn: "ಮಂಗಳವಾರ (Mangalavara)" },
  { en: "Wednesday", te: "బుధవారం (Budhavaram)", hi: "बुधवार (Budhvar)", ta: "புதன்கிழமை (Budhan)", kn: "ಬುಧವಾರ (Budhavara)" },
  { en: "Thursday", te: "గురువారం (Guruvaram)", hi: "गुरुवार (Guruvar)", ta: "வியாழக்கிழமை (Vyalan)", kn: "ಗುರುವಾರ (Guruvara)" },
  { en: "Friday", te: "శుక్రవారం (Shukravaram)", hi: "शुक्रवार (Shukravar)", ta: "வெள்ளிக்கிழமை (Velli)", kn: "ಶುಕ್ರವಾರ (Shukravara)" },
  { en: "Saturday", te: "శనివారం (Shanivaram)", hi: "शनिवार (Shanivar)", ta: "சனிக்கிழமை (Sani)", kn: "ಶನಿವಾರ (Shanivara)" }
];

export const LUNAR_MONTH_TRANSLATIONS: TranslationSet[] = [
  { en: "Chaitra Maasa", te: "చైత్ర మాసం", hi: "चैत्र मास", ta: "சித்திரை மாதம்", kn: "ಚೈತ್ರ ಮಾಸ" },
  { en: "Vaishakha Maasa", te: "వైశాఖ మాసం", hi: "वैशाख मास", ta: "வைகாசி மாதம்", kn: "ವೈಶಾಖ ಮಾಸ" },
  { en: "Jyeshtha Maasa", te: "జ్యేష్ఠ మాసం", hi: "ज्येष्ठ मास", ta: "ஆனி மாதம்", kn: "ಜ್ಯೇಷ್ಠ ಮಾಸ" },
  { en: "Ashadha Maasa", te: "ఆషాఢ మాసం", hi: "आषाढ़ मास", ta: "ஆடி மாதம்", kn: "ಆಷಾಢ ಮಾಸ" },
  { en: "Shravana Maasa", te: "శ్రావణ మాసం", hi: "श्रावण मास", ta: "ஆவணி மாதம்", kn: "ಶ್ರಾವಣ ಮಾಸ" },
  { en: "Bhadrapada Maasa", te: "భాద్రపద మాసం", hi: "भाद्रपद मास", ta: "புரட்டாசி மாதம்", kn: "ಭಾದ್ರಪದ ಮಾಸ" },
  { en: "Ashvina Maasa", te: "ఆశ్వయుజ మాసం", hi: "आश्विन मास", ta: "ஐப்பசி மாதம்", kn: "ಆಶ್ವಯುಜ ಮಾಸ" },
  { en: "Kartika Maasa", te: "కార్తీక మాసం", hi: "कार्तिक मास", ta: "கார்த்திகை மாதம்", kn: "ಕಾರ್ತಿಕ ಮಾಸ" },
  { en: "Margashirsha Maasa", te: "మార్గశిర మాసం", hi: "मार्गशीर्ष मास", ta: "மார்கழி மாதம்", kn: "ಮಾರ್ಗಶಿರ ಮಾಸ" },
  { en: "Pausha Maasa", te: "పుష్య మాసం", hi: "पौष मास", ta: "தை மாதம்", kn: "ಪುಷ್ಯ ಮಾಸ" },
  { en: "Magha Maasa", te: "మాఘ మాసం", hi: "माघ मास", ta: "மாசி மாதம்", kn: "ಮಾಘ ಮಾಸ" },
  { en: "Phalguna Maasa", te: "ఫాల్గుణ మాసం", hi: "फाल्गुन मास", ta: "பங்குனி மாதம்", kn: "ಫాల్గుಣ ಮಾಸ" }
];

export const GEMSTONE_TRANSLATIONS: Record<string, TranslationSet> = {
  Ruby: { en: "Ruby (Manikyam)", te: "కెంపు (Manikyam)", hi: "माणिक्य (Ruby)", ta: "மாணிக்கம் (Manikkam)", kn: "ಮಾಣಿಕ್ಯ (Ruby)" },
  "Yellow Sapphire": { en: "Yellow Sapphire (Pushparagam)", te: "కనకపుష్యరాగం (Pushparagam)", hi: "पुखराज (Yellow Sapphire)", ta: "புஷ்பராகம் (Pushparagam)", kn: "ಪುಷ್ಯರಾಗ (Yellow Sapphire)" },
  Diamond: { en: "Diamond (Vajram)", te: "వజ్రం (Vajram)", hi: "हीरा (Diamond)", ta: "வைரம் (Vairam)", kn: "ವಜ್ರ (Vajram)" }
};

export const COLOR_TRANSLATIONS: Record<string, TranslationSet> = {
  "Golden Yellow": { en: "Golden Yellow", te: "బంగారు పసుపు", hi: "सुनहरा पीला", ta: "பொன்னிற மஞ்சள்", kn: "ಚಿನ್ನದ ಹಳದಿ" },
  "Royal Blue": { en: "Royal Blue", te: "రాయల్ బ్లూ", hi: "रॉयल ब्लू", ta: "ராயல் ப்ளூ", kn: "ರಾಯಲ್ ನೀಲಿ" },
  "Saffron Red": { en: "Saffron Red", te: "కుంకుమ ఎరుపు", hi: "केसरिया लाल", ta: "குங்கும சிவப்பு", kn: "ಕೇಸರಿ ಕೆಂಪು" }
};

export const FESTIVAL_TRANSLATIONS: Record<string, TranslationSet> = {
  "Vinayaka Chavithi Puja": { en: "Vinayaka Chavithi Puja", te: "వినాయక చవితి పూజ", hi: "विनायक चतुर्थी पूजा", ta: "விநாயகர் சதுர்த்தி பூஜை", kn: "ವಿನಾಯಕ ಚೌತಿ ಪೂಜೆ" },
  "Maha Pradosh Vrat": { en: "Maha Pradosh Vrat", te: "మహా ప్రదోష వ్రతం", hi: "महा प्रदोष व्रत", ta: "மகா பிரதோஷ விரதம்", kn: "ಮಹಾ ಪ್ರದೋಷ ವ್ರತ" },
  "Shukla Ekadashi Vrat": { en: "Shukla Ekadashi Vrat", te: "శుక్ల ఏకాదశి వ్రతం", hi: "शुक्ल एकादशी व्रत", ta: "சுக்ல ஏகாதசி விரதம்", kn: "ಶುಕ್ಲ ಏಕಾದಶಿ ವ್ರತ" },
  "Krishna Ekadashi Vrat": { en: "Krishna Ekadashi Vrat", te: "కృష్ణ ఏకాదశి వ్రతం", hi: "कृष्ण एकादशी व्रत", ta: "கிருஷ்ண ஏகாதசி விரதம்", kn: "ಕೃಷ್ಣ ಏಕಾದಶಿ ವ್ರತ" },
  "Maha Shivaratri / Pradosham": { en: "Maha Shivaratri / Pradosham", te: "మహా శివరాత్రి / ప్రదోషం", hi: "महाशिवरात्रि / प्रदोषम", ta: "மகா சிவராத்திரி / பிரதோஷம்", kn: "ಮಹಾ ಶಿವರಾತ್ರಿ / ಪ್ರದೋಷಂ" },
  "Pournami Vrat / Satyanarayana Pooja": { en: "Pournami Vrat / Satyanarayana Pooja", te: "పౌర్ణమి వ్రతం / సత్యనారాయణ పూజ", hi: "पूर्णिमा व्रत / सत्यनारायण पूजा", ta: "பௌர்ணமி விரதம் / சத்தியநாராயண பூஜை", kn: "ಹುಣ್ಣಿಮೆ ವ್ರತ / ಸತ್ಯನಾರಾಯಣ ಪೂಜೆ" },
  "Amavasya Pitru Tarpanam": { en: "Amavasya Pitru Tarpanam", te: "అమావాస్య పితృ తర్పణం", hi: "अमावस्या पितृ तर्पण", ta: "அமாவாசை பித்ரு தர்பணம்", kn: "ಅಮಾವಾಸ್ಯೆ ಪಿತೃ ತರ್ಪಣ" }
};

export const BABY_NAME_MEANING_TRANSLATIONS: Record<string, TranslationSet> = {
  "Peaceful": { en: "Peaceful", te: "ప్రశాంతమైన", hi: "शांतिप्रिय", ta: "அமைதியான", kn: "ಪ್ರಶಾಂತವಾದ" },
  "Bright, Chaitra Month": { en: "Bright, Chaitra Month", te: "తేజోవంతమైన, చైత్ర మాసం", hi: "उज्ज्वल, चैत्र मास", ta: "ஒளிரும், சித்திரை மாதம்", kn: "ಪ್ರಕಾಶಮಾನವಾದ, ಚೈತ್ರ ಮಾಸ" },
  "Moon": { en: "Moon", te: "చంద్రుడు", hi: "चंद्रमा", ta: "சந்திரன்", kn: "ಚಂದ್ರ" },
  "Beautiful, Elegant": { en: "Beautiful, Elegant", te: "సుందరమైన, సున్నితమైన", hi: "सुंदर, ललित", ta: "அழகான, நேர்த்தியான", kn: "ಸುಂದರವಾದ, ಲಲಿತ" },
  "Elegant Woman": { en: "Elegant Woman", te: "సుందరమైన స్త్రీ", hi: "ललित स्त्री/ललिता", ta: "அழகான பெண்", kn: "ಸುಂದರ ಸ್ತ್ರೀ" },
  "Lord Shiva, Sun": { en: "Lord Shiva, Sun", te: "శివుడు, సూర్యుడు", hi: "भगवान शिव, सूर्य", ta: "சிவபெருமான், சூரியன்", kn: "ಶಿವ, ಸೂರ್ಯ" },
  "Gracious gift of God": { en: "Gracious gift of God", te: "దైవ ప్రసాదం", hi: "ईश्वर का दयालु उपहार", ta: "கடவுளின் அருட்கொடை", kn: "ದೇವರ ಕೃಪೆಯ ಕೊಡುಗೆ" },
  "Lord of Water": { en: "Lord of Water", te: "వరుణ దేవుడు", hi: "जल के देवता (वरुण)", ta: "நீர் கடவுள் (வருணன்)", kn: "ವರುಣ ದೇವ" },
  "Ray of Light": { en: "Ray of Light", te: "కిరణం, వెలుగు", hi: "प्रकाश की किरण", ta: "ஒளிக்கதிர்", kn: "ಬೆಳಕಿನ ಕಿರಣ" },
  "Fame, Glory": { en: "Fame, Glory", te: "కీర్తి, యశస్సు", hi: "कीर्ति, यश", ta: "புகழ், பெருமை", kn: "ಕೀರ್ತಿ, ಯಶಸ್ಸು" },
  "Lord Vishnu": { en: "Lord Vishnu", te: "హరి, విష్ణుమూర్తి", hi: "भगवान विष्णु", ta: "ஹரி (மகாவிஷ்ணு)", kn: "ಹರಿ (ವಿಷ್ಣು)" },
  "Precious Stone, Fish": { en: "Precious Stone, Fish", te: "మీనం, విలువైన రత్నం", hi: "मछली, अनमोल रत्न", ta: "மீனம், விலைமதிப்பற்ற கல்", kn: "ಮೀನು, ಅಮೂಲ್ಯ ರತ್ನ" },
  "Humble": { en: "Humble", te: "వినమ్రమైన", hi: "विनम्र", ta: "பணிவான", kn: "ವಿನಮ್ರವಾದ" },
  "Ruler of Gods": { en: "Ruler of Gods", te: "సురేష్, దేవతల రాజు", hi: "देवताओं के राजा (सुरेश)", ta: "தேவர்களின் அதிபதி (சுரேஷ்)", kn: "ದೇವತೆಗಳ ಅರಸ" },
  "Lamp, Light": { en: "Lamp, Light", te: "దీపం, వెలుగు", hi: "दीपक, रोशनी", ta: "விளக்கு, ஒளி", kn: "ದೀಪ, ಬೆಳಕು" }
};

export const MUHURTA_ACTIVITY_TRANSLATIONS: Record<string, { name: TranslationSet; desc: TranslationSet }> = {
  "Marriage": {
    name: { en: "Marriage", te: "వివాహ ముహూర్తం", hi: "विवाह मुहूर्त", ta: "திருமண முஹூர்த்தம்", kn: "ವಿವಾಹ ಮುಹೂರ್ತ" },
    desc: {
      en: "Most auspicious marriage timeline with subh nakshatras",
      te: "శుభ నక్షత్రాలతో అత్యంత శ్రేష్టమైన వివాహ సమయాలు",
      hi: "शुभ नक्षत्रों से युक्त अत्यंत मांगलिक विवाह समय सीमा",
      ta: "சுப நட்சத்திரங்களுடன் கூடிய மிகவும் உன்னதமான திருமண காலக்கெடு",
      kn: "ಶುಭ ನಕ್ಷತ್ರಗಳೊಂದಿಗೆ ಅತ್ಯಂತ ಪ್ರಶಸ್ತವಾದ ವಿವಾಹ ಮುಹೂರ್ತಗಳು"
    }
  },
  "House Warming (Gruha Pravesh)": {
    name: { en: "House Warming (Gruha Pravesh)", te: "గృహ ప్రవేశ ముహూర్తం", hi: "गृह प्रवेश मुहूर्त", ta: "गृहप्रवेशப் பொருத்தம்", kn: "ಗೃಹ ಪ್ರವೇಶ ಮುಹೂರ್ತ" },
    desc: {
      en: "Auspicious home construction and heating coordinates",
      te: "నూతన గృహ ప్రవేశానికి మరియు వాస్తుపూజకు అనుకూలమైన ముహూర్తాలు",
      hi: "नए घर में प्रवेश और वास्तु शांति के लिए सर्वोत्तम शुभ मुहूर्त",
      ta: "புதிய வீட்டில் குடியேறுவதற்கும் வாஸ்து பூஜைக்கும் ஏற்ற சுப காலம்",
      kn: "ಹೊಸ ಮನೆ ಪ್ರವೇಶ ಹಾಗೂ ವಾಸ್ತು ಪೂಜೆಗೆ ಅತ್ಯಂತ ಯೋಗ್ಯವಾದ ಸಮಯಗಳು"
    }
  },
  "Vehicle Purchase": {
    name: { en: "Vehicle Purchase", te: "వాహన కొనుగోలు ముహూర్తం", hi: "वाहन खरीद मुहूर्त", ta: "வாகனம் வாங்குவதற்கான முஹூர்த்தம்", kn: "ವಾಹನ ಖರೀದಿ ಮುಹೂರ್ತ" },
    desc: {
      en: "Luxurious asset acquisition timings",
      te: "నూతన వాహనాలు మరియు చరాస్తులు కొనుగోలు చేయడానికి శుభ సమయాలు",
      hi: "वाहनों एवं चल संपत्तियों की खरीद हेतु शुभ एवं लाभप्रद मुहूर्त",
      ta: "புதிய வாகனங்கள் வாங்குவதற்கு உகந்த சுப யோக காலம்",
      kn: "ಹೊಸ ವಾಹನ ಖರೀದಿಗೆ ಅತ್ಯಂತ ಪ್ರಶಸ್ತವಾದ ಶುಭ ಮುಹೂರ್ತಗಳು"
    }
  },
  "Business Opening": {
    name: { en: "Business Opening", te: "వ్యాపార ప్రారంభ ముహూర్తం", hi: "व्यापार उद्घाटन मुहूर्त", ta: "தொழில் துவங்குவதற்கான முஹூர்த்தம்", kn: "ವ್ಯಾಪಾರ ಆರಂಭದ ಮುಹೂರ್ತ" },
    desc: {
      en: "Corporate scale-up and investments timelines",
      te: "నూతన వ్యాపారాలు, షాపులు ప్రారంభించడానికి మరియు పెట్టుబడులకు అనుకూల సమయం",
      hi: "नए व्यापार, प्रतिष्ठान के शुभारंभ एवं निवेश के लिए सर्वश्रेष्ठ मुहूर्त",
      ta: "புதிய தொழில் துவங்குவதற்கும் முதலீடுகள் செய்வதற்கும் ஏற்ற சுப காலம்",
      kn: "ಹೊಸ ವ್ಯಾಪಾರ ಆರಂಭ ಹಾಗೂ ಉದ್ಯಮ ಹೂಡಿಕೆಗೆ ಅತ್ಯಂತ ಸೂಕ್ತ ಮುಹೂರ್ತ"
    }
  },
  "Travel Timelines": {
    name: { en: "Travel Timelines", te: "ప్రయాణ ముహూర్తం", hi: "यात्रा प्रस्थान मुहूर्त", ta: "பிரயாண முஹூர்த்தம்", kn: "ಪ್ರಯಾಣ ಮುಹೂರ್ತ" },
    desc: {
      en: "Safe directions and transit options",
      te: "రక్షణ, క్షేమకరమైన దిశలు మరియు ప్రయాణాల కొరకు శుభ ముహూర్తాలు",
      hi: "सुरक्षित प्रस्थान, उत्तम दिशा एवं सुखद यात्रा हेतु दिशाशूल रहित शुभ समय",
      ta: "பாதுகாப்பான மற்றும் சுபிட்சமான நீண்ட தூர பயணங்களுக்கு உகந்த காலம்",
      kn: "ಸುರಕ್ಷಿತ ಹಾಗೂ ಸುಖಕರ ಪ್ರಯಾಣ ಪ್ರಸ್ಥಾನಕ್ಕೆ ಪ್ರಶಸ್ತವಾದ ಸಮಯ"
    }
  }
};

export function translateDivisionalChartName(code: string, lang: LanguageCode): string {
  const chart = DIVISIONAL_CHART_TRANSLATIONS[code];
  return chart ? getTranslation(chart.name, lang) : code;
}

export function translateDivisionalChartDesc(code: string, lang: LanguageCode): string {
  const chart = DIVISIONAL_CHART_TRANSLATIONS[code];
  return chart ? getTranslation(chart.desc, lang) : "";
}

export function translateWeekday(index: number, lang: LanguageCode): string {
  const set = WEEKDAY_TRANSLATIONS[index % 7];
  return set ? getTranslation(set, lang) : `Weekday ${index}`;
}

export function translateLunarMonth(index: number, lang: LanguageCode): string {
  const set = LUNAR_MONTH_TRANSLATIONS[index % 12];
  return set ? getTranslation(set, lang) : `Month ${index}`;
}

export function translateGemstone(gem: string, lang: LanguageCode): string {
  const set = GEMSTONE_TRANSLATIONS[gem];
  return set ? getTranslation(set, lang) : gem;
}

export function translateColor(color: string, lang: LanguageCode): string {
  const set = COLOR_TRANSLATIONS[color];
  return set ? getTranslation(set, lang) : color;
}

export function translateFestival(fest: string, lang: LanguageCode): string {
  const set = FESTIVAL_TRANSLATIONS[fest];
  return set ? getTranslation(set, lang) : fest;
}

export function translateBabyNameMeaning(meaning: string, lang: LanguageCode): string {
  const set = BABY_NAME_MEANING_TRANSLATIONS[meaning];
  return set ? getTranslation(set, lang) : meaning;
}

export function translateMuhurtaActivityName(act: string, lang: LanguageCode): string {
  const item = MUHURTA_ACTIVITY_TRANSLATIONS[act];
  return item ? getTranslation(item.name, lang) : act;
}

export function translateMuhurtaActivityDesc(act: string, lang: LanguageCode): string {
  const item = MUHURTA_ACTIVITY_TRANSLATIONS[act];
  return item ? getTranslation(item.desc, lang) : "";
}

