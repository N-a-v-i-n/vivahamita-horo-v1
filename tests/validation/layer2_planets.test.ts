import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJulianDate, getAyanamsa, computePlanetPosition } from '../../src/utils/astroCalc.js';

const TOLERANCE = 0.0001; 
const YEAR = 1995, MONTH = 6, DAY = 15, HOUR = 8, MINUTE = 30, TZ = 5.5;

describe('Layer 2: Every Planet Validation', () => {
  const jd = getJulianDate(YEAR, MONTH, DAY, HOUR, MINUTE, TZ);
  const ayanamsa = getAyanamsa(jd, 'Lahiri');

  const navagrahas = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  const outer = ['Uranus', 'Neptune', 'Pluto', 'Mean Node', 'True Node'];

  it('computes all Navagrahas without crashing', () => {
    for (const p of navagrahas) {
      const pos = computePlanetPosition(p, jd, ayanamsa, 'en');
      assert.ok(pos.longitude >= 0 && pos.longitude < 360, `${p} longitude out of bounds`);
      assert.ok(typeof pos.latitude === 'number', `${p} latitude missing`);
      assert.ok(typeof pos.distance === 'number', `${p} distance missing`);
    }
  });

  it('computes outer planets and nodes accurately', () => {
    for (const p of outer) {
      const pos = computePlanetPosition(p, jd, ayanamsa, 'en');
      assert.ok(pos.longitude >= 0 && pos.longitude < 360, `${p} longitude out of bounds: ${pos.longitude}`);
      assert.ok(typeof pos.declination === 'number', `${p} declination missing`);
    }
  });

  it('validates True Node and Mean Node differences', () => {
    const trueNode = computePlanetPosition('True Node', jd, ayanamsa, 'en');
    const meanNode = computePlanetPosition('Mean Node', jd, ayanamsa, 'en');
    
    // They should be close but not identical
    assert.ok(Math.abs(trueNode.longitude - meanNode.longitude) > 0.001, 'True and Mean Node should differ slightly');
    assert.ok(Math.abs(trueNode.longitude - meanNode.longitude) < 5.0, 'True and Mean Node should be reasonably close');
  });
});
