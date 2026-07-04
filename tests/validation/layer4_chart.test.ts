import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJulianDate, getAyanamsa, computePlanetPosition, getHouseData } from '../../src/utils/astroCalc.js';
import swisseph from 'swisseph';

const TOLERANCE = 0.0001; 

describe('Layer 4: 1000 Random Charts Math Equality Fuzz Test', () => {
  it('validates 1000 random charts against raw swisseph calls', () => {
    // Generate 1000 random inputs
    for (let i = 0; i < 1000; i++) {
      // Span years from -3000 to +3000
      const year = Math.floor(Math.random() * 6000) - 3000;
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      const hour = Math.floor(Math.random() * 24);
      const min = Math.floor(Math.random() * 60);
      const tz = (Math.random() * 24) - 12;
      const lat = (Math.random() * 170) - 85; // avoid exact poles
      const lon = (Math.random() * 360) - 180;

      const jd = getJulianDate(year, month, day, hour, min, tz);
      swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
      const ayanamsa = getAyanamsa(jd, 'Lahiri');

      // Test Sun as proxy for planets
      const pos = computePlanetPosition('Sun', jd, ayanamsa, 'en');
      const flag = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;
      const sweResult = swisseph.swe_calc_ut(jd, swisseph.SE_SUN, flag) as any;
      
      let diff = Math.abs(pos.longitude - sweResult.longitude);
      diff = Math.min(diff, 360 - diff);
      assert.ok(diff < TOLERANCE, `Fuzz fail Sun at JD ${jd}: Diff = ${diff}`);

      // Test Ascendant
      const houseData = getHouseData(jd, lat, lon, ayanamsa);
      const houseResult = swisseph.swe_houses_ex(jd, swisseph.SEFLG_SIDEREAL, lat, lon, 'W') as any;
      
      let diffAsc = Math.abs(houseData.ascendant - houseResult.ascendant);
      diffAsc = Math.min(diffAsc, 360 - diffAsc);
      assert.ok(diffAsc < TOLERANCE, `Fuzz fail Ascendant at JD ${jd}, Lat ${lat}: Diff = ${diffAsc}`);
    }
  });
});
