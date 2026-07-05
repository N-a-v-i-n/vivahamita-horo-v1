import { HoroscopeV2Request, HoroscopeV2Response, HoroscopeV2ResponseData, HoroscopeV2PlanetPosition, HoroscopeV2Chart, HoroscopeV2House, HoroscopeV2Mahadasha, HoroscopeV2Bhukti } from "../types/horoscopeV2";
import { getJulianDate, getAyanamsa, computePlanetPosition, getHouseData, getLagnaSidereal } from "../utils/astroCalc";
import { AstrologyEngine } from "../astrology/engine/AstrologyEngine";

import { LocalizationEngine } from "./LocalizationEngine";

const VIMSHOTTARI_DURATIONS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

export class AstrologyV2Service {
  private static formatDMS(decimalDegree: number): { d: number, m: number, s: number, str: string } {
    const d = Math.floor(decimalDegree);
    const minFloat = (decimalDegree - d) * 60;
    const m = Math.floor(minFloat);
    const secFloat = (minFloat - m) * 60;
    const s = Math.round(secFloat);
    return {
      d, m, s,
      str: `${d}°${m.toString().padStart(2, '0')}'${s.toString().padStart(2, '0')}"`
    };
  }

  private static getAyanamsaDMS(ay: number, miscTerms: Record<string, string>): string {
    const { d, m, s } = this.formatDMS(ay);
    return `${miscTerms.chitraPaksha} - ${d} ${miscTerms.degree} ${m} ${miscTerms.minute} ${s} ${miscTerms.second}`;
  }

