import React from 'react';

interface Props {
  title?: string;
  planets?: Record<string, any>;
  dataAvailable?: boolean;
}

export const SouthIndianChart: React.FC<Props> = ({ title, planets, dataAvailable = true }) => {
  // South Indian Chart Fixed Sign Layout (1-indexed)
  // 12 (Pisces), 1 (Aries), 2 (Taurus), 3 (Gemini)
  // 11 (Aquarius),                 4 (Cancer)
  // 10 (Capricorn),                5 (Leo)
  // 9 (Sagittarius), 8 (Scorpio), 7 (Libra), 6 (Virgo)

  const getPlanetsForSign = (signStr: string) => {
    if (!planets) return [];
    return Object.entries(planets)
      .filter(([id, data]) => data.sign.toLowerCase().includes(signStr.toLowerCase()))
      .map(([id]) => id.substring(0, 2)); // Return 2 letter abbreviation
  };

  const getAscendantForSign = (signStr: string) => {
    if (!planets || !planets['Ascendant']) return false;
    return planets['Ascendant'].sign.toLowerCase().includes(signStr.toLowerCase());
  };

  const Box = ({ signStr, signNum, customClass = "" }: { signStr: string, signNum: number, customClass?: string }) => {
    const p = getPlanetsForSign(signStr);
    const isLagna = getAscendantForSign(signStr);
    
    return (
      <div className={`relative border border-[#E67E22] flex items-center justify-center p-1 overflow-hidden ${customClass}`}>
        <div className="absolute top-0.5 right-1 text-[8px] text-stone-300 font-bold">{signNum}</div>
        {isLagna && <div className="absolute top-0.5 left-1 text-[9px] text-red-600 font-bold">As</div>}
        <div className="flex flex-wrap justify-center items-center gap-0.5 max-w-full">
          {p.map((pl, idx) => (
            <span key={idx} className="text-[9px] font-bold text-stone-700">{pl}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-sm font-bold text-stone-700 mb-2">{title}</h3>}
      <div className="relative w-64 h-64 border-2 border-[#E67E22] bg-white grid grid-cols-4 grid-rows-4">
        
        {/* Row 1 */}
        <Box signStr="Pisces" signNum={12} />
        <Box signStr="Aries" signNum={1} />
        <Box signStr="Taurus" signNum={2} />
        <Box signStr="Gemini" signNum={3} />
        
        {/* Row 2 */}
        <Box signStr="Aquarius" signNum={11} />
        <div className="col-span-2 row-span-2 flex items-center justify-center relative bg-stone-50/50">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[#E67E22] opacity-10 text-6xl" style={{ fontFamily: "serif" }}>ॐ</span>
          </div>
          {!planets && <span className="text-stone-400 text-xs font-semibold relative z-10">Not Provided</span>}
        </div>
        <Box signStr="Cancer" signNum={4} />

        {/* Row 3 */}
        <Box signStr="Capricorn" signNum={10} />
        <Box signStr="Leo" signNum={5} />

        {/* Row 4 */}
        <Box signStr="Sagittarius" signNum={9} />
        <Box signStr="Scorpio" signNum={8} />
        <Box signStr="Libra" signNum={7} />
        <Box signStr="Virgo" signNum={6} />

      </div>
    </div>
  );
};
