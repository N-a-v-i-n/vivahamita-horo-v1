import { IAstrologyModule, AnalysisContext } from '../../models/types';

export class YogaModule implements IAstrologyModule {
  name = 'YogaModule';

  public execute(context: AnalysisContext): void {
    const { raw, facts } = context;
    const yogas: string[] = [];

    // Utility to get house of a planet
    const getHouse = (planetName: string) => {
      const p = raw.planetaryTable.find(x => x.planet === planetName);
      return p ? p.house : -1;
    };

    const moonHouse = getHouse('Moon');
    const jupHouse = getHouse('Jupiter');
    const sunHouse = getHouse('Sun');
    const mercHouse = getHouse('Mercury');

    // Gaja Kesari Yoga: Jupiter in Kendra (1,4,7,10) from Moon
    if (moonHouse !== -1 && jupHouse !== -1) {
      let diff = Math.abs(jupHouse - moonHouse) + 1;
      if (diff > 12) diff -= 12; // simplified modular distance
      if ([1, 4, 7, 10].includes(diff)) {
        yogas.push("Gaja Kesari Yoga");
      }
    }

    // Budha Aditya Yoga: Sun and Mercury in the same house
    if (sunHouse !== -1 && mercHouse !== -1 && sunHouse === mercHouse) {
      yogas.push("Budha Aditya Yoga");
    }

    facts.yogas = yogas;
  }
}
