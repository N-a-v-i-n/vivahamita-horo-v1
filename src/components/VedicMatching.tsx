/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Heart, Sparkles, AlertCircle, Calendar } from "lucide-react";

interface VedicMatchingProps {
  data: any;
}

export const VedicMatching: React.FC<VedicMatchingProps> = ({ data }) => {
  return (
    <div className="space-y-6 font-sans text-xs">
      
      {/* Three Pillar Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Compatibility Percent */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-center flex flex-col justify-center items-center">
          <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Ashta Koota Score</span>
          <div className="text-4xl font-extrabold font-sans text-pink-500 my-2.5">{data.compatibilityScore}%</div>
          <p className="text-[10.5px] text-stone-500 font-mono font-medium">{data.marriageScore} of 36 gunas aligned</p>
        </div>

        {/* Marriage Pillars */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.015)]">
          <div className="text-stone-700 font-serif font-bold text-xs mb-3 border-b border-stone-100 pb-1.5" style={{ fontFamily: "Cinzel, serif" }}>
            Vedic Welfare Metrics
          </div>
          <div className="space-y-2 text-[11px] text-stone-650">
            <div className="flex justify-between">
              <span className="text-stone-400">Progeny Wellness:</span>
              <span className="font-mono font-bold text-stone-800">{data.childrenScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Mutual Longevity:</span>
              <span className="font-mono font-bold text-stone-800">{data.longevityScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Financial Growth:</span>
              <span className="font-mono font-bold text-stone-800">{data.financeScore}</span>
            </div>
          </div>
        </div>

        {/* Kuja / Mars dosha */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.015)]">
          <div className="text-stone-700 font-serif font-bold text-xs mb-3 border-b border-stone-100 pb-1.5" style={{ fontFamily: "Cinzel, serif" }}>
            Mars (Kuja) Alliance
          </div>
          <div className="space-y-2 text-[11px] text-stone-650">
            <div className="flex justify-between items-center">
              <span className="text-stone-400">Manglik Status:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                data.doshaMatching?.hasManglikDoshaConflict 
                  ? "bg-red-50 text-red-700 border-red-200" 
                  : "bg-emerald-50 text-emerald-800 border-emerald-150"
              }`}>
                {data.doshaMatching?.hasManglikDoshaConflict ? "Dosha Conflict" : "Symmetric/Safe"}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-stone-400">Cancellation Applied:</span>
              <span className={`font-bold ${data.doshaMatching?.isCancelled ? "text-emerald-700" : "text-stone-400"}`}>
                {data.doshaMatching?.isCancelled ? "Yes (Kuja cancel)" : "None"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Symmetrical written report */}
      <div className="p-5 rounded-xl bg-[#FAF8F5] border border-pink-200/50 text-stone-750 font-sans shadow-xs mt-3">
        <strong className="text-pink-650 text-xs font-serif block mb-1.5 uppercase tracking-wider" style={{ fontFamily: "Cinzel, serif" }}>
          Horoscope Marriage Alliance Verdict
        </strong>
        <p className="leading-relaxed text-stone-605 text-[11.5px] font-sans font-medium">{data.report}</p>
      </div>

      {/* Ashta Koota Tables */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/85 space-y-4">
        <h4 className="text-stone-800 font-serif font-bold text-sm border-b border-stone-100 pb-3 flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
          <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>Ashta Koota Compatibility Grid (ఆష్టకూట గుణ మేళనము)</span>
        </h4>
        <div className="overflow-x-auto border border-stone-100 rounded-xl shadow-xs">
          <table className="min-w-full divide-y divide-[#FAF8F5] text-[11.5px] text-stone-700 font-sans bg-white">
            <thead className="bg-[#FAF8F5]">
              <tr className="border-b border-stone-200/60 font-semibold text-stone-500 text-left">
                <th className="px-4 py-3">Ashta Koota Name</th>
                <th className="px-4 py-3">Maximum Limit</th>
                <th className="px-4 py-3">Gained Points</th>
                <th className="px-4 py-3">Harmonic Verdict</th>
                <th className="px-4 py-3">Vedic Astrological Significator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-850">
              {data.ashtaKoota?.map((k: any, idx: number) => {
                const ratio = k.obtainedPoints / k.maxPoints;
                const statusClass = ratio >= 0.8 
                  ? "text-emerald-700 bg-emerald-50 border-emerald-100" 
                  : ratio >= 0.5 
                    ? "text-[#8C6D4F] bg-[#FAF8F5] border-[#e8dfd3]" 
                    : "text-red-700 bg-red-50 border-red-100";
                return (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3 font-bold text-stone-800">{k.koota} ({k.localizedKoota})</td>
                    <td className="px-4 py-3 font-mono text-stone-400">{k.maxPoints} pts</td>
                    <td className="px-4 py-3 font-mono font-bold text-stone-900">{k.obtainedPoints} pts</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-[9.5px] font-bold ${statusClass}`}>
                        {k.obtainedPoints === k.maxPoints ? "Perfect" : k.obtainedPoints > 0 ? "Satisfied" : "Afflicted Clash"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-xs leading-relaxed max-w-sm">{k.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ten Poruthams Grid (South Indian Style) */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/85 space-y-4">
        <h4 className="text-stone-800 font-serif font-bold text-sm border-b border-stone-100 pb-3 flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
          <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>Ten Dynamic Poruthams (పది పొరుత్తములు)</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {data.southIndianPorutham?.map((p: any, idx: number) => (
            <div key={idx} className="bg-stone-50/50 p-4 rounded-xl border border-stone-205 flex items-start justify-between hover:bg-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.005)]">
              <div className="space-y-1.5 pr-4">
                <span className="font-bold text-stone-800 block">{p.name} ({p.localizedName})</span>
                <span className="text-[11px] text-stone-400 block leading-relaxed">{p.description}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[9.5px] font-extrabold border ${
                p.status === "Uttama" ? "bg-emerald-55 text-emerald-700 border-emerald-100" :
                p.status === "Madhyama" ? "bg-[#FAF8F5] text-[#8C6D4F] border-[#e8dfd3]" : "bg-red-50 text-red-650 border-red-100"
              }`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
