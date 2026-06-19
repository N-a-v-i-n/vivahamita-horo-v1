/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Clock } from "lucide-react";

interface VedicDashaProps {
  data: any;
}

export const VedicDasha: React.FC<VedicDashaProps> = ({ data }) => {
  return (
    <div className="space-y-6 font-sans text-xs">
      
      {/* Primary Mahadasha Overview Banner */}
      <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#9C7c5D]/25 flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
        <div>
          <span className="text-stone-400 block font-medium">Undergoing Mahadasha (మహాదశ)</span>
          <strong className="text-[#8C6D4F] text-lg font-serif" style={{ fontFamily: "Cinzel, serif" }}>
            {data.localizedMahadasha} Maha Dasa
          </strong>
        </div>
        <div className="text-right">
          <span className="text-stone-400 block font-medium">Remaining Period</span>
          <strong className="text-stone-800 text-base font-mono">{data.timeRemainingYears?.toFixed(2)} Years</strong>
        </div>
      </div>

      {/* Sequence list flow */}
      <div className="space-y-3.5">
        <span className="text-stone-500 font-bold block uppercase tracking-wider text-[10px]">
          Vimshottari Lifecycle Timeline Sequence (120 Years Cycle)
        </span>
        
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-thin">
          {data.timeline?.map((node: any, idx: number) => {
            const isCurrent = node.localizedLord?.toLowerCase() === data.localizedMahadasha?.toLowerCase() || idx === 0;
            return (
              <div 
                key={idx} 
                className={`flex-shrink-0 p-4 rounded-xl text-center min-w-[125px] border transition-all ${
                  isCurrent 
                    ? "bg-[#FAF8F5] border-[#9C7c5D]/40 shadow-md shadow-stone-100" 
                    : "bg-white border-stone-200/60"
                }`}
              >
                <div className="p-1 px-2 bg-stone-100 border border-stone-200/50 rounded-full text-[9px] text-stone-400 inline-block mb-1.5 font-mono">
                  Cycle #{idx + 1}
                </div>
                <span className="font-serif font-bold text-stone-850 block text-[13px] tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>
                  {node.localizedLord}
                </span>
                <span className="text-[10.5px] text-stone-400 block mt-1 font-mono font-semibold">{node.durationYears?.toFixed(1)} yrs</span>
                <span className="text-[9.5px] text-[#8C6D4F] font-bold block leading-tight font-mono mt-0.5">{node.startTime?.split("-")[0]} - {node.endTime?.split("-")[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
