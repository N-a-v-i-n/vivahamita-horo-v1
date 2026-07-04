import * as fs from 'fs';
import * as path from 'path';

export interface LocalizedString {
  en: string;
  te?: string;
  ta?: string;
  kn?: string;
  hi?: string;
}

export interface LocalizedEntity {
  id: string;
  name: LocalizedString;
  [key: string]: any;
}

export class LocalizationService {
  private static planets: Record<string, LocalizedEntity> | null = null;
  private static rasis: Record<string, LocalizedEntity> | null = null;
  private static nakshatras: Record<string, LocalizedEntity> | null = null;

  private static loadJson(filename: string): any {
    try {
      // In ESM __dirname is not available by default. Use process.cwd() as a robust fallback for the API.
      const filePath = path.resolve(process.cwd(), 'src', 'data', filename);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error(`Failed to load localization file: ${filename}`, e);
      return {};
    }
  }

  private static init() {
    if (!this.planets) this.planets = this.loadJson('planets.json');
    if (!this.rasis) this.rasis = this.loadJson('rasis.json');
    if (!this.nakshatras) this.nakshatras = this.loadJson('nakshatras.json');
  }

  /**
   * Safe getter that falls back to a dummy English string if not found.
   */
  private static safeGet(dictionary: Record<string, LocalizedEntity> | null, key: string, fallback: string): LocalizedEntity {
    if (!dictionary) this.init();
    
    // Convert to lowercase and strip spaces for safe matching
    const safeKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Exact match or fallback mapping
    const match = dictionary![safeKey] || dictionary![key];
    
    if (match) return match;
    
    // Fallback if missing
    return {
      id: safeKey,
      name: { en: fallback }
    };
  }

  public static getPlanet(name: string): LocalizedEntity {
    this.init();
    return this.safeGet(this.planets, name, name);
  }

  public static getRasi(name: string): LocalizedEntity {
    this.init();
    return this.safeGet(this.rasis, name, name);
  }

  public static getNakshatra(name: string): LocalizedEntity {
    this.init();
    return this.safeGet(this.nakshatras, name, name);
  }
}
