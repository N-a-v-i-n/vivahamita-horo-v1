import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';
import { SouthIndianChart } from './SouthIndianChart';

interface Props {
  data: MatchingResult;
}

export const Page05ChartsLagna: React.FC<Props> = ({ data }) => {
  return (
    <FixedPage pageNumber={5}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Horoscope Charts
          </div>
        </div>

        {/* Lagna Chart Section */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            Lagna Chart(Birth Chart)
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        <div className="flex justify-center gap-16 w-full mb-12">
          <SouthIndianChart title={data.boyInfo?.name || "Boy"} planets={data.boyInfo?.planets} />
          <SouthIndianChart title={data.girlInfo?.name || "Girl"} planets={data.girlInfo?.planets} />
        </div>

        {/* Chalit Chart Section */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            Chalit Chart
          </h2>
          <div className="flex items-center justify-center mt-2">
            <div className="w-16 h-px bg-stone-300"></div>
            <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
            <div className="w-16 h-px bg-stone-300"></div>
          </div>
        </div>

        <div className="flex justify-center gap-16 w-full">
          <SouthIndianChart title={data.boyInfo?.name || "Boy"} planets={data.boyInfo?.planets} />
          <SouthIndianChart title={data.girlInfo?.name || "Girl"} planets={data.girlInfo?.planets} />
        </div>

      </div>
    </FixedPage>
  );
};
