import React from 'react';

interface Props {
  title?: string;
  dataAvailable?: boolean;
}

export const NorthIndianChart: React.FC<Props> = ({ title, dataAvailable = false }) => {
  // A North Indian chart is a square with diagonals and mid-points connected.
  // We will draw it using SVG lines.
  
  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-sm font-bold text-stone-700 mb-2">{title}</h3>}
      <div className="relative w-64 h-64 border-2 border-[#E67E22] bg-white">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#E67E22] stroke-[0.5] fill-transparent">
          {/* Main diagonals */}
          <line x1="0" y1="0" x2="100" y2="100" />
          <line x1="100" y1="0" x2="0" y2="100" />
          
          {/* Inner square */}
          <line x1="50" y1="0" x2="100" y2="50" />
          <line x1="100" y1="50" x2="50" y2="100" />
          <line x1="50" y1="100" x2="0" y2="50" />
          <line x1="0" y1="50" x2="50" y2="0" />
        </svg>

        {/* If no data, show Not Provided in the center (House 1) */}
        {!dataAvailable && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-stone-400 text-xs font-semibold">Not Provided</span>
          </div>
        )}
      </div>
    </div>
  );
};
