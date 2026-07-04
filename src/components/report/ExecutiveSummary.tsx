import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const ExecutiveSummary: React.FC<Props> = ({ data, lang }) => {
  const percentage = data.overallPercentage || 0;
  
  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0 flex-1 relative">
      
      {/* Subtle background glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl opacity-20 pointer-events-none rounded-full ${
        percentage >= 70 ? 'bg-emerald-400' : 
        percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'
      }`}></div>

      <div className="mb-0 text-center relative z-10">
        <h2 className="text-2xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, "executiveSummary")}
        </h2>
      </div>
      
      <div className="flex-1 w-full mx-auto flex flex-col justify-between gap-0 relative z-10">
        
        <div className="bg-stone-50/50 border border-stone-100 rounded-3xl p-8 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-stone-400 mb-2 uppercase tracking-[0.2em]">
            {getReportString(lang, "finalRecommendation")}
          </h3>
          
          <div className="text-center mb-2">
            <h3 className={`text-4xl font-serif font-light px-8 py-4 inline-block rounded-2xl ${
              percentage >= 70 ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 
              percentage >= 50 ? 'text-amber-600 bg-amber-50 border border-amber-100' : 'text-rose-600 bg-rose-50 border border-rose-100'
            }`}>
              {data.summary?.recommendation || getReportString(lang, percentage >= 80 ? 'excellent' : percentage >= 70 ? 'veryGood' : percentage >= 60 ? 'good' : percentage >= 50 ? 'average' : 'lowCompatibility')}
            </h3>
          </div>
          
          <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium text-center">
            {data.report || getReportString(lang, "missingDataMessage")}
          </p>
        </div>

        <div className="bg-stone-50/80 border border-stone-100 rounded-3xl p-2 mt-0 shadow-inner">
          <h3 className="text-[10px] font-bold text-stone-400 mb-0 uppercase tracking-widest text-center">Important Disclaimer</h3>
          <p className="text-xs text-stone-400 leading-relaxed text-center font-medium max-w-2xl mx-auto">
            This compatibility report is generated purely based on the mathematical and astrological principles calculated from the provided birth details. It is intended as a guiding tool and not as deterministic fate. We strongly encourage consulting with a qualified professional Vedic Astrologer before making any major life decisions.
          </p>
        </div>

      </div>
    </div>
  );
};
