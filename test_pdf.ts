import { AstrologyV2Service } from "./src/services/astrologyV2Service.js";
import { PdfService } from "./src/services/pdfService.js";

const input = {
  name: "NAVEEN KUMAR",
  gender: "Male",
  year: 1997,
  month: 2,
  day: 25,
  hour: 21,
  minute: 5,
  latitude: 17.3833,
  longitude: 78.4667,
  timezone: 5.5,
  placeOfBirth: "Hyderabad"
};

async function run() {
  console.log("Generating data...");
  const res = AstrologyV2Service.generateHoroscope(input as any);
  
  console.log("Rendering PDF...");
  const pdfData = await PdfService.generateHoroscopePdf(res.data, 'te');
  console.log("Generated PDF:", pdfData.url);
}

run().catch(console.error);
