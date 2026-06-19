/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BirthInput,
  PlanetPosition,
  PanchangResponse,
  DashaNode,
  DashaTimeline,
  DoshaRecord,
  MatchingResult,
  MatchScore,
  LanguageCode,
  NumerologyResponse,
  MuhurtaTime
} from "../types/astrology";
import {
  getJulianDate,
  getAyanamsa,
  computePlanetPosition,
  getLagnaSidereal,
  generateDivisionalCharts
} from "../utils/astroCalc";
import {
  translatePlanet,
  translateRashi,
  translateNakshatra,
  translateYoga,
  translateKarana,
  translateTithi,
  translateKoota,
  translateGemstone,
  translateColor,
  translateBabyNameMeaning,
  translateFestival,
  translateWeekday,
  translateLunarMonth,
  PAKSHA_TRANSLATIONS,
  RASHI_TRANSLATIONS,
  NAKSHATRA_TRANSLATIONS
} from "../utils/translation";

// Weekdays translator helper
const WEEKDAY_LOCALIZED: Record<string, Record<LanguageCode, string>> = {
  Sunday: { en: "Sunday", te: "ఆదివారం", hi: "रविवार", ta: "ஞாயிறு", kn: "ಭಾನುವಾರ" },
  Monday: { en: "Monday", te: "సోమవారం", hi: "सोमवार", ta: "திங்கள்", kn: "ಸೋಮವಾರ" },
  Tuesday: { en: "Tuesday", te: "మంగళవారం", hi: "मंगलवार", ta: "செவ்வாய்", kn: "ಮಂಗಳವಾರ" },
  Wednesday: { en: "Wednesday", te: "बुधవారం", hi: "बुधवार", ta: "புதன்", kn: "ಬುಧವಾರ" },
  Thursday: { en: "Thursday", te: "గురువారం", hi: "गुरुवार", ta: "வியாழன்", kn: "ಗುರುವಾರ" },
  Friday: { en: "Friday", te: "శుక్రవారం", hi: "शुक्रवार", ta: "வெள்ளி", kn: "ಶುಕ್ರವಾರ" },
  Saturday: { en: "Saturday", te: "శనివారం", hi: "शनिवार", ta: "சனி", kn: "ಶನಿವಾರ" }
};

// Vimshottari Lords list and durations (120 years cycle)
const VIMSHOTTARI_LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
const VIMSHOTTARI_DURATIONS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

// Nakshatra lords order (starts from Ketu for Ashwini (0))
const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", // 0-8
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury", // 9-17
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"  // 18-26
];

// Seed Remedies
const PLANET_REMEDIES: Record<string, { stone: string; mantra: string; yantra: string; donation: string }> = {
  Sun: {
    stone: "Ruby (Manikya)",
    mantra: "Om Hram Hreem Hroum Sah Suryaya Namah",
    yantra: "Surya Yantra",
    donation: "Wheat, Red flowers, Gold, Copper on Sundays"
  },
  Moon: {
    stone: "Pearl (Moti)",
    mantra: "Om Shram Shreem Shroum Sah Chandraya Namah",
    yantra: "Chandra Yantra",
    donation: "Rice, Milk, Silver, White clothes on Mondays"
  },
  Mars: {
    stone: "Red Coral (Moonga)",
    mantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah",
    yantra: "Mangal Yantra",
    donation: "Masoor dal, Red sandal, Copper on Tuesdays"
  },
  Mercury: {
    stone: "Emerald (Panna)",
    mantra: "Om Bram Breem Broum Sah Budhaya Namah",
    yantra: "Budh Yantra",
    donation: "Green vegetables, Moong dal, Gold on Wednesdays"
  },
  Jupiter: {
    stone: "Yellow Sapphire (Pukhraj)",
    mantra: "Om Gram Greem Groum Sah Gurave Namah",
    yantra: "Guru Yantra",
    donation: "Chana dal, Turmeric, Yellow clothes on Thursdays"
  },
  Venus: {
    stone: "Diamond (Heera) or White Sapphire",
    mantra: "Om Dram Dreem Droum Sah Shukraya Namah",
    yantra: "Shukra Yantra",
    donation: "Kheer, Sugar, White silk, Perfumes on Fridays"
  },
  Saturn: {
    stone: "Blue Sapphire (Neelam)",
    mantra: "Om Pram Preem Proum Sah Shanishcharaya Namah",
    yantra: "Shani Yantra",
    donation: "Black til, Mustard oil, Iron, Sesame on Saturdays"
  },
  Rahu: {
    stone: "Hessonite (Gomed)",
    mantra: "Om Bhram Bhreem Bhroum Sah Rahave Namah",
    yantra: "Rahu Yantra",
    donation: "Urad dal, Coconut, Blanket to needy on Saturdays"
  },
  Ketu: {
    stone: "Cat's Eye (Lehsuniya)",
    mantra: "Om Stram Streem Stroum Sah Ketave Namah",
    yantra: "Ketu Yantra",
    donation: "Sesame oil, Seven-grain mix, Multi-colored blanket"
  }
};

// Nakshatra syllables for baby names suggestions
const NAKSHATRA_SYLLABLES: string[][] = [
  ["Chu", "Che", "Cho", "La"],       // Ashwini
  ["Lee", "Loo", "Le", "Lo"],        // Bharani
  ["A", "Ee", "U", "Ea"],            // Krittika
  ["O", "Va", "Vee", "Voo"],         // Rohini
  ["Ve", "Vo", "Ka", "Kee"],         // Mrigashira
  ["Ku", "Gha", "Ng", "Chha"],       // Ardra
  ["Ke", "Ko", "Ha", "Hee"],         // Punarvasu
  ["Hoo", "He", "Ho", "Da"],         // Pushya
  ["Dee", "Doo", "De", "Do"],        // Ashlesha
  ["Ma", "Mee", "Moo", "Me"],        // Magha
  ["Mo", "Ta", "Tee", "Too"],        // Purva Phalguni
  ["Te", "To", "Pa", "Pee"],         // Uttara Phalguni
  ["Poo", "Sha", "Na", "Tha"],       // Hasta
  ["Pe", "Po", "Ra", "Ree"],         // Chitra
  ["Roo", "Re", "Ro", "Taa"],        // Swati
  ["Tee", "Too", "Te", "To"],        // Vishakha
  ["Na", "Nee", "Noo", "Ne"],        // Anuradha
  ["No", "Ya", "Yee", "Yoo"],        // Jyeshtha
  ["Ye", "Yo", "Bha", "Bhee"],       // Mula
  ["Bhoo", "Dha", "Ph", "Dha"],      // Purva Ashadha
  ["Bhe", "Bho", "Ja", "Jee"],       // Uttara Ashadha
  ["Ju", "Je", "Jo", "Gha"],         // Shravana
  ["Ga", "Gee", "Goo", "Ge"],        // Dhanishta
  ["Go", "Sa", "See", "Soo"],        // Shatabhisha
  ["Se", "So", "Da", "Dee"],         // Purva Bhadrapada
  ["Doo", "Tha", "Jha", "Na"],       // Uttara Bhadrapada
  ["De", "Do", "Cha", "Chee"]        // Revati
];

// Sample baby names database for generator
const BABY_NAMES_SEED = [
  { name: "Aarav", meaning: "Peaceful", gender: "M", start: "A" },
  { name: "Chaitra", meaning: "Bright, Chaitra Month", gender: "F", start: "Cha" },
  { name: "Chandran", meaning: "Moon", gender: "M", start: "Cha" },
  { name: "Lalith", meaning: "Beautiful, Elegant", gender: "M", start: "La" },
  { name: "Lalitha", meaning: "Elegant Woman", gender: "F", start: "La" },
  { name: "Ishaan", meaning: "Lord Shiva, Sun", gender: "M", start: "Ee" },
  { name: "Vanya", meaning: "Gracious gift of God", gender: "F", start: "Va" },
  { name: "Varun", meaning: "Lord of Water", gender: "M", start: "Va" },
  { name: "Kiran", meaning: "Ray of Light", gender: "M", start: "Kee" },
  { name: "Keerthi", meaning: "Fame, Glory", gender: "F", start: "Kee" },
  { name: "Hari", meaning: "Lord Vishnu", gender: "M", start: "Ha" },
  { name: "Meena", meaning: "Precious Stone, Fish", gender: "F", start: "Me" },
  { name: "Namitha", meaning: "Humble", gender: "F", start: "Na" },
  { name: "Suresh", meaning: "Ruler of Gods", gender: "M", start: "So" },
  { name: "Deepak", meaning: "Lamp, Light", gender: "M", start: "Dee" }
];

// Complete Astrology Calculations Coordinator
export class AstrologyService {
  
  // Calculate Complete Panchang & Planets Positions
  public static calcPanchang(input: BirthInput): PanchangResponse {
    const lang = input.lang || "en";
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");

    // Gather planets
    const bodies = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
    const planets = bodies.map(b => computePlanetPosition(b, jd, ayanamsaSec, lang));
    
    // Lagna computation
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30.0);

    // Map planets to houses based on Lagna
    planets.forEach(p => {
      p.house = (p.rasiIndex - lagnaRasi + 12) % 12 + 1;
    });

    const sun = planets.find(p => p.name === "Sun")!;
    const moon = planets.find(p => p.name === "Moon")!;

    // Tithi
    let tithiDiff = (moon.longitude - sun.longitude + 360.0) % 360.0;
    const tithiIdx = Math.floor(tithiDiff / 12.0);
    const tithiRem = 12.0 - (tithiDiff % 12.0);
    const paksha = tithiIdx < 15 ? "Shukla" : "Krishna";

    // Nakshatra
    const nakIdx = Math.floor(moon.longitude / (360.0 / 27.0));
    const nakRem = (360.0 / 27.0) - (moon.longitude % (360.0 / 27.0));

    // Yoga
    const yogaDiff = (sun.longitude + moon.longitude) % 360.0;
    const yogaIdx = Math.floor(yogaDiff / (360.0 / 27.0));
    const yogaRem = (360.0 / 27.0) - (yogaDiff % (360.0 / 27.0));

    // Karana (each tithi half except first and last few)
    const karanaIdx = Math.floor(tithiDiff / 6.0);

    // Dynamic Sunrise & Sunset logic approx
    // Calculates proportional sunrise/sunset based on latitude
    const latFactor = input.latitude * 0.04;
    const sunriseHr = 6.0 - 0.5 * Math.sin(((sun.longitude - 90.0) * Math.PI) / 180.0) * Math.sin((latitudeToRad(input.latitude)));
    const sunsetHr = 18.0 + 0.5 * Math.sin(((sun.longitude - 90.0) * Math.PI) / 180.0) * Math.sin((latitudeToRad(input.latitude)));

    const formatHrMin = (hr: number) => {
      const h = Math.floor(hr + input.timezone);
      const m = Math.floor((hr + input.timezone - h) * 60);
      const absH = (h + 24) % 24;
      return `${absH.toString().padStart(2, "0")}:${Math.abs(m).toString().padStart(2, "0")}`;
    };

    const sunriseStr = formatHrMin(sunriseHr);
    const sunsetStr = formatHrMin(sunsetHr);

    // Rahu, Yamagandam, Gulikai (calculated by day divisions)
    // Day divides from Sunrise to Sunset in 8 parts of equal duration (approx 1.5 hours)
    const dayLen = sunsetHr - sunriseHr;
    const partLen = dayLen / 8.0;

    // Weekday
    const dateObj = new Date(input.year, input.month - 1, input.day);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayStr = weekdays[dateObj.getDay()];

    const getPartTime = (partIdx: number) => {
      const start = sunriseHr + partIdx * partLen;
      const end = start + partLen;
      return { start: formatHrMin(start), end: formatHrMin(end) };
    };

    // Rahu kalam weekdays table
    const rahuTable: Record<string, number> = {
      Sunday: 7, Monday: 1, Tuesday: 6, Wednesday: 4, Thursday: 5, Friday: 3, Saturday: 2
    };
    const yamaTable: Record<string, number> = {
      Sunday: 4, Monday: 3, Tuesday: 2, Wednesday: 1, Thursday: 7, Friday: 6, Saturday: 5
    };
    const guliTable: Record<string, number> = {
      Sunday: 6, Monday: 5, Tuesday: 4, Wednesday: 3, Thursday: 2, Friday: 1, Saturday: 0
    };

    const rahuPart = rahuTable[weekdayStr] || 0;
    const yamaPart = yamaTable[weekdayStr] || 0;
    const guliPart = guliTable[weekdayStr] || 0;

    // Festivals
    const festivals: string[] = [];
    if (tithiIdx === 10) festivals.push(paksha === "Shukla" ? "Shukla Ekadashi Vrat" : "Krishna Ekadashi Vrat");
    if (tithiIdx === 14 && paksha === "Krishna") festivals.push("Maha Shivaratri / Pradosham");
    if (tithiIdx === 14 && paksha === "Shukla") festivals.push("Pournami Vrat / Satyanarayana Pooja");
    if (tithiIdx === 29) festivals.push("Amavasya Pitru Tarpanam");

