import React from 'react';
import { getReportString } from '../../utils/reportLocalization';

interface Props {
  lang: string;
  pageNumber: number;
}

export const Footer: React.FC<Props> = ({ lang, pageNumber }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full px-12 py-8 flex justify-between items-center z-10">
      <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
        {getReportString(lang, "footerText" as any) || "Vivahamitra Professional Report"}
      </p>
      
      <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-xs font-serif text-stone-400">
        {pageNumber}
      </div>
    </div>
  );
};
