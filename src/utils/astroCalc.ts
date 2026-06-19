/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AyanamsaType, DivisionalChart, DivisionalChartPoint, PlanetPosition } from "../types/astrology";
import { translatePlanet, translateRashi, translateNakshatra, translateDivisionalChartName, translateDivisionalChartDesc } from "./translation";
import { LanguageCode } from "../types/astrology";

// Keplerian elements of the planets at J2000.0, relative to the J2000 epoch (Julian century T)
// Source: Keplerian Elements for Approximate Positions, NASA/JPL
interface OrbitalElements {
  a: number;   // semi-major axis (AU)
  aChange: number;
  e: number;   // eccentricity
  eChange: number;
  i: number;   // inclination (degrees)
  iChange: number;
  L: number;   // mean longitude (degrees)
  LChange: number;
  longPeri: number; // longitude of perihelion (degrees)
  longPeriChange: number;
  longNode: number; // longitude of ascending node (degrees)
  longNodeChange: number;
}

const PLANETS_ELEMENTS: Record<string, OrbitalElements> = {
  Mercury: {
    a: 0.38709893, aChange: 0.00000000,
    e: 0.20563069, eChange: 0.00002040,
    i: 7.00487, iChange: -0.00533,
    L: 252.25084, LChange: 149472.67411,
    longPeri: 77.45645, longPeriChange: 0.15901,
    longNode: 48.33167, longNodeChange: -0.12427
  },
  Venus: {
    a: 0.72333199, aChange: 0.00000000,
    e: 0.00677323, eChange: -0.00004776,
    i: 3.39471, iChange: -0.00078,
    L: 181.97973, LChange: 58517.81538,
    longPeri: 131.53298, longPeriChange: 0.00213,
    longNode: 76.68069, longNodeChange: -0.27769
  },
  Earth: { // Used internally as heliocentric earth reference
    a: 1.00000011, aChange: -0.00000005,
    e: 0.01671022, eChange: -0.00003804,
    i: 0.00005, iChange: -0.01300,
    L: 100.46435, LChange: 36000.76987,
    longPeri: 102.94719, longPeriChange: 0.32327,
    longNode: 0.00000, longNodeChange: 0.00000
  },
  Mars: {
    a: 1.52366231, aChange: -0.00000059,
    e: 0.09341233, eChange: 0.00011902,
    i: 1.85061, iChange: -0.00724,
    L: 355.45332, LChange: 19140.30268,
    longPeri: 336.04084, longPeriChange: 0.44383,
    longNode: 49.57854, longNodeChange: -0.29498
  },
  Jupiter: {
    a: 5.20336301, aChange: 0.00060737,
    e: 0.04839266, eChange: -0.00012880,
    i: 1.30530, iChange: -0.00415,
    L: 34.40438, LChange: 3034.74612,
    longPeri: 14.75385, longPeriChange: 0.19152,
    longNode: 100.55615, longNodeChange: 0.20387
  },
  Saturn: {
    a: 9.53707032, aChange: -0.00301530,
    e: 0.05415060, eChange: -0.00036762,
    i: 2.48446, iChange: 0.00193,
    L: 49.94432, LChange: 1222.11379,
    longPeri: 92.43194, longPeriChange: -0.41897,
    longNode: 113.71504, longNodeChange: -0.28853
  },
  Uranus: {
    a: 19.19126393, aChange: 0.00152025,
    e: 0.04716771, eChange: -0.00019150,
    i: 0.76998, iChange: -0.00246,
    L: 313.23218, LChange: 428.48202,
    longPeri: 170.96424, longPeriChange: 0.40805,
    longNode: 74.22988, longNodeChange: -0.09418
  },
  Neptune: {
    a: 30.06896348, aChange: -0.00125196,
    e: 0.00858587, eChange: 0.00002514,
    i: 1.76917, iChange: -0.00307,
    L: 304.88003, LChange: 218.45945,
    longPeri: 44.97135, longPeriChange: -0.32241,
    longNode: 131.72169, longNodeChange: -0.15115
  },
  Pluto: {
    a: 39.48168677, aChange: -0.00076912,
    e: 0.24880766, eChange: 0.00006465,
    i: 17.14175, iChange: 0.00307,
    L: 238.92881, LChange: 145.20775,
    longPeri: 224.06676, longPeriChange: -0.04063,
    longNode: 110.30347, longNodeChange: -0.01183
  }
};

