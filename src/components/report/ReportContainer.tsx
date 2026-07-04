import React from 'react';
import { FullReportData } from '../../../types/astrology';

import { Page01Cover } from './pages/Page01Cover';
import { Page02Intro } from './pages/Page02Intro';
import { Page03BasicDetails } from './pages/Page03BasicDetails';
// import { Page04Planets } from './pages/Page04Planets';
// import { Page05ChartsLagna } from './pages/Page05ChartsLagna';
// import { Page06ChartsMoon } from './pages/Page06ChartsMoon';
// import { PageDasha } from './pages/PageDasha';
import { Page09ManglikIntro } from './pages/Page09ManglikIntro';
import { PageManglikAnalysis } from './pages/PageManglikAnalysis';
import { Page12ManglikMatch } from './pages/Page12ManglikMatch';
import { Page13DashakootIntro } from './pages/Page13DashakootIntro';
import { Page14DashakootTable } from './pages/Page14DashakootTable';
import { Page15Rajju } from './pages/Page15Rajju';
import { Page16Papasamyam } from './pages/Page16Papasamyam';
import { Page17Personality } from './pages/Page17Personality';
import { Page18Traits } from './pages/Page18Traits';
import { Page19Conclusion } from './pages/Page19Conclusion';
import { Page20Contact } from './pages/Page20Contact';
import { PageHoroscope } from './pages/PageHoroscope';

interface Props {
  data: FullReportData;
  lang: string;
}

export const ReportContainer: React.FC<Props> = ({ data, lang }) => {
  const matchData = data.matching;

  return (
    <div className="report-container flex flex-col items-center gap-8 py-8 bg-stone-100">
      <div className="report-page w-full flex flex-col items-center">
        <Page01Cover data={matchData} />
        <Page02Intro />
        <Page03BasicDetails data={matchData} />
        
        {/* Unsupported ASTRO SECTIONS DISABLED
        <Page04Planets data={matchData} />
        <Page05ChartsLagna data={matchData} />
        <Page06ChartsMoon data={matchData} />
        <PageDasha data={matchData} isBoy={true} />
        <PageDasha data={matchData} isBoy={false} />
        */}

        {data.boyHoroscope && <PageHoroscope title="Groom Horoscope" report={data.boyHoroscope} pageNumber={3} />}
        {data.girlHoroscope && <PageHoroscope title="Bride Horoscope" report={data.girlHoroscope} pageNumber={4} />}

        <Page09ManglikIntro />
        <PageManglikAnalysis data={matchData} isBoy={true} />
        <PageManglikAnalysis data={matchData} isBoy={false} />
        <Page12ManglikMatch data={matchData} />
        <Page13DashakootIntro />
        <Page14DashakootTable data={matchData} />
        <Page15Rajju data={matchData} />
        {/* <Page16Papasamyam data={matchData} /> API no longer provides Papasamyam */}
        {/* <Page17Personality data={matchData} /> API no longer provides Personality scores */}
        {/* <Page18Traits data={matchData} /> API no longer provides Traits/Longevity scores */}
        <Page19Conclusion data={matchData} />
        <Page20Contact data={matchData} />
      </div>
    </div>
  );
};
