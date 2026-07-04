import { Horoscope, DoshaResult, LanguageCode } from "../types/astrology";
import { translatePlanet } from "../utils/translation";

export interface DoshaRule {
  id: string;
  name: string;
  description: string;
  detect(chart: Horoscope, lang: LanguageCode): DoshaResult;
}

export class DoshaEngine {
  private static get rules(): DoshaRule[] {
    return [
      new KujaDoshaRule(),
      new KalaSarpaDoshaRule(),
      new PitraDoshaRule(),
      new GrahanDoshaRule(),
      new ShaniDoshaRule()
    ];
  }

  public static detectAllDoshas(chart: Horoscope, lang: LanguageCode = "en"): DoshaResult[] {
    return this.rules.map(rule => rule.detect(chart, lang));
  }
}

// Localized dosha names
const DOSHA_NAMES: Record<string, Record<LanguageCode, string>> = {
  kuja_dosha: { en: "Kuja Dosha (Manglik)", te: "కుజ దోషం (మాంగలిక్)", hi: "कुज दोष (मांगलिक)", ta: "செவ்வாய் தோஷம் (மாங்கல்யம்)", kn: "ಕುಜ ದೋಷ (ಮಾಂಗಲಿಕ)" },
  kala_sarpa: { en: "Kala Sarpa Dosha", te: "కాల సర్ప దోషం", hi: "काल सर्प दोष", ta: "கால சர்ப்ப தோஷம்", kn: "ಕಾಲ ಸರ್ಪ ದೋಷ" },
  pitra_dosha: { en: "Pitra Dosha", te: "పితృ దోషం", hi: "पितृ दोष", ta: "பித்ரு தோஷம்", kn: "ಪಿತೃ ದೋಷ" },
  grahan_dosha: { en: "Grahan Dosha", te: "గ్రహణ దోషం", hi: "ग्रहण दोष", ta: "கிரகண தோஷம்", kn: "ಗ್ರಹಣ ದೋಷ" },
  shani_dosha: { en: "Shani Dosha", te: "శని దోషం", hi: "शनि दोष", ta: "சனி தோஷம்", kn: "ಶನಿ ದೋಷ" }
};

function getDoshaName(id: string, lang: LanguageCode): string {
  return DOSHA_NAMES[id]?.[lang] || DOSHA_NAMES[id]?.en || id;
}

// --- Dosha Implementations ---

class KujaDoshaRule implements DoshaRule {
  id = "kuja_dosha";
  name = "Kuja Dosha (Manglik)";
  description = "Mars placed in 1st, 2nd, 4th, 7th, 8th, or 12th house from Ascendant.";

