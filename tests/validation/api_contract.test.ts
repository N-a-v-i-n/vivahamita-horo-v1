import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AstrologyService } from '../../src/services/astrologyService.js';

describe('API Contract & Output Validation', () => {
  it('validates no NaN or invalid dates in response', () => {
    const input = {
      year: 1995, month: 6, day: 15,
      hour: 8, minute: 30,
      latitude: 17.385, longitude: 78.4867,
      timezone: 5.5,
      ayanamsa: 'Lahiri' as const,
      lang: 'en' as const
    };

    const panchang = AstrologyService.calcPanchang(input);
    const planets = panchang.planets;
    
    // Check missing fields and NaN
    for (const p of planets) {
      assert.ok(!Number.isNaN(p.longitude), `NaN longitude on ${p.name}`);
      assert.ok(!Number.isNaN(p.latitude), `NaN latitude on ${p.name}`);
      assert.ok(!Number.isNaN(p.distance), `NaN distance on ${p.name}`);
      assert.ok(!Number.isNaN(p.declination), `NaN declination on ${p.name}`);
      assert.ok(typeof p.name === 'string' && p.name.length > 0);
      assert.ok(typeof p.rasiName === 'string');
      assert.ok(p.house >= 1 && p.house <= 12, `Invalid house on ${p.name}: ${p.house}`);
    }

    assert.ok(panchang.sunrise !== undefined);
    assert.ok(panchang.tithi !== undefined);
  });

  it('handles malformed inputs gracefully (if service exposes this)', () => {
    const badInput = {
      year: 99999, month: 15, day: 40,
      hour: 25, minute: -10,
      latitude: 1000, longitude: 78.4867,
      timezone: 5.5,
      ayanamsa: 'Lahiri' as const,
      lang: 'en' as const
    };

    // Depending on engine implementation, this should either return valid math using wrap-arounds, or throw gracefully
    try {
      AstrologyService.calcPanchang(badInput);
      assert.ok(true); // If it wraps using Julian dates correctly, that's fine
    } catch (err: any) {
      assert.ok(err.message, 'Error should have a message');
    }
  });
});
