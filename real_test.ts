import { AstrologyService } from "./src/services/astrologyService";
import { collapseLocalization } from "./src/routes/astrology";
import * as fs from "fs";

const input = {
  year: 1990,
  month: 11,
  day: 15,
  hour: 8,
  minute: 30,
  latitude: 13.0827, // Chennai
  longitude: 80.2707,
  timezone: 5.5,
  ayanamsa: "Lahiri" as any,
  lang: "te" as any
};

const result = AstrologyService.generateHoroscope(input);
const localizedResult = collapseLocalization(result, "te");
console.log(JSON.stringify(localizedResult, null, 2));
fs.writeFileSync("real_response.json", JSON.stringify(localizedResult, null, 2));
console.log("\n✅ Response written to real_response.json");
