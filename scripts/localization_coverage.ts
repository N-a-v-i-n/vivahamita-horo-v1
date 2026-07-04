import fs from 'fs';
import path from 'path';

const SUPPORTED_LANGUAGES = ['en', 'te', 'hi', 'ta', 'kn'];
const dicts: Record<string, any> = {};

SUPPORTED_LANGUAGES.forEach(lang => {
  const data = fs.readFileSync(path.join(process.cwd(), 'src/localization', `${lang}.json`), 'utf8');
  dicts[lang] = JSON.parse(data);
});

const enDict = dicts['en'];
let hasError = false;

const countKeys = (obj: any): number => {
  if (typeof obj !== 'object' || obj === null) return 1;
  let count = 0;
  for (const k of Object.keys(obj)) {
    count += countKeys(obj[k]);
  }
  return count;
};

const totalKeys = countKeys(enDict);

console.log("=== Localization Coverage Report ===");

for (const lang of SUPPORTED_LANGUAGES) {
  if (lang === 'en') {
    console.log(`English     100%`);
    continue;
  }
  
  let validKeys = 0;
  const targetDict = dicts[lang];
  const missing: string[] = [];

  const compare = (master: any, target: any, pathStr: string) => {
    if (typeof master !== 'object' || master === null) {
      if (typeof target === 'string' && target.trim().length > 0) {
        validKeys++;
      } else {
        missing.push(pathStr);
      }
      return;
    }
    
    for (const k of Object.keys(master)) {
      if (target === undefined || target === null || !(k in target)) {
        missing.push(pathStr ? `${pathStr}.${k}` : k);
        // We do not increment valid keys here
      } else {
        compare(master[k], target[k], pathStr ? `${pathStr}.${k}` : k);
      }
    }
  };
  
  compare(enDict, targetDict, '');
  
  const percentage = ((validKeys / totalKeys) * 100).toFixed(0);
  
  const paddedLang = (lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'Kannada').padEnd(12, ' ');
  console.log(`${paddedLang}${percentage}%`);
  
  if (validKeys < totalKeys) {
    hasError = true;
    console.error(`\n[ERROR] Missing keys in ${lang}:`);
    missing.forEach(m => console.error(`  - ${m}`));
  }
}

if (hasError) {
  console.error("\n[FATAL] Localization coverage must be exactly 100%. Build failed.");
  process.exit(1);
} else {
  console.log("\n✅ All localization dictionaries maintain identical structure and 100% key parity.");
}
