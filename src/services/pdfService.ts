import puppeteer from 'puppeteer';
import { BrowserManager } from './browserManager';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { HoroscopeV2ResponseData } from '../types/horoscopeV2';
import { LocalizationEngine } from './LocalizationEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PdfService {
  /**
   * Generates a PDF report from the canonical horoscope data and returns a base64 string.
   */
  public static async generateHoroscopePdf(data: HoroscopeV2ResponseData, lang: string = 'en'): Promise<{ base64: string, fileName: string }> {
    const timestamp = Date.now();
    const fileName = `horoscope-${data.birthDetails.name.replace(/\s+/g, '_').toLowerCase()}-${timestamp}.pdf`;
    
    const htmlContent = this.buildHtmlTemplate(data, lang);

    const browser = await BrowserManager.getBrowser();
    const page = await browser.newPage();
    
    // Set content and wait for web fonts to load
    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-family: sans-serif; color: #555; padding: 0 15mm; padding-bottom: 5px;">
           <span style="font-weight: bold; font-size: 12px;">
              www.<span style="color: #b4366f;">vivaha</span><span style="color: #2196f3;">mitra</span>.in
           </span>
           <span>Generated On: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
        </div>
      `,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '25mm',
        left: '15mm'
      }
    });

    await page.close();
    
    // We cast Buffer to string to satisfy older type definitions if any, though puppeteer returns Uint8Array in newer versions
    const bufferData = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
    const base64 = bufferData.toString('base64');
    
    return { base64, fileName };
  }

  private static buildHtmlTemplate(data: HoroscopeV2ResponseData, lang: string): string {
    // We construct the HTML to visually match the reference layout.
    // For this implementation, we use English labels since the JSON is language-neutral,
    // but we embed Unicode fonts to support multi-lang rendering if requested.

    const isTe = lang === 'te';
    
    // Base64 encode logo for watermark
    const logoPath = path.join(__dirname, '..', '..', 'api', 'logo.png');
    let logoDataUri = "";
    if (fs.existsSync(logoPath)) {
      const logoBase64 = fs.readFileSync(logoPath).toString('base64');
      logoDataUri = `data:image/png;base64,${logoBase64}`;
    }

    const langCode = ["en", "te", "hi", "ta", "kn"].includes(lang) ? lang : "en";
    const loc = LocalizationEngine.getInstance();
    const L: Record<string, string> = {};
    const pdfKeys = ["reportTitle", "horoTitle", "vivahamitra", "name", "gender", "gotram", "dob", "tob", "pob", "latlon", "timezone", "ayanamsa", "nakshatraPada", "rasiLord", "lagnaLord", "tithi", "planetTable", "graha", "rasi", "long", "nakPada", "rasiChart", "navamsaChart", "bhavaChart", "dasaSesham", "dasaTitle", "dasaStart", "dasaEnd", "bhukti", "dasa", "groom", "bride", "overallScore", "matchPercentage", "executiveSummary", "groomHoroscopeDetails", "brideHoroscopeDetails", "ashtaKootaMatching", "koota", "maxPoints", "obtained", "description", "total", "dashavidhaPorutham", "porutham", "status", "meaning", "doshaAnalysis", "groomDoshas", "brideDoshas", "noDoshas", "manglikConflict", "conflictPresent", "yes", "no", "statusLabel", "cancelled", "active", "paapaSamyam", "groomPoints", "bridePoints", "totalPoints", "thematicCompatibility", "children", "health", "finance", "longevity", "finalConclusion", "recommendation", "strengths", "warnings", "mandatoryFailures", "expertNotes", "average", "sunrise", "sunset", "yoga", "karana", "vara"];
    pdfKeys.forEach(k => { L[k] = loc.get(`PDF.${k.toUpperCase()}`, langCode); });
    
    const glKeys = [
      "GLOSSARY_TITLE", "GLOSSARY_DESC", "TITHI_TITLE", "TITHI_DESC", 
      "VARA_TITLE", "VARA_DESC", "NAKSHATRA_TITLE", "NAKSHATRA_DESC", 
      "YOGA_TITLE", "YOGA_DESC", "KARANA_TITLE", "KARANA_DESC", 
      "LAGNA_TITLE", "LAGNA_DESC", "RASI_TITLE", "RASI_DESC"
    ];
    glKeys.forEach(k => { L[k] = loc.get(`GLOSSARY.${k}`, langCode); });
    
    const howToKeys = [
      "TITLE", "SUBTITLE", "SECTION1_TITLE", "SECTION1_DESC",
      "SECTION2_TITLE", "SECTION2_DESC", "SECTION3_TITLE", "SECTION3_DESC",
      "SECTION4_TITLE", "SECTION4_DESC", "CHART1_TITLE", "CHART2_TITLE", "LAGNA_LABEL"
    ];
    howToKeys.forEach(k => { L[`HOWTO_${k}`] = loc.get(`HOW_TO_READ.${k}`, langCode); });
    
    const rashiKeys = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"];
    rashiKeys.forEach(k => { L[`RASHI_${k}`] = loc.get(`RASHI.${k}`, langCode); });

    const titleHtml = L.vivahamitra + " " + L.horoTitle;

    // Helper to render South Indian Chart
    const renderChart = (title: string, chartData: HoroscopeV2Chart) => {
      const g = (houseStr: string) => {
        const p = chartData[houseStr];
        return p && p.length > 0 ? p.join("<br>") : "";
      };
      
      return `
        <div class="chart-container">
          <div class="chart-title">${title}</div>
          <table class="chart-table">
            <tr>
              <td>${g("12")}</td>
              <td>${g("1")}</td>
              <td>${g("2")}</td>
              <td>${g("3")}</td>
            </tr>
            <tr>
              <td>${g("11")}</td>
              <td colspan="2" rowspan="2" class="chart-center">${title}</td>
              <td>${g("4")}</td>
            </tr>
            <tr>
              <td>${g("10")}</td>
              <td>${g("5")}</td>
            </tr>
            <tr>
              <td>${g("9")}</td>
              <td>${g("8")}</td>
              <td>${g("7")}</td>
              <td>${g("6")}</td>
            </tr>
          </table>
        </div>
      `;
    };

    const renderVisualChart = (title: string, cells: string[]) => {
      return `
        <div class="chart-container" style="width: 100%; max-width: 250px; margin: 15px auto;">
          <div class="chart-title" style="text-align:center; font-weight:bold; font-size:12px; margin-bottom:5px;">${title}</div>
          <table class="chart-table" style="width: 100%; border-collapse: collapse; text-align: center; font-size: 10px; table-layout: fixed;">
            <tr>
              <td style="border: 1px solid #b4366f; height: 60px; width: 25%;">${cells[11]}</td>
              <td style="border: 1px solid #b4366f; height: 60px; width: 25%;">${cells[0]}</td>
              <td style="border: 1px solid #b4366f; height: 60px; width: 25%;">${cells[1]}</td>
              <td style="border: 1px solid #b4366f; height: 60px; width: 25%;">${cells[2]}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[10]}</td>
              <td colspan="2" rowspan="2" class="chart-center" style="border: 1px solid #b4366f; background: #fffafb;">
                <div style="color:#b4366f; opacity:0.15; font-size:40px;">ॐ</div>
              </td>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[3]}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[9]}</td>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[4]}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[8]}</td>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[7]}</td>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[6]}</td>
              <td style="border: 1px solid #b4366f; height: 60px;">${cells[5]}</td>
            </tr>
          </table>
        </div>
      `;
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 12mm;
          }
          body {
            font-family: 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Devanagari', 'Noto Sans', sans-serif;
            font-size: 11pt;
            color: #000;
            line-height: 1.4;
            margin: 0;
            padding: 0;
          }
          body::after {
            content: "";
            background-image: url('${logoDataUri}');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 400px;
            opacity: 0.08;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: fixed;
            z-index: -1;
          }
          .header {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .details-table td {
            padding: 4px 5px;
            vertical-align: top;
          }
          .details-table .label {
            width: 40%;
            font-weight: 600;
          }
          .details-table .value {
            width: 60%;
            font-weight: 600;
          }
          .section-title {
            font-size: 12pt;
            font-weight: bold;
            margin: 35px 0 10px 0;
            text-transform: uppercase;
            padding-bottom: 3px;
          }
          .planet-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .planet-table th {
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            text-align: left;
            padding: 6px 4px;
            font-size: 10pt;
          }
          .planet-table td {
            padding: 6px 4px;
            font-size: 10pt;
          }

          .mono {
            font-family: monospace;
            font-size: 11pt;
            letter-spacing: 0.5px;
          }
          .charts-row {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
          }
          .chart-container {
            width: 45%;
            page-break-inside: avoid;
          }
          .chart-title {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .chart-table {
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
            border: 3px solid #000;
          }
          .chart-table td {
            border: 1px solid #000;
            width: 25%;
            height: 75px;
            text-align: center;
            vertical-align: middle;
            font-size: 10pt;
            padding: 2px;
            word-wrap: break-word;
            overflow: hidden;
          }
          .chart-center {
            font-size: 11pt !important;
            font-weight: bold;
            color: #333;
          }
          .dasha-balance-box {
            border: 2px solid #000;
            padding: 15px;
            text-align: center;
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .dasha-label {
            font-size: 11pt;
            color: #444;
            margin-bottom: 5px;
          }
          .dasha-value {
            font-size: 14pt;
            font-weight: bold;
          }
          .dasha-table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
          }
          .dasha-table th, .dasha-table td {
            padding: 4px;
            font-size: 9pt;
            vertical-align: top;
          }
          .dasha-table th {
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            text-align: left;
          }
          .mahadasha-group {
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          .mahadasha-group tr:first-child td {
             border-top: 1px solid #000;
             padding-top: 6px;
          }
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>

        <div class="header">${titleHtml}</div>

        <table class="details-table">
          <tr><td class="label">${L.name}</td><td class="value">: ${loc.transliterate(data.birthDetails.name, langCode)}</td></tr>
          <tr><td class="label">${L.gender}</td><td class="value">: ${data.birthDetails.gender}</td></tr>
          <tr><td class="label">${L.gotram}</td><td class="value">: ${loc.transliterate(data.birthDetails.gotram || 'N/A', langCode)}</td></tr>
          <tr><td class="label">${L.dob}</td><td class="value">: ${data.birthDetails.dateOfBirth} ${data.birthDetails.dayOfWeek}</td></tr>
          <tr><td class="label">${L.tob}</td><td class="value">: ${data.birthDetails.timeOfBirth} ${data.birthDetails.standardTime}</td></tr>
          <tr><td class="label">${L.pob}</td><td class="value">: ${loc.transliterate(data.birthDetails.placeOfBirth, langCode)}</td></tr>
          <tr><td class="label">${L.latlon}</td><td class="value">: ${data.birthDetails.longitude}, ${data.birthDetails.latitude}</td></tr>
          <tr><td class="label">${L.timezone}</td><td class="value">: ${data.birthDetails.timezone}</td></tr>
          <tr><td class="label">${L.ayanamsa}</td><td class="value">: ${data.birthDetails.ayanamsa}</td></tr>
          <tr><td class="label">${L.sunrise}</td><td class="value">: ${data.birthDetails.sunrise}</td></tr>
          <tr><td class="label">${L.sunset}</td><td class="value">: ${data.birthDetails.sunset}</td></tr>
          <tr><td class="label">${L.nakshatraPada}</td><td class="value">: ${data.panchanga.nakshatra} - ${data.panchanga.pada}</td></tr>
          <tr><td class="label">${L.rasiLord}</td><td class="value">: ${data.panchanga.rasi} - ${data.panchanga.rasiLord}</td></tr>
          <tr><td class="label">${L.lagnaLord}</td><td class="value">: ${data.panchanga.lagna} - ${data.panchanga.lagnaLord}</td></tr>
          <tr><td class="label">${L.tithi}</td><td class="value">: ${data.panchanga.tithi}</td></tr>
          <tr><td class="label">${L.yoga}</td><td class="value">: ${data.panchanga.yoga}</td></tr>
          <tr><td class="label">${L.karana}</td><td class="value">: ${data.panchanga.karana}</td></tr>
          <tr><td class="label">${L.vara}</td><td class="value">: ${data.panchanga.vara}</td></tr>
        </table>

        <div class="section-title">${L.planetTable}</div>
        <table class="planet-table">
          <tr>
            <th>${L.graha}</th>
            <th>${L.rasi}</th>
            <th>${L.long}</th>
            <th>${L.nakPada}</th>
          </tr>
          ${(() => {
            let rows = "";
            const pt = data.planetaryTable;
            for (let i = 0; i < pt.length; i++) {
              const p1 = pt[i];
              rows += `
                <tr>
                  <td>${p1 ? p1.planet : ''}</td>
                  <td>${p1 ? p1.sign : ''}</td>
                  <td class="mono">${p1 ? p1.formattedLongitude : ''}</td>
                  <td>${p1 ? p1.formattedNakshatra : ''}</td>
                </tr>
              `;
            }
            return rows;
          })()}
        </table>

        <div class="page-break"></div>

        <div class="charts-row">
          ${renderChart(L.rasiChart, data.rasiChart)}
          ${renderChart(L.navamsaChart, data.navamsaChart)}
        </div>

        <div class="charts-row">
           ${renderChart(L.bhavaChart, data.bhavaChart)}
        </div>

        <div class="dasha-balance-box">
          <div class="dasha-label">${L.dasaSesham}</div>
          <div class="dasha-value">${data.dashaTable.janmakalaDasaSesham}</div>
        </div>

        <div class="page-break"></div>

        <div class="header">${L.dasaTitle}</div>
        
        <table class="dasha-table">
          <tr>
            <th>${L.dasa}</th>
            <th>${L.bhukti}</th>
            <th>${L.dasaStart}</th>
            <th>${L.dasaEnd}</th>
            <th>${L.dasa}</th>
            <th>${L.bhukti}</th>
            <th>${L.dasaStart}</th>
            <th>${L.dasaEnd}</th>
          </tr>
          ${(() => {
            let rows = "";
            const dashas = data.dashaTable.vimshottari;
            for (let i = 0; i < Math.ceil(dashas.length / 2); i++) {
               const d1 = dashas[i * 2];
               const d2 = dashas[i * 2 + 1];
               
               let maxBhuktis = Math.max(d1 ? d1.bhuktis.length : 0, d2 ? d2.bhuktis.length : 0);
               rows += `<tbody class="mahadasha-group">`;
               for (let j = 0; j < maxBhuktis; j++) {
                  const b1 = d1 && d1.bhuktis[j] ? d1.bhuktis[j] : null;
                  const b2 = d2 && d2.bhuktis[j] ? d2.bhuktis[j] : null;
                  
                  rows += `
                    <tr>
                      <td>${j === 0 && d1 ? d1.planet : ''}</td>
                      <td>${b1 ? b1.planet : ''}</td>
                      <td>${b1 ? b1.startDate : ''}</td>
                      <td>${b1 ? b1.endDate : ''}</td>
                      
                      <td>${j === 0 && d2 ? d2.planet : ''}</td>
                      <td>${b2 ? b2.planet : ''}</td>
                      <td>${b2 ? b2.startDate : ''}</td>
                      <td>${b2 ? b2.endDate : ''}</td>
                    </tr>
                  `;
               }
               rows += `</tbody>`;
            }
            return rows;
          })()}
        </table>

        <div class="page-break"></div>
        <div class="header" style="color:#b4366f">${L.HOWTO_TITLE}</div>
        <p style="font-size: 13px; color: #555; text-align: center; margin-bottom: 20px;">${L.HOWTO_SUBTITLE}</p>

        <div style="margin-top: 20px;">
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION1_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION1_DESC}</div>
            ${renderVisualChart(L.HOWTO_CHART1_TITLE, [
              L.RASHI_ARIES, L.RASHI_TAURUS, L.RASHI_GEMINI, L.RASHI_CANCER,
              L.RASHI_LEO, L.RASHI_VIRGO, L.RASHI_LIBRA, L.RASHI_SCORPIO,
              L.RASHI_SAGITTARIUS, L.RASHI_CAPRICORN, L.RASHI_AQUARIUS, L.RASHI_PISCES
            ])}
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION2_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION2_DESC}</div>
            ${renderVisualChart(L.HOWTO_CHART2_TITLE, [
              `1<br><small>(${L.HOWTO_LAGNA_LABEL})</small>`, "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
            ])}
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION3_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION3_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION4_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION4_DESC}</div>
          </div>
        </div>

        <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
          <div class="section-title" style="margin-top: 0;">${L.GLOSSARY_TITLE}</div>
          <p style="font-size: 12px; color: #555; margin-bottom: 15px; text-align: center;">${L.GLOSSARY_DESC}</p>
          
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.TITHI_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.TITHI_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.VARA_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.VARA_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.NAKSHATRA_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.NAKSHATRA_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.YOGA_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.YOGA_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.KARANA_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.KARANA_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.LAGNA_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.LAGNA_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.RASI_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.RASI_DESC}</div>
          </div>
        </div>

      </body>
      </html>
    `;
  }
}