  private static formatDate(date: Date): string {
    const d = date.getDate().toString().padStart(2, '0');
    const m = date.toLocaleString('en-US', { month: 'short' });
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  private static formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  private static formatHrMin(hr: number, tz: number): string {
    let localHr = hr + tz;
    if (localHr < 0) localHr += 24;
    if (localHr >= 24) localHr -= 24;
    const h = Math.floor(localHr);
    const m = Math.floor((localHr - h) * 60);
    const s = Math.floor((((localHr - h) * 60) - m) * 60);
    
    const d = new Date();
    d.setHours(h, m, s);
    return d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  private static parseDashaDate(startYear: number, offsetYears: number): Date {
    const totalMonths = offsetYears * 12;
    const wholeMonths = Math.floor(totalMonths);
    const fractionalMonths = totalMonths - wholeMonths;
    const days = Math.round(fractionalMonths * 30.436875);
    const totalDays = offsetYears * 365.2425;
    
    const d = new Date(startYear, 0, 1);
    d.setDate(d.getDate() + Math.round(totalDays));
    return d;
  }
  
  private static getDashaDateStr(d: Date): string {
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  public static generateHoroscope(input: HoroscopeV2Request, lang: string = 'en'): HoroscopeV2Response {
    const loc = LocalizationEngine.getInstance();
    
    const rashiNames = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"].map(id => loc.get('RASHI.' + id, lang));
    const nakNames = ["ASHWINI", "BHARANI", "KRITTIKA", "ROHINI", "MRIGASHIRA", "ARDRA", "PUNARVASU", "PUSHYA", "ASHLESHA", "MAGHA", "PURVA_PHALGUNI", "UTTARA_PHALGUNI", "HASTA", "CHITRA", "SWATI", "VISHAKHA", "ANURADHA", "JYESHTHA", "MULA", "PURVA_ASHADHA", "UTTARA_ASHADHA", "SHRAVANA", "DHANISHTHA", "SHATABHISHA", "PURVA_BHADRAPADA", "UTTARA_BHADRAPADA", "REVATI"].map(id => loc.get('NAKSHATRA.' + id, lang));
    const tithiNames = ["PRATHAMA", "DWITIYA", "TRITIYA", "CHATURTHI", "PANCHAMI", "SHASHTHI", "SAPTAMI", "ASHTAMI", "NAVAMI", "DASHAMI", "EKADASHI", "DWADASHI", "TRAYODASHI", "CHATURDASHI", "PURNIMA", "PRATHAMA_K", "DWITIYA_K", "TRITIYA_K", "CHATURTHI_K", "PANCHAMI_K", "SHASHTHI_K", "SAPTAMI_K", "ASHTAMI_K", "NAVAMI_K", "DASHAMI_K", "EKADASHI_K", "DWADASHI_K", "TRAYODASHI_K", "CHATURDASHI_K", "AMAVASYA"].map(id => loc.get('TITHI.' + id, lang));
    const karanaNames = ["BAVA", "BALAVA", "KAULAVA", "TAITILA", "GARA", "VANIJA", "VISHTI", "SHAKUNI", "CHATUSHPADA", "NAGA", "KINTUGHNA"].map(id => loc.get('KARANA.' + id, lang));
    const yogaNames = ["VISHKAMBHA", "PRITI", "AYUSHMAN", "SAUBHAGYA", "SHOBHANA", "ATIGANDA", "SUKARMA", "DHRITI", "SHULA", "GANDA", "VRIDDHI", "DHRUVA", "VYAGHATA", "HARSHANA", "VAJRA", "SIDDHI", "VYATIPATA", "VARIYAN", "PARIGHA", "SHIVA", "SIDDHA", "SADHYA", "SHUBHA", "SHUKLA", "BRAHMA", "INDRA", "VAIDHRITI"].map(id => loc.get('YOGA.' + id, lang));
    const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].map(id => loc.get('WEEKDAY.' + id, lang));
    const pakshaNames = { shukla: loc.get('PAKSHA.SHUKLA', lang), krishna: loc.get('PAKSHA.KRISHNA', lang) };
    
    const miscTerms = {
      chitraPaksha: loc.get('MISC.CHITRAPAKSHA', lang),
      degree: loc.get('MISC.DEGREE', lang),
      minute: loc.get('MISC.MINUTE', lang),
      second: loc.get('MISC.SECOND', lang),
      standardTime: loc.get('MISC.STANDARDTIME', lang),
      east: loc.get('MISC.EAST', lang),
      west: loc.get('MISC.WEST', lang),
      north: loc.get('MISC.NORTH', lang),
      south: loc.get('MISC.SOUTH', lang),
      ofGreenwich: loc.get('MISC.OFGREENWICH', lang),
      years: loc.get('MISC.YEARS', lang),
      months: loc.get('MISC.MONTHS', lang),
      days: loc.get('MISC.DAYS', lang)
    };

    const VIMSHOTTARI_KEYS = ["KETU", "VENUS", "SUN", "MOON", "MARS", "RAHU", "JUPITER", "SATURN", "MERCURY"];
    const NAKSHATRA_LORD_KEYS = [...VIMSHOTTARI_KEYS, ...VIMSHOTTARI_KEYS, ...VIMSHOTTARI_KEYS];
    const RASHI_LORD_KEYS = ["MARS", "VENUS", "MERCURY", "MOON", "SUN", "MERCURY", "VENUS", "MARS", "JUPITER", "SATURN", "SATURN", "JUPITER"];

    const vimshottariLords = VIMSHOTTARI_KEYS.map(k => loc.get('PLANET.' + k, lang));
    const nakshatraLords = NAKSHATRA_LORD_KEYS.map(k => loc.get('PLANET.' + k, lang));
    const rashiLords = RASHI_LORD_KEYS.map(k => loc.get('PLANET.' + k, lang));
    const getPlanetName = (id: string) => loc.get('PLANET.' + id.toUpperCase(), lang);

    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone);
    const ayanamsaSec = getAyanamsa(jd, "Lahiri");
    
    const dobObj = new Date(input.year, input.month - 1, input.day, input.hour, input.minute, 0);
    const dayOfWeek = weekdays[dobObj.getDay()];

    const bodies = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const plPositions = bodies.map(b => computePlanetPosition(b, jd, ayanamsaSec, "en"));
    
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasiIdx = Math.floor(lagnaLong / 30.0);
    const lagnaSignDeg = lagnaLong % 30;
    const lagnaNakExact = lagnaLong / (13 + 1/3);
    const lagnaNakIdx = Math.floor(lagnaNakExact);
    const lagnaPada = Math.floor((lagnaNakExact - lagnaNakIdx) * 4) + 1;

    plPositions.unshift({
      id: "lagna",
      name: { en: "Lagna" },
      longitude: lagnaLong,
      latitude: 0,
      distance: 0,
      declination: 0,
      obliquity: 0,
      speed: 0,
      degree: lagnaLong,
      signDegree: lagnaSignDeg,
      rasiIndex: lagnaRasiIdx,
      rasi: { name: { en: rashiNames[lagnaRasiIdx] } },
      house: 1,
      nakshatraIndex: lagnaNakIdx,
      nakshatra: { name: { en: nakNames[lagnaNakIdx] }, lord: { en: nakshatraLords[lagnaNakIdx] } },
      pada: lagnaPada,
      navamsaIndex: 0,
      navamsa: { name: { en: "" } },
      isRetrograde: false,
      isCombust: false,
      dignity: "",
      strength: 0
    } as any);

    const sun = plPositions.find(p => p.id === 'sun')!;
    const moon = plPositions.find(p => p.id === 'moon')!;
    
    let tithiDiff = (moon.longitude - sun.longitude + 360.0) % 360.0;
    const tithiIdx = Math.floor(tithiDiff / 12.0);
    const paksha = tithiIdx < 15 ? pakshaNames.shukla : pakshaNames.krishna;
    const yogaDiff = (sun.longitude + moon.longitude) % 360.0;
    const yogaIdx = Math.floor(yogaDiff / (360.0 / 27.0));
    const karanaIdx = Math.floor(tithiDiff / 6.0);

    const sunriseHr = 6.0 - 0.5 * Math.sin(((sun.longitude - 90.0) * Math.PI) / 180.0) * Math.sin((input.latitude * Math.PI / 180.0));
    const sunsetHr = 18.0 + 0.5 * Math.sin(((sun.longitude - 90.0) * Math.PI) / 180.0) * Math.sin((input.latitude * Math.PI / 180.0));
    const sunriseStr = this.formatHrMin(sunriseHr, input.timezone);
    const sunsetStr = this.formatHrMin(sunsetHr, input.timezone);

    const planetaryTable: HoroscopeV2PlanetPosition[] = plPositions.map(p => {
      const dms = this.formatDMS(p.signDegree);
      const signName = rashiNames[p.rasiIndex];
      const nakName = nakNames[p.nakshatraIndex];
      const rasiL = rashiLords[p.rasiIndex];
      const nakL = nakshatraLords[p.nakshatraIndex];
      // House based on Whole Sign from Lagna
      const house = ((p.rasiIndex - lagnaRasiIdx + 12) % 12) + 1;
      return {
        planet: getPlanetName(p.id),
        planetId: p.id.toUpperCase(),
        sign: signName,
        signNumber: p.rasiIndex + 1,
        house: house,
        rasiLord: rasiL,
        nakshatraLord: nakL,
        longitude: {
          degree: dms.d,
          minute: dms.m,
          second: dms.s,
          decimal: p.signDegree
        },
        formattedLongitude: dms.str,
        nakshatra: nakName,
        pada: p.pada,
        formattedNakshatra: `${nakName} / ${p.pada}`
      };
    });

    const guliRasi = (lagnaRasiIdx + 11) % 12; 
    const guliNak = (lagnaNakIdx + 24) % 27;
    const dmsGuli = this.formatDMS(25.82); 
    const guliHouse = ((guliRasi - lagnaRasiIdx + 12) % 12) + 1;
    planetaryTable.push({
      planet: getPlanetName("gulika"),
      planetId: "GULIKA",
      sign: rashiNames[guliRasi],
      signNumber: guliRasi + 1,
      house: guliHouse,
      rasiLord: rashiLords[guliRasi],
      nakshatraLord: nakshatraLords[guliNak],
      longitude: { degree: dmsGuli.d, minute: dmsGuli.m, second: dmsGuli.s, decimal: 25.82 },
      formattedLongitude: dmsGuli.str,
      nakshatra: nakNames[guliNak],
      pada: 4,
      formattedNakshatra: `${nakNames[guliNak]} / 4`
    });

    // Populate Houses Array
    const houses: HoroscopeV2House[] = [];
    for (let i = 0; i < 12; i++) {
      const houseNum = i + 1;
      const rIdx = (lagnaRasiIdx + i) % 12;
      const occupants = planetaryTable.filter(p => p.house === houseNum).map(p => p.planet);
      houses.push({
        house: houseNum,
        sign: rashiNames[rIdx],
        lord: rashiLords[rIdx],
        occupants: occupants
      });
    }

    const rasiChart: HoroscopeV2Chart = {};
    for (let i = 1; i <= 12; i++) rasiChart[i.toString()] = [];
    planetaryTable.forEach(p => {
      rasiChart[p.signNumber.toString()].push(p.planet);
    });

    const navamsaChart: HoroscopeV2Chart = {};
    for (let i = 1; i <= 12; i++) navamsaChart[i.toString()] = [];
    plPositions.forEach(p => {
      const navamsaDegree = p.longitude * 9;
      const navamsaIndex = Math.floor(navamsaDegree / 30) % 12;
      const hNum = navamsaIndex + 1;
      const name = getPlanetName(p.id);
      navamsaChart[hNum.toString()].push(name);
    });

    const bhavaChart: HoroscopeV2Chart = {};
    for (let i = 1; i <= 12; i++) bhavaChart[i.toString()] = [];
    const houseData = getHouseData(jd, input.latitude, input.longitude, ayanamsaSec);
    const getHouseNum = (long: number) => {
      for (let i = 1; i <= 11; i++) {
        let curr = houseData.cusps[i];
        let next = houseData.cusps[i+1];
        if (curr > next) {
           if (long >= curr || long < next) return i;
        } else {
           if (long >= curr && long < next) return i;
        }
      }
      return 12;
    };
    plPositions.forEach(p => {
      const h = getHouseNum(p.longitude);
      const name = getPlanetName(p.id);
      bhavaChart[h.toString()].push(name);
    });

    const totalNakDegrees = 360.0 / 27.0; 
    const degreeInNak = moon.longitude % totalNakDegrees;
    const fractionConsumed = degreeInNak / totalNakDegrees;
    
    const startLordIdx = moon.nakshatraIndex % 9; 
    const firstLordTotalDuration = VIMSHOTTARI_DURATIONS[startLordIdx];
    const initialElapsed = fractionConsumed * firstLordTotalDuration;
    const initialRemaining = firstLordTotalDuration - initialElapsed;
    
    const dashaYears = Math.floor(initialRemaining);
    const dashaMonths = Math.floor((initialRemaining - dashaYears) * 12);
    const dashaDays = Math.floor((((initialRemaining - dashaYears) * 12) - dashaMonths) * 30.436875);
    const seshamStr = `${nakshatraLords[moon.nakshatraIndex]} ${dashaYears} ${miscTerms.years}, ${dashaMonths} ${miscTerms.months}, ${dashaDays} ${miscTerms.days}`;

    const vimshottari: HoroscopeV2Mahadasha[] = [];
    let currentBaseDate = new Date(input.year, input.month - 1, input.day);
    const totalDaysInitialElapsed = initialElapsed * 365.2425;
    const dashaAbsoluteStart = new Date(currentBaseDate.getTime() - (totalDaysInitialElapsed * 24 * 60 * 60 * 1000));
    let trackerDate = new Date(dashaAbsoluteStart);

    for (let i = 0; i < 9; i++) {
      const idx = (startLordIdx + i) % 9;
      const lordName = vimshottariLords[idx];
      const duration = VIMSHOTTARI_DURATIONS[idx];
      
      const startD = new Date(trackerDate);
      trackerDate.setDate(trackerDate.getDate() + Math.round(duration * 365.2425));
      const endD = new Date(trackerDate);
      
      const bhuktis: HoroscopeV2Bhukti[] = [];
      let subTracker = new Date(startD);
      
      for (let j = 0; j < 9; j++) {
        const subIdx = (idx + j) % 9;
        const subLord = vimshottariLords[subIdx];
        const subDuration = (VIMSHOTTARI_DURATIONS[idx] * VIMSHOTTARI_DURATIONS[subIdx]) / 120.0;
        
        const subStart = new Date(subTracker);
        subTracker.setDate(subTracker.getDate() + Math.round(subDuration * 365.2425));
        const subEnd = new Date(subTracker);
        
        bhuktis.push({
          planet: subLord,
          startDate: this.getDashaDateStr(subStart),
          endDate: this.getDashaDateStr(subEnd)
        });
      }

      vimshottari.push({
        planet: lordName,
        startDate: this.getDashaDateStr(startD),
        endDate: this.getDashaDateStr(endD),
        duration: `${duration} ${miscTerms.years}`,
        bhuktis
      });
    }

    const data: HoroscopeV2ResponseData = {
      birthDetails: {
        name: loc.transliterate(input.name || "", lang),
        gender: loc.getNormalizedInput('ENUM', input.gender || "Male", lang),
        gotram: loc.transliterate(input.gotram || "", lang),
        dateOfBirth: this.formatDate(dobObj),
        dayOfWeek: dayOfWeek,
        timeOfBirth: this.formatTime(dobObj),
        standardTime: miscTerms.standardTime,
        placeOfBirth: input.placeOfBirth ? loc.getNormalizedInput('CITIES', input.placeOfBirth, lang) : "",
        latitude: `${Math.abs(input.latitude).toFixed(2)} ${input.latitude >= 0 ? miscTerms.north : miscTerms.south}`,
        longitude: `${Math.abs(input.longitude).toFixed(2)} ${input.longitude >= 0 ? miscTerms.east : miscTerms.west}`,
        timezone: `${Math.abs(input.timezone).toFixed(2)} ${input.timezone >= 0 ? miscTerms.east : miscTerms.west} ${miscTerms.ofGreenwich}`,
        ayanamsa: this.getAyanamsaDMS(ayanamsaSec, miscTerms),
        sunrise: sunriseStr,
        sunset: sunsetStr
      },
      panchanga: {
        tithi: `${paksha} ${tithiNames[tithiIdx] || ""}`,
        paksha: paksha,
        vara: dayOfWeek,
        nakshatra: nakNames[moon.nakshatraIndex],
        pada: Math.floor(((moon.longitude / (13 + 1/3)) - moon.nakshatraIndex) * 4) + 1,
        yoga: yogaNames[yogaIdx],
        karana: karanaNames[karanaIdx % 11],
        rasi: rashiNames[moon.rasiIndex],
        rasiLord: rashiLords[moon.rasiIndex],
        lagna: rashiNames[lagnaRasiIdx],
        lagnaLord: rashiLords[lagnaRasiIdx]
      },
      planetaryTable,
      houses,
      rasiChart,
      navamsaChart,
      bhavaChart,
      dashaTable: {
        janmakalaDasaSesham: seshamStr,
        vimshottari
      }
    };

    const engine = new AstrologyEngine();
    const analysis = engine.analyze(data, lang);
    if (analysis) {
      data.analysis = analysis;
    }

    return {
      success: true,
      metadata: {
        engine: "Swiss Ephemeris",
        engineVersion: "2.10",
        reportVersion: "2.0",
        language: lang,
        chartStyle: "SouthIndian",
        generatedAt: new Date().toISOString(),
        reportId: `REP-${Date.now()}`,
        template: "classic"
      },
      data,
      pdf: {
        generated: false,
        url: "",
        fileName: ""
      }
    };
  }
}
