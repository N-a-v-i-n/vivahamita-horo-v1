import swisseph from 'swisseph';
import { getJulianDate, getAyanamsa, computePlanetPosition } from '../src/utils/astroCalc';

async function runComparison() {
  const year = 1995;
  const month = 6;
  const day = 15;
  const hour = 8;
  const minute = 30;
  const timezone = 5.5;

  // Engine JD
  const engineJd = getJulianDate(year, month, day, hour, minute, timezone);
  
  // Swisseph JD
  const utcHour = hour + minute / 60 - timezone;
  const sweJd = swisseph.swe_julday(year, month, day, utcHour, swisseph.SE_GREG_CAL);

  console.log('--- Julian Day ---');
  console.log('Engine JD:', engineJd);
  console.log('Swisseph JD:', sweJd);
  console.log('Difference:', Math.abs(engineJd - sweJd));

  // Ayanamsa
  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
  const sweAyanamsa = swisseph.swe_get_ayanamsa_ut(sweJd);
  const engineAyanamsa = getAyanamsa(engineJd, "Lahiri");

  console.log('\n--- Ayanamsa ---');
  console.log('Engine Ayanamsa:', engineAyanamsa);
  console.log('Swisseph Ayanamsa:', sweAyanamsa);
  console.log('Difference:', Math.abs(engineAyanamsa - sweAyanamsa));

  // Planets
  console.log('\n--- Planetary Longitudes (Sidereal) ---');
  const bodies = [
    { name: 'Sun', se: swisseph.SE_SUN },
    { name: 'Moon', se: swisseph.SE_MOON },
    { name: 'Mars', se: swisseph.SE_MARS },
    { name: 'Mercury', se: swisseph.SE_MERCURY },
    { name: 'Jupiter', se: swisseph.SE_JUPITER },
    { name: 'Venus', se: swisseph.SE_VENUS },
    { name: 'Saturn', se: swisseph.SE_SATURN },
  ];

  for (const b of bodies) {
    const enginePos = computePlanetPosition(b.name as any, engineJd, engineAyanamsa, 'en') as any;
    
    // flag for sidereal
    const flag = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;
    const swePos = swisseph.swe_calc_ut(sweJd, b.se, flag) as any;
    
    const diff = Math.abs(enginePos.longitude - swePos.longitude);
    // shortest path on circle
    const minDiff = Math.min(diff, 360 - diff);
    
    console.log(`[${b.name}] Engine: ${enginePos.longitude.toFixed(4)} | Swisseph: ${swePos.longitude.toFixed(4)} | Diff: ${minDiff.toFixed(4)}`);
  }
}

runComparison().catch(console.error);
