import React from 'react';
import { FixedPage } from './FixedPage';

// Updating type since actual backend response is a flat object
interface HoroscopeData {
  daily?: string;
  weekly?: string;
  monthly?: string;
  yearly?: string;
  career?: string;
  marriage?: string;
  business?: string;
  health?: string;
  education?: string;
  travel?: string;
  finance?: string;
  children?: string;
  remedies?: string;
  luckyNumber?: number;
  luckyColor?: string;
  luckyDirection?: string;
  luckyGemstone?: string;
}

interface Props {
  title: string;
  report: HoroscopeData;
  pageNumber: number;
}

export const PageHoroscope: React.FC<Props> = ({ title, report, pageNumber }) => {
  if (!report) {
    return null;
  }

  const sections = [
    { label: "Daily Horoscope", key: report.daily },
    { label: "Weekly Horoscope", key: report.weekly },
    { label: "Monthly Horoscope", key: report.monthly },
    { label: "Yearly Horoscope", key: report.yearly },
    { label: "Career & Profession", key: report.career },
    { label: "Marriage & Relationships", key: report.marriage },
    { label: "Business & Wealth", key: report.business },
    { label: "Health & Vitality", key: report.health },
    { label: "Education & Learning", key: report.education },
    { label: "Travel", key: report.travel },
    { label: "Finance", key: report.finance },
    { label: "Children", key: report.children },
    { label: "Remedies", key: report.remedies }
  ];

  return (
    <div className="w-full bg-white relative z-10 text-stone-800 pb-8 mb-8">
      
      {/* Header Pill */}
      <div className="pdf-page-avoid-break relative mx-auto pt-10 pb-4 px-12" style={{ width: '100%', maxWidth: '816px' }}>
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            {title}
          </div>
        </div>
      </div>

      {/* Lucky Attributes */}
      <div className="pdf-page-avoid-break relative mx-auto pb-4 px-12" style={{ width: '100%', maxWidth: '816px' }}>
        <div className="bg-[#FFF9F0] p-4 rounded-lg border border-[#FDE68A] shadow-sm">
          <h2 className="text-lg font-bold text-[#E67E22] border-b border-[#FDE68A] pb-2 mb-3">Lucky Attributes</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-stone-800">
            {report.luckyNumber && <div><span className="font-semibold text-[#992222]">Lucky Number:</span> {report.luckyNumber}</div>}
            {report.luckyColor && <div><span className="font-semibold text-[#992222]">Lucky Color:</span> {report.luckyColor}</div>}
            {report.luckyGemstone && <div><span className="font-semibold text-[#992222]">Lucky Gemstone:</span> {report.luckyGemstone}</div>}
            {report.luckyDirection && <div><span className="font-semibold text-[#992222]">Lucky Direction:</span> {report.luckyDirection}</div>}
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {sections.map((section, idx) => {
        if (!section.key) return null;
        return (
          <div key={idx} className="pdf-page-avoid-break relative mx-auto pb-5 px-12" style={{ width: '100%', maxWidth: '816px' }}>
            <h2 className="text-base font-bold text-[#992222] border-b border-stone-200 pb-1 mb-1.5">{section.label}</h2>
            <div className="text-sm text-stone-700 leading-relaxed">
              {section.key}
            </div>
          </div>
        );
      })}
    </div>
  );
};
