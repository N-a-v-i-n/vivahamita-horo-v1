import React, { useState, useEffect } from "react";
import {
  Compass,
  Terminal,
  Copy,
  Check,
  Cpu,
  AlertCircle,
  Play,
  Moon,
  Sun,
  Activity,
  Code2,
  Database,
  Globe2,
  Sparkles,
  ChevronRight,
  Download
} from "lucide-react";
import { ReportContainer } from "./components/report/ReportContainer";
import { useGeneratePdf } from "./hooks/useGeneratePdf";

interface EndpointDoc {
  path: string;
  method: string;
  description: string;
  payload: any;
  category: string;
}

const ENDPOINTS: EndpointDoc[] = [
  {
    path: "/api/panchang",
    method: "POST",
    description: "Computes personalized solar/lunar times, Rahu Kalam, and tithi classifications.",
    category: "Core Calculations",
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
      explain: true
    }
  },
  {
    path: "/api/horoscope",
    method: "POST",
    description: "Generates comprehensive horoscope including Profile, Houses, Planets, Yogas, Doshas and Interpretations.",
    category: "Horoscope",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri"
    }
  },
  {
    path: "/horoscope-v2",
    method: "POST",
    description: "Generates exactly mirrored comprehensive horoscope JSON mapping every single field of the legacy reference report.",
    category: "Horoscope",
    payload: {
      name: "NAVEEN KUMAR",
      gender: "Male",
      gotram: "Kashyapa",
      year: 1997,
      month: 2,
      day: 25,
      hour: 21,
      minute: 5,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      placeOfBirth: "Hyderabad"
    }
  },
  {
    path: "/api/chart",
    method: "POST",
    description: "Generates D1 Rasi and D9 Navamsa divisional chart points.",
    category: "Horoscope",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri"
    }
  },
  {
    path: "/api/matching",
    method: "POST",
    description: "Evaluates comprehensive Ashta Koota Horoscope compatibility (Guna Milan scored out of 36).",
    category: "Compatibility",
    payload: {
      boy: {
        name: "Sanjay",
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
        name: "Neha",
        year: 1997,
        month: 8,
        day: 20,
        hour: 14,
        minute: 15,
        latitude: 13.0827,
        longitude: 80.2707,
        timezone: 5.5,
        ayanamsa: "Lahiri"
      }
    }
  },
  {
    path: "/matching-v2",
    method: "POST",
    description: "Generates comprehensive South Indian matching report JSON and dynamic premium PDF.",
    category: "Compatibility",
    payload: {
      boy: {
        name: "Sanjay",
        year: 1995,
        month: 6,
        day: 15,
        hour: 8,
        minute: 30,
        latitude: 17.385,
        longitude: 78.486,
        timezone: 5.5,
        placeOfBirth: "Hyderabad"
      },
      girl: {
        name: "Neha",
        year: 1997,
        month: 8,
        day: 20,
        hour: 14,
        minute: 15,
        latitude: 13.0827,
        longitude: 80.2707,
        timezone: 5.5,
        placeOfBirth: "Chennai"
      },
      pdfRequested: true
    }
  },
  {
    path: "/api/dasha",
    method: "POST",
    description: "Outlines Vimshottari Mahadasha periods timeline starting from transit lunar nakshatras.",
    category: "Timeline",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri"
    }
  },
  {
    path: "/api/dosha",
    method: "POST",
    description: "Audits birth planetary afflictions such as Manglik, Guru Chandal, or Kala Sarpa configurations.",
    category: "Horoscope",
    payload: {
      year: 1995,
      month: 6,
      day: 15,
      hour: 8,
      minute: 30,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri"
    }
  },
  {
    path: "/api/muhurta",
    method: "POST",
    description: "Finds auspicious time windows for property acquisitions, business, and vows.",
    category: "Muhurta",
    payload: {
      year: 2026,
      month: 6,
      day: 19,
      hour: 12,
      minute: 0,
      latitude: 17.385,
      longitude: 78.486,
      timezone: 5.5,
      ayanamsa: "Lahiri"
    }
  },
  {
    path: "/api/numerology",
    method: "POST",
    description: "Computes destiny indexes, life path numbers, and star-based favorable baby name rules.",
    category: "Other Systems",
    payload: {
      name: "Aarav Kumar",
      dob: {
        year: 1995,
        month: 6,
        day: 15
      }
    }
  },
  {
    path: "/api/test-suite",
    method: "POST",
    description: "Executes our internal high-accuracy 105 mathematical assertions test suite.",
    category: "System Tests",
    payload: {
      cases: 105
    }
  }
];

