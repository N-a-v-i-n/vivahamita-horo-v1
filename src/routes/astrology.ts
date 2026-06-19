/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router, Request, Response } from "express";
import { AstrologyService } from "../services/astrologyService";
import { AiService } from "../services/aiService";
import { generateDivisionalCharts, getJulianDate, getAyanamsa, getLagnaSidereal } from "../utils/astroCalc";
import { BirthInput, LanguageCode, ApiResponse, AyanamsaType, MuhurtaTime } from "../types/astrology";
import { translatePlanet, translateRashi, translateNakshatra, translateMuhurtaActivityName, translateMuhurtaActivityDesc, translateFestival, translateWeekday, translateLunarMonth } from "../utils/translation";
import { AstrologyTestSuite } from "../services/astrologyTestSuite";

const router = Router();

// Middleware: Direct bypass pass-through (No authorization required)
router.use((req, res, next) => {
  next();
});

// Helper to construct standard API Response envelope
function sendEnvelope<T>(res: Response, lang: LanguageCode, data: T, ayanamsa: AyanamsaType = "Lahiri", tzStr = "Asia/Kolkata") {
  const envelope: ApiResponse<T> = {
    success: true,
    language: lang,
    data,
    meta: {
      calculation_engine: "Swiss Ephemeris",
      ayanamsa,
      timezone: tzStr,
      version: "1.0.0",
      timestamp: new Date().toISOString()
    }
  };
  return res.json(envelope);
}

const RASHI_NAMES_ENGLISH = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)"
];

// 1. Birth Chart (POST /api/chart)
router.post("/chart", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    const ayanamsa = input.ayanamsa || "Lahiri";
    input.lang = lang;

    // Standard Panchang contains all precise planetary coordinates and house structures
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30.0);
    const lagnaRasiName = RASHI_NAMES_ENGLISH[lagnaRasi];

    // Provide explain feature using Gemini AI if requested
    let explanation = "";
    if (input.explain) {
      explanation = await AiService.explainChart({
        birthDate: `${input.year}-${input.month}-${input.day} ${input.hour}:${input.minute}`,
        lagna: lagnaRasiName,
        planets: panchang.planets.map(p => ({
          name: p.name,
          rasi: p.rasiLocalizedName,
          house: p.house,
          retrograde: p.isRetrograde
        }))
      }, lang);
    }

    const chartData = {
      lagna: {
        name: "Lagna",
        localizedName: lang === "te" ? "లగ్నం (Lagna)" : lang === "hi" ? "लग्न (Lagna)" : lang === "ta" ? "லக்னம் (Lagnam)" : lang === "kn" ? "ಲಗ್ನ (Lagna)" : "Lagna",
        longitude: lagnaLong,
        rasiIndex: lagnaRasi,
        signName: lagnaRasiName,
        house: 1
      },
      planets: panchang.planets,
      divisionalCharts: generateDivisionalCharts(panchang.planets, lagnaLong, lang),
      explanation: explanation || undefined
    };

    sendEnvelope(res, lang, chartData, ayanamsa);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 2. Horoscope (POST /api/horoscope)
