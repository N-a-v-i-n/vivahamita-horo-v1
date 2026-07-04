import fs from 'fs';
import path from 'path';

const langs = ['en', 'te', 'hi', 'ta', 'kn'];
const dir = '/home/naveen/projects/vivahamita-horo-v1/src/localization';

const extraDoshas = {
  en: { GURUCHANDAL: "Guru Chandal Dosha", KEMADRUMA: "Kemadruma Dosha", PITRU: "Pitru Dosha" },
  te: { GURUCHANDAL: "గురు చండాల దోషం", KEMADRUMA: "కేమద్రుమ దోషం", PITRU: "పితృ దోషం" },
  hi: { GURUCHANDAL: "गुरु चांडाल दोष", KEMADRUMA: "केमद्रुम दोष", PITRU: "पितृ दोष" },
  ta: { GURUCHANDAL: "குரு சாண்டால தோஷம்", KEMADRUMA: "கேமத்ரும தோஷம்", PITRU: "பித்ரு தோஷம்" },
  kn: { GURUCHANDAL: "ಗುರು ಚಂಡಾಲ ದೋಷ", KEMADRUMA: "ಕೇಮದ್ರುಮ ದೋಷ", PITRU: "ಪಿತೃ ದೋಷ" }
};

langs.forEach(lang => {
  const p = path.join(dir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  Object.assign(data.DOSHA, extraDoshas[lang]);
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});
