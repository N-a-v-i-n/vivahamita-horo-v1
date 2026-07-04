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

export interface LocalizedString {
  en: string;
  te?: string;
  ta?: string;
  kn?: string;
  hi?: string;
}

export interface LocalizedEntity {
  id: string;
  name: LocalizedString;
  [key: string]: any;
}

export type AyanamsaType = "Lahiri" | "Raman" | "Krishnamurti" | "Fagan-Bradley" | "Yukteswar" | "Tropical";

export interface BirthInput {
  name?: string;
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
  targetDate?: string;
  explain?: boolean;
}

export interface MatchingInput {
  boy: BirthInput;
  girl: BirthInput;
  lang?: LanguageCode;
  targetDate?: string;
}

export interface PlanetPosition {
  id: string;
  name: LocalizedString;
  longitude: number;
  latitude: number;
  distance: number; // in AU
  declination: number; // in degrees
  obliquity: number; // in degrees, only used for some bodies or if specified
  speed: number;
  degree: number;
  signDegree: number;
  rasiIndex: number;
  rasi: LocalizedEntity;
  house: number;
  nakshatraIndex: number;
  nakshatra: LocalizedEntity;
  pada: number;
  navamsaIndex: number;
  navamsa: LocalizedEntity;
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: string; // Exalted, Debilitated, Own, Friend, Enemy, Neutral
  strength: number; // Shadbala proxy percentage
}

export interface HouseData {
  ascendant: number;
  mc: number;
  armc: number;
  vertex: number;
  equatorialAscendant: number;
  coAscendant: number;
  cusps: number[]; // 1-indexed, usually 1 to 12
}

export interface DivisionalChartPoint {
  planet: LocalizedEntity;
  longitude: number;
  signIndex: number;
  sign: LocalizedEntity;
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
    name: LocalizedString;
    degreeRemaining: number;
    paksha: "Shukla" | "Krishna";
    pakshaName: LocalizedString;
  };
  nakshatra: {
    index: number;
    entity: LocalizedEntity;
    lord: LocalizedEntity;
    degreeRemaining: number;
  };
  yoga: {
    index: number;
    name: LocalizedString;
    degreeRemaining: number;
  };
  karana: {
    index: number;
    name: LocalizedString;
  };
  festivals: string[];
  lunarMonth: LocalizedString;
  samvatsara: LocalizedString;
  ritu: LocalizedString;
  ayana: LocalizedString;
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

export interface AstroProfileInfo {
  name?: string;
  birth?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  moonSign: string;
  moonSignLord: string;
  nakshatra: string;
  nakshatraLord?: string;
  pada: number;
  varna: string;
  vashya: string;
  yoni: string;
  gana: string;
  nadi: string;
  planets?: Record<string, any>;
  panchang?: {
    sunrise: string;
    sunset: string;
    yoga: string;
    karana: string;
    tithi: string;
    tatva: string;
    nameAlphabet: string;
    paya: string;
  };
}

export interface MatchingResult {
  boyInfo: AstroProfileInfo;
  girlInfo: AstroProfileInfo;
  calculation: {
    system: string;
    ayanamsa: string;
    houseSystem: string;
    zodiac: string;
    version?: string;
  };
  summary: {
    score: number;
    maxScore: number;
    percentage: number;
    recommendation: string;
  };
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
  childrenScore: { rating: string; description: string; traditionalMeaning?: string; confidence: number };
  healthScore: { rating: string; description: string; confidence: number };
  financeScore: { rating: string; description: string; confidence: number };
  longevityScore: { rating: string; description: string; confidence: number };
  doshaMatching: {
    boyDoshas: string[];
    girlDoshas: string[];
    hasManglikDoshaConflict: boolean;
    isCancelled: boolean;
    cancellationDetails?: string;
  };
  mandatory_failures?: string[]; // Legacy alias
  mandatoryFailures?: string[];
  // Legacy aliases
  children_score_insight?: { value: string; nature: string; traditionalMeaning?: string };
  childrenScoreInsight?: { value: string; nature: string; traditionalMeaning?: string };
  health_score_insight?: { value: string; nature: string; traditionalMeaning?: string };
  healthScoreInsight?: { value: string; nature: string; traditionalMeaning?: string };
  finance_score_insight?: { value: string; nature: string; traditionalMeaning?: string };
  financeScoreInsight?: { value: string; nature: string; traditionalMeaning?: string };
  longevity_score_insight?: { value: string; nature: string; traditionalMeaning?: string };
  longevityScoreInsight?: { value: string; nature: string; traditionalMeaning?: string };
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
  recommendation?: {
    status: "Compatible" | "CompatibleWithCaution" | "NeedsDetailedReview" | "NotRecommended";
    confidence: number;
    requiresExpertReview: boolean;
    reasons: string[];
  };
  report: string;
}

