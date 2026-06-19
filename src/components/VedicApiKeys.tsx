/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  KeyRound, 
  ShieldCheck, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  Calendar, 
  Clock, 
  Sparkles, 
  Database, 
  Terminal, 
  AlertCircle, 
  LogIn, 
  UserPlus, 
  LogOut, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Layers,
  Fingerprint,
  Eye,
  Code
} from "lucide-react";

interface ApiKey {
  id: string;
  userId: string;
  name: string;
  token: string;
  createdAt: string;
  lastUsed: string | null;
}

interface ApiLog {
  id: string;
  userId: string;
  keyToken: string;
  keyName: string;
  endpoint: string;
  method: string;
  status: number;
  speedMs: number;
  timestamp: string;
  ipPlaceholder: string;
  requestBody: string;
  responseBody: string;
}

interface VedicApiKeysProps {
  selectedApiKey: string;
  setSelectedApiKey: (token: string) => void;
}

interface SessionUser {
  id: string;
  email: string;
  createdAt: string;
}

export const VedicApiKeys: React.FC<VedicApiKeysProps> = ({ selectedApiKey, setSelectedApiKey }) => {
  // Authentication screen states
  const [user, setUser] = useState<SessionUser | null>(() => {
    return {
      id: "sandbox-usr",
      email: "developer@vivahamitra.in",
      createdAt: new Date().toISOString()
    };
  });

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authSuccess, setAuthSuccess] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Key and logs states
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [keysLoading, setKeysLoading] = useState<boolean>(false);
  const [logsLoading, setLogsLoading] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [keyError, setKeyError] = useState<string>("");
  const [keySuccess, setKeySuccess] = useState<string>("");

  // Pagination and log filtering
  const [logPage, setLogPage] = useState<number>(1);
  const [logPageSize, setLogPageSize] = useState<number>(10);
  const [logSearchQuery, setLogSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Track expanded log details (payload columns)
  const [expandedLogIds, setExpandedLogIds] = useState<Record<string, boolean>>({});

  const toggleLogExpand = (logId: string) => {
    setExpandedLogIds(prev => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  const formatPayload = (str: string) => {
    if (!str || str === "N/A" || str === "{}") return "{}";
    try {
      const parsed = JSON.parse(str);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return str;
    }
  };

  // Fetch keys list for current authenticated user
  const fetchKeys = async (currentUserId: string) => {
    setKeysLoading(true);
    setKeyError("");
    try {
      const res = await fetch("/api/keys", {
        headers: {
          "x-user-id": currentUserId
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.keys)) {
        setKeys(data.keys);
        
        // Auto select key if none is active
        const hasSelected = data.keys.some((k: ApiKey) => k.token === selectedApiKey);
        if (!hasSelected && data.keys.length > 0) {
          // Default to sandbox default if existing, otherwise the first user key
          const sandboxKey = data.keys.find((k: ApiKey) => k.id === "default-key");
          const firstKey = data.keys[0];
          setSelectedApiKey(sandboxKey ? sandboxKey.token : firstKey.token);
        }
      } else {
        setKeyError("Failed to parse access credentials payload from response.");
      }
    } catch (e: any) {
      setKeyError("Communication with credentials service failed: " + e.message);
    } finally {
      setKeysLoading(false);
    }
  };

  // Fetch logs for current authenticated user
  const fetchLogs = async (currentUserId: string) => {
    setLogsLoading(true);
    try {
      const res = await fetch("/api/logs", {
        headers: {
          "x-user-id": currentUserId
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setLogs(data.logs);
      }
    } catch (e: any) {
      console.error("Failed to load logs:", e);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    
    const email = emailInput.trim();
    const password = passwordInput.trim();

    if (!email || !password) {
      setAuthError("Email addresses and passwords are required parameters.");
      return;
    }

    setAuthLoading(true);

    try {
      const endpoint = authMode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        setAuthSuccess(authMode === "signup" ? "Account registered! Auto-logging in..." : "Authentication successful.");
        setUser(data.user);
        localStorage.setItem("sv_session_user", JSON.stringify(data.user));
        
        // Clean up inputs
        setEmailInput("");
        setPasswordInput("");
        
        // Load user data immediately
        fetchKeys(data.user.id);
        fetchLogs(data.user.id);
      } else {
        setAuthError(data.error || "Authentication procedure was refused.");
      }
    } catch (err: any) {
      setAuthError("Failed to connect to authentication server: " + err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("sv_session_user");
    // Revert active playground key to sandbox default
    setSelectedApiKey("sv_key_sandbox_default_9c7c5d");
    setKeys([]);
    setLogs([]);
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setKeyError("");
    setKeySuccess("");
    
    const label = newKeyName.trim();
    if (!label) {
      setKeyError("Enter a description label to easily recognize this API token.");
      return;
    }

    try {
      const res = await fetch("/api/keys/generate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-user-id": user.id
        },
        body: JSON.stringify({ name: label })
      });
      const data = await res.json();
      if (data.success && data.key) {
        setNewKeyName("");
        setKeySuccess(`Successfully created API Token: '${data.key.name}'`);
        setSelectedApiKey(data.key.token); // auto select new key
        fetchKeys(user.id);
        fetchLogs(user.id);
      } else {
        setKeyError(data.error || "Key creation request failed.");
      }
    } catch (e: any) {
      setKeyError("Error creating API key: " + e.message);
    }
  };

  const handleRevokeKey = async (id: string, name: string) => {
    if (!user) return;
    if (id === "default-key") {
      setKeyError("The default sandbox key represents standard test traffic and cannot be revoked.");
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently revoke key '${name}'? Actions accessing this token will immediately fail with a 401 Unauthorized block.`)) {
      return;
    }

    setKeyError("");
    setKeySuccess("");

    try {
      const res = await fetch(`/api/keys/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-id": user.id
        }
      });
      const data = await res.json();
      if (data.success) {
        setKeySuccess(`Token '${name}' has been successfully revoked.`);
        
        // If revoked key was currently selected, fall back to sandbox default
        if (selectedApiKey === keys.find(k => k.id === id)?.token) {
          setSelectedApiKey("sv_key_sandbox_default_9c7c5d");
        }
        
        fetchKeys(user.id);
        fetchLogs(user.id);
      } else {
        setKeyError(data.error || "Could not delete API key.");
      }
    } catch (e: any) {
      setKeyError("Error invoking revoke service: " + e.message);
    }
  };

  const handleCopy = (token: string, id: string) => {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Refresh current logs & keys manually
  const handleManualRefresh = () => {
    if (user) {
      fetchKeys(user.id);
      fetchLogs(user.id);
    }
  };

  useEffect(() => {
    if (user) {
      fetchKeys(user.id);
      fetchLogs(user.id);
    }
  }, []);

  // Filter & Search Log Processing
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.endpoint.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.keyName.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.keyToken.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.method.toLowerCase().includes(logSearchQuery.toLowerCase());
      
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "success") return matchesSearch && log.status >= 200 && log.status < 300;
    if (statusFilter === "error") return matchesSearch && log.status >= 400;
    return matchesSearch;
  });

  // Paginated Slices calculation
  const totalLogsCount = filteredLogs.length;
  const totalPages = Math.ceil(totalLogsCount / logPageSize) || 1;
  const activeLogsIndexStart = (logPage - 1) * logPageSize;
  const paginatedLogs = filteredLogs.slice(activeLogsIndexStart, activeLogsIndexStart + logPageSize);

  // Reset page count on filter changes
  useEffect(() => {
    setLogPage(1);
  }, [logSearchQuery, statusFilter, logPageSize]);


  return (
    <div className="space-y-6">
      
      {/* Intro Header banner */}
      <div className="bg-gradient-to-br from-stone-900 to-[#2A2621] p-6 rounded-2xl text-white shadow-md relative overflow-hidden border border-stone-800">
        <div className="absolute right-0 bottom-0 opacity-10 translate-y-8 translate-x-4">
          <KeyRound className="w-64 h-64 text-[#9C7c5D]" />
        </div>
        
        <div className="relative z-10 space-y-3.5">
          <span className="px-2.5 py-1 text-[9.5px] font-extrabold tracking-widest bg-[#9C7c5D]/30 border border-[#9C7c5D]/40 text-[#E6D4C3] rounded-md uppercase leading-none inline-flex items-center space-x-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
            <span>Developer Suite</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>
            Developer API Console
          </h2>
          <p className="text-stone-300 text-xs leading-relaxed max-w-2xl font-sans font-light">
            Generate and manage custom API access credentials, view secure request authorization patterns, and monitor sub-millisecond calculation ephemeris logs in real time.
          </p>
        </div>
      </div>

      {/* RENDER UNAUTHENTICATED SCREEN FIRST */}
      {!user ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-[0_4px_24px_rgba(40,30,20,0.01)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#9C7c5D]/10 flex items-center justify-center">
                <Fingerprint className="w-6 h-6 text-[#9C7c5D]" />
              </div>
              
              <h3 className="text-lg font-serif font-semibold text-stone-800">Secure Developer Authentication Portal</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                To generate your personal high-frequency ephemeris tokens, register a unique developer profile. Once logged in, you can instantly:
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Generate and securely rotate unique header API tokens (`sv_usr_*`).",
                  "View live, detailed calculations logs with response time, IP metrics, & payload paths.",
                  "Filter, search, and paginate through your exact historical integration requests.",
                  "Synchronize active playground environments with personal credentials seamlessly."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-stone-605">
                    <span className="w-5 h-5 rounded-full bg-stone-50 text-[#9C7c5D] font-mono text-[10px] flex items-center justify-center border border-stone-100 shrink-0 font-bold">{idx + 1}</span>
                    <span className="pt-0.5 leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-[11px] text-stone-500 leading-relaxed font-sans">
              <strong>Need a temporary quick-test?</strong> Our sandboxed endpoints are active by default for standard demonstration sessions. Sign up below to unlock persistent custom integrations.
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-[0_4px_24px_rgba(40,30,20,0.015)] flex flex-col justify-center">
            
            <div className="flex border-b border-stone-100 pb-3 mb-6">
              <button
                onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }}
                className={`flex-1 pb-2.5 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  authMode === "login" ? "border-[#9C7c5D] text-stone-900" : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setAuthError(""); setAuthSuccess(""); }}
                className={`flex-1 pb-2.5 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  authMode === "signup" ? "border-[#9C7c5D] text-stone-900" : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                Register / Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-stone-505 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#9C7c5D] transition-all font-sans"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-505 mb-1.5 font-sans">Secret Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#9C7c5D] transition-all font-sans"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-50 text-red-800 text-[10.5px] rounded-xl border border-red-100 flex items-start space-x-2 font-sans">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-[10.5px] rounded-xl border border-emerald-100 flex items-start space-x-2 font-sans">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 bg-[#9C7c5D] hover:bg-[#856344] disabled:bg-stone-300 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed"
              >
                {authLoading ? (
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                ) : authMode === "login" ? (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Authorize & Log In</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register Developer Profile</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>
      ) : (
        /* RENDER FULLY AUTHENTICATED USER ENVIRONMENT */
        <div className="space-y-6">
          
          {/* USER SESSION DETAIL BAR */}
          <div className="bg-[#FAF8F5] border border-[#e8dfd3] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-stone-850">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div className="text-left font-sans text-xs">
                <p className="font-bold text-stone-850">Global Permanent API Key Ready</p>
                <p className="text-[#9C7c5D] font-mono text-[10px] font-bold">Use the permanent 8-character key <code className="bg-stone-200/80 px-1 py-0.5 rounded text-[11px] text-stone-800 select-all mx-0.5">viva8bit</code> to make your other applications' requests.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={handleManualRefresh}
                className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 text-xs rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors font-sans"
                title="Force refresh database status"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync Node & Logs</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Form Column - 4 Wide */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-[0_4px_24px_rgba(40,30,20,0.01)] space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center space-x-2 font-sans">
                  <Plus className="w-4 h-4 text-[#9C7c5D]" />
                  <span>Generate Custom Key</span>
                </h3>
                <p className="text-[10px] text-stone-450 mt-1 font-sans">Produce a persistent unique token instantly.</p>
              </div>

              <form onSubmit={handleGenerateKey} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1.5 font-sans">Friendly Name / Purpose</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Production Mobile App"
                    className="w-full bg-stone-50 border border-stone-200 hover:border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#9C7c5D] transition-all font-sans"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#9C7c5D] hover:bg-[#856344] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Key</span>
                </button>
              </form>

              {keyError && (
                <div className="p-3 bg-red-50 text-red-800 text-[10.5px] rounded-xl border border-red-100/60 flex items-start space-x-2 font-sans">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{keyError}</span>
                </div>
              )}

              {keySuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-[10.5px] rounded-xl border border-emerald-100/60 flex items-start space-x-2 font-sans">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{keySuccess}</span>
                </div>
              )}

              <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-100 text-[10.5px] text-stone-605 leading-relaxed font-sans space-y-2">
                <span className="font-extrabold text-[#8C6D4F] uppercase tracking-wider block text-[9.5px]">Playground Direct Sync</span>
                <p>
                  Any key marked as <strong className="text-stone-800">Playground Active</strong> is dynamically injected in documentation code blocks and used in test calls.
                </p>
              </div>
            </div>

            {/* Keys Table - 8 Wide */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-[0_4px_24px_rgba(40,30,20,0.01)] space-y-4">
              <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-sans">
                    Your API Credentials ({keys.length})
                  </h3>
                  <p className="text-[10px] text-stone-400 mt-1 font-sans">Activate credentials or revoke them securely.</p>
                </div>
                {keysLoading && <Clock className="w-4 h-4 text-[#9C7c5D] animate-spin" />}
              </div>

              <div className="space-y-3">
                {keys.length === 0 ? (
                  <div className="py-8 text-center text-stone-400 text-xs">No keys generated. Create your first credentials token on the left!</div>
                ) : (
                  keys.map(key => {
                    const isSelected = selectedApiKey === key.token;
                    return (
                      <div 
                        key={key.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          isSelected 
                            ? "bg-[#FAF8F5] border-[#9C7c5D]/40 shadow-xs" 
                            : "bg-white border-stone-200/80 hover:border-stone-300"
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <span className="font-bold text-stone-900 text-xs truncate max-w-[200px] font-sans">{key.name}</span>
                            {key.id === "default-key" && (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold bg-[#9C7c5D]/10 text-[#8C6D4F] rounded uppercase font-mono">Sandbox Demo</span>
                            )}
                            {isSelected && (
                              <span className="px-1.5 py-0.5 text-[8px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 rounded uppercase font-mono flex items-center">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse mr-1" />
                                Interactive Active
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-1.5 bg-stone-50 p-2 rounded-lg border border-stone-150 max-w-full">
                            <code className="text-[10.5px] font-mono text-stone-750 truncate select-all flex-1">{key.token}</code>
                            <button
                              onClick={() => handleCopy(key.token, key.id)}
                              className="p-1 text-stone-400 hover:text-stone-750 cursor-pointer"
                              title="Copy Token"
                            >
                              {copiedId === key.id ? <Check className="w-3.5 h-3.5 text-emerald-650" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5px] text-stone-400 font-sans">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1 text-stone-350" />
                              Added: {new Date(key.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-stone-350" />
                              Last Used: {key.lastUsed ? new Date(key.lastUsed).toLocaleTimeString() : "Never"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col justify-end items-end gap-2 shrink-0">
                          {!isSelected && (
                            <button
                              onClick={() => setSelectedApiKey(key.token)}
                              className="px-3 py-1.5 text-[10.5px] font-extrabold bg-[#FAF8F5] hover:bg-[#9C7c5D] hover:text-white text-[#9C7c5D] border border-[#9C7c5D]/25 hover:border-[#9C7c5D] rounded-lg transition-all cursor-pointer whitespace-nowrap"
                            >
                              Activate
                            </button>
                          )}
                          {key.id !== "default-key" && (
                            <button
                              onClick={() => handleRevokeKey(key.id, key.name)}
                              className="p-2 text-stone-400 hover:text-red-650 hover:bg-red-50/50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-red-100"
                              title="Revoke Token"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* ==================== API LOGS SECTION ==================== */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-[0_4px_24px_rgba(40,30,20,0.01)] space-y-4">
            
            {/* Header Area with Status Summary and Refresh buttons */}
            <div className="border-b border-stone-105 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold text-stone-850 uppercase tracking-wider flex items-center space-x-2 font-sans">
                  <Database className="w-4 h-4 text-[#9C7c5D]" />
                  <span>Nirayana Request Analytics logs</span>
                </h3>
                <p className="text-[10px] text-stone-450 mt-1 font-sans">Priceless high-frequency speed measurement data and authentication requests feed.</p>
              </div>

              {/* Dynamic summary counts */}
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-stone-100 text-stone-650 rounded-full font-mono">
                  Total: {logs.length} requests
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-700 rounded-full font-mono">
                  Success: {logs.filter(l => l.status >= 200 && l.status < 300).length}
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-red-50 text-red-700 rounded-full font-mono">
                  Errors: {logs.filter(l => l.status >= 400).length}
                </span>
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-150 justify-between">
              
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Query logs by path, friendly name or token prefix..."
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#9C7c5D]"
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <label className="text-[10.5px] font-semibold text-stone-450 font-sans">Status:</label>
                <select
                  className="bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-705 focus:outline-none focus:border-[#9C7c5D] cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Success (2xx)</option>
                  <option value="error">Failed (4xx/5xx)</option>
                </select>

                <label className="text-[10.5px] font-semibold text-stone-450 pl-2 font-sans">Show:</label>
                <select
                  className="bg-white border border-stone-200 hover:border-stone-300 rounded-lg px-2.5 py-1 text-xs text-stone-705 focus:outline-none focus:border-[#9C7c5D] cursor-pointer"
                  value={logPageSize}
                  onChange={(e) => setLogPageSize(Number(e.target.value))}
                >
                  <option value={5}>5 logs</option>
                  <option value={10}>10 logs</option>
                  <option value={20}>20 logs</option>
                  <option value={50}>50 logs</option>
                </select>
              </div>

            </div>

            {/* Table layout with proper formatting */}
            <div className="overflow-x-auto border border-stone-200/80 rounded-xl">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-stone-50 text-[10px] uppercase font-bold text-stone-550 border-b border-stone-150 font-mono">
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">API Endpoint</th>
                    <th className="px-4 py-3">Request Payload</th>
                    <th className="px-4 py-3">Response Payload</th>
                    <th className="px-4 py-3">Token Agent / Name</th>
                    <th className="px-4 py-3">Latency</th>
                    <th className="px-4 py-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-150">
                  {logsLoading ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-stone-400">
                        <div className="flex items-center justify-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#9C7c5D]" />
                          <span className="text-xs font-light">Retrieving developer queries logs...</span>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedLogs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-stone-400 text-xs">
                        No requests logs match the search filters. Try testing your API key credentials to generate logs!
                      </td>
                    </tr>
                  ) : (
                    paginatedLogs.map((log) => {
                      const isSuccess = log.status >= 200 && log.status < 300;
                      const isExpanded = !!expandedLogIds[log.id];
                      return (
                        <React.Fragment key={log.id}>
                          <tr className={`text-xs hover:bg-stone-50/50 transition-colors ${isExpanded ? "bg-[#FAF8F5]/40" : ""}`}>
                            {/* STATUS BADGE */}
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded font-mono font-extrabold text-[10px] inline-block ${
                                isSuccess 
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                                  : "bg-red-50 text-red-800 border border-red-100"
                              }`}>
                                {log.status} {isSuccess ? "OK" : "ERR"}
                              </span>
                            </td>

                            {/* METHOD */}
                            <td className="px-4 py-3">
                              <span className="bg-stone-100 hover:bg-stone-150/10 text-stone-705 px-1.5 py-0.5 rounded text-[10px] font-mono select-none font-bold">
                                {log.method}
                              </span>
                            </td>

                            {/* ENDPOINT PATH */}
                            <td className="px-4 py-3 font-mono font-medium text-stone-850">
                              {log.endpoint}
                            </td>

                            {/* REQUEST PAYLOAD PREVIEW */}
                            <td className="px-4 py-3 font-mono text-[11px] max-w-[180px] truncate">
                              <button
                                onClick={() => toggleLogExpand(log.id)}
                                className="text-left text-[#9C7c5D] hover:underline cursor-pointer truncate max-w-full block font-mono"
                                title="Click to view full request and response payloads"
                              >
                                <span className="text-stone-705 font-mono">{log.requestBody || "{}"}</span>
                              </button>
                            </td>

                            {/* RESPONSE PAYLOAD PREVIEW */}
                            <td className="px-4 py-3 font-mono text-[11px] max-w-[200px] truncate">
                              <button
                                onClick={() => toggleLogExpand(log.id)}
                                className="text-left text-[#9C7c5D] hover:underline cursor-pointer truncate max-w-full block font-mono"
                                title="Click to view full request and response payloads"
                              >
                                <span className="text-stone-750 font-mono font-medium">{log.responseBody || "{}"}</span>
                              </button>
                            </td>

                            {/* KEY NAME */}
                            <td className="px-4 py-3">
                              <div className="text-left">
                                <p className="font-bold text-stone-850 font-sans text-xs">{log.keyName}</p>
                                <code className="text-[10px] text-stone-400 font-mono tracking-tighter truncate max-w-[130px] inline-block">
                                  {log.keyToken.substring(0, 12)}...
                                </code>
                              </div>
                            </td>

                            {/* LATENCY */}
                            <td className="px-4 py-3">
                              <span className={`font-mono text-xs font-extrabold ${
                                log.speedMs < 100 
                                  ? "text-emerald-650" 
                                  : log.speedMs < 400 
                                  ? "text-amber-600" 
                                  : "text-red-650"
                              }`}>
                                {log.speedMs} ms
                              </span>
                            </td>

                            {/* TIMESTAMP */}
                            <td className="px-4 py-3 text-right text-stone-400 text-[11px] font-sans">
                              <div className="flex items-center justify-end space-x-2">
                                <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                <button
                                  onClick={() => toggleLogExpand(log.id)}
                                  className="p-1 hover:bg-stone-100 rounded text-[#9C7c5D]"
                                  title="Expand paylaod contents"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* EXPANSION PANEL */}
                          {isExpanded && (
                            <tr className="bg-[#FAF8F5]/70">
                              <td colSpan={8} className="p-4 border-b border-stone-200">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-full select-text">
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-wider font-mono flex items-center space-x-1">
                                        <Code className="w-3.5 h-3.5 text-[#9C7c5D]" />
                                        <span>Request Payload (JSON)</span>
                                      </span>
                                      <button 
                                        onClick={() => {
                                          navigator.clipboard.writeText(formatPayload(log.requestBody));
                                        }}
                                        className="text-[9.5px] font-extrabold text-[#9C7c5D] hover:underline cursor-pointer bg-white px-2 py-0.5 border border-stone-200 rounded"
                                      >
                                        Copy Request
                                      </button>
                                    </div>
                                    <pre className="p-3 bg-stone-900 text-emerald-400 rounded-lg text-[10.5px] font-mono leading-relaxed overflow-x-auto max-h-[220px] shadow-inner">
                                      {formatPayload(log.requestBody)}
                                    </pre>
                                  </div>

                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-wider font-mono flex items-center space-x-1">
                                        <Code className="w-3.5 h-3.5 text-[#9C7c5D]" />
                                        <span>Response Payload (JSON)</span>
                                      </span>
                                      <button 
                                        onClick={() => {
                                          navigator.clipboard.writeText(formatPayload(log.responseBody));
                                        }}
                                        className="text-[9.5px] font-extrabold text-[#9C7c5D] hover:underline cursor-pointer bg-white px-2 py-0.5 border border-stone-200 rounded"
                                      >
                                        Copy Response
                                      </button>
                                    </div>
                                    <pre className="p-3 bg-stone-900 text-amber-300 rounded-lg text-[10.5px] font-mono leading-relaxed overflow-x-auto max-h-[220px] shadow-inner">
                                      {formatPayload(log.responseBody)}
                                    </pre>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION SECTION */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
              <div className="text-stone-450 text-[11px]">
                Showing {totalLogsCount === 0 ? 0 : activeLogsIndexStart + 1} to {Math.min(activeLogsIndexStart + logPageSize, totalLogsCount)} of <strong className="text-stone-850 font-bold">{totalLogsCount}</strong> indexed logs
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  disabled={logPage === 1 || logsLoading}
                  onClick={() => setLogPage(p => Math.max(1, p - 1))}
                  className="p-1.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-605 disabled:bg-stone-50 disabled:text-stone-300 rounded-lg cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="px-3 py-1 font-semibold text-stone-800 text-[11px]">
                  Page {logPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={logPage === totalPages || logsLoading}
                  onClick={() => setLogPage(p => Math.min(totalPages, p + 1))}
                  className="p-1.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-605 disabled:bg-stone-50 disabled:text-stone-300 rounded-lg cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PERSISTENCE INFO BADGE */}
            <div className="pt-2.5 border-t border-stone-100 flex items-center space-x-2 text-[10px] text-stone-450 font-sans">
              <Terminal className="w-3.5 h-3.5 text-stone-400" />
              <span>Developer transaction metrics are stored inside <code className="bg-stone-50 px-1 rounded font-mono text-[9px] border border-stone-105">dev-auth-db.json</code>.</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