// Compute Julian Date (JD) in UTC
export function getJulianDate(year: number, month: number, day: number, hour: number, minute: number, timezone: number = 0): number {
  let Y = year;
  let M = month;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (Y + 4716));
  const F = Math.floor(30.6001 * (M + 1));
  
  // Convert local hours in day to UTC hours in day
  const localHours = hour + minute / 60.0;
  const utcHours = localHours - timezone;
  const D = day + utcHours / 24.0;
  
  return C + D + E + F - 1524.5;
}

// Compute Greenwich Sidereal Time (GST) in degrees
export function getGST(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  gmst = gmst % 360;
  if (gmst < 0) gmst += 360;
  return gmst;
}

// Compute Local Sidereal Time (LST) in degrees
export function getLST(jd: number, longitude: number): number {
  const gst = getGST(jd);
  let lst = (gst + longitude) % 360;
  if (lst < 0) lst += 360;
  return lst;
}

// Calculate obliquity of the ecliptic in degrees
export function getObliquity(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.4392911 - (46.815 * T) / 3600.0;
}

// Compute Ayanamsa offset in degrees
export function getAyanamsa(jd: number, type: AyanamsaType = "Lahiri"): number {
  const T = (jd - 2451545.0) / 36525.0;
  const year = 2000.0 + T * 100.0;

  switch (type) {
    case "Lahiri":
      // N.C. Lahiri official formula approx
      return 23.85 + (year - 1900.0) * 0.013972;
    case "Raman":
      return 22.42 + (year - 1900.0) * 0.013972;
    case "Krishnamurti":
      return 23.85 + (year - 1900.0) * 0.013972 - 0.108; // Close offset to Lahiri
    case "Fagan-Bradley":
      return 24.568 + (year - 1900.0) * 0.013972;
    case "Yukteswar":
      return 22.38 + (year - 1900.0) * 0.013972;
    case "Tropical":
      return 0.0;
    default:
      // Fallback unrecognized to Lahiri as standard Vedic
      return 23.85 + (year - 1900.0) * 0.013972;
  }
}

// Core Kepler solver
function solveKepler(M: number, e: number): number {
  const radM = (M * Math.PI) / 180.0;
  let E = radM;
  let diff = 1.0;
  const tolerance = 1e-6;
  let count = 0;

  while (Math.abs(diff) > tolerance && count < 100) {
    diff = E - e * Math.sin(E) - radM;
    E = E - diff / (1.0 - e * Math.cos(E));
    count++;
  }
  return (E * 180.0) / Math.PI;
}

// Geocentric coordinates for a planet
function getHeliocentricCoordinates(planet: string, T: number) {
  const elem = PLANETS_ELEMENTS[planet];
  if (!elem) return { x: 0, y: 0, z: 0 };

  const a = elem.a + elem.aChange * T;
  const e = elem.e + elem.eChange * T;
  const i = elem.i + elem.iChange * T;
  const L = (elem.L + elem.LChange * T) % 360;
  const longPeri = (elem.longPeri + elem.longPeriChange * T) % 360;
  const longNode = (elem.longNode + elem.longNodeChange * T) % 360;

  const M = (L - longPeri + 360) % 360;
  const EVal = solveKepler(M, e);

  const radE = (EVal * Math.PI) / 180.0;
  const xOrb = a * (Math.cos(radE) - e);
  const yOrb = a * Math.sqrt(1.0 - e * e) * Math.sin(radE);

  const omega = ((longPeri - longNode + 360) % 360) * (Math.PI / 180.0);
  const Omega = longNode * (Math.PI / 180.0);
  const incl = i * (Math.PI / 180.0);

  // Rotation matrices relative to the Ecliptic plane
  const xEcl = xOrb * (Math.cos(omega) * Math.cos(Omega) - Math.sin(omega) * Math.sin(Omega) * Math.cos(incl)) -
               yOrb * (Math.sin(omega) * Math.cos(Omega) + Math.cos(omega) * Math.sin(Omega) * Math.cos(incl));

  const yEcl = xOrb * (Math.cos(omega) * Math.sin(Omega) + Math.sin(omega) * Math.cos(Omega) * Math.cos(incl)) -
               yOrb * (Math.sin(omega) * Math.sin(Omega) - Math.cos(omega) * Math.cos(Omega) * Math.cos(incl));

  const zEcl = xOrb * (Math.sin(omega) * Math.sin(incl)) + yOrb * (Math.cos(omega) * Math.sin(incl));

  return { x: xEcl, y: yEcl, z: zEcl };
}

