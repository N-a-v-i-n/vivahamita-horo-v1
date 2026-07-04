import { AstrologyService } from '../src/services/astrologyService.js';

const input = {
  "boy": {
    "year": 1995,
    "month": 6,
    "day": 15,
    "hour": 8,
    "minute": 30,
    "latitude": 17.3850,
    "longitude": 78.4867,
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
  }
};

const result = AstrologyService.calculateMatching(input.boy as any, input.girl as any, 'en');
console.log(JSON.stringify(result, null, 2));
