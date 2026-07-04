import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { getDoshaSummary } from '../../utils/reportMapper';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const DoshaAnalysis: React.FC<Props> = ({ data, lang }) => {
  const doshaSummary = getDoshaSummary(data);

  if (!doshaSummary) return null;

  const { boyDoshas, girlDoshas, manglikConflict, isCancelled, cancellationDetails } = doshaSummary;
  
  const nadiScore = data.ashtaKoota?.find(k => k.koota.toLowerCase() === "nadi")?.obtainedPoints;
  const bhakootScore = data.ashtaKoota?.find(k => k.koota.toLowerCase() === "bhakoot")?.obtainedPoints;
  
  const hasNadiDosha = nadiScore === 0;
  const hasBhakootDosha = bhakootScore === 0;

  return (
    <div className="flex flex-col mb-0">
      <div className="mb-0 border-b border-stone-300 pb-0">
        <h2 className="text-xl font-serif font-bold text-stone-900 tracking-wide uppercase">
          {getReportString(lang, "doshaAnalysis")}
        </h2>
      </div>

      <div className="flex-1 w-full space-y-0">
        
        {/* Manglik Dosha Text */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-serif font-bold text-stone-800">Manglik Dosha (Kuja Dosha)</h3>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${manglikConflict && !isCancelled ? 'text-rose-600' : 'text-emerald-600'}`}>
              [{manglikConflict && !isCancelled ? 'Conflict Present' : 'Favorable'}]
            </span>
          </div>
          
          <div className="mb-2">
            <p className="text-sm text-stone-700">
              <strong className="text-stone-900">{getReportString(lang, "brideDetails")}:</strong> {girlDoshas.includes("Manglik") ? getReportString(lang, "present") : getReportString(lang, "notPresent")}
            </p>
            <p className="text-sm text-stone-700">
              <strong className="text-stone-900">{getReportString(lang, "groomDetails")}:</strong> {boyDoshas.includes("Manglik") ? getReportString(lang, "present") : getReportString(lang, "notPresent")}
            </p>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            {manglikConflict && !isCancelled 
              ? "Manglik Dosha conflict is present and not cancelled. This requires careful consideration." 
              : isCancelled && manglikConflict 
              ? `Conflict detected but cancelled. Reason: ${cancellationDetails || 'Rules of cancellation apply.'}`
              : "No Manglik Dosha conflict. Excellent compatibility in this area."}
          </p>
        </div>

        {/* Nadi Dosha Text */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-serif font-bold text-stone-800">Nadi Dosha</h3>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${hasNadiDosha ? 'text-rose-600' : 'text-emerald-600'}`}>
              [{hasNadiDosha ? getReportString(lang, "present") : getReportString(lang, "notPresent")}]
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            {hasNadiDosha 
              ? "Nadi score is 0. Indicates potential Nadi Dosha affecting health and progeny." 
              : "No Nadi Dosha detected. Genetic and physiological compatibility is favorable."}
          </p>
        </div>

        {/* Bhakoot Dosha Text */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-serif font-bold text-stone-800">Bhakoot Dosha</h3>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${hasBhakootDosha ? 'text-amber-600' : 'text-emerald-600'}`}>
              [{hasBhakootDosha ? getReportString(lang, "present") : getReportString(lang, "notPresent")}]
            </span>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            {hasBhakootDosha 
              ? "Bhakoot score is 0. Indicates potential challenges in mutual growth and prosperity." 
              : "No Bhakoot Dosha detected. Overall life path indicators are positive."}
          </p>
        </div>

      </div>
    </div>
  );
};
