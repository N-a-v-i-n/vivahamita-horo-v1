import React from 'react';

export const getKootaExplanation = (kootaName: string) => {
  const name = kootaName.toLowerCase();
  if (name.includes('varna')) return { desc: 'Represents work compatibility and ego.', meaning: 'Indicates spiritual compatibility and ego levels between partners. High scores suggest mutual respect.' };
  if (name.includes('vashya')) return { desc: 'Represents mutual attraction and control.', meaning: 'Measures magnetic attraction and affection, indicating dominant dynamics.' };
  if (name.includes('tara')) return { desc: 'Represents health and well-being.', meaning: 'Evaluates destiny and health compatibility. Signifies bringing good luck to one another.' };
  if (name.includes('yoni')) return { desc: 'Represents physical and intimate harmony.', meaning: 'Analyzes sexual compatibility and biological affinity for a fulfilling intimate relationship.' };
  if (name.includes('graha')) return { desc: 'Represents mental compatibility and friendship.', meaning: 'Reflects psychological and intellectual connection. Denotes strong mutual understanding.' };
  if (name.includes('gana')) return { desc: 'Represents temperament and behavior.', meaning: 'Assesses temperamental compatibility and how the couple handles daily life challenges together.' };
  if (name.includes('bhakoot')) return { desc: 'Represents emotional harmony and growth.', meaning: 'Focuses on emotional bond and family growth. Low scores indicate potential friction.' };
  if (name.includes('nadi')) return { desc: 'Represents genetic and physiological health.', meaning: 'Assesses physiological compatibility, traditionally vital for longevity and health.' };
  
  return { desc: 'Astrological compatibility metric.', meaning: 'Contributes to the overall harmony of the relationship.' };
};

interface Props {
  koota: any;
  lang: string;
}

export const KootaScoreCard: React.FC<Props> = ({ koota, lang }) => {
  const percentage = (koota.obtainedPoints / koota.maxPoints) * 100 || 0;
  const isExcellent = koota.obtainedPoints === koota.maxPoints;
  const isGood = percentage >= 50 && !isExcellent;
  
  const { desc, meaning } = getKootaExplanation(koota.koota);

  return (
    <div className="flex flex-col mb-0 border-b border-stone-200 pb-1">
      <div className="mb-0">
        <h3 className="text-lg font-serif font-bold text-stone-800 uppercase tracking-wide">
          {koota.localizedKoota || koota.koota}: {koota.obtainedPoints} / {koota.maxPoints}
        </h3>
        <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${isExcellent ? 'text-emerald-600' : isGood ? 'text-amber-600' : 'text-rose-600'}`}>
          {isExcellent ? 'Excellent Match' : isGood ? 'Favorable Match' : 'Attention Required'}
        </p>
      </div>

      <div className="flex flex-col gap-0">
        <p className="text-sm text-stone-700 leading-snug"><strong className="text-stone-900">Explanation:</strong> {desc}</p>
        <p className="text-sm text-stone-700 leading-snug"><strong className="text-stone-900">Practical Meaning:</strong> {meaning}</p>
      </div>
    </div>
  );
};
