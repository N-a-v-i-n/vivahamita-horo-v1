import React from 'react';
import { FixedPage } from './FixedPage';

import { MatchingResult } from '../../../../types/astrology';
import { formatValue } from '../../../utils/format';

interface Props {
  data: MatchingResult;
}

export const Page20Contact: React.FC<Props> = ({ data }) => {
  return (
    <FixedPage pageNumber={20}>
      <div className="flex-1 flex flex-col items-center justify-between relative w-full h-full bg-white">
        
        {/* Full background pattern */}
        <div className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/816x1056/white/gray?text=Mandala+Pattern)' }}></div>

        <div className="flex-1 flex flex-col items-center justify-center z-10 w-full mt-16">
          {/* Top Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
          
          <div className="text-5xl font-bold flex items-center tracking-tight my-4 text-[#E67E22]">
            Vivahamitra
          </div>

          {/* Bottom Divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        {/* Metadata Details section */}
        <div className="z-10 w-full max-w-lg mx-auto bg-stone-50 border border-stone-200 rounded p-6 mb-12 shadow-sm text-center">
           <h4 className="text-[#E67E22] font-bold uppercase mb-4 tracking-wider text-sm">Report Metadata</h4>
           <div className="grid grid-cols-2 gap-4 text-xs text-stone-600 font-medium">
             <div className="text-right">Calculation System:</div><div className="text-left font-bold text-stone-800">{formatValue(data.calculation?.system)}</div>
             <div className="text-right">Ayanamsa:</div><div className="text-left font-bold text-stone-800">{formatValue(data.calculation?.ayanamsa)}</div>
             <div className="text-right">House System:</div><div className="text-left font-bold text-stone-800">{formatValue(data.calculation?.houseSystem)}</div>
             <div className="text-right">Zodiac:</div><div className="text-left font-bold text-stone-800">{formatValue(data.calculation?.zodiac)}</div>
             <div className="text-right">Version:</div><div className="text-left font-bold text-stone-800">{formatValue(data.calculation?.version)}</div>
           </div>
        </div>

        {/* Footer Block */}
        <div className="w-full bg-[#E67E22] py-16 text-center z-10">
          <h2 className="text-4xl font-bold text-stone-900 mb-6">
            Vivahamitra
          </h2>
          <div className="space-y-2 text-lg text-stone-800 font-medium">
            <p>https://www.vivahamitra.com</p>
            <p>contact@vivahamitra.com</p>
          </div>
        </div>
        
      </div>
    </FixedPage>
  );
};
