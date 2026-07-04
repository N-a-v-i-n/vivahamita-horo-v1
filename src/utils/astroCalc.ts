/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import swisseph from "swisseph";
import { AyanamsaType, DivisionalChart, DivisionalChartPoint, PlanetPosition, LanguageCode, HouseData } from "../types/astrology";
import { LocalizationService } from "../services/localizationService";

// Configure Swiss Ephemeris path if needed, though default is usually fine
// swisseph.swe_set_ephe_path(__dirname + '/../../ephe');

export function getJulianDate(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timezone: number
): number {
  // Convert local time to UTC time
  const utcHour = hour + minute / 60.0 - timezone;
  return swisseph.swe_julday(year, month, day, utcHour, swisseph.SE_GREG_CAL);
}

export function getAyanamsa(jd: number, type: AyanamsaType = "Lahiri"): number {
  let mode = swisseph.SE_SIDM_LAHIRI;
  switch (type) {
    case "Raman": mode = swisseph.SE_SIDM_RAMAN; break;
    case "Krishnamurti": mode = swisseph.SE_SIDM_KRISHNAMURTI; break;
    case "Fagan-Bradley": mode = swisseph.SE_SIDM_FAGAN_BRADLEY; break;
    case "Yukteswar": mode = swisseph.SE_SIDM_YUKTESHWAR; break;
    case "Tropical": return 0;
  }
  
  swisseph.swe_set_sid_mode(mode, 0, 0);
  
  return swisseph.swe_get_ayanamsa_ut(jd);
}

// Helper to calculate exact dignity (exaltation, moolatrikona, own house)
function determineDignity(planetName: string, longitude: number, rasiIndex: number): string {
  // Simplified for now, the KarakaService will do deeper dignity analysis
  return "Neutral"; 
}

const SE_BODIES: Record<string, number> = {
  "Sun": swisseph.SE_SUN,
  "Moon": swisseph.SE_MOON,
  "Mars": swisseph.SE_MARS,
  "Mercury": swisseph.SE_MERCURY,
  "Jupiter": swisseph.SE_JUPITER,
  "Venus": swisseph.SE_VENUS,
  "Saturn": swisseph.SE_SATURN,
  "Uranus": swisseph.SE_URANUS,
  "Neptune": swisseph.SE_NEPTUNE,
  "Pluto": swisseph.SE_PLUTO,
  "Rahu": swisseph.SE_TRUE_NODE, // Default True Node for Jyotish if not specified
  "Ketu": swisseph.SE_TRUE_NODE,
  "True Node": swisseph.SE_TRUE_NODE,
  "Mean Node": swisseph.SE_MEAN_NODE
};

export function computePlanetPosition(
  planetName: string,
  jd: number,
  ayanamsa: number,
  lang: LanguageCode = "en"
): PlanetPosition {
  const seId = SE_BODIES[planetName];
  if (seId === undefined) {
    throw new Error(`Unknown planet: ${planetName}`);
  }

  // Use Sidereal flag to get Nirayana longitude directly
  const flag = swisseph.SEFLG_SIDEREAL | swisseph.SEFLG_SPEED;
  
  const result = swisseph.swe_calc_ut(jd, seId, flag) as any;
  
  // Also get equatorial coords for declination (without sidereal flag, since equatorial is usually tropical relative to equator)
  const eqFlag = swisseph.SEFLG_EQUATORIAL | swisseph.SEFLG_SPEED;
  const eqResult = swisseph.swe_calc_ut(jd, seId, eqFlag) as any;
  
  let longitude = result.longitude;
  let latitude = result.latitude;
  let distance = result.distance;
  let speed = result.longitudeSpeed;
  let declination = eqResult.declination; // In equatorial, the field is named declination
  let obliquity = eqResult.distance; // Distance field contains distance, not obliquity, we can skip or use swisseph.swe_calc_ut for obliquity

  // Ketu is exactly 180 degrees from Rahu
  if (planetName === "Ketu") {
    longitude = (longitude + 180.0) % 360.0;
    latitude = -latitude;
    declination = -declination;
  }

  // Normalize
  while (longitude < 0) longitude += 360;
  longitude %= 360;

  const isRetrograde = speed < 0 && planetName !== "Rahu" && planetName !== "Ketu" && planetName !== "Mean Node" && planetName !== "True Node" && planetName !== "Sun" && planetName !== "Moon";
  const isCombust = false; // To be calculated with respect to Sun in full engine

  const rasiIndex = Math.floor(longitude / 30);
  const signDegree = longitude % 30;

  const nakshatraExact = longitude / (13 + 1/3);
  const nakshatraIndex = Math.floor(nakshatraExact);
  const pada = Math.floor((nakshatraExact - nakshatraIndex) * 4) + 1;

  // D-9 Navamsa
  const navamsaDegree = longitude * 9;
  const navamsaIndex = Math.floor(navamsaDegree / 30) % 12;

  const RASHI_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const NAK_NAMES = ["Aswini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Aardra", "Punarvasu", "Pushyami", "Aasresha", "Makha", "Poorva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swaati", "Visaakha", "Anooraadha", "Jyeshtha", "Moola", "Poorvaashaadha", "Uttaraashaadha", "Sravanam", "Dhanishtha", "Satabhishak", "Poorvaabhaadra", "Uttaraabhaadra", "Revati"];

  return {
    id: planetName.toLowerCase(),
    name: LocalizationService.getPlanet(planetName.toLowerCase()).name,
    longitude,
    latitude,
    distance,
    declination,
    obliquity: 0,
    speed,
    degree: longitude,
    signDegree,
    rasiIndex,
    rasi: LocalizationService.getRasi(RASHI_NAMES[rasiIndex]),
    house: 0, // Assigned later by lagna
    nakshatraIndex,
    nakshatra: LocalizationService.getNakshatra(NAK_NAMES[nakshatraIndex]),
    pada,
    navamsaIndex,
    navamsa: LocalizationService.getRasi(RASHI_NAMES[navamsaIndex]),
    isRetrograde,
    isCombust,
    dignity: determineDignity(planetName, longitude, rasiIndex),
    strength: 100 // placeholder
  };
}

