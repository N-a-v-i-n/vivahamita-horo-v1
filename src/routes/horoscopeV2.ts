import { Router, Request, Response } from "express";
import { AstrologyV2Service } from "../services/astrologyV2Service";
import { PdfService } from "../services/pdfService";
import { HoroscopeV2Request } from "../types/horoscopeV2";
import { LocalizationEngine, UnsupportedLanguageException, MissingTranslationException } from "../services/LocalizationEngine";
import { validateLocalization } from "../utils/localizationValidator";

export const horoscopeV2Router = Router();

horoscopeV2Router.post("/", async (req: Request, res: Response) => {
  try {
    const input: HoroscopeV2Request = req.body;
    
    // Validate basic input
    if (
      input.year === undefined ||
      input.month === undefined ||
      input.day === undefined ||
      input.hour === undefined ||
      input.minute === undefined ||
      input.latitude === undefined ||
      input.longitude === undefined ||
      input.timezone === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields (year, month, day, hour, minute, latitude, longitude, timezone)"
      });
    }

    const lang = (req.query.lang as string) || 'en';
    const response = AstrologyV2Service.generateHoroscope(input, lang);
    
    // Generate PDF via Puppeteer (wrap in try-catch for Vercel serverless limits)
    try {
      const pdfData = await PdfService.generateHoroscopePdf(response.data, lang);
      
      response.pdf = {
        generated: true,
        url: pdfData.url,
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
    // Run strict localization validator before sending response
    validateLocalization(response, lang);

    return res.json(response);
  } catch (err: any) {
    if (err instanceof UnsupportedLanguageException || err instanceof MissingTranslationException || err.name === 'EnglishLeakException') {
      console.error("[LOCALIZATION ERROR]", err.message);
      return res.status(400).json({ success: false, error: err.message });
    }
    console.error("Horoscope V2 Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});
