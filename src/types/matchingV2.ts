import { BirthInput } from "./astrology";
import { HoroscopeV2ResponseData } from "./horoscopeV2";
import { MatchingResult } from "./astrology";

export interface MatchingV2Request {
  boy: BirthInput;
  girl: BirthInput;
}

export interface MatchingV2ResponseData {
  boyHoroscope: HoroscopeV2ResponseData;
  girlHoroscope: HoroscopeV2ResponseData;
  
  // High level overview
  summary: {
    score: number;
    maxScore: number;
    percentage: number;
    recommendation: string;
    compatibilityScore: number;
  };

  // Detailed scores
  ashtaKoota: any[];
  porutham: any[];
  
  doshaMatching: {
    boyDoshas: string[];
    girlDoshas: string[];
    hasManglikDoshaConflict: boolean;
    isCancelled: boolean;
    cancellationDetails?: string;
  };
  
  paapaSamyam: {
    boyPoints: number;
    girlPoints: number;
    totalPoints: number;
    description: string;
  };

  scores: {
    children: any;
    health: any;
    finance: any;
    longevity: any;
  };

  recommendation: {
    strengths: string[];
    warnings: string[];
    mandatoryFailures: string[];
    expertReview: string[];
    finalRecommendation: string;
  };
}

export interface MatchingV2Response {
  success: boolean;
  metadata: {
    version: string;
    engine: string;
    engineVersion: string;
    generatedAt: string;
    language: string;
    chartStyle: string;
    reportType: string;
    template: string;
  };
  data: MatchingV2ResponseData;
  pdf?: {
    generated: boolean;
    url: string;
    fileName: string;
    generatedAt: string;
  };
}
