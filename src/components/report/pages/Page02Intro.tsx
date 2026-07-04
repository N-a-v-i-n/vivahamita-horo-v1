import React from 'react';
import { FixedPage } from './FixedPage';

export const Page02Intro: React.FC = () => {
  return (
    <FixedPage pageNumber={2}>
      {/* Orange Header Banner */}
      <div className="w-full h-48 bg-[#F39C12] relative overflow-hidden flex flex-col justify-center items-center">
        {/* Placeholder for the intricate background and illustrations in the header */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/816x192/orange/white?text=Header+Pattern)' }}></div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 relative z-10 drop-shadow-sm text-center leading-snug">
          Ashtakoota Milan:<br/>Matching Compatibility
        </h1>
        {/* Placeholder for the central illustration */}
        <div className="mt-2 relative z-10 w-24 h-24 bg-transparent border border-black/10 rounded-full flex items-center justify-center">
           <span className="text-xs text-black/50">Illustration</span>
        </div>
      </div>

      {/* Main Content Area with slanted background */}
      <div className="flex-1 relative w-full overflow-hidden bg-white">
        {/* Slanted Beige Background Element */}
        <div 
          className="absolute right-0 bottom-0 top-0 w-3/4 bg-[#FFF9E6] transform origin-bottom-right"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
        ></div>

        <div className="relative z-10 px-16 py-12 h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-800 tracking-wide">
              Importance of Match Making
            </h2>
            {/* Decorative Divider */}
            <div className="flex items-center justify-center mt-3">
              <div className="w-16 h-px bg-stone-300"></div>
              <div className="mx-2 text-[#992222] font-serif text-xl">~</div>
              <div className="w-16 h-px bg-stone-300"></div>
            </div>
          </div>

          <div className="text-stone-800 space-y-6 flex-1">
            <p className="text-2xl font-medium text-[#4A4E69] leading-snug">
              'Vivaha' or Marriage is one of the 16 Samskaras or
              religious conducts/rites. Samskaras are the different
              crucial turning points in a person's life; hence they are
              respected and celebrated.
            </p>

            <p className="text-base leading-relaxed text-stone-700">
              Hindu scriptures consider marriage as a very holy union determined even before birth.
              Hence match-making assumes a great significance to understand the physical, mental,
              intellectual and behavioral compatibility of the potential couple. Marriage Matchmaking
              has now assumed a greater significance with the changing socio-economic conditions and
              radical modifications in the status and role of women in family life. Besides comparing the
              educational, cultural and professional backgrounds, the prospective bride/groom and their
              parents are also interested in assuring whether their married life will be happy,
              harmonious and fruitful too.
            </p>

            <p className="text-base leading-relaxed text-stone-700">
              In this match making report, you are given a comprehensive match making analysis by
              considering Ashtakoot matching, Dashkoot Matching, Manglik Matching, Vedha dosh
              analysis and Rajju dosh analysis.
            </p>
          </div>
        </div>
      </div>
    </FixedPage>
  );
};
