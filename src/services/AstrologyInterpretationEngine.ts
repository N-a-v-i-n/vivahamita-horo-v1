import { LocalizationEngine } from './LocalizationEngine';

export interface InterpretationData {
  lang: string;
  totalObtained: number;
  percentage: number;
  maitriScore: number;
  nadiScore: number;
  bhakootScore: number;
  taraScore: number;
  yoniScore: number;
  hasManglikDoshaConflict: boolean;
  isManglikCancelled: boolean;
  boyPaapaPoints: number;
  girlPaapaPoints: number;
  isPaapaCompatible: boolean;
  mandatoryFailures: string[];
}

export class InterpretationEngine {
  public static generateExecutiveSummary(data: InterpretationData): string {
    const loc = LocalizationEngine.getInstance();

    // Phase 1: Observation Engine
    const isHighMaitri = data.maitriScore >= 4;
    const isLowMaitri = data.maitriScore <= 1;
    const isHighNadi = data.nadiScore >= 8;
    const isLowBhakoot = data.bhakootScore === 0;
    const isLowTara = data.taraScore <= 1.5;
    const isHighYoni = data.yoniScore >= 3;

    const hasRajjuFailure = data.mandatoryFailures.some(f => f.toLowerCase().includes('rajju'));
    const hasMahendraFailure = data.mandatoryFailures.some(f => f.toLowerCase().includes('mahendra'));

    // Phase 2: Relationship Engine & Theme Builder
    const themes: string[] = [];

    // Theme 1: Emotional & Intellectual Base
    if (isHighMaitri && isHighYoni) {
      themes.push("THEME_STRONG_EMOTIONAL_PHYSICAL");
    } else if (isHighMaitri) {
      themes.push("THEME_STRONG_INTELLECTUAL");
    } else if (isLowMaitri && isLowBhakoot) {
      themes.push("THEME_POOR_EMOTIONAL_FINANCIAL");
    } else if (isLowMaitri) {
      themes.push("THEME_WEAK_INTELLECTUAL");
    } else {
      themes.push("THEME_AVERAGE_BONDING");
    }

    // Theme 2: Prosperity, Health & Progeny
    if (isHighNadi && !isLowBhakoot) {
      themes.push("THEME_EXCELLENT_PROSPERITY_PROGENY");
    } else if (!isHighNadi && isLowBhakoot) {
      themes.push("THEME_CHALLENGING_HEALTH_FINANCE");
    } else if (isLowBhakoot) {
      themes.push("THEME_FINANCIAL_CHALLENGES");
    } else if (!isHighNadi) {
      themes.push("THEME_HEALTH_PROGENY_CONCERNS");
    }

    // Theme 3: Doshas and Mitigations (Critical Factors)
    if (data.hasManglikDoshaConflict && !data.isManglikCancelled) {
      if (data.isPaapaCompatible) {
        themes.push("THEME_MANGLIK_MITIGATED_BY_PAAPA");
      } else {
        themes.push("THEME_MANGLIK_AND_PAAPA_CONFLICT");
      }
    } else if (data.hasManglikDoshaConflict && data.isManglikCancelled) {
      if (data.isPaapaCompatible) {
        themes.push("THEME_MANGLIK_CANCELLED_GOOD_PAAPA");
      } else {
        themes.push("THEME_MANGLIK_CANCELLED_BAD_PAAPA");
      }
    } else {
      if (!data.isPaapaCompatible) {
        themes.push("THEME_NO_MANGLIK_BUT_BAD_PAAPA");
      } else {
        themes.push("THEME_DOSHA_FREE_AND_GOOD_PAAPA");
      }
    }

    if (hasRajjuFailure) {
      themes.push("THEME_RAJJU_FAILURE_WARNING");
    }

    // Phase 4: Narrative Builder & Final Conclusion
    if (data.totalObtained >= 25 && data.mandatoryFailures.length === 0 && !data.hasManglikDoshaConflict && data.isPaapaCompatible) {
      themes.push("CONCLUSION_HIGHLY_RECOMMENDED");
    } else if (data.totalObtained >= 18 && (data.mandatoryFailures.length === 0 || hasRajjuFailure)) {
      themes.push("CONCLUSION_RECOMMENDED_WITH_CAUTION");
    } else {
      themes.push("CONCLUSION_NOT_RECOMMENDED");
    }

    // Map themes to semantic strings using LocalizationEngine
    // (We will create a fallback dictionary if the keys don't exist yet)
    let paragraph = "";

    // Intro Score
    const introKey = data.totalObtained >= 27 ? 'SUMMARY_SCORE_EXCELLENT' : data.totalObtained >= 18 ? 'SUMMARY_SCORE_AVERAGE' : 'SUMMARY_SCORE_LOW';
    const rawIntro = loc.get(`INTERPRETATION.${introKey}`, data.lang);
    paragraph += rawIntro.replace('{score}', data.totalObtained.toString()).replace('{percent}', data.percentage.toFixed(0)) + " ";

    themes.forEach(theme => {
      const text = loc.get(`INTERPRETATION.${theme}`, data.lang);
      if (text && !text.startsWith('INTERPRETATION.')) {
        paragraph += text + " ";
      }
    });

    return paragraph.trim();
  }
}