// High Accuracy Lunar Theory (using perturbations: Evection, Variation, Annual Equation)
function getLunarGeocentricLongitude(T: number): number {
  // Mean angular parameters of the Lunar orbit
  const L_prime = (218.316 + 481267.8813 * T) % 360; // Mean longitude
  const M_prime = (134.963 + 477198.8676 * T) % 360; // Moon mean anomaly
  const M = (357.529 + 35999.0503 * T) % 360;       // Sun mean anomaly
  const D = (297.85 + 445267.1115 * T) % 360;        // Mean elongation
  const F = (93.272 + 483202.0175 * T) % 360;        // Distance from Node

  const rad = (deg: number) => (deg * Math.PI) / 180.0;

  // Major periodic corrections
  let longitude = L_prime;
  longitude += 6.289 * Math.sin(rad(M_prime));         // Principal inequality
  longitude += 1.274 * Math.sin(rad(2 * D - M_prime));   // Evection
  longitude += 0.658 * Math.sin(rad(2 * D));             // Variation
  longitude += -0.186 * Math.sin(rad(M));               // Annual equation
  longitude += 0.214 * Math.sin(rad(2 * M_prime));
  longitude += -0.114 * Math.sin(rad(2 * F));           // Node term
  longitude += 0.151 * Math.sin(rad(2 * D - M));
  longitude += 0.058 * Math.sin(rad(M_prime - 2 * D));

  longitude = (longitude + 360) % 360;
  return longitude;
}

