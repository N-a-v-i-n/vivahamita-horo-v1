import { AstrologyService } from '../src/services/astrologyService';

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function runFuzzTest() {
  const TOTAL_TESTS = 10000;
  let contradictionCount = 0;
  let falseManglikCancellations = 0;
  let financialContradictions = 0;

  let bhakootZeroCount = 0;
  const rasiDiffStats: Record<number, number> = {};

  for (let i = 0; i < TOTAL_TESTS; i++) {
    const boyInput = {
      year: Math.floor(randomRange(1970, 2010)),
      month: Math.floor(randomRange(1, 12)),
      day: Math.floor(randomRange(1, 28)),
      hour: Math.floor(randomRange(0, 23)),
      minute: Math.floor(randomRange(0, 59)),
      latitude: randomRange(8, 35),
      longitude: randomRange(68, 97),
      timezone: 5.5,
      ayanamsa: "Lahiri" as const,
      lang: "en" as const
    };

    const girlInput = {
      year: Math.floor(randomRange(1970, 2010)),
      month: Math.floor(randomRange(1, 12)),
      day: Math.floor(randomRange(1, 28)),
      hour: Math.floor(randomRange(0, 23)),
      minute: Math.floor(randomRange(0, 59)),
      latitude: randomRange(8, 35),
      longitude: randomRange(68, 97),
      timezone: 5.5,
      ayanamsa: "Lahiri" as const,
      lang: "en" as const
    };

    const result = AstrologyService.calculateMatching(boyInput, girlInput, 'en');

    const bhakootDesc = result.ashtaKoota.find((k: any) => k.name === "Bhakoot")?.description;
    const match = bhakootDesc?.match(/distance:\s*(\d+)/i) || bhakootDesc?.match(/distance\s*(\d+)/i);
    const bRasi = AstrologyService.calcPanchang(boyInput).planets.find(p => p.name === "Moon")!.rasiIndex;
    const gRasi = AstrologyService.calcPanchang(girlInput).planets.find(p => p.name === "Moon")!.rasiIndex;
    const rasiDiff = (gRasi - bRasi + 12) % 12;

    rasiDiffStats[rasiDiff] = (rasiDiffStats[rasiDiff] || 0) + 1;

    const bhakoot = result.ashtaKoota.find((k: any) => k.koota === "Bhakoot")?.obtainedPoints;
    const varna = result.ashtaKoota.find((k: any) => k.koota === "Varna")?.obtainedPoints;
    
    if (rasiDiff === 6 && bhakoot !== 0 && i < 10) {
      console.log(`Mismatch! rasiDiff is 6, but bhakoot is ${bhakoot}. bRasi: ${bRasi}, gRasi: ${gRasi}`);
    }
    
    if (bhakoot === 0) bhakootZeroCount++;

    if (bhakoot === 0 && (result as any).financeScoreInsight?.value === "Stable Financial Growth") {
      financialContradictions++;
      contradictionCount++;
    }

    if ((result as any).doshaMatching?.hasManglikDoshaConflict && (result as any).doshaMatching?.isCancelled) {
      falseManglikCancellations++;
      contradictionCount++;
    }
  }

  console.log('--- FUZZ TEST RESULTS ---');
  console.log(`Total Cases Run: ${TOTAL_TESTS}`);
  console.log(`Bhakoot = 0 count: ${bhakootZeroCount}`);
  console.log('Rasi Diff Distribution:', rasiDiffStats);
  console.log(`Financial Contradictions (Bhakoot=0 but Finance=Stable): ${financialContradictions}`);
  console.log(`False Manglik Cancellations: ${falseManglikCancellations}`);
  console.log(`Total Contradictions: ${contradictionCount}`);
}

runFuzzTest();
