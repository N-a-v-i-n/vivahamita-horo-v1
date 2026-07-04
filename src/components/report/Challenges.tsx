import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { getDoshaSummary } from '../../utils/reportMapper';
import { AlertCircle } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const Challenges: React.FC<Props> = ({ data, lang }) => {
  // Derive Challenges from Doshas and Kootas with 0 scores
  const challenges: Array<{ title: string; desc: string }> = [];

  const doshaSummary = getDoshaSummary(data);
  if (doshaSummary) {
    if (doshaSummary.manglikConflict && !doshaSummary.isCancelled) {
      challenges.push({
        title: "Manglik Dosha",
        desc: "A Kuja Dosha conflict is present and requires careful consideration or remedies."
      });
    }
  }

  const kootas = data.ashtaKoota || [];
  const lowKootas = kootas.filter(k => k.obtainedPoints === 0 && k.maxPoints > 0);
  
  lowKootas.forEach(k => {
    challenges.push({
      title: k.localizedKoota || k.koota,
      desc: "Scores indicate potential friction in this specific dimensional aspect."
    });
  });

  if (challenges.length === 0) return null;

  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0 flex-1 relative">
      <div className="mb-0 flex items-center justify-between border-b border-stone-100 pb-0">
        <h2 className="text-xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, "challenges")}
        </h2>
        <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
          <AlertCircle className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {challenges.map((c, idx) => (
          <div key={idx} className="bg-amber-50/30 border border-amber-100/50 p-4 rounded-2xl flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0">
              !
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest mb-1">{c.title}</h3>
              <p className="text-xs text-stone-500 font-medium leading-relaxed">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
