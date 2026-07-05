import { HoroscopeV2ResponseData, HoroscopeV2PlanetPosition } from '../../types/horoscopeV2';

export interface PlanetStrength {
  dignity: number;
  house: number;
  aspects: number;
  conjunctions: number;
  divisional: number; // vargottama etc
  final: number;
  reasons: string[];
}

export interface PlanetStatus {
  planet: string;
  isRetrograde: boolean;
  isCombust: boolean;
  isVargottama: boolean;
  strength: PlanetStrength;
}

export interface ChartHealth {
  chartStrength: number;
  strongAreas: string[];
  developingAreas: string[];
  dominantElements: string[];
  dominantModes: string[];
}

export interface AstrologyFacts {
  health?: ChartHealth;
  planets: Record<string, PlanetStatus>;
  strongestPlanet: string;
  weakestPlanet: string;
  lagnaLordStrength: number;
  yogas: string[];
  careerScore: number;
  marriageScore: number;
}

export interface ExplainableSection {
  text: string;
  confidence: 'High' | 'Moderate' | 'Low';
  derivedFrom: string[];
}

export interface NarrativeOutput {
  dashboard: ChartHealth;
  personality: ExplainableSection;
  career: ExplainableSection;
  marriage: ExplainableSection;
  spirituality: ExplainableSection;
}

export interface AnalysisContext {
  raw: HoroscopeV2ResponseData;
  facts: AstrologyFacts;
}

export interface IAstrologyModule {
  name: string;
  execute(context: AnalysisContext): void;
}
