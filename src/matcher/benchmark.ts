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
  isTimeAbbreviation,
  isURLOrEmail,
} from ".";
import {
  isCapitalized as prevIsCapitalized,
  isSentenceStarter as prevIsSentenceStarter,
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

const suite = new Benchmark.Suite();

const word = "Unimaginatively";

suite.add("isCapitalized", () => {
  isCapitalized(word);
});

if (!process.env.CI) {
  suite.add("Previous isCapitalized", () => {
    prevIsCapitalized(word);
  });
}

suite.add("isSentenceStarter", () => {
  isSentenceStarter(word);
});

if (!process.env.CI) {
  suite.add("Previous isSentenceStarter", () => {
    prevIsSentenceStarter(word);
  });
}

const timeWord = "a.m.";
const nextTimeWord = "Tuesday";

suite.add("isTimeAbbreviation", () => {
  isTimeAbbreviation(timeWord, nextTimeWord);
});

if (!process.env.CI) {
  suite.add("Previous isTimeAbbreviation", () => {
    prevIsTimeAbbreviation(timeWord, nextTimeWord);
  });
}

const dottedWord = "K.L.M";

suite.add("isDottedAbbreviation", () => {
  isDottedAbbreviation(dottedWord);
});

if (!process.env.CI) {
  suite.add("Previous isDottedAbbreviation", () => {
    prevIsDottedAbbreviation(dottedWord);
  });
}

const abbrWord = "DOM";
const abbrNextWord = "123";

suite.add("isCustomAbbreviation", () => {
  isCustomAbbreviation(abbrWord, abbrNextWord);
});

if (!process.env.CI) {
  suite.add("Previous isCustomAbbreviation", () => {
    prevIsCustomAbbreviation(abbrWord, abbrNextWord);
  });
}

const nameWordCount = 6;
const nameWords = ["Carl", "Viggo", "Manthey", "Lange"];

suite.add("isNameAbbreviation", () => {
  isNameAbbreviation(nameWordCount, nameWords);
});

if (!process.env.CI) {
  suite.add("Previous isNameAbbreviation", () => {
    prevIsNameAbbreviation(nameWordCount, nameWords);
  });
}

suite.add("isNumber", () => {
  isNumber(word);
});

if (!process.env.CI) {
  suite.add("Previous isNumber", () => {
    prevIsNumber(word);
  });
}

const phoneWord = "+1-808-468-4343";

suite.add("isPhoneNumber", () => {
  isPhoneNumber(phoneWord);
});

if (!process.env.CI) {
  suite.add("Previous isPhoneNumber", () => {
    prevIsPhoneNumber(phoneWord);
  });
}

const urlWord = "https://getchirrapp.com/";

suite.add("isURLOrEmail", () => {
  isURLOrEmail(urlWord);
});

if (!process.env.CI) {
  suite.add("Previous isURLOrEmail", () => {
    prevIsURLOrEmail(urlWord);
  });
}

const concatenatedWord = "deadline?Don";

suite.add("isConcatenated", () => {
  isConcatenated(concatenatedWord);
});

if (!process.env.CI) {
  suite.add("Previous isConcatenated", () => {
    prevIsConcatenated(concatenatedWord);
  });
}

suite.add("isBoundaryChar", () => {
  isBoundaryChar(word);
});

if (!process.env.CI) {
  suite.add("Previous isBoundaryChar", () => {
    prevIsBoundaryChar(word);
  });
}

suite
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .run();