  detect(chart: Horoscope, lang: LanguageCode): DoshaResult {
    const mars = chart.planets["Mars"];
    const jupiter = chart.planets["Jupiter"];
    const doshaName = getDoshaName(this.id, lang);
    if (!mars) return this.negativeResult(lang);

    const manglikHouses = [1, 2, 4, 7, 8, 12];
    let detected = manglikHouses.includes(mars.house);
    let cancellation = false;
    let severity = detected ? 100 : 0;
    const evidence: string[] = [];
    const remedies: string[] = [];
    const mL = translatePlanet("Mars", lang);

    if (detected) {
      evidence.push(lang === 'te' ? `${mL} ${mars.house}వ ఇంట్లో ఉన్నాడు.` : lang === 'hi' ? `${mL} ${mars.house}वें भाव में है।` : lang === 'ta' ? `${mL} ${mars.house}ஆம் வீட்டில் உள்ளார்.` : lang === 'kn' ? `${mL} ${mars.house}ನೇ ಮನೆಯಲ್ಲಿದ್ದಾನೆ.` : `Mars is placed in house ${mars.house}.`);

      if (mars.dignity === "Own") {
        cancellation = true;
        evidence.push(lang === 'te' ? "రద్దు: కుజుడు స్వగృహంలో ఉన్నాడు." : lang === 'hi' ? "निरस्त: मंगल स्वराशि में है।" : lang === 'ta' ? "ரத்து: செவ்வாய் சொந்த ராசியில் உள்ளார்." : lang === 'kn' ? "ರದ್ದು: ಮಂಗಳ ಸ್ವಗೃಹದಲ್ಲಿದ್ದಾನೆ." : "Cancellation: Mars is in its own sign.");
      }
      
      const jupAspecting = chart.aspects.some(a => a.aspectingPlanet === "Jupiter" && a.aspectedPlanet === "Mars");
      if (jupAspecting) {
        cancellation = true;
        const jL = translatePlanet("Jupiter", lang);
        evidence.push(lang === 'te' ? `రద్దు: ${jL} ${mL}ను చూస్తున్నాడు.` : lang === 'hi' ? `निरस्त: ${jL} ${mL} को देख रहा है।` : lang === 'ta' ? `ரத்து: ${jL} ${mL}ஐ பார்க்கிறார்.` : lang === 'kn' ? `ರದ್ದು: ${jL} ${mL}ನನ್ನು ನೋಡುತ್ತಿದ್ದಾನೆ.` : "Cancellation: Jupiter is aspecting Mars.");
      }

      if (mars.dignity === "Exalted") {
        cancellation = true;
        evidence.push(lang === 'te' ? "రద్దు: కుజుడు ఉచ్చ స్థితిలో ఉన్నాడు." : lang === 'hi' ? "निरस्त: मंगल उच्च राशि में है।" : lang === 'ta' ? "ரத்து: செவ்வாய் உச்ச நிலையில் உள்ளார்." : lang === 'kn' ? "ರದ್ದು: ಮಂಗಳ ಉಚ್ಚ ಸ್ಥಿತಿಯಲ್ಲಿದ್ದಾನೆ." : "Cancellation: Mars is exalted.");
      }

      if (cancellation) {
        severity = 20;
      } else {
        remedies.push(lang === 'te' ? "వివాహానికి ముందు కుంభ వివాహం లేదా కుజ శాంతి హోమం సాంప్రదాయకంగా సిఫార్సు చేయబడింది." : lang === 'hi' ? "विवाह से पहले कुंभ विवाह या कुज शांति होमम की सलाह दी जाती है।" : lang === 'ta' ? "திருமணத்திற்கு முன் கும்ப விவாகம் அல்லது குஜ சாந்தி ஹோமம் பரிந்துரைக்கப்படுகிறது." : lang === 'kn' ? "ಮದುವೆಗೆ ಮುನ್ನ ಕುಂಭ ವಿವಾಹ ಅಥವಾ ಕುಜ ಶಾಂತಿ ಹೋಮ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ." : "Kumbha Vivaham or specific Mars (Kuja) shanti homam is traditionally recommended before marriage.");
      }
    }

    return { id: this.id, name: doshaName, detected, severity, cancellation, evidence, remedies };
  }

  private negativeResult(lang: LanguageCode): DoshaResult {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
}

class KalaSarpaDoshaRule implements DoshaRule {
  id = "kala_sarpa";
  name = "Kala Sarpa Dosha";
  description = "All seven physical planets are hemmed between Rahu and Ketu.";

  detect(chart: Horoscope, lang: LanguageCode): DoshaResult {
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    
    if (!rahu || !ketu) return this.negativeResult(lang);

    const others = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].map(p => chart.planets[p]);
    
    let r1 = rahu.longitude;
    let allBetweenRahuKetu = true;
    let allBetweenKetuRahu = true;

    for (const p of others) {
      if (!p) continue;
      let diffRahu = (p.longitude - r1 + 360) % 360;
      if (diffRahu > 180) allBetweenRahuKetu = false;
      if (diffRahu < 180) allBetweenKetuRahu = false;
    }

    const detected = allBetweenRahuKetu || allBetweenKetuRahu;
    let cancellation = false;
    let severity = detected ? 100 : 0;
    const evidence: string[] = [];
    const remedies: string[] = [];

