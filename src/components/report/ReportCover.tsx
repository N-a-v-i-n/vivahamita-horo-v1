import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const ReportCover: React.FC<Props> = ({ data, lang }) => {
  const score = data.marriageScore || 0;
  const percentage = data.overallPercentage || 0;
  
  return (
    <div className="flex flex-col items-center justify-center relative w-full bg-[#FAFAFA] py-0 overflow-hidden">
      
      {/* Premium Subtle Vedic Background Pattern (Simulated with gradients) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b45309 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Elegant Golden Frame */}
      <div className="absolute inset-8 border border-amber-900/10 rounded-[40px] pointer-events-none"></div>
      <div className="absolute inset-10 border border-amber-900/5 rounded-[32px] pointer-events-none"></div>

      <div className="z-10 text-center space-y-0 w-full max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Luxury Icon / Logo Area */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50 flex items-center justify-center shadow-lg border border-white mb-0">
          <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 tracking-tight leading-tight">
          {getReportString(lang, "reportTitle")}
        </h1>
        
        <div className="flex items-center justify-center space-x-6 w-full max-w-xs opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-700"></div>
          <div className="w-2 h-2 rotate-45 bg-amber-600"></div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-700"></div>
        </div>

        {/* Premium Couple Overview text block */}
        <div className="w-full mt-0 mb-0 border-t border-b border-stone-300 py-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-b-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-center relative z-10">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-0">{getReportString(lang, "brideDetails")}</p>
              <p className="text-3xl font-serif text-stone-800 mb-0">{data.girlInfo?.name || 'Bride'}</p>
              <p className="text-sm font-medium text-stone-500">{data.girlInfo?.moonSign || 'N/A'} • {data.girlInfo?.nakshatra || 'N/A'}</p>
            </div>
            
            {/* Divider for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-24 bg-stone-100"></div>
            
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-0">{getReportString(lang, "groomDetails")}</p>
              <p className="text-3xl font-serif text-stone-800 mb-0">{data.boyInfo?.name || 'Groom'}</p>
              <p className="text-sm font-medium text-stone-500">{data.boyInfo?.moonSign || 'N/A'} • {data.boyInfo?.nakshatra || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Executive Compatibility Summary Indicator */}
        <div className="w-full max-w-xl mx-auto mt-0 flex flex-col items-center">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-0">{getReportString(lang, "compatibilitySummary")}</p>
          
          <div className="flex items-center justify-center space-x-0">
            <div className="text-center">
              <div className="text-6xl font-light text-stone-800 tracking-tighter">
                {score} <span className="text-2xl text-stone-300">/ 36</span>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0 font-semibold">{getReportString(lang, "totalScore")}</p>
            </div>
            
            <div className="h-16 w-[1px] bg-stone-200"></div>
            
            <div className="text-center">
              <div className={`text-6xl font-light tracking-tighter ${percentage >= 70 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                {percentage}%
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0 font-semibold">Match Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
