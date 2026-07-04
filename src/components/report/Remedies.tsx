import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { Sparkles } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const Remedies: React.FC<Props> = ({ data, lang }) => {
  // Extract remedies from API, or use empty array
  // Since our API currently doesn't have a structured remedies array, we check if one exists
  const apiRemedies: string[] = (data as any).remedies || [];

  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0 flex-1 relative">
      <div className="mb-0 flex items-center justify-between border-b border-stone-100 pb-0">
        <h2 className="text-xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, "remedies")}
        </h2>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="w-full mx-auto flex items-center justify-center min-h-[100px]">
        {apiRemedies.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2 text-stone-600 font-medium">
            {apiRemedies.map((remedy, idx) => (
              <li key={idx}>{remedy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm font-medium text-stone-400 italic text-center">
            {getReportString(lang, "noRemediesProvided")}
          </p>
        )}
      </div>
    </div>
  );
};