    return {
      sunrise: sunriseStr,
      sunset: sunsetStr,
      moonrise: formatHrMin(sunriseHr + 1.2), // Moon rises approx 50 mins later each day
      moonset: formatHrMin(sunsetHr + 1.2),
      rahuKalam: getPartTime(rahuPart),
      yamagandam: getPartTime(yamaPart),
      gulikai: getPartTime(guliPart),
      durmuhurtham: [getPartTime(1), getPartTime(5)],
      abhijit: { start: formatHrMin(11.6), end: formatHrMin(12.4) },
      brahmaMuhurta: { start: formatHrMin(sunriseHr - 1.5), end: formatHrMin(sunriseHr - 0.75) },
      tithi: {
        index: tithiIdx,
        name: translateTithi(tithiIdx, "en"),
        localizedName: translateTithi(tithiIdx, lang),
        degreeRemaining: tRemToDeg(tithiRem),
        paksha: paksha as any,
        pakshaLocalized: PAKSHA_TRANSLATIONS[paksha][lang]
      },
      nakshatra: {
        index: nakIdx,
        name: translateNakshatra(nakIdx, "en"),
        localizedName: translateNakshatra(nakIdx, lang),
        lord: NAKSHATRA_LORDS[nakIdx],
        lordLocalized: translatePlanet(NAKSHATRA_LORDS[nakIdx], lang),
        degreeRemaining: nakRem
      },
      yoga: {
        index: yogaIdx,
        name: translateYoga(yogaIdx, "en"),
        localizedName: translateYoga(yogaIdx, lang),
        degreeRemaining: yogaRem
      },
      karana: {
        index: karanaIdx,
        name: translateKarana(karanaIdx, "en"),
        localizedName: translateKarana(karanaIdx, lang)
      },
      festivals: festivals.map(f => translateFestival(f, lang)),
      planets
    };
  }

  // Calculate Vimshottari Dasha Periods
  public static calcVimshottariDasha(moonLong: number, birthYear: number, lang: LanguageCode): DashaTimeline {
    const totalNakDegrees = 360.0 / 27.0; // 13.3333 degrees per nakshatra
    const nakIdx = Math.floor(moonLong / totalNakDegrees);
    const degreeInNak = moonLong % totalNakDegrees;
    const fractionConsumed = degreeInNak / totalNakDegrees;

    const startLordIdx = nakIdx % 9; // starting lord index
    
    // Align Vimshottari starting from the birth Nakshatra lord
    const timeline: DashaNode[] = [];
    let currentYear = birthYear;
    let lordPtr = startLordIdx;

    // Remaining duration of the first mahadasha at birth
    const firstLordName = VIMSHOTTARI_LORDS[lordPtr];
    const firstLordTotalDuration = VIMSHOTTARI_DURATIONS[lordPtr];
    const initialElapsed = fractionConsumed * firstLordTotalDuration;
    const initialRemaining = firstLordTotalDuration - initialElapsed;

    // Traverse all planet cycles in sequence
    for (let i = 0; i < 9; i++) {
       const idx = (startLordIdx + i) % 9;
       const lordName = VIMSHOTTARI_LORDS[idx];
       const duration = i === 0 ? initialRemaining : VIMSHOTTARI_DURATIONS[idx];

       const startD = currentYear;
       const endD = currentYear + duration;
       currentYear = endD;

       // Antardashas (sub-periods)
       const subDashas: DashaNode[] = [];
       let subStart = startD;
       for (let j = 0; j < 9; j++) {
         const subIdx = (idx + j) % 9;
         const subLord = VIMSHOTTARI_LORDS[subIdx];
         // Antardasha duration ratio
         const subDuration = (VIMSHOTTARI_DURATIONS[idx] * VIMSHOTTARI_DURATIONS[subIdx]) / 120.0;
         
         // Scale first Antardasaha if first Mahadasha is partially spent
         const actualSubDuration = i === 0 ? (subDuration * (duration / firstLordTotalDuration)) : subDuration;

         subDashas.push({
           lord: subLord,
           localizedLord: translatePlanet(subLord, lang),
           startTime: `${Math.floor(subStart)}-01-01`,
           endTime: `${Math.floor(subStart + actualSubDuration)}-01-01`,
           durationYears: actualSubDuration
         });
         subStart += actualSubDuration;
       }

       timeline.push({
         lord: lordName,
         localizedLord: translatePlanet(lordName, lang),
         startTime: `${Math.floor(startD)}-01-01`,
         endTime: `${Math.floor(endD)}-01-01`,
         durationYears: duration,
         subDashas
       });
    }

    return {
      mahadasha: timeline[0].lord,
      localizedMahadasha: timeline[0].localizedLord,
      antardasha: timeline[0].subDashas![0].lord,
      localizedAntardasha: timeline[0].subDashas![0].localizedLord,
      pratyantardasha: timeline[0].subDashas![0].lord, // default proxy
      localizedPratyantardasha: timeline[0].subDashas![0].localizedLord,
      timeRemainingYears: initialRemaining,
      timeline
    };
  }

  // Detect Doshas and generate remedies with full localization support for English, Hindi, Telugu, Tamil, and Kannada
  public static detectDoshas(planets: PlanetPosition[], lagnaLong: number, lang: LanguageCode): DoshaRecord[] {
    const lagnaRasi = Math.floor(lagnaLong / 30.0);
    const mars = planets.find(p => p.name === "Mars")!;
    const rahu = planets.find(p => p.name === "Rahu")!;
    const ketu = planets.find(p => p.name === "Ketu")!;
    const jupiter = planets.find(p => p.name === "Jupiter")!;
    const moon = planets.find(p => p.name === "Moon")!;
    const sun = planets.find(p => p.name === "Sun")!;
    const saturn = planets.find(p => p.name === "Saturn")!;

    const doshas: DoshaRecord[] = [];

    // Localized strings definitions
    const translations: Record<string, Record<LanguageCode, { name: string; descTrue: string; descFalse: string; remedies: string[] }>> = {
      manglik: {
        en: {
          name: "Manglik Dosha (Kuja Dosha)",
          descTrue: `Mars is placed in house ${mars.house} from Lagna. This can generate marital obstacles, arguments, and relationship friction.`,
          descFalse: "No Mars affliction detected in relationship houses.",
          remedies: [
            "Chant Mangal Gayatri Mantra: Om Angarkaya Namah",
            "Offer red flowers and lentils at Hanuman temples on Tuesdays",
            "Perform Kumbh Vivah or Vishnu Vivah before marriage if severity is high",
            "Donate copper, red clothes, or split red lentils to charity"
          ]
        },
        te: {
          name: "కుజ దోషం (Manglik Dosha)",
          descTrue: `లగ్నం నుండి ${mars.house}వ స్థానంలో కుజుడు ఉన్నాడు. ఇది వివాహ ఆలస్యం, వివాదాలు మరియు संबंधాలలో మనస్పర్థలను కలిగిస్తుంది.`,
          descFalse: "సంబంధ గృహాలలో కుజ దోష ప్రభావం ఏదీ కనిపించలేదు.",
          remedies: [
            "మంగళ గాయత్రీ మంత్రం జపించండి: ఓం అంగారకాయ నమః",
            "మంగళవారం హనుమాన్ దేవాలయంలో ఎర్రటి పువ్వులు మరియు కందులను సమర్పించండి",
            "తీవ్రత ఎక్కువగా ఉంటే వివాహానికి ముందు కుంభ వివాహం లేదా విష్ణు వివాహం చేయండి",
            "రాగి, ఎర్రటి వస్త్రాలు లేదా కందిపప్పు దానం చేయండి"
          ]
        },
        hi: {
          name: "मांगलिक दोष (Kuja Dosha)",
          descTrue: `लग्न से ${mars.house}वें भाव में मंगल स्थित है। यह वैवाहिक बाधाएं, विवाद और संबंधों में तनाव पैदा कर सकता है।`,
          descFalse: "वैवाहिक भावों में मंगल का कोई हानिकारक प्रभाव नहीं देखा गया।",
          remedies: [
            "मंगल गायत्री मंत्र का जाप करें: ॐ अंगारकाय नमः",
            "मंगलवार को हनुमान मंदिर में लाल फूल और मसूर की दाल अर्पित करें",
            "यदि दोष अधिक हो तो विवाह से पहले कुंभ विवाह या विष्णु विवाह करें",
            "तांबा, लाल कपड़े या लाल मसूर की दाल दान करें"
          ]
        },
        ta: {
          name: "செவ்வாய் தோஷம் (Manglik Dosha)",
          descTrue: `லக்னத்திலிருந்து ${mars.house}வது வீட்டில் செவ்வாய் அமைந்துள்ளது. ఇది திருமண தடைகள் மற்றும் உறவுகளில் கருத்து வேறுபாடுகளை ஏற்படுத்தலாம்.`,
          descFalse: "உறவு வீடுகளில் செவ்வாய் தோஷ பாதிப்பு எதுவும் இல்லை.",
          remedies: [
            "செவ்வாய் காயத்ரி மந்திரத்தை உச்சரிக்கவும்: ஓம் அங்காரகாய நமஹ",
            "செவ்வாய்க்கிழமைகளில் அனுமன் கோவிலில் சிவப்பு மலர்கள் மற்றும் துவரம்பருப்பு சமர்ப்பிக்கவும்",
            "தாக்கம் அதிகமாக இருந்தால் திருமணத்திற்கு முன் கும்ப விவாகம் அல்லது விஷ்ணு விவாகம் செய்யவும்",
            "செம்பு, சிவப்பு ஆடை அல்லது உளுத்தம் பருப்பு தானம் செய்யவும்"
          ]
        },
        kn: {
          name: "ಮಂಗಳ ದೋಷ (Kuja Dosha)",
          descTrue: `ಲಗ್ನದಿಂದ ${mars.house}ನೇ ಮನೆಯಲ್ಲಿ ಮಂಗಳನಿದ್ದಾನೆ. ಇದು ವೈವಾಹಿಕ ಅಡೆತಡೆಗಳು ಮತ್ತು ಸಂಬಂಧಗಳಲ್ಲಿ ಕಲಹವನ್ನು ಉಂಟುಮಾಡಬಹುದು.`,
          descFalse: "ಸಂಬಂಧದ ಮನೆಗಳಲ್ಲಿ ಮಂಗಳನ ಯಾವುದೇ ದುಷ್ಪರಿಣಾಮ ಕಂಡುಬಂದಿಲ್ಲ.",
          remedies: [
            "ಮಂಗಳ ಗಾಯತ್ರಿ ಮಂತ್ರ ಜಪಿಸಿ: ಓಂ ಅಂಗಾರಕಾಯ ನಮಃ",
            "ಮಂಗಳವಾರ ಹನುಮಾನ್ ದೇವಸ್ಥಾನದಲ್ಲಿ ಕೆಂಪು ಹೂವು ಮತ್ತು ತೊಗರಿ ಬೇಳೆ ಅರ್ಪಿಸಿ",
            "ದೋಷ ತೀವ್ರವಾಗಿದ್ದರೆ ಮದುವೆಗೆ ಮುನ್ನ ಕುಂಭ ವಿವಾಹ ಅಥವಾ ವಿಷ್ಣು ವಿವಾಹ ಮಾಡಿ",
            "ತಾಮ್ರ, ಕೆಂಪು ವಸ್ತ್ರ ಅಥವಾ ಕೆಂಪು ಬೇಳೆ ದಾನ ಮಾಡಿ"
          ]
        }
      },
      kalasarpa: {
        en: {
          name: "Kala Sarpa Dosha",
          descTrue: "All planets are hemmed between Rahu and Ketu. Can bring struggles, sudden delays in achievements, and severe life shifts.",
          descFalse: "No cluster pattern between Rahu/Ketu detected.",
          remedies: [
            "Maha Mrityunjaya Mantra chanting daily (108 times)",
            "Perform Rahu-Ketu Shanti Puja at Kalahasti or Trimbakeshwar temples",
            "Donate black blankets or iron utensils to the needy",
            "Observe Vrat/fasting on Naag Panchami day"
          ]
        },
        te: {
          name: "కాల సర్ప దోషం (Kala Sarpa Dosha)",
          descTrue: "అన్ని గ్రహాలు రాహువు మరియు కేతువుల మధ్య బంధించబడి ఉన్నాయి. ఇది పోరాటాలు, విజయాలలో ఆకస్మిక జాప్యం మరియు జీవితంలో తీవ్రమైన మార్పులను తెస్తుంది.",
          descFalse: "రాహు-కేతువుల మధ్య ఏవిధమైన సర్ప దోష కూటమి కనిపించలేదు.",
          remedies: [
            "రోజూ మహా మృత్యుంజయ మంత్రం జపించండి (108 సార్లు)",
            "కాళహస్తి లేదా త్రయంబకేశ్వర్ ఆలయాలలో రాహు-కేతు శాంతి పూజ చేయండి",
            "పేదలకు నల్లని కంబళ్ళు లేదా ఇనుప పాత్రలను దానం చేయండి",
            "నాగ పంచమి రోజున ఉపవాసం ఆచరించండి"
          ]
        },
        hi: {
          name: "काल सर्प दोष (Kala Sarpa Dosha)",
          descTrue: "सभी ग्रह राहु और केतु के बीच बंधे हुए हैं। यह संघर्ष, उपलब्धियों में अचानक देरी और जीवन में बड़े उतार-चढ़ाव ला सकता है।",
          descFalse: "राहु और केतु के बीच कोई सर्प दोष प्रतिरूप नहीं पाया गया।",
          remedies: [
            "रोजाना महामृत्युंजय मंत्र का जाप करें (108 बार)",
            "कालाहस्ती या त्र्यंबकेश्वर मंदिर में राहु-केतु शांति पूजा करें",
            "जरूरतमंदों को काले कंबल या लोहे के बर्तन दान करें",
            "नाग पंचमी के दिन व्रत / उपवास रखें"
          ]
        },
        ta: {
          name: "கால சர்ப்ப தோஷம் (Kala Sarpa Dosha)",
          descTrue: "அனைத்து கிரகங்களும் ராகு மற்றும் கேதுவுக்கு இடையில் அமைந்துள்ளன. இது தடைகள், திடீர் தாமதங்கள் மற்றும் வாழ்வில் பெரும் மாற்றங்களைக் கொண்டுவரலாம்.",
          descFalse: "ராகு-கேதுவுக்கு இடையே எந்த கால சர்ப்ப தோஷ அமைப்பும் இல்லை.",
          remedies: [
            "தினமும் மகா மிருத்யுஞ்சய மந்திரத்தை உச்சரிக்கவும் (108 முறை)",
            "காளஹஸ்தி அல்லது திரியம்பகேஸ்வரர் கோவிலில் ராகு-கேது சாந்தி பூஜை செய்யவும்",
            "ஏழைகளுக்கு கருப்பு கம்பளி அல்லது இரும்பு பாத்திரங்களை தானம் செய்யவும்",
            "நாக பஞ்சமி அன்று விரதம் இருக்கவும்"
          ]
        },
        kn: {
          name: "ಕಾಲ ಸರ್ಪ ದೋಷ (Kala Sarpa Dosha)",
          descTrue: "ಎಲ್ಲಾ ಗ್ರಹಗಳು ರಾಹು ಮತ್ತು ಕೇತುಗಳ ಮಧ್ಯೆ ಬಂಧಿತವಾಗಿವೆ. ಇದು ಜೀವನದಲ್ಲಿ ಹೋರಾಟ, ಯಶಸ್ಸಿನಲ್ಲಿ ಹಠಾತ್ ವಿಳಂಬ ಮತ್ತು ತೀವ್ರ ಬದಲಾವಣೆಗಳನ್ನು ತರಬಹುದು.",
          descFalse: "ರಾಹು ಮತ್ತು ಕೇತುಗಳ ನಡುವೆ ಯಾವುದೇ ಕಾಲ ಸರ್ಪ ದೋಷ ಕಂಡುಬಂದಿಲ್ಲ.",
          remedies: [
            "ಪ್ರತಿದಿನ ಮಹಾ ಮೃತ್ಯುಂಜಯ ಮಂತ್ರ ಜಪಿಸಿ (108 ಬಾರಿ)",
            "ಕಾಳಹಸ್ತಿ ಅಥವಾ ತ್ರಯಂಬಕೇಶ್ವರ ದೇವಸ್ಥಾನದಲ್ಲಿ ರಾಹು-ಕೇತು ಶಾಂತಿ ಪೂಜೆ ಮಾಡಿ",
            "ಬಡವರಿಗೆ ಕಪ್ಪು ಕಂಬಳಿ ಅಥವಾ ಕಬ್ಬಿಣದ ಪಾತ್ರೆಗಳನ್ನು ದಾನ ಮಾಡಿ",
            "ನಾಗರ ಪಂಚಮಿಯಂದು ಉಪವಾಸ ಆಚರಿಸಿ"
          ]
        }
      },
      guruchandal: {
        en: {
          name: "Guru Chandal Dosha",
          descTrue: "Jupiter and Rahu/Ketu are conjunct in the same house. Can disturb concentration, wisdom, spiritual focus, and generate teacher-disciple conflicts.",
          descFalse: "Jupiter is un-afflicted by Rahu or Ketu.",
          remedies: [
            "Donate yellow sweets, gold, or chana dal to pandits on Thursdays",
            "Keep a fast on Thursdays, avoid eating salty food",
            "Recite Guru Stotram or Shiva Chalisa regularly"
          ]
        },
        te: {
          name: "గురు చండాల దోషం (Guru Chandal Dosha)",
          descTrue: "గురువు మరియు రాహు/కేతువులు ఒకే స్థానంలో కలిసి ఉన్నారు. ఇది ఏకాగ్రత, జ్ఞానం, ఆధ్యాత్మికతను దెబ్బతీస్తుంది మరియు గురు-శిష్యుల మధ్య వివాదాలను కలిగిస్తుంది.",
          descFalse: "గురు గ్రహం రాహువు లేదా కేతువుల వల్ల పీడించబడలేదు.",
          remedies: [
            "గురువారాల్లో పండితులకు పసుపు రంగు మిఠాయిలు, బంగారం లేదా శనగపప్పు దానం చేయండి",
            "గురువారాల్లో ఉపవాసం ఉండండి, ఉప్పు ఉన్న ఆహారానికి దూరంగా ఉండండి",
            "రోజూ గురు స్తోత్రం లేదా శివ చాలీసా పఠించండి"
          ]
        },
        hi: {
          name: "गुरु चांडाल दोष (Guru Chandal Dosha)",
          descTrue: "गुरु और राहु/केतु एक ही भाव में युति कर रहे हैं। यह एकाग्रता, बुद्धि, आध्यात्मिक ध्यान को बाधित कर सकता है और गुरु-सिष्य विवाद पैदा कर सकता है।",
          descFalse: "गुरु देव राहु या केतु के प्रभाव से मुक्त हैं।",
          remedies: [
            "गुरुवार को पंडितों को पीली मिठाइयां, सोना या चना दाल दान करें",
            "गुरुवार को व्रत रखें, नमकीन भोजन ग्रहण करने से बचें",
            "नियमित रूप से गुरु स्तोत्र या शिव चालीसा का पाठ करें"
          ]
        },
        ta: {
          name: "குரு சண்டாள தோஷம் (Guru Chandal Dosha)",
          descTrue: "குரு மற்றும் ராகு/கேது ஒரே வீட்டில் இணைந்துள்ளனர். இது மன ஒருமுகப்பாடு, அறிவு மற்றும் ஆன்மீக கவனத்தை குலைக்கக்கூடும்.",
          descFalse: "வியாழன் ராகு அல்லது கேதுவின் தீய பார்வையில் இருந்து விடுபட்டுள்ளார்.",
          remedies: [
            "வியாழக்கிழமைகளில் பிராமணர்களுக்கு மஞ்சள் இனிப்புகள், தங்கம் அல்லது கடலை பருப்பு தானம் செய்யவும்",
            "வியாழக்கிழமை விரதம் இருக்கவும், உப்பு உணவுகளைத் தவிர்க்கவும்",
            "தினமும் குரு ஸ்தோத்திரம் அல்லது சிவ சாலிசா பாராயணம் செய்யவும்"
          ]
        },
        kn: {
          name: "ಗುರು ಚಾಂಡಾಲ ದೋಷ (Guru Chandal Dosha)",
          descTrue: "ಗುರು ಮತ್ತು ರಾಹು/ಕೇತು ಒಂದೇ ಮನೆಯಲ್ಲಿ ಒಟ್ಟಿಗೆ ಇದ್ದಾರೆ. ಇದು ಏಕಾಗ್ರತೆ, ಬುದ್ಧಿಶಕ್ತಿ, ಆಧ್ಯಾತ್ಮಿಕ ಗಮನವನ್ನು ಕದಡಬಹುದು.",
          descFalse: "ಗುರು ಗ್ರಹವು ರಾಹು ಅಥವಾ ಕೇತುವಿನ ದುಷ್ಪರಿಣಾಮದಿಂದ ಮುಕ್ತವಾಗಿದೆ.",
          remedies: [
            "ಗುರುವಾರದಂದು ಪುರೋಹಿತರಿಗೆ ಹಳದಿ ಸಿಹಿತಿಂಡಿ, ಚಿನ್ನ ಅಥವಾ ಕಡಲೆ ಬೇಳೆ ದಾನ ಮಾಡಿ",
            "ಗುರುವಾರದಂದು ಉಪವಾಸ ಆಚರಿಸಿ, ಉಪ್ಪು ಆಹಾರ ಸೇವಿಸಬೇಡಿ",
            "ನಿಯಮಿತವಾಗಿ ಗುರು ಸ್ತೋತ್ರ ಅಥವಾ ಶಿವ ಚಾಲೀಸಾ ಪಠಿಸಿ"
          ]
        }
      },
      kemadruma: {
        en: {
          name: "Kemadruma Dosha",
          descTrue: "Moon is lonely with no planets in adjacent houses. Can cause mind fluctuations, temporary financial losses, or feelings of isolation.",
          descFalse: "Moon is supported by adjacent planetary nodes.",
          remedies: [
            "Perform Shiva Puja on Mondays with water/milk abhishekam",
            "Support mother or elderly women financially and spiritually",
            "Keep a silver coin or piece in pocket to stabilize lunar energy"
          ]
        },
        te: {
          name: "కేమద్రుమ దోషం (Kemadruma Dosha)",
          descTrue: "చంద్రుడి పక్క గృహాలలో ఏ గ్రహాలూ లేకుండా చంద్రుడు ఒంటరిగా ఉన్నాడు. ఇది మానసిక ఒడుదొడుకులు, తాత్కాలిక ఆర్థిక నష్టాలు మరియు ఒంటరితనాన్ని కలిగిస్తుంది.",
          descFalse: "చంద్రునికి పక్క గృహాలలోని గ్రహాలు మద్దతుగా ఉన్నాయి.",
          remedies: [
            "సోమవారాల్లో నీరు/పాలు అభిషేకంతో శివ పూజ చేయండి",
            "తల్లి లేదా పెద్ద వయసు మహిళలకు ఆర్థికంగా, ఆధ్యాత్మికంగా మద్దతు ఇవ్వండి",
            "చంద్రుడి శక్తిని స్థిరపరచడానికి జేబులో వెండి నాణెం ఉంచుకోండి"
          ]
        },
        hi: {
          name: "केमद्रुम दोष (Kemadruma Dosha)",
          descTrue: "चंद्रमा के आस-पास के भावों में कोई ग्रह न होने से चंद्रमा अकेला है। यह मानसिक अशांति, अस्थाई आर्थिक नुकसान या अकेलेपन की भावना पैदा कर सकता है।",
          descFalse: "चंद्रमा को आस-पास के भावों में ग्रहों का सहारा प्राप्त है।",
          remedies: [
            "सोमवार को जल/दूध के अभिषेक से शिव पूजा करें",
            "माता या वृद्ध महिलाओं की आर्थिक और मानसिक सहायता करें",
            "चंद्र ऊर्जा को स्थिर करने के लिए जेब में चांदी का सिक्का रखें"
          ]
        },
        ta: {
          name: "கேமத்ரும தோஷம் (Kemadruma Dosha)",
          descTrue: "சந்திரனுக்கு இரு பக்க வீடுகளிலும் கிரகங்கள் இல்லாமல் சந்திரன் தனித்து இருக்கிறார். இது மன உளைச்சல், தற்காலிக நிதி இழப்புகள் அல்லது தனிமை உணர்வைத் தரலாம்.",
          descFalse: "சந்திரனுக்கு இரு பக்கத்திலும் கிரகங்களின் ஆதரவு உள்ளது.",
          remedies: [
            "திங்கட்கிழமைகளில் பால்/நீர் அபிஷேகத்துடன் சிவ வழிபாடு செய்யவும்",
            "தாய் அல்லது வயதான பெண்களுக்கு நிதியுதவி மற்றும் ஆன்மீக ஆதரவு அளிக்கவும்",
            "சந்திரனின் சக்தியை சீராக்க பாக்கெட்டில் வெள்ளி நாணயத்தை வைத்திருக்கவும்"
          ]
        },
        kn: {
          name: "ಕೇಮದ್ರುಮ ದೋಷ (Kemadruma Dosha)",
          descTrue: "ಚಂದ್ರನ ಪಕ್ಕದ ಮನೆಗಳಲ್ಲಿ ಯಾವುದೇ ಗ್ರಹಗಳು ಇರದೆ ಚಂದ್ರನು ಒಂಟಿಯಾಗಿದ್ದಾನೆ. ಇದು ಮಾನಸಿಕ್ ತಳಮಳ, ತಾತ್ಕಾಲಿಕ ಆರ್ಥಿಕ ನಷ್ಟ ಹಾಗೂ ಒಂಟಿತನಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು.",
          descFalse: "ಚಂದ್ರನಿಗೆ ಪಕ್ಕದ ಮನೆಗಳ ಗ್ರಹಗಳ ಬೆಂಬಲವಿದೆ.",
          remedies: [
            "ಸೋಮವಾರದಂದು ನೀರು ಅಥವಾ ಹಾಲಿನ ಅಭಿಷೇಕದೊಂದಿಗೆ ಶಿವ ಪೂಜೆ ಮಾಡಿ",
            "ತಾಯಿ ಅಥವಾ ಹಿರಿಯ ಆರ್ಥಿಕವಾಗಿ ಹಾಗೂ ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ನೆರವಾಗಿ",
            "ಚಂದ್ರನ ಶಕ್ತಿ ಸ್ಥಿರಗೊಳಿಸಲು ಜೇಬಿನಲ್ಲಿ ಬೆಳ್ಳಿಯ ನಾಣ್ಯವನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ"
          ]
        }
      },
      pitru: {
        en: {
          name: "Pitru Dosha & Shani Affliction",
          descTrue: "Saturn and Sun/Rahu conjunct, indicating inherited ancestral karmas, father obstacles, and authority conflicts.",
          descFalse: "No generational or Saturn-Sun conflict detected.",
          remedies: [
            "Offer white til and water to ancestors on Pitru Amavasya",
            "Observe Shravan Somvar fasts and feed black cows on Saturdays",
            "Chant Gayatri Mantra daily at sunrise"
          ]
        },
        te: {
          name: "పితృ దోషం మరియు శని పీడ (Pitru Dosha & Shani Affliction)",
          descTrue: "శని మరియు సూర్యుడు/రాహువులు కలిసి ఉన్నారు, ఇది పితృ దోషాన్ని, తండ్రితో విభేదాలను, మరియు పనులలో ఆటంకాలను సూచిస్తుంది.",
          descFalse: "ఎలాంటి పితృ దోషం లేదా శని-సూర్య విభేదాలు లేవు.",
          remedies: [
            "పితృ అమావాస్య రోజున పితృదేవతలకు తెల్ల నువ్వులు మరియు నీటిని సమర్పించండి",
            "శ్రావణ సోమవార ఉపవాసాలు ఆచరించండి మరియు శనివారం నల్ల ఆవుకు ఆహారం ఇవ్వండి",
            "ప్రతిరోజూ సూర్యోదయ సమయంలో గాయత్రీ మంత్రాన్ని జపించండి"
          ]
        },
        hi: {
          name: "पितृ दोष और शनि पीड़ा (Pitru Dosha & Shani Affliction)",
          descTrue: "शनि और सूर्य/राहु की युति है, जो वंशानुगत पितृ दोष, पिता से मतभेद और कार्यों में रुकावटों को दर्शाती है।",
          descFalse: "कोई भी वंशानुगत पितृ दोष या शनि-सूर्य का टकराव उपस्थित नहीं है।",
          remedies: [
            "पितृ अमावस्या पर पूर्वजों को सफेद तिल और जल अर्पित करें",
            "श्रावण सोमवार के व्रत रखें और शनिवार को काली गाय को भोजन कराएं",
            "रोजाना सूर्योदय के समय गायत्री मंत्र का जाप करें"
          ]
        },
        ta: {
          name: "பித்ரு தோஷம் மற்றும் சனி தாகம் (Pitru Dosha & Shani Affliction)",
          descTrue: "சனி மற்றும் சூரியன்/ராகு இணைந்துள்ளனர், இது பித்ரு தோஷம், தந்தை வழியில் தடைகள் மற்றும் அதிகார மோதல்களைக் குறிக்கிறது.",
          descFalse: "எந்த பித்ரு தோஷமோ లేదా சனி-சூரிய மோதலோ கண்டறியப்படவில்லை.",
          remedies: [
            "பித்ரு அமாவாசை அன்று முன்னோர்களுக்கு வெள்ளை எள் மற்றும் நீர் அஞ்சலி செலுத்தவும்",
            "சிராவண திங்கட்கிழமைகளில் விரதம் இருக்கவும், சனிக்கிழமைகளில் கருப்பு பசுவிற்கு உணவளிக்கவும்",
            "தினமும் சூரிய உதயத்தில் காயத்ரி மந்திரத்தை உச்சரிக்கவும்"
          ]
        },
        kn: {
          name: "ಪಿತೃ ದೋಷ ಮತ್ತು ಶನಿ ಪೀಡೆ (Pitru Dosha & Shani Affliction)",
          descTrue: "ಮತ್ತು సూర్య/రాహు ಒಟ್ಟಿಗೆ ಇದ್ದಾರೆ, ಇದು ಪಿತೃ ದೋಷ, ತಂದೆಯೊಂದಿಗೆ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಮತ್ತು ಅಧಿಕಾರದೊಂದಿಗೆ ಘರ್ಷಣೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
          descFalse: "ಯಾವುದೇ ಪಿತೃ ದೋಷ ಅಥವಾ ಶನಿ-ಸೂರ್ಯ ಸಂಘರ್ಷ ಕಂಡುಬಂದಿಲ್ಲ.",
          remedies: [
            "ಪಿತೃ ಅಮಾವಾಸ್ಯೆಯಂದು ಹಿರಿಯರಿಗೆ ಬಿಳಿ ಎಳ್ಳು ಮತ್ತು ನೀರನ್ನು ಅರ್ಪಿಸಿ",
            "ಶ್ರಾವಣ ಸೋಮವಾರ ಉಪವಾಸ ಮಾಡಿ ಹಾಗೂ ಶನಿವಾರ ಕಪ್ಪು ಹಸುವಿಗೆ ಆಹಾರ ನೀಡಿ",
            "ಪ್ರತಿದಿನ ಸೂರ್ಯೋದಯದ ಸಮಯದಲ್ಲಿ ಗಾಯತ್ರಿ ಮಂತ್ರ ಜಪಿಸಿ"
          ]
        }
      }
    };

    const l = (translations.manglik[lang] ? lang : "en") as LanguageCode;

    // 1. Manglik Dosha (Kuja Dosha)
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(mars.house);
    const mTrans = translations.manglik[l];
    doshas.push({
      hasDosha: isManglik,
      name: translations.manglik.en.name,
      localizedName: mTrans?.name || translations.manglik.en.name,
      severity: isManglik ? (mars.house === 7 || mars.house === 8 ? "High" : "Medium") : "None",
      description: isManglik ? mTrans?.descTrue : mTrans?.descFalse,
      remedies: mTrans?.remedies || []
    });

    // 2. Kala Sarpa Dosha
    const nodeDiff = Math.abs(rahu.rasiIndex - ketu.rasiIndex);
    let hasKalaSarpa = false;
    if (nodeDiff === 6) {
      const rah = rahu.longitude;
      const ket = ketu.longitude;
      const minNode = Math.min(rah, ket);
      const maxNode = Math.max(rah, ket);
      const normalCount = planets.filter(p => p.longitude > minNode && p.longitude < maxNode).length;
      if (normalCount === 0 || normalCount === 10) {
        hasKalaSarpa = true;
      }
    }
    const ksTrans = translations.kalasarpa[l];
    doshas.push({
      hasDosha: hasKalaSarpa,
      name: translations.kalasarpa.en.name,
      localizedName: ksTrans?.name || translations.kalasarpa.en.name,
      severity: hasKalaSarpa ? "High" : "None",
      description: hasKalaSarpa ? ksTrans?.descTrue : ksTrans?.descFalse,
      remedies: ksTrans?.remedies || []
    });

    // 3. Guru Chandal Dosha
    const hasGuruChandal = jupiter.rasiIndex === rahu.rasiIndex || jupiter.rasiIndex === ketu.rasiIndex;
    const gcTrans = translations.guruchandal[l];
    doshas.push({
      hasDosha: hasGuruChandal,
      name: translations.guruchandal.en.name,
      localizedName: gcTrans?.name || translations.guruchandal.en.name,
      severity: hasGuruChandal ? "Medium" : "None",
      description: hasGuruChandal ? gcTrans?.descTrue : gcTrans?.descFalse,
      remedies: gcTrans?.remedies || []
    });

    // 4. Kemadruma Dosha
    const adjacentHouses = [(moon.house - 1 + 12) % 12 || 12, (moon.house + 1) % 12 || 12];
    const hasKemadruma = planets.filter(p => p.name !== "Moon" && p.name !== "Sun" && adjacentHouses.includes(p.house)).length === 0;
    const kdTrans = translations.kemadruma[l];
    doshas.push({
      hasDosha: hasKemadruma,
      name: translations.kemadruma.en.name,
      localizedName: kdTrans?.name || translations.kemadruma.en.name,
      severity: hasKemadruma ? "Medium" : "None",
      description: hasKemadruma ? kdTrans?.descTrue : kdTrans?.descFalse,
      remedies: kdTrans?.remedies || []
    });

    // 5. Pitru Dosha & Shani Affliction
    const hasShaniSuryaNode = saturn.rasiIndex === sun.rasiIndex || saturn.rasiIndex === rahu.rasiIndex;
    const ptTrans = translations.pitru[l];
    doshas.push({
      hasDosha: hasShaniSuryaNode,
      name: translations.pitru.en.name,
      localizedName: ptTrans?.name || translations.pitru.en.name,
      severity: hasShaniSuryaNode ? "Medium" : "None",
      description: hasShaniSuryaNode ? ptTrans?.descTrue : ptTrans?.descFalse,
      remedies: ptTrans?.remedies || []
    });

    return doshas;
  }

  // Ashta Koota Matching & Porutham Matching
  public static calculateMatching(boyInput: BirthInput, girlInput: BirthInput, lang: LanguageCode): MatchingResult {
    // Generate panchang for both to get moon properties
    const boyPanchang = AstrologyService.calcPanchang(boyInput);
    const girlPanchang = AstrologyService.calcPanchang(girlInput);

    const bNak = boyPanchang.nakshatra.index;
    const gNak = girlPanchang.nakshatra.index;

    const bRasi = boyPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;
    const gRasi = girlPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;

    const ashtaKoota: MatchScore[] = [];

    // Helper tables for names & properties to ensure fully standalone status
    const LORD_FRIENDS = {
      Sun: { friends: ["Moon", "Mars", "Jupiter"], enemies: ["Saturn", "Venus"], neutrals: ["Mercury"] },
      Moon: { friends: ["Sun", "Mercury"], enemies: [], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"] },
      Mars: { friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"], neutrals: ["Venus", "Saturn"] },
      Mercury: { friends: ["Sun", "Venus"], enemies: ["Moon"], neutrals: ["Mars", "Jupiter", "Saturn"] },
      Jupiter: { friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"], neutrals: ["Saturn"] },
      Venus: { friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"], neutrals: ["Mars", "Jupiter"] },
      Saturn: { friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"], neutrals: ["Jupiter"] }
    };

    const RASHI_LORDS = [
      "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
      "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"
    ];

    const G_NAMES: Record<LanguageCode, string[]> = {
      en: ["Deva (Divine)", "Manushya (Human)", "Rakshasa (Assertive)"],
      hi: ["देव (दैवीय)", "मनुष्यों (मानवीय)", "राक्षस (दृढ़)"],
      te: ["దేవ గణము", "మనుష్య గణము", "రాక్షస గణము"],
      ta: ["தேவ கணம் (Deva)", "மனித கணம் (Manushya)", "ராட்சச கணம் (Rakshasa)"],
      kn: ["ದೇವ ಗಣ (Deva)", "ಮನುಷ್ಯ ಗಣ (Manushya)", "ರಾಕ್ಷಸ ಗಣ (Rakshasa)"]
    };

    const NAKSHATRA_GANAS = [
      0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 0, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0
    ];

    const YONI_NAMES: Record<LanguageCode, string[]> = {
      en: [
        "Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", 
        "Cow", "Buffalo", "Tiger", "Hare", "Monkey", "Mongoose", "Lion"
      ],
      hi: [
        "अश्व (घोड़ा)", "गज (हाथी)", "मेष (भेड़)", "सर्प (सांप)", "श्वान (कुत्ता)", "मार्जार (बिल्ली)", "मूषक (चूहा)",
        "गौ (गाय)", "महिष (भैंस)", "व्याघ्र (बाघ)", "शशक (खरगोश)", "वानर (बंदर)", "नकुल (नेवला)", "सिंह (शेर)"
      ],
      te: [
        "అశ్వము (గుర్రం)", "గజము (ఏనుగు)", "మేషము (గొర్రె)", "సర్పము (పాము)", "శ్వానము (कुక్క)", "మార్జాలము (పిల్లి)", "మూషికము (ఎలుక)",
        "గోవు (ఆవు)", "మహిషము (గేదె)", "వ్యాఘ్రము (పులి)", "शశకము (కుందేలు)", "వానరము (కోతి)", "నకులాన్ని (కీచురాయి)", "సింహము (సింహం)"
      ],
      ta: [
        "குதிரை (Horse)", "யானை (Elephant)", "ஆடு (Sheep)", "பாம்பு (Serpent)", "நாய் (Dog)", "பூனை (Cat)", "எலி (Rat)", 
        "பசு (Cow)", "எருமை (Buffalo)", "புலி (Tiger)", "முயல் (Hare)", "குரங்கு (Monkey)", "கீரி (Mongoose)", "சிங்கம் (Lion)"
      ],
      kn: [
        "ಕುದುರೆ (Horse)", "ಆನೆ (Elephant)", "ಕುರಿ (Sheep)", "ಹಾವು (Serpent)", "ನಾಯಿ (Dog)", "ಬೆಕ್ಕು (Cat)", "ಇಲಿ (Rat)", 
        "ಹಸು (Cow)", "ಎಮ್ಮೆ (Buffalo)", "ಹುಲಿ (Tiger)", "ಮೊಲ (Hare)", "ಕೋತಿ (Monkey)", "ಕೀರಿ (Mongoose)", "ಸಿಂಹ (Lion)"
      ]
    };

    const NAKSHATRA_YONIS = [
      0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1
    ];

    const NAKSHATRA_NADIS = [
      0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
    ];

    const NADI_NAMES: Record<LanguageCode, string[]> = {
      en: ["Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)"],
      hi: ["आदि (वात)", "मध्य (पित्त)", "अंत्य (कफ)"],
      te: ["ఆది (వాత)", "మధ్య (పిత్తం)", "అంత్య (కఫం)"],
      ta: ["ஆதி (வாதம்)", "மத்திய (பித்தம்)", "அந்தியம் (கபம்)"],
      kn: ["ಆದಿ (ವಾತ)", "ಮಧ್ಯ (ಪಿತ್ತ)", "ಅಂತ್ಯ (ಕಫ)"]
    };

    // 1. Varna (max 1 point)
    let varnaScore = 0;
    const getVarnaInfo = (rIndex: number) => {
      const idx = rIndex % 12;
      const vLabels: Record<LanguageCode, string> = {
        en: "Brahmin (Intellectual)",
        hi: "ब्राह्मण (बौद्धिक)",
        te: "బ్రాహ్మణ (మేధోశక్తి)",
        ta: "பிராமணர் (அறிவுசார்)",
        kn: "ಬ್ರಾಹ್ಮಣ (ಬೌದ್ಧಿಕ)"
      };
      const kLabels: Record<LanguageCode, string> = {
        en: "Kshatriya (Administrative)",
        hi: "क्षत्रिय (प्रशासकीय)",
        te: "క్షత్రియ (పరిపాలనా)",
        ta: "சத்திரியர் (நிர்வாகம்)",
        kn: "ಕ್ಷತ್ರಿಯ (ಆಡಳಿತಾತ್ಮಕ)"
      };
      const vaLabels: Record<LanguageCode, string> = {
        en: "Vaishya (Mercantile)",
        hi: "वैश्य (व्यावसायिक)",
        te: "వైశ్య (వ్యాపార)",
        ta: "வைசியர் (வணிகம்)",
        kn: "ವೈಶ್ಯ (ವ್ಯಾಪಾರ)"
      };
      const sLabels: Record<LanguageCode, string> = {
        en: "Shudra (Service-oriented)",
        hi: "शूद्र (सेवाभावी)",
        te: "శూద్ర (సేవా)",
        ta: "சூத்திரர் (சேவை)",
        kn: "ಶೂದ್ರ (ಸೇವಾವಿಧಾನ)"
      };

      if ([3, 7, 11].includes(idx)) return { code: 0, name: "Brahmin", labels: vLabels };
      if ([0, 4, 8].includes(idx)) return { code: 1, name: "Kshatriya", labels: kLabels };
      if ([1, 5, 9].includes(idx)) return { code: 2, name: "Vaishya", labels: vaLabels };
      return { code: 3, name: "Shudra", labels: sLabels };
    };

    const bVarna = getVarnaInfo(bRasi);
    const gVarna = getVarnaInfo(gRasi);

    if (bVarna.code <= gVarna.code) {
      varnaScore = 1;
    }

    let varnaDesc = "";
    if (lang === "te") {
      varnaDesc = varnaScore > 0 
        ? `అనుకూలమైన వర్ణ కలయిక. వరుడు ${bVarna.labels.te} మరియు వధువు ${gVarna.labels.te}. మానసిక మరియు వృత్తిపరమైన సమతుల్యత బాగుంటుంది.`
        : `వర్ణ సరిపోలడం లేదు. వరుడు ${bVarna.labels.te} మరియు వధువు ${gVarna.labels.te}. పరస్పర సమన్వయం మరియు అవగాహన అవసరం.`;
    } else if (lang === "hi") {
      varnaDesc = varnaScore > 0
        ? `अनुकूल वर्ण मिलान। वर ${bVarna.labels.hi} और वधू ${gVarna.labels.hi}। आपसी समझ और दृष्टिकोण में अनुकूलता रहेगी।`
        : `वर्ण अनुकूल नहीं है। वर ${bVarna.labels.hi} और वधू ${gVarna.labels.hi}। सामंजस्य के लिए अधिक प्रयास की आवश्यकता हो सकती है।`;
    } else if (lang === "ta") {
      varnaDesc = varnaScore > 0
        ? `சாதகமான வர்ண பொருத்தம். வரன் ${bVarna.labels.ta} மற்றும் வது ${gVarna.labels.ta}. இருவருக்கிடையே நல்ல புரிதல் இருக்கும்.`
        : `வர்ண பொருத்தம் திருப்திகரமாக இல்லை. வரன் ${bVarna.labels.ta} மற்றும் வது ${gVarna.labels.ta}. பரஸ்பர விட்டுக்கொடுத்தல் தேவை.`;
    } else if (lang === "kn") {
      varnaDesc = varnaScore > 0
        ? `ಅನುಕೂಲಕರ ವರ್ಣ ಹೊಂದಾಣಿಕೆ. ವರ ${bVarna.labels.kn} ಮತ್ತು ವಧು ${gVarna.labels.kn}. ಮಾನಸಿಕ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಪರಸ್ಪರ ಗೌರವ ಚೆನ್ನಾಗಿರುತ್ತದೆ.`
        : `ವರ್ಣ ಹೊಂದಾಣಿಕೆ ಕಡಿಮೆ ಇದೆ. ವರ ${bVarna.labels.kn} ಮತ್ತು ವಧು ${gVarna.labels.kn}. ವೈವಾಹಿಕ ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ಹೊಂದಾಣಿಕೆ ಅಗತ್ಯ.`;
    } else {
      varnaDesc = varnaScore > 0
        ? `Auspicious Varna matching. Groom is ${bVarna.labels.en} and bride is ${gVarna.labels.en}. Excellent temperament sync and mutual respect.`
        : `Varna variance detected. Groom is ${bVarna.labels.en} and bride is ${gVarna.labels.en}. Requires subtle understanding and professional adjustments.`;
    }

    ashtaKoota.push({
      koota: "Varna",
      localizedKoota: translateKoota("Varna", lang),
      maxPoints: 1,
      obtainedPoints: varnaScore,
      description: varnaDesc
    });

    // 2. Vashya (max 2 points)
    const getVashyaInfo = (idx: number) => {
      const vashyaCategoriesTe = ["చతుష్పాద (జంతువు)", "మానవ (మనుష్య)", "జలచర (నీటి సంబంధిత)", "వనచర (అడవి జంతువు)", "కీటక (పురుగు)"];
      const vashyaCategoriesHi = ["चतुष्पद (चौपाया)", "मानव (मनुष्य)", "जलचर (पानी का)", "वनचर (जंगली)", "कीट (जलीय/कीड़ा)"];
      const vashyaCategoriesTa = ["சதுஸ்பாத (விலங்கு)", "மானிட (மனிதன்)", "ஜலசர (நீர்)", "வனசர (காடு)", "கீடகம் (பூச்சி)"];
      const vashyaCategoriesKn = ["ಚತುಷ್ಪಾದ (ಪ್ರಾಣಿ)", "ಮಾನವ (ಮನುಷ್ಯ)", "ಜಲಚರ (ಜಲ ಪ್ರಾಣಿ)", "ವನಚರ (ಕಾಡು ಪ್ರಾಣಿ)", "ಕೀಟಕ (ಕೀಟ)"];
      const vashyaCategoriesEn = ["Quadruped (Animal)", "Human (Homo Sapiens)", "Water-bearer (Aquatic)", "Wild-beast (Forest)", "Insectoid (Insect)"];

      let code = 1; // Human by default
      if ([0, 1, 8].includes(idx)) code = 0; // Aries, Taurus, Sagittarius (first half) - Quadruped
      else if ([3, 11].includes(idx)) code = 2; // Cancer, Pisces - Aquatic
      else if ([4].includes(idx)) code = 3; // Leo - Forest
      else if ([7].includes(idx)) code = 4; // Scorpio - Insect
      
      const labels = {
        te: vashyaCategoriesTe[code],
        hi: vashyaCategoriesHi[code],
        ta: vashyaCategoriesTa[code],
        kn: vashyaCategoriesKn[code],
        en: vashyaCategoriesEn[code]
      };
      return { code, labels };
    };

    const bVashya = getVashyaInfo(bRasi);
    const gVashya = getVashyaInfo(gRasi);

    let vashyaScore = 1;
    if (bVashya.code === gVashya.code) {
      vashyaScore = 2;
    } else if (bVashya.code === 3 || gVashya.code === 3) {
      vashyaScore = 0;
    } else if (bVashya.code === 1 && gVashya.code === 0) {
      vashyaScore = 1.5;
    }

    let vashyaDesc = "";
    if (lang === "te") {
      vashyaDesc = vashyaScore === 2
        ? `అద్భుతమైన వశ్య పొంతన (${bVashya.labels.te} - ${gVashya.labels.te}). దంపతుల మధ్య బలమైన ఆకర్షణ, ఒకరినొకరు సులభంగా అర్థం చేసుకునే గుణం ఉంటాయి.`
        : vashyaScore > 0 
          ? `సగటు వశ్య అనుకూలత (${bVashya.labels.te} - ${gVashya.labels.te}). స్థిరమైన గృహ జీవితం కోసం పరస్పర గౌరవం అవసరం.`
          : `వశ్య సరిపోలడం లేదు. ఆధిపత్య పోరు మరియు అపార్థాలు ఏర్పడే సూచనలు ఉన్నాయి.`;
    } else if (lang === "hi") {
      vashyaDesc = vashyaScore === 2
        ? `उत्कृष्ट वश्य मिलान (${bVashya.labels.hi} - ${gVashya.labels.hi})। आपसी आकर्षण, गहरा मानसिक जुड़ाव और अद्भुत समर्पण रहेगा।`
        : vashyaScore > 0
          ? `मध्यम वश्य अनुकूलता (${bVashya.labels.hi} - ${gVashya.labels.hi})। वैवाहिक सामंजस्य बनाए रखने के लिए आपसी समझदारी की आवश्यकता है।`
          : `वश्य दोष। दोनों पक्षों में वर्चस्व की लड़ाई या विचारों में भारी टकराव की आशंका रहती है।`;
    } else if (lang === "ta") {
      vashyaDesc = vashyaScore === 2
        ? `சிறந்த வசிய பொருத்தம் (${bVashya.labels.ta} - ${gVashya.labels.ta}). இருவருக்கிடையே ஆழ்ந்த ஈர்ப்பும் பரஸ்பர அர்ப்பணிப்பும் இருக்கும்.`
        : vashyaScore > 0
          ? `மிதமான வசிய பொருத்தம் (${bVashya.labels.ta} - ${gVashya.labels.ta}). குடும்ப அமைதிக்காக பரஸ்பர விட்டுக்கொடுத்தல் தேவை.`
          : `வசிய பொருத்தம் இல்லை. இருவரியிலும் ஆதிக்கம் செலுத்தும் குணம் மற்றும் கருத்து வேறுபாடு ஏற்பட வாய்ப்புள்ளது.`;
    } else if (lang === "kn") {
      vashyaDesc = vashyaScore === 2
        ? `ಅತ್ಯುತ್ತಮ ವಶ್ಯ ಹೊಂದಾಣಿಕೆ (${bVashya.labels.kn} - ${gVashya.labels.kn}). ಪರಸ್ಪರ ಆಕರ್ಷಣೆ, ಆಳವಾದ ನಂಬಿಕೆ ಮತ್ತು ಸಮರ್ಪಣಾ ಮನೋಭಾವ ಇರುತ್ತದೆ.`
        : vashyaScore > 0
          ? `ಮಧ್ಯಮ ವಶ್ಯ ಹೊಂದಾಣಿಕೆ (${bVashya.labels.kn} - ${gVashya.labels.kn}). ವೈವಾಹಿಕ ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ಪರಸ್ಪರ ತಿಳುವಳಿಕೆ ಅತ್ಯಗತ್ಯ.`
          : `ವಶ್ಯ ದೋಷ. ಪ್ರಭುತ್ವ ಸಾಧಿಸುವ ಧೋರಣೆ ಮತ್ತು ವೈಚಾರಿಕ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.`;
    } else {
      vashyaDesc = vashyaScore === 2
        ? `Magnificent magnetic attraction (${bVashya.labels.en} - ${gVashya.labels.en}). High natural alignment of sub-conscious mind and mutual devotion.`
        : vashyaScore > 0
          ? `Acceptable Vashya bond (${bVashya.labels.en} - ${gVashya.labels.en}). Steady relationship, requires classic verbal adjustments.`
          : `Vashya mismatch. Wild or sharp insectoid energies can invoke command clashes or verbal friction in the house.`;
    }

    ashtaKoota.push({
      koota: "Vashya",
      localizedKoota: translateKoota("Vashya", lang),
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      description: vashyaDesc
    });

    // 3. Tara (max 3 points)
    const taraDiffCheck = (gNak - bNak + 27) % 9;
    let taraScore = 0;
    if ([1, 2, 4, 6, 8].includes(taraDiffCheck)) {
      taraScore = 3;
    } else if ([3, 5, 7].includes(taraDiffCheck)) {
      taraScore = 1.5;
    }

    const taraCategoriesEN = ["Ati-Mitra (Intimate)", "Janma (Self)", "Sampat (Wealth)", "Vipat (Hurdle)", "Kshema (Well-being)", "Pratyari (Obstacles)", "Sadhaka (Success)", "Vadha (Critical)", "Mitra (Friendly)"];
    const taraCategoriesHI = ["अति-मित्र (परम अनुकूल)", "जन्म (सामान्य)", "संपत (धन प्रदायक)", "विपत (अड़चनें)", "क्षेम (कल्याणकारी)", "प्रत्यरी (कठिनाइयां)", "साधक (पूर्णता)", "वध (सावधानी)", "मित्र (सकारात्मक)"];
    const taraCategoriesTE = ["అతి-మిత్ర (అత్యంత అనుకూల)", "జన్మ (సాధారణం)", "సంపత్ (ఆర్థికం)", "విపత్ (ఆటంకం)", "క్షేమ (శుభకరం)", "ప్రత్యరి (పోరాటం)", "సాధక (విజయం)", "వధ (జాగ్రత్త)", "మిత్ర (స్నేహం)"];
    const taraCategoriesTA = ["அதி-மித்ரா (மிகவும் நெருக்கமான)", "ஜன்ம (சுய)", "சம்பத் (செல்வம்)", "விபத் (தடைகள்)", "க்ஷேம (நலன்)", "பிரத்யரி (எதிர்ப்பு)", "சாதக (வெற்றி)", "வத (தீவிரம்)", "மித்ரா (நட்பு)"];
    const taraCategoriesKN = ["ಅತಿ-ಮಿತ್ರ (ಅತ್ಯಂತ ಸ್ನೇಹ)", "ಜನ್ಮ (ಸ್ವಯಂ)", "ಸಂಪತ್ (ಐಶ್ವರಯ)", "ವಿಪತ್ (ಅಡೆತಡೆ)", "ಕ್ಷೇಮ (ಕಲ್ಯಾಣ)", "ಪ್ರತ್ಯರಿ (ಸವಾಲು)", "ಸಾಧಕ (ಯಶಸ್ಸು)", "ವಧ (ಅಪಾಯ)", "ಮಿತ್ರ (ಸ್ನೇಹ)"];

    const activeCategoryEN = taraCategoriesEN[taraDiffCheck];
    const activeCategoryHI = taraCategoriesHI[taraDiffCheck];
    const activeCategoryTE = taraCategoriesTE[taraDiffCheck];
    const activeCategoryTA = taraCategoriesTA[taraDiffCheck];
    const activeCategoryKN = taraCategoriesKN[taraDiffCheck];

    let taraDesc = "";
    if (lang === "te") {
      taraDesc = taraScore === 3
        ? `ఉత్తమ నక్షత్ర తారా బలం (${activeCategoryTE}). అదృష్టం, రక్షణ మరియు కుటుంబానికి సకల ఐశ్వర్యాలు లభిస్తాయి.`
        : taraScore > 0
          ? `సాధారణ తారా బలం (${activeCategoryTE}). అప్పుడప్పుడు వృత్తిగత ఆటంకాలు వచ్చినప్పటికీ పరిహారాల ద్వారా అధిగమించవచ్చు.`
          : `ప్రతికూల తారా బలం (${activeCategoryTE}). నక్షత్రాల మధ్య ఆరోహణ వ్యతిరేక తరంగాలు ఉన్నాయి; సరైన పరిహారాలు అవసరం.`;
    } else if (lang === "hi") {
      taraDesc = taraScore === 3
        ? `शुभ तारा बल (${activeCategoryHI})। जीवन में आर्थिक समृद्धि, सुरक्षा और सुगम उन्नति प्राप्त होगी।`
        : taraScore > 0
          ? `मध्यम तारा बल (${activeCategoryHI})। समय-समय पर छोटे मोटे उतार-चढ़ाव आ सकते हैं, सामान्य आध्यात्मिक उपायों से शांति मिलेगी।`
          : `कमजोर तारा बल (${activeCategoryHI})। विशेष रूप से नए कार्यों में सावधानी बरतें। हनुमान चालीसा का नियमित पाठ लाभकारी रहेगा।`;
    } else if (lang === "ta") {
      taraDesc = taraScore === 3
        ? `அற்புதமான தாரா பலம் (${activeCategoryTA}). வாழ்வில் அதிர்ஷ்டம், பாதுகாப்பு மற்றும் சிறந்த முன்னேற்றம் கிடைக்கும்.`
        : taraScore > 0
          ? `நடுத்தர தாரா பலம் (${activeCategoryTA}). சிறிய தடைகள் வரலாம், எளிய ஆன்மீக வழிபாடுகள் மூலம் நற்பலன்களைப் பெறலாம்.`
          : `பலவீனமான தாரா பலம் (${activeCategoryTA}). புதிய முயற்சிகளில் கவனம் தேவை, பரிகாரங்கள் செய்து கொள்வது நல்லது.`;
    } else if (lang === "kn") {
      taraDesc = taraScore === 3
        ? `ಉತ್ತಮ ತಾರಾ ಬಲ (${activeCategoryKN}). ಜೀವನದಲ್ಲಿ ಐಶ್ವರರು, ಭದ್ರತೆ ಮತ್ತು ಸುಲಭ ಯಶಸ್ಸನ್ನು ತರುತ್ತದೆ.`
        : taraScore > 0
          ? `ಮಧ್ಯಮ ತಾರಾ ಬಲ (${activeCategoryKN}). ಸಾಂದರ್ಭಿಕ ಏರಿಳಿತಗಳು ಬರಬಹುದು, ಸರಳ ಆಧ್ಯಾತ್ಮಿಕ ಪರಿಹಾರಗಳಿಂದ ಪ್ರಶಾಂತತೆ ಸಿಗಲಿದೆ.`
          : `ದುರ್ಬಲ ತಾರಾ ಬಲ (${activeCategoryKN}). ವೃತ್ತಿ ಅಥವಾ ಕೆಲಸಗಳಲ್ಲಿ ಎಚ್ಚರ ವಹಿಸಿ, ನಿಯಮಿತ ದೇವತಾ ಪ್ರಾರ್ಥನೆ ಅಗತ್ಯವಿದೆ.`;
    } else {
      taraDesc = taraScore === 3
        ? `Auspicious Tarabala (${activeCategoryEN}). Fosters high luck, domestic security, and smooth professional evolution for the couple.`
        : taraScore > 0
          ? `Neutral Tarabala (${activeCategoryEN}). Mild occasional friction in timelines, easily resolved via simple prayer rituals.`
          : `Deficient Tarabala (${activeCategoryEN}). Requires dynamic attention. Star patterns suggest structural communication gaps and energy blockages.`;
    }

    ashtaKoota.push({
      koota: "Tara",
      localizedKoota: translateKoota("Tara", lang),
      maxPoints: 3,
      obtainedPoints: taraScore,
      description: taraDesc
    });

    // 4. Yoni (max 4 points)
    const bYoniIdx = NAKSHATRA_YONIS[bNak];
    const gYoniIdx = NAKSHATRA_YONIS[gNak];
    const bYoni = bYoniIdx;
    const gYoni = gYoniIdx;

    let yoniScore = 2;
    if (bYoniIdx === gYoniIdx) {
      yoniScore = 4;
    } else {
      // Deadly Enemy check
      const isDeadlyRaw = 
        (bYoniIdx === 3 && gYoniIdx === 12) || (bYoniIdx === 12 && gYoniIdx === 3) || // Serpent vs Mongoose
        (bYoniIdx === 7 && gYoniIdx === 9) || (bYoniIdx === 9 && gYoniIdx === 7) || // Cow vs Tiger
        (bYoniIdx === 1 && gYoniIdx === 13) || (bYoniIdx === 13 && gYoniIdx === 1) || // Elephant vs Lion
        (bYoniIdx === 0 && gYoniIdx === 8) || (bYoniIdx === 8 && gYoniIdx === 0) || // Horse vs Buffalo
        (bYoniIdx === 4 && gYoniIdx === 5) || (bYoniIdx === 5 && gYoniIdx === 4) || // Dog vs Cat
        (bYoniIdx === 6 && gYoniIdx === 5) || (bYoniIdx === 5 && gYoniIdx === 6) || // Rat vs Cat
        (bYoniIdx === 2 && gYoniIdx === 11) || (bYoniIdx === 11 && gYoniIdx === 2); // Sheep vs Monkey
      
      if (isDeadlyRaw) {
        yoniScore = 0;
      } else {
        const isFriendlyRaw = 
          (bYoniIdx === 7 && gYoniIdx === 2) || (bYoniIdx === 2 && gYoniIdx === 7) || // Cow & Sheep
          (bYoniIdx === 1 && gYoniIdx === 8) || (bYoniIdx === 8 && gYoniIdx === 1) || // Elephant & Buffalo
          (bYoniIdx === 0 && gYoniIdx === 10) || (bYoniIdx === 10 && gYoniIdx === 0) || // Horse & Hare
          (bYoniIdx === 11 && gYoniIdx === 12) || (bYoniIdx === 12 && gYoniIdx === 11); // Monkey & Mongoose
        if (isFriendlyRaw) {
          yoniScore = 3;
        }
      }
    }

    let yoniDesc = "";
    if (lang === "te") {
      yoniDesc = yoniScore === 4
        ? `అద్భుతమైన ఏక యోని పొంతన (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). శారీరక సాన్నిహిత్యం, దాంపత్య సుఖం అత్యున్నతంగా ఉంటాయి.`
        : yoniScore === 3
          ? `మిత్ర యోని పొంతన (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). ఉత్తమ లైంగిక మరియు శారీరక సామరస్యం లభిస్తుంది.`
          : yoniScore === 2
            ? `సాధారణ యోని పొంతన (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). శారీరకంగాను మరియు మానసికంగాను సమతుల్యమైన సంబంధం ఉంటుంది.`
            : `యోని అత్యంత ప్రతికూలమైనది (మహా శత్రు సమూహం: ${YONI_NAMES.te[bYoniIdx]} vs ${YONI_NAMES.te[gYoniIdx]}). జీవ స్వభావాలు వేరు కావడం వల్ల అసంతృప్తి ఏర్పడే అవకాశం ఉంది.`;
    } else if (lang === "hi") {
      yoniDesc = yoniScore === 4
        ? `परम अनुकूल योनी मिलान (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})। शारीरिक और मानसिक स्तरों पर पूर्ण संतुष्टि एवं सामंजस्य रहेगा।`
        : yoniScore === 3
          ? `मित्र योनी मिलान (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})। उत्तम वैवाहिक सुख और प्रेम भावना विकसित होगी।`
          : yoniScore === 2
            ? `सामान्य योनी अनुकूलता (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})। औसत और सुगम शारीरिक सम्बन्ध बने रहेंगे।`
            : `महारशत्रु योनी टकराव (${YONI_NAMES.hi[bYoniIdx]} बनाम ${YONI_NAMES.hi[gYoniIdx]})। एक दूसरे के प्रति प्राकृतिक वैमनस्यता के कारण घनिष्ठता में बाधा आ सकती है।`;
    } else if (lang === "ta") {
      yoniDesc = yoniScore === 4
        ? `அற்புதமான ஏக யோனி பொருத்தம் (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). சிறந்த உடல் மற்றும் மனரீதியான புரிதலும் தாம்பத்திய சுகமும் கிடைக்கும்.`
        : yoniScore === 3
          ? `நட்பு யோனி பொருத்தம் (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). நல்ல உடலமைப்பு இணக்கமும் திருப்திகரமான இல்லறமும் இருக்கும்.`
          : yoniScore === 2
            ? `சமமான யோனி பொருத்தம் (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). உடல் மற்றும் மன ரீதியாக சமநிலையான உறவு இருக்கும்.`
            : `யோனி பொருத்தம் மிக மோசம் (பகை யோனி: ${YONI_NAMES.ta[bYoniIdx]} மற்றும் ${YONI_NAMES.ta[gYoniIdx]}). உறவில் ஈர்ப்பு குறைந்து கருத்து வேறுபாடுகள் வரலாம்.`;
    } else if (lang === "kn") {
      yoniDesc = yoniScore === 4
        ? `ಉತ್ತಮ ಏಕ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}). ಅತ್ಯಂತ ಉನ್ನತ ಮಟ್ಟದ ದೈಹಿಕ ಸಾಮರಸ್ಯ ಮತ್ತು ವೈವಾಹಿಕ ಸೌಖ್ಯ ಲಭಿಸುತ್ತದೆ.`
        : yoniScore === 3
          ? `ಮಿತ್ರ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}). ಉತ್ತಮ ಲೈಂಗಿಕ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಪ್ರೀತಿ ವೃದ್ಧಿಯಾಗುತ್ತದೆ.`
          : yoniScore === 2
            ? `ಸಾಮಾನ್ಯ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}). ಸಾಮಾನ್ಯ ದೈಹಿಕ ಕಂಫರ್ಟ್ ಇರುತ್ತದೆ.`
            : `ಮಹಾ ಶತ್ರು ಯೋನಿ ಸಂಘರ್ಷ (${YONI_NAMES.kn[bYoniIdx]} ಮತ್ತು ${YONI_NAMES.kn[gYoniIdx]}). ಸಹಜ ವೈಮನಸ್ಯದಿಂದಾಗಿ ಪರಸ್ಪರ ಆಕರ್ಷಣೆ ಕಡಿಮೆಯಾಗುವ ಸಂಭವವಿದೆ.`;
    } else {
      yoniDesc = yoniScore === 4
        ? `Superior Same-Yoni match (${YONI_NAMES.en[bYoniIdx]}). Fosters incredible physical fidelity, biological chemistry, and deep intuitive romance.`
        : yoniScore === 3
          ? `Friendly Yoni match (${YONI_NAMES.en[bYoniIdx]} & ${YONI_NAMES.en[gYoniIdx]}). High rating in reproductive potential and relationship stability.`
          : yoniScore === 2
            ? `Balanced Yoni compatibility (${YONI_NAMES.en[bYoniIdx]} with ${YONI_NAMES.en[gYoniIdx]}). Standard physical comfort with normal domestic expectations.`
            : `Mortal Enemy Yoni conflict (${YONI_NAMES.en[bYoniIdx]} vs ${YONI_NAMES.en[gYoniIdx]}). Prompts high friction, hormonal offsets, and subconscious defensiveness.`;
    }

    ashtaKoota.push({
      koota: "Yoni",
      localizedKoota: translateKoota("Yoni", lang),
      maxPoints: 4,
      obtainedPoints: yoniScore,
      description: yoniDesc
    });

    // 5. Graha Maitri (max 5 points)
    const bLordName = RASHI_LORDS[bRasi];
    const gLordName = RASHI_LORDS[gRasi];

    let maitriScore = 3;
    if (bLordName === gLordName) {
      maitriScore = 5;
    } else {
      const bFriends = LORD_FRIENDS[bLordName as keyof typeof LORD_FRIENDS]?.friends || [];
      const bEnemies = LORD_FRIENDS[bLordName as keyof typeof LORD_FRIENDS]?.enemies || [];
      const gFriends = LORD_FRIENDS[gLordName as keyof typeof LORD_FRIENDS]?.friends || [];
      const gEnemies = LORD_FRIENDS[gLordName as keyof typeof LORD_FRIENDS]?.enemies || [];

      const bToG_friend = bFriends.includes(gLordName);
      const bToG_enemy = bEnemies.includes(gLordName);
      const gToB_friend = gFriends.includes(bLordName);
      const gToB_enemy = gEnemies.includes(bLordName);

      if (bToG_friend && gToB_friend) {
        maitriScore = 5;
      } else if ((bToG_friend && !gToB_enemy) || (gToB_friend && !bToG_enemy)) {
        maitriScore = 4;
      } else if (!bToG_enemy && !gToB_enemy) {
        maitriScore = 3;
      } else if (bToG_enemy && gToB_enemy) {
        maitriScore = 0.5;
      } else {
        maitriScore = 1;
      }
    }

    let maitriDesc = "";
    if (lang === "te") {
      maitriDesc = maitriScore === 5
        ? `అత్యున్నత గ్రహ మైత్రి పొంతన. రాశి అధిపతులు (${bLordName} మరియు ${gLordName}) మిత్రులు. వైవాహిక జీవితంలో తీవ్ర అనుబంధం మరియు పరస్పర సహకారం ఉంటాయి.`
        : maitriScore >= 3
          ? `సగటు గ్రహ మైత్రి పొంతన (${bLordName} & ${gLordName}). భిన్న అభిరుచులు ఉన్నప్పటికీ సరైన సంభాషణ మరియు సయోధ్య ద్వారా సంతోషంగా జీవించవచ్చు.`
          : `గ్రహ మైత్రి దోషం. లార్డ్స్ మధ్య శత్రుత్వం వల్ల అపనమ్మకం లేదా పరస్పర విరుద్ద భావజాలం ఏర్పడే ప్రమాదం ఉంది.`;
    } else if (lang === "hi") {
      maitriDesc = maitriScore === 5
        ? `सर्वोत्तम ग्रह मैत्री मिलान। राशि स्वामी (${bLordName} और ${gLordName}) गहरे मित्र हैं। मानसिक स्तर पर अद्भुत संवाद और विश्वास विकसित होगा।`
        : maitriScore >= 3
          ? `मध्यम ग्रह मैत्री (${bLordName} और ${gLordName})। सामान्य भिन्नताओं के बावजूद समझदारी से गृहस्थी सुखद रूप से चलेगी।`
          : `ग्रह मैत्री दोष। राशि स्वामियों में शत्रुता होने से मतभेद, वैचारिक टकराव तथा मानसिक तनाव की आशंका बनी रहती है।`;
    } else if (lang === "ta") {
      maitriDesc = maitriScore === 5
        ? `உன்னதமான கிரக மைத்திரி பொருத்தம். ராசி அதிபதிகள் (${bLordName} & ${gLordName}) நட்புடன் இருக்கிறார்கள். தம்பதியரிடம் பரஸ்பர மதிப்பும் பிரியமும் நிறைந்திருக்கும்.`
        : maitriScore >= 3
          ? `சுமாரான கிரக மைத்திரி (${bLordName} & ${gLordName}). சில கருத்து வேறுபாடுகள் வரலாம், ஆயினும் புரிந்துணர்வுடன் வாழ முடியும்.`
          : `கிரக மைத்திரி பலவீனம். அதிபதிகளுக்குள் பகை உணர்வு இருப்பதால் அடிக்கடி வாக்குவாதங்களும் மனவருத்தமும் வரலாம்.`;
    } else if (lang === "kn") {
      maitriDesc = maitriScore === 5
        ? `ಅತ್ಯುತ್ತಮ ಗ್ರಹ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ. ರಾಶ್ಯಾಧಿಪತಿಗಳು (${bLordName} ಮತ್ತು ${gLordName}) ಪರಸ್ಪರ ಮಿತ್ರರು. ನಿಮ್ಮ ದಾಂಪತ್ಯ ಜೀವನದಲ್ಲಿ ಆಳವಾದ ಪ್ರೀತಿ ಮತ್ತು ಸಹಯೋಗವಿರುತ್ತದೆ.`
        : maitriScore >= 3
          ? `ಮಧ್ಯಮ ಗ್ರಹ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ (${bLordName} ಹಾಗೂ ${gLordName}). ಅಭಿರುಚಿಗಳಲ್ಲಿ ವಿಭಿನ್ನತೆ ಇದ್ದರೂ ಹೊಂದಾಣಿಕೆಯಿಂದ ಸುಖವಾಗಿರಬಹುದು.`
          : `ಗ್ರಹ ಮೈತ್ರಿ ದೋಷ. ಅಧಿಪತಿಗಳ ವೈರುಧ್ಯದಿಂದಾಗಿ ಅತಿಯಾದ ಜಗಳ, ತಾಳ್ಮೆ ಕೊರತೆ ಮತ್ತು ಕೌಟುಂಬಿಕ ಅಶಾಂತಿ ಸಾಧ್ಯತೆ.`;
    } else {
      maitriDesc = maitriScore === 5
        ? `Superlative Graha Maitri alliance. Sign lords (${bLordName} & ${gLordName}) display high affinity, prompting intuitive communication and absolute mental trust.`
        : maitriScore >= 3
          ? `Standard Graha Maitri bond. Lords (${bLordName} vs ${gLordName}) are neutral or mildly receptive. Smooth compatibility with nominal effort.`
          : `Severe Graha Maitri clash. Strong friction in sign lord polarities. Can elicit defensive mental filters and continuous communication drops.`;
    }

    ashtaKoota.push({
      koota: "Graha Maitri",
      localizedKoota: translateKoota("Graha Maitri", lang),
      maxPoints: 5,
      obtainedPoints: maitriScore,
      description: maitriDesc
    });

    // 6. Gana (max 6 points)
    const bGanaIdx = NAKSHATRA_GANAS[bNak];
    const gGanaIdx = NAKSHATRA_GANAS[gNak];

    let ganaScore = 0;
    if (bGanaIdx === gGanaIdx) {
      ganaScore = 6;
    } else if ((bGanaIdx === 0 && gGanaIdx === 1) || (bGanaIdx === 1 && gGanaIdx === 0)) {
      ganaScore = 5;
    } else if ((bGanaIdx === 0 && gGanaIdx === 2) || (bGanaIdx === 2 && gGanaIdx === 0)) {
      ganaScore = 1;
    } else {
      ganaScore = 0;
    }

    let ganaDesc = "";
    if (lang === "te") {
      ganaDesc = ganaScore === 6
        ? `ఉత్తమ గణ పొంతన (ఇద్దరిదీ: ${G_NAMES.te[bGanaIdx]}). ఇద్దరి ప్రవర్తన, జీవనశైలి మరియు బాధ్యతలపట్ల సమానమైన అవగాహన ఉంటాయి.`
        : ganaScore === 5
          ? `దేవ-మనుష్య సమతుల్యత. ఆధ్యాత్మిక ప్రశాంతత మరియు ప్రాపంచిక కార్యకలాపాల మధ్య మంచి సమన్వయం ఉంటుంది.`
          : `గణ దోషం ఉంది (రాక్షస గణ ప్రభావం). ఆధిపత్య స్వభావం వల్ల అప్పుడప్పుడు అపార్థాలు ఏర్పడవచ్చు; శాంతి పూజలు సిఫార్సు చేయబద్ధాయి.`;
    } else if (lang === "hi") {
      ganaDesc = ganaScore === 6
        ? `उत्कृष्ट गण मेल (${G_NAMES.hi[bGanaIdx]} दोनों)। जीवनशैली, पारिवारिक मूल्यों और सामाजिक जीवन के प्रति दृष्टिकोण में पूर्ण समानता रहेगी।`
        : ganaScore === 5
          ? `देव-मनुष्य शुभ संरेखण। देव स्वभाव की कोमलता मनुष्य स्वभाव के सांसारिक लक्ष्यों को सहजता से पोषित करेगी।`
          : `गण दोष (राक्षस गण प्रभाव)। एक पक्ष के अत्यधिक मुखर या जिद्दी स्वभाव के कारण शांति प्रभावित हो सकती है; शांति पूजा हितकर है।`;
    } else if (lang === "ta") {
      ganaDesc = ganaScore === 6
        ? `சிறந்த கண பொருத்தம் (இருவருக்கும்: ${G_NAMES.ta[bGanaIdx]}). இருவரின் நடத்தை மற்றும் வாழ்க்கை முறையில் நல்ல புரிதல் இருக்கும்.`
        : ganaScore === 5
          ? `தேவ-மனித கணம் இயல்பான பொருத்தம். ஆன்மீக அமைதியும் உலகியல் செயல்பாடுகளும் இணக்கமாய் இருக்கும்.`
          : `கண தோஷம் உள்ளது (ராட்சச கணம்). ஒருவரின் பிடிவாத குணத்தால் கருத்து வேறுபாடுகள் வரலாம்; எளிய பரிகாரம் நன்மை தரும்.`;
    } else if (lang === "kn") {
      ganaDesc = ganaScore === 6
        ? `ಉತ್ತಮ ಗಣ ಹೊಂದಾಣಿಕೆ (ಇಬ್ಬರದ್ದೂ: ${G_NAMES.kn[bGanaIdx]}). ಇಬ್ಬರ ನಡವಳಿಕೆ, ಜೀವನ ಶೈಲಿ ಮತ್ತು ಜವಾಬ್ದಾರಿಗಳ ಬಗ್ಗೆ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ಇರುತ್ತದೆ.`
        : ganaScore === 5
          ? `ದೇವ-ಮನುಷ್ಯ ಸಮತೋಲನ. ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಸನ್ನತೆ ಮತ್ತು ಸಾಂಸಾರಿಕ ಜವಾಬ್ದಾರಿಗಳ ನಡುವೆ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ಇರುತ್ತದೆ.`
          : `ಗಣ ದೋಷವಿದೆ (ರಾಕ್ಷಸ ಗಣದ ಪ್ರಭಾವ). ತೀವ್ರ ಹಠಮಾರಿ ಸ್ವಭಾವದಿಂದ ಪರಸ್ಪರ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಮೂಡಬಹುದು; ದೋಷ ಪರಿಹಾರ ಶಾಂತಿ ಅಗತ್ಯ.`;
    } else {
      ganaDesc = ganaScore === 6
        ? `Identical Gana alignment (${G_NAMES.en[bGanaIdx]}). Outstanding compatibility in public behavior, lifestyle speed, and reaction to stresses.`
        : ganaScore === 5
          ? `Harmonious Deva-Manushya blending. Spiritual calmness guides worldly performance nicely with zero negative sparks.`
          : `Critical Gana imbalance (Rakshasa Gana tension). One of the partners displays extreme stubborn resistance, causing severe fatigue in a softer partner.`;
    }

    ashtaKoota.push({
      koota: "Gana",
      localizedKoota: translateKoota("Gana", lang),
      maxPoints: 6,
      obtainedPoints: ganaScore,
      description: ganaDesc
    });

    // 7. Bhakoot (max 7 points)
    const rasiDiff = (gRasi - bRasi + 12) % 12;
    let bhakootScore = 7;
    if ([2, 5, 6, 8, 12].includes(rasiDiff)) {
      bhakootScore = 0;
    }

    let bhakootDesc = "";
    if (lang === "te") {
      bhakootDesc = bhakootScore === 7
        ? `చాలా శ్రేష్టమైన రాశి పొంతన (మంచి దూరం: ${rasiDiff}). గృహ శాంతి, పరస్పర విశ్వాసపాత్రత, మరియు ఆర్థిక శ్రేయస్సు సిద్ధిస్తాయి.`
        : rasiDiff === 6
          ? `షడాష్టక దోషం (6-8 దూరం). ఆరోగ్య సమస్యలు లేదా ఆకస్మిక అభిప్రాయ భేదాలు సంభవించవచ్చు; శని జపాలు ఉపయోగపడతాయి.`
          : `రాశి స్థానం అసమతుల్యతగా ఉంది (దూరం: ${rasiDiff}). ఆర్థిక కష్టాలు లేదా నిరంతర ఆందోళనల నివారణకై జ్యోతిష్య సలహా అవసరం.`;
    } else if (lang === "hi") {
      bhakootDesc = bhakootScore === 7
        ? `उत्तम भकूट मिलान (अनुकूल दूरी)। भकूट सामंजस्य गृह शांति, पारिवारिक वृद्धि और वित्तीय स्थिरता लाता है।`
        : rasiDiff === 6
          ? `षडाष्टक दोष (6-8 दूरी)। स्वास्थ्य संबंधी अस्वस्थता की चेतावनी और अप्रत्याशित वित्तीय असहयोग की संभावना; विशेष सावधानी की सलाह।`
          : `भकूट दोष (अशुभ दूरी: ${rasiDiff})। खर्चों में वृद्धि और सघन संकेत। महामृत्युंजय मंत्र सहायक सिद्ध होगा।`;
    } else if (lang === "ta") {
      bhakootDesc = bhakootScore === 7
        ? `சிறந்த பக்ஷ கூட்டு பொருத்தம் (இராசிகளுக்கிடையே நல்ல இடைவெளி: ${rasiDiff}). குடும்ப மகிழ்ச்சியும் பொருளாதார முன்னேற்றமும் ஏற்படும்.`
        : rasiDiff === 6
          ? `உறவுகளுக்கிடையே ஷடாஷ்டக தோஷம் உள்ளது (6-8 இடைவெளி). தேவையற்ற அலைச்சல் அல்லது திடீர் கருத்து வேறுபாடு உண்டாகலாம்; எளிய வழிபாடுகள் நலம் தரும்.`
          : `ராசி பொருத்தம் பலவீனமாக உள்ளது (இடைவெளி: ${rasiDiff}). இதனால் பொருளாதாரத் தடைகள் அல்லது மன உளைச்சல்கள் ஏற்பட வாய்ப்புள்ளது.`;
    } else if (lang === "kn") {
      bhakootDesc = bhakootScore === 7
        ? `ಅತ್ಯುತ್ತಮ ರಾಶಿ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ (ಅನುಕೂಲ ಅಂತರ: ${rasiDiff}). ದಾಂಪತ್ಯ ಶಾಂತಿ, ಸಮೃದ್ಧಿ ಹಾಗೂ ಆರ್ಥಿಕ ಯಶಸ್ಸು ಸಿಗಲಿದೆ.`
        : rasiDiff === 6
          ? `ಷಡಾಷ್ಟಕ ದೋಷ ಜಾರಿಯಲ್ಲಿದೆ (6-8 ಅಂತರ). ದೈಹಿಕ ಅಸ್ವಸ್ಥತೆ ಅಥವಾ ಆಕಸ್ಮಿಕ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಮೂಡಬಹುದು; ಜಪ ಅಥವಾ ಸಾತ್ವಿಕ ದಾನ ಅಗತ್ಯ.`
          : `ರಾಶಿ ಹೊಂದಾಣಿಕೆ ಕೊರತೆಯಿದೆ (ಅಶುಭ ಅಂತರ: ${rasiDiff}). ಆರ್ಥಿಕ ნಷ್ಟ ಅಥವಾ ದಾಂಪತ್ಯ ಜೀವನದಲ್ಲಿ ಸಾಮರಸ್ಯ ಕೊರತೆ ಕಾಡಬಹುದು.`;
    } else {
      bhakootDesc = bhakootScore === 7
        ? `Auspicious Bhakoot connection (Auspicious placement of Moon signs). Conveys excellent emotional loyalty, financial growth, and nested joy.`
        : rasiDiff === 6
          ? `Shadashtaka placement (6th & 8th rasi conflict). Prompts high emotional volatility and physical fatigue; astrology guidance suggested.`
          : `Bhakoot variance (Inauspicious relative distance: ${rasiDiff}). Indicates severe financial leakages or heavy domestic expansion stress.`;
    }

    ashtaKoota.push({
      koota: "Bhakoot",
      localizedKoota: translateKoota("Bhakoot", lang),
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      description: bhakootDesc
    });

    // 8. Nadi (max 8 points)
    const bNadiIdx = NAKSHATRA_NADIS[bNak];
    const gNadiIdx = NAKSHATRA_NADIS[gNak];

    let nadiScore = 8;
    if (bNadiIdx === gNadiIdx) {
      nadiScore = 0;
    }

    let nadiDesc = "";
    if (lang === "te") {
      nadiDesc = nadiScore === 8
        ? `అద్భుతమైన నాడీ పొంతన (అబ్బాయి: ${NADI_NAMES.te[bNadiIdx]} - అమ్మాయి: ${NADI_NAMES.te[gNadiIdx]}). జన్యుపరమైన అనుకూలత, ఆరోగ్యకరమైన సంతానం మరియు దీర్ఘాయువు కలుగుతాయి.`
        : `నాడీ దోషం క్రియాశీలంగా ఉంది (ఇద్దరికీ: ${NADI_NAMES.te[bNadiIdx]} నాడి). జన్యు పోలారిటీ ఒకే విధంగా ఉండటం వల్ల సంతానం పొందడంలో జాప్యాలు జరగవచ్చు; మహా మృత్యుంజయ జపం శ్రేష్టం.`;
    } else if (lang === "hi") {
      nadiDesc = nadiScore === 8
        ? `उत्कृष्ट नाड़ी मिलान (वर: ${NADI_NAMES.hi[bNadiIdx]} - वधू: ${NADI_NAMES.hi[gNadiIdx]})। उत्तम स्वास्थ्य, आनुवंशिक अनुकूलता और दीर्घायु संतान का आशीर्वाद।`
        : `नाड़ी दोष सक्रिय (दोनों की नाड़ी ${NADI_NAMES.hi[bNadiIdx]} है)। संतान उत्पत्ति में बाधा अथवा शारीरिक अस्वस्थता की चेतावनी; शिव आराधना आवश्यक है।`;
    } else if (lang === "ta") {
      nadiDesc = nadiScore === 8
        ? `அற்புதமான நாடிப் பொருத்தம் (மணமகன்: ${NADI_NAMES.ta[bNadiIdx]} - மணமகள்: ${NADI_NAMES.ta[gNadiIdx]}). சிறந்த உயிரியல் சமநிலை மற்றும் நல்ல சந்ததிப்பேறு உண்டாகும்.`
        : `நாடி தோஷம் உள்ளது (இருவருக்கும் ${NADI_NAMES.ta[bNadiIdx]} நாடி). இதனால் மகப்பேறு தள்ளிப்போகலாம் அல்லது உடல்நலப் பாதிப்புகள் வரலாம்; சிவ வழிபாடு நலம் தரும்.`;
    } else if (lang === "kn") {
      nadiDesc = nadiScore === 8
        ? `ಅದ್ಭುತ ನಾಡಿ ಹೊಂದಾಣಿಕೆ (ವರ: ${NADI_NAMES.kn[bNadiIdx]} - ವಧು: ${NADI_NAMES.kn[gNadiIdx]}). ಉತ್ತಮ ಆರೋಗ್ಯ, ತಳೀಯ ಸಮಾನತೆ ಹಾಗೂ ದೀರ್ಘಾಯುಷ್ಯ ಹೊಂದಿದ ಸಂತತಿಯ ಭರವಸೆ.`
        : `ನಾಡಿ ದೋಷ ಸಕ್ರಿಯವಾಗಿದೆ (ಇಬ್ಬರ ನಾಡಿಯೂ ${NADI_NAMES.kn[bNadiIdx]} ಆಗಿದೆ). ಸಂತತಿ ಪ್ರಾಪ್ತಿಯಲ್ಲಿ ವಿಳಂಬ ಅಥವಾ ದೈಹಿಕ ತಳಮಳಕ್ಕೆ ಕಾರಣವಾಗಬಹುದು; ಶಾಂತಿ ಪೂಜೆ ಅಗತ್ಯವಿದೆ.`;
    } else {
      nadiDesc = nadiScore === 8
        ? `Superlative Nadi matching (Groom: ${NADI_NAMES.en[bNadiIdx]} and Bride: ${NADI_NAMES.en[gNadiIdx]}). Exceptional biological balance of physical humors (Vata/Pitta/Kapha), guaranteeing healthy progeny and physical vitality.`
        : `Critical Nadi Dosha Active (Both possess ${NADI_NAMES.en[bNadiIdx]} Nadi). Indicates identical genetic polarities. Highly recommended to perform Nadi peace rituals to avoid progeny delay or chronic health issues.`;
    }

    ashtaKoota.push({
      koota: "Nadi",
      localizedKoota: translateKoota("Nadi", lang),
      maxPoints: 8,
      obtainedPoints: nadiScore,
      description: nadiDesc
    });

    // Totals
    const totalMax = ashtaKoota.reduce((acc, current) => acc + current.maxPoints, 0);
    const totalObtained = ashtaKoota.reduce((acc, current) => acc + current.obtainedPoints, 0);
    const percentage = Math.round((totalObtained / totalMax) * 100);

    // South Indian 10 Poruthams (Uttama, Madhyama, Adhama)
    const southIndianPorutham = [
      {
        name: "Dina Porutham",
        localizedName: 
          lang === "te" ? "దిన పరుత్తం" : 
          lang === "hi" ? "दीन पोरुथम" : 
          lang === "ta" ? "தின பொருத்தம்" : 
          lang === "kn" ? "ದಿನ ಹೊಂದಾಣಿಕೆ" : 
          "Dina Porutham",
        status: taraScore >= 1.5 ? "Uttama" : "Adhama",
        description: 
          lang === "te" ? "ఆరోగ్యం మరియు ఆయుర్దాయ సూచికలు" : 
          lang === "hi" ? "स्वास्थ्य और दीर्घायु संकेतक" : 
          lang === "ta" ? "உடல் ஆரோக்கியம் மற்றும் ஆயுள் காலம் குறிக்கும்" : 
          lang === "kn" ? "ಆರೋಗ್ಯ ಮತ್ತು ದೀರ್ಘಾಯುಷ್ಯದ ಸೂಚನೆಗಳು" : 
          "Health and longevity indicators"
      },
      {
        name: "Gana Porutham",
        localizedName: 
          lang === "te" ? "గణ పరుత్తం" : 
          lang === "hi" ? "गण पोरुथम" : 
          lang === "ta" ? "கண பொருத்தம்" : 
          lang === "kn" ? "ಗಣ ಹೊಂದಾಣಿಕೆ" : 
          "Gana Porutham",
        status: ganaScore >= 5 ? "Uttama" : "Adhama",
        description: 
          lang === "te" ? "తరంగదైర్ఘ్యం మరియు జీవనశైలి స్వభావాలు" : 
          lang === "hi" ? "तरंगदैर्ध्य और जीवन शैली स्वभाव" : 
          lang === "ta" ? "மன அலைவரிசை மற்றும் வாழ்க்கை முறை குணாதிசயங்கள்" : 
          lang === "kn" ? "ಜೀವನ ಶೈಲಿ ಮತ್ತು ನಡವಳಿಕೆ ಹೊಂದಾಣಿಕೆ" : 
          "Wavelength and lifestyle temperaments"
      },
      {
        name: "Mahendra Porutham",
        localizedName: 
          lang === "te" ? "మహేంద్ర పరుత్తం" : 
          lang === "hi" ? "महेंद्र पोरुथम" : 
          lang === "ta" ? "மகேந்திர பொருத்தம்" : 
          lang === "kn" ? "ಮಹೇಂದ್ರ ಹೊಂದಾಣಿಕೆ" : 
          "Mahendra Porutham",
        status: (gNak - bNak) % 4 === 0 ? "Uttama" : "Madhyama",
        description: 
          lang === "te" ? "సంతానం, పిల్లలు మరియు శ్రేయస్సు" : 
          lang === "hi" ? "संतति, संतान और कल्याण" : 
          lang === "ta" ? "வம்சவிருத்தி மற்றும் குடும்ப சுபிட்சம்" : 
          lang === "kn" ? "ಸಂತಾನ ವೃದ್ಧಿ ಮತ್ತು ಸುಖ-ಸಂಪತ್ತು" : 
          "Progeny, children and well-being"
      },
      {
        name: "Rajju Porutham",
        localizedName: 
          lang === "te" ? "రజ్జు పరుత్తం" : 
          lang === "hi" ? "రజ్జూ పోరుథం" : 
          lang === "ta" ? "ரஜு பொருத்தம்" : 
          lang === "kn" ? "ರಜ್ಜು ಹೊಂದಾಣಿಕೆ" : 
          "Rajju Porutham",
        status: bYoni !== gYoni ? "Uttama" : "Adhama",
        description: 
          lang === "te" ? "భర్త ఆయుర్దాయ సూచిక" : 
          lang === "hi" ? "पति दीर्घायु सूचकांक" : 
          lang === "ta" ? "கணவனின் ஆயுள் காரகம் மற்றும் பாதுகாப்பு" : 
          lang === "kn" ? "ವರನ ಆಯುಷ್ಯ ಮತ್ತು ಮಂಗಲ भाग्य" : 
          "Husband longevity index"
      },
      {
        name: "Vedha Porutham",
        localizedName: 
          lang === "te" ? "వేధ పరుత్తం" : 
          lang === "hi" ? "వేధ పోరుథం" : 
          lang === "ta" ? "வேதை பொருத்தம்" : 
          lang === "kn" ? "ವೇಧ ಹೊಂದಾಣಿಕೆ" : 
          "Vedha Porutham",
        status: bNak !== gNak ? "Uttama" : "Adhama",
        description: 
          lang === "te" ? "వివాదాల నుండి రక్షణ" : 
          lang === "hi" ? "विवादों से सुरक्षा" : 
          lang === "ta" ? "வழக்குகள் மற்றும் துன்பங்களிலிருந்து பாதுகாப்பு" : 
          lang === "kn" ? "ಜಗಳ, ಕಷ್ಟಗಳಿಂದ ದೊರೆಯುವ ಪರಿಹಾರ ಮತ್ತು ರಕ್ಷಣೆ" : 
          "Protection from dynamic disputes"
      },
      {
        name: "Yoni Porutham",
        localizedName: 
          lang === "te" ? "యోని పరుత్తం" : 
          lang === "hi" ? "योनि పోరుథం" : 
          lang === "ta" ? "யோனி பொருத்தம்" : 
          lang === "kn" ? "ಯೋನಿ ಹೊಂದಾಣಿಕೆ" : 
          "Yoni Porutham",
        status: yoniScore >= 2 ? "Uttama" : "Madhyama",
        description: 
          lang === "te" ? "శారీరక సామరస్య అనుకూలత" : 
          lang === "hi" ? "शारीरिक सामंजस्य अनुकूलता" : 
          lang === "ta" ? "தாம்பத்திய சுகம் மற்றும் உடலமைப்பு பொருத்தம்" : 
          lang === "kn" ? "ಶಾರೀರಿಕ ಸಾಮರಸ್ಯ ಮತ್ತು ದಾಂಪತ್ಯ ಜೀವನ" : 
          "Physical harmony compatibility"
      }
    ];

    // Dosha matching
    const bJd = getJulianDate(boyInput.year, boyInput.month, boyInput.day, boyInput.hour, boyInput.minute, boyInput.timezone || 0);
    const bAyanamsa = getAyanamsa(bJd, boyInput.ayanamsa || "Lahiri");
    const bLagnaLong = getLagnaSidereal(bJd, boyInput.latitude, boyInput.longitude, bAyanamsa);
    const boyDoshas = AstrologyService.detectDoshas(boyPanchang.planets, bLagnaLong, lang);

    const gJd = getJulianDate(girlInput.year, girlInput.month, girlInput.day, girlInput.hour, girlInput.minute, girlInput.timezone || 0);
    const gAyanamsa = getAyanamsa(gJd, girlInput.ayanamsa || "Lahiri");
    const gLagnaLong = getLagnaSidereal(gJd, girlInput.latitude, girlInput.longitude, gAyanamsa);
    const girlDoshas = AstrologyService.detectDoshas(girlPanchang.planets, gLagnaLong, lang);

    const bManglik = boyDoshas.find(d => d.name.includes("Manglik") || d.name.includes("మాంగళిక") || d.name.includes("मांगलिक") || d.name.includes("செவ்வாய்") || d.name.includes("ಮಂಗಳ"))?.hasDosha || false;
    const gManglik = girlDoshas.find(d => d.name.includes("Manglik") || d.name.includes("మాంగళిక") || d.name.includes("मांगलिक") || d.name.includes("செவ்வாய்") || d.name.includes("ಮಂಗಳ"))?.hasDosha || false;

    let hasManglikDoshaConflict = false;
    let isCancelled = false;
    if (bManglik && !gManglik) hasManglikDoshaConflict = true;
    if (!bManglik && gManglik) hasManglikDoshaConflict = true;
    if (bManglik && gManglik) {
      isCancelled = true; // Both manglik cancels the dosha!
    }

    let childrenScoreStr = "";
    if (lang === "te") {
      childrenScoreStr = nadiScore > 0 ? "అద్భుతం (గర్భధారణ శుభం)" : "పరిహారాలు అవసరం (ఏక నాడి)";
    } else if (lang === "hi") {
      childrenScoreStr = nadiScore > 0 ? "उत्कृष्ट (गर्भधारण शुभ)" : "उपचार की आवश्यकता है (एक नाड़ी)";
    } else if (lang === "ta") {
      childrenScoreStr = nadiScore > 0 ? "அற்புதம் (வாரிசு சுபிட்சம்)" : "பரிகாரங்கள் தேவை (ஏக நாடி)";
    } else if (lang === "kn") {
      childrenScoreStr = nadiScore > 0 ? "ಅತ್ಯುನ್ನತ (ಗರ್ಭಧಾರಣೆಗೆ ಪ್ರಶಸ್ತ)" : "ಪರಿಹಾರ ಅಗತ್ಯವಿದೆ (ಏಕ ನಾಡಿ)";
    } else {
      childrenScoreStr = nadiScore > 0 ? "Excellent (Progeny Auspicious)" : "Requires Remedies (Same Nadi)";
    }

    let healthScoreStr = "";
    if (lang === "te") {
      healthScoreStr = yoniScore >= 2 ? "మంచి శారీరక పొంతన" : "సాధారణ సమన్వయం";
    } else if (lang === "hi") {
      healthScoreStr = yoniScore >= 2 ? "अच्छा शारीरिक मिलान" : "सामान्य समन्वय";
    } else if (lang === "ta") {
      healthScoreStr = yoniScore >= 2 ? "சிறந்த உடல் இணக்கம்" : "மிதமான இணக்கம்";
    } else if (lang === "kn") {
      healthScoreStr = yoniScore >= 2 ? "ಉತ್ತಮ ದೈಹಿಕ ಸಾಮರಸ್ಯ" : "ಸಾಧಾರಣ ಸಮನ್ವಯ";
    } else {
      healthScoreStr = yoniScore >= 2 ? "Good Physical Match" : "Moderate Harmony";
    }

    let financeScoreStr = "";
    if (lang === "te") {
      financeScoreStr = varnaScore > 0 ? "స్థిరమైన ఆర్థిక వృద్ధి" : "సాధారణ తరంగదైర్ఘ్య వృద్ధి";
    } else if (lang === "hi") {
      financeScoreStr = varnaScore > 0 ? "स्थिर आर्थिक विकास" : "सामान्य तरंगदैर्ध्य वृद्धि";
    } else if (lang === "ta") {
      financeScoreStr = varnaScore > 0 ? "நிலையான பொருளாதார வளர்ச்சி" : "மிதமான மனவளர்ச்சி";
    } else if (lang === "kn") {
      financeScoreStr = varnaScore > 0 ? "ಸ್ಥಿರ ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿ" : "ಸಾಧಾರಣ ಅಭ್ಯುದಯ";
    } else {
      financeScoreStr = varnaScore > 0 ? "Stable Financial Growth" : "Moderate Wavelength Growth";
    }

    let longevityScoreStr = "";
    if (lang === "te") {
      longevityScoreStr = taraScore >= 2 ? "దీర్ఘాయుష్షు కలయిక" : "సాధారణ ఆయుర్దాయ సూచిక";
    } else if (lang === "hi") {
      longevityScoreStr = taraScore >= 2 ? "दीर्घायु जीवन मिलान" : "सामान्य दीर्घायु सूचकांक";
    } else if (lang === "ta") {
      longevityScoreStr = taraScore >= 2 ? "தீர்க்காயுசு தரும் இல்லறம்" : "சாதாரண ஆயுட்காலம்";
    } else if (lang === "kn") {
      longevityScoreStr = taraScore >= 2 ? "ದೀರ್ಘಾಯುಷ್ಯ ಕಾರಕ ಮಂಗಲ ಪ್ರದ" : "ಸಾಧಾರಣ ಆಯುಷ್ಯ ಹೊಂದಾಣಿಕೆ";
    } else {
      longevityScoreStr = taraScore >= 2 ? "Long Living Life Match" : "Standard Longevity Index";
    }

    let cancellationDetailsStr = undefined;
    if (isCancelled) {
      if (lang === "te") {
        cancellationDetailsStr = "అబ్బాయి మరియు అమ్మాయి ఇద్దరికీ మంగళ దోషం ఉన్నందున, ఇది సహజంగా రద్దు చేయబడుతుంది.";
      } else if (lang === "hi") {
        cancellationDetailsStr = "लड़का और लड़की दोनों को मांगलिक दोष होने के कारण स्वाभाविक रूप से निरस्त हो जाता है।";
      } else if (lang === "ta") {
        cancellationDetailsStr = "மணமகன் மற்றும் மணமகள் இருவருக்குமே செவ்வாய் தோஷம் இருப்பதால், அது கணித ரீதியாக தானாகவே நிவர்த்தியாகிவிடுகிறது.";
      } else if (lang === "kn") {
        cancellationDetailsStr = "ವರ ಮತ್ತು ವಧು ಇಬ್ಬರಿಗೂ ಮಂಗಳ ದೋಷವಿರುವುದರಿಂದ, ಇದು ಗಣಿತೀಯವಾಗಿ ಸ್ವನಿಯಂತ್ರಿತವಾಗಿ ನಿವಾರಣೆಯಾಗುತ್ತದೆ.";
      } else {
        cancellationDetailsStr = "Both boy and girl have Kuja/Manglik Dosha, leading to natural mathematical cancellation.";
      }
    }

    let reportStr = "";
    if (lang === "te") {
      reportStr = `వేద కుండలి మ్యాచింగ్ పూర్తయింది. 36 పాయింట్‌లకు గాను ${totalObtained} పొందారు. మొత్తం పొంతన శాతం ${percentage}%. ${totalObtained >= 18 ? "వివాహం అనుకూలమైనది మరియు సిఫార్సు చేయబడింది." : "తక్కువ మ్యాచింగ్ పాయింట్ల కారణంగా జాగ్రత్తగా నివారణలు మరియు జ్యోతిష్యుడిని సంప్రదించడం అవసరం."}`;
    } else if (lang === "hi") {
      reportStr = `वैदिक कुंडली मिलान पूरा हो गया है। 36 में से ${totalObtained} अंक प्राप्त हुए। कुल मिलान दर ${percentage}% है। ${totalObtained >= 18 ? "विवाह अनुकूल है और अनुशंसित है।" : "कम मिलान अंकों के कारण सावधानीपूर्वक उपचार और ज्योतिषी से परामर्श की आवश्यकता है।"}`;
    } else if (lang === "ta") {
      reportStr = `வேத ஜாதக பொருத்தம் காண்கிறது. 36க்கு ${totalObtained} புள்ளிகள் கிடைத்துள்ளது. மொத்தப் பொருத்தம் ${percentage}%. ${totalObtained >= 18 ? "மணவாழ்க்கை மிகவும் உகந்தது மற்றும் பரிந்துரைக்கப்படுகிறது." : "குறைவான புள்ளிகள் என்பதால் முறையான பரிகாரம் மற்றும் ஜோதிட ஆலோசனை அவசியம்."}`;
    } else if (lang === "kn") {
      reportStr = `ವೇದ ಕುಂಡಲಿ ಹೊಂದಾಣಿಕೆ ಪೂರ್ಣಗೊಂಡಿದೆ. 36ಕ್ಕೆ ${totalObtained} ಅಂಕಗಳು ಬಂದಿವೆ. ಒಟ್ಟು ಹೊಂದಾಣಿಕೆ ದರ ${percentage}%. ${totalObtained >= 18 ? "ವಿವಾಹಕ್ಕೆ ಅತ್ಯಂತ ಯೋಗ್ಯವಾಗಿದೆ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ." : "ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ ಅಂಕಗಳಿರುವ ಕಾರಣ ಸೂಕ್ತ ಆಧ್ಯಾತ್ಮಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯರ ಸಲಹೆ ಅಗತ್ಯವಿದೆ."}`;
    } else {
      reportStr = `Vedic kundali matching has been completed. Obtained ${totalObtained} out of 36 points. Overall match rate is ${percentage}%. ${totalObtained >= 18 ? "Marriage is compatible and recommended." : "Requires careful remediation and astrologer consulting due to low matching points."}`;
    }

    return {
      ashtaKoota,
      southIndianPorutham: southIndianPorutham as any,
      overallPercentage: percentage,
      marriageScore: totalObtained,
      compatibilityScore: percentage,
      childrenScore: childrenScoreStr,
      healthScore: healthScoreStr,
      financeScore: financeScoreStr,
      longevityScore: longevityScoreStr,
      doshaMatching: {
        boyDoshas: boyDoshas.filter(d => d.hasDosha).map(d => d.name),
        girlDoshas: girlDoshas.filter(d => d.hasDosha).map(d => d.name),
        hasManglikDoshaConflict,
        isCancelled,
        cancellationDetails: cancellationDetailsStr
      },
      report: reportStr
    };
  }

  // Numerology Calculator
  public static getNumerology(name: string, dobInput: { year: number; month: number; day: number }, moonLong: number, lang: LanguageCode = "en"): NumerologyResponse {
    // 1. Life Path Number (reduced sum of DOB)
    const reduceNum = (num: number): number => {
      let str = num.toString();
      while (str.length > 1) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) sum += parseInt(str[i]);
        str = sum.toString();
      }
      return parseInt(str);
    };

    const lifePath = reduceNum(dobInput.year + dobInput.month + dobInput.day);

    // 2. Chaldian / Pythagorean Destiny number based on name
    let nameSum = 0;
    const alphabetMap: Record<string, number> = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };

    const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, "");
    for (let i = 0; i < cleanedName.length; i++) {
      nameSum += alphabetMap[cleanedName[i]] || 0;
    }
    const destiny = reduceNum(nameSum) || 5; // default 5 if name is empty
    const soulUrge = reduceNum(cleanedName.length * 2 + 1);

    // Astro name based on Nakshatra syllable
    const nakIdx = Math.floor(moonLong / (360.0 / 27.0));
    const syllables = NAKSHATRA_SYLLABLES[nakIdx] || ["Om"];

    const rasiIdx = Math.floor(moonLong / 30.0);
    const rasiName = translateRashi(rasiIdx, lang);

    // Suggest baby names starting with those syllables
    const matchingBabyNames = BABY_NAMES_SEED.filter(b => 
      syllables.some(syll => b.name.startsWith(syll) || b.start === syll)
    );

    const formatBabyNames = (list: typeof BABY_NAMES_SEED) => 
      list.map(b => ({
        name: b.name,
        meaning: translateBabyNameMeaning(b.meaning, lang),
        gender: b.gender as "M" | "F" | "U"
      }));

    return {
      lifePath,
      destiny,
      soulUrge,
      personality: reduceNum(lifePath + destiny),
      luckyNumbers: [lifePath, destiny, 9, 3],
      luckyColors: ["Golden Yellow", "Royal Blue", "Saffron Red"].map(c => translateColor(c, lang)),
      luckyGem: translateGemstone(lifePath === 1 ? "Ruby" : lifePath === 3 ? "Yellow Sapphire" : "Diamond", lang),
      nameAstrology: {
        birthRasi: rasiName,
        suggestedSyllables: syllables,
        babyNames: matchingBabyNames.length > 0 ? formatBabyNames(matchingBabyNames) : formatBabyNames(BABY_NAMES_SEED.slice(0, 4))
      }
    };
  }
}

// Utility conversion and maths guard methods
function latitudeToRad(lat: number): number {
  return (lat * Math.PI) / 180.0;
}

function tRemToDeg(rem: number): number {
  return parseFloat((rem * 30.0).toFixed(4));
}
