export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

export interface ApiEndpointDoc {
  path: string;
  name: string;
  method: "POST" | "GET";
  description: string;
  params: ApiParam[];
  exampleRequest: any;
  exampleResponse: any;
  curlSample: string;
  jsSample: string;
  pythonSample: string;
}

export const API_DOCS_DATA: ApiEndpointDoc[] = [
  {
    path: "/api/panchang",
    name: "Sidereal Panchang",
    method: "POST",
    description: "Calculates the core five elements (Pancha-Angas) of Vedic time: Tithi, Nakshatra, Yoga, Karana, and Vara, with exact local Rahu Kalam, Yamagandam, Gulikai periods, and auspicious Brahma Muhurtas.",
    params: [
      { name: "year", type: "number", required: true, desc: "Saka/Gregorian year (e.g. 1995)" },
      { name: "month", type: "number", required: true, desc: "Month index, 1-12 (e.g. 6)" },
      { name: "day", type: "number", required: true, desc: "Day of current month, 1-31 (e.g. 15)" },
      { name: "hour", type: "number", required: true, desc: "Hour of day, 24 hr decimal format, 0-23 (e.g. 8)" },
      { name: "minute", type: "number", required: true, desc: "Minute of day, 0-59 (e.g. 30)" },
      { name: "latitude", type: "number", required: true, desc: "Geographical latitude coordinates, Northern hemisphere positive, decimal degrees (e.g. 17.385)" },
      { name: "longitude", type: "number", required: true, desc: "Geographical longitude coordinates, Eastern hemisphere positive, decimal degrees (e.g. 78.486)" },
      { name: "timezone", type: "number", required: true, desc: "Local UTC decimal offset in hours (e.g. 5.5 for India IST, -8.0 for Seattle PST)" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical calculation divisor model: Lahiri, Raman, Krishnamurti, Fagan-Bradley, Yukteswar, or Tropical. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output string translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      lang: "en",
      data: {
        sunrise: "05:43",
        sunset: "18:41",
        tithi: { index: 17, name: "Dwitiya", localizedName: "Dvitiya (Krsna Paksha)", pakshaLocalized: "Krishna Paksha" },
        nakshatra: { index: 19, name: "Purva Ashadha", localizedName: "Purvashadha" },
        yoga: { index: 15, name: "Subha", localizedName: "Shubha" },
        karana: { index: 3, name: "Taitila", localizedName: "Taitila" },
        rahuKalam: { start: "14:02", end: "15:38" },
        yamagandam: { start: "08:52", end: "10:28" },
        gulikai: { start: "12:04", end: "13:40" },
        brahmaMuhurta: { start: "04:07", end: "04:55" }
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/panchang \\
  -H "Content-Type: application/json" \\
  -d '{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `const response = await fetch('/api/panchang?lang=en', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    year: 1995,
    month: 6,
    day: 15,
    hour: 8,
    minute: 30,
    latitude: 17.385,
    longitude: 78.486,
    timezone: 5.5,
    ayanamsa: "Lahiri"
  })
});
const result = await response.json();
console.log(result.data);`,
    pythonSample: `import requests

url = "https://api.vivahamitra.in/api/panchang"
payload = {
    "year": 1995,
    "month": 6,
    "day": 15,
    "hour": 8,
    "minute": 30,
    "latitude": 17.385,
    "longitude": 78.486,
    "timezone": 5.5,
    "ayanamsa": "Lahiri"
}

response = requests.post(url, json=payload)
data = response.json()
print(data["data"])`
  },
  {
    path: "/api/chart",
    name: "Sidereal Birth Chart (D1/D9)",
    method: "POST",
    description: "Calculates the high-precision longitudes of the Ascendant (Lagna) and the nine core Vedic grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) inside the sidereal canvas. Computes sign indices, exact degrees, Nakshatra padas, house placements, and planetary digbala / dignity statuses for both D1 Rasi and D9 Navamsa divisional charts.",
    params: [
      { name: "year", type: "number", required: true, desc: "Natal birth year (e.g. 1995)" },
      { name: "month", type: "number", required: true, desc: "Natal month index, 1-12 (e.g. 6)" },
      { name: "day", type: "number", required: true, desc: "Natal day index, 1-31 (e.g. 15)" },
      { name: "hour", type: "number", required: true, desc: "Natal hour of birth, 0-23 decimal (e.g. 8)" },
      { name: "minute", type: "number", required: true, desc: "Natal minute of birth, 0-59 (e.g. 30)" },
      { name: "latitude", type: "number", required: true, desc: "Birth geography latitude (e.g. 17.385)" },
      { name: "longitude", type: "number", required: true, desc: "Birth geography longitude (e.g. 78.486)" },
      { name: "timezone", type: "number", required: true, desc: "UTC decimal offset (e.g. 5.5)" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical model: Lahiri, Raman, etc. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 1955,
      month: 10,
      day: 28,
      hour: 21,
      minute: 18,
      latitude: 47.6062,
      longitude: -122.3321,
      timezone: -8,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      lang: "en",
      data: {
        lagna: {
          longitude: 84.52,
          rasiIndex: 2,
          rasiName: "Mithuna (Gemini)",
          rasiLocalizedName: "Mithuna"
        },
        planets: [
          { name: "Sun", longitude: 191.84, rasiIndex: 6, rasiName: "Tula (Libra)", dignity: "Debilitated", house: 5 },
          { name: "Moon", longitude: 351.45, rasiIndex: 11, rasiName: "Meena (Pisces)", dignity: "Friendly", house: 10 }
        ],
        divisionalCharts: [
          {
            code: "D1",
            name: "Rasi Chart",
            points: [
              { planet: "Sun", longitude: 191.84, signIndex: 6, signName: "Tula (Libra)", house: 5 }
            ]
          }
        ]
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/chart \\
  -H "Content-Type: application/json" \\
  -d '{"year":1955,"month":10,"day":28,"hour":21,"minute":18,"latitude":47.6062,"longitude":-122.3321,"timezone":-8}'`,
    jsSample: `const resCount = await fetch('/api/chart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 1955, month: 10, day: 28, hour: 21, minute: 18, latitude: 47.606, longitude: -122.332, timezone: -8 })
});
const responseBody = await resCount.json();`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/chart", json={
    "year": 1955, "month": 10, "day": 28, "hour": 21, "minute": 18, 
    "latitude": 47.6062, "longitude": -122.3321, "timezone": -8
})
print(res.json()["data"])`
  },
  {
    path: "/api/charts/divisional",
    name: "Divisional Varga Charts (D2–D60)",
    method: "POST",
    description: "Computes fine sidereal divisional points corresponding to high-harmonic Vargas: Hora (D2), Drekkana (D3), Saptamsa (D7), Navamsa (D9), Dasamsa (D10), Dwadasamsa (D12), Trimsamsa (D30), and Shashtyamsa (D60) from longitude modulo projections.",
    params: [
      { name: "year", type: "number", required: true, desc: "Natal birth year" },
      { name: "month", type: "number", required: true, desc: "Natal month" },
      { name: "day", type: "number", required: true, desc: "Natal day" },
      { name: "hour", type: "number", required: true, desc: "Natal hour" },
      { name: "minute", type: "number", required: true, desc: "Natal minute" },
      { name: "latitude", type: "number", required: true, desc: "Birth latitude" },
      { name: "longitude", type: "number", required: true, desc: "Birth longitude" },
      { name: "timezone", type: "number", required: true, desc: "UTC decimal timezone" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical model: Lahiri, Raman, etc. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: {
        code: "D10",
        name: "Dasamsa Chart",
        description: "Vedic divisional chart governing professional success, corporate authority, and lifetime career triumphs.",
        points: [
          { planet: "Sun", longitude: 54.32, signIndex: 1, signLocalizedName: "Vrishabha", house: 1 }
        ]
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/charts/divisional \\
  -H "Content-Type: application/json" \\
  -d '{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `// Fetch specialized D10 Dasamsa harmonics
