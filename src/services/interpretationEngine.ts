import { Horoscope, YogaResult, InterpretationResult, InterpretationCategory, LanguageCode } from "../types/astrology";
import { translatePlanet, translateRashi } from "../utils/translation";

export class InterpretationEngine {

  public static generateInterpretation(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationResult {
    return {
      personality: this.generatePersonality(chart, yogas, lang),
      career: this.generateCareer(chart, yogas, lang),
      education: this.generateEducation(chart, yogas, lang),
      finance: this.generateFinance(chart, yogas, lang),
      relationships: this.generateRelationships(chart, yogas, lang),
      health: this.generateHealth(chart, yogas, lang),
      spirituality: this.generateSpirituality(chart, yogas, lang),
      strengths: this.generateStrengths(yogas, lang),
      challenges: this.generateChallenges(yogas, lang),
      remedies: this.generateRemedies(chart, yogas, lang)
    };
  }

  // --- Category Generators ---

  private static generatePersonality(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const signL = translateRashi(chart.ascendant.signName, lang);
    const lordL = translatePlanet(chart.ascendant.lord, lang);
    observations.push(lang === 'te' ? `లగ్నం ${signL}, అధిపతి ${lordL}.` : lang === 'hi' ? `लग्न ${signL} है, स्वामी ${lordL} है।` : lang === 'ta' ? `லக்னம் ${signL}, அதிபதி ${lordL}.` : lang === 'kn' ? `ಲಗ್ನ ${signL}, ಅಧಿಪತಿ ${lordL}.` : `Ascendant is ${signL}, ruled by ${lordL}.`);
    interpretations.push(lang === 'te' ? `సహజంగా ${lordL} ప్రభావం ఎక్కువగా ఉంటుంది.` : lang === 'hi' ? `स्वभाव में ${lordL} का प्रभाव अधिक है।` : lang === 'ta' ? `இயல்பாகவே ${lordL} தாக்கம் அதிகம்.` : lang === 'kn' ? `ಸ್ವಭಾವದಲ್ಲಿ ${lordL} ಪ್ರಭಾವ ಹೆಚ್ಚು.` : `Traditionally associated with a core nature that is strongly influenced by ${lordL}.`);

    const lagnaLord = chart.planets[chart.ascendant.lord];
    if (lagnaLord) {
      const llRasi = translateRashi(lagnaLord.rasi.name.en, lang);
      observations.push(lang === 'te' ? `లగ్నాధిపతి ${lordL} ${lagnaLord.house}వ ఇంట్లో (${llRasi}) ఉన్నాడు.` : lang === 'hi' ? `लग्नेश ${lordL} ${lagnaLord.house}वें भाव (${llRasi}) में है।` : lang === 'ta' ? `லக்னாதிபதி ${lordL} ${lagnaLord.house}ஆம் வீட்டில் (${llRasi}) உள்ளார்.` : lang === 'kn' ? `ಲಗ್ನಾಧಿಪತಿ ${lordL} ${lagnaLord.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ (${llRasi}).` : `Ascendant lord ${lordL} is in house ${lagnaLord.house} (${llRasi}).`);
      if (lagnaLord.dignity === "Exalted" || lagnaLord.dignity === "Own") {
        score += 20;
        interpretations.push(lang === 'te' ? "బలమైన లగ్నాధిపతి ఆత్మవిశ్వాసాన్ని ఇస్తాడు." : lang === 'hi' ? "मजबूत लग्नेश आत्मविश्वास देता है।" : lang === 'ta' ? "பலமான லக்னாதிபதி தன்னம்பிக்கையைத் தருகிறார்." : lang === 'kn' ? "ಬಲವಾದ ಲಗ್ನಾಧಿಪತಿ ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ನೀಡುತ್ತಾನೆ." : "A strongly placed Ascendant lord generally suggests vitality, confidence, and self-reliance.");
      } else if (lagnaLord.dignity === "Debilitated") {
        score -= 20;
        interpretations.push(lang === 'te' ? "లగ్నాధిపతి నీచ స్థితి ఆత్మవిశ్వాస లోపాన్ని సూచిస్తుంది." : lang === 'hi' ? "लग्नेश की नीच स्थिति आत्मविश्वास में कमी दर्शाती है।" : lang === 'ta' ? "லக்னாதிபதியின் நீச நிலை தன்னம்பிக்கை குறைபாட்டை குறிக்கிறது." : lang === 'kn' ? "ಲಗ್ನಾಧಿಪತಿಯ ನೀಚ ಸ್ಥಿತಿ ಆತ್ಮವಿಶ್ವಾಸದ ಕೊರತೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ." : "A debilitated Ascendant lord may indicate periods of self-doubt or a need to consciously build self-esteem.");
      }
    }

    const moon = chart.planets["Moon"];
    if (moon) {
      const moonRasiL = translateRashi(moon.rasi.name.en, lang);
      observations.push(lang === 'te' ? `చంద్రుడు ${moonRasiL}లో ఉన్నాడు.` : lang === 'hi' ? `चंद्रमा ${moonRasiL} में है।` : lang === 'ta' ? `சந்திரன் ${moonRasiL}யில் உள்ளார்.` : lang === 'kn' ? `ಚಂದ್ರ ${moonRasiL}ದಲ್ಲಿದ್ದಾನೆ.` : `Moon is placed in ${moonRasiL}.`);
      interpretations.push(lang === 'te' ? `మానసిక భావాలు ${moonRasiL} లక్షణాలను పోలి ఉంటాయి.` : lang === 'hi' ? `भावनाएं ${moonRasiL} के गुणों के समान हैं।` : lang === 'ta' ? `உணர்ச்சிகள் ${moonRasiL}யின் குணங்களை ஒத்திருக்கும்.` : lang === 'kn' ? `ಭಾವನೆಗಳು ${moonRasiL} ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹೋಲುತ್ತವೆ.` : `Emotional expression tends to take on the qualities of ${moonRasiL}.`);
    }

    const mahapurushaYogas = yogas.filter(y => y.id.startsWith("mahapurusha_") && y.detected);
    mahapurushaYogas.forEach(yoga => {
      observations.push(lang === 'te' ? `${yoga.name} కనుగొనబడింది.` : lang === 'hi' ? `${yoga.name} पाया गया।` : lang === 'ta' ? `${yoga.name} கண்டறியப்பட்டது.` : lang === 'kn' ? `${yoga.name} ಕಂಡುಬಂದಿದೆ.` : `${yoga.name} detected (${yoga.evidence[0]}).`);
      interpretations.push(lang === 'te' ? "ఈ యోగం గ్రహం యొక్క బలమైన లక్షణాలను ఇస్తుంది." : lang === 'hi' ? "यह योग ग्रह के मजबूत गुण देता है।" : lang === 'ta' ? "இந்த யோகம் கிரகத்தின் வலுவான குணங்களை அளிக்கிறது." : lang === 'kn' ? "ಈ ಯೋಗವು ಗ್ರಹದ ಪ್ರಬಲ ಗುಣಲಕ್ಷಣಗಳನ್ನು ನೀಡುತ್ತದೆ." : `This yoga traditionally bestows powerful characteristics aligned with the ruling planet.`);
      score += 15;
    });

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateCareer(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const house10 = chart.houses.find(h => h.index === 10);
    const sun = chart.planets["Sun"];

    if (house10) {
      const signL = translateRashi(house10.signName, lang);
      const lordL = translatePlanet(house10.lord, lang);
      observations.push(lang === 'te' ? `10వ స్థానం ${signL}, అధిపతి ${lordL}.` : lang === 'hi' ? `10वां भाव ${signL} है, स्वामी ${lordL} है।` : lang === 'ta' ? `10ஆம் வீடு ${signL}, அதிபதி ${lordL}.` : lang === 'kn' ? `10ನೇ ಮನೆ ${signL}, ಅಧಿಪತಿ ${lordL}.` : `10th house is ${signL}, ruled by ${lordL}.`);
      if (house10.occupants.length > 0) {
        const occL = house10.occupants.map(o => translatePlanet(o, lang));
        observations.push(lang === 'te' ? `10వ స్థానంలో గ్రహాలు: ${occL.join(", ")}.` : lang === 'hi' ? `10वें भाव में ग्रह: ${occL.join(", ")}.` : lang === 'ta' ? `10ஆம் வீட்டில் உள்ள கிரகங்கள்: ${occL.join(", ")}.` : lang === 'kn' ? `10ನೇ ಮನೆಯಲ್ಲಿರುವ ಗ್ರಹಗಳು: ${occL.join(", ")}.` : `10th house occupants: ${occL.join(", ")}.`);
        interpretations.push(lang === 'te' ? `కెరీర్ మార్గం ${occL.join(" మరియు ")} చే ప్రభావితమవుతుంది.` : lang === 'hi' ? `करियर ${occL.join(" और ")} से प्रभावित है।` : lang === 'ta' ? `தொழில் ${occL.join(" மற்றும் ")} ஆகியவற்றால் பாதிக்கப்படுகிறது.` : lang === 'kn' ? `ವೃತ್ತಿಯು ${occL.join(" ಮತ್ತು ")} ಗ್ರಹಗಳಿಂದ ಪ್ರಭಾವಿತವಾಗಿದೆ.` : `Career path is significantly influenced by the energies of ${occL.join(" and ")}.`);
      } else {
        observations.push(lang === 'te' ? "10వ ఇంట్లో గ్రహాలు లేవు." : lang === 'hi' ? "10वें भाव में कोई ग्रह नहीं है।" : lang === 'ta' ? "10ஆம் வீட்டில் கிரகங்கள் இல்லை." : lang === 'kn' ? "10ನೇ ಮನೆಯಲ್ಲಿ ಯಾವುದೇ ಗ್ರಹಗಳಿಲ್ಲ." : "No planets occupy the 10th house.");
        interpretations.push(lang === 'te' ? `కెరీర్ మార్గం ప్రధానంగా ${lordL} స్థానంపై ఆధారపడి ఉంటుంది.` : lang === 'hi' ? `करियर मुख्य रूप से ${lordL} की स्थिति पर निर्भर करता है।` : lang === 'ta' ? `தொழில் முக்கியமாக ${lordL} இன் நிலையைப் பொறுத்தது.` : lang === 'kn' ? `ವೃತ್ತಿಯು ಮುಖ್ಯವಾಗಿ ${lordL} ನ ಸ್ಥಾನವನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ.` : `Career direction is primarily guided by the placement and dignity of ${lordL}.`);
      }
    }

    if (sun) {
      if (sun.house === 10) {
        score += 20;
        observations.push(lang === 'te' ? "సూర్యుడు 10వ ఇంట్లో (దిగ్బలం) ఉన్నాడు." : lang === 'hi' ? "सूर्य 10वें भाव (दिग्बल) में है।" : lang === 'ta' ? "சூரியன் 10ஆம் வீட்டில் (திக்பலம்) உள்ளார்." : lang === 'kn' ? "ಸೂರ್ಯನು 10ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ (ದಿಗ್ಬಲ)." : "Sun is placed in the 10th house (Digbala).");
        interpretations.push(lang === 'te' ? "10వ ఇంట్లో సూర్యుడు నాయకత్వ లక్షణాలను ఇస్తాడు." : lang === 'hi' ? "10वें भाव में सूर्य नेतृत्व के गुण देता है।" : lang === 'ta' ? "10ஆம் வீட்டில் உள்ள சூரியன் தலைமைத்துவ பண்புகளைத் தருகிறார்." : lang === 'kn' ? "10ನೇ ಮನೆಯಲ್ಲಿರುವ ಸೂರ್ಯನು ನಾಯಕತ್ವದ ಗುಣಗಳನ್ನು ನೀಡುತ್ತಾನೆ." : "Sun in the 10th house traditionally grants strong leadership qualities and authority in professional life.");
      }
    }

    const careerYogas = yogas.filter(y => ["raja_yoga", "budha_aditya", "gaja_kesari"].includes(y.id) && y.detected);
    careerYogas.forEach(yoga => {
      observations.push(lang === 'te' ? `${yoga.name} కనుగొనబడింది.` : lang === 'hi' ? `${yoga.name} पाया गया।` : lang === 'ta' ? `${yoga.name} கண்டறியப்பட்டது.` : lang === 'kn' ? `${yoga.name} ಕಂಡುಬಂದಿದೆ.` : `${yoga.name} detected.`);
      score += 10;
    });
    if (careerYogas.length > 0) {
      interpretations.push(lang === 'te' ? "ఈ యోగాల ఉనికి వృత్తిలో మంచి గుర్తింపు మరియు విజయాన్ని సూచిస్తుంది." : lang === 'hi' ? "इन योगों की उपस्थिति करियर में अच्छी पहचान और सफलता को दर्शाती है।" : lang === 'ta' ? "இந்த யோகங்கள் தொழிலில் நல்ல அங்கீகாரத்தையும் வெற்றியையும் குறிக்கின்றன." : lang === 'kn' ? "ಈ ಯೋಗಗಳ ಉಪಸ್ಥಿತಿಯು ವೃತ್ತಿಯಲ್ಲಿ ಉತ್ತಮ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಯಶಸ್ಸನ್ನು ಸೂಚಿಸುತ್ತದೆ." : "The presence of these yogas suggests strong potential for recognition and success in one's chosen field.");
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateEducation(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const lord4 = chart.planets[chart.houses.find(h => h.index === 4)?.lord || ""];
    const lord5 = chart.planets[chart.houses.find(h => h.index === 5)?.lord || ""];
    const mercury = chart.planets["Mercury"];
    const jupiter = chart.planets["Jupiter"];

    if (lord4) {
      const pL = translatePlanet(lord4.name.en, lang);
      observations.push(lang === 'te' ? `4వ అధిపతి (${pL}) ${lord4.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `4थे भाव का स्वामी (${pL}) ${lord4.house}वें भाव में है।` : lang === 'ta' ? `4ஆம் அதிபதி (${pL}) ${lord4.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `4ನೇ ಅಧಿಪತಿ (${pL}) ${lord4.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `4th house lord (${pL}) is in house ${lord4.house}.`);
    }
    if (lord5) {
      const pL = translatePlanet(lord5.name.en, lang);
      observations.push(lang === 'te' ? `5వ అధిపతి (${pL}) ${lord5.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `5वें भाव का स्वामी (${pL}) ${lord5.house}वें भाव में है।` : lang === 'ta' ? `5ஆம் அதிபதி (${pL}) ${lord5.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `5ನೇ ಅಧಿಪತಿ (${pL}) ${lord5.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `5th house lord (${pL}) is in house ${lord5.house}.`);
    }

    if (mercury && (mercury.dignity === "Exalted" || mercury.dignity === "Own")) {
      score += 15;
      observations.push(lang === 'te' ? `బుధుడు బలంగా ఉన్నాడు (${mercury.dignity}).` : lang === 'hi' ? `बुध मजबूत है (${mercury.dignity})।` : lang === 'ta' ? `புதன் பலமாக உள்ளார் (${mercury.dignity}).` : lang === 'kn' ? `ಬುಧ ಬಲಶಾಲಿಯಾಗಿದ್ದಾನೆ (${mercury.dignity}).` : `Mercury is strong (${mercury.dignity}).`);
      interpretations.push(lang === 'te' ? "బలమైన బుధుడు విశ్లేషణాత్మక నైపుణ్యాలను మరియు వేగవంతమైన అభ్యాసాన్ని ఇస్తాడు." : lang === 'hi' ? "मजबूत बुध विश्लेषणात्मक कौशल और तेजी से सीखने का समर्थन करता है।" : lang === 'ta' ? "பலமான புதன் பகுப்பாய்வு திறன் மற்றும் விரைவான கற்றலை ஆதரிக்கிறது." : lang === 'kn' ? "ಬಲವಾದ ಬುಧವು ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಕೌಶಲ್ಯಗಳನ್ನು ಮತ್ತು ವೇಗವಾಗಿ ಕಲಿಯುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ." : "A strong Mercury favors analytical skills, logic, and rapid learning.");
    }
    
    if (jupiter && (jupiter.dignity === "Exalted" || jupiter.dignity === "Own")) {
      score += 15;
      observations.push(lang === 'te' ? `గురువు బలంగా ఉన్నాడు (${jupiter.dignity}).` : lang === 'hi' ? `गुरु मजबूत है (${jupiter.dignity})।` : lang === 'ta' ? `குரு பலமாக உள்ளார் (${jupiter.dignity}).` : lang === 'kn' ? `ಗುರು ಬಲಶಾಲಿಯಾಗಿದ್ದಾನೆ (${jupiter.dignity}).` : `Jupiter is strong (${jupiter.dignity}).`);
      interpretations.push(lang === 'te' ? "బలమైన గురువు ఉన్నత విజ్ఞానం మరియు విద్యా విజయానికి మద్దతు ఇస్తాడు." : lang === 'hi' ? "मजबूत गुरु उच्च ज्ञान और शैक्षिक सफलता का समर्थन करता है।" : lang === 'ta' ? "பலமான குரு உயர் அறிவு மற்றும் கல்வி வெற்றிக்கு உதவுகிறார்." : lang === 'kn' ? "ಬಲವಾದ ಗುರು ಉನ್ನತ ಜ್ಞಾನ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಯಶಸ್ಸನ್ನು ಬೆಂಬಲಿಸುತ್ತಾನೆ." : "A strong Jupiter favors higher wisdom, philosophical thinking, and academic success.");
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateFinance(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const lord2 = chart.houses.find(h => h.index === 2)?.lord || "";
    const lord11 = chart.houses.find(h => h.index === 11)?.lord || "";
    
    const l2L = translatePlanet(lord2, lang);
    const l11L = translatePlanet(lord11, lang);
    
    observations.push(lang === 'te' ? `2వ స్థానం (సంపద) అధిపతి ${l2L}.` : lang === 'hi' ? `दूसरे भाव (धन) के स्वामी ${l2L} हैं।` : lang === 'ta' ? `2ஆம் வீடு (செல்வம்) அதிபதி ${l2L}.` : lang === 'kn' ? `2ನೇ ಮನೆ (ಸಂಪತ್ತು) ಅಧಿಪತಿ ${l2L}.` : `2nd house (Accumulated Wealth) is ruled by ${l2L}.`);
    observations.push(lang === 'te' ? `11వ స్థానం (లాభాలు) అధిపతి ${l11L}.` : lang === 'hi' ? `11वें भाव (लाभ) के स्वामी ${l11L} हैं।` : lang === 'ta' ? `11ஆம் வீடு (லாபங்கள்) அதிபதி ${l11L}.` : lang === 'kn' ? `11ನೇ ಮನೆ (ಲಾಭಗಳು) ಅಧಿಪತಿ ${l11L}.` : `11th house (Gains) is ruled by ${l11L}.`);

    const dhana = yogas.find(y => y.id === "dhana_yoga");
    const daridra = yogas.find(y => y.id === "daridra_yoga");

    if (dhana?.detected) {
      score += 25;
      observations.push(lang === 'te' ? `ధన యోగం కనుగొనబడింది: ${dhana.evidence[0]}` : lang === 'hi' ? `धन योग पाया गया: ${dhana.evidence[0]}` : lang === 'ta' ? `தன யோகம் கண்டறியப்பட்டது: ${dhana.evidence[0]}` : lang === 'kn' ? `ಧನ ಯೋಗ ಕಂಡುಬಂದಿದೆ: ${dhana.evidence[0]}` : `Dhana Yoga detected: ${dhana.evidence[0]}`);
      interpretations.push(lang === 'te' ? "ఈ యోగం సంపదను సృష్టించడానికి మరియు కూడబెట్టుకోవడానికి బలమైన సామర్థ్యాన్ని సూచిస్తుంది." : lang === 'hi' ? "यह योग धन उत्पन्न करने और संचय करने की मजबूत क्षमता को दर्शाता है।" : lang === 'ta' ? "இந்த யோகம் செல்வத்தை உருவாக்கும் மற்றும் குவிக்கும் வலுவான திறனைக் குறிக்கிறது." : lang === 'kn' ? "ಈ ಯೋಗವು ಸಂಪತ್ತನ್ನು ಸೃಷ್ಟಿಸುವ ಮತ್ತು ಸಂಗ್ರಹಿಸುವ ಪ್ರಬಲ ಸಾಮರ್ಥ್ಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ." : "This yoga traditionally indicates a strong capacity to generate and accumulate wealth.");
    }

    if (daridra?.detected) {
      score -= 25;
      observations.push(lang === 'te' ? `దరిద్ర యోగం కనుగొనబడింది: ${daridra.evidence[0]}` : lang === 'hi' ? `दरिद्र योग पाया गया: ${daridra.evidence[0]}` : lang === 'ta' ? `தரித்திர யோகம் கண்டறியப்பட்டது: ${daridra.evidence[0]}` : lang === 'kn' ? `ದರಿದ್ರ ಯೋಗ ಕಂಡುಬಂದಿದೆ: ${daridra.evidence[0]}` : `Daridra Yoga detected: ${daridra.evidence[0]}`);
      interpretations.push(lang === 'te' ? "ఈ కలయిక ఆర్థిక స్థిరత్వంలో హెచ్చుతగ్గులు లేదా సవాళ్లను సూచిస్తుంది." : lang === 'hi' ? "यह संयोजन वित्तीय स्थिरता में उतार-चढ़ाव या चुनौतियों को दर्शाता है।" : lang === 'ta' ? "இந்த சேர்க்கை நிதி நிலைத்தன்மையில் ஏற்ற இறக்கங்கள் அல்லது சவால்களைக் குறிக்கிறது." : lang === 'kn' ? "ಈ ಸಂಯೋಜನೆಯು ಆರ್ಥಿಕ ಸ್ಥಿರತೆಯಲ್ಲಿ ಏರಿಳಿತಗಳು ಅಥವಾ ಸವಾಲುಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ." : "This combination suggests potential fluctuations or challenges in financial stability.");
    }

    if (dhana?.detected && daridra?.detected) {
      interpretations.push(lang === 'te' ? "విరుద్ధమైన ఆర్థిక యోగాల ఉనికి అత్యధిక ఆదాయాలు మరియు అత్యధిక ఖర్చుల కాలాలను సూచిస్తుంది." : lang === 'hi' ? "विरोधी वित्तीय योगों की उपस्थिति उच्च आय और उच्च खर्च के दौर को दर्शाती है।" : lang === 'ta' ? "முரண்பட்ட நிதி யோகங்கள் அதிக வருமானம் மற்றும் அதிக செலவு செய்யும் காலங்களைக் குறிக்கின்றன." : lang === 'kn' ? "ವಿರೋಧಾತ್ಮಕ ಆರ್ಥಿಕ ಯೋಗಗಳು ಹೆಚ್ಚಿನ ಆದಾಯ ಮತ್ತು ಹೆಚ್ಚಿನ ಖರ್ಚಿನ ಅವಧಿಗಳನ್ನು ಸೂಚಿಸುತ್ತವೆ." : "The presence of conflicting financial yogas suggests periods of high earning followed by high expenditures.");
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateRelationships(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const house7 = chart.houses.find(h => h.index === 7);
    const venus = chart.planets["Venus"];
    const mars = chart.planets["Mars"];

    if (house7) {
      const h7L = translatePlanet(house7.lord, lang);
      observations.push(lang === 'te' ? `7వ స్థానం అధిపతి ${h7L}.` : lang === 'hi' ? `7वें भाव के स्वामी ${h7L} हैं।` : lang === 'ta' ? `7ஆம் அதிபதி ${h7L}.` : lang === 'kn' ? `7ನೇ ಅಧಿಪತಿ ${h7L}.` : `7th house is ruled by ${h7L}.`);
      if (house7.occupants.length > 0) {
        const occL = house7.occupants.map(o => translatePlanet(o, lang));
        observations.push(lang === 'te' ? `7వ స్థానంలో గ్రహాలు: ${occL.join(", ")}.` : lang === 'hi' ? `7वें भाव में ग्रह: ${occL.join(", ")}.` : lang === 'ta' ? `7ஆம் வீட்டில் உள்ள கிரகங்கள்: ${occL.join(", ")}.` : lang === 'kn' ? `7ನೇ ಮನೆಯಲ್ಲಿರುವ ಗ್ರಹಗಳು: ${occL.join(", ")}.` : `7th house occupants: ${occL.join(", ")}.`);
        interpretations.push(lang === 'te' ? `సంబంధాలు ${occL.join(" మరియు ")} చే ప్రభావితమవుతాయి.` : lang === 'hi' ? `संबंध ${occL.join(" और ")} से प्रभावित होंगे।` : lang === 'ta' ? `உறவுகள் ${occL.join(" மற்றும் ")} ஆகியவற்றால் பாதிக்கப்படும்.` : lang === 'kn' ? `ಸಂಬಂಧಗಳು ${occL.join(" ಮತ್ತು ")} ಗುಣಲಕ್ಷಣಗಳಿಂದ ಪ್ರಭಾವಿತವಾಗಿರುತ್ತವೆ.` : `Relationships will be heavily flavored by the nature of ${occL.join(" and ")}.`);
      }
    }

    if (venus) {
      const vL = translatePlanet("Venus", lang);
      const rasiL = translateRashi(venus.rasi.name.en, lang);
      observations.push(lang === 'te' ? `${vL} (వివాహ కారకుడు) ${rasiL}లో (${venus.dignity}) ఉన్నాడు.` : lang === 'hi' ? `${vL} (विवाह का कारक) ${rasiL} में (${venus.dignity}) है।` : lang === 'ta' ? `${vL} (திருமண காரகன்) ${rasiL}யில் (${venus.dignity}) உள்ளார்.` : lang === 'kn' ? `${vL} (ವಿವಾಹ ಕಾರಕ) ${rasiL}ದಲ್ಲಿ (${venus.dignity}) ಇದ್ದಾನೆ.` : `Venus (karaka for marriage) is in ${rasiL} (${venus.dignity}).`);
      if (venus.dignity === "Debilitated") {
        score -= 15;
        interpretations.push(lang === 'te' ? "నీచ స్థితిలో ఉన్న శుక్రుడు సంబంధాలలో సర్దుబాట్లు మరియు పరస్పర అవగాహనను సూచిస్తాడు." : lang === 'hi' ? "नीच का शुक्र रिश्तों में समझ और समायोजन की आवश्यकता को दर्शाता है।" : lang === 'ta' ? "நீச சுக்கிரன் உறவுகளில் சுயமரியாதை மற்றும் பரஸ்பர பாராட்டு பற்றிய பாடங்களை குறிக்கிறது." : lang === 'kn' ? "ನೀಚ ಶುಕ್ರನು ಸಂಬಂಧಗಳಲ್ಲಿ ಸ್ವ-ಮೌಲ್ಯ ಮತ್ತು ಪರಸ್ಪರ ಮೆಚ್ಚುಗೆಯ ಪಾಠಗಳನ್ನು ಸೂಚಿಸುತ್ತಾನೆ." : "A debilitated Venus suggests relationship lessons regarding self-worth and mutual appreciation.");
      } else if (venus.dignity === "Exalted" || venus.dignity === "Own") {
        score += 15;
        interpretations.push(lang === 'te' ? "బలమైన శుక్రుడు భాగస్వామ్యంలో సామరస్యం, ఆప్యాయత మరియు పరస్పర గౌరవాన్ని ఇస్తాడు." : lang === 'hi' ? "मजबूत शुक्र साझेदारी में सद्भाव, स्नेह और सम्मान का पक्षधर है।" : lang === 'ta' ? "பலமான சுக்கிரன் கூட்டாண்மையில் நல்லிணக்கம், பாசம் மற்றும் பரஸ்பர மரியாதையை ஆதரிக்கிறது." : lang === 'kn' ? "ಬಲವಾದ ಶುಕ್ರನು ಪಾಲುದಾರಿಕೆಯಲ್ಲಿ ಸಾಮರಸ್ಯ, ವಾತ್ಸಲ್ಯ ಮತ್ತು ಪರಸ್ಪರ ಗೌರವವನ್ನು ಬೆಂಬಲಿಸುತ್ತಾನೆ." : "A strong Venus favors harmony, affection, and mutual respect in partnerships.");
      }
    }

    if (mars && [1, 4, 7, 8, 12].includes(mars.house)) {
      score -= 10;
      const mL = translatePlanet("Mars", lang);
      observations.push(lang === 'te' ? `${mL} ${mars.house}వ ఇంట్లో ఉన్నాడు (మాంగలిక స్థానం).` : lang === 'hi' ? `${mL} ${mars.house}वें भाव में है (मांगलिक स्थिति)।` : lang === 'ta' ? `${mL} ${mars.house}ஆம் வீட்டில் உள்ளார் (மாங்கல்ய தோஷம்).` : lang === 'kn' ? `${mL} ${mars.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ (ಮಾಂಗಲಿಕ ಸ್ಥಾನ).` : `Mars is in house ${mars.house} (Manglik alignment).`);
      interpretations.push(lang === 'te' ? "కుజుడి ఈ స్థానం ప్రారంభ సంబంధాలలో ఘర్షణను తెస్తుంది, ఇలాంటి స్థానం ఉన్న భాగస్వామి మంచిది." : lang === 'hi' ? "मंगल की यह स्थिति शुरुआती रिश्तों में मनमुटाव ला सकती है, ऐसे में समान स्थिति वाले साथी की सलाह दी जाती है।" : lang === 'ta' ? "இந்த செவ்வாய் நிலை ஆரம்ப உறவுகளில் உராய்வைக் கொண்டுவரும், இதேபோன்ற நிலையில் உள்ள கூட்டாளியைப் பரிந்துரைக்கிறது." : lang === 'kn' ? "ಮಂಗಳನ ಈ ಸ್ಥಾನವು ಆರಂಭಿಕ ಸಂಬಂಧಗಳಲ್ಲಿ ಘರ್ಷಣೆಯನ್ನು ತರಬಹುದು, ಇದೇ ರೀತಿಯ ಸ್ಥಾನವಿರುವ ಪಾಲುದಾರರನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ." : "This placement of Mars is traditionally known to bring assertiveness or friction in early partnerships, often recommending a similarly placed partner.");
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateHealth(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const lord6Name = chart.houses.find(h => h.index === 6)?.lord;
    const lord6 = lord6Name ? chart.planets[lord6Name] : null;
    const lagnaLordName = chart.ascendant.lord;
    const lagnaLord = chart.planets[lagnaLordName];

    if (lord6) {
      const l6L = translatePlanet(lord6.name.en, lang);
      observations.push(lang === 'te' ? `6వ స్థానం (ఆరోగ్యం) అధిపతి ${l6L} ${lord6.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `6ठे भाव (स्वास्थ्य) के स्वामी ${l6L} ${lord6.house}वें भाव में हैं।` : lang === 'ta' ? `6ஆம் வீடு (ஆரோக்கியம்) அதிபதி ${l6L} ${lord6.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `6ನೇ ಮನೆ (ಆರೋಗ್ಯ) ಅಧಿಪತಿ ${l6L} ${lord6.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `6th house (Health) lord ${l6L} is in house ${lord6.house}.`);
    }

    if (lagnaLord) {
      if (lagnaLord.house === 6 || lagnaLord.house === 8 || lagnaLord.house === 12) {
        score -= 15;
        observations.push(lang === 'te' ? `లగ్నాధిపతి దుస్థానంలో (${lagnaLord.house}వ ఇల్లు) ఉన్నాడు.` : lang === 'hi' ? `लग्नेश दुस्थान (${lagnaLord.house}वें भाव) में है।` : lang === 'ta' ? `லக்னாதிபதி துஸ்தானத்தில் (${lagnaLord.house}ஆம் வீடு) உள்ளார்.` : lang === 'kn' ? `ಲಗ್ನಾಧಿಪತಿಯು ದುಸ್ಥಾನದಲ್ಲಿದ್ದಾನೆ (${lagnaLord.house}ನೇ ಮನೆ).` : `Ascendant lord is placed in a Dusthana (house ${lagnaLord.house}).`);
        interpretations.push(lang === 'te' ? "లగ్నాధిపతి సవాలు చేసే ఇంట్లో ఉన్నప్పుడు, శారీరక ఆరోగ్యం మరియు ఒత్తిడి నిర్వహణపై అదనపు శ్రద్ధ అవసరం." : lang === 'hi' ? "जब लग्नेश चुनौतीपूर्ण भाव में हो, तो शारीरिक स्वास्थ्य और तनाव प्रबंधन पर अतिरिक्त ध्यान देने की सलाह दी जाती है।" : lang === 'ta' ? "லக்னாதிபதி சவாலான வீட்டில் இருக்கும்போது, உடல் நலம் மற்றும் மன அழுத்த நிர்வாகத்தில் கூடுதல் கவனம் செலுத்த அறிவுறுத்தப்படுகிறது." : lang === 'kn' ? "ಲಗ್ನಾಧಿಪತಿ ಸವಾಲಿನ ಮನೆಯಲ್ಲಿದ್ದಾಗ, ದೈಹಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಒತ್ತಡ ನಿರ್ವಹಣೆಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಗಮನ ಹರಿಸಲು ಸೂಚಿಸಲಾಗುತ್ತದೆ." : "When the Ascendant lord is in a challenging house, traditional texts recommend extra attention to physical wellness and stress management.");
      } else {
        score += 15;
        interpretations.push(lang === 'te' ? "లగ్నాధిపతి స్థానం సాధారణంగా మంచి శారీరక స్థితిస్థాపకతకు మద్దతు ఇస్తుంది." : lang === 'hi' ? "लग्नेश की स्थिति आमतौर पर अच्छे शारीरिक लचीलेपन का समर्थन करती है।" : lang === 'ta' ? "லக்னாதிபதியின் நிலை பொதுவாக நல்ல உடல் வலிமையை ஆதரிக்கிறது." : lang === 'kn' ? "ಲಗ್ನಾಧಿಪತಿಯ ಸ್ಥಾನವು ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತಮ ದೈಹಿಕ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವವನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ." : "The Ascendant lord's placement generally supports good physical resilience.");
      }
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  private static generateSpirituality(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): InterpretationCategory {
    const observations: string[] = [];
    const interpretations: string[] = [];
    let score = 50;

    const ketu = chart.planets["Ketu"];
    const jupiter = chart.planets["Jupiter"];

    if (ketu && (ketu.house === 9 || ketu.house === 12)) {
      score += 20;
      const kL = translatePlanet("Ketu", lang);
      observations.push(lang === 'te' ? `${kL} ${ketu.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `${kL} ${ketu.house}वें भाव में है।` : lang === 'ta' ? `${kL} ${ketu.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${kL} ${ketu.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Ketu is placed in house ${ketu.house}.`);
      interpretations.push(lang === 'te' ? "కేతువు యొక్క ఈ స్థానం చాలా ఆధ్యాత్మికమైనది, విముక్తి మరియు అంతర్గత ప్రతిబింబం వైపు సహజ ఆకర్షణను సూచిస్తుంది." : lang === 'hi' ? "केतु की यह स्थिति अत्यधिक आध्यात्मिक मानी जाती है, जो मुक्ति और आत्म-चिंतन की ओर एक सहज झुकाव को दर्शाती है।" : lang === 'ta' ? "கேதுவின் இந்த நிலை மிகவும் ஆன்மீகமாக கருதப்படுகிறது, இது விடுதலை மற்றும் உள் பிரதிபலிப்பை நோக்கிய உள்ளார்ந்த இழுப்பைக் குறிக்கிறது." : lang === 'kn' ? "ಕೇತುವಿನ ಈ ಸ್ಥಾನವನ್ನು ಅತ್ಯಂತ ಆಧ್ಯಾತ್ಮಿಕವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, ಇದು ವಿಮೋಚನೆ ಮತ್ತು ಆಂತರಿಕ ಪ್ರತಿಬಿಂಬದ ಕಡೆಗೆ ಸಹಜ ಒಲವನ್ನು ಸೂಚಿಸುತ್ತದೆ." : "This placement of Ketu is considered highly spiritual, indicating an innate pull toward liberation and inner reflection.");
    } else if (ketu) {
      const kL = translatePlanet("Ketu", lang);
      observations.push(lang === 'te' ? `${kL} ${ketu.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `${kL} ${ketu.house}वें भाव में है।` : lang === 'ta' ? `${kL} ${ketu.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${kL} ${ketu.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Ketu is placed in house ${ketu.house}.`);
    }

    if (jupiter && (jupiter.house === 9 || jupiter.house === 12)) {
      score += 15;
      const jL = translatePlanet("Jupiter", lang);
      observations.push(lang === 'te' ? `${jL} ${jupiter.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `${jL} ${jupiter.house}वें भाव में है।` : lang === 'ta' ? `${jL} ${jupiter.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${jL} ${jupiter.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Jupiter is placed in house ${jupiter.house}.`);
      interpretations.push(lang === 'te' ? "ఈ ఇంట్లో గురువు తత్వశాస్త్రం, ధర్మం మరియు ఉన్నత అభ్యాసం పట్ల ఆసక్తిని ఇస్తాడు." : lang === 'hi' ? "इस भाव में गुरु दर्शन, धर्म और उच्च शिक्षा के प्रति झुकाव देता है।" : lang === 'ta' ? "இந்த வீட்டில் குரு தத்துவம், தர்மம் மற்றும் உயர் கற்றல் மீதான ஈடுபாட்டைத் தருகிறார்." : lang === 'kn' ? "ಈ ಮನೆಯಲ್ಲಿರುವ ಗುರು ತತ್ವಶಾಸ್ತ್ರ, ಧರ್ಮ ಮತ್ತು ಉನ್ನತ ಶಿಕ್ಷಣದ ಕಡೆಗೆ ಒಲವನ್ನು ನೀಡುತ್ತಾನೆ." : "Jupiter in this house traditionally bestows an inclination toward philosophy, dharma, and higher learning.");
    }

    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }

  // --- Aggregators ---

  private static generateStrengths(yogas: YogaResult[], lang: LanguageCode): string[] {
    const positiveYogas = yogas.filter(y => y.detected && !["kemadruma", "daridra_yoga", "guru_chandal", "shakata_yoga"].includes(y.id));
    return positiveYogas.map(y => {
      return lang === 'te' ? `${y.name} ఉండటం వల్ల శుభ ఫలితాలు ఉంటాయి.` : lang === 'hi' ? `${y.name} की उपस्थिति अनुकूल परिणामों को दर्शाती है।` : lang === 'ta' ? `${y.name} இருப்பதால் சாதகமான முடிவுகள் கிடைக்கும்.` : lang === 'kn' ? `${y.name} ಇರುವುದರಿಂದ ಅನುಕೂಲಕರ ಫಲಿತಾಂಶಗಳು ಸಿಗುತ್ತವೆ.` : `${y.name} is present, traditionally signifying favorable outcomes in its domain.`;
    });
  }

  private static generateChallenges(yogas: YogaResult[], lang: LanguageCode): string[] {
    const negativeYogas = yogas.filter(y => y.detected && ["kemadruma", "daridra_yoga", "guru_chandal", "shakata_yoga"].includes(y.id));
    return negativeYogas.map(y => {
      return lang === 'te' ? `${y.name} ఉండటం వల్ల సవాళ్లు మరియు అడ్డంకులు సూచించబడ్డాయి, తగిన పరిహారాలు అవసరం.` : lang === 'hi' ? `${y.name} की उपस्थिति संभावित बाधाओं को दर्शाती है, जिन्हें पारंपरिक उपायों की आवश्यकता है।` : lang === 'ta' ? `${y.name} இருப்பதால் சாத்தியமான தடைகள் குறிக்கப்படுகின்றன, தகுந்த பரிகாரங்கள் தேவை.` : lang === 'kn' ? `${y.name} ಇರುವುದರಿಂದ ಸಂಭಾವ್ಯ ಅಡೆತಡೆಗಳು ಸೂಚಿತವಾಗಿವೆ, ಸೂಕ್ತ ಪರಿಹಾರಗಳ ಅಗತ್ಯವಿದೆ.` : `${y.name} is present, suggesting potential hurdles requiring resilience or traditional remedies.`;
    });
  }

  private static generateRemedies(chart: Horoscope, yogas: YogaResult[], lang: LanguageCode): string[] {
    const remedies: string[] = [];
    
    const debilitated = Object.values(chart.planets).filter(p => p.dignity === "Debilitated");
    debilitated.forEach(p => {
      const pL = translatePlanet(p.name.en, lang);
      remedies.push(lang === 'te' ? `నీచ స్థితిలో ఉన్న ${pL} కొరకు పరిహారం: సంబంధిత మంత్రాలను పఠించడం, ఆ రోజు ఉపవాసం ఉండటం లేదా దానం చేయడం సూచించబడింది.` : lang === 'hi' ? `नीच के ${pL} के लिए उपाय: संबंधित ग्रहों के मंत्रों का जाप, उस दिन उपवास या दान करने की सलाह दी जाती है।` : lang === 'ta' ? `நீசமான ${pL}க்கான பரிகாரம்: குறிப்பிட்ட கிரக மந்திரங்களை உச்சரிப்பது, அந்த நாளில் விரதம் அல்லது தானம் செய்வது பரிந்துரைக்கப்படுகிறது.` : lang === 'kn' ? `ನೀಚ ಸ್ಥಿತಿಯಲ್ಲಿರುವ ${pL}ಗಾಗಿ ಪರಿಹಾರ: ನಿರ್ದಿಷ್ಟ ಗ್ರಹ ಮಂತ್ರಗಳನ್ನು ಪಠಿಸುವುದು, ಆ ದಿನ ಉಪವಾಸ ಅಥವಾ ದಾನ ಮಾಡುವುದನ್ನು ಸೂಚಿಸಲಾಗುತ್ತದೆ.` : `Traditional Vedic remedy for debilitated ${pL}: Consider specific planetary mantras, fasting on associated weekdays, or charity directed to related causes.`);
    });

    if (yogas.some(y => y.id === "kemadruma" && y.detected)) {
      remedies.push(lang === 'te' ? "కేమద్రుమ పరిహారం: శివుని ఆరాధన మరియు శివ పంచాక్షరీ మంత్ర జపం మనస్సును స్థిరంగా ఉంచడానికి సూచించబడింది." : lang === 'hi' ? "केमद्रुम उपाय: भगवान शिव की पूजा और शिव पंचाक्षरी मंत्र का जाप मन को स्थिर करने के लिए अनुशंसित है।" : lang === 'ta' ? "கேமத்ரும பரிகாரம்: மனதை சீராக வைக்க சிவபெருமானை வழிபடுவதும், சிவ பஞ்சாட்சரி மந்திரத்தை உச்சரிப்பதும் பரிந்துரைக்கப்படுகிறது." : lang === 'kn' ? "ಕೇಮದ್ರುಮ ಪರಿಹಾರ: ಮನಸ್ಸನ್ನು ಸ್ಥಿರವಾಗಿಡಲು ಶಿವನ ಆರಾಧನೆ ಮತ್ತು ಶಿವ ಪಂಚಾಕ್ಷರಿ ಮಂತ್ರ ಪಠಣವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ." : "Traditional remedy for Kemadruma: Worship of Lord Shiva and chanting the Shiva Panchakshari Mantra is often recommended to steady the mind.");
    }
    
    if (yogas.some(y => y.id === "daridra_yoga" && y.detected)) {
      remedies.push(lang === 'te' ? "దరిద్ర యోగ పరిహారం: పేదలకు క్రమం తప్పకుండా దానం చేయడం మరియు వ్యక్తిగత ఆర్థిక విషయాలను క్రమబద్ధంగా ఉంచుకోవడం మంచిది." : lang === 'hi' ? "दरिद्र योग उपाय: वंचितों को नियमित दान देना और व्यक्तिगत वित्त के प्रति व्यवस्थित दृष्टिकोण बनाए रखने की सलाह दी जाती है।" : lang === 'ta' ? "தரித்திர யோக பரிகாரம்: ஏழைகளுக்கு தொடர்ந்து தானம் செய்வதும், தனிப்பட்ட நிதிகளை முறையாக கையாளுவதும் அறிவுறுத்தப்படுகிறது." : lang === 'kn' ? "ದರಿದ್ರ ಯೋಗ ಪರಿಹಾರ: ಬಡವರಿಗೆ ನಿಯಮಿತವಾಗಿ ದಾನ ಮಾಡುವುದು ಮತ್ತು ವೈಯಕ್ತಿಕ ಹಣಕಾಸುಗಳನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ನಿರ್ವಹಿಸುವುದು ಉತ್ತಮ." : "Traditional remedy for Daridra Yoga: Regular donations to the underprivileged and maintaining an organized approach to personal finances is advised.");
    }

    if (remedies.length === 0) {
      remedies.push(lang === 'te' ? "తీవ్రమైన సాంప్రదాయ పరిహారాలు అవసరమైన ప్రత్యేకమైన గ్రహ దోషాలు కనుగొనబడలేదు. ధర్మాన్ని పాటించడం మంచిది." : lang === 'hi' ? "गहन पारंपरिक उपायों की आवश्यकता वाले किसी विशिष्ट ग्रह दोष का पता नहीं चला है। धर्म का पालन करने की सलाह दी जाती है।" : lang === 'ta' ? "தீவிரமான பாரம்பரிய பரிகாரங்கள் தேவைப்படும் குறிப்பிட்ட கிரக தோஷங்கள் எதுவும் கண்டறியப்படவில்லை. தர்மத்தை பின்பற்றுவது நல்லது." : lang === 'kn' ? "ತೀವ್ರವಾದ ಸಾಂಪ್ರದಾಯಿಕ ಪರಿಹಾರಗಳ ಅಗತ್ಯವಿರುವ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಗ್ರಹ ದೋಷಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಧರ್ಮವನ್ನು ಪಾಲಿಸುವುದು ಉತ್ತಮ." : "No specific planetary afflictions requiring intense traditional remedies were detected. General mindfulness and adherence to Dharma is recommended.");
    }

    return remedies;
  }
}
