import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { TrendingUp } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const Strengths: React.FC<Props> = ({ data, lang }) => {
  // Derive Strengths from Kootas with 80%+ scores
  const kootas = data.ashtaKoota || [];
  const strengths = kootas
    .filter(k => (k.obtainedPoints / k.maxPoints) >= 0.8 && k.maxPoints > 0)
    .sort((a, b) => b.obtainedPoints - a.obtainedPoints);

  if (strengths.length === 0) return null;

  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0 flex-1 relative">
      <div className="mb-0 flex items-center justify-between border-b border-stone-100 pb-0">
        <h2 className="text-xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, "strengths")}
        </h2>
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {strengths.map((s, idx) => (
          <div key={idx} className="bg-emerald-50/30 border border-emerald-100/50 p-4 rounded-2xl flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">
              {s.obtainedPoints}
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest mb-1">{s.localizedKoota || s.koota}</h3>
              <p className="text-xs text-stone-500 font-medium leading-relaxed">
                Excellent alignment in this area, fostering strong positive influences for the relationship.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
