import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';
import { formatValue } from '../../../utils/format';

interface Props {
  data: MatchingResult;
}

export const Page14DashakootTable: React.FC<Props> = ({ data }) => {
  const kootas = data.ashtaKoota || [];
  
  // Total calculation
  const totalMax = kootas.reduce((acc, k) => acc + (k.maxPoints || 0), 0) || 36;
  const totalObtained = kootas.reduce((acc, k) => acc + (k.obtainedPoints || 0), 0) || 0;

  const getKootaValue = (koota: string, info: any) => {
    const k = koota.toLowerCase();
    if (k.includes('varna')) return info?.varna;
    if (k.includes('vashya')) return info?.vashya;
    if (k.includes('tara') || k.includes('dina')) return info?.nakshatra;
    if (k.includes('yoni')) return info?.yoni;
    if (k.includes('maitri') || k.includes('graha')) return info?.moonSignLord;
    if (k.includes('gana')) return info?.gana;
    if (k.includes('bhakoot') || k.includes('rasi')) return info?.moonSign;
    if (k.includes('nadi')) return info?.nadi;
    return null;
  };

  const TableRow = ({ koota, index }: { koota: any, index: number }) => (
    <div className={`grid grid-cols-5 text-left py-2 px-4 text-[13px] pdf-page-avoid-break ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF0F0]'}`}>
      <div className="font-bold text-stone-800">{koota.localizedKoota || koota.koota}</div>
      <div className="text-stone-700">{formatValue(getKootaValue(koota.koota, data.boyInfo))}</div>
      <div className="text-stone-700">{formatValue(getKootaValue(koota.koota, data.girlInfo))}</div>
      <div className="text-stone-700">{formatValue(koota.maxPoints)}</div>
      <div className="text-stone-700">{formatValue(koota.obtainedPoints)}</div>
    </div>
  );

  return (
    <FixedPage pageNumber={14}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative pdf-page-avoid-break">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Dashakoot
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="grid grid-cols-5 text-left bg-[#E67E22] text-white py-3 px-4 font-bold text-[13px] pdf-page-avoid-break">
            <div>Attributes</div>
            <div>Male</div>
            <div>Female</div>
            <div>Total</div>
            <div>Received</div>
          </div>
          {kootas.map((k, idx) => (
            <TableRow key={idx} koota={k} index={idx} />
          ))}
          {/* Total Row */}
          <div className="grid grid-cols-5 text-left py-3 px-4 text-[13px] bg-white font-bold text-stone-800 border-t border-stone-200 pdf-page-avoid-break">
            <div>Total</div>
            <div>-</div>
            <div>-</div>
            <div>{totalMax}</div>
            <div>{totalObtained}</div>
          </div>
        </div>

        {/* Bar Chart Recreation */}
        <div className="mt-8 flex-1 w-full flex flex-col pdf-page-avoid-break">
          <div className="relative flex-1 flex items-end ml-12 pb-8 border-b-2 border-stone-800 border-l-2">
            
            {/* Y Axis Labels */}
            <div className="absolute left-[-40px] top-0 bottom-8 flex flex-col justify-between text-xs text-stone-600 font-medium">
              {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map(val => (
                <div key={val} className="flex items-center">
                  <span>{val}</span>
                  <div className="w-2 h-px bg-stone-800 ml-2"></div>
                </div>
              ))}
            </div>
            
            <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 -rotate-90 transform text-sm font-bold text-stone-800 tracking-wider">
              Percentage %
            </div>

            {/* Bars */}
            <div className="w-full h-full flex justify-around items-end pt-4">
              {kootas.map((k, idx) => {
                const percentage = k.maxPoints > 0 ? (k.obtainedPoints / k.maxPoints) * 100 : 0;
                return (
                  <div key={idx} className="flex flex-col items-center justify-end h-full w-full px-1">
                    <div 
                      className="w-full bg-[#4CAF50] max-w-[40px]" 
                      style={{ height: `${percentage}%`, backgroundColor: percentage > 30 ? '#4CAF50' : '#F44336' }}
                    ></div>
                    {/* X Axis Label */}
                    <div className="absolute bottom-[-24px] text-[10px] text-stone-600 font-semibold truncate max-w-[50px] text-center">
                      {k.koota?.substring(0, 5)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
