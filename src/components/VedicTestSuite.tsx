/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Loader2, Database, Play, RefreshCw, Search, Check, CheckCircle } from "lucide-react";

interface VedicTestSuiteProps {
  loading: boolean;
  currentResponse: any;
  testCasesCount: number;
  setTestCasesCount: (val: number) => void;
  executeApiCall: (endpoint: string) => void;
  selectedTestCategory: string;
  setSelectedTestCategory: (val: string) => void;
  testSearchQuery: string;
  setTestSearchQuery: (val: string) => void;
}

export const VedicTestSuite: React.FC<VedicTestSuiteProps> = ({
  loading,
  currentResponse,
  testCasesCount,
  setTestCasesCount,
  executeApiCall,
  selectedTestCategory,
  setSelectedTestCategory,
  testSearchQuery,
  setTestSearchQuery
}) => {
  if (loading) {
    return (
      <div className="py-12 text-center text-stone-500 font-sans text-xs space-y-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#9C7c5D]" />
        <p className="text-[#8C6D4F] font-serif font-bold animate-pulse text-sm" style={{ fontFamily: "Cinzel, serif" }}>
          Evaluating celestial assertions...
        </p>
        <p className="text-stone-400 text-[11px] leading-relaxed max-w-sm mx-auto">
          Benchmarking orbital coordinates, divisional sub-harmonics, transit tables, and multi-language translation bindings in real-time.
        </p>
      </div>
    );
  }

  const hasSuiteData = currentResponse && Array.isArray(currentResponse.results);
  if (!hasSuiteData) {
    return (
      <div className="py-12 p-6 text-center font-sans text-xs space-y-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
        <div className="h-14 w-14 bg-[#9C7c5D]/10 border border-[#9C7c5D]/20 rounded-full flex items-center justify-center mx-auto text-[#8C6D4F]">
          <Database className="w-6 h-6" />
        </div>
        
        <div className="space-y-1.5">
          <p className="text-stone-850 font-serif font-bold text-sm uppercase tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>
            Astronomical & Textual Integrity Benchmarker
          </p>
          <p className="text-stone-500 text-[11px] leading-relaxed max-w-md mx-auto">
            Run standard and stress scenarios to cross-check lunar phases (tithis), sign entries (lagnas), nakshatra padas, and Sanskrit localized labels against mathematical invariants.
          </p>
        </div>

        {/* Picker */}
        <div className="space-y-2">
          <label className="text-[10px] text-stone-400 block uppercase tracking-wider font-bold">Select Scenario Assertions Stack Size</label>
          <div className="flex justify-center items-center gap-2 max-w-sm mx-auto bg-stone-55 p-1 rounded-xl border border-stone-200/80">
            <button
               type="button"
              onClick={() => setTestCasesCount(105)}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer font-mono font-bold text-[10px] ${
                testCasesCount === 105
                  ? "bg-white text-[#9C7c5D] shadow-xs"
                  : "text-stone-500 hover:text-stone-850"
              }`}
            >
              105 Assertions
            </button>
            <button
               type="button"
              onClick={() => setTestCasesCount(20000)}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer font-mono font-bold text-[10px] ${
                testCasesCount === 20000
                  ? "bg-[#9C7c5D]/10 text-[#856344]"
                  : "text-stone-500 hover:text-[#9C7c5D]"
              }`}
            >
              20k Scenarios
            </button>
            <button
               type="button"
              onClick={() => setTestCasesCount(50000)}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer font-mono font-bold text-[10px] ${
                testCasesCount === 50000
                  ? "bg-stone-100 text-stone-605"
                  : "text-stone-500 hover:text-stone-850"
              }`}
            >
              50k Stress
            </button>
          </div>
        </div>

        <button
          onClick={() => executeApiCall("/api/test-suite")}
          className="px-6 py-3 bg-[#9C7c5D] hover:bg-[#856344] text-white rounded-xl font-bold transition-all duration-200 cursor-pointer shadow-md inline-flex items-center space-x-2 justify-center"
        >
          <Play className="w-4 h-4 fill-current text-white shrink-0" />
          <span>Launch Verification Suite</span>
        </button>
      </div>
    );
  }

  const total = currentResponse.total || 0;
  const passed = currentResponse.passed || 0;
  const failed = currentResponse.failed || 0;
  const executionTimeMs = currentResponse.executionTimeMs || 0;
  const score = total > 0 ? Math.round((passed / total) * 100) : 100;
  const resultsList = currentResponse.results || [];

  const categories = [
    "All",
    "Astronomical Math Bounds",
    "Panchang & Luni-Solar",
    "Divisional Harmonic Charts",
    "Vimshottari Maha Dasha",
    "Multilingual Localization",
    "Vedic Doshas & Yogas",
    "Negative Robustness Checks"
  ];

  const getCountByCategory = (cat: string) => {
    if (cat === "All") return resultsList.length;
    return resultsList.filter((r: any) => r.category === cat).length;
  };

  const getPassedByCategory = (cat: string) => {
    if (cat === "All") return resultsList.filter((r: any) => r.passed).length;
    return resultsList.filter((r: any) => r.category === cat && r.passed).length;
  };

  const filteredResults = resultsList.filter((r: any) => {
    const matchesCategory = selectedTestCategory === "All" || r.category === selectedTestCategory;
    const matchesSearch = r.name.toLowerCase().includes(testSearchQuery.toLowerCase()) || 
                         r.assertionDetails.toLowerCase().includes(testSearchQuery.toLowerCase()) ||
                         r.id.includes(testSearchQuery) ||
                         r.category.toLowerCase().includes(testSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5 font-sans text-xs">
      
      {/* Test Dashboard stats header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-105 pb-3">
        <div>
          <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
            <span className="p-1 bg-[#9C7c5D]/10 text-[#846243] rounded-md"><Database className="w-4 h-4" /></span>
            <span>Astronomical Accuracy Verification Suite</span>
          </h3>
          <p className="text-[11px] text-stone-450 mt-1">
            Running dynamic constraints checking and boundary condition tests for celestial math models.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-[10px]">
            <button
               type="button"
              onClick={() => setTestCasesCount(105)}
              className={`px-2 py-1 rounded text-center transition-all cursor-pointer font-bold ${
                testCasesCount === 105 ? "bg-white text-stone-850" : "text-stone-450"
              }`}
            >
              105 Base
            </button>
            <button
               type="button"
              onClick={() => setTestCasesCount(20000)}
              className={`px-2 py-1 rounded text-center transition-all cursor-pointer font-bold ${
                testCasesCount === 20000 ? "bg-[#9C7c5D]/15 text-[#856344]" : "text-stone-450"
              }`}
            >
              20k Stress
            </button>
            <button
               type="button"
              onClick={() => setTestCasesCount(50000)}
              className={`px-2 py-1 rounded text-center transition-all cursor-pointer font-bold ${
                testCasesCount === 50000 ? "bg-[#9C7c5D]/20 text-[#856344]" : "text-stone-450"
              }`}
            >
              50k Max
            </button>
          </div>

          <button
            onClick={() => executeApiCall("/api/test-suite")}
            className="px-3.5 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-705 rounded-lg flex items-center space-x-1.5 font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Rerun tests</span>
          </button>
        </div>
      </div>

      {/* Stats row cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <span className="text-[9.5px] text-stone-450 uppercase font-bold tracking-wider font-sans">Math Invariance Metrics</span>
          <strong className="text-xs text-stone-850 block font-serif mt-1" style={{ fontFamily: "Cinzel, serif" }}>Astro-Mathematical Score:</strong>
          <div className="mt-2 text-xl font-extrabold text-emerald-700 font-mono flex items-baseline space-x-1">
            <span>{score}%</span>
            <span className="text-[10px] text-stone-400 font-sans font-medium">(Certified Precise)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <span className="text-[9.5px] text-stone-450 uppercase font-bold tracking-wider font-sans">Invariants checked</span>
          <strong className="text-xs text-stone-850 block font-serif mt-1" style={{ fontFamily: "Cinzel, serif" }}>Epoch Assertions Evaluated:</strong>
          <div className="mt-2 text-xl font-mono text-stone-800 font-bold flex items-baseline space-x-2">
            <span>{passed}/{total}</span>
            <span className="text-[10px] text-emerald-600 font-sans font-bold">Passed</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
          <span className="text-[9.5px] text-stone-450 uppercase font-bold tracking-wider font-sans">Execution latency</span>
          <strong className="text-xs text-stone-850 block font-serif mt-1" style={{ fontFamily: "Cinzel, serif" }}>Computation duration:</strong>
          <div className="mt-2 text-xl font-mono text-stone-600 font-bold">
            {executionTimeMs.toFixed(1)} ms
          </div>
        </div>

      </div>

      {/* Filter and Search Section */}
      <div className="space-y-3.5 pt-2">
        <label className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Filter Test Assertion Categories</label>
        
        <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
          {categories.map(cat => {
            const isSelected = selectedTestCategory === cat;
            const totalInCat = getCountByCategory(cat);
            const passedInCat = getPassedByCategory(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTestCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected 
                    ? "bg-[#FAF8F5] border-[#9C7c5D]/40 text-[#9C7c5D] font-extrabold" 
                    : "bg-white border-stone-200 text-stone-550 hover:text-stone-850 hover:bg-stone-50"
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-mono font-bold bg-stone-100 text-stone-500 rounded">
                  {passedInCat === totalInCat ? totalInCat : `${passedInCat}/${totalInCat}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={testSearchQuery}
            onChange={(e) => setTestSearchQuery(e.target.value)}
            placeholder="Search verified assertions (e.g. D9, Lagna, timezone bounds, etc.)..."
            className="w-full text-stone-800 text-xs bg-stone-50 p-2.5 pl-10 rounded-xl border border-stone-200 placeholder-stone-400 outline-none focus:border-[#9C7c5D]/85 transition-colors"
          />
        </div>
      </div>

      {/* Results logs drawer drawer list */}
      <div className="space-y-2">
        <span className="text-[10px] text-stone-450 uppercase tracking-widest font-bold block">Test Suite Integrity Logs</span>
        
        <div className="bg-white border border-stone-250 rounded-xl divide-y divide-stone-100 overflow-hidden font-mono text-[11px] max-h-[300px] overflow-y-auto scrollbar-thin">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-stone-450 font-sans">
              <span>No test cases matched your parameters search criteria.</span>
            </div>
          ) : (
            filteredResults.map((test: any) => {
              return (
                <div 
                  key={test.id} 
                  className="p-3 flex items-start sm:items-center justify-between hover:bg-stone-50/50 transition-colors gap-4"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 gap-1.5">
                      <span className="px-1.5 text-[9px] bg-stone-100 text-stone-500 rounded border border-stone-200 shrink-0 font-bold font-mono">#{test.id}</span>
                      <span className="text-stone-850 font-bold text-[11.5px] truncate font-sans">{test.name}</span>
                      <span className={`px-1.5 rounded text-[8.5px] uppercase tracking-wide shrink-0 font-extrabold border ${
                        test.type === "positive" 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                          : "bg-amber-50 text-[#8C6D4F] border-amber-150"
                      }`}>
                        {test.type}
                      </span>
                    </div>
                    <span className="text-stone-400 text-[10.5px] block font-sans break-all select-all">{test.assertionDetails}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider border ${
                      test.passed 
                        ? "bg-emerald-50 text-emerald-800 border-emerald-150" 
                        : "bg-red-50 text-red-700 border-red-150"
                    }`}>
                      {test.passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
