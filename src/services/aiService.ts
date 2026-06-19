/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { LanguageCode } from "../types/astrology";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets. Please configure it in your Secrets module.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

export class AiService {
  
  // Generate highly customizable localized Vedic Horoscope interpretations using Gemini AI
  public static async generateHoroscope(sign: string, lang: LanguageCode = "en"): Promise<any> {
    try {
      const ai = getAiClient();
      const prompt = `
        You are a highly premium, scholarly Vedic Astrology consultant.
        Generate a detailed, authentic Vedic horoscope prediction for the zodiac sign of ${sign}.
        The response MUST be written exclusively in the language code: "${lang}".
        Provide separate insights for:
        1. Daily, Weekly, Monthly, Yearly overviews
        2. Career, Marriage, Business, Health, Education, Travel, Finance, Children
        3. Remedies, Lucky Number, Lucky Color, Lucky Direction, Lucky Gemstone
        
        Respond with raw JSON conforming precisely to this output schema:
        {
          "daily": "Short daily prediction...",
          "weekly": "Weekly insight...",
          "monthly": "Monthly outlook...",
          "yearly": "Yearly major transition summary...",
          "career": "Career guidance...",
          "marriage": "Marriage & relationships forecast...",
          "business": "Business endeavors counsel...",
          "health": "Vedic health advice (physical & mental)...",
          "education": "Education & study focus...",
          "travel": "Travel and migration parameters...",
          "finance": "Wealth accumulation parameters...",
          "children": "Progeny and children aspects...",
          "remedies": "Specific remedies (Chanting, Puja, Fasting)...",
          "luckyNumber": 7,
          "luckyColor": "Royal Blue",
          "luckyDirection": "Northeast",
          "luckyGemstone": "Ruby"
        }
        Do not wrap the response with markdown formatting or backticks, return raw unformatted JSON text only.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini AI");
      }

      return JSON.parse(responseText.trim());
    } catch (error) {
      console.warn("AI Horoscope generation failed (possibly due to missing API key), falling back to deterministic template.", error);
      return AstrologyServiceFallback.getZodiacHoroscope(sign, lang);
    }
  }

  // Generate an expert textual explanations for a Birth Chart
  public static async explainChart(chartSummary: any, lang: LanguageCode = "en"): Promise<string> {
    try {
      const ai = getAiClient();
      const prompt = `
        As an expert Vedic Astrology Scholar, analyze these calculated planetary coordinates and describe their life effects:
        ${JSON.stringify(chartSummary)}
        The response must be written entirely in the language code: "${lang}".
        Write a concise, beautifully descriptive paragraph explaining the core personality, outstanding house placements, major doshas, and general karmic path of this native. Keep the tone compassionate, encouraging, and highly professional.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      return response.text || "Summary is unavailable.";
    } catch (error) {
      return `Solar & planetary configurations analyzed. Lagna is located in ${chartSummary.lagna}. The major planets are placed in their respective houses. Complete AI explanation will activate once you configure your GEMINI_API_KEY in the Secrets panel.`;
    }
  }

