import React from 'react';
import { FixedPage } from './FixedPage';

export const Page09ManglikIntro: React.FC = () => {
  return (
    <FixedPage pageNumber={9}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Manglik
          </div>
        </div>

        <div className="text-stone-800 space-y-4">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">What is manglik dosha?</h2>
          
          <p className="text-sm leading-relaxed text-stone-700">
            In the boy or the girls horoscope when Mars, Sun, Saturn, Rahu Or Ketu is
            in ascendant, fourth house, seventh house, eighth house or twelth
            house then it is called Manglik dosh.
          </p>
          <p className="text-sm leading-relaxed text-stone-700">
            Manglik dosh is considered stronger when Mars is placed in the
            ascendant than when Mars is conjoined with Moon in ascendant. If
            according to the Shastras the Manglik dosh of both the boy and the girl
            is getting cancelled then they are guaranteed a happily married life.
            On the other hand, if this Manglik dosh is not cancelled then they are likely to face unnecessary problems and
            hurdles in life.
          </p>
          <p className="text-sm leading-relaxed text-stone-700">
            So one must begin his/her married life after getting their horoscopes thoroughly matched. After getting the
            Manglik dosh properly cancelled the native shall be bestowed with a peaceful and wealthy life.
          </p>

          <h2 className="text-xl font-bold text-stone-800 tracking-wide mt-6">Manglik Dosha Effect</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm">When Mars is situated in the 1st house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">The 1st house represents the house of spouse. Thus it normally affects the married life leading to unnecessary conflicts. It might also lead to physical assault and violence. Due to such unacceptable behavior such a person might suffer from tension, distress, separation or even divorce.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm">When Mars is situated in the 2nd house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">A person’s family life is affected. It also creates obstacles in the married life and the professional life.</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm">When Mars is situated in the 4th house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">This will have adverse effects at the professional front. Such a person will switch jobs and also will not be successful professionally. Financial trouble will keep lurking.</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm">When Mars is situated in the 7th house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">Such a person has too much of energy and will be ill-tempered resulting in not being able to maintain cordial relationship with family members. Also this person will be very dominating and dictating over his or her partner and s/he might also have many partners.</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm">When Mars is in the 8th house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">Such a person will be lazy and will not be able to maintain a rapport with his or her elders and thus will lose paternal property.</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm">When Mars is situated in the 12th house:</h3>
              <p className="text-sm leading-relaxed text-stone-700">Manglik individuals will have enemies. S/he will also suffer from mental problems and financial losses.</p>
            </div>
          </div>
        </div>
      </div>
    </FixedPage>
  );
};
