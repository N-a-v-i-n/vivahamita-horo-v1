import { MatchingResult } from "../types/astrology";

export const extractKoota = (matching: MatchingResult, kootaId: string) => {
  return matching.ashtaKoota?.find(k => k.koota.toLowerCase() === kootaId.toLowerCase());
};

export const getCompatibilityCategory = (percentage: number) => {
  if (percentage >= 80) return "excellent";
  if (percentage >= 70) return "veryGood";
  if (percentage >= 60) return "good";
  if (percentage >= 50) return "average";
  if (percentage >= 40) return "needsCare";
  return "lowCompatibility";
};

export const mapCompatibilityAnalysis = (matching: MatchingResult, missingMsg: string) => {
  const vashya = extractKoota(matching, "Vashya");
  const grahaMaitri = extractKoota(matching, "Graha Maitri");
  const gana = extractKoota(matching, "Gana");
  const tara = extractKoota(matching, "Tara");
  const yoni = extractKoota(matching, "Yoni");

  return {
    emotional: vashya ? {
      score: vashya.obtainedPoints,
      max: vashya.maxPoints,
      desc: vashya.description
    } : { desc: missingMsg, score: 0, max: 2 },
    
    communication: grahaMaitri ? {
      score: grahaMaitri.obtainedPoints,
      max: grahaMaitri.maxPoints,
      desc: grahaMaitri.description
    } : { desc: missingMsg, score: 0, max: 5 },
    
    family: gana ? {
      score: gana.obtainedPoints,
      max: gana.maxPoints,
      desc: gana.description
    } : { desc: missingMsg, score: 0, max: 6 },
    
    financial: tara ? {
      score: tara.obtainedPoints,
      max: tara.maxPoints,
      desc: tara.description
    } : { desc: missingMsg, score: 0, max: 3 },
    
    physical: yoni ? {
      score: yoni.obtainedPoints,
      max: yoni.maxPoints,
      desc: yoni.description
    } : { desc: missingMsg, score: 0, max: 4 }
  };
};

export const getDoshaSummary = (matching: MatchingResult) => {
  if (!matching.doshaMatching) return null;
  const { boyDoshas, girlDoshas, hasManglikDoshaConflict, isCancelled, cancellationDetails } = matching.doshaMatching;
  
  return {
    manglikConflict: hasManglikDoshaConflict,
    isCancelled: isCancelled,
    cancellationDetails: cancellationDetails || null,
    boyDoshas: boyDoshas || [],
    girlDoshas: girlDoshas || []
  };
};
