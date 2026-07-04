import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

export const Page19Conclusion: React.FC<Props> = ({ data }) => {
  const dashakootScore = data.marriageScore || 19;
  const dashakootText = `Dashakoot Matching between male and female is ${dashakootScore} points out of 36 points. This is a reasonably good score. This signifying mental compatibility and mutual affection between the two. Hence, this is a favourable Dashakoota match.`;

  const manglikText = data.doshaMatching?.hasManglikDoshaConflict
    ? "Mangal Dosha is present. Proper remedies and consultations are advised before proceeding with the match."
    : "The boy is not a Manglik; nor is the girl a Manglik. Mangal Dosha being absent in either horoscopes, there shall be no ill effect on their marriage. This match is recommended.";

  return (
    <FixedPage pageNumber={19}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-16 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Match Making Report
          </div>
        </div>

        <div className="flex gap-8 w-full mb-16">
          {/* Dashakoot Card */}
          <div className="flex-1 border border-stone-200 relative pt-8 px-6 pb-6 shadow-sm">
            <div className="absolute -top-8 left-6 w-16 h-16 bg-[#4CAF50] flex items-center justify-center shadow-md">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-800 ml-20 mb-6 uppercase">Dashakoot</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              {dashakootText}
            </p>
          </div>

          {/* Manglik Card */}
          <div className="flex-1 border border-stone-200 relative pt-8 px-6 pb-6 shadow-sm">
            <div className={`absolute -top-8 left-6 w-16 h-16 ${data.doshaMatching?.hasManglikDoshaConflict ? 'bg-[#F44336]' : 'bg-[#4CAF50]'} flex items-center justify-center shadow-md`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                {data.doshaMatching?.hasManglikDoshaConflict ? (
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                ) : (
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                )}
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-800 ml-20 mb-6 uppercase">Manglik</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              {manglikText}
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-stone-800 tracking-wide">Match Conclusion</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-16 h-px bg-stone-300"></div>
              <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
              <div className="w-16 h-px bg-stone-300"></div>
            </div>
          </div>

          <div className="bg-[#F9FAFB] border-l-8 border-[#E67E22] p-8 relative">
            <span className="text-[#E67E22] font-serif text-6xl absolute top-4 left-4 leading-none">“</span>
            <div className="text-lg font-medium text-[#009688] leading-relaxed ml-8 whitespace-pre-wrap">
              {data.report || "Not Provided"}
            </div>
            
            {data.recommendation?.reasons && data.recommendation.reasons.length > 0 && (
              <div className="mt-8 ml-8">
                <h4 className="text-md font-bold text-stone-800 mb-2">Key Reasons:</h4>
                <ul className="list-disc pl-6 text-stone-700 space-y-1">
                  {data.recommendation.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
