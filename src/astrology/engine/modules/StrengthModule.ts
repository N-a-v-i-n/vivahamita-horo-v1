import { IAstrologyModule, AnalysisContext, PlanetStatus, PlanetStrength } from '../../models/types';
import dignityData from '../../data/dignity.json';
import strengthConfig from '../../data/strengthConfig.json';

export class StrengthModule implements IAstrologyModule {
  name = 'StrengthModule';

  public execute(context: AnalysisContext): void {
    const { raw, facts } = context;

    let strongestPlanet = "";
    let maxStrength = -999;
    let weakestPlanet = "";
    let minStrength = 999;

    raw.planetaryTable.forEach(p => {
      if (p.planet === "Lagna" || p.planet === "Ascendant") return;

      const strength: PlanetStrength = {
        dignity: 0,
        house: 0,
        aspects: 0,
        conjunctions: 0,
        divisional: 0,
        final: 0,
        reasons: []
      };

      // Dignity Scoring
      const pDignity = dignityData[p.planet as keyof typeof dignityData];
      if (pDignity) {
        if (pDignity.exalted === p.sign) {
          strength.dignity = strengthConfig.dignity.EXALTED;
          strength.reasons.push(`${p.planet} is exalted in ${p.sign}`);
        } else if (pDignity.debilitated === p.sign) {
          strength.dignity = strengthConfig.dignity.DEBILITATED;
          strength.reasons.push(`${p.planet} is debilitated in ${p.sign}`);
        } else if (pDignity.own.includes(p.sign)) {
          strength.dignity = strengthConfig.dignity.OWN_SIGN;
          strength.reasons.push(`${p.planet} is in its own sign of ${p.sign}`);
        } else {
          // Simplification: Assume neutral for now if not explicitly modeled
          strength.dignity = strengthConfig.dignity.NEUTRAL;
        }
      }

      // House Scoring
      if ([1, 4, 7, 10].includes(p.house)) {
        strength.house = strengthConfig.house.KENDRA;
        strength.reasons.push(`Placed in a Kendra (${p.house}th house)`);
      } else if ([5, 9].includes(p.house)) {
        strength.house = strengthConfig.house.TRIKONA;
        strength.reasons.push(`Placed in a Trikona (${p.house}th house)`);
      } else if ([6, 8, 12].includes(p.house)) {
        strength.house = strengthConfig.house.DUSTHANA;
        strength.reasons.push(`Placed in a Dusthana (${p.house}th house)`);
      } else {
        strength.house = strengthConfig.house.UPACHAYA;
      }

      // Vargottama Check (comparing with navamsaChart if available)
      if (raw.navamsaChart) {
        let navamsaSign = 0;
        for (const [houseStr, occupants] of Object.entries(raw.navamsaChart)) {
          if (occupants.includes(p.planet)) {
            navamsaSign = parseInt(houseStr, 10);
            break;
          }
        }
        if (navamsaSign === p.signNumber) {
          strength.divisional = strengthConfig.status.VARGOTTAMA;
          strength.reasons.push(`Vargottama (same sign in D1 and D9)`);
        }
      }

      strength.final = strength.dignity + strength.house + strength.aspects + strength.conjunctions + strength.divisional;

      if (strength.final > maxStrength) {
        maxStrength = strength.final;
        strongestPlanet = p.planet;
      }
      if (strength.final < minStrength) {
        minStrength = strength.final;
        weakestPlanet = p.planet;
      }

      facts.planets[p.planet] = {
        planet: p.planet,
        isRetrograde: false, // Would come from API
        isCombust: false,    // Would come from API
        isVargottama: strength.divisional > 0,
        strength
      };

      if (p.planet === raw.panchanga.lagnaLord) {
        facts.lagnaLordStrength = strength.final;
      }
    });

    facts.strongestPlanet = strongestPlanet;
    facts.weakestPlanet = weakestPlanet;
  }
}
