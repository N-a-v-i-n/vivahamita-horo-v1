import { Horoscope, YogaResult, YogaRule, LanguageCode } from "../types/astrology";
import { translatePlanet, translateRashi } from "../utils/translation";

export class YogaEngine {
  private static rules: YogaRule[] = [];

  public static registerRule(rule: YogaRule) {
    this.rules.push(rule);
  }

  public static detectAllYogas(chart: Horoscope, lang: LanguageCode): YogaResult[] {
    const results: YogaResult[] = [];
    for (const rule of this.rules) {
      const result = rule.detect(chart, lang);
      results.push(result);
    }
    return results;
  }
}

// Helpers
function getHouseDistance(fromHouse: number, toHouse: number): number {
  let diff = toHouse - fromHouse;
  if (diff < 0) diff += 12;
  return diff + 1; // 1-indexed (e.g., from 1 to 1 is 1st house, from 1 to 4 is 4th)
}

function isKendra(houseNum: number): boolean {
  return [1, 4, 7, 10].includes(houseNum);
}

function isTrikona(houseNum: number): boolean {
  return [1, 5, 9].includes(houseNum);
}

function isDusthana(houseNum: number): boolean {
  return [6, 8, 12].includes(houseNum);
}

function getLordOfHouse(chart: Horoscope, houseIndex: number): string {
  const house = chart.houses.find(h => h.index === houseIndex);
  return house ? house.lord : "";
}

function getHouseOfPlanet(chart: Horoscope, planetName: string): number {
  return chart.planets[planetName]?.house || -1;
}

function hasMutualAspectOrConjunction(chart: Horoscope, p1: string, p2: string): boolean {
  const h1 = getHouseOfPlanet(chart, p1);
  const h2 = getHouseOfPlanet(chart, p2);
  if (h1 === -1 || h2 === -1) return false;
  if (h1 === h2) return true; // Conjunction
  
  const p1AspectsP2 = chart.aspects.some(a => a.aspectingPlanet === p1 && a.aspectedPlanet === p2);
  const p2AspectsP1 = chart.aspects.some(a => a.aspectingPlanet === p2 && a.aspectedPlanet === p1);
  return p1AspectsP2 && p2AspectsP1; // Mutual Aspect
}

function calculateDignityStrength(dignity: string): number {
  switch (dignity) {
    case "Exalted": return 100;
    case "Moolatrikona": return 90;
    case "Own": return 80;
    case "Friend": return 60;
    case "Neutral": return 50;
    case "Enemy": return 30;
    case "Debilitated": return 10;
    default: return 50;
  }
}

// ------------------------------------------------------------------
// 1. MAJOR YOGAS
// ------------------------------------------------------------------

