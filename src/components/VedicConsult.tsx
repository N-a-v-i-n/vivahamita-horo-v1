/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare, Loader2, Send, Sparkles } from "lucide-react";

interface ConsultMessage {
  sender: "user" | "ai";
  text: string;
}

interface VedicConsultProps {
  consultMessages: ConsultMessage[];
  consultLoading: boolean;
  userQuery: string;
  setUserQuery: (val: string) => void;
  handleSendQuery: (queryToSend?: string) => void;
}

const AI_SUGGESTIONS = [
  "What are my career prospects & 10th house strength?",
  "Do I have any major planetary Doshas or Manglik effects?",
  "Analyze my current Vimshottari Mahadasha",
  "What are my key beneficial remedies or gemstones?"
];

export const VedicConsult: React.FC<VedicConsultProps> = ({
  consultMessages,
  consultLoading,
  userQuery,
  setUserQuery,
  handleSendQuery
}) => {
  return (
    <div className="space-y-5 font-sans text-xs bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center space-x-2" style={{ fontFamily: "Cinzel, serif" }}>
            <MessageSquare className="w-4 h-4 text-[#9C7c5D]" />
            <span>Scholastic Horoscope AI Consultation</span>
          </h3>
          <p className="text-[11px] text-stone-400 mt-1 font-sans">
            Our scholarly Gemini consultant model has contextual access to your complete birth chart properties & divisional metrics.
          </p>
        </div>
        <span className="px-3 py-1 text-[9.5px] bg-[#9C7c5D]/10 text-[#856344] rounded-full border border-[#9C7c5D]/15 font-semibold font-sans">
          Vedic Scholar Chatbot
        </span>
      </div>

      {/* Messages Logs */}
      <div className="space-y-4 bg-stone-50/65 border border-stone-100 p-4 rounded-xl max-h-[380px] overflow-y-auto shadow-inner">
        {consultMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
          >
            <div className={`p-3.5 rounded-2xl text-[12px] leading-relaxed ${
              msg.sender === "user"
                ? "bg-[#FAF8F5] text-stone-850 border border-[#e8dfd3] rounded-tr-none"
                : "bg-white text-stone-800 border border-stone-200/70 rounded-tl-none font-serif font-medium shadow-[0_2px_8px_rgba(40,30,20,0.015)]"
            }`}>
              <strong className="text-[9px] uppercase text-stone-400 block mb-1 tracking-wider font-sans font-extrabold">
                {msg.sender === "user" ? "Yajamana (Inquirer)" : "Astro Guru (Scholar)"}
              </strong>
              <div className="whitespace-pre-wrap leading-relaxed select-text" style={msg.sender === "ai" ? { fontFamily: "Cinzel, serif", fontWeight: 500 } : undefined}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {consultLoading && (
          <div className="flex items-center space-x-2 mr-auto animate-pulse">
            <div className="bg-white border border-stone-200 px-4 py-3 rounded-xl rounded-tl-none text-[11px] text-stone-500 flex items-center space-x-2.5 shadow-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9C7c5D]" />
              <span className="font-sans font-medium text-stone-400">Guru is computing cosmic alignment answers...</span>
            </div>
          </div>
        )}
      </div>

      {/* Preset click tags */}
      <div className="space-y-2 pt-2 border-t border-stone-50">
        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block font-sans">
          Recommended Consult Topics:
        </span>
        <div className="flex flex-wrap gap-2">
          {AI_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              disabled={consultLoading}
              onClick={() => handleSendQuery(sug)}
              className="px-3.5 py-2 text-[11px] bg-stone-50 hover:bg-[#FAF8F5] border border-stone-200 hover:border-[#9C7c5D]/40 text-stone-600 hover:text-[#9C7c5D] transition-all rounded-lg text-left cursor-pointer disabled:opacity-50 font-sans"
              id={`ai-sug-${i}`}
            >
              ✨ {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Entry fields */}
      <div className="flex items-center space-x-3.5 pt-3 border-t border-stone-100">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !consultLoading && userQuery.trim()) handleSendQuery(); }}
          disabled={consultLoading}
          placeholder="Inquire (e.g., 'How does Jupiter affect my 7th house?')"
          className="flex-1 bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#9C7c5D]/80 focus:ring-1 focus:ring-[#9C7c5D]/10 font-sans disabled:opacity-55"
          id="consult-text-input"
        />
        <button
          onClick={() => handleSendQuery()}
          disabled={consultLoading || !userQuery.trim()}
          className="py-3 px-5 bg-[#9C7c5D] hover:bg-[#856344] disabled:bg-stone-50 disabled:text-stone-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-stone-200 cursor-pointer"
          id="consult-send-btn"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask Guru</span>
        </button>
      </div>
    </div>
  );
};
