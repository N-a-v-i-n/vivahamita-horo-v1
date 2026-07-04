import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

export const Page12ManglikMatch: React.FC<Props> = ({ data }) => {
  const boyName = data.boyInfo?.name || 'Boy';
  const girlName = data.girlInfo?.name || 'Girl';

  return (
    <FixedPage pageNumber={12}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Manglik Analysis
          </div>
        </div>

        <div className="flex gap-8 w-full mb-8">
          <div className="flex-1 border border-stone-200">
            <div className="bg-[#E67E22] text-white py-2 px-4 font-bold text-center">
              {boyName} Manglik Details
            </div>
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-stone-600 mb-2 uppercase tracking-wide">Detected Doshas</p>
              {data.doshaMatching?.boyDoshas?.length ? (
                <ul className="text-base font-bold text-stone-800 list-none space-y-1">
                  {data.doshaMatching.boyDoshas.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              ) : (
                <p className="text-xl font-bold text-green-600">None</p>
              )}
            </div>
          </div>
          
          <div className="flex-1 border border-stone-200">
            <div className="bg-[#E67E22] text-white py-2 px-4 font-bold text-center">
              {girlName} Manglik Details
            </div>
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-stone-600 mb-2 uppercase tracking-wide">Detected Doshas</p>
              {data.doshaMatching?.girlDoshas?.length ? (
                <ul className="text-base font-bold text-stone-800 list-none space-y-1">
                  {data.doshaMatching.girlDoshas.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              ) : (
                <p className="text-xl font-bold text-green-600">None</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#E67E22] text-white py-2 px-4 font-bold text-left mb-4">
            Manglik Match Result
          </div>
          <div className="px-4 py-2">
            <p className="text-base text-stone-700 leading-relaxed font-medium">
              {data.doshaMatching?.hasManglikDoshaConflict 
                ? (data.doshaMatching?.isCancelled 
                    ? `Manglik Dosha conflict is present but cancelled. ${data.doshaMatching.cancellationDetails || ''}` 
                    : "Manglik Dosha conflict is present. Proceed with caution and consult an expert.") 
                : "The boy is not a Manglik; nor is the girl a Manglik. Mangal Dosha being absent in either horoscopes, there shall be no ill effect on their marriage. This match is recommended."}
            </p>
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
