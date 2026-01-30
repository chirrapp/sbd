import b from "benny";
// @ts-ignore
import * as sbdMatch from "sbd/lib/Match.js";
import {
  isBoundaryChar as distIsBoundaryChar,
  isCapitalized as distIsCapitalized,
  isCommonAbbreviation as distIsCommonAbbreviation,
  isConcatenated as distIsConcatenated,
  isCustomAbbreviation as distIsCustomAbbreviation,
  isDottedAbbreviation as distIsDottedAbbreviation,
  isNameAbbreviation as distIsNameAbbreviation,
  isNumber as distIsNumber,
  isPhoneNumber as distIsPhoneNumber,
  isSentenceStarter as distIsSentenceStarter,
  isTimeAbbreviation as distIsTimeAbbreviation,
  isURLOrEmail as distIsURLOrEmail,
} from "../dist/matcher.js";
import { englishAbbreviations } from "./abbreviations.js";
import {
  isBoundaryChar,
  isCapitalized,
  isCommonAbbreviation,
  isConcatenated,
  isCustomAbbreviation,
  isDottedAbbreviation,
  isNameAbbreviation,
  isNumber,
  isPhoneNumber,
  isSentenceStarter,
  isTimeAbbreviation,
  isURLOrEmail,
} from "./matcher.js";

const {
  isBoundaryChar: sdbIsBoundaryChar,
  isCapitalized: sdbIsCapitalized,
  isCommonAbbreviation: sdbIsCommonAbbreviation,
  isConcatenated: sdbIsConcatenated,
  isCustomAbbreviation: sdbIsCustomAbbreviation,
  isDottedAbbreviation: sdbIsDottedAbbreviation,
  isNameAbbreviation: sdbIsNameAbbreviation,
  isNumber: sdbIsNumber,
  isPhoneNr: sdbIsPhoneNumber,
  isSentenceStarter: sdbIsSentenceStarter,
  isTimeAbbreviation: sdbIsTimeAbbreviation,
  isURL: sdbIsURLOrEmail,
} = sbdMatch;

const word = "Unimaginatively";
const starterWord = "unimaginatively";
const timeWord = "a.m.";
const nextTimeWord = "Tuesday";
const dottedWord = "K.L.M";
const abbrWord = "DOM";
const abbrNextWord = "123";
const nameWordCount = 6;
const nameWords = ["Carl", "Viggo", "Manthey", "Lange"];
const phoneWord = "+1-808-468-4343";
const urlWord = "https://getchirrapp.com/";
const concatenatedWord = "deadline?Don";

b.suite(
  "isCapitalized",

  b.add("smolsbd", () => isCapitalized(word)),
  b.add("sbd", () => sdbIsCapitalized(word)),
  b.add("dist", () => distIsCapitalized(word)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isCapitalized", format: "chart.html" }),
);

b.suite(
  "isSentenceStarter",

  b.add("smolsbd", () => isSentenceStarter(starterWord)),
  b.add("sbd", () => sdbIsSentenceStarter(starterWord)),
  b.add("dist", () => distIsSentenceStarter(starterWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isSentenceStarter", format: "chart.html" }),
);

b.suite(
  "isCommonAbbreviation",

  b.add("smolsbd", () =>
    isCommonAbbreviation(englishAbbreviations, starterWord),
  ),
  b.add("sbd", () =>
    sdbIsCommonAbbreviation(englishAbbreviations, starterWord),
  ),
  b.add("dist", () =>
    distIsCommonAbbreviation(englishAbbreviations, starterWord),
  ),

  b.cycle(),
  b.complete(),
  b.save({ file: "isCommonAbbreviation", format: "chart.html" }),
);

b.suite(
  "isTimeAbbreviation",

  b.add("smolsbd", () => isTimeAbbreviation(timeWord, nextTimeWord)),
  b.add("sbd", () => sdbIsTimeAbbreviation(timeWord, nextTimeWord)),
  b.add("dist", () => distIsTimeAbbreviation(timeWord, nextTimeWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isTimeAbbreviation", format: "chart.html" }),
);

b.suite(
  "isDottedAbbreviation",

  b.add("smolsbd", () => isDottedAbbreviation(dottedWord)),
  b.add("sbd", () => sdbIsDottedAbbreviation(dottedWord)),
  b.add("dist", () => distIsDottedAbbreviation(dottedWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isDottedAbbreviation", format: "chart.html" }),
);

b.suite(
  "isCustomAbbreviation",

  b.add("smolsbd", () => isCustomAbbreviation(abbrWord, abbrNextWord)),
  b.add("sbd", () => sdbIsCustomAbbreviation(abbrWord, abbrNextWord)),
  b.add("dist", () => distIsCustomAbbreviation(abbrWord, abbrNextWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isCustomAbbreviation", format: "chart.html" }),
);

b.suite(
  "isNameAbbreviation",

  b.add("smolsbd", () => isNameAbbreviation(nameWordCount, nameWords)),
  b.add("sbd", () => sdbIsNameAbbreviation(nameWordCount, nameWords)),
  b.add("dist", () => distIsNameAbbreviation(nameWordCount, nameWords)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isNameAbbreviation", format: "chart.html" }),
);

b.suite(
  "isNumber",

  b.add("smolsbd", () => isNumber(word)),
  b.add("sbd", () => sdbIsNumber(word)),
  b.add("dist", () => distIsNumber(word)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isNumber", format: "chart.html" }),
);

b.suite(
  "isPhoneNumber",

  b.add("smolsbd", () => isPhoneNumber(phoneWord)),
  b.add("sbd", () => sdbIsPhoneNumber(phoneWord)),
  b.add("dist", () => distIsPhoneNumber(phoneWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isPhoneNumber", format: "chart.html" }),
);

b.suite(
  "isURLOrEmail",

  b.add("smolsbd", () => isURLOrEmail(urlWord)),
  b.add("sbd", () => sdbIsURLOrEmail(urlWord)),
  b.add("dist", () => distIsURLOrEmail(urlWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isURLOrEmail", format: "chart.html" }),
);

b.suite(
  "isConcatenated",

  b.add("smolsbd", () => isConcatenated(concatenatedWord)),
  b.add("sbd", () => sdbIsConcatenated(concatenatedWord)),
  b.add("dist", () => distIsConcatenated(concatenatedWord)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isConcatenated", format: "chart.html" }),
);

b.suite(
  "isBoundaryChar",

  b.add("smolsbd", () => isBoundaryChar(word)),
  b.add("sbd", () => sdbIsBoundaryChar(word)),
  b.add("dist", () => distIsBoundaryChar(word)),

  b.cycle(),
  b.complete(),
  b.save({ file: "isBoundaryChar", format: "chart.html" }),
);