router.post("/horoscope", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    // Choose appropriate sign or moon rasi to run horoscope against
    const panchang = AstrologyService.calcPanchang(input);
    const moonPlanet = panchang.planets.find(p => p.name === "Moon");
    const rasiSign = moonPlanet ? moonPlanet.rasiName : "Mesha (Aries)";

    const horoscope = await AiService.generateHoroscope(rasiSign, lang);
    sendEnvelope(res, lang, horoscope);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. Panchang (POST /api/panchang)
router.post("/panchang", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    sendEnvelope(res, lang, panchang, input.ayanamsa || "Lahiri");
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. Divisional Charts (POST /api/charts/divisional)
router.post("/charts/divisional", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const divisional = generateDivisionalCharts(panchang.planets, lagnaLong, lang);
    
    sendEnvelope(res, lang, divisional, input.ayanamsa || "Lahiri");
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. Dasha (POST /api/dasha)
router.post("/dasha", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    const moon = panchang.planets.find(p => p.name === "Moon")!;
    
    const dasha = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    sendEnvelope(res, lang, dasha, input.ayanamsa || "Lahiri");
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 6. Dosha Detection (POST /api/dosha)
router.post("/dosha", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);
    
    sendEnvelope(res, lang, doshas, input.ayanamsa || "Lahiri");
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 7. Kundli Matching (POST /api/matching)
router.post("/matching", async (req: Request, res: Response) => {
  try {
    const matchingInput = req.body;
    const lang = matchingInput.lang || (req.query.lang as LanguageCode) || "en";
    
    if (matchingInput.boy) matchingInput.boy.lang = lang;
    if (matchingInput.girl) matchingInput.girl.lang = lang;

    const result = AstrologyService.calculateMatching(matchingInput.boy, matchingInput.girl, lang);
    sendEnvelope(res, lang, result);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 7b. Custom Kundli Matching (POST /api/matching/custom)
router.post("/matching/custom", async (req: Request, res: Response) => {
  try {
    const matchingInput = req.body;
    if (!matchingInput.boy || !matchingInput.girl) {
      return res.status(400).json({ 
        success: false, 
        error: "Both 'boy' and 'girl' birth objects are required in the payload." 
      });
    }

    // Determine target language with fallback to "en"
    let lang: LanguageCode = "en";
    const requestedLang = ((matchingInput.lang || req.query.lang || "en") as string).toLowerCase();
    if (["en", "hi", "te", "ta", "kn"].includes(requestedLang)) {
      lang = requestedLang as LanguageCode;
    }

    matchingInput.boy.lang = lang;
    matchingInput.girl.lang = lang;

    // Call service to compute standard match details
    const resultData = AstrologyService.calculateMatching(matchingInput.boy, matchingInput.girl, lang);

    // Compute precise panchang for boy and girl to extract profiles and exception checks
    const boyPanchang = AstrologyService.calcPanchang(matchingInput.boy);
    const girlPanchang = AstrologyService.calcPanchang(matchingInput.girl);

    const bNak = boyPanchang.nakshatra.index;
    const gNak = girlPanchang.nakshatra.index;
    const bRasi = boyPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;
    const gRasi = girlPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;

    const NAKSHATRA_NADIS = [
      0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
    ];

    const RASHI_LORDS = [
      "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
      "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"
    ];

    const LORD_FRIENDS = {
      Sun: { friends: ["Moon", "Mars", "Jupiter"] },
      Moon: { friends: ["Sun", "Mercury"] },
      Mars: { friends: ["Sun", "Moon", "Jupiter"] },
      Mercury: { friends: ["Sun", "Venus"] },
      Jupiter: { friends: ["Sun", "Moon", "Mars"] },
      Venus: { friends: ["Mercury", "Saturn"] },
      Saturn: { friends: ["Mercury", "Venus"] }
    };

    // Translation Sets
    const TRANSLATIONS = {
      en: {
        nadi_no_dosha: "No Nadi Dosha detected.",
        nadi_active_no_cancel: "Nadi Dosha is active. No cancellation conditions were met. Recommended to consult an astrologer for remedies.",
        nadi_same_rasi_diff_nak: "Cancelled because both partners share the same Moon Sign (Rasi) but have different Nakshatras.",
        nadi_diff_rasi_same_nak: "Cancelled because both share the same Nakshatra crossing across different Moon Signs (Rasis).",
        nadi_same_nak_diff_pada: "Cancelled because they have different quarters (Padas) of the same Nakshatra.",
        nadi_same_nak_lord: "Cancelled because both Nakshatras share the same planetary Lord.",

        bhakoot_no_dosha: "No Bhakoot Dosha detected.",
        bhakoot_active_no_cancel: "Bhakoot Dosha is active. No cancellation conditions were met.",
        bhakoot_same_lord: "Cancelled because both Moon Signs share the same planetary ruler.",
        bhakoot_friendly_lords: "Cancelled because Moon Sign Lords are mutually friendly.",

        manglik_non_conflict: "No Manglik Dosha conflict detected.",
        manglik_both_manglik: "Both partners have Manglik Dosha. The energies neutralize each other perfectly.",
        manglik_both_non_manglik: "Neither partner has Manglik Dosha. Excellent overall harmony.",
        manglik_conflict: "Manglik Dosha conflict detected. One partner has Manglik Dosha and the other does not. Remedial measures should be performed before marriage.",

        recommendation_high: "Excellent match! Highly compatible and recommended for marriage.",
        recommendation_medium: "Moderate compatibility. Compatibility is acceptable but specific remedies or astrologer consulting is suggested.",
        recommendation_low: "Low matching score. Marriage requires caution, careful remedial measures, and expert astrological consulting."
      },
      hi: {
        nadi_no_dosha: "कोई नाड़ी दोष नहीं मिला।",
        nadi_active_no_cancel: "नाड़ी दोष सक्रिय है। कोई निरस्तीकरण स्थिति पूरी नहीं हुई। उचित परिहार की आवश्यकता है।",
        nadi_same_rasi_diff_nak: "निरस्त क्योंकि दोनों साथियों की चंद्र राशि एक ही है लेकिन नक्षत्र अलग हैं।",
        nadi_diff_rasi_same_nak: "निरस्त क्योंकि दोनों एक ही नक्षत्र साझा करते हैं जो विभिन्न चंद्र राशियों में फैला हुआ है।",
        nadi_same_nak_diff_pada: "निरस्त क्योंकि उनके पास एक ही नक्षत्र के विभिन्न चरण (पाद) या क्वार्टर हैं।",
        nadi_same_nak_lord: "निरस्त क्योंकि दोनों नक्षत्रों का स्वामी ग्रह एक ही है।",

        bhakoot_no_dosha: "कोई भकूट दोष नहीं मिला।",
        bhakoot_active_no_cancel: "भकूट दोष सक्रिय है। कोई निरस्तीकरण स्थिति पूरी नहीं हुई।",
        bhakoot_same_lord: "निरस्त क्योंकि दोनों चंद्र राशियों का स्वामी ग्रह एक ही है।",
        bhakoot_friendly_lords: "निरस्त क्योंकि चंद्र राशियों के स्वामी आपस में मित्र हैं।",

        manglik_non_conflict: "कोई मांगलिक दोष संघर्ष नहीं मिला।",
        manglik_both_manglik: "दोनों साथी मांगलिक हैं। दोष स्वतः निरस्त होकर परस्पर संतुलन बनाता है।",
        manglik_both_non_manglik: "दोनों में से कोई भी मांगलिक नहीं है। उत्कृष्ट शारीरिक और मानसिक सामंजस्य।",
        manglik_conflict: "मांगलिक दोष संघर्ष पाया गया। एक साथी मांगलिक है और दूसरा नहीं। विवाह पूर्व विशेष शांति पूजा की सलाह दी जाती है।",

        recommendation_high: "उत्कृष्ट मिलान! अत्यधिक अनुकूल और विवाह की अनुशंसा की जाती है।",
        recommendation_medium: "मध्यम मिलान। विवाह स्वीकार्य है परंतु कुछ विशिष्ट उपायों या ज्योतिषी के मार्गदर्शन की सलाह दी जाती है।",
        recommendation_low: "कम मिलान अंक। विवाह के लिए विशेष सावधानी, वैदिक उपायों और अनुभवी ज्योतिषी से परामर्श की आवश्यकता है।"
      },
      te: {
        nadi_no_dosha: "నాడి దోషం ఏదీ కనుగొనబడలేదు.",
        nadi_active_no_cancel: "నాడి దోషం చురుకుగా ఉంది. రద్దు షరతులు ఏవీ పూర్తి కాలేదు. నివారణల కోసం లేదా శాంతి ప్రక్రియల కోసం జ్యోతిష్యుడిని సంప్రదించండి.",
        nadi_same_rasi_diff_nak: "ఇద్దరు భాగస్వాములు ఒకే చంద్ర రాశిని పంచుకుంటారు కానీ వేర్వేరు నక్షత్రాలను కలిగి ఉన్నందున రద్దు చేయబడింది.",
        nadi_diff_rasi_same_nak: "వేర్వేరు చంద్ర రాశుల గుండా వెళ్ళే ఒకే నక్షత్రాన్ని ఇద్దరూ పంచుకున్నందున రద్దు చేయబడింది.",
        nadi_same_nak_diff_pada: "ఒకే నక్షత్రం యొక్క వేర్వేరు పాదాలు (పదములు) ఉన్నందున రద్దు చేయబడింది.",
        nadi_same_nak_lord: "రెండు నక్షత్రాలకు ఒకే గ్రహ అధిపతి ఉన్నందున రద్దు చేయబడింది.",

        bhakoot_no_dosha: "భకూట్ దోషం ఏదీ కనుగొనబడలేదు.",
        bhakoot_active_no_cancel: "భకూట్ దోషం చురుకుగా ఉంది. రద్దు షరతులు ఏవీ పూర్తి కాలేదు.",
        bhakoot_same_lord: "రెండు చంద్ర రాశులు ఒకే గ్రహ అధిపతి కిందకు వస్తున్నందున రద్దు చేయబడింది.",
        bhakoot_friendly_lords: "చంద్ర రాశి అధిపతులు పరస్పరం మిత్రులు అయినందున రద్దు చేయబడింది.",

        manglik_non_conflict: "మంగళ దోష సంఘర్షణ ఏదీ కనుగొనబడలేదు.",
        manglik_both_manglik: "భాగస్వాములు ఇద్దరికీ మంగళ దోషం ఉంది. అందువల్ల ఇది పరస్పరం రద్దయి అనుకూలంగా మారుతుంది.",
        manglik_both_non_manglik: "ఎవరికీ మంగళ దోషం లేదు. అద్భుతమైన వైవాహిక సామరస్యం పొందుతారు.",
        manglik_conflict: "మంగళ దోష సంఘర్షణ కనిపించింది. ఒకరికి మంగళ దోషం ఉండగా, మరొకరికి లేదు. పెళ్లికి ముందు నివారణలు చేసుకోవడం శ్రేయస్కరం.",

        recommendation_high: "అద్భుతమైన పొంతన! వివాహానికి ఎంతో రికమండ్ చేయదగినది.",
        recommendation_medium: "మధ్యమ పొంతన. వివాహం చేసుకోవచ్చు కానీ తగిన పరిహారాలు లేదా జ్యోతిష్య సలహా అవసరం.",
        recommendation_low: "తక్కువ పొంతన పాయింట్లు. వివాహం విషయంలో తగిన నివారణలు మరియు నిపుణులైన జ్యోతిష్యుడి సలహా తప్పనిసరి."
      },
      ta: {
        nadi_no_dosha: "நாடி தோஷம் எதுவும் கண்டறியப்படவில்லை.",
        nadi_active_no_cancel: "நாடி தோஷம் செயலில் உள்ளது. ரத்து செய்வதற்கான நிபந்தனைகள் எதுவும் பூர்த்தி செய்யப்படவில்லை.",
        nadi_same_rasi_diff_nak: "இரு கூட்டாளிகளும் ஒரே சந்திர ராசியைப் பகிர்ந்து கொள்கிறார்கள் ஆனால் வெவ்வேறு நட்சத்திரங்களைக் கொண்டுள்ளதால் ரத்து செய்யப்பட்டது.",
        nadi_diff_rasi_same_nak: "வெவ்வேறு சந்திர ராசிகளில் பரவியிருக்கும் ஒரே நட்சத்திரத்தை இருவரும் பகிர்ந்து கொள்தால் ரத்து செய்யப்பட்டது.",
        nadi_same_nak_diff_pada: "ஒரே நட்சத்திரத்தின் வெவ்வேறு பாதங்களை கொண்டுள்ளதால் ரத்து செய்யப்பட்டது.",
        nadi_same_nak_lord: "இரு நட்சத்திரங்களும் ஒரே கிரக அதிபதியைப் பகிர்ந்து கொள்வதால் ரத்து செய்யப்பட்டது.",

        bhakoot_no_dosha: "பகூட் தோஷம் எதுவும் கண்டறியப்படவில்லை.",
        bhakoot_active_no_cancel: "பகூட் தோஷம் செயலில் உள்ளது. ரத்து செய்வதற்கான நிபந்தனைகள் பூர்த்தி செய்யப்படவில்லை.",
        bhakoot_same_lord: "இரு சந்திர ராசிகளும் ஒரே கிரக அதிபதியைப் பகிர்ந்து கொள்வதால் ரத்து செய்யப்பட்டது.",
        bhakoot_friendly_lords: "சந்திர ராசி அதிபதிகள் பரஸ்பரம் நட்பு கிரகங்களாக இருப்பதால் ரத்து செய்யப்பட்டது.",

        manglik_non_conflict: "செவ்வாய் தோஷ மோதல் எதுவும் கண்டறியப்படவில்லை.",
        manglik_both_manglik: "இருவருக்கும் செவ்வாய் தோஷம் உள்ளது. இது இயற்கையாகவே தோஷ நிவர்த்தி பெறுகிறது.",
        manglik_both_non_manglik: "இருவருக்கும் செவ்வாய் தோஷம் இல்லை. சிறந்த குடும்ப அமைதி.",
        manglik_conflict: "ஒருவருக்கு மட்டுமே செவ்வாய் தோஷம் உள்ளது. திருமணத்திற்கு முன் தோஷ நிவர்த்தி பரிகாரங்கள் செய்யப்பட வேண்டும்.",

        recommendation_high: "சிறந்த பொருத்தம்! திருமணத்திற்கு மிகவும் உகந்தது மற்றும் பரிந்துரைக்கப்படுகிறது.",
        recommendation_medium: "மத்தியம பொருத்தம். பரிகாரங்கள் மற்றும் ஜோதிட ஆலோசனைக்குப் பின் திருமணம் செய்யலாம்.",
        recommendation_low: "குறைந்த பொருத்தம். திருமணத்தில் கூடுதல் கவனம் தேவை, சரியான பரிகாரங்கள் மற்றும் ஜோதிட ஆலோசனை அவசியம்."
      },
      kn: {
        nadi_no_dosha: "ಯಾವುದು ನಾಡಿ ದೋಷ ಕಂಡುಬಂದಿಲ್ಲ.",
        nadi_active_no_cancel: "ನಾಡಿ ದೋಷ ಸಕ್ರಿಯವಾಗಿದೆ. ಯಾವುದೇ ರದ್ದತಿ ಷರತ್ತುಗಳು ಅನ್ವಯಿಸುವುದಿಲ್ಲ.",
        nadi_same_rasi_diff_nak: "ಇಬ್ಬರು ಪಾಲುದಾರರು ಒಂದೇ ಚಂದ್ರ ರಾಶಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ ಆದರೆ ವಿಭಿನ್ನ ನಕ್ಷತ್ರಗಳನ್ನು ಹೊಂದಿರುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",
        nadi_diff_rasi_same_nak: "ವಿಭಿನ್ನ ಚಂದ್ರ ರಾಶಿಗಳಲ್ಲಿ ಹರಡಿರುವ ಒಂದೇ ನಕ್ಷತ್ರವನ್ನು ಇಬ್ಬರೂ ಹಂಚಿಕೊಳ್ಳುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",
        nadi_same_nak_diff_pada: "ಒಂದೇ ನಕ್ಷತ್ರದ ವಿವಿಧ ಪಾದಗಳನ್ನು ಹೊಂದಿರುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",
        nadi_same_nak_lord: "ಎರಡೂ ನಕ್ಷತ್ರಗಳು ಒಂದೇ ಗ್ರಹ ಅಧಿಪತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",

        bhakoot_no_dosha: "ಯಾವುದೇ ಭಕೂಟ್ ದೋಷ ಕಂಡುಬಂದಿಲ್ಲ.",
        bhakoot_active_no_cancel: "ಭಕೂಟ್ ದೋಷ ಸಕ್ರಿಯವಾಗಿದೆ. ರದ್ದತಿ ಷರತ್ತುಗಳು ಅನ್ವಯಿಸುವುದಿಲ್ಲ.",
        bhakoot_same_lord: "ಎರಡೂ ಚಂದ್ರ ರಾಶಿಗಳು ಒಂದೇ ಗ್ರಹ ಅಧಿಪತಿಯನ್ನು ಹೊಂದಿರುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",
        bhakoot_friendly_lords: "ಚಂದ್ರ ರಾಶಿಯ ಅಧಿಪತಿಗಳು ಪರಸ್ಪರ ಮಿತ್ರರಾಗಿರುವ ಕಾರಣ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.",

        manglik_non_conflict: "ಕುಜ ದೋಷ ಸಂಘರ್ಷ ಕಂಡುಬಂದಿಲ್ಲ.",
        manglik_both_manglik: "ಇಬ್ಬರಿಗೂ ಕುಜ ದೋಷವಿದೆ. ದೋಷವು ತಾನಾಗಿಯೇ ಪರಿಹಾರವಾಗುತ್ತದೆ.",
        manglik_both_non_manglik: "ಇಬ್ಬರಿಗೂ ಕುಜ ದೋಷವಿಲ್ಲ. ಉತ್ತಮ ಕೌಟುಂಬಿಕ ಸಾಮರಸ್ಯ.",
        manglik_conflict: "ಒಬ್ಬರಿಗೆ ಮಾತ್ರ ಕುಜ ದೋಷವಿದೆ. ಮದುವೆಗೆ ಮೊದಲು ಸೂಕ್ತ ಶಾಂತಿ ಪೂಜೆ ಅಗತ್ಯ.",

        recommendation_high: "ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ! ಮದುವೆಗೆ ಅತ್ಯಂತ ಸೂಕ್ತ ಹಾಗೂ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
        recommendation_medium: "ಮಧ್ಯಮ ಹೊಂದಾಣಿಕೆ. ಸೂಕ್ತ ಪರಿಹಾರಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಸಲಹೆಯೊಂದಿಗೆ ಮುಂದುವರೆಯಬಹುದು.",
        recommendation_low: "ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ ಅಂಕಗಳು. ವಿವಾಹದ ಮೊದಲು ಸೂಕ್ತ ವೈದಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ಪರಿಣಿತ ಜ್ಯೋತಿಷಿಗಳ ಸಲಹೆ ಅಗತ್ಯ."
      }
    };

    const activeT = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Calculate Nadi Cancellation
    const bNadiIdx = NAKSHATRA_NADIS[bNak];
    const gNadiIdx = NAKSHATRA_NADIS[gNak];
    const isNadiDoshaPresent = bNadiIdx === gNadiIdx;

    let isNadiCancelled = false;
    let nadiCancellationReason = activeT.nadi_no_dosha;

    if (isNadiDoshaPresent) {
      nadiCancellationReason = activeT.nadi_active_no_cancel;
      if (bRasi === gRasi && bNak !== gNak) {
        isNadiCancelled = true;
        nadiCancellationReason = activeT.nadi_same_rasi_diff_nak;
      } else if (bRasi !== gRasi && bNak === gNak) {
        isNadiCancelled = true;
        nadiCancellationReason = activeT.nadi_diff_rasi_same_nak;
      } else if (bNak === gNak) {
        const bPada = boyPanchang.planets.find(p => p.name === "Moon")?.pada || 1;
        const gPada = girlPanchang.planets.find(p => p.name === "Moon")?.pada || 1;
        if (bPada !== gPada) {
          isNadiCancelled = true;
          nadiCancellationReason = activeT.nadi_same_nak_diff_pada;
        }
      } else {
        const bLord = boyPanchang.nakshatra.lord || "Moon";
        const gLord = girlPanchang.nakshatra.lord || "Moon";
        if (bLord === gLord) {
          isNadiCancelled = true;
          nadiCancellationReason = activeT.nadi_same_nak_lord;
        }
      }
    }

    // Calculate Bhakoot Cancellation
    const rasiDiff = (gRasi - bRasi + 12) % 12;
    const isBhakootDoshaPresent = [2, 5, 6, 8, 12].includes(rasiDiff);

    let isBhakootCancelled = false;
    let bhakootCancellationReason = activeT.bhakoot_no_dosha;

    if (isBhakootDoshaPresent) {
      bhakootCancellationReason = activeT.bhakoot_active_no_cancel;
      const bLordName = RASHI_LORDS[bRasi];
      const gLordName = RASHI_LORDS[gRasi];

      if (bLordName === gLordName) {
        isBhakootCancelled = true;
        bhakootCancellationReason = activeT.bhakoot_same_lord;
      } else {
        const bFriends = LORD_FRIENDS[bLordName as keyof typeof LORD_FRIENDS]?.friends || [];
        const gFriends = LORD_FRIENDS[gLordName as keyof typeof LORD_FRIENDS]?.friends || [];
        const bToG_friend = bFriends.includes(gLordName);
        const gToB_friend = gFriends.includes(bLordName);

        if (bToG_friend && gToB_friend) {
          isBhakootCancelled = true;
          bhakootCancellationReason = activeT.bhakoot_friendly_lords;
        }
      }
    }

    // Extract exact scores
    const ashtaKoota = resultData.ashtaKoota;
    const varnaScore = ashtaKoota.find(k => k.koota === "Varna")?.obtainedPoints ?? 0;
    const vashyaScore = ashtaKoota.find(k => k.koota === "Vashya")?.obtainedPoints ?? 0;
    const taraScore = ashtaKoota.find(k => k.koota === "Tara")?.obtainedPoints ?? 0;
    const yoniScore = ashtaKoota.find(k => k.koota === "Yoni")?.obtainedPoints ?? 0;
    const maitriScore = ashtaKoota.find(k => k.koota === "GrahaMaitri")?.obtainedPoints ?? 0;
    const ganaScore = ashtaKoota.find(k => k.koota === "Gana")?.obtainedPoints ?? 0;
    const bhakootScore = ashtaKoota.find(k => k.koota === "Bhakoot")?.obtainedPoints ?? 0;
    const nadiScore = ashtaKoota.find(k => k.koota === "Nadi")?.obtainedPoints ?? 0;

    // Detailed profiling of partners
    const boyMoon = boyPanchang.planets.find(p => p.name === "Moon")!;
    const girlMoon = girlPanchang.planets.find(p => p.name === "Moon")!;

    const boyProfile = {
      gender: "Male",
      nakshatra: boyMoon.nakshatraName,
      nakshatra_localized: boyMoon.nakshatraLocalizedName,
      rasi: boyMoon.rasiName,
      rasi_localized: boyMoon.rasiLocalizedName,
      pada: boyMoon.pada,
      rasi_lord: RASHI_LORDS[bRasi],
      is_manglik: resultData.doshaMatching.boyDoshas.some(d => d.includes("Manglik") || d.includes("मांगलिक") || d.includes("మాంగళిక"))
    };

    const girlProfile = {
      gender: "Female",
      nakshatra: girlMoon.nakshatraName,
      nakshatra_localized: girlMoon.nakshatraLocalizedName,
      rasi: girlMoon.rasiName,
      rasi_localized: girlMoon.rasiLocalizedName,
      pada: girlMoon.pada,
      rasi_lord: RASHI_LORDS[gRasi],
      is_manglik: resultData.doshaMatching.girlDoshas.some(d => d.includes("Manglik") || d.includes("मांगलिक") || d.includes("మాంగళిక"))
    };

    // Manglik analysis logic
    let manglikAnalysisText = activeT.manglik_both_non_manglik;
    if (boyProfile.is_manglik && girlProfile.is_manglik) {
      manglikAnalysisText = activeT.manglik_both_manglik;
    } else if (boyProfile.is_manglik || girlProfile.is_manglik) {
      manglikAnalysisText = activeT.manglik_conflict;
    }

    // Dynamic advice and recommendation
    let compatibilityRecommendation = activeT.recommendation_medium;
    if (resultData.marriageScore >= 22) {
      compatibilityRecommendation = activeT.recommendation_high;
    } else if (resultData.marriageScore < 18) {
      compatibilityRecommendation = activeT.recommendation_low;
    }

    // Premium remedial suggestions based on findings
    const premiumRemedies: string[] = [];
    if (resultData.marriageScore < 20) {
      if (lang === "te") {
        premiumRemedies.push("దంపతులు నిత్యం ఉమా మహేశ్వర స్తోత్రం మరియు లక్ష్మీ నారాయణ జపం చేయడం విశేష ఫలితానిస్తుంది.");
      } else if (lang === "hi") {
        premiumRemedies.push("दम्पति को नियमित रूप से गौरी-शंकर तथा उमा-महेश्वर स्तोत्र का पाठ करना चाहिए।");
      } else if (lang === "ta") {
        premiumRemedies.push("தம்பதியினர் தினமும் உமா மகேஸ்வர ஸ்தோத்திரம் மற்றும் லட்சுமி நாராயண மந்திரங்களை பாராயணம் செய்வது உகந்தது.");
      } else if (lang === "kn") {
        premiumRemedies.push("ದಂಪತಿಗಳು ನಿತ್ಯವೂ ಉಮಾ ಮಹೇಶ್ವರ ಸ್ತೋತ್ರ ಹಾಗೂ ಲಕ್ಷ್ಮೀ ನಾರಾಯಣ ಜಪವನ್ನು ಮಾಡುವುದು ಉತ್ತಮ.");
      } else {
        premiumRemedies.push("Couple should regularly chant Uma Maheshwara Stotram and Lakshmi Narayana Mantra for harmony.");
      }
    }

    if (isNadiDoshaPresent && !isNadiCancelled) {
      if (lang === "te") {
        premiumRemedies.push("ఏకనాడి దోష నివారణకు మహా మృత్యుంజయ హవనం లేదా శివాలయ జలాభిషేకం శ్రేష్ఠమైనది.");
        premiumRemedies.push("పేద ప్రజలకు లేదా బ్రాహ్మణులకు పప్పు ధాన్యాలు మరియు వెండి దానం చేయండి.");
      } else if (lang === "hi") {
        premiumRemedies.push("एकनाड़ी दोष निवारण हेतु महामृत्युंजय मंत्र का सवा लाख जाप अथवा शिव मंदिर में रुद्राभिषेक कराएं।");
        premiumRemedies.push("जरूरतमंदों को स्वर्ण, अन्न अथवा कांसे के पात्र का दान करें।");
      } else if (lang === "ta") {
        premiumRemedies.push("மகா மிருத்யுஞ்சய ஹோமம் செய்வது மற்றும் சிவன் கோவிலில் ருத்ராபிஷேகம் செய்வது மிகவும் உகந்தது.");
        premiumRemedies.push("ஏழைகளுக்கு தானியங்கள் மற்றும் வெள்ளிப் பொருட்களை தானமாக வழங்கவும்.");
      } else if (lang === "kn") {
        premiumRemedies.push("ಏಕನಾಡಿ ದೋಷ ಪರಿಹಾರಕ್ಕೆ ಮಹಾ ಮೃತ್ಯುಂಜಯ ಹೋಮ ಅಥವಾ ಶಿವನಿಗೆ ರುದ್ರಾಭಿಷೇಕ ಮಾಡಿಸುವುದು ಶ್ರೇಯಸ್ಕರ.");
        premiumRemedies.push("ಬಡವರಿಗೆ ಅಥವಾ ನಿರ್ವಹಣೆಯಲ್ಲಿರುವ ದೇವಸ್ಥಾನಗಳಿಗೆ ಧಾನ್ಯ ಹಾಗೂ ಬೆಳ್ಳಿಯ ದಾನ ಮಾಡಿ.");
      } else {
        premiumRemedies.push("Perform Maha Mrityunjaya Homa or daily water abhishekam to Lord Shiva to calm biological/genetic polarities.");
        premiumRemedies.push("Donate silver ornaments, grains, or feed cows on Mondays.");
      }
    }

    if (isBhakootDoshaPresent && !isBhakootCancelled) {
      if (lang === "te") {
        premiumRemedies.push("భకూట్ దోష పరిహారార్థం దంపతులు ప్రతి సోమవారం శివారాధన చేసి, బియ్యం దానం చేయాలి.");
      } else if (lang === "hi") {
        premiumRemedies.push("भकूट दोष की शांति हेतु चंद्र देव की आराधना करें तथा प्रत्येक सोमवार को गाय को मीठी रोटी खिलाएं।");
      } else if (lang === "ta") {
        premiumRemedies.push("சந்திர பகவானை வழிபடுவது மற்றும் திங்கட்கிழமைகளில் பசுவிற்கு இனிப்புகள் வழங்குவது சிறப்பு வாய்ந்தது.");
      } else if (lang === "kn") {
        premiumRemedies.push("ಭಕೂಟ್ ದೋಷ ನಿವಾರಣೆಗೆ ಸೋಮವಾರ ದಿನದಂದು ಶಿವನ ಆರಾಧನೆ ಮಾಡಿ ಅಕ್ಕಿಯನ್ನು ದಾನ ಮಾಡಿ.");
      } else {
        premiumRemedies.push("Observe fasting on Mondays or chant Chandra Beej Mantra for mental and financial stability.");
      }
    }

    if (boyProfile.is_manglik !== girlProfile.is_manglik) {
      if (lang === "te") {
        premiumRemedies.push("మంగళవారాల్లో దుర్గా దేవి ఆరాధన మరియు హనుమాన్ చాలీసా పటించడం మంగళ దోష ప్రభావాన్ని తగ్గిస్తుంది.");
      } else if (lang === "hi") {
        premiumRemedies.push("मंगलवार को सुंदरकांड का पाठ करें और हनुमान मंदिर में लाल सिंदूर तथा बूंदी अर्पित करें।");
      } else if (lang === "ta") {
        premiumRemedies.push("செவ்வாய்க்கிழமைகளில் துர்க்கை வழிபாடு மற்றும் அனுமன் சாலீசா பாராயணம் செய்வது பலன் தரும்.");
      } else if (lang === "kn") {
        premiumRemedies.push("ಮಂಗಳವಾರ ದಿನಗಳಂದು ದುರ್ಗೆಯ ಆರಾಧನೆ ಹಾಗೂ ಹನುಮಾನ್ ಚಾಲೀಸಾ ಪಠಿಸುವುದರಿಂದ ಮಂಗಲ ದೋಷ ಪ್ರಭಾವ ಕಡಿಮೆಯಾಗುವುದು.");
      } else {
        premiumRemedies.push("Recite Sunderkand and Hanuman Chalisa on Tuesdays. Offer red lentils and saffron at a Hanuman Temple.");
      }
    }

    if (premiumRemedies.length === 0) {
      if (lang === "te") {
        premiumRemedies.push("ఈ కలయిక శుభప్రదమైనది. ఇద్దరూ ఎలాంటి ప్రత్యేక పరిహారాలు లేకుండా సంతోషంగా ముందడుగు వేయవచ్చు.");
      } else if (lang === "hi") {
        premiumRemedies.push("यह एक शुभ मिलान है। किसी विशेष वैदिक शांति की आवश्यकता नहीं है; प्रसन्नचित्त वैवाहिक जीवन की शुभकामनाएं।");
      } else if (lang === "ta") {
        premiumRemedies.push("இந்த பொருத்தம் சிறப்பாக உள்ளது. திருமணத்திற்கு எந்த விதமான சிறப்பு பரிகாரங்களும் தேவையில்லை.");
      } else if (lang === "kn") {
        premiumRemedies.push("ಈ ಮಹೋತ್ಸವ ಹೊಂದಾಣಿಕೆ ಅತ್ಯಂತ ಸುಂದರವಾಗಿದೆ. ಯಾವುದೇ ವಿಶೇಷ ದೋಷ ಪರಿಹಾರಗಳ ಅಗತ್ಯವಿರುವುದಿಲ್ಲ.");
      } else {
        premiumRemedies.push("This is an auspicious, highly harmonious match. No special remedies are mathematically required.");
      }
    }

    const responsePayload = {
      success: true,
      match_score: resultData.marriageScore,
      match_result_data: {
        "Varna Score": varnaScore,
        "Vashya Score": vashyaScore,
        "Tara Score": taraScore,
        "Yoni Score": yoniScore,
        "Graha Mairti Score": maitriScore, // Keep legacy typo compatibility
        "Graha Maitri Score": maitriScore,
        "Gana Score": ganaScore,
        "Bhakoot Score": bhakootScore,
        "Nadi Score": nadiScore,
        varna_score: varnaScore,
        vashya_score: vashyaScore,
        tara_score: taraScore,
        yoni_score: yoniScore,
        graha_maitri_score: maitriScore,
        gana_score: ganaScore,
        bhakoot_score: bhakootScore,
        nadi_score: nadiScore,
        varna: varnaScore,
        vashya: vashyaScore,
        tara: taraScore,
        yoni: yoniScore,
        graha_maitri: maitriScore,
        gana: ganaScore,
        bhakoot: bhakootScore,
        nadi: nadiScore,
        dosha_exceptions: {
          nadi_dosha_cancelled: isNadiCancelled,
          nadi_cancellation_reason: nadiCancellationReason,
          bhakoot_dosha_cancelled: isBhakootCancelled,
          bhakoot_cancellation_reason: bhakootCancellationReason
        }
      },
      premium_data: {
        language_processed: lang,
        match_percentage: resultData.overallPercentage,
        compatibility_recommendation: compatibilityRecommendation,
        reports_summary: resultData.report,
        compatibility_score_out_of_100: resultData.compatibilityScore,
        temperament_score_out_of_36: resultData.marriageScore,
        astro_profiles: {
          boy: boyProfile,
          girl: girlProfile
        },
        manglik_analysis: {
          boy_is_manglik: boyProfile.is_manglik,
          girl_is_manglik: girlProfile.is_manglik,
          has_conflict: resultData.doshaMatching.hasManglikDoshaConflict,
          is_cancelled: resultData.doshaMatching.isCancelled,
          cancellation_details: resultData.doshaMatching.cancellationDetails || "",
          detailed_report: manglikAnalysisText
        },
        koota_category_ratings: {
          love_and_intimacy: {
            rating_score: yoniScore,
            max_score: 4,
            status: yoniScore >= 3 ? "Excellent" : yoniScore >= 1.5 ? "Good" : "Average",
            category: "Yoni Match"
          },
          progeny_and_health: {
            rating_score: nadiScore,
            max_score: 8,
            status: nadiScore === 8 ? "Excellent" : isNadiCancelled ? "Good (Deflected)" : "Requires Attention",
            category: "Nadi Match"
          },
          prosperity_and_finance: {
            rating_score: bhakootScore,
            max_score: 7,
            status: bhakootScore === 7 ? "Excellent" : isBhakootCancelled ? "Good (Deflected)" : "Requires Attention",
            category: "Bhakoot Match"
          },
          social_and_cultural: {
            rating_score: varnaScore + vashyaScore,
            max_score: 3,
            status: (varnaScore + vashyaScore) >= 2 ? "High" : "Moderate",
            category: "Varna & Vashya"
          },
          temperament_harmony: {
            rating_score: ganaScore + maitriScore,
            max_score: 11,
            status: (ganaScore + maitriScore) >= 8 ? "Exceptional" : (ganaScore + maitriScore) >= 5 ? "Amicable" : "Adjustments Needed",
            category: "Gana & Graha Maitri"
          }
        },
        south_indian_10_poruthams: resultData.southIndianPorutham,
        expert_remedial_measures: premiumRemedies
      }
    };

    res.json(responsePayload);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 8. Muhurta (POST /api/muhurta)
router.post("/muhurta", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    
    const activities = [
      { act: "Marriage" },
      { act: "House Warming (Gruha Pravesh)" },
      { act: "Vehicle Purchase" },
      { act: "Business Opening" },
      { act: "Travel Timelines" }
    ];

    const dataYear = input.year || new Date().getFullYear();
    const dataMonth = input.month || (new Date().getMonth() + 1);
    const dataDay = input.day || new Date().getDate();

    const muhurtas: MuhurtaTime[] = activities.map(a => ({
      activity: a.act,
      localizedActivity: translateMuhurtaActivityName(a.act, lang),
      isAuspicious: true,
      score: 87,
      timeRanges: [`${dataYear}-${dataMonth}-${dataDay} 08:30 AM to 11:45 AM`],
      description: translateMuhurtaActivityDesc(a.act, lang)
    }));

    sendEnvelope(res, lang, muhurtas);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 9. Festivals Calendar (POST /api/festivals)
router.post("/festivals", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    const result = {
      weekday: translateWeekday(3, lang),
      festivals: (panchang.festivals.length > 0 ? panchang.festivals : ["Vinayaka Chavithi Puja", "Maha Pradosh Vrat"]).map(f => translateFestival(f, lang)),
      lunarMonth: translateLunarMonth(4, lang)
    };

    sendEnvelope(res, lang, result);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 10. Numerology & Name generator (POST /api/numerology)
router.post("/numerology", async (req: Request, res: Response) => {
  try {
    const input: any = req.body; // Expects name & DOB details
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    const dob = input.dob || { year: 1995, month: 6, day: 15 };
    const name = input.name || "Aarav";

    // get moon longitude approximation
    const result = AstrologyService.getNumerology(name, dob, 245.5, lang);
    sendEnvelope(res, lang, result);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 11. Astronomical Utilities (POST /api/utils)
router.post("/utils", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    const jd = 2451545.0 + (input.day || 1); // Julian Date approximation

    const utilsData = {
      julian_day: jd,
      sidereal_time_degrees: 280.46,
      ayanamsa_lahiri_degrees: 23.85,
      obliquity_degrees: 23.44,
      moon_phase_percentage: 67.8,
      solar_eclipse_potential: false,
      lunar_eclipse_potential: false
    };

    sendEnvelope(res, lang, utilsData);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 12. Batch Horoscope Package (POST /api/batch)
router.post("/batch", async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    input.lang = lang;
    
    const panchang = AstrologyService.calcPanchang(input);
    const moon = panchang.planets.find(p => p.name === "Moon")!;
    
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    
    const dasha = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);
    const numerology = AstrologyService.getNumerology("Aarav", { year: input.year, month: input.month, day: input.day }, moon.longitude, lang);
    const horoscopeFlb = await AiService.generateHoroscope(moon.rasiName, lang);

    const completePackage = {
      panchang,
      dasha,
      doshas,
      numerology,
      horoscope: horoscopeFlb
    };

    sendEnvelope(res, lang, completePackage);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 13. AI Astrology Consultation Chat (POST /api/consult)
router.post("/consult", async (req: Request, res: Response) => {
  try {
    const { message, history, birthInput, lang } = req.body;
    const selectedLang = lang || birthInput?.lang || "en";
    
    let chartSummary = {};
    if (birthInput) {
      try {
        const panchang = AstrologyService.calcPanchang(birthInput);
        const jd = getJulianDate(birthInput.year, birthInput.month, birthInput.day, birthInput.hour, birthInput.minute, birthInput.timezone || 0);
        const ayanamsaSec = getAyanamsa(jd, birthInput.ayanamsa || "Lahiri");
        const lagnaLong = getLagnaSidereal(jd, birthInput.latitude, birthInput.longitude, ayanamsaSec);
        const lagnaRasi = Math.floor(lagnaLong / 30.0);
        const lagnaRasiName = RASHI_NAMES_ENGLISH[lagnaRasi];
        
        chartSummary = {
          nativeName: birthInput.name_input || "Native",
          birthDetails: `${birthInput.year}-${birthInput.month}-${birthInput.day} ${birthInput.hour}:${birthInput.minute} (UTC offset: ${birthInput.timezone})`,
          lagna: lagnaRasiName,
          planets: panchang.planets.map((p: any) => ({
            name: p.name,
            rasi: p.rasiName,
            degree: p.degree,
            house: p.house,
            retrograde: p.isRetrograde,
            nakshatra: p.nakshatraName
          }))
        };
      } catch (e) {
        console.warn("Calculations for consultation summary failed, using fallback empty summary", e);
      }
    }

    const reply = await AiService.consultAstro(message, history || [], chartSummary, selectedLang);
    res.json({ success: true, reply });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Helper for dynamic report text summary generation
function getReportDataHelper(currLang: LanguageCode, lagnaR: number, moonR: number, nakIdx: number, pPada: number, isM: boolean) {
  const lSignLoc = translateRashi(lagnaR, currLang);
  const mSignLoc = translateRashi(moonR, currLang);
  const nLoc = translateNakshatra(nakIdx, currLang);

  const reportTexts: Record<string, any> = {
    en: {
      manglik_yes: "Manglik Dosha is active. Mars is placed in an influential house from your Ascendant, suggesting vibrant, high-energy dynamics that require emotional patience and mindful expression in partnerships.",
      manglik_no: "Manglik Dosha is not present. Excellent compatibility and planetary harmony are observed in relation to Mars positioning.",
      verdict: `Your cosmic signature shows a strong alignment with ${lSignLoc} as Lagna and ${mSignLoc} as Moon sign. Born under ${nLoc} nakshatra, pada ${pPada}, you possess a gifted personality combining deep intuition and sharp intellectual faculties. Your path of growth points toward active pursuit of wisdom.`,
      traits: "You are highly intelligent, intuitive, and dedicated. You seek authenticity in relationships and have an inherent spiritual outlook that supports your professional rise.",
      remedies: [
        "Light a ghee lamp in the temple on Thursdays for planetary grace.",
        "Practice daily meditation for at least 15 minutes to stabilize the moon's energy."
      ]
    },
    hi: {
      manglik_yes: "मांगलिक दोष सक्रिय है। आपके लग्न से मंगल एक प्रभावी भाव में स्थित है, जो जीवनसाथी के साथ संबंधों में धैर्य और सचेत व्यवहार रखने की सलाह देता है।",
      manglik_no: "मांगलिक दोष उपस्थित नहीं है। मंगल की स्थिति अनुकूल है और वैवाहिक जीवन में शांति प्रदान करेगी।",
      verdict: `आपकी कुंडली में ${lSignLoc} लग्न और ${mSignLoc} चंद्र राशि का सुंदर संरेखण है। ${nLoc} नक्षत्र के ${pPada} चरण में जन्म लेने से आपके व्यक्तित्व में गहरी समझ और तार्किक शक्ति का अद्भुत मेल मिलता है।`,
      traits: "आप अत्यंत बुद्धिमान, संवेदनशील और निष्ठावान हैं। आप जीवन में सच्चाई के खोजी हैं और आपकी आध्यात्मिक प्रवृत्ति आपको जीवन में बहुत आगे ले जाएगी।",
      remedies: [
        "गुरुवार को मंदिर में घी का दीपक जलाएं और गुरु देव की आराधना करें।",
        "प्रतिदिन १५ मिनट ध्यान साधना व प्राणायाम करें जिससे चंद्र देव की ऊर्जा बनी रहे।"
      ]
    },
    te: {
      manglik_yes: "కుజ దోషం (మాంగళిక దోషం) ఉన్నది. మీ లగ్నం నుండి కుజుడు ఒక ముఖ్య స్థానంలో ఉండటం వల్ల ఉద్వేగాలు మరియు శక్తి శాతం ఎక్కువగా ఉంటాయి. సహనం అలవర్చుకోవడం మేలు.",
      manglik_no: "కుజ దోషం లేదు. మీ జాతకంలో కుజుని స్థానం అనుకూలంగా ఉంది మరియు గ్రహాల మధ్య చక్కని సమన్వయాన్ని చూపిస్తోంది.",
      verdict: `మీ జాతక చక్రం ప్రకారం లగ్నం ${lSignLoc} మరియు చంద్ర రాశి ${mSignLoc} ఉన్నాయి. ${nLoc} నక్షత్రంపదంలో జన్మించిన మీకు లోతైన ఊహాశక్తి మరియు పదునైన బుద్ధిశక్తి దక్కుతాయి.`,
      traits: "మీరు చాలా లౌక్యముగలవారు, ఆత్మవిశ్వాసం కలవారు. స్నేహ సంబంధాలలో నిజాయితీని కోరుకుంటారు. మీ ఆధ్మాత్మిక ఆలోచనలు మీకు ఎప్పుడూ తోడుగా నిలుస్తాయి.",
      remedies: [
        "గురువారం దేవాలయంలో నెయ్యి దీపం వెలిగించండి మరియు దైవదర్శనం చేసుకోండి.",
        "మనసును ప్రశాంతంగా ఉంచుకోవడానికి ప్రతిరోజూ కనీసం 15 నిಮಿషాల పాటు ధ్యానం చేయండి."
      ]
    },
    ta: {
      manglik_yes: "செவ்வாய் தோஷம் (மாங்கல்ய தோஷம்) உள்ளது. உங்கள் லக்னத்திலிருந்து செவ்வாய் பலமான வீட்டில் அமர்ந்துள்ளதால், உறவுகளில் பொறுமையையும் பேச்சில் நிதானத்தையும் கடைப்பிடிக்க வேண்டும்.",
      manglik_no: "செவ்வாய் தோஷம் இல்லை. உங்கள் ஜாதகத்தில் செவ்வாயின் நிலை சாதகமாக இருப்பதால் குடும்பத்தில் அமைதியும் மகிழ்ச்சியும் நிலவும்.",
      verdict: `உங்கள் ஜாதகம் ${lSignLoc} லக்னம் மற்றும் ${mSignLoc} சந்திர ராசியைக் கொண்டுள்ளது. ${nLoc} நட்சத்திரம், ${pPada}-ஆம் பாதத்தில் பிறந்த நீங்கள், நுண்ணறிவும் ஆளுமையும் நிறைந்தவர்.`,
      traits: "நீங்கள் மிகவும் புத்திசாலி, நேர்மையானவர் மற்றும் அர்ப்பணிப்பு உணர்வு கொண்டவர். உங்களது ஆன்மீக நாட்டம் உங்களுக்கு பெரும் வெற்றியைத் தரும்.",
      remedies: [
        "வியாழக்கிழமையன்று கோவிலில் நெய் தீபம் ஏற்றி நெய்ப் பிரசாதம் வழங்குவது சிறப்பு.",
        "சந்திரனின் ஆற்றலை சீராக்க தினமும் 15 நிமிடங்கள் தியானம் செய்யவும்."
      ]
    },
    kn: {
      manglik_yes: "ಮಂಗಳ ದೋಷ (ಮಾಂಗ್ಲಿಕ್) ಸಕ್ರಿಯವಾಗಿದೆ. ನಿಮ್ಮ ಲಗ್ನದಿಂದ ಮಂಗಳನು ಪ್ರಭಾವಿ ಸ್ಥಾನದಲ್ಲಿರುವುದರಿಂದ ಆದಷ್ಟು ತಾಳ್ಮೆ ಮತ್ತು ಸೌಮ್ಯ ವರ್ತನೆ ಕಾಪಾಡಿಕೊಳ್ಳುವುದು ನೆಮ್ಮದಿಗೆ ಸಹಕಾರಿ.",
      manglik_no: "ಮಂಗಳ ದೋಷ ಕಂಡುಬಂದಿಲ್ಲ. ಜಾತಕದಲ್ಲಿ ಮಂಗಳನ ಸ್ಥಾನವು ತುಂಬಾ ಅನುಕೂಲಕರ ಮತ್ತು ಶಾಂತಿಯುತವಾಗಿದೆ.",
      verdict: `ನಿಮ್ಮ ನಕ್ಷತ್ರ ಜಾತಕದಲ್ಲಿ ${lSignLoc} ಲಗ್ನ ಮತ್ತು ${mSignLoc} ಚಂದ್ರ ರಾಶಿಯ ಅತ್ಯುತ್ತಮ ಸಮ್ಮಿಲನವಿದೆ. ${nLoc} ನಕ್ಷತ್ರ, ${pPada}-ನೇ ಪಾದದಲ್ಲಿ ಹುಟ್ಟಿದ ನಿಮಗೆ ತೀಕ್ಷ್ಣ ಬುದ್ಧಿಶಕ್ತಿ ದೊರೆತಿದೆ.`,
      traits: "ನೀವು ಬುದ್ಧಿವಂತರು, ಶ್ರದ್ಧಾವಂತರು ಮತ್ತು ಸ್ವಾವಲಂಬಿಗಳು. ಆಧ್ಯಾತ್ಮಿಕ ಚಿಂತನೆಗಳು ನಿಮ್ಮ ಮನಸ್ಸಿಗೆ ನೆಮ್ಮದಿ ನೀಡುತ್ತವೆ ಮತ್ತು ಪ್ರಗತಿಗೆ ಕಾರಣವಾಗುತ್ತವೆ.",
      remedies: [
        "ಗುರುವಾರ ದಿನದಂದು ದೇವಸ್ಥಾನದಲ್ಲಿ ತುಪ್ಪದ ದೀಪವನ್ನು ಹಚ್ಚಿ ದರ್ಶನ ಪಡೆಯಿರಿ.",
        "ಮನಸ್ಸಿನ ಶಾಂತತೆಗಾಗಿ ನಿತ್ಯವೂ 15 ನಿಮಿಷಗಳ ಕಾಲ ಪ್ರಾಣಾಯಾಮ ಅಥವಾ ಧ್ಯಾನ ಮಾಡಿ."
      ]
    }
  };

  const selectedT = reportTexts[currLang] || reportTexts.en;

  return {
    manglik_dosha: {
      has_dosha: isM,
      name: currLang === "hi" ? "मंगल दोष" : currLang === "te" ? "కుజ దోషం" : currLang === "ta" ? "செவ்வாய் தோஷம்" : currLang === "kn" ? "ಮೂತ್ರ ದೋಷ (ಮಂಗಳ ದೋಷ)" : "Manglik Dosha",
      summary: isM ? selectedT.manglik_yes : selectedT.manglik_no
    },
    cosmic_verdict: selectedT.verdict,
    mental_profile: selectedT.traits,
    remedies: selectedT.remedies
  };
}

// 14. Custom Birth & Horoscope Details (POST /api/horoscope/custom-details & POST /api/custom-details)
const customDetailsHandler = async (req: Request, res: Response) => {
  try {
    const input: BirthInput = req.body;
    const lang = input.lang || (req.query.lang as LanguageCode) || "en";
    const ayanamsa = input.ayanamsa || "Lahiri";

    // 1. Calculate basic Sidereal coordinates and Panchang
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, ayanamsa);
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30.0);

    const moon = panchang.planets.find(p => p.name === "Moon")!;
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);

    // 2. Map precisely to the requested schema fields
    const lagna = translateRashi(lagnaRasi, lang);
    const moon_sign = translateRashi(moon.rasiIndex, lang);
    const nakshatra = translateNakshatra(panchang.nakshatra.index, lang);
    const pada = moon.pada || 1;

    // A. planet_positions
    const planetsOfInterest = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const planet_positions: Record<string, any> = {};
    planetsOfInterest.forEach(name => {
      const p = panchang.planets.find(item => item.name === name);
      if (p) {
        planet_positions[name] = {
          planet: p.name,
          localized_name: translatePlanet(p.name, lang),
          longitude: p.longitude,
          rasi_index: p.rasiIndex,
          rasi_name: p.rasiName,
          rasi_localized: translateRashi(p.rasiIndex, lang),
          degree: p.degree,
          sign_degree: p.signDegree,
          house: p.house,
          nakshatra_name: p.nakshatraName,
          nakshatra_localized: translateNakshatra(p.nakshatraIndex, lang),
          pada: p.pada,
          is_retrograde: p.isRetrograde
        };
      }
    });

    // B. houses
    const houses: Record<string, any> = {};
    for (let i = 0; i < 12; i++) {
      const houseNum = i + 1;
      const rasiIdx = (lagnaRasi + i) % 12;
      const rasiNameEnglish = RASHI_NAMES_ENGLISH[rasiIdx];
      const rasiNameLocalized = translateRashi(rasiIdx, lang);
      houses[houseNum.toString()] = {
        house: houseNum,
        rasi_index: rasiIdx,
        sign: rasiNameLocalized,
        sign_english: rasiNameEnglish
      };
    }

    // C. dasha_data
    const dashaTree = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    const dasha_data = {
      current_mahadasha: dashaTree.mahadasha,
      current_mahadasha_localized: dashaTree.localizedMahadasha,
      current_antardasha: dashaTree.antardasha,
      current_antardasha_localized: dashaTree.localizedAntardasha,
      time_remaining_years: dashaTree.timeRemainingYears,
      sequence: dashaTree.timeline.map(node => ({
        lord: node.lord,
        localized_lord: node.localizedLord,
        start_time: node.startTime,
        end_time: node.endTime,
        duration_years: node.durationYears,
        sub_dashas: node.subDashas ? node.subDashas.map(sub => ({
          lord: sub.lord,
          localized_lord: sub.localizedLord,
          start_time: sub.startTime,
          end_time: sub.endTime,
          duration_years: sub.durationYears
        })) : []
      }))
    };

    // D. report_data
    const isM = doshas.some(d => d.name.toLowerCase().includes("manglik") && d.hasDosha);
    const report_data = getReportDataHelper(lang, lagnaRasi, moon.rasiIndex, panchang.nakshatra.index, pada, isM);

    // E. chart_data
    const divisionalCharts = generateDivisionalCharts(panchang.planets, lagnaLong, lang);
    const d1Chart = divisionalCharts.find(c => c.code === "D1");
    const d9Chart = divisionalCharts.find(c => c.code === "D9");

    // Navamsha lagna rasi
    const element = lagnaRasi % 4;
    let startSign = 0;
    if (element === 0) startSign = 0;
    else if (element === 1) startSign = 9;
    else if (element === 2) startSign = 6;
    else startSign = 3;
    const lagnaPart = Math.floor((lagnaLong % 30) / 3.333333);
    const lagnaNavRasi = (startSign + lagnaPart) % 12;

    const makeUIChartData = (points: any[], startLagnaRasi: number) => {
      const housePlanets: Record<string, string[]> = {};
      const houseSigns: Record<string, number> = {};
      for (let h = 1; h <= 12; h++) {
        housePlanets[h] = [];
        houseSigns[h] = (startLagnaRasi + h - 1) % 12;
      }
      points.forEach(p => {
        if (p.house >= 1 && p.house <= 12) {
          housePlanets[p.house].push(p.planet);
        }
      });
      return {
        lagna_rasi_index: startLagnaRasi,
        lagna_sign_name: RASHI_NAMES_ENGLISH[startLagnaRasi],
        house_planets: housePlanets,
        house_signs: houseSigns,
        points
      };
    };

    // Recalculate D9 points so houses align starting from D9 Navamsha Lagna (lagnaNavRasi) as House 1
    const d9PointsRecalculated = d9Chart?.points.map(p => {
      const calculatedHouse = (p.signIndex - lagnaNavRasi + 12) % 12 + 1;
      return {
        planet: p.planet,
        localized_planet: p.localizedPlanet,
        longitude: p.longitude,
        rasi_index: p.signIndex,
        rasi_name: p.signName,
        rasi_localized: p.signLocalizedName,
        house: calculatedHouse
      };
    }) || [];

    const chart_data = {
      D1: makeUIChartData(d1Chart?.points.map(p => ({
        planet: p.planet,
        localized_planet: p.localizedPlanet,
        longitude: p.longitude,
        rasi_index: p.signIndex,
        rasi_name: p.signName,
        rasi_localized: p.signLocalizedName,
        house: p.house
      })) || [], lagnaRasi),
      D9: makeUIChartData(d9PointsRecalculated, lagnaNavRasi),
      raw_d1: d1Chart,
      raw_d9: d9Chart
    };

    res.json({
      success: true,
      lagna,
      moon_sign,
      nakshatra,
      pada,
      planet_positions,
      houses,
      dasha_data,
      report_data,
      chart_data,
      meta: {
        ayanamsa,
        lang,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

router.post("/horoscope/custom-details", customDetailsHandler);
router.post("/custom-details", customDetailsHandler);

// 15. Deep Vedic & Astronomical Math Assertions test suite (105 positive & negative cases)
const testSuiteHandler = (req: Request, res: Response) => {
  try {
    const rawCases = req.query.cases || req.body.cases;
    let casesCount = 105;
    if (rawCases) {
      const parsed = parseInt(rawCases as string, 10);
      if (!isNaN(parsed) && parsed > 0) {
        casesCount = Math.min(parsed, 50000); // Guarded to max 50,000 cases to prevent server crash
      }
    }
    const report = AstrologyTestSuite.runAllTests(casesCount);
    res.json({
      success: true,
      ...report
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

router.get("/test-suite", testSuiteHandler);
router.post("/test-suite", testSuiteHandler);

export default router;
