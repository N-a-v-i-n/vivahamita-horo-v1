import fs from 'fs';
import path from 'path';
import Sanscript from '@indic-transliteration/sanscript';

export class MissingTranslationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingTranslationException';
  }
}

export class LocalizationIntegrityException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalizationIntegrityException';
  }
}

export class UnsupportedLanguageException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsupportedLanguageException';
  }
}

const SUPPORTED_LANGUAGES = ['en', 'te', 'hi', 'ta', 'kn'];
type Dict = Record<string, any>;

export class LocalizationEngine {
  private static instance: LocalizationEngine;
  private dictionaries: Record<string, Dict> = {};

  private constructor() {
    this.loadDictionaries();
    this.validateIntegrity();
  }

  public static getInstance(): LocalizationEngine {
    if (!LocalizationEngine.instance) {
      LocalizationEngine.instance = new LocalizationEngine();
    }
    return LocalizationEngine.instance;
  }

  private loadDictionaries() {
    for (const lang of SUPPORTED_LANGUAGES) {
      try {
        const filePath = path.join(process.cwd(), 'src/localization', `${lang}.json`);
        const data = fs.readFileSync(filePath, 'utf8');
        this.dictionaries[lang] = JSON.parse(data);
      } catch (err) {
        throw new LocalizationIntegrityException(`Failed to load dictionary for ${lang}: ${err}`);
      }
    }
  }

  private validateIntegrity() {
    const enDict = this.dictionaries['en'];

    const checkKeys = (master: any, target: any, pathStr: string, lang: string) => {
      if (typeof master !== 'object' || master === null) {
        if (typeof master !== typeof target) {
          throw new LocalizationIntegrityException(`Type mismatch at ${pathStr} in ${lang}. Expected ${typeof master}, got ${typeof target}`);
        }
        return;
      }

      const masterKeys = Object.keys(master).sort();
      const targetKeys = Object.keys(target || {}).sort();

      if (masterKeys.length !== targetKeys.length || !masterKeys.every((k, i) => k === targetKeys[i])) {
        const missing = masterKeys.filter(k => !targetKeys.includes(k));
        const extra = targetKeys.filter(k => !masterKeys.includes(k));
        throw new LocalizationIntegrityException(`Key mismatch in ${lang} at ${pathStr}. Missing: ${missing.join(',')}. Extra: ${extra.join(',')}`);
      }

      for (const k of masterKeys) {
        checkKeys(master[k], target[k], pathStr ? `${pathStr}.${k}` : k, lang);
      }
    };

    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang === 'en') continue;
      checkKeys(enDict, this.dictionaries[lang], '', lang);
    }
  }

  public get(keyPath: string, lang: string): string {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      throw new UnsupportedLanguageException(`Language ${lang} is not supported.`);
    }

    const keys = keyPath.split('.');
    let current = this.dictionaries[lang];

    for (const k of keys) {
      if (current === undefined || current === null || !(k in current)) {
        throw new MissingTranslationException(`Missing translation for key: ${keyPath} in language: ${lang}`);
      }
      current = current[k];
    }

    if (typeof current !== 'string') {
      throw new MissingTranslationException(`Key ${keyPath} in language ${lang} does not resolve to a string.`);
    }

    return current;
  }

  public getNormalizedInput(keyPath: string, input: string, lang: string): string {
    // A helper for CITIES, etc. If it fails, fallback to input but we could log it
    const internalId = input.toUpperCase().replace(/\s+/g, '_');
    try {
      return this.get(`${keyPath}.${internalId}`, lang);
    } catch (e) {
      console.warn(`[LOCALIZATION WARNING] Missing translation for input: ${input} at ${keyPath}.${internalId}`);
      return this.transliterate(input, lang); // Fallback to transliteration
    }
  }

  public transliterate(text: string, lang: string): string {
    if (!text || typeof text !== 'string') return text;
    if (lang === 'en') return text;

    const scriptMap: Record<string, string> = {
      te: 'telugu',
      hi: 'devanagari',
      ta: 'tamil',
      kn: 'kannada'
    };

    const targetScript = scriptMap[lang];
    if (!targetScript) return text;

    // Convert input to lowercase because standard english names with capitals
    // will be treated as aspirated consonants in ITRANS mapping.
    // e.g. "Sanjay" -> "S" (sh) -> "ష" instead of "స" (s)
    const normalizedInput = text.toLowerCase();

    try {
      return Sanscript.t(normalizedInput, 'itrans', targetScript);
    } catch (e) {
      console.warn(`[LOCALIZATION WARNING] Transliteration failed for: ${text}`);
      return text;
    }
  }
}
