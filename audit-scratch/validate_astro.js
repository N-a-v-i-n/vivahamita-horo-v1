"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swisseph_1 = __importDefault(require("swisseph"));
const astroCalc_1 = require("../src/utils/astroCalc");
async function runComparison() {
    const year = 1995;
    const month = 6;
    const day = 15;
    const hour = 8;
    const minute = 30;
    const timezone = 5.5;
    // Engine JD
    const engineJd = (0, astroCalc_1.getJulianDate)(year, month, day, hour, minute, timezone);
    // Swisseph JD
    const utcHour = hour + minute / 60 - timezone;
    const sweJd = swisseph_1.default.swe_julday(year, month, day, utcHour, swisseph_1.default.SE_GREG_CAL);
    console.log('--- Julian Day ---');
    console.log('Engine JD:', engineJd);
    console.log('Swisseph JD:', sweJd);
    console.log('Difference:', Math.abs(engineJd - sweJd));
    // Ayanamsa
    swisseph_1.default.swe_set_sid_mode(swisseph_1.default.SE_SIDM_LAHIRI, 0, 0);
    const sweAyanamsa = swisseph_1.default.swe_get_ayanamsa_ut(sweJd);
    const engineAyanamsa = (0, astroCalc_1.getAyanamsa)(engineJd, "Lahiri");
    console.log('\n--- Ayanamsa ---');
    console.log('Engine Ayanamsa:', engineAyanamsa);
    console.log('Swisseph Ayanamsa:', sweAyanamsa);
    console.log('Difference:', Math.abs(engineAyanamsa - sweAyanamsa));
    // Planets
    console.log('\n--- Planetary Longitudes (Sidereal) ---');
    const bodies = [
        { name: 'Sun', se: swisseph_1.default.SE_SUN },
        { name: 'Moon', se: swisseph_1.default.SE_MOON },
        { name: 'Mars', se: swisseph_1.default.SE_MARS },
        { name: 'Mercury', se: swisseph_1.default.SE_MERCURY },
        { name: 'Jupiter', se: swisseph_1.default.SE_JUPITER },
        { name: 'Venus', se: swisseph_1.default.SE_VENUS },
        { name: 'Saturn', se: swisseph_1.default.SE_SATURN },
    ];
    for (const b of bodies) {
        const enginePos = (0, astroCalc_1.computePlanetPosition)(b.name, engineJd, engineAyanamsa, 'en');
        // flag for sidereal
        const flag = swisseph_1.default.SEFLG_SIDEREAL | swisseph_1.default.SEFLG_SPEED;
        const swePos = swisseph_1.default.swe_calc_ut(sweJd, b.se, flag);
        const diff = Math.abs(enginePos.longitude - swePos.longitude);
        // shortest path on circle
        const minDiff = Math.min(diff, 360 - diff);
        console.log(`[${b.name}] Engine: ${enginePos.longitude.toFixed(4)} | Swisseph: ${swePos.longitude.toFixed(4)} | Diff: ${minDiff.toFixed(4)}`);
    }
}
runComparison().catch(console.error);