  // Generate highly premium, scholar-level interactive advisor response
  public static async consultAstro(message: string, history: any[], chartSummary: any, lang: LanguageCode = "en"): Promise<string> {
    try {
      const ai = getAiClient();
      
      const systemInstruction = `
        You are a highly premium, scholarly, and compassionate Vedic Astrology Consultant.
        You have direct access to the calculated birth chart values of the native:
        ${JSON.stringify(chartSummary)}
        
        Answer the user's questions or discuss their horoscope using actual Vedic Astrology principles (Yogas, house alignments, planet strengths, transits, dasha cycles, and remedial pujas/gemstones/fasting).
        The response MUST be written in the specified language code: "${lang}".
        Keep your advice incredibly profound, accurate, compassionate, and highly professional. Avoid generic descriptions, provide actual deep value.
      `;

      // Build contents for gemini-3.5-flash
      const contents: any[] = [];
      // Push history
      history.forEach(msg => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
      // Push the final user message
      contents.push({
        role: "user",
        parts: [{ text: `${message}\n\n(Context: System instructions: ${systemInstruction})` }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents
      });

      return response.text || "I am currently meditating on your planets. Please repeat your query in a moment.";
    } catch (error) {
      console.warn("AI Consulting failed, falling back to static expert replies", error);
      // Fallback response builder based on keywords in the message
      const text = message.toLowerCase();
      if (text.includes("career") || text.includes("job") || text.includes("work")) {
        return lang === "te" ? "మీ 10వ స్థానం (రాజ్యా స్థానం) మరియు సూర్యుని బలాన్ని బట్టి మీ కెరీర్ చాలా ఉన్నతంగా ఉంటుంది. ప్రస్తుత దశ పురోభివృద్దిని చూపిస్తోంది." :
               lang === "hi" ? "आपके करियर का दशम भाव मजबूत है। सूर्य और बुध की युति राजयोग दर्शाती है। निरंतर प्रयास से सफलता अवश्य मिलेगी।" :
               "Based on your 10th house of career (Karma Sthana) and the positioning of the Sun, you are entering a period of career expansion and recognition. Keep your focus on long-term leadership goals.";
      } else if (text.includes("marri") || text.includes("love") || text.includes("wife") || text.includes("husband") || text.includes("partner")) {
        return lang === "te" ? "మీ 7వ స్థానం మంచి అధిపతిని కలిగి ఉంది. భాగస్వామ్యాలు మరియు వైవాహిక జీవితం ప్రశాంతంగా సాగుతాయి." :
               lang === "hi" ? "सप्तम भाव (विवाह स्थान) शुभ ग्रहों की दृष्टि में है। वैवाहिक जीवन सुखमय और सामंजस्यपूर्ण रहेगा।" :
               "The 7th house (Kalatra Sthana) rules your marriage and partnerships. Planetary conjunctions indicate a highly supportive life partner who brings harmony and shared spiritual growth.";
      } else if (text.includes("money") || text.includes("wealth") || text.includes("finance")) {
        return lang === "te" ? "మీ 2వ మరియు 11వ స్థానాలు ధన మరియు లాభ స్థానాలు. ధన ప్రవాహం నిలకడగా ఉంటుంది." :
               lang === "hi" ? "द्वितीय (धन) और एकादश (लाभ) भाव अत्यंत शुभ हैं। लक्ष्मी योग की उपस्थिति वित्तीय उन्नति दर्शाती है।" :
               "Your 2nd house of wealth (Dhana Sthana) and 11th house of gains (Labha Sthana) indicate strong financial foundations. Astrological transits suggest stable wealth accumulation and successful investments.";
      } else {
        return lang === "te" ? "మీ లగ్నం మరియు రాశి చక్ర అమరిక ప్రకారము గ్రహాలు అనుకూలంగా ఉన్నాయి. ప్రతికూలతలు తొలిగిపోవడానికి నిత్యం ధ్యానము చేయవలసింది." :
               lang === "hi" ? "आपके लग्न और कुंडली के ग्रहों की स्थिति बहुत शुभ है। सभी बाधाओं को दूर करने के लिए गायत्री मंत्र का जाप करें।" :
               "Your planetary positions represent a strong karmic blueprint. I recommend practicing mindful meditation (Pranayama) and focusing on your current dasha rulers for spiritual and material harmony.";
      }
    }
  }
}

// Highly detailed multilingual fallback when the Gemini API key is missing, ensuring 100% stable uptime
class AstrologyServiceFallback {
  public static getZodiacHoroscope(sign: string, lang: LanguageCode): any {
    const translations: Record<LanguageCode, any> = {
      en: {
        daily: "A highly progressive day for mental clarity and strategic planning. Avoid unwanted confrontations.",
        weekly: "You will notice strong momentum in professional projects. Financial stability will improve.",
        monthly: "Jupiter's movement brings peace to home and relationships. Keep focus on health routines.",
        yearly: "This is a year of major transit alignments offering stable scaling, marriage prospects, and academic masteries.",
        career: "You can expect promotions, recognition, or scaling in technology fields.",
        marriage: "A very favorable period for weddings, relationship enhancements, and mutual understanding.",
        business: "Excellent returns on old assets. Keep transparency in new partnerships.",
        health: "Avoid stress. Integrate mild exercises, walking, and planetary breathing loop daily.",
        education: "High concentration levels will reward you in examinations and research works.",
        travel: "Auspicious long travels are indicated towards historical and spiritual centers.",
        finance: "Strong wealth inflows from multiple lines. Keep expenses checked.",
        children: "Children will excel in exams and bring happiness to the household.",
        remedies: "Observe fasts on Thursdays and donate yellow garments.",
        luckyNumber: 9,
        luckyColor: "Saffron Red",
        luckyDirection: "East",
        luckyGemstone: "Coral"
      },
      te: {
        daily: "ఈ రోజు మానసిక ప్రశాంతతకు మరియు కుటుంబంతో గడపడానికి ఎంతో అనుకూలం.",
        weekly: "ఉద్యోగంలో పురోగతి ఉంటుంది, శ్రమకు తగిన ఫలాలు లభిస్తాయి.",
        monthly: "ధన ప్రవాహం పెరుగుతుంది, పాత బాకీలు వసూలు అవుతాయి.",
        yearly: "ఈ సంవత్సరం మీ కెరీర్ పరంగా మరియు వ్యక్తిగత నివాస మార్పులకు చక్కని మార్పులను తెస్తుంది.",
        career: "కొత్త అవకాశాలకు ద్వారాలు తెరుచుకుంటాయి, ఉన్నత అధికారుల ప్రశంసలు పొందుతారు.",
        marriage: "వివాహ ప్రయత్నాలు సఫలం అవుతాయి, దాంపత్యం మధురంగా సాగుతుంది.",
        business: "వ్యాపార విస్తరణకు పెట్టుబడులు కలసివస్తాయి.",
        health: "ఆరోగ్యం నిలకడగా ఉంటుంది, అలసట నివారణకు ధ్యానం అవసరం.",
        education: "విద్యార్థులకు అనుకూల సమయం, పోటీ పరీక్షలలో విజయం సాధిస్తారు.",
        travel: "దూర ప్రయాణాలు లాభిస్తాయి, పుణ్యక్షేత్రాలు సందర్శిస్తారు.",
        finance: "ఆదాయం తృప్తికరంగా ఉంటుంది, పొదుపు పథకాలలో పెట్టుబడి పెడతారు.",
        children: "సంతానం వల్ల కీర్తి ప్రతిష్టలు పెరుగుతాయి.",
        remedies: "గురువారం ఉపవాసం ఆచరించండి మరియు పేదలకు పండ్లు దానం చేయండి.",
        luckyNumber: 3,
        luckyColor: "పసుపు",
        luckyDirection: "ఈశాన్యం",
        luckyGemstone: "పుష్యరాగం"
      },
      hi: {
        daily: "आज का दिन मानसिक स्पष्टता और रणनीतिक योजना के लिए बहुत उपयोगी रहेगा।",
        weekly: "पेशेवर परियोजनाओं में सकारात्मक गति दिखेगी। वित्तीय स्थिति मजबूत होगी।",
        monthly: "बृहस्पति का गोचर सुख-शांति लाएगा। स्वास्थ्य का विशेष ध्यान रखें।",
        yearly: "यह वर्ष बड़े बदलावों और शुभ विवाह योग वाला साबित होगा। परीक्षा में सफलता मिलेगी।",
        career: "करियर में पदोन्नति और सम्मान मिलने के प्रबल योग हैं।",
        marriage: "दाम्पत्य जीवन में मधुरता बढ़ेगी, नए संबंध स्थापित होंगे।",
        business: "साझेदारी में बड़ा लाभ होगा। नए उद्यमों में निवेश शुभ रहेगा।",
        health: "नियमित योग और ध्यान से शारीरिक एवं मानसिक स्वास्थ्य बेहतर रहेगा।",
        education: "अध्ययन के लिए सर्वोत्तम समय, प्रतियोगी परीक्षाओं में उत्कृष्ट परिणाम मिलेंगे।",
        travel: "धार्मिक और साहसिक यात्राओं के अच्छे अवसर प्राप्त होंगे।",
        finance: "धन प्राप्ति के नए स्रोत खुलेंगे, संचित धन में वृद्धि होगी।",
        children: "संतान पक्ष से सुखद समाचार प्राप्त होंगे, प्रगति होगी।",
        remedies: "गुरुवार को पीली वस्तुओं का दान करें और विष्णु सहस्त्रनाम सुनें।",
        luckyNumber: 5,
        luckyColor: "पीला",
        luckyDirection: "उत्तर-पूर्व",
        luckyGemstone: "पुखराज"
      },
      ta: {
        daily: "இன்று அமைதியான நாளாக அமையும். தேவையற்ற சண்டைகளைத் தவிர்க்கவும்.",
        weekly: "தொழில் மற்றும் வியாபாரத்தில் புதிய முன்னேற்றம் மற்றும் லாபம் கிடைக்கும்.",
        monthly: "பணப்புழக்கம் அதிகரிக்கும், குடும்பத்தில் மகிழ்ச்சி நிலவும்.",
        yearly: "இந்த வருடம் உங்கள் வாழ்க்கையில் பெரிய மாற்றங்களை கொண்டு வரும், திருமண யோகம் கூடிவரும்.",
        career: "புதிய வேலை வாய்ப்புகள் தேடி வரும், மேல் அதிகாரிகளின் ஆதரவு கிடைக்கும்.",
        marriage: "திருமண பேச்சுவார்த்தைகள் சுமுகமாக முடியும், இல்லறம் இன்பமயமாகும்.",
        business: "வியாபாரக் கூட்டாளிகளிடையே நல்ல புரிதல் ஏற்பட்டு லாபம் கூடும்.",
        health: "உடல் நலம் சீராக இருக்கும். எளிய உடற்பயிற்சிகளைத் தொடங்கவும்.",
        education: "கல்வியில் மாணவர்கள் நல்ல மதிப்பெண்கள் பெற்று சாதனை படைப்பார்கள்.",
        travel: "வெளியூர் பயணங்களால் நன்மைகள் ஏற்படும், ஆன்மீக ஈடுபாடு கூடும்.",
        finance: "நிதி நிலைமை திருப்திகரமாக இருக்கும், சேமிப்புப் பழக்கம் அதிகரிக்கும்.",
        children: "பிள்ளைகளால் பெருமை சேரும், அவர்களின் கல்வியில் முன்னேற்றம் இருக்கும்.",
        remedies: "வியாழக்கிழமை விரதம் இருந்து மஞ்சள் நிற தானியங்களை தானம் செய்யுங்கள்.",
        luckyNumber: 2,
        luckyColor: "மஞ்சள்",
        luckyDirection: "வடகிழக்கு",
        luckyGemstone: "கனகபுஷ்பராகம்"
      },
      kn: {
        daily: "ಇಂದು ದಿನಸಿ ವ್ಯವಹಾರ ಹಾಗೂ ಹೊಸ ಯೋಜನೆಗಳ ಚಾಲನೆಗೆ ಶುಭಕರವಾಗಿದೆ.",
        weekly: "ಉದ್ಯೋಗದಲ್ಲಿ ಹೊಸ ಜವಾಬ್ದಾರಿಗಳು ಸಿಗಲಿವೆ. ಆದಾಯ ಹೆಚ್ಚಾಗಲಿದೆ.",
        monthly: "ಸದ್ಭಾವನೆಗಳು ಮೂಡಲಿವೆ. ಆರೋಗ್ಯದ ಬಗ್ಗೆ ಕಾಳಜಿ ವಹಿಸುವುದು ಉತ್ತಮ.",
        yearly: "ಈ ವರ್ಷ ಹೊಸ ಆಸ್ತಿ ಖರೀದಿ ಮತ್ತು ಸಂಕ್ರಾಂತಿಯ ನಂತರ ಮದುವೆಯಾಗಲು ತುಂಬಾ ಸೂಕ್ತವಾಗಿದೆ.",
        career: "ಕೆಲಸದ ಸ್ಥಳದಲ್ಲಿ ಮನ್ನಣೆ ಸಿಗುತ್ತದೆ, ಗೌರವ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
        marriage: "ಮದುವೆಯ ಅಡೆತಡೆಗಳು ನಿವಾರಣೆಯಾಗಿ ಕಂಕಣ ಬಲ ಕೂಡಿಬರುತ್ತದೆ.",
        business: "ಹಣಕಾಸು ವ್ಯವಹಾರಗಳಲ್ಲಿ ಪ್ರಗತಿ ಕಂಡುಬರುತ್ತದೆ, ಆದಾಯ ದ್ವಿಗುಣಗೊಳ್ಳುತ್ತದೆ.",
        health: "ಆರೋಗ್ಯದಲ್ಲಿ ಸ್ಥಿರತೆ ಇರುತ್ತದೆ, ಪ್ರಾಣಾಯಾಮದಿಂದ ಸಮಾಧಾನ ಲಭಿಸುತ್ತದೆ.",
        education: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉತ್ತಮ ದಿನಗಳು, ವಿದ್ಯಾಭ್ಯಾಸದಲ್ಲಿ ಉನ್ನತ ಪ್ರಗತಿ ಇರುತ್ತದೆ.",
        travel: "ಸ್ಪಷ್ಟ ಯೋಜಿತ ಪ್ರಯಾಣಗಳು ಯಶಸ್ವಿಯಾಗುತ್ತವೆ ಮತ್ತು ಜ್ಞಾನಾರ್ಜನೆ ನಿವಾಸ ಉಂಟಾಗುತ್ತವೆ.",
        finance: "ಉಳಿತಾಯದಲ್ಲಿ ಹೆಚ್ಛಳ ಉಂಟಾಗಲಿದೆ, ನಿರೀಕ್ಷಿತ ಹಣ ಕೈ ಸೇರಲಿದೆ.",
        children: "ಮಕ್ಕಳ ಕಡೆಯಿಂದ ಸಂತಸದ ವಾರ್ತೆ ಸಿಗಲಿದೆ.",
        remedies: "ಗುರುವಾರ ದೇವಸ್ಥಾನಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಕಡಲೆ ಬೇಳೆ ದಾನ ಮಾಡಿರಿ.",
        luckyNumber: 6,
        luckyColor: "ಹಳದಿ",
        luckyDirection: "ಪೂರ್ವ",
        luckyGemstone: "ಪುಷ್ಯರಾಗ"
      }
    };

    return translations[lang] || translations["en"];
  }
}
