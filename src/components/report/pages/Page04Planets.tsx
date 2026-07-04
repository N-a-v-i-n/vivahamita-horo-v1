import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

import { formatValue } from '../../../utils/format';

export const Page04Planets: React.FC<Props> = ({ data }) => {
  // We do not have planetary data in MatchingResult, so we show 'N/A' as instructed
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Ascendant"];
  
  const createRows = (planetsObj?: Record<string, any>) => {
    return planets.map(p => {
      const pData = planetsObj ? planetsObj[p] : null;
      return {
        planet: p,
        r: formatValue('--'), // Retrograde info not in this minimal api
        sign: formatValue(pData?.sign),
        degrees: formatValue(pData ? pData.degree.toString() : null),
        signLord: formatValue(null),
        nakshatra: formatValue(null),
        nakshatraLord: formatValue(null),
        house: formatValue(pData?.house?.toString())
      };
    });
  };

  const boyRows = createRows(data.boyInfo?.planets);
  const girlRows = createRows(data.girlInfo?.planets);

  const TableHeader = () => (
    <div className="grid grid-cols-8 text-left bg-[#E67E22] text-white py-2 px-4 font-bold text-[13px]">
      <div>Planets</div>
      <div>R</div>
      <div>Sign</div>
      <div>Degrees</div>
      <div>Sign Lord</div>
      <div>Nakshatra</div>
      <div>Nakshatra Lord</div>
      <div>House</div>
    </div>
  );

  const TableRow = ({ row, index }: { row: any, index: number }) => (
    <div className={`grid grid-cols-8 text-left py-2 px-4 text-[13px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF0F0]'}`}>
      <div className="text-stone-700">{row.planet}</div>
      <div className="text-stone-700">{row.r}</div>
      <div className="text-stone-700">{row.sign}</div>
      <div className="text-stone-700">{row.degrees}</div>
      <div className="text-stone-700">{row.signLord}</div>
      <div className="text-stone-700">{row.nakshatra}</div>
      <div className="text-stone-700">{row.nakshatraLord}</div>
      <div className="text-stone-700">{row.house}</div>
    </div>
  );

  return (
    <FixedPage pageNumber={4}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Planetary Positions
          </div>
        </div>

        {/* Boy Positions */}
        <div className="text-center mb-4 mt-4">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            {data.boyInfo?.name || 'Boy'} Planetary Positions
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        <div className="w-full mb-8">
          <TableHeader />
          {boyRows.map((row, idx) => (
            <TableRow key={`boy-${idx}`} row={row} index={idx} />
          ))}
        </div>

        {/* Girl Positions */}
        <div className="text-center mb-4 mt-8">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            {data.girlInfo?.name || 'Girl'} Planetary Positions
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        <div className="w-full">
          <TableHeader />
          {girlRows.map((row, idx) => (
            <TableRow key={`girl-${idx}`} row={row} index={idx} />
          ))}
        </div>

      </div>
    </FixedPage>
  );
};
