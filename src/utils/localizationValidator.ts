export class EnglishLeakException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnglishLeakException';
  }
}

const IGNORE_KEYS = [
  'name', 'gotram', 'placeOfBirth', 'dateOfBirth', 'timeOfBirth',
  'pdfData', 'url', 'fileName', 'generatedAt', 'reportId', 'engineVersion', 'language', 'planetId', 'id', 'code',
  'koota', 'status', 'severity', 'strength', 'nature', 'traditionalMeaning', 'confidence', 'factor', 'impact',
  'moonSign', 'moonSignLord', 'nakshatra', 'nakshatraLord', 'pada', 'varna', 'vashya', 'yoni', 'gana', 'nadi',
  'yoga', 'karana', 'tithi', 'tatva', 'nameAlphabet', 'paya', 'sign', 'system', 'ayanamsa', 'houseSystem',
  'zodiac', 'type', 'aspectingPlanet', 'aspectedPlanet', 'planet', 'zodiacSign', 'ascendant', 'ascendantLord',
  'meaning', 'gender', 'start', 'animal', 'bird', 'tree', 'rulingDeity'
];

// Allowed technical english keywords
const WHITELIST = [
  'Swiss Ephemeris',
  'v1', 'v2', 'v3',
  'REP-', // Report ID prefix
  'http', 'https', '.com', '.in', '.org',
  'SouthIndian', 'classic', 'Classic', 'MarriageMatching',
  'pdf', 'fileName', 'url', 'AM', 'PM' // Metadata keys that might slip through as values in weird edge cases
];

const containsEnglish = (text: string): boolean => {
  // Check if string contains basic A-Za-z chars
  // We whitelist UUIDs and numbers etc separately
  return /[A-Za-z]/.test(text);
};

const isWhitelisted = (text: string): boolean => {
  if (WHITELIST.some(w => text.includes(w))) return true;
  // If it's just a pure UUID
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(text)) return true;
  // If it's an ISO timestamp
  if (!isNaN(Date.parse(text)) && /^[0-9]{4}-[0-9]{2}-[0-9]{2}T/.test(text)) return true;
  return false;
};

export const validateLocalization = (data: any, lang: string) => {
  if (lang === 'en') return; // English is allowed for 'en' obviously

  const traverse = (obj: any, path: string) => {
    if (obj === null || obj === undefined) return;

    if (typeof obj === 'string') {
      if (containsEnglish(obj) && !isWhitelisted(obj)) {
        throw new EnglishLeakException(`English text leaked in ${lang} response at ${path}: "${obj}"`);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        traverse(item, `${path}[${index}]`);
      });
    } else if (typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        if (IGNORE_KEYS.includes(key)) continue; // Skip validating User Data or Base64 payloads
        traverse(obj[key], `${path}.${key}`);
      }
    }
  };

  traverse(data, 'root');
};