export interface FullReportData {
  matching: MatchingResult;
  boyHoroscope?: HoroscopeReport;
  girlHoroscope?: HoroscopeReport;
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
    version?: string;
    timestamp: string;
  };
}

export interface HoroscopeHouse {
  index: number; // 1-12
  signIndex: number;
  signName: string;
  lord: string; // Lord of the house
  occupants: string[]; // Names of planets occupying the house
  degree: number; // Cusp degree
}

export interface Horoscope {
  ascendant: {
    signIndex: number;
    signName: string;
    longitude: number;
    signDegree: number;
    lord: string;
  };
  planets: Record<string, PlanetPosition>; // Keyed by planet name
  houses: HoroscopeHouse[]; // 1-12
  aspects: { aspectingPlanet: string; aspectedPlanet: string; type: string }[];
}

export interface YogaResult {
  id: string;
  name: string;
  detected: boolean;
  strength: number; // 0-100
  evidence: string[];
  rule: {
    version?: string;
    reference: string;
  };
}

export interface YogaRule {
  id: string;
  name: string;
  description: string;
  ruleMetadata: { version?: string; reference: string; };
  detect(chart: Horoscope, lang: LanguageCode): YogaResult;
}

export interface InterpretationCategory {
  score: number; // 0-100 indicating strength or favorability
  observations: string[]; // Factual statements
  traditionalInterpretations: string[]; // Interpretive statements
}

export interface InterpretationResult {
  personality: InterpretationCategory;
  career: InterpretationCategory;
  education: InterpretationCategory;
  finance: InterpretationCategory;
  relationships: InterpretationCategory;
  health: InterpretationCategory;
  spirituality: InterpretationCategory;
  strengths: string[];
  challenges: string[];
  remedies: string[]; // Tagged explicitly as traditional remedies
}

export interface BirthProfile {
  lagna: string;
  moonRasi: string;
  sunRasi: string;
  nakshatra: string;
  pada: number;
  nakshatraLord: string;
  lagnaLord: string;
  atmakaraka: string;
  amatyakaraka: string;
}

export interface DoshaResult {
  id: string;
  name: string;
  detected: boolean;
  severity: number; // 0-100
  cancellation: boolean;
  evidence: string[];
  remedies: string[];
}

export interface HoroscopeReport {
  overview: {
    system: string;
    ayanamsa: string;
    houseSystem: string;
    zodiac: string;
    apiVersion: string;
    engineVersion: string;
    calculatedAt: string;
  };
  profile: BirthProfile;
  panchang: PanchangResponse;
  chart: Horoscope;
  yogas: {
    summary: { checked: number; detectedCount: number; };
    detected: YogaResult[];
    notDetected: string[];
  };
  doshas?: {
    summary: { checked: number; detectedCount: number; cancelledCount: number; };
    detected: DoshaResult[];
    notDetected: string[];
  };
  dashas?: import("../services/dashaEngine").DashaResult;
  transits?: any; // To be expanded in Phase 7
  interpretation: InterpretationResult;
  predictions?: any; // To be expanded in Phase 8
  remedies?: any; // To be expanded in Phase 9
}
