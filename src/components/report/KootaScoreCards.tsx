import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';

interface Props {
  data: MatchingResult;
  lang: string;
  startIndex?: number;
  endIndex?: number;
}

const getKootaExplanation = (kootaName: string) => {
  const name = kootaName.toLowerCase();
  if (name.includes('varna')) return { desc: 'Represents work compatibility and ego.', meaning: 'Indicates the spiritual compatibility and the ego levels between the partners. A high score suggests mutual respect for each other\'s life paths.' };
  if (name.includes('vashya')) return { desc: 'Represents mutual attraction and control.', meaning: 'Measures the magnetic attraction and affection between the couple, indicating who might be the more dominant partner.' };
  if (name.includes('tara')) return { desc: 'Represents health and well-being.', meaning: 'Evaluates the destiny and health compatibility. A good score signifies that the couple will bring good luck to one another.' };
  if (name.includes('yoni')) return { desc: 'Represents physical and intimate harmony.', meaning: 'Analyzes sexual compatibility and biological affinity, which is crucial for a harmonious and fulfilling intimate relationship.' };
  if (name.includes('graha')) return { desc: 'Represents mental compatibility and friendship.', meaning: 'Reflects the psychological and intellectual connection. A high score denotes strong mutual understanding and a lasting friendship.' };
  if (name.includes('gana')) return { desc: 'Represents temperament and behavior.', meaning: 'Assesses the temperamental compatibility (Deva, Manushya, Rakshasa). It indicates how well the couple handles daily life challenges together.' };
  if (name.includes('bhakoot')) return { desc: 'Represents emotional harmony and growth.', meaning: 'Focuses on the emotional bond, prosperity, and family growth. A low score here may indicate potential financial or emotional friction.' };
  if (name.includes('nadi')) return { desc: 'Represents genetic and physiological health.', meaning: 'The most heavily weighted factor. It assesses physiological compatibility and is traditionally considered vital for healthy progeny and longevity.' };
  
  return { desc: 'Astrological compatibility metric.', meaning: 'Contributes to the overall harmony of the relationship.' };
};

export const KootaScoreCards: React.FC<Props> = ({ data, lang, startIndex = 0, endIndex = 8 }) => {
  const allKootas = data.ashtaKoota || [];
  const kootas = allKootas.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-col gap-6">
      {kootas.map((koota, index) => {
        const percentage = (koota.obtainedPoints / koota.maxPoints) * 100 || 0;
        const isExcellent = koota.obtainedPoints === koota.maxPoints;
        const isGood = percentage >= 50 && !isExcellent;
        
        const color = isExcellent ? 'emerald' : isGood ? 'amber' : 'rose';
        const { desc, meaning } = getKootaExplanation(koota.koota);
        
        const radius = 24;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
          <div key={index} className="flex flex-col bg-white rounded-[32px] p-8 shadow-xl border border-stone-100 relative">
            
            <div className={`absolute top-0 left-0 w-2 h-full bg-${color}-500 rounded-l-[32px]`}></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                
                {/* SVG Circular Indicator */}
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                    <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-stone-100" />
                    <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent"
                      strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                      className={`text-${color}-500 transition-all duration-1000`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-stone-800 text-sm">
                    {koota.obtainedPoints}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-800 uppercase tracking-wide">
                    {koota.localizedKoota || koota.koota}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      isExcellent ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      isGood ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      {isExcellent ? 'Excellent Match' : isGood ? 'Favorable Match' : 'Attention Required'}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Max Score: {koota.maxPoints}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-1000 bg-${color}-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/50 p-5 rounded-2xl border border-stone-100">
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Explanation</p>
                <p className="text-sm font-medium text-stone-600 leading-relaxed">{desc}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Practical Meaning</p>
                <p className="text-sm font-medium text-stone-600 leading-relaxed">{meaning}</p>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
