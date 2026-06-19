/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Sun, Clock, Moon, Award } from "lucide-react";

interface VedicPanchangProps {
  data: any;
}

export const VedicPanchang: React.FC<VedicPanchangProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
        
        {/* Panchanga Core Limbs */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(40,30,20,0.01)]">
          <div className="text-stone-800 font-serif font-bold text-sm border-b border-stone-100 pb-2.5 flex items-center justify-between" style={{ fontFamily: "Cinzel, serif" }}>
            <span className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#9C7c5D]" />
              <span>Solar-Lunar Limbs (పంచాంగం)</span>
            </span>
            <span className="text-[10px] text-[#9C7c5D] font-mono font-semibold">Localized & Ephemeris Bound</span>
          </div>

          <div className="space-y-3.5 text-stone-700">
            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-stone-400 font-medium">Tithi (తిథి):</span>
              <span className="font-bold text-stone-900">{data.tithi?.localizedName} ({data.tithi?.pakshaLocalized} Paksha)</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-stone-400 font-medium">Nakshatra (నక్షత్రం):</span>
              <span className="font-bold text-stone-900">{data.nakshatra?.localizedName}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-stone-400 font-medium">Yoga (యోగం):</span>
              <span className="font-bold text-stone-900">{data.yoga?.localizedName}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-stone-400 font-medium">Karana (కరణం):</span>
              <span className="font-bold text-stone-900">{data.karana?.localizedName}</span>
            </div>
          </div>
        </div>

        {/* Day parts, celestial limits */}
        <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-[0_4px_20px_rgba(40,30,20,0.01)]">
          <div className="text-stone-800 font-serif font-bold text-sm border-b border-stone-100 pb-2.5 flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
            <Sun className="w-4 h-4 text-[#9C7c5D]" />
            <span>Day-light & Astronomical Windows</span>
          </div>

          <div className="space-y-3.5 text-stone-700">
            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-stone-400 font-medium">Sunrise / Sunset:</span>
              <span className="font-extrabold text-stone-800">{data.sunrise} AM / {data.sunset} PM</span>
            </div>
            
            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-[#bf4343] font-semibold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 mr-0.5" />
                <span>Rahu Kalam:</span>
              </span>
              <span className="font-bold text-[#bf4343] bg-red-50 px-2 py-0.5 rounded border border-red-100/50">{data.rahuKalam?.start} to {data.rahuKalam?.end}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-stone-50">
              <span className="text-stone-400 font-medium font-sans">Yama / Gulikai:</span>
              <span className="font-semibold text-stone-700">{data.yamagandam?.start} / {data.gulikai?.start}</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                <Moon className="w-3.5 h-3.5 mr-0.5" />
                <span>Brahma Muhurta:</span>
              </span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{data.brahmaMuhurta?.start} to {data.brahmaMuhurta?.end}</span>
            </div>
          </div>
        </div>

      </div>

      {data.explanation && (
        <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#9C7c5D]/20 text-xs text-stone-650 leading-relaxed font-sans shadow-inner">
          <span className="font-serif font-bold text-[#8C6D4F] text-[13px] block mb-1.5 flex items-center space-x-1.5" style={{ fontFamily: "Cinzel, serif" }}>
            <Award className="w-4 h-4 text-[#9C7c5D]" />
            <span>Scholar Astro Alignment Interpretation</span>
          </span>
          <p className="font-sans text-stone-600 leading-relaxed">{data.explanation}</p>
        </div>
      )}
    </div>
  );
};
