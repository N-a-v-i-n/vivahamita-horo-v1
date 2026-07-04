import { Horoscope, LocalizedEntity } from "../types/astrology";
import { LocalizationService } from "./localizationService";

export interface DashaPeriod {
  lord: LocalizedEntity;
  startDate: string; // ISO String
  endDate: string; // ISO String
  durationYears: number;
  subPeriods?: DashaPeriod[]; // Only populated up to requested depth
}

export interface DashaResult {
  birthBalance: {
    lord: LocalizedEntity;
    yearsRemaining: number;
  };
  current: {
    mahadasha: LocalizedEntity;
    antardasha: LocalizedEntity;
    pratyantardasha: LocalizedEntity;
  };
  timeline: DashaPeriod[]; // The 120-year cycle
}

export class DashaEngine {
  private static readonly VIMSHOTTARI_YEARS: Record<string, number> = {
    ketu: 7,
    venus: 20,
    sun: 6,
    moon: 10,
    mars: 7,
    rahu: 18,
    jupiter: 16,
    saturn: 19,
    mercury: 17
  };

  private static readonly DASHA_SEQUENCE = [
    "ketu", "venus", "sun", "moon", "mars", "rahu", "jupiter", "saturn", "mercury"
  ];

  private static readonly SOLAR_YEAR_DAYS = 365.2425;
  private static readonly TOTAL_CYCLE_YEARS = 120;

  /**
   * Calculates the Vimshottari Dasha timeline based on the Moon's longitude.
   * Deterministic: accepts targetDate to compute 'current' without relying on Date.now().
   */
  public static calculateVimshottari(
    moonLongitude: number,
    birthDateISO: string,
    targetDateISO: string
  ): DashaResult {
    // 1. Nakshatra math
    const NAKSHATRA_ARC = 13 + (1 / 3); // 13.3333 degrees
    const exactNakshatra = moonLongitude / NAKSHATRA_ARC;
    const nakIndex = Math.floor(exactNakshatra);
    
    // Moon's position within the nakshatra (0.0 to 1.0)
    const fractionTraversed = exactNakshatra - nakIndex;
    const fractionRemaining = 1.0 - fractionTraversed;

    // The sequence starts from Ketu for Ashwini (index 0)
    const startingLordIndex = nakIndex % 9;
    const startingLordId = this.DASHA_SEQUENCE[startingLordIndex];
    
    const startingLordTotalYears = this.VIMSHOTTARI_YEARS[startingLordId];
    const birthBalanceYears = fractionRemaining * startingLordTotalYears;

    // 2. Build the Timeline (3 levels deep: Maha, Antar, Pratya)
    const timeline = this.buildTimeline(startingLordIndex, birthDateISO, birthBalanceYears, startingLordTotalYears);

    // 3. Find current Dasha blocks based on targetDate
    const current = this.findCurrentPeriods(timeline, targetDateISO);

    return {
      birthBalance: {
        lord: LocalizationService.getPlanet(startingLordId),
        yearsRemaining: Number(birthBalanceYears.toFixed(4))
      },
      current,
      timeline
    };
  }

  private static buildTimeline(startingLordIdx: number, birthDateISO: string, balanceYears: number, firstLordTotalYears: number): DashaPeriod[] {
    const timeline: DashaPeriod[] = [];
    const birthDate = new Date(birthDateISO);
    
    let currentStartTime = birthDate.getTime();
    
    for (let i = 0; i < 9; i++) {
      const lordIdx = (startingLordIdx + i) % 9;
      const lordId = this.DASHA_SEQUENCE[lordIdx];
      const lordTotalYears = this.VIMSHOTTARI_YEARS[lordId];
      
      // First dasha is truncated to the balance
      const actualDuration = (i === 0) ? balanceYears : lordTotalYears;
      const durationMs = actualDuration * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000;
      
      const endTime = currentStartTime + durationMs;

      // Antardashas
      const antardashas = this.buildSubPeriods(lordId, lordId, new Date(currentStartTime), actualDuration, lordTotalYears, (i === 0));

      timeline.push({
        lord: LocalizationService.getPlanet(lordId),
        startDate: new Date(currentStartTime).toISOString(),
        endDate: new Date(endTime).toISOString(),
        durationYears: Number(actualDuration.toFixed(4)),
        subPeriods: antardashas
      });

      currentStartTime = endTime;
    }

    return timeline;
  }