class GajaKesariRule implements YogaRule {
  id = "gaja_kesari";
  name = "Gaja Kesari Yoga";
  description = "Jupiter is in a Kendra (1, 4, 7, 10) from the Moon.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "గజకేసరి యోగం" : lang === 'hi' ? "गजकेसरी योग" : lang === 'ta' ? "கஜகேசரி யோகம்" : lang === 'kn' ? "ಗಜಕೇಸರಿ ಯೋಗ" : this.name;
    const moon = chart.planets["Moon"];
    const jupiter = chart.planets["Jupiter"];
    if (!moon || !jupiter) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };

    const distance = getHouseDistance(moon.house, jupiter.house);
    if (isKendra(distance)) {
      const str = Math.floor((calculateDignityStrength(moon.dignity) + calculateDignityStrength(jupiter.dignity)) / 2);
      const ev = lang === 'te' ? `గురువు చంద్రుడి నుండి ${distance}వ కేంద్ర స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `गुरु चंद्रमा से ${distance}वें केंद्र में है।` : lang === 'ta' ? `சந்திரனில் இருந்து ${distance}வது கேந்திரத்தில் குரு உள்ளார்.` : lang === 'kn' ? `ಗುರು ಚಂದ್ರನಿಂದ ${distance}ನೇ ಕೇಂದ್ರದಲ್ಲಿದ್ದಾನೆ.` : `Jupiter is in Kendra (house ${distance} from Moon).`;
      return { id: this.id, name: yName, detected: true, strength: str, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class BudhaAdityaRule implements YogaRule {
  id = "budha_aditya";
  name = "Budha Aditya Yoga";
  description = "Sun and Mercury occupy the same sign.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "బుధాదిత్య యోగం" : lang === 'hi' ? "बुधादित्य योग" : lang === 'ta' ? "புதாதித்ய யோகம்" : lang === 'kn' ? "ಬುಧಾದಿತ್ಯ ಯೋಗ" : this.name;
    const sun = chart.planets["Sun"];
    const mercury = chart.planets["Mercury"];
    if (!sun || !mercury) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };

    if (sun.house === mercury.house) {
      const orb = Math.abs(sun.degree - mercury.degree);
      let str = 100 - (orb * 2); 
      if (str < 30) str = 30;
      const signL = translateRashi(sun.rasi.name.en, lang);
      const ev = lang === 'te' ? `సూర్యుడు మరియు బుధుడు ${signL}లో కలిసారు. డిగ్రీల వ్యత్యాసం: ${orb.toFixed(2)}°` : lang === 'hi' ? `सूर्य और बुध ${signL} में युति कर रहे हैं। डिग्री अंतर: ${orb.toFixed(2)}°` : lang === 'ta' ? `சூரியனும் புதனும் ${signL}யில் இணைகின்றன. டிகிரி வித்தியாசம்: ${orb.toFixed(2)}°` : lang === 'kn' ? `ಸೂರ್ಯ ಮತ್ತು ಬುಧ ${signL}ದಲ್ಲಿ ಸೇರಿವೆ. ಡಿಗ್ರಿ ವ್ಯತ್ಯಾಸ: ${orb.toFixed(2)}°` : `Sun and Mercury conjunct in ${signL}. Orb: ${orb.toFixed(2)}°`;
      return { id: this.id, name: yName, detected: true, strength: Math.round(str), evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class ChandraMangalaRule implements YogaRule {
  id = "chandra_mangala";
  name = "Chandra Mangala Yoga";
  description = "Moon and Mars are conjunct or in mutual aspect.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "చంద్ర మంగళ యోగం" : lang === 'hi' ? "चंद्र मंगल योग" : lang === 'ta' ? "சந்திர மங்கள யோகம்" : lang === 'kn' ? "ಚಂದ್ರ ಮಂಗಳ ಯೋಗ" : this.name;
    const moon = chart.planets["Moon"];
    const mars = chart.planets["Mars"];
    if (!moon || !mars) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };

    if (hasMutualAspectOrConjunction(chart, "Moon", "Mars")) {
      const str = Math.floor((calculateDignityStrength(moon.dignity) + calculateDignityStrength(mars.dignity)) / 2);
      const ev = lang === 'te' ? "చంద్రుడు మరియు కుజుడు కలిసారు లేదా ఒకరినొకరు చూసుకుంటున్నారు." : lang === 'hi' ? "चंद्रमा और मंगल युति में हैं या एक दूसरे को देख रहे हैं।" : lang === 'ta' ? "சந்திரனும் செவ்வாயும் இணைகின்றன அல்லது பரஸ்பரம் பார்க்கின்றன." : lang === 'kn' ? "ಚಂದ್ರ ಮತ್ತು ಮಂಗಳ ಜೊತೆಯಾಗಿದ್ದಾರೆ ಅಥವಾ ಪರಸ್ಪರ ನೋಡುತ್ತಿದ್ದಾರೆ." : "Moon and Mars are conjunct or mutually aspecting.";
      return { id: this.id, name: yName, detected: true, strength: str, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class NeechaBhangaRajaRule implements YogaRule {
  id = "neecha_bhanga_raja";
  name = "Neecha Bhanga Raja Yoga";
  description = "Debilitated planet's dispositor is in Kendra from Lagna or Moon.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "నీచభంగ రాజయోగం" : lang === 'hi' ? "नीचभंग राजयोग" : lang === 'ta' ? "நீசபங்க ராஜயோகம்" : lang === 'kn' ? "ನೀಚಭಂಗ ರಾಜಯೋಗ" : this.name;
    const debilitatedPlanets = Object.values(chart.planets).filter(p => p.dignity === "Debilitated");
    const evidence: string[] = [];
    let baseStr = 0;
    
    for (const p of debilitatedPlanets) {
      const dispositorName = chart.houses.find(h => h.signIndex === p.rasiIndex)?.lord;
      if (dispositorName) {
        const dispositor = chart.planets[dispositorName];
        if (dispositor) {
          const distFromLagna = dispositor.house; 
          const distFromMoon = getHouseDistance(chart.planets["Moon"]?.house || 1, dispositor.house);
          if (isKendra(distFromLagna) || isKendra(distFromMoon)) {
            const pL = translatePlanet(p.name.en, lang);
            const dL = translatePlanet(dispositorName, lang);
            const ev = lang === 'te' ? `${pL} నీచ స్థితిలో ఉన్నాడు, కానీ దాని క్షేత్రాధిపతి ${dL} కేంద్రంలో ఉన్నాడు.` : lang === 'hi' ? `${pL} नीच का है, लेकिन उसका स्वामी ${dL} केंद्र में है।` : lang === 'ta' ? `${pL} நீசமாக உள்ளது, ஆனால் அதன் அதிபதி ${dL} கேந்திரத்தில் உள்ளது.` : lang === 'kn' ? `${pL} ನೀಚನಾಗಿದ್ದಾನೆ, ಆದರೆ ಅವನ ಅಧಿಪತಿ ${dL} ಕೇಂದ್ರದಲ್ಲಿದ್ದಾನೆ.` : `${pL} is debilitated, but its dispositor ${dL} is in a Kendra.`;
            evidence.push(ev);
            baseStr = calculateDignityStrength(dispositor.dignity);
          }
        }
      }
    }

    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: baseStr > 50 ? baseStr : 75, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class VipareetaRajaRule implements YogaRule {
  id = "vipareeta_raja";
  name = "Vipareeta Raja Yoga";
  description = "Lords of 6th, 8th, or 12th reside in other dusthanas (6, 8, 12).";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "విపరీత రాజయోగం" : lang === 'hi' ? "विपरीत राजयोग" : lang === 'ta' ? "விபரீத ராஜயோகம்" : lang === 'kn' ? "ವಿಪರೀತ ರಾಜಯೋಗ" : this.name;
    const evidence: string[] = [];
    const dusthanas = [6, 8, 12];
    let str = 0;
    dusthanas.forEach(h => {
      const lordName = getLordOfHouse(chart, h);
      const lordHouse = getHouseOfPlanet(chart, lordName);
      if (lordHouse !== -1 && lordHouse !== h && isDusthana(lordHouse)) {
        const dL = translatePlanet(lordName, lang);
        const ev = lang === 'te' ? `${h}వ అధిపతి (${dL}) ${lordHouse}వ స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `${h}वें भाव का स्वामी (${dL}) ${lordHouse}वें भाव में है।` : lang === 'ta' ? `${h}ஆம் அதிபதி (${dL}) ${lordHouse}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${h}ನೇ ಅಧಿಪತಿ (${dL}) ${lordHouse}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Lord of ${h}th (${dL}) is in ${lordHouse}th house.`;
        evidence.push(ev);
        str = calculateDignityStrength(chart.planets[lordName]?.dignity || "Neutral");
      }
    });

    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: str > 50 ? str : 75, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

