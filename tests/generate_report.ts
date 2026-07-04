import { AstrologyService } from '../src/services/astrologyService.js';
import { generateDivisionalCharts, getJulianDate, getAyanamsa, getLagnaSidereal } from '../src/utils/astroCalc.js';

const input = {
  year: 1992,
  month: 10,
  day: 25,
  hour: 14,
  minute: 30,
  latitude: 19.0760,
  longitude: 72.8777,
  timezone: 5.5,
  ayanamsa: 'Lahiri' as const,
  lang: 'en' as const
};

const panchang = AstrologyService.calcPanchang(input);
const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone);
const ayanamsa = getAyanamsa(jd, input.ayanamsa);
const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsa);
const lagnaRasi = Math.floor(lagnaLong / 30);
const rasiNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, 'en');
const dasha = AstrologyService.calcVimshottariDasha(panchang.planets.find(p => p.name === 'Moon')!.longitude, input.year, 'en');
const vargasRaw = generateDivisionalCharts(panchang.planets, lagnaLong, 'en');

const planetsFormatted = panchang.planets.map(p => ({
  name: p.name,
  longitude: p.longitude,
  latitude: null,
  nakshatra: p.nakshatraName,
  pada: p.pada,
  house: p.house,
  sign: p.rasiName,
  retrogradeStatus: p.isRetrograde,
  combustion: null,
  exaltationDebilitation: null,
  ownSign: null,
  moolatrikona: null,
  planetStrength: null,
  shadbala: null
}));

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const varaName = weekdays[new Date(input.year, input.month - 1, input.day).getDay()];

const report = {
  birthChart: {
    ascendant: {
      longitude: lagnaLong,
      sign: rasiNames[lagnaRasi]
    },
    moonSign: panchang.planets.find(p => p.name === 'Moon')?.rasiName || null,
    sunSign: panchang.planets.find(p => p.name === 'Sun')?.rasiName || null,
    planets: planetsFormatted
  },
  houses: Array.from({length: 12}, (_, i) => ({
    house: i + 1,
    sign: rasiNames[(lagnaRasi + i) % 12],
    lord: null,
    occupants: panchang.planets.filter(p => p.house === i + 1).map(p => p.name),
    strength: null,
    beneficMaleficInfluences: null,
    aspectsReceived: null
  })),
  planetRelationships: panchang.planets.map(p => ({
    planet: p.name,
    conjunctions: panchang.planets.filter(other => other.name !== p.name && other.house === p.house).map(o => o.name),
    aspects: null,
    planetaryWar: null,
    functionalBeneficMalefic: null,
    naturalBeneficMalefic: null
  })),
  vargas: {
    D1: vargasRaw.D1,
    D2: vargasRaw.D2,
    D3: vargasRaw.D3,
    D7: vargasRaw.D7,
    D9: vargasRaw.D9,
    D10: vargasRaw.D10,
    D12: vargasRaw.D12,
    D16: vargasRaw.D16,
    D20: vargasRaw.D20,
    D24: vargasRaw.D24,
    D27: vargasRaw.D27,
    D30: vargasRaw.D30,
    D40: vargasRaw.D40,
    D45: vargasRaw.D45,
    D60: vargasRaw.D60
  },
  yogas: [],
  doshas: {
    mangalDosha: doshas.find(d => d.name === "Manglik Dosha") || null,
    kaalSarp: doshas.find(d => d.name === "Kaal Sarp Dosha") || null,
    pitra: doshas.find(d => d.name === "Pitra Dosha") || null,
    guruChandal: doshas.find(d => d.name === "Guru Chandal Dosha") || null,
    grahan: doshas.find(d => d.name === "Grahan Dosha") || null,
    kemadruma: doshas.find(d => d.name === "Kemadruma Dosha") || null,
    shrapit: doshas.find(d => d.name === "Shrapit Dosha") || null
  },
  vimshottariDasha: dasha,
  ashtakavarga: null,
  panchanga: {
    tithi: panchang.tithi.name,
    vara: varaName,
    yoga: panchang.yoga.name,
    karana: panchang.karana.name,
    nakshatra: panchang.nakshatra.name,
    sunrise: panchang.sunrise || null,
    sunset: panchang.sunset || null,
    moonrise: panchang.moonrise || null,
    moonset: panchang.moonset || null
  },
  predictions: {
    career: null,
    marriage: null,
    health: null,
    finance: null,
    education: null,
    children: null,
    foreignTravel: null,
    property: null,
    spirituality: null
  },
  transit: null
};

console.log(JSON.stringify(report, null, 2));
