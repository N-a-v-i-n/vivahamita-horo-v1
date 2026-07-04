import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

import { formatValue } from '../../../utils/format';

export const Page03BasicDetails: React.FC<Props> = ({ data }) => {
  const boy = data.boyInfo;
  const girl = data.girlInfo;

  // The user requested to KEEP these Astrological Details
  const astroRows = [
    { label: 'Varna', boy: formatValue(boy?.varna), girl: formatValue(girl?.varna) },
    { label: 'Vashya', boy: formatValue(boy?.vashya), girl: formatValue(girl?.vashya) },
    { label: 'Yoni', boy: formatValue(boy?.yoni), girl: formatValue(girl?.yoni) },
    { label: 'Gan', boy: formatValue(boy?.gana), girl: formatValue(girl?.gana) },
    { label: 'Nadi', boy: formatValue(boy?.nadi), girl: formatValue(girl?.nadi) },
    { label: 'Sign Lord', boy: formatValue(boy?.moonSignLord), girl: formatValue(girl?.moonSignLord) },
    { label: 'Nakshatra', boy: formatValue(boy?.nakshatra), girl: formatValue(girl?.nakshatra) },
    { label: 'Charan (Pada)', boy: formatValue(boy?.pada), girl: formatValue(girl?.pada) }
  ];

  // The following sections were removed per user request because they are not fully supported or rely on chart data:
  // - Basic Birth Details (DOB, Time, Latitude, Longitude, Sunrise, Sunset)
  // - Nakshatra Lord, Yog, Karan, Tithi, Yunja, Tatva, Name Alphabet, Paya

  const TableRow = ({ row, index }: { row: any, index: number }) => (
    <div className={`grid grid-cols-3 text-center py-2 text-[13px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF0F0]'}`}>
      <div className="text-stone-700">{row.boy}</div>
      <div className="font-bold text-stone-800">{row.label}</div>
      <div className="text-stone-700">{row.girl}</div>
    </div>
  );

  return (
    <FixedPage pageNumber={3}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Astrological Details
          </div>
        </div>

        {/* Section Divider */}
        <div className="text-center mb-6 mt-8">
          <h2 className="text-2xl font-bold text-stone-800 tracking-wide">
            Matching Attributes
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        {/* Astrological Details Table */}
        <div className="w-full">
          <div className="grid grid-cols-3 text-center bg-[#E67E22] text-white py-3 font-bold text-sm">
            <div>{boy?.name || 'Boy'}</div>
            <div>Attributes</div>
            <div>{girl?.name || 'Girl'}</div>
          </div>
          {astroRows.map((row, idx) => (
            <TableRow key={idx} row={row} index={idx} />
          ))}
        </div>

      </div>
    </FixedPage>
  );
};