    if (detected) {
      evidence.push(lang === 'te' ? "అన్ని గ్రహాలు రాహు-కేతు అక్షం మధ్య ఉన్నాయి." : lang === 'hi' ? "सभी ग्रह राहु-केतु अक्ष के बीच हैं।" : lang === 'ta' ? "அனைத்து கிரகங்களும் ராகு-கேது அச்சுக்கு இடையில் உள்ளன." : lang === 'kn' ? "ಎಲ್ಲ ಗ್ರಹಗಳು ರಾಹು-ಕೇತು ಅಕ್ಷದ ನಡುವೆ ಇವೆ." : "All physical planets are hemmed between Rahu and Ketu axis.");
      remedies.push(lang === 'te' ? "శ్రీ కాళహస్తి లేదా త్రయంబకేశ్వర్‌లో కాల సర్ప శాంతి పూజ సిఫార్సు." : lang === 'hi' ? "श्री कालहस्ती या त्र्यंबकेश्वर में काल सर्प शांति पूजा की सलाह।" : lang === 'ta' ? "ஸ்ரீ காளஹஸ்தி அல்லது திரியம்பகேஸ்வரர் கோவிலில் கால சர்ப்ப சாந்தி பூஜை பரிந்துரை." : lang === 'kn' ? "ಶ್ರೀ ಕಾಳಹಸ್ತಿ ಅಥವಾ ತ್ರಯಂಬಕೇಶ್ವರದಲ್ಲಿ ಕಾಲ ಸರ್ಪ ಶಾಂತಿ ಪೂಜೆ ಶಿಫಾರಸು." : "Kala Sarpa shanti pooja at Sri Kalahasti or Trimbakeshwar is traditionally recommended.");
    }

    return { id: this.id, name: doshaName, detected, severity, cancellation, evidence, remedies };
  }

  private negativeResult(lang: LanguageCode): DoshaResult {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
}

class PitraDoshaRule implements DoshaRule {
  id = "pitra_dosha";
  name = "Pitra Dosha";
  description = "Sun or 9th lord under severe affliction by Rahu/Ketu.";
  detect(chart: Horoscope, lang: LanguageCode): DoshaResult {
    const sun = chart.planets["Sun"];
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    
    if (!sun || !rahu || !ketu) return this.negativeResult(lang);

    const sunRahuConj = sun.house === rahu.house;
    const sunKetuConj = sun.house === ketu.house;
    
    const detected = sunRahuConj || sunKetuConj;
    const evidence: string[] = [];
    const sL = translatePlanet("Sun", lang);
    const rL = translatePlanet("Rahu", lang);
    const kL = translatePlanet("Ketu", lang);
    if (sunRahuConj) evidence.push(lang === 'te' ? `${sL} ${rL}తో కలిసి ఉన్నాడు.` : lang === 'hi' ? `${sL} ${rL} के साथ युति है।` : lang === 'ta' ? `${sL} ${rL}உடன் இணைந்துள்ளார்.` : lang === 'kn' ? `${sL} ${rL} ಜೊತೆ ಇದ್ದಾನೆ.` : "Sun is conjunct Rahu.");
    if (sunKetuConj) evidence.push(lang === 'te' ? `${sL} ${kL}తో కలిసి ఉన్నాడు.` : lang === 'hi' ? `${sL} ${kL} के साथ युति है।` : lang === 'ta' ? `${sL} ${kL}உடன் இணைந்துள்ளார்.` : lang === 'kn' ? `${sL} ${kL} ಜೊತೆ ಇದ್ದಾನೆ.` : "Sun is conjunct Ketu.");

    return {
      id: this.id, name: doshaName, detected,
      severity: detected ? 80 : 0, cancellation: false, evidence,
      remedies: detected ? [lang === 'te' ? "పితృ తర్పణం చేయండి, ముఖ్యంగా అమావాస్య రోజుల్లో." : lang === 'hi' ? "पितृ तर्पण करें, विशेषकर अमावस्या के दिनों में।" : lang === 'ta' ? "பித்ரு தர்ப்பணம் செய்யுங்கள், குறிப்பாக அமாவாசை நாட்களில்." : lang === 'kn' ? "ಪಿತೃ ತರ್ಪಣ ಮಾಡಿ, ವಿಶೇಷವಾಗಿ ಅಮಾವಾಸ್ಯೆ ದಿನಗಳಲ್ಲಿ." : "Perform Pitru Tarpanam, especially on Amavasya days."] : []
    };
  }
  private negativeResult(lang: LanguageCode): DoshaResult { return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] }; }
}

