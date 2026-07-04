import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJulianDate, getAyanamsa, computePlanetPosition } from '../../src/utils/astroCalc.js';
import swisseph from 'swisseph';

describe('Stress Test: 10,000 Random Birth Charts', () => {
  it('computes 10,000 random charts and collects maximum error bounds', () => {
    let maxError = 0;
    let minError = 1000;
    let totalError = 0;
    const errors: number[] = [];

    const TOTAL = 10000;

    for (let i = 0; i < TOTAL; i++) {
      const year = Math.floor(Math.random() * 6000) - 3000;
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      const hour = Math.floor(Math.random() * 24);
      const min = Math.floor(Math.random() * 60);
      const tz = (Math.random() * 24) - 12;

      const jd = getJulianDate(year, month, day, hour, min, tz);
      swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
      const ayanamsa = getAyanamsa(jd, 'Lahiri');

      const pos = computePlanetPosition('Sun', jd, ayanamsa, 'en');
      const flag = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;
      const sweResult = swisseph.swe_calc_ut(jd, swisseph.SE_SUN, flag) as any;
      
      let diff = Math.abs(pos.longitude - sweResult.longitude);
      diff = Math.min(diff, 360 - diff);

      if (diff > maxError) maxError = diff;
      if (diff < minError) minError = diff;
      totalError += diff;
      errors.push(diff);
    }

    errors.sort((a, b) => a - b);
    const avgError = totalError / TOTAL;
    const p95 = errors[Math.floor(TOTAL * 0.95)];
    const p99 = errors[Math.floor(TOTAL * 0.99)];

    console.log(`\n--- Stress Test Results (10,000 charts) ---`);
    console.log(`Maximum Error: ${maxError.toFixed(8)}°`);
    console.log(`Minimum Error: ${minError.toFixed(8)}°`);
    console.log(`Average Error: ${avgError.toFixed(8)}°`);
    console.log(`95th Percentile: ${p95.toFixed(8)}°`);
    console.log(`99th Percentile: ${p99.toFixed(8)}°`);
    console.log(`-------------------------------------------`);

    assert.ok(maxError < 0.0001, `Max error exceeded tolerance: ${maxError}`);
  });
});
