import puppeteer from 'puppeteer';
import { BrowserManager } from './browserManager';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { MatchingV2ResponseData } from '../types/matchingV2';
import { HoroscopeV2ResponseData, HoroscopeV2Chart } from '../types/horoscopeV2';
import { LocalizationEngine } from './LocalizationEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PdfMatchingService {
  public static async generateMatchingPdf(data: MatchingV2ResponseData, lang: string = 'en'): Promise<{ base64: string, fileName: string }> {
    const timestamp = Date.now();
    const fileName = `matching-${data.boyHoroscope.birthDetails.name.replace(/\s+/g, '')}-${data.girlHoroscope.birthDetails.name.replace(/\s+/g, '')}-${timestamp}.pdf`;
    
    const htmlContent = this.buildHtmlTemplate(data, lang);

    const browser = await BrowserManager.getBrowser();
    const page = await browser.newPage();
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
           <span>Generated On: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
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
    
    const bufferData = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
    const base64 = bufferData.toString('base64');
    
    return { base64, fileName };
  }

  private static buildHtmlTemplate(data: MatchingV2ResponseData, lang: string): string {
    const isTe = lang === 'te';
    
    const logoPath = path.join(__dirname, '..', '..', 'api', 'logo.png');
    let logoDataUri = "";
    if (fs.existsSync(logoPath)) {
      const logoBase64 = fs.readFileSync(logoPath).toString('base64');
      logoDataUri = `data:image/png;base64,${logoBase64}`;
    }

    const langCode = ["en", "te", "hi", "ta", "kn"].includes(lang) ? lang : "en";
    const loc = LocalizationEngine.getInstance();
    const L: Record<string, string> = {};
    const pdfKeys = ["reportTitle", "horoTitle", "vivahamitra", "name", "gender", "gotram", "dob", "tob", "pob", "latlon", "timezone", "ayanamsa", "nakshatraPada", "rasiLord", "lagnaLord", "tithi", "planetTable", "graha", "rasi", "long", "nakPada", "rasiChart", "navamsaChart", "bhavaChart", "dasaSesham", "dasaTitle", "dasaStart", "dasaEnd", "bhukti", "dasa", "groom", "bride", "overallScore", "matchPercentage", "executiveSummary", "groomHoroscopeDetails", "brideHoroscopeDetails", "ashtaKootaMatching", "koota", "maxPoints", "obtained", "description", "total", "dashavidhaPorutham", "porutham", "status", "meaning", "doshaAnalysis", "groomDoshas", "brideDoshas", "noDoshas", "manglikConflict", "conflictPresent", "yes", "no", "statusLabel", "cancelled", "active", "paapaSamyam", "groomPoints", "bridePoints", "totalPoints", "thematicCompatibility", "children", "health", "finance", "longevity", "finalConclusion", "recommendation", "strengths", "warnings", "mandatoryFailures", "expertNotes", "average", "vara"];
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
      "SECTION4_TITLE", "SECTION4_DESC", "CHART1_TITLE", "BALANCED_LABEL"
    ];
    howToKeys.forEach(k => { L[`HOWTO_${k}`] = loc.get(`HOW_TO_READ_MATCHING.${k}`, langCode); });
    
    const howToHoroKeys = [
      "TITLE", "SUBTITLE", "SECTION1_TITLE", "SECTION1_DESC",
      "SECTION2_TITLE", "SECTION2_DESC", "SECTION3_TITLE", "SECTION3_DESC",
      "SECTION4_TITLE", "SECTION4_DESC", "CHART1_TITLE", "CHART2_TITLE", "LAGNA_LABEL"
    ];
    howToHoroKeys.forEach(k => { L[`HOWTO_HORO_${k}`] = loc.get(`HOW_TO_READ.${k}`, langCode); });

    const rashiKeys = ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"];
    rashiKeys.forEach(k => { L[`RASHI_${k}`] = loc.get(`RASHI.${k}`, langCode); });
    
    const titleHtml = L.vivahamitra + " " + L.reportTitle;
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
              <td>${g("12")}</td><td>${g("1")}</td><td>${g("2")}</td><td>${g("3")}</td>
            </tr>
            <tr>
              <td>${g("11")}</td><td colspan="2" rowspan="2" class="chart-center">${title}</td><td>${g("4")}</td>
            </tr>
            <tr>
              <td>${g("10")}</td><td>${g("5")}</td>
            </tr>
            <tr>
              <td>${g("9")}</td><td>${g("8")}</td><td>${g("7")}</td><td>${g("6")}</td>
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

    const renderBalanceVisual = (title: string, leftLabel: string, rightLabel: string) => {
      return `
        <div style="width: 100%; max-width: 300px; margin: 15px auto; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; font-family: sans-serif;">
          <div style="background: #b4366f; color: white; text-align: center; font-weight: bold; padding: 4px 0; font-size: 11px;">${title}</div>
          <div style="display: table; width: 100%; background: #fffafb;">
            <div style="display: table-cell; width: 50%; padding: 10px; text-align: center; border-right: 1px solid #ddd;">
               <div style="font-weight: bold; color: #b4366f; font-size: 12px;">${leftLabel}</div>
               <div style="font-size: 20px; color: #555; margin-top: 5px;">35.5</div>
            </div>
            <div style="display: table-cell; width: 50%; padding: 10px; text-align: center;">
               <div style="font-weight: bold; color: #b4366f; font-size: 12px;">${rightLabel}</div>
               <div style="font-size: 20px; color: #555; margin-top: 5px;">36.0</div>
            </div>
          </div>
          <div style="background: #eafbea; color: #2e7d32; text-align: center; font-weight: bold; padding: 4px 0; font-size: 10px;">✓ ${L.HOWTO_BALANCED_LABEL || 'Balanced'}</div>
        </div>
      `;
    };

    const renderHoroscopePage = (horoscope: HoroscopeV2ResponseData, title: string) => {
      return `
        <div class="header" style="color:#b4366f">${title}</div>
        <table class="details-table">
          <tr><td class="label">${L.name}</td><td class="value">: ${loc.transliterate(horoscope.birthDetails.name, langCode)}</td></tr>
          <tr><td class="label">${L.gender}</td><td class="value">: ${horoscope.birthDetails.gender}</td></tr>
          <tr><td class="label">${L.gotram}</td><td class="value">: ${loc.transliterate(horoscope.birthDetails.gotram || 'N/A', langCode)}</td></tr>
          <tr><td class="label">${L.dob}</td><td class="value">: ${horoscope.birthDetails.dateOfBirth} ${horoscope.birthDetails.dayOfWeek}</td></tr>
          <tr><td class="label">${L.tob}</td><td class="value">: ${horoscope.birthDetails.timeOfBirth} ${horoscope.birthDetails.standardTime}</td></tr>
          <tr><td class="label">${L.pob}</td><td class="value">: ${loc.transliterate(horoscope.birthDetails.placeOfBirth, langCode)}</td></tr>
          <tr><td class="label">${L.latlon}</td><td class="value">: ${horoscope.birthDetails.longitude}, ${horoscope.birthDetails.latitude}</td></tr>
          <tr><td class="label">${L.timezone}</td><td class="value">: ${horoscope.birthDetails.timezone}</td></tr>
          <tr><td class="label">${L.ayanamsa}</td><td class="value">: ${horoscope.birthDetails.ayanamsa}</td></tr>
          <tr><td class="label">${L.nakshatraPada}</td><td class="value">: ${horoscope.panchanga.nakshatra} - ${horoscope.panchanga.pada}</td></tr>
          <tr><td class="label">${L.rasiLord}</td><td class="value">: ${horoscope.panchanga.rasi} - ${horoscope.panchanga.rasiLord}</td></tr>
          <tr><td class="label">${L.lagnaLord}</td><td class="value">: ${horoscope.panchanga.lagna} - ${horoscope.panchanga.lagnaLord}</td></tr>
          <tr><td class="label">${L.tithi}</td><td class="value">: ${horoscope.panchanga.tithi}</td></tr>
          <tr><td class="label">${L.vara}</td><td class="value">: ${horoscope.panchanga.vara}</td></tr>
        </table>
        
        <div class="section-title">${L.planetTable}</div>
        <table class="planet-table">
          <tr>
            <th>${L.graha}</th><th>${L.rasi}</th><th>${L.long}</th><th>${L.nakPada}</th>
          </tr>
          ${(() => {
            let rows = "";
            const pt = horoscope.planetaryTable;
            for (let i = 0; i < pt.length; i++) {
              const p = pt[i];
              rows += "<tr>" +
                "<td>" + (p ? p.planet : '') + "</td><td>" + (p ? p.sign : '') + "</td><td class='mono'>" + (p ? p.formattedLongitude : '') + "</td><td>" + (p ? p.formattedNakshatra : '') + "</td>" +
              "</tr>";
            }
            return rows;
          })()}
        </table>

        <div class="charts-row">
          ${renderChart(L.rasiChart, horoscope.rasiChart)}
          ${renderChart(L.navamsaChart, horoscope.navamsaChart)}
        </div>
        <div class="charts-row">
           ${renderChart(L.bhavaChart, horoscope.bhavaChart)}
        </div>

        <div class="dasha-balance-box">
          <div class="dasha-label">${L.dasaSesham}</div>
          <div class="dasha-value">${horoscope.dashaTable.janmakalaDasaSesham}</div>
        </div>
      `;
    };

    const renderDashaPage = (horoscope: HoroscopeV2ResponseData, title: string) => {
      return "<div class='header' style='color:#b4366f'>" + title + " - " + L.dasaTitle + "</div>" +
        "<table class='dasha-table'>" +
          "<tr>" +
            "<th>" + L.dasa + "</th><th>" + L.bhukti + "</th><th>" + L.dasaStart + "</th><th>" + L.dasaEnd + "</th>" +
            "<th>" + L.dasa + "</th><th>" + L.bhukti + "</th><th>" + L.dasaStart + "</th><th>" + L.dasaEnd + "</th>" +
          "</tr>" +
          (() => {
            let rows = "";
            const dashas = horoscope.dashaTable.vimshottari;
            for (let i = 0; i < Math.ceil(dashas.length / 2); i++) {
               const d1 = dashas[i * 2];
               const d2 = dashas[i * 2 + 1];
               let maxBhuktis = Math.max(d1 ? d1.bhuktis.length : 0, d2 ? d2.bhuktis.length : 0);
               rows += "<tbody class='mahadasha-group'>";
               for (let j = 0; j < maxBhuktis; j++) {
                  const b1 = d1 && d1.bhuktis[j] ? d1.bhuktis[j] : null;
                  const b2 = d2 && d2.bhuktis[j] ? d2.bhuktis[j] : null;
                  rows += "<tr>" +
                    "<td>" + (j === 0 && d1 ? d1.planet : '') + "</td><td>" + (b1 ? b1.planet : '') + "</td><td>" + (b1 ? b1.startDate : '') + "</td><td>" + (b1 ? b1.endDate : '') + "</td>" +
                    "<td>" + (j === 0 && d2 ? d2.planet : '') + "</td><td>" + (b2 ? b2.planet : '') + "</td><td>" + (b2 ? b2.startDate : '') + "</td><td>" + (b2 ? b2.endDate : '') + "</td>" +
                  "</tr>";
               }
               rows += "</tbody>";
            }
            return rows;
          })() +
        "</table>";
    };

    // Calculate Recommendation Badge
    let recBadgeColor = "#EF4444"; // Red
    if (data.summary.score >= 25 && data.recommendation.mandatoryFailures.length === 0) {
        recBadgeColor = "#10B981"; // Green
    } else if (data.summary.score >= 18) {
        recBadgeColor = "#F59E0B"; // Orange
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 12mm; }
          body { font-family: 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Devanagari', 'Noto Sans', sans-serif; font-size: 11pt; color: #000; line-height: 1.4; margin: 0; padding: 0; }
          body::after { content: ""; background-image: url('${logoDataUri}'); background-repeat: no-repeat; background-position: center center; background-size: 400px; opacity: 0.08; top: 0; left: 0; bottom: 0; right: 0; position: fixed; z-index: -1; }
          .header { font-size: 14pt; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; }
          .title-hero { text-align: center; margin-top: 50px; margin-bottom: 50px; }
          .title-hero h1 { font-size: 24pt; margin: 0; }
          .title-hero p { font-size: 14pt; color: #555; margin-top: 10px; }
          .couple-box { display: flex; justify-content: space-between; margin-bottom: 40px; padding: 20px; border: 2px solid #b4366f; background: #fffafb; border-radius: 8px; }
          .person { width: 45%; text-align: center; font-size: 14pt; font-weight: bold; color: #333; }
          .score-box { text-align: center; padding: 25px; border: 2px solid #2196f3; border-radius: 12px; margin-bottom: 30px; }
          .score-big { font-size: 28pt; font-weight: bold; color: #2196f3; }
          .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; color: #fff; font-weight: bold; font-size: 11pt; margin-top: 15px; }
          
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .details-table td { padding: 4px 5px; vertical-align: top; }
          .details-table .label { width: 40%; font-weight: 600; }
          .details-table .value { width: 60%; font-weight: 600; }
          
          .section-title { font-size: 12pt; font-weight: bold; margin: 35px 0 10px 0; text-transform: uppercase; }
          .planet-table, .data-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; page-break-inside: avoid; }
          .dasha-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .planet-table th, .dasha-table th, .data-table th { border-top: 2px solid #000; border-bottom: 2px solid #000; text-align: left; padding: 6px 4px; font-size: 10pt; }
          .planet-table td, .dasha-table td, .data-table td { padding: 6px 4px; font-size: 10pt; }
          .mono { font-family: monospace; font-size: 11pt; letter-spacing: 0.5px; }
          
          .charts-row { display: flex; justify-content: space-around; margin-bottom: 30px; }
          .chart-container { width: 45%; page-break-inside: avoid; }
          .chart-title { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 8px; }
          .chart-table { width: 100%; table-layout: fixed; border-collapse: collapse; border: 3px solid #000; }
          .chart-table td {
            border: 1px solid #000;
            width: 25%;
            height: 75px;
            text-align: center;
            vertical-align: middle;
            font-size: 8pt;
            line-height: 1.2;
            padding: 2px;
            word-break: break-word;
          }
          .chart-center { font-size: 11pt !important; font-weight: bold; color: #333; }
          
          .dasha-balance-box { border: 2px solid #000; padding: 15px; text-align: center; margin-bottom: 30px; page-break-inside: avoid; }
          .dasha-label { font-size: 11pt; color: #444; margin-bottom: 5px; }
          .dasha-value { font-size: 14pt; font-weight: bold; }
          
          .mahadasha-group { margin-bottom: 15px; page-break-inside: avoid; }
          .mahadasha-group tr:first-child td { border-top: 1px solid #000; padding-top: 6px; }
          .page-break { page-break-before: always; }

          .card { border: 2px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; }
          .card-title { font-size: 12pt; font-weight: bold; color: #b4366f; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
          .status-dot { height: 12px; width: 12px; border-radius: 50%; display: inline-block; margin-right: 8px; }
          .star-rating { color: #F59E0B; font-size: 14pt; letter-spacing: 2px; }
          .recommendation-box { border: 3px solid #10B981; border-radius: 12px; padding: 25px; margin-top: 20px; background-color: #f0fdf4; page-break-inside: avoid;}
          .rec-list { margin-left: 20px; margin-bottom: 15px; }
        </style>
      </head>
      <body>

        <!-- PAGE 1: Summary -->
        <div class="title-hero">
           <h1>${titleHtml}</h1>
           <p>${L.reportTitle} ID: V2M-${Date.now().toString().substring(5)}</p>
        </div>

        <div class="couple-box">
           <div class="person">
              <div>👨 ${L.groom}</div>
              <div style="color: #b4366f">${loc.transliterate(data.boyHoroscope.birthDetails.name, langCode)}</div>
           </div>
           <div style="font-size: 20pt; color: #aaa; margin-top: 10px;">&hearts;</div>
           <div class="person">
              <div>👩 ${L.bride}</div>
              <div style="color: #2196f3">${loc.transliterate(data.girlHoroscope.birthDetails.name, langCode)}</div>
           </div>
        </div>

        <div class="score-box">
           <div style="font-size: 14pt; font-weight: bold; margin-bottom: 10px;">${L.overallScore}</div>
           <div class="score-big">${data.summary.score} / ${data.summary.maxScore}</div>
           <div style="font-size: 12pt; margin-top: 5px; color: #666;">${L.matchPercentage}: ${data.summary.percentage.toFixed(0)}%</div>
           <div class="badge" style="background-color: ${recBadgeColor};">${data.summary.recommendation.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>

        <div class="card">
           <div class="card-title">${L.executiveSummary}</div>
           <div style="white-space: pre-wrap; line-height: 1.6; font-size: 11pt; padding: 5px;">${data.recommendation.finalRecommendation}</div>
        </div>
        
        <div class="page-break"></div>

        <!-- PAGE 2: Groom Horoscope -->
        ${renderHoroscopePage(data.boyHoroscope, L.groomHoroscopeDetails)}
        <div class="page-break"></div>

        <!-- PAGE 3: Groom Dasha -->
        ${renderDashaPage(data.boyHoroscope, L.groom)}
        <div class="page-break"></div>

        <!-- PAGE 4: Bride Horoscope -->
        ${renderHoroscopePage(data.girlHoroscope, L.brideHoroscopeDetails)}
        <div class="page-break"></div>

        <!-- PAGE 5: Bride Dasha -->
        ${renderDashaPage(data.girlHoroscope, L.bride)}
        <div class="page-break"></div>

        <!-- PAGE 6: Ashta Koota -->
        <div class="header" style="color:#b4366f">${L.ashtaKootaMatching}</div>
        <table class="data-table">
          <tr><th style="width: 15%;">${L.koota}</th><th style="width: 15%;">${L.maxPoints}</th><th style="width: 15%;">${L.obtained}</th><th>${L.description}</th></tr>
          ${data.ashtaKoota.map(k => "<tr>" +
              "<td style='font-weight:bold;'>" + (k.localizedKoota || k.koota) + "</td>" +
              "<td>" + k.maxPoints + "</td>" +
              "<td style='font-weight:bold; color:" + (k.obtainedPoints > 0 ? '#10B981' : '#EF4444') + "'>" + k.obtainedPoints + "</td>" +
              "<td>" + k.description + "</td>" +
            "</tr>"
          ).join('')}
          <tr style="border-top: 2px solid #000; font-weight: bold; font-size: 12pt;">
             <td>${L.total}</td>
             <td>36</td>
             <td>${data.summary.score}</td>
             <td></td>
          </tr>
        </table>
        <br>

        <!-- PAGE 7: South Indian Porutham -->
        <div class="header" style="color:#2196f3">${L.dashavidhaPorutham}</div>
        <table class="data-table">
          <tr><th style="width: 25%;">${L.porutham}</th><th style="width: 20%; white-space: nowrap;">${L.status}</th><th>${L.meaning}</th></tr>
          ${data.porutham.map(p => {
             let color = p.status === 'Uttama' ? '#10B981' : (p.status === 'Madhyama' ? '#F59E0B' : '#EF4444');
             return "<tr>" +
                "<td style='font-weight:bold;'>" + p.localizedName + "</td>" +
                "<td style='white-space: nowrap;'><span class='status-dot' style='background-color: " + color + "'></span>" + (p.localizedStatus || p.status) + "</td>" +
                "<td>" + p.description + "</td>" +
              "</tr>";
          }).join('')}
        </table>
        <div class="page-break"></div>

        <!-- PAGE 8: Dosha Matching -->
        <div class="header" style="color:#b4366f">${L.doshaAnalysis}</div>
        
        <div class="card">
           <div class="card-title">${L.groomDoshas}</div>
           <ul>${data.doshaMatching.boyDoshas.length > 0 ? data.doshaMatching.boyDoshas.map(d => `<li>${d}</li>`).join('') : `<li>${L.noDoshas}</li>`}</ul>
        </div>
        
        <div class="card">
           <div class="card-title">${L.brideDoshas}</div>
           <ul>${data.doshaMatching.girlDoshas.length > 0 ? data.doshaMatching.girlDoshas.map(d => `<li>${d}</li>`).join('') : `<li>${L.noDoshas}</li>`}</ul>
        </div>

        <div class="card">
           <div class="card-title">${L.manglikConflict}</div>
           <p style="font-weight:bold; color: ${data.doshaMatching.hasManglikDoshaConflict ? '#EF4444' : '#10B981'};">
              ${L.conflictPresent}: ${data.doshaMatching.hasManglikDoshaConflict ? L.yes : L.no}
           </p>
           <p>${L.statusLabel}: ${data.doshaMatching.isCancelled ? L.cancelled : L.active}</p>
           <p>${data.doshaMatching.cancellationDetails || ''}</p>
        </div>

        <div class="card">
           <div class="card-title">${L.paapaSamyam}</div>
           <p><strong>${L.groomPoints}:</strong> ${data.paapaSamyam.boyPoints}</p>
           <p><strong>${L.bridePoints}:</strong> ${data.paapaSamyam.girlPoints}</p>
           <p><strong>${L.totalPoints}:</strong> ${data.paapaSamyam.totalPoints}</p>
           <p>${data.paapaSamyam.description}</p>
        </div>

        <div class="page-break"></div>

        <!-- PAGE 9: Thematic Scores -->
        <div class="header" style="color:#2196f3">${L.thematicCompatibility}</div>

        ${[
          { title: L.children, score: data.scores.children },
          { title: L.health, score: data.scores.health },
          { title: L.finance, score: data.scores.finance },
          { title: L.longevity, score: data.scores.longevity }
        ].map(cat => {
            const numStars = cat.score?.confidence ? Math.round(cat.score.confidence * 5) : 3;
            const stars = "★".repeat(numStars) + "☆".repeat(5 - numStars);
            return "<div class='card'>" +
                 "<div class='card-title'>" + cat.title + "</div>" +
                 "<div class='star-rating'>" + stars + "</div>" +
                 "<p style='font-weight:bold;'>" + (cat.score?.rating || L.average) + "</p>" +
                 "<p>" + (cat.score?.description || '') + "</p>" +
              "</div>";
        }).join('')}

        <div class="page-break"></div>

        <!-- PAGE 10: Final Recommendation -->
        <div class="header" style="color:#b4366f">${L.finalConclusion}</div>
        
        <div class="recommendation-box" style="border-color: ${recBadgeColor}; background-color: ${recBadgeColor === '#10B981' ? '#f0fdf4' : (recBadgeColor === '#F59E0B' ? '#fffbeb' : '#fef2f2')};">
           <h2 style="margin-top:0; color: ${recBadgeColor};">${L.recommendation}: ${data.summary.recommendation}</h2>
           
           ${data.recommendation.strengths.length > 0 ? `
             <h3 style="color:#10B981">${L.strengths}</h3>
             <ul class="rec-list">${data.recommendation.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
           ` : ''}

           ${data.recommendation.warnings.length > 0 ? `
             <h3 style="color:#F59E0B">${L.warnings}</h3>
             <ul class="rec-list">${data.recommendation.warnings.map(s => `<li>${s}</li>`).join('')}</ul>
           ` : ''}

           ${data.recommendation.mandatoryFailures.length > 0 ? `
             <h3 style="color:#EF4444">${L.mandatoryFailures}</h3>
             <ul class="rec-list">${data.recommendation.mandatoryFailures.map(s => `<li>${s}</li>`).join('')}</ul>
           ` : ''}

           ${data.recommendation.expertReview.length > 0 ? `
             <h3 style="color:#8B5CF6">${L.expertNotes}</h3>
             <ul class="rec-list">${data.recommendation.expertReview.map(s => `<li>${s}</li>`).join('')}</ul>
           ` : ''}

           <hr style="border: 1px solid #ccc; margin: 20px 0;">
           <p style="font-style:italic; text-align:justify;">${data.recommendation.finalRecommendation}</p>
        </div>

        <div class="page-break"></div>
        <div class="header" style="color:#b4366f">${L.HOWTO_HORO_TITLE}</div>
        <p style="font-size: 13px; color: #555; text-align: center; margin-bottom: 20px;">${L.HOWTO_HORO_SUBTITLE}</p>

        <div style="margin-top: 20px;">
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_HORO_SECTION1_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_HORO_SECTION1_DESC}</div>
            ${renderVisualChart(L.HOWTO_HORO_CHART1_TITLE, [
              L.RASHI_ARIES, L.RASHI_TAURUS, L.RASHI_GEMINI, L.RASHI_CANCER,
              L.RASHI_LEO, L.RASHI_VIRGO, L.RASHI_LIBRA, L.RASHI_SCORPIO,
              L.RASHI_SAGITTARIUS, L.RASHI_CAPRICORN, L.RASHI_AQUARIUS, L.RASHI_PISCES
            ])}
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_HORO_SECTION2_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_HORO_SECTION2_DESC}</div>
            ${renderVisualChart(L.HOWTO_HORO_CHART2_TITLE, [
              `1<br><small>(${L.HOWTO_HORO_LAGNA_LABEL})</small>`, "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
            ])}
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_HORO_SECTION3_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_HORO_SECTION3_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_HORO_SECTION4_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_HORO_SECTION4_DESC}</div>
          </div>
        </div>

        <div class="page-break"></div>
        <div class="header" style="color:#b4366f">${L.HOWTO_TITLE}</div>
        <p style="font-size: 13px; color: #555; text-align: center; margin-bottom: 20px;">${L.HOWTO_SUBTITLE}</p>

        <div style="margin-top: 20px;">
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION1_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION1_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION2_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION2_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION3_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION3_DESC}</div>
          </div>
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold; color: #b4366f; font-size: 14px; margin-bottom: 4px;">${L.HOWTO_SECTION4_TITLE}</div>
            <div style="font-size: 13px; color: #333; line-height: 1.5;">${L.HOWTO_SECTION4_DESC}</div>
            ${renderBalanceVisual(L.HOWTO_CHART1_TITLE, L.groom || 'Groom', L.bride || 'Bride')}
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