export function getLagnaSidereal(jd: number, lat: number, lon: number, ayanamsa: number): number {
  return getHouseData(jd, lat, lon, ayanamsa).ascendant;
}

export function getHouseData(jd: number, lat: number, lon: number, ayanamsa: number): HouseData {
  const flag = swisseph.SEFLG_SIDEREAL;
  const result = swisseph.swe_houses_ex(jd, flag, lat, lon, 'W') as any;
  let ascendant = result.ascendant;

  while (ascendant < 0) ascendant += 360;
  ascendant %= 360;

  return {
    ascendant,
    mc: result.mc,
    armc: result.armc,
    vertex: result.vertex,
    equatorialAscendant: result.equatorialAscendant,
    coAscendant: result.coAscendant,
    cusps: result.house // usually an array where cusps[1] is 1st house cusp, etc.
  };
}

export function generateDivisionalCharts(planets: PlanetPosition[], lagnaLong: number, lang: LanguageCode): DivisionalChart[] {
  const charts: DivisionalChart[] = [];

  const divisions = [
    { code: "D1", name: "Rasi", divisor: 1, type: "regular" },
    { code: "D2", name: "Hora", divisor: 2, type: "hora" },
    { code: "D3", name: "Drekkana", divisor: 3, type: "drekkana" },
    { code: "D4", name: "Chaturthamsa", divisor: 4, type: "chaturthamsa" },
    { code: "D7", name: "Saptamsa", divisor: 7, type: "saptamsa" },
    { code: "D9", name: "Navamsa", divisor: 9, type: "navamsa" },
    { code: "D10", name: "Dasamsa", divisor: 10, type: "dasamsa" },
    { code: "D12", name: "Dwadasamsa", divisor: 12, type: "dwadasamsa" },
    { code: "D16", name: "Shodasamsa", divisor: 16, type: "shodasamsa" },
    { code: "D20", name: "Vimsamsa", divisor: 20, type: "vimsamsa" },
    { code: "D24", name: "Chaturvimsamsa", divisor: 24, type: "chaturvimsamsa" },
    { code: "D27", name: "Nakshatramsa", divisor: 27, type: "nakshatramsa" },
    { code: "D30", name: "Trimsamsa", divisor: 30, type: "trimsamsa" },
    { code: "D40", name: "Khavedamsa", divisor: 40, type: "khavedamsa" },
    { code: "D45", name: "Akshavedamsa", divisor: 45, type: "akshavedamsa" },
    { code: "D60", name: "Shashtyamsa", divisor: 60, type: "shashtyamsa" }
  ];

  const RASHI_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

  // Helper to map longitude to D-n rasi index based on Parasara
  const getVargaRasi = (longitude: number, rasiIdx: number, type: string, n: number): number => {
    const signDeg = longitude % 30;
    const part = Math.floor((signDeg * n) / 30); // 0-indexed part
    
    switch (type) {
      case "regular": return rasiIdx;
      case "hora": 
        if (rasiIdx % 2 === 0) return part === 0 ? 4 : 3; // Odd sign (1st=Leo, 2nd=Cancer)
        else return part === 0 ? 3 : 4; // Even sign (1st=Cancer, 2nd=Leo)
      case "drekkana":
        if (part === 0) return rasiIdx;
        if (part === 1) return (rasiIdx + 4) % 12;
        return (rasiIdx + 8) % 12;
      case "chaturthamsa":
        if (part === 0) return rasiIdx;
        if (part === 1) return (rasiIdx + 3) % 12;
        if (part === 2) return (rasiIdx + 6) % 12;
        return (rasiIdx + 9) % 12;
      case "saptamsa":
        if (rasiIdx % 2 === 0) return (rasiIdx + part) % 12; // Odd
        else return (rasiIdx + 6 + part) % 12; // Even
      case "navamsa":
        const element = rasiIdx % 4; // 0=Fiery, 1=Earthy, 2=Airy, 3=Watery
        let startRasi = 0; // Aries
        if (element === 1) startRasi = 9; // Capricorn
        if (element === 2) startRasi = 6; // Libra
        if (element === 3) startRasi = 3; // Cancer
        return (startRasi + part) % 12;
      case "dasamsa":
        if (rasiIdx % 2 === 0) return (rasiIdx + part) % 12; // Odd starts from self
        else return (rasiIdx + 8 + part) % 12; // Even starts from 9th (index + 8)
      case "dwadasamsa":
        return (rasiIdx + part) % 12;
      case "shodasamsa":
        const type16 = rasiIdx % 3; // Movable, Fixed, Dual
        if (type16 === 0) return (0 + part) % 12; // Aries
        if (type16 === 1) return (4 + part) % 12; // Leo
        return (8 + part) % 12; // Sg
      case "vimsamsa":
        const type20 = rasiIdx % 3;
        if (type20 === 0) return (0 + part) % 12;
        if (type20 === 1) return (8 + part) % 12;
        return (4 + part) % 12;
      case "chaturvimsamsa":
        if (rasiIdx % 2 === 0) return (4 + part) % 12; // Odd starts from Leo
        else return (3 + part) % 12; // Even starts from Cancer
      case "nakshatramsa":
        const elem27 = rasiIdx % 4;
        if (elem27 === 0) return (0 + part) % 12; // Aries
        if (elem27 === 1) return (3 + part) % 12; // Cancer
        if (elem27 === 2) return (6 + part) % 12; // Libra
        return (9 + part) % 12; // Capricorn
      case "trimsamsa":
        // Trimsamsa has irregular boundaries
        const deg = signDeg;
        if (rasiIdx % 2 === 0) { // Odd sign
          if (deg <= 5) return 0; // Aries (Mars)
          if (deg <= 10) return 10; // Aquarius (Saturn)
          if (deg <= 18) return 8; // Sg (Jupiter)
          if (deg <= 25) return 2; // Ge (Mercury)
          return 6; // Li (Venus)
        } else { // Even sign
          if (deg <= 5) return 1; // Ta (Venus)
          if (deg <= 12) return 5; // Vi (Mercury)
          if (deg <= 20) return 11; // Pi (Jupiter)
          if (deg <= 25) return 9; // Cp (Saturn)
          return 7; // Sc (Mars)
        }
      case "khavedamsa":
        if (rasiIdx % 2 === 0) return (0 + part) % 12;
        else return (6 + part) % 12;
      case "akshavedamsa":
        const type45 = rasiIdx % 3;
        if (type45 === 0) return (0 + part) % 12;
        if (type45 === 1) return (4 + part) % 12;
        return (8 + part) % 12;
      case "shashtyamsa":
        return (rasiIdx + part) % 12;
      default:
        return rasiIdx;
    }
  };

  for (const div of divisions) {
    const lagnaRasiIdx = getVargaRasi(lagnaLong, Math.floor(lagnaLong / 30), div.type, div.divisor);
    
    const points: DivisionalChartPoint[] = [];
    
    points.push({
      planet: { id: "ascendant", name: { en: "Ascendant" } },
      longitude: lagnaLong,
      signIndex: lagnaRasiIdx,
      sign: LocalizationService.getRasi(RASHI_NAMES[lagnaRasiIdx]),
      house: 1
    });

    for (const p of planets) {
      const vRasiIdx = getVargaRasi(p.longitude, p.rasiIndex, div.type, div.divisor);
      // House calculation (Whole Sign)
      const house = ((vRasiIdx - lagnaRasiIdx + 12) % 12) + 1;
      
      points.push({
        planet: LocalizationService.getPlanet(p.id),
        longitude: p.longitude,
        signIndex: vRasiIdx,
        sign: LocalizationService.getRasi(RASHI_NAMES[vRasiIdx]),
        house
      });
    }

    charts.push({
      name: div.name,
      code: div.code,
      description: div.name + " Chart",
      points
    });
  }

  return charts;
}