  private static buildSubPeriods(
    mahaLordId: string, 
    startSubLordId: string, 
    startDate: Date, 
    actualDurationYears: number, // Can be truncated if it's the birth mahadasha
    fullMahaYears: number,
    isBirthMaha: boolean
  ): DashaPeriod[] {
    const subs: DashaPeriod[] = [];
    let currentTime = startDate.getTime();
    
    const mahaLordIdx = this.DASHA_SEQUENCE.indexOf(mahaLordId);
    let subLordIdx = this.DASHA_SEQUENCE.indexOf(startSubLordId);

    // If it's the birth dasha, we don't start from the first sub-lord necessarily.
    // We compute the exact elapsed time to figure out which sub-lord we are born into.
    const elapsedMahaYears = fullMahaYears - actualDurationYears;
    
    let simulatedStartTime = startDate.getTime() - (elapsedMahaYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000);

    for (let i = 0; i < 9; i++) {
      const currentSubLordId = this.DASHA_SEQUENCE[(mahaLordIdx + i) % 9];
      const subLordTotalYears = this.VIMSHOTTARI_YEARS[currentSubLordId];
      
      // The rule of proportion: Sub Duration = (Maha Years * Sub Years) / 120
      const fullSubDurationYears = (fullMahaYears * subLordTotalYears) / this.TOTAL_CYCLE_YEARS;
      const fullSubDurationMs = fullSubDurationYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000;
      
      const simulatedEndTime = simulatedStartTime + fullSubDurationMs;

      // If this sub-period ended before birth, we skip it
      if (simulatedEndTime <= startDate.getTime()) {
        simulatedStartTime = simulatedEndTime;
        continue;
      }

      // If it overlaps with birth, it's the starting antardasha and gets truncated
      const actualSubStart = Math.max(simulatedStartTime, startDate.getTime());
      const actualSubDurationMs = simulatedEndTime - actualSubStart;
      const actualSubDurationYears = actualSubDurationMs / (this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000);

      const pratyantardashas = this.buildPratyantarPeriods(
        currentSubLordId,
        new Date(actualSubStart),
        actualSubDurationYears,
        fullSubDurationYears
      );

      subs.push({
        lord: LocalizationService.getPlanet(currentSubLordId),
        startDate: new Date(actualSubStart).toISOString(),
        endDate: new Date(simulatedEndTime).toISOString(),
        durationYears: Number(actualSubDurationYears.toFixed(4)),
        subPeriods: pratyantardashas
      });

      simulatedStartTime = simulatedEndTime;
    }

    return subs;
  }

  private static buildPratyantarPeriods(
    antarLordId: string,
    startDate: Date,
    actualDurationYears: number,
    fullAntarYears: number
  ): DashaPeriod[] {
    const pratyantaras: DashaPeriod[] = [];
    let simulatedStartTime = startDate.getTime() - ((fullAntarYears - actualDurationYears) * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000);
    
    const antarLordIdx = this.DASHA_SEQUENCE.indexOf(antarLordId);

    for (let i = 0; i < 9; i++) {
      const pratyaLordId = this.DASHA_SEQUENCE[(antarLordIdx + i) % 9];
      const pratyaLordTotalYears = this.VIMSHOTTARI_YEARS[pratyaLordId];
      
      const fullPratyaDurationYears = (fullAntarYears * pratyaLordTotalYears) / this.TOTAL_CYCLE_YEARS;
      const fullPratyaDurationMs = fullPratyaDurationYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000;
      
      const simulatedEndTime = simulatedStartTime + fullPratyaDurationMs;

      if (simulatedEndTime <= startDate.getTime()) {
        simulatedStartTime = simulatedEndTime;
        continue;
      }

      const actualStart = Math.max(simulatedStartTime, startDate.getTime());
      const actualDurationMs = simulatedEndTime - actualStart;

      pratyantaras.push({
        lord: LocalizationService.getPlanet(pratyaLordId),
        startDate: new Date(actualStart).toISOString(),
        endDate: new Date(simulatedEndTime).toISOString(),
        durationYears: Number((actualDurationMs / (this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1000)).toFixed(4))
      });

      simulatedStartTime = simulatedEndTime;
    }
    
    return pratyantaras;
  }

  private static findCurrentPeriods(timeline: DashaPeriod[], targetDateISO: string): any {
    const target = new Date(targetDateISO).getTime();
    
    const maha = timeline.find(t => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);
    if (!maha) return null;

    const antar = maha.subPeriods?.find(t => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);
    const pratya = antar?.subPeriods?.find(t => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);

    return {
      mahadasha: maha.lord,
      antardasha: antar?.lord || maha.lord,
      pratyantardasha: pratya?.lord || maha.lord
    };
  }
}
