/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Calendar, Check } from "lucide-react";

interface VedicMuhurtaProps {
  data: any;
}

export const VedicMuhurta: React.FC<VedicMuhurtaProps> = ({ data }) => {
  return (
    <div className="space-y-4 font-sans text-xs">
      <span className="text-stone-400 font-bold block uppercase tracking-wider text-[10px]">
        Recommended Vedic Muhurtas (అనుకూల సమయములు)
      </span>
      
      <div className="space-y-3">
        {Array.isArray(data) ? (
          data.map((m: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-[#FAF9F5]/40 hover:bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#9C7c5D]/40 hover:shadow-[0_2px_12px_rgba(45,35,25,0.015)]"
            >
              <div>
                <div className="font-serif font-bold text-stone-850 text-[13.5px]" style={{ fontFamily: "Cinzel, serif" }}>
                  {m.activity} ({m.localizedActivity})
                </div>
                <div className="text-stone-500 block mt-2 font-sans font-medium flex flex-wrap gap-2 items-center">
                  <span>Recommended Windows:</span>
                  {m.timeRanges?.map((range: string, rIdx: number) => (
                    <code key={rIdx} className="font-mono text-[10.5px] bg-[#FAF8F5] border border-[#e8dfd3] px-2 py-0.5 rounded text-stone-705">
                      {range}
                    </code>
                  ))}
                </div>
              </div>
              
              <div className="text-right flex sm:flex-col justify-between items-center sm:items-end gap-2 shrink-0">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 flex items-center space-x-1 test-[10.5px]">
                  <Check className="w-3 h-3 text-emerald-600 mr-0.5" />
                  <span>Auspicious Alliance</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono font-semibold">Quality Index: {m.score}/100</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-stone-400 p-2 italic">No Muhurta data lists resolved.</div>
        )}
      </div>
    </div>
  );
};
