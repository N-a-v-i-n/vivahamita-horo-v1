const fs = require('fs');

const en = {
  SUMMARY_SCORE_EXCELLENT: [
    "The horoscope comparison reveals a highly compatible relationship, securing an impressive {score} out of 36 points ({percent}%).",
    "The matching process indicates outstanding compatibility, achieving a remarkable {score} out of 36 points ({percent}%).",
    "With a strong score of {score} out of 36 ({percent}%), the astrological charts demonstrate excellent overall compatibility."
  ],
  SUMMARY_SCORE_AVERAGE: [
    "The matching indicates acceptable overall compatibility with a moderate score of {score} out of 36 points ({percent}%).",
    "The charts align moderately well, yielding a satisfactory matching score of {score} out of 36 points ({percent}%).",
    "Overall compatibility is at a standard level, securing {score} out of 36 points ({percent}%) in the matching assessment."
  ],
  SUMMARY_SCORE_LOW: [
    "The compatibility is significantly low, obtaining only {score} out of 36 points ({percent}%).",
    "The matching score is concerningly low, reaching just {score} out of 36 points ({percent}%).",
    "Astrological compatibility is weak, as the charts only score {score} out of 36 points ({percent}%)."
  ],
  THEME_STRONG_EMOTIONAL_PHYSICAL: [
    "The exceptional Graha Maitri and physical indicators point to strong intellectual understanding and deep mutual emotional bonding.",
    "A deep emotional and physical connection is indicated by the highly favorable Graha Maitri and Yoni compatibilities.",
    "The planetary alignments suggest a profound intellectual synergy and a strong physical foundation for the relationship."
  ],
  THEME_STRONG_INTELLECTUAL: [
    "The strong Graha Maitri indicates that communication, intellectual harmony, and mutual respect are likely to become pillars of this alliance.",
    "Favorable planetary friendship suggests excellent communication and a strong mutual understanding between the couple.",
    "Intellectual compatibility is a major strength of this match, fostering natural communication and shared perspectives."
  ],
  THEME_POOR_EMOTIONAL_FINANCIAL: [
    "However, the poor planetary friendship combined with Bhakoot imbalances suggests emotional friction and significant struggles in domestic coordination.",
    "Weak planetary friendship alongside Bhakoot dosha points toward potential emotional disconnects and challenges in managing domestic life.",
    "The charts indicate potential turbulence in emotional understanding and domestic finances due to unaligned planetary friendships and Bhakoot."
  ],
  THEME_WEAK_INTELLECTUAL: [
    "The weak planetary friendship suggests potential communication gaps and differences in ideological perspectives.",
    "A lack of strong planetary friendship indicates that the couple may need to work harder on communication and mutual understanding.",
    "Ideological differences and communication challenges are possible due to the weak Graha Maitri."
  ],
  THEME_AVERAGE_BONDING: [
    "The planetary indicators suggest a standard level of mutual understanding and emotional connection.",
    "Emotional and intellectual compatibility is average, providing a standard foundation for the relationship.",
    "The couple shares a moderate level of emotional bonding and communication potential."
  ],
  THEME_EXCELLENT_PROSPERITY_PROGENY: [
    "Financial prospects, domestic stability, and family growth appear highly favorable due to the supportive Nadi and Bhakoot combinations.",
    "The strong Nadi and Bhakoot indicators promise excellent domestic harmony, financial growth, and family expansion.",
    "Prosperity, health, and family well-being are strongly supported by the highly auspicious Nadi and Bhakoot placements."
  ],
  THEME_CHALLENGING_HEALTH_FINANCE: [
    "While health prospects are standard, financial and domestic stability may face significant headwinds according to Bhakoot indicators.",
    "Health indicators are adequate, but the Bhakoot mismatch suggests potential hurdles in financial and domestic growth.",
    "Despite stable health prospects, the couple may need to navigate financial and domestic challenges due to Bhakoot variance."
  ],
  THEME_FINANCIAL_CHALLENGES: [
    "The inauspicious Bhakoot placement indicates severe financial leakages or domestic expansion stress.",
    "A problematic Bhakoot dosha warns of potential financial instability and difficulties in domestic harmony.",
    "Financial challenges and domestic friction are likely areas of concern due to the unfavorable Bhakoot alignment."
  ],
  THEME_HEALTH_PROGENY_CONCERNS: [
    "The lack of Nadi compatibility raises traditional concerns regarding long-term health and the overall vitality of progeny.",
    "A Nadi mismatch introduces significant astrological concerns regarding the couple's long-term health and family expansion.",
    "Traditional indicators warn of potential health and progeny challenges due to the absence of Nadi compatibility."
  ],
  THEME_MANGLIK_MITIGATED_BY_PAAPA: [
    "Although an active Manglik dosha conflict exists, the balanced malefic influence (Paapa Samyam) between both charts significantly mitigates the severity of this affliction.",
    "The presence of Kuja Dosha is a concern, but it is heavily neutralized by a highly compatible malefic balance (Paapa Samyam).",
    "A Manglik mismatch is present; however, the excellent balance of malefic planets (Paapa Samyam) provides strong astrological mitigation."
  ],
  THEME_MANGLIK_AND_PAAPA_CONFLICT: [
    "The charts indicate significant astrological friction due to an active Manglik dosha conflict paired with an incompatible malefic balance (Paapa Samyam).",
    "A critical astrological conflict is observed due to the presence of Kuja Dosha, which is further aggravated by an unaligned malefic balance (Paapa Samyam).",
    "The combination of an active Manglik dosha and a severe Paapa Samyam mismatch creates significant astrological hurdles for this alliance."
  ],
  THEME_MANGLIK_CANCELLED_GOOD_PAAPA: [
    "The presence of Manglik dosha in both charts naturally cancels the affliction, and the highly favorable malefic balance (Paapa Samyam) further stabilizes the alliance.",
    "Kuja Dosha is mutually cancelled between the charts, and the excellent Paapa Samyam balance provides an exceptionally stable foundation.",
    "With Manglik dosha neutralized and a highly compatible malefic balance (Paapa Samyam), the astrological foundation of this match is very secure."
  ],
  THEME_MANGLIK_CANCELLED_BAD_PAAPA: [
    "While the Manglik dosha cancels out between the charts, an incompatible malefic balance (Paapa Samyam) remains a point of astrological concern.",
    "Kuja Dosha is mutually neutralized, but the couple still faces challenges due to a mismatched malefic balance (Paapa Samyam).",
    "The mutual cancellation of Manglik dosha is a positive, yet the incompatible Paapa Samyam introduces underlying astrological friction."
  ],
  THEME_NO_MANGLIK_BUT_BAD_PAAPA: [
    "While there are no major Manglik dosha conflicts, the malefic planetary balance (Paapa Samyam) between the charts is incompatible, requiring careful consideration.",
    "The charts are free from Kuja Dosha, but the unbalanced malefic points (Paapa Samyam) pose a notable astrological challenge.",
    "Although Manglik dosha is absent, an incompatible Paapa Samyam indicates potential friction that should not be ignored."
  ],
  THEME_DOSHA_FREE_AND_GOOD_PAAPA: [
    "Astrologically, the charts are well-aligned with no major dosha afflictions, and the malefic planetary balance (Paapa Samyam) is highly favorable.",
    "The alliance is completely free of major doshas, and the excellent Paapa Samyam balance promises a highly harmonious union.",
    "With no significant doshas and a perfectly balanced malefic profile (Paapa Samyam), the astrological alignment is exceptionally strong."
  ],
  THEME_RAJJU_FAILURE_WARNING: [
    "Despite other positive factors, the Rajju Porutham mismatch introduces a traditional caution related to long-term marital stability and the well-being of the spouse.",
    "A critical Rajju Porutham failure serves as a traditional warning regarding marital longevity, requiring careful astrological evaluation.",
    "While many factors are supportive, the failure in Rajju Porutham raises serious traditional concerns regarding the long-term stability of the marriage."
  ],
  CONCLUSION_HIGHLY_RECOMMENDED: [
    "Overall, this is a strong match free from major astrological afflictions, and marriage is highly recommended.",
    "In conclusion, the exceptional astrological alignment makes this a highly auspicious match, and marriage is strongly recommended.",
    "Given the extremely favorable combinations, this is a highly recommended and highly auspicious alliance."
  ],
  CONCLUSION_RECOMMENDED_WITH_CAUTION: [
    "Overall, this alliance is recommended, but with caution. A complete horoscope review by a qualified astrologer is advised to address the flagged traditional concerns.",
    "In conclusion, the match is acceptable but carries traditional cautions. Consulting an astrologer for specific remedies is highly advised before proceeding.",
    "While generally favorable, this marriage is recommended with caution due to the specific astrological warnings flagged above."
  ],
  CONCLUSION_NOT_RECOMMENDED: [
    "Overall, this alliance is not recommended. It requires careful remediation and in-depth consultation due to low matching points and severe astrological mismatches.",
    "In conclusion, due to the critical astrological conflicts and low compatibility scores, this marriage is generally not recommended.",
    "Given the severity of the doshas and the low overall score, this alliance is not recommended without extensive astrological remediation."
  ]
};

// We will keep Telugu, Hindi, Tamil, Kannada simple for now by duplicating the original string 
// into an array so that the engine doesn't break, and then we can update `AstrologyInterpretationEngine.ts` to pick randomly from the array.

const langs = ['en', 'te', 'hi', 'ta', 'kn'];

for (const lang of langs) {
  const filePath = `src/localization/${lang}.json`;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (lang === 'en') {
      data.INTERPRETATION = en;
  } else {
      // If it's a regional language, we ensure it's an array. If it's a string, we wrap it in an array.
      // We'll duplicate the string slightly to add variation safely without breaking grammar.
      for (const key in data.INTERPRETATION) {
          const val = data.INTERPRETATION[key];
          if (typeof val === 'string') {
              data.INTERPRETATION[key] = [
                  val,
                  val.replace('మొత్తం మీద', 'ముగింపుగా').replace('कुल मिलाकर', 'निष्कर्ष के रूप में').replace('ஒட்டுமொத்தமாக', 'முடிவாக').replace('ಒಟ್ಟಾರೆಯಾಗಿ', 'ಕೊನೆಯದಾಗಿ'),
                  val
              ];
          }
      }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

console.log('Localization updated with array variations.');
