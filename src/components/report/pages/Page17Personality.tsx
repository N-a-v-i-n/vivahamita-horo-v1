import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

export const Page17Personality: React.FC<Props> = ({ data }) => {
  const boyName = data.boyInfo?.name || 'Boy';
  const girlName = data.girlInfo?.name || 'Girl';

  return (
    <FixedPage pageNumber={17}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Personality Report
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full mt-4">
          <div className="w-full bg-[#F9FAFB] border border-stone-200 p-6">
            <h3 className="text-xl font-bold text-[#E67E22] tracking-wide mb-4 border-b border-stone-200 pb-2">
              Health Score & Insights
            </h3>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <p><span className="font-bold">Rating:</span> {data.healthScore?.rating || (data as any).health_score_insight?.value || "Not Provided"}</p>
              <p><span className="font-bold">Nature:</span> {(data as any).healthScoreInsight?.nature || (data as any).health_score_insight?.nature || "Not Provided"}</p>
              <p><span className="font-bold">Confidence:</span> {data.healthScore?.confidence !== undefined ? `${(data.healthScore.confidence * 100).toFixed(0)}%` : "Not Provided"}</p>
              {data.healthScore?.description && (
                <p className="mt-2"><span className="font-bold">Description:</span> {data.healthScore.description}</p>
              )}
              {((data as any).healthScoreInsight?.traditionalMeaning || (data as any).health_score_insight?.traditionalMeaning) && (
                <div className="mt-4 relative">
                  <span className="text-4xl text-[#E67E22] absolute -top-4 -left-3 opacity-50 font-serif">“</span>
                  <p className="italic font-medium text-stone-800 ml-4 pl-4 border-l-2 border-[#E67E22]">
                    {(data as any).healthScoreInsight?.traditionalMeaning || (data as any).health_score_insight?.traditionalMeaning}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full bg-[#F9FAFB] border border-stone-200 p-6">
            <h3 className="text-xl font-bold text-[#E67E22] tracking-wide mb-4 border-b border-stone-200 pb-2">
              Finance Score & Insights
            </h3>
            <div className="text-stone-700 text-sm leading-relaxed space-y-3">
              <p><span className="font-bold">Rating:</span> {data.financeScore?.rating || (data as any).finance_score_insight?.value || "Not Provided"}</p>
              <p><span className="font-bold">Nature:</span> {(data as any).financeScoreInsight?.nature || (data as any).finance_score_insight?.nature || "Not Provided"}</p>
              <p><span className="font-bold">Confidence:</span> {data.financeScore?.confidence !== undefined ? `${(data.financeScore.confidence * 100).toFixed(0)}%` : "Not Provided"}</p>
              {data.financeScore?.description && (
                <p className="mt-2"><span className="font-bold">Description:</span> {data.financeScore.description}</p>
              )}
              {((data as any).financeScoreInsight?.traditionalMeaning || (data as any).finance_score_insight?.traditionalMeaning) && (
                <div className="mt-4 relative">
                  <span className="text-4xl text-[#E67E22] absolute -top-4 -left-3 opacity-50 font-serif">“</span>
                  <p className="italic font-medium text-stone-800 ml-4 pl-4 border-l-2 border-[#E67E22]">
                    {(data as any).financeScoreInsight?.traditionalMeaning || (data as any).finance_score_insight?.traditionalMeaning}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
