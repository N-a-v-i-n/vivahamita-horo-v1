/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Calendar, BookOpen, Gem } from "lucide-react";

interface VedicNumerologyProps {
  data: any;
}

export const VedicNumerology: React.FC<VedicNumerologyProps> = ({ data }) => {
  return (
    <div className="space-y-6 font-sans text-xs">
      
      {/* DOB Attributes Header Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs text-center">
          <span className="text-stone-400 block mb-1 font-sans text-[10px] font-bold uppercase tracking-wider">Life Path Number</span>
          <strong className="text-2xl text-[#8C6D4F] font-serif" style={{ fontFamily: "Cinzel, serif" }}>{data.lifePath}</strong>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs text-center">
          <span className="text-stone-400 block mb-1 font-sans text-[10px] font-bold uppercase tracking-wider">Expression Number</span>
          <strong className="text-2xl text-[#8C6D4F] font-serif" style={{ fontFamily: "Cinzel, serif" }}>{data.destiny}</strong>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs text-center">
          <span className="text-stone-400 block mb-1 font-sans text-[10px] font-bold uppercase tracking-wider">Auspicious Syllables</span>
          <span className="text-xs font-semibold text-stone-850 block truncate mt-1.5 font-mono">{data.nameAstrology?.suggestedSyllables?.join(", ")}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs text-center">
          <span className="text-stone-400 block mb-1 font-sans text-[10px] font-bold uppercase tracking-wider">Lucky Gemstone</span>
          <strong className="text-xs text-emerald-700 block mt-1.5 font-sans font-bold flex items-center justify-center space-x-1">
            <Gem className="w-3.5 h-3.5 text-emerald-600 mr-0.5" />
            <span>{data.luckyGem}</span>
          </strong>
        </div>

      </div>

      {/* Suggested Baby Names */}
      <div className="space-y-3 pt-2">
        <span className="text-stone-500 font-bold block uppercase tracking-wider text-[10px] flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#9C7c5D]" />
          <span>Recommended Vedic Baby Names</span>
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.nameAstrology?.babyNames?.map((b: any, idx: number) => (
            <div key={idx} className="bg-stone-50/50 p-3.5 rounded-xl border border-stone-200 flex justify-between items-center hover:bg-white hover:border-[#9C7c5D]/30 transition-all">
              <div>
                <span className="font-serif font-bold text-stone-850 block text-[12.5px] tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>{b.name}</span>
                <span className="text-[10.5px] text-stone-400 font-sans block mt-0.5 leading-normal">{b.meaning}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-sans border ${
                b.gender === 'Boy' 
                  ? 'bg-blue-50 text-blue-700 border-blue-100' 
                  : 'bg-pink-50 text-pink-700 border-pink-100'
              }`}>
                {b.gender}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