// ------------------------------------------------------------------
// 2. PANCHA MAHAPURUSHA YOGAS
// ------------------------------------------------------------------

function createMahapurushaRule(planetName: string, yogaName: string): YogaRule {
  return {
    id: `mahapurusha_${yogaName.toLowerCase()}`,
    name: `${yogaName} Mahapurusha Yoga`,
    description: `${planetName} is in its own sign or exalted, and in a Kendra from Lagna.`,
    ruleMetadata: { version: "Standard Classical", reference: "BPHS" },
    detect(chart: Horoscope, lang: LanguageCode): YogaResult {
      const yName = lang === 'te' ? `${translatePlanet(planetName, lang)} మహాపురుష యోగం` : lang === 'hi' ? `${translatePlanet(planetName, lang)} महापुरुष योग` : lang === 'ta' ? `${translatePlanet(planetName, lang)} மகாபுருஷ யோகம்` : lang === 'kn' ? `${translatePlanet(planetName, lang)} ಮಹಾಪುರುಷ ಯೋಗ` : this.name;
      const p = chart.planets[planetName];
      if (!p) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
      if (isKendra(p.house) && (p.dignity === "Exalted" || p.dignity === "Own")) {
        const str = p.dignity === "Exalted" ? 100 : 85;
        const pL = translatePlanet(planetName, lang);
        const ev = lang === 'te' ? `${pL} తన స్వక్షేత్రంలో లేదా ఉచ్ఛస్థితిలో ${p.house}వ ఇంట్లో (కేంద్రం) ఉన్నాడు.` : lang === 'hi' ? `${pL} अपने भाव में या उच्च का होकर ${p.house}वें भाव (केंद्र) में है।` : lang === 'ta' ? `${pL} சொந்த வீட்டில் அல்லது உச்சத்தில் ${p.house}ஆம் வீட்டில் (கேந்திரம்) உள்ளார்.` : lang === 'kn' ? `${pL} ಸ್ವಂತ ಮನೆಯಲ್ಲಿ ಅಥವಾ ಉಚ್ಚ ಸ್ಥಿತಿಯಲ್ಲಿ ${p.house}ನೇ ಮನೆಯಲ್ಲಿ (ಕೇಂದ್ರ) ಇದ್ದಾನೆ.` : `${planetName} is ${p.dignity} in House ${p.house} (Kendra).`;
        return {
          id: this.id, name: yName, detected: true, strength: str,
          evidence: [ev], rule: this.ruleMetadata
        };
      }
      return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    }
  };
}

