import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJulianDate, getAyanamsa, computePlanetPosition, getHouseData } from '../../src/utils/astroCalc.js';
import swisseph from 'swisseph';

const TOLERANCE = 0.0001; // exact match within rounding
const YEAR = 1995, MONTH = 6, DAY = 15, HOUR = 8, MINUTE = 30, TZ = 5.5;
const LAT = 17.385, LON = 78.4867;

describe('Layer 1: Swiss Ephemeris Mathematical Validation', () => {
  const jd = getJulianDate(YEAR, MONTH, DAY, HOUR, MINUTE, TZ);
  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
  const ayanamsa = getAyanamsa(jd, 'Lahiri');

  it('validates Julian Day', () => {
    const utcHour = HOUR + MINUTE / 60 - TZ;
    const expectedJd = swisseph.swe_julday(YEAR, MONTH, DAY, utcHour, swisseph.SE_GREG_CAL);
    assert.ok(Math.abs(jd - expectedJd) < TOLERANCE);
  });

  it('validates Lahiri Ayanamsa', () => {
    const sweAyanamsa = swisseph.swe_get_ayanamsa_ut(jd);
    assert.ok(Math.abs(ayanamsa - sweAyanamsa) < TOLERANCE);
  });

  it('validates Sun longitude, latitude, speed, distance, declination', () => {
    const pos = computePlanetPosition('Sun', jd, ayanamsa, 'en');
    const flag = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;
    const sweResult = swisseph.swe_calc_ut(jd, swisseph.SE_SUN, flag) as any;
    
    const eqFlag = swisseph.SEFLG_EQUATORIAL | swisseph.SEFLG_SPEED;
    const eqResult = swisseph.swe_calc_ut(jd, swisseph.SE_SUN, eqFlag) as any;

    let diffLong = Math.abs(pos.longitude - sweResult.longitude);
    assert.ok(Math.min(diffLong, 360 - diffLong) < TOLERANCE);
    assert.ok(Math.abs(pos.latitude - sweResult.latitude) < TOLERANCE);
    assert.ok(Math.abs(pos.distance - sweResult.distance) < TOLERANCE);
    assert.ok(Math.abs(pos.speed - sweResult.longitudeSpeed) < TOLERANCE);
    assert.ok(Math.abs(pos.declination - eqResult.declination) < TOLERANCE);
  });

  it('validates Rahu and Ketu correctly', () => {
    const rahu = computePlanetPosition('Rahu', jd, ayanamsa, 'en');
    const ketu = computePlanetPosition('Ketu', jd, ayanamsa, 'en');
    
    let diff = Math.abs(rahu.longitude - ketu.longitude);
    diff = Math.min(diff, 360 - diff);
    assert.ok(Math.abs(diff - 180) < TOLERANCE);
    assert.ok(Math.abs(rahu.latitude - (-ketu.latitude)) < TOLERANCE);
    assert.ok(Math.abs(rahu.declination - (-ketu.declination)) < TOLERANCE);
  });

  it('validates Ascendant, MC, ARMC, Vertex, and House Cusps', () => {
    const houseData = getHouseData(jd, LAT, LON, ayanamsa);
    const flag = swisseph.SEFLG_SIDEREAL;
    const result = swisseph.swe_houses_ex(jd, flag, LAT, LON, 'W') as any;
    
    let diffAsc = Math.abs(houseData.ascendant - result.ascendant);
    assert.ok(Math.min(diffAsc, 360 - diffAsc) < TOLERANCE);
    
    assert.ok(Math.abs(houseData.mc - result.mc) < TOLERANCE);
    assert.ok(Math.abs(houseData.armc - result.armc) < TOLERANCE);
    assert.ok(Math.abs(houseData.vertex - result.vertex) < TOLERANCE);
    
    // Check cusps
    for (let i = 0; i < 12; i++) {
      assert.ok(Math.abs(houseData.cusps[i] - result.house[i]) < TOLERANCE);
    }
  });

  it('validates Nakshatra, Pada, and Rasi boundaries', () => {
    const moon = computePlanetPosition('Moon', jd, ayanamsa, 'en');
    const expectedNakIdx = Math.floor(moon.longitude / (360 / 27));
    assert.strictEqual(moon.nakshatraIndex, expectedNakIdx);
    assert.ok(moon.pada >= 1 && moon.pada <= 4);
    
    const expectedRasiIdx = Math.floor(moon.longitude / 30);
    assert.strictEqual(moon.rasiIndex, expectedRasiIdx);
  });
});
