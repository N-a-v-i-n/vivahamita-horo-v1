var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/merge/lib/src/index.js
var require_src = __commonJS({
  "node_modules/merge/lib/src/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPlainObject = exports.clone = exports.recursive = exports.merge = exports.main = void 0;
    module.exports = exports = main;
    exports.default = main;
    function main() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return merge.apply(void 0, items);
    }
    exports.main = main;
    main.clone = clone;
    main.isPlainObject = isPlainObject;
    main.recursive = recursive;
    function merge() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return _merge(items[0] === true, false, items);
    }
    exports.merge = merge;
    function recursive() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      return _merge(items[0] === true, true, items);
    }
    exports.recursive = recursive;
    function clone(input) {
      if (Array.isArray(input)) {
        var output = [];
        for (var index = 0; index < input.length; ++index)
          output.push(clone(input[index]));
        return output;
      } else if (isPlainObject(input)) {
        var output = {};
        for (var index in input)
          output[index] = clone(input[index]);
        return output;
      } else {
        return input;
      }
    }
    exports.clone = clone;
    function isPlainObject(input) {
      return input && typeof input === "object" && !Array.isArray(input);
    }
    exports.isPlainObject = isPlainObject;
    function _recursiveMerge(base, extend) {
      if (!isPlainObject(base))
        return extend;
      for (var key in extend) {
        if (key === "__proto__" || key === "constructor" || key === "prototype")
          continue;
        base[key] = isPlainObject(base[key]) && isPlainObject(extend[key]) ? _recursiveMerge(base[key], extend[key]) : extend[key];
      }
      return base;
    }
    function _merge(isClone, isRecursive, items) {
      var result;
      if (isClone || !isPlainObject(result = items.shift()))
        result = {};
      for (var index = 0; index < items.length; ++index) {
        var item = items[index];
        if (!isPlainObject(item))
          continue;
        for (var key in item) {
          if (key === "__proto__" || key === "constructor" || key === "prototype")
            continue;
          var value = isClone ? clone(item[key]) : item[key];
          result[key] = isRecursive ? _recursiveMerge(result[key], value) : value;
        }
      }
      return result;
    }
  }
});

// node_modules/swisseph/lib/swisseph.js
var require_swisseph = __commonJS({
  "node_modules/swisseph/lib/swisseph.js"(exports, module) {
    var swisseph2 = __require(__dirname + "/../build/Release/swisseph.node");
    var merge = require_src();
    swisseph2.SE_AUNIT_TO_KM = 1495978707e-1;
    swisseph2.SE_AUNIT_TO_LIGHTYEAR = 1 / 63241.07708427;
    swisseph2.SE_AUNIT_TO_PARSEC = 1 / 206264.8062471;
    swisseph2.SE_JUL_CAL = 0;
    swisseph2.SE_GREG_CAL = 1;
    swisseph2.SE_ECL_NUT = -1;
    swisseph2.SE_SUN = 0;
    swisseph2.SE_MOON = 1;
    swisseph2.SE_MERCURY = 2;
    swisseph2.SE_VENUS = 3;
    swisseph2.SE_EARTH = 14;
    swisseph2.SE_MARS = 4;
    swisseph2.SE_JUPITER = 5;
    swisseph2.SE_SATURN = 6;
    swisseph2.SE_URANUS = 7;
    swisseph2.SE_NEPTUNE = 8;
    swisseph2.SE_PLUTO = 9;
    swisseph2.SE_MEAN_NODE = 10;
    swisseph2.SE_TRUE_NODE = 11;
    swisseph2.SE_MEAN_APOG = 12;
    swisseph2.SE_OSCU_APOG = 13;
    swisseph2.SE_INTP_APOG = 21;
    swisseph2.SE_INTP_PERG = 22;
    swisseph2.SE_CHIRON = 15;
    swisseph2.SE_PHOLUS = 16;
    swisseph2.SE_CERES = 17;
    swisseph2.SE_PALLAS = 18;
    swisseph2.SE_JUNO = 19;
    swisseph2.SE_VESTA = 20;
    swisseph2.SE_NPLANETS = 23;
    swisseph2.SE_AST_OFFSET = 1e4;
    swisseph2.SE_VARUNA = swisseph2.SE_AST_OFFSET + 2e4;
    swisseph2.SE_FICT_OFFSET = 40;
    swisseph2.SE_FICT_OFFSET_1 = 39;
    swisseph2.SE_FICT_MAX = 999;
    swisseph2.SE_NFICT_ELEM = 15;
    swisseph2.SE_COMET_OFFSET = 1e3;
    swisseph2.SE_NALL_NAT_POINTS = swisseph2.SE_NPLANETS + swisseph2.SE_NFICT_ELEM;
    swisseph2.SE_CUPIDO = 40;
    swisseph2.SE_HADES = 41;
    swisseph2.SE_ZEUS = 42;
    swisseph2.SE_KRONOS = 43;
    swisseph2.SE_APOLLON = 44;
    swisseph2.SE_ADMETOS = 45;
    swisseph2.SE_VULKANUS = 46;
    swisseph2.SE_POSEIDON = 47;
    swisseph2.SE_ISIS = 48;
    swisseph2.SE_NIBIRU = 49;
    swisseph2.SE_HARRINGTON = 50;
    swisseph2.SE_NEPTUNE_LEVERRIER = 51;
    swisseph2.SE_NEPTUNE_ADAMS = 52;
    swisseph2.SE_PLUTO_LOWELL = 53;
    swisseph2.SE_PLUTO_PICKERING = 54;
    swisseph2.SE_VULCAN = 55;
    swisseph2.SE_WHITE_MOON = 56;
    swisseph2.SE_PROSERPINA = 57;
    swisseph2.SE_WALDEMATH = 58;
    swisseph2.SE_FIXSTAR = -10;
    swisseph2.SE_ASC = 0;
    swisseph2.SE_MC = 1;
    swisseph2.SE_ARMC = 2;
    swisseph2.SE_VERTEX = 3;
    swisseph2.SE_EQUASC = 4;
    swisseph2.SE_COASC1 = 5;
    swisseph2.SE_COASC2 = 6;
    swisseph2.SE_POLASC = 7;
    swisseph2.SE_NASCMC = 8;
    swisseph2.SEFLG_JPLEPH = 1;
    swisseph2.SEFLG_SWIEPH = 2;
    swisseph2.SEFLG_MOSEPH = 4;
    swisseph2.SEFLG_HELCTR = 8;
    swisseph2.SEFLG_TRUEPOS = 16;
    swisseph2.SEFLG_J2000 = 32;
    swisseph2.SEFLG_NONUT = 64;
    swisseph2.SEFLG_SPEED3 = 128;
    swisseph2.SEFLG_SPEED = 256;
    swisseph2.SEFLG_NOGDEFL = 512;
    swisseph2.SEFLG_NOABERR = 1024;
    swisseph2.SEFLG_ASTROMETRIC = swisseph2.SEFLG_NOABERR | swisseph2.SEFLG_NOGDEFL;
    swisseph2.SEFLG_EQUATORIAL = 2 * 1024;
    swisseph2.SEFLG_XYZ = 4 * 1024;
    swisseph2.SEFLG_RADIANS = 8 * 1024;
    swisseph2.SEFLG_BARYCTR = 16 * 1024;
    swisseph2.SEFLG_TOPOCTR = 32 * 1024;
    swisseph2.SEFLG_ORBEL_AA = swisseph2.SEFLG_TOPOCTR;
    swisseph2.SEFLG_SIDEREAL = 64 * 1024;
    swisseph2.SEFLG_ICRS = 128 * 1024;
    swisseph2.SEFLG_DPSIDEPS_1980 = 256 * 1024;
    swisseph2.SEFLG_JPLHOR = swisseph2.SEFLG_DPSIDEPS_1980;
    swisseph2.SEFLG_JPLHOR_APPROX = 512 * 1024;
    swisseph2.SE_SIDBITS = 256;
    swisseph2.SE_SIDBIT_ECL_T0 = 256;
    swisseph2.SE_SIDBIT_SSY_PLANE = 512;
    swisseph2.SE_SIDBIT_USER_UT = 1024;
    swisseph2.SE_SIDM_FAGAN_BRADLEY = 0;
    swisseph2.SE_SIDM_LAHIRI = 1;
    swisseph2.SE_SIDM_DELUCE = 2;
    swisseph2.SE_SIDM_RAMAN = 3;
    swisseph2.SE_SIDM_USHASHASHI = 4;
    swisseph2.SE_SIDM_KRISHNAMURTI = 5;
    swisseph2.SE_SIDM_DJWHAL_KHUL = 6;
    swisseph2.SE_SIDM_YUKTESHWAR = 7;
    swisseph2.SE_SIDM_JN_BHASIN = 8;
    swisseph2.SE_SIDM_BABYL_KUGLER1 = 9;
    swisseph2.SE_SIDM_BABYL_KUGLER2 = 10;
    swisseph2.SE_SIDM_BABYL_KUGLER3 = 11;
    swisseph2.SE_SIDM_BABYL_HUBER = 12;
    swisseph2.SE_SIDM_BABYL_ETPSC = 13;
    swisseph2.SE_SIDM_ALDEBARAN_15TAU = 14;
    swisseph2.SE_SIDM_HIPPARCHOS = 15;
    swisseph2.SE_SIDM_SASSANIAN = 16;
    swisseph2.SE_SIDM_GALCENT_0SAG = 17;
    swisseph2.SE_SIDM_J2000 = 18;
    swisseph2.SE_SIDM_J1900 = 19;
    swisseph2.SE_SIDM_B1950 = 20;
    swisseph2.SE_SIDM_SURYASIDDHANTA = 21;
    swisseph2.SE_SIDM_SURYASIDDHANTA_MSUN = 22;
    swisseph2.SE_SIDM_ARYABHATA = 23;
    swisseph2.SE_SIDM_ARYABHATA_MSUN = 24;
    swisseph2.SE_SIDM_SS_REVATI = 25;
    swisseph2.SE_SIDM_SS_CITRA = 26;
    swisseph2.SE_SIDM_TRUE_CITRA = 27;
    swisseph2.SE_SIDM_TRUE_REVATI = 28;
    swisseph2.SE_SIDM_TRUE_PUSHYA = 29;
    swisseph2.SE_SIDM_GALCENT_RGILBRAND = 30;
    swisseph2.SE_SIDM_GALEQU_IAU1958 = 31;
    swisseph2.SE_SIDM_GALEQU_TRUE = 32;
    swisseph2.SE_SIDM_GALEQU_MULA = 33;
    swisseph2.SE_SIDM_GALALIGN_MARDYKS = 34;
    swisseph2.SE_SIDM_TRUE_MULA = 35;
    swisseph2.SE_SIDM_GALCENT_MULA_WILHELM = 36;
    swisseph2.SE_SIDM_ARYABHATA_522 = 37;
    swisseph2.SE_SIDM_BABYL_BRITTON = 38;
    swisseph2.SE_SIDM_TRUE_SHEORAN = 39;
    swisseph2.SE_SIDM_GALCENT_COCHRANE = 40;
    swisseph2.SE_SIDM_GALEQU_FIORENZA = 41;
    swisseph2.SE_SIDM_VALENS_MOON = 42;
    swisseph2.SE_SIDM_USER = 255;
    swisseph2.SE_NSIDM_PREDEF = 43;
    swisseph2.SE_NODBIT_MEAN = 1;
    swisseph2.SE_NODBIT_OSCU = 2;
    swisseph2.SE_NODBIT_OSCU_BAR = 4;
    swisseph2.SE_NODBIT_FOPOINT = 256;
    swisseph2.SEFLG_DEFAULTEPH = swisseph2.SEFLG_SWIEPH;
    swisseph2.SE_MAX_STNAME = 256;
    swisseph2.SE_ECL_CENTRAL = 1;
    swisseph2.SE_ECL_NONCENTRAL = 2;
    swisseph2.SE_ECL_TOTAL = 4;
    swisseph2.SE_ECL_ANNULAR = 8;
    swisseph2.SE_ECL_PARTIAL = 16;
    swisseph2.SE_ECL_ANNULAR_TOTAL = 32;
    swisseph2.SE_ECL_PENUMBRAL = 64;
    swisseph2.SE_ECL_ALLTYPES_SOLAR = swisseph2.SE_ECL_CENTRAL | swisseph2.SE_ECL_NONCENTRAL | swisseph2.SE_ECL_TOTAL | swisseph2.SE_ECL_ANNULAR | swisseph2.SE_ECL_PARTIAL | swisseph2.SE_ECL_ANNULAR_TOTAL;
    swisseph2.SE_ECL_ALLTYPES_LUNAR = swisseph2.SE_ECL_TOTAL | swisseph2.SE_ECL_PARTIAL | swisseph2.SE_ECL_PENUMBRAL;
    swisseph2.SE_ECL_VISIBLE = 128;
    swisseph2.SE_ECL_MAX_VISIBLE = 256;
    swisseph2.SE_ECL_1ST_VISIBLE = 512;
    swisseph2.SE_ECL_PARTBEG_VISIBLE = 512;
    swisseph2.SE_ECL_2ND_VISIBLE = 1024;
    swisseph2.SE_ECL_TOTBEG_VISIBLE = 1024;
    swisseph2.SE_ECL_3RD_VISIBLE = 2048;
    swisseph2.SE_ECL_TOTEND_VISIBLE = 2048;
    swisseph2.SE_ECL_4TH_VISIBLE = 4096;
    swisseph2.SE_ECL_PARTEND_VISIBLE = 4096;
    swisseph2.SE_ECL_PENUMBBEG_VISIBLE = 8192;
    swisseph2.SE_ECL_PENUMBEND_VISIBLE = 16384;
    swisseph2.SE_ECL_OCC_BEG_DAYLIGHT = 8192;
    swisseph2.SE_ECL_OCC_END_DAYLIGHT = 16384;
    swisseph2.SE_ECL_ONE_TRY = 32 * 1024;
    swisseph2.SE_CALC_RISE = 1;
    swisseph2.SE_CALC_SET = 2;
    swisseph2.SE_CALC_MTRANSIT = 4;
    swisseph2.SE_CALC_ITRANSIT = 8;
    swisseph2.SE_BIT_DISC_CENTER = 256;
    swisseph2.SE_BIT_DISC_BOTTOM = 8192;
    swisseph2.SE_BIT_GEOCTR_NO_ECL_LAT = 128;
    swisseph2.SE_BIT_NO_REFRACTION = 512;
    swisseph2.SE_BIT_CIVIL_TWILIGHT = 1024;
    swisseph2.SE_BIT_NAUTIC_TWILIGHT = 2048;
    swisseph2.SE_BIT_ASTRO_TWILIGHT = 4096;
    swisseph2.SE_BIT_FIXED_DISC_SIZE = 16 * 1024;
    swisseph2.SE_ECL2HOR = 0;
    swisseph2.SE_EQU2HOR = 1;
    swisseph2.SE_HOR2ECL = 0;
    swisseph2.SE_HOR2EQU = 1;
    swisseph2.SE_TRUE_TO_APP = 0;
    swisseph2.SE_APP_TO_TRUE = 1;
    swisseph2.SE_SPLIT_DEG_ROUND_SEC = 1;
    swisseph2.SE_SPLIT_DEG_ROUND_MIN = 2;
    swisseph2.SE_SPLIT_DEG_ROUND_DEG = 4;
    swisseph2.SE_SPLIT_DEG_ZODIACAL = 8;
    swisseph2.SE_SPLIT_DEG_NAKSHATRA = 1024;
    swisseph2.SE_SPLIT_DEG_KEEP_SIGN = 16;
    swisseph2.SE_SPLIT_DEG_KEEP_DEG = 32;
    swisseph2.SE_HELIACAL_RISING = 1;
    swisseph2.SE_HELIACAL_SETTING = 2;
    swisseph2.SE_MORNING_FIRST = swisseph2.SE_HELIACAL_RISING;
    swisseph2.SE_EVENING_LAST = swisseph2.SE_HELIACAL_SETTING;
    swisseph2.SE_EVENING_FIRST = 3;
    swisseph2.SE_MORNING_LAST = 4;
    swisseph2.SE_ACRONYCHAL_RISING = 5;
    swisseph2.SE_ACRONYCHAL_SETTING = 6;
    swisseph2.SE_COSMICAL_SETTING = swisseph2.SE_ACRONYCHAL_SETTING;
    swisseph2.SE_HELFLAG_LONG_SEARCH = 128;
    swisseph2.SE_HELFLAG_HIGH_PRECISION = 256;
    swisseph2.SE_HELFLAG_OPTICAL_PARAMS = 512;
    swisseph2.SE_HELFLAG_NO_DETAILS = 1024;
    swisseph2.SE_HELFLAG_SEARCH_1_PERIOD = 1 << 11;
    swisseph2.SE_HELFLAG_VISLIM_DARK = 1 << 12;
    swisseph2.SE_HELFLAG_VISLIM_NOMOON = 1 << 13;
    swisseph2.SE_HELFLAG_VISLIM_PHOTOPIC = 1 << 14;
    swisseph2.SE_HELFLAG_AVKIND_VR = 1 << 15;
    swisseph2.SE_HELFLAG_AVKIND_PTO = 1 << 16;
    swisseph2.SE_HELFLAG_AVKIND_MIN7 = 1 << 17;
    swisseph2.SE_HELFLAG_AVKIND_MIN9 = 1 << 18;
    swisseph2.SE_HELFLAG_AVKIND = swisseph2.SE_HELFLAG_AVKIND_VR | swisseph2.SE_HELFLAG_AVKIND_PTO | swisseph2.SE_HELFLAG_AVKIND_MIN7 | swisseph2.SE_HELFLAG_AVKIND_MIN9;
    swisseph2.TJD_INVALID = 99999999;
    swisseph2.SIMULATE_VICTORVB = 1;
    swisseph2.SE_PHOTOPIC_FLAG = 0;
    swisseph2.SE_SCOTOPIC_FLAG = 1;
    swisseph2.SE_MIXEDOPIC_FLAG = 2;
    swisseph2.ephemeris = {
      "swisseph": swisseph2.SEFLG_SWIEPH,
      "moshier": swisseph2.SEFLG_MOSEPH,
      "de200": "de200.eph",
      "de405": "de405.eph",
      "de406": "de406.eph",
      "de406e": "de406e.eph",
      "de414": "de414.eph",
      "de421": "de421.eph",
      "de422": "de422.eph",
      "de430": "de430.eph",
      "de431": "de431.eph"
    };
    swisseph2.calc = function(options, callback) {
      var flags;
      flags = swisseph2.SEFLG_SPEED;
      var date;
      options.date.gregorian = options.date.gregorian || {};
      options.date.julian = options.date.julian || {};
      if (options.date.gregorian.terrestrial) {
        date = options.date.gregorian.terrestrial;
        options.date.julian.terrestrial = swisseph2.swe_julday(date.year, date.month, date.day, date.hour, swisseph2.SE_GREG_CAL);
        options.date.julian.delta = swisseph2.swe_deltat(options.date.julian.terrestrial).delta;
        options.date.julian.universal = options.date.julian.terrestrial - options.date.julian.delta;
        options.date.gregorian.universal = options.date.gregorian.universal || {};
        merge(options.date.gregorian.universal, swisseph2.swe_revjul(options.date.julian.universal, swisseph2.SE_GREG_CAL));
      } else if (options.date.gregorian.universal) {
        date = options.date.gregorian.universal;
        options.date.julian.universal = swisseph2.swe_julday(date.year, date.month, date.day, date.hour, swisseph2.SE_GREG_CAL);
        options.date.julian.delta = swisseph2.swe_deltat(options.date.julian.universal).delta;
        options.date.julian.terrestrial = options.date.julian.universal + options.date.julian.delta;
        options.date.gregorian.terrestrial = options.date.gregorian.terrestrial || {};
        merge(options.date.gregorian.terrestrial, swisseph2.swe_revjul(options.date.julian.terrestrial, swisseph2.SE_GREG_CAL));
      } else if (options.date.julian.terrestrial) {
        options.date.julian.delta = swisseph2.swe_deltat(options.date.julian.terrestrial).delta;
        options.date.julian.universal = options.date.julian.terrestrial - options.date.julian.delta;
        options.date.gregorian.universal = options.date.gregorian.universal || {};
        options.date.gregorian.terrestrial = options.date.gregorian.terrestrial || {};
        merge(options.date.gregorian.terrestrial, swisseph2.swe_revjul(options.date.julian.terrestrial, swisseph2.SE_GREG_CAL));
        merge(options.date.gregorian.universal, swisseph2.swe_revjul(options.date.julian.universal, swisseph2.SE_GREG_CAL));
      } else if (options.date.julian.universal) {
        options.date.julian.delta = swisseph2.swe_deltat(options.date.julian.universal).delta;
        options.date.julian.terrestrial = options.date.julian.universal + options.date.julian.delta;
        options.date.gregorian.universal = options.date.gregorian.universal || {};
        options.date.gregorian.terrestrial = options.date.gregorian.terrestrial || {};
        merge(options.date.gregorian.terrestrial, swisseph2.swe_revjul(options.date.julian.terrestrial, swisseph2.SE_GREG_CAL));
        merge(options.date.gregorian.universal, swisseph2.swe_revjul(options.date.julian.universal, swisseph2.SE_GREG_CAL));
      }
      options.date.gregorian.delta = options.date.julian.delta * 86400;
      options.body.name = swisseph2.swe_get_planet_name(parseInt(options.body.id)).name;
      options.observer.ephemeris = options.observer.ephemeris || "moshier";
      if (swisseph2.ephemeris[options.observer.ephemeris].length) {
        flags |= swisseph2.SEFLG_JPLEPH;
        swisseph2.swe_set_jpl_file(swisseph2.ephemeris[options.observer.ephemeris]);
      } else {
        flags |= swisseph2.ephemeris[options.observer.ephemeris];
      }
      if (options.observer.geographic.longitude != 0 || options.observer.geographic.latitude != 0 || options.observer.geographic.height != 0) {
        swisseph2.swe_set_topo(
          options.observer.geographic.longitude,
          options.observer.geographic.latitude,
          options.observer.geographic.height
        );
        flags |= swisseph2.SEFLG_TOPOCTR;
      }
      merge(options.body.position, swisseph2.swe_calc_ut(options.date.julian.universal, parseInt(options.body.id), flags));
      options.body.position.longitude = { decimalDegree: options.body.position.longitude };
      options.body.position.latitude = { decimalDegree: options.body.position.latitude };
      swisseph2.swe_close();
      if (callback) {
        callback(options);
      }
      ;
      return options;
    };
    module.exports = swisseph2;
  }
});

// api-src/index.ts
import express from "express";
import dotenv from "dotenv";

// src/routes/astrology.ts
import { Router } from "express";

// src/services/astrologyService.ts
import crypto from "crypto";

// src/utils/translation.ts
var PLANET_TRANSLATIONS = {
  Sun: {
    en: "Sun",
    te: "\u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41",
    hi: "\u0938\u0942\u0930\u094D\u092F",
    ta: "\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BCD",
    kn: "\u0CB8\u0CC2\u0CB0\u0CCD\u0CAF"
  },
  Moon: {
    en: "Moon",
    te: "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41",
    hi: "\u091A\u0902\u0926\u094D\u0930",
    ta: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD",
    kn: "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0"
  },
  Mars: {
    en: "Mars",
    te: "\u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41",
    hi: "\u092E\u0902\u0917\u0932",
    ta: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD",
    kn: "\u0CAE\u0C82\u0C97\u0CB3"
  },
  Mercury: {
    en: "Mercury",
    te: "\u0C2C\u0C41\u0C27\u0C41\u0C21\u0C41",
    hi: "\u092C\u0941\u0927",
    ta: "\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD",
    kn: "\u0CAC\u0CC1\u0CA7"
  },
  Jupiter: {
    en: "Jupiter",
    te: "\u0C17\u0C41\u0C30\u0C41\u0C21\u0C41",
    hi: "\u0917\u0941\u0930\u0941",
    ta: "\u0B95\u0BC1\u0BB0\u0BC1",
    kn: "\u0C97\u0CC1\u0CB0\u0CC1"
  },
  Venus: {
    en: "Venus",
    te: "\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C41\u0C21\u0C41",
    hi: "\u0936\u0941\u0915\u094D\u0930",
    ta: "\u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB0\u0BA9\u0BCD",
    kn: "\u0CB6\u0CC1\u0C95\u0CCD\u0CB0"
  },
  Saturn: {
    en: "Saturn",
    te: "\u0C36\u0C28\u0C3F",
    hi: "\u0936\u0928\u093F",
    ta: "\u0B9A\u0BA9\u0BBF",
    kn: "\u0CB6\u0CA8\u0CBF"
  },
  Rahu: {
    en: "Rahu",
    te: "\u0C30\u0C3E\u0C39\u0C41\u0C35\u0C41",
    hi: "\u0930\u093E\u0939\u0941",
    ta: "\u0BB0\u0BBE\u0B95\u0BC1",
    kn: "\u0CB0\u0CBE\u0CB9\u0CC1"
  },
  Ketu: {
    en: "Ketu",
    te: "\u0C15\u0C47\u0C24\u0C41\u0C35\u0C41",
    hi: "\u0915\u0947\u0924\u0941",
    ta: "\u0B95\u0BC7\u0BA4\u0BC1",
    kn: "\u0C95\u0CC7\u0CA4\u0CC1"
  },
  Uranus: {
    en: "Uranus",
    te: "\u0C07\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41",
    hi: "\u0905\u0930\u0941\u0923",
    ta: "\u0BAF\u0BC1\u0BB0\u0BC7\u0BA9\u0BB8\u0BCD",
    kn: "\u0CAF\u0CC1\u0CB0\u0CC7\u0CA8\u0CB8\u0CCD"
  },
  Neptune: {
    en: "Neptune",
    te: "\u0935\u0930\u0C41\u0C21\u0C41",
    hi: "\u0935\u0930\u0941\u0923",
    ta: "\u0BA8\u0BC6\u0BAA\u0BCD\u0B9F\u0BBF\u0BAF\u0BC2\u0BA9\u0BCD",
    kn: "\u0CA8\u0CC6\u0CAA\u0CCD\u0C9A\u0CC2\u0CA8\u0CCD"
  },
  Pluto: {
    en: "Pluto",
    te: "\u0C2F\u0C2E\u0C41\u0C21\u0C41",
    hi: "\u092F\u092E",
    ta: "\u0BAA\u0BC1\u0BB3\u0BC2\u0B9F\u0BCD\u0B9F\u0BCB",
    kn: "\u0CAA\u0CCD\u0CB2\u0CC1\u0C9F\u0CCA"
  },
  Lagna: {
    en: "Lagna (Ascendant)",
    te: "\u0C32\u0C17\u0C4D\u0C28\u0C02",
    hi: "\u0932\u0917\u094D\u0928",
    ta: "\u0BB2\u0B95\u0BCD\u0BA9\u0BAE\u0BCD",
    kn: "\u0CB2\u0C97\u0CCD\u0CA8"
  }
};
var RASHI_TRANSLATIONS = [
  {
    en: "Mesha (Aries)",
    te: "\u0C2E\u0C47\u0C37 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u092E\u0947\u0937",
    ta: "\u0BAE\u0BC7\u0BB7\u0BAE\u0BCD",
    kn: "\u0CAE\u0CC7\u0CB7"
  },
  {
    en: "Vrishabha (Taurus)",
    te: "\u0C35\u0C43\u0C37\u0C2D \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0935\u0943\u0937\u092D",
    ta: "\u0BB0\u0BBF\u0BB7\u0BAA\u0BAE\u0BCD",
    kn: "\u0CB5\u0CC3\u0CB7\u0CAD"
  },
  {
    en: "Mithuna (Gemini)",
    te: "\u0C2E\u0C3F\u0C25\u0C41\u0C28 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u092E\u093F\u0925\u0941\u0928",
    ta: "\u0BAE\u0BBF\u0BA4\u0BC1\u0BA9\u0BAE\u0BCD",
    kn: "\u0CAE\u0CBF\u0CA5\u0CC1\u0CA8"
  },
  {
    en: "Karka (Cancer)",
    te: "\u0C15\u0C30\u0C4D\u0C15\u0C3E\u0C1F\u0C15 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0915\u0930\u094D\u0915",
    ta: "\u0B95\u0B9F\u0B95\u0BAE\u0BCD",
    kn: "\u0C95\u0CB0\u0CCD\u0C95\u0CBE\u0C9F\u0C95"
  },
  {
    en: "Simha (Leo)",
    te: "\u0C38\u0C3F\u0C02\u0C39 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0938\u093F\u0902\u0939",
    ta: "\u0B9A\u0BBF\u0BAE\u0BCD\u0BAE\u0BAE\u0BCD",
    kn: "\u0CB8\u0CBF\u0C82\u0CB9"
  },
  {
    en: "Kanya (Virgo)",
    te: "\u0C15\u0C28\u0C4D\u0C2F\u0C3E \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0915\u0928\u094D\u092F\u093E",
    ta: "\u0B95\u0BA9\u0BCD\u0BA9\u0BBF",
    kn: "\u0C95\u0CA8\u0CCD\u0CAF\u102C"
  },
  {
    en: "Tula (Libra)",
    te: "\u0C24\u0C41\u0C32\u0C3E \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0924\u0941\u0932\u093E",
    ta: "\u0BA4\u0BC1\u0BB2\u0BBE\u0BAE\u0BCD",
    kn: "\u0CA4\u0CC1\u0CB2\u0CBE"
  },
  {
    en: "Vrishchika (Scorpio)",
    te: "\u0C35\u0C43\u0C36\u0C4D\u0C1A\u0C3F\u0C15 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0935\u0943\u0936\u094D\u091A\u093F\u0915",
    ta: "\u0BB5\u0BBF\u0BB0\u0BC1\u0B9A\u0BCD\u0B9A\u0BBF\u0B95\u0BAE\u0BCD",
    kn: "\u0CB5\u0CC3\u0CB6\u0CCD\u0C9A\u0CBF\u0C95"
  },
  {
    en: "Dhanu (Sagittarius)",
    te: "\u0C27\u0C28\u0C41\u0C38\u0C4D\u0C38\u0C41 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0927\u0928\u0941",
    ta: "\u0BA4\u0BA9\u0BC1\u0B9A\u0BC1",
    kn: "\u0CA7\u0CA8\u0CC1"
  },
  {
    en: "Makara (Capricorn)",
    te: "\u0C2E\u0C15\u0C30 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u092E\u0915\u0930",
    ta: "\u0BAE\u0B95\u0BB0\u0BAE\u0BCD",
    kn: "\u0CAE\u0C95\u0CB0"
  },
  {
    en: "Kumbha (Aquarius)",
    te: "\u0C15\u0C41\u0C02\u0C2D \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u0915\u0941\u0902\u092D",
    ta: "\u0B95\u0BC1\u0BAE\u0BCD\u0BAA\u0BAE\u0BCD",
    kn: "\u0C95\u0CC1\u0C82\u0CAD"
  },
  {
    en: "Meena (Pisces)",
    te: "\u0C2E\u0C40\u0C28 \u0C30\u0C3E\u0C36\u0C3F",
    hi: "\u092E\u0940\u0928",
    ta: "\u0BAE\u0BC0\u0BA9\u0BAE\u0BCD",
    kn: "\u0CAE\u0CC0\u0CA8"
  }
];
var NAKSHATRA_TRANSLATIONS = [
  { en: "Ashwini", te: "\u0C05\u0C36\u0C4D\u0C35\u0C3F\u0C28\u0C3F", hi: "\u0905\u0936\u094D\u0935\u093F\u0928\u0940", ta: "\u0B85\u0BB8\u0BCD\u0BB5\u0BBF\u0BA9\u0BBF", kn: "\u0C85\u0CB6\u0CCD\u0CB5\u0CBF\u0CA8\u0CBF" },
  { en: "Bharani", te: "\u0C2D\u0C30\u0C23\u0C3F", hi: "\u092D\u0930\u0923\u0940", ta: "\u0BAA\u0BB0\u0BA3\u0BBF", kn: "\u0CAD\u0CB0\u0CA3\u0CBF" },
  { en: "Krittika", te: "\u0C15\u0C43\u0C24\u0C4D\u0C24\u0C3F\u0C15", hi: "\u0915\u0943\u0924\u094D\u0924\u093F\u0915\u093E", ta: "\u0B95\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF\u0B95\u0BC8", kn: "\u0C95\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF\u0C95\u0CBE" },
  { en: "Rohini", te: "\u0C30\u0C4B\u0C39\u0C3F\u0C23\u0C3F", hi: "\u0930\u094B\u0939\u093F\u0923\u0940", ta: "\u0BB0\u0BCB\u0B95\u0BBF\u0BA3\u0BBF", kn: "\u0CB0\u0CCB\u0CB9\u0CBF\u0CA3\u0CBF" },
  { en: "Mrigashira", te: "\u0C2E\u0C43\u0C17\u0C36\u0C3F\u0C30", hi: "\u092E\u0943\u0917\u0936\u093F\u0930\u093E", ta: "\u0BAE\u0BBF\u0BB0\u0BC1\u0B95\u0B9A\u0BC0\u0BB0\u0BBF\u0B9F\u0BAE\u0BCD", kn: "\u0CAE\u0CC3\u0C97\u0CB6\u0CBF\u0CB0" },
  { en: "Ardra", te: "\u0C06\u0C30\u0C4D\u0C26\u0C4D\u0C30", hi: "\u0906\u0930\u094D\u0926\u094D\u0930\u093E", ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BBE\u0BA4\u0BBF\u0BB0\u0BC8", kn: "\u0C86\u0CB0\u0CBF\u0CA6\u0CCD\u0CB0" },
  { en: "Punarvasu", te: "\u0C2A\u0C41\u0C28\u0C30\u0C4D\u0C35\u0C38\u0C41", hi: "\u092A\u0941\u0928\u0930\u094D\u0935\u0938\u0941", ta: "\u0BAA\u0BC1\u0BA9\u0BB0\u0BCD\u0BAA\u0BC2\u0B9A\u0BAE\u0BCD", kn: "\u0CAA\u0CC1\u0CA8\u0CB0\u0CCD\u0CB5\u0CB8\u0CC1" },
  { en: "Pushya", te: "\u0C2A\u0C41\u0C37\u0C4D\u0C2F\u0C2E\u0C3F", hi: "\u092A\u0941\u0937\u094D\u092F", ta: "\u0BAA\u0BC2\u0B9A\u0BAE\u0BCD", kn: "\u0CAA\u0CC1\u0CB7\u0CCD\u0CAF" },
  { en: "Ashlesha", te: "\u0C06\u0C36\u0C4D\u0C32\u0C47\u0C37", hi: "\u0906\u0936\u094D\u0932\u0947\u0937\u093E", ta: "\u0B86\u0BAF\u0BBF\u0BB2\u0BCD\u0BAF\u0BAE\u0BCD", kn: "\u0C86\u0CB6\u0CCD\u0CB2\u0CC7\u0CB7" },
  { en: "Magha", te: "\u0C2E\u0C16", hi: "\u092E\u0918\u093E", ta: "\u0BAE\u0B95\u0BAE\u0BCD", kn: "\u0CAE\u0C96\u0CBE" },
  { en: "Purva Phalguni", te: "\u0C2A\u0C41\u0C2C\u0C4D\u0C2C (\u0C2A\u0C42\u0C30\u0C4D\u0C35\u0C2B\u0C32\u0C4D\u0C17\u0C41\u0C23\u0C3F)", hi: "\u092A\u0942\u0930\u094D\u0935\u093E\u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940", ta: "\u0BAA\u0BC2\u0BB0\u0BAE\u0BCD", kn: "\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CBE\u0CAB\u0CB2\u0CCD\u0C97\u0CC1\u0CA3\u0CBF" },
  { en: "Uttara Phalguni", te: "\u0C09\u0C24\u0C4D\u0C24\u0C30 (\u0C09\u0C24\u0C4D\u0C24\u0C30\u0C2B\u0C32\u0C4D\u0C17\u0C41\u0C23\u0C3F)", hi: "\u0909\u0924\u094D\u0924\u0930\u093E\u092B\u093E\u0932\u094D\u0917\u0941\u0928\u0940", ta: "\u0B89\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD", kn: "\u0C89\u0CA4\u0CCD\u0CA4\u0CB0\u0CBE\u0CAB\u0CB2\u0CCD\u0C97\u0CC1\u0CA3\u0CBF" },
  { en: "Hasta", te: "\u0C39\u0C38\u0C4D\u0C24", hi: "\u0939\u0938\u094D\u0924", ta: "\u0B85\u0BB8\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CB9\u0C38\u0C4D\u0C24" },
  { en: "Chitra", te: "\u0C1A\u0C3F\u0C24\u0C4D\u0C24", hi: "\u091A\u093F\u0924\u094D\u0930\u093E", ta: "\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC8", kn: "\u0C9A\u0CBF\u0CA4\u0CCD\u0CB0\u0CBE" },
  { en: "Swati", te: "\u0C38\u0C4D\u0C35\u0C3E\u0C24\u0C3F", hi: "\u0938\u094D\u0935\u093E\u0924\u0940", ta: "\u0B9A\u0BC1\u0BB5\u0BBE\u0BA4\u0BBF", kn: "\u0CB8\u0CCD\u0CB5\u0CBE\u0CA4\u0CBF" },
  { en: "Vishakha", te: "\u0C35\u0C3F\u0C36\u0C3E\u0C16", hi: "\u0935\u093F\u0936\u093E\u0916\u093E", ta: "\u0BB5\u0BBF\u0B9A\u0BBE\u0B95\u0BAE\u0BCD", kn: "\u0CB5\u0CBF\u0CB6\u0CBE\u0C96" },
  { en: "Anuradha", te: "\u0C05\u0C28\u0C42\u0C30\u0C3E\u0C27", hi: "\u0905\u0928\u0941\u0930\u093E\u0927\u093E", ta: "\u0B85\u0BA9\u0BC1\u0BB7\u0BAE\u0BCD", kn: "\u0C85\u0CA8\u0CC1\u0CB0\u0CBE\u0CA7" },
  { en: "Jyeshtha", te: "\u0C1C\u0C4D\u0C2F\u0C47\u0C37\u0C4D\u0C20", hi: "\u091C\u094D\u092F\u0947\u0937\u094D\u0920\u093E", ta: "\u0B95\u0BC7\u0B9F\u0BCD\u0B9F\u0BC8", kn: "\u0C9C\u0CCD\u0CAF\u0CC7\u0CB7\u0CCD\u0CA0" },
  { en: "Mula", te: "\u0C2E\u0C42\u0C32", hi: "\u092E\u0942\u0932", ta: "\u0BAE\u0BC2\u0BB2\u0BAE\u0BCD", kn: "\u0CAE\u0CC2\u0CB2" },
  { en: "Purva Ashadha", te: "\u0C2A\u0C42\u0C30\u0C4D\u0C35\u0C3E\u0C37\u0C3E\u0C22", hi: "\u092A\u0942\u0930\u094D\u0935\u093E\u0937\u093E\u0922\u093C\u093E", ta: "\u0BAA\u0BC2\u0BB0\u0BBE\u0B9F\u0BAE\u0BCD", kn: "\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CBE\u0CB7\u0CBE\u0CA2" },
  { en: "Uttara Ashadha", te: "\u0909\u0924\u094D\u0924\u0930\u093E\u0937\u093E\u0922\u093C\u093E", hi: "\u0909\u0924\u094D\u0924\u0930\u093E\u0937\u093E\u0922\u093C\u093E", ta: "\u0B89\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBE\u0B9F\u0BAE\u0BCD", kn: "\u0C89\u0CA4\u0CCD\u0CA4\u0CB0\u0CBE\u0CB7\u0CBE\u0CA2" },
  { en: "Shravana", te: "\u0C36\u0C4D\u0C30\u0C35\u0C23\u0C02", hi: "\u0936\u094D\u0930\u0935\u0923", ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BB5\u0BCB\u0BA3\u0BAE\u0BCD", kn: "\u0CB6\u0CCD\u0CB0\u0CB5\u0CA3" },
  { en: "Dhanishta", te: "\u0C27\u0C28\u0C3F\u0C37\u0C4D\u0C20", hi: "\u0927\u0928\u093F\u0937\u094D\u0920\u093E", ta: "\u0B85\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD", kn: "\u0CA7\u0CA8\u0CBF\u0CB7\u0CCD\u0CA0" },
  { en: "Shatabhisha", te: "\u0C36\u0C24\u0C2D\u0C3F\u0C37\u0C02", hi: "\u0936\u0924\u092D\u093F\u0937\u093E", ta: "\u0B9A\u0BA4\u0BAF\u0BAE\u0BCD", kn: "\u0CB6\u0CA4\u0CAD\u0CBF\u0CB7" },
  { en: "Purva Bhadrapada", te: "\u0C2A\u0C42\u0C30\u0C4D\u0C35\u0C3E\u0C2D\u0C3E\u0C26\u0C4D\u0C30", hi: "\u092A\u0942\u0930\u094D\u0935\u093E\u092D\u093E\u0926\u094D\u0930\u092A\u0926", ta: "\u0BAA\u0BC2\u0BB0\u0B9F\u0BCD\u0B9F\u0BBE\u0BA4\u0BBF", kn: "\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CBE\u0CAD\u0CBE\u0CA6\u0CCD\u0CB0\u0CAA\u0CA6" },
  { en: "Uttara Bhadrapada", te: "\u0C09\u0C24\u0C4D\u0C24\u0C30\u0C3E\u0C2D\u0C3E\u0C26\u0C4D\u0C30", hi: "\u0909\u0924\u094D\u0924\u0930\u093E\u092D\u093E\u0926\u094D\u0930\u092A\u0926", ta: "\u0B89\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B9F\u0BCD\u0B9F\u0BBE\u0BA4\u0BBF", kn: "\u0C89\u0CA4\u0CCD\u0CA4\u0CB0\u0CBE\u0CAD\u0CBE\u0CA6\u0CCD\u0CB0\u0CAA\u0CA6" },
  { en: "Revati", te: "\u0C30\u0C47\u0C35\u0C24\u0C3F", hi: "\u0930\u0947\u0935\u0924\u0940", ta: "\u0BB0\u0BC7\u0BB5\u0BA4\u0BBF", kn: "\u0CB0\u0CC7\u0CB5\u0CA4\u0CBF" }
];
var YOGA_TRANSLATIONS = [
  { en: "Vishkumbha", te: "\u0C35\u0C3F\u0C37\u0C4D\u0C15\u0C02\u0C2D\u0C02", hi: "\u0935\u093F\u0937\u094D\u0915\u092E\u094D\u092D", ta: "\u0BB5\u0BBF\u0BB7\u0BCD\u0B95\u0BAE\u0BCD\u0BAA\u0BAE\u0BCD", kn: "\u0CB5\u0CBF\u0CB7\u0CCD\u0C95\u0CC1\u0C82\u0CAD" },
  { en: "Priti", te: "\u0C2A\u0C4D\u0C30\u0C40\u0C24\u0C3F", hi: "\u092A\u094D\u0930\u0940\u0924\u093F", ta: "\u0BAA\u0BBF\u0BB0\u0BC0\u0BA4\u0BBF", kn: "\u0CAA\u0CCD\u0CB0\u0CC0\u0CA4\u0CBF" },
  { en: "Ayushman", te: "\u0C06\u0C2F\u0C41\u0C37\u0C4D\u0C2E\u0C3E\u0C28\u0C4D", hi: "\u0906\u092F\u0941\u0937\u094D\u092E\u093E\u0928\u094D", ta: "\u0B86\u0BAF\u0BC1\u0BB7\u0BCD\u0BAE\u0BBE\u0BA9\u0BCD", kn: "\u0C86\u0CAF\u0CC1\u0CB7\u0CCD\u0CAE\u0CBE\u0CA8\u0CCD" },
  { en: "Saubhagya", te: "\u0C38\u0C4C\u0C2D\u0C3E\u0C17\u0C4D\u0C2F\u0C02", hi: "\u0938\u094C\u092D\u093E\u0917\u094D\u092F", ta: "\u0B9A\u0BCC\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BAE\u0BCD", kn: "\u0CB8\u0CCC\u0CAD\u0CBE\u0C97\u0CCD\u0CAF" },
  { en: "Shobhana", te: "\u0C36\u0C4B\u0C2D\u0C28\u0C02", hi: "\u0936\u094B\u092D\u0928", ta: "\u0B9A\u0BCB\u0BAA\u0BA9\u0BAE\u0BCD", kn: "\u0CB6\u0CCB\u0CAD\u0CA8" },
  { en: "Atiganda", te: "\u0C05\u0C24\u0C3F\u0C17\u0C02\u0C21\u0C02", hi: "\u0905\u0924\u093F\u0917\u0923\u094D\u0921", ta: "\u0B85\u0BA4\u0BBF\u0B95\u0BA3\u0BCD\u0B9F\u0BAE\u0BCD", kn: "\u0C85\u0CA4\u0CBF\u0C97\u0C82\u0CA1" },
  { en: "Sukarma", te: "\u0C38\u0C41\u0C15\u0C30\u0C4D\u0C2E", hi: "\u0938\u0941\u0915\u0930\u094D\u092E\u093E", ta: "\u0B9A\u0BC1\u0B95\u0BB0\u0BCD\u0BAE\u0BAE\u0BCD", kn: "\u0CB8\u0CC1\u0C95\u0CB0\u0CCD\u0CAE" },
  { en: "Dhriti", te: "\u0C27\u0C43\u0C24\u0C3F", hi: "\u0927\u0943\u0924\u093F", ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BBF", kn: "\u0CA7\u0CC3\u0CA4\u0CBF" },
  { en: "Shoola", te: "\u0C36\u0C42\u0C32\u0C02", hi: "\u0936\u0942\u0932", ta: "\u0B9A\u0BC2\u0BB2\u0BAE\u0BCD", kn: "\u0CB6\u0CC2\u0CB2" },
  { en: "Ganda", te: "\u0C17\u0C02\u0C21\u0C02", hi: "\u0917\u0923\u094D\u0921", ta: "\u0B95\u0BA3\u0BCD\u0B9F\u0BAE\u0BCD", kn: "\u0C97\u0C82\u0CA1" },
  { en: "Vriddhi", te: "\u0C35\u0C43\u0C26\u0C4D\u0C27\u0C3F", hi: "\u0935\u0943\u0926\u094D\u0927\u093F", ta: "\u0BB5\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF", kn: "\u0CB5\u0CC3\u0CA6\u0CCD\u0CA7\u0CBF" },
  { en: "Dhruva", te: "\u0C27\u0C4D\u0C30\u0C41\u0C35", hi: "\u0927\u094D\u0930\u0941\u0935", ta: "\u0BA4\u0BC1\u0BB0\u0BC1\u0BB5\u0BAE\u0BCD", kn: "\u0CA7\u0CCD\u0CB0\u0CC1\u0CB5" },
  { en: "Vyaghata", te: "\u0C35\u0C4D\u0C2F\u0C3E\u0C18\u0C3E\u0C24\u0C02", hi: "\u0935\u094D\u092F\u093E\u0918\u093E\u0924", ta: "\u0BB5\u0BBF\u0BAF\u0BBE\u0B95\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CCD\u0CAF\u0CBE\u0C98\u0CBE\u0CA4" },
  { en: "Harshana", te: "\u0C39\u0C30\u0C4D\u0C37\u0C23\u0C02", hi: "\u0939\u0930\u094D\u0937\u0923", ta: "\u0B85\u0BB0\u0BBF\u0BB7\u0BA3\u0BAE\u0BCD", kn: "\u0CB9\u0CB0\u0CCD\u0CB7\u0CA3" },
  { en: "Vajra", te: "\u0C35\u0C1C\u0C4D\u0C30\u0C02", hi: "\u0935\u091C\u094D\u0930", ta: "\u0BB5\u0B9A\u0BCD\u0B9A\u0BBF\u0BB0\u0BAE\u0BCD", kn: "\u0CB5\u0C9C\u0CCD\u0CB0" },
  { en: "Siddhi", te: "\u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C3F", hi: "\u0938\u093F\u0926\u094D\u0927\u093F", ta: "\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF", kn: "\u0CB8\u0CBF\u0CA6\u0CCD\u0CA7\u0CBF" },
  { en: "Vyatipata", te: "\u0C35\u0C4D\u0C2F\u0C24\u0C40\u0C2A\u0C3E\u0C24\u0C02", hi: "\u0935\u094D\u092F\u0924\u0940\u092A\u093E\u0924", ta: "\u0BB5\u0BBF\u0BAF\u0BA4\u0BC0\u0BAA\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CCD\u0CAF\u0CA4\u0CC0\u0CAA\u0CBE\u0CA4" },
  { en: "Variyan", te: "\u0C35\u0C30\u0C40\u0C2F\u0C3E\u0C28\u0C4D", hi: "\u0935\u0930\u0940\u092F\u093E\u0928\u094D", ta: "\u0BB5\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9\u0BCD", kn: "\u0CB5\u0CB0\u0CC0\u0CB9\u0CBE\u0CA8\u0CCD" },
  { en: "Parigha", te: "\u0C2A\u0C30\u0C3F\u0C18\u0C02", hi: "\u092A\u0930\u093F\u0918", ta: "\u0BAA\u0BB0\u0BBF\u0B95\u0BAE\u0BCD", kn: "\u0CAA\u0CB0\u0CBF\u0C98" },
  { en: "Shiva", te: "\u0C36\u0C3F\u0C35\u0C02", hi: "\u0936\u093F\u0935", ta: "\u0B9A\u0BBF\u0BB5\u0BAE\u0BCD", kn: "\u0CB6\u0CBF\u0CB5" },
  { en: "Siddha", te: "\u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C02", hi: "\u0938\u093F\u0926\u094D\u0927", ta: "\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CB8\u0CBF\u0CA6\u0CCD\u0CA7" },
  { en: "Sadhya", te: "\u0C38\u0C3E\u0C27\u0C4D\u0C2F\u0C02", hi: "\u0938\u093E\u0927\u094D\u092F", ta: "\u0B9A\u0BBE\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BAE\u0BCD", kn: "\u0CB8\u0CBE\u0CA6\u0CCD\u0CAF" },
  { en: "Shubha", te: "\u0C36\u0C41\u0C2D\u0C02", hi: "\u0936\u0941\u092D", ta: "\u0B9A\u0BC1\u0BAA\u0BAE\u0BCD", kn: "\u0CB6\u0CC1\u0CAD" },
  { en: "Shukla", te: "\u0C36\u0C41\u0C15\u0C4D\u0C32\u0C02", hi: "\u0936\u0941\u0915\u094D\u0932", ta: "\u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB2\u0BAE\u0BCD", kn: "\u0CB6\u0CC1\u0C95\u0CCD\u0CB2" },
  { en: "Brahma", te: "\u0C2C\u0C4D\u0C30\u0C39\u0C4D\u0C2E", hi: "\u092C\u094D\u0930\u0939\u094D\u092E", ta: "\u0BAA\u0BBF\u0BB0\u0BAE\u0BCD\u0BAE\u0BAE\u0BCD", kn: "\u0CAC\u0CCD\u0CB0\u0CB9\u0CCD\u0C2E" },
  { en: "Indra", te: "\u0C10\u0C02\u0C26\u0C4D\u0C30\u0C02", hi: "\u0907\u0928\u094D\u0926\u094D\u0930", ta: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD", kn: "\u0C87\u0C82\u0CA6\u0CCD\u0CB0" },
  { en: "Vaidhriti", te: "\u0C35\u0C48\u0C27\u0C43\u0C24\u0C3F", hi: "\u0935\u0948\u0927\u0943\u0924\u093F", ta: "\u0BB5\u0BC8\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BBF", kn: "\u0CB5\u0CC8\u0CA7\u0CC3\u0CA4\u0CBF" }
];
var KARANA_TRANSLATIONS = [
  { en: "Bava", te: "\u0C2C\u0C35", hi: "\u092C\u0935", ta: "\u0BAA\u0BB5\u0BAE\u0BCD", kn: "\u0CAC\u0CB5" },
  { en: "Balava", te: "\u0C2C\u0C3E\u0C32\u0C35", hi: "\u092C\u093E\u0932\u0935", ta: "\u0BAA\u0BBE\u0BB2\u0BB5\u0BAE\u0BCD", kn: "\u0CAC\u0CBE\u0CB2\u0CB5" },
  { en: "Kaulava", te: "\u0C15\u0C4C\u0C32\u0C35", hi: "\u0915\u094C\u0932\u0935", ta: "\u0B95\u0BCC\u0BB2\u0BB5\u0BAE\u0BCD", kn: "\u0C95\u0CCC\u0CB2\u0CB5" },
  { en: "Taitila", te: "\u0C24\u0C48\u0C24\u0C3F\u0C32", hi: "\u0924\u0948\u0924\u093F\u0932", ta: "\u0B9A\u0BC8\u0BA4\u0BBF\u0BB2\u0BAE\u0BCD", kn: "\u0CA4\u0CC8\u0CA4\u0CBF\u0CB2" },
  { en: "Gara", te: "\u0C17\u0C30\u0C1C", hi: "\u0917\u0930", ta: "\u0B95\u0BB0\u0B9A\u0BC8", kn: "\u0C97\u0CB0" },
  { en: "Vanija", te: "\u0C35\u0C23\u0C3F\u0C1C", hi: "\u0935\u0923\u093F\u091C", ta: "\u0BB5\u0BA3\u0B9A\u0BC8", kn: "\u0CB5\u0CA3\u0CBF\u0C9C" },
  { en: "Vishti", te: "\u0C2D\u0C26\u0C4D\u0C30 (\u0C35\u0C3F\u0C37\u0C4D\u0C1F\u0C3F)", hi: "\u092D\u0926\u094D\u0930\u093E (\u0935\u093F\u0937\u094D\u091F\u093F)", ta: "\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC8 (\u0BB5\u0BBF\u0BB7\u0BCD\u0B9F\u0BBF)", kn: "\u0CAD\u0CA6\u0CCD\u0CB0\u0CBE (\u0CB5\u0CBF\u0CB7\u0CCD\u0C9F\u0CBF)" },
  { en: "Shakuni", te: "\u0C36\u0C15\u0C41\u0C28\u0C3F", hi: "\u0936\u0915\u0941\u0928\u093F", ta: "\u0B9A\u0B95\u0BC1\u0BA9\u0BBF", kn: "\u0CB6\u0C15\u0C41\u0C28\u0C3F" },
  { en: "Chatuspada", te: "\u0C1A\u0C24\u0C41\u0C37\u0C4D\u0C2A\u0C3E\u0C26", hi: "\u091A\u0924\u0941\u0937\u094D\u092A\u093E\u0926", ta: "\u0B9A\u0BA4\u0BC1\u0BB7\u0BCD\u0BAA\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C9A\u0CA4\u0CC1\u0CB7\u0CCD\u0CAA\u0CBE\u0CA6" },
  { en: "Naga", te: "\u0C28\u0C3E\u0C17\u0C35\u0C02\u0C24\u0C3F", hi: "\u0928\u093E\u0917", ta: "\u0BA8\u0BBE\u0B95\u0BB5\u0BAE\u0BCD", kn: "\u0CA8\u0CBE\u0C97" },
  { en: "Kintughna", te: "\u0C15\u0C3F\u0C02\u0C38\u0C4D\u0C24\u0C41\u0C18\u0C4D\u0C28\u0C02", hi: "\u0915\u093F\u0902\u0938\u094D\u0924\u0941\u0918\u094D\u0928", ta: "\u0B95\u0BBF\u0BAE\u0BCD\u0BB8\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0BA9\u0BAE\u0BCD", kn: "\u0C95\u0CBF\u0C82\u0CB8\u0CCD\u0CA4\u0CC1\u0C98\u0CCD\u0CA8" }
];
var TITHI_TRANSLATIONS = [
  { en: "Prathama (1)", te: "\u0C2A\u0C3E\u0C21\u0C4D\u0C2F\u0C2E\u0C3F (\u0C2A\u0C4D\u0C30\u0C25\u0C2E)", hi: "\u092A\u094D\u0930\u0924\u093F\u092A\u0926\u093E (\u092A\u094D\u0930\u0925\u092E\u093E)", ta: "\u0BAA\u0BBF\u0BB0\u0BA4\u0BAE\u0BC8", kn: "\u0CAA\u0CBE\u0CA1\u0CCD\u0CAF\u0CAE\u0CBF (\u0CAA\u0CCD\u0CB0\u0CA5\u0CAE)" },
  { en: "Dwitiya (2)", te: "\u0C35\u0C3F\u0C26\u0C3F\u0C2F (\u0C26\u0C4D\u0C35\u0C3F\u0C24\u0C40\u0C2F)", hi: "\u0926\u094D\u0935\u093F\u0924\u0940\u092F\u093E", ta: "\u0BA4\u0BC1\u0BB5\u0BBF\u0BA4\u0BBF\u0BAF\u0BC8", kn: "\u0CAC\u0CBF\u0CA6\u0CBF\u0C97\u0CC6 (\u0CA6\u0CCD\u0CB5\u0CBF\u0CA4\u0CC0\u0CAF)" },
  { en: "Tritiya (3)", te: "\u0C24\u0C26\u0C3F\u0C2F (\u0C24\u0C43\u0C24\u0C40\u0C2F)", hi: "\u0924\u0943\u0924\u0940\u092F\u093E", ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BBF\u0BAF\u0BC8", kn: "\u0CA4\u0CA6\u0CBF\u0C97\u0CC6 (\u0CA4\u0CC3\u0CA4\u0CC0\u0CAF)" },
  { en: "Chaturthi (4)", te: "\u0C1A\u0C35\u0C3F\u0C24\u0C3F (\u0C1A\u0C24\u0C41\u0C30\u0C4D\u0C25\u0C3F)", hi: "\u091A\u0924\u0941\u0930\u094D\u0925\u0940", ta: "\u0B9A\u0BA4\u0BC1\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF", kn: "\u0C9A\u0CCC\u0CA4\u0CBF (\u0C9A\u0CA4\u0CC1\u0C30\u0C4D\u0C25\u0C3F)" },
  { en: "Panchami (5)", te: "\u0C2A\u0C02\u0C1A\u0C2E\u0C3F", hi: "\u092A\u0902\u091A\u092E\u0940", ta: "\u0BAA\u0B9E\u0BCD\u0B9A\u0BAE\u0BBF", kn: "\u0CAA\u0C82\u0C9A\u0CAE\u0CBF" },
  { en: "Shashti (6)", te: "\u0C37\u0C37\u0C4D\u0C20\u0C3F", hi: "\u0937\u0937\u094D\u0920\u0940", ta: "\u0B9A\u0BB7\u0BCD\u0B9F\u0BBF", kn: "\u0CB7\u0CB7\u0CCD\u0CA0\u0CBF" },
  { en: "Saptami (7)", te: "\u0C38\u0C2A\u0C4D\u0C24\u0C2E\u0C3F", hi: "\u0938\u092A\u094D\u0924\u092E\u0940", ta: "\u0B9A\u0BAA\u0BCD\u0BA4\u0BAE\u0BBF", kn: "\u0CB8\u0CAA\u0CCD\u0CA4\u0CAE\u0CBF" },
  { en: "Ashtami (8)", te: "\u0C05\u0C37\u0C4D\u0C1F\u0C2E\u0C3F", hi: "\u0905\u0937\u094D\u091F\u092E\u0940", ta: "\u0B85\u0BB7\u0BCD\u0B9F\u0BAE\u0BBF", kn: "\u0C85\u0CB7\u0CCD\u0C9F\u0CAE\u0CBF" },
  { en: "Navami (9)", te: "\u0C28\u0C35\u0C2E\u0C3F", hi: "\u0928\u0935\u092E\u0940", ta: "\u0BA8\u0BB5\u0BAE\u0BBF", kn: "\u0CA8\u0CB5\u0CAE\u0CBF" },
  { en: "Dashami (10)", te: "\u0C26\u0C36\u0C2E\u0C3F", hi: "\u0926\u0936\u092E\u0940", ta: "\u0BA4\u0B9A\u0BAE\u0BBF", kn: "\u0CA6\u0CB6\u0CAE\u0CBF" },
  { en: "Ekadashi (11)", te: "\u0C0F\u0C15\u0C3E\u0C26\u0C36\u0C3F", hi: "\u090F\u0915\u093E\u0926\u0936\u0940", ta: "\u0B8F\u0B95\u0BBE\u0BA4\u0B9A\u0BBF", kn: "\u0C8F\u0C95\u0CBE\u0CA6\u0CB6\u0CBF" },
  { en: "Dwadashi (12)", te: "\u0C26\u0C4D\u0C35\u0C3E\u0C26\u0C36\u0C3F", hi: "\u0926\u094D\u0935\u093E\u0926\u0936\u0940", ta: "\u0BA4\u0BC1\u0BB5\u0BBE\u0BA4\u0B9A\u0BBF", kn: "\u0CA6\u0CCD\u0CB5\u0CBE\u0CA6\u0CB6\u0CBF" },
  { en: "Trayodashi (13)", te: "\u0C24\u0C4D\u0C30\u0C2F\u0C4B\u0C26\u0C36\u0C3F", hi: "\u0924\u094D\u0930\u092F\u094B\u0926\u0936\u0940", ta: "\u0BA4\u0BBF\u0BB0\u0BAF\u0BCB\u0BA4\u0B9A\u0BBF", kn: "\u0CA4\u0CCD\u0CB0\u0CAF\u0CCB\u0CA6\u0CB6\u0CBF" },
  { en: "Chaturdashi (14)", te: "\u0C1A\u0C24\u0C41\u0C30\u0C4D\u0C26\u0C36\u0C3F", hi: "\u091A\u0924\u0941\u0930\u094D\u0926\u0936\u0940", ta: "\u0B9A\u0BA4\u0BC1\u0BB0\u0BCD\u0BA4\u0B9A\u0BBF", kn: "\u0C9A\u0CA4\u0CC1\u0CB0\u0CCD\u0CA6\u0CB6\u0CBF" },
  { en: "Purnima (15)", te: "\u0C2A\u0C4C\u0C30\u0C4D\u0C23\u0C2E\u0C3F (\u0C2A\u0C42\u0C30\u0C4D\u0C23\u0C3F\u0C2E)", hi: "\u092A\u0942\u0930\u094D\u0923\u093F\u092E\u093E", ta: "\u0BAA\u0BCC\u0BB0\u0BCD\u0BA3\u0BAE\u0BBF", kn: "\u0CB9\u0CC1\u0CA3\u0CCD\u0CA3\u0CBF\u0CAE\u0CC6 (\u0CAA\u0CC2\u0CB0\u0CCD\u0CA3\u0CBF\u0CAE)" },
  { en: "Amavasya (30)", te: "\u0C05\u0C2E\u0C3E\u0C35\u0C3E\u0C38\u0C4D\u0C2F", hi: "\u0905\u092E\u093E\u0935\u0938\u094D\u092F\u093E", ta: "\u0B85\u0BAE\u0BBE\u0BB5\u0BBE\u0B9A\u0BC8", kn: "\u0C85\u0CAE\u0CBE\u0CB5\u0CBE\u0CB8\u0CCD\u0CAF\u0CC6" }
];
var PAKSHA_TRANSLATIONS = {
  Shukla: {
    en: "Shukla Paksha (Waxing)",
    te: "\u0C36\u0C41\u0C15\u0C4D\u0C32 \u0C2A\u0C15\u0C4D\u0C37\u0C02",
    hi: "\u0936\u0941\u0915\u094D\u0932 \u092A\u0915\u094D\u0937",
    ta: "\u0B9A\u0BC1\u0B95\u0BCD\u0BB2 \u0BAA\u0B9F\u0BCD\u0B9A\u0BAE\u0BCD (\u0BB5\u0BB3\u0BB0\u0BCD\u0BAA\u0BBF\u0BB1\u0BC8)",
    kn: "\u0CB6\u0CC1\u0C95\u0CCD\u0CB2 \u0CAA\u0C95\u0CCD\u0CB7"
  },
  Krishna: {
    en: "Krishna Paksha (Waning)",
    te: "\u0C15\u0C43\u0C37\u0C4D\u0C23 \u0C2A\u0C15\u0C4D\u0C37\u0C02",
    hi: "\u0915\u0943\u0937\u094D\u0923 \u092A\u0915\u094D\u0937",
    ta: "\u0B95\u0BBF\u0BB0\u0BC1\u0BB7\u0BCD\u0BA3 \u0BAA\u0B9F\u0BCD\u0B9A\u0BAE\u0BCD (\u0BA4\u0BC7\u0BAF\u0BCD\u0BAA\u0BBF\u0BB1\u0BC8)",
    kn: "\u0C95\u0CC3\u0CB7\u0CCD\u0CA3 \u0CAA\u0C95\u0CCD\u0CB7"
  }
};
var KOOTA_TRANSLATIONS = {
  Varna: {
    en: "Varna (Ego & Work)",
    te: "\u0C35\u0C30\u0C4D\u0C23 \u0C15\u0C42\u0C1F",
    hi: "\u0935\u0930\u094D\u0923 \u0915\u0942\u091F",
    ta: "\u0BB5\u0BB0\u0BCD\u0BA3 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CB5\u0CB0\u0CCD\u0CA3 \u0C95\u0CC2\u0C9F"
  },
  Vashya: {
    en: "Vashya (Mutual Attraction & Dominance)",
    te: "\u0C35\u0C36\u0C4D\u0C2F \u0C15\u0C42\u0C1F",
    hi: "\u0935\u0936\u094D\u092F \u0915\u0942\u091F",
    ta: "\u0BB5\u0B9A\u0BBF\u0BAF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CB5\u0CB6\u0CCD\u0CAF \u0C95\u0CC2\u0C9F"
  },
  Tara: {
    en: "Tara (Destiny & Compatibility)",
    te: "\u0C24\u0C3E\u0C30\u0C3E \u0C15\u0C42\u0C1F",
    hi: "\u0924\u093E\u0930\u093E \u0915\u0942\u091F",
    ta: "\u0BA4\u0BBE\u0BB0\u0BBE \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CA4\u0CBE\u0CB0\u0CBE \u0C95\u0CC2\u0C9F"
  },
  Yoni: {
    en: "Yoni (Physical & Intimacy Compatibility)",
    te: "\u0C2F\u0C4B\u0C28\u0C3F \u0C15\u0C42\u0C1F",
    hi: "\u092F\u094B\u0928\u0940 \u0915\u0942\u091F",
    ta: "\u0BAF\u0BCB\u0BA9\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CAF\u0CCB\u0CA8\u0CBF \u0C95\u0CC2\u0C9F"
  },
  "Graha Maitri": {
    en: "Graha Maitri (Mental Harmony)",
    te: "\u0C17\u0C4D\u0C30\u0C39 \u0C2E\u0C48\u0C24\u0C4D\u0C30\u0C3F \u0C15\u0C42\u0C1F",
    hi: "\u0917\u094D\u0930\u0939 \u092E\u0948\u0924\u094D\u0930\u0940 \u0915\u0942\u091F",
    ta: "\u0B95\u0BBF\u0BB0\u0B95 \u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0C97\u0CCD\u0CB0\u0CB9 \u0CAE\u0CC8\u0CA4\u0CCD\u0CB0\u0CBF \u0C95\u0CC2\u0C9F"
  },
  Gana: {
    en: "Gana (Temperament & Behavior)",
    te: "\u0C17\u0C23 \u0C15\u0C42\u0C1F",
    hi: "\u0917\u0923 \u0915\u0942\u091F",
    ta: "\u0B95\u0BA3 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0C97\u0CA3 \u0C95\u0CC2\u0C9F"
  },
  Bhakoot: {
    en: "Bhakoot (Emotional Relationship)",
    te: "\u0C2D\u0C15\u0C42\u0C1F \u0C15\u0C42\u0C1F",
    hi: "\u092D\u0915\u0942\u091F \u0915\u0942\u091F",
    ta: "\u0BB0\u0BBE\u0B9A\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CAD\u0C95\u0CC2\u0C9F \u0C95\u0CC2\u0C9F"
  },
  Nadi: {
    en: "Nadi (Health, Genetics & Procreation)",
    te: "\u0C28\u0C3E\u0C21\u0C40 \u0C15\u0C42\u0C1F",
    hi: "\u0928\u093E\u0921\u093C\u0940 \u0915\u0942\u091F",
    ta: "\u0BA8\u0BBE\u0B9F\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    kn: "\u0CA8\u0CBE\u0CA1\u0CBF \u0C95\u0CC2\u0C9F"
  }
};
function getTranslation(set, lang) {
  if (!set) return "";
  return set[lang];
}
function translatePlanet(planet, lang) {
  const set = PLANET_TRANSLATIONS[planet];
  return set ? getTranslation(set, lang) : planet;
}
var WESTERN_TO_RASHI_INDEX = {
  "aries": 0,
  "taurus": 1,
  "gemini": 2,
  "cancer": 3,
  "leo": 4,
  "virgo": 5,
  "libra": 6,
  "scorpio": 7,
  "sagittarius": 8,
  "capricorn": 9,
  "aquarius": 10,
  "pisces": 11,
  "mesha": 0,
  "vrishabha": 1,
  "mithuna": 2,
  "karka": 3,
  "simha": 4,
  "kanya": 5,
  "tula": 6,
  "vrishchika": 7,
  "dhanu": 8,
  "makara": 9,
  "kumbha": 10,
  "meena": 11
};
function translateRashi(indexOrName, lang) {
  let idx;
  if (typeof indexOrName === "number") {
    idx = indexOrName % 12;
  } else {
    const lower = indexOrName.toLowerCase().trim();
    const parenMatch = lower.match(/\((\w+)\)/);
    const key = parenMatch ? parenMatch[1] : lower;
    idx = WESTERN_TO_RASHI_INDEX[key] ?? -1;
    if (idx === -1) {
      for (const word of lower.split(/[\s()]+/)) {
        if (WESTERN_TO_RASHI_INDEX[word] !== void 0) {
          idx = WESTERN_TO_RASHI_INDEX[word];
          break;
        }
      }
    }
    if (idx === -1) return indexOrName;
  }
  const set = RASHI_TRANSLATIONS[idx];
  return set ? getTranslation(set, lang) : `Rashi ${idx}`;
}
function translateNakshatra(index, lang) {
  const set = NAKSHATRA_TRANSLATIONS[index % 27];
  return set ? getTranslation(set, lang) : `Nakshatra ${index}`;
}
function translateYoga(index, lang) {
  const set = YOGA_TRANSLATIONS[index % 27];
  return set ? getTranslation(set, lang) : `Yoga ${index}`;
}
function translateKarana(index, lang) {
  const set = KARANA_TRANSLATIONS[index % 11];
  return set ? getTranslation(set, lang) : `Karana ${index}`;
}
function translateTithi(index, lang) {
  const set = TITHI_TRANSLATIONS[index % 16] || TITHI_TRANSLATIONS[index % 15];
  return set ? getTranslation(set, lang) : `Tithi ${index}`;
}
function translateKoota(kootaName, lang) {
  const set = KOOTA_TRANSLATIONS[kootaName];
  return set ? getTranslation(set, lang) : kootaName;
}
var WEEKDAY_TRANSLATIONS = [
  { en: "Sunday", te: "\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02 (Adivaram)", hi: "\u0930\u0935\u093F\u0935\u093E\u0930 (Ravivar)", ta: "\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Gnayiru)", kn: "\u0CAD\u0CBE\u0CA8\u0CC1\u0CB5\u0CBE\u0CB0 (Bhanuvara)" },
  { en: "Monday", te: "\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02 (Somavaram)", hi: "\u0938\u094B\u092E\u0935\u093E\u0930 (Somvar)", ta: "\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Thingal)", kn: "\u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0 (Somavara)" },
  { en: "Tuesday", te: "\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02 (Mangalavaram)", hi: "\u092E\u0902\u0917\u0932\u0935\u093E\u0930 (Mangalvar)", ta: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Sevvai)", kn: "\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0 (Mangalavara)" },
  { en: "Wednesday", te: "\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02 (Budhavaram)", hi: "\u092C\u0941\u0927\u0935\u093E\u0930 (Budhvar)", ta: "\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Budhan)", kn: "\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0 (Budhavara)" },
  { en: "Thursday", te: "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02 (Guruvaram)", hi: "\u0917\u0941\u0930\u0941\u0935\u093E\u0930 (Guruvar)", ta: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Vyalan)", kn: "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0 (Guruvara)" },
  { en: "Friday", te: "\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C35\u0C3E\u0C30\u0C02 (Shukravaram)", hi: "\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930 (Shukravar)", ta: "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Velli)", kn: "\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0 (Shukravara)" },
  { en: "Saturday", te: "\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02 (Shanivaram)", hi: "\u0936\u0928\u093F\u0935\u093E\u0930 (Shanivar)", ta: "\u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 (Sani)", kn: "\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0 (Shanivara)" }
];
var LUNAR_MONTH_TRANSLATIONS = [
  { en: "Chaitra Maasa", te: "\u0C1A\u0C48\u0C24\u0C4D\u0C30 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u091A\u0948\u0924\u094D\u0930 \u092E\u093E\u0938", ta: "\u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC8 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C9A\u0CC8\u0CA4\u0CCD\u0CB0 \u0CAE\u0CBE\u0CB8" },
  { en: "Vaishakha Maasa", te: "\u0C35\u0C48\u0C36\u0C3E\u0C16 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0935\u0948\u0936\u093E\u0916 \u092E\u093E\u0938", ta: "\u0BB5\u0BC8\u0B95\u0BBE\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CC8\u0CB6\u0CBE\u0C96 \u0CAE\u0CBE\u0CB8" },
  { en: "Jyeshtha Maasa", te: "\u0C1C\u0C4D\u0C2F\u0C47\u0C37\u0C4D\u0C20 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u091C\u094D\u092F\u0947\u0937\u094D\u0920 \u092E\u093E\u0938", ta: "\u0B86\u0BA9\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C9C\u0CCD\u0CAF\u0CC7\u0CB7\u0CCD\u0CA0 \u0CAE\u0CBE\u0CB8" },
  { en: "Ashadha Maasa", te: "\u0C06\u0C37\u0C3E\u0C22 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0906\u0937\u093E\u0922\u093C \u092E\u093E\u0938", ta: "\u0B86\u0B9F\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C86\u0CB7\u0CBE\u0CA2 \u0CAE\u0CBE\u0CB8" },
  { en: "Shravana Maasa", te: "\u0C36\u0C4D\u0C30\u0C3E\u0C35\u0C23 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0936\u094D\u0930\u093E\u0935\u0923 \u092E\u093E\u0938", ta: "\u0B86\u0BB5\u0BA3\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CB6\u0CCD\u0CB0\u0CBE\u0CB5\u0CA3 \u0CAE\u0CBE\u0CB8" },
  { en: "Bhadrapada Maasa", te: "\u0C2D\u0C3E\u0C26\u0C4D\u0C30\u0C2A\u0C26 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u092D\u093E\u0926\u094D\u0930\u092A\u0926 \u092E\u093E\u0938", ta: "\u0BAA\u0BC1\u0BB0\u0B9F\u0BCD\u0B9F\u0BBE\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAD\u0CBE\u0CA6\u0CCD\u0CB0\u0CAA\u0CA6 \u0CAE\u0CBE\u0CB8" },
  { en: "Ashvina Maasa", te: "\u0C06\u0C36\u0C4D\u0C35\u0C2F\u0C41\u0C1C \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0906\u0936\u094D\u0935\u093F\u0928 \u092E\u093E\u0938", ta: "\u0B90\u0BAA\u0BCD\u0BAA\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C86\u0CB6\u0CCD\u0CB5\u0CAF\u0CC1\u0C9C \u0CAE\u0CBE\u0CB8" },
  { en: "Kartika Maasa", te: "\u0C15\u0C3E\u0C30\u0C4D\u0C24\u0C40\u0C15 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0915\u093E\u0930\u094D\u0924\u093F\u0915 \u092E\u093E\u0938", ta: "\u0B95\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF\u0B95\u0BC8 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0C95\u0CBE\u0CB0\u0CCD\u0CA4\u0CBF\u0C95 \u0CAE\u0CBE\u0CB8" },
  { en: "Margashirsha Maasa", te: "\u0C2E\u0C3E\u0C30\u0C4D\u0C17\u0C36\u0C3F\u0C30 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u092E\u093E\u0930\u094D\u0917\u0936\u0940\u0930\u094D\u0937 \u092E\u093E\u0938", ta: "\u0BAE\u0BBE\u0BB0\u0BCD\u0B95\u0BB4\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAE\u0CBE\u0CB0\u0CCD\u0C97\u0CB6\u0CBF\u0CB0 \u0CAE\u0CBE\u0CB8" },
  { en: "Pausha Maasa", te: "\u0C2A\u0C41\u0C37\u0C4D\u0C2F \u0C2E\u0C3E\u0C38\u0C02", hi: "\u092A\u094C\u0937 \u092E\u093E\u0938", ta: "\u0BA4\u0BC8 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAA\u0CC1\u0CB7\u0CCD\u0CAF \u0CAE\u0CBE\u0CB8" },
  { en: "Magha Maasa", te: "\u0C2E\u0C3E\u0C18 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u092E\u093E\u0918 \u092E\u093E\u0938", ta: "\u0BAE\u0BBE\u0B9A\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAE\u0CBE\u0C98 \u0CAE\u0CBE\u0CB8" },
  { en: "Phalguna Maasa", te: "\u0C2B\u0C3E\u0C32\u0C4D\u0C17\u0C41\u0C23 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u092B\u093E\u0932\u094D\u0917\u0941\u0928 \u092E\u093E\u0938", ta: "\u0BAA\u0B99\u0BCD\u0B95\u0BC1\u0BA9\u0BBF \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAB\u0C3E\u0C32\u0C4D\u0C17\u0C41\u0CA3 \u0CAE\u0CBE\u0CB8" }
];
var GEMSTONE_TRANSLATIONS = {
  Ruby: { en: "Ruby (Manikyam)", te: "\u0C15\u0C46\u0C02\u0C2A\u0C41 (Manikyam)", hi: "\u092E\u093E\u0923\u093F\u0915\u094D\u092F (Ruby)", ta: "\u0BAE\u0BBE\u0BA3\u0BBF\u0B95\u0BCD\u0B95\u0BAE\u0BCD (Manikkam)", kn: "\u0CAE\u0CBE\u0CA3\u0CBF\u0C95\u0CCD\u0CAF (Ruby)" },
  "Yellow Sapphire": { en: "Yellow Sapphire (Pushparagam)", te: "\u0C15\u0C28\u0C15\u0C2A\u0C41\u0C37\u0C4D\u0C2F\u0C30\u0C3E\u0C17\u0C02 (Pushparagam)", hi: "\u092A\u0941\u0916\u0930\u093E\u091C (Yellow Sapphire)", ta: "\u0BAA\u0BC1\u0BB7\u0BCD\u0BAA\u0BB0\u0BBE\u0B95\u0BAE\u0BCD (Pushparagam)", kn: "\u0CAA\u0CC1\u0CB7\u0CCD\u0CAF\u0CB0\u0CBE\u0C97 (Yellow Sapphire)" },
  Diamond: { en: "Diamond (Vajram)", te: "\u0C35\u0C1C\u0C4D\u0C30\u0C02 (Vajram)", hi: "\u0939\u0940\u0930\u093E (Diamond)", ta: "\u0BB5\u0BC8\u0BB0\u0BAE\u0BCD (Vairam)", kn: "\u0CB5\u0C9C\u0CCD\u0CB0 (Vajram)" }
};
var COLOR_TRANSLATIONS = {
  "Golden Yellow": { en: "Golden Yellow", te: "\u0C2C\u0C02\u0C17\u0C3E\u0C30\u0C41 \u0C2A\u0C38\u0C41\u0C2A\u0C41", hi: "\u0938\u0941\u0928\u0939\u0930\u093E \u092A\u0940\u0932\u093E", ta: "\u0BAA\u0BCA\u0BA9\u0BCD\u0BA9\u0BBF\u0BB1 \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD", kn: "\u0C9A\u0CBF\u0CA8\u0CCD\u0CA8\u0CA6 \u0CB9\u0CB3\u0CA6\u0CBF" },
  "Royal Blue": { en: "Royal Blue", te: "\u0C30\u0C3E\u0C2F\u0C32\u0C4D \u0C2C\u0C4D\u0C32\u0C42", hi: "\u0930\u0949\u092F\u0932 \u092C\u094D\u0932\u0942", ta: "\u0BB0\u0BBE\u0BAF\u0BB2\u0BCD \u0BAA\u0BCD\u0BB3\u0BC2", kn: "\u0CB0\u0CBE\u0CAF\u0CB2\u0CCD \u0CA8\u0CC0\u0CB2\u0CBF" },
  "Saffron Red": { en: "Saffron Red", te: "\u0C15\u0C41\u0C02\u0C15\u0C41\u0C2E \u0C0E\u0C30\u0C41\u0C2A\u0C41", hi: "\u0915\u0947\u0938\u0930\u093F\u092F\u093E \u0932\u093E\u0932", ta: "\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BC1\u0BAE \u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1", kn: "\u0C95\u0CC7\u0CB8\u0CB0\u0CBF \u0C95\u0CC6\u0C82\u0CAA\u0CC1" }
};
var FESTIVAL_TRANSLATIONS = {
  "Vinayaka Chavithi Puja": { en: "Vinayaka Chavithi Puja", te: "\u0C35\u0C3F\u0C28\u0C3E\u0C2F\u0C15 \u0C1A\u0C35\u0C3F\u0C24\u0C3F \u0C2A\u0C42\u0C1C", hi: "\u0935\u093F\u0928\u093E\u092F\u0915 \u091A\u0924\u0941\u0930\u094D\u0925\u0940 \u092A\u0942\u091C\u093E", ta: "\u0BB5\u0BBF\u0BA8\u0BBE\u0BAF\u0B95\u0BB0\u0BCD \u0B9A\u0BA4\u0BC1\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0BAA\u0BC2\u0B9C\u0BC8", kn: "\u0CB5\u0CBF\u0CA8\u0CBE\u0CAF\u0C95 \u0C9A\u0CCC\u0CA4\u0CBF \u0CAA\u0CC2\u0C9C\u0CC6" },
  "Maha Pradosh Vrat": { en: "Maha Pradosh Vrat", te: "\u0C2E\u0C39\u0C3E \u0C2A\u0C4D\u0C30\u0C26\u0C4B\u0C37 \u0C35\u0C4D\u0C30\u0C24\u0C02", hi: "\u092E\u0939\u093E \u092A\u094D\u0930\u0926\u094B\u0937 \u0935\u094D\u0930\u0924", ta: "\u0BAE\u0B95\u0BBE \u0BAA\u0BBF\u0BB0\u0BA4\u0BCB\u0BB7 \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD", kn: "\u0CAE\u0CB9\u0CBE \u0CAA\u0CCD\u0CB0\u0CA6\u0CCB\u0CB7 \u0CB5\u0CCD\u0CB0\u0CA4" },
  "Shukla Ekadashi Vrat": { en: "Shukla Ekadashi Vrat", te: "\u0C36\u0C41\u0C15\u0C4D\u0C32 \u0C0F\u0C15\u0C3E\u0C26\u0C36\u0C3F \u0C35\u0C4D\u0C30\u0C24\u0C02", hi: "\u0936\u0941\u0915\u094D\u0932 \u090F\u0915\u093E\u0926\u0936\u0940 \u0935\u094D\u0930\u0924", ta: "\u0B9A\u0BC1\u0B95\u0BCD\u0BB2 \u0B8F\u0B95\u0BBE\u0BA4\u0B9A\u0BBF \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD", kn: "\u0CB6\u0CC1\u0C95\u0CCD\u0CB2 \u0C8F\u0C95\u0CBE\u0CA6\u0CB6\u0CBF \u0CB5\u0CCD\u0CB0\u0CA4" },
  "Krishna Ekadashi Vrat": { en: "Krishna Ekadashi Vrat", te: "\u0C15\u0C43\u0C37\u0C4D\u0C23 \u0C0F\u0C15\u0C3E\u0C26\u0C36\u0C3F \u0C35\u0C4D\u0C30\u0C24\u0C02", hi: "\u0915\u0943\u0937\u094D\u0923 \u090F\u0915\u093E\u0926\u0936\u0940 \u0935\u094D\u0930\u0924", ta: "\u0B95\u0BBF\u0BB0\u0BC1\u0BB7\u0BCD\u0BA3 \u0B8F\u0B95\u0BBE\u0BA4\u0B9A\u0BBF \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD", kn: "\u0C95\u0CC3\u0CB7\u0CCD\u0CA3 \u0C8F\u0C95\u0CBE\u0CA6\u0CB6\u0CBF \u0CB5\u0CCD\u0CB0\u0CA4" },
  "Maha Shivaratri / Pradosham": { en: "Maha Shivaratri / Pradosham", te: "\u0C2E\u0C39\u0C3E \u0C36\u0C3F\u0C35\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F / \u0C2A\u0C4D\u0C30\u0C26\u0C4B\u0C37\u0C02", hi: "\u092E\u0939\u093E\u0936\u093F\u0935\u0930\u093E\u0924\u094D\u0930\u093F / \u092A\u094D\u0930\u0926\u094B\u0937\u092E", ta: "\u0BAE\u0B95\u0BBE \u0B9A\u0BBF\u0BB5\u0BB0\u0BBE\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBF / \u0BAA\u0BBF\u0BB0\u0BA4\u0BCB\u0BB7\u0BAE\u0BCD", kn: "\u0CAE\u0CB9\u0CBE \u0CB6\u0CBF\u0CB5\u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF / \u0CAA\u0CCD\u0CB0\u0CA6\u0CCB\u0CB7\u0C82" },
  "Pournami Vrat / Satyanarayana Pooja": { en: "Pournami Vrat / Satyanarayana Pooja", te: "\u0C2A\u0C4C\u0C30\u0C4D\u0C23\u0C2E\u0C3F \u0C35\u0C4D\u0C30\u0C24\u0C02 / \u0C38\u0C24\u0C4D\u0C2F\u0C28\u0C3E\u0C30\u0C3E\u0C2F\u0C23 \u0C2A\u0C42\u0C1C", hi: "\u092A\u0942\u0930\u094D\u0923\u093F\u092E\u093E \u0935\u094D\u0930\u0924 / \u0938\u0924\u094D\u092F\u0928\u093E\u0930\u093E\u092F\u0923 \u092A\u0942\u091C\u093E", ta: "\u0BAA\u0BCC\u0BB0\u0BCD\u0BA3\u0BAE\u0BBF \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD / \u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BA8\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3 \u0BAA\u0BC2\u0B9C\u0BC8", kn: "\u0CB9\u0CC1\u0CA3\u0CCD\u0CA3\u0CBF\u0CAE\u0CC6 \u0CB5\u0CCD\u0CB0\u0CA4 / \u0CB8\u0CA4\u0CCD\u0CAF\u0CA8\u0CBE\u0CB0\u0CBE\u0CAF\u0CA3 \u0CAA\u0CC2\u0C9C\u0CC6" },
  "Amavasya Pitru Tarpanam": { en: "Amavasya Pitru Tarpanam", te: "\u0C05\u0C2E\u0C3E\u0C35\u0C3E\u0C38\u0C4D\u0C2F \u0C2A\u0C3F\u0C24\u0C43 \u0C24\u0C30\u0C4D\u0C2A\u0C23\u0C02", hi: "\u0905\u092E\u093E\u0935\u0938\u094D\u092F\u093E \u092A\u093F\u0924\u0943 \u0924\u0930\u094D\u092A\u0923", ta: "\u0B85\u0BAE\u0BBE\u0BB5\u0BBE\u0B9A\u0BC8 \u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0BA4\u0BB0\u0BCD\u0BAA\u0BA3\u0BAE\u0BCD", kn: "\u0C85\u0CAE\u0CBE\u0CB5\u0CBE\u0CB8\u0CCD\u0CAF\u0CC6 \u0CAA\u0CBF\u0CA4\u0CC3 \u0CA4\u0CB0\u0CCD\u0CAA\u0CA3" }
};
var BABY_NAME_MEANING_TRANSLATIONS = {
  "Peaceful": { en: "Peaceful", te: "\u0C2A\u0C4D\u0C30\u0C36\u0C3E\u0C02\u0C24\u0C2E\u0C48\u0C28", hi: "\u0936\u093E\u0902\u0924\u093F\u092A\u094D\u0930\u093F\u092F", ta: "\u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9", kn: "\u0CAA\u0CCD\u0CB0\u0CB6\u0CBE\u0C82\u0CA4\u0CB5\u0CBE\u0CA6" },
  "Bright, Chaitra Month": { en: "Bright, Chaitra Month", te: "\u0C24\u0C47\u0C1C\u0C4B\u0C35\u0C02\u0C24\u0C2E\u0C48\u0C28, \u0C1A\u0C48\u0C24\u0C4D\u0C30 \u0C2E\u0C3E\u0C38\u0C02", hi: "\u0909\u091C\u094D\u091C\u094D\u0935\u0932, \u091A\u0948\u0924\u094D\u0930 \u092E\u093E\u0938", ta: "\u0B92\u0BB3\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD, \u0B9A\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC8 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD", kn: "\u0CAA\u0CCD\u0CB0\u0C95\u0CBE\u0CB6\u0CAE\u0CBE\u0CA8\u0CB5\u0CBE\u0CA6, \u0C9A\u0CC8\u0CA4\u0CCD\u0CB0 \u0CAE\u0CBE\u0CB8" },
  "Moon": { en: "Moon", te: "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41", hi: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E", ta: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD", kn: "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0" },
  "Beautiful, Elegant": { en: "Beautiful, Elegant", te: "\u0C38\u0C41\u0C02\u0C26\u0C30\u0C2E\u0C48\u0C28, \u0C38\u0C41\u0C28\u0C4D\u0C28\u0C3F\u0C24\u0C2E\u0C48\u0C28", hi: "\u0938\u0941\u0902\u0926\u0930, \u0932\u0932\u093F\u0924", ta: "\u0B85\u0BB4\u0B95\u0BBE\u0BA9, \u0BA8\u0BC7\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9", kn: "\u0CB8\u0CC1\u0C82\u0CA6\u0CB0\u0CB5\u0CBE\u0CA6, \u0CB2\u0CB2\u0CBF\u0CA4" },
  "Elegant Woman": { en: "Elegant Woman", te: "\u0C38\u0C41\u0C02\u0C26\u0C30\u0C2E\u0C48\u0C28 \u0C38\u0C4D\u0C24\u0C4D\u0C30\u0C40", hi: "\u0932\u0932\u093F\u0924 \u0938\u094D\u0924\u094D\u0930\u0940/\u0932\u0932\u093F\u0924\u093E", ta: "\u0B85\u0BB4\u0B95\u0BBE\u0BA9 \u0BAA\u0BC6\u0BA3\u0BCD", kn: "\u0CB8\u0CC1\u0C82\u0CA6\u0CB0 \u0CB8\u0CCD\u0CA4\u0CCD\u0CB0\u0CC0" },
  "Lord Shiva, Sun": { en: "Lord Shiva, Sun", te: "\u0C36\u0C3F\u0C35\u0C41\u0C21\u0C41, \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41", hi: "\u092D\u0917\u0935\u093E\u0928 \u0936\u093F\u0935, \u0938\u0942\u0930\u094D\u092F", ta: "\u0B9A\u0BBF\u0BB5\u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BA9\u0BCD, \u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BCD", kn: "\u0CB6\u0CBF\u0CB5, \u0CB8\u0CC2\u0CB0\u0CCD\u0CAF" },
  "Gracious gift of God": { en: "Gracious gift of God", te: "\u0C26\u0C48\u0C35 \u0C2A\u0C4D\u0C30\u0C38\u0C3E\u0C26\u0C02", hi: "\u0908\u0936\u094D\u0935\u0930 \u0915\u093E \u0926\u092F\u093E\u0932\u0941 \u0909\u092A\u0939\u093E\u0930", ta: "\u0B95\u0B9F\u0BB5\u0BC1\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BB0\u0BC1\u0B9F\u0BCD\u0B95\u0BCA\u0B9F\u0BC8", kn: "\u0CA6\u0CC7\u0CB5\u0CB0 \u0C95\u0CC3\u0CAA\u0CC6\u0CAF \u0C95\u0CCA\u0CA1\u0CC1\u0C97\u0CC6" },
  "Lord of Water": { en: "Lord of Water", te: "\u0C35\u0C30\u0C41\u0C23 \u0C26\u0C47\u0C35\u0C41\u0C21\u0C41", hi: "\u091C\u0932 \u0915\u0947 \u0926\u0947\u0935\u0924\u093E (\u0935\u0930\u0941\u0923)", ta: "\u0BA8\u0BC0\u0BB0\u0BCD \u0B95\u0B9F\u0BB5\u0BC1\u0BB3\u0BCD (\u0BB5\u0BB0\u0BC1\u0BA3\u0BA9\u0BCD)", kn: "\u0CB5\u0CB0\u0CC1\u0CA3 \u0CA6\u0CC7\u0CB5" },
  "Ray of Light": { en: "Ray of Light", te: "\u0C15\u0C3F\u0C30\u0C23\u0C02, \u0C35\u0C46\u0C32\u0C41\u0C17\u0C41", hi: "\u092A\u094D\u0930\u0915\u093E\u0936 \u0915\u0940 \u0915\u093F\u0930\u0923", ta: "\u0B92\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BA4\u0BBF\u0BB0\u0BCD", kn: "\u0CAC\u0CC6\u0CB3\u0C95\u0CBF\u0CA8 \u0C95\u0CBF\u0CB0\u0CA3" },
  "Fame, Glory": { en: "Fame, Glory", te: "\u0C15\u0C40\u0C30\u0C4D\u0C24\u0C3F, \u0C2F\u0C36\u0C38\u0C4D\u0C38\u0C41", hi: "\u0915\u0940\u0930\u094D\u0924\u093F, \u092F\u0936", ta: "\u0BAA\u0BC1\u0B95\u0BB4\u0BCD, \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BC8", kn: "\u0C95\u0CC0\u0CB0\u0CCD\u0CA4\u0CBF, \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CC1" },
  "Lord Vishnu": { en: "Lord Vishnu", te: "\u0C39\u0C30\u0C3F, \u0C35\u0C3F\u0C37\u0C4D\u0C23\u0C41\u0C2E\u0C42\u0C30\u0C4D\u0C24\u0C3F", hi: "\u092D\u0917\u0935\u093E\u0928 \u0935\u093F\u0937\u094D\u0923\u0941", ta: "\u0BB9\u0BB0\u0BBF (\u0BAE\u0B95\u0BBE\u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1)", kn: "\u0CB9\u0CB0\u0CBF (\u0CB5\u0CBF\u0CB7\u0CCD\u0CA3\u0CC1)" },
  "Precious Stone, Fish": { en: "Precious Stone, Fish", te: "\u0C2E\u0C40\u0C28\u0C02, \u0C35\u0C3F\u0C32\u0C41\u0C35\u0C48\u0C28 \u0C30\u0C24\u0C4D\u0C28\u0C02", hi: "\u092E\u091B\u0932\u0940, \u0905\u0928\u092E\u094B\u0932 \u0930\u0924\u094D\u0928", ta: "\u0BAE\u0BC0\u0BA9\u0BAE\u0BCD, \u0BB5\u0BBF\u0BB2\u0BC8\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BB1\u0BCD\u0BB1 \u0B95\u0BB2\u0BCD", kn: "\u0CAE\u0CC0\u0CA8\u0CC1, \u0C85\u0CAE\u0CC2\u0CB2\u0CCD\u0CAF \u0CB0\u0CA4\u0CCD\u0CA8" },
  "Humble": { en: "Humble", te: "\u0C35\u0C3F\u0C28\u0C2E\u0C4D\u0C30\u0C2E\u0C48\u0C28", hi: "\u0935\u093F\u0928\u092E\u094D\u0930", ta: "\u0BAA\u0BA3\u0BBF\u0BB5\u0BBE\u0BA9", kn: "\u0CB5\u0CBF\u0CA8\u0CAE\u0CCD\u0CB0\u0CB5\u0CBE\u0CA6" },
  "Ruler of Gods": { en: "Ruler of Gods", te: "\u0C38\u0C41\u0C30\u0C47\u0C37\u0C4D, \u0C26\u0C47\u0C35\u0C24\u0C32 \u0C30\u0C3E\u0C1C\u0C41", hi: "\u0926\u0947\u0935\u0924\u093E\u0913\u0902 \u0915\u0947 \u0930\u093E\u091C\u093E (\u0938\u0941\u0930\u0947\u0936)", ta: "\u0BA4\u0BC7\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF (\u0B9A\u0BC1\u0BB0\u0BC7\u0BB7\u0BCD)", kn: "\u0CA6\u0CC7\u0CB5\u0CA4\u0CC6\u0C97\u0CB3 \u0C85\u0CB0\u0CB8" },
  "Lamp, Light": { en: "Lamp, Light", te: "\u0C26\u0C40\u0C2A\u0C02, \u0C35\u0C46\u0C32\u0C41\u0C17\u0C41", hi: "\u0926\u0940\u092A\u0915, \u0930\u094B\u0936\u0928\u0940", ta: "\u0BB5\u0BBF\u0BB3\u0B95\u0BCD\u0B95\u0BC1, \u0B92\u0BB3\u0BBF", kn: "\u0CA6\u0CC0\u0CAA, \u0CAC\u0CC6\u0CB3\u0C95\u0CC1" }
};
var MUHURTA_ACTIVITY_TRANSLATIONS = {
  "Marriage": {
    name: { en: "Marriage", te: "\u0C35\u0C3F\u0C35\u0C3E\u0C39 \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C02", hi: "\u0935\u093F\u0935\u093E\u0939 \u092E\u0941\u0939\u0942\u0930\u094D\u0924", ta: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0BAE\u0BC1\u0BB9\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4" },
    desc: {
      en: "Most auspicious marriage timeline with subh nakshatras",
      te: "\u0C36\u0C41\u0C2D \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C24\u0C4B \u0C05\u0C24\u0C4D\u0C2F\u0C02\u0C24 \u0C36\u0C4D\u0C30\u0C47\u0C37\u0C4D\u0C1F\u0C2E\u0C48\u0C28 \u0C35\u0C3F\u0C35\u0C3E\u0C39 \u0C38\u0C2E\u0C2F\u0C3E\u0C32\u0C41",
      hi: "\u0936\u0941\u092D \u0928\u0915\u094D\u0937\u0924\u094D\u0930\u094B\u0902 \u0938\u0947 \u092F\u0941\u0915\u094D\u0924 \u0905\u0924\u094D\u092F\u0902\u0924 \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0935\u093F\u0935\u093E\u0939 \u0938\u092E\u092F \u0938\u0940\u092E\u093E",
      ta: "\u0B9A\u0BC1\u0BAA \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B9F\u0BA9\u0BCD \u0B95\u0BC2\u0B9F\u0BBF\u0BAF \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0BA9\u0BCD\u0BA9\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0B95\u0BBE\u0BB2\u0B95\u0BCD\u0B95\u0BC6\u0B9F\u0BC1",
      kn: "\u0CB6\u0CC1\u0CAD \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0C97\u0CB3\u0CC6\u0CC2\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CAA\u0CCD\u0CB0\u0CB6\u0CB8\u0CCD\u0CA4\u0CB5\u0CBE\u0CA6 \u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4\u0C97\u0CB3\u0CC1"
    }
  },
  "House Warming (Gruha Pravesh)": {
    name: { en: "House Warming (Gruha Pravesh)", te: "\u0C17\u0C43\u0C39 \u0C2A\u0C4D\u0C30\u0C35\u0C47\u0C36 \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C02", hi: "\u0917\u0943\u0939 \u092A\u094D\u0930\u0935\u0947\u0936 \u092E\u0941\u0939\u0942\u0930\u094D\u0924", ta: "\u0917\u0943\u0939\u092A\u094D\u0930\u0935\u0947\u0936\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0C97\u0CC3\u0CB9 \u0CAA\u0CCD\u0CB0\u0CB5\u0CC7\u0CB6 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4" },
    desc: {
      en: "Auspicious home construction and heating coordinates",
      te: "\u0C28\u0C42\u0C24\u0C28 \u0C17\u0C43\u0C39 \u0C2A\u0C4D\u0C30\u0C35\u0C47\u0C36\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C3E\u0C38\u0C4D\u0C24\u0C41\u0C2A\u0C42\u0C1C\u0C15\u0C41 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C2E\u0C48\u0C28 \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C3E\u0C32\u0C41",
      hi: "\u0928\u090F \u0918\u0930 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936 \u0914\u0930 \u0935\u093E\u0938\u094D\u0924\u0941 \u0936\u093E\u0902\u0924\u093F \u0915\u0947 \u0932\u093F\u090F \u0938\u0930\u094D\u0935\u094B\u0924\u094D\u0924\u092E \u0936\u0941\u092D \u092E\u0941\u0939\u0942\u0930\u094D\u0924",
      ta: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B95\u0BC1\u0B9F\u0BBF\u0BAF\u0BC7\u0BB1\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0BB8\u0BCD\u0BA4\u0BC1 \u0BAA\u0BC2\u0B9C\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B8F\u0BB1\u0BCD\u0BB1 \u0B9A\u0BC1\u0BAA \u0B95\u0BBE\u0BB2\u0BAE\u0BCD",
      kn: "\u0CB9\u0CCA\u0CB8 \u0CAE\u0CA8\u0CC6 \u0CAA\u0CCD\u0CB0\u0CB5\u0CC7\u0CB6 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB5\u0CBE\u0CB8\u0CCD\u0CA4\u0CC1 \u0CAA\u0CC2\u0C9C\u0CC6\u0C97\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CAF\u0CCB\u0C97\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6 \u0CB8\u0CAE\u0CAF\u0C97\u0CB3\u0CC1"
    }
  },
  "Vehicle Purchase": {
    name: { en: "Vehicle Purchase", te: "\u0C35\u0C3E\u0C39\u0C28 \u0C15\u0C4A\u0C28\u0C41\u0C17\u0C4B\u0C32\u0C41 \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C02", hi: "\u0935\u093E\u0939\u0928 \u0916\u0930\u0940\u0926 \u092E\u0941\u0939\u0942\u0930\u094D\u0924", ta: "\u0BB5\u0BBE\u0B95\u0BA9\u0BAE\u0BCD \u0BB5\u0BBE\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0BB9\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CBE\u0CB9\u0CA8 \u0C96\u0CB0\u0CC0\u0CA6\u0CBF \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4" },
    desc: {
      en: "Luxurious asset acquisition timings",
      te: "\u0C28\u0C42\u0C24\u0C28 \u0C35\u0C3E\u0C39\u0C28\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1A\u0C30\u0C3E\u0C38\u0C4D\u0C24\u0C41\u0C32\u0C41 \u0C15\u0C4A\u0C28\u0C41\u0C17\u0C4B\u0C32\u0C41 \u0C1A\u0C47\u0C2F\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C36\u0C41\u0C2D \u0C38\u0C2E\u0C2F\u0C3E\u0C32\u0C41",
      hi: "\u0935\u093E\u0939\u0928\u094B\u0902 \u090F\u0935\u0902 \u091A\u0932 \u0938\u0902\u092A\u0924\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u0940 \u0916\u0930\u0940\u0926 \u0939\u0947\u0924\u0941 \u0936\u0941\u092D \u090F\u0935\u0902 \u0932\u093E\u092D\u092A\u094D\u0930\u0926 \u092E\u0941\u0939\u0942\u0930\u094D\u0924",
      ta: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B95\u0BA9\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BBE\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BC1 \u0B89\u0B95\u0BA8\u0BCD\u0BA4 \u0B9A\u0BC1\u0BAA \u0BAF\u0BCB\u0B95 \u0B95\u0BBE\u0BB2\u0BAE\u0BCD",
      kn: "\u0CB9\u0CCA\u0CB8 \u0CB5\u0CBE\u0CB9\u0CA8 \u0C96\u0CB0\u0CC0\u0CA6\u0CBF\u0C97\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CAA\u0CCD\u0CB0\u0CB6\u0CB8\u0CCD\u0CA4\u0CB5\u0CBE\u0CA6 \u0CB6\u0CC1\u0CAD \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4\u0C97\u0CB3\u0CC1"
    }
  },
  "Business Opening": {
    name: { en: "Business Opening", te: "\u0C35\u0C4D\u0C2F\u0C3E\u0C2A\u0C3E\u0C30 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C02", hi: "\u0935\u094D\u092F\u093E\u092A\u093E\u0930 \u0909\u0926\u094D\u0918\u093E\u091F\u0928 \u092E\u0941\u0939\u0942\u0930\u094D\u0924", ta: "\u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD \u0BA4\u0BC1\u0BB5\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0BB9\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CB5\u0CCD\u0CAF\u0CBE\u0CAA\u0CBE\u0CB0 \u0C86\u0CB0\u0C82\u0CAD\u0CA6 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4" },
    desc: {
      en: "Corporate scale-up and investments timelines",
      te: "\u0C28\u0C42\u0C24\u0C28 \u0C35\u0C4D\u0C2F\u0C3E\u0C2A\u0C3E\u0C30\u0C3E\u0C32\u0C41, \u0C37\u0C3E\u0C2A\u0C41\u0C32\u0C41 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C46\u0C1F\u0C4D\u0C1F\u0C41\u0C2C\u0C21\u0C41\u0C32\u0C15\u0C41 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32 \u0C38\u0C2E\u0C2F\u0C02",
      hi: "\u0928\u090F \u0935\u094D\u092F\u093E\u092A\u093E\u0930, \u092A\u094D\u0930\u0924\u093F\u0937\u094D\u0920\u093E\u0928 \u0915\u0947 \u0936\u0941\u092D\u093E\u0930\u0902\u092D \u090F\u0935\u0902 \u0928\u093F\u0935\u0947\u0936 \u0915\u0947 \u0932\u093F\u090F \u0938\u0930\u094D\u0935\u0936\u094D\u0930\u0947\u0937\u094D\u0920 \u092E\u0941\u0939\u0942\u0930\u094D\u0924",
      ta: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD \u0BA4\u0BC1\u0BB5\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B8F\u0BB1\u0BCD\u0BB1 \u0B9A\u0BC1\u0BAA \u0B95\u0BBE\u0BB2\u0BAE\u0BCD",
      kn: "\u0CB9\u0CCA\u0CB8 \u0CB5\u0CCD\u0CAF\u0CBE\u0CAA\u0CBE\u0CB0 \u0C86\u0CB0\u0C82\u0CAD \u0CB9\u0CBE\u0C97\u0CC2 \u0C89\u0CA6\u0CCD\u0CAF\u0CAE \u0CB9\u0CC2\u0CA1\u0CBF\u0C95\u0CC6\u0C97\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4"
    }
  },
  "Travel Timelines": {
    name: { en: "Travel Timelines", te: "\u0C2A\u0C4D\u0C30\u0C2F\u0C3E\u0C23 \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C02", hi: "\u092F\u093E\u0924\u094D\u0930\u093E \u092A\u094D\u0930\u0938\u094D\u0925\u093E\u0928 \u092E\u0941\u0939\u0942\u0930\u094D\u0924", ta: "\u0BAA\u0BBF\u0BB0\u0BAF\u0BBE\u0BA3 \u0BAE\u0BC1\u0BB9\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD", kn: "\u0CAA\u0CCD\u0CB0\u0CAF\u0CBE\u0CA3 \u0CAE\u0CC1\u0CB9\u0CC2\u0CB0\u0CCD\u0CA4" },
    desc: {
      en: "Safe directions and transit options",
      te: "\u0C30\u0C15\u0C4D\u0C37\u0C23, \u0C15\u0C4D\u0C37\u0C47\u0C2E\u0C15\u0C30\u0C2E\u0C48\u0C28 \u0C26\u0C3F\u0C36\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C4D\u0C30\u0C2F\u0C3E\u0C23\u0C3E\u0C32 \u0C15\u0C4A\u0C30\u0C15\u0C41 \u0C36\u0C41\u0C2D \u0C2E\u0C41\u0C39\u0C42\u0C30\u0C4D\u0C24\u0C3E\u0C32\u0C41",
      hi: "\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u094D\u0930\u0938\u094D\u0925\u093E\u0928, \u0909\u0924\u094D\u0924\u092E \u0926\u093F\u0936\u093E \u090F\u0935\u0902 \u0938\u0941\u0916\u0926 \u092F\u093E\u0924\u094D\u0930\u093E \u0939\u0947\u0924\u0941 \u0926\u093F\u0936\u093E\u0936\u0942\u0932 \u0930\u0939\u093F\u0924 \u0936\u0941\u092D \u0938\u092E\u092F",
      ta: "\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0BA9 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9A\u0BC1\u0BAA\u0BBF\u0B9F\u0BCD\u0B9A\u0BAE\u0BBE\u0BA9 \u0BA8\u0BC0\u0BA3\u0BCD\u0B9F \u0BA4\u0BC2\u0BB0 \u0BAA\u0BAF\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B89\u0B95\u0BA8\u0BCD\u0BA4 \u0B95\u0BBE\u0BB2\u0BAE\u0BCD",
      kn: "\u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB8\u0CC1\u0C96\u0C95\u0CB0 \u0CAA\u0CCD\u0CB0\u0CAF\u0CBE\u0CA3 \u0CAA\u0CCD\u0CB0\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0C95\u0CCD\u0C95\u0CC6 \u0CAA\u0CCD\u0CB0\u0CB6\u0CB8\u0CCD\u0CA4\u0CB5\u0CBE\u0CA6 \u0CB8\u0CAE\u0CAF"
    }
  }
};
function translateWeekday(index, lang) {
  const set = WEEKDAY_TRANSLATIONS[index % 7];
  return set ? getTranslation(set, lang) : `Weekday ${index}`;
}
function translateLunarMonth(index, lang) {
  const set = LUNAR_MONTH_TRANSLATIONS[index % 12];
  return set ? getTranslation(set, lang) : `Month ${index}`;
}
function translateGemstone(gem, lang) {
  const set = GEMSTONE_TRANSLATIONS[gem];
  return set ? getTranslation(set, lang) : gem;
}
function translateColor(color, lang) {
  const set = COLOR_TRANSLATIONS[color];
  return set ? getTranslation(set, lang) : color;
}
function translateFestival(fest, lang) {
  const set = FESTIVAL_TRANSLATIONS[fest];
  return set ? getTranslation(set, lang) : fest;
}
function translateBabyNameMeaning(meaning, lang) {
  const set = BABY_NAME_MEANING_TRANSLATIONS[meaning];
  return set ? getTranslation(set, lang) : meaning;
}
function translateMuhurtaActivityName(act, lang) {
  const item = MUHURTA_ACTIVITY_TRANSLATIONS[act];
  return item ? getTranslation(item.name, lang) : act;
}
function translateMuhurtaActivityDesc(act, lang) {
  const item = MUHURTA_ACTIVITY_TRANSLATIONS[act];
  return item ? getTranslation(item.desc, lang) : "";
}

// src/services/yogaEngine.ts
var YogaEngine = class {
  static {
    this.rules = [];
  }
  static registerRule(rule) {
    this.rules.push(rule);
  }
  static detectAllYogas(chart, lang) {
    const results = [];
    for (const rule of this.rules) {
      const result = rule.detect(chart, lang);
      results.push(result);
    }
    return results;
  }
};
function getHouseDistance(fromHouse, toHouse) {
  let diff = toHouse - fromHouse;
  if (diff < 0) diff += 12;
  return diff + 1;
}
function isKendra(houseNum) {
  return [1, 4, 7, 10].includes(houseNum);
}
function isTrikona(houseNum) {
  return [1, 5, 9].includes(houseNum);
}
function isDusthana(houseNum) {
  return [6, 8, 12].includes(houseNum);
}
function getLordOfHouse(chart, houseIndex) {
  const house = chart.houses.find((h) => h.index === houseIndex);
  return house ? house.lord : "";
}
function getHouseOfPlanet(chart, planetName) {
  return chart.planets[planetName]?.house || -1;
}
function hasMutualAspectOrConjunction(chart, p1, p2) {
  const h1 = getHouseOfPlanet(chart, p1);
  const h2 = getHouseOfPlanet(chart, p2);
  if (h1 === -1 || h2 === -1) return false;
  if (h1 === h2) return true;
  const p1AspectsP2 = chart.aspects.some((a) => a.aspectingPlanet === p1 && a.aspectedPlanet === p2);
  const p2AspectsP1 = chart.aspects.some((a) => a.aspectingPlanet === p2 && a.aspectedPlanet === p1);
  return p1AspectsP2 && p2AspectsP1;
}
function calculateDignityStrength(dignity) {
  switch (dignity) {
    case "Exalted":
      return 100;
    case "Moolatrikona":
      return 90;
    case "Own":
      return 80;
    case "Friend":
      return 60;
    case "Neutral":
      return 50;
    case "Enemy":
      return 30;
    case "Debilitated":
      return 10;
    default:
      return 50;
  }
}
var GajaKesariRule = class {
  constructor() {
    this.id = "gaja_kesari";
    this.name = "Gaja Kesari Yoga";
    this.description = "Jupiter is in a Kendra (1, 4, 7, 10) from the Moon.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C17\u0C1C\u0C15\u0C47\u0C38\u0C30\u0C3F \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0917\u091C\u0915\u0947\u0938\u0930\u0940 \u092F\u094B\u0917" : lang === "ta" ? "\u0B95\u0B9C\u0B95\u0BC7\u0B9A\u0BB0\u0BBF \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0C97\u0C9C\u0C95\u0CC7\u0CB8\u0CB0\u0CBF \u0CAF\u0CCB\u0C97" : this.name;
    const moon = chart.planets["Moon"];
    const jupiter = chart.planets["Jupiter"];
    if (!moon || !jupiter) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    const distance = getHouseDistance(moon.house, jupiter.house);
    if (isKendra(distance)) {
      const str = Math.floor((calculateDignityStrength(moon.dignity) + calculateDignityStrength(jupiter.dignity)) / 2);
      const ev = lang === "te" ? `\u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C3F ${distance}\u0C35 \u0C15\u0C47\u0C02\u0C26\u0C4D\u0C30 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0917\u0941\u0930\u0941 \u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0938\u0947 ${distance}\u0935\u0947\u0902 \u0915\u0947\u0902\u0926\u094D\u0930 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${distance}\u0BB5\u0BA4\u0BC1 \u0B95\u0BC7\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BC1\u0BB0\u0BC1 \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0C97\u0CC1\u0CB0\u0CC1 \u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8\u0CBF\u0C82\u0CA6 ${distance}\u0CA8\u0CC7 \u0C95\u0CC7\u0C82\u0CA6\u0CCD\u0CB0\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Jupiter is in Kendra (house ${distance} from Moon).`;
      return { id: this.id, name: yName, detected: true, strength: str, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var BudhaAdityaRule = class {
  constructor() {
    this.id = "budha_aditya";
    this.name = "Budha Aditya Yoga";
    this.description = "Sun and Mercury occupy the same sign.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C2C\u0C41\u0C27\u0C3E\u0C26\u0C3F\u0C24\u0C4D\u0C2F \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u092C\u0941\u0927\u093E\u0926\u093F\u0924\u094D\u092F \u092F\u094B\u0917" : lang === "ta" ? "\u0BAA\u0BC1\u0BA4\u0BBE\u0BA4\u0BBF\u0BA4\u0BCD\u0BAF \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CAC\u0CC1\u0CA7\u0CBE\u0CA6\u0CBF\u0CA4\u0CCD\u0CAF \u0CAF\u0CCB\u0C97" : this.name;
    const sun = chart.planets["Sun"];
    const mercury = chart.planets["Mercury"];
    if (!sun || !mercury) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    if (sun.house === mercury.house) {
      const orb = Math.abs(sun.degree - mercury.degree);
      let str = 100 - orb * 2;
      if (str < 30) str = 30;
      const signL = translateRashi(sun.rasi.name.en, lang);
      const ev = lang === "te" ? `\u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2C\u0C41\u0C27\u0C41\u0C21\u0C41 ${signL}\u0C32\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3E\u0C30\u0C41. \u0C21\u0C3F\u0C17\u0C4D\u0C30\u0C40\u0C32 \u0C35\u0C4D\u0C2F\u0C24\u0C4D\u0C2F\u0C3E\u0C38\u0C02: ${orb.toFixed(2)}\xB0` : lang === "hi" ? `\u0938\u0942\u0930\u094D\u092F \u0914\u0930 \u092C\u0941\u0927 ${signL} \u092E\u0947\u0902 \u092F\u0941\u0924\u093F \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964 \u0921\u093F\u0917\u094D\u0930\u0940 \u0905\u0902\u0924\u0930: ${orb.toFixed(2)}\xB0` : lang === "ta" ? `\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BC1\u0BAE\u0BCD \u0BAA\u0BC1\u0BA4\u0BA9\u0BC1\u0BAE\u0BCD ${signL}\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BA3\u0BC8\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9. \u0B9F\u0BBF\u0B95\u0BBF\u0BB0\u0BBF \u0BB5\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE\u0B9A\u0BAE\u0BCD: ${orb.toFixed(2)}\xB0` : lang === "kn" ? `\u0CB8\u0CC2\u0CB0\u0CCD\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAC\u0CC1\u0CA7 ${signL}\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CC7\u0CB0\u0CBF\u0CB5\u0CC6. \u0CA1\u0CBF\u0C97\u0CCD\u0CB0\u0CBF \u0CB5\u0CCD\u0CAF\u0CA4\u0CCD\u0CAF\u0CBE\u0CB8: ${orb.toFixed(2)}\xB0` : `Sun and Mercury conjunct in ${signL}. Orb: ${orb.toFixed(2)}\xB0`;
      return { id: this.id, name: yName, detected: true, strength: Math.round(str), evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var ChandraMangalaRule = class {
  constructor() {
    this.id = "chandra_mangala";
    this.name = "Chandra Mangala Yoga";
    this.description = "Moon and Mars are conjunct or in mutual aspect.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C2E\u0C02\u0C17\u0C33 \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u091A\u0902\u0926\u094D\u0930 \u092E\u0902\u0917\u0932 \u092F\u094B\u0917" : lang === "ta" ? "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAE\u0B99\u0BCD\u0B95\u0BB3 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CAE\u0C82\u0C97\u0CB3 \u0CAF\u0CCB\u0C97" : this.name;
    const moon = chart.planets["Moon"];
    const mars = chart.planets["Mars"];
    if (!moon || !mars) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    if (hasMutualAspectOrConjunction(chart, "Moon", "Mars")) {
      const str = Math.floor((calculateDignityStrength(moon.dignity) + calculateDignityStrength(mars.dignity)) / 2);
      const ev = lang === "te" ? "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41 \u0C15\u0C32\u0C3F\u0C38\u0C3E\u0C30\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C12\u0C15\u0C30\u0C3F\u0C28\u0C4A\u0C15\u0C30\u0C41 \u0C1A\u0C42\u0C38\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41." : lang === "hi" ? "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0914\u0930 \u092E\u0902\u0917\u0932 \u092F\u0941\u0924\u093F \u092E\u0947\u0902 \u0939\u0948\u0902 \u092F\u093E \u090F\u0915 \u0926\u0942\u0938\u0930\u0947 \u0915\u094B \u0926\u0947\u0916 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964" : lang === "ta" ? "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BC1\u0BAE\u0BCD \u0B87\u0BA3\u0BC8\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0\u0BAE\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9." : lang === "kn" ? "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAE\u0C82\u0C97\u0CB3 \u0C9C\u0CCA\u0CA4\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6 \u0C85\u0CA5\u0CB5\u0CBE \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CA8\u0CCB\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6." : "Moon and Mars are conjunct or mutually aspecting.";
      return { id: this.id, name: yName, detected: true, strength: str, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var NeechaBhangaRajaRule = class {
  constructor() {
    this.id = "neecha_bhanga_raja";
    this.name = "Neecha Bhanga Raja Yoga";
    this.description = "Debilitated planet's dispositor is in Kendra from Lagna or Moon.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C28\u0C40\u0C1A\u0C2D\u0C02\u0C17 \u0C30\u0C3E\u0C1C\u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0928\u0940\u091A\u092D\u0902\u0917 \u0930\u093E\u091C\u092F\u094B\u0917" : lang === "ta" ? "\u0BA8\u0BC0\u0B9A\u0BAA\u0B99\u0BCD\u0B95 \u0BB0\u0BBE\u0B9C\u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CA8\u0CC0\u0C9A\u0CAD\u0C82\u0C97 \u0CB0\u0CBE\u0C9C\u0CAF\u0CCB\u0C97" : this.name;
    const debilitatedPlanets = Object.values(chart.planets).filter((p) => p.dignity === "Debilitated");
    const evidence = [];
    let baseStr = 0;
    for (const p of debilitatedPlanets) {
      const dispositorName = chart.houses.find((h) => h.signIndex === p.rasiIndex)?.lord;
      if (dispositorName) {
        const dispositor = chart.planets[dispositorName];
        if (dispositor) {
          const distFromLagna = dispositor.house;
          const distFromMoon = getHouseDistance(chart.planets["Moon"]?.house || 1, dispositor.house);
          if (isKendra(distFromLagna) || isKendra(distFromMoon)) {
            const pL = translatePlanet(p.name.en, lang);
            const dL = translatePlanet(dispositorName, lang);
            const ev = lang === "te" ? `${pL} \u0C28\u0C40\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41, \u0C15\u0C3E\u0C28\u0C40 \u0C26\u0C3E\u0C28\u0C3F \u0C15\u0C4D\u0C37\u0C47\u0C24\u0C4D\u0C30\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${dL} \u0C15\u0C47\u0C02\u0C26\u0C4D\u0C30\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${pL} \u0928\u0940\u091A \u0915\u093E \u0939\u0948, \u0932\u0947\u0915\u093F\u0928 \u0909\u0938\u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 ${dL} \u0915\u0947\u0902\u0926\u094D\u0930 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${pL} \u0BA8\u0BC0\u0B9A\u0BAE\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1, \u0B86\u0BA9\u0BBE\u0BB2\u0BCD \u0B85\u0BA4\u0BA9\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${dL} \u0B95\u0BC7\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.` : lang === "kn" ? `${pL} \u0CA8\u0CC0\u0C9A\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6, \u0C86\u0CA6\u0CB0\u0CC6 \u0C85\u0CB5\u0CA8 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${dL} \u0C95\u0CC7\u0C82\u0CA6\u0CCD\u0CB0\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `${pL} is debilitated, but its dispositor ${dL} is in a Kendra.`;
            evidence.push(ev);
            baseStr = calculateDignityStrength(dispositor.dignity);
          }
        }
      }
    }
    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: baseStr > 50 ? baseStr : 75, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var VipareetaRajaRule = class {
  constructor() {
    this.id = "vipareeta_raja";
    this.name = "Vipareeta Raja Yoga";
    this.description = "Lords of 6th, 8th, or 12th reside in other dusthanas (6, 8, 12).";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C35\u0C3F\u0C2A\u0C30\u0C40\u0C24 \u0C30\u0C3E\u0C1C\u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0935\u093F\u092A\u0930\u0940\u0924 \u0930\u093E\u091C\u092F\u094B\u0917" : lang === "ta" ? "\u0BB5\u0BBF\u0BAA\u0BB0\u0BC0\u0BA4 \u0BB0\u0BBE\u0B9C\u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CB5\u0CBF\u0CAA\u0CB0\u0CC0\u0CA4 \u0CB0\u0CBE\u0C9C\u0CAF\u0CCB\u0C97" : this.name;
    const evidence = [];
    const dusthanas = [6, 8, 12];
    let str = 0;
    dusthanas.forEach((h) => {
      const lordName = getLordOfHouse(chart, h);
      const lordHouse = getHouseOfPlanet(chart, lordName);
      if (lordHouse !== -1 && lordHouse !== h && isDusthana(lordHouse)) {
        const dL = translatePlanet(lordName, lang);
        const ev = lang === "te" ? `${h}\u0C35 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F (${dL}) ${lordHouse}\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${h}\u0935\u0947\u0902 \u092D\u093E\u0935 \u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 (${dL}) ${lordHouse}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${h}\u0B86\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF (${dL}) ${lordHouse}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${h}\u0CA8\u0CC7 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF (${dL}) ${lordHouse}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Lord of ${h}th (${dL}) is in ${lordHouse}th house.`;
        evidence.push(ev);
        str = calculateDignityStrength(chart.planets[lordName]?.dignity || "Neutral");
      }
    });
    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: str > 50 ? str : 75, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
function createMahapurushaRule(planetName, yogaName) {
  return {
    id: `mahapurusha_${yogaName.toLowerCase()}`,
    name: `${yogaName} Mahapurusha Yoga`,
    description: `${planetName} is in its own sign or exalted, and in a Kendra from Lagna.`,
    ruleMetadata: { version: "Standard Classical", reference: "BPHS" },
    detect(chart, lang) {
      const yName = lang === "te" ? `${translatePlanet(planetName, lang)} \u0C2E\u0C39\u0C3E\u0C2A\u0C41\u0C30\u0C41\u0C37 \u0C2F\u0C4B\u0C17\u0C02` : lang === "hi" ? `${translatePlanet(planetName, lang)} \u092E\u0939\u093E\u092A\u0941\u0930\u0941\u0937 \u092F\u094B\u0917` : lang === "ta" ? `${translatePlanet(planetName, lang)} \u0BAE\u0B95\u0BBE\u0BAA\u0BC1\u0BB0\u0BC1\u0BB7 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD` : lang === "kn" ? `${translatePlanet(planetName, lang)} \u0CAE\u0CB9\u0CBE\u0CAA\u0CC1\u0CB0\u0CC1\u0CB7 \u0CAF\u0CCB\u0C97` : this.name;
      const p = chart.planets[planetName];
      if (!p) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
      if (isKendra(p.house) && (p.dignity === "Exalted" || p.dignity === "Own")) {
        const str = p.dignity === "Exalted" ? 100 : 85;
        const pL = translatePlanet(planetName, lang);
        const ev = lang === "te" ? `${pL} \u0C24\u0C28 \u0C38\u0C4D\u0C35\u0C15\u0C4D\u0C37\u0C47\u0C24\u0C4D\u0C30\u0C02\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C3E \u0C09\u0C1A\u0C4D\u0C1B\u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B ${p.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B (\u0C15\u0C47\u0C02\u0C26\u0C4D\u0C30\u0C02) \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${pL} \u0905\u092A\u0928\u0947 \u092D\u093E\u0935 \u092E\u0947\u0902 \u092F\u093E \u0909\u091A\u094D\u091A \u0915\u093E \u0939\u094B\u0915\u0930 ${p.house}\u0935\u0947\u0902 \u092D\u093E\u0935 (\u0915\u0947\u0902\u0926\u094D\u0930) \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${pL} \u0B9A\u0BCA\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B89\u0B9A\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD ${p.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD (\u0B95\u0BC7\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD) \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${pL} \u0CB8\u0CCD\u0CB5\u0C82\u0CA4 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C89\u0C9A\u0CCD\u0C9A \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF ${p.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF (\u0C95\u0CC7\u0C82\u0CA6\u0CCD\u0CB0) \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `${planetName} is ${p.dignity} in House ${p.house} (Kendra).`;
        return {
          id: this.id,
          name: yName,
          detected: true,
          strength: str,
          evidence: [ev],
          rule: this.ruleMetadata
        };
      }
      return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    }
  };
}
var DhanaYogaRule = class {
  constructor() {
    this.id = "dhana_yoga";
    this.name = "Dhana Yoga";
    this.description = "Connection between lords of wealth (2nd/11th) and trines (1, 5, 9).";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C27\u0C28 \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0927\u0928 \u092F\u094B\u0917" : lang === "ta" ? "\u0BA4\u0BA9 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CA7\u0CA8 \u0CAF\u0CCB\u0C97" : this.name;
    const wealthLords = [getLordOfHouse(chart, 2), getLordOfHouse(chart, 11)];
    const trineLords = [getLordOfHouse(chart, 1), getLordOfHouse(chart, 5), getLordOfHouse(chart, 9)];
    const evidence = [];
    let str = 0;
    for (const w of wealthLords) {
      for (const t of trineLords) {
        if (w && t && w !== t) {
          if (hasMutualAspectOrConjunction(chart, w, t)) {
            const wL = translatePlanet(w, lang);
            const tL = translatePlanet(t, lang);
            const ev = lang === "te" ? `\u0C27\u0C28 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${wL} \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C24\u0C4D\u0C30\u0C3F\u0C15\u0C4B\u0C23\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${tL} \u0C15\u0C32\u0C3F\u0C38\u0C3E\u0C30\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C12\u0C15\u0C30\u0C3F\u0C28\u0C4A\u0C15\u0C30\u0C41 \u0C1A\u0C42\u0C38\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41.` : lang === "hi" ? `\u0927\u0928 \u092D\u093E\u0935 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${wL} \u0914\u0930 \u0924\u094D\u0930\u093F\u0915\u094B\u0923 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${tL} \u092F\u0941\u0924\u093F \u092E\u0947\u0902 \u0939\u0948\u0902 \u092F\u093E \u090F\u0915 \u0926\u0942\u0938\u0930\u0947 \u0915\u094B \u0926\u0947\u0916 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964` : lang === "ta" ? `\u0BA4\u0BA9 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${wL} \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0B95\u0BCB\u0BA3 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${tL} \u0B87\u0BA3\u0BC8\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0\u0BAE\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9.` : lang === "kn" ? `\u0CA7\u0CA8 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${wL} \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA4\u0CCD\u0CB0\u0CBF\u0C95\u0CCB\u0CA3 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${tL} \u0C9C\u0CCA\u0CA4\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6 \u0C85\u0CA5\u0CB5\u0CBE \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CA8\u0CCB\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6.` : `Wealth lord ${w} and Trine lord ${t} are conjunct or mutually aspecting.`;
            evidence.push(ev);
            const wStr = calculateDignityStrength(chart.planets[w]?.dignity || "Neutral");
            const tStr = calculateDignityStrength(chart.planets[t]?.dignity || "Neutral");
            str = Math.max(str, Math.floor((wStr + tStr) / 2));
          }
        }
      }
    }
    if (evidence.length > 0) {
      const uniqueEvidence = Array.from(new Set(evidence));
      return { id: this.id, name: yName, detected: true, strength: str || 75, evidence: uniqueEvidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var RajaYogaRule = class {
  constructor() {
    this.id = "raja_yoga";
    this.name = "Raja Yoga";
    this.description = "Conjunction or mutual aspect between Kendra lords and Trikona lords.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C30\u0C3E\u0C1C \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0930\u093E\u091C \u092F\u094B\u0917" : lang === "ta" ? "\u0BB0\u0BBE\u0B9C \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CB0\u0CBE\u0C9C \u0CAF\u0CCB\u0C97" : this.name;
    const kendraLords = [1, 4, 7, 10].map((h) => getLordOfHouse(chart, h));
    const trikonaLords = [1, 5, 9].map((h) => getLordOfHouse(chart, h));
    const evidence = [];
    let str = 0;
    for (const k of kendraLords) {
      for (const t of trikonaLords) {
        if (k && t && k !== t) {
          if (hasMutualAspectOrConjunction(chart, k, t)) {
            const kL = translatePlanet(k, lang);
            const tL = translatePlanet(t, lang);
            const ev = lang === "te" ? `\u0C15\u0C47\u0C02\u0C26\u0C4D\u0C30\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${kL} \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C24\u0C4D\u0C30\u0C3F\u0C15\u0C4B\u0C23\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${tL} \u0C15\u0C32\u0C3F\u0C38\u0C3E\u0C30\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C12\u0C15\u0C30\u0C3F\u0C28\u0C4A\u0C15\u0C30\u0C41 \u0C1A\u0C42\u0C38\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41.` : lang === "hi" ? `\u0915\u0947\u0902\u0926\u094D\u0930 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${kL} \u0914\u0930 \u0924\u094D\u0930\u093F\u0915\u094B\u0923 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${tL} \u092F\u0941\u0924\u093F \u092E\u0947\u0902 \u0939\u0948\u0902 \u092F\u093E \u090F\u0915 \u0926\u0942\u0938\u0930\u0947 \u0915\u094B \u0926\u0947\u0916 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964` : lang === "ta" ? `\u0B95\u0BC7\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${kL} \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BBF\u0B95\u0BCB\u0BA3 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${tL} \u0B87\u0BA3\u0BC8\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0\u0BAE\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9.` : lang === "kn" ? `\u0C95\u0CC7\u0C82\u0CA6\u0CCD\u0CB0 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${kL} \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA4\u0CCD\u0CB0\u0CBF\u0C95\u0CCB\u0CA3 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${tL} \u0C9C\u0CCA\u0CA4\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6 \u0C85\u0CA5\u0CB5\u0CBE \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CA8\u0CCB\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6.` : `Kendra lord ${k} and Trikona lord ${t} are conjunct or mutually aspecting.`;
            evidence.push(ev);
            const kStr = calculateDignityStrength(chart.planets[k]?.dignity || "Neutral");
            const tStr = calculateDignityStrength(chart.planets[t]?.dignity || "Neutral");
            str = Math.max(str, Math.floor((kStr + tStr) / 2));
          }
        }
      }
    }
    if (evidence.length > 0) {
      const uniqueEvidence = Array.from(new Set(evidence));
      return { id: this.id, name: yName, detected: true, strength: str || 80, evidence: uniqueEvidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var LakshmiYogaRule = class {
  constructor() {
    this.id = "lakshmi_yoga";
    this.name = "Lakshmi Yoga";
    this.description = "9th lord in Kendra/Trikona in dignity, and Lagna lord strong.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C32\u0C15\u0C4D\u0C37\u0C4D\u0C2E\u0C40 \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0932\u0915\u094D\u0937\u094D\u092E\u0940 \u092F\u094B\u0917" : lang === "ta" ? "\u0BB2\u0B9F\u0BCD\u0B9A\u0BC1\u0BAE\u0BBF \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0CAF\u0CCB\u0C97" : this.name;
    const lord9 = getLordOfHouse(chart, 9);
    const lord1 = getLordOfHouse(chart, 1);
    const p9 = chart.planets[lord9];
    const p1 = chart.planets[lord1];
    if (p9 && p1) {
      if ((isKendra(p9.house) || isTrikona(p9.house)) && (p9.dignity === "Exalted" || p9.dignity === "Own") && p1.dignity !== "Debilitated") {
        const str = calculateDignityStrength(p9.dignity);
        const l9L = translatePlanet(lord9, lang);
        const l1L = translatePlanet(lord1, lang);
        const ev = lang === "te" ? `9\u0C35 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${l9L} \u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41. \u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${l1L} \u0C15\u0C42\u0C21\u0C3E \u0C2E\u0C02\u0C1A\u0C3F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `9\u0935\u0947\u0902 \u092D\u093E\u0935 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${l9L} \u092E\u091C\u092C\u0942\u0924 \u0938\u094D\u0925\u093F\u0924\u093F \u092E\u0947\u0902 \u0939\u0948\u0902\u0964 \u0932\u0917\u094D\u0928 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${l1L} \u092D\u0940 \u0905\u091A\u094D\u091B\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u092E\u0947\u0902 \u0939\u0948\u0902\u0964` : lang === "ta" ? `9\u0B86\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${l9L} \u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD. \u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${l1L} \u0BA8\u0BB2\u0BCD\u0BB2 \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `9\u0CA8\u0CC7 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${l9L} \u0CAC\u0CB2\u0CB5\u0CBE\u0CA6 \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6. \u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${l1L} \u0C95\u0CC2\u0CA1 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `9th Lord ${lord9} is ${p9.dignity} in House ${p9.house}. Lagna Lord ${lord1} is well placed.`;
        return {
          id: this.id,
          name: yName,
          detected: true,
          strength: str,
          evidence: [ev],
          rule: this.ruleMetadata
        };
      }
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var AdhiYogaRule = class {
  constructor() {
    this.id = "adhi_yoga";
    this.name = "Adhi Yoga";
    this.description = "Benefics (Mercury, Jupiter, Venus) in 6th, 7th, 8th from Moon or Lagna.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C05\u0C27\u0C3F \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0905\u0927\u093F \u092F\u094B\u0917" : lang === "ta" ? "\u0B85\u0BA4\u0BBF \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0C85\u0CA7\u0CBF \u0CAF\u0CCB\u0C97" : this.name;
    const benefics = ["Mercury", "Jupiter", "Venus"];
    let beneficCount = 0;
    const evidence = [];
    const moonHouse = chart.planets["Moon"]?.house || 1;
    let totalStr = 0;
    benefics.forEach((b) => {
      const p = chart.planets[b];
      if (p) {
        const bL = translatePlanet(b, lang);
        const fromLagna = p.house;
        const fromMoon = getHouseDistance(moonHouse, p.house);
        if ([6, 7, 8].includes(fromLagna)) {
          beneficCount++;
          const ev = lang === "te" ? `${bL} \u0C32\u0C17\u0C4D\u0C28\u0C02 \u0C28\u0C41\u0C02\u0C21\u0C3F ${fromLagna}\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${bL} \u0932\u0917\u094D\u0928 \u0938\u0947 ${fromLagna}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${bL} \u0BB2\u0B95\u0BCD\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${fromLagna}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${bL} \u0CB2\u0C97\u0CCD\u0CA8\u0CA6\u0CBF\u0C82\u0CA6 ${fromLagna}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `${b} is in house ${fromLagna} from Lagna.`;
          evidence.push(ev);
          totalStr += calculateDignityStrength(p.dignity);
        } else if ([6, 7, 8].includes(fromMoon)) {
          beneficCount++;
          const ev = lang === "te" ? `${bL} \u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C3F ${fromMoon}\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${bL} \u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0938\u0947 ${fromMoon}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${bL} \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${fromMoon}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${bL} \u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8\u0CBF\u0C82\u0CA6 ${fromMoon}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `${b} is in house ${fromMoon} from Moon.`;
          evidence.push(ev);
          totalStr += calculateDignityStrength(p.dignity);
        }
      }
    });
    if (beneficCount >= 2) {
      const avgStr = Math.floor(totalStr / beneficCount);
      return { id: this.id, name: yName, detected: true, strength: avgStr, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var KemadrumaRule = class {
  constructor() {
    this.id = "kemadruma";
    this.name = "Kemadruma Yoga";
    this.description = "No planets (except Sun/Nodes) in 2nd and 12th from Moon.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C15\u0C47\u0C2E\u0C26\u0C4D\u0C30\u0C41\u0C2E \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0915\u0947\u092E\u0926\u094D\u0930\u0941\u092E \u092F\u094B\u0917" : lang === "ta" ? "\u0B95\u0BC7\u0BAE\u0BA4\u0BCD\u0BB0\u0BC1\u0BAE \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0C95\u0CC7\u0CAE\u0CA6\u0CCD\u0CB0\u0CC1\u0CAE \u0CAF\u0CCB\u0C97" : this.name;
    const moonHouse = chart.planets["Moon"]?.house;
    if (!moonHouse) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    const house2 = moonHouse % 12 + 1;
    const house12 = (moonHouse + 10) % 12 + 1;
    const isExcluded = (name) => ["Sun", "Rahu", "Ketu", "Moon"].includes(name);
    const occupants2 = (chart.houses.find((h) => h.index === house2)?.occupants || []).filter((o) => !isExcluded(o));
    const occupants12 = (chart.houses.find((h) => h.index === house12)?.occupants || []).filter((o) => !isExcluded(o));
    if (occupants2.length === 0 && occupants12.length === 0) {
      const hasPlanetsInKendraFromLagna = [1, 4, 7, 10].some((h) => (chart.houses.find((hh) => hh.index === h)?.occupants || []).filter((o) => !isExcluded(o)).length > 0);
      if (!hasPlanetsInKendraFromLagna) {
        const ev = lang === "te" ? "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C3F \u0C28\u0C41\u0C02\u0C21\u0C3F 2\u0C35 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 12\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41, \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C32\u0C17\u0C4D\u0C28 \u0C15\u0C47\u0C02\u0C26\u0C4D\u0C30\u0C3E\u0C32 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C30\u0C15\u0C4D\u0C37\u0C23 \u0C32\u0C47\u0C26\u0C41." : lang === "hi" ? "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0938\u0947 \u0926\u0942\u0938\u0930\u0947 \u0914\u0930 12\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0915\u094B\u0908 \u0917\u094D\u0930\u0939 \u0928\u0939\u0940\u0902 \u0939\u0948, \u0914\u0930 \u0932\u0917\u094D\u0928 \u0915\u0947\u0902\u0926\u094D\u0930\u094B\u0902 \u0938\u0947 \u0915\u094B\u0908 \u092C\u091A\u093E\u0935 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964" : lang === "ta" ? "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 2 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD 12 \u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8, \u0BB2\u0B95\u0BCD\u0BA9 \u0B95\u0BC7\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8." : lang === "kn" ? "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8\u0CBF\u0C82\u0CA6 2\u0CA8\u0CC7 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 12\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CBF\u0CB2\u0CCD\u0CB2, \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB2\u0C97\u0CCD\u0CA8 \u0C95\u0CC7\u0C82\u0CA6\u0CCD\u0CB0\u0C97\u0CB3\u0CBF\u0C82\u0CA6 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB0\u0C95\u0CCD\u0CB7\u0CA3\u0CC6 \u0C87\u0CB2\u0CCD\u0CB2." : "No planets in 2nd and 12th from Moon, and no cancellation from Lagna Kendras.";
        return {
          id: this.id,
          name: yName,
          detected: true,
          strength: 100,
          evidence: [ev],
          rule: this.ruleMetadata
        };
      }
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var DaridraYogaRule = class {
  constructor() {
    this.id = "daridra_yoga";
    this.name = "Daridra Yoga";
    this.description = "Lords of 2nd/11th situated in 6th, 8th, or 12th house.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C26\u0C30\u0C3F\u0C26\u0C4D\u0C30 \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0926\u0930\u093F\u0926\u094D\u0930 \u092F\u094B\u0917" : lang === "ta" ? "\u0BA4\u0BB0\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CA6\u0CB0\u0CBF\u0CA6\u0CCD\u0CB0 \u0CAF\u0CCB\u0C97" : this.name;
    const lords = [getLordOfHouse(chart, 2), getLordOfHouse(chart, 11)];
    const evidence = [];
    let str = 0;
    lords.forEach((l) => {
      const house = getHouseOfPlanet(chart, l);
      if (isDusthana(house)) {
        const lL = translatePlanet(l, lang);
        const ev = lang === "te" ? `\u0C27\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${lL} \u0C26\u0C41\u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 (6, 8, 12) ${house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0927\u0928 \u0938\u094D\u0935\u093E\u092E\u0940 ${lL} \u0926\u0941\u0938\u094D\u0925\u093E\u0928 (6, 8, 12) ${house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0BA4\u0BA9 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${lL} \u0BA4\u0BC1\u0BB8\u0BCD\u0BA4\u0BBE\u0BA9\u0BAE\u0BBE\u0BA9 ${house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0CA7\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${lL} \u0CA6\u0CC1\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CBE\u0CA6 ${house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Wealth lord ${l} is placed in dusthana house ${house}.`;
        evidence.push(ev);
        const pStr = calculateDignityStrength(chart.planets[l]?.dignity || "Neutral");
        str = Math.max(str, 100 - pStr);
      }
    });
    if (evidence.length > 0) {
      return { id: this.id, name: yName, detected: true, strength: str || 70, evidence, rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var GuruChandalRule = class {
  constructor() {
    this.id = "guru_chandal";
    this.name = "Guru Chandal Yoga";
    this.description = "Jupiter conjunct Rahu or Ketu.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C17\u0C41\u0C30\u0C41 \u0C1A\u0C02\u0C21\u0C3E\u0C32 \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0917\u0941\u0930\u0941 \u091A\u093E\u0902\u0921\u093E\u0932 \u092F\u094B\u0917" : lang === "ta" ? "\u0B95\u0BC1\u0BB0\u0BC1 \u0B9A\u0BA3\u0BCD\u0B9F\u0BBE\u0BB3 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0C97\u0CC1\u0CB0\u0CC1 \u0C9A\u0CBE\u0C82\u0CA1\u0CBE\u0CB2 \u0CAF\u0CCB\u0C97" : this.name;
    const ju = chart.planets["Jupiter"];
    if (!ju) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    const ra = chart.planets["Rahu"]?.house;
    const ke = chart.planets["Ketu"]?.house;
    const baseStr = 100 - calculateDignityStrength(ju.dignity);
    if (ju.house === ra) {
      const ev = lang === "te" ? `\u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C30\u0C3E\u0C39\u0C41\u0C35\u0C41\u0C24\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3F ${ju.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0917\u0941\u0930\u0941 \u0930\u093E\u0939\u0941 \u0915\u0947 \u0938\u093E\u0925 ${ju.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u092F\u0941\u0924\u093F \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964` : lang === "ta" ? `\u0B95\u0BC1\u0BB0\u0BC1 \u0BB0\u0BBE\u0B95\u0BC1\u0BB5\u0BC1\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1 ${ju.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0C97\u0CC1\u0CB0\u0CC1 \u0CB0\u0CBE\u0CB9\u0CC1\u0CB5\u0CBF\u0CA8\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0CB8\u0CC7\u0CB0\u0CBF ${ju.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Jupiter conjunct Rahu in House ${ju.house}.`;
      return { id: this.id, name: yName, detected: true, strength: baseStr, evidence: [ev], rule: this.ruleMetadata };
    }
    if (ju.house === ke) {
      const ev = lang === "te" ? `\u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C15\u0C47\u0C24\u0C41\u0C35\u0C41\u0C24\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3F ${ju.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0917\u0941\u0930\u0941 \u0915\u0947\u0924\u0941 \u0915\u0947 \u0938\u093E\u0925 ${ju.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u092F\u0941\u0924\u093F \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964` : lang === "ta" ? `\u0B95\u0BC1\u0BB0\u0BC1 \u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BC1\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1 ${ju.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0C97\u0CC1\u0CB0\u0CC1 \u0C95\u0CC7\u0CA4\u0CC1\u0CB5\u0CBF\u0CA8\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0CB8\u0CC7\u0CB0\u0CBF ${ju.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Jupiter conjunct Ketu in House ${ju.house}.`;
      return { id: this.id, name: yName, detected: true, strength: baseStr, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
var ShakataRule = class {
  constructor() {
    this.id = "shakata_yoga";
    this.name = "Shakata Yoga";
    this.description = "Moon in 6th or 8th from Jupiter.";
    this.ruleMetadata = { version: "Standard Classical", reference: "BPHS" };
  }
  detect(chart, lang) {
    const yName = lang === "te" ? "\u0C36\u0C15\u0C1F \u0C2F\u0C4B\u0C17\u0C02" : lang === "hi" ? "\u0936\u0915\u091F \u092F\u094B\u0917" : lang === "ta" ? "\u0B9A\u0B95\u0B9F \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CB6\u0C95\u0C9F \u0CAF\u0CCB\u0C97" : this.name;
    const moon = chart.planets["Moon"];
    const ju = chart.planets["Jupiter"];
    if (!moon || !ju) return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
    const dist = getHouseDistance(ju.house, moon.house);
    if (dist === 6 || dist === 8) {
      const moonStr = calculateDignityStrength(moon.dignity);
      const str = 100 - moonStr;
      const ev = lang === "te" ? `\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41 \u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F ${dist}\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0917\u0941\u0930\u0941 \u0938\u0947 ${dist}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD \u0B95\u0BC1\u0BB0\u0BC1\u0BB5\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${dist}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBF\u0CA8\u0CBF\u0C82\u0CA6 ${dist}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Moon is in house ${dist} from Jupiter.`;
      return { id: this.id, name: yName, detected: true, strength: str > 20 ? str : 50, evidence: [ev], rule: this.ruleMetadata };
    }
    return { id: this.id, name: yName, detected: false, strength: 0, evidence: [], rule: this.ruleMetadata };
  }
};
YogaEngine.registerRule(new GajaKesariRule());
YogaEngine.registerRule(new BudhaAdityaRule());
YogaEngine.registerRule(new ChandraMangalaRule());
YogaEngine.registerRule(new NeechaBhangaRajaRule());
YogaEngine.registerRule(new VipareetaRajaRule());
YogaEngine.registerRule(createMahapurushaRule("Mars", "Ruchaka"));
YogaEngine.registerRule(createMahapurushaRule("Mercury", "Bhadra"));
YogaEngine.registerRule(createMahapurushaRule("Jupiter", "Hamsa"));
YogaEngine.registerRule(createMahapurushaRule("Venus", "Malavya"));
YogaEngine.registerRule(createMahapurushaRule("Saturn", "Sasa"));
YogaEngine.registerRule(new DhanaYogaRule());
YogaEngine.registerRule(new RajaYogaRule());
YogaEngine.registerRule(new LakshmiYogaRule());
YogaEngine.registerRule(new AdhiYogaRule());
YogaEngine.registerRule(new KemadrumaRule());
YogaEngine.registerRule(new DaridraYogaRule());
YogaEngine.registerRule(new GuruChandalRule());
YogaEngine.registerRule(new ShakataRule());

// src/services/localizationService.ts
import * as fs from "fs";
import * as path from "path";
var LocalizationService = class {
  static {
    this.planets = null;
  }
  static {
    this.rasis = null;
  }
  static {
    this.nakshatras = null;
  }
  static loadJson(filename) {
    try {
      const filePath = path.resolve(process.cwd(), "src", "data", filename);
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error(`Failed to load localization file: ${filename}`, e);
      return {};
    }
  }
  static init() {
    if (!this.planets) this.planets = this.loadJson("planets.json");
    if (!this.rasis) this.rasis = this.loadJson("rasis.json");
    if (!this.nakshatras) this.nakshatras = this.loadJson("nakshatras.json");
  }
  /**
   * Safe getter that falls back to a dummy English string if not found.
   */
  static safeGet(dictionary, key, fallback) {
    if (!dictionary) this.init();
    const safeKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
    const match = dictionary[safeKey] || dictionary[key];
    if (match) return match;
    return {
      id: safeKey,
      name: { en: fallback }
    };
  }
  static getPlanet(name) {
    this.init();
    return this.safeGet(this.planets, name, name);
  }
  static getRasi(name) {
    this.init();
    return this.safeGet(this.rasis, name, name);
  }
  static getNakshatra(name) {
    this.init();
    return this.safeGet(this.nakshatras, name, name);
  }
};

// src/services/LocalizationEngine.ts
import fs2 from "fs";
import path2 from "path";
var MissingTranslationException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingTranslationException";
  }
};
var LocalizationIntegrityException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "LocalizationIntegrityException";
  }
};
var UnsupportedLanguageException = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UnsupportedLanguageException";
  }
};
var SUPPORTED_LANGUAGES = ["en", "te", "hi", "ta", "kn"];
var LocalizationEngine = class _LocalizationEngine {
  constructor() {
    this.dictionaries = {};
    this.loadDictionaries();
    this.validateIntegrity();
  }
  static getInstance() {
    if (!_LocalizationEngine.instance) {
      _LocalizationEngine.instance = new _LocalizationEngine();
    }
    return _LocalizationEngine.instance;
  }
  loadDictionaries() {
    for (const lang of SUPPORTED_LANGUAGES) {
      try {
        const filePath = path2.join(process.cwd(), "src/localization", `${lang}.json`);
        const data = fs2.readFileSync(filePath, "utf8");
        this.dictionaries[lang] = JSON.parse(data);
      } catch (err) {
        throw new LocalizationIntegrityException(`Failed to load dictionary for ${lang}: ${err}`);
      }
    }
  }
  validateIntegrity() {
    const enDict = this.dictionaries["en"];
    const checkKeys = (master, target, pathStr, lang) => {
      if (typeof master !== "object" || master === null) {
        if (typeof master !== typeof target) {
          throw new LocalizationIntegrityException(`Type mismatch at ${pathStr} in ${lang}. Expected ${typeof master}, got ${typeof target}`);
        }
        return;
      }
      const masterKeys = Object.keys(master).sort();
      const targetKeys = Object.keys(target || {}).sort();
      if (masterKeys.length !== targetKeys.length || !masterKeys.every((k, i) => k === targetKeys[i])) {
        const missing = masterKeys.filter((k) => !targetKeys.includes(k));
        const extra = targetKeys.filter((k) => !masterKeys.includes(k));
        throw new LocalizationIntegrityException(`Key mismatch in ${lang} at ${pathStr}. Missing: ${missing.join(",")}. Extra: ${extra.join(",")}`);
      }
      for (const k of masterKeys) {
        checkKeys(master[k], target[k], pathStr ? `${pathStr}.${k}` : k, lang);
      }
    };
    for (const lang of SUPPORTED_LANGUAGES) {
      if (lang === "en") continue;
      checkKeys(enDict, this.dictionaries[lang], "", lang);
    }
  }
  get(keyPath, lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      throw new UnsupportedLanguageException(`Language ${lang} is not supported.`);
    }
    const keys = keyPath.split(".");
    let current = this.dictionaries[lang];
    for (const k of keys) {
      if (current === void 0 || current === null || !(k in current)) {
        throw new MissingTranslationException(`Missing translation for key: ${keyPath} in language: ${lang}`);
      }
      current = current[k];
    }
    if (typeof current !== "string") {
      throw new MissingTranslationException(`Key ${keyPath} in language ${lang} does not resolve to a string.`);
    }
    return current;
  }
  getNormalizedInput(keyPath, input, lang) {
    const internalId = input.toUpperCase().replace(/\s+/g, "_");
    try {
      return this.get(`${keyPath}.${internalId}`, lang);
    } catch (e) {
      console.warn(`[LOCALIZATION WARNING] Missing translation for input: ${input} at ${keyPath}.${internalId}`);
      return input;
    }
  }
};

// src/services/astroLocalization.ts
var REC_TERMS = {
  en: {
    Compatible: "Compatible",
    CompatibleWithCaution: "Compatible With Caution",
    NeedsDetailedReview: "Needs Detailed Review",
    NotRecommended: "Not Recommended",
    expertReview: "This match requires review by an experienced astrologer due to specific doshas or low scores.",
    manglikMismatch: "Manglik Dosha mismatch (uncompensated)",
    rajjuPorutham: "Rajju Porutham",
    paapaScore: "Boy's Paapa Samyam score is {0}, Girl's is {1}. The malefic point difference is {2}.",
    lowScore: "Low Ashta Koota Score",
    failures: "{0} failed"
  },
  te: {
    Compatible: "\u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02",
    CompatibleWithCaution: "\u0C1C\u0C3E\u0C17\u0C4D\u0C30\u0C24\u0C4D\u0C24\u0C24\u0C4B \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02",
    NeedsDetailedReview: "\u0C38\u0C2E\u0C17\u0C4D\u0C30 \u0C2A\u0C30\u0C3F\u0C36\u0C40\u0C32\u0C28 \u0C05\u0C35\u0C38\u0C30\u0C02",
    NotRecommended: "\u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41",
    expertReview: "\u0C15\u0C4A\u0C28\u0C4D\u0C28\u0C3F \u0C26\u0C4B\u0C37\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C24\u0C15\u0C4D\u0C15\u0C41\u0C35 \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32 \u0C15\u0C3E\u0C30\u0C23\u0C02\u0C17\u0C3E \u0C08 \u0C1C\u0C3E\u0C24\u0C15\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C05\u0C28\u0C41\u0C2D\u0C35\u0C1C\u0C4D\u0C1E\u0C41\u0C32\u0C48\u0C28 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C41\u0C28\u0C3F\u0C24\u0C4B \u0C38\u0C2E\u0C40\u0C15\u0C4D\u0C37\u0C3F\u0C02\u0C1A\u0C21\u0C02 \u0C05\u0C35\u0C38\u0C30\u0C02.",
    manglikMismatch: "\u0C2E\u0C3E\u0C02\u0C17\u0C32\u0C3F\u0C15 \u0C26\u0C4B\u0C37\u0C02 \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41 (\u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C02 \u0C32\u0C47\u0C26\u0C41)",
    rajjuPorutham: "\u0C30\u0C1C\u0C4D\u0C1C\u0C41 \u0C2A\u0C4A\u0C02\u0C24\u0C28",
    paapaScore: "\u0C05\u0C2C\u0C4D\u0C2C\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2A \u0C38\u0C3E\u0C2E\u0C4D\u0C2F\u0C02 \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41 {0}, \u0C05\u0C2E\u0C4D\u0C2E\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41 {1}. \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F \u0C2A\u0C3E\u0C2A \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32 \u0C24\u0C47\u0C21\u0C3E {2}.",
    lowScore: "\u0C05\u0C37\u0C4D\u0C1F \u0C15\u0C42\u0C1F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41 \u0C24\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F",
    failures: "{0} \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41"
  },
  hi: {
    Compatible: "\u0905\u0928\u0941\u0915\u0942\u0932",
    CompatibleWithCaution: "\u0938\u093E\u0935\u0927\u093E\u0928\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0905\u0928\u0941\u0915\u0942\u0932",
    NeedsDetailedReview: "\u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948",
    NotRecommended: "\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0928\u0939\u0940\u0902",
    expertReview: "\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0926\u094B\u0937\u094B\u0902 \u092F\u093E \u0915\u092E \u0905\u0902\u0915\u094B\u0902 \u0915\u0947 \u0915\u093E\u0930\u0923 \u0907\u0938 \u092E\u093F\u0932\u093E\u0928 \u0915\u094B \u090F\u0915 \u0905\u0928\u0941\u092D\u0935\u0940 \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940 \u0926\u094D\u0935\u093E\u0930\u093E \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964",
    manglikMismatch: "\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u092C\u0947\u092E\u0947\u0932 (\u0905\u092A\u094D\u0930\u0924\u093F\u092A\u0942\u0930\u093F\u0924)",
    rajjuPorutham: "\u0930\u091C\u094D\u091C\u0941 \u092A\u094B\u0930\u0941\u0925\u092E",
    paapaScore: "\u0932\u0921\u093C\u0915\u0947 \u0915\u093E \u092A\u093E\u092A \u0938\u093E\u092E\u094D\u092F \u0905\u0902\u0915 {0} \u0939\u0948, \u0932\u0921\u093C\u0915\u0940 \u0915\u093E {1} \u0939\u0948\u0964 \u0905\u0936\u0941\u092D \u0905\u0902\u0915 \u0915\u093E \u0905\u0902\u0924\u0930 {2} \u0939\u0948\u0964",
    lowScore: "\u0915\u092E \u0905\u0937\u094D\u091F \u0915\u0942\u091F \u0905\u0902\u0915",
    failures: "{0} \u0935\u093F\u092B\u0932"
  },
  ta: {
    Compatible: "\u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    CompatibleWithCaution: "\u0B8E\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    NeedsDetailedReview: "\u0BB5\u0BBF\u0BB0\u0BBF\u0BB5\u0BBE\u0BA9 \u0B86\u0BAF\u0BCD\u0BB5\u0BC1 \u0BA4\u0BC7\u0BB5\u0BC8",
    NotRecommended: "\u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
    expertReview: "\u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BCD\u0B9F \u0BA4\u0BCB\u0BB7\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC1\u0BB1\u0BC8\u0BB5\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0BA3\u0BCD\u0B95\u0BB3\u0BBE\u0BB2\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B85\u0BA9\u0BC1\u0BAA\u0BB5\u0BAE\u0BCD \u0BB5\u0BBE\u0BAF\u0BCD\u0BA8\u0BCD\u0BA4 \u0B9C\u0BCB\u0BA4\u0BBF\u0B9F\u0BB0\u0BBE\u0BB2\u0BCD \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BBE\u0BAF\u0BCD\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD.",
    manglikMismatch: "\u0BAE\u0BBE\u0B99\u0BCD\u0B95\u0BB2\u0BCD\u0BAF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8 (\u0BA8\u0BBF\u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0B87\u0BB2\u0BCD\u0BB2\u0BC8)",
    rajjuPorutham: "\u0BB0\u0B9C\u0BCD\u0B9C\u0BC1 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    paapaScore: "\u0BAE\u0BA3\u0BAE\u0B95\u0BA9\u0BBF\u0BA9\u0BCD \u0BAA\u0BBE\u0BB5 \u0B9A\u0BBE\u0BAE\u0BCD\u0BAF\u0BAE\u0BCD \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0BA3\u0BCD {0}, \u0BAE\u0BA3\u0BAE\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 {1}. \u0BAA\u0BBE\u0BB5 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0BA3\u0BCD \u0BB5\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE\u0B9A\u0BAE\u0BCD {2}.",
    lowScore: "\u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4 \u0B85\u0BB7\u0BCD\u0B9F \u0B95\u0BC2\u0B9F \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0BA3\u0BCD",
    failures: "{0} \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8"
  },
  kn: {
    Compatible: "\u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6",
    CompatibleWithCaution: "\u0C8E\u0C9A\u0CCD\u0C9A\u0CB0\u0CBF\u0C95\u0CC6\u0CAF\u0CBF\u0C82\u0CA6 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6",
    NeedsDetailedReview: "\u0CB5\u0CBF\u0CB5\u0CB0\u0CB5\u0CBE\u0CA6 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CA8\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6",
    NotRecommended: "\u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2",
    expertReview: "\u0CA8\u0CBF\u0CB0\u0CCD\u0CA6\u0CBF\u0CB7\u0CCD\u0C9F \u0CA6\u0CCB\u0CB7\u0C97\u0CB3\u0CC1 \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CA1\u0CBF\u0CAE\u0CC6 \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CBF\u0C82\u0CA6\u0CBE\u0C97\u0CBF \u0C88 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CA8\u0CC1\u0CAD\u0CB5\u0CBF \u0C9C\u0CCD\u0CAF\u0CCB\u0CA4\u0CBF\u0CB7\u0CBF \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CAC\u0CC7\u0C95\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
    manglikMismatch: "\u0CAE\u0CBE\u0C82\u0C97\u0CB2\u0CBF\u0C95 \u0CA6\u0CCB\u0CB7 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2 (\u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2)",
    rajjuPorutham: "\u0CB0\u0C9C\u0CCD\u0C9C\u0CC1 \u0CAA\u0CCB\u0CB0\u0CC1\u0CA4\u0CAE\u0CCD",
    paapaScore: "\u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CA8 \u0CAA\u0CBE\u0CAA \u0CB8\u0CBE\u0CAE\u0CCD\u0CAF \u0C85\u0C82\u0C95 {0}, \u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CBF\u0CAF\u0CA6\u0CC1 {1}. \u0C85\u0CB6\u0CC1\u0CAD \u0C85\u0C82\u0C95\u0CA6 \u0CB5\u0CCD\u0CAF\u0CA4\u0CCD\u0CAF\u0CBE\u0CB8 {2}.",
    lowScore: "\u0C95\u0CA1\u0CBF\u0CAE\u0CC6 \u0C85\u0CB7\u0CCD\u0C9F \u0C95\u0CC2\u0C9F \u0C85\u0C82\u0C95",
    failures: "{0} \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2"
  }
};

// src/services/doshaEngine.ts
var DoshaEngine = class {
  static get rules() {
    return [
      new KujaDoshaRule(),
      new KalaSarpaDoshaRule(),
      new PitraDoshaRule(),
      new GrahanDoshaRule(),
      new ShaniDoshaRule()
    ];
  }
  static detectAllDoshas(chart, lang = "en") {
    return this.rules.map((rule) => rule.detect(chart, lang));
  }
};
var DOSHA_NAMES = {
  kuja_dosha: { en: "Kuja Dosha (Manglik)", te: "\u0C15\u0C41\u0C1C \u0C26\u0C4B\u0C37\u0C02 (\u0C2E\u0C3E\u0C02\u0C17\u0C32\u0C3F\u0C15\u0C4D)", hi: "\u0915\u0941\u091C \u0926\u094B\u0937 (\u092E\u093E\u0902\u0917\u0932\u093F\u0915)", ta: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD (\u0BAE\u0BBE\u0B99\u0BCD\u0B95\u0BB2\u0BCD\u0BAF\u0BAE\u0BCD)", kn: "\u0C95\u0CC1\u0C9C \u0CA6\u0CCB\u0CB7 (\u0CAE\u0CBE\u0C82\u0C97\u0CB2\u0CBF\u0C95)" },
  kala_sarpa: { en: "Kala Sarpa Dosha", te: "\u0C15\u0C3E\u0C32 \u0C38\u0C30\u0C4D\u0C2A \u0C26\u0C4B\u0C37\u0C02", hi: "\u0915\u093E\u0932 \u0938\u0930\u094D\u092A \u0926\u094B\u0937", ta: "\u0B95\u0BBE\u0BB2 \u0B9A\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD", kn: "\u0C95\u0CBE\u0CB2 \u0CB8\u0CB0\u0CCD\u0CAA \u0CA6\u0CCB\u0CB7" },
  pitra_dosha: { en: "Pitra Dosha", te: "\u0C2A\u0C3F\u0C24\u0C43 \u0C26\u0C4B\u0C37\u0C02", hi: "\u092A\u093F\u0924\u0943 \u0926\u094B\u0937", ta: "\u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD", kn: "\u0CAA\u0CBF\u0CA4\u0CC3 \u0CA6\u0CCB\u0CB7" },
  grahan_dosha: { en: "Grahan Dosha", te: "\u0C17\u0C4D\u0C30\u0C39\u0C23 \u0C26\u0C4B\u0C37\u0C02", hi: "\u0917\u094D\u0930\u0939\u0923 \u0926\u094B\u0937", ta: "\u0B95\u0BBF\u0BB0\u0B95\u0BA3 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD", kn: "\u0C97\u0CCD\u0CB0\u0CB9\u0CA3 \u0CA6\u0CCB\u0CB7" },
  shani_dosha: { en: "Shani Dosha", te: "\u0C36\u0C28\u0C3F \u0C26\u0C4B\u0C37\u0C02", hi: "\u0936\u0928\u093F \u0926\u094B\u0937", ta: "\u0B9A\u0BA9\u0BBF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD", kn: "\u0CB6\u0CA8\u0CBF \u0CA6\u0CCB\u0CB7" }
};
function getDoshaName(id, lang) {
  return DOSHA_NAMES[id]?.[lang] || DOSHA_NAMES[id]?.en || id;
}
var KujaDoshaRule = class {
  constructor() {
    this.id = "kuja_dosha";
    this.name = "Kuja Dosha (Manglik)";
    this.description = "Mars placed in 1st, 2nd, 4th, 7th, 8th, or 12th house from Ascendant.";
  }
  detect(chart, lang) {
    const mars = chart.planets["Mars"];
    const jupiter = chart.planets["Jupiter"];
    const doshaName = getDoshaName(this.id, lang);
    if (!mars) return this.negativeResult(lang);
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    let detected = manglikHouses.includes(mars.house);
    let cancellation = false;
    let severity = detected ? 100 : 0;
    const evidence = [];
    const remedies = [];
    const mL = translatePlanet("Mars", lang);
    if (detected) {
      evidence.push(lang === "te" ? `${mL} ${mars.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${mL} ${mars.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${mL} ${mars.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${mL} ${mars.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Mars is placed in house ${mars.house}.`);
      if (mars.dignity === "Own") {
        cancellation = true;
        evidence.push(lang === "te" ? "\u0C30\u0C26\u0C4D\u0C26\u0C41: \u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41 \u0C38\u0C4D\u0C35\u0C17\u0C43\u0C39\u0C02\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u0928\u093F\u0930\u0938\u094D\u0924: \u092E\u0902\u0917\u0932 \u0938\u094D\u0935\u0930\u093E\u0936\u093F \u092E\u0947\u0902 \u0939\u0948\u0964" : lang === "ta" ? "\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1: \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0B9A\u0BCA\u0BA8\u0BCD\u0BA4 \u0BB0\u0BBE\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1: \u0CAE\u0C82\u0C97\u0CB3 \u0CB8\u0CCD\u0CB5\u0C97\u0CC3\u0CB9\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6." : "Cancellation: Mars is in its own sign.");
      }
      const jupAspecting = chart.aspects.some((a) => a.aspectingPlanet === "Jupiter" && a.aspectedPlanet === "Mars");
      if (jupAspecting) {
        cancellation = true;
        const jL = translatePlanet("Jupiter", lang);
        evidence.push(lang === "te" ? `\u0C30\u0C26\u0C4D\u0C26\u0C41: ${jL} ${mL}\u0C28\u0C41 \u0C1A\u0C42\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0928\u093F\u0930\u0938\u094D\u0924: ${jL} ${mL} \u0915\u094B \u0926\u0947\u0916 \u0930\u0939\u093E \u0939\u0948\u0964` : lang === "ta" ? `\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1: ${jL} ${mL}\u0B90 \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1: ${jL} ${mL}\u0CA8\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CCB\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Cancellation: Jupiter is aspecting Mars.");
      }
      if (mars.dignity === "Exalted") {
        cancellation = true;
        evidence.push(lang === "te" ? "\u0C30\u0C26\u0C4D\u0C26\u0C41: \u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41 \u0C09\u0C1A\u0C4D\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u0928\u093F\u0930\u0938\u094D\u0924: \u092E\u0902\u0917\u0932 \u0909\u091A\u094D\u091A \u0930\u093E\u0936\u093F \u092E\u0947\u0902 \u0939\u0948\u0964" : lang === "ta" ? "\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1: \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0B89\u0B9A\u0BCD\u0B9A \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1: \u0CAE\u0C82\u0C97\u0CB3 \u0C89\u0C9A\u0CCD\u0C9A \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6." : "Cancellation: Mars is exalted.");
      }
      if (cancellation) {
        severity = 20;
      } else {
        remedies.push(lang === "te" ? "\u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C15\u0C41\u0C02\u0C2D \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C41\u0C1C \u0C36\u0C3E\u0C02\u0C24\u0C3F \u0C39\u0C4B\u0C2E\u0C02 \u0C38\u0C3E\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3E\u0C2F\u0C15\u0C02\u0C17\u0C3E \u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0935\u093F\u0935\u093E\u0939 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u0941\u0902\u092D \u0935\u093F\u0935\u093E\u0939 \u092F\u093E \u0915\u0941\u091C \u0936\u093E\u0902\u0924\u093F \u0939\u094B\u092E\u092E \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BCD\u0BAA \u0BB5\u0BBF\u0BB5\u0BBE\u0B95\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC1\u0B9C \u0B9A\u0BBE\u0BA8\u0BCD\u0BA4\u0BBF \u0BB9\u0BCB\u0BAE\u0BAE\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0C97\u0CC6 \u0CAE\u0CC1\u0CA8\u0CCD\u0CA8 \u0C95\u0CC1\u0C82\u0CAD \u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CC1\u0C9C \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0CB9\u0CCB\u0CAE \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6." : "Kumbha Vivaham or specific Mars (Kuja) shanti homam is traditionally recommended before marriage.");
      }
    }
    return { id: this.id, name: doshaName, detected, severity, cancellation, evidence, remedies };
  }
  negativeResult(lang) {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
};
var KalaSarpaDoshaRule = class {
  constructor() {
    this.id = "kala_sarpa";
    this.name = "Kala Sarpa Dosha";
    this.description = "All seven physical planets are hemmed between Rahu and Ketu.";
  }
  detect(chart, lang) {
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    if (!rahu || !ketu) return this.negativeResult(lang);
    const others = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].map((p) => chart.planets[p]);
    let r1 = rahu.longitude;
    let allBetweenRahuKetu = true;
    let allBetweenKetuRahu = true;
    for (const p of others) {
      if (!p) continue;
      let diffRahu = (p.longitude - r1 + 360) % 360;
      if (diffRahu > 180) allBetweenRahuKetu = false;
      if (diffRahu < 180) allBetweenKetuRahu = false;
    }
    const detected = allBetweenRahuKetu || allBetweenKetuRahu;
    let cancellation = false;
    let severity = detected ? 100 : 0;
    const evidence = [];
    const remedies = [];
    if (detected) {
      evidence.push(lang === "te" ? "\u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C30\u0C3E\u0C39\u0C41-\u0C15\u0C47\u0C24\u0C41 \u0C05\u0C15\u0C4D\u0C37\u0C02 \u0C2E\u0C27\u0C4D\u0C2F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F." : lang === "hi" ? "\u0938\u092D\u0940 \u0917\u094D\u0930\u0939 \u0930\u093E\u0939\u0941-\u0915\u0947\u0924\u0941 \u0905\u0915\u094D\u0937 \u0915\u0947 \u092C\u0940\u091A \u0939\u0948\u0902\u0964" : lang === "ta" ? "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BB0\u0BBE\u0B95\u0BC1-\u0B95\u0BC7\u0BA4\u0BC1 \u0B85\u0B9A\u0BCD\u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA9." : lang === "kn" ? "\u0C8E\u0CB2\u0CCD\u0CB2 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CC1 \u0CB0\u0CBE\u0CB9\u0CC1-\u0C95\u0CC7\u0CA4\u0CC1 \u0C85\u0C95\u0CCD\u0CB7\u0CA6 \u0CA8\u0CA1\u0CC1\u0CB5\u0CC6 \u0C87\u0CB5\u0CC6." : "All physical planets are hemmed between Rahu and Ketu axis.");
      remedies.push(lang === "te" ? "\u0C36\u0C4D\u0C30\u0C40 \u0C15\u0C3E\u0C33\u0C39\u0C38\u0C4D\u0C24\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C24\u0C4D\u0C30\u0C2F\u0C02\u0C2C\u0C15\u0C47\u0C36\u0C4D\u0C35\u0C30\u0C4D\u200C\u0C32\u0C4B \u0C15\u0C3E\u0C32 \u0C38\u0C30\u0C4D\u0C2A \u0C36\u0C3E\u0C02\u0C24\u0C3F \u0C2A\u0C42\u0C1C \u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41." : lang === "hi" ? "\u0936\u094D\u0930\u0940 \u0915\u093E\u0932\u0939\u0938\u094D\u0924\u0940 \u092F\u093E \u0924\u094D\u0930\u094D\u092F\u0902\u092C\u0915\u0947\u0936\u094D\u0935\u0930 \u092E\u0947\u0902 \u0915\u093E\u0932 \u0938\u0930\u094D\u092A \u0936\u093E\u0902\u0924\u093F \u092A\u0942\u091C\u093E \u0915\u0940 \u0938\u0932\u093E\u0939\u0964" : lang === "ta" ? "\u0BB8\u0BCD\u0BB0\u0BC0 \u0B95\u0BBE\u0BB3\u0BB9\u0BB8\u0BCD\u0BA4\u0BBF \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BBF\u0BB0\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0B95\u0BC7\u0BB8\u0BCD\u0BB5\u0BB0\u0BB0\u0BCD \u0B95\u0BCB\u0BB5\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0B95\u0BBE\u0BB2 \u0B9A\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA \u0B9A\u0BBE\u0BA8\u0BCD\u0BA4\u0BBF \u0BAA\u0BC2\u0B9C\u0BC8 \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8." : lang === "kn" ? "\u0CB6\u0CCD\u0CB0\u0CC0 \u0C95\u0CBE\u0CB3\u0CB9\u0CB8\u0CCD\u0CA4\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CA4\u0CCD\u0CB0\u0CAF\u0C82\u0CAC\u0C95\u0CC7\u0CB6\u0CCD\u0CB5\u0CB0\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CBE\u0CB2 \u0CB8\u0CB0\u0CCD\u0CAA \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0CAA\u0CC2\u0C9C\u0CC6 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1." : "Kala Sarpa shanti pooja at Sri Kalahasti or Trimbakeshwar is traditionally recommended.");
    }
    return { id: this.id, name: doshaName, detected, severity, cancellation, evidence, remedies };
  }
  negativeResult(lang) {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
};
var PitraDoshaRule = class {
  constructor() {
    this.id = "pitra_dosha";
    this.name = "Pitra Dosha";
    this.description = "Sun or 9th lord under severe affliction by Rahu/Ketu.";
  }
  detect(chart, lang) {
    const sun = chart.planets["Sun"];
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    if (!sun || !rahu || !ketu) return this.negativeResult(lang);
    const sunRahuConj = sun.house === rahu.house;
    const sunKetuConj = sun.house === ketu.house;
    const detected = sunRahuConj || sunKetuConj;
    const evidence = [];
    const sL = translatePlanet("Sun", lang);
    const rL = translatePlanet("Rahu", lang);
    const kL = translatePlanet("Ketu", lang);
    if (sunRahuConj) evidence.push(lang === "te" ? `${sL} ${rL}\u0C24\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${sL} ${rL} \u0915\u0947 \u0938\u093E\u0925 \u092F\u0941\u0924\u093F \u0939\u0948\u0964` : lang === "ta" ? `${sL} ${rL}\u0B89\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${sL} ${rL} \u0C9C\u0CCA\u0CA4\u0CC6 \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Sun is conjunct Rahu.");
    if (sunKetuConj) evidence.push(lang === "te" ? `${sL} ${kL}\u0C24\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${sL} ${kL} \u0915\u0947 \u0938\u093E\u0925 \u092F\u0941\u0924\u093F \u0939\u0948\u0964` : lang === "ta" ? `${sL} ${kL}\u0B89\u0B9F\u0BA9\u0BCD \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${sL} ${kL} \u0C9C\u0CCA\u0CA4\u0CC6 \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Sun is conjunct Ketu.");
    return {
      id: this.id,
      name: doshaName,
      detected,
      severity: detected ? 80 : 0,
      cancellation: false,
      evidence,
      remedies: detected ? [lang === "te" ? "\u0C2A\u0C3F\u0C24\u0C43 \u0C24\u0C30\u0C4D\u0C2A\u0C23\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F, \u0C2E\u0C41\u0C16\u0C4D\u0C2F\u0C02\u0C17\u0C3E \u0C05\u0C2E\u0C3E\u0C35\u0C3E\u0C38\u0C4D\u0C2F \u0C30\u0C4B\u0C1C\u0C41\u0C32\u0C4D\u0C32\u0C4B." : lang === "hi" ? "\u092A\u093F\u0924\u0943 \u0924\u0930\u094D\u092A\u0923 \u0915\u0930\u0947\u0902, \u0935\u093F\u0936\u0947\u0937\u0915\u0930 \u0905\u092E\u093E\u0935\u0938\u094D\u092F\u093E \u0915\u0947 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902\u0964" : lang === "ta" ? "\u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0BA4\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BA3\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B85\u0BAE\u0BBE\u0BB5\u0BBE\u0B9A\u0BC8 \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD." : lang === "kn" ? "\u0CAA\u0CBF\u0CA4\u0CC3 \u0CA4\u0CB0\u0CCD\u0CAA\u0CA3 \u0CAE\u0CBE\u0CA1\u0CBF, \u0CB5\u0CBF\u0CB6\u0CC7\u0CB7\u0CB5\u0CBE\u0C97\u0CBF \u0C85\u0CAE\u0CBE\u0CB5\u0CBE\u0CB8\u0CCD\u0CAF\u0CC6 \u0CA6\u0CBF\u0CA8\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF." : "Perform Pitru Tarpanam, especially on Amavasya days."] : []
    };
  }
  negativeResult(lang) {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
};
var GrahanDoshaRule = class {
  constructor() {
    this.id = "grahan_dosha";
    this.name = "Grahan Dosha";
    this.description = "Sun or Moon conjunct Rahu or Ketu.";
  }
  detect(chart, lang) {
    const sun = chart.planets["Sun"];
    const moon = chart.planets["Moon"];
    const rahu = chart.planets["Rahu"];
    const ketu = chart.planets["Ketu"];
    const doshaName = getDoshaName(this.id, lang);
    if (!sun || !moon || !rahu || !ketu) return this.negativeResult(lang);
    const sunAffliction = sun.house === rahu.house || sun.house === ketu.house;
    const moonAffliction = moon.house === rahu.house || moon.house === ketu.house;
    const detected = sunAffliction || moonAffliction;
    const evidence = [];
    const sL = translatePlanet("Sun", lang);
    const mL = translatePlanet("Moon", lang);
    if (sunAffliction) evidence.push(lang === "te" ? `${sL} \u0C28\u0C4B\u0C21\u0C4D\u200C\u0C32 \u0C35\u0C32\u0C4D\u0C32 \u0C2A\u0C40\u0C21\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${sL} \u0930\u093E\u0939\u0941/\u0915\u0947\u0924\u0941 \u0938\u0947 \u092A\u0940\u0921\u093C\u093F\u0924 \u0939\u0948\u0964` : lang === "ta" ? `${sL} \u0BB0\u0BBE\u0B95\u0BC1/\u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BBE\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${sL} \u0CB0\u0CBE\u0CB9\u0CC1/\u0C95\u0CC7\u0CA4\u0CC1\u0CB5\u0CBF\u0CA8\u0CBF\u0C82\u0CA6 \u0CAA\u0CC0\u0CA1\u0CBF\u0CA4\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Sun is afflicted by Nodes.");
    if (moonAffliction) evidence.push(lang === "te" ? `${mL} \u0C28\u0C4B\u0C21\u0C4D\u200C\u0C32 \u0C35\u0C32\u0C4D\u0C32 \u0C2A\u0C40\u0C21\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${mL} \u0930\u093E\u0939\u0941/\u0915\u0947\u0924\u0941 \u0938\u0947 \u092A\u0940\u0921\u093C\u093F\u0924 \u0939\u0948\u0964` : lang === "ta" ? `${mL} \u0BB0\u0BBE\u0B95\u0BC1/\u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BBE\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${mL} \u0CB0\u0CBE\u0CB9\u0CC1/\u0C95\u0CC7\u0CA4\u0CC1\u0CB5\u0CBF\u0CA8\u0CBF\u0C82\u0CA6 \u0CAA\u0CC0\u0CA1\u0CBF\u0CA4\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Moon is afflicted by Nodes.");
    return {
      id: this.id,
      name: doshaName,
      detected,
      severity: detected ? 70 : 0,
      cancellation: false,
      evidence,
      remedies: detected ? [lang === "te" ? "\u0C36\u0C3F\u0C35\u0C41\u0C28\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C28\u0C3F \u0C06\u0C30\u0C3E\u0C27\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F, \u0C2A\u0C47\u0C26\u0C32\u0C15\u0C41 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F." : lang === "hi" ? "\u0936\u093F\u0935 \u092F\u093E \u0938\u0942\u0930\u094D\u092F \u0915\u0940 \u092A\u0942\u091C\u093E \u0915\u0930\u0947\u0902, \u091C\u0930\u0942\u0930\u0924\u092E\u0902\u0926\u094B\u0902 \u0915\u094B \u0926\u093E\u0928 \u0915\u0930\u0947\u0902\u0964" : lang === "ta" ? "\u0B9A\u0BBF\u0BB5\u0BA9\u0BC8\u0BAF\u0BCB \u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BC8\u0BAF\u0BCB \u0BB5\u0BB4\u0BBF\u0BAA\u0B9F\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B8F\u0BB4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD." : lang === "kn" ? "\u0CB6\u0CBF\u0CB5 \u0C85\u0CA5\u0CB5\u0CBE \u0CB8\u0CC2\u0CB0\u0CCD\u0CAF\u0CA8\u0CA8\u0CCD\u0CA8\u0CC1 \u0C86\u0CB0\u0CBE\u0CA7\u0CBF\u0CB8\u0CBF, \u0CAC\u0CA1\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF." : "Worship Shiva or Surya, and donate to the needy."] : []
    };
  }
  negativeResult(lang) {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
};
var ShaniDoshaRule = class {
  constructor() {
    this.id = "shani_dosha";
    this.name = "Shani Dosha";
    this.description = "Saturn in debilitation (Aries) or enemy signs with affliction.";
  }
  detect(chart, lang) {
    const saturn = chart.planets["Saturn"];
    const doshaName = getDoshaName(this.id, lang);
    if (!saturn) return this.negativeResult(lang);
    const detected = saturn.dignity === "Debilitated";
    const evidence = [];
    const satL = translatePlanet("Saturn", lang);
    if (detected) evidence.push(lang === "te" ? `${satL} \u0C2E\u0C47\u0C37\u0C02\u0C32\u0C4B \u0C28\u0C40\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${satL} \u092E\u0947\u0937 \u092E\u0947\u0902 \u0928\u0940\u091A \u0939\u0948\u0964` : lang === "ta" ? `${satL} \u0BAE\u0BC7\u0BB7\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA8\u0BC0\u0B9A\u0BAE\u0BCD \u0B85\u0B9F\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${satL} \u0CAE\u0CC7\u0CB7\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CA8\u0CC0\u0C9A\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : "Saturn is debilitated in Aries.");
    return {
      id: this.id,
      name: doshaName,
      detected,
      severity: detected ? 60 : 0,
      cancellation: false,
      evidence,
      remedies: detected ? [lang === "te" ? "\u0C39\u0C28\u0C41\u0C2E\u0C02\u0C24\u0C41\u0C28\u0C3F \u0C06\u0C30\u0C3E\u0C27\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F, \u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C28\u0C41\u0C35\u0C4D\u0C35\u0C41\u0C32 \u0C28\u0C42\u0C28\u0C46 \u0C38\u0C2E\u0C30\u0C4D\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F." : lang === "hi" ? "\u0939\u0928\u0941\u092E\u093E\u0928 \u0915\u0940 \u092A\u0942\u091C\u093E \u0915\u0930\u0947\u0902, \u0936\u0928\u093F\u0935\u093E\u0930 \u0915\u094B \u0924\u093F\u0932 \u0915\u093E \u0924\u0947\u0932 \u091A\u0922\u093C\u093E\u090F\u0902\u0964" : lang === "ta" ? "\u0BB9\u0BA9\u0BC1\u0BAE\u0BBE\u0BA9\u0BC8 \u0BB5\u0BB4\u0BBF\u0BAA\u0B9F\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B8E\u0BB3\u0BCD \u0B8E\u0BA3\u0BCD\u0BA3\u0BC6\u0BAF\u0BCD \u0B9A\u0BAE\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD." : lang === "kn" ? "\u0CB9\u0CA8\u0CC1\u0CAE\u0C82\u0CA4\u0CA8\u0CA8\u0CCD\u0CA8\u0CC1 \u0C86\u0CB0\u0CBE\u0CA7\u0CBF\u0CB8\u0CBF, \u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0 \u0C8E\u0CB3\u0CCD\u0CB3\u0CC6\u0CA3\u0CCD\u0CA3\u0CC6 \u0C85\u0CB0\u0CCD\u0CAA\u0CBF\u0CB8\u0CBF." : "Worship Hanuman, offer sesame oil on Saturdays."] : []
    };
  }
  negativeResult(lang) {
    return { id: this.id, name: getDoshaName(this.id, lang), detected: false, severity: 0, cancellation: false, evidence: [], remedies: [] };
  }
};

// src/services/dashaEngine.ts
var DashaEngine = class {
  static {
    this.VIMSHOTTARI_YEARS = {
      ketu: 7,
      venus: 20,
      sun: 6,
      moon: 10,
      mars: 7,
      rahu: 18,
      jupiter: 16,
      saturn: 19,
      mercury: 17
    };
  }
  static {
    this.DASHA_SEQUENCE = [
      "ketu",
      "venus",
      "sun",
      "moon",
      "mars",
      "rahu",
      "jupiter",
      "saturn",
      "mercury"
    ];
  }
  static {
    this.SOLAR_YEAR_DAYS = 365.2425;
  }
  static {
    this.TOTAL_CYCLE_YEARS = 120;
  }
  /**
   * Calculates the Vimshottari Dasha timeline based on the Moon's longitude.
   * Deterministic: accepts targetDate to compute 'current' without relying on Date.now().
   */
  static calculateVimshottari(moonLongitude, birthDateISO, targetDateISO) {
    const NAKSHATRA_ARC = 13 + 1 / 3;
    const exactNakshatra = moonLongitude / NAKSHATRA_ARC;
    const nakIndex = Math.floor(exactNakshatra);
    const fractionTraversed = exactNakshatra - nakIndex;
    const fractionRemaining = 1 - fractionTraversed;
    const startingLordIndex = nakIndex % 9;
    const startingLordId = this.DASHA_SEQUENCE[startingLordIndex];
    const startingLordTotalYears = this.VIMSHOTTARI_YEARS[startingLordId];
    const birthBalanceYears = fractionRemaining * startingLordTotalYears;
    const timeline = this.buildTimeline(startingLordIndex, birthDateISO, birthBalanceYears, startingLordTotalYears);
    const current = this.findCurrentPeriods(timeline, targetDateISO);
    return {
      birthBalance: {
        lord: LocalizationService.getPlanet(startingLordId),
        yearsRemaining: Number(birthBalanceYears.toFixed(4))
      },
      current,
      timeline
    };
  }
  static buildTimeline(startingLordIdx, birthDateISO, balanceYears, firstLordTotalYears) {
    const timeline = [];
    const birthDate = new Date(birthDateISO);
    let currentStartTime = birthDate.getTime();
    for (let i = 0; i < 9; i++) {
      const lordIdx = (startingLordIdx + i) % 9;
      const lordId = this.DASHA_SEQUENCE[lordIdx];
      const lordTotalYears = this.VIMSHOTTARI_YEARS[lordId];
      const actualDuration = i === 0 ? balanceYears : lordTotalYears;
      const durationMs = actualDuration * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3;
      const endTime = currentStartTime + durationMs;
      const antardashas = this.buildSubPeriods(lordId, lordId, new Date(currentStartTime), actualDuration, lordTotalYears, i === 0);
      timeline.push({
        lord: LocalizationService.getPlanet(lordId),
        startDate: new Date(currentStartTime).toISOString(),
        endDate: new Date(endTime).toISOString(),
        durationYears: Number(actualDuration.toFixed(4)),
        subPeriods: antardashas
      });
      currentStartTime = endTime;
    }
    return timeline;
  }
  static buildSubPeriods(mahaLordId, startSubLordId, startDate, actualDurationYears, fullMahaYears, isBirthMaha) {
    const subs = [];
    let currentTime = startDate.getTime();
    const mahaLordIdx = this.DASHA_SEQUENCE.indexOf(mahaLordId);
    let subLordIdx = this.DASHA_SEQUENCE.indexOf(startSubLordId);
    const elapsedMahaYears = fullMahaYears - actualDurationYears;
    let simulatedStartTime = startDate.getTime() - elapsedMahaYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3;
    for (let i = 0; i < 9; i++) {
      const currentSubLordId = this.DASHA_SEQUENCE[(mahaLordIdx + i) % 9];
      const subLordTotalYears = this.VIMSHOTTARI_YEARS[currentSubLordId];
      const fullSubDurationYears = fullMahaYears * subLordTotalYears / this.TOTAL_CYCLE_YEARS;
      const fullSubDurationMs = fullSubDurationYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3;
      const simulatedEndTime = simulatedStartTime + fullSubDurationMs;
      if (simulatedEndTime <= startDate.getTime()) {
        simulatedStartTime = simulatedEndTime;
        continue;
      }
      const actualSubStart = Math.max(simulatedStartTime, startDate.getTime());
      const actualSubDurationMs = simulatedEndTime - actualSubStart;
      const actualSubDurationYears = actualSubDurationMs / (this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3);
      const pratyantardashas = this.buildPratyantarPeriods(
        currentSubLordId,
        new Date(actualSubStart),
        actualSubDurationYears,
        fullSubDurationYears
      );
      subs.push({
        lord: LocalizationService.getPlanet(currentSubLordId),
        startDate: new Date(actualSubStart).toISOString(),
        endDate: new Date(simulatedEndTime).toISOString(),
        durationYears: Number(actualSubDurationYears.toFixed(4)),
        subPeriods: pratyantardashas
      });
      simulatedStartTime = simulatedEndTime;
    }
    return subs;
  }
  static buildPratyantarPeriods(antarLordId, startDate, actualDurationYears, fullAntarYears) {
    const pratyantaras = [];
    let simulatedStartTime = startDate.getTime() - (fullAntarYears - actualDurationYears) * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3;
    const antarLordIdx = this.DASHA_SEQUENCE.indexOf(antarLordId);
    for (let i = 0; i < 9; i++) {
      const pratyaLordId = this.DASHA_SEQUENCE[(antarLordIdx + i) % 9];
      const pratyaLordTotalYears = this.VIMSHOTTARI_YEARS[pratyaLordId];
      const fullPratyaDurationYears = fullAntarYears * pratyaLordTotalYears / this.TOTAL_CYCLE_YEARS;
      const fullPratyaDurationMs = fullPratyaDurationYears * this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3;
      const simulatedEndTime = simulatedStartTime + fullPratyaDurationMs;
      if (simulatedEndTime <= startDate.getTime()) {
        simulatedStartTime = simulatedEndTime;
        continue;
      }
      const actualStart = Math.max(simulatedStartTime, startDate.getTime());
      const actualDurationMs = simulatedEndTime - actualStart;
      pratyantaras.push({
        lord: LocalizationService.getPlanet(pratyaLordId),
        startDate: new Date(actualStart).toISOString(),
        endDate: new Date(simulatedEndTime).toISOString(),
        durationYears: Number((actualDurationMs / (this.SOLAR_YEAR_DAYS * 24 * 60 * 60 * 1e3)).toFixed(4))
      });
      simulatedStartTime = simulatedEndTime;
    }
    return pratyantaras;
  }
  static findCurrentPeriods(timeline, targetDateISO) {
    const target = new Date(targetDateISO).getTime();
    const maha = timeline.find((t) => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);
    if (!maha) return null;
    const antar = maha.subPeriods?.find((t) => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);
    const pratya = antar?.subPeriods?.find((t) => new Date(t.startDate).getTime() <= target && new Date(t.endDate).getTime() >= target);
    return {
      mahadasha: maha.lord,
      antardasha: antar?.lord || maha.lord,
      pratyantardasha: pratya?.lord || maha.lord
    };
  }
};

// src/services/interpretationEngine.ts
var InterpretationEngine = class {
  static generateInterpretation(chart, yogas, lang) {
    return {
      personality: this.generatePersonality(chart, yogas, lang),
      career: this.generateCareer(chart, yogas, lang),
      education: this.generateEducation(chart, yogas, lang),
      finance: this.generateFinance(chart, yogas, lang),
      relationships: this.generateRelationships(chart, yogas, lang),
      health: this.generateHealth(chart, yogas, lang),
      spirituality: this.generateSpirituality(chart, yogas, lang),
      strengths: this.generateStrengths(yogas, lang),
      challenges: this.generateChallenges(yogas, lang),
      remedies: this.generateRemedies(chart, yogas, lang)
    };
  }
  // --- Category Generators ---
  static generatePersonality(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const signL = translateRashi(chart.ascendant.signName, lang);
    const lordL = translatePlanet(chart.ascendant.lord, lang);
    observations.push(lang === "te" ? `\u0C32\u0C17\u0C4D\u0C28\u0C02 ${signL}, \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${lordL}.` : lang === "hi" ? `\u0932\u0917\u094D\u0928 ${signL} \u0939\u0948, \u0938\u094D\u0935\u093E\u092E\u0940 ${lordL} \u0939\u0948\u0964` : lang === "ta" ? `\u0BB2\u0B95\u0BCD\u0BA9\u0BAE\u0BCD ${signL}, \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${lordL}.` : lang === "kn" ? `\u0CB2\u0C97\u0CCD\u0CA8 ${signL}, \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${lordL}.` : `Ascendant is ${signL}, ruled by ${lordL}.`);
    interpretations.push(lang === "te" ? `\u0C38\u0C39\u0C1C\u0C02\u0C17\u0C3E ${lordL} \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C02 \u0C0E\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0938\u094D\u0935\u092D\u093E\u0935 \u092E\u0947\u0902 ${lordL} \u0915\u093E \u092A\u094D\u0930\u092D\u093E\u0935 \u0905\u0927\u093F\u0915 \u0939\u0948\u0964` : lang === "ta" ? `\u0B87\u0BAF\u0BB2\u0BCD\u0BAA\u0BBE\u0B95\u0BB5\u0BC7 ${lordL} \u0BA4\u0BBE\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BAE\u0BCD.` : lang === "kn" ? `\u0CB8\u0CCD\u0CB5\u0CAD\u0CBE\u0CB5\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF ${lordL} \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CC1.` : `Traditionally associated with a core nature that is strongly influenced by ${lordL}.`);
    const lagnaLord = chart.planets[chart.ascendant.lord];
    if (lagnaLord) {
      const llRasi = translateRashi(lagnaLord.rasi.name.en, lang);
      observations.push(lang === "te" ? `\u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${lordL} ${lagnaLord.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B (${llRasi}) \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0932\u0917\u094D\u0928\u0947\u0936 ${lordL} ${lagnaLord.house}\u0935\u0947\u0902 \u092D\u093E\u0935 (${llRasi}) \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${lordL} ${lagnaLord.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD (${llRasi}) \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${lordL} ${lagnaLord.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (${llRasi}).` : `Ascendant lord ${lordL} is in house ${lagnaLord.house} (${llRasi}).`);
      if (lagnaLord.dignity === "Exalted" || lagnaLord.dignity === "Own") {
        score += 20;
        interpretations.push(lang === "te" ? "\u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C06\u0C24\u0C4D\u0C2E\u0C35\u0C3F\u0C36\u0C4D\u0C35\u0C3E\u0C38\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u092E\u091C\u092C\u0942\u0924 \u0932\u0917\u094D\u0928\u0947\u0936 \u0906\u0924\u094D\u092E\u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u0926\u0947\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF \u0BA4\u0BA9\u0BCD\u0BA9\u0BAE\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0CAC\u0CB2\u0CB5\u0CBE\u0CA6 \u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF \u0C86\u0CA4\u0CCD\u0CAE\u0CB5\u0CBF\u0CB6\u0CCD\u0CB5\u0CBE\u0CB8\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CC0\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "A strongly placed Ascendant lord generally suggests vitality, confidence, and self-reliance.");
      } else if (lagnaLord.dignity === "Debilitated") {
        score -= 20;
        interpretations.push(lang === "te" ? "\u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C28\u0C40\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F \u0C06\u0C24\u0C4D\u0C2E\u0C35\u0C3F\u0C36\u0C4D\u0C35\u0C3E\u0C38 \u0C32\u0C4B\u0C2A\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0932\u0917\u094D\u0928\u0947\u0936 \u0915\u0940 \u0928\u0940\u091A \u0938\u094D\u0925\u093F\u0924\u093F \u0906\u0924\u094D\u092E\u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u092E\u0947\u0902 \u0915\u092E\u0940 \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BA8\u0BC0\u0B9A \u0BA8\u0BBF\u0BB2\u0BC8 \u0BA4\u0BA9\u0BCD\u0BA9\u0BAE\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BC8 \u0B95\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8 \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0CAF \u0CA8\u0CC0\u0C9A \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF \u0C86\u0CA4\u0CCD\u0CAE\u0CB5\u0CBF\u0CB6\u0CCD\u0CB5\u0CBE\u0CB8\u0CA6 \u0C95\u0CCA\u0CB0\u0CA4\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "A debilitated Ascendant lord may indicate periods of self-doubt or a need to consciously build self-esteem.");
      }
    }
    const moon = chart.planets["Moon"];
    if (moon) {
      const moonRasiL = translateRashi(moon.rasi.name.en, lang);
      observations.push(lang === "te" ? `\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41 ${moonRasiL}\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u091A\u0902\u0926\u094D\u0930\u092E\u093E ${moonRasiL} \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD ${moonRasiL}\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0C9A\u0C82\u0CA6\u0CCD\u0CB0 ${moonRasiL}\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Moon is placed in ${moonRasiL}.`);
      interpretations.push(lang === "te" ? `\u0C2E\u0C3E\u0C28\u0C38\u0C3F\u0C15 \u0C2D\u0C3E\u0C35\u0C3E\u0C32\u0C41 ${moonRasiL} \u0C32\u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C28\u0C41 \u0C2A\u0C4B\u0C32\u0C3F \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.` : lang === "hi" ? `\u092D\u093E\u0935\u0928\u093E\u090F\u0902 ${moonRasiL} \u0915\u0947 \u0917\u0941\u0923\u094B\u0902 \u0915\u0947 \u0938\u092E\u093E\u0928 \u0939\u0948\u0902\u0964` : lang === "ta" ? `\u0B89\u0BA3\u0BB0\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BCD ${moonRasiL}\u0BAF\u0BBF\u0BA9\u0BCD \u0B95\u0BC1\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B92\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : lang === "kn" ? `\u0CAD\u0CBE\u0CB5\u0CA8\u0CC6\u0C97\u0CB3\u0CC1 ${moonRasiL} \u0C97\u0CC1\u0CA3\u0CB2\u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CCB\u0CB2\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6.` : `Emotional expression tends to take on the qualities of ${moonRasiL}.`);
    }
    const mahapurushaYogas = yogas.filter((y) => y.id.startsWith("mahapurusha_") && y.detected);
    mahapurushaYogas.forEach((yoga) => {
      observations.push(lang === "te" ? `${yoga.name} \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.` : lang === "hi" ? `${yoga.name} \u092A\u093E\u092F\u093E \u0917\u092F\u093E\u0964` : lang === "ta" ? `${yoga.name} \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.` : lang === "kn" ? `${yoga.name} \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6.` : `${yoga.name} detected (${yoga.evidence[0]}).`);
      interpretations.push(lang === "te" ? "\u0C08 \u0C2F\u0C4B\u0C17\u0C02 \u0C17\u0C4D\u0C30\u0C39\u0C02 \u0C2F\u0C4A\u0C15\u0C4D\u0C15 \u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C32\u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C28\u0C41 \u0C07\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u092F\u0939 \u092F\u094B\u0917 \u0917\u094D\u0930\u0939 \u0915\u0947 \u092E\u091C\u092C\u0942\u0924 \u0917\u0941\u0923 \u0926\u0947\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD \u0B95\u0BBF\u0BB0\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0BB5\u0BB2\u0BC1\u0BB5\u0BBE\u0BA9 \u0B95\u0BC1\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B85\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C88 \u0CAF\u0CCB\u0C97\u0CB5\u0CC1 \u0C97\u0CCD\u0CB0\u0CB9\u0CA6 \u0CAA\u0CCD\u0CB0\u0CAC\u0CB2 \u0C97\u0CC1\u0CA3\u0CB2\u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CC0\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : `This yoga traditionally bestows powerful characteristics aligned with the ruling planet.`);
      score += 15;
    });
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateCareer(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const house10 = chart.houses.find((h) => h.index === 10);
    const sun = chart.planets["Sun"];
    if (house10) {
      const signL = translateRashi(house10.signName, lang);
      const lordL = translatePlanet(house10.lord, lang);
      observations.push(lang === "te" ? `10\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 ${signL}, \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${lordL}.` : lang === "hi" ? `10\u0935\u093E\u0902 \u092D\u093E\u0935 ${signL} \u0939\u0948, \u0938\u094D\u0935\u093E\u092E\u0940 ${lordL} \u0939\u0948\u0964` : lang === "ta" ? `10\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1 ${signL}, \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${lordL}.` : lang === "kn" ? `10\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6 ${signL}, \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${lordL}.` : `10th house is ${signL}, ruled by ${lordL}.`);
      if (house10.occupants.length > 0) {
        const occL = house10.occupants.map((o) => translatePlanet(o, lang));
        observations.push(lang === "te" ? `10\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41: ${occL.join(", ")}.` : lang === "hi" ? `10\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0917\u094D\u0930\u0939: ${occL.join(", ")}.` : lang === "ta" ? `10\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD: ${occL.join(", ")}.` : lang === "kn" ? `10\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CC1: ${occL.join(", ")}.` : `10th house occupants: ${occL.join(", ")}.`);
        interpretations.push(lang === "te" ? `\u0C15\u0C46\u0C30\u0C40\u0C30\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C17\u0C02 ${occL.join(" \u0C2E\u0C30\u0C3F\u0C2F\u0C41 ")} \u0C1A\u0C47 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C3F\u0C24\u0C2E\u0C35\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0915\u0930\u093F\u092F\u0930 ${occL.join(" \u0914\u0930 ")} \u0938\u0947 \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0939\u0948\u0964` : lang === "ta" ? `\u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD ${occL.join(" \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD ")} \u0B86\u0B95\u0BBF\u0BAF\u0BB5\u0BB1\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.` : lang === "kn" ? `\u0CB5\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF\u0CAF\u0CC1 ${occL.join(" \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 ")} \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CBF\u0C82\u0CA6 \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.` : `Career path is significantly influenced by the energies of ${occL.join(" and ")}.`);
      } else {
        observations.push(lang === "te" ? "10\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41." : lang === "hi" ? "10\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0915\u094B\u0908 \u0917\u094D\u0930\u0939 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964" : lang === "ta" ? "10\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8." : lang === "kn" ? "10\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CBF\u0CB2\u0CCD\u0CB2." : "No planets occupy the 10th house.");
        interpretations.push(lang === "te" ? `\u0C15\u0C46\u0C30\u0C40\u0C30\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C17\u0C02 \u0C2A\u0C4D\u0C30\u0C27\u0C3E\u0C28\u0C02\u0C17\u0C3E ${lordL} \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C2A\u0C48 \u0C06\u0C27\u0C3E\u0C30\u0C2A\u0C21\u0C3F \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0915\u0930\u093F\u092F\u0930 \u092E\u0941\u0916\u094D\u092F \u0930\u0942\u092A \u0938\u0947 ${lordL} \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u092A\u0930 \u0928\u093F\u0930\u094D\u092D\u0930 \u0915\u0930\u0924\u093E \u0939\u0948\u0964` : lang === "ta" ? `\u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BAE\u0BBE\u0B95 ${lordL} \u0B87\u0BA9\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0BCA\u0BB1\u0BC1\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1.` : lang === "kn" ? `\u0CB5\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF\u0CAF\u0CC1 \u0CAE\u0CC1\u0C96\u0CCD\u0CAF\u0CB5\u0CBE\u0C97\u0CBF ${lordL} \u0CA8 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB5\u0CB2\u0C82\u0CAC\u0CBF\u0CB8\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `Career direction is primarily guided by the placement and dignity of ${lordL}.`);
      }
    }
    if (sun) {
      if (sun.house === 10) {
        score += 20;
        observations.push(lang === "te" ? "\u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41 10\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B (\u0C26\u0C3F\u0C17\u0C4D\u0C2C\u0C32\u0C02) \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u0938\u0942\u0930\u094D\u092F 10\u0935\u0947\u0902 \u092D\u093E\u0935 (\u0926\u093F\u0917\u094D\u092C\u0932) \u092E\u0947\u0902 \u0939\u0948\u0964" : lang === "ta" ? "\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BCD 10\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD (\u0BA4\u0BBF\u0B95\u0BCD\u0BAA\u0BB2\u0BAE\u0BCD) \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0CB8\u0CC2\u0CB0\u0CCD\u0CAF\u0CA8\u0CC1 10\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (\u0CA6\u0CBF\u0C97\u0CCD\u0CAC\u0CB2)." : "Sun is placed in the 10th house (Digbala).");
        interpretations.push(lang === "te" ? "10\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41 \u0C28\u0C3E\u0C2F\u0C15\u0C24\u0C4D\u0C35 \u0C32\u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C28\u0C41 \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "10\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0938\u0942\u0930\u094D\u092F \u0928\u0947\u0924\u0943\u0924\u094D\u0935 \u0915\u0947 \u0917\u0941\u0923 \u0926\u0947\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "10\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BCD \u0BA4\u0BB2\u0BC8\u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5 \u0BAA\u0BA3\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "10\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0CB8\u0CC2\u0CB0\u0CCD\u0CAF\u0CA8\u0CC1 \u0CA8\u0CBE\u0CAF\u0C95\u0CA4\u0CCD\u0CB5\u0CA6 \u0C97\u0CC1\u0CA3\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CC0\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "Sun in the 10th house traditionally grants strong leadership qualities and authority in professional life.");
      }
    }
    const careerYogas = yogas.filter((y) => ["raja_yoga", "budha_aditya", "gaja_kesari"].includes(y.id) && y.detected);
    careerYogas.forEach((yoga) => {
      observations.push(lang === "te" ? `${yoga.name} \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.` : lang === "hi" ? `${yoga.name} \u092A\u093E\u092F\u093E \u0917\u092F\u093E\u0964` : lang === "ta" ? `${yoga.name} \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.` : lang === "kn" ? `${yoga.name} \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6.` : `${yoga.name} detected.`);
      score += 10;
    });
    if (careerYogas.length > 0) {
      interpretations.push(lang === "te" ? "\u0C08 \u0C2F\u0C4B\u0C17\u0C3E\u0C32 \u0C09\u0C28\u0C3F\u0C15\u0C3F \u0C35\u0C43\u0C24\u0C4D\u0C24\u0C3F\u0C32\u0C4B \u0C2E\u0C02\u0C1A\u0C3F \u0C17\u0C41\u0C30\u0C4D\u0C24\u0C3F\u0C02\u0C2A\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C3F\u0C1C\u0C2F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0907\u0928 \u092F\u094B\u0917\u094B\u0902 \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0915\u0930\u093F\u092F\u0930 \u092E\u0947\u0902 \u0905\u091A\u094D\u091B\u0940 \u092A\u0939\u091A\u093E\u0928 \u0914\u0930 \u0938\u092B\u0932\u0924\u093E \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0BAF\u0BCB\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2 \u0B85\u0B99\u0BCD\u0B95\u0BC0\u0B95\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9." : lang === "kn" ? "\u0C88 \u0CAF\u0CCB\u0C97\u0C97\u0CB3 \u0C89\u0CAA\u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CC1 \u0CB5\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0C97\u0CC1\u0CB0\u0CC1\u0CA4\u0CBF\u0CB8\u0CC1\u0CB5\u0CBF\u0C95\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "The presence of these yogas suggests strong potential for recognition and success in one's chosen field.");
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateEducation(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const lord4 = chart.planets[chart.houses.find((h) => h.index === 4)?.lord || ""];
    const lord5 = chart.planets[chart.houses.find((h) => h.index === 5)?.lord || ""];
    const mercury = chart.planets["Mercury"];
    const jupiter = chart.planets["Jupiter"];
    if (lord4) {
      const pL = translatePlanet(lord4.name.en, lang);
      observations.push(lang === "te" ? `4\u0C35 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F (${pL}) ${lord4.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `4\u0925\u0947 \u092D\u093E\u0935 \u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 (${pL}) ${lord4.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `4\u0B86\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF (${pL}) ${lord4.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `4\u0CA8\u0CC7 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF (${pL}) ${lord4.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `4th house lord (${pL}) is in house ${lord4.house}.`);
    }
    if (lord5) {
      const pL = translatePlanet(lord5.name.en, lang);
      observations.push(lang === "te" ? `5\u0C35 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F (${pL}) ${lord5.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `5\u0935\u0947\u0902 \u092D\u093E\u0935 \u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 (${pL}) ${lord5.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `5\u0B86\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF (${pL}) ${lord5.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `5\u0CA8\u0CC7 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF (${pL}) ${lord5.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `5th house lord (${pL}) is in house ${lord5.house}.`);
    }
    if (mercury && (mercury.dignity === "Exalted" || mercury.dignity === "Own")) {
      score += 15;
      observations.push(lang === "te" ? `\u0C2C\u0C41\u0C27\u0C41\u0C21\u0C41 \u0C2C\u0C32\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41 (${mercury.dignity}).` : lang === "hi" ? `\u092C\u0941\u0927 \u092E\u091C\u092C\u0942\u0924 \u0939\u0948 (${mercury.dignity})\u0964` : lang === "ta" ? `\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD (${mercury.dignity}).` : lang === "kn" ? `\u0CAC\u0CC1\u0CA7 \u0CAC\u0CB2\u0CB6\u0CBE\u0CB2\u0CBF\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (${mercury.dignity}).` : `Mercury is strong (${mercury.dignity}).`);
      interpretations.push(lang === "te" ? "\u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C2C\u0C41\u0C27\u0C41\u0C21\u0C41 \u0C35\u0C3F\u0C36\u0C4D\u0C32\u0C47\u0C37\u0C23\u0C3E\u0C24\u0C4D\u0C2E\u0C15 \u0C28\u0C48\u0C2A\u0C41\u0C23\u0C4D\u0C2F\u0C3E\u0C32\u0C28\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C47\u0C17\u0C35\u0C02\u0C24\u0C2E\u0C48\u0C28 \u0C05\u0C2D\u0C4D\u0C2F\u0C3E\u0C38\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u092E\u091C\u092C\u0942\u0924 \u092C\u0941\u0927 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923\u093E\u0924\u094D\u092E\u0915 \u0915\u094C\u0936\u0932 \u0914\u0930 \u0924\u0947\u091C\u0940 \u0938\u0947 \u0938\u0940\u0916\u0928\u0947 \u0915\u093E \u0938\u092E\u0930\u094D\u0925\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0BAA\u0BC1\u0BA4\u0BA9\u0BCD \u0BAA\u0B95\u0BC1\u0BAA\u0BCD\u0BAA\u0BBE\u0BAF\u0BCD\u0BB5\u0BC1 \u0BA4\u0BBF\u0BB1\u0BA9\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBF\u0BB0\u0BC8\u0BB5\u0BBE\u0BA9 \u0B95\u0BB1\u0BCD\u0BB1\u0BB2\u0BC8 \u0B86\u0BA4\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CAC\u0CB2\u0CB5\u0CBE\u0CA6 \u0CAC\u0CC1\u0CA7\u0CB5\u0CC1 \u0CB5\u0CBF\u0CB6\u0CCD\u0CB2\u0CC7\u0CB7\u0CA3\u0CBE\u0CA4\u0CCD\u0CAE\u0C95 \u0C95\u0CCC\u0CB6\u0CB2\u0CCD\u0CAF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CC7\u0C97\u0CB5\u0CBE\u0C97\u0CBF \u0C95\u0CB2\u0CBF\u0CAF\u0CC1\u0CB5\u0CBF\u0C95\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CC6\u0C82\u0CAC\u0CB2\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "A strong Mercury favors analytical skills, logic, and rapid learning.");
    }
    if (jupiter && (jupiter.dignity === "Exalted" || jupiter.dignity === "Own")) {
      score += 15;
      observations.push(lang === "te" ? `\u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C2C\u0C32\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41 (${jupiter.dignity}).` : lang === "hi" ? `\u0917\u0941\u0930\u0941 \u092E\u091C\u092C\u0942\u0924 \u0939\u0948 (${jupiter.dignity})\u0964` : lang === "ta" ? `\u0B95\u0BC1\u0BB0\u0BC1 \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD (${jupiter.dignity}).` : lang === "kn" ? `\u0C97\u0CC1\u0CB0\u0CC1 \u0CAC\u0CB2\u0CB6\u0CBE\u0CB2\u0CBF\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (${jupiter.dignity}).` : `Jupiter is strong (${jupiter.dignity}).`);
      interpretations.push(lang === "te" ? "\u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C09\u0C28\u0C4D\u0C28\u0C24 \u0C35\u0C3F\u0C1C\u0C4D\u0C1E\u0C3E\u0C28\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C3F\u0C26\u0C4D\u0C2F\u0C3E \u0C35\u0C3F\u0C1C\u0C2F\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C26\u0C4D\u0C26\u0C24\u0C41 \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u092E\u091C\u092C\u0942\u0924 \u0917\u0941\u0930\u0941 \u0909\u091A\u094D\u091A \u091C\u094D\u091E\u093E\u0928 \u0914\u0930 \u0936\u0948\u0915\u094D\u0937\u093F\u0915 \u0938\u092B\u0932\u0924\u093E \u0915\u093E \u0938\u092E\u0930\u094D\u0925\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0B95\u0BC1\u0BB0\u0BC1 \u0B89\u0BAF\u0BB0\u0BCD \u0B85\u0BB1\u0BBF\u0BB5\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BB2\u0BCD\u0BB5\u0BBF \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC1 \u0B89\u0BA4\u0BB5\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0CAC\u0CB2\u0CB5\u0CBE\u0CA6 \u0C97\u0CC1\u0CB0\u0CC1 \u0C89\u0CA8\u0CCD\u0CA8\u0CA4 \u0C9C\u0CCD\u0C9E\u0CBE\u0CA8 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB6\u0CC8\u0C95\u0CCD\u0CB7\u0CA3\u0CBF\u0C95 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CC6\u0C82\u0CAC\u0CB2\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "A strong Jupiter favors higher wisdom, philosophical thinking, and academic success.");
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateFinance(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const lord2 = chart.houses.find((h) => h.index === 2)?.lord || "";
    const lord11 = chart.houses.find((h) => h.index === 11)?.lord || "";
    const l2L = translatePlanet(lord2, lang);
    const l11L = translatePlanet(lord11, lang);
    observations.push(lang === "te" ? `2\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 (\u0C38\u0C02\u0C2A\u0C26) \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${l2L}.` : lang === "hi" ? `\u0926\u0942\u0938\u0930\u0947 \u092D\u093E\u0935 (\u0927\u0928) \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${l2L} \u0939\u0948\u0902\u0964` : lang === "ta" ? `2\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1 (\u0B9A\u0BC6\u0BB2\u0BCD\u0BB5\u0BAE\u0BCD) \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${l2L}.` : lang === "kn" ? `2\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6 (\u0CB8\u0C82\u0CAA\u0CA4\u0CCD\u0CA4\u0CC1) \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${l2L}.` : `2nd house (Accumulated Wealth) is ruled by ${l2L}.`);
    observations.push(lang === "te" ? `11\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 (\u0C32\u0C3E\u0C2D\u0C3E\u0C32\u0C41) \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${l11L}.` : lang === "hi" ? `11\u0935\u0947\u0902 \u092D\u093E\u0935 (\u0932\u093E\u092D) \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${l11L} \u0939\u0948\u0902\u0964` : lang === "ta" ? `11\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1 (\u0BB2\u0BBE\u0BAA\u0B99\u0BCD\u0B95\u0BB3\u0BCD) \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${l11L}.` : lang === "kn" ? `11\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6 (\u0CB2\u0CBE\u0CAD\u0C97\u0CB3\u0CC1) \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${l11L}.` : `11th house (Gains) is ruled by ${l11L}.`);
    const dhana = yogas.find((y) => y.id === "dhana_yoga");
    const daridra = yogas.find((y) => y.id === "daridra_yoga");
    if (dhana?.detected) {
      score += 25;
      observations.push(lang === "te" ? `\u0C27\u0C28 \u0C2F\u0C4B\u0C17\u0C02 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F: ${dhana.evidence[0]}` : lang === "hi" ? `\u0927\u0928 \u092F\u094B\u0917 \u092A\u093E\u092F\u093E \u0917\u092F\u093E: ${dhana.evidence[0]}` : lang === "ta" ? `\u0BA4\u0BA9 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1: ${dhana.evidence[0]}` : lang === "kn" ? `\u0CA7\u0CA8 \u0CAF\u0CCB\u0C97 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6: ${dhana.evidence[0]}` : `Dhana Yoga detected: ${dhana.evidence[0]}`);
      interpretations.push(lang === "te" ? "\u0C08 \u0C2F\u0C4B\u0C17\u0C02 \u0C38\u0C02\u0C2A\u0C26\u0C28\u0C41 \u0C38\u0C43\u0C37\u0C4D\u0C1F\u0C3F\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C42\u0C21\u0C2C\u0C46\u0C1F\u0C4D\u0C1F\u0C41\u0C15\u0C4B\u0C35\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C38\u0C3E\u0C2E\u0C30\u0C4D\u0C25\u0C4D\u0C2F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u092F\u0939 \u092F\u094B\u0917 \u0927\u0928 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0928\u0947 \u0914\u0930 \u0938\u0902\u091A\u092F \u0915\u0930\u0928\u0947 \u0915\u0940 \u092E\u091C\u092C\u0942\u0924 \u0915\u094D\u0937\u092E\u0924\u093E \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BB2\u0BCD\u0BB5\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB5\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BB5\u0BB2\u0BC1\u0BB5\u0BBE\u0BA9 \u0BA4\u0BBF\u0BB1\u0BA9\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C88 \u0CAF\u0CCB\u0C97\u0CB5\u0CC1 \u0CB8\u0C82\u0CAA\u0CA4\u0CCD\u0CA4\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC3\u0CB7\u0CCD\u0C9F\u0CBF\u0CB8\u0CC1\u0CB5 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9\u0CBF\u0CB8\u0CC1\u0CB5 \u0CAA\u0CCD\u0CB0\u0CAC\u0CB2 \u0CB8\u0CBE\u0CAE\u0CB0\u0CCD\u0CA5\u0CCD\u0CAF\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "This yoga traditionally indicates a strong capacity to generate and accumulate wealth.");
    }
    if (daridra?.detected) {
      score -= 25;
      observations.push(lang === "te" ? `\u0C26\u0C30\u0C3F\u0C26\u0C4D\u0C30 \u0C2F\u0C4B\u0C17\u0C02 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F: ${daridra.evidence[0]}` : lang === "hi" ? `\u0926\u0930\u093F\u0926\u094D\u0930 \u092F\u094B\u0917 \u092A\u093E\u092F\u093E \u0917\u092F\u093E: ${daridra.evidence[0]}` : lang === "ta" ? `\u0BA4\u0BB0\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1: ${daridra.evidence[0]}` : lang === "kn" ? `\u0CA6\u0CB0\u0CBF\u0CA6\u0CCD\u0CB0 \u0CAF\u0CCB\u0C97 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6: ${daridra.evidence[0]}` : `Daridra Yoga detected: ${daridra.evidence[0]}`);
      interpretations.push(lang === "te" ? "\u0C08 \u0C15\u0C32\u0C2F\u0C3F\u0C15 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C38\u0C4D\u0C25\u0C3F\u0C30\u0C24\u0C4D\u0C35\u0C02\u0C32\u0C4B \u0C39\u0C46\u0C1A\u0C4D\u0C1A\u0C41\u0C24\u0C17\u0C4D\u0C17\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C38\u0C35\u0C3E\u0C33\u0C4D\u0C32\u0C28\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u092F\u0939 \u0938\u0902\u092F\u094B\u091C\u0928 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u094D\u0925\u093F\u0930\u0924\u093E \u092E\u0947\u0902 \u0909\u0924\u093E\u0930-\u091A\u0922\u093C\u093E\u0935 \u092F\u093E \u091A\u0941\u0928\u094C\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BC8 \u0BA8\u0BBF\u0BA4\u0BBF \u0BA8\u0BBF\u0BB2\u0BC8\u0BA4\u0BCD\u0BA4\u0BA9\u0BCD\u0BAE\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B8F\u0BB1\u0BCD\u0BB1 \u0B87\u0BB1\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B9A\u0BB5\u0BBE\u0BB2\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C88 \u0CB8\u0C82\u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0CAF\u0CC1 \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CB8\u0CCD\u0CA5\u0CBF\u0CB0\u0CA4\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C8F\u0CB0\u0CBF\u0CB3\u0CBF\u0CA4\u0C97\u0CB3\u0CC1 \u0C85\u0CA5\u0CB5\u0CBE \u0CB8\u0CB5\u0CBE\u0CB2\u0CC1\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "This combination suggests potential fluctuations or challenges in financial stability.");
    }
    if (dhana?.detected && daridra?.detected) {
      interpretations.push(lang === "te" ? "\u0C35\u0C3F\u0C30\u0C41\u0C26\u0C4D\u0C27\u0C2E\u0C48\u0C28 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C2F\u0C4B\u0C17\u0C3E\u0C32 \u0C09\u0C28\u0C3F\u0C15\u0C3F \u0C05\u0C24\u0C4D\u0C2F\u0C27\u0C3F\u0C15 \u0C06\u0C26\u0C3E\u0C2F\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C24\u0C4D\u0C2F\u0C27\u0C3F\u0C15 \u0C16\u0C30\u0C4D\u0C1A\u0C41\u0C32 \u0C15\u0C3E\u0C32\u0C3E\u0C32\u0C28\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0935\u093F\u0930\u094B\u0927\u0940 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u092F\u094B\u0917\u094B\u0902 \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0909\u091A\u094D\u091A \u0906\u092F \u0914\u0930 \u0909\u091A\u094D\u091A \u0916\u0930\u094D\u091A \u0915\u0947 \u0926\u094C\u0930 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BAE\u0BC1\u0BB0\u0BA3\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BA8\u0BBF\u0BA4\u0BBF \u0BAF\u0BCB\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BA4\u0BBF\u0B95 \u0BB5\u0BB0\u0BC1\u0BAE\u0BBE\u0BA9\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95 \u0B9A\u0BC6\u0BB2\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0BBE\u0BB2\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9." : lang === "kn" ? "\u0CB5\u0CBF\u0CB0\u0CCB\u0CA7\u0CBE\u0CA4\u0CCD\u0CAE\u0C95 \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CAF\u0CCB\u0C97\u0C97\u0CB3\u0CC1 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBF\u0CA8 \u0C86\u0CA6\u0CBE\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBF\u0CA8 \u0C96\u0CB0\u0CCD\u0C9A\u0CBF\u0CA8 \u0C85\u0CB5\u0CA7\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6." : "The presence of conflicting financial yogas suggests periods of high earning followed by high expenditures.");
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateRelationships(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const house7 = chart.houses.find((h) => h.index === 7);
    const venus = chart.planets["Venus"];
    const mars = chart.planets["Mars"];
    if (house7) {
      const h7L = translatePlanet(house7.lord, lang);
      observations.push(lang === "te" ? `7\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${h7L}.` : lang === "hi" ? `7\u0935\u0947\u0902 \u092D\u093E\u0935 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${h7L} \u0939\u0948\u0902\u0964` : lang === "ta" ? `7\u0B86\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${h7L}.` : lang === "kn" ? `7\u0CA8\u0CC7 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${h7L}.` : `7th house is ruled by ${h7L}.`);
      if (house7.occupants.length > 0) {
        const occL = house7.occupants.map((o) => translatePlanet(o, lang));
        observations.push(lang === "te" ? `7\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41: ${occL.join(", ")}.` : lang === "hi" ? `7\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0917\u094D\u0930\u0939: ${occL.join(", ")}.` : lang === "ta" ? `7\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD: ${occL.join(", ")}.` : lang === "kn" ? `7\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CC1: ${occL.join(", ")}.` : `7th house occupants: ${occL.join(", ")}.`);
        interpretations.push(lang === "te" ? `\u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3E\u0C32\u0C41 ${occL.join(" \u0C2E\u0C30\u0C3F\u0C2F\u0C41 ")} \u0C1A\u0C47 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C3F\u0C24\u0C2E\u0C35\u0C41\u0C24\u0C3E\u0C2F\u0C3F.` : lang === "hi" ? `\u0938\u0902\u092C\u0902\u0927 ${occL.join(" \u0914\u0930 ")} \u0938\u0947 \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0939\u094B\u0902\u0917\u0947\u0964` : lang === "ta" ? `\u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BCD ${occL.join(" \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD ")} \u0B86\u0B95\u0BBF\u0BAF\u0BB5\u0BB1\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD.` : lang === "kn" ? `\u0CB8\u0C82\u0CAC\u0C82\u0CA7\u0C97\u0CB3\u0CC1 ${occL.join(" \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 ")} \u0C97\u0CC1\u0CA3\u0CB2\u0C95\u0CCD\u0CB7\u0CA3\u0C97\u0CB3\u0CBF\u0C82\u0CA6 \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6.` : `Relationships will be heavily flavored by the nature of ${occL.join(" and ")}.`);
      }
    }
    if (venus) {
      const vL = translatePlanet("Venus", lang);
      const rasiL = translateRashi(venus.rasi.name.en, lang);
      observations.push(lang === "te" ? `${vL} (\u0C35\u0C3F\u0C35\u0C3E\u0C39 \u0C15\u0C3E\u0C30\u0C15\u0C41\u0C21\u0C41) ${rasiL}\u0C32\u0C4B (${venus.dignity}) \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${vL} (\u0935\u093F\u0935\u093E\u0939 \u0915\u093E \u0915\u093E\u0930\u0915) ${rasiL} \u092E\u0947\u0902 (${venus.dignity}) \u0939\u0948\u0964` : lang === "ta" ? `${vL} (\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0B95\u0BBE\u0BB0\u0B95\u0BA9\u0BCD) ${rasiL}\u0BAF\u0BBF\u0BB2\u0BCD (${venus.dignity}) \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${vL} (\u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0C95\u0CBE\u0CB0\u0C95) ${rasiL}\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF (${venus.dignity}) \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Venus (karaka for marriage) is in ${rasiL} (${venus.dignity}).`);
      if (venus.dignity === "Debilitated") {
        score -= 15;
        interpretations.push(lang === "te" ? "\u0C28\u0C40\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28 \u0C36\u0C41\u0C15\u0C4D\u0C30\u0C41\u0C21\u0C41 \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3E\u0C32\u0C32\u0C4B \u0C38\u0C30\u0C4D\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C4D\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30 \u0C05\u0C35\u0C17\u0C3E\u0C39\u0C28\u0C28\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u0928\u0940\u091A \u0915\u093E \u0936\u0941\u0915\u094D\u0930 \u0930\u093F\u0936\u094D\u0924\u094B\u0902 \u092E\u0947\u0902 \u0938\u092E\u091D \u0914\u0930 \u0938\u092E\u093E\u092F\u094B\u091C\u0928 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0BA8\u0BC0\u0B9A \u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB0\u0BA9\u0BCD \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B9A\u0BC1\u0BAF\u0BAE\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0 \u0BAA\u0BBE\u0BB0\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1 \u0BAA\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF \u0BAA\u0BBE\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CA8\u0CC0\u0C9A \u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CA8\u0CC1 \u0CB8\u0C82\u0CAC\u0C82\u0CA7\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CCD\u0CB5-\u0CAE\u0CCC\u0CB2\u0CCD\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CAE\u0CC6\u0C9A\u0CCD\u0C9A\u0CC1\u0C97\u0CC6\u0CAF \u0CAA\u0CBE\u0CA0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "A debilitated Venus suggests relationship lessons regarding self-worth and mutual appreciation.");
      } else if (venus.dignity === "Exalted" || venus.dignity === "Own") {
        score += 15;
        interpretations.push(lang === "te" ? "\u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C36\u0C41\u0C15\u0C4D\u0C30\u0C41\u0C21\u0C41 \u0C2D\u0C3E\u0C17\u0C38\u0C4D\u0C35\u0C3E\u0C2E\u0C4D\u0C2F\u0C02\u0C32\u0C4B \u0C38\u0C3E\u0C2E\u0C30\u0C38\u0C4D\u0C2F\u0C02, \u0C06\u0C2A\u0C4D\u0C2F\u0C3E\u0C2F\u0C24 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30 \u0C17\u0C4C\u0C30\u0C35\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u092E\u091C\u092C\u0942\u0924 \u0936\u0941\u0915\u094D\u0930 \u0938\u093E\u091D\u0947\u0926\u093E\u0930\u0940 \u092E\u0947\u0902 \u0938\u0926\u094D\u092D\u093E\u0935, \u0938\u094D\u0928\u0947\u0939 \u0914\u0930 \u0938\u092E\u094D\u092E\u093E\u0928 \u0915\u093E \u092A\u0915\u094D\u0937\u0927\u0930 \u0939\u0948\u0964" : lang === "ta" ? "\u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0B9A\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB0\u0BA9\u0BCD \u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BBE\u0BA3\u0BCD\u0BAE\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2\u0BBF\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD, \u0BAA\u0BBE\u0B9A\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0 \u0BAE\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4\u0BC8\u0BAF\u0BC8 \u0B86\u0BA4\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CAC\u0CB2\u0CB5\u0CBE\u0CA6 \u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CA8\u0CC1 \u0CAA\u0CBE\u0CB2\u0CC1\u0CA6\u0CBE\u0CB0\u0CBF\u0C95\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF, \u0CB5\u0CBE\u0CA4\u0CCD\u0CB8\u0CB2\u0CCD\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0C97\u0CCC\u0CB0\u0CB5\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CC6\u0C82\u0CAC\u0CB2\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "A strong Venus favors harmony, affection, and mutual respect in partnerships.");
      }
    }
    if (mars && [1, 4, 7, 8, 12].includes(mars.house)) {
      score -= 10;
      const mL = translatePlanet("Mars", lang);
      observations.push(lang === "te" ? `${mL} ${mars.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41 (\u0C2E\u0C3E\u0C02\u0C17\u0C32\u0C3F\u0C15 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02).` : lang === "hi" ? `${mL} ${mars.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948 (\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0938\u094D\u0925\u093F\u0924\u093F)\u0964` : lang === "ta" ? `${mL} ${mars.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD (\u0BAE\u0BBE\u0B99\u0BCD\u0B95\u0BB2\u0BCD\u0BAF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD).` : lang === "kn" ? `${mL} ${mars.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (\u0CAE\u0CBE\u0C82\u0C97\u0CB2\u0CBF\u0C95 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8).` : `Mars is in house ${mars.house} (Manglik alignment).`);
      interpretations.push(lang === "te" ? "\u0C15\u0C41\u0C1C\u0C41\u0C21\u0C3F \u0C08 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3E\u0C32\u0C32\u0C4B \u0C18\u0C30\u0C4D\u0C37\u0C23\u0C28\u0C41 \u0C24\u0C46\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F, \u0C07\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C09\u0C28\u0C4D\u0C28 \u0C2D\u0C3E\u0C17\u0C38\u0C4D\u0C35\u0C3E\u0C2E\u0C3F \u0C2E\u0C02\u0C1A\u0C3F\u0C26\u0C3F." : lang === "hi" ? "\u092E\u0902\u0917\u0932 \u0915\u0940 \u092F\u0939 \u0938\u094D\u0925\u093F\u0924\u093F \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u0930\u093F\u0936\u094D\u0924\u094B\u0902 \u092E\u0947\u0902 \u092E\u0928\u092E\u0941\u091F\u093E\u0935 \u0932\u093E \u0938\u0915\u0924\u0940 \u0939\u0948, \u0910\u0938\u0947 \u092E\u0947\u0902 \u0938\u092E\u093E\u0928 \u0938\u094D\u0925\u093F\u0924\u093F \u0935\u093E\u0932\u0947 \u0938\u093E\u0925\u0940 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8 \u0B86\u0BB0\u0BAE\u0BCD\u0BAA \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B89\u0BB0\u0BBE\u0BAF\u0BCD\u0BB5\u0BC8\u0B95\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1\u0BB5\u0BB0\u0BC1\u0BAE\u0BCD, \u0B87\u0BA4\u0BC7\u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BBE\u0BB3\u0BBF\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CAE\u0C82\u0C97\u0CB3\u0CA8 \u0C88 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CC1 \u0C86\u0CB0\u0C82\u0CAD\u0CBF\u0C95 \u0CB8\u0C82\u0CAC\u0C82\u0CA7\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0C98\u0CB0\u0CCD\u0CB7\u0CA3\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CB0\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1, \u0C87\u0CA6\u0CC7 \u0CB0\u0CC0\u0CA4\u0CBF\u0CAF \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CBF\u0CB0\u0CC1\u0CB5 \u0CAA\u0CBE\u0CB2\u0CC1\u0CA6\u0CBE\u0CB0\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "This placement of Mars is traditionally known to bring assertiveness or friction in early partnerships, often recommending a similarly placed partner.");
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateHealth(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const lord6Name = chart.houses.find((h) => h.index === 6)?.lord;
    const lord6 = lord6Name ? chart.planets[lord6Name] : null;
    const lagnaLordName = chart.ascendant.lord;
    const lagnaLord = chart.planets[lagnaLordName];
    if (lord6) {
      const l6L = translatePlanet(lord6.name.en, lang);
      observations.push(lang === "te" ? `6\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 (\u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02) \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F ${l6L} ${lord6.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `6\u0920\u0947 \u092D\u093E\u0935 (\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F) \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 ${l6L} ${lord6.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0902\u0964` : lang === "ta" ? `6\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1 (\u0B86\u0BB0\u0BCB\u0B95\u0BCD\u0B95\u0BBF\u0BAF\u0BAE\u0BCD) \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF ${l6L} ${lord6.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `6\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6 (\u0C86\u0CB0\u0CCB\u0C97\u0CCD\u0CAF) \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF ${l6L} ${lord6.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `6th house (Health) lord ${l6L} is in house ${lord6.house}.`);
    }
    if (lagnaLord) {
      if (lagnaLord.house === 6 || lagnaLord.house === 8 || lagnaLord.house === 12) {
        score -= 15;
        observations.push(lang === "te" ? `\u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C26\u0C41\u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B (${lagnaLord.house}\u0C35 \u0C07\u0C32\u0C4D\u0C32\u0C41) \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `\u0932\u0917\u094D\u0928\u0947\u0936 \u0926\u0941\u0938\u094D\u0925\u093E\u0928 (${lagnaLord.house}\u0935\u0947\u0902 \u092D\u093E\u0935) \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `\u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF \u0BA4\u0BC1\u0BB8\u0BCD\u0BA4\u0BBE\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD (${lagnaLord.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BC1) \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `\u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0CAF\u0CC1 \u0CA6\u0CC1\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6 (${lagnaLord.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6).` : `Ascendant lord is placed in a Dusthana (house ${lagnaLord.house}).`);
        interpretations.push(lang === "te" ? "\u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C38\u0C35\u0C3E\u0C32\u0C41 \u0C1A\u0C47\u0C38\u0C47 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41, \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C12\u0C24\u0C4D\u0C24\u0C3F\u0C21\u0C3F \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C39\u0C23\u0C2A\u0C48 \u0C05\u0C26\u0C28\u0C2A\u0C41 \u0C36\u0C4D\u0C30\u0C26\u0C4D\u0C27 \u0C05\u0C35\u0C38\u0C30\u0C02." : lang === "hi" ? "\u091C\u092C \u0932\u0917\u094D\u0928\u0947\u0936 \u091A\u0941\u0928\u094C\u0924\u0940\u092A\u0942\u0930\u094D\u0923 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u094B, \u0924\u094B \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0914\u0930 \u0924\u0928\u093E\u0935 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u092A\u0930 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0928\u0947 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF \u0B9A\u0BB5\u0BBE\u0BB2\u0BBE\u0BA9 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1, \u0B89\u0B9F\u0BB2\u0BCD \u0BA8\u0BB2\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA9 \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4 \u0BA8\u0BBF\u0BB0\u0BCD\u0BB5\u0BBE\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BC2\u0B9F\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0BB5\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4 \u0B85\u0BB1\u0BBF\u0BB5\u0BC1\u0BB1\u0BC1\u0BA4\u0BCD\u0BA4\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF \u0CB8\u0CB5\u0CBE\u0CB2\u0CBF\u0CA8 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0C97, \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0C86\u0CB0\u0CCB\u0C97\u0CCD\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C92\u0CA4\u0CCD\u0CA4\u0CA1 \u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CA3\u0CC6\u0CAF \u0CAC\u0C97\u0CCD\u0C97\u0CC6 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBF\u0CA8 \u0C97\u0CAE\u0CA8 \u0CB9\u0CB0\u0CBF\u0CB8\u0CB2\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "When the Ascendant lord is in a challenging house, traditional texts recommend extra attention to physical wellness and stress management.");
      } else {
        score += 15;
        interpretations.push(lang === "te" ? "\u0C32\u0C17\u0C4D\u0C28\u0C3E\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23\u0C02\u0C17\u0C3E \u0C2E\u0C02\u0C1A\u0C3F \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15 \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C38\u0C4D\u0C25\u0C3E\u0C2A\u0C15\u0C24\u0C15\u0C41 \u0C2E\u0C26\u0C4D\u0C26\u0C24\u0C41 \u0C07\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0932\u0917\u094D\u0928\u0947\u0936 \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0905\u091A\u094D\u091B\u0947 \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0932\u091A\u0940\u0932\u0947\u092A\u0928 \u0915\u093E \u0938\u092E\u0930\u094D\u0925\u0928 \u0915\u0930\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BB2\u0B95\u0BCD\u0BA9\u0BBE\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF\u0BAF\u0BBF\u0BA9\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8 \u0BAA\u0BCA\u0BA4\u0BC1\u0BB5\u0BBE\u0B95 \u0BA8\u0BB2\u0BCD\u0BB2 \u0B89\u0B9F\u0BB2\u0BCD \u0BB5\u0BB2\u0BBF\u0BAE\u0BC8\u0BAF\u0BC8 \u0B86\u0BA4\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CB2\u0C97\u0CCD\u0CA8\u0CBE\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0CAF \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CC1 \u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0C97\u0CBF \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CB8\u0CCD\u0CA5\u0CBE\u0CAA\u0C95\u0CA4\u0CCD\u0CB5\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CC6\u0C82\u0CAC\u0CB2\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "The Ascendant lord's placement generally supports good physical resilience.");
      }
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  static generateSpirituality(chart, yogas, lang) {
    const observations = [];
    const interpretations = [];
    let score = 50;
    const ketu = chart.planets["Ketu"];
    const jupiter = chart.planets["Jupiter"];
    if (ketu && (ketu.house === 9 || ketu.house === 12)) {
      score += 20;
      const kL = translatePlanet("Ketu", lang);
      observations.push(lang === "te" ? `${kL} ${ketu.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${kL} ${ketu.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${kL} ${ketu.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${kL} ${ketu.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Ketu is placed in house ${ketu.house}.`);
      interpretations.push(lang === "te" ? "\u0C15\u0C47\u0C24\u0C41\u0C35\u0C41 \u0C2F\u0C4A\u0C15\u0C4D\u0C15 \u0C08 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C1A\u0C3E\u0C32\u0C3E \u0C06\u0C27\u0C4D\u0C2F\u0C3E\u0C24\u0C4D\u0C2E\u0C3F\u0C15\u0C2E\u0C48\u0C28\u0C26\u0C3F, \u0C35\u0C3F\u0C2E\u0C41\u0C15\u0C4D\u0C24\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C02\u0C24\u0C30\u0C4D\u0C17\u0C24 \u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C2C\u0C3F\u0C02\u0C2C\u0C02 \u0C35\u0C48\u0C2A\u0C41 \u0C38\u0C39\u0C1C \u0C06\u0C15\u0C30\u0C4D\u0C37\u0C23\u0C28\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0915\u0947\u0924\u0941 \u0915\u0940 \u092F\u0939 \u0938\u094D\u0925\u093F\u0924\u093F \u0905\u0924\u094D\u092F\u0927\u093F\u0915 \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u092E\u093E\u0928\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948, \u091C\u094B \u092E\u0941\u0915\u094D\u0924\u093F \u0914\u0930 \u0906\u0924\u094D\u092E-\u091A\u093F\u0902\u0924\u0928 \u0915\u0940 \u0913\u0930 \u090F\u0915 \u0938\u0939\u091C \u091D\u0941\u0915\u093E\u0935 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BBF\u0BA9\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0BA8\u0BBF\u0BB2\u0BC8 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95\u0BAE\u0BBE\u0B95 \u0B95\u0BB0\u0BC1\u0BA4\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1, \u0B87\u0BA4\u0BC1 \u0BB5\u0BBF\u0B9F\u0BC1\u0BA4\u0BB2\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B89\u0BB3\u0BCD \u0BAA\u0BBF\u0BB0\u0BA4\u0BBF\u0BAA\u0BB2\u0BBF\u0BAA\u0BCD\u0BAA\u0BC8 \u0BA8\u0BCB\u0B95\u0BCD\u0B95\u0BBF\u0BAF \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4 \u0B87\u0BB4\u0BC1\u0BAA\u0BCD\u0BAA\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C95\u0CC7\u0CA4\u0CC1\u0CB5\u0CBF\u0CA8 \u0C88 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95\u0CB5\u0CC6\u0C82\u0CA6\u0CC1 \u0CAA\u0CB0\u0CBF\u0C97\u0CA3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0C87\u0CA6\u0CC1 \u0CB5\u0CBF\u0CAE\u0CCB\u0C9A\u0CA8\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C86\u0C82\u0CA4\u0CB0\u0CBF\u0C95 \u0CAA\u0CCD\u0CB0\u0CA4\u0CBF\u0CAC\u0CBF\u0C82\u0CAC\u0CA6 \u0C95\u0CA1\u0CC6\u0C97\u0CC6 \u0CB8\u0CB9\u0C9C \u0C92\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "This placement of Ketu is considered highly spiritual, indicating an innate pull toward liberation and inner reflection.");
    } else if (ketu) {
      const kL = translatePlanet("Ketu", lang);
      observations.push(lang === "te" ? `${kL} ${ketu.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${kL} ${ketu.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${kL} ${ketu.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${kL} ${ketu.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Ketu is placed in house ${ketu.house}.`);
    }
    if (jupiter && (jupiter.house === 9 || jupiter.house === 12)) {
      score += 15;
      const jL = translatePlanet("Jupiter", lang);
      observations.push(lang === "te" ? `${jL} ${jupiter.house}\u0C35 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41.` : lang === "hi" ? `${jL} ${jupiter.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0939\u0948\u0964` : lang === "ta" ? `${jL} ${jupiter.house}\u0B86\u0BAE\u0BCD \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.` : lang === "kn" ? `${jL} ${jupiter.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6.` : `Jupiter is placed in house ${jupiter.house}.`);
      interpretations.push(lang === "te" ? "\u0C08 \u0C07\u0C02\u0C1F\u0C4D\u0C32\u0C4B \u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C24\u0C24\u0C4D\u0C35\u0C36\u0C3E\u0C38\u0C4D\u0C24\u0C4D\u0C30\u0C02, \u0C27\u0C30\u0C4D\u0C2E\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C09\u0C28\u0C4D\u0C28\u0C24 \u0C05\u0C2D\u0C4D\u0C2F\u0C3E\u0C38\u0C02 \u0C2A\u0C1F\u0C4D\u0C32 \u0C06\u0C38\u0C15\u0C4D\u0C24\u0C3F\u0C28\u0C3F \u0C07\u0C38\u0C4D\u0C24\u0C3E\u0C21\u0C41." : lang === "hi" ? "\u0907\u0938 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0917\u0941\u0930\u0941 \u0926\u0930\u094D\u0936\u0928, \u0927\u0930\u094D\u092E \u0914\u0930 \u0909\u091A\u094D\u091A \u0936\u093F\u0915\u094D\u0937\u093E \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u091D\u0941\u0915\u093E\u0935 \u0926\u0947\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B95\u0BC1\u0BB0\u0BC1 \u0BA4\u0BA4\u0BCD\u0BA4\u0BC1\u0BB5\u0BAE\u0BCD, \u0BA4\u0BB0\u0BCD\u0BAE\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B89\u0BAF\u0BB0\u0BCD \u0B95\u0BB1\u0BCD\u0BB1\u0BB2\u0BCD \u0BAE\u0BC0\u0BA4\u0BBE\u0BA9 \u0B88\u0B9F\u0BC1\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BC1\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD." : lang === "kn" ? "\u0C88 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0C97\u0CC1\u0CB0\u0CC1 \u0CA4\u0CA4\u0CCD\u0CB5\u0CB6\u0CBE\u0CB8\u0CCD\u0CA4\u0CCD\u0CB0, \u0CA7\u0CB0\u0CCD\u0CAE \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C89\u0CA8\u0CCD\u0CA8\u0CA4 \u0CB6\u0CBF\u0C95\u0CCD\u0CB7\u0CA3\u0CA6 \u0C95\u0CA1\u0CC6\u0C97\u0CC6 \u0C92\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CC0\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CA8\u0CC6." : "Jupiter in this house traditionally bestows an inclination toward philosophy, dharma, and higher learning.");
    }
    return { score: Math.min(100, Math.max(0, score)), observations, traditionalInterpretations: interpretations };
  }
  // --- Aggregators ---
  static generateStrengths(yogas, lang) {
    const positiveYogas = yogas.filter((y) => y.detected && !["kemadruma", "daridra_yoga", "guru_chandal", "shakata_yoga"].includes(y.id));
    return positiveYogas.map((y) => {
      return lang === "te" ? `${y.name} \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C36\u0C41\u0C2D \u0C2B\u0C32\u0C3F\u0C24\u0C3E\u0C32\u0C41 \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.` : lang === "hi" ? `${y.name} \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0905\u0928\u0941\u0915\u0942\u0932 \u092A\u0930\u093F\u0923\u093E\u092E\u094B\u0902 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964` : lang === "ta" ? `${y.name} \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD \u0B9A\u0BBE\u0BA4\u0B95\u0BAE\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : lang === "kn" ? `${y.name} \u0C87\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2\u0C95\u0CB0 \u0CAB\u0CB2\u0CBF\u0CA4\u0CBE\u0C82\u0CB6\u0C97\u0CB3\u0CC1 \u0CB8\u0CBF\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6.` : `${y.name} is present, traditionally signifying favorable outcomes in its domain.`;
    });
  }
  static generateChallenges(yogas, lang) {
    const negativeYogas = yogas.filter((y) => y.detected && ["kemadruma", "daridra_yoga", "guru_chandal", "shakata_yoga"].includes(y.id));
    return negativeYogas.map((y) => {
      return lang === "te" ? `${y.name} \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C38\u0C35\u0C3E\u0C33\u0C4D\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C21\u0C4D\u0C21\u0C02\u0C15\u0C41\u0C32\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F, \u0C24\u0C17\u0C3F\u0C28 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C05\u0C35\u0C38\u0C30\u0C02.` : lang === "hi" ? `${y.name} \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0938\u0902\u092D\u093E\u0935\u093F\u0924 \u092C\u093E\u0927\u093E\u0913\u0902 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948, \u091C\u093F\u0928\u094D\u0939\u0947\u0902 \u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0909\u092A\u093E\u092F\u094B\u0902 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964` : lang === "ta" ? `${y.name} \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD \u0B9A\u0BBE\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BAE\u0BBE\u0BA9 \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9, \u0BA4\u0B95\u0BC1\u0BA8\u0BCD\u0BA4 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8.` : lang === "kn" ? `${y.name} \u0C87\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0CB8\u0C82\u0CAD\u0CBE\u0CB5\u0CCD\u0CAF \u0C85\u0CA1\u0CC6\u0CA4\u0CA1\u0CC6\u0C97\u0CB3\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB5\u0CC6, \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6.` : `${y.name} is present, suggesting potential hurdles requiring resilience or traditional remedies.`;
    });
  }
  static generateRemedies(chart, yogas, lang) {
    const remedies = [];
    const debilitated = Object.values(chart.planets).filter((p) => p.dignity === "Debilitated");
    debilitated.forEach((p) => {
      const pL = translatePlanet(p.name.en, lang);
      remedies.push(lang === "te" ? `\u0C28\u0C40\u0C1A \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B \u0C09\u0C28\u0C4D\u0C28 ${pL} \u0C15\u0C4A\u0C30\u0C15\u0C41 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C02: \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3F\u0C24 \u0C2E\u0C02\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C2A\u0C20\u0C3F\u0C02\u0C1A\u0C21\u0C02, \u0C06 \u0C30\u0C4B\u0C1C\u0C41 \u0C09\u0C2A\u0C35\u0C3E\u0C38\u0C02 \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C21\u0C02 \u0C38\u0C42\u0C1A\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0928\u0940\u091A \u0915\u0947 ${pL} \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u093E\u092F: \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u0917\u094D\u0930\u0939\u094B\u0902 \u0915\u0947 \u092E\u0902\u0924\u094D\u0930\u094B\u0902 \u0915\u093E \u091C\u093E\u092A, \u0909\u0938 \u0926\u093F\u0928 \u0909\u092A\u0935\u093E\u0938 \u092F\u093E \u0926\u093E\u0928 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964` : lang === "ta" ? `\u0BA8\u0BC0\u0B9A\u0BAE\u0BBE\u0BA9 ${pL}\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD: \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BCD\u0B9F \u0B95\u0BBF\u0BB0\u0B95 \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B89\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1, \u0B85\u0BA8\u0BCD\u0BA4 \u0BA8\u0BBE\u0BB3\u0BBF\u0BB2\u0BCD \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1 \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.` : lang === "kn" ? `\u0CA8\u0CC0\u0C9A \u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 ${pL}\u0C97\u0CBE\u0C97\u0CBF \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0: \u0CA8\u0CBF\u0CB0\u0CCD\u0CA6\u0CBF\u0CB7\u0CCD\u0C9F \u0C97\u0CCD\u0CB0\u0CB9 \u0CAE\u0C82\u0CA4\u0CCD\u0CB0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CA0\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1, \u0C86 \u0CA6\u0CBF\u0CA8 \u0C89\u0CAA\u0CB5\u0CBE\u0CB8 \u0C85\u0CA5\u0CB5\u0CBE \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CC1\u0CB5\u0CC1\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `Traditional Vedic remedy for debilitated ${pL}: Consider specific planetary mantras, fasting on associated weekdays, or charity directed to related causes.`);
    });
    if (yogas.some((y) => y.id === "kemadruma" && y.detected)) {
      remedies.push(lang === "te" ? "\u0C15\u0C47\u0C2E\u0C26\u0C4D\u0C30\u0C41\u0C2E \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C02: \u0C36\u0C3F\u0C35\u0C41\u0C28\u0C3F \u0C06\u0C30\u0C3E\u0C27\u0C28 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C36\u0C3F\u0C35 \u0C2A\u0C02\u0C1A\u0C3E\u0C15\u0C4D\u0C37\u0C30\u0C40 \u0C2E\u0C02\u0C24\u0C4D\u0C30 \u0C1C\u0C2A\u0C02 \u0C2E\u0C28\u0C38\u0C4D\u0C38\u0C41\u0C28\u0C41 \u0C38\u0C4D\u0C25\u0C3F\u0C30\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C38\u0C42\u0C1A\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0915\u0947\u092E\u0926\u094D\u0930\u0941\u092E \u0909\u092A\u093E\u092F: \u092D\u0917\u0935\u093E\u0928 \u0936\u093F\u0935 \u0915\u0940 \u092A\u0942\u091C\u093E \u0914\u0930 \u0936\u093F\u0935 \u092A\u0902\u091A\u093E\u0915\u094D\u0937\u0930\u0940 \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u091C\u093E\u092A \u092E\u0928 \u0915\u094B \u0938\u094D\u0925\u093F\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0939\u0948\u0964" : lang === "ta" ? "\u0B95\u0BC7\u0BAE\u0BA4\u0BCD\u0BB0\u0BC1\u0BAE \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD: \u0BAE\u0BA9\u0BA4\u0BC8 \u0B9A\u0BC0\u0BB0\u0BBE\u0B95 \u0BB5\u0BC8\u0B95\u0BCD\u0B95 \u0B9A\u0BBF\u0BB5\u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BBE\u0BA9\u0BC8 \u0BB5\u0BB4\u0BBF\u0BAA\u0B9F\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD, \u0B9A\u0BBF\u0BB5 \u0BAA\u0B9E\u0BCD\u0B9A\u0BBE\u0B9F\u0BCD\u0B9A\u0BB0\u0BBF \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C95\u0CC7\u0CAE\u0CA6\u0CCD\u0CB0\u0CC1\u0CAE \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0: \u0CAE\u0CA8\u0CB8\u0CCD\u0CB8\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CCD\u0CA5\u0CBF\u0CB0\u0CB5\u0CBE\u0C97\u0CBF\u0CA1\u0CB2\u0CC1 \u0CB6\u0CBF\u0CB5\u0CA8 \u0C86\u0CB0\u0CBE\u0CA7\u0CA8\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB6\u0CBF\u0CB5 \u0CAA\u0C82\u0C9A\u0CBE\u0C95\u0CCD\u0CB7\u0CB0\u0CBF \u0CAE\u0C82\u0CA4\u0CCD\u0CB0 \u0CAA\u0CA0\u0CA3\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6." : "Traditional remedy for Kemadruma: Worship of Lord Shiva and chanting the Shiva Panchakshari Mantra is often recommended to steady the mind.");
    }
    if (yogas.some((y) => y.id === "daridra_yoga" && y.detected)) {
      remedies.push(lang === "te" ? "\u0C26\u0C30\u0C3F\u0C26\u0C4D\u0C30 \u0C2F\u0C4B\u0C17 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C02: \u0C2A\u0C47\u0C26\u0C32\u0C15\u0C41 \u0C15\u0C4D\u0C30\u0C2E\u0C02 \u0C24\u0C2A\u0C4D\u0C2A\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C21\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C35\u0C3F\u0C37\u0C2F\u0C3E\u0C32\u0C28\u0C41 \u0C15\u0C4D\u0C30\u0C2E\u0C2C\u0C26\u0C4D\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C35\u0C21\u0C02 \u0C2E\u0C02\u0C1A\u0C3F\u0C26\u0C3F." : lang === "hi" ? "\u0926\u0930\u093F\u0926\u094D\u0930 \u092F\u094B\u0917 \u0909\u092A\u093E\u092F: \u0935\u0902\u091A\u093F\u0924\u094B\u0902 \u0915\u094B \u0928\u093F\u092F\u092E\u093F\u0924 \u0926\u093E\u0928 \u0926\u0947\u0928\u093E \u0914\u0930 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0935\u093F\u0924\u094D\u0924 \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093F\u0924 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u092C\u0928\u093E\u090F \u0930\u0916\u0928\u0947 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BA4\u0BB0\u0BBF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAF\u0BCB\u0B95 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD: \u0B8F\u0BB4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA4\u0BCA\u0B9F\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD, \u0BA4\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0BA8\u0BBF\u0BA4\u0BBF\u0B95\u0BB3\u0BC8 \u0BAE\u0BC1\u0BB1\u0BC8\u0BAF\u0BBE\u0B95 \u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD \u0B85\u0BB1\u0BBF\u0BB5\u0BC1\u0BB1\u0BC1\u0BA4\u0BCD\u0BA4\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0CA6\u0CB0\u0CBF\u0CA6\u0CCD\u0CB0 \u0CAF\u0CCB\u0C97 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0: \u0CAC\u0CA1\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 \u0CA8\u0CBF\u0CAF\u0CAE\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CC8\u0CAF\u0C95\u0CCD\u0CA4\u0CBF\u0C95 \u0CB9\u0CA3\u0C95\u0CBE\u0CB8\u0CC1\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB5\u0CCD\u0CAF\u0CB5\u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF \u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE." : "Traditional remedy for Daridra Yoga: Regular donations to the underprivileged and maintaining an organized approach to personal finances is advised.");
    }
    if (remedies.length === 0) {
      remedies.push(lang === "te" ? "\u0C24\u0C40\u0C35\u0C4D\u0C30\u0C2E\u0C48\u0C28 \u0C38\u0C3E\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3E\u0C2F \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C05\u0C35\u0C38\u0C30\u0C2E\u0C48\u0C28 \u0C2A\u0C4D\u0C30\u0C24\u0C4D\u0C2F\u0C47\u0C15\u0C2E\u0C48\u0C28 \u0C17\u0C4D\u0C30\u0C39 \u0C26\u0C4B\u0C37\u0C3E\u0C32\u0C41 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41. \u0C27\u0C30\u0C4D\u0C2E\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C2A\u0C3E\u0C1F\u0C3F\u0C02\u0C1A\u0C21\u0C02 \u0C2E\u0C02\u0C1A\u0C3F\u0C26\u0C3F." : lang === "hi" ? "\u0917\u0939\u0928 \u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0909\u092A\u093E\u092F\u094B\u0902 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0935\u093E\u0932\u0947 \u0915\u093F\u0938\u0940 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0917\u094D\u0930\u0939 \u0926\u094B\u0937 \u0915\u093E \u092A\u0924\u093E \u0928\u0939\u0940\u0902 \u091A\u0932\u093E \u0939\u0948\u0964 \u0927\u0930\u094D\u092E \u0915\u093E \u092A\u093E\u0932\u0928 \u0915\u0930\u0928\u0947 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964" : lang === "ta" ? "\u0BA4\u0BC0\u0BB5\u0BBF\u0BB0\u0BAE\u0BBE\u0BA9 \u0BAA\u0BBE\u0BB0\u0BAE\u0BCD\u0BAA\u0BB0\u0BBF\u0BAF \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BCD\u0B9F \u0B95\u0BBF\u0BB0\u0B95 \u0BA4\u0BCB\u0BB7\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BA4\u0BB0\u0BCD\u0BAE\u0BA4\u0BCD\u0BA4\u0BC8 \u0BAA\u0BBF\u0BA9\u0BCD\u0BAA\u0BB1\u0BCD\u0BB1\u0BC1\u0BB5\u0BA4\u0BC1 \u0BA8\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1." : lang === "kn" ? "\u0CA4\u0CC0\u0CB5\u0CCD\u0CB0\u0CB5\u0CBE\u0CA6 \u0CB8\u0CBE\u0C82\u0CAA\u0CCD\u0CB0\u0CA6\u0CBE\u0CAF\u0CBF\u0C95 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CB0\u0CC1\u0CB5 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CA8\u0CBF\u0CB0\u0CCD\u0CA6\u0CBF\u0CB7\u0CCD\u0C9F \u0C97\u0CCD\u0CB0\u0CB9 \u0CA6\u0CCB\u0CB7\u0C97\u0CB3\u0CC1 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA7\u0CB0\u0CCD\u0CAE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CBE\u0CB2\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE." : "No specific planetary afflictions requiring intense traditional remedies were detected. General mindfulness and adherence to Dharma is recommended.");
    }
    return remedies;
  }
};

// src/utils/astroCalc.ts
var import_swisseph = __toESM(require_swisseph(), 1);
function getJulianDate(year, month, day, hour, minute, timezone) {
  const utcHour = hour + minute / 60 - timezone;
  return import_swisseph.default.swe_julday(year, month, day, utcHour, import_swisseph.default.SE_GREG_CAL);
}
function getAyanamsa(jd, type = "Lahiri") {
  let mode = import_swisseph.default.SE_SIDM_LAHIRI;
  switch (type) {
    case "Raman":
      mode = import_swisseph.default.SE_SIDM_RAMAN;
      break;
    case "Krishnamurti":
      mode = import_swisseph.default.SE_SIDM_KRISHNAMURTI;
      break;
    case "Fagan-Bradley":
      mode = import_swisseph.default.SE_SIDM_FAGAN_BRADLEY;
      break;
    case "Yukteswar":
      mode = import_swisseph.default.SE_SIDM_YUKTESHWAR;
      break;
    case "Tropical":
      return 0;
  }
  import_swisseph.default.swe_set_sid_mode(mode, 0, 0);
  return import_swisseph.default.swe_get_ayanamsa_ut(jd);
}
function determineDignity(planetName, longitude, rasiIndex) {
  return "Neutral";
}
var SE_BODIES = {
  "Sun": import_swisseph.default.SE_SUN,
  "Moon": import_swisseph.default.SE_MOON,
  "Mars": import_swisseph.default.SE_MARS,
  "Mercury": import_swisseph.default.SE_MERCURY,
  "Jupiter": import_swisseph.default.SE_JUPITER,
  "Venus": import_swisseph.default.SE_VENUS,
  "Saturn": import_swisseph.default.SE_SATURN,
  "Uranus": import_swisseph.default.SE_URANUS,
  "Neptune": import_swisseph.default.SE_NEPTUNE,
  "Pluto": import_swisseph.default.SE_PLUTO,
  "Rahu": import_swisseph.default.SE_TRUE_NODE,
  // Default True Node for Jyotish if not specified
  "Ketu": import_swisseph.default.SE_TRUE_NODE,
  "True Node": import_swisseph.default.SE_TRUE_NODE,
  "Mean Node": import_swisseph.default.SE_MEAN_NODE
};
function computePlanetPosition(planetName, jd, ayanamsa, lang = "en") {
  const seId = SE_BODIES[planetName];
  if (seId === void 0) {
    throw new Error(`Unknown planet: ${planetName}`);
  }
  const flag = import_swisseph.default.SEFLG_SIDEREAL | import_swisseph.default.SEFLG_SPEED;
  const result = import_swisseph.default.swe_calc_ut(jd, seId, flag);
  const eqFlag = import_swisseph.default.SEFLG_EQUATORIAL | import_swisseph.default.SEFLG_SPEED;
  const eqResult = import_swisseph.default.swe_calc_ut(jd, seId, eqFlag);
  let longitude = result.longitude;
  let latitude = result.latitude;
  let distance = result.distance;
  let speed = result.longitudeSpeed;
  let declination = eqResult.declination;
  let obliquity = eqResult.distance;
  if (planetName === "Ketu") {
    longitude = (longitude + 180) % 360;
    latitude = -latitude;
    declination = -declination;
  }
  while (longitude < 0) longitude += 360;
  longitude %= 360;
  const isRetrograde = speed < 0 && planetName !== "Rahu" && planetName !== "Ketu" && planetName !== "Mean Node" && planetName !== "True Node" && planetName !== "Sun" && planetName !== "Moon";
  const isCombust = false;
  const rasiIndex = Math.floor(longitude / 30);
  const signDegree = longitude % 30;
  const nakshatraExact = longitude / (13 + 1 / 3);
  const nakshatraIndex = Math.floor(nakshatraExact);
  const pada = Math.floor((nakshatraExact - nakshatraIndex) * 4) + 1;
  const navamsaDegree = longitude * 9;
  const navamsaIndex = Math.floor(navamsaDegree / 30) % 12;
  const RASHI_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const NAK_NAMES = ["Aswini", "Bharani", "Krittika", "Rohini", "Mrigasira", "Aardra", "Punarvasu", "Pushyami", "Aasresha", "Makha", "Poorva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swaati", "Visaakha", "Anooraadha", "Jyeshtha", "Moola", "Poorvaashaadha", "Uttaraashaadha", "Sravanam", "Dhanishtha", "Satabhishak", "Poorvaabhaadra", "Uttaraabhaadra", "Revati"];
  return {
    id: planetName.toLowerCase(),
    name: LocalizationService.getPlanet(planetName.toLowerCase()).name,
    longitude,
    latitude,
    distance,
    declination,
    obliquity: 0,
    speed,
    degree: longitude,
    signDegree,
    rasiIndex,
    rasi: LocalizationService.getRasi(RASHI_NAMES[rasiIndex]),
    house: 0,
    // Assigned later by lagna
    nakshatraIndex,
    nakshatra: LocalizationService.getNakshatra(NAK_NAMES[nakshatraIndex]),
    pada,
    navamsaIndex,
    navamsa: LocalizationService.getRasi(RASHI_NAMES[navamsaIndex]),
    isRetrograde,
    isCombust,
    dignity: determineDignity(planetName, longitude, rasiIndex),
    strength: 100
    // placeholder
  };
}
function getLagnaSidereal(jd, lat, lon, ayanamsa) {
  return getHouseData(jd, lat, lon, ayanamsa).ascendant;
}
function getHouseData(jd, lat, lon, ayanamsa) {
  const flag = import_swisseph.default.SEFLG_SIDEREAL;
  const result = import_swisseph.default.swe_houses_ex(jd, flag, lat, lon, "W");
  let ascendant = result.ascendant;
  while (ascendant < 0) ascendant += 360;
  ascendant %= 360;
  return {
    ascendant,
    mc: result.mc,
    armc: result.armc,
    vertex: result.vertex,
    equatorialAscendant: result.equatorialAscendant,
    coAscendant: result.coAscendant,
    cusps: result.house
    // usually an array where cusps[1] is 1st house cusp, etc.
  };
}
function generateDivisionalCharts(planets, lagnaLong, lang) {
  const charts = [];
  const divisions = [
    { code: "D1", name: "Rasi", divisor: 1, type: "regular" },
    { code: "D2", name: "Hora", divisor: 2, type: "hora" },
    { code: "D3", name: "Drekkana", divisor: 3, type: "drekkana" },
    { code: "D4", name: "Chaturthamsa", divisor: 4, type: "chaturthamsa" },
    { code: "D7", name: "Saptamsa", divisor: 7, type: "saptamsa" },
    { code: "D9", name: "Navamsa", divisor: 9, type: "navamsa" },
    { code: "D10", name: "Dasamsa", divisor: 10, type: "dasamsa" },
    { code: "D12", name: "Dwadasamsa", divisor: 12, type: "dwadasamsa" },
    { code: "D16", name: "Shodasamsa", divisor: 16, type: "shodasamsa" },
    { code: "D20", name: "Vimsamsa", divisor: 20, type: "vimsamsa" },
    { code: "D24", name: "Chaturvimsamsa", divisor: 24, type: "chaturvimsamsa" },
    { code: "D27", name: "Nakshatramsa", divisor: 27, type: "nakshatramsa" },
    { code: "D30", name: "Trimsamsa", divisor: 30, type: "trimsamsa" },
    { code: "D40", name: "Khavedamsa", divisor: 40, type: "khavedamsa" },
    { code: "D45", name: "Akshavedamsa", divisor: 45, type: "akshavedamsa" },
    { code: "D60", name: "Shashtyamsa", divisor: 60, type: "shashtyamsa" }
  ];
  const RASHI_NAMES = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const getVargaRasi = (longitude, rasiIdx, type, n) => {
    const signDeg = longitude % 30;
    const part = Math.floor(signDeg * n / 30);
    switch (type) {
      case "regular":
        return rasiIdx;
      case "hora":
        if (rasiIdx % 2 === 0) return part === 0 ? 4 : 3;
        else return part === 0 ? 3 : 4;
      // Even sign (1st=Cancer, 2nd=Leo)
      case "drekkana":
        if (part === 0) return rasiIdx;
        if (part === 1) return (rasiIdx + 4) % 12;
        return (rasiIdx + 8) % 12;
      case "chaturthamsa":
        if (part === 0) return rasiIdx;
        if (part === 1) return (rasiIdx + 3) % 12;
        if (part === 2) return (rasiIdx + 6) % 12;
        return (rasiIdx + 9) % 12;
      case "saptamsa":
        if (rasiIdx % 2 === 0) return (rasiIdx + part) % 12;
        else return (rasiIdx + 6 + part) % 12;
      // Even
      case "navamsa":
        const element = rasiIdx % 4;
        let startRasi = 0;
        if (element === 1) startRasi = 9;
        if (element === 2) startRasi = 6;
        if (element === 3) startRasi = 3;
        return (startRasi + part) % 12;
      case "dasamsa":
        if (rasiIdx % 2 === 0) return (rasiIdx + part) % 12;
        else return (rasiIdx + 8 + part) % 12;
      // Even starts from 9th (index + 8)
      case "dwadasamsa":
        return (rasiIdx + part) % 12;
      case "shodasamsa":
        const type16 = rasiIdx % 3;
        if (type16 === 0) return (0 + part) % 12;
        if (type16 === 1) return (4 + part) % 12;
        return (8 + part) % 12;
      // Sg
      case "vimsamsa":
        const type20 = rasiIdx % 3;
        if (type20 === 0) return (0 + part) % 12;
        if (type20 === 1) return (8 + part) % 12;
        return (4 + part) % 12;
      case "chaturvimsamsa":
        if (rasiIdx % 2 === 0) return (4 + part) % 12;
        else return (3 + part) % 12;
      // Even starts from Cancer
      case "nakshatramsa":
        const elem27 = rasiIdx % 4;
        if (elem27 === 0) return (0 + part) % 12;
        if (elem27 === 1) return (3 + part) % 12;
        if (elem27 === 2) return (6 + part) % 12;
        return (9 + part) % 12;
      // Capricorn
      case "trimsamsa":
        const deg = signDeg;
        if (rasiIdx % 2 === 0) {
          if (deg <= 5) return 0;
          if (deg <= 10) return 10;
          if (deg <= 18) return 8;
          if (deg <= 25) return 2;
          return 6;
        } else {
          if (deg <= 5) return 1;
          if (deg <= 12) return 5;
          if (deg <= 20) return 11;
          if (deg <= 25) return 9;
          return 7;
        }
      case "khavedamsa":
        if (rasiIdx % 2 === 0) return (0 + part) % 12;
        else return (6 + part) % 12;
      case "akshavedamsa":
        const type45 = rasiIdx % 3;
        if (type45 === 0) return (0 + part) % 12;
        if (type45 === 1) return (4 + part) % 12;
        return (8 + part) % 12;
      case "shashtyamsa":
        return (rasiIdx + part) % 12;
      default:
        return rasiIdx;
    }
  };
  for (const div of divisions) {
    const lagnaRasiIdx = getVargaRasi(lagnaLong, Math.floor(lagnaLong / 30), div.type, div.divisor);
    const points = [];
    points.push({
      planet: { id: "ascendant", name: { en: "Ascendant" } },
      longitude: lagnaLong,
      signIndex: lagnaRasiIdx,
      sign: LocalizationService.getRasi(RASHI_NAMES[lagnaRasiIdx]),
      house: 1
    });
    for (const p of planets) {
      const vRasiIdx = getVargaRasi(p.longitude, p.rasiIndex, div.type, div.divisor);
      const house = (vRasiIdx - lagnaRasiIdx + 12) % 12 + 1;
      points.push({
        planet: LocalizationService.getPlanet(p.id),
        longitude: p.longitude,
        signIndex: vRasiIdx,
        sign: LocalizationService.getRasi(RASHI_NAMES[vRasiIdx]),
        house
      });
    }
    charts.push({
      name: div.name,
      code: div.code,
      description: div.name + " Chart",
      points
    });
  }
  return charts;
}

// src/services/astrologyService.ts
var VIMSHOTTARI_LORDS = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
var VIMSHOTTARI_DURATIONS = [7, 20, 6, 10, 7, 18, 16, 19, 17];
var NAKSHATRA_LORDS = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  // 0-8
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  // 9-17
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury"
  // 18-26
];
var NAKSHATRA_SYLLABLES = [
  ["Chu", "Che", "Cho", "La"],
  // Ashwini
  ["Lee", "Loo", "Le", "Lo"],
  // Bharani
  ["A", "Ee", "U", "Ea"],
  // Krittika
  ["O", "Va", "Vee", "Voo"],
  // Rohini
  ["Ve", "Vo", "Ka", "Kee"],
  // Mrigashira
  ["Ku", "Gha", "Ng", "Chha"],
  // Ardra
  ["Ke", "Ko", "Ha", "Hee"],
  // Punarvasu
  ["Hoo", "He", "Ho", "Da"],
  // Pushya
  ["Dee", "Doo", "De", "Do"],
  // Ashlesha
  ["Ma", "Mee", "Moo", "Me"],
  // Magha
  ["Mo", "Ta", "Tee", "Too"],
  // Purva Phalguni
  ["Te", "To", "Pa", "Pee"],
  // Uttara Phalguni
  ["Poo", "Sha", "Na", "Tha"],
  // Hasta
  ["Pe", "Po", "Ra", "Ree"],
  // Chitra
  ["Roo", "Re", "Ro", "Taa"],
  // Swati
  ["Tee", "Too", "Te", "To"],
  // Vishakha
  ["Na", "Nee", "Noo", "Ne"],
  // Anuradha
  ["No", "Ya", "Yee", "Yoo"],
  // Jyeshtha
  ["Ye", "Yo", "Bha", "Bhee"],
  // Mula
  ["Bhoo", "Dha", "Ph", "Dha"],
  // Purva Ashadha
  ["Bhe", "Bho", "Ja", "Jee"],
  // Uttara Ashadha
  ["Ju", "Je", "Jo", "Gha"],
  // Shravana
  ["Ga", "Gee", "Goo", "Ge"],
  // Dhanishta
  ["Go", "Sa", "See", "Soo"],
  // Shatabhisha
  ["Se", "So", "Da", "Dee"],
  // Purva Bhadrapada
  ["Doo", "Tha", "Jha", "Na"],
  // Uttara Bhadrapada
  ["De", "Do", "Cha", "Chee"]
  // Revati
];
var BABY_NAMES_SEED = [
  { name: "Aarav", meaning: "Peaceful", gender: "M", start: "A" },
  { name: "Chaitra", meaning: "Bright, Chaitra Month", gender: "F", start: "Cha" },
  { name: "Chandran", meaning: "Moon", gender: "M", start: "Cha" },
  { name: "Lalith", meaning: "Beautiful, Elegant", gender: "M", start: "La" },
  { name: "Lalitha", meaning: "Elegant Woman", gender: "F", start: "La" },
  { name: "Ishaan", meaning: "Lord Shiva, Sun", gender: "M", start: "Ee" },
  { name: "Vanya", meaning: "Gracious gift of God", gender: "F", start: "Va" },
  { name: "Varun", meaning: "Lord of Water", gender: "M", start: "Va" },
  { name: "Kiran", meaning: "Ray of Light", gender: "M", start: "Kee" },
  { name: "Keerthi", meaning: "Fame, Glory", gender: "F", start: "Kee" },
  { name: "Hari", meaning: "Lord Vishnu", gender: "M", start: "Ha" },
  { name: "Meena", meaning: "Precious Stone, Fish", gender: "F", start: "Me" },
  { name: "Namitha", meaning: "Humble", gender: "F", start: "Na" },
  { name: "Suresh", meaning: "Ruler of Gods", gender: "M", start: "So" },
  { name: "Deepak", meaning: "Lamp, Light", gender: "M", start: "Dee" }
];
var AstrologyService = class _AstrologyService {
  // Calculate Complete Panchang & Planets Positions
  static calcPanchang(input) {
    const lang = input.lang || "en";
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const bodies = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const planets = bodies.map((b) => computePlanetPosition(b, jd, ayanamsaSec, lang));
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30);
    planets.forEach((p) => {
      p.house = (p.rasiIndex - lagnaRasi + 12) % 12 + 1;
    });
    const sun = planets.find((p) => p.id === "sun");
    const moon = planets.find((p) => p.id === "moon");
    let tithiDiff = (moon.longitude - sun.longitude + 360) % 360;
    const tithiIdx = Math.floor(tithiDiff / 12);
    const tithiRem = 12 - tithiDiff % 12;
    const paksha = tithiIdx < 15 ? "Shukla" : "Krishna";
    const sunRasi = Math.floor(sun.longitude / 30);
    const lunarMonthIdx = sunRasi;
    const rituIdx = Math.floor(sunRasi / 2);
    const ayana = sunRasi >= 3 && sunRasi <= 8 ? "Dakshinayana" : "Uttarayana";
    const samvatsaraIdx = (input.year - 1987 + 1 + 6e3) % 60;
    const nakIdx = Math.floor(moon.longitude / (360 / 27));
    const nakRem = 360 / 27 - moon.longitude % (360 / 27);
    const yogaDiff = (sun.longitude + moon.longitude) % 360;
    const yogaIdx = Math.floor(yogaDiff / (360 / 27));
    const yogaRem = 360 / 27 - yogaDiff % (360 / 27);
    const karanaIdx = Math.floor(tithiDiff / 6);
    const latFactor = input.latitude * 0.04;
    const sunriseHr = 6 - 0.5 * Math.sin((sun.longitude - 90) * Math.PI / 180) * Math.sin(latitudeToRad(input.latitude));
    const sunsetHr = 18 + 0.5 * Math.sin((sun.longitude - 90) * Math.PI / 180) * Math.sin(latitudeToRad(input.latitude));
    const formatHrMin = (hr) => {
      const h = Math.floor(hr + input.timezone);
      const m = Math.floor((hr + input.timezone - h) * 60);
      const absH = (h + 24) % 24;
      return `${absH.toString().padStart(2, "0")}:${Math.abs(m).toString().padStart(2, "0")}`;
    };
    const sunriseStr = formatHrMin(sunriseHr);
    const sunsetStr = formatHrMin(sunsetHr);
    const dayLen = sunsetHr - sunriseHr;
    const partLen = dayLen / 8;
    const dateObj = new Date(input.year, input.month - 1, input.day);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayStr = weekdays[dateObj.getDay()];
    const getPartTime = (partIdx) => {
      const start = sunriseHr + partIdx * partLen;
      const end = start + partLen;
      return { start: formatHrMin(start), end: formatHrMin(end) };
    };
    const rahuTable = {
      Sunday: 7,
      Monday: 1,
      Tuesday: 6,
      Wednesday: 4,
      Thursday: 5,
      Friday: 3,
      Saturday: 2
    };
    const yamaTable = {
      Sunday: 4,
      Monday: 3,
      Tuesday: 2,
      Wednesday: 1,
      Thursday: 7,
      Friday: 6,
      Saturday: 5
    };
    const guliTable = {
      Sunday: 6,
      Monday: 5,
      Tuesday: 4,
      Wednesday: 3,
      Thursday: 2,
      Friday: 1,
      Saturday: 0
    };
    const rahuPart = rahuTable[weekdayStr] || 0;
    const yamaPart = yamaTable[weekdayStr] || 0;
    const guliPart = guliTable[weekdayStr] || 0;
    const festivals = [];
    if (tithiIdx === 10) festivals.push(paksha === "Shukla" ? "Shukla Ekadashi Vrat" : "Krishna Ekadashi Vrat");
    if (tithiIdx === 14 && paksha === "Krishna") festivals.push("Maha Shivaratri / Pradosham");
    if (tithiIdx === 14 && paksha === "Shukla") festivals.push("Pournami Vrat / Satyanarayana Pooja");
    if (tithiIdx === 29) festivals.push("Amavasya Pitru Tarpanam");
    return {
      sunrise: sunriseStr,
      sunset: sunsetStr,
      moonrise: formatHrMin(sunriseHr + 1.2),
      // Moon rises approx 50 mins later each day
      moonset: formatHrMin(sunsetHr + 1.2),
      rahuKalam: getPartTime(rahuPart),
      yamagandam: getPartTime(yamaPart),
      gulikai: getPartTime(guliPart),
      durmuhurtham: [getPartTime(1), getPartTime(5)],
      abhijit: { start: formatHrMin(11.6), end: formatHrMin(12.4) },
      brahmaMuhurta: { start: formatHrMin(sunriseHr - 1.5), end: formatHrMin(sunriseHr - 0.75) },
      tithi: {
        index: tithiIdx,
        name: { en: translateTithi(tithiIdx, "en") },
        degreeRemaining: tRemToDeg(tithiRem),
        paksha,
        pakshaName: { en: PAKSHA_TRANSLATIONS[paksha]["en"] }
      },
      nakshatra: {
        index: nakIdx,
        entity: LocalizationService.getNakshatra(nakIdx.toString()),
        lord: LocalizationService.getPlanet(NAKSHATRA_LORDS[nakIdx].toLowerCase()),
        degreeRemaining: nakRem
      },
      yoga: {
        index: yogaIdx,
        name: { en: translateYoga(yogaIdx, "en") },
        degreeRemaining: yogaRem
      },
      karana: {
        index: karanaIdx,
        name: { en: translateKarana(karanaIdx, "en") }
      },
      festivals: festivals.map((f) => translateFestival(f, lang)),
      lunarMonth: { en: `Month ${lunarMonthIdx}` },
      samvatsara: { en: `Samvatsara ${samvatsaraIdx}` },
      ritu: { en: `Ritu ${rituIdx}` },
      ayana: { en: ayana },
      planets
    };
  }
  // Calculate Vimshottari Dasha Periods
  static calcVimshottariDasha(moonLong, birthYear, lang) {
    const totalNakDegrees = 360 / 27;
    const nakIdx = Math.floor(moonLong / totalNakDegrees);
    const degreeInNak = moonLong % totalNakDegrees;
    const fractionConsumed = degreeInNak / totalNakDegrees;
    const startLordIdx = nakIdx % 9;
    const timeline = [];
    let currentYear = birthYear;
    let lordPtr = startLordIdx;
    const firstLordName = VIMSHOTTARI_LORDS[lordPtr];
    const firstLordTotalDuration = VIMSHOTTARI_DURATIONS[lordPtr];
    const initialElapsed = fractionConsumed * firstLordTotalDuration;
    const initialRemaining = firstLordTotalDuration - initialElapsed;
    for (let i = 0; i < 9; i++) {
      const idx = (startLordIdx + i) % 9;
      const lordName = VIMSHOTTARI_LORDS[idx];
      const duration = i === 0 ? initialRemaining : VIMSHOTTARI_DURATIONS[idx];
      const startD = currentYear;
      const endD = currentYear + duration;
      currentYear = endD;
      const subDashas = [];
      let subStart = startD;
      for (let j = 0; j < 9; j++) {
        const subIdx = (idx + j) % 9;
        const subLord = VIMSHOTTARI_LORDS[subIdx];
        const subDuration = VIMSHOTTARI_DURATIONS[idx] * VIMSHOTTARI_DURATIONS[subIdx] / 120;
        const actualSubDuration = i === 0 ? subDuration * (duration / firstLordTotalDuration) : subDuration;
        subDashas.push({
          lord: subLord,
          localizedLord: translatePlanet(subLord, lang),
          startTime: `${Math.floor(subStart)}-01-01`,
          endTime: `${Math.floor(subStart + actualSubDuration)}-01-01`,
          durationYears: actualSubDuration
        });
        subStart += actualSubDuration;
      }
      timeline.push({
        lord: lordName,
        localizedLord: translatePlanet(lordName, lang),
        startTime: `${Math.floor(startD)}-01-01`,
        endTime: `${Math.floor(endD)}-01-01`,
        durationYears: duration,
        subDashas
      });
    }
    return {
      mahadasha: timeline[0].lord,
      localizedMahadasha: timeline[0].localizedLord,
      antardasha: timeline[0].subDashas[0].lord,
      localizedAntardasha: timeline[0].subDashas[0].localizedLord,
      pratyantardasha: timeline[0].subDashas[0].lord,
      // default proxy
      localizedPratyantardasha: timeline[0].subDashas[0].localizedLord,
      timeRemainingYears: initialRemaining,
      timeline
    };
  }
  // Detect Doshas and generate remedies with full localization support for English, Hindi, Telugu, Tamil, and Kannada
  static detectDoshas(planets, lagnaLong, lang) {
    const lagnaRasi = Math.floor(lagnaLong / 30);
    const mars = planets.find((p) => p.id === "mars");
    const rahu = planets.find((p) => p.id === "rahu");
    const ketu = planets.find((p) => p.id === "ketu");
    const jupiter = planets.find((p) => p.id === "jupiter");
    const moon = planets.find((p) => p.id === "moon");
    const sun = planets.find((p) => p.id === "sun");
    const saturn = planets.find((p) => p.id === "saturn");
    const doshas = [];
    const translations = {
      manglik: {
        en: {
          name: LocalizationEngine.getInstance().get("DOSHA.MANGLIK", lang),
          descTrue: `Mars is placed in house ${mars.house} from Lagna. This can generate marital obstacles, arguments, and relationship friction.`,
          descFalse: "No Mars affliction detected in relationship houses.",
          remedies: [
            "Chant Mangal Gayatri Mantra: Om Angarkaya Namah",
            "Offer red flowers and lentils at Hanuman temples on Tuesdays",
            "Perform Kumbh Vivah or Vishnu Vivah before marriage if severity is high",
            "Donate copper, red clothes, or split red lentils to charity"
          ]
        },
        te: {
          name: LocalizationEngine.getInstance().get("DOSHA.MANGLIK", lang),
          descTrue: `\u0C32\u0C17\u0C4D\u0C28\u0C02 \u0C28\u0C41\u0C02\u0C21\u0C3F ${mars.house}\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41. \u0C07\u0C26\u0C3F \u0C35\u0C3F\u0C35\u0C3E\u0C39 \u0C06\u0C32\u0C38\u0C4D\u0C2F\u0C02, \u0C35\u0C3F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0938\u0902\u092C\u0902\u0927\u0C3E\u0C32\u0C32\u0C4B \u0C2E\u0C28\u0C38\u0C4D\u0C2A\u0C30\u0C4D\u0C25\u0C32\u0C28\u0C41 \u0C15\u0C32\u0C3F\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.`,
          descFalse: "\u0C38\u0C02\u0C2C\u0C02\u0C27 \u0C17\u0C43\u0C39\u0C3E\u0C32\u0C32\u0C4B \u0C15\u0C41\u0C1C \u0C26\u0C4B\u0C37 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C02 \u0C0F\u0C26\u0C40 \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C32\u0C47\u0C26\u0C41.",
          remedies: [
            "\u0C2E\u0C02\u0C17\u0C33 \u0C17\u0C3E\u0C2F\u0C24\u0C4D\u0C30\u0C40 \u0C2E\u0C02\u0C24\u0C4D\u0C30\u0C02 \u0C1C\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F: \u0C13\u0C02 \u0C05\u0C02\u0C17\u0C3E\u0C30\u0C15\u0C3E\u0C2F \u0C28\u0C2E\u0C03",
            "\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02 \u0C39\u0C28\u0C41\u0C2E\u0C3E\u0C28\u0C4D \u0C26\u0C47\u0C35\u0C3E\u0C32\u0C2F\u0C02\u0C32\u0C4B \u0C0E\u0C30\u0C4D\u0C30\u0C1F\u0C3F \u0C2A\u0C41\u0C35\u0C4D\u0C35\u0C41\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C02\u0C26\u0C41\u0C32\u0C28\u0C41 \u0C38\u0C2E\u0C30\u0C4D\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
            "\u0C24\u0C40\u0C35\u0C4D\u0C30\u0C24 \u0C0E\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C47 \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C15\u0C41\u0C02\u0C2D \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C35\u0C3F\u0C37\u0C4D\u0C23\u0C41 \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
            "\u0C30\u0C3E\u0C17\u0C3F, \u0C0E\u0C30\u0C4D\u0C30\u0C1F\u0C3F \u0C35\u0C38\u0C4D\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C02\u0C26\u0C3F\u0C2A\u0C2A\u0C4D\u0C2A\u0C41 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F"
          ]
        },
        hi: {
          name: LocalizationEngine.getInstance().get("DOSHA.MANGLIK", lang),
          descTrue: `\u0932\u0917\u094D\u0928 \u0938\u0947 ${mars.house}\u0935\u0947\u0902 \u092D\u093E\u0935 \u092E\u0947\u0902 \u092E\u0902\u0917\u0932 \u0938\u094D\u0925\u093F\u0924 \u0939\u0948\u0964 \u092F\u0939 \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u092C\u093E\u0927\u093E\u090F\u0902, \u0935\u093F\u0935\u093E\u0926 \u0914\u0930 \u0938\u0902\u092C\u0902\u0927\u094B\u0902 \u092E\u0947\u0902 \u0924\u0928\u093E\u0935 \u092A\u0948\u0926\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964`,
          descFalse: "\u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u092D\u093E\u0935\u094B\u0902 \u092E\u0947\u0902 \u092E\u0902\u0917\u0932 \u0915\u093E \u0915\u094B\u0908 \u0939\u093E\u0928\u093F\u0915\u093E\u0930\u0915 \u092A\u094D\u0930\u092D\u093E\u0935 \u0928\u0939\u0940\u0902 \u0926\u0947\u0916\u093E \u0917\u092F\u093E\u0964",
          remedies: [
            "\u092E\u0902\u0917\u0932 \u0917\u093E\u092F\u0924\u094D\u0930\u0940 \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u091C\u093E\u092A \u0915\u0930\u0947\u0902: \u0950 \u0905\u0902\u0917\u093E\u0930\u0915\u093E\u092F \u0928\u092E\u0903",
            "\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u0915\u094B \u0939\u0928\u0941\u092E\u093E\u0928 \u092E\u0902\u0926\u093F\u0930 \u092E\u0947\u0902 \u0932\u093E\u0932 \u092B\u0942\u0932 \u0914\u0930 \u092E\u0938\u0942\u0930 \u0915\u0940 \u0926\u093E\u0932 \u0905\u0930\u094D\u092A\u093F\u0924 \u0915\u0930\u0947\u0902",
            "\u092F\u0926\u093F \u0926\u094B\u0937 \u0905\u0927\u093F\u0915 \u0939\u094B \u0924\u094B \u0935\u093F\u0935\u093E\u0939 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u0941\u0902\u092D \u0935\u093F\u0935\u093E\u0939 \u092F\u093E \u0935\u093F\u0937\u094D\u0923\u0941 \u0935\u093F\u0935\u093E\u0939 \u0915\u0930\u0947\u0902",
            "\u0924\u093E\u0902\u092C\u093E, \u0932\u093E\u0932 \u0915\u092A\u0921\u093C\u0947 \u092F\u093E \u0932\u093E\u0932 \u092E\u0938\u0942\u0930 \u0915\u0940 \u0926\u093E\u0932 \u0926\u093E\u0928 \u0915\u0930\u0947\u0902"
          ]
        },
        ta: {
          name: LocalizationEngine.getInstance().get("DOSHA.MANGLIK", lang),
          descTrue: `\u0BB2\u0B95\u0BCD\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${mars.house}\u0BB5\u0BA4\u0BC1 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0B87\u0BA4\u0BC1 \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BC8 \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BBE\u0BAE\u0BCD.`,
          descFalse: "\u0B89\u0BB1\u0BB5\u0BC1 \u0BB5\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7 \u0BAA\u0BBE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
          remedies: [
            "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0B95\u0BBE\u0BAF\u0BA4\u0BCD\u0BB0\u0BBF \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD: \u0B93\u0BAE\u0BCD \u0B85\u0B99\u0BCD\u0B95\u0BBE\u0BB0\u0B95\u0BBE\u0BAF \u0BA8\u0BAE\u0BB9",
            "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B85\u0BA9\u0BC1\u0BAE\u0BA9\u0BCD \u0B95\u0BCB\u0BB5\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAE\u0BB2\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BC1\u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0B9A\u0BAE\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BA4\u0BBE\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BBE\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0B95\u0BC1\u0BAE\u0BCD\u0BAA \u0BB5\u0BBF\u0BB5\u0BBE\u0B95\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB7\u0BCD\u0BA3\u0BC1 \u0BB5\u0BBF\u0BB5\u0BBE\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0B9A\u0BC6\u0BAE\u0BCD\u0BAA\u0BC1, \u0B9A\u0BBF\u0BB5\u0BAA\u0BCD\u0BAA\u0BC1 \u0B86\u0B9F\u0BC8 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B89\u0BB3\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0BAA\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD"
          ]
        },
        kn: {
          name: LocalizationEngine.getInstance().get("DOSHA.MANGLIK", lang),
          descTrue: `\u0CB2\u0C97\u0CCD\u0CA8\u0CA6\u0CBF\u0C82\u0CA6 ${mars.house}\u0CA8\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0C82\u0C97\u0CB3\u0CA8\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6. \u0C87\u0CA6\u0CC1 \u0CB5\u0CC8\u0CB5\u0CBE\u0CB9\u0CBF\u0C95 \u0C85\u0CA1\u0CC6\u0CA4\u0CA1\u0CC6\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0C82\u0CAC\u0C82\u0CA7\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CB2\u0CB9\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C89\u0C82\u0C9F\u0CC1\u0CAE\u0CBE\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.`,
          descFalse: "\u0CB8\u0C82\u0CAC\u0C82\u0CA7\u0CA6 \u0CAE\u0CA8\u0CC6\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0C82\u0C97\u0CB3\u0CA8 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CA6\u0CC1\u0CB7\u0CCD\u0CAA\u0CB0\u0CBF\u0CA3\u0CBE\u0CAE \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
          remedies: [
            "\u0CAE\u0C82\u0C97\u0CB3 \u0C97\u0CBE\u0CAF\u0CA4\u0CCD\u0CB0\u0CBF \u0CAE\u0C82\u0CA4\u0CCD\u0CB0 \u0C9C\u0CAA\u0CBF\u0CB8\u0CBF: \u0C93\u0C82 \u0C85\u0C82\u0C97\u0CBE\u0CB0\u0C95\u0CBE\u0CAF \u0CA8\u0CAE\u0C83",
            "\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0 \u0CB9\u0CA8\u0CC1\u0CAE\u0CBE\u0CA8\u0CCD \u0CA6\u0CC7\u0CB5\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CC6\u0C82\u0CAA\u0CC1 \u0CB9\u0CC2\u0CB5\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA4\u0CCA\u0C97\u0CB0\u0CBF \u0CAC\u0CC7\u0CB3\u0CC6 \u0C85\u0CB0\u0CCD\u0CAA\u0CBF\u0CB8\u0CBF",
            "\u0CA6\u0CCB\u0CB7 \u0CA4\u0CC0\u0CB5\u0CCD\u0CB0\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CB0\u0CC6 \u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0C97\u0CC6 \u0CAE\u0CC1\u0CA8\u0CCD\u0CA8 \u0C95\u0CC1\u0C82\u0CAD \u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0C85\u0CA5\u0CB5\u0CBE \u0CB5\u0CBF\u0CB7\u0CCD\u0CA3\u0CC1 \u0CB5\u0CBF\u0CB5\u0CBE\u0CB9 \u0CAE\u0CBE\u0CA1\u0CBF",
            "\u0CA4\u0CBE\u0CAE\u0CCD\u0CB0, \u0C95\u0CC6\u0C82\u0CAA\u0CC1 \u0CB5\u0CB8\u0CCD\u0CA4\u0CCD\u0CB0 \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CC6\u0C82\u0CAA\u0CC1 \u0CAC\u0CC7\u0CB3\u0CC6 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF"
          ]
        }
      },
      kalasarpa: {
        en: {
          name: LocalizationEngine.getInstance().get("DOSHA.KALASARPA", lang),
          descTrue: "All planets are hemmed between Rahu and Ketu. Can bring struggles, sudden delays in achievements, and severe life shifts.",
          descFalse: "No cluster pattern between Rahu/Ketu detected.",
          remedies: [
            "Maha Mrityunjaya Mantra chanting daily (108 times)",
            "Perform Rahu-Ketu Shanti Puja at Kalahasti or Trimbakeshwar temples",
            "Donate black blankets or iron utensils to the needy",
            "Observe Vrat/fasting on Naag Panchami day"
          ]
        },
        te: {
          name: LocalizationEngine.getInstance().get("DOSHA.KALASARPA", lang),
          descTrue: "\u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C30\u0C3E\u0C39\u0C41\u0C35\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C47\u0C24\u0C41\u0C35\u0C41\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C2C\u0C02\u0C27\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F. \u0C07\u0C26\u0C3F \u0C2A\u0C4B\u0C30\u0C3E\u0C1F\u0C3E\u0C32\u0C41, \u0C35\u0C3F\u0C1C\u0C2F\u0C3E\u0C32\u0C32\u0C4B \u0C06\u0C15\u0C38\u0C4D\u0C2E\u0C3F\u0C15 \u0C1C\u0C3E\u0C2A\u0C4D\u0C2F\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1C\u0C40\u0C35\u0C3F\u0C24\u0C02\u0C32\u0C4B \u0C24\u0C40\u0C35\u0C4D\u0C30\u0C2E\u0C48\u0C28 \u0C2E\u0C3E\u0C30\u0C4D\u0C2A\u0C41\u0C32\u0C28\u0C41 \u0C24\u0C46\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
          descFalse: "\u0C30\u0C3E\u0C39\u0C41-\u0C15\u0C47\u0C24\u0C41\u0C35\u0C41\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C0F\u0C35\u0C3F\u0C27\u0C2E\u0C48\u0C28 \u0C38\u0C30\u0C4D\u0C2A \u0C26\u0C4B\u0C37 \u0C15\u0C42\u0C1F\u0C2E\u0C3F \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C32\u0C47\u0C26\u0C41.",
          remedies: [
            "\u0C30\u0C4B\u0C1C\u0C42 \u0C2E\u0C39\u0C3E \u0C2E\u0C43\u0C24\u0C4D\u0C2F\u0C41\u0C02\u0C1C\u0C2F \u0C2E\u0C02\u0C24\u0C4D\u0C30\u0C02 \u0C1C\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F (108 \u0C38\u0C3E\u0C30\u0C4D\u0C32\u0C41)",
            "\u0C15\u0C3E\u0C33\u0C39\u0C38\u0C4D\u0C24\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C24\u0C4D\u0C30\u0C2F\u0C02\u0C2C\u0C15\u0C47\u0C36\u0C4D\u0C35\u0C30\u0C4D \u0C06\u0C32\u0C2F\u0C3E\u0C32\u0C32\u0C4B \u0C30\u0C3E\u0C39\u0C41-\u0C15\u0C47\u0C24\u0C41 \u0C36\u0C3E\u0C02\u0C24\u0C3F \u0C2A\u0C42\u0C1C \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
            "\u0C2A\u0C47\u0C26\u0C32\u0C15\u0C41 \u0C28\u0C32\u0C4D\u0C32\u0C28\u0C3F \u0C15\u0C02\u0C2C\u0C33\u0C4D\u0C33\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C07\u0C28\u0C41\u0C2A \u0C2A\u0C3E\u0C24\u0C4D\u0C30\u0C32\u0C28\u0C41 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
            "\u0C28\u0C3E\u0C17 \u0C2A\u0C02\u0C1A\u0C2E\u0C3F \u0C30\u0C4B\u0C1C\u0C41\u0C28 \u0C09\u0C2A\u0C35\u0C3E\u0C38\u0C02 \u0C06\u0C1A\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F"
          ]
        },
        hi: {
          name: LocalizationEngine.getInstance().get("DOSHA.KALASARPA", lang),
          descTrue: "\u0938\u092D\u0940 \u0917\u094D\u0930\u0939 \u0930\u093E\u0939\u0941 \u0914\u0930 \u0915\u0947\u0924\u0941 \u0915\u0947 \u092C\u0940\u091A \u092C\u0902\u0927\u0947 \u0939\u0941\u090F \u0939\u0948\u0902\u0964 \u092F\u0939 \u0938\u0902\u0918\u0930\u094D\u0937, \u0909\u092A\u0932\u092C\u094D\u0927\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u0905\u091A\u093E\u0928\u0915 \u0926\u0947\u0930\u0940 \u0914\u0930 \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u092C\u0921\u093C\u0947 \u0909\u0924\u093E\u0930-\u091A\u0922\u093C\u093E\u0935 \u0932\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964",
          descFalse: "\u0930\u093E\u0939\u0941 \u0914\u0930 \u0915\u0947\u0924\u0941 \u0915\u0947 \u092C\u0940\u091A \u0915\u094B\u0908 \u0938\u0930\u094D\u092A \u0926\u094B\u0937 \u092A\u094D\u0930\u0924\u093F\u0930\u0942\u092A \u0928\u0939\u0940\u0902 \u092A\u093E\u092F\u093E \u0917\u092F\u093E\u0964",
          remedies: [
            "\u0930\u094B\u091C\u093E\u0928\u093E \u092E\u0939\u093E\u092E\u0943\u0924\u094D\u092F\u0941\u0902\u091C\u092F \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u091C\u093E\u092A \u0915\u0930\u0947\u0902 (108 \u092C\u093E\u0930)",
            "\u0915\u093E\u0932\u093E\u0939\u0938\u094D\u0924\u0940 \u092F\u093E \u0924\u094D\u0930\u094D\u092F\u0902\u092C\u0915\u0947\u0936\u094D\u0935\u0930 \u092E\u0902\u0926\u093F\u0930 \u092E\u0947\u0902 \u0930\u093E\u0939\u0941-\u0915\u0947\u0924\u0941 \u0936\u093E\u0902\u0924\u093F \u092A\u0942\u091C\u093E \u0915\u0930\u0947\u0902",
            "\u091C\u0930\u0942\u0930\u0924\u092E\u0902\u0926\u094B\u0902 \u0915\u094B \u0915\u093E\u0932\u0947 \u0915\u0902\u092C\u0932 \u092F\u093E \u0932\u094B\u0939\u0947 \u0915\u0947 \u092C\u0930\u094D\u0924\u0928 \u0926\u093E\u0928 \u0915\u0930\u0947\u0902",
            "\u0928\u093E\u0917 \u092A\u0902\u091A\u092E\u0940 \u0915\u0947 \u0926\u093F\u0928 \u0935\u094D\u0930\u0924 / \u0909\u092A\u0935\u093E\u0938 \u0930\u0916\u0947\u0902"
          ]
        },
        ta: {
          name: LocalizationEngine.getInstance().get("DOSHA.KALASARPA", lang),
          descTrue: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BB0\u0BBE\u0B95\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9. \u0B87\u0BA4\u0BC1 \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD, \u0BA4\u0BBF\u0B9F\u0BC0\u0BB0\u0BCD \u0BA4\u0BBE\u0BAE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0BB5\u0BBF\u0BB2\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BCD \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1\u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD.",
          descFalse: "\u0BB0\u0BBE\u0B95\u0BC1-\u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0B9F\u0BC8\u0BAF\u0BC7 \u0B8E\u0BA8\u0BCD\u0BA4 \u0B95\u0BBE\u0BB2 \u0B9A\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA \u0BA4\u0BCB\u0BB7 \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
          remedies: [
            "\u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0BAE\u0B95\u0BBE \u0BAE\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BAF\u0BC1\u0B9E\u0BCD\u0B9A\u0BAF \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD (108 \u0BAE\u0BC1\u0BB1\u0BC8)",
            "\u0B95\u0BBE\u0BB3\u0BB9\u0BB8\u0BCD\u0BA4\u0BBF \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BBF\u0BB0\u0BBF\u0BAF\u0BAE\u0BCD\u0BAA\u0B95\u0BC7\u0BB8\u0BCD\u0BB5\u0BB0\u0BB0\u0BCD \u0B95\u0BCB\u0BB5\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0BB0\u0BBE\u0B95\u0BC1-\u0B95\u0BC7\u0BA4\u0BC1 \u0B9A\u0BBE\u0BA8\u0BCD\u0BA4\u0BBF \u0BAA\u0BC2\u0B9C\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0B8F\u0BB4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B95\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BAE\u0BCD\u0BAA\u0BB3\u0BBF \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B87\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1 \u0BAA\u0BBE\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BA8\u0BBE\u0B95 \u0BAA\u0B9E\u0BCD\u0B9A\u0BAE\u0BBF \u0B85\u0BA9\u0BCD\u0BB1\u0BC1 \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD"
          ]
        },
        kn: {
          name: LocalizationEngine.getInstance().get("DOSHA.KALASARPA", lang),
          descTrue: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CC1 \u0CB0\u0CBE\u0CB9\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C95\u0CC7\u0CA4\u0CC1\u0C97\u0CB3 \u0CAE\u0CA7\u0CCD\u0CAF\u0CC6 \u0CAC\u0C82\u0CA7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB5\u0CC6. \u0C87\u0CA6\u0CC1 \u0C9C\u0CC0\u0CB5\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CCB\u0CB0\u0CBE\u0C9F, \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CBF\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CA0\u0CBE\u0CA4\u0CCD \u0CB5\u0CBF\u0CB3\u0C82\u0CAC \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA4\u0CC0\u0CB5\u0CCD\u0CB0 \u0CAC\u0CA6\u0CB2\u0CBE\u0CB5\u0CA3\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CB0\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
          descFalse: "\u0CB0\u0CBE\u0CB9\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C95\u0CC7\u0CA4\u0CC1\u0C97\u0CB3 \u0CA8\u0CA1\u0CC1\u0CB5\u0CC6 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C95\u0CBE\u0CB2 \u0CB8\u0CB0\u0CCD\u0CAA \u0CA6\u0CCB\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
          remedies: [
            "\u0CAA\u0CCD\u0CB0\u0CA4\u0CBF\u0CA6\u0CBF\u0CA8 \u0CAE\u0CB9\u0CBE \u0CAE\u0CC3\u0CA4\u0CCD\u0CAF\u0CC1\u0C82\u0C9C\u0CAF \u0CAE\u0C82\u0CA4\u0CCD\u0CB0 \u0C9C\u0CAA\u0CBF\u0CB8\u0CBF (108 \u0CAC\u0CBE\u0CB0\u0CBF)",
            "\u0C95\u0CBE\u0CB3\u0CB9\u0CB8\u0CCD\u0CA4\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CA4\u0CCD\u0CB0\u0CAF\u0C82\u0CAC\u0C95\u0CC7\u0CB6\u0CCD\u0CB5\u0CB0 \u0CA6\u0CC7\u0CB5\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB0\u0CBE\u0CB9\u0CC1-\u0C95\u0CC7\u0CA4\u0CC1 \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0CAA\u0CC2\u0C9C\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF",
            "\u0CAC\u0CA1\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 \u0C95\u0CAA\u0CCD\u0CAA\u0CC1 \u0C95\u0C82\u0CAC\u0CB3\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CAC\u0CCD\u0CAC\u0CBF\u0CA3\u0CA6 \u0CAA\u0CBE\u0CA4\u0CCD\u0CB0\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF",
            "\u0CA8\u0CBE\u0C97\u0CB0 \u0CAA\u0C82\u0C9A\u0CAE\u0CBF\u0CAF\u0C82\u0CA6\u0CC1 \u0C89\u0CAA\u0CB5\u0CBE\u0CB8 \u0C86\u0C9A\u0CB0\u0CBF\u0CB8\u0CBF"
          ]
        }
      },
      guruchandal: {
        en: {
          name: LocalizationEngine.getInstance().get("DOSHA.GURUCHANDAL", lang),
          descTrue: "Jupiter and Rahu/Ketu are conjunct in the same house. Can disturb concentration, wisdom, spiritual focus, and generate teacher-disciple conflicts.",
          descFalse: "Jupiter is un-afflicted by Rahu or Ketu.",
          remedies: [
            "Donate yellow sweets, gold, or chana dal to pandits on Thursdays",
            "Keep a fast on Thursdays, avoid eating salty food",
            "Recite Guru Stotram or Shiva Chalisa regularly"
          ]
        },
        te: {
          name: LocalizationEngine.getInstance().get("DOSHA.GURUCHANDAL", lang),
          descTrue: "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C30\u0C3E\u0C39\u0C41/\u0C15\u0C47\u0C24\u0C41\u0C35\u0C41\u0C32\u0C41 \u0C12\u0C15\u0C47 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C15\u0C32\u0C3F\u0C38\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41. \u0C07\u0C26\u0C3F \u0C0F\u0C15\u0C3E\u0C17\u0C4D\u0C30\u0C24, \u0C1C\u0C4D\u0C1E\u0C3E\u0C28\u0C02, \u0C06\u0C27\u0C4D\u0C2F\u0C3E\u0C24\u0C4D\u0C2E\u0C3F\u0C15\u0C24\u0C28\u0C41 \u0C26\u0C46\u0C2C\u0C4D\u0C2C\u0C24\u0C40\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C17\u0C41\u0C30\u0C41-\u0C36\u0C3F\u0C37\u0C4D\u0C2F\u0C41\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C35\u0C3F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C28\u0C41 \u0C15\u0C32\u0C3F\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
          descFalse: "\u0C17\u0C41\u0C30\u0C41 \u0C17\u0C4D\u0C30\u0C39\u0C02 \u0C30\u0C3E\u0C39\u0C41\u0C35\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C47\u0C24\u0C41\u0C35\u0C41\u0C32 \u0C35\u0C32\u0C4D\u0C32 \u0C2A\u0C40\u0C21\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41.",
          remedies: [
            "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C2A\u0C02\u0C21\u0C3F\u0C24\u0C41\u0C32\u0C15\u0C41 \u0C2A\u0C38\u0C41\u0C2A\u0C41 \u0C30\u0C02\u0C17\u0C41 \u0C2E\u0C3F\u0C20\u0C3E\u0C2F\u0C3F\u0C32\u0C41, \u0C2C\u0C02\u0C17\u0C3E\u0C30\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C36\u0C28\u0C17\u0C2A\u0C2A\u0C4D\u0C2A\u0C41 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
            "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C09\u0C2A\u0C35\u0C3E\u0C38\u0C02 \u0C09\u0C02\u0C21\u0C02\u0C21\u0C3F, \u0C09\u0C2A\u0C4D\u0C2A\u0C41 \u0C09\u0C28\u0C4D\u0C28 \u0C06\u0C39\u0C3E\u0C30\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C26\u0C42\u0C30\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C02\u0C21\u0C3F",
            "\u0C30\u0C4B\u0C1C\u0C42 \u0C17\u0C41\u0C30\u0C41 \u0C38\u0C4D\u0C24\u0C4B\u0C24\u0C4D\u0C30\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C36\u0C3F\u0C35 \u0C1A\u0C3E\u0C32\u0C40\u0C38\u0C3E \u0C2A\u0C20\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F"
          ]
        },
        hi: {
          name: LocalizationEngine.getInstance().get("DOSHA.GURUCHANDAL", lang),
          descTrue: "\u0917\u0941\u0930\u0941 \u0914\u0930 \u0930\u093E\u0939\u0941/\u0915\u0947\u0924\u0941 \u090F\u0915 \u0939\u0940 \u092D\u093E\u0935 \u092E\u0947\u0902 \u092F\u0941\u0924\u093F \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964 \u092F\u0939 \u090F\u0915\u093E\u0917\u094D\u0930\u0924\u093E, \u092C\u0941\u0926\u094D\u0927\u093F, \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0927\u094D\u092F\u093E\u0928 \u0915\u094B \u092C\u093E\u0927\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948 \u0914\u0930 \u0917\u0941\u0930\u0941-\u0938\u093F\u0937\u094D\u092F \u0935\u093F\u0935\u093E\u0926 \u092A\u0948\u0926\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964",
          descFalse: "\u0917\u0941\u0930\u0941 \u0926\u0947\u0935 \u0930\u093E\u0939\u0941 \u092F\u093E \u0915\u0947\u0924\u0941 \u0915\u0947 \u092A\u094D\u0930\u092D\u093E\u0935 \u0938\u0947 \u092E\u0941\u0915\u094D\u0924 \u0939\u0948\u0902\u0964",
          remedies: [
            "\u0917\u0941\u0930\u0941\u0935\u093E\u0930 \u0915\u094B \u092A\u0902\u0921\u093F\u0924\u094B\u0902 \u0915\u094B \u092A\u0940\u0932\u0940 \u092E\u093F\u0920\u093E\u0907\u092F\u093E\u0902, \u0938\u094B\u0928\u093E \u092F\u093E \u091A\u0928\u093E \u0926\u093E\u0932 \u0926\u093E\u0928 \u0915\u0930\u0947\u0902",
            "\u0917\u0941\u0930\u0941\u0935\u093E\u0930 \u0915\u094B \u0935\u094D\u0930\u0924 \u0930\u0916\u0947\u0902, \u0928\u092E\u0915\u0940\u0928 \u092D\u094B\u091C\u0928 \u0917\u094D\u0930\u0939\u0923 \u0915\u0930\u0928\u0947 \u0938\u0947 \u092C\u091A\u0947\u0902",
            "\u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0917\u0941\u0930\u0941 \u0938\u094D\u0924\u094B\u0924\u094D\u0930 \u092F\u093E \u0936\u093F\u0935 \u091A\u093E\u0932\u0940\u0938\u093E \u0915\u093E \u092A\u093E\u0920 \u0915\u0930\u0947\u0902"
          ]
        },
        ta: {
          name: LocalizationEngine.getInstance().get("DOSHA.GURUCHANDAL", lang),
          descTrue: "\u0B95\u0BC1\u0BB0\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB0\u0BBE\u0B95\u0BC1/\u0B95\u0BC7\u0BA4\u0BC1 \u0B92\u0BB0\u0BC7 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9\u0BB0\u0BCD. \u0B87\u0BA4\u0BC1 \u0BAE\u0BA9 \u0B92\u0BB0\u0BC1\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1, \u0B85\u0BB1\u0BBF\u0BB5\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0B95\u0BB5\u0BA9\u0BA4\u0BCD\u0BA4\u0BC8 \u0B95\u0BC1\u0BB2\u0BC8\u0B95\u0BCD\u0B95\u0B95\u0BCD\u0B95\u0BC2\u0B9F\u0BC1\u0BAE\u0BCD.",
          descFalse: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD \u0BB0\u0BBE\u0B95\u0BC1 \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC7\u0BA4\u0BC1\u0BB5\u0BBF\u0BA9\u0BCD \u0BA4\u0BC0\u0BAF \u0BAA\u0BBE\u0BB0\u0BCD\u0BB5\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBF\u0B9F\u0BC1\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD.",
          remedies: [
            "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB0\u0BBE\u0BAE\u0BA3\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD \u0B87\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD, \u0BA4\u0B99\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0B9F\u0BB2\u0BC8 \u0BAA\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD, \u0B89\u0BAA\u0BCD\u0BAA\u0BC1 \u0B89\u0BA3\u0BB5\u0BC1\u0B95\u0BB3\u0BC8\u0BA4\u0BCD \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BB0\u0BC1 \u0BB8\u0BCD\u0BA4\u0BCB\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B9A\u0BBF\u0BB5 \u0B9A\u0BBE\u0BB2\u0BBF\u0B9A\u0BBE \u0BAA\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD"
          ]
        },
        kn: {
          name: LocalizationEngine.getInstance().get("DOSHA.GURUCHANDAL", lang),
          descTrue: "\u0C97\u0CC1\u0CB0\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB0\u0CBE\u0CB9\u0CC1/\u0C95\u0CC7\u0CA4\u0CC1 \u0C92\u0C82\u0CA6\u0CC7 \u0CAE\u0CA8\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C92\u0C9F\u0CCD\u0C9F\u0CBF\u0C97\u0CC6 \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6. \u0C87\u0CA6\u0CC1 \u0C8F\u0C95\u0CBE\u0C97\u0CCD\u0CB0\u0CA4\u0CC6, \u0CAC\u0CC1\u0CA6\u0CCD\u0CA7\u0CBF\u0CB6\u0C95\u0CCD\u0CA4\u0CBF, \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95 \u0C97\u0CAE\u0CA8\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CA6\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
          descFalse: "\u0C97\u0CC1\u0CB0\u0CC1 \u0C97\u0CCD\u0CB0\u0CB9\u0CB5\u0CC1 \u0CB0\u0CBE\u0CB9\u0CC1 \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CC7\u0CA4\u0CC1\u0CB5\u0CBF\u0CA8 \u0CA6\u0CC1\u0CB7\u0CCD\u0CAA\u0CB0\u0CBF\u0CA3\u0CBE\u0CAE\u0CA6\u0CBF\u0C82\u0CA6 \u0CAE\u0CC1\u0C95\u0CCD\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
          remedies: [
            "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0\u0CA6\u0C82\u0CA6\u0CC1 \u0CAA\u0CC1\u0CB0\u0CCB\u0CB9\u0CBF\u0CA4\u0CB0\u0CBF\u0C97\u0CC6 \u0CB9\u0CB3\u0CA6\u0CBF \u0CB8\u0CBF\u0CB9\u0CBF\u0CA4\u0CBF\u0C82\u0CA1\u0CBF, \u0C9A\u0CBF\u0CA8\u0CCD\u0CA8 \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CA1\u0CB2\u0CC6 \u0CAC\u0CC7\u0CB3\u0CC6 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF",
            "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0\u0CA6\u0C82\u0CA6\u0CC1 \u0C89\u0CAA\u0CB5\u0CBE\u0CB8 \u0C86\u0C9A\u0CB0\u0CBF\u0CB8\u0CBF, \u0C89\u0CAA\u0CCD\u0CAA\u0CC1 \u0C86\u0CB9\u0CBE\u0CB0 \u0CB8\u0CC7\u0CB5\u0CBF\u0CB8\u0CAC\u0CC7\u0CA1\u0CBF",
            "\u0CA8\u0CBF\u0CAF\u0CAE\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF \u0C97\u0CC1\u0CB0\u0CC1 \u0CB8\u0CCD\u0CA4\u0CCB\u0CA4\u0CCD\u0CB0 \u0C85\u0CA5\u0CB5\u0CBE \u0CB6\u0CBF\u0CB5 \u0C9A\u0CBE\u0CB2\u0CC0\u0CB8\u0CBE \u0CAA\u0CA0\u0CBF\u0CB8\u0CBF"
          ]
        }
      },
      kemadruma: {
        en: {
          name: LocalizationEngine.getInstance().get("DOSHA.KEMADRUMA", lang),
          descTrue: "Moon is lonely with no planets in adjacent houses. Can cause mind fluctuations, temporary financial losses, or feelings of isolation.",
          descFalse: "Moon is supported by adjacent planetary nodes.",
          remedies: [
            "Perform Shiva Puja on Mondays with water/milk abhishekam",
            "Support mother or elderly women financially and spiritually",
            "Keep a silver coin or piece in pocket to stabilize lunar energy"
          ]
        },
        te: {
          name: LocalizationEngine.getInstance().get("DOSHA.KEMADRUMA", lang),
          descTrue: "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C3F \u0C2A\u0C15\u0C4D\u0C15 \u0C17\u0C43\u0C39\u0C3E\u0C32\u0C32\u0C4B \u0C0F \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C42 \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C41 \u0C12\u0C02\u0C1F\u0C30\u0C3F\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C21\u0C41. \u0C07\u0C26\u0C3F \u0C2E\u0C3E\u0C28\u0C38\u0C3F\u0C15 \u0C12\u0C21\u0C41\u0C26\u0C4A\u0C21\u0C41\u0C15\u0C41\u0C32\u0C41, \u0C24\u0C3E\u0C24\u0C4D\u0C15\u0C3E\u0C32\u0C3F\u0C15 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C28\u0C37\u0C4D\u0C1F\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C12\u0C02\u0C1F\u0C30\u0C3F\u0C24\u0C28\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C15\u0C32\u0C3F\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
          descFalse: "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C28\u0C3F\u0C15\u0C3F \u0C2A\u0C15\u0C4D\u0C15 \u0C17\u0C43\u0C39\u0C3E\u0C32\u0C32\u0C4B\u0C28\u0C3F \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C2E\u0C26\u0C4D\u0C26\u0C24\u0C41\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F.",
          remedies: [
            "\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C28\u0C40\u0C30\u0C41/\u0C2A\u0C3E\u0C32\u0C41 \u0C05\u0C2D\u0C3F\u0C37\u0C47\u0C15\u0C02\u0C24\u0C4B \u0C36\u0C3F\u0C35 \u0C2A\u0C42\u0C1C \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
            "\u0C24\u0C32\u0C4D\u0C32\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C2A\u0C46\u0C26\u0C4D\u0C26 \u0C35\u0C2F\u0C38\u0C41 \u0C2E\u0C39\u0C3F\u0C33\u0C32\u0C15\u0C41 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15\u0C02\u0C17\u0C3E, \u0C06\u0C27\u0C4D\u0C2F\u0C3E\u0C24\u0C4D\u0C2E\u0C3F\u0C15\u0C02\u0C17\u0C3E \u0C2E\u0C26\u0C4D\u0C26\u0C24\u0C41 \u0C07\u0C35\u0C4D\u0C35\u0C02\u0C21\u0C3F",
            "\u0C1A\u0C02\u0C26\u0C4D\u0C30\u0C41\u0C21\u0C3F \u0C36\u0C15\u0C4D\u0C24\u0C3F\u0C28\u0C3F \u0C38\u0C4D\u0C25\u0C3F\u0C30\u0C2A\u0C30\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C1C\u0C47\u0C2C\u0C41\u0C32\u0C4B \u0C35\u0C46\u0C02\u0C21\u0C3F \u0C28\u0C3E\u0C23\u0C46\u0C02 \u0C09\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F"
          ]
        },
        hi: {
          name: LocalizationEngine.getInstance().get("DOSHA.KEMADRUMA", lang),
          descTrue: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0915\u0947 \u0906\u0938-\u092A\u093E\u0938 \u0915\u0947 \u092D\u093E\u0935\u094B\u0902 \u092E\u0947\u0902 \u0915\u094B\u0908 \u0917\u094D\u0930\u0939 \u0928 \u0939\u094B\u0928\u0947 \u0938\u0947 \u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0905\u0915\u0947\u0932\u093E \u0939\u0948\u0964 \u092F\u0939 \u092E\u093E\u0928\u0938\u093F\u0915 \u0905\u0936\u093E\u0902\u0924\u093F, \u0905\u0938\u094D\u0925\u093E\u0908 \u0906\u0930\u094D\u0925\u093F\u0915 \u0928\u0941\u0915\u0938\u093E\u0928 \u092F\u093E \u0905\u0915\u0947\u0932\u0947\u092A\u0928 \u0915\u0940 \u092D\u093E\u0935\u0928\u093E \u092A\u0948\u0926\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0948\u0964",
          descFalse: "\u091A\u0902\u0926\u094D\u0930\u092E\u093E \u0915\u094B \u0906\u0938-\u092A\u093E\u0938 \u0915\u0947 \u092D\u093E\u0935\u094B\u0902 \u092E\u0947\u0902 \u0917\u094D\u0930\u0939\u094B\u0902 \u0915\u093E \u0938\u0939\u093E\u0930\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u0948\u0964",
          remedies: [
            "\u0938\u094B\u092E\u0935\u093E\u0930 \u0915\u094B \u091C\u0932/\u0926\u0942\u0927 \u0915\u0947 \u0905\u092D\u093F\u0937\u0947\u0915 \u0938\u0947 \u0936\u093F\u0935 \u092A\u0942\u091C\u093E \u0915\u0930\u0947\u0902",
            "\u092E\u093E\u0924\u093E \u092F\u093E \u0935\u0943\u0926\u094D\u0927 \u092E\u0939\u093F\u0932\u093E\u0913\u0902 \u0915\u0940 \u0906\u0930\u094D\u0925\u093F\u0915 \u0914\u0930 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0930\u0947\u0902",
            "\u091A\u0902\u0926\u094D\u0930 \u090A\u0930\u094D\u091C\u093E \u0915\u094B \u0938\u094D\u0925\u093F\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091C\u0947\u092C \u092E\u0947\u0902 \u091A\u093E\u0902\u0926\u0940 \u0915\u093E \u0938\u093F\u0915\u094D\u0915\u093E \u0930\u0916\u0947\u0902"
          ]
        },
        ta: {
          name: LocalizationEngine.getInstance().get("DOSHA.KEMADRUMA", lang),
          descTrue: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BB0\u0BC1 \u0BAA\u0B95\u0BCD\u0B95 \u0BB5\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BC1\u0BAE\u0BCD \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BB2\u0BCD \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BCD \u0BA4\u0BA9\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD. \u0B87\u0BA4\u0BC1 \u0BAE\u0BA9 \u0B89\u0BB3\u0BC8\u0B9A\u0BCD\u0B9A\u0BB2\u0BCD, \u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BB2\u0BBF\u0B95 \u0BA8\u0BBF\u0BA4\u0BBF \u0B87\u0BB4\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BA9\u0BBF\u0BAE\u0BC8 \u0B89\u0BA3\u0BB0\u0BCD\u0BB5\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD.",
          descFalse: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BB0\u0BC1 \u0BAA\u0B95\u0BCD\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BC1\u0BAE\u0BCD \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B86\u0BA4\u0BB0\u0BB5\u0BC1 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.",
          remedies: [
            "\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0BBE\u0BB2\u0BCD/\u0BA8\u0BC0\u0BB0\u0BCD \u0B85\u0BAA\u0BBF\u0BB7\u0BC7\u0B95\u0BA4\u0BCD\u0BA4\u0BC1\u0B9F\u0BA9\u0BCD \u0B9A\u0BBF\u0BB5 \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BA4\u0BBE\u0BAF\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BAF\u0BA4\u0BBE\u0BA9 \u0BAA\u0BC6\u0BA3\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA8\u0BBF\u0BA4\u0BBF\u0BAF\u0BC1\u0BA4\u0BB5\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0B86\u0BA4\u0BB0\u0BB5\u0BC1 \u0B85\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BBF\u0BA9\u0BCD \u0B9A\u0B95\u0BCD\u0BA4\u0BBF\u0BAF\u0BC8 \u0B9A\u0BC0\u0BB0\u0BBE\u0B95\u0BCD\u0B95 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BC6\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF \u0BA8\u0BBE\u0BA3\u0BAF\u0BA4\u0BCD\u0BA4\u0BC8 \u0BB5\u0BC8\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD"
          ]
        },
        kn: {
          name: LocalizationEngine.getInstance().get("DOSHA.KEMADRUMA", lang),
          descTrue: "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8 \u0CAA\u0C95\u0CCD\u0C95\u0CA6 \u0CAE\u0CA8\u0CC6\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3\u0CC1 \u0C87\u0CB0\u0CA6\u0CC6 \u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8\u0CC1 \u0C92\u0C82\u0C9F\u0CBF\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CA8\u0CC6. \u0C87\u0CA6\u0CC1 \u0CAE\u0CBE\u0CA8\u0CB8\u0CBF\u0C95\u0CCD \u0CA4\u0CB3\u0CAE\u0CB3, \u0CA4\u0CBE\u0CA4\u0CCD\u0C95\u0CBE\u0CB2\u0CBF\u0C95 \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CA8\u0CB7\u0CCD\u0C9F \u0CB9\u0CBE\u0C97\u0CC2 \u0C92\u0C82\u0C9F\u0CBF\u0CA4\u0CA8\u0C95\u0CCD\u0C95\u0CC6 \u0C95\u0CBE\u0CB0\u0CA3\u0CB5\u0CBE\u0C97\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
          descFalse: "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8\u0CBF\u0C97\u0CC6 \u0CAA\u0C95\u0CCD\u0C95\u0CA6 \u0CAE\u0CA8\u0CC6\u0C97\u0CB3 \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3 \u0CAC\u0CC6\u0C82\u0CAC\u0CB2\u0CB5\u0CBF\u0CA6\u0CC6.",
          remedies: [
            "\u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0\u0CA6\u0C82\u0CA6\u0CC1 \u0CA8\u0CC0\u0CB0\u0CC1 \u0C85\u0CA5\u0CB5\u0CBE \u0CB9\u0CBE\u0CB2\u0CBF\u0CA8 \u0C85\u0CAD\u0CBF\u0CB7\u0CC7\u0C95\u0CA6\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0CB6\u0CBF\u0CB5 \u0CAA\u0CC2\u0C9C\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF",
            "\u0CA4\u0CBE\u0CAF\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CB9\u0CBF\u0CB0\u0CBF\u0CAF \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95\u0CB5\u0CBE\u0C97\u0CBF \u0CB9\u0CBE\u0C97\u0CC2 \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95\u0CB5\u0CBE\u0C97\u0CBF \u0CA8\u0CC6\u0CB0\u0CB5\u0CBE\u0C97\u0CBF",
            "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0\u0CA8 \u0CB6\u0C95\u0CCD\u0CA4\u0CBF \u0CB8\u0CCD\u0CA5\u0CBF\u0CB0\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0C9C\u0CC7\u0CAC\u0CBF\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAC\u0CC6\u0CB3\u0CCD\u0CB3\u0CBF\u0CAF \u0CA8\u0CBE\u0CA3\u0CCD\u0CAF\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C87\u0C9F\u0CCD\u0C9F\u0CC1\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF"
          ]
        }
      },
      pitru: {
        en: {
          name: LocalizationEngine.getInstance().get("DOSHA.PITRU", lang),
          descTrue: "Saturn and Sun/Rahu conjunct, indicating inherited ancestral karmas, father obstacles, and authority conflicts.",
          descFalse: "No generational or Saturn-Sun conflict detected.",
          remedies: [
            "Offer white til and water to ancestors on Pitru Amavasya",
            "Observe Shravan Somvar fasts and feed black cows on Saturdays",
            "Chant Gayatri Mantra daily at sunrise"
          ]
        },
        te: {
          name: LocalizationEngine.getInstance().get("DOSHA.PITRU", lang),
          descTrue: "\u0C36\u0C28\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C21\u0C41/\u0C30\u0C3E\u0C39\u0C41\u0C35\u0C41\u0C32\u0C41 \u0C15\u0C32\u0C3F\u0C38\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41, \u0C07\u0C26\u0C3F \u0C2A\u0C3F\u0C24\u0C43 \u0C26\u0C4B\u0C37\u0C3E\u0C28\u0C4D\u0C28\u0C3F, \u0C24\u0C02\u0C21\u0C4D\u0C30\u0C3F\u0C24\u0C4B \u0C35\u0C3F\u0C2D\u0C47\u0C26\u0C3E\u0C32\u0C28\u0C41, \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C28\u0C41\u0C32\u0C32\u0C4B \u0C06\u0C1F\u0C02\u0C15\u0C3E\u0C32\u0C28\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
          descFalse: "\u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C2A\u0C3F\u0C24\u0C43 \u0C26\u0C4B\u0C37\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C36\u0C28\u0C3F-\u0C38\u0C42\u0C30\u0C4D\u0C2F \u0C35\u0C3F\u0C2D\u0C47\u0C26\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41.",
          remedies: [
            "\u0C2A\u0C3F\u0C24\u0C43 \u0C05\u0C2E\u0C3E\u0C35\u0C3E\u0C38\u0C4D\u0C2F \u0C30\u0C4B\u0C1C\u0C41\u0C28 \u0C2A\u0C3F\u0C24\u0C43\u0C26\u0C47\u0C35\u0C24\u0C32\u0C15\u0C41 \u0C24\u0C46\u0C32\u0C4D\u0C32 \u0C28\u0C41\u0C35\u0C4D\u0C35\u0C41\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C28\u0C40\u0C1F\u0C3F\u0C28\u0C3F \u0C38\u0C2E\u0C30\u0C4D\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
            "\u0C36\u0C4D\u0C30\u0C3E\u0C35\u0C23 \u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30 \u0C09\u0C2A\u0C35\u0C3E\u0C38\u0C3E\u0C32\u0C41 \u0C06\u0C1A\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02 \u0C28\u0C32\u0C4D\u0C32 \u0C06\u0C35\u0C41\u0C15\u0C41 \u0C06\u0C39\u0C3E\u0C30\u0C02 \u0C07\u0C35\u0C4D\u0C35\u0C02\u0C21\u0C3F",
            "\u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C30\u0C4B\u0C1C\u0C42 \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C4B\u0C26\u0C2F \u0C38\u0C2E\u0C2F\u0C02\u0C32\u0C4B \u0C17\u0C3E\u0C2F\u0C24\u0C4D\u0C30\u0C40 \u0C2E\u0C02\u0C24\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C1C\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F"
          ]
        },
        hi: {
          name: LocalizationEngine.getInstance().get("DOSHA.PITRU", lang),
          descTrue: "\u0936\u0928\u093F \u0914\u0930 \u0938\u0942\u0930\u094D\u092F/\u0930\u093E\u0939\u0941 \u0915\u0940 \u092F\u0941\u0924\u093F \u0939\u0948, \u091C\u094B \u0935\u0902\u0936\u093E\u0928\u0941\u0917\u0924 \u092A\u093F\u0924\u0943 \u0926\u094B\u0937, \u092A\u093F\u0924\u093E \u0938\u0947 \u092E\u0924\u092D\u0947\u0926 \u0914\u0930 \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u092E\u0947\u0902 \u0930\u0941\u0915\u093E\u0935\u091F\u094B\u0902 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964",
          descFalse: "\u0915\u094B\u0908 \u092D\u0940 \u0935\u0902\u0936\u093E\u0928\u0941\u0917\u0924 \u092A\u093F\u0924\u0943 \u0926\u094B\u0937 \u092F\u093E \u0936\u0928\u093F-\u0938\u0942\u0930\u094D\u092F \u0915\u093E \u091F\u0915\u0930\u093E\u0935 \u0909\u092A\u0938\u094D\u0925\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
          remedies: [
            "\u092A\u093F\u0924\u0943 \u0905\u092E\u093E\u0935\u0938\u094D\u092F\u093E \u092A\u0930 \u092A\u0942\u0930\u094D\u0935\u091C\u094B\u0902 \u0915\u094B \u0938\u092B\u0947\u0926 \u0924\u093F\u0932 \u0914\u0930 \u091C\u0932 \u0905\u0930\u094D\u092A\u093F\u0924 \u0915\u0930\u0947\u0902",
            "\u0936\u094D\u0930\u093E\u0935\u0923 \u0938\u094B\u092E\u0935\u093E\u0930 \u0915\u0947 \u0935\u094D\u0930\u0924 \u0930\u0916\u0947\u0902 \u0914\u0930 \u0936\u0928\u093F\u0935\u093E\u0930 \u0915\u094B \u0915\u093E\u0932\u0940 \u0917\u093E\u092F \u0915\u094B \u092D\u094B\u091C\u0928 \u0915\u0930\u093E\u090F\u0902",
            "\u0930\u094B\u091C\u093E\u0928\u093E \u0938\u0942\u0930\u094D\u092F\u094B\u0926\u092F \u0915\u0947 \u0938\u092E\u092F \u0917\u093E\u092F\u0924\u094D\u0930\u0940 \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u091C\u093E\u092A \u0915\u0930\u0947\u0902"
          ]
        },
        ta: {
          name: LocalizationEngine.getInstance().get("DOSHA.PITRU", lang),
          descTrue: "\u0B9A\u0BA9\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9A\u0BC2\u0BB0\u0BBF\u0BAF\u0BA9\u0BCD/\u0BB0\u0BBE\u0B95\u0BC1 \u0B87\u0BA3\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9\u0BB0\u0BCD, \u0B87\u0BA4\u0BC1 \u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD, \u0BA4\u0BA8\u0BCD\u0BA4\u0BC8 \u0BB5\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BBE\u0BB0 \u0BAE\u0BCB\u0BA4\u0BB2\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BC1\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.",
          descFalse: "\u0B8E\u0BA8\u0BCD\u0BA4 \u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCB \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B9A\u0BA9\u0BBF-\u0B9A\u0BC2\u0BB0\u0BBF\u0BAF \u0BAE\u0BCB\u0BA4\u0BB2\u0BCB \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
          remedies: [
            "\u0BAA\u0BBF\u0BA4\u0BCD\u0BB0\u0BC1 \u0B85\u0BAE\u0BBE\u0BB5\u0BBE\u0B9A\u0BC8 \u0B85\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BCB\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BC8 \u0B8E\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0BC0\u0BB0\u0BCD \u0B85\u0B9E\u0BCD\u0B9A\u0BB2\u0BBF \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0B9A\u0BBF\u0BB0\u0BBE\u0BB5\u0BA3 \u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD, \u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B95\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAA\u0B9A\u0BC1\u0BB5\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0B89\u0BA3\u0BB5\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
            "\u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0B9A\u0BC2\u0BB0\u0BBF\u0BAF \u0B89\u0BA4\u0BAF\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BBE\u0BAF\u0BA4\u0BCD\u0BB0\u0BBF \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B89\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD"
          ]
        },
        kn: {
          name: LocalizationEngine.getInstance().get("DOSHA.PITRU", lang),
          descTrue: "\u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CC2\u0CB0\u0CCD\u0CAF/\u0CB0\u0CBE\u0CB9\u0CC1 \u0C92\u0C9F\u0CCD\u0C9F\u0CBF\u0C97\u0CC6 \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6, \u0C87\u0CA6\u0CC1 \u0CAA\u0CBF\u0CA4\u0CC3 \u0CA6\u0CCB\u0CB7, \u0CA4\u0C82\u0CA6\u0CC6\u0CAF\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0CAD\u0CBF\u0CA8\u0CCD\u0CA8\u0CBE\u0CAD\u0CBF\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C85\u0CA7\u0CBF\u0C95\u0CBE\u0CB0\u0CA6\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0C98\u0CB0\u0CCD\u0CB7\u0CA3\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC2\u0C9A\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
          descFalse: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAA\u0CBF\u0CA4\u0CC3 \u0CA6\u0CCB\u0CB7 \u0C85\u0CA5\u0CB5\u0CBE \u0CB6\u0CA8\u0CBF-\u0CB8\u0CC2\u0CB0\u0CCD\u0CAF \u0CB8\u0C82\u0C98\u0CB0\u0CCD\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
          remedies: [
            "\u0CAA\u0CBF\u0CA4\u0CC3 \u0C85\u0CAE\u0CBE\u0CB5\u0CBE\u0CB8\u0CCD\u0CAF\u0CC6\u0CAF\u0C82\u0CA6\u0CC1 \u0CB9\u0CBF\u0CB0\u0CBF\u0CAF\u0CB0\u0CBF\u0C97\u0CC6 \u0CAC\u0CBF\u0CB3\u0CBF \u0C8E\u0CB3\u0CCD\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA8\u0CC0\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB0\u0CCD\u0CAA\u0CBF\u0CB8\u0CBF",
            "\u0CB6\u0CCD\u0CB0\u0CBE\u0CB5\u0CA3 \u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0 \u0C89\u0CAA\u0CB5\u0CBE\u0CB8 \u0CAE\u0CBE\u0CA1\u0CBF \u0CB9\u0CBE\u0C97\u0CC2 \u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0 \u0C95\u0CAA\u0CCD\u0CAA\u0CC1 \u0CB9\u0CB8\u0CC1\u0CB5\u0CBF\u0C97\u0CC6 \u0C86\u0CB9\u0CBE\u0CB0 \u0CA8\u0CC0\u0CA1\u0CBF",
            "\u0CAA\u0CCD\u0CB0\u0CA4\u0CBF\u0CA6\u0CBF\u0CA8 \u0CB8\u0CC2\u0CB0\u0CCD\u0CAF\u0CCB\u0CA6\u0CAF\u0CA6 \u0CB8\u0CAE\u0CAF\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C97\u0CBE\u0CAF\u0CA4\u0CCD\u0CB0\u0CBF \u0CAE\u0C82\u0CA4\u0CCD\u0CB0 \u0C9C\u0CAA\u0CBF\u0CB8\u0CBF"
          ]
        }
      }
    };
    const l = translations.manglik[lang] ? lang : "en";
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(mars.house);
    const mTrans = translations.manglik[l];
    doshas.push({
      hasDosha: isManglik,
      name: translations.manglik.en.name,
      localizedName: mTrans?.name || translations.manglik.en.name,
      severity: isManglik ? mars.house === 7 || mars.house === 8 ? "High" : "Medium" : "None",
      description: isManglik ? mTrans?.descTrue : mTrans?.descFalse,
      remedies: mTrans?.remedies || []
    });
    const nodeDiff = Math.abs(rahu.rasiIndex - ketu.rasiIndex);
    let hasKalaSarpa = false;
    if (nodeDiff === 6) {
      const rah = rahu.longitude;
      const ket = ketu.longitude;
      const minNode = Math.min(rah, ket);
      const maxNode = Math.max(rah, ket);
      const normalCount = planets.filter((p) => p.longitude > minNode && p.longitude < maxNode).length;
      if (normalCount === 0 || normalCount === 10) {
        hasKalaSarpa = true;
      }
    }
    const ksTrans = translations.kalasarpa[l];
    doshas.push({
      hasDosha: hasKalaSarpa,
      name: translations.kalasarpa.en.name,
      localizedName: ksTrans?.name || translations.kalasarpa.en.name,
      severity: hasKalaSarpa ? "High" : "None",
      description: hasKalaSarpa ? ksTrans?.descTrue : ksTrans?.descFalse,
      remedies: ksTrans?.remedies || []
    });
    const hasGuruChandal = jupiter.rasiIndex === rahu.rasiIndex || jupiter.rasiIndex === ketu.rasiIndex;
    const gcTrans = translations.guruchandal[l];
    doshas.push({
      hasDosha: hasGuruChandal,
      name: translations.guruchandal.en.name,
      localizedName: gcTrans?.name || translations.guruchandal.en.name,
      severity: hasGuruChandal ? "Medium" : "None",
      description: hasGuruChandal ? gcTrans?.descTrue : gcTrans?.descFalse,
      remedies: gcTrans?.remedies || []
    });
    const adjacentHouses = [(moon.house - 1 + 12) % 12 || 12, (moon.house + 1) % 12 || 12];
    const hasKemadruma = planets.filter((p) => p.id !== "moon" && p.id !== "sun" && adjacentHouses.includes(p.house)).length === 0;
    const kdTrans = translations.kemadruma[l];
    doshas.push({
      hasDosha: hasKemadruma,
      name: translations.kemadruma.en.name,
      localizedName: kdTrans?.name || translations.kemadruma.en.name,
      severity: hasKemadruma ? "Medium" : "None",
      description: hasKemadruma ? kdTrans?.descTrue : kdTrans?.descFalse,
      remedies: kdTrans?.remedies || []
    });
    const hasShaniSuryaNode = saturn.rasiIndex === sun.rasiIndex || saturn.rasiIndex === rahu.rasiIndex;
    const ptTrans = translations.pitru[l];
    doshas.push({
      hasDosha: hasShaniSuryaNode,
      name: translations.pitru.en.name,
      localizedName: ptTrans?.name || translations.pitru.en.name,
      severity: hasShaniSuryaNode ? "Medium" : "None",
      description: hasShaniSuryaNode ? ptTrans?.descTrue : ptTrans?.descFalse,
      remedies: ptTrans?.remedies || []
    });
    return doshas;
  }
  // Ashta Koota Matching & Porutham Matching
  static calculateMatching(boyInput, girlInput, lang) {
    const boyPanchang = _AstrologyService.calcPanchang(boyInput);
    const girlPanchang = _AstrologyService.calcPanchang(girlInput);
    const bNak = boyPanchang.nakshatra.index;
    const gNak = girlPanchang.nakshatra.index;
    const bMoon = boyPanchang.planets.find((p) => p.id === "moon");
    const gMoon = girlPanchang.planets.find((p) => p.id === "moon");
    const bRasi = bMoon.rasiIndex;
    const gRasi = gMoon.rasiIndex;
    const bMoonRasiName = bMoon.rasi.name.en || "Unknown";
    const gMoonRasiName = gMoon.rasi.name.en || "Unknown";
    const bPada = bMoon.pada || 1;
    const gPada = gMoon.pada || 1;
    const ashtaKoota = [];
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
      "Mars",
      "Venus",
      "Mercury",
      "Moon",
      "Sun",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Saturn",
      "Jupiter"
    ];
    const G_NAMES = {
      en: ["Deva", "Manushya", "Rakshasa"],
      hi: ["\u0926\u0947\u0935 (\u0926\u0948\u0935\u0940\u092F)", "\u092E\u0928\u0941\u0937\u094D\u092F\u094B\u0902 (\u092E\u093E\u0928\u0935\u0940\u092F)", "\u0930\u093E\u0915\u094D\u0937\u0938 (\u0926\u0943\u0922\u093C)"],
      te: ["\u0C26\u0C47\u0C35 \u0C17\u0C23\u0C2E\u0C41", "\u0C2E\u0C28\u0C41\u0C37\u0C4D\u0C2F \u0C17\u0C23\u0C2E\u0C41", "\u0C30\u0C3E\u0C15\u0C4D\u0C37\u0C38 \u0C17\u0C23\u0C2E\u0C41"],
      ta: ["\u0BA4\u0BC7\u0BB5 \u0B95\u0BA3\u0BAE\u0BCD", "\u0BAE\u0BA9\u0BBF\u0BA4 \u0B95\u0BA3\u0BAE\u0BCD", "\u0BB0\u0BBE\u0B9F\u0BCD\u0B9A\u0B9A \u0B95\u0BA3\u0BAE\u0BCD"],
      kn: ["\u0CA6\u0CC7\u0CB5 \u0C97\u0CA3", "\u0CAE\u0CA8\u0CC1\u0CB7\u0CCD\u0CAF \u0C97\u0CA3", "\u0CB0\u0CBE\u0C95\u0CCD\u0CB7\u0CB8 \u0C97\u0CA3"]
    };
    const NAKSHATRA_GANAS = [
      0,
      1,
      2,
      1,
      0,
      1,
      0,
      0,
      2,
      2,
      1,
      1,
      0,
      0,
      0,
      2,
      0,
      2,
      2,
      1,
      1,
      0,
      2,
      2,
      1,
      1,
      0
    ];
    const YONI_NAMES = {
      en: [
        "Horse",
        "Elephant",
        "Sheep",
        "Serpent",
        "Dog",
        "Cat",
        "Rat",
        "Cow",
        "Buffalo",
        "Tiger",
        "Hare",
        "Monkey",
        "Mongoose",
        "Lion"
      ],
      hi: [
        "\u0905\u0936\u094D\u0935 (\u0918\u094B\u0921\u093C\u093E)",
        "\u0917\u091C (\u0939\u093E\u0925\u0940)",
        "\u092E\u0947\u0937 (\u092D\u0947\u0921\u093C)",
        "\u0938\u0930\u094D\u092A (\u0938\u093E\u0902\u092A)",
        "\u0936\u094D\u0935\u093E\u0928 (\u0915\u0941\u0924\u094D\u0924\u093E)",
        "\u092E\u093E\u0930\u094D\u091C\u093E\u0930 (\u092C\u093F\u0932\u094D\u0932\u0940)",
        "\u092E\u0942\u0937\u0915 (\u091A\u0942\u0939\u093E)",
        "\u0917\u094C (\u0917\u093E\u092F)",
        "\u092E\u0939\u093F\u0937 (\u092D\u0948\u0902\u0938)",
        "\u0935\u094D\u092F\u093E\u0918\u094D\u0930 (\u092C\u093E\u0918)",
        "\u0936\u0936\u0915 (\u0916\u0930\u0917\u094B\u0936)",
        "\u0935\u093E\u0928\u0930 (\u092C\u0902\u0926\u0930)",
        "\u0928\u0915\u0941\u0932 (\u0928\u0947\u0935\u0932\u093E)",
        "\u0938\u093F\u0902\u0939 (\u0936\u0947\u0930)"
      ],
      te: [
        "\u0C05\u0C36\u0C4D\u0C35\u0C2E\u0C41 (\u0C17\u0C41\u0C30\u0C4D\u0C30\u0C02)",
        "\u0C17\u0C1C\u0C2E\u0C41 (\u0C0F\u0C28\u0C41\u0C17\u0C41)",
        "\u0C2E\u0C47\u0C37\u0C2E\u0C41 (\u0C17\u0C4A\u0C30\u0C4D\u0C30\u0C46)",
        "\u0C38\u0C30\u0C4D\u0C2A\u0C2E\u0C41 (\u0C2A\u0C3E\u0C2E\u0C41)",
        "\u0C36\u0C4D\u0C35\u0C3E\u0C28\u0C2E\u0C41 (\u0C15\u0C41\u0C15\u0C4D\u0C15)",
        "\u0C2E\u0C3E\u0C30\u0C4D\u0C1C\u0C3E\u0C32\u0C2E\u0C41 (\u0C2A\u0C3F\u0C32\u0C4D\u0C32\u0C3F)",
        "\u0C2E\u0C42\u0C37\u0C3F\u0C15\u0C2E\u0C41 (\u0C0E\u0C32\u0C41\u0C15)",
        "\u0C17\u0C4B\u0C35\u0C41 (\u0C06\u0C35\u0C41)",
        "\u0C2E\u0C39\u0C3F\u0C37\u0C2E\u0C41 (\u0C17\u0C47\u0C26\u0C46)",
        "\u0C35\u0C4D\u0C2F\u0C3E\u0C18\u0C4D\u0C30\u0C2E\u0C41 (\u0C2A\u0C41\u0C32\u0C3F)",
        "\u0C36\u0C36\u0C15\u0C2E\u0C41 (\u0C15\u0C41\u0C02\u0C26\u0C47\u0C32\u0C41)",
        "\u0C35\u0C3E\u0C28\u0C30\u0C2E\u0C41 (\u0C15\u0C4B\u0C24\u0C3F)",
        "\u0C28\u0C15\u0C41\u0C32\u0C3E\u0C28\u0C4D\u0C28\u0C3F (\u0C15\u0C40\u0C1A\u0C41\u0C30\u0C3E\u0C2F\u0C3F)",
        "\u0C38\u0C3F\u0C02\u0C39\u0C2E\u0C41 (\u0C38\u0C3F\u0C02\u0C39\u0C02)"
      ],
      ta: [
        "\u0B95\u0BC1\u0BA4\u0BBF\u0BB0\u0BC8",
        "\u0BAF\u0BBE\u0BA9\u0BC8",
        "\u0B86\u0B9F\u0BC1",
        "\u0BAA\u0BBE\u0BAE\u0BCD\u0BAA\u0BC1",
        "\u0BA8\u0BBE\u0BAF\u0BCD",
        "\u0BAA\u0BC2\u0BA9\u0BC8",
        "\u0B8E\u0BB2\u0BBF",
        "\u0BAA\u0B9A\u0BC1",
        "\u0B8E\u0BB0\u0BC1\u0BAE\u0BC8",
        "\u0BAA\u0BC1\u0BB2\u0BBF",
        "\u0BAE\u0BC1\u0BAF\u0BB2\u0BCD",
        "\u0B95\u0BC1\u0BB0\u0B99\u0BCD\u0B95\u0BC1",
        "\u0B95\u0BC0\u0BB0\u0BBF",
        "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAE\u0BCD"
      ],
      kn: [
        "\u0C95\u0CC1\u0CA6\u0CC1\u0CB0\u0CC6",
        "\u0C86\u0CA8\u0CC6",
        "\u0C95\u0CC1\u0CB0\u0CBF",
        "\u0CB9\u0CBE\u0CB5\u0CC1",
        "\u0CA8\u0CBE\u0CAF\u0CBF",
        "\u0CAC\u0CC6\u0C95\u0CCD\u0C95\u0CC1",
        "\u0C87\u0CB2\u0CBF",
        "\u0CB9\u0CB8\u0CC1",
        "\u0C8E\u0CAE\u0CCD\u0CAE\u0CC6",
        "\u0CB9\u0CC1\u0CB2\u0CBF",
        "\u0CAE\u0CCA\u0CB2",
        "\u0C95\u0CCB\u0CA4\u0CBF",
        "\u0C95\u0CC0\u0CB0\u0CBF",
        "\u0CB8\u0CBF\u0C82\u0CB9"
      ]
    };
    const NAKSHATRA_YONIS = [
      0,
      1,
      2,
      3,
      3,
      4,
      5,
      2,
      5,
      6,
      6,
      7,
      8,
      9,
      8,
      9,
      10,
      10,
      4,
      11,
      12,
      11,
      13,
      0,
      13,
      7,
      1
    ];
    const NAKSHATRA_NADIS = [
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2
    ];
    const NADI_NAMES = {
      en: ["Adi", "Madhya", "Antya"],
      hi: ["\u0906\u0926\u093F (\u0935\u093E\u0924)", "\u092E\u0927\u094D\u092F (\u092A\u093F\u0924\u094D\u0924)", "\u0905\u0902\u0924\u094D\u092F (\u0915\u092B)"],
      te: ["\u0C06\u0C26\u0C3F (\u0C35\u0C3E\u0C24)", "\u0C2E\u0C27\u0C4D\u0C2F (\u0C2A\u0C3F\u0C24\u0C4D\u0C24\u0C02)", "\u0C05\u0C02\u0C24\u0C4D\u0C2F (\u0C15\u0C2B\u0C02)"],
      ta: ["\u0B86\u0BA4\u0BBF (\u0BB5\u0BBE\u0BA4\u0BAE\u0BCD)", "\u0BAE\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF (\u0BAA\u0BBF\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD)", "\u0B85\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BAE\u0BCD (\u0B95\u0BAA\u0BAE\u0BCD)"],
      kn: ["\u0C86\u0CA6\u0CBF (\u0CB5\u0CBE\u0CA4)", "\u0CAE\u0CA7\u0CCD\u0CAF (\u0CAA\u0CBF\u0CA4\u0CCD\u0CA4)", "\u0C85\u0C82\u0CA4\u0CCD\u0CAF (\u0C95\u0CAB)"]
    };
    let varnaScore = 0;
    const getVarnaInfo = (rIndex) => {
      const idx = rIndex % 12;
      const vLabels = {
        en: "Brahmin",
        hi: "\u092C\u094D\u0930\u093E\u0939\u094D\u092E\u0923 (\u092C\u094C\u0926\u094D\u0927\u093F\u0915)",
        te: "\u0C2C\u0C4D\u0C30\u0C3E\u0C39\u0C4D\u0C2E\u0C23 (\u0C2E\u0C47\u0C27\u0C4B\u0C36\u0C15\u0C4D\u0C24\u0C3F)",
        ta: "\u0BAA\u0BBF\u0BB0\u0BBE\u0BAE\u0BA3\u0BB0\u0BCD (\u0B85\u0BB1\u0BBF\u0BB5\u0BC1\u0B9A\u0BBE\u0BB0\u0BCD)",
        kn: "\u0CAC\u0CCD\u0CB0\u0CBE\u0CB9\u0CCD\u0CAE\u0CA3 (\u0CAC\u0CCC\u0CA6\u0CCD\u0CA7\u0CBF\u0C95)"
      };
      const kLabels = {
        en: "Kshatriya",
        hi: "\u0915\u094D\u0937\u0924\u094D\u0930\u093F\u092F (\u092A\u094D\u0930\u0936\u093E\u0938\u0915\u0940\u092F)",
        te: "\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3F\u0C2F (\u0C2A\u0C30\u0C3F\u0C2A\u0C3E\u0C32\u0C28\u0C3E)",
        ta: "\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBF\u0BAF\u0BB0\u0BCD (\u0BA8\u0BBF\u0BB0\u0BCD\u0BB5\u0BBE\u0B95\u0BAE\u0BCD)",
        kn: "\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0CBF\u0CAF (\u0C86\u0CA1\u0CB3\u0CBF\u0CA4\u0CBE\u0CA4\u0CCD\u0CAE\u0C95)"
      };
      const vaLabels = {
        en: "Vaishya",
        hi: "\u0935\u0948\u0936\u094D\u092F (\u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915)",
        te: "\u0C35\u0C48\u0C36\u0C4D\u0C2F (\u0C35\u0C4D\u0C2F\u0C3E\u0C2A\u0C3E\u0C30)",
        ta: "\u0BB5\u0BC8\u0B9A\u0BBF\u0BAF\u0BB0\u0BCD (\u0BB5\u0BA3\u0BBF\u0B95\u0BAE\u0BCD)",
        kn: "\u0CB5\u0CC8\u0CB6\u0CCD\u0CAF (\u0CB5\u0CCD\u0CAF\u0CBE\u0CAA\u0CBE\u0CB0)"
      };
      const sLabels = {
        en: "Shudra (Service-oriented)",
        hi: "\u0936\u0942\u0926\u094D\u0930 (\u0938\u0947\u0935\u093E\u092D\u093E\u0935\u0940)",
        te: "\u0C36\u0C42\u0C26\u0C4D\u0C30 (\u0C38\u0C47\u0C35\u0C3E)",
        ta: "\u0B9A\u0BC2\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BB0\u0BCD (\u0B9A\u0BC7\u0BB5\u0BC8)",
        kn: "\u0CB6\u0CC2\u0CA6\u0CCD\u0CB0 (\u0CB8\u0CC7\u0CB5\u0CBE\u0CB5\u0CBF\u0CA7\u0CBE\u0CA8)"
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
      varnaDesc = varnaScore > 0 ? `\u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C2E\u0C48\u0C28 \u0C35\u0C30\u0C4D\u0C23 \u0C15\u0C32\u0C2F\u0C3F\u0C15. \u0C35\u0C30\u0C41\u0C21\u0C41 ${bVarna.labels.te} \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C27\u0C41\u0C35\u0C41 ${gVarna.labels.te}. \u0C2A\u0C30\u0C3F\u0C2A\u0C3E\u0C32\u0C28\u0C3E\u0C24\u0C4D\u0C2E\u0C15/\u0C2E\u0C47\u0C27\u0C4B \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C24 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30 \u0C17\u0C4C\u0C30\u0C35\u0C02 \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : `\u0C35\u0C30\u0C4D\u0C23 \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41. \u0C35\u0C30\u0C41\u0C28\u0C3F \u0C35\u0C30\u0C4D\u0C23 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D (${bVarna.labels.te}) \u0C35\u0C27\u0C41\u0C35\u0C41 \u0C15\u0C02\u0C1F\u0C47 \u0C24\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F, \u0C07\u0C26\u0C3F \u0C1A\u0C3F\u0C28\u0C4D\u0C28 \u0C05\u0C39\u0C02\u0C15\u0C3E\u0C30 \u0C18\u0C30\u0C4D\u0C37\u0C23\u0C32\u0C15\u0C41 \u0C26\u0C3E\u0C30\u0C3F\u0C24\u0C40\u0C2F\u0C35\u0C1A\u0C4D\u0C1A\u0C41.`;
    } else if (lang === "hi") {
      varnaDesc = varnaScore > 0 ? `\u0905\u0928\u0941\u0915\u0942\u0932 \u0935\u0930\u094D\u0923 \u092E\u093F\u0932\u093E\u0928\u0964 \u0935\u0930 ${bVarna.labels.hi} \u0914\u0930 \u0935\u0927\u0942 ${gVarna.labels.hi} \u0939\u0948\u0964 \u0926\u094B\u0928\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0905\u091A\u094D\u091B\u093E \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u0930\u0939\u0947\u0917\u093E\u0964` : `\u0935\u0930\u094D\u0923 \u0926\u094B\u0937\u0964 \u0935\u0930 \u0915\u093E \u0935\u0930\u094D\u0923 \u0938\u094D\u0924\u0930 (${bVarna.labels.hi}) \u0935\u0927\u0942 \u0938\u0947 \u0928\u0940\u091A\u093E \u0939\u094B\u0928\u0947 \u0915\u0947 \u0915\u093E\u0930\u0923 \u0905\u0939\u0902 \u0915\u093E \u091F\u0915\u0930\u093E\u0935 \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964`;
    } else if (lang === "ta") {
      varnaDesc = varnaScore > 0 ? `\u0B85\u0BA9\u0BC1\u0B95\u0BC2\u0BB2\u0BAE\u0BBE\u0BA9 \u0BB5\u0BB0\u0BCD\u0BA3 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD. \u0BAE\u0BA3\u0BAE\u0B95\u0BA9\u0BCD ${bVarna.labels.ta} \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA3\u0BAE\u0B95\u0BB3\u0BCD ${gVarna.labels.ta}. \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B87\u0B9F\u0BC8\u0BAF\u0BC7 \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBF\u0BA4\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : `\u0BB5\u0BB0\u0BCD\u0BA3 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BA3\u0BAE\u0B95\u0BA9\u0BBF\u0BA9\u0BCD \u0BB5\u0BB0\u0BCD\u0BA3 \u0BA8\u0BBF\u0BB2\u0BC8 (${bVarna.labels.ta}) \u0BAE\u0BA3\u0BAE\u0B95\u0BB3\u0BC8 \u0BB5\u0BBF\u0B9F \u0B95\u0BC1\u0BB1\u0BC8\u0BB5\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE\u0BB2\u0BCD, \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD.`;
    } else if (lang === "kn") {
      varnaDesc = varnaScore > 0 ? `\u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2\u0C95\u0CB0 \u0CB5\u0CB0\u0CCD\u0CA3 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6. \u0CB5\u0CB0\u0CA8\u0CC1 ${bVarna.labels.kn} \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CA7\u0CC1 ${gVarna.labels.kn}. \u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0CA8\u0CA1\u0CC1\u0CB5\u0CC6 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CAC\u0CCC\u0CA6\u0CCD\u0CA7\u0CBF\u0C95 \u0CB8\u0CAE\u0CA4\u0CCB\u0CB2\u0CA8 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C97\u0CCC\u0CB0\u0CB5\u0CB5\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `\u0CB5\u0CB0\u0CCD\u0CA3 \u0C85\u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF. \u0CB5\u0CB0\u0CA8 \u0CB5\u0CB0\u0CCD\u0CA3 \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD (${bVarna.labels.kn}) \u0CB5\u0CA7\u0CC1\u0C97\u0CBF\u0C82\u0CA4 \u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0CAF\u0CBF\u0CA6\u0CC6, \u0C87\u0CA6\u0CC1 \u0CB8\u0CC2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE \u0C85\u0CB9\u0C82 \u0C98\u0CB0\u0CCD\u0CB7\u0CA3\u0CC6\u0C97\u0CC6 \u0C95\u0CBE\u0CB0\u0CA3\u0CB5\u0CBE\u0C97\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.`;
    } else {
      varnaDesc = varnaScore > 0 ? `Auspicious Varna match. Groom is ${bVarna.labels.en} and Bride is ${gVarna.labels.en}. Provides premium intellectual co-existence and professional appreciation.` : `Varna variance. Groom's Varna profile (${bVarna.labels.en}) is lower placed than Bride's (${gVarna.labels.en}), indicating possible mild wavelength adjustments.`;
    }
    ashtaKoota.push({
      koota: "Varna",
      localizedKoota: translateKoota("Varna", lang),
      maxPoints: 1,
      obtainedPoints: varnaScore,
      description: varnaDesc
    });
    const getVashyaInfo = (rIndex) => {
      const idx = rIndex % 12;
      const tLabels = {
        0: {
          en: "Quadruped",
          hi: "\u091A\u0924\u0941\u0937\u094D\u092A\u093E\u0926 (\u091A\u094C\u092A\u093E\u092F\u093E)",
          te: "\u0C1A\u0C24\u0C41\u0C37\u0C4D\u0C2A\u0C3E\u0C26 (\u0C1C\u0C02\u0C24\u0C41 \u0C38\u0C4D\u0C35\u0C2D\u0C3E\u0C35\u0C02)",
          ta: "\u0B9A\u0BA4\u0BC1\u0BB7\u0BCD\u0BAA\u0BBE\u0BA4 (\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1 \u0B95\u0BBE\u0BB2\u0BCD)",
          kn: "\u0C9A\u0CA4\u0CC1\u0CB7\u0CCD\u0CAA\u0CBE\u0CA6 (\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1 \u0C95\u0CBE\u0CB2\u0CC1)"
        },
        1: {
          en: "Human",
          hi: "\u092E\u0928\u0941\u0937\u094D\u092F\u094B\u0902 (\u092E\u093E\u0928\u0935)",
          te: "\u0C2E\u0C28\u0C41\u0C37\u0C4D\u0C2F (\u0C2E\u0C3E\u0C28\u0C35 \u0C38\u0C4D\u0C35\u0C2D\u0C3E\u0C35\u0C02)",
          ta: "\u0BAE\u0BA9\u0BC1\u0BB7\u0BCD\u0BAF (\u0BAE\u0BA9\u0BBF\u0BA4)",
          kn: "\u0CAE\u0CA8\u0CC1\u0CB7\u0CCD\u0CAF (\u0CAE\u0CBE\u0CA8\u0CB5)"
        },
        2: {
          en: "Water Dweller",
          hi: "\u091C\u0932\u091A\u0930 (\u091C\u0932\u0940\u092F)",
          te: "\u0C1C\u0C32\u0C1A\u0C30 (\u0C28\u0C40\u0C1F\u0C3F \u0C1C\u0C40\u0C35\u0C3F)",
          ta: "\u0C1C\u0BB2\u0B9A\u0BB0 (\u0BA8\u0BC0\u0BB0\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD)",
          kn: "\u0C9C\u0CB2\u0C9A\u0CB0 (\u0C9C\u0CB2\u0C9A\u0CB0)"
        },
        3: {
          en: "Wild Beast",
          hi: "\u0935\u0928\u091A\u0930 (\u091C\u0902\u0917\u0932\u0940)",
          te: "\u0C35\u0C28\u0C1A\u0C30 (\u0C05\u0C1F\u0C35\u0C3F \u0C1C\u0C40\u0C35\u0C3F)",
          ta: "\u0BB5\u0BA9\u0B9A\u0BB0 (\u0B95\u0BBE\u0B9F\u0BC1)",
          kn: "\u0CB5\u0CA8\u0C9A\u0CB0 (\u0CB5\u0CA8\u0CCD\u0CAF)"
        },
        4: {
          en: "Insect",
          hi: "\u0915\u0940\u091F (\u0915\u0940\u0921\u093C\u093E)",
          te: "\u0C15\u0C40\u0C1F\u0C15 (\u0C38\u0C42\u0C15\u0C4D\u0C37\u0C4D\u0C2E \u0C1C\u0C40\u0C35\u0C3F)",
          ta: "\u0B95\u0BC0\u0B9F (\u0BAA\u0BC2\u0B9A\u0BCD\u0B9A\u0BBF)",
          kn: "\u0C95\u0CC0\u0C9F (\u0C95\u0CC0\u0C9F)"
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
      vashyaDesc = vashyaScore === 2 ? `\u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C2E\u0C48\u0C28 \u0C35\u0C36\u0C4D\u0C2F \u0C2A\u0C4A\u0C02\u0C24\u0C28 (${bVashya.labels.te} - ${gVashya.labels.te}). \u0C26\u0C02\u0C2A\u0C24\u0C41\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C2C\u0C32\u0C2E\u0C48\u0C28 \u0C06\u0C15\u0C30\u0C4D\u0C37\u0C23, \u0C12\u0C15\u0C30\u0C3F\u0C28\u0C4A\u0C15\u0C30\u0C41 \u0C38\u0C41\u0C32\u0C2D\u0C02\u0C17\u0C3E \u0C05\u0C30\u0C4D\u0C25\u0C02 \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C41\u0C28\u0C47 \u0C17\u0C41\u0C23\u0C02 \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.` : vashyaScore > 0 ? `\u0C38\u0C17\u0C1F\u0C41 \u0C35\u0C36\u0C4D\u0C2F \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C24 (${bVashya.labels.te} - ${gVashya.labels.te}). \u0C38\u0C4D\u0C25\u0C3F\u0C30\u0C2E\u0C48\u0C28 \u0C17\u0C43\u0C39 \u0C1C\u0C40\u0C35\u0C3F\u0C24\u0C02 \u0C15\u0C4B\u0C38\u0C02 \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30 \u0C17\u0C4C\u0C30\u0C35\u0C02 \u0C05\u0C35\u0C38\u0C30\u0C02.` : `\u0C35\u0C36\u0C4D\u0C2F \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C21\u0C02 \u0C32\u0C47\u0C26\u0C41. \u0C05\u0C30\u0C23\u0C4D\u0C2F \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C40\u0C1F\u0C15 \u0C17\u0C41\u0C23\u0C3E\u0C32 \u0C35\u0C32\u0C4D\u0C32 \u0C06\u0C27\u0C3F\u0C2A\u0C24\u0C4D\u0C2F \u0C2A\u0C4B\u0C30\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C2A\u0C3E\u0C30\u0C4D\u0C25\u0C3E\u0C32\u0C41 \u0C0F\u0C30\u0C4D\u0C2A\u0C21\u0C47 \u0C38\u0C42\u0C1A\u0C28\u0C32\u0C41 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F.`;
    } else if (lang === "hi") {
      vashyaDesc = vashyaScore === 2 ? `\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u0935\u0936\u094D\u092F \u092E\u093F\u0932\u093E\u0928 (${bVashya.labels.hi} - ${gVashya.labels.hi})\u0964 \u0906\u092A\u0938\u0940 \u0906\u0915\u0930\u094D\u0937\u0923, \u0917\u0939\u0930\u093E \u092E\u093E\u0928\u0938\u093F\u0915 \u091C\u0941\u0921\u093C\u093E\u0935 \u0914\u0930 \u0905\u0926\u094D\u092D\u0941\u0924 \u0938\u092E\u0930\u094D\u092A\u0923 \u0930\u0939\u0947\u0917\u093E\u0964` : vashyaScore > 0 ? `\u092E\u0927\u094D\u092F\u092E \u0935\u0936\u094D\u092F \u0905\u0928\u0941\u0915\u0942\u0932\u0924\u093E (${bVashya.labels.hi} - ${gVashya.labels.hi})\u0964 \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u092C\u0928\u093E\u090F \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u092A\u0938\u0940 \u0938\u092E\u091D\u0926\u093E\u0930\u0940 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964` : `\u0935\u0936\u094D\u092F \u0926\u094B\u0937\u0964 \u0926\u094B\u0928\u094B\u0902 \u092A\u0915\u094D\u0937\u094B\u0902 \u092E\u0947\u0902 \u0935\u0930\u094D\u091A\u0938\u094D\u0935 \u0915\u0940 \u0932\u0921\u093C\u093E\u0908 \u092F\u093E \u0935\u093F\u091A\u093E\u0930\u094B\u0902 \u092E\u0947\u0902 \u092D\u093E\u0930\u0940 \u091F\u0915\u0930\u093E\u0935 \u0915\u0940 \u0906\u0936\u0902\u0915\u093E \u0930\u0939\u0924\u0940 \u0939\u0948\u0964`;
    } else if (lang === "ta") {
      vashyaDesc = vashyaScore === 2 ? `\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BB5\u0B9A\u0BBF\u0BAF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${bVashya.labels.ta} - ${gVashya.labels.ta}). \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BC8\u0BAF\u0BC7 \u0B86\u0BB4\u0BCD\u0BA8\u0BCD\u0BA4 \u0B88\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0 \u0B85\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BA3\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : vashyaScore > 0 ? `\u0BAE\u0BBF\u0BA4\u0BAE\u0BBE\u0BA9 \u0BB5\u0B9A\u0BBF\u0BAF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${bVashya.labels.ta} - ${gVashya.labels.ta}). \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BBE\u0B95 \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0 \u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB2\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8.` : `\u0BB5\u0B9A\u0BBF\u0BAF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BBF\u0BAF\u0BBF\u0BB2\u0BC1\u0BAE\u0BCD \u0B86\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD \u0B95\u0BC1\u0BA3\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1 \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F \u0BB5\u0BBE\u0BAF\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.`;
    } else if (lang === "kn") {
      vashyaDesc = vashyaScore === 2 ? `\u0C85\u0CA4\u0CCD\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CAE \u0CB5\u0CB6\u0CCD\u0CAF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${bVashya.labels.kn} - ${gVashya.labels.kn}). \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0C86\u0C95\u0CB0\u0CCD\u0CB7\u0CA3\u0CC6, \u0C86\u0CB3\u0CB5\u0CBE\u0CA6 \u0CA8\u0C82\u0CAC\u0CBF\u0C95\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CAE\u0CB0\u0CCD\u0CAA\u0CA3\u0CBE \u0CAE\u0CA8\u0CCB\u0CAD\u0CBE\u0CB5 \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : vashyaScore > 0 ? `\u0CAE\u0CA7\u0CCD\u0CAF\u0CAE \u0CB5\u0CB6\u0CCD\u0CAF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${bVashya.labels.kn} - ${gVashya.labels.kn}). \u0CB5\u0CC8\u0CB5\u0CBE\u0CB9\u0CBF\u0C95 \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF\u0C95\u0CCD\u0C95\u0CBE\u0C97\u0CBF \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CA4\u0CBF\u0CB3\u0CC1\u0CB5\u0CB3\u0CBF\u0C95\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C97\u0CA4\u0CCD\u0CAF.` : `\u0CB5\u0CB6\u0CCD\u0CAF \u0CA6\u0CCB\u0CB7. \u0CAA\u0CCD\u0CB0\u0CAD\u0CC1\u0CA4\u0CCD\u0CB5 \u0CB8\u0CBE\u0CA7\u0CBF\u0CB8\u0CC1\u0CB5 \u0CA7\u0CCB\u0CB0\u0CA3\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CC8\u0C9A\u0CBE\u0CB0\u0CBF\u0C95 \u0CAD\u0CBF\u0CA8\u0CCD\u0CA8\u0CBE\u0CAD\u0CBF\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CC1\u0CB5 \u0CB8\u0CBE\u0CA7\u0CCD\u0CAF\u0CA4\u0CC6\u0CAF\u0CBF\u0CA6\u0CC6.`;
    } else {
      vashyaDesc = vashyaScore === 2 ? `Magnificent magnetic attraction (${bVashya.labels.en} - ${gVashya.labels.en}). High natural alignment of sub-conscious mind and mutual devotion.` : vashyaScore > 0 ? `Acceptable Vashya bond (${bVashya.labels.en} - ${gVashya.labels.en}). Indicates moderate mutual attraction and influence. Good communication can strengthen the relationship.` : `Vashya mismatch. Wild or sharp insectoid energies can invoke command clashes or verbal friction in the house.`;
    }
    ashtaKoota.push({
      koota: "Vashya",
      localizedKoota: translateKoota("Vashya", lang),
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      description: vashyaDesc
    });
    const taraDiffRaw = (gNak - bNak + 27) % 27;
    const taraDiffCheck = taraDiffRaw % 9 === 0 ? 9 : taraDiffRaw % 9;
    let taraScore = 0;
    if ([1, 2, 4, 6, 8].includes(taraDiffCheck)) {
      taraScore = 3;
    } else if ([3, 5, 7].includes(taraDiffCheck)) {
      taraScore = 1.5;
    } else {
      taraScore = 3;
    }
    const taraCategoriesEN = ["Ati-Mitra", "Janma", "Sampat", "Vipat", "Kshema (Well-being)", "Pratyari", "Sadhaka", "Vadha", "Mitra"];
    const taraCategoriesHI = ["\u0905\u0924\u093F-\u092E\u093F\u0924\u094D\u0930 (\u092A\u0930\u092E \u0905\u0928\u0941\u0915\u0942\u0932)", "\u091C\u0928\u094D\u092E (\u0938\u093E\u092E\u093E\u0928\u094D\u092F)", "\u0938\u0902\u092A\u0924 (\u0927\u0928 \u092A\u094D\u0930\u0926\u093E\u092F\u0915)", "\u0935\u093F\u092A\u0924 (\u0905\u0921\u093C\u091A\u0928\u0947\u0902)", "\u0915\u094D\u0937\u0947\u092E (\u0915\u0932\u094D\u092F\u093E\u0923\u0915\u093E\u0930\u0940)", "\u092A\u094D\u0930\u0924\u094D\u092F\u0930\u0940 (\u0915\u0920\u093F\u0928\u093E\u0907\u092F\u093E\u0902)", "\u0938\u093E\u0927\u0915 (\u092A\u0942\u0930\u094D\u0923\u0924\u093E)", "\u0935\u0927 (\u0938\u093E\u0935\u0927\u093E\u0928\u0940)", "\u092E\u093F\u0924\u094D\u0930 (\u0938\u0915\u093E\u0930\u093E\u0924\u094D\u092E\u0915)"];
    const taraCategoriesTE = ["\u0C05\u0C24\u0C3F-\u0C2E\u0C3F\u0C24\u0C4D\u0C30 (\u0C05\u0C24\u0C4D\u0C2F\u0C02\u0C24 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32)", "\u0C1C\u0C28\u0C4D\u0C2E (\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23\u0C02)", "\u0C38\u0C02\u0C2A\u0C24\u0C4D (\u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15\u0C02)", "\u0C35\u0C3F\u0C2A\u0C24\u0C4D (\u0C06\u0C1F\u0C02\u0C15\u0C02)", "\u0C15\u0C4D\u0C37\u0C47\u0C2E (\u0C36\u0C41\u0C2D\u0C15\u0C30\u0C02)", "\u0C2A\u0C4D\u0C30\u0C24\u0C4D\u0C2F\u0C30\u0C3F (\u0C2A\u0C4B\u0C30\u0C3E\u0C1F\u0C02)", "\u0C38\u0C3E\u0C27\u0C15 (\u0C35\u0C3F\u0C1C\u0C2F\u0C02)", "\u0C35\u0C27 (\u0C1C\u0C3E\u0C17\u0C4D\u0C30\u0C24\u0C4D\u0C24)", "\u0C2E\u0C3F\u0C24\u0C4D\u0C30 (\u0C38\u0C4D\u0C28\u0C47\u0C39\u0C02)"];
    const taraCategoriesTA = ["\u0B85\u0BA4\u0BBF-\u0BAE\u0BBF\u0BA4\u0BCD\u0BB0\u0BBE (\u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0BA8\u0BC6\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BBE\u0BA9)", "\u0B9C\u0BA9\u0BCD\u0BAE (\u0B9A\u0BC1\u0BAF)", "\u0B9A\u0BAE\u0BCD\u0BAA\u0BA4\u0BCD (\u0B9A\u0BC6\u0BB2\u0BCD\u0BB5\u0BAE\u0BCD)", "\u0BB5\u0BBF\u0BAA\u0BA4\u0BCD (\u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD)", "\u0B95\u0BCD\u0BB7\u0BC7\u0BAE (\u0BA8\u0BB2\u0BA9\u0BCD)", "\u0BAA\u0BBF\u0BB0\u0BA4\u0BCD\u0BAF\u0BB0\u0BBF (\u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1)", "\u0B9A\u0BBE\u0BA4\u0B95 (\u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF)", "\u0BB5\u0BA4 (\u0BA4\u0BC0\u0BB5\u0BBF\u0BB0\u0BAE\u0BCD)", "\u0BAE\u0BBF\u0BA4\u0BCD\u0BB0\u0BBE (\u0BA8\u0B9F\u0BCD\u0BAA\u0BC1)"];
    const taraCategoriesKN = ["\u0C85\u0CA4\u0CBF-\u0CAE\u0CBF\u0CA4\u0CCD\u0CB0 (\u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CB8\u0CCD\u0CA8\u0CC7\u0CB9)", "\u0C9C\u0CA8\u0CCD\u0CAE (\u0CB8\u0CCD\u0CB5\u0CAF\u0C82)", "\u0CB8\u0C82\u0CAA\u0CA4\u0CCD (\u0C90\u0CB6\u0CCD\u0CB5\u0CB0\u0CAF)", "\u0CB5\u0CBF\u0CAA\u0CA4\u0CCD (\u0C85\u0CA1\u0CC6\u0CA4\u0CA1\u0CC6)", "\u0C95\u0CCD\u0CB7\u0CC7\u0CAE (\u0C95\u0CB2\u0CCD\u0CAF\u0CBE\u0CA3)", "\u0CAA\u0CCD\u0CB0\u0CA4\u0CCD\u0CAF\u0CB0\u0CBF (\u0CB8\u0CB5\u0CBE\u0CB2\u0CC1)", "\u0CB8\u0CBE\u0CA7\u0C95 (\u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CC1)", "\u0CB5\u0CA7 (\u0C85\u0CAA\u0CBE\u0CAF)", "\u0CAE\u0CBF\u0CA4\u0CCD\u0CB0 (\u0CB8\u0CCD\u0CA8\u0CC7\u0CB9)"];
    const activeCategoryEN = taraCategoriesEN[taraDiffCheck];
    const activeCategoryHI = taraCategoriesHI[taraDiffCheck];
    const activeCategoryTE = taraCategoriesTE[taraDiffCheck];
    const activeCategoryTA = taraCategoriesTA[taraDiffCheck];
    const activeCategoryKN = taraCategoriesKN[taraDiffCheck];
    let taraDesc = "";
    if (lang === "te") {
      taraDesc = taraScore === 3 ? `\u0C09\u0C24\u0C4D\u0C24\u0C2E \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30 \u0C24\u0C3E\u0C30\u0C3E \u0C2C\u0C32\u0C02 (${activeCategoryTE}). \u0C05\u0C26\u0C43\u0C37\u0C4D\u0C1F\u0C02, \u0C30\u0C15\u0C4D\u0C37\u0C23 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C41\u0C1F\u0C41\u0C02\u0C2C\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C38\u0C15\u0C32 \u0C10\u0C36\u0C4D\u0C35\u0C30\u0C4D\u0C2F\u0C3E\u0C32\u0C41 \u0C32\u0C2D\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F.` : taraScore > 0 ? `\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23 \u0C24\u0C3E\u0C30\u0C3E \u0C2C\u0C32\u0C02 (${activeCategoryTE}). \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C35\u0C43\u0C24\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C06\u0C1F\u0C02\u0C15\u0C3E\u0C32\u0C41 \u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C28\u0C2A\u0C4D\u0C2A\u0C1F\u0C3F\u0C15\u0C40 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32 \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C05\u0C27\u0C3F\u0C17\u0C2E\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41.` : `\u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C15\u0C42\u0C32 \u0C24\u0C3E\u0C30\u0C3E \u0C2C\u0C32\u0C02 (${activeCategoryTE}). \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3E\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C06\u0C30\u0C4B\u0C39\u0C23 \u0C35\u0C4D\u0C2F\u0C24\u0C3F\u0C30\u0C47\u0C15 \u0C24\u0C30\u0C02\u0C17\u0C3E\u0C32\u0C41 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F; \u0C38\u0C30\u0C48\u0C28 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C05\u0C35\u0C38\u0C30\u0C02.`;
    } else if (lang === "hi") {
      taraDesc = taraScore === 3 ? `\u0936\u0941\u092D \u0924\u093E\u0930\u093E \u092C\u0932 (${activeCategoryHI})\u0964 \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u0906\u0930\u094D\u0925\u093F\u0915 \u0938\u092E\u0943\u0926\u094D\u0927\u093F, \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0914\u0930 \u0938\u0941\u0917\u092E \u0909\u0928\u094D\u0928\u0924\u093F \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0917\u0940\u0964` : taraScore > 0 ? `\u092E\u0927\u094D\u092F\u092E \u0924\u093E\u0930\u093E \u092C\u0932 (${activeCategoryHI})\u0964 \u0938\u092E\u092F-\u0938\u092E\u092F \u092A\u0930 \u091B\u094B\u091F\u0947 \u092E\u094B\u091F\u0947 \u0909\u0924\u093E\u0930-\u091A\u0922\u093C\u093E\u0935 \u0906 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902, \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u0909\u092A\u093E\u092F\u094B\u0902 \u0938\u0947 \u0936\u093E\u0902\u0924\u093F \u092E\u093F\u0932\u0947\u0917\u0940\u0964` : `\u0915\u092E\u091C\u094B\u0930 \u0924\u093E\u0930\u093E \u092C\u0932 (${activeCategoryHI})\u0964 \u0935\u093F\u0936\u0947\u0937 \u0930\u0942\u092A \u0938\u0947 \u0928\u090F \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u092E\u0947\u0902 \u0938\u093E\u0935\u0927\u093E\u0928\u0940 \u092C\u0930\u0924\u0947\u0902\u0964 \u0939\u0928\u0941\u092E\u093E\u0928 \u091A\u093E\u0932\u0940\u0938\u093E \u0915\u093E \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u093E\u0920 \u0932\u093E\u092D\u0915\u093E\u0930\u0940 \u0930\u0939\u0947\u0917\u093E\u0964`;
    } else if (lang === "ta") {
      taraDesc = taraScore === 3 ? `\u0B85\u0BB1\u0BCD\u0BAA\u0BC1\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA4\u0BBE\u0BB0\u0BBE \u0BAA\u0BB2\u0BAE\u0BCD (${activeCategoryTA}). \u0BB5\u0BBE\u0BB4\u0BCD\u0BB5\u0BBF\u0BB2\u0BCD \u0B85\u0BA4\u0BBF\u0BB0\u0BCD\u0BB7\u0BCD\u0B9F\u0BAE\u0BCD, \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : taraScore > 0 ? `\u0BA8\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB0 \u0BA4\u0BBE\u0BB0\u0BBE \u0BAA\u0BB2\u0BAE\u0BCD (${activeCategoryTA}). \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD, \u0B8E\u0BB3\u0BBF\u0BAF \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BA8\u0BB1\u0BCD\u0BAA\u0BB2\u0BA9\u0BCD\u0B95\u0BB3\u0BC8\u0BAA\u0BCD \u0BAA\u0BC6\u0BB1\u0BB2\u0BBE\u0BAE\u0BCD.` : `\u0BAA\u0BB2\u0BB5\u0BC0\u0BA9\u0BAE\u0BBE\u0BA9 \u0BA4\u0BBE\u0BB0\u0BBE \u0BAA\u0BB2\u0BAE\u0BCD (${activeCategoryTA}). \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B95\u0BB5\u0BA9\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8, \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0BB5\u0BA4\u0BC1 \u0BA8\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1.`;
    } else if (lang === "kn") {
      taraDesc = taraScore === 3 ? `\u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CA4\u0CBE\u0CB0\u0CBE \u0CAC\u0CB2 (${activeCategoryKN}). \u0C9C\u0CC0\u0CB5\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C90\u0CB6\u0CCD\u0CB5\u0CB0\u0CB0\u0CC1, \u0CAD\u0CA6\u0CCD\u0CB0\u0CA4\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CC1\u0CB2\u0CAD \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : taraScore > 0 ? `\u0CAE\u0CA7\u0CCD\u0CAF\u0CAE \u0CA4\u0CBE\u0CB0\u0CBE \u0CAC\u0CB2 (${activeCategoryKN}). \u0CB8\u0CBE\u0C82\u0CA6\u0CB0\u0CCD\u0CAD\u0CBF\u0C95 \u0C8F\u0CB0\u0CBF\u0CB3\u0CBF\u0CA4\u0C97\u0CB3\u0CC1 \u0CAC\u0CB0\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1, \u0CB8\u0CB0\u0CB3 \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CBF\u0C82\u0CA6 \u0CAA\u0CCD\u0CB0\u0CB6\u0CBE\u0C82\u0CA4\u0CA4\u0CC6 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CA6\u0CC6.` : `\u0CA6\u0CC1\u0CB0\u0CCD\u0CAC\u0CB2 \u0CA4\u0CBE\u0CB0\u0CBE \u0CAC\u0CB2 (${activeCategoryKN}). \u0CB5\u0CC3\u0CA4\u0CCD\u0CA4\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CC6\u0CB2\u0CB8\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0C8E\u0C9A\u0CCD\u0C9A\u0CB0 \u0CB5\u0CB9\u0CBF\u0CB8\u0CBF, \u0CA8\u0CBF\u0CAF\u0CAE\u0CBF\u0CA4 \u0CA6\u0CC7\u0CB5\u0CA4\u0CBE \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0CCD\u0CA5\u0CA8\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6.`;
    } else {
      taraDesc = taraScore === 3 ? `Auspicious Tarabala (${activeCategoryEN}). Fosters high luck, domestic security, and smooth professional evolution for the couple.` : taraScore > 0 ? `Neutral Tarabala (${activeCategoryEN}). Mild occasional friction in timelines, easily resolved via simple prayer rituals.` : `Deficient Tarabala (${activeCategoryEN}). Requires dynamic attention. Star patterns suggest structural communication gaps and energy blockages.`;
    }
    ashtaKoota.push({
      koota: "Tara",
      localizedKoota: translateKoota("Tara", lang),
      maxPoints: 3,
      obtainedPoints: taraScore,
      description: taraDesc
    });
    const bYoniIdx = NAKSHATRA_YONIS[bNak];
    const gYoniIdx = NAKSHATRA_YONIS[gNak];
    const bYoni = bYoniIdx;
    const gYoni = gYoniIdx;
    let yoniScore = 2;
    if (bYoniIdx === gYoniIdx) {
      yoniScore = 4;
    } else {
      const isDeadlyRaw = bYoniIdx === 3 && gYoniIdx === 12 || bYoniIdx === 12 && gYoniIdx === 3 || // Serpent vs Mongoose
      bYoniIdx === 7 && gYoniIdx === 9 || bYoniIdx === 9 && gYoniIdx === 7 || // Cow vs Tiger
      bYoniIdx === 1 && gYoniIdx === 13 || bYoniIdx === 13 && gYoniIdx === 1 || // Elephant vs Lion
      bYoniIdx === 0 && gYoniIdx === 8 || bYoniIdx === 8 && gYoniIdx === 0 || // Horse vs Buffalo
      bYoniIdx === 4 && gYoniIdx === 5 || bYoniIdx === 5 && gYoniIdx === 4 || // Dog vs Cat
      bYoniIdx === 6 && gYoniIdx === 5 || bYoniIdx === 5 && gYoniIdx === 6 || // Rat vs Cat
      bYoniIdx === 2 && gYoniIdx === 11 || bYoniIdx === 11 && gYoniIdx === 2;
      if (isDeadlyRaw) {
        yoniScore = 0;
      } else {
        const isFriendlyRaw = bYoniIdx === 7 && gYoniIdx === 2 || bYoniIdx === 2 && gYoniIdx === 7 || // Cow & Sheep
        bYoniIdx === 1 && gYoniIdx === 8 || bYoniIdx === 8 && gYoniIdx === 1 || // Elephant & Buffalo
        bYoniIdx === 0 && gYoniIdx === 10 || bYoniIdx === 10 && gYoniIdx === 0 || // Horse & Hare
        bYoniIdx === 11 && gYoniIdx === 12 || bYoniIdx === 12 && gYoniIdx === 11;
        if (isFriendlyRaw) {
          yoniScore = 3;
        }
      }
    }
    let yoniDesc = "";
    if (lang === "te") {
      yoniDesc = yoniScore === 4 ? `\u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C2E\u0C48\u0C28 \u0C0F\u0C15 \u0C2F\u0C4B\u0C28\u0C3F \u0C2A\u0C4A\u0C02\u0C24\u0C28 (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15 \u0C38\u0C3E\u0C28\u0C4D\u0C28\u0C3F\u0C39\u0C3F\u0C24\u0C4D\u0C2F\u0C02, \u0C26\u0C3E\u0C02\u0C2A\u0C24\u0C4D\u0C2F \u0C38\u0C41\u0C16\u0C02 \u0C05\u0C24\u0C4D\u0C2F\u0C41\u0C28\u0C4D\u0C28\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.` : yoniScore === 3 ? `\u0C2E\u0C3F\u0C24\u0C4D\u0C30 \u0C2F\u0C4B\u0C28\u0C3F \u0C2A\u0C4A\u0C02\u0C24\u0C28 (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). \u0C09\u0C24\u0C4D\u0C24\u0C2E \u0C32\u0C48\u0C02\u0C17\u0C3F\u0C15 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15 \u0C38\u0C3E\u0C2E\u0C30\u0C38\u0C4D\u0C2F\u0C02 \u0C32\u0C2D\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.` : yoniScore === 2 ? `\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23 \u0C2F\u0C4B\u0C28\u0C3F \u0C2A\u0C4A\u0C02\u0C24\u0C28 (${YONI_NAMES.te[bYoniIdx]} - ${YONI_NAMES.te[gYoniIdx]}). \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15\u0C02\u0C17\u0C3E\u0C28\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2E\u0C3E\u0C28\u0C38\u0C3F\u0C15\u0C02\u0C17\u0C3E\u0C28\u0C41 \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C2E\u0C48\u0C28 \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C02 \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : `\u0C2F\u0C4B\u0C28\u0C3F \u0C05\u0C24\u0C4D\u0C2F\u0C02\u0C24 \u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C15\u0C42\u0C32\u0C2E\u0C48\u0C28\u0C26\u0C3F (\u0C2E\u0C39\u0C3E \u0C36\u0C24\u0C4D\u0C30\u0C41 \u0C38\u0C2E\u0C42\u0C39\u0C02: ${YONI_NAMES.te[bYoniIdx]} vs ${YONI_NAMES.te[gYoniIdx]}). \u0C1C\u0C40\u0C35 \u0C38\u0C4D\u0C35\u0C2D\u0C3E\u0C35\u0C3E\u0C32\u0C41 \u0C35\u0C47\u0C30\u0C41 \u0C15\u0C3E\u0C35\u0C21\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C05\u0C38\u0C02\u0C24\u0C43\u0C2A\u0C4D\u0C24\u0C3F \u0C0F\u0C30\u0C4D\u0C2A\u0C21\u0C47 \u0C05\u0C35\u0C15\u0C3E\u0C36\u0C02 \u0C09\u0C02\u0C26\u0C3F.`;
    } else if (lang === "hi") {
      yoniDesc = yoniScore === 4 ? `\u092A\u0930\u092E \u0905\u0928\u0941\u0915\u0942\u0932 \u092F\u094B\u0928\u0940 \u092E\u093F\u0932\u093E\u0928 (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})\u0964 \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0914\u0930 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u094D\u0924\u0930\u094B\u0902 \u092A\u0930 \u092A\u0942\u0930\u094D\u0923 \u0938\u0902\u0924\u0941\u0937\u094D\u091F\u093F \u090F\u0935\u0902 \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u0930\u0939\u0947\u0917\u093E\u0964` : yoniScore === 3 ? `\u092E\u093F\u0924\u094D\u0930 \u092F\u094B\u0928\u0940 \u092E\u093F\u0932\u093E\u0928 (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})\u0964 \u0909\u0924\u094D\u0924\u092E \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u0938\u0941\u0916 \u0914\u0930 \u092A\u094D\u0930\u0947\u092E \u092D\u093E\u0935\u0928\u093E \u0935\u093F\u0915\u0938\u093F\u0924 \u0939\u094B\u0917\u0940\u0964` : yoniScore === 2 ? `\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u092F\u094B\u0928\u0940 \u0905\u0928\u0941\u0915\u0942\u0932\u0924\u093E (${YONI_NAMES.hi[bYoniIdx]} - ${YONI_NAMES.hi[gYoniIdx]})\u0964 \u0914\u0938\u0924 \u0914\u0930 \u0938\u0941\u0917\u092E \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0938\u092E\u094D\u092C\u0928\u094D\u0927 \u092C\u0928\u0947 \u0930\u0939\u0947\u0902\u0917\u0947\u0964` : `\u092E\u0939\u093E\u0930\u0936\u0924\u094D\u0930\u0941 \u092F\u094B\u0928\u0940 \u091F\u0915\u0930\u093E\u0935 (${YONI_NAMES.hi[bYoniIdx]} \u092C\u0928\u093E\u092E ${YONI_NAMES.hi[gYoniIdx]})\u0964 \u090F\u0915 \u0926\u0942\u0938\u0930\u0947 \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u092A\u094D\u0930\u093E\u0915\u0943\u0924\u093F\u0915 \u0935\u0948\u092E\u0928\u0938\u094D\u092F\u0924\u093E \u0915\u0947 \u0915\u093E\u0930\u0923 \u0918\u0928\u093F\u0937\u094D\u0920\u0924\u093E \u092E\u0947\u0902 \u092C\u093E\u0927\u093E \u0906 \u0938\u0915\u0924\u0940 \u0939\u0948\u0964`;
    } else if (lang === "ta") {
      yoniDesc = yoniScore === 4 ? `\u0B85\u0BB1\u0BCD\u0BAA\u0BC1\u0BA4\u0BAE\u0BBE\u0BA9 \u0B8F\u0B95 \u0BAF\u0BCB\u0BA9\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). \u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0B89\u0B9F\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA9\u0BB0\u0BC0\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9 \u0BAA\u0BC1\u0BB0\u0BBF\u0BA4\u0BB2\u0BC1\u0BAE\u0BCD \u0BA4\u0BBE\u0BAE\u0BCD\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0B9A\u0BC1\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : yoniScore === 3 ? `\u0BA8\u0B9F\u0BCD\u0BAA\u0BC1 \u0BAF\u0BCB\u0BA9\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). \u0BA8\u0BB2\u0BCD\u0BB2 \u0B89\u0B9F\u0BB2\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0B87\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BA4\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0BA9 \u0B87\u0BB2\u0BCD\u0BB2\u0BB1\u0BAE\u0BC1\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : yoniScore === 2 ? `\u0B9A\u0BAE\u0BAE\u0BBE\u0BA9 \u0BAF\u0BCB\u0BA9\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${YONI_NAMES.ta[bYoniIdx]} - ${YONI_NAMES.ta[gYoniIdx]}). \u0B89\u0B9F\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAE\u0BA9 \u0BB0\u0BC0\u0BA4\u0BBF\u0BAF\u0BBE\u0B95 \u0B9A\u0BAE\u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBE\u0BA9 \u0B89\u0BB1\u0BB5\u0BC1 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : `\u0B89\u0BB1\u0BB5\u0BBF\u0BB2\u0BCD \u0B88\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1 \u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD.`;
    } else if (lang === "kn") {
      yoniDesc = yoniScore === 4 ? `\u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0C8F\u0C95 \u0CAF\u0CCB\u0CA8\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}). \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0C89\u0CA8\u0CCD\u0CA8\u0CA4 \u0CAE\u0C9F\u0CCD\u0C9F\u0CA6 \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CC8\u0CB5\u0CBE\u0CB9\u0CBF\u0C95 \u0CB8\u0CCC\u0C96\u0CCD\u0CAF \u0CB2\u0CAD\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : yoniScore === 3 ? `\u0CAE\u0CBF\u0CA4\u0CCD\u0CB0 \u0CAF\u0CCB\u0CA8\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}). \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CB2\u0CC8\u0C82\u0C97\u0CBF\u0C95 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CCD\u0CB0\u0CC0\u0CA4\u0CBF \u0CB5\u0CC3\u0CA6\u0CCD\u0CA7\u0CBF\u0CAF\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : yoniScore === 2 ? `\u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF \u0CAF\u0CCB\u0CA8\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${YONI_NAMES.kn[bYoniIdx]} - ${YONI_NAMES.kn[gYoniIdx]}).\u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0C95\u0C82\u0CAB\u0CB0\u0CCD\u0C9F\u0CCD \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `\u0CAE\u0CB9\u0CBE \u0CB6\u0CA4\u0CCD\u0CB0\u0CC1 \u0CAF\u0CCB\u0CA8\u0CBF \u0CB8\u0C82\u0C98\u0CB0\u0CCD\u0CB7 (${YONI_NAMES.kn[bYoniIdx]} \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 ${YONI_NAMES.kn[gYoniIdx]}). \u0CB8\u0CB9\u0C9C \u0CB5\u0CC8\u0CAE\u0CA8\u0CB8\u0CCD\u0CAF\u0CA6\u0CBF\u0C82\u0CA6\u0CBE\u0C97\u0CBF \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0C86\u0C95\u0CB0\u0CCD\u0CB7\u0CA3\u0CC6 \u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0CAF\u0CBE\u0C97\u0CC1\u0CB5 \u0CB8\u0C82\u0CAD\u0CB5\u0CB5\u0CBF\u0CA6\u0CC6.`;
    } else {
      yoniDesc = yoniScore === 4 ? `Superior Same-Yoni match (${YONI_NAMES.en[bYoniIdx]}). Fosters incredible physical fidelity, biological chemistry, and deep intuitive romance.` : yoniScore === 3 ? `Friendly Yoni match (${YONI_NAMES.en[bYoniIdx]} & ${YONI_NAMES.en[gYoniIdx]}). High rating in reproductive potential and relationship stability.` : yoniScore === 2 ? `Balanced Yoni compatibility (${YONI_NAMES.en[bYoniIdx]} with ${YONI_NAMES.en[gYoniIdx]}). Standard physical comfort with normal domestic expectations.` : `Mortal Enemy Yoni conflict (${YONI_NAMES.en[bYoniIdx]} vs ${YONI_NAMES.en[gYoniIdx]}). Prompts high friction, hormonal offsets, and subconscious defensiveness.`;
    }
    ashtaKoota.push({
      koota: "Yoni",
      localizedKoota: translateKoota("Yoni", lang),
      maxPoints: 4,
      obtainedPoints: yoniScore,
      description: yoniDesc
    });
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
      } else if (bToG_friend && !gToB_enemy || gToB_friend && !bToG_enemy) {
        maitriScore = 4;
      } else if (!bToG_enemy && !gToB_enemy) {
        maitriScore = 3;
      } else if (bToG_enemy && gToB_enemy) {
        maitriScore = 0;
      } else {
        maitriScore = 1.5;
      }
    }
    const locBLordName = translatePlanet(bLordName, lang);
    const locGLordName = translatePlanet(gLordName, lang);
    let maitriDesc = "";
    if (lang === "te") {
      maitriDesc = maitriScore === 5 ? `\u0C05\u0C24\u0C4D\u0C2F\u0C41\u0C28\u0C4D\u0C28\u0C24 \u0C17\u0C4D\u0C30\u0C39 \u0C2E\u0C48\u0C24\u0C4D\u0C30\u0C3F (${locBLordName} - ${locGLordName}). \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F \u0C06\u0C32\u0C4B\u0C1A\u0C28\u0C3E \u0C38\u0C30\u0C33\u0C3F \u0C12\u0C15\u0C47 \u0C35\u0C3F\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F. \u0C38\u0C02\u0C2D\u0C3E\u0C37\u0C23\u0C32\u0C41 \u0C1A\u0C3E\u0C32\u0C3E \u0C38\u0C1C\u0C3E\u0C35\u0C41\u0C17\u0C3E \u0C38\u0C3E\u0C17\u0C41\u0C24\u0C3E\u0C2F\u0C3F.` : maitriScore >= 3 ? `\u0C38\u0C39\u0C15\u0C3E\u0C30 \u0C17\u0C4D\u0C30\u0C39 \u0C2E\u0C48\u0C24\u0C4D\u0C30\u0C3F (${locBLordName} - ${locGLordName}). \u0C15\u0C41\u0C1F\u0C41\u0C02\u0C2C \u0C28\u0C3F\u0C2F\u0C2E\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C48\u0C35\u0C3E\u0C39\u0C3F\u0C15 \u0C2C\u0C3E\u0C27\u0C4D\u0C2F\u0C24\u0C32\u0C2A\u0C48 \u0C17\u0C4C\u0C30\u0C35\u0C02 \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : `\u0C06\u0C32\u0C4B\u0C1A\u0C28\u0C3E \u0C35\u0C48\u0C30\u0C41\u0C27\u0C4D\u0C2F\u0C02 \u0C09\u0C02\u0C26\u0C3F (${locBLordName} vs ${locGLordName}). \u0C36\u0C24\u0C4D\u0C30\u0C41 \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C15\u0C3E\u0C35\u0C21\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C24\u0C30\u0C1A\u0C41\u0C17\u0C3E \u0C2D\u0C3F\u0C28\u0C4D\u0C28\u0C2E\u0C48\u0C28 \u0C05\u0C2D\u0C3F\u0C2A\u0C4D\u0C30\u0C3E\u0C2F\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C1F\u0C4D\u0C1F\u0C41\u0C26\u0C32\u0C15\u0C41 \u0C26\u0C3E\u0C30\u0C3F\u0C24\u0C40\u0C2F\u0C35\u0C1A\u0C4D\u0C1A\u0C41.`;
    } else if (lang === "hi") {
      maitriDesc = maitriScore === 5 ? `\u0938\u0930\u094D\u0935\u0936\u094D\u0930\u0947\u0937\u094D\u0920 \u0917\u094D\u0930\u0939 \u092E\u0948\u0924\u094D\u0930\u0940 (${locBLordName} - ${locGLordName})\u0964 \u0926\u094B\u0928\u094B\u0902 \u0915\u0947 \u0935\u0948\u091A\u093E\u0930\u093F\u0915 \u0927\u0930\u093E\u0924\u0932 \u092E\u0947\u0902 \u092A\u0942\u0930\u094D\u0923 \u0938\u092E\u093E\u0928\u0924\u093E \u0930\u0939\u0947\u0917\u0940\u0964 \u091C\u0940\u0935\u0928 \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0938\u093E\u091D\u093E \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u0930\u0939\u0947\u0917\u093E\u0964` : maitriScore >= 3 ? `\u0938\u0902\u0924\u094B\u0937\u091C\u0928\u0915 \u0917\u094D\u0930\u0939 \u092E\u0948\u0924\u094D\u0930\u0940 (${locBLordName} - ${locGLordName})\u0964 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u090F\u0935\u0902 \u0915\u0930\u094D\u0924\u0935\u094D\u092F\u094B\u0902 \u0915\u0947 \u0928\u093F\u0930\u094D\u0935\u0939\u0928 \u092E\u0947\u0902 \u0905\u091A\u094D\u091B\u093E \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u0930\u0939\u0947\u0917\u093E\u0964` : `\u0917\u094D\u0930\u0939 \u0936\u0924\u094D\u0930\u0941\u0924\u093E \u0926\u094B\u0937 (${locBLordName} \u092C\u0928\u093E\u092E ${locGLordName})\u0964 \u0935\u0948\u091A\u093E\u0930\u093F\u0915 \u0938\u094D\u0924\u0930 \u092A\u0930 \u0928\u093F\u0930\u0902\u0924\u0930 \u0905\u0938\u0939\u092E\u0924\u093F \u092F\u093E \u0939\u0920\u0927\u0930\u094D\u092E\u093F\u0924\u093E \u092C\u0922\u093C\u0928\u0947 \u0915\u0947 \u0938\u0902\u0915\u0947\u0924\u0964`;
    } else if (lang === "ta") {
      maitriDesc = maitriScore === 5 ? `\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0B95\u0BBF\u0BB0\u0B95 \u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${locBLordName} - ${locGLordName}). \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BBF\u0B9F\u0BC8\u0BAF\u0BC7 \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBF\u0BA4\u0BB2\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC1\u0BAE\u0BBF\u0BA4\u0BCD\u0BA4 \u0B9A\u0BBF\u0BA8\u0BCD\u0BA4\u0BA9\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD.` : maitriScore >= 3 ? `\u0BA4\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BA4\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0BA9 \u0B95\u0BBF\u0BB0\u0B95 \u0BAE\u0BC8\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (${locBLordName} - ${locGLordName}). \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0B95\u0B9F\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2 \u0B92\u0BA4\u0BCD\u0BA4\u0BC1\u0BB4\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : `\u0B95\u0BBF\u0BB0\u0B95 \u0BAA\u0B95\u0BC8\u0BAE\u0BC8 \u0B95\u0BBE\u0BA3\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1 (${locBLordName} \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD ${locGLordName}). \u0B87\u0BA4\u0BA9\u0BBE\u0BB2\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BC0\u0BA3\u0BCD \u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0BB5\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD.`;
    } else if (lang === "kn") {
      maitriDesc = maitriScore === 5 ? `\u0C85\u0CA4\u0CCD\u0CAF\u0CC1\u0CA8\u0CCD\u0CA8\u0CA4 \u0C97\u0CCD\u0CB0\u0CB9 \u0CAE\u0CC8\u0CA4\u0CCD\u0CB0\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${locBLordName} - ${locGLordName}). \u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0C86\u0CB2\u0CCB\u0C9A\u0CA8\u0CBE \u0CB8\u0CB0\u0CA3\u0CBF \u0C92\u0C82\u0CA6\u0CC7 \u0C86\u0C97\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6 \u0CB9\u0CBE\u0C97\u0CC2 \u0CA6\u0CBE\u0C82\u0CAA\u0CA4\u0CCD\u0CAF \u0CB8\u0CC1\u0C96\u0CAE\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : maitriScore >= 3 ? `\u0CAA\u0CC2\u0CB0\u0C95 \u0C97\u0CCD\u0CB0\u0CB9 \u0CAE\u0CC8\u0CA4\u0CCD\u0CB0\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (${locBLordName} - ${locGLordName}). \u0C95\u0CCC\u0C9F\u0CC1\u0C82\u0CAC\u0CBF\u0C95 \u0C9C\u0CB5\u0CBE\u0CAC\u0CCD\u0CA6\u0CBE\u0CB0\u0CBF \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CC2 \u0CB8\u0CB9\u0C95\u0CB0\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CB0\u0CC6.` : `\u0C97\u0CCD\u0CB0\u0CB9 \u0CB6\u0CA4\u0CCD\u0CB0\u0CC1\u0CA4\u0CCD\u0CB5 \u0CA6\u0CCB\u0CB7 (${locBLordName} \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 ${locGLordName}). \u0CB5\u0CC8\u0C9A\u0CBE\u0CB0\u0CBF\u0C95 \u0CAD\u0CBF\u0CA8\u0CCD\u0CA8\u0CBE\u0CAD\u0CBF\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF\u0C97\u0CB3\u0CC1 \u0CB9\u0CBE\u0C97\u0CC2 \u0C9C\u0C97\u0CB3\u0C97\u0CB3\u0CC1 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CC1\u0CB5 \u0CB8\u0CBE\u0CA7\u0CCD\u0CAF\u0CA4\u0CC6 \u0C97\u0CCB\u0C9A\u0CB0\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.`;
    } else {
      maitriDesc = maitriScore === 5 ? `Sovereign Graha Maitri (The Moon-sign lords are natural friends). Indicates strong intellectual compatibility and mental harmony.` : maitriScore >= 3 ? `Harmonious Graha Maitri (${locBLordName} and ${locGLordName} share compatible relationship). Normal respect, good for long term relationship stability.` : `Challenging Graha Maitri (${locBLordName} vs ${locGLordName} are enemy planets). Can cause conflict of views or egos without conscious compromise.`;
    }
    ashtaKoota.push({
      koota: "Graha Maitri",
      localizedKoota: translateKoota("Graha Maitri", lang),
      maxPoints: 5,
      obtainedPoints: maitriScore,
      description: maitriDesc
    });
    const bGanaIdx = NAKSHATRA_GANAS[bNak];
    const gGanaIdx = NAKSHATRA_GANAS[gNak];
    let ganaScore = 0;
    if (bGanaIdx === gGanaIdx) {
      ganaScore = 6;
    } else if (bGanaIdx === 0 && gGanaIdx === 1 || bGanaIdx === 1 && gGanaIdx === 0) {
      ganaScore = 5;
    } else if (bGanaIdx === 0 && gGanaIdx === 2 || bGanaIdx === 2 && gGanaIdx === 0) {
      ganaScore = 1;
    } else {
      ganaScore = 0;
    }
    let ganaDesc = "";
    if (lang === "te") {
      ganaDesc = ganaScore === 6 ? `\u0C09\u0C24\u0C4D\u0C24\u0C2E \u0C17\u0C23 \u0C2A\u0C4A\u0C02\u0C24\u0C28 (\u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F\u0C26\u0C40: ${G_NAMES.te[bGanaIdx]}). \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F \u0C2A\u0C4D\u0C30\u0C35\u0C30\u0C4D\u0C24\u0C28, \u0C1C\u0C40\u0C35\u0C28\u0C36\u0C48\u0C32\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2C\u0C3E\u0C27\u0C4D\u0C2F\u0C24\u0C32\u0C2A\u0C1F\u0C4D\u0C32 \u0C38\u0C2E\u0C3E\u0C28\u0C2E\u0C48\u0C28 \u0C05\u0C35\u0C17\u0C3E\u0C39\u0C28 \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.` : ganaScore === 5 ? `\u0C26\u0C47\u0C35-\u0C2E\u0C28\u0C41\u0C37\u0C4D\u0C2F \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C24. \u0C06\u0C27\u0C4D\u0C2F\u0C3E\u0C24\u0C4D\u0C2E\u0C3F\u0C15 \u0C2A\u0C4D\u0C30\u0C36\u0C3E\u0C02\u0C24\u0C24 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C4D\u0C30\u0C3E\u0C2A\u0C02\u0C1A\u0C3F\u0C15 \u0C15\u0C3E\u0C30\u0C4D\u0C2F\u0C15\u0C32\u0C3E\u0C2A\u0C3E\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C2E\u0C02\u0C1A\u0C3F \u0C38\u0C2E\u0C28\u0C4D\u0C35\u0C2F\u0C02 \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.` : `\u0C17\u0C23 \u0C26\u0C4B\u0C37\u0C02 \u0C09\u0C02\u0C26\u0C3F (\u0C30\u0C3E\u0C15\u0C4D\u0C37\u0C38 \u0C17\u0C23 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C02). \u0C06\u0C27\u0C3F\u0C2A\u0C24\u0C4D\u0C2F \u0C38\u0C4D\u0C35\u0C2D\u0C3E\u0C35\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C05\u0C2A\u0C3E\u0C30\u0C4D\u0C25\u0C3E\u0C32\u0C41 \u0C0F\u0C30\u0C4D\u0C2A\u0C21\u0C35\u0C1A\u0C4D\u0C1A\u0C41; \u0C36\u0C3E\u0C02\u0C24\u0C3F \u0C2A\u0C42\u0C1C\u0C32\u0C41 \u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C26\u0C4D\u0C27\u0C3E\u0C2F\u0C3F.`;
    } else if (lang === "hi") {
      ganaDesc = ganaScore === 6 ? `\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u0917\u0923 \u092E\u0947\u0932 (${G_NAMES.hi[bGanaIdx]} \u0926\u094B\u0928\u094B\u0902)\u0964 \u091C\u0940\u0935\u0928\u0936\u0948\u0932\u0940, \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u092E\u0942\u0932\u094D\u092F\u094B\u0902 \u0914\u0930 \u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u091C\u0940\u0935\u0928 \u0915\u0947 \u092A\u094D\u0930\u0924\u093F \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0923 \u092E\u0947\u0902 \u092A\u0942\u0930\u094D\u0923 \u0938\u092E\u093E\u0928\u0924\u093E \u0930\u0939\u0947\u0917\u0940\u0964` : ganaScore === 5 ? `\u0926\u0947\u0935-\u092E\u0928\u0941\u0937\u094D\u092F \u0936\u0941\u092D \u0938\u0902\u0930\u0947\u0916\u0923\u0964 \u0926\u0947\u0935 \u0938\u094D\u0935\u092D\u093E\u0935 \u0915\u0940 \u0915\u094B\u092E\u0932\u0924\u093E \u092E\u0928\u0941\u0937\u094D\u092F \u0938\u094D\u0935\u092D\u093E\u0935 \u0915\u0947 \u0938\u093E\u0902\u0938\u093E\u0930\u093F\u0915 \u0932\u0915\u094D\u0937\u094D\u092F\u094B\u0902 \u0915\u094B \u0938\u0939\u091C\u0924\u093E \u0938\u0947 \u092A\u094B\u0937\u093F\u0924 \u0915\u0930\u0947\u0917\u0940\u0964` : `\u0917\u0923 \u0926\u094B\u0937 (\u0930\u093E\u0915\u094D\u0937\u0938 \u0917\u0923 \u092A\u094D\u0930\u092D\u093E\u0935)\u0964 \u090F\u0915 \u092A\u0915\u094D\u0937 \u0915\u0947 \u0905\u0924\u094D\u092F\u0927\u093F\u0915 \u092E\u0941\u0916\u0930 \u092F\u093E \u091C\u093F\u0926\u094D\u0926\u0940 \u0938\u094D\u0935\u092D\u093E\u0935 \u0915\u0947 \u0915\u093E\u0930\u0923 \u0936\u093E\u0902\u0924\u093F \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0939\u094B \u0938\u0915\u0924\u0940 \u0939\u0948; \u0936\u093E\u0902\u0924\u093F \u092A\u0942\u091C\u093E \u0939\u093F\u0924\u0915\u0930 \u0939\u0948\u0964`;
    } else if (lang === "ta") {
      ganaDesc = ganaScore === 6 ? `\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0B95\u0BA3 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD: ${G_NAMES.ta[bGanaIdx]}). \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0BA8\u0B9F\u0BA4\u0BCD\u0BA4\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0B95\u0BCD\u0B95\u0BC8 \u0BAE\u0BC1\u0BB1\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBF\u0BA4\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : ganaScore === 5 ? `\u0BA4\u0BC7\u0BB5-\u0BAE\u0BA9\u0BBF\u0BA4 \u0B95\u0BA3\u0BAE\u0BCD \u0B87\u0BAF\u0BB2\u0BCD\u0BAA\u0BBE\u0BA9 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD. \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0B89\u0BB2\u0B95\u0BBF\u0BAF\u0BB2\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B87\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BBE\u0BAF\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.` : `\u0B95\u0BA3 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (\u0BB0\u0BBE\u0B9F\u0BCD\u0B9A\u0B9A \u0B95\u0BA3\u0BAE\u0BCD). \u0B92\u0BB0\u0BC1\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0BAA\u0BBF\u0B9F\u0BBF\u0BB5\u0BBE\u0BA4 \u0B95\u0BC1\u0BA3\u0BA4\u0BCD\u0BA4\u0BBE\u0BB2\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD; \u0B8E\u0BB3\u0BBF\u0BAF \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD \u0BA8\u0BA9\u0BCD\u0BAE\u0BC8 \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD.`;
    } else if (lang === "kn") {
      ganaDesc = ganaScore === 6 ? `\u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0C97\u0CA3 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (\u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CA6\u0CCD\u0CA6\u0CC2: ${G_NAMES.kn[bGanaIdx]}). \u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0CA8\u0CA1\u0CB5\u0CB3\u0CBF\u0C95\u0CC6, \u0C9C\u0CC0\u0CB5\u0CA8 \u0CB6\u0CC8\u0CB2\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C9C\u0CB5\u0CBE\u0CAC\u0CCD\u0CA6\u0CBE\u0CB0\u0CBF\u0C97\u0CB3 \u0CAC\u0C97\u0CCD\u0C97\u0CC6 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : ganaScore === 5 ? `\u0CA6\u0CC7\u0CB5-\u0CAE\u0CA8\u0CC1\u0CB7\u0CCD\u0CAF \u0CB8\u0CAE\u0CA4\u0CCB\u0CB2\u0CA8. \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95 \u0CAA\u0CCD\u0CB0\u0CB8\u0CA8\u0CCD\u0CA8\u0CA4\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CBE\u0C82\u0CB8\u0CBE\u0CB0\u0CBF\u0C95 \u0C9C\u0CB5\u0CBE\u0CAC\u0CCD\u0CA6\u0CBE\u0CB0\u0CBF\u0C97\u0CB3 \u0CA8\u0CA1\u0CC1\u0CB5\u0CC6 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `\u0C97\u0CA3 \u0CA6\u0CCB\u0CB7\u0CB5\u0CBF\u0CA6\u0CC6 (\u0CB0\u0CBE\u0C95\u0CCD\u0CB7\u0CB8 \u0C97\u0CA3\u0CA6 \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5). \u0CA4\u0CC0\u0CB5\u0CCD\u0CB0 \u0CB9\u0CA0\u0CAE\u0CBE\u0CB0\u0CBF \u0CB8\u0CCD\u0CB5\u0CAD\u0CBE\u0CB5\u0CA6\u0CBF\u0C82\u0CA6 \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CAD\u0CBF\u0CA8\u0CCD\u0CA8\u0CBE\u0CAD\u0CBF\u0CAA\u0CCD\u0CB0\u0CBE\u0CAF \u0CAE\u0CC2\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1; \u0CA6\u0CCB\u0CB7 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0 \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0C85\u0C97\u0CA4\u0CCD\u0CAF.`;
    } else {
      ganaDesc = ganaScore === 6 ? `Identical Gana alignment (${G_NAMES.en[bGanaIdx]}). Outstanding compatibility in public behavior, lifestyle speed, and reaction to stresses.` : ganaScore === 5 ? `Harmonious Deva-Manushya blending. Spiritual calmness guides worldly performance nicely with zero negative sparks.` : `Critical Gana imbalance (Rakshasa Gana tension). One of the partners displays extreme stubborn resistance, causing severe fatigue in a softer partner.`;
    }
    ashtaKoota.push({
      koota: "Gana",
      localizedKoota: translateKoota("Gana", lang),
      maxPoints: 6,
      obtainedPoints: ganaScore,
      description: ganaDesc
    });
    const rasiDiff = (gRasi - bRasi + 12) % 12;
    let bhakootScore = 7;
    if ([1, 4, 5, 7, 8, 11].includes(rasiDiff)) {
      bhakootScore = 0;
    }
    let bhakootDesc = "";
    if (lang === "te") {
      bhakootDesc = bhakootScore === 7 ? `\u0C1A\u0C3E\u0C32\u0C3E \u0C36\u0C4D\u0C30\u0C47\u0C37\u0C4D\u0C1F\u0C2E\u0C48\u0C28 \u0C30\u0C3E\u0C36\u0C3F \u0C2A\u0C4A\u0C02\u0C24\u0C28 (\u0C2E\u0C02\u0C1A\u0C3F \u0C26\u0C42\u0C30\u0C02: ${rasiDiff}). \u0C17\u0C43\u0C39 \u0C36\u0C3E\u0C02\u0C24\u0C3F, \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30 \u0C35\u0C3F\u0C36\u0C4D\u0C35\u0C3E\u0C38\u0C2A\u0C3E\u0C24\u0C4D\u0C30\u0C24, \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C36\u0C4D\u0C30\u0C47\u0C2F\u0C38\u0C4D\u0C38\u0C41 \u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F.` : rasiDiff === 6 ? `\u0C37\u0C21\u0C3E\u0C37\u0C4D\u0C1F\u0C15 \u0C26\u0C4B\u0C37\u0C02 (6-8 \u0C26\u0C42\u0C30\u0C02). \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C06\u0C15\u0C38\u0C4D\u0C2E\u0C3F\u0C15 \u0C05\u0C2D\u0C3F\u0C2A\u0C4D\u0C30\u0C3E\u0C2F \u0C2D\u0C47\u0C26\u0C3E\u0C32\u0C41 \u0C38\u0C02\u0C2D\u0C35\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41; \u0C36\u0C28\u0C3F \u0C1C\u0C2A\u0C3E\u0C32\u0C41 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C2A\u0C21\u0C24\u0C3E\u0C2F\u0C3F.` : `\u0C30\u0C3E\u0C36\u0C3F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C05\u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C24\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F (\u0C26\u0C42\u0C30\u0C02: ${rasiDiff}). \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C15\u0C37\u0C4D\u0C1F\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C28\u0C3F\u0C30\u0C02\u0C24\u0C30 \u0C06\u0C02\u0C26\u0C4B\u0C33\u0C28\u0C32 \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C15\u0C48 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F \u0C38\u0C32\u0C39\u0C3E \u0C05\u0C35\u0C38\u0C30\u0C02.`;
    } else if (lang === "hi") {
      bhakootDesc = bhakootScore === 7 ? `\u0909\u0924\u094D\u0924\u092E \u092D\u0915\u0942\u091F \u092E\u093F\u0932\u093E\u0928 (\u0905\u0928\u0941\u0915\u0942\u0932 \u0926\u0942\u0930\u0940)\u0964 \u092D\u0915\u0942\u091F \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F \u0917\u0943\u0939 \u0936\u093E\u0902\u0924\u093F, \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0935\u0943\u0926\u094D\u0927\u093F \u0914\u0930 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u094D\u0925\u093F\u0930\u0924\u093E \u0932\u093E\u0924\u093E \u0939\u0948\u0964` : rasiDiff === 6 ? `\u0937\u0921\u093E\u0937\u094D\u091F\u0915 \u0926\u094B\u0937 (6-8 \u0926\u0942\u0930\u0940)\u0964 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0938\u0902\u092C\u0902\u0927\u0940 \u0905\u0938\u094D\u0935\u0938\u094D\u0925\u0924\u093E \u0915\u0940 \u091A\u0947\u0924\u093E\u0935\u0928\u0940 \u0914\u0930 \u0905\u092A\u094D\u0930\u0924\u094D\u092F\u093E\u0936\u093F\u0924 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0905\u0938\u0939\u092F\u094B\u0917 \u0915\u0940 \u0938\u0902\u092D\u093E\u0935\u0928\u093E; \u0935\u093F\u0936\u0947\u0937 \u0938\u093E\u0935\u0927\u093E\u0928\u0940 \u0915\u0940 \u0938\u0932\u093E\u0939\u0964` : `\u092D\u0915\u0942\u091F \u0926\u094B\u0937 (\u0905\u0936\u0941\u092D \u0926\u0942\u0930\u0940: ${rasiDiff})\u0964 \u0916\u0930\u094D\u091A\u094B\u0902 \u092E\u0947\u0902 \u0935\u0943\u0926\u094D\u0927\u093F \u0914\u0930 \u0938\u0918\u0928 \u0938\u0902\u0915\u0947\u0924\u0964 \u092E\u0939\u093E\u092E\u0943\u0924\u094D\u092F\u0941\u0902\u091C\u092F \u092E\u0902\u0924\u094D\u0930 \u0938\u0939\u093E\u092F\u0915 \u0938\u093F\u0926\u094D\u0927 \u0939\u094B\u0917\u093E\u0964`;
    } else if (lang === "ta") {
      bhakootDesc = bhakootScore === 7 ? `\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BAA\u0B95\u0BCD\u0BB7 \u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BC1 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (\u0B87\u0BB0\u0BBE\u0B9A\u0BBF\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BC8\u0BAF\u0BC7 \u0BA8\u0BB2\u0BCD\u0BB2 \u0B87\u0B9F\u0BC8\u0BB5\u0BC6\u0BB3\u0BBF: ${rasiDiff}). \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0BAE\u0B95\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BBE\u0BA4\u0BBE\u0BB0 \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BC1\u0BAE\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD.` : rasiDiff === 6 ? `\u0BB7\u0B9F\u0BBE\u0BB7\u0BCD\u0B9F\u0B95 \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (6-8 \u0B87\u0B9F\u0BC8\u0BB5\u0BC6\u0BB3\u0BBF). \u0BA4\u0BC7\u0BB5\u0BC8\u0BAF\u0BB1\u0BCD\u0BB1 \u0B85\u0BB2\u0BC8\u0B9A\u0BCD\u0B9A\u0BB2\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BBF\u0B9F\u0BC0\u0BB0\u0BCD \u0B95\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BC7\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1 \u0B89\u0BA3\u0BCD\u0B9F\u0BBE\u0B95\u0BB2\u0BBE\u0BAE\u0BCD; \u0B8E\u0BB3\u0BBF\u0BAF \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1\u0B95\u0BB3\u0BCD \u0BA8\u0BB2\u0BAE\u0BCD \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD.` : `\u0BB0\u0BBE\u0B9A\u0BBF \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0BAA\u0BB2\u0BB5\u0BC0\u0BA9\u0BAE\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (\u0B87\u0B9F\u0BC8\u0BB5\u0BC6\u0BB3\u0BBF: ${rasiDiff}). \u0B87\u0BA4\u0BA9\u0BBE\u0BB2\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BBE\u0BA4\u0BBE\u0BB0\u0BA4\u0BCD \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAE\u0BA9 \u0B89\u0BB3\u0BC8\u0B9A\u0BCD\u0B9A\u0BB2\u0BCD\u0B95\u0BB3\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F \u0BB5\u0BBE\u0BAF\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.`;
    } else if (lang === "kn") {
      bhakootDesc = bhakootScore === 7 ? `\u0C85\u0CA4\u0CCD\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CAE \u0CB0\u0CBE\u0CB6\u0CBF \u0CAE\u0CC8\u0CA4\u0CCD\u0CB0\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (\u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2 \u0C85\u0C82\u0CA4\u0CB0: ${rasiDiff}). \u0CA6\u0CBE\u0C82\u0CAA\u0CA4\u0CCD\u0CAF \u0CB6\u0CBE\u0C82\u0CA4\u0CBF, \u0CA6\u0CBE\u0C82\u0CAA\u0CA4\u0CCD\u0CAF \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CC1 \u0CB9\u0CBE\u0C97\u0CC2 \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB8\u0CC1 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CA6\u0CC6.` : rasiDiff === 6 ? "\u0CAA\u0CCD\u0CB0\u0CA4\u0CBF\u0C95\u0CC2\u0CB2 \u0CAA\u0CB0\u0CBF\u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF \u0CB0\u0CB9\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6" : `\u0CB0\u0CBE\u0CB6\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C95\u0CCA\u0CB0\u0CA4\u0CC6\u0CAF\u0CBF\u0CA6\u0CC6 (\u0C85\u0CB6\u0CC1\u0CAD \u0C85\u0C82\u0CA4\u0CB0: ${rasiDiff}). \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CA8\u0CB7\u0CCD\u0C9F \u0C85\u0CA5\u0CB5\u0CBE \u0CA6\u0CBE\u0C82\u0CAA\u0CA4\u0CCD\u0CAF \u0C9C\u0CC0\u0CB5\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF \u0C95\u0CCA\u0CB0\u0CA4\u0CC6 \u0C95\u0CBE\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.`;
    } else {
      bhakootDesc = bhakootScore === 7 ? `Auspicious Bhakoot connection (Auspicious placement of Moon signs). Promotes emotional harmony, domestic stability, and shared prosperity.` : rasiDiff === 6 ? `Shadashtaka placement (6th & 8th rasi conflict). Prompts high emotional volatility and physical fatigue; astrology guidance suggested.` : `Bhakoot variance (Inauspicious relative distance: ${rasiDiff}). Indicates severe financial leakages or heavy domestic expansion stress.`;
    }
    ashtaKoota.push({
      koota: "Bhakoot",
      localizedKoota: translateKoota("Bhakoot", lang),
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      description: bhakootDesc
    });
    const bNadiIdx = NAKSHATRA_NADIS[bNak];
    const gNadiIdx = NAKSHATRA_NADIS[gNak];
    let nadiScore = 8;
    if (bNadiIdx === gNadiIdx) {
      nadiScore = 0;
    }
    let nadiDesc = "";
    if (lang === "te") {
      nadiDesc = nadiScore === 8 ? `\u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C2E\u0C48\u0C28 \u0C28\u0C3E\u0C21\u0C40 \u0C2A\u0C4A\u0C02\u0C24\u0C28 (\u0C05\u0C2C\u0C4D\u0C2C\u0C3E\u0C2F\u0C3F: ${NADI_NAMES.te[bNadiIdx]} - \u0C05\u0C2E\u0C4D\u0C2E\u0C3E\u0C2F\u0C3F: ${NADI_NAMES.te[gNadiIdx]}). \u0C1C\u0C28\u0C4D\u0C2F\u0C41\u0C2A\u0C30\u0C2E\u0C48\u0C28 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C24, \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C15\u0C30\u0C2E\u0C48\u0C28 \u0C38\u0C02\u0C24\u0C3E\u0C28\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C26\u0C40\u0C30\u0C4D\u0C18\u0C3E\u0C2F\u0C41\u0C35\u0C41 \u0C15\u0C32\u0C41\u0C17\u0C41\u0C24\u0C3E\u0C2F\u0C3F.` : `\u0C28\u0C3E\u0C21\u0C40 \u0C26\u0C4B\u0C37\u0C02 \u0C15\u0C4D\u0C30\u0C3F\u0C2F\u0C3E\u0C36\u0C40\u0C32\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F (\u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F\u0C15\u0C40: ${NADI_NAMES.te[bNadiIdx]} \u0C28\u0C3E\u0C21\u0C3F). \u0C1C\u0C28\u0C4D\u0C2F\u0C41 \u0C2A\u0C4B\u0C32\u0C3E\u0C30\u0C3F\u0C1F\u0C40 \u0C12\u0C15\u0C47 \u0C35\u0C3F\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C38\u0C02\u0C24\u0C3E\u0C28\u0C02 \u0C2A\u0C4A\u0C02\u0C26\u0C21\u0C02\u0C32\u0C4B \u0C1C\u0C3E\u0C2A\u0C4D\u0C2F\u0C3E\u0C32\u0C41 \u0C1C\u0C30\u0C17\u0C35\u0C1A\u0C4D\u0C1A\u0C41; \u0C2E\u0C39\u0C3E \u0C2E\u0C43\u0C24\u0C4D\u0C2F\u0C41\u0C02\u0C1C\u0C2F \u0C1C\u0C2A\u0C02 \u0C36\u0C4D\u0C30\u0C47\u0C37\u0C4D\u0C1F\u0C02.`;
    } else if (lang === "hi") {
      nadiDesc = nadiScore === 8 ? `\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u0928\u093E\u0921\u093C\u0940 \u092E\u093F\u0932\u093E\u0928 (\u0935\u0930: ${NADI_NAMES.hi[bNadiIdx]} - \u0935\u0927\u0942: ${NADI_NAMES.hi[gNadiIdx]})\u0964 \u0909\u0924\u094D\u0924\u092E \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u0906\u0928\u0941\u0935\u0902\u0936\u093F\u0915 \u0905\u0928\u0941\u0915\u0942\u0932\u0924\u093E \u0914\u0930 \u0926\u0940\u0930\u094D\u0918\u093E\u092F\u0941 \u0938\u0902\u0924\u093E\u0928 \u0915\u093E \u0906\u0936\u0940\u0930\u094D\u0935\u093E\u0926\u0964` : `\u0928\u093E\u0921\u093C\u0940 \u0926\u094B\u0937 \u0938\u0915\u094D\u0930\u093F\u092F (\u0926\u094B\u0928\u094B\u0902 \u0915\u0940 \u0928\u093E\u0921\u093C\u0940 ${NADI_NAMES.hi[bNadiIdx]} \u0939\u0948)\u0964 \u0938\u0902\u0924\u093E\u0928 \u0909\u0924\u094D\u092A\u0924\u094D\u0924\u093F \u092E\u0947\u0902 \u092C\u093E\u0927\u093E \u0905\u0925\u0935\u093E \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0905\u0938\u094D\u0935\u0938\u094D\u0925\u0924\u093E \u0915\u0940 \u091A\u0947\u0924\u093E\u0935\u0928\u0940; \u0936\u093F\u0935 \u0906\u0930\u093E\u0927\u0928\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964`;
    } else if (lang === "ta") {
      nadiDesc = nadiScore === 8 ? `\u0B85\u0BB1\u0BCD\u0BAA\u0BC1\u0BA4\u0BAE\u0BBE\u0BA9 \u0BA8\u0BBE\u0B9F\u0BBF\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD (\u0BAE\u0BA3\u0BAE\u0B95\u0BA9\u0BCD: ${NADI_NAMES.ta[bNadiIdx]} - \u0BAE\u0BA3\u0BAE\u0B95\u0BB3\u0BCD: ${NADI_NAMES.ta[gNadiIdx]}). \u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0B89\u0BAF\u0BBF\u0BB0\u0BBF\u0BAF\u0BB2\u0BCD \u0B9A\u0BAE\u0BA8\u0BBF\u0BB2\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2 \u0B9A\u0BA8\u0BCD\u0BA4\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC7\u0BB1\u0BC1 \u0B89\u0BA3\u0BCD\u0B9F\u0BBE\u0B95\u0BC1\u0BAE\u0BCD.` : `\u0BA8\u0BBE\u0B9F\u0BBF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD ${NADI_NAMES.ta[bNadiIdx]} \u0BA8\u0BBE\u0B9F\u0BBF). \u0B87\u0BA4\u0BA9\u0BBE\u0BB2\u0BCD \u0BAE\u0B95\u0BAA\u0BCD\u0BAA\u0BC7\u0BB1\u0BC1 \u0BA4\u0BB3\u0BCD\u0BB3\u0BBF\u0BAA\u0BCD\u0BAA\u0BCB\u0B95\u0BB2\u0BBE\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B89\u0B9F\u0BB2\u0BCD\u0BA8\u0BB2\u0BAA\u0BCD \u0BAA\u0BBE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BB0\u0BB2\u0BBE\u0BAE\u0BCD; \u0B9A\u0BBF\u0BB5 \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1 \u0BA8\u0BB2\u0BAE\u0BCD \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD.`;
    } else if (lang === "kn") {
      nadiDesc = nadiScore === 8 ? `\u0C85\u0CA6\u0CCD\u0CAD\u0CC1\u0CA4 \u0CA8\u0CBE\u0CA1\u0CBF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 (\u0CB5\u0CB0: ${NADI_NAMES.kn[bNadiIdx]} - \u0CB5\u0CA7\u0CC1: ${NADI_NAMES.kn[gNadiIdx]}). \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0C86\u0CB0\u0CCB\u0C97\u0CCD\u0CAF, \u0CA4\u0CB3\u0CC0\u0CAF \u0CB8\u0CAE\u0CBE\u0CA8\u0CA4\u0CC6 \u0CB9\u0CBE\u0C97\u0CC2 \u0CA6\u0CC0\u0CB0\u0CCD\u0C98\u0CBE\u0CAF\u0CC1\u0CB7\u0CCD\u0CAF\u0CA6 \u0CAD\u0CB0\u0CB5\u0CB8\u0CC6 \u0CB8\u0CBF\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.` : `\u0CA8\u0CBE\u0CA1\u0CBF \u0CA6\u0CCB\u0CB7 \u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 (\u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0CA8\u0CBE\u0CA1\u0CBF\u0CAF\u0CC2 ${NADI_NAMES.kn[bNadiIdx]} \u0C86\u0C97\u0CBF\u0CA6\u0CC6). \u0CB8\u0C82\u0CA4\u0CA4\u0CBF \u0CAA\u0CCD\u0CB0\u0CBE\u0CAA\u0CCD\u0CA4\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CB5\u0CBF\u0CB3\u0C82\u0CAC \u0C85\u0CA5\u0CB5\u0CBE \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0CA4\u0CB3\u0CAE\u0CB3 \u0C89\u0C82\u0C9F\u0CC1\u0CAE\u0CBE\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1; \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0CAA\u0CC2\u0C9C\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6.`;
    } else {
      nadiDesc = nadiScore === 8 ? `Superlative Nadi matching (Groom: ${NADI_NAMES.en[bNadiIdx]} and Bride: ${NADI_NAMES.en[gNadiIdx]}). Traditionally considered favorable for health and progeny.` : `Critical Nadi Dosha Active (Both possess ${NADI_NAMES.en[bNadiIdx]} Nadi). Indicates identical genetic polarities. Highly recommended to perform Nadi peace rituals to avoid progeny delay or chronic health issues.`;
    }
    ashtaKoota.push({
      koota: "Nadi",
      localizedKoota: translateKoota("Nadi", lang),
      maxPoints: 8,
      obtainedPoints: nadiScore,
      description: nadiDesc
    });
    const totalMax = ashtaKoota.reduce((acc, current) => acc + current.maxPoints, 0);
    const totalObtained = ashtaKoota.reduce((acc, current) => acc + current.obtainedPoints, 0);
    const percentage = Math.round(totalObtained / totalMax * 100);
    const RAJJU_GROUPS = [
      1,
      2,
      3,
      4,
      5,
      4,
      3,
      2,
      1,
      // Ashwini..Ashlesha
      1,
      2,
      3,
      4,
      5,
      4,
      3,
      2,
      1,
      // Makha..Jyeshtha
      1,
      2,
      3,
      4,
      5,
      4,
      3,
      2,
      1
      // Moola..Revati
    ];
    const bRajju = RAJJU_GROUPS[bNak];
    const gRajju = RAJJU_GROUPS[gNak];
    const VEDHA_PAIRS = [
      [0, 17],
      [1, 16],
      [2, 15],
      [3, 14],
      [4, 23],
      [5, 22],
      [6, 21],
      [7, 20],
      [8, 19],
      [9, 18],
      [10, 26],
      [11, 25],
      [12, 24],
      [13, 13]
      // Chitra has no Vedha pair
    ];
    const hasVedha = VEDHA_PAIRS.some(
      ([a, b]) => bNak === a && gNak === b || bNak === b && gNak === a
    );
    const mahendraDist = (gNak - bNak + 27) % 27 + 1;
    const isMahendraOk = [4, 7, 10, 13, 16, 19, 22, 25].includes(mahendraDist);
    const loc = LocalizationEngine.getInstance();
    const southIndianPorutham = [
      { name: loc.get("PORUTHAM.DINA", "en"), localizedName: loc.get("PORUTHAM.DINA", lang), status: taraScore >= 1.5 ? "Uttama" : "Adhama", localizedStatus: taraScore >= 1.5 ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.ADHAMA", lang), description: loc.get("PORUTHAM_DESC.DINA", lang) },
      { name: loc.get("PORUTHAM.GANA", "en"), localizedName: loc.get("PORUTHAM.GANA", lang), status: ganaScore >= 5 ? "Uttama" : "Adhama", localizedStatus: ganaScore >= 5 ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.ADHAMA", lang), description: loc.get("PORUTHAM_DESC.GANA", lang) },
      { name: loc.get("PORUTHAM.MAHENDRA", "en"), localizedName: loc.get("PORUTHAM.MAHENDRA", lang), status: isMahendraOk ? "Uttama" : "Madhyama", localizedStatus: isMahendraOk ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.MADHYAMA", lang), description: loc.get("PORUTHAM_DESC.MAHENDRA", lang) },
      { name: loc.get("PORUTHAM.RAJJU", "en"), localizedName: loc.get("PORUTHAM.RAJJU", lang), status: bRajju !== gRajju ? "Uttama" : "Adhama", localizedStatus: bRajju !== gRajju ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.ADHAMA", lang), description: loc.get("PORUTHAM_DESC.RAJJU", lang) },
      { name: loc.get("PORUTHAM.VEDHA", "en"), localizedName: loc.get("PORUTHAM.VEDHA", lang), status: !hasVedha ? "Uttama" : "Adhama", localizedStatus: !hasVedha ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.ADHAMA", lang), description: loc.get("PORUTHAM_DESC.VEDHA", lang) },
      { name: loc.get("PORUTHAM.YONI", "en"), localizedName: loc.get("PORUTHAM.YONI", lang), status: yoniScore >= 2 ? "Uttama" : "Madhyama", localizedStatus: yoniScore >= 2 ? loc.get("STATUS.UTTAMA", lang) : loc.get("STATUS.MADHYAMA", lang), description: loc.get("PORUTHAM_DESC.YONI", lang) }
    ];
    const bJd = getJulianDate(boyInput.year, boyInput.month, boyInput.day, boyInput.hour, boyInput.minute, boyInput.timezone || 0);
    const bAyanamsa = getAyanamsa(bJd, boyInput.ayanamsa || "Lahiri");
    const bLagnaLong = getLagnaSidereal(bJd, boyInput.latitude, boyInput.longitude, bAyanamsa);
    const boyDoshas = _AstrologyService.detectDoshas(boyPanchang.planets, bLagnaLong, lang);
    const gJd = getJulianDate(girlInput.year, girlInput.month, girlInput.day, girlInput.hour, girlInput.minute, girlInput.timezone || 0);
    const gAyanamsa = getAyanamsa(gJd, girlInput.ayanamsa || "Lahiri");
    const gLagnaLong = getLagnaSidereal(gJd, girlInput.latitude, girlInput.longitude, gAyanamsa);
    const girlDoshas = _AstrologyService.detectDoshas(girlPanchang.planets, gLagnaLong, lang);
    const bManglik = boyDoshas.find((d) => d.hasDosha && d.name.includes("Manglik"))?.hasDosha || false;
    const gManglik = girlDoshas.find((d) => d.hasDosha && d.name.includes("Manglik"))?.hasDosha || false;
    const getScoreStr = (score) => {
      const loc2 = LocalizationEngine.getInstance();
      if (score >= 4.5) return loc2.get("STATUS.EXCELLENT", lang);
      if (score >= 3.5) return loc2.get("STATUS.GOOD", lang);
      if (score >= 2.5) return loc2.get("STATUS.FAVORABLE", lang);
      if (score >= 1.5) return loc2.get("STATUS.AVERAGE", lang);
      return loc2.get("STATUS.POOR", lang);
    };
    let hasManglikDoshaConflict = false;
    let isCancelled = false;
    if (bManglik && !gManglik) hasManglikDoshaConflict = true;
    if (!bManglik && gManglik) hasManglikDoshaConflict = true;
    if (bManglik && gManglik) {
      isCancelled = true;
    }
    const childrenScoreObj = {
      rating: nadiScore > 0 ? getScoreStr(4.5) : getScoreStr(1),
      description: nadiScore > 0 ? lang === "te" ? "\u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C02" : lang === "hi" ? "\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F" : lang === "ta" ? "\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4" : lang === "kn" ? "\u0C85\u0CA6\u0CCD\u0CAD\u0CC1\u0CA4" : "Excellent for family life." : lang === "te" ? "\u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C05\u0C35\u0C38\u0C30\u0C02" : lang === "hi" ? "\u0909\u092A\u091A\u093E\u0930 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948" : lang === "ta" ? "\u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8" : lang === "kn" ? "\u0CA6\u0CCB\u0CB7 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0 \u0C85\u0C97\u0CA4\u0CCD\u0CAF" : "Requires astrological remedies.",
      traditionalMeaning: nadiScore > 0 ? "Garbha Dharana Shubha" : "Eka Nadi Dosha",
      confidence: 0.95
    };
    const healthScoreObj = {
      rating: yoniScore >= 2 ? getScoreStr(4.5) : getScoreStr(2.5),
      description: yoniScore >= 2 ? lang === "te" ? "\u0C2E\u0C02\u0C1A\u0C3F \u0C36\u0C3E\u0C30\u0C40\u0C30\u0C15 \u0C2A\u0C4A\u0C02\u0C24\u0C28" : lang === "hi" ? "\u0905\u091A\u094D\u091B\u093E \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u092E\u093F\u0932\u093E\u0928" : lang === "ta" ? "\u0BA8\u0BB2\u0BCD\u0BB2 \u0B9A\u0BB0\u0BC0\u0BB0 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD" : lang === "kn" ? "\u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6" : "Good physical match and overall harmony." : lang === "te" ? "\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23 \u0C38\u0C2E\u0C28\u0C4D\u0C35\u0C2F\u0C02" : lang === "hi" ? "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0938\u092E\u0928\u094D\u0935\u092F" : lang === "ta" ? "\u0B9A\u0BBE\u0BA4\u0BBE\u0BB0\u0BA3 \u0B89\u0B9F\u0BB2\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1" : lang === "kn" ? "\u0CB8\u0CBE\u0CA7\u0CBE\u0CB0\u0CA3 \u0CA6\u0CC8\u0CB9\u0CBF\u0C95 \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF" : "Moderate physical harmony.",
      confidence: 0.9
    };
    const financeScoreObj = {
      rating: bhakootScore > 0 ? getScoreStr(4.5) : getScoreStr(1),
      description: bhakootScore > 0 ? lang === "te" ? "\u0C38\u0C4D\u0C25\u0C3F\u0C30\u0C2E\u0C48\u0C28 \u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C35\u0C43\u0C26\u0C4D\u0C27\u0C3F" : lang === "hi" ? "\u0938\u094D\u0925\u093F\u0930 \u0906\u0930\u094D\u0925\u093F\u0915 \u0935\u093F\u0915\u093E\u0938" : lang === "ta" ? "\u0BA8\u0BBF\u0BB2\u0BC8\u0BAF\u0BBE\u0BA9 \u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BBE\u0BA4\u0BBE\u0BB0 \u0BB5\u0BB3\u0BB0\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF" : lang === "kn" ? "\u0CB8\u0CCD\u0CA5\u0CBF\u0CB0 \u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0CAA\u0CCD\u0CB0\u0C97\u0CA4\u0CBF" : "Indicates generally favorable financial cooperation." : lang === "te" ? "\u0C06\u0C30\u0C4D\u0C25\u0C3F\u0C15 \u0C05\u0C21\u0C4D\u0C21\u0C02\u0C15\u0C41\u0C32\u0C41 \u0C38\u0C42\u0C1A\u0C3F\u0C24\u0C2E\u0C48\u0C28\u0C35\u0C3F" : lang === "hi" ? "\u0906\u0930\u094D\u0925\u093F\u0915 \u092C\u093E\u0927\u093E\u090F\u0902 \u0938\u0942\u091A\u093F\u0924" : lang === "ta" ? "\u0BAA\u0BCA\u0BB0\u0BC1\u0BB3\u0BBE\u0BA4\u0BBE\u0BB0 \u0BA4\u0B9F\u0BC8\u0B95\u0BB3\u0BCD \u0B9A\u0BC2\u0B9A\u0BBF\u0BA4\u0BAE\u0BCD" : lang === "kn" ? "\u0C86\u0CB0\u0CCD\u0CA5\u0CBF\u0C95 \u0C85\u0CA1\u0CC6\u0CA4\u0CA1\u0CC6\u0C97\u0CB3 \u0CB8\u0CC2\u0C9A\u0CA8\u0CC6" : "Financial obstacles indicated (Bhakoot variance).",
      confidence: 0.85
    };
    const longevityScoreObj = {
      rating: taraScore >= 2 ? getScoreStr(4) : getScoreStr(3),
      description: taraScore >= 2 ? lang === "te" ? "\u0C26\u0C40\u0C30\u0C4D\u0C18\u0C3E\u0C2F\u0C41\u0C37\u0C4D\u0C37\u0C41 \u0C15\u0C32\u0C2F\u0C3F\u0C15" : lang === "hi" ? "\u0926\u0940\u0930\u094D\u0918\u093E\u092F\u0941 \u091C\u0940\u0935\u0928 \u092E\u093F\u0932\u093E\u0928" : lang === "ta" ? "\u0BA4\u0BC0\u0BB0\u0BCD\u0B95\u0BCD\u0B95 \u0B9A\u0BC1\u0BAE\u0B99\u0BCD\u0B95\u0BB2\u0BBF \u0BAF\u0BCB\u0B95\u0BAE\u0BCD" : lang === "kn" ? "\u0CA6\u0CC0\u0CB0\u0CCD\u0C98\u0CBE\u0CAF\u0CC1\u0CB7\u0CCD\u0CAF \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6" : "Favorable longevity match." : lang === "te" ? "\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23 \u0C06\u0C2F\u0C41\u0C30\u0C4D\u0C26\u0C3E\u0C2F \u0C38\u0C42\u0C1A\u0C3F\u0C15" : lang === "hi" ? "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0926\u0940\u0930\u094D\u0918\u093E\u092F\u0941 \u0938\u0942\u091A\u0915\u093E\u0902\u0915" : lang === "ta" ? "\u0B9A\u0BBE\u0BA4\u0BBE\u0BB0\u0BA3 \u0B86\u0BAF\u0BC1\u0B9F\u0BCD\u0B95\u0BBE\u0BB2\u0BAE\u0BCD" : lang === "kn" ? "\u0CB8\u0CBE\u0CA7\u0CBE\u0CB0\u0CA3 \u0C86\u0CAF\u0CC1\u0CB7\u0CCD\u0CAF \u0CB8\u0CC2\u0C9A\u0CA8\u0CC6" : "Standard longevity index.",
      confidence: 0.8
    };
    const cancellationDetailsStr = isCancelled ? lang === "te" ? "\u0C05\u0C2C\u0C4D\u0C2C\u0C3E\u0C2F\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C2E\u0C4D\u0C2E\u0C3E\u0C2F\u0C3F \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F\u0C15\u0C40 \u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37\u0C02 \u0C09\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28, \u0C07\u0C26\u0C3F \u0C38\u0C39\u0C1C\u0C02\u0C17\u0C3E \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0932\u0921\u093C\u0915\u093E \u0914\u0930 \u0932\u0921\u093C\u0915\u0940 \u0926\u094B\u0928\u094B\u0902 \u0915\u094B \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u0939\u094B\u0928\u0947 \u0915\u0947 \u0915\u093E\u0930\u0923 \u0938\u094D\u0935\u093E\u092D\u093E\u0935\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0928\u093F\u0930\u0938\u094D\u0924 \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948\u0964" : lang === "ta" ? "\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD, \u0BA4\u0BCB\u0BB7 \u0BA8\u0BBF\u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : lang === "kn" ? "\u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CBF\u0C97\u0CC2 \u0CAE\u0C82\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7\u0CB5\u0CBF\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0CB8\u0CCD\u0CB5\u0CBE\u0CAD\u0CBE\u0CB5\u0CBF\u0C95\u0CB5\u0CBE\u0C97\u0CBF \u0CA6\u0CCB\u0CB7 \u0CA8\u0CBF\u0CB5\u0CBE\u0CB0\u0CA3\u0CC6\u0CAF\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6." : "Both boy and girl have Kuja/Manglik Dosha, leading to natural mathematical cancellation." : void 0;
    const getPaapaSamyamPoints = (panchang) => {
      if (!panchang || !panchang.planets) return 0;
      const malefics = ["sun", "mars", "saturn", "rahu", "ketu"];
      const moon = panchang.planets.find((p) => p && p.id === "moon");
      const venus = panchang.planets.find((p) => p && p.id === "venus");
      const moonRasi = moon ? moon.rasiIndex : 0;
      const venusRasi = venus ? venus.rasiIndex : 0;
      let points = 0;
      panchang.planets.forEach((p) => {
        if (p && malefics.includes(p.id)) {
          if ([1, 2, 4, 7, 8, 12].includes(p.house)) {
            points += 1;
          }
          const hMoon = (p.rasiIndex - moonRasi + 12) % 12 + 1;
          if ([1, 2, 4, 7, 8, 12].includes(hMoon)) {
            points += 1;
          }
          const hVenus = (p.rasiIndex - venusRasi + 12) % 12 + 1;
          if ([1, 2, 4, 7, 8, 12].includes(hVenus)) {
            points += 1;
          }
        }
      });
      return points;
    };
    const boyPaapaPoints = getPaapaSamyamPoints(boyPanchang);
    const girlPaapaPoints = getPaapaSamyamPoints(girlPanchang);
    const paapaDiff = Math.abs(boyPaapaPoints - girlPaapaPoints);
    const mandatoryFailures = [];
    const warnings = [];
    const rajjuElem = southIndianPorutham.find((p) => p.name === "Rajju Porutham");
    if (rajjuElem && (rajjuElem.status === "Adhama" || rajjuElem.status === "Madhyama")) {
      mandatoryFailures.push(REC_TERMS[lang].rajjuPorutham);
    }
    const mahendraElem = southIndianPorutham.find((p) => p.name === "Mahendra Porutham");
    if (mahendraElem && mahendraElem.status === "Adhama") {
      mandatoryFailures.push(mahendraElem.localizedName);
    }
    const vedhaElem = southIndianPorutham.find((p) => p.name === "Vedha Porutham");
    if (vedhaElem && (vedhaElem.status === "Adhama" || vedhaElem.status === "Madhyama")) {
      mandatoryFailures.push(vedhaElem.localizedName);
    }
    const hasCriticalIssues = mandatoryFailures.length > 0 || hasManglikDoshaConflict && !isCancelled;
    let recStatus = "Compatible";
    const recReasons = [];
    if (mandatoryFailures.length > 0) {
      recReasons.push(REC_TERMS[lang].failures.replace("{0}", mandatoryFailures.join(", ")));
    }
    if (hasManglikDoshaConflict && !isCancelled) {
      warnings.push(REC_TERMS[lang].manglikMismatch);
    }
    if (totalObtained < 18) {
      recStatus = "NotRecommended";
      if (recReasons.length === 0) recReasons.push(REC_TERMS[lang].lowScore);
    } else if (hasCriticalIssues) {
      recStatus = "CompatibleWithCaution";
    }
    let enReport = `Vedic Jathakam matching has been completed. The couple obtained ${totalObtained} out of 36 points (${percentage}%) in Ashta Koota matching.`;
    enReport += `

Dosha Analysis: ${hasManglikDoshaConflict && !isCancelled ? "Manglik Dosha conflict is present and active." : "No major active Dosha conflicts were found."}`;
    enReport += `
Paapa Samyam: The malefic point difference between the Groom (${boyPaapaPoints}) and Bride (${girlPaapaPoints}) is ${paapaDiff}, which is considered ${paapaDiff <= 2 ? "acceptable" : "high"}.`;
    enReport += `
Thematic Compatibility: Health is rated as ${healthScoreObj.rating}, Finance as ${financeScoreObj.rating}, and Longevity is ${longevityScoreObj.rating}.`;
    if (recStatus === "CompatibleWithCaution") {
      enReport += `

Overall recommendation: Recommended with Caution. ${recReasons.join(" and ")} were flagged. A complete horoscope review by an astrologer is advised.`;
    } else if (recStatus === "NotRecommended") {
      enReport += `

Overall recommendation: Not Recommended. Requires careful remediation and astrologer consulting due to low matching points and/or severe dosha mismatches.`;
    } else {
      enReport += `

Overall recommendation: Marriage is highly compatible and recommended.`;
    }
    const reportStr = lang === "te" ? `\u0C35\u0C47\u0C26 \u0C15\u0C41\u0C02\u0C21\u0C32\u0C3F \u0C2E\u0C4D\u0C2F\u0C3E\u0C1A\u0C3F\u0C02\u0C17\u0C4D \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F. 36 \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u200C\u0C32\u0C15\u0C41 \u0C17\u0C3E\u0C28\u0C41 ${totalObtained} \u0C2A\u0C4A\u0C02\u0C26\u0C3E\u0C30\u0C41. \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2A\u0C4A\u0C02\u0C24\u0C28 \u0C36\u0C3E\u0C24\u0C02 ${percentage}%. ${recStatus === "CompatibleWithCaution" ? "\u0C1C\u0C3E\u0C17\u0C4D\u0C30\u0C24\u0C4D\u0C24\u0C24\u0C4B \u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C1C\u0C3E\u0C24\u0C15 \u0C2A\u0C30\u0C3F\u0C36\u0C40\u0C32\u0C28 \u0C05\u0C35\u0C38\u0C30\u0C02." : recStatus === "Compatible" ? "\u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C2E\u0C48\u0C28\u0C26\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F." : "\u0C24\u0C15\u0C4D\u0C15\u0C41\u0C35 \u0C2E\u0C4D\u0C2F\u0C3E\u0C1A\u0C3F\u0C02\u0C17\u0C4D \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32 \u0C15\u0C3E\u0C30\u0C23\u0C02\u0C17\u0C3E \u0C1C\u0C3E\u0C17\u0C4D\u0C30\u0C24\u0C4D\u0C24\u0C17\u0C3E \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C41\u0C21\u0C3F\u0C28\u0C3F \u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C02\u0C1A\u0C21\u0C02 \u0C05\u0C35\u0C38\u0C30\u0C02."}` : lang === "hi" ? `\u0935\u0948\u0926\u093F\u0915 \u0915\u0941\u0902\u0921\u0932\u0940 \u092E\u093F\u0932\u093E\u0928 \u092A\u0942\u0930\u093E \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964 36 \u092E\u0947\u0902 \u0938\u0947 ${totalObtained} \u0905\u0902\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u0941\u090F\u0964 \u0915\u0941\u0932 \u092E\u093F\u0932\u093E\u0928 \u0926\u0930 ${percentage}% \u0939\u0948\u0964 ${recStatus === "CompatibleWithCaution" ? "\u0938\u093E\u0935\u0927\u093E\u0928\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924\u0964 \u092A\u0942\u0930\u094D\u0923 \u0915\u0941\u0902\u0921\u0932\u0940 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964" : recStatus === "Compatible" ? "\u0935\u093F\u0935\u093E\u0939 \u0905\u0928\u0941\u0915\u0942\u0932 \u0939\u0948 \u0914\u0930 \u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0939\u0948\u0964" : "\u0915\u092E \u092E\u093F\u0932\u093E\u0928 \u0905\u0902\u0915\u094B\u0902 \u0915\u0947 \u0915\u093E\u0930\u0923 \u0938\u093E\u0935\u0927\u093E\u0928\u0940\u092A\u0942\u0930\u094D\u0935\u0915 \u0909\u092A\u091A\u093E\u0930 \u0914\u0930 \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940 \u0938\u0947 \u092A\u0930\u093E\u092E\u0930\u094D\u0936 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964"}` : lang === "ta" ? `\u0BB5\u0BC7\u0BA4 \u0B9C\u0BBE\u0BA4\u0B95 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B95\u0BBE\u0BA3\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. 36\u0B95\u0BCD\u0B95\u0BC1 ${totalObtained} \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD ${percentage}%. ${recStatus === "CompatibleWithCaution" ? "\u0B95\u0BB5\u0BA9\u0BA4\u0BCD\u0BA4\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0BAE\u0BC1\u0BB4\u0BC1\u0BAE\u0BC8\u0BAF\u0BBE\u0BA9 \u0B9C\u0BBE\u0BA4\u0B95 \u0B86\u0BAF\u0BCD\u0BB5\u0BC1 \u0B85\u0BB5\u0B9A\u0BBF\u0BAF\u0BAE\u0BCD." : recStatus === "Compatible" ? "\u0BAE\u0BA3\u0BB5\u0BBE\u0BB4\u0BCD\u0B95\u0BCD\u0B95\u0BC8 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0B95\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1." : "\u0B95\u0BC1\u0BB1\u0BC8\u0BB5\u0BBE\u0BA9 \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD \u0B8E\u0BA9\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD \u0BAE\u0BC1\u0BB1\u0BC8\u0BAF\u0BBE\u0BA9 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9C\u0BCB\u0BA4\u0BBF\u0B9F \u0B86\u0BB2\u0BCB\u0B9A\u0BA9\u0BC8 \u0B85\u0BB5\u0B9A\u0BBF\u0BAF\u0BAE\u0BCD."}` : lang === "kn" ? `\u0CB5\u0CC7\u0CA6 \u0C9C\u0CBE\u0CA4\u0C95 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0CAA\u0CC2\u0CB0\u0CCD\u0CA3\u0C97\u0CCA\u0C82\u0CA1\u0CBF\u0CA6\u0CC6. 36\u0C95\u0CCD\u0C95\u0CC6 ${totalObtained} \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1 \u0CAC\u0C82\u0CA6\u0CBF\u0CB5\u0CC6. \u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0CA6\u0CB0 ${percentage}%. ${recStatus === "CompatibleWithCaution" ? "\u0C8E\u0C9A\u0CCD\u0C9A\u0CB0\u0CBF\u0C95\u0CC6\u0CAF\u0CBF\u0C82\u0CA6 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CB8\u0C82\u0CAA\u0CC2\u0CB0\u0CCD\u0CA3 \u0C9C\u0CBE\u0CA4\u0C95 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CA8\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF." : recStatus === "Compatible" ? "\u0CB5\u0CBF\u0CB5\u0CBE\u0CB9\u0C95\u0CCD\u0C95\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CAF\u0CCB\u0C97\u0CCD\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6." : "\u0C95\u0CA1\u0CBF\u0CAE\u0CC6 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CBF\u0CB0\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C9C\u0CCD\u0CAF\u0CCB\u0CA4\u0CBF\u0CB7\u0CCD\u0CAF\u0CB0 \u0CB8\u0CB2\u0CB9\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6."}` : enReport;
    const mapPlanets = (planets) => {
      const positions = {};
      planets.forEach((p) => {
        positions[p.id] = {
          sign: p.rasi.name.en || "Unknown",
          degree: Number(p.signDegree.toFixed(2)),
          house: p.house
        };
      });
      return positions;
    };
    const bPlanets = mapPlanets(boyPanchang.planets);
    const gPlanets = mapPlanets(girlPanchang.planets);
    const inputHash = "sha256:" + crypto.createHash("sha256").update(JSON.stringify({ boy: boyInput, girl: girlInput })).digest("hex");
    const decisionFactors = [];
    decisionFactors.push({ factor: "Ashta Koota", impact: `+${totalObtained}` });
    mandatoryFailures.forEach((fail) => {
      decisionFactors.push({ factor: fail, impact: "Critical" });
    });
    if (hasManglikDoshaConflict && !isCancelled) {
      decisionFactors.push({ factor: "Manglik Mismatch", impact: "High" });
    }
    return {
      boyInfo: {
        name: boyInput.name,
        birth: boyInput,
        moonSign: bMoonRasiName,
        moonSignLord: bLordName,
        nakshatra: bMoon.nakshatra.name.en || "Unknown",
        nakshatraLord: boyPanchang.nakshatra.lord.name.en || "Unknown",
        pada: bPada,
        varna: bVarna.name,
        vashya: bVashya.name,
        yoni: YONI_NAMES.en[bYoni] || "Unknown",
        gana: G_NAMES.en[bGanaIdx] || "Unknown",
        nadi: NADI_NAMES.en[bNadiIdx] || "Unknown",
        planets: bPlanets,
        panchang: {
          sunrise: boyPanchang.sunrise,
          sunset: boyPanchang.sunset,
          yoga: boyPanchang.yoga.name.en || "Unknown",
          karana: boyPanchang.karana.name.en || "Unknown",
          tithi: boyPanchang.tithi.name.en || "Unknown",
          tatva: "Fire",
          // Placeholder as it's complex to compute
          nameAlphabet: "N/A",
          // Placeholder
          paya: "Silver"
          // Placeholder
        }
      },
      girlInfo: {
        name: girlInput.name,
        birth: girlInput,
        moonSign: gMoonRasiName,
        moonSignLord: gLordName,
        nakshatra: gMoon.nakshatra.name.en || "Unknown",
        nakshatraLord: girlPanchang.nakshatra.lord.name.en || "Unknown",
        pada: gPada,
        varna: gVarna.name,
        vashya: gVashya.name,
        yoni: YONI_NAMES.en[gYoni] || "Unknown",
        gana: G_NAMES.en[gGanaIdx] || "Unknown",
        nadi: NADI_NAMES.en[gNadiIdx] || "Unknown",
        planets: gPlanets,
        panchang: {
          sunrise: girlPanchang.sunrise,
          sunset: girlPanchang.sunset,
          yoga: girlPanchang.yoga.name.en || "Unknown",
          karana: girlPanchang.karana.name.en || "Unknown",
          tithi: girlPanchang.tithi.name.en || "Unknown",
          tatva: "Water",
          // Placeholder
          nameAlphabet: "N/A",
          // Placeholder
          paya: "Gold"
          // Placeholder
        }
      },
      calculation: {
        system: "Vedic",
        ayanamsa: boyInput.ayanamsa || "Lahiri",
        houseSystem: "Whole Sign",
        zodiac: "Sidereal"
      },
      summary: {
        score: totalObtained,
        maxScore: 36,
        percentage,
        recommendation: LocalizationEngine.getInstance().get("RECOMMENDATION." + recStatus.toUpperCase(), lang)
      },
      ashtaKoota,
      southIndianPorutham,
      overallPercentage: percentage,
      marriageScore: totalObtained,
      compatibilityScore: percentage,
      childrenScore: childrenScoreObj,
      healthScore: healthScoreObj,
      financeScore: financeScoreObj,
      longevityScore: longevityScoreObj,
      doshaMatching: {
        boyDoshas: boyDoshas.filter((d) => d.hasDosha).map((d) => d.name),
        girlDoshas: girlDoshas.filter((d) => d.hasDosha).map((d) => d.name),
        hasManglikDoshaConflict,
        isCancelled,
        cancellationDetails: cancellationDetailsStr
      },
      mandatory_failures: mandatoryFailures,
      mandatoryFailures,
      children_score_insight: { value: childrenScoreObj.rating, nature: nadiScore > 0 ? "Good" : "Warning", traditionalMeaning: childrenScoreObj.traditionalMeaning },
      childrenScoreInsight: { value: childrenScoreObj.rating, nature: nadiScore > 0 ? "Good" : "Warning", traditionalMeaning: childrenScoreObj.traditionalMeaning },
      health_score_insight: { value: healthScoreObj.rating, nature: yoniScore >= 2 ? "Good" : "Warning" },
      healthScoreInsight: { value: healthScoreObj.rating, nature: yoniScore >= 2 ? "Good" : "Warning" },
      finance_score_insight: { value: financeScoreObj.rating, nature: bhakootScore > 0 ? "Good" : "Warning" },
      financeScoreInsight: { value: financeScoreObj.rating, nature: bhakootScore > 0 ? "Good" : "Warning" },
      longevity_score_insight: { value: longevityScoreObj.rating, nature: taraScore >= 2 ? "Good" : "Warning" },
      longevityScoreInsight: { value: longevityScoreObj.rating, nature: taraScore >= 2 ? "Good" : "Warning" },
      paapa_samyam: {
        boy_points: boyPaapaPoints,
        girl_points: girlPaapaPoints,
        total_points: paapaDiff,
        description: lang === "te" ? `\u0C05\u0C2C\u0C4D\u0C2C\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2A \u0C38\u0C3E\u0C2E\u0C4D\u0C2F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41: ${boyPaapaPoints}, \u0C05\u0C2E\u0C4D\u0C2E\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2A \u0C38\u0C3E\u0C2E\u0C4D\u0C2F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41: ${girlPaapaPoints}. \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32 \u0C26\u0C4B\u0C37 \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C24 \u0C2C\u0C3E\u0C17\u0C41\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0932\u0921\u093C\u0915\u0947 \u0915\u0947 \u092A\u093E\u092A \u0938\u093E\u092E\u094D\u092F \u0905\u0902\u0915: ${boyPaapaPoints}, \u0932\u0921\u093C\u0915\u0940 \u0915\u0947 \u092A\u093E\u092A \u0938\u093E\u092E\u094D\u092F \u0905\u0902\u0915: ${girlPaapaPoints}\u0964` : lang === "ta" ? `\u0B86\u0BA3\u0BCD \u0BAA\u0BBE\u0BB5 \u0B9A\u0BBE\u0BAE\u0BCD\u0BAF\u0BAE\u0BCD \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD: ${boyPaapaPoints}, \u0BAA\u0BC6\u0BA3\u0BCD \u0BAA\u0BBE\u0BB5 \u0B9A\u0BBE\u0BAE\u0BCD\u0BAF\u0BAE\u0BCD \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD: ${girlPaapaPoints}. \u0B95\u0BBF\u0BB0\u0B95 \u0BA4\u0BCB\u0BB7 \u0B9A\u0BAE\u0BA8\u0BBF\u0BB2\u0BC8 \u0BA8\u0BA9\u0BCD\u0BB1\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.` : lang === "kn" ? `\u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CA8 \u0CAA\u0CBE\u0CAA \u0CB8\u0CBE\u0CAE\u0CCD\u0CAF \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1: ${boyPaapaPoints}, \u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CBF\u0CAF \u0CAA\u0CBE\u0CAA \u0CB8\u0CBE\u0CAE\u0CCD\u0CAF \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1: ${girlPaapaPoints}. \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7 \u0CB8\u0CAE\u0CA4\u0CCB\u0CB2\u0CA8 \u0C9A\u0CC6\u0CA8\u0CCD\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.` : `Boy's Paapa Samyam score is ${boyPaapaPoints}, Girl's is ${girlPaapaPoints}. The malefic point difference is ${paapaDiff}.`
      },
      paapaSamyam: {
        boyPoints: boyPaapaPoints,
        girlPoints: girlPaapaPoints,
        total_points: paapaDiff,
        description: lang === "te" ? `\u0C05\u0C2C\u0C4D\u0C2C\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2A \u0C38\u0C3E\u0C2E\u0C4D\u0C2F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41: ${boyPaapaPoints}, \u0C05\u0C2E\u0C4D\u0C2E\u0C3E\u0C2F\u0C3F \u0C2A\u0C3E\u0C2A \u0C38\u0C3E\u0C2E\u0C4D\u0C2F \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41: ${girlPaapaPoints}. \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32 \u0C26\u0C4B\u0C37 \u0C38\u0C2E\u0C24\u0C41\u0C32\u0C4D\u0C2F\u0C24 \u0C2C\u0C3E\u0C17\u0C41\u0C02\u0C26\u0C3F.` : lang === "hi" ? `\u0932\u0921\u093C\u0915\u0947 \u0915\u0947 \u092A\u093E\u092A \u0938\u093E\u092E\u094D\u092F \u0905\u0902\u0915: ${boyPaapaPoints}, \u0932\u0921\u093C\u0915\u0940 \u0915\u0947 \u092A\u093E\u092A \u0938\u093E\u092E\u094D\u092F \u0905\u0902\u0915: ${girlPaapaPoints}\u0964` : lang === "ta" ? `\u0B86\u0BA3\u0BCD \u0BAA\u0BBE\u0BB5 \u0B9A\u0BBE\u0BAE\u0BCD\u0BAF\u0BAE\u0BCD \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD: ${boyPaapaPoints}, \u0BAA\u0BC6\u0BA3\u0BCD \u0BAA\u0BBE\u0BB5 \u0B9A\u0BBE\u0BAE\u0BCD\u0BAF\u0BAE\u0BCD \u0BAA\u0BC1\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BB3\u0BCD: ${girlPaapaPoints}. \u0B95\u0BBF\u0BB0\u0B95 \u0BA4\u0BCB\u0BB7 \u0B9A\u0BAE\u0BA8\u0BBF\u0BB2\u0BC8 \u0BA8\u0BA9\u0BCD\u0BB1\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.` : lang === "kn" ? `\u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CA8 \u0CAA\u0CBE\u0CAA \u0CB8\u0CBE\u0CAE\u0CCD\u0CAF \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1: ${boyPaapaPoints}, \u0CB9\u0CC1\u0CA1\u0CC1\u0C97\u0CBF\u0CAF \u0CAA\u0CBE\u0CAA \u0CB8\u0CBE\u0CAE\u0CCD\u0CAF \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1: ${girlPaapaPoints}. \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7 \u0CB8\u0CAE\u0CA4\u0CCB\u0CB2\u0CA8 \u0C9A\u0CC6\u0CA8\u0CCD\u0CA8\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.` : `Boy's Paapa Samyam score is ${boyPaapaPoints}, Girl's is ${girlPaapaPoints}. The malefic point difference is ${paapaDiff}.`
      },
      recommendation: {
        status: recStatus,
        confidence: 0.85,
        requiresExpertReview: recStatus !== "Compatible",
        reasons: recReasons
      },
      report: reportStr
    };
  }
  static generateHoroscope(input) {
    const lang = input.lang || "en";
    const panchang = this.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30);
    const RASHI_LORDS = [
      "Mars",
      "Venus",
      "Mercury",
      "Moon",
      "Sun",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Saturn",
      "Jupiter"
    ];
    const SIGN_NAMES = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces"
    ];
    const ascendant = {
      signIndex: lagnaRasi,
      signName: translateRashi(lagnaRasi, lang),
      longitude: lagnaLong,
      signDegree: lagnaLong % 30,
      lord: RASHI_LORDS[lagnaRasi]
    };
    const planetsRecord = {};
    panchang.planets.forEach((p) => {
      planetsRecord[p.id] = p;
      const capName = p.id.charAt(0).toUpperCase() + p.id.slice(1);
      planetsRecord[capName] = p;
    });
    const houses = [];
    for (let i = 0; i < 12; i++) {
      const houseIndex = i + 1;
      const signIndex = (lagnaRasi + i) % 12;
      const occupants = panchang.planets.filter((p) => p.house === houseIndex).map((p) => p.id);
      houses.push({
        index: houseIndex,
        signIndex,
        signName: translateRashi(signIndex, lang),
        lord: RASHI_LORDS[signIndex],
        occupants,
        degree: signIndex * 30
        // Approx cusp start
      });
    }
    const aspects = [];
    const addAspects = (planet, houseAspects) => {
      const p = planetsRecord[planet];
      if (!p) return;
      houseAspects.forEach((aspect) => {
        const targetHouse = (p.house - 1 + aspect - 1) % 12 + 1;
        const targetOccupants = houses.find((h) => h.index === targetHouse)?.occupants || [];
        targetOccupants.forEach((targetPlanet) => {
          if (targetPlanet !== planet) {
            aspects.push({ aspectingPlanet: planet, aspectedPlanet: targetPlanet, type: `${aspect}th House Aspect` });
          }
        });
      });
    };
    ["Sun", "Moon", "Mercury", "Venus"].forEach((p) => addAspects(p, [7]));
    addAspects("Mars", [4, 7, 8]);
    addAspects("Jupiter", [5, 7, 9]);
    addAspects("Saturn", [3, 7, 10]);
    addAspects("Rahu", [5, 7, 9]);
    addAspects("Ketu", [5, 7, 9]);
    const chart = {
      ascendant,
      planets: planetsRecord,
      houses,
      aspects
    };
    const akCandidates = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].map((b) => planetsRecord[b.toLowerCase()]);
    akCandidates.sort((a, b) => (b?.signDegree || 0) - (a?.signDegree || 0));
    const atmakaraka = akCandidates[0]?.id || "";
    const amatyakaraka = akCandidates[1]?.id || "";
    const vimshottariLords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
    const moonNak = planetsRecord["moon"]?.nakshatraIndex || 0;
    const nakshatraLord = vimshottariLords[moonNak % 9];
    const profile = {
      lagna: ascendant.signName,
      moonRasi: translateRashi(planetsRecord["moon"]?.rasiIndex ?? 0, lang),
      sunRasi: translateRashi(planetsRecord["sun"]?.rasiIndex ?? 0, lang),
      nakshatra: translateNakshatra(planetsRecord["moon"]?.nakshatraIndex ?? 0, lang),
      pada: planetsRecord["moon"]?.pada || 1,
      nakshatraLord: translatePlanet(nakshatraLord, lang),
      lagnaLord: translatePlanet(ascendant.lord, lang),
      atmakaraka: translatePlanet(atmakaraka, lang),
      amatyakaraka: translatePlanet(amatyakaraka, lang)
    };
    const allYogas = YogaEngine.detectAllYogas(chart, lang);
    const birthDateISO = new Date(Date.UTC(input.year, input.month - 1, input.day, input.hour, input.minute)).toISOString();
    const targetDateISO = input.targetDate || (/* @__PURE__ */ new Date()).toISOString();
    const dashas = DashaEngine.calculateVimshottari(planetsRecord["moon"]?.longitude || 0, birthDateISO, targetDateISO);
    const detectedYogas = allYogas.filter((y) => y.detected);
    const notDetectedYogas = allYogas.filter((y) => !y.detected).map((y) => y.name);
    const allDoshas = DoshaEngine.detectAllDoshas(chart, lang);
    const detectedDoshas = allDoshas.filter((d) => d.detected);
    const notDetectedDoshas = allDoshas.filter((d) => !d.detected).map((d) => d.name);
    const cancelledDoshas = detectedDoshas.filter((d) => d.cancellation);
    const interpretation = InterpretationEngine.generateInterpretation(chart, detectedYogas, lang);
    return {
      overview: {
        apiVersion: "1.0",
        calculatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        system: "Vedic",
        ayanamsa: input.ayanamsa || "Lahiri",
        houseSystem: "Whole Sign",
        zodiac: "Sidereal",
        engineVersion: "4.0.0"
      },
      profile,
      panchang,
      chart,
      yogas: {
        summary: {
          checked: allYogas.length,
          detectedCount: detectedYogas.length
        },
        detected: detectedYogas,
        notDetected: notDetectedYogas
      },
      doshas: {
        summary: {
          checked: allDoshas.length,
          detectedCount: detectedDoshas.length,
          cancelledCount: cancelledDoshas.length
        },
        detected: detectedDoshas,
        notDetected: notDetectedDoshas
      },
      interpretation
    };
  }
  // Numerology Calculator
  static getNumerology(name, dobInput, moonLong, lang = "en") {
    const reduceNum = (num) => {
      let str = num.toString();
      while (str.length > 1) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) sum += parseInt(str[i]);
        str = sum.toString();
      }
      return parseInt(str);
    };
    const lifePath = reduceNum(dobInput.year + dobInput.month + dobInput.day);
    let nameSum = 0;
    const alphabetMap = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      O: 6,
      P: 7,
      Q: 8,
      R: 9,
      S: 1,
      T: 2,
      U: 3,
      V: 4,
      W: 5,
      X: 6,
      Y: 7,
      Z: 8
    };
    const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, "");
    for (let i = 0; i < cleanedName.length; i++) {
      nameSum += alphabetMap[cleanedName[i]] || 0;
    }
    const destiny = reduceNum(nameSum) || 5;
    const soulUrge = reduceNum(cleanedName.length * 2 + 1);
    const nakIdx = Math.floor(moonLong / (360 / 27));
    const syllables = NAKSHATRA_SYLLABLES[nakIdx] || ["Om"];
    const rasiIdx = Math.floor(moonLong / 30);
    const rasiName = translateRashi(rasiIdx, lang);
    const matchingBabyNames = BABY_NAMES_SEED.filter(
      (b) => syllables.some((syll) => b.name.startsWith(syll) || b.start === syll)
    );
    const formatBabyNames = (list) => list.map((b) => ({
      name: b.name,
      meaning: translateBabyNameMeaning(b.meaning, lang),
      gender: b.gender
    }));
    return {
      lifePath,
      destiny,
      soulUrge,
      personality: reduceNum(lifePath + destiny),
      luckyNumbers: [lifePath, destiny, 9, 3],
      luckyColors: ["Golden Yellow", "Royal Blue", "Saffron Red"].map((c) => translateColor(c, lang)),
      luckyGem: translateGemstone(lifePath === 1 ? "Ruby" : lifePath === 3 ? "Yellow Sapphire" : "Diamond", lang),
      nameAstrology: {
        birthRasi: rasiName,
        suggestedSyllables: syllables,
        babyNames: matchingBabyNames.length > 0 ? formatBabyNames(matchingBabyNames) : formatBabyNames(BABY_NAMES_SEED.slice(0, 4))
      }
    };
  }
};
function latitudeToRad(lat) {
  return lat * Math.PI / 180;
}
function tRemToDeg(rem) {
  return parseFloat((rem * 30).toFixed(4));
}

// src/services/aiService.ts
var AiService = class {
  // Generate deterministic highly customizable localized Vedic Horoscope interpretations
  static async generateHoroscope(sign, lang = "en") {
    return AstrologyServiceFallback.getZodiacHoroscope(sign, lang);
  }
  // Generate an expert textual explanations for a Birth Chart
  static async explainChart(chartSummary, lang = "en") {
    if (lang === "te") return `\u0C32\u0C17\u0C4D\u0C28\u0C02 ${chartSummary.lagna} \u0C32\u0C4B \u0C09\u0C02\u0C26\u0C3F. \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C26\u0C36\u0C32 \u0C06\u0C27\u0C3E\u0C30\u0C02\u0C17\u0C3E \u0C2B\u0C32\u0C3F\u0C24\u0C3E\u0C32\u0C41 \u0C05\u0C02\u0C1A\u0C28\u0C3E \u0C35\u0C47\u0C2F\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F.`;
    if (lang === "hi") return `\u0932\u0917\u094D\u0928 ${chartSummary.lagna} \u092E\u0947\u0902 \u0938\u094D\u0925\u093F\u0924 \u0939\u0948\u0964 \u0917\u094D\u0930\u0939\u094B\u0902 \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u0914\u0930 \u0926\u0936\u093E \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u092A\u0930\u093F\u0923\u093E\u092E\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0940 \u0917\u0908 \u0939\u0948\u0964`;
    if (lang === "ta") return `\u0BB2\u0B95\u0BCD\u0BA9\u0BAE\u0BCD ${chartSummary.lagna} \u0B87\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0B95\u0BCB\u0BB3\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0B9A\u0BBE \u0B85\u0B9F\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA9.`;
    if (lang === "kn") return `\u0CB2\u0C97\u0CCD\u0CA8\u0CB5\u0CC1 ${chartSummary.lagna} \u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CC6. \u0C97\u0CCD\u0CB0\u0CB9\u0C97\u0CB3 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CA6\u0CB6\u0CC6\u0C97\u0CB3 \u0C86\u0CA7\u0CBE\u0CB0\u0CA6 \u0CAE\u0CC7\u0CB2\u0CC6 \u0CAB\u0CB2\u0CBF\u0CA4\u0CBE\u0C82\u0CB6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB2\u0CC6\u0C95\u0CCD\u0C95\u0CB9\u0CBE\u0C95\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.`;
    return `Solar & planetary configurations analyzed deterministically. Lagna is located in ${chartSummary.lagna}. The major planets are placed in their respective houses. All computations strictly follow Parasari standards.`;
  }
  // Generate highly premium, scholar-level deterministic advisor response
  // Generate highly premium, scholar-level deterministic advisor response
  static async consultAstro(message, history, chartSummary, lang = "en") {
    console.warn("AI Consulting is disabled in deterministic mode. Using static expert replies.");
    const text = message.toLowerCase();
    if (text.includes("career") || text.includes("job") || text.includes("work")) {
      return lang === "te" ? "\u0C2E\u0C40 10\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 (\u0C30\u0C3E\u0C1C\u0C4D\u0C2F\u0C3E \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02) \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C42\u0C30\u0C4D\u0C2F\u0C41\u0C28\u0C3F \u0C2C\u0C32\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C2C\u0C1F\u0C4D\u0C1F\u0C3F \u0C2E\u0C40 \u0C15\u0C46\u0C30\u0C40\u0C30\u0C4D \u0C1A\u0C3E\u0C32\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F. \u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24 \u0C26\u0C36 \u0C2A\u0C41\u0C30\u0C4B\u0C2D\u0C3F\u0C35\u0C43\u0C26\u0C4D\u0C26\u0C3F\u0C28\u0C3F \u0C1A\u0C42\u0C2A\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0906\u092A\u0915\u0947 \u0915\u0930\u093F\u092F\u0930 \u0915\u093E \u0926\u0936\u092E \u092D\u093E\u0935 \u092E\u091C\u092C\u0942\u0924 \u0939\u0948\u0964 \u0938\u0942\u0930\u094D\u092F \u0914\u0930 \u092C\u0941\u0927 \u0915\u0940 \u092F\u0941\u0924\u093F \u0930\u093E\u091C\u092F\u094B\u0917 \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964 \u0928\u093F\u0930\u0902\u0924\u0930 \u092A\u094D\u0930\u092F\u093E\u0938 \u0938\u0947 \u0938\u092B\u0932\u0924\u093E \u0905\u0935\u0936\u094D\u092F \u092E\u093F\u0932\u0947\u0917\u0940\u0964" : "Based on your 10th house of career (Karma Sthana) and the positioning of the Sun, you are entering a period of career expansion and recognition. Keep your focus on long-term leadership goals.";
    } else if (text.includes("marri") || text.includes("love") || text.includes("wife") || text.includes("husband") || text.includes("partner")) {
      return lang === "te" ? "\u0C2E\u0C40 7\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C2E\u0C02\u0C1A\u0C3F \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F\u0C28\u0C3F \u0C15\u0C32\u0C3F\u0C17\u0C3F \u0C09\u0C02\u0C26\u0C3F. \u0C2D\u0C3E\u0C17\u0C38\u0C4D\u0C35\u0C3E\u0C2E\u0C4D\u0C2F\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C48\u0C35\u0C3E\u0C39\u0C3F\u0C15 \u0C1C\u0C40\u0C35\u0C3F\u0C24\u0C02 \u0C2A\u0C4D\u0C30\u0C36\u0C3E\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C38\u0C3E\u0C17\u0C41\u0C24\u0C3E\u0C2F\u0C3F." : lang === "hi" ? "\u0938\u092A\u094D\u0924\u092E \u092D\u093E\u0935 (\u0935\u093F\u0935\u093E\u0939 \u0938\u094D\u0925\u093E\u0928) \u0936\u0941\u092D \u0917\u094D\u0930\u0939\u094B\u0902 \u0915\u0940 \u0926\u0943\u0937\u094D\u091F\u093F \u092E\u0947\u0902 \u0939\u0948\u0964 \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u091C\u0940\u0935\u0928 \u0938\u0941\u0916\u092E\u092F \u0914\u0930 \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F\u092A\u0942\u0930\u094D\u0923 \u0930\u0939\u0947\u0917\u093E\u0964" : "The 7th house (Kalatra Sthana) rules your marriage and partnerships. Planetary conjunctions indicate a highly supportive life partner who brings harmony and shared spiritual growth.";
    } else if (text.includes("money") || text.includes("wealth") || text.includes("finance")) {
      return lang === "te" ? "\u0C2E\u0C40 2\u0C35 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 11\u0C35 \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3E\u0C32\u0C41 \u0C27\u0C28 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C32\u0C3E\u0C2D \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C3E\u0C32\u0C41. \u0C27\u0C28 \u0C2A\u0C4D\u0C30\u0C35\u0C3E\u0C39\u0C02 \u0C28\u0C3F\u0C32\u0C15\u0C21\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0926\u094D\u0935\u093F\u0924\u0940\u092F (\u0927\u0928) \u0914\u0930 \u090F\u0915\u093E\u0926\u0936 (\u0932\u093E\u092D) \u092D\u093E\u0935 \u0905\u0924\u094D\u092F\u0902\u0924 \u0936\u0941\u092D \u0939\u0948\u0902\u0964 \u0932\u0915\u094D\u0937\u094D\u092E\u0940 \u092F\u094B\u0917 \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0909\u0928\u094D\u0928\u0924\u093F \u0926\u0930\u094D\u0936\u093E\u0924\u0940 \u0939\u0948\u0964" : "Your 2nd house of wealth (Dhana Sthana) and 11th house of gains (Labha Sthana) indicate strong financial foundations. Astrological transits suggest stable wealth accumulation and successful investments.";
    } else {
      return lang === "te" ? "\u0C2E\u0C40 \u0C32\u0C17\u0C4D\u0C28\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C30\u0C3E\u0C36\u0C3F \u0C1A\u0C15\u0C4D\u0C30 \u0C05\u0C2E\u0C30\u0C3F\u0C15 \u0C2A\u0C4D\u0C30\u0C15\u0C3E\u0C30\u0C2E\u0C41 \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32\u0C41 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F. \u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C15\u0C42\u0C32\u0C24\u0C32\u0C41 \u0C24\u0C4A\u0C32\u0C3F\u0C17\u0C3F\u0C2A\u0C4B\u0C35\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C28\u0C3F\u0C24\u0C4D\u0C2F\u0C02 \u0C27\u0C4D\u0C2F\u0C3E\u0C28\u0C2E\u0C41 \u0C1A\u0C47\u0C2F\u0C35\u0C32\u0C38\u0C3F\u0C02\u0C26\u0C3F." : lang === "hi" ? "\u0906\u092A\u0915\u0947 \u0932\u0917\u094D\u0928 \u0914\u0930 \u0915\u0941\u0902\u0921\u0932\u0940 \u0915\u0947 \u0917\u094D\u0930\u0939\u094B\u0902 \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u092C\u0939\u0941\u0924 \u0936\u0941\u092D \u0939\u0948\u0964 \u0938\u092D\u0940 \u092C\u093E\u0927\u093E\u0913\u0902 \u0915\u094B \u0926\u0942\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0917\u093E\u092F\u0924\u094D\u0930\u0940 \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u091C\u093E\u092A \u0915\u0930\u0947\u0902\u0964" : "Your planetary positions represent a strong karmic blueprint. I recommend practicing mindful meditation (Pranayama) and focusing on your current dasha rulers for spiritual and material harmony.";
    }
  }
};
var AstrologyServiceFallback = class {
  static getZodiacHoroscope(sign, lang) {
    const translations = {
      en: {
        daily: "A highly progressive day for mental clarity and strategic planning. Avoid unwanted confrontations.",
        weekly: "You will notice strong momentum in professional projects. Financial stability will improve.",
        monthly: "Jupiter's movement brings peace to home and relationships. Keep focus on health routines.",
        yearly: "This is a year of major transit alignments offering stable scaling, marriage prospects, and academic masteries.",
        career: "You can expect promotions, recognition, or scaling in technology fields.",
        marriage: "A very favorable period for weddings, relationship enhancements, and mutual understanding.",
        business: "Excellent returns on old assets. Keep transparency in new partnerships.",
        health: "Avoid stress. Integrate mild exercises, walking, and planetary breathing loop daily.",
        education: "High concentration levels will reward you in examinations and research works.",
        travel: "Auspicious long travels are indicated towards historical and spiritual centers.",
        finance: "Strong wealth inflows from multiple lines. Keep expenses checked.",
        children: "Children will excel in exams and bring happiness to the household.",
        remedies: "Observe fasts on Thursdays and donate yellow garments.",
        luckyNumber: 9,
        luckyColor: "Saffron Red",
        luckyDirection: "East",
        luckyGemstone: "Coral"
      },
      te: {
        daily: "\u0C08 \u0C30\u0C4B\u0C1C\u0C41 \u0C2E\u0C3E\u0C28\u0C38\u0C3F\u0C15 \u0C2A\u0C4D\u0C30\u0C36\u0C3E\u0C02\u0C24\u0C24\u0C15\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C15\u0C41\u0C1F\u0C41\u0C02\u0C2C\u0C02\u0C24\u0C4B \u0C17\u0C21\u0C2A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C0E\u0C02\u0C24\u0C4B \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02.",
        weekly: "\u0C09\u0C26\u0C4D\u0C2F\u0C4B\u0C17\u0C02\u0C32\u0C4B \u0C2A\u0C41\u0C30\u0C4B\u0C17\u0C24\u0C3F \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F, \u0C36\u0C4D\u0C30\u0C2E\u0C15\u0C41 \u0C24\u0C17\u0C3F\u0C28 \u0C2B\u0C32\u0C3E\u0C32\u0C41 \u0C32\u0C2D\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F.",
        monthly: "\u0C27\u0C28 \u0C2A\u0C4D\u0C30\u0C35\u0C3E\u0C39\u0C02 \u0C2A\u0C46\u0C30\u0C41\u0C17\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F, \u0C2A\u0C3E\u0C24 \u0C2C\u0C3E\u0C15\u0C40\u0C32\u0C41 \u0C35\u0C38\u0C42\u0C32\u0C41 \u0C05\u0C35\u0C41\u0C24\u0C3E\u0C2F\u0C3F.",
        yearly: "\u0C08 \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C02 \u0C2E\u0C40 \u0C15\u0C46\u0C30\u0C40\u0C30\u0C4D \u0C2A\u0C30\u0C02\u0C17\u0C3E \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C28\u0C3F\u0C35\u0C3E\u0C38 \u0C2E\u0C3E\u0C30\u0C4D\u0C2A\u0C41\u0C32\u0C15\u0C41 \u0C1A\u0C15\u0C4D\u0C15\u0C28\u0C3F \u0C2E\u0C3E\u0C30\u0C4D\u0C2A\u0C41\u0C32\u0C28\u0C41 \u0C24\u0C46\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.",
        career: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C05\u0C35\u0C15\u0C3E\u0C36\u0C3E\u0C32\u0C15\u0C41 \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C24\u0C46\u0C30\u0C41\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C3E\u0C2F\u0C3F, \u0C09\u0C28\u0C4D\u0C28\u0C24 \u0C05\u0C27\u0C3F\u0C15\u0C3E\u0C30\u0C41\u0C32 \u0C2A\u0C4D\u0C30\u0C36\u0C02\u0C38\u0C32\u0C41 \u0C2A\u0C4A\u0C02\u0C26\u0C41\u0C24\u0C3E\u0C30\u0C41.",
        marriage: "\u0C35\u0C3F\u0C35\u0C3E\u0C39 \u0C2A\u0C4D\u0C30\u0C2F\u0C24\u0C4D\u0C28\u0C3E\u0C32\u0C41 \u0C38\u0C2B\u0C32\u0C02 \u0C05\u0C35\u0C41\u0C24\u0C3E\u0C2F\u0C3F, \u0C26\u0C3E\u0C02\u0C2A\u0C24\u0C4D\u0C2F\u0C02 \u0C2E\u0C27\u0C41\u0C30\u0C02\u0C17\u0C3E \u0C38\u0C3E\u0C17\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.",
        business: "\u0C35\u0C4D\u0C2F\u0C3E\u0C2A\u0C3E\u0C30 \u0C35\u0C3F\u0C38\u0C4D\u0C24\u0C30\u0C23\u0C15\u0C41 \u0C2A\u0C46\u0C1F\u0C4D\u0C1F\u0C41\u0C2C\u0C21\u0C41\u0C32\u0C41 \u0C15\u0C32\u0C38\u0C3F\u0C35\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F.",
        health: "\u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02 \u0C28\u0C3F\u0C32\u0C15\u0C21\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F, \u0C05\u0C32\u0C38\u0C1F \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C15\u0C41 \u0C27\u0C4D\u0C2F\u0C3E\u0C28\u0C02 \u0C05\u0C35\u0C38\u0C30\u0C02.",
        education: "\u0C35\u0C3F\u0C26\u0C4D\u0C2F\u0C3E\u0C30\u0C4D\u0C25\u0C41\u0C32\u0C15\u0C41 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32 \u0C38\u0C2E\u0C2F\u0C02, \u0C2A\u0C4B\u0C1F\u0C40 \u0C2A\u0C30\u0C40\u0C15\u0C4D\u0C37\u0C32\u0C32\u0C4B \u0C35\u0C3F\u0C1C\u0C2F\u0C02 \u0C38\u0C3E\u0C27\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C30\u0C41.",
        travel: "\u0C26\u0C42\u0C30 \u0C2A\u0C4D\u0C30\u0C2F\u0C3E\u0C23\u0C3E\u0C32\u0C41 \u0C32\u0C3E\u0C2D\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F, \u0C2A\u0C41\u0C23\u0C4D\u0C2F\u0C15\u0C4D\u0C37\u0C47\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C41 \u0C38\u0C02\u0C26\u0C30\u0C4D\u0C36\u0C3F\u0C38\u0C4D\u0C24\u0C3E\u0C30\u0C41.",
        finance: "\u0C06\u0C26\u0C3E\u0C2F\u0C02 \u0C24\u0C43\u0C2A\u0C4D\u0C24\u0C3F\u0C15\u0C30\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F, \u0C2A\u0C4A\u0C26\u0C41\u0C2A\u0C41 \u0C2A\u0C25\u0C15\u0C3E\u0C32\u0C32\u0C4B \u0C2A\u0C46\u0C1F\u0C4D\u0C1F\u0C41\u0C2C\u0C21\u0C3F \u0C2A\u0C46\u0C21\u0C24\u0C3E\u0C30\u0C41.",
        children: "\u0C38\u0C02\u0C24\u0C3E\u0C28\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C15\u0C40\u0C30\u0C4D\u0C24\u0C3F \u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C37\u0C4D\u0C1F\u0C32\u0C41 \u0C2A\u0C46\u0C30\u0C41\u0C17\u0C41\u0C24\u0C3E\u0C2F\u0C3F.",
        remedies: "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02 \u0C09\u0C2A\u0C35\u0C3E\u0C38\u0C02 \u0C06\u0C1A\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C47\u0C26\u0C32\u0C15\u0C41 \u0C2A\u0C02\u0C21\u0C4D\u0C32\u0C41 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
        luckyNumber: 3,
        luckyColor: "\u0C2A\u0C38\u0C41\u0C2A\u0C41",
        luckyDirection: "\u0C08\u0C36\u0C3E\u0C28\u0C4D\u0C2F\u0C02",
        luckyGemstone: "\u0C2A\u0C41\u0C37\u0C4D\u0C2F\u0C30\u0C3E\u0C17\u0C02"
      },
      hi: {
        daily: "\u0906\u091C \u0915\u093E \u0926\u093F\u0928 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u094D\u092A\u0937\u094D\u091F\u0924\u093E \u0914\u0930 \u0930\u0923\u0928\u0940\u0924\u093F\u0915 \u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u092C\u0939\u0941\u0924 \u0909\u092A\u092F\u094B\u0917\u0940 \u0930\u0939\u0947\u0917\u093E\u0964",
        weekly: "\u092A\u0947\u0936\u0947\u0935\u0930 \u092A\u0930\u093F\u092F\u094B\u091C\u0928\u093E\u0913\u0902 \u092E\u0947\u0902 \u0938\u0915\u093E\u0930\u093E\u0924\u094D\u092E\u0915 \u0917\u0924\u093F \u0926\u093F\u0916\u0947\u0917\u0940\u0964 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u094D\u0925\u093F\u0924\u093F \u092E\u091C\u092C\u0942\u0924 \u0939\u094B\u0917\u0940\u0964",
        monthly: "\u092C\u0943\u0939\u0938\u094D\u092A\u0924\u093F \u0915\u093E \u0917\u094B\u091A\u0930 \u0938\u0941\u0916-\u0936\u093E\u0902\u0924\u093F \u0932\u093E\u090F\u0917\u093E\u0964 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0915\u093E \u0935\u093F\u0936\u0947\u0937 \u0927\u094D\u092F\u093E\u0928 \u0930\u0916\u0947\u0902\u0964",
        yearly: "\u092F\u0939 \u0935\u0930\u094D\u0937 \u092C\u0921\u093C\u0947 \u092C\u0926\u0932\u093E\u0935\u094B\u0902 \u0914\u0930 \u0936\u0941\u092D \u0935\u093F\u0935\u093E\u0939 \u092F\u094B\u0917 \u0935\u093E\u0932\u093E \u0938\u093E\u092C\u093F\u0924 \u0939\u094B\u0917\u093E\u0964 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092E\u0947\u0902 \u0938\u092B\u0932\u0924\u093E \u092E\u093F\u0932\u0947\u0917\u0940\u0964",
        career: "\u0915\u0930\u093F\u092F\u0930 \u092E\u0947\u0902 \u092A\u0926\u094B\u0928\u094D\u0928\u0924\u093F \u0914\u0930 \u0938\u092E\u094D\u092E\u093E\u0928 \u092E\u093F\u0932\u0928\u0947 \u0915\u0947 \u092A\u094D\u0930\u092C\u0932 \u092F\u094B\u0917 \u0939\u0948\u0902\u0964",
        marriage: "\u0926\u093E\u092E\u094D\u092A\u0924\u094D\u092F \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u092E\u0927\u0941\u0930\u0924\u093E \u092C\u0922\u093C\u0947\u0917\u0940, \u0928\u090F \u0938\u0902\u092C\u0902\u0927 \u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0939\u094B\u0902\u0917\u0947\u0964",
        business: "\u0938\u093E\u091D\u0947\u0926\u093E\u0930\u0940 \u092E\u0947\u0902 \u092C\u0921\u093C\u093E \u0932\u093E\u092D \u0939\u094B\u0917\u093E\u0964 \u0928\u090F \u0909\u0926\u094D\u092F\u092E\u094B\u0902 \u092E\u0947\u0902 \u0928\u093F\u0935\u0947\u0936 \u0936\u0941\u092D \u0930\u0939\u0947\u0917\u093E\u0964",
        health: "\u0928\u093F\u092F\u092E\u093F\u0924 \u092F\u094B\u0917 \u0914\u0930 \u0927\u094D\u092F\u093E\u0928 \u0938\u0947 \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u090F\u0935\u0902 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u092C\u0947\u0939\u0924\u0930 \u0930\u0939\u0947\u0917\u093E\u0964",
        education: "\u0905\u0927\u094D\u092F\u092F\u0928 \u0915\u0947 \u0932\u093F\u090F \u0938\u0930\u094D\u0935\u094B\u0924\u094D\u0924\u092E \u0938\u092E\u092F, \u092A\u094D\u0930\u0924\u093F\u092F\u094B\u0917\u0940 \u092A\u0930\u0940\u0915\u094D\u0937\u093E\u0913\u0902 \u092E\u0947\u0902 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092A\u0930\u093F\u0923\u093E\u092E \u092E\u093F\u0932\u0947\u0902\u0917\u0947\u0964",
        travel: "\u0927\u093E\u0930\u094D\u092E\u093F\u0915 \u0914\u0930 \u0938\u093E\u0939\u0938\u093F\u0915 \u092F\u093E\u0924\u094D\u0930\u093E\u0913\u0902 \u0915\u0947 \u0905\u091A\u094D\u091B\u0947 \u0905\u0935\u0938\u0930 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0902\u0917\u0947\u0964",
        finance: "\u0927\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924\u093F \u0915\u0947 \u0928\u090F \u0938\u094D\u0930\u094B\u0924 \u0916\u0941\u0932\u0947\u0902\u0917\u0947, \u0938\u0902\u091A\u093F\u0924 \u0927\u0928 \u092E\u0947\u0902 \u0935\u0943\u0926\u094D\u0927\u093F \u0939\u094B\u0917\u0940\u0964",
        children: "\u0938\u0902\u0924\u093E\u0928 \u092A\u0915\u094D\u0937 \u0938\u0947 \u0938\u0941\u0916\u0926 \u0938\u092E\u093E\u091A\u093E\u0930 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0902\u0917\u0947, \u092A\u094D\u0930\u0917\u0924\u093F \u0939\u094B\u0917\u0940\u0964",
        remedies: "\u0917\u0941\u0930\u0941\u0935\u093E\u0930 \u0915\u094B \u092A\u0940\u0932\u0940 \u0935\u0938\u094D\u0924\u0941\u0913\u0902 \u0915\u093E \u0926\u093E\u0928 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0935\u093F\u0937\u094D\u0923\u0941 \u0938\u0939\u0938\u094D\u0924\u094D\u0930\u0928\u093E\u092E \u0938\u0941\u0928\u0947\u0902\u0964",
        luckyNumber: 5,
        luckyColor: "\u092A\u0940\u0932\u093E",
        luckyDirection: "\u0909\u0924\u094D\u0924\u0930-\u092A\u0942\u0930\u094D\u0935",
        luckyGemstone: "\u092A\u0941\u0916\u0930\u093E\u091C"
      },
      ta: {
        daily: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA8\u0BBE\u0BB3\u0BBE\u0B95 \u0B85\u0BAE\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD. \u0BA4\u0BC7\u0BB5\u0BC8\u0BAF\u0BB1\u0BCD\u0BB1 \u0B9A\u0BA3\u0BCD\u0B9F\u0BC8\u0B95\u0BB3\u0BC8\u0BA4\u0BCD \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
        weekly: "\u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBF\u0BAF\u0BBE\u0BAA\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB2\u0BBE\u0BAA\u0BAE\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.",
        monthly: "\u0BAA\u0BA3\u0BAA\u0BCD\u0BAA\u0BC1\u0BB4\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD, \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BAE\u0B95\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF \u0BA8\u0BBF\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD.",
        yearly: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BBE\u0BB4\u0BCD\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1 \u0BB5\u0BB0\u0BC1\u0BAE\u0BCD, \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0BAF\u0BCB\u0B95\u0BAE\u0BCD \u0B95\u0BC2\u0B9F\u0BBF\u0BB5\u0BB0\u0BC1\u0BAE\u0BCD.",
        career: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BC7\u0BB2\u0BC8 \u0BB5\u0BBE\u0BAF\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD \u0BA4\u0BC7\u0B9F\u0BBF \u0BB5\u0BB0\u0BC1\u0BAE\u0BCD, \u0BAE\u0BC7\u0BB2\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BBE\u0BB0\u0BBF\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B86\u0BA4\u0BB0\u0BB5\u0BC1 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.",
        marriage: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3 \u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BC1\u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0B95\u0BB3\u0BCD \u0B9A\u0BC1\u0BAE\u0BC1\u0B95\u0BAE\u0BBE\u0B95 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD, \u0B87\u0BB2\u0BCD\u0BB2\u0BB1\u0BAE\u0BCD \u0B87\u0BA9\u0BCD\u0BAA\u0BAE\u0BAF\u0BAE\u0BBE\u0B95\u0BC1\u0BAE\u0BCD.",
        business: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BAA\u0BBE\u0BB0\u0B95\u0BCD \u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BBE\u0BB3\u0BBF\u0B95\u0BB3\u0BBF\u0B9F\u0BC8\u0BAF\u0BC7 \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAA\u0BC1\u0BB0\u0BBF\u0BA4\u0BB2\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1 \u0BB2\u0BBE\u0BAA\u0BAE\u0BCD \u0B95\u0BC2\u0B9F\u0BC1\u0BAE\u0BCD.",
        health: "\u0B89\u0B9F\u0BB2\u0BCD \u0BA8\u0BB2\u0BAE\u0BCD \u0B9A\u0BC0\u0BB0\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD. \u0B8E\u0BB3\u0BBF\u0BAF \u0B89\u0B9F\u0BB1\u0BCD\u0BAA\u0BAF\u0BBF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
        education: "\u0B95\u0BB2\u0BCD\u0BB5\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BBE\u0BA3\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0BA8\u0BB2\u0BCD\u0BB2 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0BA3\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BB1\u0BCD\u0BB1\u0BC1 \u0B9A\u0BBE\u0BA4\u0BA9\u0BC8 \u0BAA\u0B9F\u0BC8\u0BAA\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BB3\u0BCD.",
        travel: "\u0BB5\u0BC6\u0BB3\u0BBF\u0BAF\u0BC2\u0BB0\u0BCD \u0BAA\u0BAF\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0BB2\u0BCD \u0BA8\u0BA9\u0BCD\u0BAE\u0BC8\u0B95\u0BB3\u0BCD \u0B8F\u0BB1\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD, \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0B88\u0B9F\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1 \u0B95\u0BC2\u0B9F\u0BC1\u0BAE\u0BCD.",
        finance: "\u0BA8\u0BBF\u0BA4\u0BBF \u0BA8\u0BBF\u0BB2\u0BC8\u0BAE\u0BC8 \u0BA4\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BA4\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD, \u0B9A\u0BC7\u0BAE\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0BAA\u0BCD \u0BAA\u0BB4\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.",
        children: "\u0BAA\u0BBF\u0BB3\u0BCD\u0BB3\u0BC8\u0B95\u0BB3\u0BBE\u0BB2\u0BCD \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BC8 \u0B9A\u0BC7\u0BB0\u0BC1\u0BAE\u0BCD, \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B95\u0BB2\u0BCD\u0BB5\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BC7\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD.",
        remedies: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8 \u0BB5\u0BBF\u0BB0\u0BA4\u0BAE\u0BCD \u0B87\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD \u0BA8\u0BBF\u0BB1 \u0BA4\u0BBE\u0BA9\u0BBF\u0BAF\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
        luckyNumber: 2,
        luckyColor: "\u0BAE\u0B9E\u0BCD\u0B9A\u0BB3\u0BCD",
        luckyDirection: "\u0BB5\u0B9F\u0B95\u0BBF\u0BB4\u0B95\u0BCD\u0B95\u0BC1",
        luckyGemstone: "\u0B95\u0BA9\u0B95\u0BAA\u0BC1\u0BB7\u0BCD\u0BAA\u0BB0\u0BBE\u0B95\u0BAE\u0BCD"
      },
      kn: {
        daily: "\u0C87\u0C82\u0CA6\u0CC1 \u0CA6\u0CBF\u0CA8\u0CB8\u0CBF \u0CB5\u0CCD\u0CAF\u0CB5\u0CB9\u0CBE\u0CB0 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB9\u0CCA\u0CB8 \u0CAF\u0CCB\u0C9C\u0CA8\u0CC6\u0C97\u0CB3 \u0C9A\u0CBE\u0CB2\u0CA8\u0CC6\u0C97\u0CC6 \u0CB6\u0CC1\u0CAD\u0C95\u0CB0\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        weekly: "\u0C89\u0CA6\u0CCD\u0CAF\u0CCB\u0C97\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CCA\u0CB8 \u0C9C\u0CB5\u0CBE\u0CAC\u0CCD\u0CA6\u0CBE\u0CB0\u0CBF\u0C97\u0CB3\u0CC1 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CB5\u0CC6. \u0C86\u0CA6\u0CBE\u0CAF \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CB2\u0CBF\u0CA6\u0CC6.",
        monthly: "\u0CB8\u0CA6\u0CCD\u0CAD\u0CBE\u0CB5\u0CA8\u0CC6\u0C97\u0CB3\u0CC1 \u0CAE\u0CC2\u0CA1\u0CB2\u0CBF\u0CB5\u0CC6. \u0C86\u0CB0\u0CCB\u0C97\u0CCD\u0CAF\u0CA6 \u0CAC\u0C97\u0CCD\u0C97\u0CC6 \u0C95\u0CBE\u0CB3\u0C9C\u0CBF \u0CB5\u0CB9\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE.",
        yearly: "\u0C88 \u0CB5\u0CB0\u0CCD\u0CB7 \u0CB9\u0CCA\u0CB8 \u0C86\u0CB8\u0CCD\u0CA4\u0CBF \u0C96\u0CB0\u0CC0\u0CA6\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0C82\u0C95\u0CCD\u0CB0\u0CBE\u0C82\u0CA4\u0CBF\u0CAF \u0CA8\u0C82\u0CA4\u0CB0 \u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0CAF\u0CBE\u0C97\u0CB2\u0CC1 \u0CA4\u0CC1\u0C82\u0CAC\u0CBE \u0CB8\u0CC2\u0C95\u0CCD\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        career: "\u0C95\u0CC6\u0CB2\u0CB8\u0CA6 \u0CB8\u0CCD\u0CA5\u0CB3\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0CA8\u0CCD\u0CA8\u0CA3\u0CC6 \u0CB8\u0CBF\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0C97\u0CCC\u0CB0\u0CB5 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        marriage: "\u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0CAF \u0C85\u0CA1\u0CC6\u0CA4\u0CA1\u0CC6\u0C97\u0CB3\u0CC1 \u0CA8\u0CBF\u0CB5\u0CBE\u0CB0\u0CA3\u0CC6\u0CAF\u0CBE\u0C97\u0CBF \u0C95\u0C82\u0C95\u0CA3 \u0CAC\u0CB2 \u0C95\u0CC2\u0CA1\u0CBF\u0CAC\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        business: "\u0CB9\u0CA3\u0C95\u0CBE\u0CB8\u0CC1 \u0CB5\u0CCD\u0CAF\u0CB5\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CAA\u0CCD\u0CB0\u0C97\u0CA4\u0CBF \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0C86\u0CA6\u0CBE\u0CAF \u0CA6\u0CCD\u0CB5\u0CBF\u0C97\u0CC1\u0CA3\u0C97\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        health: "\u0C86\u0CB0\u0CCB\u0C97\u0CCD\u0CAF\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CCD\u0CA5\u0CBF\u0CB0\u0CA4\u0CC6 \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0CAA\u0CCD\u0CB0\u0CBE\u0CA3\u0CBE\u0CAF\u0CBE\u0CAE\u0CA6\u0CBF\u0C82\u0CA6 \u0CB8\u0CAE\u0CBE\u0CA7\u0CBE\u0CA8 \u0CB2\u0CAD\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        education: "\u0CB5\u0CBF\u0CA6\u0CCD\u0CAF\u0CBE\u0CB0\u0CCD\u0CA5\u0CBF\u0C97\u0CB3\u0CBF\u0C97\u0CC6 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CA6\u0CBF\u0CA8\u0C97\u0CB3\u0CC1, \u0CB5\u0CBF\u0CA6\u0CCD\u0CAF\u0CBE\u0CAD\u0CCD\u0CAF\u0CBE\u0CB8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C89\u0CA8\u0CCD\u0CA8\u0CA4 \u0CAA\u0CCD\u0CB0\u0C97\u0CA4\u0CBF \u0C87\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        travel: "\u0CB8\u0CCD\u0CAA\u0CB7\u0CCD\u0C9F \u0CAF\u0CCB\u0C9C\u0CBF\u0CA4 \u0CAA\u0CCD\u0CB0\u0CAF\u0CBE\u0CA3\u0C97\u0CB3\u0CC1 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C9C\u0CCD\u0C9E\u0CBE\u0CA8\u0CBE\u0CB0\u0CCD\u0C9C\u0CA8\u0CC6 \u0CA8\u0CBF\u0CB5\u0CBE\u0CB8 \u0C89\u0C82\u0C9F\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6.",
        finance: "\u0C89\u0CB3\u0CBF\u0CA4\u0CBE\u0CAF\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CC6\u0C9A\u0CCD\u0C9B\u0CB3 \u0C89\u0C82\u0C9F\u0CBE\u0C97\u0CB2\u0CBF\u0CA6\u0CC6, \u0CA8\u0CBF\u0CB0\u0CC0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4 \u0CB9\u0CA3 \u0C95\u0CC8 \u0CB8\u0CC7\u0CB0\u0CB2\u0CBF\u0CA6\u0CC6.",
        children: "\u0CAE\u0C95\u0CCD\u0C95\u0CB3 \u0C95\u0CA1\u0CC6\u0CAF\u0CBF\u0C82\u0CA6 \u0CB8\u0C82\u0CA4\u0CB8\u0CA6 \u0CB5\u0CBE\u0CB0\u0CCD\u0CA4\u0CC6 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CA6\u0CC6.",
        remedies: "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0 \u0CA6\u0CC7\u0CB5\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0C95\u0CCD\u0C95\u0CC6 \u0CAD\u0CC7\u0C9F\u0CBF \u0CA8\u0CC0\u0CA1\u0CBF \u0C95\u0CA1\u0CB2\u0CC6 \u0CAC\u0CC7\u0CB3\u0CC6 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF\u0CB0\u0CBF.",
        luckyNumber: 6,
        luckyColor: "\u0CB9\u0CB3\u0CA6\u0CBF",
        luckyDirection: "\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5",
        luckyGemstone: "\u0CAA\u0CC1\u0CB7\u0CCD\u0CAF\u0CB0\u0CBE\u0C97"
      }
    };
    return translations[lang];
  }
};

// src/routes/astrology.ts
var router = Router();
router.use((req, res, next) => {
  const supportedLangs = ["en", "te", "ta", "kn", "hi"];
  const langQuery = req.query.lang;
  if (langQuery && !supportedLangs.includes(langQuery)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported language: '${langQuery}'. Supported languages are: ${supportedLangs.join(", ")}`
    });
  }
  if (!langQuery) {
    req.query.lang = "en";
  }
  next();
});
function collapseLocalization(obj, lang) {
  if (Array.isArray(obj)) {
    return obj.map((item) => collapseLocalization(item, lang));
  } else if (obj instanceof Date) {
    return obj;
  } else if (obj !== null && typeof obj === "object") {
    if (obj.en !== void 0 && Object.keys(obj).every((k) => ["en", "te", "ta", "kn", "hi", "ml"].includes(k))) {
      return obj[lang];
    }
    const newObj = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = collapseLocalization(obj[key], lang);
    }
    return newObj;
  }
  return obj;
}
function sendEnvelope(res, lang, data, ayanamsa = "Lahiri", tzStr = "Asia/Kolkata") {
  const collapsedData = collapseLocalization(data, lang);
  const envelope = {
    success: true,
    language: lang,
    data: collapsedData,
    meta: {
      calculation_engine: "Swiss Ephemeris",
      ayanamsa,
      timezone: tzStr,
      version: "1.0.0",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  return res.json(envelope);
}
var RASHI_NAMES_ENGLISH = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)"
];
router.post("/chart", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    const ayanamsa = input.ayanamsa || "Lahiri";
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30);
    const lagnaRasiName = RASHI_NAMES_ENGLISH[lagnaRasi];
    let explanation = "";
    if (input.explain) {
      explanation = await AiService.explainChart({
        birthDate: `${input.year}-${input.month}-${input.day} ${input.hour}:${input.minute}`,
        lagna: lagnaRasiName,
        planets: panchang.planets.map((p) => ({
          name: p.name,
          rasi: p.rasi.name.en,
          house: p.house,
          retrograde: p.isRetrograde
        }))
      }, lang);
    }
    const chartData = {
      lagna: {
        name: "Lagna",
        localizedName: lang === "te" ? "\u0C32\u0C17\u0C4D\u0C28\u0C02 (Lagna)" : lang === "hi" ? "\u0932\u0917\u094D\u0928 (Lagna)" : lang === "ta" ? "\u0BB2\u0B95\u0BCD\u0BA9\u0BAE\u0BCD (Lagnam)" : lang === "kn" ? "\u0CB2\u0C97\u0CCD\u0CA8 (Lagna)" : "Lagna",
        longitude: lagnaLong,
        rasiIndex: lagnaRasi,
        signName: lagnaRasiName,
        house: 1
      },
      planets: panchang.planets,
      divisionalCharts: generateDivisionalCharts(panchang.planets, lagnaLong, lang),
      explanation: explanation || void 0
    };
    sendEnvelope(res, lang, chartData, ayanamsa);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/horoscope", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const moonPlanet = panchang.planets.find((p) => p.id === "moon");
    const rasiSign = moonPlanet ? moonPlanet.rasi.name.en : "Mesha (Aries)";
    const horoscope = await AiService.generateHoroscope(rasiSign, lang);
    sendEnvelope(res, lang, horoscope);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/panchang", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    sendEnvelope(res, lang, panchang, input.ayanamsa || "Lahiri");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/charts/divisional", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const divisional = generateDivisionalCharts(panchang.planets, lagnaLong, lang);
    sendEnvelope(res, lang, divisional, input.ayanamsa || "Lahiri");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/dasha", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const moon = panchang.planets.find((p) => p.id === "moon");
    const dasha = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    sendEnvelope(res, lang, dasha, input.ayanamsa || "Lahiri");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/dosha", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);
    sendEnvelope(res, lang, doshas, input.ayanamsa || "Lahiri");
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/matching", async (req, res) => {
  try {
    const matchingInput = req.body;
    const lang = req.query.lang;
    if (matchingInput.boy) matchingInput.boy.lang = lang;
    if (matchingInput.girl) matchingInput.girl.lang = lang;
    const result = AstrologyService.calculateMatching(matchingInput.boy, matchingInput.girl, lang);
    sendEnvelope(res, lang, result);
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/matching/custom", async (req, res) => {
  try {
    const matchingInput = req.body;
    if (!matchingInput.boy || !matchingInput.girl) {
      return res.status(400).json({
        success: false,
        error: "Both 'boy' and 'girl' birth objects are required in the payload."
      });
    }
    const lang = req.query.lang;
    matchingInput.boy.lang = lang;
    matchingInput.girl.lang = lang;
    const resultData = AstrologyService.calculateMatching(matchingInput.boy, matchingInput.girl, lang);
    const boyPanchang = AstrologyService.calcPanchang(matchingInput.boy);
    const girlPanchang = AstrologyService.calcPanchang(matchingInput.girl);
    const bNak = boyPanchang.nakshatra.index;
    const gNak = girlPanchang.nakshatra.index;
    const bRasi = boyPanchang.planets.find((p) => p.id === "moon").rasiIndex;
    const gRasi = girlPanchang.planets.find((p) => p.id === "moon").rasiIndex;
    const NAKSHATRA_NADIS = [
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2,
      2,
      1,
      0,
      0,
      1,
      2
    ];
    const RASHI_LORDS = [
      "Mars",
      "Venus",
      "Mercury",
      "Moon",
      "Sun",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Saturn",
      "Jupiter"
    ];
    const LORD_FRIENDS = {
      Sun: { friends: ["Moon", "Mars", "Jupiter"] },
      Moon: { friends: ["Sun", "Mercury"] },
      Mars: { friends: ["Sun", "Moon", "Jupiter"] },
      Mercury: { friends: ["Sun", "Venus"] },
      Jupiter: { friends: ["Sun", "Moon", "Mars"] },
      Venus: { friends: ["Mercury", "Saturn"] },
      Saturn: { friends: ["Mercury", "Venus"] }
    };
    const TRANSLATIONS = {
      en: {
        nadi_no_dosha: "No Nadi Dosha detected.",
        nadi_active_no_cancel: "Nadi Dosha is active. No cancellation conditions were met. Recommended to consult an astrologer for remedies.",
        nadi_same_rasi_diff_nak: "Cancelled because both partners share the same Moon Sign (Rasi) but have different Nakshatras.",
        nadi_diff_rasi_same_nak: "Cancelled because both share the same Nakshatra crossing across different Moon Signs (Rasis).",
        nadi_same_nak_diff_pada: "Cancelled because they have different quarters (Padas) of the same Nakshatra.",
        nadi_same_nak_lord: "Cancelled because both Nakshatras share the same planetary Lord.",
        bhakoot_no_dosha: "No Bhakoot Dosha detected.",
        bhakoot_active_no_cancel: "Bhakoot Dosha is active. No cancellation conditions were met.",
        bhakoot_same_lord: "Cancelled because both Moon Signs share the same planetary ruler.",
        bhakoot_friendly_lords: "Cancelled because Moon Sign Lords are mutually friendly.",
        manglik_non_conflict: "No Manglik Dosha conflict detected.",
        manglik_both_manglik: "Both partners have Manglik Dosha. The energies neutralize each other perfectly.",
        manglik_both_non_manglik: "Neither partner has Manglik Dosha. Excellent overall harmony.",
        manglik_conflict: "Manglik Dosha conflict detected. One partner has Manglik Dosha and the other does not. Remedial measures should be performed before marriage.",
        recommendation_high: "Excellent match! Highly compatible and recommended for marriage.",
        recommendation_medium: "Moderate compatibility. Compatibility is acceptable but specific remedies or astrologer consulting is suggested.",
        recommendation_low: "Low matching score. Marriage requires caution, careful remedial measures, and expert astrological consulting."
      },
      hi: {
        nadi_no_dosha: "\u0915\u094B\u0908 \u0928\u093E\u0921\u093C\u0940 \u0926\u094B\u0937 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
        nadi_active_no_cancel: "\u0928\u093E\u0921\u093C\u0940 \u0926\u094B\u0937 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948\u0964 \u0915\u094B\u0908 \u0928\u093F\u0930\u0938\u094D\u0924\u0940\u0915\u0930\u0923 \u0938\u094D\u0925\u093F\u0924\u093F \u092A\u0942\u0930\u0940 \u0928\u0939\u0940\u0902 \u0939\u0941\u0908\u0964 \u0909\u091A\u093F\u0924 \u092A\u0930\u093F\u0939\u093E\u0930 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964",
        nadi_same_rasi_diff_nak: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0926\u094B\u0928\u094B\u0902 \u0938\u093E\u0925\u093F\u092F\u094B\u0902 \u0915\u0940 \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F \u090F\u0915 \u0939\u0940 \u0939\u0948 \u0932\u0947\u0915\u093F\u0928 \u0928\u0915\u094D\u0937\u0924\u094D\u0930 \u0905\u0932\u0917 \u0939\u0948\u0902\u0964",
        nadi_diff_rasi_same_nak: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0926\u094B\u0928\u094B\u0902 \u090F\u0915 \u0939\u0940 \u0928\u0915\u094D\u0937\u0924\u094D\u0930 \u0938\u093E\u091D\u093E \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u091C\u094B \u0935\u093F\u092D\u093F\u0928\u094D\u0928 \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u092B\u0948\u0932\u093E \u0939\u0941\u0906 \u0939\u0948\u0964",
        nadi_same_nak_diff_pada: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0909\u0928\u0915\u0947 \u092A\u093E\u0938 \u090F\u0915 \u0939\u0940 \u0928\u0915\u094D\u0937\u0924\u094D\u0930 \u0915\u0947 \u0935\u093F\u092D\u093F\u0928\u094D\u0928 \u091A\u0930\u0923 (\u092A\u093E\u0926) \u092F\u093E \u0915\u094D\u0935\u093E\u0930\u094D\u091F\u0930 \u0939\u0948\u0902\u0964",
        nadi_same_nak_lord: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0926\u094B\u0928\u094B\u0902 \u0928\u0915\u094D\u0937\u0924\u094D\u0930\u094B\u0902 \u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 \u0917\u094D\u0930\u0939 \u090F\u0915 \u0939\u0940 \u0939\u0948\u0964",
        bhakoot_no_dosha: "\u0915\u094B\u0908 \u092D\u0915\u0942\u091F \u0926\u094B\u0937 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
        bhakoot_active_no_cancel: "\u092D\u0915\u0942\u091F \u0926\u094B\u0937 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948\u0964 \u0915\u094B\u0908 \u0928\u093F\u0930\u0938\u094D\u0924\u0940\u0915\u0930\u0923 \u0938\u094D\u0925\u093F\u0924\u093F \u092A\u0942\u0930\u0940 \u0928\u0939\u0940\u0902 \u0939\u0941\u0908\u0964",
        bhakoot_same_lord: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u0926\u094B\u0928\u094B\u0902 \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F\u092F\u094B\u0902 \u0915\u093E \u0938\u094D\u0935\u093E\u092E\u0940 \u0917\u094D\u0930\u0939 \u090F\u0915 \u0939\u0940 \u0939\u0948\u0964",
        bhakoot_friendly_lords: "\u0928\u093F\u0930\u0938\u094D\u0924 \u0915\u094D\u092F\u094B\u0902\u0915\u093F \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u094D\u0935\u093E\u092E\u0940 \u0906\u092A\u0938 \u092E\u0947\u0902 \u092E\u093F\u0924\u094D\u0930 \u0939\u0948\u0902\u0964",
        manglik_non_conflict: "\u0915\u094B\u0908 \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u0938\u0902\u0918\u0930\u094D\u0937 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964",
        manglik_both_manglik: "\u0926\u094B\u0928\u094B\u0902 \u0938\u093E\u0925\u0940 \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0939\u0948\u0902\u0964 \u0926\u094B\u0937 \u0938\u094D\u0935\u0924\u0903 \u0928\u093F\u0930\u0938\u094D\u0924 \u0939\u094B\u0915\u0930 \u092A\u0930\u0938\u094D\u092A\u0930 \u0938\u0902\u0924\u0941\u0932\u0928 \u092C\u0928\u093E\u0924\u093E \u0939\u0948\u0964",
        manglik_both_non_manglik: "\u0926\u094B\u0928\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u0915\u094B\u0908 \u092D\u0940 \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u0936\u093E\u0930\u0940\u0930\u093F\u0915 \u0914\u0930 \u092E\u093E\u0928\u0938\u093F\u0915 \u0938\u093E\u092E\u0902\u091C\u0938\u094D\u092F\u0964",
        manglik_conflict: "\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u0938\u0902\u0918\u0930\u094D\u0937 \u092A\u093E\u092F\u093E \u0917\u092F\u093E\u0964 \u090F\u0915 \u0938\u093E\u0925\u0940 \u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0939\u0948 \u0914\u0930 \u0926\u0942\u0938\u0930\u093E \u0928\u0939\u0940\u0902\u0964 \u0935\u093F\u0935\u093E\u0939 \u092A\u0942\u0930\u094D\u0935 \u0935\u093F\u0936\u0947\u0937 \u0936\u093E\u0902\u0924\u093F \u092A\u0942\u091C\u093E \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964",
        recommendation_high: "\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092E\u093F\u0932\u093E\u0928! \u0905\u0924\u094D\u092F\u0927\u093F\u0915 \u0905\u0928\u0941\u0915\u0942\u0932 \u0914\u0930 \u0935\u093F\u0935\u093E\u0939 \u0915\u0940 \u0905\u0928\u0941\u0936\u0902\u0938\u093E \u0915\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964",
        recommendation_medium: "\u092E\u0927\u094D\u092F\u092E \u092E\u093F\u0932\u093E\u0928\u0964 \u0935\u093F\u0935\u093E\u0939 \u0938\u094D\u0935\u0940\u0915\u093E\u0930\u094D\u092F \u0939\u0948 \u092A\u0930\u0902\u0924\u0941 \u0915\u0941\u091B \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0909\u092A\u093E\u092F\u094B\u0902 \u092F\u093E \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940 \u0915\u0947 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0940 \u091C\u093E\u0924\u0940 \u0939\u0948\u0964",
        recommendation_low: "\u0915\u092E \u092E\u093F\u0932\u093E\u0928 \u0905\u0902\u0915\u0964 \u0935\u093F\u0935\u093E\u0939 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0936\u0947\u0937 \u0938\u093E\u0935\u0927\u093E\u0928\u0940, \u0935\u0948\u0926\u093F\u0915 \u0909\u092A\u093E\u092F\u094B\u0902 \u0914\u0930 \u0905\u0928\u0941\u092D\u0935\u0940 \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u0940 \u0938\u0947 \u092A\u0930\u093E\u092E\u0930\u094D\u0936 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u0948\u0964"
      },
      te: {
        nadi_no_dosha: "\u0C28\u0C3E\u0C21\u0C3F \u0C26\u0C4B\u0C37\u0C02 \u0C0F\u0C26\u0C40 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41.",
        nadi_active_no_cancel: "\u0C28\u0C3E\u0C21\u0C3F \u0C26\u0C4B\u0C37\u0C02 \u0C1A\u0C41\u0C30\u0C41\u0C15\u0C41\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F. \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C37\u0C30\u0C24\u0C41\u0C32\u0C41 \u0C0F\u0C35\u0C40 \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41. \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C32 \u0C15\u0C4B\u0C38\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C36\u0C3E\u0C02\u0C24\u0C3F \u0C2A\u0C4D\u0C30\u0C15\u0C4D\u0C30\u0C3F\u0C2F\u0C32 \u0C15\u0C4B\u0C38\u0C02 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C41\u0C21\u0C3F\u0C28\u0C3F \u0C38\u0C02\u0C2A\u0C4D\u0C30\u0C26\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
        nadi_same_rasi_diff_nak: "\u0C07\u0C26\u0C4D\u0C26\u0C30\u0C41 \u0C2D\u0C3E\u0C17\u0C38\u0C4D\u0C35\u0C3E\u0C2E\u0C41\u0C32\u0C41 \u0C12\u0C15\u0C47 \u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C30\u0C3E\u0C36\u0C3F\u0C28\u0C3F \u0C2A\u0C02\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C3E\u0C30\u0C41 \u0C15\u0C3E\u0C28\u0C40 \u0C35\u0C47\u0C30\u0C4D\u0C35\u0C47\u0C30\u0C41 \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C15\u0C32\u0C3F\u0C17\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        nadi_diff_rasi_same_nak: "\u0C35\u0C47\u0C30\u0C4D\u0C35\u0C47\u0C30\u0C41 \u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C30\u0C3E\u0C36\u0C41\u0C32 \u0C17\u0C41\u0C02\u0C21\u0C3E \u0C35\u0C46\u0C33\u0C4D\u0C33\u0C47 \u0C12\u0C15\u0C47 \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C42 \u0C2A\u0C02\u0C1A\u0C41\u0C15\u0C41\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        nadi_same_nak_diff_pada: "\u0C12\u0C15\u0C47 \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C02 \u0C2F\u0C4A\u0C15\u0C4D\u0C15 \u0C35\u0C47\u0C30\u0C4D\u0C35\u0C47\u0C30\u0C41 \u0C2A\u0C3E\u0C26\u0C3E\u0C32\u0C41 (\u0C2A\u0C26\u0C2E\u0C41\u0C32\u0C41) \u0C09\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        nadi_same_nak_lord: "\u0C30\u0C46\u0C02\u0C21\u0C41 \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C3E\u0C32\u0C15\u0C41 \u0C12\u0C15\u0C47 \u0C17\u0C4D\u0C30\u0C39 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C09\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        bhakoot_no_dosha: "\u0C2D\u0C15\u0C42\u0C1F\u0C4D \u0C26\u0C4B\u0C37\u0C02 \u0C0F\u0C26\u0C40 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41.",
        bhakoot_active_no_cancel: "\u0C2D\u0C15\u0C42\u0C1F\u0C4D \u0C26\u0C4B\u0C37\u0C02 \u0C1A\u0C41\u0C30\u0C41\u0C15\u0C41\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F. \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C37\u0C30\u0C24\u0C41\u0C32\u0C41 \u0C0F\u0C35\u0C40 \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41.",
        bhakoot_same_lord: "\u0C30\u0C46\u0C02\u0C21\u0C41 \u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C30\u0C3E\u0C36\u0C41\u0C32\u0C41 \u0C12\u0C15\u0C47 \u0C17\u0C4D\u0C30\u0C39 \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C3F \u0C15\u0C3F\u0C02\u0C26\u0C15\u0C41 \u0C35\u0C38\u0C4D\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        bhakoot_friendly_lords: "\u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C30\u0C3E\u0C36\u0C3F \u0C05\u0C27\u0C3F\u0C2A\u0C24\u0C41\u0C32\u0C41 \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30\u0C02 \u0C2E\u0C3F\u0C24\u0C4D\u0C30\u0C41\u0C32\u0C41 \u0C05\u0C2F\u0C3F\u0C28\u0C02\u0C26\u0C41\u0C28 \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.",
        manglik_non_conflict: "\u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37 \u0C38\u0C02\u0C18\u0C30\u0C4D\u0C37\u0C23 \u0C0F\u0C26\u0C40 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41.",
        manglik_both_manglik: "\u0C2D\u0C3E\u0C17\u0C38\u0C4D\u0C35\u0C3E\u0C2E\u0C41\u0C32\u0C41 \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F\u0C15\u0C40 \u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37\u0C02 \u0C09\u0C02\u0C26\u0C3F. \u0C05\u0C02\u0C26\u0C41\u0C35\u0C32\u0C4D\u0C32 \u0C07\u0C26\u0C3F \u0C2A\u0C30\u0C38\u0C4D\u0C2A\u0C30\u0C02 \u0C30\u0C26\u0C4D\u0C26\u0C2F\u0C3F \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02\u0C17\u0C3E \u0C2E\u0C3E\u0C30\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.",
        manglik_both_non_manglik: "\u0C0E\u0C35\u0C30\u0C3F\u0C15\u0C40 \u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37\u0C02 \u0C32\u0C47\u0C26\u0C41. \u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C2E\u0C48\u0C28 \u0C35\u0C48\u0C35\u0C3E\u0C39\u0C3F\u0C15 \u0C38\u0C3E\u0C2E\u0C30\u0C38\u0C4D\u0C2F\u0C02 \u0C2A\u0C4A\u0C02\u0C26\u0C41\u0C24\u0C3E\u0C30\u0C41.",
        manglik_conflict: "\u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37 \u0C38\u0C02\u0C18\u0C30\u0C4D\u0C37\u0C23 \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C3F\u0C02\u0C26\u0C3F. \u0C12\u0C15\u0C30\u0C3F\u0C15\u0C3F \u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37\u0C02 \u0C09\u0C02\u0C21\u0C17\u0C3E, \u0C2E\u0C30\u0C4A\u0C15\u0C30\u0C3F\u0C15\u0C3F \u0C32\u0C47\u0C26\u0C41. \u0C2A\u0C46\u0C33\u0C4D\u0C32\u0C3F\u0C15\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41 \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C32\u0C41 \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C35\u0C21\u0C02 \u0C36\u0C4D\u0C30\u0C47\u0C2F\u0C38\u0C4D\u0C15\u0C30\u0C02.",
        recommendation_high: "\u0C05\u0C26\u0C4D\u0C2D\u0C41\u0C24\u0C2E\u0C48\u0C28 \u0C2A\u0C4A\u0C02\u0C24\u0C28! \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C0E\u0C02\u0C24\u0C4B \u0C30\u0C3F\u0C15\u0C2E\u0C02\u0C21\u0C4D \u0C1A\u0C47\u0C2F\u0C26\u0C17\u0C3F\u0C28\u0C26\u0C3F.",
        recommendation_medium: "\u0C2E\u0C27\u0C4D\u0C2F\u0C2E \u0C2A\u0C4A\u0C02\u0C24\u0C28. \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C35\u0C1A\u0C4D\u0C1A\u0C41 \u0C15\u0C3E\u0C28\u0C40 \u0C24\u0C17\u0C3F\u0C28 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F \u0C38\u0C32\u0C39\u0C3E \u0C05\u0C35\u0C38\u0C30\u0C02.",
        recommendation_low: "\u0C24\u0C15\u0C4D\u0C15\u0C41\u0C35 \u0C2A\u0C4A\u0C02\u0C24\u0C28 \u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C32\u0C41. \u0C35\u0C3F\u0C35\u0C3E\u0C39\u0C02 \u0C35\u0C3F\u0C37\u0C2F\u0C02\u0C32\u0C4B \u0C24\u0C17\u0C3F\u0C28 \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C28\u0C3F\u0C2A\u0C41\u0C23\u0C41\u0C32\u0C48\u0C28 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C41\u0C21\u0C3F \u0C38\u0C32\u0C39\u0C3E \u0C24\u0C2A\u0C4D\u0C2A\u0C28\u0C3F\u0C38\u0C30\u0C3F."
      },
      ta: {
        nadi_no_dosha: "\u0BA8\u0BBE\u0B9F\u0BBF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
        nadi_active_no_cancel: "\u0BA8\u0BBE\u0B9F\u0BBF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BA9 \u0BA8\u0BBF\u0BAA\u0BA8\u0BCD\u0BA4\u0BA9\u0BC8\u0B95\u0BB3\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0BAA\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
        nadi_same_rasi_diff_nak: "\u0B87\u0BB0\u0BC1 \u0B95\u0BC2\u0B9F\u0BCD\u0B9F\u0BBE\u0BB3\u0BBF\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC7 \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BB0\u0BBE\u0B9A\u0BBF\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0B95\u0BBF\u0BB1\u0BBE\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B86\u0BA9\u0BBE\u0BB2\u0BCD \u0BB5\u0BC6\u0BB5\u0BCD\u0BB5\u0BC7\u0BB1\u0BC1 \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        nadi_diff_rasi_same_nak: "\u0BB5\u0BC6\u0BB5\u0BCD\u0BB5\u0BC7\u0BB1\u0BC1 \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BB0\u0BBE\u0B9A\u0BBF\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0BB0\u0BB5\u0BBF\u0BAF\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC7 \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0BAE\u0BCD \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        nadi_same_nak_diff_pada: "\u0B92\u0BB0\u0BC7 \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BA9\u0BCD \u0BB5\u0BC6\u0BB5\u0BCD\u0BB5\u0BC7\u0BB1\u0BC1 \u0BAA\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        nadi_same_nak_lord: "\u0B87\u0BB0\u0BC1 \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC7 \u0B95\u0BBF\u0BB0\u0B95 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0BB5\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        bhakoot_no_dosha: "\u0BAA\u0B95\u0BC2\u0B9F\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
        bhakoot_active_no_cancel: "\u0BAA\u0B95\u0BC2\u0B9F\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BB1\u0BCD\u0B95\u0BBE\u0BA9 \u0BA8\u0BBF\u0BAA\u0BA8\u0BCD\u0BA4\u0BA9\u0BC8\u0B95\u0BB3\u0BCD \u0BAA\u0BC2\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
        bhakoot_same_lord: "\u0B87\u0BB0\u0BC1 \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BB0\u0BBE\u0B9A\u0BBF\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC7 \u0B95\u0BBF\u0BB0\u0B95 \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF\u0BAF\u0BC8\u0BAA\u0BCD \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1 \u0B95\u0BCA\u0BB3\u0BCD\u0BB5\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        bhakoot_friendly_lords: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BB0\u0BBE\u0B9A\u0BBF \u0B85\u0BA4\u0BBF\u0BAA\u0BA4\u0BBF\u0B95\u0BB3\u0BCD \u0BAA\u0BB0\u0BB8\u0BCD\u0BAA\u0BB0\u0BAE\u0BCD \u0BA8\u0B9F\u0BCD\u0BAA\u0BC1 \u0B95\u0BBF\u0BB0\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
        manglik_non_conflict: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7 \u0BAE\u0BCB\u0BA4\u0BB2\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BB1\u0BBF\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
        manglik_both_manglik: "\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0B87\u0BA4\u0BC1 \u0B87\u0BAF\u0BB1\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0B95\u0BB5\u0BC7 \u0BA4\u0BCB\u0BB7 \u0BA8\u0BBF\u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0BAA\u0BC6\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.",
        manglik_both_non_manglik: "\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA \u0B85\u0BAE\u0BC8\u0BA4\u0BBF.",
        manglik_conflict: "\u0B92\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0BA4\u0BCB\u0BB7 \u0BA8\u0BBF\u0BB5\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BBF \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD.",
        recommendation_high: "\u0B9A\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD! \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0B95\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BC1\u0BB0\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.",
        recommendation_medium: "\u0BAE\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF\u0BAE \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD. \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9C\u0BCB\u0BA4\u0BBF\u0B9F \u0B86\u0BB2\u0BCB\u0B9A\u0BA9\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB2\u0BBE\u0BAE\u0BCD.",
        recommendation_low: "\u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD. \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BC2\u0B9F\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0BB5\u0BA9\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8, \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9C\u0BCB\u0BA4\u0BBF\u0B9F \u0B86\u0BB2\u0BCB\u0B9A\u0BA9\u0BC8 \u0B85\u0BB5\u0B9A\u0BBF\u0BAF\u0BAE\u0BCD."
      },
      kn: {
        nadi_no_dosha: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC1 \u0CA8\u0CBE\u0CA1\u0CBF \u0CA6\u0CCB\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
        nadi_active_no_cancel: "\u0CA8\u0CBE\u0CA1\u0CBF \u0CA6\u0CCB\u0CB7 \u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB0\u0CA6\u0CCD\u0CA6\u0CA4\u0CBF \u0CB7\u0CB0\u0CA4\u0CCD\u0CA4\u0CC1\u0C97\u0CB3\u0CC1 \u0C85\u0CA8\u0CCD\u0CB5\u0CAF\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
        nadi_same_rasi_diff_nak: "\u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CC1 \u0CAA\u0CBE\u0CB2\u0CC1\u0CA6\u0CBE\u0CB0\u0CB0\u0CC1 \u0C92\u0C82\u0CA6\u0CC7 \u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CB0\u0CBE\u0CB6\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CBE\u0CB0\u0CC6 \u0C86\u0CA6\u0CB0\u0CC6 \u0CB5\u0CBF\u0CAD\u0CBF\u0CA8\u0CCD\u0CA8 \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB0\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        nadi_diff_rasi_same_nak: "\u0CB5\u0CBF\u0CAD\u0CBF\u0CA8\u0CCD\u0CA8 \u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CB0\u0CBE\u0CB6\u0CBF\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CB0\u0CA1\u0CBF\u0CB0\u0CC1\u0CB5 \u0C92\u0C82\u0CA6\u0CC7 \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CC2 \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        nadi_same_nak_diff_pada: "\u0C92\u0C82\u0CA6\u0CC7 \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0CA6 \u0CB5\u0CBF\u0CB5\u0CBF\u0CA7 \u0CAA\u0CBE\u0CA6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB0\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        nadi_same_nak_lord: "\u0C8E\u0CB0\u0CA1\u0CC2 \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0\u0C97\u0CB3\u0CC1 \u0C92\u0C82\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CB9 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        bhakoot_no_dosha: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAD\u0C95\u0CC2\u0C9F\u0CCD \u0CA6\u0CCB\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
        bhakoot_active_no_cancel: "\u0CAD\u0C95\u0CC2\u0C9F\u0CCD \u0CA6\u0CCB\u0CB7 \u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CB0\u0CA6\u0CCD\u0CA6\u0CA4\u0CBF \u0CB7\u0CB0\u0CA4\u0CCD\u0CA4\u0CC1\u0C97\u0CB3\u0CC1 \u0C85\u0CA8\u0CCD\u0CB5\u0CAF\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
        bhakoot_same_lord: "\u0C8E\u0CB0\u0CA1\u0CC2 \u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CB0\u0CBE\u0CB6\u0CBF\u0C97\u0CB3\u0CC1 \u0C92\u0C82\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CB9 \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB0\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        bhakoot_friendly_lords: "\u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CB0\u0CBE\u0CB6\u0CBF\u0CAF \u0C85\u0CA7\u0CBF\u0CAA\u0CA4\u0CBF\u0C97\u0CB3\u0CC1 \u0CAA\u0CB0\u0CB8\u0CCD\u0CAA\u0CB0 \u0CAE\u0CBF\u0CA4\u0CCD\u0CB0\u0CB0\u0CBE\u0C97\u0CBF\u0CB0\u0CC1\u0CB5 \u0C95\u0CBE\u0CB0\u0CA3 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        manglik_non_conflict: "\u0C95\u0CC1\u0C9C \u0CA6\u0CCB\u0CB7 \u0CB8\u0C82\u0C98\u0CB0\u0CCD\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
        manglik_both_manglik: "\u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CBF\u0C97\u0CC2 \u0C95\u0CC1\u0C9C \u0CA6\u0CCB\u0CB7\u0CB5\u0CBF\u0CA6\u0CC6. \u0CA6\u0CCB\u0CB7\u0CB5\u0CC1 \u0CA4\u0CBE\u0CA8\u0CBE\u0C97\u0CBF\u0CAF\u0CC7 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0CB5\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
        manglik_both_non_manglik: "\u0C87\u0CAC\u0CCD\u0CAC\u0CB0\u0CBF\u0C97\u0CC2 \u0C95\u0CC1\u0C9C \u0CA6\u0CCB\u0CB7\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2. \u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0C95\u0CCC\u0C9F\u0CC1\u0C82\u0CAC\u0CBF\u0C95 \u0CB8\u0CBE\u0CAE\u0CB0\u0CB8\u0CCD\u0CAF.",
        manglik_conflict: "\u0C92\u0CAC\u0CCD\u0CAC\u0CB0\u0CBF\u0C97\u0CC6 \u0CAE\u0CBE\u0CA4\u0CCD\u0CB0 \u0C95\u0CC1\u0C9C \u0CA6\u0CCB\u0CB7\u0CB5\u0CBF\u0CA6\u0CC6. \u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0C97\u0CC6 \u0CAE\u0CCA\u0CA6\u0CB2\u0CC1 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CB6\u0CBE\u0C82\u0CA4\u0CBF \u0CAA\u0CC2\u0C9C\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF.",
        recommendation_high: "\u0C89\u0CA4\u0CCD\u0CA4\u0CAE \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6! \u0CAE\u0CA6\u0CC1\u0CB5\u0CC6\u0C97\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB6\u0CBF\u0CAB\u0CBE\u0CB0\u0CB8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
        recommendation_medium: "\u0CAE\u0CA7\u0CCD\u0CAF\u0CAE \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6. \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C9C\u0CCD\u0CAF\u0CCB\u0CA4\u0CBF\u0CB7\u0CCD\u0CAF \u0CB8\u0CB2\u0CB9\u0CC6\u0CAF\u0CCA\u0C82\u0CA6\u0CBF\u0C97\u0CC6 \u0CAE\u0CC1\u0C82\u0CA6\u0CC1\u0CB5\u0CB0\u0CC6\u0CAF\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
        recommendation_low: "\u0C95\u0CA1\u0CBF\u0CAE\u0CC6 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C85\u0C82\u0C95\u0C97\u0CB3\u0CC1. \u0CB5\u0CBF\u0CB5\u0CBE\u0CB9\u0CA6 \u0CAE\u0CCA\u0CA6\u0CB2\u0CC1 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4 \u0CB5\u0CC8\u0CA6\u0CBF\u0C95 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CB0\u0CBF\u0CA3\u0CBF\u0CA4 \u0C9C\u0CCD\u0CAF\u0CCB\u0CA4\u0CBF\u0CB7\u0CBF\u0C97\u0CB3 \u0CB8\u0CB2\u0CB9\u0CC6 \u0C85\u0C97\u0CA4\u0CCD\u0CAF."
      }
    };
    const activeT = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const bNadiIdx = NAKSHATRA_NADIS[bNak];
    const gNadiIdx = NAKSHATRA_NADIS[gNak];
    const isNadiDoshaPresent = bNadiIdx === gNadiIdx;
    let isNadiCancelled = false;
    let nadiCancellationReason = activeT.nadi_no_dosha;
    if (isNadiDoshaPresent) {
      nadiCancellationReason = activeT.nadi_active_no_cancel;
      if (bRasi === gRasi && bNak !== gNak) {
        isNadiCancelled = true;
        nadiCancellationReason = activeT.nadi_same_rasi_diff_nak;
      } else if (bRasi !== gRasi && bNak === gNak) {
        isNadiCancelled = true;
        nadiCancellationReason = activeT.nadi_diff_rasi_same_nak;
      } else if (bNak === gNak) {
        const bPada = boyPanchang.planets.find((p) => p.id === "moon")?.pada || 1;
        const gPada = girlPanchang.planets.find((p) => p.id === "moon")?.pada || 1;
        if (bPada !== gPada) {
          isNadiCancelled = true;
          nadiCancellationReason = activeT.nadi_same_nak_diff_pada;
        }
      } else {
        const bLord = boyPanchang.nakshatra.lord || "Moon";
        const gLord = girlPanchang.nakshatra.lord || "Moon";
        if (bLord === gLord) {
          isNadiCancelled = true;
          nadiCancellationReason = activeT.nadi_same_nak_lord;
        }
      }
    }
    const rasiDiff = (gRasi - bRasi + 12) % 12;
    const isBhakootDoshaPresent = [1, 4, 5, 7, 8, 11].includes(rasiDiff);
    let isBhakootCancelled = false;
    let bhakootCancellationReason = activeT.bhakoot_no_dosha;
    if (isBhakootDoshaPresent) {
      bhakootCancellationReason = activeT.bhakoot_active_no_cancel;
      const bLordName = RASHI_LORDS[bRasi];
      const gLordName = RASHI_LORDS[gRasi];
      if (bLordName === gLordName) {
        isBhakootCancelled = true;
        bhakootCancellationReason = activeT.bhakoot_same_lord;
      } else {
        const bFriends = LORD_FRIENDS[bLordName]?.friends || [];
        const gFriends = LORD_FRIENDS[gLordName]?.friends || [];
        const bToG_friend = bFriends.includes(gLordName);
        const gToB_friend = gFriends.includes(bLordName);
        if (bToG_friend && gToB_friend) {
          isBhakootCancelled = true;
          bhakootCancellationReason = activeT.bhakoot_friendly_lords;
        }
      }
    }
    const ashtaKoota = resultData.ashtaKoota;
    const varnaScore = ashtaKoota.find((k) => k.koota === "Varna")?.obtainedPoints ?? 0;
    const vashyaScore = ashtaKoota.find((k) => k.koota === "Vashya")?.obtainedPoints ?? 0;
    const taraScore = ashtaKoota.find((k) => k.koota === "Tara")?.obtainedPoints ?? 0;
    const yoniScore = ashtaKoota.find((k) => k.koota === "Yoni")?.obtainedPoints ?? 0;
    const maitriScore = ashtaKoota.find((k) => k.koota === "GrahaMaitri")?.obtainedPoints ?? 0;
    const ganaScore = ashtaKoota.find((k) => k.koota === "Gana")?.obtainedPoints ?? 0;
    const bhakootScore = ashtaKoota.find((k) => k.koota === "Bhakoot")?.obtainedPoints ?? 0;
    const nadiScore = ashtaKoota.find((k) => k.koota === "Nadi")?.obtainedPoints ?? 0;
    const boyMoon = boyPanchang.planets.find((p) => p.id === "moon");
    const girlMoon = girlPanchang.planets.find((p) => p.id === "moon");
    const boyProfile = {
      gender: "Male",
      nakshatra: boyMoon.nakshatra.name.en,
      nakshatra_localized: boyMoon.nakshatra.name.en,
      rasi: boyMoon.rasi.name.en,
      rasi_localized: boyMoon.rasi.name.en,
      pada: boyMoon.pada,
      rasi_lord: RASHI_LORDS[bRasi],
      is_manglik: resultData.doshaMatching.boyDoshas.some((d) => d.includes("Manglik") || d.includes("\u092E\u093E\u0902\u0917\u0932\u093F\u0915") || d.includes("\u0C2E\u0C3E\u0C02\u0C17\u0C33\u0C3F\u0C15"))
    };
    const girlProfile = {
      gender: "Female",
      nakshatra: girlMoon.nakshatra.name.en,
      nakshatra_localized: girlMoon.nakshatra.name.en,
      rasi: girlMoon.rasi.name.en,
      rasi_localized: girlMoon.rasi.name.en,
      pada: girlMoon.pada,
      rasi_lord: RASHI_LORDS[gRasi],
      is_manglik: resultData.doshaMatching.girlDoshas.some((d) => d.includes("Manglik") || d.includes("\u092E\u093E\u0902\u0917\u0932\u093F\u0915") || d.includes("\u0C2E\u0C3E\u0C02\u0C17\u0C33\u0C3F\u0C15"))
    };
    let manglikAnalysisText = activeT.manglik_both_non_manglik;
    if (boyProfile.is_manglik && girlProfile.is_manglik) {
      manglikAnalysisText = activeT.manglik_both_manglik;
    } else if (boyProfile.is_manglik || girlProfile.is_manglik) {
      manglikAnalysisText = activeT.manglik_conflict;
    }
    let compatibilityRecommendation = activeT.recommendation_medium;
    if (resultData.marriageScore >= 22) {
      compatibilityRecommendation = activeT.recommendation_high;
    } else if (resultData.marriageScore < 18) {
      compatibilityRecommendation = activeT.recommendation_low;
    }
    const premiumRemedies = [];
    if (resultData.marriageScore < 20) {
      if (lang === "te") {
        premiumRemedies.push("\u0C26\u0C02\u0C2A\u0C24\u0C41\u0C32\u0C41 \u0C28\u0C3F\u0C24\u0C4D\u0C2F\u0C02 \u0C09\u0C2E\u0C3E \u0C2E\u0C39\u0C47\u0C36\u0C4D\u0C35\u0C30 \u0C38\u0C4D\u0C24\u0C4B\u0C24\u0C4D\u0C30\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C32\u0C15\u0C4D\u0C37\u0C4D\u0C2E\u0C40 \u0C28\u0C3E\u0C30\u0C3E\u0C2F\u0C23 \u0C1C\u0C2A\u0C02 \u0C1A\u0C47\u0C2F\u0C21\u0C02 \u0C35\u0C3F\u0C36\u0C47\u0C37 \u0C2B\u0C32\u0C3F\u0C24\u0C3E\u0C28\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.");
      } else if (lang === "hi") {
        premiumRemedies.push("\u0926\u092E\u094D\u092A\u0924\u093F \u0915\u094B \u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u0917\u094C\u0930\u0940-\u0936\u0902\u0915\u0930 \u0924\u0925\u093E \u0909\u092E\u093E-\u092E\u0939\u0947\u0936\u094D\u0935\u0930 \u0938\u094D\u0924\u094B\u0924\u094D\u0930 \u0915\u093E \u092A\u093E\u0920 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u093F\u090F\u0964");
      } else if (lang === "ta") {
        premiumRemedies.push("\u0BA4\u0BAE\u0BCD\u0BAA\u0BA4\u0BBF\u0BAF\u0BBF\u0BA9\u0BB0\u0BCD \u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0B89\u0BAE\u0BBE \u0BAE\u0B95\u0BC7\u0BB8\u0BCD\u0BB5\u0BB0 \u0BB8\u0BCD\u0BA4\u0BCB\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB2\u0B9F\u0BCD\u0B9A\u0BC1\u0BAE\u0BBF \u0BA8\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3 \u0BAE\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0BAA\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1 \u0B89\u0B95\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1.");
      } else if (lang === "kn") {
        premiumRemedies.push("\u0CA6\u0C82\u0CAA\u0CA4\u0CBF\u0C97\u0CB3\u0CC1 \u0CA8\u0CBF\u0CA4\u0CCD\u0CAF\u0CB5\u0CC2 \u0C89\u0CAE\u0CBE \u0CAE\u0CB9\u0CC7\u0CB6\u0CCD\u0CB5\u0CB0 \u0CB8\u0CCD\u0CA4\u0CCB\u0CA4\u0CCD\u0CB0 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CC0 \u0CA8\u0CBE\u0CB0\u0CBE\u0CAF\u0CA3 \u0C9C\u0CAA\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAE\u0CBE\u0CA1\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0C89\u0CA4\u0CCD\u0CA4\u0CAE.");
      } else {
        premiumRemedies.push("Couple should regularly chant Uma Maheshwara Stotram and Lakshmi Narayana Mantra for harmony.");
      }
    }
    if (isNadiDoshaPresent && !isNadiCancelled) {
      if (lang === "te") {
        premiumRemedies.push("\u0C0F\u0C15\u0C28\u0C3E\u0C21\u0C3F \u0C26\u0C4B\u0C37 \u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C23\u0C15\u0C41 \u0C2E\u0C39\u0C3E \u0C2E\u0C43\u0C24\u0C4D\u0C2F\u0C41\u0C02\u0C1C\u0C2F \u0C39\u0C35\u0C28\u0C02 \u0C32\u0C47\u0C26\u0C3E \u0C36\u0C3F\u0C35\u0C3E\u0C32\u0C2F \u0C1C\u0C32\u0C3E\u0C2D\u0C3F\u0C37\u0C47\u0C15\u0C02 \u0C36\u0C4D\u0C30\u0C47\u0C37\u0C4D\u0C20\u0C2E\u0C48\u0C28\u0C26\u0C3F.");
        premiumRemedies.push("\u0C2A\u0C47\u0C26 \u0C2A\u0C4D\u0C30\u0C1C\u0C32\u0C15\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C2C\u0C4D\u0C30\u0C3E\u0C39\u0C4D\u0C2E\u0C23\u0C41\u0C32\u0C15\u0C41 \u0C2A\u0C2A\u0C4D\u0C2A\u0C41 \u0C27\u0C3E\u0C28\u0C4D\u0C2F\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C46\u0C02\u0C21\u0C3F \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.");
      } else if (lang === "hi") {
        premiumRemedies.push("\u090F\u0915\u0928\u093E\u0921\u093C\u0940 \u0926\u094B\u0937 \u0928\u093F\u0935\u093E\u0930\u0923 \u0939\u0947\u0924\u0941 \u092E\u0939\u093E\u092E\u0943\u0924\u094D\u092F\u0941\u0902\u091C\u092F \u092E\u0902\u0924\u094D\u0930 \u0915\u093E \u0938\u0935\u093E \u0932\u093E\u0916 \u091C\u093E\u092A \u0905\u0925\u0935\u093E \u0936\u093F\u0935 \u092E\u0902\u0926\u093F\u0930 \u092E\u0947\u0902 \u0930\u0941\u0926\u094D\u0930\u093E\u092D\u093F\u0937\u0947\u0915 \u0915\u0930\u093E\u090F\u0902\u0964");
        premiumRemedies.push("\u091C\u0930\u0942\u0930\u0924\u092E\u0902\u0926\u094B\u0902 \u0915\u094B \u0938\u094D\u0935\u0930\u094D\u0923, \u0905\u0928\u094D\u0928 \u0905\u0925\u0935\u093E \u0915\u093E\u0902\u0938\u0947 \u0915\u0947 \u092A\u093E\u0924\u094D\u0930 \u0915\u093E \u0926\u093E\u0928 \u0915\u0930\u0947\u0902\u0964");
      } else if (lang === "ta") {
        premiumRemedies.push("\u0BAE\u0B95\u0BBE \u0BAE\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BAF\u0BC1\u0B9E\u0BCD\u0B9A\u0BAF \u0BB9\u0BCB\u0BAE\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B9A\u0BBF\u0BB5\u0BA9\u0BCD \u0B95\u0BCB\u0BB5\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0BB0\u0BC1\u0BA4\u0BCD\u0BB0\u0BBE\u0BAA\u0BBF\u0BB7\u0BC7\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1 \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0B95\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1.");
        premiumRemedies.push("\u0B8F\u0BB4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA4\u0BBE\u0BA9\u0BBF\u0BAF\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0BAA\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0B9F\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BBE\u0BA9\u0BAE\u0BBE\u0B95 \u0BB5\u0BB4\u0B99\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.");
      } else if (lang === "kn") {
        premiumRemedies.push("\u0C8F\u0C95\u0CA8\u0CBE\u0CA1\u0CBF \u0CA6\u0CCB\u0CB7 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C95\u0CCD\u0C95\u0CC6 \u0CAE\u0CB9\u0CBE \u0CAE\u0CC3\u0CA4\u0CCD\u0CAF\u0CC1\u0C82\u0C9C\u0CAF \u0CB9\u0CCB\u0CAE \u0C85\u0CA5\u0CB5\u0CBE \u0CB6\u0CBF\u0CB5\u0CA8\u0CBF\u0C97\u0CC6 \u0CB0\u0CC1\u0CA6\u0CCD\u0CB0\u0CBE\u0CAD\u0CBF\u0CB7\u0CC7\u0C95 \u0CAE\u0CBE\u0CA1\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0CB6\u0CCD\u0CB0\u0CC7\u0CAF\u0CB8\u0CCD\u0C95\u0CB0.");
        premiumRemedies.push("\u0CAC\u0CA1\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 \u0C85\u0CA5\u0CB5\u0CBE \u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CA3\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0CA6\u0CC7\u0CB5\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0C97\u0CB3\u0CBF\u0C97\u0CC6 \u0CA7\u0CBE\u0CA8\u0CCD\u0CAF \u0CB9\u0CBE\u0C97\u0CC2 \u0CAC\u0CC6\u0CB3\u0CCD\u0CB3\u0CBF\u0CAF \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF.");
      } else {
        premiumRemedies.push("Perform Maha Mrityunjaya Homa or daily water abhishekam to Lord Shiva to calm biological/genetic polarities.");
        premiumRemedies.push("Donate silver ornaments, grains, or feed cows on Mondays.");
      }
    }
    if (isBhakootDoshaPresent && !isBhakootCancelled) {
      if (lang === "te") {
        premiumRemedies.push("\u0C2D\u0C15\u0C42\u0C1F\u0C4D \u0C26\u0C4B\u0C37 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C30\u0C4D\u0C25\u0C02 \u0C26\u0C02\u0C2A\u0C24\u0C41\u0C32\u0C41 \u0C2A\u0C4D\u0C30\u0C24\u0C3F \u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02 \u0C36\u0C3F\u0C35\u0C3E\u0C30\u0C3E\u0C27\u0C28 \u0C1A\u0C47\u0C38\u0C3F, \u0C2C\u0C3F\u0C2F\u0C4D\u0C2F\u0C02 \u0C26\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C3E\u0C32\u0C3F.");
      } else if (lang === "hi") {
        premiumRemedies.push("\u092D\u0915\u0942\u091F \u0926\u094B\u0937 \u0915\u0940 \u0936\u093E\u0902\u0924\u093F \u0939\u0947\u0924\u0941 \u091A\u0902\u0926\u094D\u0930 \u0926\u0947\u0935 \u0915\u0940 \u0906\u0930\u093E\u0927\u0928\u093E \u0915\u0930\u0947\u0902 \u0924\u0925\u093E \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u0938\u094B\u092E\u0935\u093E\u0930 \u0915\u094B \u0917\u093E\u092F \u0915\u094B \u092E\u0940\u0920\u0940 \u0930\u094B\u091F\u0940 \u0916\u093F\u0932\u093E\u090F\u0902\u0964");
      } else if (lang === "ta") {
        premiumRemedies.push("\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BAA\u0B95\u0BB5\u0BBE\u0BA9\u0BC8 \u0BB5\u0BB4\u0BBF\u0BAA\u0B9F\u0BC1\u0BB5\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0B9A\u0BC1\u0BB5\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0B87\u0BA9\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BB4\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BC1 \u0B9A\u0BBF\u0BB1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BB5\u0BBE\u0BAF\u0BCD\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1.");
      } else if (lang === "kn") {
        premiumRemedies.push("\u0CAD\u0C95\u0CC2\u0C9F\u0CCD \u0CA6\u0CCB\u0CB7 \u0CA8\u0CBF\u0CB5\u0CBE\u0CB0\u0CA3\u0CC6\u0C97\u0CC6 \u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0 \u0CA6\u0CBF\u0CA8\u0CA6\u0C82\u0CA6\u0CC1 \u0CB6\u0CBF\u0CB5\u0CA8 \u0C86\u0CB0\u0CBE\u0CA7\u0CA8\u0CC6 \u0CAE\u0CBE\u0CA1\u0CBF \u0C85\u0C95\u0CCD\u0C95\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA6\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF.");
      } else {
        premiumRemedies.push("Observe fasting on Mondays or chant Chandra Beej Mantra for mental and financial stability.");
      }
    }
    if (boyProfile.is_manglik !== girlProfile.is_manglik) {
      if (lang === "te") {
        premiumRemedies.push("\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C26\u0C41\u0C30\u0C4D\u0C17\u0C3E \u0C26\u0C47\u0C35\u0C3F \u0C06\u0C30\u0C3E\u0C27\u0C28 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C39\u0C28\u0C41\u0C2E\u0C3E\u0C28\u0C4D \u0C1A\u0C3E\u0C32\u0C40\u0C38\u0C3E \u0C2A\u0C1F\u0C3F\u0C02\u0C1A\u0C21\u0C02 \u0C2E\u0C02\u0C17\u0C33 \u0C26\u0C4B\u0C37 \u0C2A\u0C4D\u0C30\u0C2D\u0C3E\u0C35\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C24\u0C17\u0C4D\u0C17\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F.");
      } else if (lang === "hi") {
        premiumRemedies.push("\u092E\u0902\u0917\u0932\u0935\u093E\u0930 \u0915\u094B \u0938\u0941\u0902\u0926\u0930\u0915\u093E\u0902\u0921 \u0915\u093E \u092A\u093E\u0920 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0939\u0928\u0941\u092E\u093E\u0928 \u092E\u0902\u0926\u093F\u0930 \u092E\u0947\u0902 \u0932\u093E\u0932 \u0938\u093F\u0902\u0926\u0942\u0930 \u0924\u0925\u093E \u092C\u0942\u0902\u0926\u0940 \u0905\u0930\u094D\u092A\u093F\u0924 \u0915\u0930\u0947\u0902\u0964");
      } else if (lang === "ta") {
        premiumRemedies.push("\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BA4\u0BC1\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BC8 \u0BB5\u0BB4\u0BBF\u0BAA\u0BBE\u0B9F\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0BA9\u0BC1\u0BAE\u0BA9\u0BCD \u0B9A\u0BBE\u0BB2\u0BC0\u0B9A\u0BBE \u0BAA\u0BBE\u0BB0\u0BBE\u0BAF\u0BA3\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BB5\u0BA4\u0BC1 \u0BAA\u0BB2\u0BA9\u0BCD \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD.");
      } else if (lang === "kn") {
        premiumRemedies.push("\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0 \u0CA6\u0CBF\u0CA8\u0C97\u0CB3\u0C82\u0CA6\u0CC1 \u0CA6\u0CC1\u0CB0\u0CCD\u0C97\u0CC6\u0CAF \u0C86\u0CB0\u0CBE\u0CA7\u0CA8\u0CC6 \u0CB9\u0CBE\u0C97\u0CC2 \u0CB9\u0CA8\u0CC1\u0CAE\u0CBE\u0CA8\u0CCD \u0C9A\u0CBE\u0CB2\u0CC0\u0CB8\u0CBE \u0CAA\u0CA0\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0CAE\u0C82\u0C97\u0CB2 \u0CA6\u0CCB\u0CB7 \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5 \u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0CAF\u0CBE\u0C97\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1.");
      } else {
        premiumRemedies.push("Recite Sunderkand and Hanuman Chalisa on Tuesdays. Offer red lentils and saffron at a Hanuman Temple.");
      }
    }
    if (premiumRemedies.length === 0) {
      if (lang === "te") {
        premiumRemedies.push("\u0C08 \u0C15\u0C32\u0C2F\u0C3F\u0C15 \u0C36\u0C41\u0C2D\u0C2A\u0C4D\u0C30\u0C26\u0C2E\u0C48\u0C28\u0C26\u0C3F. \u0C07\u0C26\u0C4D\u0C26\u0C30\u0C42 \u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C2A\u0C4D\u0C30\u0C24\u0C4D\u0C2F\u0C47\u0C15 \u0C2A\u0C30\u0C3F\u0C39\u0C3E\u0C30\u0C3E\u0C32\u0C41 \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C38\u0C02\u0C24\u0C4B\u0C37\u0C02\u0C17\u0C3E \u0C2E\u0C41\u0C02\u0C26\u0C21\u0C41\u0C17\u0C41 \u0C35\u0C47\u0C2F\u0C35\u0C1A\u0C4D\u0C1A\u0C41.");
      } else if (lang === "hi") {
        premiumRemedies.push("\u092F\u0939 \u090F\u0915 \u0936\u0941\u092D \u092E\u093F\u0932\u093E\u0928 \u0939\u0948\u0964 \u0915\u093F\u0938\u0940 \u0935\u093F\u0936\u0947\u0937 \u0935\u0948\u0926\u093F\u0915 \u0936\u093E\u0902\u0924\u093F \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948; \u092A\u094D\u0930\u0938\u0928\u094D\u0928\u091A\u093F\u0924\u094D\u0924 \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u091C\u0940\u0935\u0928 \u0915\u0940 \u0936\u0941\u092D\u0915\u093E\u092E\u0928\u093E\u090F\u0902\u0964");
      } else if (lang === "ta") {
        premiumRemedies.push("\u0B87\u0BA8\u0BCD\u0BA4 \u0BAA\u0BCA\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD \u0B9A\u0BBF\u0BB1\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BA4\u0BBF\u0BB0\u0BC1\u0BAE\u0BA3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0B8E\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBF\u0BA4\u0BAE\u0BBE\u0BA9 \u0B9A\u0BBF\u0BB1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAA\u0BB0\u0BBF\u0B95\u0BBE\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.");
      } else if (lang === "kn") {
        premiumRemedies.push("\u0C88 \u0CAE\u0CB9\u0CCB\u0CA4\u0CCD\u0CB8\u0CB5 \u0CB9\u0CCA\u0C82\u0CA6\u0CBE\u0CA3\u0CBF\u0C95\u0CC6 \u0C85\u0CA4\u0CCD\u0CAF\u0C82\u0CA4 \u0CB8\u0CC1\u0C82\u0CA6\u0CB0\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB5\u0CBF\u0CB6\u0CC7\u0CB7 \u0CA6\u0CCB\u0CB7 \u0CAA\u0CB0\u0CBF\u0CB9\u0CBE\u0CB0\u0C97\u0CB3 \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.");
      } else {
        premiumRemedies.push("This is an auspicious, highly harmonious match. No special remedies are mathematically required.");
      }
    }
    const responsePayload = {
      success: true,
      match_score: resultData.marriageScore,
      match_result_data: {
        "Varna Score": varnaScore,
        "Vashya Score": vashyaScore,
        "Tara Score": taraScore,
        "Yoni Score": yoniScore,
        "Graha Mairti Score": maitriScore,
        // Keep legacy typo compatibility
        "Graha Maitri Score": maitriScore,
        "Gana Score": ganaScore,
        "Bhakoot Score": bhakootScore,
        "Nadi Score": nadiScore,
        varna_score: varnaScore,
        vashya_score: vashyaScore,
        tara_score: taraScore,
        yoni_score: yoniScore,
        graha_maitri_score: maitriScore,
        gana_score: ganaScore,
        bhakoot_score: bhakootScore,
        nadi_score: nadiScore,
        varna: varnaScore,
        vashya: vashyaScore,
        tara: taraScore,
        yoni: yoniScore,
        graha_maitri: maitriScore,
        gana: ganaScore,
        bhakoot: bhakootScore,
        nadi: nadiScore,
        dosha_exceptions: {
          nadi_dosha_cancelled: isNadiCancelled,
          nadi_cancellation_reason: nadiCancellationReason,
          bhakoot_dosha_cancelled: isBhakootCancelled,
          bhakoot_cancellation_reason: bhakootCancellationReason
        }
      },
      premium_data: {
        language_processed: lang,
        match_percentage: resultData.overallPercentage,
        compatibility_recommendation: compatibilityRecommendation,
        reports_summary: resultData.report,
        compatibility_score_out_of_100: resultData.compatibilityScore,
        temperament_score_out_of_36: resultData.marriageScore,
        astro_profiles: {
          boy: boyProfile,
          girl: girlProfile
        },
        manglik_analysis: {
          boy_is_manglik: boyProfile.is_manglik,
          girl_is_manglik: girlProfile.is_manglik,
          has_conflict: resultData.doshaMatching.hasManglikDoshaConflict,
          is_cancelled: resultData.doshaMatching.isCancelled,
          cancellation_details: resultData.doshaMatching.cancellationDetails || "",
          detailed_report: manglikAnalysisText
        },
        koota_category_ratings: {
          love_and_intimacy: {
            rating_score: yoniScore,
            max_score: 4,
            status: yoniScore >= 3 ? "Excellent" : yoniScore >= 1.5 ? "Good" : "Average",
            category: "Yoni Match"
          },
          progeny_and_health: {
            rating_score: nadiScore,
            max_score: 8,
            status: nadiScore === 8 ? "Excellent" : isNadiCancelled ? "Good (Deflected)" : "Requires Attention",
            category: "Nadi Match"
          },
          prosperity_and_finance: {
            rating_score: bhakootScore,
            max_score: 7,
            status: bhakootScore === 7 ? "Excellent" : isBhakootCancelled ? "Good (Deflected)" : "Requires Attention",
            category: "Bhakoot Match"
          },
          social_and_cultural: {
            rating_score: varnaScore + vashyaScore,
            max_score: 3,
            status: varnaScore + vashyaScore >= 2 ? "High" : "Moderate",
            category: "Varna & Vashya"
          },
          temperament_harmony: {
            rating_score: ganaScore + maitriScore,
            max_score: 11,
            status: ganaScore + maitriScore >= 8 ? "Exceptional" : ganaScore + maitriScore >= 5 ? "Amicable" : "Adjustments Needed",
            category: "Gana & Graha Maitri"
          }
        },
        south_indian_10_poruthams: resultData.southIndianPorutham,
        expert_remedial_measures: premiumRemedies
      }
    };
    res.json(responsePayload);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/muhurta", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    const activities = [
      { act: "Marriage" },
      { act: "House Warming (Gruha Pravesh)" },
      { act: "Vehicle Purchase" },
      { act: "Business Opening" },
      { act: "Travel Timelines" }
    ];
    const dataYear = input.year || (/* @__PURE__ */ new Date()).getFullYear();
    const dataMonth = input.month || (/* @__PURE__ */ new Date()).getMonth() + 1;
    const dataDay = input.day || (/* @__PURE__ */ new Date()).getDate();
    const muhurtas = activities.map((a) => ({
      activity: a.act,
      localizedActivity: translateMuhurtaActivityName(a.act, lang),
      isAuspicious: true,
      score: 87,
      timeRanges: [`${dataYear}-${dataMonth}-${dataDay} 08:30 AM to 11:45 AM`],
      description: translateMuhurtaActivityDesc(a.act, lang)
    }));
    sendEnvelope(res, lang, muhurtas);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/festivals", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const result = {
      weekday: translateWeekday(3, lang),
      festivals: (panchang.festivals.length > 0 ? panchang.festivals : ["Vinayaka Chavithi Puja", "Maha Pradosh Vrat"]).map((f) => translateFestival(f, lang)),
      lunarMonth: translateLunarMonth(4, lang)
    };
    sendEnvelope(res, lang, result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/numerology", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    const dob = input.dob || { year: 1995, month: 6, day: 15 };
    const name = input.name || "Aarav";
    const result = AstrologyService.getNumerology(name, dob, 245.5, lang);
    sendEnvelope(res, lang, result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/utils", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    const jd = 2451545 + (input.day || 1);
    const utilsData = {
      julian_day: jd,
      sidereal_time_degrees: 280.46,
      ayanamsa_lahiri_degrees: 23.85,
      obliquity_degrees: 23.44,
      moon_phase_percentage: 67.8,
      solar_eclipse_potential: false,
      lunar_eclipse_potential: false
    };
    sendEnvelope(res, lang, utilsData);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/batch", async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    input.lang = lang;
    const panchang = AstrologyService.calcPanchang(input);
    const moon = panchang.planets.find((p) => p.id === "moon");
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, input.ayanamsa || "Lahiri");
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const dasha = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);
    const numerology = AstrologyService.getNumerology("Aarav", { year: input.year, month: input.month, day: input.day }, moon.longitude, lang);
    const horoscopeFlb = await AiService.generateHoroscope(moon.rasi.name.en, lang);
    const completePackage = {
      panchang,
      dasha,
      doshas,
      numerology,
      horoscope: horoscopeFlb
    };
    sendEnvelope(res, lang, completePackage);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
router.post("/consult", async (req, res) => {
  try {
    const { message, history, birthInput } = req.body;
    const selectedLang = req.query.lang;
    let chartSummary = {};
    if (birthInput) {
      try {
        const panchang = AstrologyService.calcPanchang(birthInput);
        const jd = getJulianDate(birthInput.year, birthInput.month, birthInput.day, birthInput.hour, birthInput.minute, birthInput.timezone || 0);
        const ayanamsaSec = getAyanamsa(jd, birthInput.ayanamsa || "Lahiri");
        const lagnaLong = getLagnaSidereal(jd, birthInput.latitude, birthInput.longitude, ayanamsaSec);
        const lagnaRasi = Math.floor(lagnaLong / 30);
        const lagnaRasiName = RASHI_NAMES_ENGLISH[lagnaRasi];
        chartSummary = {
          nativeName: birthInput.name_input || "Native",
          birthDetails: `${birthInput.year}-${birthInput.month}-${birthInput.day} ${birthInput.hour}:${birthInput.minute} (UTC offset: ${birthInput.timezone})`,
          lagna: lagnaRasiName,
          planets: panchang.planets.map((p) => ({
            name: p.name,
            rasi: p.rasi.name.en,
            degree: p.degree,
            house: p.house,
            retrograde: p.isRetrograde,
            nakshatra: p.nakshatra.name.en
          }))
        };
      } catch (e) {
        console.warn("Calculations for consultation summary failed, using fallback empty summary", e);
      }
    }
    const reply = await AiService.consultAstro(message, history || [], chartSummary, selectedLang);
    res.json({ success: true, reply });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
function getReportDataHelper(currLang, lagnaR, moonR, nakIdx, pPada, isM) {
  const lSignLoc = translateRashi(lagnaR, currLang);
  const mSignLoc = translateRashi(moonR, currLang);
  const nLoc = translateNakshatra(nakIdx, currLang);
  const reportTexts = {
    en: {
      manglik_yes: "Manglik Dosha is active. Mars is placed in an influential house from your Ascendant, suggesting vibrant, high-energy dynamics that require emotional patience and mindful expression in partnerships.",
      manglik_no: "Manglik Dosha is not present. Excellent compatibility and planetary harmony are observed in relation to Mars positioning.",
      verdict: `Your cosmic signature shows a strong alignment with ${lSignLoc} as Lagna and ${mSignLoc} as Moon sign. Born under ${nLoc} nakshatra, pada ${pPada}, you possess a gifted personality combining deep intuition and sharp intellectual faculties. Your path of growth points toward active pursuit of wisdom.`,
      traits: "You are highly intelligent, intuitive, and dedicated. You seek authenticity in relationships and have an inherent spiritual outlook that supports your professional rise.",
      remedies: [
        "Light a ghee lamp in the temple on Thursdays for planetary grace.",
        "Practice daily meditation for at least 15 minutes to stabilize the moon's energy."
      ]
    },
    hi: {
      manglik_yes: "\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948\u0964 \u0906\u092A\u0915\u0947 \u0932\u0917\u094D\u0928 \u0938\u0947 \u092E\u0902\u0917\u0932 \u090F\u0915 \u092A\u094D\u0930\u092D\u093E\u0935\u0940 \u092D\u093E\u0935 \u092E\u0947\u0902 \u0938\u094D\u0925\u093F\u0924 \u0939\u0948, \u091C\u094B \u091C\u0940\u0935\u0928\u0938\u093E\u0925\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0938\u0902\u092C\u0902\u0927\u094B\u0902 \u092E\u0947\u0902 \u0927\u0948\u0930\u094D\u092F \u0914\u0930 \u0938\u091A\u0947\u0924 \u0935\u094D\u092F\u0935\u0939\u093E\u0930 \u0930\u0916\u0928\u0947 \u0915\u0940 \u0938\u0932\u093E\u0939 \u0926\u0947\u0924\u093E \u0939\u0948\u0964",
      manglik_no: "\u092E\u093E\u0902\u0917\u0932\u093F\u0915 \u0926\u094B\u0937 \u0909\u092A\u0938\u094D\u0925\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u092E\u0902\u0917\u0932 \u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F \u0905\u0928\u0941\u0915\u0942\u0932 \u0939\u0948 \u0914\u0930 \u0935\u0948\u0935\u093E\u0939\u093F\u0915 \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u0936\u093E\u0902\u0924\u093F \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0947\u0917\u0940\u0964",
      verdict: `\u0906\u092A\u0915\u0940 \u0915\u0941\u0902\u0921\u0932\u0940 \u092E\u0947\u0902 ${lSignLoc} \u0932\u0917\u094D\u0928 \u0914\u0930 ${mSignLoc} \u091A\u0902\u0926\u094D\u0930 \u0930\u093E\u0936\u093F \u0915\u093E \u0938\u0941\u0902\u0926\u0930 \u0938\u0902\u0930\u0947\u0916\u0923 \u0939\u0948\u0964 ${nLoc} \u0928\u0915\u094D\u0937\u0924\u094D\u0930 \u0915\u0947 ${pPada} \u091A\u0930\u0923 \u092E\u0947\u0902 \u091C\u0928\u094D\u092E \u0932\u0947\u0928\u0947 \u0938\u0947 \u0906\u092A\u0915\u0947 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0924\u094D\u0935 \u092E\u0947\u0902 \u0917\u0939\u0930\u0940 \u0938\u092E\u091D \u0914\u0930 \u0924\u093E\u0930\u094D\u0915\u093F\u0915 \u0936\u0915\u094D\u0924\u093F \u0915\u093E \u0905\u0926\u094D\u092D\u0941\u0924 \u092E\u0947\u0932 \u092E\u093F\u0932\u0924\u093E \u0939\u0948\u0964`,
      traits: "\u0906\u092A \u0905\u0924\u094D\u092F\u0902\u0924 \u092C\u0941\u0926\u094D\u0927\u093F\u092E\u093E\u0928, \u0938\u0902\u0935\u0947\u0926\u0928\u0936\u0940\u0932 \u0914\u0930 \u0928\u093F\u0937\u094D\u0920\u093E\u0935\u093E\u0928 \u0939\u0948\u0902\u0964 \u0906\u092A \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u0938\u091A\u094D\u091A\u093E\u0908 \u0915\u0947 \u0916\u094B\u091C\u0940 \u0939\u0948\u0902 \u0914\u0930 \u0906\u092A\u0915\u0940 \u0906\u0927\u094D\u092F\u093E\u0924\u094D\u092E\u093F\u0915 \u092A\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F \u0906\u092A\u0915\u094B \u091C\u0940\u0935\u0928 \u092E\u0947\u0902 \u092C\u0939\u0941\u0924 \u0906\u0917\u0947 \u0932\u0947 \u091C\u093E\u090F\u0917\u0940\u0964",
      remedies: [
        "\u0917\u0941\u0930\u0941\u0935\u093E\u0930 \u0915\u094B \u092E\u0902\u0926\u093F\u0930 \u092E\u0947\u0902 \u0918\u0940 \u0915\u093E \u0926\u0940\u092A\u0915 \u091C\u0932\u093E\u090F\u0902 \u0914\u0930 \u0917\u0941\u0930\u0941 \u0926\u0947\u0935 \u0915\u0940 \u0906\u0930\u093E\u0927\u0928\u093E \u0915\u0930\u0947\u0902\u0964",
        "\u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928 \u0967\u096B \u092E\u093F\u0928\u091F \u0927\u094D\u092F\u093E\u0928 \u0938\u093E\u0927\u0928\u093E \u0935 \u092A\u094D\u0930\u093E\u0923\u093E\u092F\u093E\u092E \u0915\u0930\u0947\u0902 \u091C\u093F\u0938\u0938\u0947 \u091A\u0902\u0926\u094D\u0930 \u0926\u0947\u0935 \u0915\u0940 \u090A\u0930\u094D\u091C\u093E \u092C\u0928\u0940 \u0930\u0939\u0947\u0964"
      ]
    },
    te: {
      manglik_yes: "\u0C15\u0C41\u0C1C \u0C26\u0C4B\u0C37\u0C02 (\u0C2E\u0C3E\u0C02\u0C17\u0C33\u0C3F\u0C15 \u0C26\u0C4B\u0C37\u0C02) \u0C09\u0C28\u0C4D\u0C28\u0C26\u0C3F. \u0C2E\u0C40 \u0C32\u0C17\u0C4D\u0C28\u0C02 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C15\u0C41\u0C1C\u0C41\u0C21\u0C41 \u0C12\u0C15 \u0C2E\u0C41\u0C16\u0C4D\u0C2F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02\u0C32\u0C4B \u0C09\u0C02\u0C21\u0C1F\u0C02 \u0C35\u0C32\u0C4D\u0C32 \u0C09\u0C26\u0C4D\u0C35\u0C47\u0C17\u0C3E\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C36\u0C15\u0C4D\u0C24\u0C3F \u0C36\u0C3E\u0C24\u0C02 \u0C0E\u0C15\u0C4D\u0C15\u0C41\u0C35\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C3E\u0C2F\u0C3F. \u0C38\u0C39\u0C28\u0C02 \u0C05\u0C32\u0C35\u0C30\u0C4D\u0C1A\u0C41\u0C15\u0C4B\u0C35\u0C21\u0C02 \u0C2E\u0C47\u0C32\u0C41.",
      manglik_no: "\u0C15\u0C41\u0C1C \u0C26\u0C4B\u0C37\u0C02 \u0C32\u0C47\u0C26\u0C41. \u0C2E\u0C40 \u0C1C\u0C3E\u0C24\u0C15\u0C02\u0C32\u0C4B \u0C15\u0C41\u0C1C\u0C41\u0C28\u0C3F \u0C38\u0C4D\u0C25\u0C3E\u0C28\u0C02 \u0C05\u0C28\u0C41\u0C15\u0C42\u0C32\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C17\u0C4D\u0C30\u0C39\u0C3E\u0C32 \u0C2E\u0C27\u0C4D\u0C2F \u0C1A\u0C15\u0C4D\u0C15\u0C28\u0C3F \u0C38\u0C2E\u0C28\u0C4D\u0C35\u0C2F\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C1A\u0C42\u0C2A\u0C3F\u0C38\u0C4D\u0C24\u0C4B\u0C02\u0C26\u0C3F.",
      verdict: `\u0C2E\u0C40 \u0C1C\u0C3E\u0C24\u0C15 \u0C1A\u0C15\u0C4D\u0C30\u0C02 \u0C2A\u0C4D\u0C30\u0C15\u0C3E\u0C30\u0C02 \u0C32\u0C17\u0C4D\u0C28\u0C02 ${lSignLoc} \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1A\u0C02\u0C26\u0C4D\u0C30 \u0C30\u0C3E\u0C36\u0C3F ${mSignLoc} \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F. ${nLoc} \u0C28\u0C15\u0C4D\u0C37\u0C24\u0C4D\u0C30\u0C02\u0C2A\u0C26\u0C02\u0C32\u0C4B \u0C1C\u0C28\u0C4D\u0C2E\u0C3F\u0C02\u0C1A\u0C3F\u0C28 \u0C2E\u0C40\u0C15\u0C41 \u0C32\u0C4B\u0C24\u0C48\u0C28 \u0C0A\u0C39\u0C3E\u0C36\u0C15\u0C4D\u0C24\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C26\u0C41\u0C28\u0C48\u0C28 \u0C2C\u0C41\u0C26\u0C4D\u0C27\u0C3F\u0C36\u0C15\u0C4D\u0C24\u0C3F \u0C26\u0C15\u0C4D\u0C15\u0C41\u0C24\u0C3E\u0C2F\u0C3F.`,
      traits: "\u0C2E\u0C40\u0C30\u0C41 \u0C1A\u0C3E\u0C32\u0C3E \u0C32\u0C4C\u0C15\u0C4D\u0C2F\u0C2E\u0C41\u0C17\u0C32\u0C35\u0C3E\u0C30\u0C41, \u0C06\u0C24\u0C4D\u0C2E\u0C35\u0C3F\u0C36\u0C4D\u0C35\u0C3E\u0C38\u0C02 \u0C15\u0C32\u0C35\u0C3E\u0C30\u0C41. \u0C38\u0C4D\u0C28\u0C47\u0C39 \u0C38\u0C02\u0C2C\u0C02\u0C27\u0C3E\u0C32\u0C32\u0C4B \u0C28\u0C3F\u0C1C\u0C3E\u0C2F\u0C3F\u0C24\u0C40\u0C28\u0C3F \u0C15\u0C4B\u0C30\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C3E\u0C30\u0C41. \u0C2E\u0C40 \u0C06\u0C27\u0C4D\u0C2E\u0C3E\u0C24\u0C4D\u0C2E\u0C3F\u0C15 \u0C06\u0C32\u0C4B\u0C1A\u0C28\u0C32\u0C41 \u0C2E\u0C40\u0C15\u0C41 \u0C0E\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C42 \u0C24\u0C4B\u0C21\u0C41\u0C17\u0C3E \u0C28\u0C3F\u0C32\u0C41\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F.",
      remedies: [
        "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02 \u0C26\u0C47\u0C35\u0C3E\u0C32\u0C2F\u0C02\u0C32\u0C4B \u0C28\u0C46\u0C2F\u0C4D\u0C2F\u0C3F \u0C26\u0C40\u0C2A\u0C02 \u0C35\u0C46\u0C32\u0C3F\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C26\u0C48\u0C35\u0C26\u0C30\u0C4D\u0C36\u0C28\u0C02 \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.",
        "\u0C2E\u0C28\u0C38\u0C41\u0C28\u0C41 \u0C2A\u0C4D\u0C30\u0C36\u0C3E\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C35\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2A\u0C4D\u0C30\u0C24\u0C3F\u0C30\u0C4B\u0C1C\u0C42 \u0C15\u0C28\u0C40\u0C38\u0C02 15 \u0C28\u0C3F\u0CAE\u0CBF\u0C37\u0C3E\u0C32 \u0C2A\u0C3E\u0C1F\u0C41 \u0C27\u0C4D\u0C2F\u0C3E\u0C28\u0C02 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F."
      ]
    },
    ta: {
      manglik_yes: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD (\u0BAE\u0BBE\u0B99\u0BCD\u0B95\u0BB2\u0BCD\u0BAF \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD) \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB2\u0B95\u0BCD\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0BA9 \u0BB5\u0BC0\u0B9F\u0BCD\u0B9F\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE\u0BB2\u0BCD, \u0B89\u0BB1\u0BB5\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0BCA\u0BB1\u0BC1\u0BAE\u0BC8\u0BAF\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BBF\u0BB2\u0BCD \u0BA8\u0BBF\u0BA4\u0BBE\u0BA9\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BC8\u0BAA\u0BCD\u0BAA\u0BBF\u0B9F\u0BBF\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD.",
      manglik_no: "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B9C\u0BBE\u0BA4\u0B95\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BBF\u0BA9\u0BCD \u0BA8\u0BBF\u0BB2\u0BC8 \u0B9A\u0BBE\u0BA4\u0B95\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BBE\u0BB2\u0BCD \u0B95\u0BC1\u0B9F\u0BC1\u0BAE\u0BCD\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BAE\u0B95\u0BBF\u0BB4\u0BCD\u0B9A\u0BCD\u0B9A\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD.",
      verdict: `\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B9C\u0BBE\u0BA4\u0B95\u0BAE\u0BCD ${lSignLoc} \u0BB2\u0B95\u0BCD\u0BA9\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD ${mSignLoc} \u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0 \u0BB0\u0BBE\u0B9A\u0BBF\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. ${nLoc} \u0BA8\u0B9F\u0BCD\u0B9A\u0BA4\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD, ${pPada}-\u0B86\u0BAE\u0BCD \u0BAA\u0BBE\u0BA4\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB1\u0BA8\u0BCD\u0BA4 \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0BA8\u0BC1\u0BA3\u0BCD\u0BA3\u0BB1\u0BBF\u0BB5\u0BC1\u0BAE\u0BCD \u0B86\u0BB3\u0BC1\u0BAE\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4\u0BB5\u0BB0\u0BCD.`,
      traits: "\u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BBF\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0BAA\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0B9A\u0BBE\u0BB2\u0BBF, \u0BA8\u0BC7\u0BB0\u0BCD\u0BAE\u0BC8\u0BAF\u0BBE\u0BA9\u0BB5\u0BB0\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B85\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BA3\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 \u0B89\u0BA3\u0BB0\u0BCD\u0BB5\u0BC1 \u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BB5\u0BB0\u0BCD. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BA4\u0BC1 \u0B86\u0BA9\u0BCD\u0BAE\u0BC0\u0B95 \u0BA8\u0BBE\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BC6\u0BB0\u0BC1\u0BAE\u0BCD \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BB0\u0BC1\u0BAE\u0BCD.",
      remedies: [
        "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8\u0BAF\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BCB\u0BB5\u0BBF\u0BB2\u0BBF\u0BB2\u0BCD \u0BA8\u0BC6\u0BAF\u0BCD \u0BA4\u0BC0\u0BAA\u0BAE\u0BCD \u0B8F\u0BB1\u0BCD\u0BB1\u0BBF \u0BA8\u0BC6\u0BAF\u0BCD\u0BAA\u0BCD \u0BAA\u0BBF\u0BB0\u0B9A\u0BBE\u0BA4\u0BAE\u0BCD \u0BB5\u0BB4\u0B99\u0BCD\u0B95\u0BC1\u0BB5\u0BA4\u0BC1 \u0B9A\u0BBF\u0BB1\u0BAA\u0BCD\u0BAA\u0BC1.",
        "\u0B9A\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BA9\u0BBF\u0BA9\u0BCD \u0B86\u0BB1\u0BCD\u0BB1\u0BB2\u0BC8 \u0B9A\u0BC0\u0BB0\u0BBE\u0B95\u0BCD\u0B95 \u0BA4\u0BBF\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD 15 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BBF\u0BAF\u0BBE\u0BA9\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD."
      ]
    },
    kn: {
      manglik_yes: "\u0CAE\u0C82\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7 (\u0CAE\u0CBE\u0C82\u0C97\u0CCD\u0CB2\u0CBF\u0C95\u0CCD) \u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB2\u0C97\u0CCD\u0CA8\u0CA6\u0CBF\u0C82\u0CA6 \u0CAE\u0C82\u0C97\u0CB3\u0CA8\u0CC1 \u0CAA\u0CCD\u0CB0\u0CAD\u0CBE\u0CB5\u0CBF \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0C86\u0CA6\u0CB7\u0CCD\u0C9F\u0CC1 \u0CA4\u0CBE\u0CB3\u0CCD\u0CAE\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CCC\u0CAE\u0CCD\u0CAF \u0CB5\u0CB0\u0CCD\u0CA4\u0CA8\u0CC6 \u0C95\u0CBE\u0CAA\u0CBE\u0CA1\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1 \u0CA8\u0CC6\u0CAE\u0CCD\u0CAE\u0CA6\u0CBF\u0C97\u0CC6 \u0CB8\u0CB9\u0C95\u0CBE\u0CB0\u0CBF.",
      manglik_no: "\u0CAE\u0C82\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2. \u0C9C\u0CBE\u0CA4\u0C95\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0C82\u0C97\u0CB3\u0CA8 \u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CB5\u0CC1 \u0CA4\u0CC1\u0C82\u0CAC\u0CBE \u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2\u0C95\u0CB0 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB6\u0CBE\u0C82\u0CA4\u0CBF\u0CAF\u0CC1\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
      verdict: `\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0 \u0C9C\u0CBE\u0CA4\u0C95\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF ${lSignLoc} \u0CB2\u0C97\u0CCD\u0CA8 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 ${mSignLoc} \u0C9A\u0C82\u0CA6\u0CCD\u0CB0 \u0CB0\u0CBE\u0CB6\u0CBF\u0CAF \u0C85\u0CA4\u0CCD\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CAE \u0CB8\u0CAE\u0CCD\u0CAE\u0CBF\u0CB2\u0CA8\u0CB5\u0CBF\u0CA6\u0CC6. ${nLoc} \u0CA8\u0C95\u0CCD\u0CB7\u0CA4\u0CCD\u0CB0, ${pPada}-\u0CA8\u0CC7 \u0CAA\u0CBE\u0CA6\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CB9\u0CC1\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6 \u0CA8\u0CBF\u0CAE\u0C97\u0CC6 \u0CA4\u0CC0\u0C95\u0CCD\u0CB7\u0CCD\u0CA3 \u0CAC\u0CC1\u0CA6\u0CCD\u0CA7\u0CBF\u0CB6\u0C95\u0CCD\u0CA4\u0CBF \u0CA6\u0CCA\u0CB0\u0CC6\u0CA4\u0CBF\u0CA6\u0CC6.`,
      traits: "\u0CA8\u0CC0\u0CB5\u0CC1 \u0CAC\u0CC1\u0CA6\u0CCD\u0CA7\u0CBF\u0CB5\u0C82\u0CA4\u0CB0\u0CC1, \u0CB6\u0CCD\u0CB0\u0CA6\u0CCD\u0CA7\u0CBE\u0CB5\u0C82\u0CA4\u0CB0\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CCD\u0CB5\u0CBE\u0CB5\u0CB2\u0C82\u0CAC\u0CBF\u0C97\u0CB3\u0CC1. \u0C86\u0CA7\u0CCD\u0CAF\u0CBE\u0CA4\u0CCD\u0CAE\u0CBF\u0C95 \u0C9A\u0CBF\u0C82\u0CA4\u0CA8\u0CC6\u0C97\u0CB3\u0CC1 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAE\u0CA8\u0CB8\u0CCD\u0CB8\u0CBF\u0C97\u0CC6 \u0CA8\u0CC6\u0CAE\u0CCD\u0CAE\u0CA6\u0CBF \u0CA8\u0CC0\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CCD\u0CB0\u0C97\u0CA4\u0CBF\u0C97\u0CC6 \u0C95\u0CBE\u0CB0\u0CA3\u0CB5\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6.",
      remedies: [
        "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0 \u0CA6\u0CBF\u0CA8\u0CA6\u0C82\u0CA6\u0CC1 \u0CA6\u0CC7\u0CB5\u0CB8\u0CCD\u0CA5\u0CBE\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0CA4\u0CC1\u0CAA\u0CCD\u0CAA\u0CA6 \u0CA6\u0CC0\u0CAA\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0C9A\u0CCD\u0C9A\u0CBF \u0CA6\u0CB0\u0CCD\u0CB6\u0CA8 \u0CAA\u0CA1\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF.",
        "\u0CAE\u0CA8\u0CB8\u0CCD\u0CB8\u0CBF\u0CA8 \u0CB6\u0CBE\u0C82\u0CA4\u0CA4\u0CC6\u0C97\u0CBE\u0C97\u0CBF \u0CA8\u0CBF\u0CA4\u0CCD\u0CAF\u0CB5\u0CC2 15 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7\u0C97\u0CB3 \u0C95\u0CBE\u0CB2 \u0CAA\u0CCD\u0CB0\u0CBE\u0CA3\u0CBE\u0CAF\u0CBE\u0CAE \u0C85\u0CA5\u0CB5\u0CBE \u0CA7\u0CCD\u0CAF\u0CBE\u0CA8 \u0CAE\u0CBE\u0CA1\u0CBF."
      ]
    }
  };
  const selectedT = reportTexts[currLang] || reportTexts.en;
  return {
    manglik_dosha: {
      has_dosha: isM,
      name: currLang === "hi" ? "\u092E\u0902\u0917\u0932 \u0926\u094B\u0937" : currLang === "te" ? "\u0C15\u0C41\u0C1C \u0C26\u0C4B\u0C37\u0C02" : currLang === "ta" ? "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD \u0BA4\u0BCB\u0BB7\u0BAE\u0BCD" : currLang === "kn" ? "\u0CAE\u0CC2\u0CA4\u0CCD\u0CB0 \u0CA6\u0CCB\u0CB7 (\u0CAE\u0C82\u0C97\u0CB3 \u0CA6\u0CCB\u0CB7)" : "Manglik Dosha",
      summary: isM ? selectedT.manglik_yes : selectedT.manglik_no
    },
    cosmic_verdict: selectedT.verdict,
    mental_profile: selectedT.traits,
    remedies: selectedT.remedies
  };
}
var customDetailsHandler = async (req, res) => {
  try {
    const input = req.body;
    const lang = req.query.lang;
    const ayanamsa = input.ayanamsa || "Lahiri";
    const panchang = AstrologyService.calcPanchang(input);
    const jd = getJulianDate(input.year, input.month, input.day, input.hour, input.minute, input.timezone || 0);
    const ayanamsaSec = getAyanamsa(jd, ayanamsa);
    const lagnaLong = getLagnaSidereal(jd, input.latitude, input.longitude, ayanamsaSec);
    const lagnaRasi = Math.floor(lagnaLong / 30);
    const moon = panchang.planets.find((p) => p.id === "moon");
    const doshas = AstrologyService.detectDoshas(panchang.planets, lagnaLong, lang);
    const lagna = translateRashi(lagnaRasi, lang);
    const moon_sign = translateRashi(moon.rasiIndex, lang);
    const nakshatra = translateNakshatra(panchang.nakshatra.index, lang);
    const pada = moon.pada || 1;
    const planetsOfInterest = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
    const planet_positions = {};
    planetsOfInterest.forEach((name) => {
      const p = panchang.planets.find((item) => item.id === name.toLowerCase());
      if (p) {
        planet_positions[name] = {
          planet: p.name,
          localized_name: p.name.en,
          longitude: p.longitude,
          rasi_index: p.rasiIndex,
          rasi_name: p.rasi.name.en,
          rasi_localized: translateRashi(p.rasiIndex, lang),
          degree: p.degree,
          sign_degree: p.signDegree,
          house: p.house,
          nakshatra_name: p.nakshatra.name.en,
          nakshatra_localized: translateNakshatra(p.nakshatraIndex, lang),
          pada: p.pada,
          is_retrograde: p.isRetrograde
        };
      }
    });
    const houses = {};
    for (let i = 0; i < 12; i++) {
      const houseNum = i + 1;
      const rasiIdx = (lagnaRasi + i) % 12;
      const rasiNameEnglish = RASHI_NAMES_ENGLISH[rasiIdx];
      const rasiNameLocalized = translateRashi(rasiIdx, lang);
      houses[houseNum.toString()] = {
        house: houseNum,
        rasi_index: rasiIdx,
        sign: rasiNameLocalized,
        sign_english: rasiNameEnglish
      };
    }
    const dashaTree = AstrologyService.calcVimshottariDasha(moon.longitude, input.year, lang);
    const dasha_data = {
      current_mahadasha: dashaTree.mahadasha,
      current_mahadasha_localized: dashaTree.localizedMahadasha,
      current_antardasha: dashaTree.antardasha,
      current_antardasha_localized: dashaTree.localizedAntardasha,
      time_remaining_years: dashaTree.timeRemainingYears,
      sequence: dashaTree.timeline.map((node) => ({
        lord: node.lord,
        localized_lord: node.localizedLord,
        start_time: node.startTime,
        end_time: node.endTime,
        duration_years: node.durationYears,
        sub_dashas: node.subDashas ? node.subDashas.map((sub) => ({
          lord: sub.lord,
          localized_lord: sub.localizedLord,
          start_time: sub.startTime,
          end_time: sub.endTime,
          duration_years: sub.durationYears
        })) : []
      }))
    };
    const isM = doshas.some((d) => d.name.toLowerCase().includes("manglik") && d.hasDosha);
    const report_data = getReportDataHelper(lang, lagnaRasi, moon.rasiIndex, panchang.nakshatra.index, pada, isM);
    const divisionalCharts = generateDivisionalCharts(panchang.planets, lagnaLong, lang);
    const d1Chart = divisionalCharts.find((c) => c.code === "D1");
    const d9Chart = divisionalCharts.find((c) => c.code === "D9");
    const element = lagnaRasi % 4;
    let startSign = 0;
    if (element === 0) startSign = 0;
    else if (element === 1) startSign = 9;
    else if (element === 2) startSign = 6;
    else startSign = 3;
    const lagnaPart = Math.floor(lagnaLong % 30 / 3.333333);
    const lagnaNavRasi = (startSign + lagnaPart) % 12;
    const makeUIChartData = (points, startLagnaRasi) => {
      const housePlanets = {};
      const houseSigns = {};
      for (let h = 1; h <= 12; h++) {
        housePlanets[h] = [];
        houseSigns[h] = (startLagnaRasi + h - 1) % 12;
      }
      points.forEach((p) => {
        if (p.house >= 1 && p.house <= 12) {
          housePlanets[p.house].push(p.planet);
        }
      });
      return {
        lagna_rasi_index: startLagnaRasi,
        lagna_sign_name: RASHI_NAMES_ENGLISH[startLagnaRasi],
        house_planets: housePlanets,
        house_signs: houseSigns,
        points
      };
    };
    const d9PointsRecalculated = d9Chart?.points.map((p) => {
      const calculatedHouse = (p.signIndex - lagnaNavRasi + 12) % 12 + 1;
      return {
        planet: p.planet,
        localized_planet: p.planet.name.en,
        longitude: p.longitude,
        rasi_index: p.signIndex,
        rasi_name: p.sign.name.en,
        rasi_localized: p.sign.name.en,
        house: calculatedHouse
      };
    }) || [];
    const chart_data = {
      D1: makeUIChartData(d1Chart?.points.map((p) => ({
        planet: p.planet,
        localized_planet: p.planet.name.en,
        longitude: p.longitude,
        rasi_index: p.signIndex,
        rasi_name: p.sign.name.en,
        rasi_localized: p.sign.name.en,
        house: p.house
      })) || [], lagnaRasi),
      D9: makeUIChartData(d9PointsRecalculated, lagnaNavRasi),
      raw_d1: d1Chart,
      raw_d9: d9Chart
    };
    res.json({
      success: true,
      lagna,
      moon_sign,
      nakshatra,
      pada,
      planet_positions,
      houses,
      dasha_data,
      report_data,
      chart_data,
      meta: {
        ayanamsa,
        lang,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
router.post("/horoscope/custom-details", customDetailsHandler);
router.post("/custom-details", customDetailsHandler);
var astrology_default = router;

// api-src/index.ts
dotenv.config();
var app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-user-id");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use("/api", astrology_default);
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", platform: "Vercel Serverless", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
var index_default = app;
export {
  index_default as default
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