// ------------------------------------------------------------------
// 3. PROSPERITY YOGAS
// ------------------------------------------------------------------

class DhanaYogaRule implements YogaRule {
  id = "dhana_yoga";
  name = "Dhana Yoga";
  description = "Connection between lords of wealth (2nd/11th) and trines (1, 5, 9).";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "ధన యోగం" : lang === 'hi' ? "धन योग" : lang === 'ta' ? "தன யோகம்" : lang === 'kn' ? "ಧನ ಯೋಗ" : this.name;
    const wealthLords = [getLordOfHouse(chart, 2), getLordOfHouse(chart, 11)];
    const trineLords = [getLordOfHouse(chart, 1), getLordOfHouse(chart, 5), getLordOfHouse(chart, 9)];
    const evidence: string[] = [];
    let str = 0;

    for (const w of wealthLords) {
      for (const t of trineLords) {
        if (w && t && w !== t) {
          if (hasMutualAspectOrConjunction(chart, w, t)) {
            const wL = translatePlanet(w, lang);
            const tL = translatePlanet(t, lang);
            const ev = lang === 'te' ? `ధన స్థానాధిపతి ${wL} మరియు త్రికోణాధిపతి ${tL} కలిసారు లేదా ఒకరినొకరు చూసుకుంటున్నారు.` : lang === 'hi' ? `धन भाव के स्वामी ${wL} और त्रिकोण के स्वामी ${tL} युति में हैं या एक दूसरे को देख रहे हैं।` : lang === 'ta' ? `தன அதிபதி ${wL} மற்றும் திரிகோண அதிபதி ${tL} இணைகின்றன அல்லது பரஸ்பரம் பார்க்கின்றன.` : lang === 'kn' ? `ಧನ ಅಧಿಪತಿ ${wL} ಮತ್ತು ತ್ರಿಕೋಣ ಅಧಿಪತಿ ${tL} ಜೊತೆಯಾಗಿದ್ದಾರೆ ಅಥವಾ ಪರಸ್ಪರ ನೋಡುತ್ತಿದ್ದಾರೆ.` : `Wealth lord ${w} and Trine lord ${t} are conjunct or mutually aspecting.`;
            evidence.push(ev);
            const wStr = calculateDignityStrength(chart.planets[w]?.dignity || "Neutral");
            const tStr = calculateDignityStrength(chart.planets[t]?.dignity || "Neutral");
            str = Math.max(str, Math.floor((wStr + tStr) / 2));
          }
        }
      }
    }
    
