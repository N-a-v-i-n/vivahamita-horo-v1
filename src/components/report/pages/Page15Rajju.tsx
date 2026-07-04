import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

export const Page15Rajju: React.FC<Props> = ({ data }) => {
  return (
    <FixedPage pageNumber={15}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            South Indian Porutham & Check
          </div>
        </div>

        <div className="text-stone-800 space-y-4 mb-8">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">Mandatory Failures</h2>
          
          <div className="bg-[#FFF0F0] border-l-4 border-[#F44336] p-4">
            {data.mandatoryFailures && data.mandatoryFailures.length > 0 ? (
              <ul className="list-disc pl-4 text-sm text-stone-700 space-y-1">
                {data.mandatoryFailures.map((failure, idx) => (
                  <li key={idx} className="font-semibold">{failure}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-green-700 font-bold">None</p>
            )}
          </div>
        </div>

        <div className="w-full mt-4">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide mb-4">South Indian Porutham Analysis</h2>
          
          <div className="flex flex-col gap-4">
            {data.southIndianPorutham && data.southIndianPorutham.length > 0 ? (
              data.southIndianPorutham.map((porutham, idx) => (
                <div key={idx} className="border border-stone-200 rounded p-4 bg-[#F9FAFB]">
                  <div className="flex items-center justify-between mb-2 border-b border-stone-200 pb-2">
                    <h4 className="font-bold text-stone-800">{porutham.localizedName || porutham.name}</h4>
                    <span className={`px-3 py-1 rounded text-xs font-bold text-white ${porutham.status === 'Uttama' ? 'bg-[#4CAF50]' : porutham.status === 'Madhyama' ? 'bg-[#FF9800]' : 'bg-[#F44336]'}`}>
                      {porutham.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">{porutham.description}</p>
                </div>
              ))
            ) : (
              <div className="border border-stone-200 rounded p-4 bg-[#F9FAFB]">
                <p className="text-sm text-stone-700">Not Provided</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
