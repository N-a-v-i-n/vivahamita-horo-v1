import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { mapCompatibilityAnalysis } from '../../utils/reportMapper';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const CompatibilityCards: React.FC<Props> = ({ data, lang }) => {
  const missingMsg = getReportString(lang, "missingDataMessage");
  const analysis = mapCompatibilityAnalysis(data, missingMsg);

  const categories = [
    { key: "emotionalCompatibility", data: analysis.emotional },
    { key: "communicationCompatibility", data: analysis.communication },
    { key: "familyCompatibility", data: analysis.family },
    { key: "financialCompatibility", data: analysis.financial },
    { key: "physicalCompatibility", data: analysis.physical }
  ];

  return (
    <div className="flex flex-col mb-0">
      <div className="mb-0 border-b border-stone-300 pb-0">
        <h2 className="text-xl font-serif font-bold text-stone-900 tracking-wide uppercase">
          {getReportString(lang, "compatibilityAnalysis")}
        </h2>
      </div>

      <div className="flex flex-col gap-0 w-full mx-auto">
        {categories.map((cat, idx) => {
          return (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-serif font-bold text-stone-800">
                  {getReportString(lang, cat.key as any)}
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                  [{cat.data.score}/{cat.data.max}]
                </span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {cat.data.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