    if (evidence.length > 0) {
      const uniqueEvidence = Array.from(new Set(evidence));
      return { id: this.id, name: yName, detected: true, strength: str || 75, evidence: uniqueEvidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class RajaYogaRule implements YogaRule {
  id = "raja_yoga";
  name = "Raja Yoga";
  description = "Conjunction or mutual aspect between Kendra lords and Trikona lords.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "రాజ యోగం" : lang === 'hi' ? "राज योग" : lang === 'ta' ? "ராஜ யோகம்" : lang === 'kn' ? "ರಾಜ ಯೋಗ" : this.name;
    const kendraLords = [1, 4, 7, 10].map(h => getLordOfHouse(chart, h));
    const trikonaLords = [1, 5, 9].map(h => getLordOfHouse(chart, h));
    const evidence: string[] = [];
    let str = 0;

    for (const k of kendraLords) {
      for (const t of trikonaLords) {
        if (k && t && k !== t) {
          if (hasMutualAspectOrConjunction(chart, k, t)) {
            const kL = translatePlanet(k, lang);
            const tL = translatePlanet(t, lang);
            const ev = lang === 'te' ? `కేంద్రాధిపతి ${kL} మరియు త్రికోణాధిపతి ${tL} కలిసారు లేదా ఒకరినొకరు చూసుకుంటున్నారు.` : lang === 'hi' ? `केंद्र के स्वामी ${kL} और त्रिकोण के स्वामी ${tL} युति में हैं या एक दूसरे को देख रहे हैं।` : lang === 'ta' ? `கேந்திர அதிபதி ${kL} மற்றும் திரிகோண அதிபதி ${tL} இணைகின்றன அல்லது பரஸ்பரம் பார்க்கின்றன.` : lang === 'kn' ? `ಕೇಂದ್ರ ಅಧಿಪತಿ ${kL} ಮತ್ತು ತ್ರಿಕೋಣ ಅಧಿಪತಿ ${tL} ಜೊತೆಯಾಗಿದ್ದಾರೆ ಅಥವಾ ಪರಸ್ಪರ ನೋಡುತ್ತಿದ್ದಾರೆ.` : `Kendra lord ${k} and Trikona lord ${t} are conjunct or mutually aspecting.`;
            evidence.push(ev);
            const kStr = calculateDignityStrength(chart.planets[k]?.dignity || "Neutral");
            const tStr = calculateDignityStrength(chart.planets[t]?.dignity || "Neutral");
            str = Math.max(str, Math.floor((kStr + tStr) / 2));
          }
        }
      }
    }
    
    if (evidence.length > 0) {
      const uniqueEvidence = Array.from(new Set(evidence));
      return { id: this.id, name: yName, detected: true, strength: str || 80, evidence: uniqueEvidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class LakshmiYogaRule implements YogaRule {
  id = "lakshmi_yoga";
  name = "Lakshmi Yoga";
  description = "9th lord in Kendra/Trikona in dignity, and Lagna lord strong.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "లక్ష్మీ యోగం" : lang === 'hi' ? "लक्ष्मी योग" : lang === 'ta' ? "லட்சுமி யோகம்" : lang === 'kn' ? "ಲಕ್ಷ್ಮಿ ಯೋಗ" : this.name;
    const lord9 = getLordOfHouse(chart, 9);
    const lord1 = getLordOfHouse(chart, 1);
    const p9 = chart.planets[lord9];
    const p1 = chart.planets[lord1];

    if (p9 && p1) {
      if ((isKendra(p9.house) || isTrikona(p9.house)) && (p9.dignity === "Exalted" || p9.dignity === "Own") && p1.dignity !== "Debilitated") {
        const str = calculateDignityStrength(p9.dignity);
        const l9L = translatePlanet(lord9, lang);
        const l1L = translatePlanet(lord1, lang);
        const ev = lang === 'te' ? `9వ అధిపతి ${l9L} బలమైన స్థితిలో ఉన్నాడు. లగ్నాధిపతి ${l1L} కూడా మంచి స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `9वें भाव के स्वामी ${l9L} मजबूत स्थिति में हैं। लग्न के स्वामी ${l1L} भी अच्छी स्थिति में हैं।` : lang === 'ta' ? `9ஆம் அதிபதி ${l9L} பலமான நிலையில் உள்ளார். லக்னாதிபதி ${l1L} நல்ல நிலையில் உள்ளார்.` : lang === 'kn' ? `9ನೇ ಅಧಿಪತಿ ${l9L} ಬಲವಾದ ಸ್ಥಿತಿಯಲ್ಲಿದ್ದಾನೆ. ಲಗ್ನಾಧಿಪತಿ ${l1L} ಕೂಡ ಉತ್ತಮ ಸ್ಥಾನದಲ್ಲಿದ್ದಾನೆ.` : `9th Lord ${lord9} is ${p9.dignity} in House ${p9.house}. Lagna Lord ${lord1} is well placed.`;
        return {
          id: this.id, name: yName, detected: true, strength: str,
          evidence: [ev], rule: this.ruleMetadata
        };
      }
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class AdhiYogaRule implements YogaRule {
  id = "adhi_yoga";
  name = "Adhi Yoga";
  description = "Benefics (Mercury, Jupiter, Venus) in 6th, 7th, 8th from Moon or Lagna.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "అధి యోగం" : lang === 'hi' ? "अधि योग" : lang === 'ta' ? "அதி யோகம்" : lang === 'kn' ? "ಅಧಿ ಯೋಗ" : this.name;
    const benefics = ["Mercury", "Jupiter", "Venus"];
    let beneficCount = 0;
    const evidence: string[] = [];
    const moonHouse = chart.planets["Moon"]?.house || 1;
    let totalStr = 0;

    benefics.forEach(b => {
      const p = chart.planets[b];
      if (p) {
        const bL = translatePlanet(b, lang);
        const fromLagna = p.house;
        const fromMoon = getHouseDistance(moonHouse, p.house);
        if ([6, 7, 8].includes(fromLagna)) {
          beneficCount++;
          const ev = lang === 'te' ? `${bL} లగ్నం నుండి ${fromLagna}వ స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `${bL} लग्न से ${fromLagna}वें भाव में है।` : lang === 'ta' ? `${bL} லக்னத்திலிருந்து ${fromLagna}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${bL} ಲಗ್ನದಿಂದ ${fromLagna}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `${b} is in house ${fromLagna} from Lagna.`;
          evidence.push(ev);
          totalStr += calculateDignityStrength(p.dignity);
        } else if ([6, 7, 8].includes(fromMoon)) {
          beneficCount++;
          const ev = lang === 'te' ? `${bL} చంద్రుడి నుండి ${fromMoon}వ స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `${bL} चंद्रमा से ${fromMoon}वें भाव में है।` : lang === 'ta' ? `${bL} சந்திரனிலிருந்து ${fromMoon}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${bL} ಚಂದ್ರನಿಂದ ${fromMoon}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `${b} is in house ${fromMoon} from Moon.`;
          evidence.push(ev);
          totalStr += calculateDignityStrength(p.dignity);
        }
      }
    });

    if (beneficCount >= 2) {
      const avgStr = Math.floor(totalStr / beneficCount);
      return { id: this.id, name: yName, detected: true, strength: avgStr, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

// ------------------------------------------------------------------
// 4. NEGATIVE YOGAS
// ------------------------------------------------------------------

class KemadrumaRule implements YogaRule {
  id = "kemadruma";
  name = "Kemadruma Yoga";
  description = "No planets (except Sun/Nodes) in 2nd and 12th from Moon.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "కేమద్రుమ యోగం" : lang === 'hi' ? "केमद्रुम योग" : lang === 'ta' ? "கேமத்ரும யோகம்" : lang === 'kn' ? "ಕೇಮದ್ರುಮ ಯೋಗ" : this.name;
    const moonHouse = chart.planets["Moon"]?.house;
    if (!moonHouse) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };

    const house2 = (moonHouse % 12) + 1;
    const house12 = (moonHouse + 10) % 12 + 1;
    
    const isExcluded = (name: string) => ["Sun", "Rahu", "Ketu", "Moon"].includes(name);

    const occupants2 = (chart.houses.find(h => h.index === house2)?.occupants || []).filter(o => !isExcluded(o));
    const occupants12 = (chart.houses.find(h => h.index === house12)?.occupants || []).filter(o => !isExcluded(o));

    if (occupants2.length === 0 && occupants12.length === 0) {
      const hasPlanetsInKendraFromLagna = [1, 4, 7, 10].some(h => (chart.houses.find(hh => hh.index === h)?.occupants || []).filter(o => !isExcluded(o)).length > 0);
      
      if (!hasPlanetsInKendraFromLagna) {
        const ev = lang === 'te' ? "చంద్రుడి నుండి 2వ మరియు 12వ స్థానాల్లో గ్రహాలు లేవు, మరియు లగ్న కేంద్రాల నుండి రక్షణ లేదు." : lang === 'hi' ? "चंद्रमा से दूसरे और 12वें भाव में कोई ग्रह नहीं है, और लग्न केंद्रों से कोई बचाव नहीं है।" : lang === 'ta' ? "சந்திரனிலிருந்து 2 மற்றும் 12 ஆம் வீடுகளில் கிரகங்கள் இல்லை, லக்ன கேந்திரங்களிலிருந்தும் பாதுகாப்பு இல்லை." : lang === 'kn' ? "ಚಂದ್ರನಿಂದ 2ನೇ ಮತ್ತು 12ನೇ ಮನೆಯಲ್ಲಿ ಗ್ರಹಗಳಿಲ್ಲ, ಮತ್ತು ಲಗ್ನ ಕೇಂದ್ರಗಳಿಂದ ಯಾವುದೇ ರಕ್ಷಣೆ ಇಲ್ಲ." : "No planets in 2nd and 12th from Moon, and no cancellation from Lagna Kendras.";
        return {
          id: this.id, name: yName, detected: true, strength: 100, 
          evidence: [ev], rule: this.ruleMetadata
        };
      }
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class DaridraYogaRule implements YogaRule {
  id = "daridra_yoga";
  name = "Daridra Yoga";
  description = "Lords of 2nd/11th situated in 6th, 8th, or 12th house.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "దరిద్ర యోగం" : lang === 'hi' ? "दरिद्र योग" : lang === 'ta' ? "தரித்திர யோகம்" : lang === 'kn' ? "ದರಿದ್ರ ಯೋಗ" : this.name;
    const lords = [getLordOfHouse(chart, 2), getLordOfHouse(chart, 11)];
    const evidence: string[] = [];
    let str = 0;
    
    lords.forEach(l => {
      const house = getHouseOfPlanet(chart, l);
      if (isDusthana(house)) {
        const lL = translatePlanet(l, lang);
        const ev = lang === 'te' ? `ధనాధిపతి ${lL} దుస్థానం (6, 8, 12) ${house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `धन स्वामी ${lL} दुस्थान (6, 8, 12) ${house}वें भाव में है।` : lang === 'ta' ? `தன அதிபதி ${lL} துஸ்தானமான ${house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `ಧನಾಧಿಪತಿ ${lL} ದುಸ್ಥಾನವಾದ ${house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Wealth lord ${l} is placed in dusthana house ${house}.`;
        evidence.push(ev);
        const pStr = calculateDignityStrength(chart.planets[l]?.dignity || "Neutral");
        str = Math.max(str, 100 - pStr);
      }
    });

    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: str || 70, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class GuruChandalRule implements YogaRule {
  id = "guru_chandal";
  name = "Guru Chandal Yoga";
  description = "Jupiter conjunct Rahu or Ketu.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "గురు చండాల యోగం" : lang === 'hi' ? "गुरु चांडाल योग" : lang === 'ta' ? "குரு சண்டாள யோகம்" : lang === 'kn' ? "ಗುರು ಚಾಂಡಾಲ ಯೋಗ" : this.name;
    const ju = chart.planets["Jupiter"];
    if (!ju) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    
    const ra = chart.planets["Rahu"]?.house;
    const ke = chart.planets["Ketu"]?.house;

    const baseStr = 100 - calculateDignityStrength(ju.dignity);

    if (ju.house === ra) {
      const ev = lang === 'te' ? `గురువు రాహువుతో కలిసి ${ju.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `गुरु राहु के साथ ${ju.house}वें भाव में युति कर रहे हैं।` : lang === 'ta' ? `குரு ராகுவுடன் இணைந்து ${ju.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `ಗುರು ರಾಹುವಿನೊಂದಿಗೆ ಸೇರಿ ${ju.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Jupiter conjunct Rahu in House ${ju.house}.`;
      return { id: this.id, name: yName, detected: true, strength: baseStr, evidence: [ev], rule: this.ruleMetadata };
    }
    if (ju.house === ke) {
      const ev = lang === 'te' ? `గురువు కేతువుతో కలిసి ${ju.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `गुरु केतु के साथ ${ju.house}वें भाव में युति कर रहे हैं।` : lang === 'ta' ? `குரு கேதுவுடன் இணைந்து ${ju.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `ಗುರು ಕೇತುವಿನೊಂದಿಗೆ ಸೇರಿ ${ju.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Jupiter conjunct Ketu in House ${ju.house}.`;
      return { id: this.id, name: yName, detected: true, strength: baseStr, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

class ShakataRule implements YogaRule {
  id = "shakata_yoga";
  name = "Shakata Yoga";
  description = "Moon in 6th or 8th from Jupiter.";
  ruleMetadata = { version: "Standard Classical", reference: "BPHS" };

  detect(chart: Horoscope, lang: LanguageCode): YogaResult {
    const yName = lang === 'te' ? "శకట యోగం" : lang === 'hi' ? "शकट योग" : lang === 'ta' ? "சகட யோகம்" : lang === 'kn' ? "ಶಕಟ ಯೋಗ" : this.name;
    const moon = chart.planets["Moon"];
    const ju = chart.planets["Jupiter"];
    if (!moon || !ju) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    
    const dist = getHouseDistance(ju.house, moon.house);
    if (dist === 6 || dist === 8) {
      const moonStr = calculateDignityStrength(moon.dignity);
      const str = 100 - moonStr; 
      const ev = lang === 'te' ? `చంద్రుడు గురువు నుండి ${dist}వ స్థానంలో ఉన్నాడు.` : lang === 'hi' ? `चंद्रमा गुरु से ${dist}वें भाव में है।` : lang === 'ta' ? `சந்திரன் குருவிலிருந்து ${dist}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `ಚಂದ್ರ ಗುರುವಿನಿಂದ ${dist}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Moon is in house ${dist} from Jupiter.`;
      return { id: this.id, name: yName, detected: true, strength: str > 20 ? str : 50, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
}

// ------------------------------------------------------------------
// REGISTER ALL
// ------------------------------------------------------------------

YogaEngine.registerRule(new GajaKesariRule());
YogaEngine.registerRule(new BudhaAdityaRule());
YogaEngine.registerRule(new ChandraMangalaRule());
YogaEngine.registerRule(new NeechaBhangaRajaRule());
YogaEngine.registerRule(new VipareetaRajaRule());

YogaEngine.registerRule(createMahapurushaRule("Mars", "Ruchaka"));
YogaEngine.registerRule(createMahapurushaRule("Mercury", "Bhadra"));
YogaEngine.registerRule(createMahapurushaRule("Jupiter", "Hamsa"));
YogaEngine.registerRule(createMahapurushaRule("Venus", "Malavya"));
YogaEngine.registerRule(createMahapurushaRule("Saturn", "Sasa"));

YogaEngine.registerRule(new DhanaYogaRule());
YogaEngine.registerRule(new RajaYogaRule());
YogaEngine.registerRule(new LakshmiYogaRule());
YogaEngine.registerRule(new AdhiYogaRule());

YogaEngine.registerRule(new KemadrumaRule());
YogaEngine.registerRule(new DaridraYogaRule());
YogaEngine.registerRule(new GuruChandalRule());
YogaEngine.registerRule(new ShakataRule());
