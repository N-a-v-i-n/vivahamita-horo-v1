import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

import { formatValue } from '../../../utils/format';

export const Page16Papasamyam: React.FC<Props> = ({ data }) => {
  const boyName = data.boyInfo?.name || 'Boy';
  const girlName = data.girlInfo?.name || 'Girl';
  
  const papaData = data.paapa_samyam || (data as any).paapaSamyam;

  const TableHeader = () => (
    <div className="grid grid-cols-7 text-left bg-[#E67E22] text-white py-2 px-2 font-bold text-[11px]">
      <div>Papa Points</div>
      <div>Positions</div>
      <div>Papam</div>
      <div>Positions</div>
      <div>Papam</div>
      <div>Positions</div>
      <div>Papam</div>
    </div>
  );

  const SubHeader = () => (
    <div className="grid grid-cols-7 text-left py-1 px-2 font-bold text-[10px] bg-stone-100 border-b border-stone-200">
      <div></div>
      <div className="col-span-2 text-center">From Ascendant</div>
      <div className="col-span-2 text-center">From Moon</div>
      <div className="col-span-2 text-center">From Venus</div>
    </div>
  );

  const TableRow = ({ label, index, isTotal = false, b }: { label: string, index: number, isTotal?: boolean, b?: string }) => (
    <div className={`grid grid-cols-7 text-left py-2 px-2 text-[12px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF0F0]'} ${isTotal ? 'font-bold border-t border-stone-300' : ''}`}>
      <div className="text-stone-800">{label}</div>
      <div className="text-stone-700 text-center">{formatValue(null)}</div>
      <div className="text-stone-700 text-center">{formatValue(b)}</div>
      <div className="text-stone-700 text-center">{formatValue(null)}</div>
      <div className="text-stone-700 text-center">{formatValue(b)}</div>
      <div className="text-stone-700 text-center">{formatValue(null)}</div>
      <div className="text-stone-700 text-center">{formatValue(b)}</div>
    </div>
  );

  return (
    <FixedPage pageNumber={16}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Papasamyam
          </div>
        </div>

        <p className="text-sm leading-relaxed text-stone-700 mb-6">
          Papa (dosha) Comparison is done here by assigning points for the position of Mars, Saturn, Rahu, Ketu and Sun
          with respect to Lagna, Moon as well as Venus.
        </p>

        {/* Boy Table */}
        <h3 className="text-lg font-bold text-stone-800 tracking-wide mb-2">{boyName} Papa Points</h3>
        <div className="w-full mb-6 border border-stone-200">
          <TableHeader />
          <SubHeader />
          {['Sun', 'Mars', 'Saturn', 'Rahu'].map((planet, idx) => (
            <TableRow key={planet} label={planet} index={idx} />
          ))}
          <TableRow label="Total" index={4} isTotal={true} b={papaData ? (papaData.boy_points ?? papaData.boyPoints)?.toString() : undefined} />
        </div>

        {/* Girl Table */}
        <h3 className="text-lg font-bold text-stone-800 tracking-wide mb-2">{girlName} Papa Points</h3>
        <div className="w-full mb-8 border border-stone-200">
          <TableHeader />
          <SubHeader />
          {['Sun', 'Mars', 'Saturn', 'Rahu'].map((planet, idx) => (
            <TableRow key={planet} label={planet} index={idx} />
          ))}
          <TableRow label="Total" index={4} isTotal={true} b={papaData ? (papaData.girl_points ?? papaData.girlPoints)?.toString() : undefined} />
        </div>

        <div className="w-full mt-auto">
          <h3 className="text-lg font-bold text-stone-800 tracking-wide mb-2">Papasamyam Conclusion</h3>
          <p className="text-sm leading-relaxed text-stone-700">
            {papaData?.description || "Papa Samyam is good."}
          </p>
        </div>

      </div>
    </FixedPage>
  );
};
