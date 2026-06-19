/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = "en" | "te" | "hi" | "ta" | "kn";

export interface TranslationSet {
  en: string;
  te: string;
  hi: string;
  ta: string;
  kn: string;
}

export type AyanamsaType = "Lahiri" | "Raman" | "Krishnamurti" | "Fagan-Bradley" | "Yukteswar" | "Tropical";

export interface BirthInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: number; // UTC offset in hours, e.g. 5.5 for Asia/Kolkata
  ayanamsa?: AyanamsaType;
  lang?: LanguageCode;
  explain?: boolean;
}

export interface MatchingInput {
  boy: BirthInput;
  girl: BirthInput;
  lang?: LanguageCode;
}

export interface PlanetPosition {
  name: string;
  localizedName: string;
  longitude: number;
  latitude: number;
  speed: number;
  degree: number;
  signDegree: number;
  rasiIndex: number;
  rasiName: string;
  rasiLocalizedName: string;
  house: number;
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraLocalizedName: string;
  pada: number;
  navamsaIndex: number;
  navamsaName: string;
  navamsaLocalizedName: string;
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: string; // Exalted, Debilitated, Own, Friend, Enemy, Neutral
  strength: number; // Shadbala proxy percentage
}

export interface DivisionalChartPoint {
  planet: string;
  localizedPlanet: string;
  longitude: number;
  signIndex: number;
  signName: string;
  signLocalizedName: string;
  house: number;
}

export interface DivisionalChart {
  name: string;
  code: string; // D1, D9, etc
  description: string;
  points: DivisionalChartPoint[];
}

export interface PanchangResponse {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKalam: { start: string; end: string };
  yamagandam: { start: string; end: string };
  gulikai: { start: string; end: string };
  durmuhurtham: { start: string; end: string }[];
  abhijit: { start: string; end: string };
  brahmaMuhurta: { start: string; end: string };
  tithi: {
    index: number;
    name: string;
    localizedName: string;
    degreeRemaining: number;
    paksha: "Shukla" | "Krishna";
    pakshaLocalized: string;
  };
  nakshatra: {
    index: number;
    name: string;
    localizedName: string;
    lord: string;
    lordLocalized: string;
    degreeRemaining: number;
  };
  yoga: {
    index: number;
    name: string;
    localizedName: string;
    degreeRemaining: number;
  };
  karana: {
    index: number;
    name: string;
    localizedName: string;
  };
  festivals: string[];
  planets: PlanetPosition[];
}

export interface DashaNode {
  lord: string;
  localizedLord: string;
  startTime: string;
  endTime: string;
  durationYears: number;
  subDashas?: DashaNode[];
}

export interface DashaTimeline {
  mahadasha: string;
  localizedMahadasha: string;
  antardasha: string;
  localizedAntardasha: string;
  pratyantardasha: string;
  localizedPratyantardasha: string;
  timeRemainingYears: number;
  timeline: DashaNode[];
}

export interface DoshaRecord {
  hasDosha: boolean;
  name: string;
  localizedName: string;
  severity: "None" | "Low" | "Medium" | "High";
  description: string;
  remedies: string[];
}

export interface MatchScore {
  koota: string;
  localizedKoota: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
}

export interface MatchingResult {
  ashtaKoota: MatchScore[];
  southIndianPorutham: {
    name: string;
    localizedName: string;
    status: "Uttama" | "Madhyama" | "Adhama";
    description: string;
  }[];
  overallPercentage: number;
  marriageScore: number; // out of 36
  compatibilityScore: number; // out of 100
  childrenScore: string;
  healthScore: string;
  financeScore: string;
  longevityScore: string;
  doshaMatching: {
    boyDoshas: string[];
    girlDoshas: string[];
    hasManglikDoshaConflict: boolean;
    isCancelled: boolean;
    cancellationDetails?: string;
  };
  mandatory_failures?: string[];
  mandatoryFailures?: string[];
  children_score_insight?: { value: string; nature: string };
  childrenScoreInsight?: { value: string; nature: string };
  health_score_insight?: { value: string; nature: string };
  healthScoreInsight?: { value: string; nature: string };
  finance_score_insight?: { value: string; nature: string };
  financeScoreInsight?: { value: string; nature: string };
  longevity_score_insight?: { value: string; nature: string };
  longevityScoreInsight?: { value: string; nature: string };
  paapa_samyam?: {
    boy_points: number;
    girl_points: number;
    total_points: number;
    description: string;
  };
  paapaSamyam?: {
    boyPoints: number;
    girlPoints: number;
    total_points: number;
    description: string;
  };
  report: string;
}

export interface MuhurtaTime {
  activity: string;
  localizedActivity: string;
  isAuspicious: boolean;
  score: number;
  timeRanges: string[];
  description: string;
}

export interface NumerologyResponse {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyGem: string;
  nameAstrology: {
    birthRasi: string;
    suggestedSyllables: string[];
    babyNames: { name: string; meaning: string; gender: "M" | "F" | "U" }[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  language: LanguageCode;
  data: T;
  meta: {
    calculation_engine: string;
    ayanamsa: AyanamsaType;
    timezone: string;
    version: string;
    timestamp: string;
  };
}