export default function App() {
  const [activeEndpointIdx, setActiveEndpointIdx] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [requestPayload, setRequestPayload] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'payload' | 'response'>('payload');
  const [stats, setStats] = useState({ uptime: "99.99%", reqPerSec: 1450, latency: "12ms" });
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [pdfData, setPdfData] = useState<any>(null);
  const { generatePdf, isGenerating } = useGeneratePdf();

  const activeDoc = ENDPOINTS[activeEndpointIdx];

  useEffect(() => {
    // Reset payload when switching endpoints
    setRequestPayload(JSON.stringify(activeDoc.payload, null, 2));
    setResponse("");
    setPdfData(null);
    setActiveTab('payload');
  }, [activeEndpointIdx]);

  useEffect(() => {
    // Simulate dynamic stats
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        reqPerSec: Math.floor(1400 + Math.random() * 100),
        latency: Math.floor(10 + Math.random() * 5) + "ms"
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunRequest = async () => {
    try {
      setIsLoading(true);
      setActiveTab('response');
      setResponse(""); // Clear previous response

      let parsedPayload;
      try {
        parsedPayload = JSON.parse(requestPayload);
      } catch (e) {
        setResponse(JSON.stringify({ error: "Invalid JSON payload format." }, null, 2));
        setIsLoading(false);
        return;
      }

      const res = await fetch(`${activeDoc.path}?lang=${selectedLang}`, {
        method: activeDoc.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedPayload)
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      if (activeDoc.path === "/api/matching" && !data.error) {
        // Fetch Boy and Girl Horoscope reports for the FullReportData
        const boyPayload = parsedPayload.boy;
        const girlPayload = parsedPayload.girl;

        const [boyRes, girlRes] = await Promise.all([
          fetch(`/api/horoscope?lang=${selectedLang}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(boyPayload)
          }),
          fetch(`/api/horoscope?lang=${selectedLang}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(girlPayload)
          })
        ]);

        const boyHoroscope = await boyRes.json();
        const girlHoroscope = await girlRes.json();

        setPdfData({
          matching: data.data || data,
          boyHoroscope: boyHoroscope.data || boyHoroscope,
          girlHoroscope: girlHoroscope.data || girlHoroscope,
        });
      } else if ((activeDoc.path === "/horoscope-v2" || activeDoc.path === "/matching-v2") && data.pdf?.base64) {
        setPdfData(data.pdf.base64);
      } else {
        setPdfData(null);
      }
    } catch (error: any) {
      setResponse(JSON.stringify({ error: error.message || "Failed to execute request." }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const curlCommand = `curl -X ${activeDoc.method} "${window.location.origin}${activeDoc.path}?lang=${selectedLang}" \\\n  -H "Content-Type: application/json" \\\n  -d '${requestPayload.replace(/\n/g, "\n  ")}'`;

  // Group endpoints by category
  const groupedEndpoints = ENDPOINTS.reduce((acc, curr, idx) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push({ ...curr, originalIdx: idx });
    return acc;
  }, {} as Record<string, (EndpointDoc & { originalIdx: number })[]>);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-300 font-sans antialiased flex flex-col selection:bg-amber-500/30 selection:text-amber-100">

      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center glow-amber shadow-lg border border-amber-400/20">
              <Compass className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-amber-400/20 animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="gradient-text">Vivahamitra API</span>
                <span className="px-2 py-0.5 text-xs font-sans font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">v2.0 Core</span>
              </h1>
              <p className="text-xs text-stone-400 font-medium tracking-wide">Swiss Ephemeris Astronomy REST Service</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-stone-400">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Status: <strong className="text-emerald-500">Operational</strong></span>
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center space-x-2 text-sm text-stone-400">
              <Globe2 className="w-4 h-4 text-amber-500" />
              <span>Engine: <strong className="text-white">Vedic Parasara</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sidebar - Navigation */}
        <aside className="lg:col-span-3 space-y-6">

          {/* Quick Stats */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-emerald-500 opacity-50"></div>
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Live Telemetry</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Req / Sec</p>
                <p className="text-lg font-mono font-bold text-white mt-0.5">{stats.reqPerSec}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Latency</p>
                <p className="text-lg font-mono font-bold text-emerald-400 mt-0.5">{stats.latency}</p>
              </div>
            </div>
          </div>

          {/* Endpoint Navigation */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 shadow-xl overflow-hidden flex flex-col h-[calc(100vh-280px)]">
            <div className="p-4 border-b border-white/5 bg-[#161616]">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-500" />
                API Endpoints
              </h3>
            </div>
            <div className="overflow-y-auto flex-1 p-3 space-y-5 custom-scrollbar">
              {Object.entries(groupedEndpoints).map(([category, endpoints]) => (
                <div key={category} className="space-y-1 fade-in-up">
                  <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-3 mb-2">{category}</h4>
                  {endpoints.map((ep) => (
                    <button
                      key={ep.path}
                      onClick={() => setActiveEndpointIdx(ep.originalIdx)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${activeEndpointIdx === ep.originalIdx
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "text-stone-400 hover:bg-white/5 hover:text-stone-200 border border-transparent"
                        }`}
                    >
                      <span className="font-mono truncate">{ep.path}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${activeEndpointIdx === ep.originalIdx ? "opacity-100 translate-x-0 text-amber-500" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area - Playground */}
        <main className="lg:col-span-9 flex flex-col space-y-6">

          {/* Header Info */}
          <div className="bg-gradient-to-br from-[#161616] to-[#121212] rounded-2xl border border-white/5 p-6 shadow-xl relative overflow-hidden fade-in-up">
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-bold font-mono rounded-lg border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  {activeDoc.method}
                </span>
                <h2 className="text-xl font-bold text-white font-mono">{activeDoc.path}</h2>
              </div>

              <button
                onClick={() => handleCopy(curlCommand, 999)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-stone-300 rounded-lg text-xs font-medium transition-colors border border-white/10"
              >
                {copiedIndex === 999 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedIndex === 999 ? "Copied" : "Copy cURL"}
              </button>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-3xl relative z-10">
              {activeDoc.description}
            </p>
          </div>

          {/* Interactive Playground */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 shadow-xl flex flex-col flex-1 overflow-hidden min-h-[500px] fade-in-up" style={{ animationDelay: '0.1s' }}>

            {/* Playground Toolbar */}
            <div className="flex items-center justify-between bg-[#161616] border-b border-white/5 px-4 h-14">
              <div className="flex items-center space-x-1 h-full">
                <button
                  onClick={() => setActiveTab('payload')}
                  className={`h-full px-4 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'payload' ? 'text-amber-400 tab-active' : 'text-stone-400 hover:text-stone-200'}`}
                >
                  <Code2 className="w-4 h-4" />
                  Request Payload
                </button>
                <button
                  onClick={() => setActiveTab('response')}
                  className={`h-full px-4 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'response' ? 'text-emerald-400 tab-active' : 'text-stone-400 hover:text-stone-200'}`}
                >
                  <Terminal className="w-4 h-4" />
                  Response Output
                </button>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-[#121212] border border-white/10 text-stone-300 text-xs font-medium rounded-lg px-3 py-2 outline-none focus:border-amber-500/50 transition-colors"
                >
                  <option value="en">English (en)</option>
                  <option value="te">Telugu (te)</option>
                  <option value="hi">Hindi (hi)</option>
                  <option value="ta">Tamil (ta)</option>
                  <option value="kn">Kannada (kn)</option>
                </select>

                {activeDoc.path === "/api/matching" && (
                  <button
                    onClick={() => generatePdf('pdf-report-wrapper')}
                    disabled={isGenerating || !pdfData}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    {isGenerating ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    {pdfData ? "Download PDF" : "Unlock PDF"}
                  </button>
                )}

                {(activeDoc.path === "/horoscope-v2" || activeDoc.path === "/matching-v2") && pdfData && typeof pdfData === 'string' && (
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `data:application/pdf;base64,${pdfData}`;
                      link.download = `Vivahamitra-${activeDoc.path.replace('/', '')}-${Date.now()}.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                )}

                <button
                  onClick={handleRunRequest}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-amber-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  Run Request
                </button>
              </div>
            </div>

            {/* Playground Content Area */}
            <div className="flex-1 relative bg-[#0a0a0a]">
              {activeTab === 'payload' ? (
                <textarea
                  value={requestPayload}
                  onChange={(e) => setRequestPayload(e.target.value)}
                  className="absolute inset-0 w-full h-full bg-transparent text-stone-300 font-mono text-sm p-6 focus:outline-none resize-none custom-scrollbar leading-relaxed"
                  spellCheck={false}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full p-6 overflow-auto custom-scrollbar">
                  {isLoading ? (
                    <div className="space-y-4 max-w-2xl">
                      <div className="h-4 w-3/4 rounded bg-white/5 skeleton"></div>
                      <div className="h-4 w-1/2 rounded bg-white/5 skeleton" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-4 w-5/6 rounded bg-white/5 skeleton" style={{ animationDelay: '0.4s' }}></div>
                      <div className="h-4 w-2/3 rounded bg-white/5 skeleton" style={{ animationDelay: '0.6s' }}></div>
                      <div className="h-4 w-4/5 rounded bg-white/5 skeleton" style={{ animationDelay: '0.8s' }}></div>
                    </div>
                  ) : response ? (
                    <pre className="font-mono text-sm leading-relaxed text-emerald-400/90 whitespace-pre-wrap">
                      {response}
                    </pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-stone-600 space-y-4">
                      <Sparkles className="w-12 h-12 opacity-20" />
                      <p className="text-sm font-medium">Click "Run Request" to see the API response.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

        </main>
      </div>

      {/* Hidden container for PDF Generation */}
      {pdfData && typeof pdfData !== 'string' && (
        <div id="pdf-report-wrapper" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          <ReportContainer data={pdfData.data || pdfData} lang={selectedLang} />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0f0f0f] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
              <Compass className="w-4 h-4 text-stone-400" />
            </div>
            <p className="text-xs text-stone-500 font-medium">
              © 2026 Vivahamitra API Engine. Powered by Swiss Ephemeris.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors">Documentation</a>
            <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors">API Reference</a>
            <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors">Support</a>
            <div className="h-4 w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Systems Nominal
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
