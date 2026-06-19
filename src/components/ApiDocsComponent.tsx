import React, { useState } from "react";
import { 
  Terminal, 
  Search, 
  Copy, 
  Check, 
  Loader2, 
  Play, 
  FileCode2, 
  BookOpen,
  ArrowRight,
  Database
} from "lucide-react";
import { API_DOCS_DATA } from "../utils/apiDocsData";

interface ApiDocsProps {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone: number;
  selectedAyanamsa: string;
  selectedLanguage: string;
  explainEnabled: boolean;
  nameInput: string;
  fYear: number;
  fMonth: number;
  fDay: number;
  fHour: number;
  fMinute: number;
  fLatitude: number;
  fLongitude: number;
  fTimezone: number;
  fNameInput: string;
  selectedApiKey: string;
}

export const ApiDocsComponent: React.FC<ApiDocsProps> = ({
  year,
  month,
  day,
  hour,
  minute,
  latitude,
  longitude,
  timezone,
  selectedAyanamsa,
  selectedLanguage,
  explainEnabled,
  nameInput,
  fYear,
  fMonth,
  fDay,
  fHour,
  fMinute,
  fLatitude,
  fLongitude,
  fTimezone,
  fNameInput,
  selectedApiKey
}) => {
  const [selectedDocEndpoint, setSelectedDocEndpoint] = useState<string>("/api/panchang");
  const [docSearch, setDocSearch] = useState<string>("");
  const [copiedDocParam, setCopiedDocParam] = useState<string | null>(null);
  
  const [sandboxPayload, setSandboxPayload] = useState<string>(() => {
    const activeData = API_DOCS_DATA.find(d => d.path === "/api/panchang") || API_DOCS_DATA[0];
    const initialPayload = { ...activeData.exampleRequest, lang: selectedLanguage };
    return JSON.stringify(initialPayload, null, 2);
  });
  
  const [sandboxLoading, setSandboxLoading] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<any>(null);
  const [sandboxTab, setSandboxTab] = useState<"js" | "curl" | "py">("js");

  const activeDoc = API_DOCS_DATA.find(d => d.path === selectedDocEndpoint) || API_DOCS_DATA[0];

  // Auto-synchronize the raw JSON lang property whenever selectedLanguage changes
  React.useEffect(() => {
    try {
      const parsed = JSON.parse(sandboxPayload);
      if (parsed && typeof parsed === "object") {
        let changed = false;
        if (parsed.lang !== undefined && parsed.lang !== selectedLanguage) {
          parsed.lang = selectedLanguage;
          changed = true;
        }
        if (parsed.boy !== undefined && parsed.boy.lang !== undefined && parsed.boy.lang !== selectedLanguage) {
          parsed.boy.lang = selectedLanguage;
          changed = true;
        }
        if (changed) {
          setSandboxPayload(JSON.stringify(parsed, null, 2));
        }
      }
    } catch (e) {
      // safe bypass if temporary json is invalid during user updates
    }
  }, [selectedLanguage]);

  const getDynamicSnippet = (snippet: string) => {
    let modified = snippet
      .replace(/\?lang=en/g, `?lang=${selectedLanguage}`)
      .replace(/"lang":\s*"en"/g, `"lang": "${selectedLanguage}"`)
      .replace(/'lang':\s*'en'/g, `'lang': '${selectedLanguage}'`)
      .replace(/lang:\s*"en"/g, `lang: "${selectedLanguage}"`)
      .replace(/lang:\s*'en'/g, `lang: '${selectedLanguage}'`);

    const activeKey = selectedApiKey || "sv_key_sandbox_default_9c7c5d";

    // Inject 'X-API-Key' headers dynamically to demonstrate real authentication in documentation
    // JS Replace
    modified = modified.replace(
      /headers:\s*\{\s*'Content-Type':\s*'application\/json'\s*\}/g,
      `headers: { \n    'Content-Type': 'application/json',\n    'X-API-Key': '${activeKey}'\n  }`
    );

    // cURL Replace
    modified = modified.replace(
      /-H "Content-Type: application\/json" \\/g,
      `-H "Content-Type: application/json" \\\n  -H "X-API-Key: ${activeKey}" \\`
    );

    // Python Replace
    modified = modified.replace(
      /response = requests\.post\(url, json=payload\)/g,
      `headers = {\n    "Content-Type": "application/json",\n    "X-API-Key": "${activeKey}"\n}\nresponse = requests.post(url, json=payload, headers=headers)`
    );

    return modified;
  };

  const getActiveCodeText = () => {
    const rawCode = sandboxTab === "js" ? activeDoc.jsSample : sandboxTab === "curl" ? activeDoc.curlSample : activeDoc.pythonSample;
    return getDynamicSnippet(rawCode);
  };

  const handleCopyText = (text: string, type: "code" | "response") => {
    navigator.clipboard.writeText(text);
    setCopiedDocParam(type);
    setTimeout(() => setCopiedDocParam(null), 2000);
  };

  const handleInjectParams = () => {
    let sidebarPayload: any = {};
    if (activeDoc.path === "/api/matching") {
      sidebarPayload = {
        boy: { year, month, day, hour, minute, latitude, longitude, timezone, ayanamsa: selectedAyanamsa },
        girl: { year: fYear, month: fMonth, day: fDay, hour: fHour, minute: fMinute, latitude: fLatitude, longitude: fLongitude, timezone: fTimezone, ayanamsa: selectedAyanamsa },
        lang: selectedLanguage
      };
    } else if (activeDoc.path === "/api/numerology") {
      sidebarPayload = {
        name: nameInput,
        dob: { year, month, day },
        lang: selectedLanguage
      };
    } else {
      sidebarPayload = {
        year, month, day, hour, minute, latitude, longitude, timezone,
        ayanamsa: selectedAyanamsa,
        lang: selectedLanguage,
        explain: explainEnabled
      };
    }
    setSandboxPayload(JSON.stringify(sidebarPayload, null, 2));
  };

  const executeSandboxCall = async () => {
    setSandboxLoading(true);
    setSandboxResponse(null);
    try {
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(sandboxPayload);
      } catch (e: any) {
        throw new Error("Invalid request JSON model: " + e.message);
      }

      const res = await fetch(`${activeDoc.path}?lang=${selectedLanguage}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-API-Key": selectedApiKey
        },
        body: JSON.stringify(parsedBody)
      });
      const resVal = await res.json();
      setSandboxResponse(resVal);
    } catch (err: any) {
      setSandboxResponse({ success: false, error: err.message });
    } finally {
      setSandboxLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 font-sans">
      
      {/* Sidebar selection list */}
      <div className="xl:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-5 space-y-4 shadow-[0_4px_24px_rgba(40,30,20,0.02)]">
        <div className="space-y-2">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block font-sans">Vedic Core API Routes ({API_DOCS_DATA.length})</span>
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search API routes..." 
              value={docSearch}
              onChange={(e) => setDocSearch(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9C7c5D]/60 focus:ring-1 focus:ring-[#9C7c5D]/10 font-sans"
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {API_DOCS_DATA.filter(doc => 
            doc.path.toLowerCase().includes(docSearch.toLowerCase()) || 
            doc.name.toLowerCase().includes(docSearch.toLowerCase())
          ).map(doc => {
            const isSelected = selectedDocEndpoint === doc.path;
            return (
              <button
                key={doc.path}
                type="button"
                onClick={() => {
                  setSelectedDocEndpoint(doc.path);
                  const updatedPayload = { ...doc.exampleRequest };
                  if (updatedPayload.lang !== undefined) {
                    updatedPayload.lang = selectedLanguage;
                  }
                  if (updatedPayload.boy !== undefined && updatedPayload.lang === undefined) {
                    updatedPayload.lang = selectedLanguage;
                  }
                  setSandboxPayload(JSON.stringify(updatedPayload, null, 2));
                  setSandboxResponse(null);
                }}
                className={`w-full p-4 rounded-xl text-left border text-xs cursor-pointer block transition-all ${
                  isSelected 
                    ? "bg-[#FAF8F5] border-[#9C7c5D]/40 text-[#9C7c5D] shadow-[0_2px_12px_rgba(156,124,93,0.04)]" 
                    : "bg-white border-transparent hover:border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-stone-800">{doc.name}</span>
                  <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded font-extrabold tracking-wide ${
                    doc.method === "POST" 
                      ? "bg-[#9C7c5D]/10 text-[#856344]" 
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}>
                    {doc.method}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-stone-400 truncate font-medium">{doc.path}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main interactive sandboxed reference */}
      <div className="xl:col-span-8 bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(40,30,20,0.02)]">
        
        {/* Endpoint Name */}
        <div className="border-b border-stone-100 pb-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-extrabold tracking-wider ${
              activeDoc.method === "POST" 
                ? "bg-[#9C7c5D]/10 text-[#856344] border border-[#9C7c5D]/15" 
                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}>
              {activeDoc.method}
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900 tracking-wide select-none uppercase" style={{ fontFamily: "Cinzel, serif" }}>{activeDoc.name}</h3>
          </div>
          
          <div className="font-mono text-[11px] bg-stone-50 px-4 py-3 rounded-xl border border-stone-100 text-stone-600 select-all font-semibold flex justify-between items-center">
            <span>{activeDoc.path}</span>
            <span className="text-[10px] text-stone-400 font-sans font-medium">Production Gateway Endpoint</span>
          </div>
          
          <p className="text-xs text-stone-500 leading-relaxed font-sans">{activeDoc.description}</p>
        </div>

        {/* API Properties Schemas */}
        <div className="space-y-3">
          <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest block font-sans">Request Payload Schema</span>
          <div className="border border-stone-100 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-100 text-stone-605 font-semibold text-[11px]">
                  <th className="px-4 py-3 text-stone-600">Parameter</th>
                  <th className="px-4 py-3 font-mono text-stone-600">Type</th>
                  <th className="px-4 py-3 text-stone-600">Requirement</th>
                  <th className="px-4 py-3 text-stone-600">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                {activeDoc.params.map(p => (
                  <tr key={p.name} className="hover:bg-stone-50/40 text-stone-700">
                    <td className="px-4 py-3 font-mono font-bold text-[#9C7c5D] text-[11.5px]">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-[10.5px] text-blue-600">{p.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide ${
                        p.required 
                          ? "bg-[#9C7c5D]/10 text-[#856344] border border-[#9C7c5D]/15" 
                          : "bg-stone-100 text-stone-500"
                      }`}>
                        {p.required ? "REQUIRED" : "OPTIONAL"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-[11px] leading-relaxed font-sans">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integration Code Blocks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest block font-sans">Example Client Snippet</span>
            <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200/60 text-[10.5px]">
              {(["js", "curl", "py"] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSandboxTab(tab)}
                  className={`px-3 py-1 rounded-md cursor-pointer capitalize font-semibold transition-all ${
                    sandboxTab === tab 
                      ? "bg-white text-[#9C7c5D] shadow-xs font-bold" 
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  {tab === "js" ? "JS Fetch" : tab === "curl" ? "cURL" : "Python"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <pre className="p-4 bg-[#232320] rounded-xl text-[11px] leading-relaxed border border-stone-800 text-stone-300 font-mono overflow-x-auto max-h-[170px] scrollbar-thin shadow-inner">
              {getActiveCodeText()}
            </pre>
            <button
              type="button"
              onClick={() => {
                handleCopyText(getActiveCodeText(), "code");
              }}
              className="absolute right-3.5 top-3.5 p-2 bg-[#2d2d2a] hover:bg-[#383834] text-stone-400 hover:text-stone-200 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-stone-700/55 shadow-md"
              title="Copy code snippet"
            >
              {copiedDocParam === "code" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Real-time sandbox test client */}
        <div className="border-t border-stone-100 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-stone-800 flex items-center space-x-2 uppercase font-sans tracking-wider">
              <Terminal className="w-4 h-4 text-[#9C7c5D]" />
              <span>Interactive Request Sandbox</span>
            </h4>
            <div className="text-[10px] text-emerald-600 flex items-center space-x-1 font-sans font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-1" />
              <span>Vedic Router Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* JSON Request panel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-sans font-bold">
                <span className="text-stone-400 uppercase tracking-wider">Request (Raw JSON)</span>
                <button
                  type="button"
                  onClick={handleInjectParams}
                  className="text-[#9C7c5D] hover:text-[#856344] font-bold tracking-wide transition-all text-[9.5px] cursor-pointer flex items-center space-x-1"
                  title="Copy current parameters from sidebar parameters"
                >
                  <span>⚡ LOAD SIDEBAR INPUTS</span>
                </button>
              </div>

              <textarea
                value={sandboxPayload}
                onChange={(e) => setSandboxPayload(e.target.value)}
                className="w-full h-[180px] bg-stone-50 text-stone-800 font-mono text-[11px] p-4 rounded-xl border border-stone-200/80 focus:outline-none focus:border-[#9C7c5D]/60 focus:ring-1 focus:ring-[#9C7c5D]/10 shadow-inner scrollbar-thin"
              />
              
              <button
                type="button"
                onClick={executeSandboxCall}
                disabled={sandboxLoading || !sandboxPayload.trim()}
                className="w-full py-3 bg-[#9C7c5D] hover:bg-[#856344] disabled:bg-stone-100 disabled:text-stone-400 text-white font-bold cursor-pointer rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-stone-200"
              >
                {sandboxLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>CALCULATING CELESTIAL EPHEMERIS...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-white text-white shrink-0" />
                    <span>SEND SANDBOX REQUEST</span>
                  </>
                )}
              </button>
            </div>

            {/* JSON Response panel */}
            <div className="space-y-1.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-sans font-bold">
                <span className="text-stone-400 uppercase tracking-wider">Response JSON Output</span>
                {sandboxResponse && (
                  <span className="text-[9.5px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5">200 OK</span>
                )}
              </div>
              
              <div className="bg-[#1b1c19] rounded-xl border border-stone-850 p-4 font-mono text-[11.5px] leading-relaxed text-[#eee9da] overflow-y-auto h-[180px] min-h-[180px] relative scrollbar-thin shadow-inner">
                {sandboxLoading && (
                  <div className="absolute inset-0 bg-[#1b1c19]/90 flex flex-col items-center justify-center space-y-2.5 z-10">
                    <Loader2 className="w-6 h-6 text-[#9C7c5D] animate-spin" />
                    <span className="text-[10px] text-stone-400 font-sans">Querying Swiss mathematics...</span>
                  </div>
                )}

                {sandboxResponse ? (
                  <pre className="text-emerald-350 select-all max-h-full">
                    {JSON.stringify(sandboxResponse, null, 2)}
                  </pre>
                ) : (
                  <div className="text-stone-600 h-full flex flex-col justify-center items-center text-center">
                    <BookOpen className="w-8 h-8 text-stone-800 mb-2" />
                    <span className="font-bold text-stone-500 block text-[10px] uppercase tracking-wider">Sandbox Terminal Idle</span>
                    <span className="text-[9px] text-stone-600 mt-0.5">Execute a test query to pull live response maps</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleCopyText(JSON.stringify(sandboxResponse, null, 2), "response")}
                disabled={!sandboxResponse}
                className="w-full py-2.5 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 text-stone-600 hover:text-stone-800 border border-stone-200/80 rounded-xl text-xs font-semibold cursor-pointer text-center transition-all"
              >
                {copiedDocParam === "response" ? "Copied response values!" : "Copy Response JSON Payload"}
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