// Compute planet position
export function computePlanetPosition(
  planetName: string,
  jd: number,
  ayanamsaOffset: number,
  lang: LanguageCode
): PlanetPosition {
  const T = (jd - 2451545.0) / 36525.0;
  let tropicalLong = 0;
  let latitude = 0;
  let speed = 1.0;

  if (planetName === "Sun") {
    const earth = getHeliocentricCoordinates("Earth", T);
    // Sun position from Earth reference
    tropicalLong = (Math.atan2(-earth.y, -earth.x) * 180.0) / Math.PI;
    latitude = 0;
    // Standard motion of the Sun
    speed = 0.9856;
  } else if (planetName === "Moon") {
    tropicalLong = getLunarGeocentricLongitude(T);
    latitude = 5.14 * Math.sin(((93.272 + 483202.0175 * T) * Math.PI) / 180.0);
    speed = 13.176;
  } else if (planetName === "Rahu") {
    // Mean ascending node
    tropicalLong = (125.044555 - 1934.1361849 * T) % 360;
    if (tropicalLong < 0) tropicalLong += 360;
    latitude = 0;
    speed = -0.0529; // Retrograde always
  } else if (planetName === "Ketu") {
    const rahuLong = (125.044555 - 1934.1361849 * T) % 360;
    tropicalLong = (rahuLong + 180.0) % 360;
    if (tropicalLong < 0) tropicalLong += 360;
    latitude = 0;
    speed = -0.0529;
  } else {
    const earth = getHeliocentricCoordinates("Earth", T);
    const body = getHeliocentricCoordinates(planetName, T);

    const xGeo = body.x - earth.x;
    const yGeo = body.y - earth.y;
    const zGeo = body.z - earth.z;

    tropicalLong = (Math.atan2(yGeo, xGeo) * 180.0) / Math.PI;
    latitude = (Math.atan2(zGeo, Math.sqrt(xGeo * xGeo + yGeo * yGeo)) * 180.0) / Math.PI;

    // Approximate velocities relative to Julian epoch
    const rate = PLANETS_ELEMENTS[planetName]?.LChange || 1.0;
    speed = rate / 36525.0;
  }

  tropicalLong = (tropicalLong + 360.0) % 360;

  // Apply Sidereal Ayanamsa shift (Vedic Zodiac)
  let siderealLong = (tropicalLong - ayanamsaOffset + 360.0) % 360;

  const rasiIdx = Math.floor(siderealLong / 30.0);
  const signDeg = siderealLong % 30.0;

  const nakIdx = Math.floor(siderealLong / (360.0 / 27.0));
  const pada = Math.floor((siderealLong % (360.0 / 27.0)) / (360.0 / 108.0)) + 1;

  // Navamsa Rasi index (D9)
  const navIdx = (Math.floor(siderealLong / (30.0 / 9.0))) % 12;

  // Retrograde detection
  const isRetrograde = speed < 0;

  // Combustion (too close to the Sun, within ~8 degrees)
  // Determine Sun longitude first
  let isCombust = false;
  if (planetName !== "Sun" && planetName !== "Rahu" && planetName !== "Ketu") {
    const sunEarth = getHeliocentricCoordinates("Earth", T);
    const sunLong = (Math.atan2(-sunEarth.y, -sunEarth.x) * 180.0) / Math.PI;
    const diff = Math.min(Math.abs(tropicalLong - sunLong), 360 - Math.abs(tropicalLong - sunLong));
    if (diff < 8.5) isCombust = true;
  }

  // Exaltation (Ucha) / Debilitation (Neecha) definitions for Vedic Astrological bodies
  let dignity = "Neutral";

  // Sign Lords mapper (0 = Aries, ..., 11 = Pisces)
  const SIGN_LORDS = [
    "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
    "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"
  ];

  // Naisargika Mitra (Permanent Friends)
  const PLANET_FRIENDS: Record<string, { friends: string[]; enemies: string[]; neutrals: string[] }> = {
    Sun: {
      friends: ["Moon", "Mars", "Jupiter"],
      enemies: ["Venus", "Saturn", "Rahu", "Ketu"],
      neutrals: ["Mercury"]
    },
    Moon: {
      friends: ["Sun", "Mercury"],
      enemies: [],
      neutrals: ["Mars", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]
    },
    Mars: {
      friends: ["Sun", "Moon", "Jupiter"],
      enemies: ["Mercury"],
      neutrals: ["Venus", "Saturn", "Rahu", "Ketu"]
    },
    Mercury: {
      friends: ["Sun", "Venus"],
      enemies: ["Moon"],
      neutrals: ["Mars", "Jupiter", "Saturn", "Rahu", "Ketu"]
    },
    Jupiter: {
      friends: ["Sun", "Moon", "Mars"],
      enemies: ["Mercury", "Venus"],
      neutrals: ["Saturn", "Rahu", "Ketu"]
    },
    Venus: {
      friends: ["Mercury", "Saturn"],
      enemies: ["Sun", "Moon"],
      neutrals: ["Mars", "Jupiter", "Rahu", "Ketu"]
    },
    Saturn: {
      friends: ["Mercury", "Venus"],
      enemies: ["Sun", "Moon", "Mars"],
      neutrals: ["Jupiter", "Rahu", "Ketu"]
    },
    Rahu: {
      friends: ["Mercury", "Venus", "Saturn"],
      enemies: ["Sun", "Moon", "Mars"],
      neutrals: ["Jupiter", "Ketu"]
    },
    Ketu: {
      friends: ["Mercury", "Venus", "Saturn"],
      enemies: ["Sun", "Moon", "Mars"],
      neutrals: ["Jupiter", "Rahu"]
    }
  };

  if (planetName === "Sun") {
    if (rasiIdx === 0) dignity = "Exalted"; // Aries
    else if (rasiIdx === 6) dignity = "Debilitated"; // Libra
    else if (rasiIdx === 4) dignity = "Own"; // Leo
  } else if (planetName === "Moon") {
    if (rasiIdx === 1) dignity = "Exalted"; // Taurus
    else if (rasiIdx === 7) dignity = "Debilitated"; // Scorpio
    else if (rasiIdx === 3) dignity = "Own"; // Cancer
  } else if (planetName === "Mars") {
    if (rasiIdx === 9) dignity = "Exalted"; // Capricorn
    else if (rasiIdx === 3) dignity = "Debilitated"; // Cancer
    else if (rasiIdx === 0 || rasiIdx === 7) dignity = "Own"; // Aries, Scorpio
  } else if (planetName === "Mercury") {
    if (rasiIdx === 5) dignity = "Exalted"; // Virgo
    else if (rasiIdx === 11) dignity = "Debilitated"; // Pisces
    else if (rasiIdx === 2 || rasiIdx === 5) dignity = "Own"; // Gemini, Virgo
  } else if (planetName === "Jupiter") {
    if (rasiIdx === 3) dignity = "Exalted"; // Cancer
    else if (rasiIdx === 9) dignity = "Debilitated"; // Capricorn
    else if (rasiIdx === 8 || rasiIdx === 11) dignity = "Own"; // Sagittarius, Pisces
  } else if (planetName === "Venus") {
    if (rasiIdx === 11) dignity = "Exalted"; // Pisces
    else if (rasiIdx === 5) dignity = "Debilitated"; // Virgo
    else if (rasiIdx === 1 || rasiIdx === 6) dignity = "Own"; // Taurus, Libra
  } else if (planetName === "Saturn") {
    if (rasiIdx === 6) dignity = "Exalted"; // Libra
    else if (rasiIdx === 0) dignity = "Debilitated"; // Aries
    else if (rasiIdx === 9 || rasiIdx === 10) dignity = "Own"; // Capricorn, Aquarius
  } else if (planetName === "Rahu") {
    if (rasiIdx === 1) dignity = "Exalted"; // Taurus
    else if (rasiIdx === 7) dignity = "Debilitated"; // Scorpio
    else if (rasiIdx === 5) dignity = "Own"; // Virgo
  } else if (planetName === "Ketu") {
    if (rasiIdx === 7) dignity = "Exalted"; // Scorpio
    else if (rasiIdx === 1) dignity = "Debilitated"; // Taurus
    else if (rasiIdx === 0) dignity = "Own"; // Aries
  }

  // If dignity is still Neutral, compute based on Sign Lord Friendships
  if (dignity === "Neutral") {
    const rasiLord = SIGN_LORDS[rasiIdx];
    if (rasiLord) {
      const relation = PLANET_FRIENDS[planetName];
      if (relation) {
        if (relation.friends.includes(rasiLord)) {
          dignity = "Friend";
        } else if (relation.enemies.includes(rasiLord)) {
          dignity = "Enemy";
        } else {
          dignity = "Neutral";
        }
      }
    }
  }

  // Shadbala proxy percentage calculation (Vedic strength proxy)
  let strength = 50; // base Samatva
  if (dignity === "Exalted") strength = 95;
  else if (dignity === "Own") strength = 80;
  else if (dignity === "Friend") strength = 68;
  else if (dignity === "Debilitated") strength = 18;
  else if (dignity === "Enemy") strength = 35;

  return {
    name: planetName,
    localizedName: translatePlanet(planetName, lang),
    longitude: siderealLong,
    latitude: latitude,
    speed: speed,
    degree: Math.floor(siderealLong),
    signDegree: signDeg,
    rasiIndex: rasiIdx,
    rasiName: translateRashi(rasiIdx, "en"),
    rasiLocalizedName: translateRashi(rasiIdx, lang),
    house: 1, // mapped post-Lagna calculation
    nakshatraIndex: nakIdx,
    nakshatraName: translateNakshatra(nakIdx, "en"),
    nakshatraLocalizedName: translateNakshatra(nakIdx, lang),
    pada: pada,
    navamsaIndex: navIdx,
    navamsaName: translateRashi(navIdx, "en"),
    navamsaLocalizedName: translateRashi(navIdx, lang),
    isRetrograde,
    isCombust,
    dignity,
    strength
  };
}

