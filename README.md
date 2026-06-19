# Vivahamitra Vedic Astrology Platform REST API (No-Auth)

Vedic Astrology Computation Platform powered by high-precision Swiss Ephemeris. All endpoints are **public and require no authentication keys or login profiles**. 

---

## 🚀 Endpoint Overview
All endpoints accept `application/json` payloads and are executed via **`POST`** requests.

| Endpoint | Method | Description |
| :------- | :----- | :---------- |
| `/api/panchang` | `POST` | Computes localized solar/lunar times, sunrise, sunset, Tithi, Nakshatra, Yoga, and Karana. |
| `/api/chart` | `POST` | Maps precise sidereal positions and coordinates for D1 (Rasi) & D9 (Navamsa) divisional charts. |
| `/api/matching` | `POST` | Evaluates compatibility (Guna Milan scored out of 36 dimensions) for wedding alliances. |
| `/api/dasha` | `POST` | Computes Vimshottari Mahadasha timeline starting from moon's position. |
| `/api/dosha` | `POST` | Analyzes astrological afflictions like Manglik (Kuja), Kala Sarpa, and Guru Chandal Doshas. |
| `/api/muhurta` | `POST` | Pinpoints positive celestial timeline windows for business, properties, or marriages. |
| `/api/numerology` | `POST` | Calculates life path destiny numbers and auspicious start recommendations. |
| `/api/test-suite` | `POST` / `GET` | Triggers the precision test suite covering 105 astronomical evaluation cases. |

---

## 🛠️ Global Parameters Description

All birth-related payloads use the following structured keys:

* **`year`**: Birth year integer (e.g., `1995`)
* **`month`**: Month integer `1-12` (e.g., `6` for June)
* **`day`**: Day of month integer `1-31` (e.g., `15`)
* **`hour`**: Hour of birth in 24hr format `0-23` (e.g., `8`)
* **`minute`**: Minute of birth `0-59` (e.g., `30`)
* **`latitude`**: Decimal latitude (-90 to +90). Positive represents North (e.g., `17.385`).
* **`longitude`**: Decimal longitude (-180 to +180). Positive represents East (e.g., `78.486`).
* **`timezone`**: UTC offset in decimal hours (e.g., `5.5` for IST, `-8.0` for PST).
* **`ayanamsa`**: Calculation model. Supported values:
  * `"Lahiri"` (Chitrapaksha) - *Recommended Default*
  * `"Raman"`
  * `"Krishnamurti"`
  * `"Fagan-Bradley"`
  * `"Yukteswar"`
  * `"Tropical"`
* **`lang`**: Output language. Supported options: `"en"`, `"hi"`, `"te"`, `"ta"`, `"kn"`.

---

## 📖 Sample Requests & cURL snippets

### 1. Panchang & Lunar Computations (`/api/panchang`)
```bash
curl -X POST "http://localhost:3000/api/panchang" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1995,
    "month": 6,
    "day": 15,
    "hour": 8,
    "minute": 30,
    "latitude": 17.385,
    "longitude": 78.486,
    "timezone": 5.5,
    "ayanamsa": "Lahiri",
    "lang": "en",
    "explain": true
  }'
```

### 2. D1 & D9 Birth Chart coordinates (`/api/chart`)
```bash
curl -X POST "http://localhost:3000/api/chart" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1995,
    "month": 6,
    "day": 15,
    "hour": 8,
    "minute": 30,
    "latitude": 17.385,
    "longitude": 78.486,
    "timezone": 5.5,
    "ayanamsa": "Lahiri",
    "lang": "en"
  }'
```

### 3. Star Alliance Compatibility Matchmaking (`/api/matching`)
Requires two natal profiles named `boy` and `girl`:
```bash
curl -X POST "http://localhost:3000/api/matching" \
  -H "Content-Type: application/json" \
  -d '{
    "boy": {
      "year": 1995,
      "month": 6,
      "day": 15,
      "hour": 8,
      "minute": 30,
      "latitude": 17.385,
      "longitude": 78.486,
      "timezone": 5.5,
      "ayanamsa": "Lahiri"
    },
    "girl": {
      "year": 1997,
      "month": 8,
      "day": 20,
      "hour": 14,
      "minute": 15,
      "latitude": 13.0827,
      "longitude": 80.2707,
      "timezone": 5.5,
      "ayanamsa": "Lahiri"
    },
    "lang": "en"
  }'
```

### 4. Birth Afflictions Audit (`/api/dosha`)
```bash
curl -X POST "http://localhost:3000/api/dosha" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1995,
    "month": 6,
    "day": 15,
    "hour": 8,
    "minute": 30,
    "latitude": 17.385,
    "longitude": 78.486,
    "timezone": 5.5,
    "ayanamsa": "Lahiri",
    "lang": "en"
  }'
```

### 5. Running the internal 105 Assertions Test Metrics (`/api/test-suite`)
```bash
curl -X POST "http://localhost:3000/api/test-suite" \
  -H "Content-Type: application/json" \
  -d '{
    "cases": 105
  }'
```

---

## 📡 Port Configuration
The dev and production server runs on Port `3000`. No API tokens or signature authorizations are passed inside headers. Request away with complete tranquility!
# vivahamita-horo-v1
