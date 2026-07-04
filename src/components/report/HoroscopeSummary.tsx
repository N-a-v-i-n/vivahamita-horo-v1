import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { Sparkles, Compass } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const HoroscopeSummary: React.FC<Props> = ({ data, lang }) => {
  if (!data.boyInfo || !data.girlInfo) return null;

  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0">
      
      {/* Subtle mandala/astrology background element */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <Compass className="w-96 h-96" />
      </div>

      <div className="mb-8 flex items-center justify-between border-b border-stone-100 pb-6 relative z-10">
        <h2 className="text-2xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          Horoscope Summary
        </h2>
        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 w-full mx-auto flex flex-col justify-center space-y-6 relative z-10">
        <p className="text-stone-600 font-medium leading-loose text-justify text-lg">
          Based on the astrological calculations of the provided birth details, the union between 
          <span className="font-bold text-stone-800"> {data.girlInfo.name} </span> 
          (Moon Sign: {data.girlInfo.moonSign}, Nakshatra: {data.girlInfo.nakshatra}) and 
          <span className="font-bold text-stone-800"> {data.boyInfo.name} </span> 
          (Moon Sign: {data.boyInfo.moonSign}, Nakshatra: {data.boyInfo.nakshatra}) 
          yields an Ashtakoota compatibility score of 
          <span className="font-bold text-stone-800"> {data.marriageScore} out of 36</span>.
        </p>

        <div className="bg-stone-50/50 p-6 rounded-2xl border border-stone-100 mt-6 shadow-inner">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
            Astrological Context
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed font-medium">
            The Ashtakoota system evaluates eight different dimensions of life (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi) to determine the overall compatibility and potential harmony between the couple. The following sections will break down these scores, highlight key strengths, and address any potential astrological challenges.
          </p>
        </div>
      </div>
    </div>
  );
};
