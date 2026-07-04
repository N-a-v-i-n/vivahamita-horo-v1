import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';
import { SouthIndianChart } from './SouthIndianChart';

interface Props {
  data: MatchingResult;
}

export const Page06ChartsMoon: React.FC<Props> = ({ data }) => {
  return (
    <FixedPage pageNumber={6}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Moon Chart Section */}
        <div className="mb-4 mt-8 text-center">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            Moon Chart
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

        {/* Navmansha Chart Section */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            Navmansha Chart(D9)
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
