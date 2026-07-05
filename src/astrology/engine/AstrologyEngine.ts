import { HoroscopeV2ResponseData } from '../../types/horoscopeV2';
import { AnalysisContext, NarrativeOutput } from '../models/types';
import { HoroscopeValidator } from '../validators/HoroscopeValidator';
import { FeatureRegistry } from './FeatureRegistry';
import { StrengthModule } from './modules/StrengthModule';
import { YogaModule } from './modules/YogaModule';
import { NarrativeEngine } from './NarrativeEngine';

export class AstrologyEngine {
  private registry: FeatureRegistry;
  private narrativeEngine: NarrativeEngine;

  constructor() {
    this.registry = new FeatureRegistry();
    this.registry.register(new StrengthModule());
    this.registry.register(new YogaModule());
    // Future: AspectModule, DivisionalModule, DashaModule

    this.narrativeEngine = new NarrativeEngine();
  }

  public analyze(raw: HoroscopeV2ResponseData, langCode: string = 'en'): NarrativeOutput | null {
    if (!HoroscopeValidator.validate(raw)) {
      return null; // or throw error
    }

    const context: AnalysisContext = {
      raw,
      facts: {
        planets: {},
        strongestPlanet: "",
        weakestPlanet: "",
        lagnaLordStrength: 0,
        yogas: [],
        careerScore: 0,
        marriageScore: 0
      }
    };

    // 1. Analysis Phase (Fact Generation)
    this.registry.executeAll(context);

    // 2. Narrative Phase (Text Generation)
    return this.narrativeEngine.generate(context, langCode);
  }
}
