import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';

interface Props {
  data: MatchingResult;
  lang: string;
}

export const AshtakootaTable: React.FC<Props> = ({ data, lang }) => {
  const kootas = data.ashtaKoota || [];

  return (
    <div className="flex flex-col bg-white rounded-[32px] p-8 shadow-xl border border-stone-100 flex-1">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, "ashtakootaMatching")}
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-100">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-stone-50/80 text-stone-400 font-medium tracking-wider text-[10px] uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Koota (Attribute)</th>
              <th className="px-6 py-4 font-semibold text-center">Score</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {kootas.map((koota, index) => {
              const isExcellent = koota.obtainedPoints === koota.maxPoints;
              const isGood = (koota.obtainedPoints / koota.maxPoints) >= 0.5;
              
              return (
                <tr key={index} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-serif font-medium text-stone-800">{koota.localizedKoota || koota.koota}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-lg font-light text-stone-800">
                      {koota.obtainedPoints}<span className="text-xs text-stone-400">/{koota.maxPoints}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isExcellent ? 'bg-emerald-50 text-emerald-600' :
                      isGood ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {isExcellent ? 'Excellent' : isGood ? 'Favorable' : 'Challenging'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
