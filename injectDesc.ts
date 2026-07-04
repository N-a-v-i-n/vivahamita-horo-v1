import fs from 'fs';
import path from 'path';

const langs = ['en', 'te', 'hi', 'ta', 'kn'];

const descs: Record<string, Record<string, string>> = {
  en: {
    DINA: "Health and longevity indicators",
    GANA: "Wavelength and lifestyle temperaments",
    MAHENDRA: "Progeny, children and well-being",
    RAJJU: "Traditionally associated with marital longevity, stability, and protection of the couple.",
    VEDHA: "Protection from dynamic disputes",
    YONI: "Physical harmony compatibility"
  },
  te: {
    DINA: "ఆరోగ్యం మరియు ఆయుర్దాయ సూచికలు",
    GANA: "తరంగదైర్ఘ్యం మరియు జీవనశైలి స్వభావాలు",
    MAHENDRA: "సంతానం, పిల్లలు మరియు శ్రేయస్సు",
    RAJJU: "భర్త ఆయుర్దాయ సూచిక",
    VEDHA: "వివాదాల నుండి రక్షణ",
    YONI: "శారీరక సామరస్య అనుకూలత"
  },
  hi: {
    DINA: "स्वास्थ्य और दीर्घायु संकेतक",
    GANA: "तरंगदैर्ध्य और जीवन शैली स्वभाव",
    MAHENDRA: "संतति, संतान और कल्याण",
    RAJJU: "पति दीर्घायु सूचकांक",
    VEDHA: "विवादों से सुरक्षा",
    YONI: "शारीरिक सामंजस्य अनुकूलता"
  },
  ta: {
    DINA: "உடல்நலம் மற்றும் ஆயுள் குறிகாட்டிகள்",
    GANA: "வாழ்க்கை முறை மற்றும் மனோபாவம்",
    MAHENDRA: "குழந்தை பாக்கியம் மற்றும் நல்வாழ்வு",
    RAJJU: "கணவன் ஆயுள் மற்றும் தம்பதி பாதுகாப்பு",
    VEDHA: "மோதல்கள் மற்றும் சிக்கல்களிலிருந்து பாதுகாப்பு",
    YONI: "உடல் இணக்கம் மற்றும் நெருக்கம்"
  },
  kn: {
    DINA: "ಆರೋಗ್ಯ ಮತ್ತು ದೀರ್ಘಾಯುಷ್ಯದ ಸೂಚಕಗಳು",
    GANA: "ಜೀವನಶೈಲಿ ಮತ್ತು ಮನೋಭಾವ",
    MAHENDRA: "ಸಂತಾನ, ಮಕ್ಕಳು ಮತ್ತು ಯೋಗಕ್ಷೇಮ",
    RAJJU: "ಪತಿಯ ದೀರ್ಘಾಯುಷ್ಯ ಮತ್ತು ದಂಪತಿಗಳ ರಕ್ಷಣೆ",
    VEDHA: "ವಿವಾದಗಳು ಮತ್ತು ತೊಂದರೆಗಳಿಂದ ರಕ್ಷಣೆ",
    YONI: "ದೈಹಿಕ ಸಾಮರಸ್ಯ ಮತ್ತು ಹೊಂದಾಣಿಕೆ"
  }
};

langs.forEach(lang => {
  const file = path.join(process.cwd(), 'src/localization', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.PORUTHAM_DESC = descs[lang];
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