// Compute Lagna (Ascendant) Sidereal longitude
export function getLagnaSidereal(jd: number, latitude: number, longitude: number, ayanamsaOffset: number): number {
  const lst = getLST(jd, longitude);
  const obliquity = getObliquity(jd);

  const radObliq = (obliquity * Math.PI) / 180.0;
  const radLat = (latitude * Math.PI) / 180.0;
  const radLst = (lst * Math.PI) / 180.0;

  const y = Math.cos(radLst);
  const x = -Math.sin(radLst) * Math.cos(radObliq) - Math.tan(radLat) * Math.sin(radObliq);

  let ascendantRad = Math.atan2(y, x);
  let ascendantDeg = (ascendantRad * 180.0) / Math.PI;

  ascendantDeg = (ascendantDeg + 360.0) % 360;

  // Apply Sidereal Shift
  let siderealAsc = (ascendantDeg - ayanamsaOffset + 360.0) % 360;
  return siderealAsc;
}

// Divisional Chart Generator (D1, D9, D10 etc)
export function generateDivisionalCharts(planets: PlanetPosition[], lagnaLong: number, lang: LanguageCode): DivisionalChart[] {
  const codes = [
    { code: "D1", name: "Rasi Chart", desc: "Core chart representing physical health, appearance and basic life parameters" },
    { code: "D2", name: "Hora Chart", desc: "Wealth, assets, finance, savings and prosperity analysis" },
    { code: "D3", name: "Drekkana", desc: "Siblings, co-borns, motivation, courage and initiative" },
    { code: "D4", name: "Chaturthamsa", desc: "Destiny, net assets, fixed property, houses and vehicle gains" },
    { code: "D7", name: "Saptamsa", desc: "Children, lineage, grandchildren, intellect and creative works" },
    { code: "D9", name: "Navamsa", desc: "Spouse, marriage partner compatibility, secondary strength, destiny" },
    { code: "D10", name: "Dasamsa", desc: "Career, professional growth, status, business success, honors" },
    { code: "D12", name: "Dwadasamsa", desc: "Parents, ancestry, heritage, lineage karmic factors" },
    { code: "D16", name: "Shodasamsa", desc: "Vehicles, luxuries, houses, conveyance and comforts" },
    { code: "D20", name: "Vimsamsa", desc: "Spirituality, sadhana, mantra siddhi, guru grace, devotional life" },
    { code: "D24", name: "Siddhamsamsa", desc: "Education, vidya, learning aptitude, research, skill masteries" },
    { code: "D27", name: "Nakshatramsa", desc: "Strength, inner strengths, weaknesses, vulnerabilities" },
    { code: "D30", name: "Trimsamsa", desc: "Evils, accidents, sudden downfalls, character flaws, diseases" },
    { code: "D40", name: "Khavedamsa", desc: "Generational auspiciousness, deep lineage patterns" },
    { code: "D45", name: "Akshavedamsa", desc: "All-round holistic life indicators, pure characters" },
    { code: "D60", name: "Shashtyamsa", desc: "Past-life karma triggers, ultimate planetary results" }
  ];

  return codes.map(c => {
    const points: DivisionalChartPoint[] = planets.map(p => {
      let calcLong = p.longitude;
      let divRasiIdx = 0;

      if (c.code === "D1") {
        divRasiIdx = p.rasiIndex;
      } else if (c.code === "D9") {
        // Each sign is divided into 9 parts of 3°20'
        const signs = [0, 9, 2, 7, 4, 11, 2, 7, 4, 9, 2, 7]; // element starting signs
        const element = p.rasiIndex % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water
        let startSign = 0;
        if (element === 0) startSign = 0;      // Aries starts at Aries
        else if (element === 1) startSign = 9;  // Taurus starts at Capricorn
        else if (element === 2) startSign = 6;  // Gemini starts at Libra
        else startSign = 3;                     // Cancer starts at Cancer

        const part = Math.floor((p.longitude % 30) / (3.333333));
        divRasiIdx = (startSign + part) % 12;
      } else {
        // Fallback standard harmonic divisor map
        const harmonic = parseInt(c.code.replace("D", ""));
        const step = 30.0 / harmonic;
        const part = Math.floor((calcLong % 30.0) / step);
        divRasiIdx = (p.rasiIndex * harmonic + part) % 12;
      }

      // Map house index starting from Lagna as House 1
      const lagnaRasi = Math.floor(lagnaLong / 30.0);
      let calculatedHouse = (divRasiIdx - lagnaRasi + 12) % 12 + 1;

      return {
        planet: p.name,
        localizedPlanet: p.localizedName,
        longitude: p.longitude,
        signIndex: divRasiIdx,
        signName: translateRashi(divRasiIdx, "en"),
        signLocalizedName: translateRashi(divRasiIdx, lang),
        house: calculatedHouse
      };
    });

    return {
      name: translateDivisionalChartName(c.code, lang),
      code: c.code,
      description: translateDivisionalChartDesc(c.code, lang),
      points
    };
  });
}
