import Benchmark from "benchmark";
import {
  isBoundaryChar,
  isCapitalized,
  isConcatenated,
  isCustomAbbreviation,
  isDottedAbbreviation,
  isNameAbbreviation,
  isNumber,
  isPhoneNumber,
  isSentenceStarter,
  isCommonAbbreviation,
  isTimeAbbreviation,
  isURLOrEmail,
} from ".";
import {
  isCapitalized as prevIsCapitalized,
  isSentenceStarter as prevIsSentenceStarter,
  isCommonAbbreviation as prevIsCommonAbbreviation,
  isTimeAbbreviation as prevIsTimeAbbreviation,
  isDottedAbbreviation as prevIsDottedAbbreviation,
  isCustomAbbreviation as prevIsCustomAbbreviation,
  isNameAbbreviation as prevIsNameAbbreviation,
  isNumber as prevIsNumber,
  isPhoneNumber as prevIsPhoneNumber,
  isURLOrEmail as prevIsURLOrEmail,
  isConcatenated as prevIsConcatenated,
  isBoundaryChar as prevIsBoundaryChar,
} from "../../lib/matcher";
import { englishAbbreviations } from "../abbreviations";

const suite = new Benchmark.Suite();

const word = "Unimaginatively";

// isCapitalized

suite.add("isCapitalized", () => {
  isCapitalized(word);
});

suite.add("Previous isCapitalized", () => {
  prevIsCapitalized(word);
});

// isSentenceStarter

const starterWord = "unimaginatively";

suite.add("isSentenceStarter", () => {
  isSentenceStarter(starterWord);
});

suite.add("Previous isSentenceStarter", () => {
  prevIsSentenceStarter(starterWord);
});

// isCommonAbbreviation

suite.add("isCommonAbbreviation", () => {
  isCommonAbbreviation(englishAbbreviations, starterWord);
});

suite.add("Previous isCommonAbbreviation", () => {
  prevIsCommonAbbreviation(englishAbbreviations, starterWord);
});

// isTimeAbbreviation

const timeWord = "a.m.";
const nextTimeWord = "Tuesday";

suite.add("isTimeAbbreviation", () => {
  isTimeAbbreviation(timeWord, nextTimeWord);
});

suite.add("Previous isTimeAbbreviation", () => {
  prevIsTimeAbbreviation(timeWord, nextTimeWord);
});

// isDottedAbbreviation

const dottedWord = "K.L.M";

suite.add("isDottedAbbreviation", () => {
  isDottedAbbreviation(dottedWord);
});

suite.add("Previous isDottedAbbreviation", () => {
  prevIsDottedAbbreviation(dottedWord);
});

// isCustomAbbreviation

const abbrWord = "DOM";
const abbrNextWord = "123";

suite.add("isCustomAbbreviation", () => {
  isCustomAbbreviation(abbrWord, abbrNextWord);
});

suite.add("Previous isCustomAbbreviation", () => {
  prevIsCustomAbbreviation(abbrWord, abbrNextWord);
});

// isNameAbbreviation

const nameWordCount = 6;
const nameWords = ["Carl", "Viggo", "Manthey", "Lange"];

suite.add("isNameAbbreviation", () => {
  isNameAbbreviation(nameWordCount, nameWords);
});

suite.add("Previous isNameAbbreviation", () => {
  prevIsNameAbbreviation(nameWordCount, nameWords);
});

// isNumber

suite.add("isNumber", () => {
  isNumber(word);
});

suite.add("Previous isNumber", () => {
  prevIsNumber(word);
});

// isPhoneNumber

const phoneWord = "+1-808-468-4343";

suite.add("isPhoneNumber", () => {
  isPhoneNumber(phoneWord);
});

suite.add("Previous isPhoneNumber", () => {
  prevIsPhoneNumber(phoneWord);
});

// isURLOrEmail

const urlWord = "https://getchirrapp.com/";

suite.add("isURLOrEmail", () => {
  isURLOrEmail(urlWord);
});

suite.add("Previous isURLOrEmail", () => {
  prevIsURLOrEmail(urlWord);
});

isConcatenated;

const concatenatedWord = "deadline?Don";

suite.add("isConcatenated", () => {
  isConcatenated(concatenatedWord);
});

suite.add("Previous isConcatenated", () => {
  prevIsConcatenated(concatenatedWord);
});

// isBoundaryChar

suite.add("isBoundaryChar", () => {
  isBoundaryChar(word);
});

suite.add("Previous isBoundaryChar", () => {
  prevIsBoundaryChar(word);
});

if (!process.env.CI) {
  suite
    .on("cycle", (event: any) => {
      console.log(String(event.target));
    })
    .run();
}