const res = await fetch('/api/charts/divisional', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5, varga: "D10" })
});`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/charts/divisional", json={
    "year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30,
    "latitude": 17.385, "longitude": 78.486, "timezone": 5.5, "varga": "D10"
})`
  },
  {
    path: "/api/dasha",
    name: "Life Vimshottari Dashas",
    method: "POST",
    description: "Generates the complete 120-year astronomical Vimshottari Mahadasha progression cycle based on the birth Moon's fractional stellar longitude, specifying exact beginning and ending timestamps of planetary periods.",
    params: [
      { name: "year", type: "number", required: true, desc: "Birth year" },
      { name: "month", type: "number", required: true, desc: "Birth month" },
      { name: "day", type: "number", required: true, desc: "Birth day" },
      { name: "hour", type: "number", required: true, desc: "Birth hour" },
      { name: "minute", type: "number", required: true, desc: "Birth minute" },
      { name: "latitude", type: "number", required: true, desc: "Birth latitude" },
      { name: "longitude", type: "number", required: true, desc: "Birth longitude" },
      { name: "timezone", type: "number", required: true, desc: "UTC offset" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical model: Lahiri, Raman, etc. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: {
        localizedMahadasha: "Venus",
        timeRemainingYears: 14.52,
        timeline: [
          { lord: "Venus", localizedLord: "Sukra (Venus)", durationYears: 20, startTime: "1980-01-01", endTime: "2000-01-01" },
          { lord: "Sun", localizedLord: "Ravi (Sun)", durationYears: 6, startTime: "2000-01-01", endTime: "2006-01-01" }
        ]
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/dasha \\
  -H "Content-Type: application/json" \\
  -d '{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `const dashaResult = await fetch('/api/dasha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 })
}).then(r => r.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/dasha", json={
    "year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30,
    "latitude": 17.385, "longitude": 78.486, "timezone": 5.5
})`
  },
  {
    path: "/api/dosha",
    name: "Astrological Dosha Audit",
    method: "POST",
    description: "Evaluates severe natal afflictions and planetary imbalances based on house calculations: specifically Kuja Dosha (Mars afflicted houses), Kala Sarpa Dosha (nodes flanking planets), and Guru Chandal Dosha, returning descriptions and traditional Vedic remedies.",
    params: [
      { name: "year", type: "number", required: true, desc: "Birth year" },
      { name: "month", type: "number", required: true, desc: "Birth month" },
      { name: "day", type: "number", required: true, desc: "Birth day" },
      { name: "hour", type: "number", required: true, desc: "Birth hour" },
      { name: "minute", type: "number", required: true, desc: "Birth minute" },
      { name: "latitude", type: "number", required: true, desc: "Birth latitude" },
      { name: "longitude", type: "number", required: true, desc: "Birth longitude" },
      { name: "timezone", type: "number", required: true, desc: "UTC Timezone" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical model: Lahiri, Raman, etc. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: [
        {
          name: "Manglik Dosha",
          localizedName: "Kuja Dosha",
          hasDosha: true,
          severity: "Medium",
          description: "Mars resides in your Ascendant Bhava (1st House) causing high cosmic heat and marital friction potential, which can be mitigated via specific Vedic remedies."
        }
      ]
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/dosha \\
  -H "Content-Type: application/json" \\
  -d '{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `const doshas = await fetch('/api/dosha', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 })
}).then(r => r.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/dosha", json={
    "year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30,
    "latitude": 17.385, "longitude": 78.486, "timezone": 5.5
})`
  },
  {
    path: "/api/matching",
    name: "Ashta Koota Matchmaking",
    method: "POST",
    description: "Performs full 36-point Ashta Koota compatibility matching between a bride (girl) and bridegroom (boy). Calculates individual Nakshatras, and audits Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi scores, along with Manglik cancellation rules and South Indian 10 Poruthams.",
    params: [
      { name: "boy", type: "object", required: true, desc: "Boy birth parameters: year, month, day, hour, minute, latitude, longitude, timezone" },
      { name: "girl", type: "object", required: true, desc: "Girl birth parameters: year, month, day, hour, minute, latitude, longitude, timezone" },
      { name: "lang", type: "string", required: false, desc: "Translation parameter" }
    ],
    exampleRequest: {
      boy: { year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 },
      girl: { year: 1997, month: 8, day: 20, hour: 14, minute: 15, latitude: 13.0827, longitude: 80.2707, timezone: 5.5 },
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: {
        totalPoints: 24.5,
        maxPoints: 36,
        verdict: "Auspicious Alliance (Madhya-Uttama)",
        ashtaKoota: [
          { koota: "Nadi", maxPoints: 8, obtainedPoints: 8, description: "Different nadis indicate high physical compatibility and progeny fitness." }
        ],
        manglikAnalysis: {
          boyIsManglik: true,
          girlIsManglik: false,
          isCompatible: true,
          verdict: "Boy has Kuja Dosha, but it gets deflectively cancelled by structural Moon-Mars planetary alignments."
        },
        southIndianPorutham: [
          { name: "Dina Porutham", localizedName: "దిన పొరుత్తం", status: "Uttama", description: "Incredibly favorable life longevity and absolute health indicators." }
        ]
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/matching \\
  -H "Content-Type: application/json" \\
  -d '{"boy":{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5},"girl":{"year":1997,"month":8,"day":20,"hour":14,"minute":15,"latitude":13.082,"longitude":80.270,"timezone":5.5}}'`,
    jsSample: `const matchRes = await fetch('/api/matching', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    boy: { year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 },
    girl: { year: 1997, month: 8, day: 20, hour: 14, minute: 15, latitude: 13.082, longitude: 80.270, timezone: 5.5 }
  })
}).then(r => r.json());`,
    pythonSample: `import requests
payload = {
    "boy": {"year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30, "latitude": 17.385, "longitude": 78.486, "timezone": 5.5},
    "girl": {"year": 1997, "month": 8, "day": 20, "hour": 14, "minute": 15, "latitude": 13.0827, "longitude": 80.2707, "timezone": 5.5}
}
res = requests.post("https://api.vivahamitra.in/api/matching", json=payload)`
  },
  {
    path: "/api/muhurta",
    name: "Shubh Muhurta Timings",
    method: "POST",
    description: "Evaluates the auspicious planetary hours (Horas), solar/lunar aspects, and planetary dignity to isolate highly favorable transit windows for real-estate purchases, marriages, travel, or corporate launches.",
    params: [
      { name: "year", type: "number", required: true, desc: "Event date year" },
      { name: "month", type: "number", required: true, desc: "Event date month" },
      { name: "day", type: "number", required: true, desc: "Event date day" },
      { name: "hour", type: "number", required: true, desc: "Event start hour" },
      { name: "minute", type: "number", required: true, desc: "Event start minute" },
      { name: "latitude", type: "number", required: true, desc: "Event local latitude" },
      { name: "longitude", type: "number", required: true, desc: "Event local longitude" },
      { name: "timezone", type: "number", required: true, desc: "UTC decimal offset" },
      { name: "ayanamsa", type: "string", required: false, desc: "Astronomical model: Lahiri, Raman, etc. Defaults to Lahiri." },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      year: 2026,
      month: 6,
      day: 18,
      hour: 9,
      minute: 0,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: [
        {
          activity: "Marriage & Alliances",
          localizedActivity: "Marriage Muhurta",
          isAuspicious: true,
          score: 87,
          timeRanges: ["2026-6-18 08:30 AM to 11:45 AM"],
          description: "Jupiter Hora running in an exalted position, perfectly supporting harmonious marital bonds."
        }
      ]
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/muhurta \\
  -H "Content-Type: application/json" \\
  -d '{"year":2026,"month":6,"day":18,"hour":9,"minute":0,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `const muhurtas = await fetch('/api/muhurta', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 2026, month: 6, day: 18, hour: 9, minute: 0, latitude: 17.385, longitude: 78.486, timezone: 5.5 })
}).then(res => res.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/muhurta", json={
    "year": 2026, "month": 6, "day": 18, "hour": 9, "minute": 0,
    "latitude": 17.385, "longitude": 78.486, "timezone": 5.5
})`
  },
  {
    path: "/api/numerology",
    name: "Life Path & Baby Names",
    method: "POST",
    description: "Calculates the Pythagorean / Chaldean Numerology numbers from date-of-birth elements: specifically the Life Path Number (DOB digits sum), the Destiny Number (syllable characters sum), and matches phonetically auspicious Nakshatric baby names.",
    params: [
      { name: "name", type: "string", required: true, desc: "Name to calculate destiny number against (e.g. Aarav)" },
      { name: "dob", type: "object", required: true, desc: "Object holding birth date keys: year, month, day" },
      { name: "lang", type: "string", required: false, desc: "Output translation index" }
    ],
    exampleRequest: {
      name: "Aarav Kumar",
      dob: { year: 1995, month: 6, day: 15 },
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: {
        lifePath: 9,
        destiny: 1,
        luckyGem: "Red Coral / Ruby",
        nameAstrology: {
          suggestedSyllables: ["Aa", "Ch", "Le"],
          babyNames: [
            { name: "Aarav", meaning: "Peaceful; calm sound", gender: "Boy" }
          ]
        }
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/numerology \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Aarav Kumar","dob":{"year":1995,"month":6,"day":15}}'`,
    jsSample: `const dataNum = await fetch('/api/numerology', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: "Aarav", dob: { year: 1995, month: 6, day: 15 } })
}).then(r => r.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/numerology", json={
    "name": "Aarav", "dob": {"year": 1995, "month": 6, "day": 15}
})`
  },
  {
    path: "/api/consult",
    name: "AI Astro-Consultation",
    method: "POST",
    description: "Triggers the scholar-level Gemini AI conversational oracle module. By analyzing the current astronomical coordinates, yogas, house alignments, and D1 planetary grid indexes, it delivers hyper-personalized, profound readings for career, marriage, or financial remedies.",
    params: [
      { name: "message", type: "string", required: true, desc: "User conversational query (e.g. 'Tell me about my career pros and 10th house strength')" },
      { name: "history", type: "array", required: true, desc: "Prior chat conversation logs as an array: [{role: 'user'|'model', content: string}]" },
      { name: "birthInput", type: "object", required: true, desc: "Active natal credentials configuration parameters" },
      { name: "lang", type: "string", required: false, desc: "Output translation language: en, te, hi, ta, kn. Defaults to en." }
    ],
    exampleRequest: {
      message: "Analyze my planetary placements for relationships",
      history: [],
      birthInput: { year: 1955, month: 10, day: 28, hour: 21, minute: 18, latitude: 47.6062, longitude: -122.3321, timezone: -8 },
      lang: "en"
    },
    exampleResponse: {
      success: true,
      reply: "Based on your charts, Venus, the karaka of marriage, falls in your auspicious 5th house of romance, while Moon rules the 7th bhava..."
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/consult \\
  -H "Content-Type: application/json" \\
  -d '{"message":"What gemstone should I wear?","history":[],"birthInput":{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}}'`,
    jsSample: `const aiConsult = await fetch('/api/consult', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Does Saturn aspect my 10th house?",
    history: [],
    birthInput: { year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 }
  })
}).then(r => r.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/consult", json={
    "message": "Analyze my 10th house strength",
    "history": [],
    "birthInput": {"year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30, "latitude": 17.385, "longitude": 78.486, "timezone": 5.5}
})`
  },
  {
    path: "/api/horoscope",
    name: "Astro Horoscope Interpretations",
    method: "POST",
    description: "Calculates precise planet transit signs and issues detailed AI-generated daily or monthly astronomical reports based on the planetary alignments and current house transits.",
    params: [
      { name: "year", type: "number", required: true, desc: "Birth year" },
      { name: "month", type: "number", required: true, desc: "Birth month" },
      { name: "day", type: "number", required: true, desc: "Birth day" },
      { name: "hour", type: "number", required: true, desc: "Birth hour" },
      { name: "minute", type: "number", required: true, desc: "Birth minute" },
      { name: "latitude", type: "number", required: true, desc: "Birth latitude" },
      { name: "longitude", type: "number", required: true, desc: "Birth longitude" },
      { name: "timezone", type: "number", required: true, desc: "UTC Timezone" },
      { name: "lang", type: "string", required: false, desc: "Vedic translation code" }
    ],
    exampleRequest: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      lang: "en"
    },
    exampleResponse: {
      success: true,
      data: {
        signName: "Mesha (Aries)",
        forecast: "Today features Saturn transit indicators in your career house. Focus on structured discipline..."
      }
    },
    curlSample: `curl -X POST https://api.vivahamitra.in/api/horoscope \\
  -H "Content-Type: application/json" \\
  -d '{"year":1995,"month":6,"day":15,"hour":8,"minute":30,"latitude":17.385,"longitude":78.486,"timezone":5.5}'`,
    jsSample: `const forecast = await fetch('/api/horoscope', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ year: 1995, month: 6, day: 15, hour: 8, minute: 30, latitude: 17.385, longitude: 78.486, timezone: 5.5 })
}).then(r => r.json());`,
    pythonSample: `import requests
res = requests.post("https://api.vivahamitra.in/api/horoscope", json={
    "year": 1995, "month": 6, "day": 15, "hour": 8, "minute": 30,
    "latitude": 17.385, "longitude": 78.486, "timezone": 5.5
})`
  }
];
