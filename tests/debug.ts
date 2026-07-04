import swisseph from 'swisseph';
const jd = 2450000;
const result = swisseph.swe_houses_ex(jd, swisseph.SEFLG_SIDEREAL, 17.385, 78.4867, 'W');
console.log(result);
