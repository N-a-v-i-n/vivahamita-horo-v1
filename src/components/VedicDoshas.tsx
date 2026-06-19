/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface VedicDoshasProps {
  data: any;
}

export const VedicDoshas: React.FC<VedicDoshasProps> = ({ data }) => {
  return (
    <div className="space-y-4 text-xs font-sans">
      <span className="text-stone-400 font-bold block uppercase tracking-wider text-[10px]">
        Affliction Audits & Harmonization Remedies (దోషములు)
      </span>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(data) ? (
          data.map((d: any, idx: number) => {
            const hasSeverity = d.hasDosha && d.severity !== "None";
            return (
              <div 
                key={idx} 
                className={`p-4.5 rounded-xl border transition-all ${
                  hasSeverity 
                    ? 'bg-red-50/20 border-red-200/60 shadow-[0_2px_8px_rgba(200,50,50,0.01)]' 
                    : 'bg-white border-stone-200/60 opacity-75'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-1.5">
                    {hasSeverity ? (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                    <span className="font-serif font-bold text-stone-900 text-xs" style={{ fontFamily: "Cinzel, serif" }}>
                      {d.name} ({d.localizedName})
                    </span>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                    d.severity === 'High' ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' :
                    d.severity === 'Medium' ? 'bg-amber-50 text-[#8C6D4F] border-amber-200' : 'bg-stone-50 text-stone-500 border-stone-150'
                  }`}>
                    {d.severity} Status
                  </span>
                </div>
                
                <p className="text-stone-500 text-[11px] mb-2 leading-relaxed font-sans">{d.description}</p>
                
                {d.remedies && d.remedies.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-stone-105">
                    <span className="text-[9.5px] uppercase text-[#8C6D4F] font-bold block mb-1">Recommended Harmonization:</span>
                    <p className="text-[10.5px] text-stone-605 italic font-sans">{d.remedies}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-stone-400 p-2 italic font-sans">No diagnostic dosha statistics retrieved.</div>
        )}
      </div>
    </div>
  );
};
