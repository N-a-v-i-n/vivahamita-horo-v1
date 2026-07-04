import { Router, Request, Response } from "express";
import { AstrologyService } from "../services/astrologyService";
import { AstrologyV2Service } from "../services/astrologyV2Service";
import { PdfMatchingService } from "../services/pdfMatchingService";
import { MatchingV2Request, MatchingV2Response } from "../types/matchingV2";
import { LanguageCode } from "../types/astrology";
import { LocalizationEngine, UnsupportedLanguageException, MissingTranslationException } from "../services/LocalizationEngine";
import { validateLocalization } from "../utils/localizationValidator";
export const matchingV2Router = Router();

matchingV2Router.post("/", async (req: Request, res: Response) => {
  try {
    const input: MatchingV2Request = req.body;
    
    if (!input.boy || !input.girl) {
      return res.status(400).json({
        success: false,
        error: "Missing required 'boy' or 'girl' birth details in payload"
      });
    }

    const lang = (req.query.lang as LanguageCode) || 'en';

    // 1. Generate full Horoscope V2 for both
    const boyHoroscopeResult = AstrologyV2Service.generateHoroscope(input.boy, lang);
    const girlHoroscopeResult = AstrologyV2Service.generateHoroscope(input.girl, lang);

    // 2. Compute Match Scores using legacy system
    input.boy.lang = lang;
    input.girl.lang = lang;
    const matchResult = AstrologyService.calculateMatching(input.boy, input.girl, lang);

    // 3. Assemble complete Matching V2 Response Data
    const summary = {
      score: matchResult.marriageScore,
      maxScore: 36,
      percentage: matchResult.overallPercentage,
      recommendation: matchResult.summary.recommendation,
      compatibilityScore: matchResult.compatibilityScore
    };

    const doshaMatching = {
      boyDoshas: matchResult.doshaMatching.boyDoshas,
      girlDoshas: matchResult.doshaMatching.girlDoshas,
      hasManglikDoshaConflict: matchResult.doshaMatching.hasManglikDoshaConflict,
      isCancelled: matchResult.doshaMatching.isCancelled,
      cancellationDetails: matchResult.doshaMatching.cancellationDetails
    };

    const paapaSamyam = {
      boyPoints: matchResult.paapaSamyam?.boyPoints || matchResult.paapa_samyam?.boy_points || 0,
      girlPoints: matchResult.paapaSamyam?.girlPoints || matchResult.paapa_samyam?.girl_points || 0,
      totalPoints: matchResult.paapaSamyam?.total_points || matchResult.paapa_samyam?.total_points || 0,
      description: matchResult.paapaSamyam?.description || matchResult.paapa_samyam?.description || ""
    };

    const scores = {
      children: matchResult.childrenScore,
      health: matchResult.healthScore,
      finance: matchResult.financeScore,
      longevity: matchResult.longevityScore
    };

    const recommendation = {
      strengths: [],
      warnings: matchResult.recommendation?.reasons || [],
      mandatoryFailures: matchResult.mandatoryFailures || matchResult.mandatory_failures || [],
      expertReview: matchResult.recommendation?.requiresExpertReview ? [LocalizationEngine.getInstance().get('RECOMMENDATION.EXPERTREVIEW', lang)] : [],
      finalRecommendation: matchResult.report
    };

    const responseData = {
      boyHoroscope: boyHoroscopeResult.data,
      girlHoroscope: girlHoroscopeResult.data,
      summary,
      ashtaKoota: matchResult.ashtaKoota,
      porutham: matchResult.southIndianPorutham,
      doshaMatching,
      paapaSamyam,
      scores,
      recommendation
    };

    const response: MatchingV2Response = {
      success: true,
      metadata: {
        version: "v2",
        engine: "Swiss Ephemeris",
        engineVersion: "2.10.03", // standard 
        generatedAt: new Date().toISOString(),
        language: lang,
        chartStyle: "SouthIndian",
        reportType: "MarriageMatching",
        template: "Classic"
      },
      data: responseData
    };

    // 4. Generate the PDF
    if (input.pdfRequested) {
      try {
        const pdfData = await PdfMatchingService.generateMatchingPdf(response.data, lang);
        response.pdf = {
          generated: true,
          base64: pdfData.base64,
          fileName: pdfData.fileName,
          generatedAt: new Date().toISOString()
        };
      } catch (pdfErr) {
        console.warn("Failed to generate PDF, continuing without it.", pdfErr);
        response.pdf = {
          generated: false,
          url: "",
          fileName: "",
          generatedAt: new Date().toISOString()
        };
      }
    }

    // Run strict localization validator before sending response
    validateLocalization(response, lang);

    return res.status(200).json(response);
  } catch (err: any) {
    if (err instanceof UnsupportedLanguageException || err instanceof MissingTranslationException || err.name === 'EnglishLeakException') {
      console.error("[LOCALIZATION ERROR]", err.message);
      return res.status(400).json({ success: false, error: err.message });
    }
    console.error("Matching V2 Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});
