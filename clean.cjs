const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, 'src', 'services', 'astrologyService.ts');
const fileContent = fs.readFileSync(targetFilePath, 'utf8');

const startMarker = '// Ashta Koota Matching & Porutham Matching';
const endMarker = '  public static getNumerology(';

const startIndex = fileContent.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Could not find start marker");
  process.exit(1);
}

const endIndex = fileContent.indexOf(endMarker);
if (endIndex === -1) {
  console.error("Could not find end marker");
  process.exit(1);
}

const newMethodCode = `// Ashta Koota Matching & Porutham Matching
  public static calculateMatching(boyInput: BirthInput, girlInput: BirthInput, lang: LanguageCode): MatchingResult {
    // Generate panchang for both to get moon properties
    const boyPanchang = AstrologyService.calcPanchang(boyInput);
    const girlPanchang = AstrologyService.calcPanchang(girlInput);

    const bNak = boyPanchang.nakshatra.index;
    const gNak = girlPanchang.nakshatra.index;

    const bRasi = boyPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;
    const gRasi = girlPanchang.planets.find(p => p.name === "Moon")!.rasiIndex;

    const ashtaKoota: MatchScore[] = [];

    // Helper tables for names & properties to ensure fully standalone status
    const LORD_FRIENDS = {
      Sun: { friends: ["Moon", "Mars", "Jupiter"], enemies: ["Saturn", "Venus"], neutrals: ["Mercury"] },
      Moon: { friends: ["Sun", "Mercury"], enemies: [], neutrals: ["Mars", "Jupiter", "Venus", "Saturn"] },
      Mars: { friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"], neutrals: ["Venus", "Saturn"] },
      Mercury: { friends: ["Sun", "Venus"], enemies: ["Moon"], neutrals: ["Mars", "Jupiter", "Saturn"] },
      Jupiter: { friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"], neutrals: ["Saturn"] },
      Venus: { friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"], neutrals: ["Mars", "Jupiter"] },
      Saturn: { friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"], neutrals: ["Jupiter"] }
    };

    const RASHI_LORDS = [
      "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
      "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"
    ];

    const G_NAMES: Record<LanguageCode, string[]> = {
      en: ["Deva (Divine)", "Manushya (Human)", "Rakshasa (Assertive)"],
      hi: ["देव (दैवीय)", "मनुष्यों (मानवीय)", "राक्षस (दृढ़)"],
      te: ["దేవ గణము", "మనుష్య గణము", "రాక్షస గణము"],
      ta: ["தேவ கணம் (Deva)", "மனித கணம் (Manushya)", "ராட்சச கணம் (Rakshasa)"],
      kn: ["ದೇವ ಗಣ (Deva)", "ಮನುಷ್ಯ ಗಣ (Manushya)", "ರಾಕ್ಷಸ ಗಣ (Rakshasa)"]
    };

    const NAKSHATRA_GANAS = [
      0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 0, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0
    ];

    const YONI_NAMES: Record<LanguageCode, string[]> = {
      en: [
        "Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", 
        "Cow", "Buffalo", "Tiger", "Hare", "Monkey", "Mongoose", "Lion"
      ],
      hi: [
        "अश्व (घोड़ा)", "गज (हाथी)", "मेष (भेड़)", "सर्प (सांप)", "श्वान (कुत्ता)", "मार्जार (बिल्ली)", "मूषक (चूहा)",
        "गौ (गाय)", "महिष (भैंस)", "व्याघ्र (बाघ)", "शशक (खरगोश)", "वानर (बंदर)", "नकुल (नेवला)", "सिंह (शेर)"
      ],
      te: [
        "అశ్వము (గుర్రం)", "గజము (ఏనుగు)", "మేషము (గొర్రె)", "సర్పము (పాము)", "శ్వానము (కుక్క)", "మార్జాలము (పిల్లి)", "మూషికము (ఎలుక)",
        "గోవు (ఆవు)", "మహిషము (గేదె)", "వ్యాఘ్రము (పులి)", "శశకము (కుందేలు)", "వానరము (కోతి)", "నకులాన్ని (కీచురాయి)", "సింహము (సింహం)"
      ],
      ta: [
        "குதிரை (Horse)", "யானை (Elephant)", "ஆடு (Sheep)", "பாம்பு (Serpent)", "நாய் (Dog)", "பூனை (Cat)", "எலி (Rat)", 
        "பசு (Cow)", "எருமை (Buffalo)", "புலி (Tiger)", "முயல் (Hare)", "குரங்கு (Monkey)", "கீரி (Mongoose)", "சிங்கம் (Lion)"
      ],
      kn: [
        "ಕುದುರೆ (Horse)", "ಆನೆ (Elephant)", "ಕುರಿ (Sheep)", "ಹಾವು (Serpent)", "ನಾಯಿ (Dog)", "ಬೆಕ್ಕು (Cat)", "ಇಲಿ (Rat)", 
        "ಹಸು (Cow)", "ಎಮ್ಮೆ (Buffalo)", "ಹುಲಿ (Tiger)", "ಮೊಲ (Hare)", "ಕೋತಿ (Monkey)", "ಕೀರಿ (Mongoose)", "ಸಿಂಹ (Lion)"
      ]
    };

    const NAKSHATRA_YONIS = [
      0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1
    ];

    const NAKSHATRA_NADIS = [
      0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2
    ];

    const NADI_NAMES: Record<LanguageCode, string[]> = {
      en: ["Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)"],
      hi: ["आदि (वात)", "मध्य (पित्त)", "अंत्य (कफ)"],
      te: ["ఆది (వాత)", "మధ్య (పిత్తం)", "అంత్య (కఫం)"],
      ta: ["ஆதி (வாதம்)", "மத்திய (பித்தம்)", "அந்தியம் (கபம்)"],
      kn: ["ಆದಿ (ವಾತ)", "ಮಧ್ಯ (ಪಿತ್ತ)", "ಅಂತ್ಯ (ಕಫ)"]
    };

    // 1. Varna (max 1 point)
    let varnaScore = 0;
    const getVarnaInfo = (rIndex: number) => {
      const idx = rIndex % 12;
      const vLabels: Record<LanguageCode, string> = {
        en: "Brahmin (Intellectual)",
        hi: "ब्राह्मण (बौद्धिक)",
        te: "బ్రాహ్మణ (మేధోశక్తి)",
        ta: "பிராமணர் (அறிவுசார்)",
        kn: "ಬ್ರಾಹ್ಮಣ (ಬೌದ್ಧಿಕ)"
      };
      const kLabels: Record<LanguageCode, string> = {
        en: "Kshatriya (Administrative)",
        hi: "क्षत्रिय (प्रशासकीय)",
        te: "క్షత్రియ (పరిపాలనా)",
        ta: "சத்திரியர் (நிர்வாகம்)",
        kn: "ಕ್ಷತ್ರಿಯ (ಆಡಳಿತಾತ್ಮಕ)"
      };
      const vaLabels: Record<LanguageCode, string> = {
        en: "Vaishya (Mercantile)",
        hi: "वैश्य (व्यावसायिक)",
        te: "వైశ్య (వ్యాపార)",
        ta: "வைசியர் (வணிகம்)",
        kn: "ವೈಶ್ಯ (ವ್ಯಾಪಾರ)"
      };
      const sLabels: Record<LanguageCode, string> = {
        en: "Shudra (Service-oriented)",
        hi: "शूद्र (सेवाभावी)",
        te: "శూద్ర (సేవా)",
        ta: "சூத்திரர் (சேவை)",
        kn: "ಶೂದ್ರ (ಸೇವಾವিಧಾನ)"
      };

      if ([3, 7, 11].includes(idx)) return { code: 0, name: "Brahmin", labels: vLabels };
      if ([0, 4, 8].includes(idx)) return { code: 1, name: "Kshatriya", labels: kLabels };
      if ([1, 5, 9].includes(idx)) return { code: 2, name: "Vaishya", labels: vaLabels };
      return { code: 3, name: "Shudra", labels: sLabels };
    };

    const bVarna = getVarnaInfo(bRasi);
    const gVarna = getVarnaInfo(gRasi);

    if (bVarna.code <= gVarna.code) {
      varnaScore = 1;
    }

    let varnaDesc = "";
    if (lang === "te") {
      varnaDesc = varnaScore > 0 
        ? \`అనుకూలమైన వర్ణ కలయిక. వరుడు \${bVarna.labels.te} మరియు వధువు \${gVarna.labels.te}. పరిపాలనాత్మక/మేధో సమతుల్యత మరియు పరస్పర గౌరవం ఉంటుంది.\`
        : \`వర్ణ సరిపోలలేదు. వరుని వర్ణ ప్రొఫైల్ (\${bVarna.labels.te}) వధువు కంటే తక్కువగా ఉంది, ఇది చిన్న అహంకార ఘర్షణలకు దారితీయవచ్చు.\`;
    } else if (lang === "hi") {
      varnaDesc = varnaScore > 0
        ? \`अनुकूल वर्ण मिलान। वर \${bVarna.labels.hi} और वधू \${gVarna.labels.hi} है। दोनों के बीच अच्छा सामंजस्य रहेगा।\`
        : \`वर्ण दोष। वर का वर्ण स्तर (\${bVarna.labels.hi}) वधू से नीचा होने के कारण अहं का टकराव हो सकता है।\`;
    } else if (lang === "ta") {
      varnaDesc = varnaScore > 0
        ? \`அனுகூலமான வர்ண பொருத்தம். மணமகன் \${bVarna.labels.ta} மற்றும் மணமகள் \${gVarna.labels.ta}. இருவருக்கும் இடையே நல்ல புரிதல் இருக்கும்.\`
        : \`வர்ண பொருத்தம் இல்லை. மணமகனின் வர்ண நிலை (\${bVarna.labels.ta}) மணமகளை விட குறைவாக உள்ளதால், கருத்து வேறுபாடுகள் வரலாம்.\`;
    } else if (lang === "kn") {
      varnaDesc = varnaScore > 0
        ? \`ಅನುಕೂಲಕರ ವರ್ಣ ಹೊಂದಾಣಿಕೆ. ವರನು \${bVarna.labels.kn} ಮತ್ತು ವಧು \${gVarna.labels.kn}. ಇಬ್ಬರ ನಡುವೆ ಉತ್ತಮ ಬೌದ್ಧಿಕ ಸಮತೋಲನ ಮತ್ತು ಗೌರವವಿರುತ್ತದೆ.\`
        : \`ವರ್ಣ ಅಸಾಮರಸ್ಯ. ವರನ ವರ್ಣ ಪ್ರೊಫೈಲ್ (\${bVarna.labels.kn}) ವಧುಗಿಂತ ಕಡಿಮೆಯಿದೆ, ಇದು ಸೂಕ್ಷ್ಮ ಅಹಂ ಘರ್ಷಣೆಗೆ ಕಾರಣವಾಗಬಹುದು.\`;
    } else {
      varnaDesc = varnaScore > 0
        ? \`Auspicious Varna match. Groom is \${bVarna.labels.en} and Bride is \${gVarna.labels.en}. Provides premium intellectual co-existence and professional appreciation.\`
        : \`Varna variance. Groom's Varna profile (\${bVarna.labels.en}) is lower placed than Bride's (\${gVarna.labels.en}), indicating possible mild wavelength adjustments.\`;
    }

    ashtaKoota.push({
      koota: "Varna",
      localizedKoota: translateKoota("Varna", lang),
      maxPoints: 1,
      obtainedPoints: varnaScore,
      description: varnaDesc
    });

    // 2. Vashya (max 2 points)
    const getVashyaInfo = (rIndex: number) => {
      const idx = rIndex % 12;
      const tLabels = {
        0: {
          en: "Quadruped (Chatushpada)",
          hi: "चतुष्पाद (चौपाया)",
          te: "చతుష్పాద (జంతు స్వభావం)",
          ta: "சதுஷ்பாத (நான்கு கால்)",
          kn: "ಚತುಷ್ಪಾದ (ನಾಲ್ಕು ಕಾಲು)"
        },
        1: {
          en: "Human (Manushya)",
          hi: "मनुष्यों (मानव)",
          te: "మనుష్య (మానవ స్వభావం)",
          ta: "மனுஷ்ய (மனித)",
          kn: "ಮನುಷ್ಯ (ಮಾನವ)"
        },
        2: {
          en: "Water Dweller (Jalachara)",
          hi: "जलचर (जलीय)",
          te: "జలచర (నీటి జీవి)",
          ta: "జலசர (நீர் வாழ்)",
          kn: "ಜಲಚರ (ಜಲಚರ)"
        },
        3: {
          en: "Wild Beast (Vanachara)",
          hi: "वनचर (जंगली)",
          te: "వనచర (అటవి జీవి)",
          ta: "வனசர (காடு)",
          kn: "ವನಚರ (ವನ್ಯ)"
        },
        4: {
          en: "Insect (Keeta)",
          hi: "कीट (कीड़ा)",
          te: "కీటక (సూక్ష్మ జీవి)",
          ta: "கீட (பூச்சி)",
          kn: "ಕೀಟ (ಕೀಟ)"
        }
      };

      let typeCode = 4;
      if ([0, 1].includes(idx)) typeCode = 0;
      else if ([2, 5, 6, 10].includes(idx)) typeCode = 1;
      else if ([3, 11].includes(idx)) typeCode = 2;
      else if (idx === 4) typeCode = 3;

      return { code: typeCode, name: tLabels[typeCode].en, labels: tLabels[typeCode] };
    };

    const bVashya = getVashyaInfo(bRasi);
    const gVashya = getVashyaInfo(gRasi);

    let vashyaScore = 1;
    if (bVashya.code === gVashya.code) {
      vashyaScore = 2;
    } else if (bVashya.code === 3 || gVashya.code === 3) {
      vashyaScore = 0;
    } else if (bVashya.code === 1 && gVashya.code === 0) {
      vashyaScore = 1.5;
    }

    let vashyaDesc = "";
    if (lang === "te") {
      vashyaDesc = vashyaScore === 2
        ? \`అద్భుతమైన వశ్య పొంతన (\${bVashya.labels.te} - \${gVashya.labels.te}). దంపతుల మధ్య బలమైన ఆకర్షణ, ఒకరినొకరు సులభంగా అర్థం చేసుకునే గుణం ఉంటాయి.\`
        : vashyaScore > 0 
          ? \`సగటు వశ్య అనుకూలత (\${bVashya.labels.te} - \${gVashya.labels.te}). స్థిరమైన గృహ జీవితం కోసం పరస్పర గౌరవం అవసరం.\`
          : \`వశ్య సరిపోలడం లేదు. అరణ్య లేదా కీటక గుణాల వల్ల ఆధిపత్య పోరు మరియు అపార్థాలు ఏర్పడే సూచనలు ఉన్నాయి.\`;
    } else if (lang === "hi") {
      vashyaDesc = vashyaScore === 2
        ? \`उत्कृष्ट वश्य मिलान (\${bVashya.labels.hi} - \${gVashya.labels.hi})। आपसी आकर्षण, गहरा मानसिक जुड़ाव और अद्भुत समर्पण रहेगा।\`
        : vashyaScore > 0
          ? \`मध्यम वश्य अनुकूलता (\${bVashya.labels.hi} - \${gVashya.labels.hi})। वैवाहिक सामंजस्य बनाए रखने के लिए आपसी समझदारी की आवश्यकता है।\`
          : \`वश्य दोष। दोनों पक्षों में वर्चस्व की लड़ाई या विचारों में भारी टकराव की आशंका रहती है।\`;
    } else if (lang === "ta") {
      vashyaDesc = vashyaScore === 2
        ? \`சிறந்த வசிய பொருத்தம் (\${bVashya.labels.ta} - \${gVashya.labels.ta}). இருவருக்கிடையே ஆழ்ந்த ஈர்ப்பும் பரஸ்பர அர்ப்பணிப்பும் இருக்கும்.\`
        : vashyaScore > 0
          ? \`மிதமான வசிய பொருத்தம் (\${bVashya.labels.ta} - \${gVashya.labels.ta}). குடும்ப அமைதிக்காக பரஸ்பர விட்டுக்கொடுத்தல் தேவை.\`
          : \`வசிய பொருத்தம் இல்லை. இருவரியிலும் ஆதிக்கம் செலுத்தும் குணம் மற்றும் கருத்து வேறுபாடு ஏற்பட வாய்ப்புள்ளது.\`;
    } else if (lang === "kn") {
      vashyaDesc = vashyaScore === 2
        ? \`ಅತ್ಯುತ್ತಮ ವಶ್ಯ ಹೊಂದಾಣಿಕೆ (\${bVashya.labels.kn} - \${gVashya.labels.kn}). ಪರಸ್ಪರ ಆಕರ್ಷಣೆ, ಆಳವಾದ ನಂಬಿಕೆ ಮತ್ತು ಸಮರ್ಪಣಾ ಮನೋಭಾವ ಇರುತ್ತದೆ.\`
        : vashyaScore > 0
          ? \`ಮಧ್ಯಮ ವಶ್ಯ ಹೊಂದಾಣಿಕೆ (\${bVashya.labels.kn} - \${gVashya.labels.kn}). ವೈವಾಹಿಕ ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ಪರಸ್ಪರ ತಿಳುವಳಿಕೆ ಅತ್ಯಗತ್ಯ.\`
          : \`ವಶ್ಯ ದೋಷ. ಪ್ರಭುತ್ವ ಸಾಧಿಸುವ ಧೋರಣೆ ಮತ್ತು ವೈಚಾರಿಕ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.\`;
    } else {
      vashyaDesc = vashyaScore === 2
        ? \`Magnificent magnetic attraction (\${bVashya.labels.en} - \${gVashya.labels.en}). High natural alignment of sub-conscious mind and mutual devotion.\`
        : vashyaScore > 0
          ? \`Acceptable Vashya bond (\${bVashya.labels.en} - \${gVashya.labels.en}). Steady relationship, requires classic verbal adjustments.\`
          : \`Vashya mismatch. Wild or sharp insectoid energies can invoke command clashes or verbal friction in the house.\`;
    }

    ashtaKoota.push({
      koota: "Vashya",
      localizedKoota: translateKoota("Vashya", lang),
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      description: vashyaDesc
    });

    // 3. Tara (max 3 points)
    const taraDiffCheck = (gNak - bNak + 27) % 9;
    let taraScore = 0;
    if ([1, 2, 4, 6, 8].includes(taraDiffCheck)) {
      taraScore = 3;
    } else if ([3, 5, 7].includes(taraDiffCheck)) {
      taraScore = 1.5;
    }

    const taraCategoriesEN = ["Ati-Mitra (Intimate)", "Janma (Self)", "Sampat (Wealth)", "Vipat (Hurdle)", "Kshema (Well-being)", "Pratyari (Obstacles)", "Sadhaka (Success)", "Vadha (Critical)", "Mitra (Friendly)"];
    const taraCategoriesHI = ["अति-मित्र (परम अनुकूल)", "जन्म (सामान्य)", "संपत (धन प्रदायक)", "विपत (अड़चनें)", "क्षेम (कल्याणकारी)", "प्रत्यरी (कठिनाइयां)", "साधक (पूर्णता)", "वध (सावधानी)", "मित्र (सकारात्मक)"];
    const taraCategoriesTE = ["అతి-మిత్ర (అత్యంత అనుకూల)", "జన్మ (సాధారణం)", "సంపత్ (ఆర్థికం)", "విపత్ (ఆటంకం)", "క్షేమ (శుభకరం)", "ప్రత్యరి (పోరాటం)", "సాధక (విజయం)", "వధ (జాగ్రత్త)", "మిత్ర (స్నేహం)"];
    const taraCategoriesTA = ["அதி-மித்ரா (மிகவும் நெருக்கமான)", "ஜன்ம (சுய)", "சம்பத் (செல்வம்)", "விபத் (தடைகள்)", "க்ஷேம (நலன்)", "பிரத்யரி (எதிர்ப்பு)", "சாதக (வெற்றி)", "வத (தீவிரம்)", "மித்ரா (நட்பு)"];
    const taraCategoriesKN = ["ಅತಿ-ಮಿತ್ರ (ಅತ್ಯಂತ ಸ್ನೇಹ)", "ಜನ್ಮ (ಸ್ವಯಂ)", "ಸಂಪತ್ (ಐಶ್ವರಯ)", "ವಿಪತ್ (ಅಡೆತಡೆ)", "ಕ್ಷೇಮ (ಕಲ್ಯಾಣ)", "ಪ್ರತ್ಯರಿ (ಸವಾಲು)", "ಸಾಧಕ (ಯಶಸ್ಸು)", "ವಧ (ಅಪಾಯ)", "ಮಿತ್ರ (ಸ್ನೇಹ)"];

    const activeCategoryEN = taraCategoriesEN[taraDiffCheck];
    const activeCategoryHI = taraCategoriesHI[taraDiffCheck];
    const activeCategoryTE = taraCategoriesTE[taraDiffCheck];
    const activeCategoryTA = taraCategoriesTA[taraDiffCheck];
    const activeCategoryKN = taraCategoriesKN[taraDiffCheck];

    let taraDesc = "";
    if (lang === "te") {
      taraDesc = taraScore === 3
        ? \`ఉత్తమ నక్షత్ర తారా బలం (\${activeCategoryTE}). అదృష్టం, రక్షణ మరియు కుటుంబానికి సకల ఐశ్వర్యాలు లభిస్తాయి.\`
        : taraScore > 0
          ? \`సాధారణ తారా బలం (\${activeCategoryTE}). అప్పుడప్పుడు వృత్తిగత ఆటంకాలు వచ్చినప్పటికీ పరిహారాల ద్వారా అధిగమించవచ్చు.\`
          : \`ప్రతికూల తారా బలం (\${activeCategoryTE}). నక్షత్రాల మధ్య ఆరోహణ వ్యతిరేక తరంగాలు ఉన్నాయి; సరైన పరిహారాలు అవసరం.\`;
    } else if (lang === "hi") {
      taraDesc = taraScore === 3
        ? \`शुभ तारा बल (\${activeCategoryHI})। जीवन में आर्थिक समृद्धि, सुरक्षा और सुगम उन्नति प्राप्त होगी।\`
        : taraScore > 0
          ? \`मध्यम तारा बल (\${activeCategoryHI})। समय-समय पर छोटे मोटे उतार-चढ़ाव आ सकते हैं, सामान्य आध्यात्मिक उपायों से शांति मिलेगी।\`
          : \`कमजोर तारा बल (\${activeCategoryHI})। विशेष रूप से नए कार्यों में सावधानी बरतें। हनुमान चालीसा का नियमित पाठ लाभकारी रहेगा।\`;
    } else if (lang === "ta") {
      taraDesc = taraScore === 3
        ? \`அற்புதமான தாரா பலம் (\${activeCategoryTA}). வாழ்வில் அதிர்ஷ்டம், பாதுகாப்பு மற்றும் சிறந்த முன்னேற்றம் கிடைக்கும்.\`
        : taraScore > 0
          ? \`நடுத்தர தாரா பலம் (\${activeCategoryTA}). சிறிய தடைகள் வரலாம், எளிய ஆன்மீக வழிபாடுகள் மூலம் நற்பலன்களைப் பெறலாம்.\`
          : \`பலவீனமான தாரா பலம் (\${activeCategoryTA}). புதிய முயற்சிகளில் கவனம் தேவை, பரிகாரங்கள் செய்து கொள்வது நல்லது.\`;
    } else if (lang === "kn") {
      taraDesc = taraScore === 3
        ? \`ಉತ್ತಮ ತಾರಾ ಬಲ (\${activeCategoryKN}). ಜೀವನದಲ್ಲಿ ಐಶ್ವರರು, ಭದ್ರತೆ ಮತ್ತು ಸುಲಭ ಯಶಸ್ಸನ್ನು ತರುತ್ತದೆ.\`
        : taraScore > 0
          ? \`ಮಧ್ಯಮ ತಾರಾ ಬಲ (\${activeCategoryKN}). ಸಾಂದರ್ಭಿಕ ಏರಿಳಿತಗಳು ಬರಬಹುದು, ಸರಳ ಆಧ್ಯಾತ್ಮಿಕ ಪರಿಹಾರಗಳಿಂದ ಪ್ರಶಾಂತತೆ ಸಿಗಲಿದೆ.\`
          : \`ದುರ್ಬಲ ತಾರಾ ಬಲ (\${activeCategoryKN}). ವೃತ್ತಿ ಅಥವಾ ಕೆಲಸಗಳಲ್ಲಿ ಎಚ್ಚರ ವಹಿಸಿ, ನಿಯಮಿತ ದೇವತಾ ಪ್ರಾರ್ಥನೆ ಅಗತ್ಯವಿದೆ.\`;
    } else {
      taraDesc = taraScore === 3
        ? \`Auspicious Tarabala (\${activeCategoryEN}). Fosters high luck, domestic security, and smooth professional evolution for the couple.\`
        : taraScore > 0
          ? \`Neutral Tarabala (\${activeCategoryEN}). Mild occasional friction in timelines, easily resolved via simple prayer rituals.\`
          : \`Deficient Tarabala (\${activeCategoryEN}). Requires dynamic attention. Star patterns suggest structural communication gaps and energy blockages.\`;
    }

    ashtaKoota.push({
      koota: "Tara",
      localizedKoota: translateKoota("Tara", lang),
      maxPoints: 3,
      obtainedPoints: taraScore,
      description: taraDesc
    });

    // 4. Yoni (max 4 points)
    const bYoniIdx = NAKSHATRA_YONIS[bNak];
    const gYoniIdx = NAKSHATRA_YONIS[gNak];
    const bYoni = bYoniIdx;
    const gYoni = gYoniIdx;

    let yoniScore = 2;
    if (bYoniIdx === gYoniIdx) {
      yoniScore = 4;
    } else {
      // Deadly Enemy check
      const isDeadlyRaw = 
        (bYoniIdx === 3 && gYoniIdx === 12) || (bYoniIdx === 12 && gYoniIdx === 3) || // Serpent vs Mongoose
        (bYoniIdx === 7 && gYoniIdx === 9) || (bYoniIdx === 9 && gYoniIdx === 7) || // Cow vs Tiger
        (bYoniIdx === 1 && gYoniIdx === 13) || (bYoniIdx === 13 && gYoniIdx === 1) || // Elephant vs Lion
        (bYoniIdx === 0 && gYoniIdx === 8) || (bYoniIdx === 8 && gYoniIdx === 0) || // Horse vs Buffalo
        (bYoniIdx === 4 && gYoniIdx === 5) || (bYoniIdx === 5 && gYoniIdx === 4) || // Dog vs Cat
        (bYoniIdx === 6 && gYoniIdx === 5) || (bYoniIdx === 5 && gYoniIdx === 6) || // Rat vs Cat
        (bYoniIdx === 2 && gYoniIdx === 11) || (bYoniIdx === 11 && gYoniIdx === 2); // Sheep vs Monkey
      
      if (isDeadlyRaw) {
        yoniScore = 0;
      } else {
        const isFriendlyRaw = 
          (bYoniIdx === 7 && gYoniIdx === 2) || (bYoniIdx === 2 && gYoniIdx === 7) || // Cow & Sheep
          (bYoniIdx === 1 && gYoniIdx === 8) || (bYoniIdx === 8 && gYoniIdx === 1) || // Elephant & Buffalo
          (bYoniIdx === 0 && gYoniIdx === 10) || (bYoniIdx === 10 && gYoniIdx === 0) || // Horse & Hare
          (bYoniIdx === 11 && gYoniIdx === 12) || (bYoniIdx === 12 && gYoniIdx === 11); // Monkey & Mongoose
        if (isFriendlyRaw) {
          yoniScore = 3;
        }
      }
    }

    let yoniDesc = "";
    if (lang === "te") {
      yoniDesc = yoniScore === 4
        ? \`అద్భుతమైన ఏక యోని పొంతన (\${YONI_NAMES.te[bYoniIdx]} - \${YONI_NAMES.te[gYoniIdx]}). శారీరక సాన్నిహిత్యం, దాంపత్య సుఖం అత్యున్నతంగా ఉంటాయి.\`
        : yoniScore === 3
          ? \`మిత్ర యోని పొంతన (\${YONI_NAMES.te[bYoniIdx]} - \${YONI_NAMES.te[gYoniIdx]}). ఉత్తమ లైంగిక మరియు శారీరక సామరస్యం లభిస్తుంది.\`
          : yoniScore === 2
            ? \`సాధారణ యోని పొంతన (\${YONI_NAMES.te[bYoniIdx]} - \${YONI_NAMES.te[gYoniIdx]}). శారీరకంగాను మరియు మానసికంగాను సమతుల్యమైన సంబంధం ఉంటుంది.\`
            : \`యోని అత్యంత ప్రతికూలమైనది (మహా శత్రు సమూహం: \${YONI_NAMES.te[bYoniIdx]} vs \${YONI_NAMES.te[gYoniIdx]}). జీవ స్వభావాలు వేరు కావడం వల్ల అసంతృప్తి ఏర్పడే అవకాశం ఉంది.\`;
    } else if (lang === "hi") {
      yoniDesc = yoniScore === 4
        ? \`परम अनुकूल योनी मिलान (\${YONI_NAMES.hi[bYoniIdx]} - \${YONI_NAMES.hi[gYoniIdx]})। शारीरिक और मानसिक स्तरों पर पूर्ण संतुष्टि एवं सामंजस्य रहेगा।\`
        : yoniScore === 3
          ? \`मित्र योनी मिलान (\${YONI_NAMES.hi[bYoniIdx]} - \${YONI_NAMES.hi[gYoniIdx]})। उत्तम वैवाहिक सुख और प्रेम भावना विकसित होगी।\`
          : yoniScore === 2
            ? \`सामान्य योनी अनुकूलता (\${YONI_NAMES.hi[bYoniIdx]} - \${YONI_NAMES.hi[gYoniIdx]})। औसत और सुगम शारीरिक सम्बन्ध बने रहेंगे।\`
            : \`महारशत्रु योनी टकराव (\${YONI_NAMES.hi[bYoniIdx]} बनाम \${YONI_NAMES.hi[gYoniIdx]})। एक दूसरे के प्रति प्राकृतिक वैमनस्यता के कारण घनिष्ठता में बाधा आ सकती है।\`;
    } else if (lang === "ta") {
      yoniDesc = yoniScore === 4
        ? \`அற்புதமான ஏக யோனி பொருத்தம் (\${YONI_NAMES.ta[bYoniIdx]} - \${YONI_NAMES.ta[gYoniIdx]}). சிறந்த உடல் மற்றும் மனரீதியான புரிதலும் தாம்பத்திய சுகமும் கிடைக்கும்.\`
        : yoniScore === 3
          ? \`நட்பு யோனி பொருத்தம் (\${YONI_NAMES.ta[bYoniIdx]} - \${YONI_NAMES.ta[gYoniIdx]}). நல்ல உடலமைப்பு இணக்கமும் திருப்திகரமான இல்லறமும் இருக்கும்.\`
          : yoniScore === 2
            ? \`சமமான யோனி பொருத்தம் (\${YONI_NAMES.ta[bYoniIdx]} - \${YONI_NAMES.ta[gYoniIdx]}). உடல் மற்றும் மன ரீதியாக சமநிலையான உறவு இருக்கும்.\`
            : \`உறவில் ஈர்ப்பு குறைந்து கருத்து வேறுபாடுகள் வரலாம்.\`;
    } else if (lang === "kn") {
      yoniDesc = yoniScore === 4
        ? \`ಉತ್ತಮ ಏಕ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (\${YONI_NAMES.kn[bYoniIdx]} - \${YONI_NAMES.kn[gYoniIdx]}). ಅತ್ಯಂತ ಉನ್ನತ ಮಟ್ಟದ ದೈಹಿಕ ಸಾಮರಸ್ಯ ಮತ್ತು ವೈವಾಹಿಕ ಸೌಖ್ಯ ಲಭಿಸುತ್ತದೆ.\`
        : yoniScore === 3
          ? \`ಮಿತ್ರ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (\${YONI_NAMES.kn[bYoniIdx]} - \${YONI_NAMES.kn[gYoniIdx]}). ಉತ್ತಮ ಲೈಂಗಿಕ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಪ್ರೀತಿ ವೃದ್ಧಿಯಾಗುತ್ತದೆ.\`
          : yoniScore === 2
            ? \`ಸಾಮಾನ್ಯ ಯೋನಿ ಹೊಂದಾಣಿಕೆ (\${YONI_NAMES.kn[bYoniIdx]} - \${YONI_NAMES.kn[gYoniIdx]}).ಸಾಮಾನ್ಯ ದೈಹಿಕ ಕಂಫರ್ಟ್ ಇರುತ್ತದೆ.\`
            : \`ಮಹಾ ಶತ್ರು ಯೋನಿ ಸಂಘರ್ಷ (\${YONI_NAMES.kn[bYoniIdx]} ಮತ್ತು \${YONI_NAMES.kn[gYoniIdx]}). ಸಹಜ ವೈಮನಸ್ಯದಿಂದಾಗಿ ಪರಸ್ಪರ ಆಕರ್ಷಣೆ ಕಡಿಮೆಯಾಗುವ ಸಂಭವವಿದೆ.\`;
    } else {
      yoniDesc = yoniScore === 4
        ? \`Superior Same-Yoni match (\${YONI_NAMES.en[bYoniIdx]}). Fosters incredible physical fidelity, biological chemistry, and deep intuitive romance.\`
        : yoniScore === 3
          ? \`Friendly Yoni match (\${YONI_NAMES.en[bYoniIdx]} & \${YONI_NAMES.en[gYoniIdx]}). High rating in reproductive potential and relationship stability.\`
          : yoniScore === 2
            ? \`Balanced Yoni compatibility (\${YONI_NAMES.en[bYoniIdx]} with \${YONI_NAMES.en[gYoniIdx]}). Standard physical comfort with normal domestic expectations.\`
            : \`Mortal Enemy Yoni conflict (\${YONI_NAMES.en[bYoniIdx]} vs \${YONI_NAMES.en[gYoniIdx]}). Prompts high friction, hormonal offsets, and subconscious defensiveness.\`;
    }

    ashtaKoota.push({
      koota: "Yoni",
      localizedKoota: translateKoota("Yoni", lang),
      maxPoints: 4,
      obtainedPoints: yoniScore,
      description: yoniDesc
    });

    // 5. Graha Maitri (max 5 points)
    const bLordName = RASHI_LORDS[bRasi];
    const gLordName = RASHI_LORDS[gRasi];

    let maitriScore = 3;
    if (bLordName === gLordName) {
      maitriScore = 5;
    } else {
      const bFriends = LORD_FRIENDS[bLordName]?.friends || [];
      const bEnemies = LORD_FRIENDS[bLordName]?.enemies || [];
      const gFriends = LORD_FRIENDS[gLordName]?.friends || [];
      const gEnemies = LORD_FRIENDS[gLordName]?.enemies || [];

      const bToG_friend = bFriends.includes(gLordName);
      const bToG_enemy = bEnemies.includes(gLordName);
      const gToB_friend = gFriends.includes(bLordName);
      const gToB_enemy = gEnemies.includes(bLordName);

      if (bToG_friend && gToB_friend) {
        maitriScore = 5;
      } else if ((bToG_friend && !gToB_enemy) || (gToB_friend && !bToG_enemy)) {
        maitriScore = 4;
      } else if (!bToG_enemy && !gToB_enemy) {
        maitriScore = 3;
      } else if (bToG_enemy && gToB_enemy) {
        maitriScore = 0;
      } else {
        maitriScore = 1.5;
      }
    }

    let maitriDesc = "";
    if (lang === "te") {
      maitriDesc = maitriScore === 5
        ? \`అత్యున్నత గ్రహ మైత్రి (\${bLordName} - \${gLordName}). ఇద్దరి ఆలోచనా సరళి ఒకే విధంగా ఉంటుంది. సంభాషణలు చాలా సజావుగా సాగుతాయి.\`
        : maitriScore >= 3
          ? \`సహకార గ్రహ మైత్రి (\${bLordName} - \${gLordName}). కుటుంబ నియమాలు మరియు వైవాహిక బాధ్యతలపై గౌరవం ఉంటుంది.\`
          : \`ఆలోచనా వైరుధ్యం ఉంది (\${bLordName} vs \${gLordName}). శత్రు గ్రహాలు కావడం వల్ల తరచుగా భిన్నమైన అభిప్రాయాలు మరియు పట్టుదలకు దారితీయవచ్చు.\`;
    } else if (lang === "hi") {
      maitriDesc = maitriScore === 5
        ? \`सर्वश्रेष्ठ ग्रह मैत्री (\${bLordName} - \${gLordName})। दोनों के वैचारिक धरातल में पूर्ण समानता रहेगी। जीवन के प्रति साझा दृष्टिकोण रहेगा।\`
        : maitriScore >= 3
          ? \`संतोषजनक ग्रह मैत्री (\${bLordName} - \${gLordName})। पारिवारिक मूल्यों एवं कर्तव्यों के निर्वहन में अच्छा सामंजस्य रहेगा।\`
          : \`ग्रह शत्रुता दोष (\${bLordName} बनाम \${gLordName})। वैचारिक स्तर पर निरंतर असहमति या हठधर्मिता बढ़ने के संकेत।\`;
    } else if (lang === "ta") {
      maitriDesc = maitriScore === 5
        ? \`சிறந்த கிரக மைத்திரி பொருத்தம் (\${bLordName} - \${gLordName}). இருவரிடையே நல்ல புரிதலும் ஒருமித்த சிந்தனையும் நிலவும்.\`
        : maitriScore >= 3
          ? \`திருப்திகரமான கிரக மைத்திரி பொருத்தம் (\${bLordName} - \${gLordName}). குடும்ப கடமைகளில் நல்ல ஒத்துழைப்பு இருக்கும்.\`
          : \`கிரக பகைமை காணப்படுகிறது (\${bLordName} மற்றும் \${gLordName}). இதனால் கருத்து வேறுபாடுகள் மற்றும் வீண் வாக்குவாதங்கள் வரலாம்.\`;
    } else if (lang === "kn") {
      maitriDesc = maitriScore === 5
        ? \`ಅತ್ಯುನ್ನತ ಗ್ರಹ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ (\${bLordName} - \${gLordName}). ಇಬ್ಬರ ಆಲೋಚನಾ ಸರಣಿ ಒಂದೇ ಆಗಿರುತ್ತದೆ ಹಾಗೂ ದಾಂಪತ್ಯ ಸುಖಮಯವಾಗಿರುತ್ತದೆ.\`
        : maitriScore >= 3
          ? \`ಪೂರಕ ಗ್ರಹ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ (\${bLordName} - \${gLordName}). ಕೌಟುಂಬಿಕ ಜವಾಬ್ದಾರಿ ಹಂಚಿಕೆಯಲ್ಲಿ ಇಬ್ಬರೂ ಸಹಕರಿಸುತ್ತಾರೆ.\`
          : \`ಗ್ರಹ ಶತ್ರುತ್ವ ದೋಷ (\${bLordName} ಮತ್ತು \${gLordName}). ವೈಚಾರಿಕ ಭಿನ್ನಾಭಿಪ್ರಾಯಗಳು ಹಾಗೂ ಜಗಳಗಳು ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ ಗೋಚರಿಸುತ್ತದೆ.\`;
    } else {
      maitriDesc = maitriScore === 5
        ? \`Sovereign Graha Maitri (\${bLordName} and \${gLordName} share mutual friendship). Ensures perfect mental harmony and life comfort.\`
        : maitriScore >= 3
          ? \`Harmonious Graha Maitri (\${bLordName} and \${gLordName} share compatible relationship). Normal respect, good for long term relationship stability.\`
          : \`Challenging Graha Maitri (\${bLordName} vs \${gLordName} are enemy planets). Can cause conflict of views or egos without conscious compromise.\`;
    }

    ashtaKoota.push({
      koota: "Graha Maitri",
      localizedKoota: translateKoota("Graha Maitri", lang),
      maxPoints: 5,
      obtainedPoints: maitriScore,
      description: maitriDesc
    });

    // 6. Gana (max 6 points)
    const bGanaIdx = NAKSHATRA_GANAS[bNak];
    const gGanaIdx = NAKSHATRA_GANAS[gNak];

    let ganaScore = 0;
    if (bGanaIdx === gGanaIdx) {
      ganaScore = 6;
    } else if ((bGanaIdx === 0 && gGanaIdx === 1) || (bGanaIdx === 1 && gGanaIdx === 0)) {
      ganaScore = 5;
    } else if ((bGanaIdx === 0 && gGanaIdx === 2) || (bGanaIdx === 2 && gGanaIdx === 0)) {
      ganaScore = 1;
    } else {
      ganaScore = 0;
    }

    let ganaDesc = "";
    if (lang === "te") {
      ganaDesc = ganaScore === 6
        ? \`ఉత్తమ గణ పొంతన (ఇద్దరిదీ: \${G_NAMES.te[bGanaIdx]}). ఇద్దరి ప్రవర్తన, జీవనశైలి మరియు బాధ్యతలపట్ల సమానమైన అవగాహన ఉంటాయి.\`
        : ganaScore === 5
          ? \`దేవ-మనుష్య సమతుల్యత. ఆధ్యాత్మిక ప్రశాంతత మరియు ప్రాపంచిక కార్యకలాపాల మధ్య మంచి సమన్వయం ఉంటుంది.\`
          : \`గణ దోషం ఉంది (రాక్షస గణ ప్రభావం). ఆధిపత్య స్వభావం వల్ల అప్పుడప్పుడు అపార్థాలు ఏర్పడవచ్చు; శాంతి పూజలు సిఫార్సు చేయబద్ధాయి.\`;
    } else if (lang === "hi") {
      ganaDesc = ganaScore === 6
        ? \`उत्कृष्ट गण मेल (\${G_NAMES.hi[bGanaIdx]} दोनों)। जीवनशैली, पारिवारिक मूल्यों और सामाजिक जीवन के प्रति दृष्टिकोण में पूर्ण समानता रहेगी।\`
        : ganaScore === 5
          ? \`देव-मनुष्य शुभ संरेखण। देव स्वभाव की कोमलता मनुष्य स्वभाव के सांसारिक लक्ष्यों को सहजता से पोषित करेगी।\`
          : \`गण दोष (राक्षस गण प्रभाव)। एक पक्ष के अत्यधिक मुखर या जिद्दी स्वभाव के कारण शांति प्रभावित हो सकती है; शांति पूजा हितकर है।\`;
    } else if (lang === "ta") {
      ganaDesc = ganaScore === 6
        ? \`சிறந்த கண பொருத்தம் (இருவருக்கும்: \${G_NAMES.ta[bGanaIdx]}). இருவரின் நடத்தை மற்றும் வாழ்க்கை முறையில் நல்ல புரிதல் இருக்கும்.\`
        : ganaScore === 5
          ? \`தேவ-மனித கணம் இயல்பான பொருத்தம். ஆன்மீக அமைதியும் உலகியல் செயல்பாடுகளும் இணக்கமாய் இருக்கும்.\`
          : \`கண தோஷம் உள்ளது (ராட்சச கணம்). ஒருவரின் பிடிவாத குணத்தால் கருத்து வேறுபாடுகள் வரலாம்; எளிய பரிகாரம் நன்மை தரும்.\`;
    } else if (lang === "kn") {
      ganaDesc = ganaScore === 6
        ? \`ಉತ್ತಮ ಗಣ ಹೊಂದಾಣಿಕೆ (ಇಬ್ಬರದ್ದೂ: \${G_NAMES.kn[bGanaIdx]}). ಇಬ್ಬರ ನಡವಳಿಕೆ, ಜೀವನ ಶೈಲಿ ಮತ್ತು ಜವಾಬ್ದಾರಿಗಳ ಬಗ್ಗೆ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ಇರುತ್ತದೆ.\`
        : ganaScore === 5
          ? \`ದೇವ-ಮನುಷ್ಯ ಸಮತೋಲನ. ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಸನ್ನತೆ ಮತ್ತು ಸಾಂಸಾರಿಕ ಜವಾಬ್ದಾರಿಗಳ ನಡುವೆ ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ ಇರುತ್ತದೆ.\`
          : \`ಗಣ ದೋಷವಿದೆ (ರಾಕ್ಷಸ ಗಣದ ಪ್ರಭಾವ). ತೀವ್ರ ಹಠಮಾರಿ ಸ್ವಭಾವದಿಂದ ಪರಸ್ಪರ ಭಿನ್ನಾಭಿಪ್ರಾಯ ಮೂಡಬಹುದು; ದೋಷ ಪರಿಹಾರ ಶಾಂತಿ ಅಗತ್ಯ.\`;
    } else {
      ganaDesc = ganaScore === 6
        ? \`Identical Gana alignment (\${G_NAMES.en[bGanaIdx]}). Outstanding compatibility in public behavior, lifestyle speed, and reaction to stresses.\`
        : ganaScore === 5
          ? \`Harmonious Deva-Manushya blending. Spiritual calmness guides worldly performance nicely with zero negative sparks.\`
          : \`Critical Gana imbalance (Rakshasa Gana tension). One of the partners displays extreme stubborn resistance, causing severe fatigue in a softer partner.\`;
    }

    ashtaKoota.push({
      koota: "Gana",
      localizedKoota: translateKoota("Gana", lang),
      maxPoints: 6,
      obtainedPoints: ganaScore,
      description: ganaDesc
    });

    // 7. Bhakoot (max 7 points)
    const rasiDiff = (gRasi - bRasi + 12) % 12;
    let bhakootScore = 7;
    if ([2, 5, 6, 8, 12].includes(rasiDiff)) {
      bhakootScore = 0;
    }

    let bhakootDesc = "";
    if (lang === "te") {
      bhakootDesc = bhakootScore === 7
        ? \`చాలా శ్రేష్టమైన రాశి పొంతన (మంచి దూరం: \${rasiDiff}). గృహ శాంతి, పరస్పర విశ్వాసపాత్రత, మరియు ఆర్థిక శ్రేయస్సు సిద్ధిస్తాయి.\`
        : rasiDiff === 6
          ? \`షడాష్టక దోషం (6-8 దూరం). ఆరోగ్య సమస్యలు లేదా ఆకస్మిక అభిప్రాయ భేదాలు సంభవించవచ్చు; శని జపాలు ఉపయోగపడతాయి.\`
          : \`రాశి స్థానం అసమతుల్యతగా ఉంది (దూరం: \${rasiDiff}). ఆర్థిక కష్టాలు లేదా నిరంతర ఆందోళనల నివారణకై జ్యోతిష్య సలహా అవసరం.\`;
    } else if (lang === "hi") {
      bhakootDesc = bhakootScore === 7
        ? \`उत्तम भकूट मिलान (अनुकूल दूरी)। भकूट सामंजस्य गृह शांति, पारिवारिक वृद्धि और वित्तीय स्थिरता लाता है।\`
        : rasiDiff === 6
          ? \`षडाष्टक दोष (6-8 दूरी)। स्वास्थ्य संबंधी अस्वस्थता की चेतावनी और अप्रत्याशित वित्तीय असहयोग की संभावना; विशेष सावधानी की सलाह।\`
          : \`भकूट दोष (अशुभ दूरी: \${rasiDiff})। खर्चों में वृद्धि और सघन संकेत। महामृत्युंजय मंत्र सहायक सिद्ध होगा।\`;
    } else if (lang === "ta") {
      bhakootDesc = bhakootScore === 7
        ? \`சிறந்த பக்ஷ கூட்டு பொருத்தம் (இராசிகளுக்கிடையே நல்ல இடைவெளி: \${rasiDiff}). குடும்ப மகிழ்ச்சியும் பொருளாதார முன்னேற்றமும் ஏற்படும்.\`
        : rasiDiff === 6
          ? \`ஷடாஷ்டக தோஷம் உள்ளது (6-8 இடைவெளி). தேவையற்ற அலைச்சல் அல்லது திடீர் கருத்து வேறுபாடு உண்டாகலாம்; எளிய வழிபாடுகள் நலம் தரும்.\`
          : \`ராசி பொருத்தம் பலவீனமாக உள்ளது (இடைவெளி: \${rasiDiff}). இதனால் பொருளாதாரத் தடைகள் அல்லது மன உளைச்சல்கள் ஏற்பட வாய்ப்புள்ளது.\`;
    } else if (lang === "kn") {
      bhakootDesc = bhakootScore === 7
        ? \`ಅತ್ಯುತ್ತಮ ರಾಶಿ ಮೈತ್ರಿ ಹೊಂದಾಣಿಕೆ (ಅನುಕೂಲ ಅಂತರ: \${rasiDiff}). ದಾಂಪತ್ಯ ಶಾಂತಿ, ದಾಂಪತ್ಯ ಯಶಸ್ಸು ಹಾಗೂ ಆರ್ಥಿಕ ಯಶಸ್ಸು ಸಿಗಲಿದೆ.\`
        : rasiDiff === 6
          ? "ಪ್ರತಿಕೂಲ ಪರಿಸ್ಥಿತಿ ರಹಿತವಾಗಿದೆ"
          : \`ರಾಶಿ ಹೊಂದಾಣಿಕೆ ಕೊರತೆಯಿದೆ (ಅಶುಭ ಅಂತರ: \${rasiDiff}). ಆರ್ಥಿಕ ನಷ್ಟ ಅಥವಾ ದಾಂಪತ್ಯ ಜೀವನದಲ್ಲಿ ಸಾಮರಸ್ಯ ಕೊರತೆ ಕಾಡಬಹುದು.\`;
    } else {
      bhakootDesc = bhakootScore === 7
        ? \`Auspicious Bhakoot connection (Auspicious placement of Moon signs). Conveys excellent emotional loyalty, financial growth, and nested joy.\`
        : rasiDiff === 6
          ? \`Shadashtaka placement (6th & 8th rasi conflict). Prompts high emotional volatility and physical fatigue; astrology guidance suggested.\`
          : \`Bhakoot variance (Inauspicious relative distance: \${rasiDiff}). Indicates severe financial leakages or heavy domestic expansion stress.\`;
    }

    ashtaKoota.push({
      koota: "Bhakoot",
      localizedKoota: translateKoota("Bhakoot", lang),
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      description: bhakootDesc
    });

    // 8. Nadi (max 8 points)
    const bNadiIdx = NAKSHATRA_NADIS[bNak];
    const gNadiIdx = NAKSHATRA_NADIS[gNak];

    let nadiScore = 8;
    if (bNadiIdx === gNadiIdx) {
      nadiScore = 0;
    }

    let nadiDesc = "";
    if (lang === "te") {
      nadiDesc = nadiScore === 8
        ? \`అద్భుతమైన నాడీ పొంతన (అబ్బాయి: \${NADI_NAMES.te[bNadiIdx]} - అమ్మాయి: \${NADI_NAMES.te[gNadiIdx]}). జన్యుపరమైన అనుకూలత, ఆరోగ్యకరమైన సంతానం మరియు దీర్ఘాయువు కలుగుతాయి.\`
        : \`నాడీ దోషం క్రియాశీలంగా ఉంది (ఇద్దరికీ: \${NADI_NAMES.te[bNadiIdx]} నాడి). జన్యు పోలారిటీ ఒకే విధంగా ఉండటం వల్ల సంతానం పొందడంలో జాప్యాలు జరగవచ్చు; మహా మృత్యుంజయ జపం శ్రేష్టం.\`;
    } else if (lang === "hi") {
      nadiDesc = nadiScore === 8
        ? \`उत्कृष्ट नाड़ी मिलान (वर: \${NADI_NAMES.hi[bNadiIdx]} - वधू: \${NADI_NAMES.hi[gNadiIdx]})। उत्तम स्वास्थ्य, आनुवंशिक अनुकूलता और दीर्घायु संतान का आशीर्वाद।\`
        : \`नाड़ी दोष सक्रिय (दोनों की नाड़ी \${NADI_NAMES.hi[bNadiIdx]} है)। संतान उत्पत्ति में बाधा अथवा शारीरिक अस्वस्थता की चेतावनी; शिव आराधना आवश्यक है।\`;
    } else if (lang === "ta") {
      nadiDesc = nadiScore === 8
        ? \`அற்புதமான நாடிப் பொருத்தம் (மணமகன்: \${NADI_NAMES.ta[bNadiIdx]} - மணமகள்: \${NADI_NAMES.ta[gNadiIdx]}). சிறந்த உயிரியல் சமநிலை மற்றும் நல்ல சந்ததிப்பேறு உண்டாகும்.\`
        : \`நாடி தோஷம் உள்ளது (இருவருக்கும் \${NADI_NAMES.ta[bNadiIdx]} நாடி). இதனால் மகப்பேறு தள்ளிப்போகலாம் அல்லது உடல்நலப் பாதிப்புகள் வரலாம்; சிவ வழிபாடு நலம் தரும்.\`;
    } else if (lang === "kn") {
      nadiDesc = nadiScore === 8
        ? \`ಅದ್ಭುತ ನಾಡಿ ಹೊಂದಾಣಿಕೆ (ವರ: \${NADI_NAMES.kn[bNadiIdx]} - ವಧು: \${NADI_NAMES.kn[gNadiIdx]}). ಉತ್ತಮ ಆರೋಗ್ಯ, ತಳೀಯ ಸಮಾನತೆ ಹಾಗೂ ದೀರ್ಘಾಯುಷ್ಯದ ಭರವಸೆ ಸಿಗುತ್ತದೆ.\`
        : \`ನಾಡಿ ದೋಷ ಸಕ್ರಿಯವಾಗಿದೆ (ಇಬ್ಬರ ನಾಡಿಯೂ \${NADI_NAMES.kn[bNadiIdx]} ಆಗಿದೆ). ಸಂತತಿ ಪ್ರಾಪ್ತಿಯಲ್ಲಿ ವಿಳಂಬ ಅಥವಾ ದೈಹಿಕ ತಳಮಳ ಉಂಟುಮಾಡಬಹುದು; ಸೂಕ್ತ ಶಾಂತಿ ಪೂಜೆ ಅಗತ್ಯವಿದೆ.\`;
    } else {
      nadiDesc = nadiScore === 8
        ? \`Superlative Nadi matching (Groom: \${NADI_NAMES.en[bNadiIdx]} and Bride: \${NADI_NAMES.en[gNadiIdx]}). Exceptional biological balance of physical humors (Vata/Pitta/Kapha), guaranteeing healthy progeny and physical vitality.\`
        : \`Critical Nadi Dosha Active (Both possess \${NADI_NAMES.en[bNadiIdx]} Nadi). Indicates identical genetic polarities. Highly recommended to perform Nadi peace rituals to avoid progeny delay or chronic health issues.\`;
    }

    ashtaKoota.push({
      koota: "Nadi",
      localizedKoota: translateKoota("Nadi", lang),
      maxPoints: 8,
      obtainedPoints: nadiScore,
      description: nadiDesc
    });

    // Totals
    const totalMax = ashtaKoota.reduce((acc, current) => acc + current.maxPoints, 0);
    const totalObtained = ashtaKoota.reduce((acc, current) => acc + current.obtainedPoints, 0);
    const percentage = Math.round((totalObtained / totalMax) * 100);

    // South Indian 10 Poruthams (Uttama, Madhyama, Adhama)
    const southIndianPorutham = [
      { name: "Dina Porutham", localizedName: lang === "te" ? "దిన పరుత్తం" : lang === "hi" ? "दीन पोरुथम" : lang === "ta" ? "தின பொருத்தம்" : lang === "kn" ? "ದಿನ ಹೊಂದಾಣಿಕೆ" : "Dina Porutham", status: taraScore >= 1.5 ? "Uttama" : "Adhama", description: lang === "te" ? "ఆరోగ్యం మరియు ఆయుర్దాయ సూచికలు" : lang === "hi" ? "स्वास्थ्य और दीर्घायु संकेतक" : "Health and longevity indicators" },
      { name: "Gana Porutham", localizedName: lang === "te" ? "గణ పరుత్తం" : lang === "hi" ? "गण पोरुथम" : lang === "ta" ? "கண பொருத்தம்" : lang === "kn" ? "ಗಣ ಹೊಂದಾಣಿಕೆ" : "Gana Porutham", status: ganaScore >= 5 ? "Uttama" : "Adhama", description: lang === "te" ? "తరంగదైర్ఘ్యం మరియు జీవనశైలి స్వభావాలు" : lang === "hi" ? "तरंगदैर्ध्य और जीवन शैली स्वभाव" : "Wavelength and lifestyle temperaments" },
      { name: "Mahendra Porutham", localizedName: lang === "te" ? "మహేంద్ర పరుత్తం" : lang === "hi" ? "महेंद्र पोरुथम" : lang === "ta" ? "மகேந்திர பொருத்தம்" : lang === "kn" ? "ಮಹೇಂದ್ರ ಹೊಂದಾಣಿಕೆ" : "Mahendra Porutham", status: (gNak - bNak) % 4 === 0 ? "Uttama" : "Madhyama", description: lang === "te" ? "సంతానం, పిల్లలు మరియు శ్రేయస్సు" : lang === "hi" ? "संतति, संतान और कल्याण" : "Progeny, children and well-being" },
      { name: "Rajju Porutham", localizedName: lang === "te" ? "రజ్జు పరుత్తం" : lang === "hi" ? "రజ్జూ పోరుథం" : lang === "ta" ? "ரஜ்ஜு பொருத்தம்" : lang === "kn" ? "ರಜ್ಜು ಹೊಂದಾಣಿಕೆ" : "Rajju Porutham", status: bYoni !== gYoni ? "Uttama" : "Adhama", description: lang === "te" ? "భర్త ఆయుర్దాయ సూచిక" : lang === "hi" ? "पति दीर्घायु सूचकांक" : "Husband longevity index" },
      { name: "Vedha Porutham", localizedName: lang === "te" ? "వేధ పరుత్తం" : lang === "hi" ? "वेध पोरुथम" : lang === "ta" ? "வேதை பொருத்தம்" : lang === "kn" ? "ವೇಧೆ ಹೊಂದಾಣಿಕೆ" : "Vedha Porutham", status: bNak !== gNak ? "Uttama" : "Adhama", description: lang === "te" ? "వివాదాల నుండి రక్షణ" : lang === "hi" ? "विवादों से सुरक्षा" : "Protection from dynamic disputes" },
      { name: "Yoni Porutham", localizedName: lang === "te" ? "యోని పరుత్తం" : lang === "hi" ? "योनि पोरुथम" : lang === "ta" ? "யோனி பொருத்தம்" : lang === "kn" ? "ಯೋನಿ ಹೊಂದಾಣಿಕೆ" : "Yoni Porutham", status: yoniScore >= 2 ? "Uttama" : "Madhyama", description: lang === "te" ? "శారీరక సామరస్య అనుకూలత" : lang === "hi" ? "शारीरिक सामंजस्य अनुकूलता" : "Physical harmony compatibility" }
    ];

    // Dosha matching
    const bJd = getJulianDate(boyInput.year, boyInput.month, boyInput.day, boyInput.hour, boyInput.minute, boyInput.timezone || 0);
    const bAyanamsa = getAyanamsa(bJd, boyInput.ayanamsa || "Lahiri");
    const bLagnaLong = getLagnaSidereal(bJd, boyInput.latitude, boyInput.longitude, bAyanamsa);
    const boyDoshas = AstrologyService.detectDoshas(boyPanchang.planets, bLagnaLong, lang);

    const gJd = getJulianDate(girlInput.year, girlInput.month, girlInput.day, girlInput.hour, girlInput.minute, girlInput.timezone || 0);
    const gAyanamsa = getAyanamsa(gJd, girlInput.ayanamsa || "Lahiri");
    const gLagnaLong = getLagnaSidereal(gJd, girlInput.latitude, girlInput.longitude, gAyanamsa);
    const girlDoshas = AstrologyService.detectDoshas(girlPanchang.planets, gLagnaLong, lang);

    const bManglik = boyDoshas.find(d => d.name.includes("Manglik") || d.name.includes("మాంగళిక") || d.name.includes("செவ்வாய்") || d.name.includes("ಮಂಗಳ ದೋಷ"))?.hasDosha || false;
    const gManglik = girlDoshas.find(d => d.name.includes("Manglik") || d.name.includes("మాంగళిక") || d.name.includes("செவ்வாய்") || d.name.includes("ಮಂಗಳ ದೋಷ"))?.hasDosha || false;

    let hasManglikDoshaConflict = false;
    let isCancelled = false;
    if (bManglik && !gManglik) hasManglikDoshaConflict = true;
    if (!bManglik && gManglik) hasManglikDoshaConflict = true;
    if (bManglik && gManglik) {
      isCancelled = true;
    }

    const childrenScoreStr = nadiScore > 0 
      ? (lang === "te" ? "అద్భుతం (గర్భధారణ శుభం)" : lang === "hi" ? "उत्कृष्ट (गर्भधारण शुभ)" : lang === "ta" ? "சிறந்த புத்திர பாக்கியம்" : lang === "kn" ? "ಅದ್ಭುತ ಸಂತಾನ ಭಾಗ್ಯ" : "Excellent (Gorbho Dharan Shubh)") 
      : (lang === "te" ? "పరిహారాలు అవసరం (ఏక నాడి)" : lang === "hi" ? "उपचार की आवश्यकता है (एक नाड़ी)" : lang === "ta" ? "பரிகாரம் தேவை (ஏக நாடி)" : lang === "kn" ? "ದೋಷ ಪರಿಹಾರ ಅಗತ್ಯ (ಏಕ ನಾಡಿ)" : "Requires Remedies (Same Nadi)");

    const healthScoreStr = yoniScore >= 2 
      ? (lang === "te" ? "మంచి శారీరక పొంతన" : lang === "hi" ? "अच्छा शारीरिक मिलान" : lang === "ta" ? "நல்ல சரீர பொருத்தம்" : lang === "kn" ? "ಉತ್ತಮ ದೈಹಿಕ ಹೊಂದಾಣಿಕೆ" : "Good Physical Match") 
      : (lang === "te" ? "సాధారణ సమన్వయం" : lang === "hi" ? "सामान्य समन्वय" : lang === "ta" ? "சாதாரண உடலமைப்பு" : lang === "kn" ? "ಸಾಧಾರಣ ದೈಹಿಕ ಸಾಮರಸ್ಯ" : "Moderate Harmony");

    const financeScoreStr = varnaScore > 0 
      ? (lang === "te" ? "స్థిరమైన ఆర్థిక వృద్ధి" : lang === "hi" ? "स्थिर आर्थिक विकास" : lang === "ta" ? "நிலையான பொருளாதார வளர்ச்சி" : lang === "kn" ? "ಸ್ಥಿರ ಆರ್ಥಿಕ ಪ್ರಗತಿ" : "Stable Financial Growth") 
      : (lang === "te" ? "సాధారణ తరంగదైర్ఘ్య వృద్ధి" : lang === "hi" ? "सामान्य तरंगदैर्ध्य वृद्धि" : lang === "ta" ? "சாதாரண பொருளாதார நிலை" : lang === "kn" ? "ಸಾಧಾರಣ ಆರ್ಥಿಕ ಸ್ಥಿತಿ" : "Moderate Wavelength Growth");

    const longevityScoreStr = taraScore >= 2 
      ? (lang === "te" ? "దీర్ఘాయుష్షు కలయిక" : lang === "hi" ? "दीर्घायु जीवन मिलान" : lang === "ta" ? "தீர்க்க சுமங்கலி யோகம்" : lang === "kn" ? "ದೀರ್ಘಾಯುಷ್ಯ ಹೊಂದಾಣಿಕೆ" : "Long Living Life Match") 
      : (lang === "te" ? "సాధారణ ఆయుర్దాయ సూచిక" : lang === "hi" ? "सामान्य दीर्घायु सूचकांक" : lang === "ta" ? "சாதாரண ஆயுட்காலம்" : lang === "kn" ? "ಸಾಧಾರಣ ಆಯುಷ್ಯ ಸೂಚನೆ" : "Standard Longevity Index");

    const cancellationDetailsStr = isCancelled 
      ? (lang === "te" ? "అబ్బాయి మరియు అమ్మాయి ఇద్దరికీ మంగళ దోషం ఉన్నందున, ఇది సహజంగా రద్దు చేయబడుతుంది." : lang === "hi" ? "लड़का और लड़की दोनों को मांगलिक दोष होने के कारण स्वाभाविक रूप से निरस्त हो जाता है।" : lang === "ta" ? "இருவருக்கும் செவ்வாய் தோஷம் இருப்பதால், தோஷ நிவர்த்தி ஏற்படுகிறது." : lang === "kn" ? "ಇಬ್ಬರಿಗೂ ಮಂಗಳ ದೋಷವಿರುವುದರಿಂದ ಸ್ವಾಭಾವಿಕವಾಗಿ ದೋಷ ನಿವಾರಣೆಯಾಗುತ್ತದೆ." : "Both boy and girl have Kuja/Manglik Dosha, leading to natural mathematical cancellation.") 
      : undefined;

    const reportStr = lang === "te" 
      ? \`వేద కుండలి మ్యాచింగ్ పూర్తయింది. 36 పాయింట్‌లకు గాను \${totalObtained} పొందారు. మొత్తం పొంతన శాతం \${percentage}%. \${totalObtained >= 18 ? "వివాహం అనుకూలమైనది మరియు సిఫార్సు చేయబడింది." : "తక్కువ మ్యాచింగ్ పాయింట్ల కారణంగా జాగ్రత్తగా నివారణలు మరియు జ్యోతిష్యుడిని సంప్రదించడం అవసరం."}\`
      : lang === "hi"
      ? \`वैदिक कुंडली मिलान पूरा हो गया है। 36 में से \${totalObtained} अंक प्राप्त हुए। कुल मिलान दर \${percentage}% है। \${totalObtained >= 18 ? "विवाह अनुकूल है और अनुशंसित है।" : "कम मिलान अंकों के कारण सावधानीपूर्वक उपचार और ज्योतिषी से परामर्श की आवश्यकता है।"}\`
      : lang === "ta"
      ? \`வேத ஜாதக பொருத்தம் காண்கிறது. 36க்கு \${totalObtained} புள்ளிகள் கிடைத்துள்ளது. மொத்தப் பொருத்தம் \${percentage}%. \${totalObtained >= 18 ? "மணவாழ்க்கை மிகவும் உகந்தது மற்றும் பரிந்துரைக்கப்படுகிறது." : "குறைவான புள்ளிகள் என்பதால் முறையான பரிகாரம் மற்றும் ஜோதிட ஆலோசனை அவசியம்."}\`
      : lang === "kn"
      ? \`ವೇದ ಕುಂಡಲಿ ಹೊಂದಾಣಿಕೆ ಪೂರ್ಣಗೊಂಡಿದೆ. 36ಕ್ಕೆ \${totalObtained} ಅಂಕಗಳು ಬಂದಿವೆ. ಒಟ್ಟು ಹೊಂದಾಣಿಕೆ ದರ \${percentage}%. \${totalObtained >= 18 ? "ವಿವಾಹಕ್ಕೆ ಅತ್ಯಂತ ಯೋಗ್ಯವಾಗಿದೆ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ." : "ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ ಅಂಕಗಳಿರುವ ಕಾರಣ ಸೂಕ್ತ ಆಧ್ಯಾತ್ಮಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯರ ಸಲಹೆ ಅಗತ್ಯವಿದೆ."}\`
      : \`Vedic kundali matching has been completed. Obtained \${totalObtained} out of 36 points. Overall match rate is \${percentage}%. \${totalObtained >= 18 ? "Marriage is compatible and recommended." : "Requires careful remediation and astrologer consulting due to low matching points."}\`;

    return {
      ashtaKoota,
      southIndianPorutham: southIndianPorutham as any,
      overallPercentage: percentage,
      marriageScore: totalObtained,
      compatibilityScore: percentage,
      childrenScore: childrenScoreStr,
      healthScore: healthScoreStr,
      financeScore: financeScoreStr,
      longevityScore: longevityScoreStr,
      doshaMatching: {
        boyDoshas: boyDoshas.filter(d => d.hasDosha).map(d => d.name),
        girlDoshas: girlDoshas.filter(d => d.hasDosha).map(d => d.name),
        hasManglikDoshaConflict,
        isCancelled,
        cancellationDetails: cancellationDetailsStr
      },
      report: reportStr
    };
  }

  // Numerology Calculator
`;

const prefix = fileContent.substring(0, startIndex);
const suffix = fileContent.substring(endIndex);

const rebuiltContent = prefix + newMethodCode + suffix;
fs.writeFileSync(targetFilePath, rebuiltContent, 'utf8');
console.log("Astrology service rebuilt completely and accurately based on unique getNumerology marker!");
