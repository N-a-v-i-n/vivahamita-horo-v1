import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';
import { formatValue } from '../../../utils/format';

interface Props {
  data: MatchingResult;
  isBoy: boolean;
}

export const PageDasha: React.FC<Props> = ({ data, isBoy }) => {
  const name = isBoy ? (data.boyInfo?.name || 'Boy') : (data.girlInfo?.name || 'Girl');
  const pageNumber = isBoy ? 7 : 8;

  // Try to access dasha data if added later
  const dashas = (data as any).dashas;

  return (
    <FixedPage pageNumber={pageNumber}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-10 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            {name} - Vimshottari Dasha
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            Dasha Predictions
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col items-center">
          {!dashas || dashas.length === 0 ? (
            <div className="w-full max-w-2xl bg-orange-50 border border-orange-200 rounded-xl p-8 text-center mt-12 shadow-sm">
              <h3 className="text-lg font-bold text-orange-800 mb-2">Status: {formatValue(null)}</h3>
              <p className="text-sm text-stone-600 leading-relaxed font-medium">
                Reason: This API endpoint does not currently return Dasha calculations.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-hidden border border-[#E67E22]/30 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#E67E22] text-white">
                    <th className="px-4 py-3 text-left font-bold border-r border-white/20">Mahadasha</th>
                    <th className="px-4 py-3 text-left font-bold border-r border-white/20">Antardasha</th>
                    <th className="px-4 py-3 text-center font-bold">Time Remaining (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {dashas.map((dasha: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-orange-50/50' : 'bg-white'}>
                      <td className="px-4 py-3 border-b border-[#E67E22]/10 border-r border-[#E67E22]/20 font-medium text-stone-800">
                        {formatValue(dasha.mahadasha)}
                      </td>
                      <td className="px-4 py-3 border-b border-[#E67E22]/10 border-r border-[#E67E22]/20 font-medium text-stone-700">
                        {formatValue(dasha.antardasha)}
                      </td>
                      <td className="px-4 py-3 border-b border-[#E67E22]/10 text-center font-bold text-[#E67E22]">
                        {formatValue(dasha.timeRemainingYears)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </FixedPage>
  );
};
