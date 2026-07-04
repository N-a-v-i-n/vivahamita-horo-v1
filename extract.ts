import fs from 'fs';
import path from 'path';
import {
  RASHI_NAMES, NAK_NAMES, TITHI_NAMES, KARANA_NAMES, YOGA_NAMES,
  WEEKDAYS, PLANET_NAMES, PAKSHA_NAMES, MISC_TERMS, DOSHA_NAMES,
  MATCH_STATUS, REC_TERMS
} from './src/services/astroLocalization';
import { pdfTranslations } from './src/services/pdfLocalization';

const langs = ['en', 'te', 'hi', 'ta', 'kn'];

// Canonical IDs mapping arrays
const RASHI_IDS = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"];
const NAK_IDS = ["ASHWINI", "BHARANI", "KRITTIKA", "ROHINI", "MRIGASHIRA", "ARDRA", "PUNARVASU", "PUSHYA", "ASHLESHA", "MAGHA", "PURVA_PHALGUNI", "UTTARA_PHALGUNI", "HASTA", "CHITRA", "SWATI", "VISHAKHA", "ANURADHA", "JYESHTHA", "MULA", "PURVA_ASHADHA", "UTTARA_ASHADHA", "SHRAVANA", "DHANISHTHA", "SHATABHISHA", "PURVA_BHADRAPADA", "UTTARA_BHADRAPADA", "REVATI"];
const TITHI_IDS = ["PRATHAMA", "DWITIYA", "TRITIYA", "CHATURTHI", "PANCHAMI", "SHASHTHI", "SAPTAMI", "ASHTAMI", "NAVAMI", "DASHAMI", "EKADASHI", "DWADASHI", "TRAYODASHI", "CHATURDASHI", "PURNIMA", "PRATHAMA_K", "DWITIYA_K", "TRITIYA_K", "CHATURTHI_K", "PANCHAMI_K", "SHASHTHI_K", "SAPTAMI_K", "ASHTAMI_K", "NAVAMI_K", "DASHAMI_K", "EKADASHI_K", "DWADASHI_K", "TRAYODASHI_K", "CHATURDASHI_K", "AMAVASYA"];
const KARANA_IDS = ["BAVA", "BALAVA", "KAULAVA", "TAITILA", "GARA", "VANIJA", "VISHTI", "SHAKUNI", "CHATUSHPADA", "NAGA", "KINTUGHNA"];
const YOGA_IDS = ["VISHKAMBHA", "PRITI", "AYUSHMAN", "SAUBHAGYA", "SHOBHANA", "ATIGANDA", "SUKARMA", "DHRITI", "SHULA", "GANDA", "VRIDDHI", "DHRUVA", "VYAGHATA", "HARSHANA", "VAJRA", "SIDDHI", "VYATIPATA", "VARIYAN", "PARIGHA", "SHIVA", "SIDDHA", "SADHYA", "SHUBHA", "SHUKLA", "BRAHMA", "INDRA", "VAIDHRITI"];
const WEEKDAY_IDS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const buildDictionary = (lang: string) => {
  const dict: any = {};
  
  dict.RASHI = {};
  RASHI_IDS.forEach((id, idx) => dict.RASHI[id] = RASHI_NAMES[lang][idx]);

  dict.NAKSHATRA = {};
  NAK_IDS.forEach((id, idx) => dict.NAKSHATRA[id] = NAK_NAMES[lang][idx]);

  dict.TITHI = {};
  TITHI_IDS.forEach((id, idx) => dict.TITHI[id] = TITHI_NAMES[lang][idx]);

  dict.KARANA = {};
  KARANA_IDS.forEach((id, idx) => dict.KARANA[id] = KARANA_NAMES[lang][idx]);

  dict.YOGA = {};
  YOGA_IDS.forEach((id, idx) => dict.YOGA[id] = YOGA_NAMES[lang][idx]);

  dict.WEEKDAY = {};
  WEEKDAY_IDS.forEach((id, idx) => dict.WEEKDAY[id] = WEEKDAYS[lang][idx]);

  dict.PLANET = {};
  Object.keys(PLANET_NAMES.en).forEach(k => dict.PLANET[k.toUpperCase()] = PLANET_NAMES[lang][k]);

  dict.PAKSHA = {
    SHUKLA: PAKSHA_NAMES[lang].shukla,
    KRISHNA: PAKSHA_NAMES[lang].krishna
  };

  dict.MISC = {};
  Object.keys(MISC_TERMS.en).forEach(k => dict.MISC[k.toUpperCase()] = MISC_TERMS[lang][k]);

  dict.DOSHA = {};
  Object.keys(DOSHA_NAMES.en).forEach(k => dict.DOSHA[k.toUpperCase()] = DOSHA_NAMES[lang][k]);

  dict.STATUS = {};
  Object.keys(MATCH_STATUS.en).forEach(k => dict.STATUS[k.toUpperCase()] = MATCH_STATUS[lang][k]);

  dict.RECOMMENDATION = {};
  Object.keys(REC_TERMS.en).forEach(k => dict.RECOMMENDATION[k.toUpperCase()] = REC_TERMS[lang][k]);

  dict.PDF = {};
  Object.keys(pdfTranslations.en).forEach(k => dict.PDF[k.toUpperCase()] = pdfTranslations[lang][k]);

  // Special canonical Enums
  dict.ENUM = {
    MALE: MISC_TERMS[lang].male || dict.MISC.MALE || (lang === 'te' ? 'పురుషుడు' : lang === 'hi' ? 'पुरुष' : lang === 'ta' ? 'ஆண்' : lang === 'kn' ? 'ಪುರುಷ' : 'Male'),
    FEMALE: MISC_TERMS[lang].female || dict.MISC.FEMALE || (lang === 'te' ? 'స్త్రీ' : lang === 'hi' ? 'महिला' : lang === 'ta' ? 'பெண்' : lang === 'kn' ? 'ಮಹಿಳೆ' : 'Female'),
  };

  // Poruthams (we need a dictionary for them)
  dict.PORUTHAM = {
    VURNA: lang === 'te' ? 'వర్ణ పొంతన' : lang === 'hi' ? 'वर्ण पोरुथम' : lang === 'ta' ? 'வர்ண பொருத்தம்' : lang === 'kn' ? 'ವರ್ಣ ಹೊಂದಾಣಿಕೆ' : 'Varna Porutham',
    VASHYA: lang === 'te' ? 'వశ్య పొంతన' : lang === 'hi' ? 'वश्य पोरुथम' : lang === 'ta' ? 'வசிய பொருத்தம்' : lang === 'kn' ? 'ವಶ್ಯ ಹೊಂದಾಣಿಕೆ' : 'Vashya Porutham',
    TARA: lang === 'te' ? 'తారా పొంతన' : lang === 'hi' ? 'तारा पोरुथम' : lang === 'ta' ? 'தாரா பொருத்தம்' : lang === 'kn' ? 'ತಾರಾ ಹೊಂದಾಣಿಕೆ' : 'Tara Porutham',
    YONI: lang === 'te' ? 'యోని పొంతన' : lang === 'hi' ? 'योनि पोरुथम' : lang === 'ta' ? 'யோனி பொருத்தம்' : lang === 'kn' ? 'ಯೋನಿ ಹೊಂದಾಣಿಕೆ' : 'Yoni Porutham',
    GRAHA_MAITRI: lang === 'te' ? 'గ్రహ మైత్రి' : lang === 'hi' ? 'ग्रह मैत्री' : lang === 'ta' ? 'கிரக மைத்திரி' : lang === 'kn' ? 'ಗ್ರಹ ಮೈತ್ರಿ' : 'Graha Maitri',
    GANA: lang === 'te' ? 'గణ పొంతన' : lang === 'hi' ? 'गण पोरुथम' : lang === 'ta' ? 'கண பொருத்தம்' : lang === 'kn' ? 'ಗಣ ಹೊಂದಾಣಿಕೆ' : 'Gana Porutham',
    BHAKOOT: lang === 'te' ? 'భకూట పొంతన' : lang === 'hi' ? 'भकूट पोरुथम' : lang === 'ta' ? 'ராசி பொருத்தம்' : lang === 'kn' ? 'ರಾಶಿ ಹೊಂದಾಣಿಕೆ' : 'Bhakoot Porutham',
    NADI: lang === 'te' ? 'నాడీ పొంతన' : lang === 'hi' ? 'नाड़ी पोरुथम' : lang === 'ta' ? 'நாடி பொருத்தம்' : lang === 'kn' ? 'ನಾಡಿ ಹೊಂದಾಣಿಕೆ' : 'Nadi Porutham',
    DINA: lang === 'te' ? 'దిన పరుత్తం' : lang === 'hi' ? 'दीन पोरुथम' : lang === 'ta' ? 'தின பொருத்தம்' : lang === 'kn' ? 'ದಿನ ಹೊಂದಾಣಿಕೆ' : 'Dina Porutham',
    MAHENDRA: lang === 'te' ? 'మహేంద్ర పరుత్తం' : lang === 'hi' ? 'महेंद्र पोरुथम' : lang === 'ta' ? 'மகேந்திர பொருத்தம்' : lang === 'kn' ? 'ಮಹೇಂದ್ರ ಹೊಂದಾಣಿಕೆ' : 'Mahendra Porutham',
    RAJJU: lang === 'te' ? 'రజ్జు పరుత్తం' : lang === 'hi' ? 'रज्जू पोरुथम' : lang === 'ta' ? 'ரஜ்ஜு பொருத்தம்' : lang === 'kn' ? 'ರಜ್ಜು ಹೊಂದಾಣಿಕೆ' : 'Rajju Porutham',
    VEDHA: lang === 'te' ? 'వేధ పరుత్తం' : lang === 'hi' ? 'वेध पोरुथम' : lang === 'ta' ? 'வேதை பொருத்தம்' : lang === 'kn' ? 'ವೇಧೆ ಹೊಂದಾಣಿಕೆ' : 'Vedha Porutham',
  };

  dict.CITIES = {
    HYDERABAD: lang === 'te' ? 'హైదరాబాద్' : lang === 'hi' ? 'हैदराबाद' : lang === 'ta' ? 'ஹைதராபாத்' : lang === 'kn' ? 'ಹೈದರಾಬಾದ್' : 'Hyderabad',
    CHENNAI: lang === 'te' ? 'చెన్నై' : lang === 'hi' ? 'चेन्नई' : lang === 'ta' ? 'சென்னை' : lang === 'kn' ? 'ಚೆನ್ನೈ' : 'Chennai',
    BANGALORE: lang === 'te' ? 'బెంగుళూరు' : lang === 'hi' ? 'बेंगलुरु' : lang === 'ta' ? 'பெங்களூரு' : lang === 'kn' ? 'ಬೆಂಗಳೂರು' : 'Bangalore',
    MUMBAI: lang === 'te' ? 'ముంబై' : lang === 'hi' ? 'मुंबई' : lang === 'ta' ? 'மும்பை' : lang === 'kn' ? 'ಮುಂಬೈ' : 'Mumbai',
    DELHI: lang === 'te' ? 'ఢిల్లీ' : lang === 'hi' ? 'दिल्ली' : lang === 'ta' ? 'டெல்லி' : lang === 'kn' ? 'ದೆಹಲಿ' : 'Delhi',
  };

  return dict;
};

langs.forEach(lang => {
  const output = buildDictionary(lang);
  fs.writeFileSync(path.join(process.cwd(), 'src/localization', `${lang}.json`), JSON.stringify(output, null, 2));
});
console.log("JSON generated successfully.");
