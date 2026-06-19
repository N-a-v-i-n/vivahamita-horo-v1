/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Compass, 
  Terminal, 
  Copy, 
  Check, 
  Cpu, 
  AlertCircle
} from "lucide-react";

interface EndpointDoc {
  path: string;
  method: string;
  description: string;
  payload: any;
}

const ENDPOINTS: EndpointDoc[] = [
  {
    path: "/api/panchang",
    method: "POST",
    description: "Computes personalized solar/lunar times, Rahu Kalam, and tithi classifications.",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en",
      explain: true
    }
  },
  {
    path: "/api/chart",
    method: "POST",
    description: "Generates D1 Rasi and D9 Navamsa divisional chart points.",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    }
  },
  {
    path: "/api/matching",
    method: "POST",
    description: "Evaluates comprehensive Ashta Koota Horoscope compatibility (Guna Milan scored out of 36).",
    payload: {
      boy: {
        year: 1995,
        month: 6,
        day: 15,
        hour: 8,
        minute: 30,
        latitude: 17.385,
        longitude: 78.486,
        timezone: 5.5,
        ayanamsa: "Lahiri"
      },
      girl: {
        year: 1997,
        month: 8,
        day: 20,
        hour: 14,
        minute: 15,
        latitude: 13.0827,
        longitude: 80.2707,
        timezone: 5.5,
        ayanamsa: "Lahiri"
      },
      lang: "en"
    }
  },
  {
    path: "/api/dasha",
    method: "POST",
    description: "Outlines Vimshottari Mahadasha periods timeline starting from transit lunar nakshatras.",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    }
  },
  {
    path: "/api/dosha",
    method: "POST",
    description: "Audits birth planetary afflictions such as Manglik, Guru Chandal, or Kala Sarpa configurations.",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    }
  },
  {
    path: "/api/muhurta",
    method: "POST",
    description: "Finds auspicious time windows for property acquisitions, business, and vows.",
    payload: {
      year: 2026,
      month: 6,
      day: 19,
      hour: 12,
      minute: 0,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri",
      lang: "en"
    }
  },
  {
    path: "/api/numerology",
    method: "POST",
    description: "Computes destiny indexes, life path numbers, and star-based favorable baby name rules.",
    payload: {
      name: "Aarav Kumar",
      dob: {
        year: 1995,
        month: 6,
        day: 15
      },
      lang: "en"
    }
  },
  {
    path: "/api/test-suite",
    method: "POST",
    description: "Executes our internal high-accuracy 105 mathematical assertions test suite.",
    payload: {
      cases: 105
    }
  }
];

export default function App() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans antialiased flex flex-col justify-between selection:bg-stone-700 selection:text-white">
      {/* Upper Status Banner */}
      <header className="border-b border-stone-800 bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/25 rounded-lg text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-base font-bold tracking-tight text-stone-100">
                  Vivahamitra API Platform
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-stone-800 text-stone-300 rounded border border-stone-750">
                  v2.0 Core
                </span>
              </div>
              <p className="text-[10px] text-stone-400">Swiss Ephemeris Astronomy REST Service (No-Auth)</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-900/50 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>API Only Engine</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-4 py-12 flex-1">
        {/* Blocked UI Alert Box */}
        <div className="bg-stone-955 border-2 border-stone-800 rounded-xl p-6 mb-10 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono">
              Graphical User Interface Blocked
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed max-w-2xl">
              This deployment is configured as a <span className="text-stone-200 font-bold">headless computational service</span>. Interactive forms and visual dashboards have been compiled structures offline for maximum compute speed. All astrology and planetary calculation requests should be dispatched directly to the active REST API endpoints detailed below.
            </p>
          </div>
        </div>

        {/* API endpoints block */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Computational REST Routes</span>
            </h3>
            <span className="text-[10px] font-mono text-stone-500">8 AVAILABLE OPERATIONS</span>
          </div>

          <div className="space-y-6">
            {ENDPOINTS.map((doc, idx) => {
              const curlCommand = `curl -X POST "${window.location.origin}${doc.path}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(doc.payload, null, 2).replace(/\n/g, "\n  ")}'`;

              return (
                <div key={idx} className="bg-stone-950 rounded-xl border border-stone-800 overflow-hidden">
                  {/* Route Header */}
                  <div className="px-5 py-4 bg-stone-930 border-b border-stone-805 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {doc.method}
                        </span>
                        <span className="text-xs font-bold text-stone-200">{doc.path}</span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{doc.description}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(curlCommand, idx)}
                      className="self-start sm:self-center p-1.5 px-3 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white rounded text-[10px] flex items-center space-x-1.5 transition-all cursor-pointer font-mono border border-stone-700"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied Snippet</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-stone-400" />
                          <span>Copy cURL</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code snippet display */}
                  <div className="p-4 bg-stone-955 overflow-x-auto">
                    <pre className="text-[10.5px] leading-5 text-amber-200/90 font-mono whitespace-pre select-all">
                      {curlCommand}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-805 bg-stone-950 py-6 text-center text-[10px] text-stone-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Vivahamitra API Engine. Powered by High-Accuracy Ephemeris Math Core.</p>
          <div className="flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-emerald-500" />
            <span className="font-mono text-emerald-500">Vedic Compute Sandbox Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
