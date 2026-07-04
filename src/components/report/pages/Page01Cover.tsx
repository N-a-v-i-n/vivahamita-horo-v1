import React from 'react';
import { MatchingResult } from '../../../../types/astrology';
import { FixedPage } from './FixedPage';

interface Props {
  data: MatchingResult;
}

export const Page01Cover: React.FC<Props> = ({ data }) => {
  const boy = data.boyInfo;
  const girl = data.girlInfo;

  return (
    <FixedPage pageNumber={1}>
      <div className="flex-1 flex flex-col items-center justify-between py-12 relative w-full h-full">
        {/* Background Mandala Image - normally an actual asset, using a repeating CSS pattern for now as placeholder */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 0%, #FAFAFA 100%)'
        }}></div>

        <div className="z-10 flex flex-col items-center mt-16">
          {/* Ganesha Image Placeholder */}
          <div className="w-48 h-48 mb-6 bg-transparent flex items-center justify-center">
             <img src="https://placehold.co/400x400/transparent/orange?text=Ganesha" alt="Ganesha" className="object-contain" />
          </div>
          
          <h1 className="text-4xl font-serif text-[#E67E22] mb-12">
            || श्री गणेशाय नमः ||
          </h1>
        </div>

        {/* Orange Banner */}
        <div className="w-full bg-[#F39C12] text-white py-12 z-10">
          <h2 className="text-center text-3xl font-semibold uppercase tracking-wider mb-8">
            Match Making
          </h2>
          
          <div className="flex justify-center items-center gap-16 px-12">
            {/* Boy */}
            <div className="text-right flex-1">
              <h3 className="text-xl font-bold uppercase mb-2">
                {boy?.name || 'Boy'} 
              </h3>
              <p className="text-sm opacity-90 font-medium">
                {boy?.dateOfBirth ? `${boy.dateOfBirth} ${boy.timeOfBirth || ''}` : "Date Not Provided"}
              </p>
              <p className="text-sm opacity-90 font-medium">
                {boy?.placeOfBirth || boy?.coordinates || "Place Not Provided"}
              </p>
            </div>

            {/* Heart Icon */}
            <div className="flex-shrink-0">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>

            {/* Girl */}
            <div className="text-left flex-1">
              <h3 className="text-xl font-bold uppercase mb-2">
                {girl?.name || 'Girl'}
              </h3>
              <p className="text-sm opacity-90 font-medium">
                {girl?.dateOfBirth ? `${girl.dateOfBirth} ${girl.timeOfBirth || ''}` : "Date Not Provided"}
              </p>
              <p className="text-sm opacity-90 font-medium">
                {girl?.placeOfBirth || girl?.coordinates || "Place Not Provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="z-10 mb-8 mt-auto">
          {/* Logo Placeholder */}
          <div className="text-3xl font-bold flex items-center tracking-tight">
            <span className="text-[#E67E22]">Vivahamitra</span>
          </div>
        </div>
      </div>
    </FixedPage>
  );
};
