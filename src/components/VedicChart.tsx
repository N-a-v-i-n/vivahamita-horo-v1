/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Layers, Compass, Sun, MapPin } from "lucide-react";
import { RASHI_NAMES_LOCALIZED, RASHI_LORDS, BHAVA_SIGNIFICANCES } from "../types";

interface VedicChartProps {
  data: any;
  selectedLanguage: string;
}

export const VedicChart: React.FC<VedicChartProps> = ({ data, selectedLanguage }) => {
  const [chartStyle, setChartStyle] = useState<"south" | "north">("south");
  const [vargaSelection, setVargaSelection] = useState<string>("D1");

  const signLabels = RASHI_NAMES_LOCALIZED[selectedLanguage] || RASHI_NAMES_LOCALIZED["en"];
  const vargaLagnaLong = data.lagna?.longitude || 0;

  // Resolve Lagna index for a given varga
  const resolveVargaLagnaRasiIndex = (long: number, code: string) => {
    const rasiIndex = Math.floor(long / 30.0);
    if (code === "D1") return rasiIndex;
    if (code === "D9") {
      const element = rasiIndex % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water
      let startSign = 0;
      if (element === 0) startSign = 0;
      else if (element === 1) startSign = 9;
      else if (element === 2) startSign = 6;
      else startSign = 3;
      const part = Math.floor((long % 30) / 3.333333);
      return (startSign + part) % 12;
    }
    const dNum = parseInt(code.replace("D", "")) || 1;
    const step = 30.0 / dNum;
    const part = Math.floor((long % 30.0) / step);
    return (rasiIndex * dNum + part) % 12;
  };

  const selectedVargaLagnaRasi = resolveVargaLagnaRasiIndex(vargaLagnaLong, vargaSelection);

  // Discover divisional charts
  const activeDivisionalObj = data.divisionalCharts?.find((v: any) => v.code === vargaSelection) || {
    name: "Rasi Chart",
    code: "D1",
    description: "Core rasi chart representing physical presence and outer life flow",
    points: data.planets?.map((p: any) => ({
      planet: p.name,
      localizedPlanet: p.localizedName,
      longitude: p.longitude,
      signIndex: p.rasiIndex,
      signName: p.rasiName,
      signLocalizedName: p.rasiLocalizedName,
      house: p.house
    })) || []
  };

  const activePoints = activeDivisionalObj.points || [];

  // Map planets to rasi indices (0 to 11)
  const placementsByRasi: Record<number, { abbr: string; name: string; isLagna?: boolean }[]> = {};
  for (let r = 0; r < 12; r++) placementsByRasi[r] = [];

  // Add Lagna / Ascendant
  placementsByRasi[selectedVargaLagnaRasi].push({
    abbr: selectedLanguage === "te" ? "లగ్" : selectedLanguage === "hi" ? "लग्न" : "Asc",
    name: "Lagna / Ascendant",
    isLagna: true
  });

  // Add planets
  activePoints.forEach((p: any) => {
    const planetAbbrs: Record<string, string> = {
      Sun: selectedLanguage === "te" ? "రవి" : selectedLanguage === "hi" ? "सूर्य" : "Su",
      Moon: selectedLanguage === "te" ? "చం" : selectedLanguage === "hi" ? "चन्द्र" : "Mo",
      Mars: selectedLanguage === "te" ? "కు" : selectedLanguage === "hi" ? "मंगल" : "Ma",
      Mercury: selectedLanguage === "te" ? "బు" : selectedLanguage === "hi" ? "बुध" : "Me",
      Jupiter: selectedLanguage === "te" ? "గు" : selectedLanguage === "hi" ? "गुरु" : "Ju",
      Venus: selectedLanguage === "te" ? "శు" : selectedLanguage === "hi" ? "शुक्र" : "Ve",
      Saturn: selectedLanguage === "te" ? "శ" : selectedLanguage === "hi" ? "शनि" : "Sa",
      Rahu: selectedLanguage === "te" ? "రా" : selectedLanguage === "hi" ? "राहु" : "Ra",
      Ketu: selectedLanguage === "te" ? "కే" : selectedLanguage === "hi" ? "केतु" : "Ke"
    };
    const abbr = planetAbbrs[p.planet] || p.planet.slice(0, 2);
    if (p.planet !== "Lagna") {
      placementsByRasi[p.signIndex].push({
        abbr,
        name: p.planet
      });
    }
  });

  return (
    <div className="space-y-6">
      {/* Controls Segment */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/60 flex flex-wrap gap-4 items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-stone-600">Chart Layout:</span>
          <div className="bg-stone-200/50 p-0.5 rounded-lg flex border border-stone-200">
            <button
              type="button"
              onClick={() => setChartStyle("south")}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
                chartStyle === "south" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              South Indian Grid
            </button>
            <button
              type="button"
              onClick={() => setChartStyle("north")}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer transition-all ${
                chartStyle === "north" ? "bg-white text-stone-800 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              North Indian Diamond
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="font-semibold text-stone-600">Divisional Chart (Varga):</span>
          <select
            value={vargaSelection}
            onChange={(e) => setVargaSelection(e.target.value)}
            className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-700 focus:outline-none focus:border-[#9C7c5D]/80 font-sans cursor-pointer shadow-xs"
          >
            <option value="D1">D1 Rasi Chart (Physical/Vital)</option>
            <option value="D9">D9 Navamsa Chart (Soul & Dharma Partner)</option>
            <option value="D2">D2 Hora Chart (Wealth & Liquid Assets)</option>
            <option value="D3">D3 Drekkana (Courage & Siblings)</option>
            <option value="D7">D7 Saptamsa (Progeny & Lineage)</option>
            <option value="D10">D10 Dasamsa (Career Authority & Social Impact)</option>
            <option value="D12">D12 Dwadasamsa (Parents & Genetic Heritage)</option>
            <option value="D30">D30 Trimsamsa (Evil elements & Obstacles)</option>
            <option value="D60">D60 Shashtyamsa (Past Incarnation Karma)</option>
          </select>
        </div>
      </div>

      {/* Varga Info Block */}
      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#9C7c5D]/25 text-xs">
        <h4 className="font-serif text-[13px] font-bold text-stone-850 mb-1" style={{ fontFamily: "Cinzel, serif" }}>
          {activeDivisionalObj.name} ({activeDivisionalObj.code}) Overview
        </h4>
        <p className="text-stone-500 leading-relaxed font-sans">{activeDivisionalObj.description}</p>
      </div>

      {/* Grid Canvas */}
      <div className="p-6 bg-[#FAF9F5]/40 rounded-2xl border border-stone-100 flex items-center justify-center">
        {chartStyle === "south" ? (
          /* South Indian Rasi Grid */
          <div className="grid grid-cols-4 grid-rows-4 gap-2.5 bg-white p-4 rounded-xl border border-stone-200/80 aspect-square w-full max-w-[420px] text-xs relative select-none shadow-[0_4px_24px_rgba(40,30,20,0.015)]">
            {/* Center block */}
            <div className="col-start-2 col-span-2 row-start-2 row-span-2 bg-[#FAF8F5]/85 p-3 rounded-lg border border-[#e8dfd3] flex flex-col justify-center items-center text-center">
              <span className="p-0.5 px-2 bg-[#9C7c5D]/10 text-[#856344] border border-[#e8dfd3] text-[9.5px] font-mono font-bold rounded-full mb-1">
                {vargaSelection}
              </span>
              <span className="font-serif font-bold text-stone-800 text-[11px]" style={{ fontFamily: "Cinzel, serif" }}>
                Nirayana Kundali
              </span>
              <p className="text-[9px] text-stone-400 mt-1 uppercase font-mono tracking-wider font-semibold">
                {data.lagna?.signName} Lagna
              </p>
            </div>

            {/* Cell placement mapper */}
            {[
              { idx: 11, col: "col-start-1 row-start-1" }, // Pisces
              { idx: 0,  col: "col-start-2 row-start-1" }, // Aries
              { idx: 1,  col: "col-start-3 row-start-1" }, // Taurus
              { idx: 2,  col: "col-start-4 row-start-1" }, // Gemini
              { idx: 3,  col: "col-start-4 row-start-2" }, // Cancer
              { idx: 4,  col: "col-start-4 row-start-3" }, // Leo
              { idx: 5,  col: "col-start-4 row-start-4" }, // Virgo
              { idx: 6,  col: "col-start-3 row-start-4" }, // Libra
              { idx: 7,  col: "col-start-2 row-start-4" }, // Scorpio
              { idx: 8,  col: "col-start-1 row-start-4" }, // Sagittarius
              { idx: 9,  col: "col-start-1 row-start-3" }, // Capricorn
              { idx: 10, col: "col-start-1 row-start-2" }  // Aquarius
            ].map(({ idx, col }) => {
              const isLagnaCell = idx === selectedVargaLagnaRasi;
              const cellPlanets = placementsByRasi[idx] || [];
              const signNameText = signLabels[idx];

              return (
                <div
                  key={idx}
                  className={`relative rounded-lg p-2.5 flex flex-col justify-between transition-colors border ${col} ${
                    isLagnaCell 
                      ? "bg-[#FAF8F5] border-[#9C7c5D]/45 shadow-[0_2px_12px_rgba(156,124,93,0.04)]" 
                      : "bg-white hover:bg-stone-50 border-stone-200/70"
                  }`}
                >
                  <span className="font-bold text-[9px] text-stone-400 leading-none truncate select-none uppercase tracking-wider font-sans">
                    {signNameText.split(" ")[0]}
                  </span>
                  
                  <div className="flex flex-wrap gap-1 mt-1 justify-start">
                    {cellPlanets.map((pt, pIdx) => (
                      <span
                        key={pIdx}
                        title={pt.name}
                        className={`px-1.5 py-0.5 leading-none rounded-md font-bold text-[9.5px] ${
                          pt.isLagna 
                            ? "bg-[#9C7c5D] text-white" 
                            : "bg-stone-100 text-stone-700 border border-stone-200/50"
                        }`}
                      >
                        {pt.abbr}
                      </span>
                    ))}
                  </div>

                  {isLagnaCell && (
                    <div className="absolute top-1.5 right-1.5">
                      <span className="w-1.5 h-1.5 bg-[#9C7c5D] rounded-full inline-block animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* North Indian Diamond Layout Chart */
          <div className="relative w-full max-w-[420px] aspect-square">
            <svg viewBox="0 0 400 400" className="w-full h-full bg-white border border-stone-200 rounded-xl shadow-[0_4px_24px_rgba(40,30,20,0.015)] font-sans select-none">
              <line x1="0" y1="0" x2="400" y2="400" stroke="#ebdccb" strokeWidth="1.5" />
              <line x1="400" y1="0" x2="0" y2="400" stroke="#ebdccb" strokeWidth="1.5" />
              <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="#d5c1ac" strokeWidth="1.5" />
              <rect x="0" y="0" width="400" height="400" fill="none" stroke="#9C7c5D" strokeWidth="2" />

              {[
                { houseNo: 1, textY: 90, rasiX: 200, rasiY: 130 },
                { houseNo: 2, textY: 50, rasiX: 130, rasiY: 40 },
                { houseNo: 3, textY: 100, rasiX: 40, rasiY: 130 },
                { houseNo: 4, textY: 190, rasiX: 100, rasiY: 230 },
                { houseNo: 5, textY: 320, rasiX: 40, rasiY: 270 },
                { houseNo: 6, textY: 350, rasiX: 130, rasiY: 360 },
                { houseNo: 7, textY: 310, rasiX: 200, rasiY: 345 },
                { houseNo: 8, textY: 350, rasiX: 270, rasiY: 360 },
                { houseNo: 9, textY: 320, rasiX: 360, rasiY: 270 },
                { houseNo: 10, textY: 190, rasiX: 300, rasiY: 230 },
                { houseNo: 11, textY: 100, rasiX: 360, rasiY: 130 },
                { houseNo: 12, textY: 50, rasiX: 270, rasiY: 40 }
              ].map(({ houseNo, textY, rasiX, rasiY }) => {
                const houseRasiIdx = (selectedVargaLagnaRasi + (houseNo - 1)) % 12;
                const rasiTraditionalSign = houseRasiIdx + 1;
                
                const housePlanets = placementsByRasi[houseRasiIdx] || [];
                const planetsString = housePlanets.map(p => p.abbr).join(" | ");

                const isLagnaHouse = houseNo === 1;

                return (
                  <g key={houseNo} className="transition-all">
                    {/* Sign index (Traditional astrology) */}
                    <text
                      x={rasiX}
                      y={rasiY}
                      textAnchor="middle"
                      className="fill-stone-400 font-mono font-bold text-[10px]"
                    >
                      {rasiTraditionalSign}
                    </text>

                    {/* Planets inside house */}
                    <text
                      x={rasiX === 40 ? 55 : rasiX === 360 ? 345 : 200}
                      y={textY}
                      textAnchor="middle"
                      className={`font-sans font-bold text-[11px] ${
                        isLagnaHouse ? "fill-[#9C7c5D]" : "fill-stone-700"
                      }`}
                    >
                      {planetsString || "—"}
                    </text>

                    {/* House ID */}
                    <text
                      x={rasiX === 40 ? 25 : rasiX === 360 ? 375 : rasiX}
                      y={rasiY + 12}
                      textAnchor="middle"
                      className="fill-stone-300 italic text-[8.5px] font-sans font-medium"
                    >
                      H{houseNo}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Houses Detailed Deck */}
      <div className="space-y-3 pt-4">
        <h4 className="text-stone-800 font-serif font-bold text-[15px] flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
          <Layers className="w-4.5 h-4.5 text-[#9C7c5D]" />
          <span>Vedas astrological houses Analysis</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BHAVA_SIGNIFICANCES.map((h, i) => {
            const houseRasiIdx = (selectedVargaLagnaRasi + i) % 12;
            const signText = signLabels[houseRasiIdx];
            const houseLord = RASHI_LORDS[houseRasiIdx];
            const housePlanets = placementsByRasi[houseRasiIdx]?.filter(p => !p.isLagna) || [];

            return (
              <div key={i} className="bg-white rounded-xl border border-stone-200/75 p-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-stone-350 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-stone-800 font-serif font-bold text-xs" style={{ fontFamily: "Cinzel, serif" }}>{h.name}</span>
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#e8dfd3] text-[#8C6D4F] text-[9.5px] font-sans font-bold">
                      {signText.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 mb-3 font-mono leading-relaxed">
                    Lord: <strong className="text-stone-600">{houseLord}</strong> • {h.key}
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-2 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium text-[9.5px] uppercase tracking-wider">Occupying planets:</span>
                  <div className="flex flex-wrap gap-1">
                    {housePlanets.length > 0 ? (
                      housePlanets.map((p, pIdx) => (
                        <span key={pIdx} className="px-2 py-0.5 rounded bg-[#9C7c5D]/10 text-[#856344] text-[10px] font-bold border border-[#9C7c5D]/15 font-sans">
                          {p.abbr}
                        </span>
                      ))
                    ) : (
                      <span className="text-stone-300 font-sans text-[10px] italic">Void</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Numerical Coordinate Table */}
      <div className="space-y-3 pt-6 border-t border-stone-100">
        <h4 className="text-stone-800 font-serif font-bold text-[15px]" style={{ fontFamily: "Cinzel, serif" }}>
          Ascending Longitudes & Star Placements Directory
        </h4>
        <div className="overflow-x-auto border border-stone-200/70 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <table className="min-w-full divide-y divide-stone-200 text-xs font-sans bg-white">
            <thead className="bg-[#FAF8F5]">
              <tr className="text-stone-500 font-semibold text-left">
                <th className="px-4 py-3">Celestial Unit (గ్రహము)</th>
                <th className="px-4 py-3">Decimal Position</th>
                <th className="px-4 py-3">Rashi Sign</th>
                <th className="px-4 py-3">Nakshatra Division & Pada</th>
                <th className="px-4 py-3">Dignity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {data.planets?.map((p: any, idx: number) => (
                <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-stone-900">{p.localizedName}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-stone-500">{p.longitude?.toFixed(2)}°</td>
                  <td className="px-4 py-3 text-[#8C6D4F] font-bold">{p.rasiLocalizedName}</td>
                  <td className="px-4 py-3">{p.nakshatraLocalizedName} (Pāda {p.pada})</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      p.dignity === 'Exalted' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : p.dignity === 'Debilitated' 
                          ? 'bg-red-50 text-red-650 border-red-100' 
                          : 'bg-stone-100 text-stone-600 border-stone-200/40'
                    }`}>
                      {p.dignity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
