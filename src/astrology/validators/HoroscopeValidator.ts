import { HoroscopeV2ResponseData } from '../../types/horoscopeV2';

export class HoroscopeValidator {
  public static validate(raw: HoroscopeV2ResponseData): boolean {
    if (!raw || !raw.planetaryTable || !raw.houses) {
      console.warn("HoroscopeValidator: Missing core chart data.");
      return false;
    }

    const planets = raw.planetaryTable;
    if (planets.length < 9) {
      console.warn(`HoroscopeValidator: Incomplete planet list. Expected 9, got ${planets.length}`);
      return false;
    }

    const uniquePlanets = new Set(planets.map(p => p.planet));
    if (uniquePlanets.size !== planets.length) {
      console.warn("HoroscopeValidator: Duplicate planets detected.");
      return false;
    }

    const houses = raw.houses;
    if (houses.length !== 12) {
      console.warn(`HoroscopeValidator: Invalid house count. Expected 12, got ${houses.length}`);
      return false;
    }

    // Additional validations can be added here (e.g., degree ranges, sign checks)
    return true;
  }
}
