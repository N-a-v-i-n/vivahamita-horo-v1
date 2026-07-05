const fs = require('fs');
const horoPath = 'src/types/horoscopeV2.ts';
const matchPath = 'src/types/matchingV2.ts';

let horoCode = fs.readFileSync(horoPath, 'utf8');
if (!horoCode.includes('HoroscopeV2HowToRead')) {
  horoCode = horoCode.replace('export interface HoroscopeV2ResponseData {', 
`export interface HoroscopeV2HowToReadSection {
  title: string;
  description: string;
}

export interface HoroscopeV2HowToRead {
  title: string;
  subtitle: string;
  sections: HoroscopeV2HowToReadSection[];
}

export interface HoroscopeV2ResponseData {`);
  horoCode = horoCode.replace('  dashaTable: HoroscopeV2DashaTable;', '  dashaTable: HoroscopeV2DashaTable;\n  chartExplanation?: HoroscopeV2HowToRead;');
  fs.writeFileSync(horoPath, horoCode);
}

let matchCode = fs.readFileSync(matchPath, 'utf8');
if (!matchCode.includes('chartExplanation?: HoroscopeV2HowToRead')) {
  matchCode = matchCode.replace('import { HoroscopeV2BirthDetails, HoroscopeV2Panchanga, HoroscopeV2PlanetPosition, HoroscopeV2DashaTable } from "./horoscopeV2";',
  'import { HoroscopeV2BirthDetails, HoroscopeV2Panchanga, HoroscopeV2PlanetPosition, HoroscopeV2DashaTable, HoroscopeV2HowToRead } from "./horoscopeV2";');
  matchCode = matchCode.replace('  dashaTable?: HoroscopeV2DashaTable;', '  dashaTable?: HoroscopeV2DashaTable;\n  chartExplanation?: HoroscopeV2HowToRead;');
  matchCode = matchCode.replace('  dashaTable: HoroscopeV2DashaTable;', '  dashaTable: HoroscopeV2DashaTable;\n  chartExplanation?: HoroscopeV2HowToRead;');
  fs.writeFileSync(matchPath, matchCode);
}
