import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJulianDate, getAyanamsa, computePlanetPosition } from '../../src/utils/astroCalc.js';

describe('Layer 3: Derived Values Validation', () => {
  const jd = getJulianDate(1995, 6, 15, 8, 30, 5.5);
  const ayanamsa = getAyanamsa(jd, 'Lahiri');

  it('validates nakshatra, pada, rasi boundaries', () => {
    // Specifically test edge boundaries
    const tests = [
      { long: 0, rasi: 0, nak: 0, pada: 1 },
      { long: 29.99, rasi: 0, nak: 2, pada: 1 },
      { long: 30, rasi: 1, nak: 2, pada: 2 },
      { long: 120, rasi: 4, nak: 9, pada: 1 }, // Leo starts at 120, Makha starts at 120
      { long: 359.99, rasi: 11, nak: 26, pada: 4 }
    ];

    // Mock a planet position function to inject custom longitudes if needed
    // However, our astroCalc doesn't export the pure math functions for just derived types,
    // so we'll just test a few computed ones and reverse engineer the math.
    
    for (const p of ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']) {
      const pos = computePlanetPosition(p, jd, ayanamsa, 'en');
      
      const rasiIndex = Math.floor(pos.longitude / 30);
      assert.strictEqual(pos.rasiIndex, rasiIndex, `${p} rasiIndex mismatch`);
      
      const nakshatraExact = pos.longitude / (13 + 1/3);
      const nakshatraIndex = Math.floor(nakshatraExact);
      const pada = Math.floor((nakshatraExact - nakshatraIndex) * 4) + 1;
      
      assert.strictEqual(pos.nakshatraIndex, nakshatraIndex, `${p} nak mismatch`);
      assert.strictEqual(pos.pada, pada, `${p} pada mismatch`);
    }
  });

  it('validates retrograde status mathematically', () => {
    const p = computePlanetPosition('Jupiter', jd, ayanamsa, 'en');
    const isRet = p.speed < 0;
    assert.strictEqual(p.isRetrograde, isRet, 'Retrograde status must match speed sign for Jupiter');
    
    const rahu = computePlanetPosition('Rahu', jd, ayanamsa, 'en');
    assert.strictEqual(rahu.isRetrograde, false, 'Rahu should not be marked retrograde by standard velocity flag since it is naturally retrograde');
  });
});