class GrahanDoshaRule implements DoshaRule {
  id = "grahan_dosha";
  name = "Grahan Dosha";
  description = "Sun or Moon conjunct Rahu or Ketu.";
  detect(chart: Horoscope, lang: LanguageCode): DoshaResult {
    const sun = chart.planets["Sun"];
    const moon = chart.planets["Moon"];
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    
    if (!sun || !moon || !rahu || !ketu) return this.negativeResult(lang);

    const sunAffliction = sun.house === rahu.house || sun.house === ketu.house;
    const moonAffliction = moon.house === rahu.house || moon.house === ketu.house;
    
    const detected = sunAffliction || moonAffliction;
    const evidence: string[] = [];
    const sL = translatePlanet("Sun", lang);
    const mL = translatePlanet("Moon", lang);
    if (sunAffliction) evidence.push(lang === 'te' ? `${sL} నోడ్‌ల వల్ల పీడించబడ్డాడు.` : lang === 'hi' ? `${sL} राहु/केतु से पीड़ित है।` : lang === 'ta' ? `${sL} ராகு/கேதுவால் பாதிக்கப்பட்டுள்ளார்.` : lang === 'kn' ? `${sL} ರಾಹು/ಕೇತುವಿನಿಂದ ಪೀಡಿತನಾಗಿದ್ದಾನೆ.` : "Sun is afflicted by Nodes.");
    if (moonAffliction) evidence.push(lang === 'te' ? `${mL} నోడ్‌ల వల్ల పీడించబడ్డాడు.` : lang === 'hi' ? `${mL} राहु/केतु से पीड़ित है।` : lang === 'ta' ? `${mL} ராகு/கேதுவால் பாதிக்கப்பட்டுள்ளார்.` : lang === 'kn' ? `${mL} ರಾಹು/ಕೇತುವಿನಿಂದ ಪೀಡಿತನಾಗಿದ್ದಾನೆ.` : "Moon is afflicted by Nodes.");

    return {
      id: this.id, name: doshaName, detected,
      severity: detected ? 70 : 0, cancellation: false, evidence,
      remedies: detected ? [lang === 'te' ? "శివుని లేదా సూర్యుని ఆరాధించండి, పేదలకు దానం చేయండి." : lang === 'hi' ? "शिव या सूर्य की पूजा करें, जरूरतमंदों को दान करें।" : lang === 'ta' ? "சிவனையோ சூரியனையோ வழிபடுங்கள், ஏழைகளுக்கு தானம் செய்யுங்கள்." : lang === 'kn' ? "ಶಿವ ಅಥವಾ ಸೂರ್ಯನನ್ನು ಆರಾಧಿಸಿ, ಬಡವರಿಗೆ ದಾನ ಮಾಡಿ." : "Worship Shiva or Surya, and donate to the needy."] : []
    };
  }
  private negativeResult(lang: LanguageCode): DoshaResult { return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] }; }
}

class ShaniDoshaRule implements DoshaRule {
  id = "shani_dosha";
  name = "Shani Dosha";
  description = "Saturn in debilitation (Aries) or enemy signs with affliction.";
  detect(chart: Horoscope, lang: LanguageCode): DoshaResult {
    const saturn = chart.planets["Saturn"];
    const doshaName = getDoshaName(this.id, lang);
    if (!saturn) return this.negativeResult(lang);

    const detected = saturn.dignity === "Debilitated";
    const evidence: string[] = [];
    const satL = translatePlanet("Saturn", lang);
    if (detected) evidence.push(lang === 'te' ? `${satL} మేషంలో నీచ స్థితిలో ఉన్నాడు.` : lang === 'hi' ? `${satL} मेष में नीच है।` : lang === 'ta' ? `${satL} மேஷத்தில் நீசம் அடைந்துள்ளார்.` : lang === 'kn' ? `${satL} ಮೇಷದಲ್ಲಿ ನೀಚನಾಗಿದ್ದಾನೆ.` : "Saturn is debilitated in Aries.");

    return {
      id: this.id, name: doshaName, detected,
      severity: detected ? 60 : 0, cancellation: false, evidence,
      remedies: detected ? [lang === 'te' ? "హనుమంతుని ఆరాధించండి, శనివారాల్లో నువ్వుల నూనె సమర్పించండి." : lang === 'hi' ? "हनुमान की पूजा करें, शनिवार को तिल का तेल चढ़ाएं।" : lang === 'ta' ? "ஹனுமானை வழிபடுங்கள், சனிக்கிழமைகளில் எள் எண்ணெய் சமர்ப்பிக்கவும்." : lang === 'kn' ? "ಹನುಮಂತನನ್ನು ಆರಾಧಿಸಿ, ಶನಿವಾರ ಎಳ್ಳೆಣ್ಣೆ ಅರ್ಪಿಸಿ." : "Worship Hanuman, offer sesame oil on Saturdays."] : []
    };
  }
  private negativeResult(lang: LanguageCode): DoshaResult { return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] }; }
}
