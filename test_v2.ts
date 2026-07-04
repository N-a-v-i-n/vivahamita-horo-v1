import { AstrologyV2Service } from "./src/services/astrologyV2Service.js";

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

const res = AstrologyV2Service.generateHoroscope(input as any);

console.log(JSON.stringify(res.data.reportData, null, 2));
