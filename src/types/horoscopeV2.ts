import { NarrativeOutput } from '../astrology/models/types';

export interface HoroscopeV2Request {
  name?: string;
  gender?: string;
  gotram?: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: number;
  placeOfBirth?: string;
}

export interface HoroscopeV2BirthDetails {
  name: string;
  gender: string;
  gotram?: string;
  dateOfBirth: string;
  dayOfWeek: string;
  timeOfBirth: string;
  standardTime: string;
  placeOfBirth: string;
  latitude: string;
  longitude: string;
  timezone: string;
  ayanamsa: string;
  sunrise: string;
  sunset: string;
}

export interface HoroscopeV2Panchanga {
  tithi: string;
  paksha: string;
  vara: string;
  nakshatra: string;
  pada: number;
  yoga: string;
  karana: string;
  rasi: string;
  rasiLord: string;
  lagna: string;
  lagnaLord: string;
}

export interface HoroscopeV2PlanetPosition {
  planet: string;
  planetId: string;
  sign: string;
  signNumber: number;
  house: number;
  rasiLord: string;
  nakshatraLord: string;
  longitude: {
    degree: number;
    minute: number;
    second: number;
    decimal: number;
  };
  formattedLongitude: string;
  nakshatra: string;
  pada: number;
  formattedNakshatra: string;
}

export interface HoroscopeV2House {
  house: number;
  sign: string;
  lord: string;
  occupants: string[];
}

export interface HoroscopeV2Chart {
  [houseNumber: string]: string[]; // "1" to "12" mapping to array of planet names
}

export interface HoroscopeV2Bhukti {
  planet: string;
  startDate: string;
  endDate: string;
}

export interface HoroscopeV2Mahadasha {
  planet: string;
  startDate: string;
  endDate: string;
  duration: string;
  bhuktis: HoroscopeV2Bhukti[];
}

export interface HoroscopeV2DashaTable {
  janmakalaDasaSesham: string;
  vimshottari: HoroscopeV2Mahadasha[];
}



export interface HoroscopeV2ResponseData {
  birthDetails: HoroscopeV2BirthDetails;
  panchanga: HoroscopeV2Panchanga;
  planetaryTable: HoroscopeV2PlanetPosition[];
  houses: HoroscopeV2House[];
  rasiChart: HoroscopeV2Chart;
  navamsaChart: HoroscopeV2Chart;
  bhavaChart: HoroscopeV2Chart;
  dashaTable: HoroscopeV2DashaTable;
  analysis?: NarrativeOutput;
}

export interface HoroscopeV2Metadata {
  engine: string;
  engineVersion: string;
  reportVersion: string;
  language: string;
  chartStyle: string;
  generatedAt: string;
  reportId: string;
  template: string;
}

export interface HoroscopeV2PdfInfo {
  generated: boolean;
  url: string;
  fileName: string;
  size?: string;
  generatedAt?: string;
}

export interface HoroscopeV2Response {
  success: boolean;
  metadata: HoroscopeV2Metadata;
  data: HoroscopeV2ResponseData;
  pdf: HoroscopeV2PdfInfo;
}
