import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';
import { formatValue } from '../../../utils/format';

interface Props {
  data: MatchingResult;
  isBoy: boolean;
}

export const PageManglikAnalysis: React.FC<Props> = ({ data, isBoy }) => {
  const name = isBoy ? (data.boyInfo?.name || 'Boy') : (data.girlInfo?.name || 'Girl');
  const pageNumber = isBoy ? 10 : 11;
  const doshas = isBoy ? data.doshaMatching?.boyDoshas : data.doshaMatching?.girlDoshas;
  
  const displayDoshas = doshas && doshas.length > 0 ? doshas : [];

  return (
    <FixedPage pageNumber={pageNumber}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            {name} - Manglik Analysis
          </div>
        </div>

        <div className="text-stone-800 space-y-4 mb-8">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">Analysis</h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 p-4 border border-stone-200">
              <div className="font-bold text-stone-800 w-1/4">Detected Doshas</div>
              <div className="w-3/4">
                {displayDoshas.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {displayDoshas.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                ) : (
                  <p className="text-stone-700 font-bold text-green-600">None</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-[#E67E22] text-white py-2 px-4 font-bold text-left mb-4">
            Manglik Report
          </div>
          
          <p className="text-sm text-stone-700 leading-relaxed px-4">
            {(!doshas || doshas.length === 0) 
              ? "The manglik dosha is absent in your horoscope."
              : "The manglik dosha is present in your horoscope, however it is less effective. With some remedies related to mangalik dosha this can be reduced further."}
          </p>
        </div>

      </div>
    </FixedPage>
  );
};
