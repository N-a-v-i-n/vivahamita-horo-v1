import { AnalysisContext, NarrativeOutput, ExplainableSection } from '../models/types';
import templates from '../data/templates.json';
import signs from '../data/signs.json';
import houses from '../data/houses.json';
import planets from '../data/planets.json';

export class NarrativeEngine {
  public generate(context: AnalysisContext, langCode: string = 'en'): NarrativeOutput {
    const { facts, raw } = context;

    const translateReason = (r: string, l: string) => {
      if (l === 'en') return r;
      if (r.includes('Dusthana (6th house)')) {
        if (l==='te') return 'దుస్థానంలో ఉంది (6వ ఇల్లు)';
        if (l==='kn') return 'ದುಸ್ಥಾನದಲ್ಲಿದೆ (6ನೇ ಮನೆ)';
        if (l==='ta') return 'துஸ்தானத்தில் உள்ளது (6 ஆம் வீடு)';
        if (l==='hi') return 'दुस्थान में है (छठा भाव)';
      }
      if (r.includes('Dusthana (8th house)')) {
        if (l==='te') return 'దుస్థానంలో ఉంది (8వ ఇల్లు)';
        if (l==='kn') return 'ದುಸ್ಥಾನದಲ್ಲಿದೆ (8ನೇ ಮನೆ)';
        if (l==='ta') return 'துஸ்தானத்தில் உள்ளது (8 ஆம் வீடு)';
        if (l==='hi') return 'दुस्थान में है (आठवां भाव)';
      }
      if (r.includes('Dusthana (12th house)')) {
        if (l==='te') return 'దుస్థానంలో ఉంది (12వ ఇల్లు)';
        if (l==='kn') return 'ದುಸ್ಥಾನದಲ್ಲಿದೆ (12ನೇ ಮನೆ)';
        if (l==='ta') return 'துஸ்தானத்தில் உள்ளது (12 ஆம் வீடு)';
        if (l==='hi') return 'दुस्थान में है (बारहवां भाव)';
      }
      if (r.includes('Kendra')) {
        const h = r.match(/\((\d+)th house\)/)?.[1];
        if (l==='te') return `కేంద్రంలో ఉంది (${h}వ ఇల్లు)`;
        if (l==='kn') return `ಕೇಂದ್ರದಲ್ಲಿದೆ (${h}ನೇ ಮನೆ)`;
        if (l==='ta') return `கேந்திரத்தில் உள்ளது (${h} ஆம் வீடு)`;
        if (l==='hi') return `केंद्र में है (${h} भाव)`;
      }
      if (r.includes('Trikona')) {
        const h = r.match(/\((\d+)th house\)/)?.[1];
        if (l==='te') return `త్రికోణంలో ఉంది (${h}వ ఇల్లు)`;
        if (l==='kn') return `ತ್ರಿಕೋಣದಲ್ಲಿದೆ (${h}ನೇ ಮನೆ)`;
        if (l==='ta') return `திரிகோணத்தில் உள்ளது (${h} ஆம் வீடு)`;
        if (l==='hi') return `त्रिकोण में है (${h} भाव)`;
      }
      if (r.includes('Vargottama')) {
        if (l==='te') return 'వర్గోత్తమ (D1 మరియు D9 లో ఒకే రాశి)';
        if (l==='kn') return 'ವರ್ಗೋತ್ತಮ (D1 ಮತ್ತು D9 ನಲ್ಲಿ ಒಂದೇ ರಾಶಿ)';
        if (l==='ta') return 'வர்கோத்தமம் (D1 மற்றும் D9 இல் ஒரே ராசி)';
        if (l==='hi') return 'वर्गोत्तम (D1 और D9 में एक ही राशि)';
      }
      if (r.includes('exalted')) {
        const p = r.split(' ')[0];
        const s = r.split(' ').pop();
        if (l==='te') return `${p} ${s}లో ఉచ్ఛస్థితిలో ఉంది`;
        if (l==='kn') return `${p} ${s} ನಲ್ಲಿ ಉಚ್ಚಸ್ಥಿತಿಯಲ್ಲಿದೆ`;
        if (l==='ta') return `${p} ${s} இல் உச்சம் பெற்றுள்ளது`;
        if (l==='hi') return `${p} ${s} में उच्च का है`;
      }
      if (r.includes('debilitated')) {
        const p = r.split(' ')[0];
        const s = r.split(' ').pop();
        if (l==='te') return `${p} ${s}లో నీచస్థితిలో ఉంది`;
        if (l==='kn') return `${p} ${s} ನಲ್ಲಿ ನೀಚಸ್ಥಿತಿಯಲ್ಲಿದೆ`;
        if (l==='ta') return `${p} ${s} இல் நீச்சம் பெற்றுள்ளது`;
        if (l==='hi') return `${p} ${s} में नीच का है`;
      }
      if (r.includes('own sign')) {
        const p = r.split(' ')[0];
        const s = r.split(' ').pop();
        if (l==='te') return `${p} దాని స్వంత రాశి ${s}లో ఉంది`;
        if (l==='kn') return `${p} ತನ್ನ ಸ್ವಂತ ರಾಶಿ ${s} ನಲ್ಲಿದೆ`;
        if (l==='ta') return `${p} அதன் சொந்த ராசியான ${s} இல் உள்ளது`;
        if (l==='hi') return `${p} अपनी स्वराशि ${s} में है`;
      }
      return r;
    };

    const buildPersonality = (): ExplainableSection => {
      const lagnaLord = raw.panchanga.lagnaLord;
      const llStatus = facts.planets[lagnaLord];
      const llPos = raw.planetaryTable.find(p => p.planet === lagnaLord);

      if (!llPos || !llStatus) {
        let text = "Insufficient data for personality analysis.";
        if (langCode === 'te') text = "వ్యక్తిత్వ విశ్లేషణకు తగినంత డేటా లేదు.";
        if (langCode === 'ta') text = "ஆளுமை பகுப்பாய்விற்கு போதிய தரவு இல்லை.";
        if (langCode === 'hi') text = "व्यक्तित्व विश्लेषण के लिए अपर्याप्त डेटा।";
        if (langCode === 'kn') text = "ವ್ಯಕ್ತಿತ್ವ ವಿಶ್ಲೇಷಣೆಗೆ ಸಾಕಷ್ಟು ಡೇಟಾ ಇಲ್ಲ.";
        return { text, confidence: "Low", derivedFrom: [] };
      }

      // Hardcode mapped themes for localization to prevent English keywords injection
      const planetCore: Record<string, any> = {
        "Sun": { en: "your soul", te: "మీ ఆత్మ", ta: "உங்கள் ஆன்மா", hi: "आपकी आत्मा", kn: "ನಿಮ್ಮ ಆತ್ಮ" },
        "Moon": { en: "your mind", te: "మీ మనస్సు", ta: "உங்கள் மனம்", hi: "आपका मन", kn: "ನಿಮ್ಮ ಮನಸ್ಸು" },
        "Mars": { en: "your energy", te: "మీ శక్తి", ta: "உங்கள் ஆற்றல்", hi: "आपकी ऊर्जा", kn: "ನಿಮ್ಮ ಶಕ್ತಿ" },
        "Mercury": { en: "your intellect", te: "మీ తెలివితేటలు", ta: "உங்கள் புத்திசாலித்தனம்", hi: "आपकी बुद्धि", kn: "ನಿಮ್ಮ ಬುದ್ಧಿಶಕ್ತಿ" },
        "Jupiter": { en: "your wisdom", te: "మీ జ్ఞానం", ta: "உங்கள் ஞானம்", hi: "आपका ज्ञान", kn: "ನಿಮ್ಮ ಬುದ್ಧಿವಂತಿಕೆ" },
        "Venus": { en: "your love", te: "మీ ప్రేమ", ta: "உங்கள் காதல்", hi: "आपका प्रेम", kn: "ನಿಮ್ಮ ಪ್ರೀತಿ" },
        "Saturn": { en: "your karma", te: "మీ కర్మ", ta: "உங்கள் கர்மா", hi: "आपका कर्म", kn: "ನಿಮ್ಮ ಕರ್ಮ" },
        "Rahu": { en: "your ambitions", te: "మీ ఆశయాలు", ta: "உங்கள் லட்சியங்கள்", hi: "आपकी महत्वाकांक्षाएं", kn: "ನಿಮ್ಮ ಮಹತ್ವಾಕಾಂಕ್ಷೆಗಳು" },
        "Ketu": { en: "your intuition", te: "మీ అంతర్ దృష్టి", ta: "உங்கள் உள்ளுணர்வு", hi: "आपका अंतर्ज्ञान", kn: "ನಿಮ್ಮ ಅಂತಃಪ್ರಜ್ಞೆ" }
      };

      const houseThemes: Record<string, any> = {
        "1": { en: "self, personality, vitality", te: "స్వయం, వ్యక్తిత్వం, జీవశక్తి", ta: "சுயம், ஆளுமை, உயிர்ச்சக்தி", hi: "स्वयं, व्यक्तित्व, जीवन शक्ति", kn: "ಸ್ವಯಂ, ವ್ಯಕ್ತಿತ್ವ, ಚೈತನ್ಯ" },
        "2": { en: "wealth, family, speech", te: "సంపద, కుటుంబం, ప్రసంగం", ta: "செல்வம், குடும்பம், பேச்சு", hi: "धन, परिवार, वाणी", kn: "ಸಂಪತ್ತು, ಕುಟುಂಬ, ಮಾತು" },
        "3": { en: "courage, siblings, communication", te: "ధైర్యం, తోబుట్టువులు, కమ్యూనికేషన్", ta: "தைரியம், உடன்பிறப்புகள், தொடர்பு", hi: "साहस, भाई-बहन, संचार", kn: "ಧೈರ್ಯ, ಒಡಹುಟ್ಟಿದವರು, ಸಂವಹನ" },
        "4": { en: "home, mother, happiness", te: "ఇల్లు, తల్లి, ఆనందం", ta: "வீடு, தாய், மகிழ்ச்சி", hi: "घर, माता, खुशी", kn: "ಮನೆ, ತಾಯಿ, ಸಂತೋಷ" },
        "5": { en: "creativity, children, intelligence", te: "సృజనాత్మకత, పిల్లలు, తెలివితేటలు", ta: "படைப்பாற்றல், குழந்தைகள், நுண்ணறிவு", hi: "रचनात्मकता, बच्चे, बुद्धिमत्ता", kn: "ಸೃಜನಶೀಲತೆ, ಮಕ್ಕಳು, ಬುದ್ಧಿವಂತಿಕೆ" },
        "6": { en: "health, enemies, service", te: "ఆరోగ్యం, శత్రువులు, సేవ", ta: "ஆரோக்கியம், எதிரிகள், சேவை", hi: "स्वास्थ्य, शत्रु, सेवा", kn: "ಆರೋಗ್ಯ, ಶತ್ರುಗಳು, ಸೇವೆ" },
        "7": { en: "partnerships, marriage, business", te: "భాగస్వామ్యాలు, వివాహం, వ్యాపారం", ta: "கூட்டாண்மை, திருமணம், வணிகம்", hi: "साझेदारी, विवाह, व्यापार", kn: "ಪಾಲುದಾರಿಕೆಗಳು, ಮದುವೆ, ವ್ಯಾಪಾರ" },
        "8": { en: "transformation, secrets, longevity", te: "పరివర్తన, రహస్యాలు, దీర్ఘాయువు", ta: "மாற்றம், ரகசியங்கள், நீண்ட ஆயுள்", hi: "परिवर्तन, रहस्य, दीर्घायु", kn: "ರೂಪಾಂತರ, ರಹಸ್ಯಗಳು, ದೀರ್ಘಾಯುಷ್ಯ" },
        "9": { en: "luck, dharma, higher learning", te: "అదృష్టం, ధర్మం, ఉన్నత విద్య", ta: "அதிர்ஷ்டம், தர்மம், உயர்கல்வி", hi: "भाग्य, धर्म, उच्च शिक्षा", kn: "ಅದೃಷ್ಟ, ಧರ್ಮ, ಉನ್ನತ ಕಲಿಕೆ" },
        "10": { en: "career, karma, public status", te: "కెరీర్, కర్మ, పబ్లిక్ హోదా", ta: "தொழில், கர்மா, பொது அந்தஸ்து", hi: "करियर, कर्म, सार्वजनिक स्थिति", kn: "ವೃತ್ತಿ, ಕರ್ಮ, ಸಾರ್ವಜನಿಕ ಸ್ಥಾನಮಾನ" },
        "11": { en: "gains, networks, friends", te: "లాభాలు, నెట్‌వర్క్‌లు, స్నేహితులు", ta: "லாபங்கள், நெட்வொர்க்குகள், நண்பர்கள்", hi: "लाभ, नेटवर्क, दोस्त", kn: "ಲಾಭಗಳು, ನೆಟ್‌ವರ್ಕ್‌ಗಳು, ಸ್ನೇಹಿತರು" },
        "12": { en: "spirituality, losses, isolation", te: "ఆధ్యాత్మికత, నష్టాలు, ఒంటరితనం", ta: "ஆன்மீகம், இழப்புகள், தனிமை", hi: "अध्यात्म, हानि, अलगाव", kn: "ಆಧ್ಯಾತ್ಮಿಕತೆ, ನಷ್ಟಗಳು, ಪ್ರತ್ಯೇಕತೆ" }
      };

      const signModifiers: Record<string, any> = {
        "Aries": { en: "boldly and energetically", te: "ధైర్యంగా", ta: "தைரியமாக", hi: "साहसपूर्वक", kn: "ಧೈರ್ಯದಿಂದ" },
        "Taurus": { en: "stably and practically", te: "స్థిరంగా", ta: "நிலையாக", hi: "स्थिरता से", kn: "ಸ್ಥಿರವಾಗಿ" },
        "Gemini": { en: "adaptably and curiously", te: "అనుకూలమైనదిగా", ta: "ஏற்புத்திறனுடன்", hi: "अनुकूलता से", kn: "ಹೊಂದಿಕೊಳ್ಳುವ ರೀತಿಯಲ್ಲಿ" },
        "Cancer": { en: "emotionally and nurturingly", te: "భావోద్వేగపరంగా", ta: "உணர்ச்சிபூர்வமாக", hi: "भावनात्मक रूप से", kn: "ಭಾವನಾತ್ಮಕವಾಗಿ" },
        "Leo": { en: "confidently and proudly", te: "నమ్మకంగా", ta: "நம்பிக்கையுடன்", hi: "आत्मविश्वास से", kn: "ಆತ್ಮವಿಶ್ವಾಸದಿಂದ" },
        "Virgo": { en: "analytically and methodically", te: "విశ్లేషణాత్మకంగా", ta: "பகுப்பாய்வு ரீதியாக", hi: "विश्लेषणात्मक रूप से", kn: "ವಿಶ್ಲೇಷಣಾತ್ಮಕವಾಗಿ" },
        "Libra": { en: "diplomatically and socially", te: "దౌత్యపరంగా", ta: "ராஜதந்திர ரீதியாக", hi: "राजनयिक रूप से", kn: "ರಾಜತಾಂತ್ರಿಕವಾಗಿ" },
        "Scorpio": { en: "intensely and secretively", te: "తీవ్రంగా", ta: "தீவிரமாக", hi: "तीव्र रूप से", kn: "ತೀವ್ರವಾಗಿ" },
        "Sagittarius": { en: "adventurously and philosophically", te: "సాహసోపేతంగా", ta: "சாகசமாக", hi: "साहसिक रूप से", kn: "ಸಾಹಸಮಯವಾಗಿ" },
        "Capricorn": { en: "disciplined and ambitiously", te: "క్రమశిక్షణతో", ta: "ஒழுக்கத்துடன்", hi: "अनुशासन के साथ", kn: "ಶಿಸ್ತಿನಿಂದ" },
        "Aquarius": { en: "innovatively and independently", te: "వినూత్నంగా", ta: "புதுமையாக", hi: "अभिनव रूप से", kn: "ನವೀನವಾಗಿ" },
        "Pisces": { en: "compassionately and imaginatively", te: "కరుణతో", ta: "கனிவாக", hi: "करुणा से", kn: "ಕರುಣೆಯಿಂದ" }
      };

      const englishPlanetName = raw.planetaryTable.find(p => p.planet === lagnaLord)?.planet || 'Sun';
      const parsedEnglishPlanetName = Object.keys(planetCore).find(k => englishPlanetName.includes(k) || lagnaLord.includes(k)) || 'Sun';
      
      const englishSignName = Object.keys(signModifiers).find(k => llPos.sign.includes(k)) || Object.keys(signModifiers)[0];

      const kw = planetCore[parsedEnglishPlanetName]?.[langCode] || planetCore[parsedEnglishPlanetName]?.en || 'your path';
      const signKeyword = signModifiers[englishSignName]?.[langCode] || signModifiers[englishSignName]?.en || "uniquely";
      const houseDesc = houseThemes[llPos.house.toString()]?.[langCode] || houseThemes[llPos.house.toString()]?.en || "various areas";
      
      let text = `The Rasi chart is the foundational map of your life. The Lagna (Ascendant) and its lord indicate your physical self and how you approach the world. Your core personality is strongly guided by the ${lagnaLord} (representing ${kw}). `;
      text += `Since it is placed in the ${llPos.house}th house, your focus is naturally drawn toward ${houseDesc}. `;
      text += `Positioned in ${llPos.sign}, these qualities are expressed ${signKeyword}. `;
      if (llStatus.strength.dignity >= 30) {
        text += `Because ${lagnaLord} is strong in dignity, this expression feels natural and empowering. `;
      }
      if (facts.yogas.includes("Gaja Kesari Yoga")) {
        text += `The presence of Gaja Kesari Yoga suggests a baseline of wisdom, reputation, and intellectual strength supporting your endeavors. `;
      }

      if (langCode === 'te') {
        text = `రాశి చక్రం మీ జీవితానికి పునాది పటం. లగ్నం మరియు లగ్నాధిపతి మీ భౌతిక స్వరూపాన్ని, మీరు ప్రపంచాన్ని ఎలా ఎదుర్కొంటారో సూచిస్తారు. మీ ప్రాథమిక వ్యక్తిత్వం ${lagnaLord} ద్వారా బలంగా మార్గనిర్దేశం చేయబడుతుంది (${kw} సూచిస్తుంది). `;
        text += `ఇది ${llPos.house}వ స్థానంలో ఉన్నందున, మీ దృష్టి సహజంగా ${houseDesc} వైపు ఆకర్షితుమవుతుంది. `;
        text += `${llPos.sign} లో ఉంచబడినందున, ఈ లక్షణాలు ${signKeyword} గా వ్యక్తమవుతాయి. `;
        if (llStatus.strength.dignity >= 30) text += `${lagnaLord} బలంగా ఉన్నందున, ఈ వ్యక్తీకరణ సహజంగా మరియు శక్తివంతంగా అనిపిస్తుంది. `;
        if (facts.yogas.includes("Gaja Kesari Yoga")) text += `గజ కేసరి యోగం ఉండటం వల్ల మీకు జ్ఞానం, కీర్తి మరియు మేధో బలం ఉంటుంది. `;
      } else if (langCode === 'ta') {
        text = `ராசி சக்கரம் உங்கள் வாழ்க்கையின் அடிப்படை வரைபடமாகும். லக்னம் மற்றும் லக்னாதிபதி உங்கள் உடல் தோற்றத்தையும், உலகை நீங்கள் எப்படி அணுகுகிறீர்கள் என்பதையும் குறிக்கின்றன. உங்களின் அடிப்படை ஆளுமை ${lagnaLord}-ஆல் வலுவாக வழிநடத்தப்படுகிறது (${kw} குறிக்கிறது). `;
        text += `இது ${llPos.house}-ஆம் வீட்டில் இருப்பதால், உங்கள் கவனம் இயற்கையாகவே ${houseDesc} நோக்கி ஈர்க்கப்படுகிறது. `;
        text += `${llPos.sign}-ல் அமைந்துள்ளதால், இந்தக் குணங்கள் ${signKeyword}-ஆக வெளிப்படுகின்றன. `;
        if (llStatus.strength.dignity >= 30) text += `${lagnaLord} வலுவாக இருப்பதால், இந்த வெளிப்பாடு இயல்பானதாகவும் அதிகாரமளிப்பதாகவும் உணர்கிறது. `;
        if (facts.yogas.includes("Gaja Kesari Yoga")) text += `கஜ கேசரி யோகம் இருப்பதால் உங்களுக்கு ஞானம், புகழ் மற்றும் அறிவார்ந்த பலம் இருக்கும். `;
      } else if (langCode === 'hi') {
        text = `राशि चक्र आपके जीवन का मूलभूत नक्शा है। लग्न और लग्नेश आपके भौतिक स्वरूप और दुनिया के प्रति आपके दृष्टिकोण को दर्शाते हैं। आपका मुख्य व्यक्तित्व ${lagnaLord} द्वारा दृढ़ता से निर्देशित होता है (${kw} का प्रतिनिधित्व करता है)। `;
        text += `चूंकि यह ${llPos.house}वें भाव में है, इसलिए आपका ध्यान स्वाभाविक रूप से ${houseDesc} की ओर आकर्षित होता है। `;
        text += `${llPos.sign} में स्थित होने के कारण, ये गुण ${signKeyword} रूप में व्यक्त होते हैं। `;
        if (llStatus.strength.dignity >= 30) text += `क्योंकि ${lagnaLord} मजबूत है, यह अभिव्यक्ति स्वाभाविक और सशक्त लगती है। `;
        if (facts.yogas.includes("Gaja Kesari Yoga")) text += `गज केसरी योग की उपस्थिति ज्ञान, प्रतिष्ठा और बौद्धिक शक्ति का सुझाव देती है। `;
      } else if (langCode === 'kn') {
        text = `ರಾಶಿ ಚಕ್ರವು ನಿಮ್ಮ ಜೀವನದ ಮೂಲ ನಕ್ಷೆಯಾಗಿದೆ. ಲಗ್ನ ಮತ್ತು ಲಗ್ನಾಧಿಪತಿಯು ನಿಮ್ಮ ಭೌತಿಕ ಸ್ವರೂಪ ಮತ್ತು ಪ್ರಪಂಚವನ್ನು ನೀವು ಹೇಗೆ ಎದುರಿಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಸೂಚಿಸುತ್ತಾರೆ. ನಿಮ್ಮ ಮೂಲ ವ್ಯಕ್ತಿತ್ವವು ${lagnaLord} ನಿಂದ ಬಲವಾಗಿ ಮಾರ್ಗದರ್ಶಿಸಲ್ಪಡುತ್ತದೆ (${kw} ಪ್ರತಿನಿಧಿಸುತ್ತದೆ). `;
        text += `ಇದು ${llPos.house}ನೇ ಮನೆಯಲ್ಲಿ ಇರುವುದರಿಂದ, ನಿಮ್ಮ ಗಮನವು ಸ್ವಾಭಾವಿಕವಾಗಿ ${houseDesc} ಕಡೆಗೆ ಸೆಳೆಯಲ್ಪಡುತ್ತದೆ. `;
        text += `${llPos.sign} ನಲ್ಲಿ ಸ್ಥಾನ ಪಡೆದಿರುವುದರಿಂದ, ಈ ಗುಣಗಳು ${signKeyword} ಆಗಿ ವ್ಯಕ್ತವಾಗುತ್ತವೆ. `;
        if (llStatus.strength.dignity >= 30) text += `${lagnaLord} ಬಲವಾಗಿರುವುದರಿಂದ, ಈ ಅಭಿವ್ಯಕ್ತಿ ಸ್ವಾಭಾವಿಕ ಮತ್ತು ಸಬಲೀಕರಣಗೊಳ್ಳುತ್ತದೆ. `;
        if (facts.yogas.includes("Gaja Kesari Yoga")) text += `ಗಜ ಕೇಸರಿ ಯೋಗದ ಉಪಸ್ಥಿತಿಯು ಬುದ್ಧಿವಂತಿಕೆ, ಖ್ಯಾತಿ ಮತ್ತು ಬೌದ್ಧಿಕ ಶಕ್ತಿಯನ್ನು ಸೂಚಿಸುತ್ತದೆ. `;
      }

      let derivedFromText = [
        `Lagna Lord ${lagnaLord} in ${llPos.sign} (${llPos.house}H)`,
        ...llStatus.strength.reasons.map(r => translateReason(r, langCode)),
        ...(facts.yogas.length > 0 ? [
          langCode === 'te' ? `యోగాలు: ${facts.yogas.join(", ")}` :
          langCode === 'ta' ? `யோகங்கள்: ${facts.yogas.join(", ")}` :
          langCode === 'hi' ? `योग: ${facts.yogas.join(", ")}` :
          langCode === 'kn' ? `ಯೋಗಗಳು: ${facts.yogas.join(", ")}` :
          `Yogas: ${facts.yogas.join(", ")}`
        ] : [])
      ];

      if (langCode === 'te') derivedFromText[0] = `లగ్నాధిపతి ${lagnaLord} ${llPos.sign} లో (${llPos.house}వ ఇల్లు)`;
      else if (langCode === 'ta') derivedFromText[0] = `லக்னாதிபதி ${lagnaLord} ${llPos.sign}-ல் (${llPos.house}ஆம் வீடு)`;
      else if (langCode === 'hi') derivedFromText[0] = `लग्नेश ${lagnaLord} ${llPos.sign} में (${llPos.house}ठा भाव)`;
      else if (langCode === 'kn') derivedFromText[0] = `ಲಗ್ನಾಧಿಪತಿ ${lagnaLord} ${llPos.sign} ನಲ್ಲಿ (${llPos.house}ನೇ ಮನೆ)`;

      return {
        text,
        confidence: "High",
        derivedFrom: derivedFromText
      };
    };

    const buildCareer = (): ExplainableSection => {
      const strongest = facts.strongestPlanet;
      const spStatus = facts.planets[strongest];
      
      if (!spStatus) {
        let text = "Career analysis pending.";
        if (langCode === 'te') text = "కెరీర్ విశ్లేషణ పెండింగ్‌లో ఉంది.";
        if (langCode === 'ta') text = "தொழில் பகுப்பாய்வு நிலுவையில் உள்ளது.";
        if (langCode === 'hi') text = "करियर विश्लेषण लंबित है।";
        if (langCode === 'kn') text = "ವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆ ಬಾಕಿಯಿದೆ.";
        return { text, confidence: "Moderate", derivedFrom: [] };
      }

      const planetThemes: Record<string, any> = {
        "Sun": { en: "leadership and authority", te: "నాయకత్వం మరియు అధికారం", ta: "தலைமை மற்றும் அதிகாரம்", hi: "नेतृत्व और अधिकार", kn: "ನಾಯಕತ್ವ ಮತ್ತು ಅಧಿಕಾರ" },
        "Moon": { en: "emotions and nurturing", te: "భావోద్వేగాలు మరియు పోషణ", ta: "உணர்ச்சிகள் மற்றும் வளர்ப்பு", hi: "भावनाएं और पोषण", kn: "ಭಾವನೆಗಳು ಮತ್ತು ಪೋಷಣೆ" },
        "Mars": { en: "energy and ambition", te: "శక్తి మరియు ఆశయం", ta: "ஆற்றல் மற்றும் லட்சியம்", hi: "ऊर्जा और महत्वाकांक्षा", kn: "ಶಕ್ತಿ ಮತ್ತು ಮಹತ್ವಾಕಾಂಕ್ಷೆ" },
        "Mercury": { en: "intellect and communication", te: "తెలివితేటలు మరియు కమ్యూనికేషన్", ta: "புத்திசாலித்தனம் மற்றும் தொடர்பு", hi: "बुद्धि और संचार", kn: "ಬುದ್ಧಿಶಕ್ತಿ ಮತ್ತು ಸಂವಹನ" },
        "Jupiter": { en: "wisdom and expansion", te: "జ్ఞానం మరియు విస్తరణ", ta: "ஞானம் மற்றும் விரிவாக்கம்", hi: "ज्ञान और विस्तार", kn: "ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ವಿಸ್ತರಣೆ" },
        "Venus": { en: "love and relationships", te: "ప్రేమ మరియు సంబంధాలు", ta: "காதல் மற்றும் உறவுகள்", hi: "प्रेम और संबंध", kn: "ಪ್ರೀತಿ ಮತ್ತು ಸಂಬಂಧಗಳು" },
        "Saturn": { en: "discipline and hard work", te: "క్రమశిక్షణ మరియు కష్టపడి పనిచేయడం", ta: "ஒழுக்கம் மற்றும் கடின உழைப்பு", hi: "अनुशासन और कड़ी मेहनत", kn: "ಶಿಸ್ತು ಮತ್ತು ಕಠಿಣ ಪರಿಶ್ರಮ" },
        "Rahu": { en: "innovation and unconventionality", te: "ఆవిష్కరణ మరియు అసాధారణత", ta: "கண்டுபிடிப்பு மற்றும் வழக்கத்திற்கு மாறான தன்மை", hi: "नवाचार और अपरंपरागतता", kn: "ನಾವೀನ್ಯತೆ ಮತ್ತು ಅಸಾಂಪ್ರದಾಯಿಕತೆ" },
        "Ketu": { en: "spirituality and intuition", te: "ఆధ్యాత్మికత మరియు అంతర్ దృష్టి", ta: "ஆன்மீகம் மற்றும் உள்ளுணர்வு", hi: "अध्यात्म और अंतर्ज्ञान", kn: "ಆಧ್ಯಾತ್ಮಿಕತೆ ಮತ್ತು ಅಂತಃಪ್ರಜ್ಞೆ" }
      };

      const parsedEnglishPlanetName = Object.keys(planetThemes).find(k => strongest.includes(k)) || 'Sun';
      const kw = planetThemes[parsedEnglishPlanetName]?.[langCode] || planetThemes[parsedEnglishPlanetName]?.en || 'focus';
      
      let text = `The Bhava Chalit chart reveals the exact house placements of planets, providing a more accurate picture of how planetary energies manifest in specific areas of life, particularly regarding career and worldly achievements. `;
      text += `The strongest influence in your chart comes from ${strongest}. `;
      text += `This indicates that your professional and public life may greatly benefit from themes of ${kw}. `;
      if (facts.yogas.includes("Budha Aditya Yoga")) {
        text += `The Budha Aditya Yoga in your chart traditionally favors intelligence, management, and strong communication skills in your career. `;
      }

      if (langCode === 'te') {
        text = `భావ చలిత్ చక్రం గ్రహాల ఖచ్చితమైన స్థానాలను వెల్లడిస్తుంది, జీవితంలోని నిర్దిష్ట రంగాలలో, ముఖ్యంగా కెరీర్ మరియు ప్రాపంచిక విజయాలకు సంబంధించి గ్రహ శక్తులు ఎలా వ్యక్తమవుతాయో మరింత ఖచ్చితమైన చిత్రాన్ని అందిస్తుంది. మీ చార్ట్‌లో బలమైన ప్రభావం ${strongest} నుండి వస్తుంది. `;
        text += `ఇది మీ వృత్తి మరియు పబ్లిక్ జీవితం ${kw} థీమ్‌ల నుండి బాగా ప్రయోజనం పొందవచ్చని సూచిస్తుంది. `;
        if (facts.yogas.includes("Budha Aditya Yoga")) text += `మీ చార్ట్‌లోని బుధ ఆదిత్య యోగం సాంప్రదాయకంగా మీ కెరీర్‌లో తెలివితేటలు, నిర్వహణ మరియు బలమైన కమ్యూనికేషన్ నైపుణ్యాలకు అనుకూలంగా ఉంటుంది. `;
      } else if (langCode === 'ta') {
        text = `பாவ சலித் சக்கரம் கிரகங்களின் சரியான வீட்டு நிலைகளை வெளிப்படுத்துகிறது, வாழ்க்கையின் குறிப்பிட்ட பகுதிகளில், குறிப்பாக தொழில் மற்றும் உலகளாவிய சாதனைகள் தொடர்பாக கிரக ஆற்றல்கள் எவ்வாறு வெளிப்படுகின்றன என்பதற்கான துல்லியமான படத்தை வழங்குகிறது. உங்கள் ஜாதகத்தில் வலுவான தாக்கம் ${strongest}-ல் இருந்து வருகிறது. `;
        text += `இது உங்கள் தொழில் மற்றும் பொது வாழ்க்கை ${kw} கருப்பொருள்களிலிருந்து பெரிதும் பயனடையக்கூடும் என்பதைக் குறிக்கிறது. `;
        if (facts.yogas.includes("Budha Aditya Yoga")) text += `உங்கள் ஜாதகத்தில் உள்ள புத ஆதித்ய யோகம் உங்கள் வாழ்க்கையில் புத்திசாலித்தனம், நிர்வாகம் மற்றும் வலுவான தொடர்பு திறன்களை ஆதரிக்கிறது. `;
      } else if (langCode === 'hi') {
        text = `भाव चलित चक्र ग्रहों की सटीक भाव स्थिति को प्रकट करता है, यह जीवन के विशिष्ट क्षेत्रों में, विशेष रूप से करियर और सांसारिक उपलब्धियों के संबंध में, ग्रहीय ऊर्जा कैसे प्रकट होती है, इसकी अधिक सटीक तस्वीर प्रदान करता है। आपकी कुंडली में सबसे मजबूत प्रभाव ${strongest} से आता है। `;
        text += `यह इंगित करता है कि आपका पेशेवर और सार्वजनिक जीवन ${kw} के विषयों से बहुत लाभान्वित हो सकता है। `;
        if (facts.yogas.includes("Budha Aditya Yoga")) text += `आपकी कुंडली में बुध आदित्य योग आपके करियर में बुद्धिमत्ता, प्रबंधन और मजबूत संचार कौशल का समर्थन करता है। `;
      } else if (langCode === 'kn') {
        text = `ಭಾವ ಚಲಿತ್ ಚಕ್ರವು ಗ್ರಹಗಳ ನಿಖರವಾದ ಮನೆ ಸ್ಥಾನಗಳನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ, ಜೀವನದ ನಿರ್ದಿಷ್ಟ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ, ವಿಶೇಷವಾಗಿ ವೃತ್ತಿ ಮತ್ತು ಲೌಕಿಕ ಸಾಧನೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಗ್ರಹಗಳ ಶಕ್ತಿಗಳು ಹೇಗೆ ಪ್ರಕಟವಾಗುತ್ತವೆ ಎಂಬುದರ ನಿಖರವಾದ ಚಿತ್ರವನ್ನು ಒದಗಿಸುತ್ತದೆ. ನಿಮ್ಮ ಚಾರ್ಟ್‌ನಲ್ಲಿ ಪ್ರಬಲವಾದ ಪ್ರಭಾವವು ${strongest} ನಿಂದ ಬರುತ್ತದೆ. `;
        text += `ಇದು ನಿಮ್ಮ ವೃತ್ತಿಪರ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಜೀವನವು ${kw} ಥೀಮ್‌ಗಳಿಂದ ಹೆಚ್ಚು ಪ್ರಯೋಜನ ಪಡೆಯಬಹುದು ಎಂದು ಸೂಚಿಸುತ್ತದೆ. `;
        if (facts.yogas.includes("Budha Aditya Yoga")) text += `ನಿಮ್ಮ ಚಾರ್ಟ್‌ನಲ್ಲಿರುವ ಬುಧ ಆದಿತ್ಯ ಯೋಗವು ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ನಿಮ್ಮ ವೃತ್ತಿಜೀವನದಲ್ಲಿ ಬುದ್ಧಿವಂತಿಕೆ, ನಿರ್ವಹಣೆ ಮತ್ತು ಬಲವಾದ ಸಂವಹನ ಕೌಶಲ್ಯಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ. `;
      }

      let derivedFromText = [
        `Strongest planet is ${strongest} with score ${spStatus.strength.final}`,
        ...spStatus.strength.reasons.map(r => translateReason(r, langCode))
      ];

      if (langCode === 'te') derivedFromText[0] = `అత్యంత బలమైన గ్రహం ${strongest} (స్కోర్ ${spStatus.strength.final})`;
      else if (langCode === 'ta') derivedFromText[0] = `மிகவும் வலுவான கிரகம் ${strongest} (மதிப்பெண் ${spStatus.strength.final})`;
      else if (langCode === 'hi') derivedFromText[0] = `सबसे मजबूत ग्रह ${strongest} है (स्कोर ${spStatus.strength.final})`;
      else if (langCode === 'kn') derivedFromText[0] = `ಅತ್ಯಂತ ಪ್ರಬಲ ಗ್ರಹ ${strongest} (ಸ್ಕೋರ್ ${spStatus.strength.final})`;

      return {
        text,
        confidence: "Moderate",
        derivedFrom: derivedFromText
      };
    };

    const buildMarriage = (): ExplainableSection => {
      let text = "In Vedic astrology, the D9 or Navamsa chart is considered the microscopic view of the 7th house, representing marriage, soulmate connections, and your inner spiritual self. While the Rasi chart shows the physical reality, the Navamsa reveals the hidden strengths and long-term potential of your partnerships, unfolding true compatibility over time.";
      if (langCode === 'te') text = "వేద జ్యోతిషశాస్త్రంలో, D9 లేదా నవాంశ చక్రం 7వ ఇంటి సూక్ష్మ వీక్షణగా పరిగణించబడుతుంది, ఇది వివాహం, ఆత్మ సంబంధాలు మరియు మీ అంతర్గత ఆధ్యాత్మికతను సూచిస్తుంది. రాశి చక్రం భౌతిక వాస్తవికతను చూపుతుండగా, నవాంశ మీ భాగస్వామ్యాల యొక్క దాచిన బలాలు మరియు దీర్ఘకాలిక సామర్థ్యాన్ని వెల్లడిస్తుంది, కాలక్రమేణా నిజమైన అనుకూలతను వివరిస్తుంది.";
      else if (langCode === 'ta') text = "வேத ஜோதிடத்தில், D9 அல்லது நவாம்ச சக்கரம் 7 ஆம் வீட்டின் நுண்ணிய பார்வையாகக் கருதப்படுகிறது, இது திருமணம், ஆத்மார்த்தமான தொடர்புகள் மற்றும் உங்கள் உள் ஆன்மீகத்தைக் குறிக்கிறது. ராசி சக்கரம் உடல் யதார்த்தத்தைக் காட்டுகையில், நவாம்சம் உங்கள் கூட்டாண்மைகளின் மறைக்கப்பட்ட பலங்களையும் நீண்டகால திறனையும் வெளிப்படுத்துகிறது, காலப்போக்கில் உண்மையான பொருந்தக்கூடிய தன்மையை வெளிப்படுத்துகிறது.";
      else if (langCode === 'hi') text = "वैदिक ज्योतिष में, D9 या नवांश चक्र को 7वें भाव का सूक्ष्म दृश्य माना जाता है, जो विवाह, आत्मीय संबंधों और आपके आंतरिक आध्यात्मिक स्वरूप का प्रतिनिधित्व करता है। जबकि राशि चक्र भौतिक वास्तविकता को दर्शाता है, नवांश आपकी साझेदारी की छिपी हुई ताकत और दीर्घकालिक क्षमता को प्रकट करता है, जो समय के साथ सच्ची अनुकूलता को उजागर करता है।";
      else if (langCode === 'kn') text = "ವೇದ ಜ್ಯೋತಿಷ್ಯದಲ್ಲಿ, D9 ಅಥವಾ ನವಾಂಶ ಚಕ್ರವನ್ನು 7 ನೇ ಮನೆಯ ಸೂಕ್ಷ್ಮ ನೋಟ ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, ಇದು ಮದುವೆ, ಆತ್ಮ ಸಂಗಾತಿಯ ಸಂಪರ್ಕಗಳು ಮತ್ತು ನಿಮ್ಮ ಆಂತರಿಕ ಆಧ್ಯಾತ್ಮಿಕತೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ. ರಾಶಿ ಚಕ್ರವು ಭೌತಿಕ ವಾಸ್ತವತೆಯನ್ನು ತೋರಿಸಿದರೆ, ನವಾಂಶವು ನಿಮ್ಮ ಪಾಲುದಾರಿಕೆಯ ಗುಪ್ತ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ದೀರ್ಘಕಾಲೀನ ಸಾಮರ್ಥ್ಯವನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ, ಕಾಲಾನಂತರದಲ್ಲಿ ನಿಜವಾದ ಹೊಂದಾಣಿಕೆಯನ್ನು ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.";

      let derivedContext = "Navamsa Chart context";
      if (langCode === 'te') derivedContext = "నవాంశ చక్రం సందర్భం";
      else if (langCode === 'ta') derivedContext = "நவாம்ச சக்கர சூழல்";
      else if (langCode === 'hi') derivedContext = "नवांश चक्र संदर्भ";
      else if (langCode === 'kn') derivedContext = "ನವಾಂಶ ಚಕ್ರದ ಸಂದರ್ಭ";

      return {
        text,
        confidence: "Moderate",
        derivedFrom: [derivedContext]
      };
    };

    return {
      dashboard: {
        chartStrength: 75,
        strongAreas: 
          langCode === 'te' ? ["వ్యక్తిత్వం", "కెరీర్"] :
          langCode === 'ta' ? ["ஆளுமை", "தொழில்"] :
          langCode === 'hi' ? ["व्यक्तित्व", "करियर"] :
          langCode === 'kn' ? ["ವ್ಯಕ್ತಿತ್ವ", "ವೃತ್ತಿ"] :
          ["Personality", "Career"],
        developingAreas: 
          langCode === 'te' ? ["భాగస్వామ్యాలు"] :
          langCode === 'ta' ? ["கூட்டாண்மைகள்"] :
          langCode === 'hi' ? ["साझेदारी"] :
          langCode === 'kn' ? ["ಪಾಲುದಾರಿಕೆಗಳು"] :
          ["Partnerships"],
        dominantElements: 
          langCode === 'te' ? ["అగ్ని"] :
          langCode === 'ta' ? ["நெருப்பு"] :
          langCode === 'hi' ? ["अग्नि"] :
          langCode === 'kn' ? ["ಬೆಂಕಿ"] :
          ["Fire"],
        dominantModes: 
          langCode === 'te' ? ["స్థిరమైన"] :
          langCode === 'ta' ? ["நிலையான"] :
          langCode === 'hi' ? ["स्थिर"] :
          langCode === 'kn' ? ["ಸ್ಥಿರ"] :
          ["Fixed"]
      },
      personality: buildPersonality(),
      career: buildCareer(),
      marriage: buildMarriage(),
      spirituality: { text: "Spiritual analysis pending.", confidence: "Low", derivedFrom: [] }
    };
  }
}
